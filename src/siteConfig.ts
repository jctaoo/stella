import { z } from "astro:schema";

const siteConfigSchema = z.object({
  siteName: z.string().describe("The name of the site").default("Jctaoo."),
  bannerText: z.string().describe("The text of the banner").optional(),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const siteConfig = siteConfigSchema.parse({
  bannerText: "This is a demo site.",
});
