"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  readLocalAccount,
  readLocalZone,
  subscribeToLocalSession,
} from "@/modules/platform/application/local-session";
import {
  getUserAccessProfile,
  trustedUserPreview,
} from "@/modules/platform/domain/user-access";

const accessRows = [
  {
    title: "Visitante",
    text: "Explora oportunidades cercanas con distancia parcial. No contacta ni ve ubicacion precisa.",
  },
  {
    title: "Cuenta gratuita",
    text: "Puede publicar, contactar, guardar y ver barrio con distancia aproximada.",
  },
  {
    title: "Usuario de confianza",
    text: "Futuro nivel para coordinacion avanzada, logistica y mas precision con consentimiento.",
  },
];

export function UserAccessSummary() {
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

  return (
    <section className="mt-6 rounded-lg border border-border-soft bg-surface-soft p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">Nivel de usuario</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            FeriApp aumenta permisos por confianza, no por exponer datos.
          </p>
        </div>
        <span className="ui-chip ui-chip-info">{accessProfile.label}</span>
      </div>

      <div className="mt-4 grid gap-3">
        {accessRows.map((row) => {
          const active =
            row.title === accessProfile.label ||
            (!account && row.title === "Visitante") ||
            (accessProfile.tier === trustedUserPreview.tier &&
              row.title === trustedUserPreview.label);

          return (
            <article
              className={`rounded-md border p-3 ${
                active
                  ? "border-primary bg-primary-soft text-primary-strong"
                  : "border-border-soft bg-white"
              }`}
              key={row.title}
            >
              <h3 className="text-sm font-extrabold">{row.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{row.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
