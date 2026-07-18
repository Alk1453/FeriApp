import type { LocalAccount, LocalZone } from "./local-session.schema";

export type UserAccessTier = "visitor" | "free-account" | "trusted-user";

export type UserAccessProfile = {
  tier: UserAccessTier;
  label: string;
  locationPrecisionLabel: string;
  canContact: boolean;
  canPublish: boolean;
  canSave: boolean;
  canRequestLogistics: boolean;
  canRequestMorePreciseLocation: boolean;
};

export function getUserAccessProfile(input: {
  account: LocalAccount | null;
  zone: LocalZone | null;
}): UserAccessProfile {
  if (!input.account) {
    return {
      tier: "visitor",
      label: "Visitante",
      locationPrecisionLabel: "Distancia parcial",
      canContact: false,
      canPublish: false,
      canSave: false,
      canRequestLogistics: false,
      canRequestMorePreciseLocation: false,
    };
  }

  if (input.account.accessTier === "trusted-user") {
    return trustedUserPreview;
  }

  return {
    tier: "free-account",
    label: "Cuenta gratuita",
    locationPrecisionLabel: input.zone ? "Barrio y distancia aproximada" : "Zona pendiente",
    canContact: true,
    canPublish: true,
    canSave: true,
    canRequestLogistics: false,
    canRequestMorePreciseLocation: false,
  };
}

export const trustedUserPreview: UserAccessProfile = {
  tier: "trusted-user",
  label: "Usuario de confianza",
  locationPrecisionLabel: "Coordinacion avanzada con consentimiento",
  canContact: true,
  canPublish: true,
  canSave: true,
  canRequestLogistics: true,
  canRequestMorePreciseLocation: true,
};
