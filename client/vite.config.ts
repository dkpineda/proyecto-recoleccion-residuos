import path from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
// import mkcert from "vite-plugin-mkcert";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// eslint-disable-next-line no-restricted-syntax
export default defineConfig(() => {
  return {
    build: {
      outDir: "dist/apps/web-chat",
      emptyOutDir: true, // also necessary
    },

    server: {
      port: 4200,
      host: "localhost",
    },

    preview: {
      port: 4300,
      host: "localhost",
    },

    plugins: [
      react(),
      // uncomment this line to work with embedded signup
      // mkcert(),
      nodePolyfills(),
      {
        name: "html-transform",
        transformIndexHtml(html) {
          return html.replace(/%VITE_META_APP_ID%/g, process.env.VITE_META_APP_ID ?? "");
        },
      },
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
