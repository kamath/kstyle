import { atom } from "jotai";

/** The sections list's cursor. Which panes are open lives in the route, not here. */
export const sectionCursorAtom = atom<string | null>(null);

/** One list cursor per section, so switching away and back keeps your place. */
export const cursorAtoms = {
  example: atom<string | null>(null),
  rules: atom<string | null>(null),
  keys: atom<string | null>(null),
  stack: atom<string | null>(null),
  files: atom<string | null>(null),
};
export type SectionId = keyof typeof cursorAtoms;

export const newTaskOpenAtom = atom(false);
export const deleteTaskAtom = atom<string | null>(null);
/** Mirrors the example API's simulated outage, for the toggle's label. */
export const outageAtom = atom(false);

type Theme = "light" | "dark";
const stored = (): Theme | null => {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
};
const systemTheme = (): Theme => (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
const themeChoiceAtom = atom<Theme | null>(stored());
/** The scheme on screen: the visitor's choice, else the system's. */
export const themeAtom = atom(
  (get) => get(themeChoiceAtom) ?? systemTheme(),
  (_get, set, theme: Theme) => {
    set(themeChoiceAtom, theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Private windows: the choice lasts until reload.
    }
  },
);
