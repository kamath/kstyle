import { readdirSync, readFileSync, renameSync, statSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import { extname, join, resolve } from "node:path";
import type { Plugin } from "vite";

// Serves the skill next to the app: every skill file at its own path (/SKILL.md, /references/keyboard.md, …),
// and SKILL.md at / for anything that doesn't ask for HTML (curl, agents).
// The same rules run in `vite dev`, `vite preview` and, via ../../vercel.json, in production.

const ROOT = resolve(import.meta.dirname, "../../skills/kstyle");
// evals/ is for developing the skill, not for using it.
const SERVED = ["SKILL.md", "references", "assets"];
const APP = "app.html";

const walk = (rel: string): string[] =>
  statSync(join(ROOT, rel)).isDirectory()
    ? readdirSync(join(ROOT, rel))
        .sort()
        .flatMap((f) => walk(`${rel}/${f}`))
    : [rel];

export const skillFiles = () => SERVED.flatMap(walk);

const TYPES: Record<string, string> = {
  ".md": "text/markdown; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};
const typeOf = (path: string) => TYPES[extname(path)] ?? "text/plain; charset=utf-8";

/** Markdown unless the client asks for HTML and not markdown: browsers get the app, curl gets the skill. */
export const wantsMarkdown = (accept = "") => accept.includes("text/markdown") || !accept.includes("text/html");

function send(res: ServerResponse, body: string | Buffer, type: string) {
  res.setHeader("Content-Type", type);
  res.setHeader("Vary", "Accept");
  res.end(body);
}

function serveSkill(req: IncomingMessage, res: ServerResponse): boolean {
  const path = decodeURIComponent((req.url ?? "/").split("?")[0]!).slice(1);
  if (path === "" && wantsMarkdown(req.headers.accept)) send(res, readFileSync(join(ROOT, "SKILL.md")), typeOf(".md"));
  else if (skillFiles().includes(path)) send(res, readFileSync(join(ROOT, path)), typeOf(path));
  else return false;
  return true;
}

export function skill(): Plugin {
  let outDir = "dist";
  return {
    name: "skill",
    configResolved: (c) => void (outDir = resolve(c.root, c.build.outDir)),
    // `import { files } from "virtual:skill-files"`: the served paths, for the Files section.
    resolveId: (id) => (id === "virtual:skill-files" ? "\0virtual:skill-files" : undefined),
    load: (id) =>
      id === "\0virtual:skill-files" ? `export const files = ${JSON.stringify(skillFiles())};` : undefined,
    configureServer(server) {
      server.watcher.add(ROOT);
      server.middlewares.use((req, res, next) => void (serveSkill(req, res) || next()));
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (serveSkill(req, res)) return;
        // The built page is app.html (see writeBundle), so the SPA fallback is ours to do. Paths can contain dots
        // (/files/references%2Fdata.md), so it's everything but the bundle, as in vercel.json.
        if (!req.url!.startsWith("/_app/"))
          return send(res, readFileSync(join(outDir, APP)), "text/html; charset=utf-8");
        next();
      });
    },
    generateBundle() {
      for (const f of skillFiles()) this.emitFile({ type: "asset", fileName: f, source: readFileSync(join(ROOT, f)) });
    },
    // Static hosts serve index.html for / before any rewrite runs, which would hide SKILL.md from curl. Named
    // app.html, the page is only served where the rewrites say so.
    writeBundle: () => renameSync(join(outDir, "index.html"), join(outDir, APP)),
  };
}
