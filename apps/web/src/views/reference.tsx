import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { files } from "virtual:skill-files";
import { Kbd } from "../ui/keys.tsx";
import { Query, Refreshing } from "../ui/ui.tsx";
import { Drill } from "./panes.tsx";

const P = ({ children }: { children: ReactNode }) => <p className="max-w-[62ch]">{children}</p>;
const Body = ({ children }: { children: ReactNode }) => <div className="flex flex-col *:py-2">{children}</div>;

// ---------------------------------------------------------------- keys

type Key = { keys: string[]; meaning: string; here: string };

// The skill's default keymap (references/keyboard.md). `here` is what the key does on this site.
const keymap: Key[] = [
  {
    keys: ["j", "k"],
    meaning: "Next / previous item",
    here: "Moves through the deepest open list, or scrolls a reader. Hold it: it repeats, and the row stays in view.",
  },
  {
    keys: ["h", "l"],
    meaning: "Back / open",
    here: "h closes the active pane and goes back to its parent, like Esc. l opens the highlighted item in a new pane, like Enter.",
  },
  { keys: ["g g", "G"], meaning: "First / last item", here: "Jumps to either end of the focused list or reader." },
  {
    keys: ["Enter"],
    meaning: "Open the highlighted item",
    here: "Opens it in a new pane to the right: a section's list, then an item in it.",
  },
  {
    keys: ["Escape"],
    meaning: "Close, back out, leave a text field",
    here: "Closes a dialog or the palette; otherwise closes the active pane and returns to its parent.",
  },
  {
    keys: ["1–5"],
    meaning: "Open section N",
    here: "Opens Example, Rules, Keys, Stack or Files, closing whatever was open deeper.",
  },
  { keys: ["c"], meaning: "Create, in context", here: "Adds a task in the Example." },
  {
    keys: ["d"],
    meaning: "Delete the highlighted item, after confirming",
    here: "Deletes a task in the Example. Enter or y confirms; n or Esc cancels.",
  },
  { keys: ["D"], meaning: "Delete the containing thing", here: "Not used here." },
  { keys: ["e"], meaning: "Edit", here: "Not used here." },
  {
    keys: ["r"],
    meaning: "Refresh, or retry what failed",
    here: "Refetches the Example's tasks, or retries after an error.",
  },
  { keys: ["y"], meaning: "Yank (copy)", here: "Copies the install command." },
  {
    keys: ["i", "/"],
    meaning: "Focus the primary input / the filter",
    here: "Not used here: nothing on this site needs typing except the new-task form.",
  },
  { keys: ["o", "O"], meaning: "Open the switcher / create a new one", here: "Not used here." },
  {
    keys: [":", "mod+k"],
    meaning: "Command palette",
    here: "Lists every action live right now, with its keys. It's how you discover everything else.",
  },
  { keys: ["mod+Enter"], meaning: "Submit the form, even while typing", here: "Adds the task in the new-task dialog." },
];

const modes = (
  <P>
    Two modes, like vim. In normal mode (no text field focused), single keys act on the page. In insert mode (a field is
    focused), keys type, only chords like <Kbd keys={["mod+k"]} /> fire, and <Kbd keys={["Escape"]} /> leaves the field.
  </P>
);

export function Keys() {
  return (
    <Drill
      section="keys"
      label="Keys"
      hint={
        <p>
          The default keymap. Every app built with the skill uses these meanings. <Kbd keys={["Enter"]} /> opens one to
          see what it does here.
        </p>
      }
      items={keymap}
      keyOf={(k) => k.meaning}
      row={(k) => (
        <>
          <span className="w-24 shrink-0">
            <Kbd keys={k.keys} all />
          </span>
          <span className="min-w-0 flex-1 truncate">{k.meaning}</span>
        </>
      )}
      title={(k) => k.meaning}
      detail={(k) => (
        <Body>
          <P>{k.here}</P>
          {modes}
        </Body>
      )}
    />
  );
}

// ---------------------------------------------------------------- stack

type Piece = { id: string; name: string; pkg: string; why: ReactNode };

const stack: Piece[] = [
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    pkg: "tailwindcss",
    why: "With a locked-down theme: the stock colors, radii and shadows are removed, so bg-white and rounded-md don't compile. Only the house tokens exist, named for jobs (bg-sel, bg-primary, bg-danger), and dark mode is in the tokens, so there are no dark: variants.",
  },
  {
    id: "base-ui",
    name: "Base UI",
    pkg: "@base-ui/react",
    why: "Unstyled, accessible parts for every control: Dialog, AlertDialog, Autocomplete (the palette), Tabs, Toast, Field and Form. Hand-rolling is reserved for what Base UI lacks, and gets a comment saying so.",
  },
  {
    id: "query",
    name: "TanStack Query",
    pkg: "@tanstack/react-query",
    why: "Owns all server data: one key factory, one queryFn per endpoint, and mutations that invalidate what they change. Results are never copied into atoms or useState.",
  },
  {
    id: "jotai",
    name: "Jotai",
    pkg: "jotai",
    why: "Owns shared client state: list cursors, the focused pane, the open dialog, the palette. Components read the atom they need instead of taking props through layers that don't use them.",
  },
  {
    id: "router",
    name: "TanStack Router",
    pkg: "@tanstack/react-router",
    why: "Routing for the Vite SPA. The open panes are the route (/files/references/keyboard.md), so a reload or a shared link reopens them.",
  },
  {
    id: "vite",
    name: "Vite SPA in a pnpm monorepo",
    pkg: "apps/web",
    why: "New projects start as a pnpm workspace: the SPA in apps/web, the API in apps/api, the database in packages/db. From the root, pnpm db:generate, db:migrate and db:studio run the database scripts.",
  },
  {
    id: "hono",
    name: "Hono + Zod OpenAPI",
    pkg: "@hono/zod-openapi",
    why: "The API defines every route with Zod schemas for its input and every response. Requests and responses are validated, and the OpenAPI document at /openapi.json is generated from the same definitions.",
  },
  {
    id: "db",
    name: "Drizzle on PGlite",
    pkg: "@electric-sql/pglite-socket",
    why: "When a database is needed: Drizzle ORM on PGlite, served over the Postgres wire protocol by pglite-socket. The API connects with an ordinary Postgres driver through DATABASE_URL, so moving to hosted Postgres later is just a URL change.",
  },
];

export function Stack() {
  return (
    <Drill
      section="stack"
      label="Stack"
      hint={
        <p>
          What the skill builds with, and why. <Kbd keys={["Enter"]} /> opens one.
        </p>
      }
      items={stack}
      keyOf={(p) => p.id}
      row={(p) => <span className="min-w-0 flex-1 truncate">{p.name}</span>}
      title={(p) => p.name}
      detail={(p) => (
        <Body>
          <code className="text-muted">{p.pkg}</code>
          <P>{p.why}</P>
        </Body>
      )}
    />
  );
}

// ---------------------------------------------------------------- files

function FileView({ path }: { path: string }) {
  const q = useQuery({
    queryKey: ["file", path],
    queryFn: async () => {
      const res = await fetch(`/${path}`);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return res.text();
    },
  });
  return (
    <Body>
      <p className="flex items-center font-mono text-[0.85rem] text-muted gap-2">
        <span className="min-w-0 truncate">
          curl {location.origin}/{path === "SKILL.md" ? "" : path}
        </span>
        <Refreshing q={q} />
      </p>
      <Query q={q} what={path} isEmpty={(t) => !t.trim()} empty={<p>{path} is empty.</p>}>
        {(text) => <pre className="overflow-x-auto overscroll-none bg-page px-4 py-3 whitespace-pre-wrap">{text}</pre>}
      </Query>
    </Body>
  );
}

export function Files() {
  return (
    <Drill
      section="files"
      label="Files"
      hint={
        <p>
          Every file your agent reads when it uses the skill, served as plain text. <Kbd keys={["Enter"]} /> opens one.
        </p>
      }
      items={files}
      keyOf={(f) => f}
      row={(f) => <span className="min-w-0 flex-1 truncate font-mono text-[0.85rem]">{f}</span>}
      title={(f) => <span className="font-mono">{f}</span>}
      detail={(f) => <FileView path={f} />}
    />
  );
}
