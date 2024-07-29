import { z } from "zod";

export const formSchema = z.object({
    title: z.string().max(80).nullable(),
    description: z.string().min(0).max(400).nullable(),
    tags: z.string(),
    seo: z.string(),
    image1: z
        .instanceof(File, { message: 'Please upload a image.'})
        .refine((f) => f.size < 100_000, 'Max 100 kB upload size.'),
    image2: z
        .instanceof(File, { message: 'Please upload a image.'})
        .refine((f) => f.size < 100_000, 'Max 100 kB upload size.'),
    image3: z
        .instanceof(File, { message: 'Please upload a image.'})
        .refine((f) => f.size < 100_000, 'Max 100 kB upload size.'),
    image4: z
        .instanceof(File, { message: 'Please upload a image.'})
        .refine((f) => f.size < 100_000, 'Max 100 kB upload size.'),
    image5: z
        .instanceof(File, { message: 'Please upload a image.'})
        .refine((f) => f.size < 100_000, 'Max 100 kB upload size.'),
    image6: z
        .instanceof(File, { message: 'Please upload a image.'})
        .refine((f) => f.size < 100_000, 'Max 100 kB upload size.'),
    difficulty: z.string(),
    sheets: z.string(),
    shape: z.string(),
    tools: z.string()
});
export type FormSchema = typeof formSchema;