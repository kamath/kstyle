import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { skill } from "./skill.ts";

export default defineConfig({
  plugins: [react(), tailwindcss(), skill()],
  // The skill has its own assets/ folder at /assets, so the app's bundle goes elsewhere.
  build: { assetsDir: "_app" },
});
