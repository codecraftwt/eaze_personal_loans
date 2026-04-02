import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    // Dev-only: browser → same-origin → Vite proxies to Salesforce (avoids CORS on localhost).
    proxy: {
      "/api/salesforce-public": {
        target: "https://eazeconsulting.my.salesforce-sites.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/api\/salesforce-public\/?$/, "/api/services/apexrest/public-api/"),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
