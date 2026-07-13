import {
  localAccountSchema,
  localZoneSchema,
  type LocalAccount,
  type LocalZone,
} from "../domain/local-session.schema";

export const localAccountStorageKey = "feriapp.local-account.v1";
export const localZoneStorageKey = "feriapp.local-zone.v1";

export function subscribeToLocalSession(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("feriapp-local-session", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("feriapp-local-session", onStoreChange);
  };
}

function notifyLocalSessionChange() {
  window.dispatchEvent(new Event("feriapp-local-session"));
}

export function readLocalAccount(): LocalAccount | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(localAccountStorageKey);
  if (!raw) {
    return null;
  }

  return localAccountSchema.parse(JSON.parse(raw));
}

export function saveLocalAccount(input: {
  displayName: string;
  phoneOrEmail: string;
}): LocalAccount {
  const account = localAccountSchema.parse({
    id: `account-${Date.now()}`,
    displayName: input.displayName,
    phoneOrEmail: input.phoneOrEmail,
    createdAt: new Date().toISOString(),
  });

  window.localStorage.setItem(localAccountStorageKey, JSON.stringify(account));
  notifyLocalSessionChange();

  return account;
}

export function readLocalZone(): LocalZone | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(localZoneStorageKey);
  if (!raw) {
    return null;
  }

  return localZoneSchema.parse(JSON.parse(raw));
}

export function saveLocalZone(input: {
  locality: string;
  neighborhood: string;
  source: LocalZone["source"];
}): LocalZone {
  const zone = localZoneSchema.parse({
    locality: input.locality,
    neighborhood: input.neighborhood,
    approximateRadiusLabel: "Radio aproximado de 1 a 2 km",
    source: input.source,
  });

  window.localStorage.setItem(localZoneStorageKey, JSON.stringify(zone));
  notifyLocalSessionChange();

  return zone;
}
