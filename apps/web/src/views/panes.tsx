import { useNavigate, useParams } from "@tanstack/react-router";
import { useSetAtom, type PrimitiveAtom } from "jotai";
import { useEffect, useRef, type ReactNode } from "react";
import { cursorAtoms, type SectionId } from "../state.ts";
import { ActionButton, useAction, useBack, useListNav } from "../ui/keys.tsx";
import { item as itemClass, pane } from "../ui/tw.ts";

// Panes open one level at a time, Finder-style: sections → a section's list → an item's reader. The open path is
// the route (/rules/borders), the deepest open pane has the keyboard, and Esc closes it.

/** The open path, and a way to change it: `go()` is the top, `go("rules")` a section, `go("rules", id)` an item. */
export function usePath() {
  // The item is a splat, so ids with slashes (references/data.md) read as paths rather than %2F.
  const { section, _splat } = useParams({ strict: false }) as { section?: string; _splat?: string };
  const item = _splat || undefined;
  const navigate = useNavigate();
  const go = (...path: string[]) =>
    void navigate({ to: "/" + path.map((p) => p.split("/").map(encodeURIComponent).join("/")).join("/") });
  return { section, item, go };
}

export const width = {
  list: "md:w-[24rem] md:shrink-0",
  fill: "min-w-0 flex-1",
};

/**
 * One column. While `active` it has the keyboard: the selection wash, Esc/h/← to `onBack`, and (for a `reader`)
 * j/k/gg/G scrolling. Below 48rem only the active pane shows, with a Back button in its header.
 */
export function Pane({
  active,
  onBack,
  title,
  showTitle,
  reader,
  toolbar,
  className,
  children,
}: {
  active: boolean;
  onBack?: () => void;
  title?: ReactNode;
  /** Show the title on wide screens too. List panes don't: the open row in the parent pane already names them. */
  showTitle?: boolean;
  reader?: boolean;
  toolbar?: ReactNode;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const back = useBack(active ? onBack : undefined);
  const scroll = (to: number | "start" | "end") => {
    const el = ref.current;
    if (!el) return;
    if (to === "start") el.scrollTo({ top: 0 });
    else if (to === "end") el.scrollTo({ top: el.scrollHeight });
    else el.scrollBy({ top: to });
  };
  const keys = active && !!reader;
  useAction({
    id: "reader.down",
    nav: "down",
    label: "Scroll down",
    keys: ["j", "ArrowDown"],
    group: "Panes",
    repeat: true,
    enabled: keys,
    run: () => scroll(64),
  });
  useAction({
    id: "reader.up",
    nav: "up",
    label: "Scroll up",
    keys: ["k", "ArrowUp"],
    group: "Panes",
    repeat: true,
    enabled: keys,
    run: () => scroll(-64),
  });
  useAction({
    id: "reader.top",
    label: "Scroll to top",
    keys: ["g g"],
    group: "Panes",
    enabled: keys,
    run: () => scroll("start"),
  });
  useAction({
    id: "reader.bottom",
    label: "Scroll to bottom",
    keys: ["G"],
    group: "Panes",
    enabled: keys,
    run: () => scroll("end"),
  });

  const header = title !== undefined && (
    <header className={`flex items-center gap-2 px-5 pt-5 pb-3 ${showTitle ? "" : "md:hidden"}`}>
      {onBack && (
        <div className="md:hidden">
          <ActionButton action={back} />
        </div>
      )}
      <h2 className="min-w-0 flex-1 font-semibold">{title}</h2>
    </header>
  );
  return (
    <section
      ref={ref}
      className={`${pane} flex flex-col ${className} ${active ? "max-md:flex-1" : "max-md:hidden"}`}
      data-focused={active ? "" : undefined}
    >
      {/* Sticky, with the pane's own tint and wash, so it stays put while the content scrolls under it. */}
      {(header || toolbar) && (
        <div className="sticky top-0 flex flex-col bg-inherit in-data-focused:wash">
          {header}
          {toolbar}
        </div>
      )}
      {children}
    </section>
  );
}

/** The rows of a list pane. A click or Enter/l/→ opens a row; j/k/gg/G move while the pane is active. */
export function List<T>({
  name,
  items,
  keyOf,
  cursorAtom,
  active,
  onOpen,
  row,
}: {
  name: string;
  items: readonly T[];
  keyOf: (item: T) => string;
  cursorAtom: PrimitiveAtom<string | null>;
  active: boolean;
  onOpen: (item: T) => void;
  row: (item: T) => ReactNode;
}) {
  const { listRef, rowProps } = useListNav({ name, items, keyOf, cursorAtom, active, onOpen });
  return (
    <ul ref={listRef} aria-label={name}>
      {items.map((it) => (
        <li key={keyOf(it)} className={itemClass} {...rowProps(it)}>
          {row(it)}
        </li>
      ))}
    </ul>
  );
}

/** What fills the space right of the deepest pane until something is opened: what Enter will do there. */
export const Hint = ({ children }: { children: ReactNode }) => (
  <div className={`${width.fill} flex flex-col bg-raised px-5 py-5 text-muted max-md:hidden *:py-1`}>{children}</div>
);

/** Keeps a list's cursor on the open item, so Esc (or a reload of a deep link) lands on the right row. */
export function useCursorOnOpen(atom: PrimitiveAtom<string | null>, open: string | undefined) {
  const set = useSetAtom(atom);
  useEffect(() => {
    if (open) set(open);
  }, [open, set]);
}

/** A section that is a list of things, each opening into a reader. */
export function Drill<T>({
  section,
  label,
  items,
  keyOf,
  row,
  title,
  detail,
  hint,
}: {
  section: SectionId;
  label: string;
  items: readonly T[];
  keyOf: (item: T) => string;
  row: (item: T) => ReactNode;
  title: (item: T) => ReactNode;
  detail: (item: T) => ReactNode;
  hint: ReactNode;
}) {
  const { item, go } = usePath();
  const open = item === undefined ? undefined : items.find((i) => keyOf(i) === item);
  useCursorOnOpen(cursorAtoms[section], item);
  return (
    <>
      <Pane active={!item} onBack={() => go()} title={label} className={`${width.list} bg-page`}>
        <List
          name={label}
          items={items}
          keyOf={keyOf}
          cursorAtom={cursorAtoms[section]}
          active={!item}
          onOpen={(i) => go(section, keyOf(i))}
          row={row}
        />
      </Pane>
      {item === undefined ? (
        <Hint>{hint}</Hint>
      ) : (
        <Pane
          key={item}
          active
          reader
          showTitle
          onBack={() => go(section)}
          title={open ? title(open) : "Not found"}
          className={`${width.fill} bg-raised`}
        >
          <div className="px-5 pb-8">
            {open ? detail(open) : <p className="text-muted">There's nothing called {item} here.</p>}
          </div>
        </Pane>
      )}
    </>
  );
}
