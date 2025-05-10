
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Set the base URL for GitHub Pages deployment in a sub-repository
  // This will be used in production mode only
  base: mode === 'production' ? './' : '/',
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: process.env.GITHUB_PAGES ? "docs" : "dist",
    emptyOutDir: true,
    assetsDir: 'assets',
  },
}));
