"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { Publication } from "@/modules/marketplace/domain/listing";
import { getLocationDisclosure } from "@/modules/marketplace/application/get-location-disclosure";
import {
  readLocalAccount,
  readLocalZone,
  subscribeToLocalSession,
} from "@/modules/platform/application/local-session";
import { getUserAccessProfile } from "@/modules/platform/domain/user-access";

type LocationDisclosurePanelProps = {
  publication: Publication;
};

export function LocationDisclosurePanel({
  publication,
}: LocationDisclosurePanelProps) {
  const account = useSyncExternalStore(
    subscribeToLocalSession,
    readLocalAccount,
    () => null,
  );
  const zone = useSyncExternalStore(subscribeToLocalSession, readLocalZone, () => null);

  const accessProfile = useMemo(
    () => getUserAccessProfile({ account, zone }),
    [account, zone],
  );
  const disclosure = getLocationDisclosure({
    item: publication,
    tier: accessProfile.tier,
  });

  return (
    <section className="ui-surface-soft mt-6 grid gap-3 p-4 sm:grid-cols-2">
      <div>
        <p className="text-xs font-bold uppercase text-muted">
          Ubicacion visible
        </p>
        <p className="mt-1 font-semibold">{disclosure.label}</p>
        <p className="mt-1 text-xs leading-5 text-muted">{disclosure.detail}</p>
      </div>
      <div>
        <p className="text-xs font-bold uppercase text-muted">Contacto</p>
        <p className="mt-1 font-semibold">{publication.contact.label}</p>
        <p className="mt-1 text-xs leading-5 text-muted">
          Nivel actual: {accessProfile.label}
        </p>
      </div>
    </section>
  );
}
