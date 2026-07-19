import type { ListingSummary } from "@/modules/marketplace/domain/listing";
import type { LocalOpportunityRequest } from "./get-local-opportunity-requests";

export type OpportunityMatch = {
  request: LocalOpportunityRequest;
  listings: {
    listing: ListingSummary;
    score: number;
    reason: string;
  }[];
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getListingText(listing: ListingSummary): string {
  return normalize(
    `${listing.title} ${listing.kindLabel} ${listing.category} ${listing.priceLabel}`,
  );
}

function getMatchScore(
  request: LocalOpportunityRequest,
  listing: ListingSummary,
): number {
  let score = 0;

  if (request.category === listing.category) {
    score += 3;
  }

  const listingText = getListingText(listing);
  for (const keyword of request.keywords) {
    if (listingText.includes(normalize(keyword))) {
      score += 1;
    }
  }

  if (
    normalize(request.intentLabel).includes("trueque") &&
    listing.kind === "barter"
  ) {
    score += 2;
  }

  return score;
}

function getMatchReason(
  request: LocalOpportunityRequest,
  listing: ListingSummary,
): string {
  if (request.category === listing.category) {
    return "Coincide por categoria y cercania";
  }

  if (
    normalize(request.intentLabel).includes("trueque") &&
    listing.kind === "barter"
  ) {
    return "Puede servir como propuesta de trueque";
  }

  return "Coincide por palabras clave";
}

export function matchOpportunityRequests({
  listings,
  requests,
}: {
  listings: ListingSummary[];
  requests: LocalOpportunityRequest[];
}): OpportunityMatch[] {
  return requests.map((request) => ({
    request,
    listings: listings
      .filter((listing) => listing.status === "active")
      .map((listing) => ({
        listing,
        score: getMatchScore(request, listing),
        reason: getMatchReason(request, listing),
      }))
      .filter((match) => match.score > 0)
      .sort((first, second) => second.score - first.score)
      .slice(0, 2),
  }));
}
