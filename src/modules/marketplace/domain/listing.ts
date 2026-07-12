import type { PublicLocation } from "@/shared/domain/territory";

export type ListingKind = "sale" | "barter" | "donation" | "gift";

export type ListingSummary = {
  title: string;
  kind: ListingKind;
  kindLabel: string;
  priceLabel: string;
  location: PublicLocation;
  trustLabel: string;
};
