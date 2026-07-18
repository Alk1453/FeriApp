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
  status: z.enum(["draft", "active", "paused", "reserved", "closed"]),
});

export const listingSummaryListSchema = z.array(listingSummarySchema);

export const publicationSchema = listingSummarySchema.extend({
  description: z.string().min(20),
  createdAt: z.string().min(1),
  imageUrl: z.string().min(1),
  privateLocationNote: z.string().min(1).optional(),
  shareUrl: z.string().min(1),
  contact: z.object({
    preferredChannel: z.enum(["whatsapp", "in-app", "phone", "feriapp-mediated"]),
    label: z.string().min(1),
    monetizationSignal: z.enum(["direct", "lead", "transaction", "subscription"]),
  }),
  publicNotes: z.array(z.string().min(1)),
});

export const publicationListSchema = z.array(publicationSchema);

export const publicationDraftSchema = z.object({
  title: z.string().min(3, "El titulo necesita al menos 3 caracteres."),
  description: z
    .string()
    .min(20, "La descripcion necesita al menos 20 caracteres."),
  kind: z.enum(["sale", "barter", "donation", "gift", "service"]),
  category: z.enum([
    "home",
    "transport",
    "books",
    "clothing",
    "tools",
    "services",
    "other",
  ]),
  priceLabel: z.string().min(1, "Indica precio, gratis o condicion."),
  locality: z.string().min(2, "Indica la localidad."),
  neighborhood: z.string().min(2, "Indica el barrio visible."),
  privateLocationNote: z
    .string()
    .min(3, "Agrega una referencia privada de ubicacion."),
  imageCount: z.number().min(0).max(6),
  contact: z.object({
    preferredChannel: z.enum(["whatsapp", "in-app", "phone", "feriapp-mediated"]),
    label: z.string().min(1),
    monetizationSignal: z.enum(["direct", "lead", "transaction", "subscription"]),
  }),
});
