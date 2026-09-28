import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves the site from https://naskenai.github.io/smart-sensing-scale/
export default defineConfig({
  base: "/smart-sensing-scale/",
  plugins: [react(), tailwindcss()],
  preview: {
    port: 4173,
    strictPort: true,
  },
});
