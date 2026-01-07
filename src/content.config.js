import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

export const collections = {
	now: defineCollection({
		loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/now" }),
		schema: z.object({
			datePublished: z.coerce.date(),
			dateModified: z.coerce.date().optional(),
		}),
	}),

	publications: defineCollection({
		loader: file("./src/content/publications/publications.json"),
		schema: z.object({
			category: z.enum(["Peer-reviewed Publications", "Doctoral Thesis"]),
			authors: z.array(z.string()),
			year: z.number().int(),
			title: z.string(),
			journal: z.string(),
			doi: z.string().nullable(),
			url: z.string().url(),
			open_access: z.boolean().default(false),
			abstract_en: z.string(),
			abstract_de: z.string(),
		}),
	}),

	posts: defineCollection({
		loader: glob({
			pattern: "**/[^_]*.{md,mdx}",
			base: "./src/content/garden",
		}),
		schema: ({image}) => z.object({
			title: z.string(),
			series: z.string().optional(),
			datePublished: z.date(),
			dateModified: z.date().optional(),
			tags: z.array(z.string()).optional(),
			description: z.string().optional(),
			featuredImage: image(),
		}),
	}),
};
