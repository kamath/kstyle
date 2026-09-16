import type { Preview } from "@storybook/react-vite"

import "../src/styles/globals.css"
import "./storybook.css"

import { withTheme } from "./with-theme"

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Overview", "Components"],
      },
    },
    a11y: { test: "todo" },
  },
  globalTypes: {
    theme: {
      description: "Color scheme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
          { value: "side-by-side", icon: "sidebyside", title: "Side by side" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [withTheme],
}

export default preview
