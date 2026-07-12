import { z } from "zod";

export const publicLocationSchema = z.object({
  neighborhood: z.string().min(1),
  locality: z.string().min(1),
  distanceLabel: z.string().min(1),
});

export const listingSummarySchema = z.object({
  title: z.string().min(3),
  kind: z.enum(["sale", "barter", "donation", "gift"]),
  kindLabel: z.string().min(1),
  priceLabel: z.string().min(1),
  location: publicLocationSchema,
  trustLabel: z.string().min(1),
});

export const listingSummaryListSchema = z.array(listingSummarySchema);
