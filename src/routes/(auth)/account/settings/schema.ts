
    import { z } from "zod";
  export const formSchema = z.object({
    marketing_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean().default(true)
  });
  export type FormSchema = typeof formSchema;
