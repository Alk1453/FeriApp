import type { ListingSummary } from "../domain/listing";
import { listingSummaryListSchema } from "../domain/listing.schema";
import { getPublications } from "./get-publications";

export function getNearbyListings(): ListingSummary[] {
  const listings = getPublications().map(
    ({
      id,
      slug,
      title,
      kind,
      kindLabel,
      priceLabel,
      category,
      location,
      trustLabel,
      status,
    }) => ({
      id,
      slug,
      title,
      kind,
      kindLabel,
      priceLabel,
      category,
      location,
      trustLabel,
      status,
    }),
  );

  return listingSummaryListSchema.parse(listings);
}
