import type { Publication, ListingSummary } from "../domain/listing";
import type { UserAccessTier } from "@/modules/platform/domain/user-access";

type LocationDisclosureInput = {
  item: Pick<ListingSummary | Publication, "location">;
  tier: UserAccessTier;
};

function getVisitorDistanceBucket(distanceLabel: string) {
  const normalized = distanceLabel.replace(",", ".").toLowerCase();
  const numericValue = Number.parseFloat(normalized);

  if (Number.isNaN(numericValue)) {
    return "cerca de tu zona";
  }

  const meters = normalized.includes("km") ? numericValue * 1000 : numericValue;
  const bucketKm = Math.max(1, Math.ceil(meters / 1000));

  return `a menos de ${bucketKm} km`;
}

export function getLocationDisclosure({
  item,
  tier,
}: LocationDisclosureInput) {
  if (tier === "visitor") {
    return {
      label: getVisitorDistanceBucket(item.location.distanceLabel),
      detail: "Crea tu cuenta gratuita para ver barrio y contactar.",
      precision: "partial",
    } as const;
  }

  if (tier === "trusted-user") {
    return {
      label: `${item.location.neighborhood}, aprox. ${item.location.distanceLabel}`,
      detail: "Puedes solicitar coordinacion avanzada si el propietario acepta.",
      precision: "advanced",
    } as const;
  }

  return {
    label: `${item.location.neighborhood}, aprox. ${item.location.distanceLabel}`,
    detail: "La ubicacion exacta se comparte solo con consentimiento.",
    precision: "approximate",
  } as const;
}
