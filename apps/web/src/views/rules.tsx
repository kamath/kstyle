import type { ReactNode } from "react";
import { Kbd } from "../ui/keys.tsx";
import { btn, state } from "../ui/tw.ts";
import { Drill } from "./panes.tsx";

// Specimens are pictures of UI, not UI: nothing in them is interactive, so nothing in them needs a key.

type Rule = { id: string; title: string; body: ReactNode; specimen?: ReactNode };

const P = ({ children }: { children: ReactNode }) => <p className="max-w-[62ch]">{children}</p>;

function Hues() {
  const hues = [
    ["bg-sel text-sel-ink", "lavender", "selection, active, highlight"],
    ["bg-primary text-primary-ink", "sky", "the primary action"],
    ["bg-ok text-ok-ink", "mint", "ok, done"],
    ["bg-pending text-pending-ink", "butter", "pending"],
    ["bg-danger text-danger-ink", "rose", "danger, error"],
    ["bg-peach text-peach-ink", "peach", "spare, for one new job"],
  ];
  return (
    <ul className="flex flex-col">
      {hues.map(([cls, name, job]) => (
        <li key={name} className={`flex items-baseline gap-3 px-3.5 py-2.5 ${cls}`}>
          <span className="w-20 font-mono text-[0.85rem]">{name}</span>
          <span>{job}</span>
        </li>
      ))}
    </ul>
  );
}

function Steps() {
  return (
    <div className="flex flex-col bg-page">
      <p className="px-3.5 py-2.5 font-mono text-[0.85rem] text-muted">page</p>
      <div className="flex flex-col bg-pane">
        <p className="px-3.5 py-2.5 font-mono text-[0.85rem] text-muted">pane</p>
        <div className="flex flex-col bg-raised px-3.5 py-3 *:py-1">
          <span className="font-mono text-[0.85rem] text-muted">raised</span>
          <span className="bg-well px-2.5 py-2 text-muted">a well: the input, one step off its surface</span>
        </div>
      </div>
    </div>
  );
}

/** A miniature three-pane app: flush tinted blocks, no lines, no gaps, no radii. */
function Mini() {
  const rows = ["Inbox", "Drafts", "Sent"];
  return (
    <div className="grid h-44 grid-cols-[7rem_10rem_minmax(0,1fr)] text-[0.85rem] text-ink">
      <ul className="bg-pane">
        {rows.map((r, i) => (
          <li key={r} className={`px-3 py-2 ${i === 0 ? "bg-sel font-semibold text-sel-ink" : ""}`}>
            {r}
          </li>
        ))}
      </ul>
      <ul className="bg-page wash">
        {["Deploy finished", "Invoice #2041", "Welcome aboard"].map((r, i) => (
          <li key={r} className={`truncate px-3 py-2 ${i === 1 ? "bg-sel text-sel-ink" : ""}`}>
            {r}
          </li>
        ))}
      </ul>
      <div className="flex flex-col bg-raised px-3 py-2 *:py-1">
        <span className="font-semibold">Invoice #2041</span>
        <span className="text-muted">Paid in full.</span>
        <span className="self-start bg-ok px-1.5 text-xs text-ok-ink">Paid</span>
      </div>
    </div>
  );
}

// Not the `item` recipe: these rows show fixed states, and a recipe mustn't take a conflicting extra utility.
const row = "flex min-h-10 items-center gap-3 px-3.5 py-2";

function States() {
  return (
    <div className="flex flex-col bg-page">
      <p className={state()}>Loading the inbox…</p>
      <div className={state(true)}>
        <p>Couldn't load the inbox: 502 Bad Gateway</p>
        <span className={btn()}>
          <span>Retry</span>
          <Kbd keys={["r"]} />
        </span>
      </div>
      <p className={state()}>No mail yet. Anything sent to an address on acme.example.com lands here.</p>
      <ul>
        <li className={`${row} bg-sel text-sel-ink`}>
          <span className="flex-1">Deploy finished</span>
          <span className="text-xs">2m</span>
        </li>
        <li className={row}>
          <span className="flex-1">Invoice #2041</span>
          <span className="text-xs text-muted">1h</span>
        </li>
      </ul>
    </div>
  );
}

const Both = ({ children }: { children: ReactNode }) => (
  <div className="grid sm:grid-cols-2">
    {(["light", "dark"] as const).map((t) => (
      <div key={t} data-theme={t} className="flex flex-col bg-page text-ink">
        <p className="px-3.5 pt-2.5 font-mono text-[0.85rem] text-muted">{t}</p>
        {children}
      </div>
    ))}
  </div>
);

const ia = `sections                         1–5
├─ Example   tasks → task        c r !  /  x d
├─ Rules     rules → rule + specimen
├─ Keys      keys → key + meaning
├─ Stack     pieces → piece + why
└─ Files     files → contents (fetched)`;

export const rules: Rule[] = [
  {
    id: "reason",
    title: "Nothing without a reason",
    body: (
      <P>
        Before any JSX, the skill maps the information architecture: the entities, the actions on each and the view that
        owns each action, as a tree where every node can answer "why here?". Hero copy, welcome banners, helper text
        that repeats a label and icons that repeat a word get cut. Here's the tree for this site:
      </P>
    ),
    specimen: <pre className="bg-page px-4 py-3 text-ink">{ia}</pre>,
  },
  {
    id: "keyboard",
    title: "Keyboard first, mouse equal",
    body: (
      <P>
        Every action is defined once and gets two surfaces: a key, and a button that shows that key. Nothing needs the
        mouse, and nothing needs a key. Press <Kbd keys={[":"]} /> anywhere on this page to list every command that's
        live right now.
      </P>
    ),
    specimen: (
      <div className="flex flex-wrap items-center gap-2 bg-bar px-1.5 py-1">
        <span className={btn("primary")}>
          <span>New task</span>
          <Kbd keys={["c"]} />
        </span>
        <span className={btn()}>
          <span>Refresh</span>
          <Kbd keys={["r"]} />
        </span>
        <span className={btn("danger")}>
          <span>Delete</span>
          <Kbd keys={["d"]} />
        </span>
      </div>
    ),
  },
  {
    id: "states",
    title: "State is always legible",
    body: (
      <P>
        Every query renders all four of its states through one component: loading says what it's loading, errors show
        the server's message with a retry key, empty says why and what to do, and data is the content. A background
        refetch gets a quiet "Refreshing…" rather than a layout jump. In the Example section, press <Kbd keys={["!"]} />{" "}
        to start an outage, then <Kbd keys={["r"]} /> to watch it happen.
      </P>
    ),
    specimen: <States />,
  },
  {
    id: "once",
    title: "Say each thing once",
    body: (
      <P>
        Every fact and state appears in one place, the one closest to its cause. Press <Kbd keys={["r"]} /> in the
        Example: "Refreshing…" shows on the Refresh button and nowhere else. Saving a task shows on the button that saved
        it, not also as a badge, and a button that says "Reopen" needs no "Done" beside it.
      </P>
    ),
  },
  {
    id: "beige",
    title: "Beige neutrals, splashes of color",
    body: (
      <P>
        Warm beige neutrals (warm near-black in dark mode) carry the structure. Color comes in as a few distinct pastel
        accents. A screen at rest is mostly beige: the highlighted row, the active section, a badge and the primary
        button are the only splashes.
      </P>
    ),
    specimen: <Mini />,
  },
  {
    id: "hues",
    title: "One hue, one job",
    body: (
      <P>
        Each hue means one thing, everywhere. The highlighted row, the active tab and the focused pane's wash are all
        lavender. Sections, tags and categories don't get decorative colors, so a color always tells you something.
      </P>
    ),
    specimen: <Hues />,
  },
  {
    id: "borders",
    title: "No borders",
    body: (
      <P>
        Regions, rows, inputs and buttons are separated by stepping the background: page → pane → raised → highlighted.
        An input is a filled well one step off its surface. Focus is a strong background change, not a ring.
      </P>
    ),
    specimen: <Steps />,
  },
  {
    id: "flush",
    title: "Square corners, no gaps",
    body: (
      <P>
        Nothing has a radius. Panes, tabs and rows are never separated by empty space owned by no one: they abut and
        carry their own padding, so a click target runs to the edge and the screen reads as one continuous surface of
        tinted blocks. Inside a component, and between buttons, there is a gap, so two tinted buttons never fuse.
      </P>
    ),
    specimen: <Mini />,
  },
  {
    id: "panes",
    title: "Panes open one level at a time",
    body: (
      <P>
        An app starts at its top-level list. <Kbd keys={["Enter"]} /> opens the highlighted item in a new pane to the
        right, and <Kbd keys={["Escape"]} /> closes the active pane and returns to its parent, so the open path is
        always on screen and in the URL. This site works that way: you're three panes deep right now.
      </P>
    ),
  },
  {
    id: "scroll",
    title: "The page never scrolls",
    body: (
      <P>
        The app fills the viewport. Only regions with overflowing content scroll (the list, the reader, a dialog), each
        on its own, with no iOS rubber-banding. Toolbars stay put because they sit outside the scroller. Hold{" "}
        <Kbd keys={["j"]} /> in any list here to see it.
      </P>
    ),
    specimen: (
      <pre className="bg-page px-4 py-3 text-ink">{`html, body, #root {
  height: 100%;
  overflow: hidden;
  overscroll-behavior: none;
}`}</pre>
    ),
  },
  {
    id: "modes",
    title: "Light and dark, both first-class",
    body: (
      <P>
        Dark mode is designed, not inverted: warm near-black neutrals, deeper hue fills and light inks, with text at
        WCAG AA on every fill in both. Press <Kbd keys={["t"]} /> to switch this whole site.
      </P>
    ),
    specimen: (
      <Both>
        <Hues />
      </Both>
    ),
  },
];

export function Rules() {
  return (
    <Drill
      section="rules"
      label="Rules"
      hint={
        <p>
          The rules every screen built with the skill follows. <Kbd keys={["Enter"]} /> opens the highlighted one, with
          a picture of it.
        </p>
      }
      items={rules}
      keyOf={(r) => r.id}
      row={(r) => <span className="truncate">{r.title}</span>}
      title={(r) => r.title}
      detail={(r) => (
        <div className="flex flex-col *:py-3">
          {r.body}
          {r.specimen && <figure className="max-w-2xl">{r.specimen}</figure>}
        </div>
      )}
    />
  );
}
