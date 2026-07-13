import { z } from "zod";

export const localAccountSchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(2),
  phoneOrEmail: z.string().min(5),
  createdAt: z.string().min(1),
});

export const localZoneSchema = z.object({
  locality: z.string().min(2),
  neighborhood: z.string().min(2),
  approximateRadiusLabel: z.string().min(1),
  source: z.enum(["manual", "browser"]),
});

export type LocalAccount = z.infer<typeof localAccountSchema>;
export type LocalZone = z.infer<typeof localZoneSchema>;
