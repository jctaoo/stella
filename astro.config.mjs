// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import { remarkModifiedTime } from "./plugin/remark-modified-time";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [
      // @ts-expect-error
      [remarkModifiedTime, { fallbackToFs: true }],
    ],
  },
  integrations: [react(), mdx()],
});
