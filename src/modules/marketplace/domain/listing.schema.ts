import { z } from "zod";

export const publicLocationSchema = z.object({
  neighborhood: z.string().min(1),
  locality: z.string().min(1),
  distanceLabel: z.string().min(1),
});

export const listingSummarySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(3),
  kind: z.enum(["sale", "barter", "donation", "gift", "service"]),
  kindLabel: z.string().min(1),
  priceLabel: z.string().min(1),
  category: z.enum([
    "home",
    "transport",
    "books",
    "clothing",
    "tools",
    "services",
    "other",
  ]),
  location: publicLocationSchema,
  trustLabel: z.string().min(1),
  status: z.enum(["draft", "active", "reserved", "closed"]),
});

export const listingSummaryListSchema = z.array(listingSummarySchema);

export const publicationSchema = listingSummarySchema.extend({
  description: z.string().min(20),
  createdAt: z.string().min(1),
  imageUrl: z.string().min(1),
  shareUrl: z.string().min(1),
  contact: z.object({
    preferredChannel: z.enum(["whatsapp", "in-app", "phone"]),
    label: z.string().min(1),
  }),
  publicNotes: z.array(z.string().min(1)),
});

export const publicationListSchema = z.array(publicationSchema);
