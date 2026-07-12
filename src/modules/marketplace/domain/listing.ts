import type { PublicLocation } from "@/shared/domain/territory";

export type ListingKind = "sale" | "barter" | "donation" | "gift" | "service";

export type PublicationStatus = "draft" | "active" | "reserved" | "closed";

export type PublicationCategory =
  | "home"
  | "transport"
  | "books"
  | "clothing"
  | "tools"
  | "services"
  | "other";

export type ListingSummary = {
  id: string;
  slug: string;
  title: string;
  kind: ListingKind;
  kindLabel: string;
  priceLabel: string;
  category: PublicationCategory;
  location: PublicLocation;
  trustLabel: string;
  status: PublicationStatus;
};

export type PublicationContact = {
  preferredChannel: "whatsapp" | "in-app" | "phone";
  label: string;
};

export type Publication = ListingSummary & {
  description: string;
  createdAt: string;
  imageUrl: string;
  shareUrl: string;
  contact: PublicationContact;
  publicNotes: string[];
};
