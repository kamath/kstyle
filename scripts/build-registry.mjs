/**
 * Generates the shadcn registry (registry.json + registry/) from packages/ui.
 *
 * The source files import siblings via `@workspace/ui/*`, which only resolves
 * inside this monorepo -- and `apps/web` already binds `@/*` to its own src,
 * so the source cannot simply adopt `@/` itself. Instead the distributable
 * copies are emitted here with shadcn's conventional aliases, which its CLI
 * rewrites to whatever the consuming project has configured.
 *
 * Run: node scripts/build-registry.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs"
import { join, dirname, basename } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const uiSrc = join(root, "packages/ui/src")
const outDir = join(root, "registry")

const HOMEPAGE = "https://github.com/kamath/kstyle"

/** Bare specifiers that the consuming project already provides. */
const IMPLICIT = new Set(["react", "react-dom", "react/jsx-runtime"])

/** `@scope/pkg/deep/path` -> `@scope/pkg`; `pkg/deep` -> `pkg`. */
function packageName(spec) {
  const parts = spec.split("/")
  return spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]
}

function parseImports(code) {
  const specs = []
  const re = /(?:^|\n)\s*(?:import|export)[\s\S]*?from\s*["']([^"']+)["']/g
  let m
  while ((m = re.exec(code))) specs.push(m[1])
  // side-effect imports: import "foo"
  const re2 = /(?:^|\n)\s*import\s*["']([^"']+)["']/g
  while ((m = re2.exec(code))) specs.push(m[1])
  return specs
}

function analyze(code) {
  const dependencies = new Set()
  const registryDependencies = new Set()
  for (const spec of parseImports(code)) {
    if (spec.startsWith("@workspace/ui/components/")) {
      registryDependencies.add(spec.replace("@workspace/ui/components/", ""))
    } else if (spec.startsWith("@workspace/ui/hooks/")) {
      registryDependencies.add(spec.replace("@workspace/ui/hooks/", ""))
    } else if (!spec.startsWith(".") && !spec.startsWith("@workspace/")) {
      const pkg = packageName(spec)
      if (!IMPLICIT.has(pkg) && !IMPLICIT.has(spec)) dependencies.add(pkg)
    }
  }
  return {
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
  }
}

/** Rewrite monorepo aliases to the aliases shadcn's CLI understands. */
function rewrite(code) {
  return code
    .replace(/@workspace\/ui\/components\//g, "@/components/ui/")
    .replace(/@workspace\/ui\/hooks\//g, "@/hooks/")
    .replace(/@workspace\/ui\/lib\//g, "@/lib/")
}

function titleize(name) {
  return name
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ")
}

rmSync(outDir, { recursive: true, force: true })

const items = []

function emit({ srcPath, outPath, name, type, target }) {
  const code = readFileSync(srcPath, "utf8")
  const { dependencies, registryDependencies } = analyze(code)
  const dest = join(outDir, outPath)
  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, rewrite(code))

  const item = {
    name,
    type,
    title: titleize(name),
    description: `${titleize(name)} component.`,
    files: [{ path: `registry/${outPath}`, type, target }],
  }
  if (dependencies.length) item.dependencies = dependencies
  if (registryDependencies.length) item.registryDependencies = registryDependencies
  items.push(item)
}

// Hooks first so components can depend on them.
for (const file of readdirSync(join(uiSrc, "hooks")).sort()) {
  if (!file.endsWith(".ts")) continue
  const name = basename(file, ".ts")
  emit({
    srcPath: join(uiSrc, "hooks", file),
    outPath: `hooks/${file}`,
    name,
    type: "registry:hook",
    target: `hooks/${file}`,
  })
}

for (const file of readdirSync(join(uiSrc, "components")).sort()) {
  if (!file.endsWith(".tsx")) continue
  const name = basename(file, ".tsx")
  emit({
    srcPath: join(uiSrc, "components", file),
    outPath: `ui/${file}`,
    name,
    type: "registry:ui",
    target: `components/ui/${file}`,
  })
}

// ---------------------------------------------------------------------------
// Theme. Every component leans on tokens this design system defines itself
// (bg-field, bg-line, --surface, radius 0), so the theme is not optional --
// it is a registryDependency of every item.
// ---------------------------------------------------------------------------
const css = readFileSync(join(uiSrc, "styles/globals.css"), "utf8")

/** Pull `--name: value;` pairs out of a top-level block, minus the `--`. */
function declarations(block) {
  const out = {}
  for (const m of block.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    out[m[1]] = m[2].trim()
  }
  return out
}

/** Grab a balanced `{...}` body starting from the index of its opening brace. */
function body(source, openIndex) {
  let depth = 0
  for (let i = openIndex; i < source.length; i++) {
    if (source[i] === "{") depth++
    else if (source[i] === "}" && --depth === 0) return source.slice(openIndex + 1, i)
  }
  throw new Error("unbalanced braces")
}

function blockAfter(marker) {
  const at = css.indexOf(marker)
  if (at === -1) throw new Error(`missing block: ${marker}`)
  return body(css, css.indexOf("{", at))
}

const themeVars = declarations(blockAfter("@theme inline"))
const lightVars = declarations(blockAfter("\n:root {"))
const darkVars = declarations(blockAfter("\n.dark {"))

// The surface-interior rules re-bind tokens on the surfaces themselves; without
// them a card's contents inherit the page palette and go unreadable.
const surfaceRules = {}
for (const m of css.matchAll(/\n\s*(\.bg-[^{]*?)\{([^}]*)\}/g)) {
  const selector = m[1].replace(/\s+/g, " ").trim()
  surfaceRules[selector] = declarations(m[2])
}

items.push({
  name: "theme",
  type: "registry:theme",
  title: "kstyle Theme",
  description:
    "Design tokens: surface fills in place of borders, square corners, and the interior palette surfaces re-bind for their contents.",
  cssVars: { theme: themeVars, light: lightVars, dark: darkVars },
  css: { "@layer base": surfaceRules },
})

// Tokens are load-bearing for every component.
for (const item of items) {
  if (item.name === "theme") continue
  item.registryDependencies = [...new Set([...(item.registryDependencies ?? []), "theme"])].sort()
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "kstyle",
  homepage: HOMEPAGE,
  items: items.sort((a, b) => a.name.localeCompare(b.name)),
}

writeFileSync(join(root, "registry.json"), JSON.stringify(registry, null, 2) + "\n")

const withDeps = items.filter((i) => i.registryDependencies?.length).length
console.log(
  `registry.json: ${items.length} items (${withDeps} with registry deps) -> registry/`
)
