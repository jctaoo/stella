import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    title: z.string(),
    identifier: z.string().optional(),
    abbr: z.string().optional(),
    topImage: z.string().optional(),
    topImageAlt: z.string().optional(),
  }),
});

const snippets = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { posts, snippets };
