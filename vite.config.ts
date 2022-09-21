import solid from "solid-start/vite";
import staticAdapter from "solid-start-static";
// import node from "solid-start-node";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [solid({ adapter: staticAdapter() })],
  // plugins: [solid({ adapter: node() })],
  resolve: {
    alias: {
      "@public": "public",
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
