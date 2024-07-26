import { z } from "zod";

export const formSchema = z.object({
    title: z.string().max(80).nullable(),
    description: z.string().min(0).max(400).nullable(),
    tags: z.string(),
    seo: z.string(),
    gallery_featured: z.string(),
    difficulty: z.string(),
    sheets: z.string(),
    shape: z.string(),
    tools: z.string()
});
export type FormSchema = typeof formSchema;