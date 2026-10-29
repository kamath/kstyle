import { Outlet } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useEffect, type ReactNode } from "react";
import { sectionCursorAtom, themeAtom, type SectionId } from "./state.ts";
import { ActionButton, Kbd, KeyBar, KeyRoot, RegisterAction, useAction, type Action } from "./ui/keys.tsx";
import { Palette, paletteAction } from "./ui/palette.tsx";
import { toast } from "./ui/toast.tsx";
import { buttons, pane } from "./ui/tw.ts";
import { Example } from "./views/example.tsx";
import { List, useCursorOnOpen, usePath, width } from "./views/panes.tsx";
import { Files, Keys, Stack } from "./views/reference.tsx";
import { Rules } from "./views/rules.tsx";

const sections: { id: SectionId; label: string; view: () => ReactNode }[] = [
  { id: "example", label: "Example", view: Example },
  { id: "rules", label: "Rules", view: Rules },
  { id: "keys", label: "Keys", view: Keys },
  { id: "stack", label: "Stack", view: Stack },
  { id: "files", label: "Files", view: Files },
];

const install = "npx skills add kamath/kstyle";

const copyInstall: Action = {
  id: "install.copy",
  label: "Copy the install command",
  keys: ["y"],
  group: "Site",
  run: () =>
    navigator.clipboard.writeText(install).then(
      () => toast.done("Copied. Paste it in a terminal to install the skill."),
      () => toast.error("Couldn't reach the clipboard. Select the command and copy it instead."),
    ),
};

/** The first pane (the sections), then whatever the route opens beside it. */
export function Shell() {
  const { section, go } = usePath();
  const [theme, setTheme] = useAtom(themeAtom);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  useCursorOnOpen(sectionCursorAtom, section);

  const sectionActions: Action[] = sections.map((s, i) => ({
    id: `section.${s.id}`,
    label: `Open ${s.label}`,
    keys: [String(i + 1)],
    group: "Sections",
    run: () => go(s.id),
  }));
  useAction(copyInstall);
  const flip = useAction({
    id: "theme",
    label: theme === "dark" ? "Switch to light" : "Switch to dark",
    keys: ["t"],
    group: "Site",
    run: () => setTheme(theme === "dark" ? "light" : "dark"),
  });
  const active = !section;

  return (
    // The panes, then the key bar for whichever pane is focused (not on phones, where rows and Back are tapped).
    <div className="grid h-full grid-rows-[minmax(0,1fr)_auto]">
      <div className="flex min-h-0 max-md:flex-col">
        <KeyRoot />
        <Palette />
        {sectionActions.map((a) => (
          <RegisterAction key={a.id} action={a} />
        ))}

        <nav
          aria-label="Sections"
          className={`${pane} flex flex-col bg-pane md:w-[17rem] md:shrink-0 ${active ? "" : "max-md:hidden"}`}
          data-focused={active ? "" : undefined}
        >
          <header className="flex flex-col px-3.5 pt-4 pb-3 *:py-1">
            <h1 className="font-mono font-semibold">kstyle</h1>
            <p className="text-muted">
              An agent skill that makes the React apps your coding agent builds look and work like this site.
            </p>
          </header>
          <List
            name="Sections"
            items={sections}
            keyOf={(s) => s.id}
            cursorAtom={sectionCursorAtom}
            active={active}
            onOpen={(s) => go(s.id)}
            row={(s) => (
              <>
                <span className="flex-1">{s.label}</span>
                <Kbd keys={[String(sections.indexOf(s) + 1)]} />
              </>
            )}
          />
          <div className="flex flex-1 flex-col justify-end py-1.5 *:justify-between">
            <ActionButton action={flip} />
            <ActionButton action={paletteAction}>All commands</ActionButton>
          </div>
        </nav>

        <Outlet />
      </div>
      <KeyBar className="max-md:hidden" />
    </div>
  );
}

/** What sits beside the sections until one is opened: what this is, and how to get it. */
export function About() {
  return (
    <section className={`${pane} ${width.fill} flex flex-col bg-raised px-5 py-5 *:py-2 max-md:flex-1`}>
      <h2 className="text-[1.4rem] leading-tight font-semibold">Keyboard-first React apps, in soft color</h2>
      <p className="max-w-[62ch]">
        Install this skill and every frontend your agent builds comes out like this site: warm beige surfaces with a few
        pastel accents, flush square blocks with no borders, panes that open one level at a time, every action on a key
        and a button, a <Kbd keys={[":"]} /> command palette, and loading, error and empty states that are never left
        out.
      </p>
      <p className="max-w-[62ch]">
        Open the <strong>Example</strong> with <Kbd keys={["1"]} /> to try a small app built with it, or{" "}
        <Kbd keys={["Enter"]} /> on any section.
      </p>
      <div className="flex max-w-2xl flex-col bg-bar px-4 py-3 *:py-1">
        <h3 className="text-[0.85rem] font-semibold">Install for Claude Code, Codex, Cursor and other agents</h3>
        <code className="break-all select-all">{install}</code>
        <p className="text-[0.85rem] text-muted">
          Agents can read it as text: <code className="select-all">curl {location.host}</code>
        </p>
      </div>
      <div className={buttons}>
        <ActionButton action={copyInstall} tone="primary" />
      </div>
    </section>
  );
}

export function SectionView() {
  const { section } = usePath();
  const View = sections.find((s) => s.id === section)?.view ?? NotFound;
  return <View />;
}

export function NotFound() {
  return (
    <section className={`${width.fill} flex flex-col bg-raised px-5 py-5 text-muted max-md:flex-1 *:py-1`}>
      <p>
        Nothing lives at <code>{location.pathname}</code>. Press <Kbd keys={["1"]} /> for the example, or pick a
        section.
      </p>
    </section>
  );
}
