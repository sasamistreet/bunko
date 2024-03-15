import { z } from "zod";
export const formSchema = z.object({
  username: z.string().min(2).max(50),
  accountname: z.string().min(4).max(24),
  x: z.string().min(0).max(24),
  instagram: z.string().min(0).max(24),
  description: z.string().min(0).max(400, "Bio must be at most 160 characters.")
});
export type FormSchema = typeof formSchema;