import solid from "solid-start/vite";
import vercel from "solid-start-vercel";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [solid({ adapter: vercel({ edge: true }) })],
  resolve: {
    alias: {
      "@public": "public",
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
