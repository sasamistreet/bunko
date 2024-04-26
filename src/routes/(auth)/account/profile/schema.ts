import { z } from "zod";
export const formSchema = z.object({
  user_id: z.string().min(4).max(24),
  user_name: z.string().min(1).max(50),
  x: z.string().min(0).max(24),
  instagram: z.string().min(0).max(24),
  description: z.string().min(0).max(400, "Bio must be at most 160 characters.")
});
export type FormSchema = typeof formSchema;