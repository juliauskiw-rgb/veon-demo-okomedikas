// VEON demo base: technical setup only. Visual design comes from design/concept.md of each client.
import { defineConfig } from "astro/config";

export default defineConfig({
  // GitHub Pages serves the demo from this sub-path; local preview opens at the same path
  base: "/veon-demo-okomedikas",
  build: { inlineStylesheets: "auto" },
  compressHTML: true,
});
