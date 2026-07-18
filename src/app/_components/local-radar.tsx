"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type { ListingSummary } from "@/modules/marketplace/domain/listing";
import { getLocationDisclosure } from "@/modules/marketplace/application/get-location-disclosure";
import {
  readLocalAccount,
  readLocalZone,
  subscribeToLocalSession,
} from "@/modules/platform/application/local-session";
import {
  getUserAccessProfile,
  trustedUserPreview,
} from "@/modules/platform/domain/user-access";

type LocalRadarProps = {
  listings: ListingSummary[];
};

const pointPositions = [
  "left-[18%] top-[34%]",
  "left-[62%] top-[24%]",
  "left-[48%] top-[68%]",
];

export function LocalRadar({ listings }: LocalRadarProps) {
  const account = useSyncExternalStore(
    subscribeToLocalSession,
    readLocalAccount,
    () => null,
  );
  const zone = useSyncExternalStore(subscribeToLocalSession, readLocalZone, () => null);
  const [showTrustedPreview, setShowTrustedPreview] = useState(false);

  const accessProfile = useMemo(
    () =>
      showTrustedPreview
        ? trustedUserPreview
        : getUserAccessProfile({ account, zone }),
    [account, showTrustedPreview, zone],
  );

  return (
    <section className="overflow-hidden rounded-lg border border-primary/20 bg-white shadow-[0_18px_50px_rgba(32,35,31,0.08)]">
      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[0.82fr_1.18fr] lg:p-7">
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="ui-chip ui-chip-success">Radar local</span>
            <span className="ui-chip ui-chip-info">{accessProfile.label}</span>
          </div>

          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Oportunidades cerca, sin exponer ubicaciones privadas.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Descubre ventas, trueques, donaciones y servicios alrededor tuyo. La
            precision aumenta con cuenta, confianza y consentimiento.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link className="ui-button ui-button-primary" href="/publicaciones">
              Explorar radar
            </Link>
            {account ? (
              <Link className="ui-button ui-button-secondary" href="/publicaciones/nueva">
                Publicar cerca
              </Link>
            ) : (
              <Link className="ui-button ui-button-secondary" href="/cuenta">
                Crear cuenta gratuita
              </Link>
            )}
          </div>

          <button
            className="mt-4 text-sm font-extrabold text-primary-strong"
            onClick={() => setShowTrustedPreview((current) => !current)}
            type="button"
          >
            {showTrustedPreview
              ? "Ver como usuario actual"
              : "Previsualizar usuario de confianza"}
          </button>
        </div>

        <div className="rounded-lg border border-border-soft bg-surface-soft p-3">
          <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-[radial-gradient(circle_at_center,#ffffff_0,#f1f4ee_40%,#e8f3ea_100%)] sm:min-h-[430px] lg:min-h-[520px]">
            <div className="absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
            <div className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15" />
            <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
            <div className="absolute left-1/2 top-1/2 z-10 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_10px_rgba(47,125,58,0.14)]" />
            <span className="absolute left-1/2 top-[calc(50%+18px)] -translate-x-1/2 text-[11px] font-extrabold text-primary-strong">
              Tu zona
            </span>

            {listings.slice(0, 3).map((item, index) => {
              const disclosure = getLocationDisclosure({
                item,
                tier: accessProfile.tier,
              });

              return (
                <Link
                  className={`absolute ${pointPositions[index]} group z-20 flex max-w-44 items-start gap-2 rounded-lg border border-border-soft bg-white/95 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary`}
                  href={`/publicaciones/${item.slug}`}
                  key={item.id}
                >
                  <span className="mt-1 size-2.5 rounded-full bg-accent" />
                  <span>
                    <span className="block text-xs font-extrabold leading-4">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[11px] font-bold text-primary-strong">
                      {disclosure.label}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-2 border-t border-border-soft bg-white px-5 py-4 md:grid-cols-3">
        {listings.slice(0, 3).map((item) => {
          const disclosure = getLocationDisclosure({
            item,
            tier: accessProfile.tier,
          });

          return (
            <Link
              className="rounded-md border border-border-soft p-3 transition hover:border-primary hover:bg-primary-soft"
              href={`/publicaciones/${item.slug}`}
              key={item.id}
            >
              <span className="ui-chip ui-chip-warning">{item.kindLabel}</span>
              <h3 className="mt-2 text-sm font-extrabold">{item.title}</h3>
              <p className="mt-1 text-sm font-bold text-primary-strong">
                {disclosure.label}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">{disclosure.detail}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
