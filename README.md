# kstyle

An agent skill that makes the React apps your coding agent builds keyboard-first and soft-colored: warm beige
surfaces with a few pastel accents, flush square blocks with no borders, panes that open one level at a time,
every action on a key and a button, a `:` command palette, and every loading, error and empty state shown.

```sh
npx skills add kamath/kstyle
```

Works with Claude Code, Codex, Cursor and the other agents the [skills CLI](https://github.com/vercel-labs/skills)
supports.

## Layout

- `skills/kstyle/`: the skill. `SKILL.md` is the entry point; `references/` and `assets/` are read and copied as
  needed.
- `apps/web/`: the showcase site, built with the skill. It serves every skill file at its own path
  (`/SKILL.md`, `/references/keyboard.md`, …), and `curl`ing the site root returns `SKILL.md`.

```sh
pnpm install
pnpm dev      # the site, with the skill served from skills/kstyle
pnpm build    # apps/web/dist; vercel.json deploys it
```
