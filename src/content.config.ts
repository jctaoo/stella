import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string().optional(),
    title: z.string(),
    identifier: z.string().optional(),
    abbr: z.string().optional(),
    updateDates: z.array(z.coerce.date()).optional(),
    topImage: z.string().optional(),
    topImageAlt: z.string().optional(),
  }),
});

const snippets = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string().optional(),
    title: z.string(),
    tags: z.array(z.string()).optional(),
    updateDates: z.array(z.coerce.date()).optional(),
  }),
});

export const collections = { posts, snippets };
