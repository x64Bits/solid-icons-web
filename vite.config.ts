import solid from "solid-start/vite";
import netlify from "solid-start-netlify";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [solid({ adapter: netlify() })],
  // plugins: [solid({ adapter: node() })],
  resolve: {
    alias: {
      "@public": "public",
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
