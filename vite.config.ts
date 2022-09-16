import solid from "solid-start/vite";
// import vercel from "solid-start-vercel";
import node from "solid-start-node";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  // plugins: [solid({ adapter: vercel({ edge: true }) })],
  // Local, uncomment next line
  plugins: [solid({ adapter: node() })],
  resolve: {
    alias: {
      "@public": "public",
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
