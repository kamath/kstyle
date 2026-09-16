import * as React from "react"
import type { Decorator } from "@storybook/react-vite"

type Theme = "light" | "dark" | "side-by-side"

const paneStyle: React.CSSProperties = {
  background: "var(--background)",
  color: "var(--foreground)",
  padding: "2rem",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
}

const splitStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  minHeight: "100%",
}

/**
 * The `dark` variant in globals.css is `&:is(.dark *)`, so the tokens only flip
 * for *descendants* of `.dark` — every pane below wraps its story in a marker
 * element rather than setting the class on the story root itself.
 */
function Pane({ dark, children }: { dark: boolean; children: React.ReactNode }) {
  return (
    <div className={dark ? "dark sb-theme-pane" : "sb-theme-pane"}>
      <div style={paneStyle}>{children}</div>
    </div>
  )
}

export const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? "light") as Theme

  React.useEffect(() => {
    if (theme === "side-by-side") {
      document.documentElement.classList.remove("dark")
      document.documentElement.style.colorScheme = "light dark"
      return
    }
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.style.colorScheme = theme
  }, [theme])

  if (theme === "side-by-side") {
    return (
      <div style={splitStyle}>
        <Pane dark={false}>
          <Story />
        </Pane>
        <Pane dark>
          <Story />
        </Pane>
      </div>
    )
  }

  return (
    <div style={paneStyle}>
      <Story />
    </div>
  )
}
