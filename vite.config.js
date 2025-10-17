import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import path from "path";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import remarkEmoji from "remark-emoji";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    { enforce: "pre", ...mdx({
      remarkPlugins: [remarkGfm, remarkMath, remarkToc, remarkEmoji],
      rehypePlugins: [rehypeKatex, rehypeHighlight],
    }) },
    react(),
  ],
  base: command === 'build' ? "/multi-course-learning-exam-system/" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    port: 3000,
    open: true,
  },
}));
