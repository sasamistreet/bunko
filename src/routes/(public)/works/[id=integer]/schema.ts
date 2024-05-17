import { z } from "zod";
 
export const wishlistSchema = z.object({
  userId: z.string(),
  workId: z.number().int()
});
 
export type WishlistSchema = typeof wishlistSchema;

export const cartSchema = z.object({
  userId: z.string(),
  workId: z.number().int()
});
 
export type CartSchema = typeof cartSchema;