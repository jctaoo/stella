// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import { remarkModifiedTime } from "./plugin/remark-modified-time";
import { remarkReadingTime } from "./plugin/remark-reading-time";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [
      // @ts-expect-error
      [remarkModifiedTime, { fallbackToFs: true }],
      // @ts-expect-error
      remarkReadingTime,
      remarkMath,
    ],
    rehypePlugins: [rehypeKatex],
  },

  integrations: [react(), mdx()],
  adapter: vercel(),
});