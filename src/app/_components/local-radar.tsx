"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type {
  ListingKind,
  ListingSummary,
} from "@/modules/marketplace/domain/listing";
import { getLocationDisclosure } from "@/modules/marketplace/application/get-location-disclosure";
import { getLocalOpportunityRequests } from "@/modules/radar/application/get-local-opportunity-requests";
import { matchOpportunityRequests } from "@/modules/radar/application/match-opportunity-requests";
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
  variant?: "full" | "hero";
};

type RadarMode = "all" | "offers" | "needs" | "barter";

type RadarSignal = {
  id: string;
  title: string;
  href: string;
  label: string;
  tone: "offer" | "need" | "barter";
};

const radarModes: {
  value: RadarMode;
  label: string;
  hint: string;
  kinds: ListingKind[];
}[] = [
  {
    value: "all",
    label: "Todo",
    hint: "Ofertas, servicios y búsquedas.",
    kinds: ["sale", "barter", "donation", "gift", "service", "need"],
  },
  {
    value: "offers",
    label: "Ofertas",
    hint: "Lo que alguien vende, dona o ofrece.",
    kinds: ["sale", "donation", "gift", "service"],
  },
  {
    value: "needs",
    label: "Buscan",
    hint: "Necesidades publicadas cerca.",
    kinds: ["need"],
  },
  {
    value: "barter",
    label: "Trueque",
    hint: "Oportunidades para intercambio.",
    kinds: ["barter"],
  },
];

const pointPositions = [
  "left-[18%] top-[34%]",
  "left-[62%] top-[24%]",
  "left-[48%] top-[68%]",
  "left-[25%] top-[72%]",
  "left-[72%] top-[58%]",
];

function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getSignalTone(kind: ListingKind): RadarSignal["tone"] {
  if (kind === "need") {
    return "need";
  }

  if (kind === "barter") {
    return "barter";
  }

  return "offer";
}

function getSignalDotClass(tone: RadarSignal["tone"]): string {
  if (tone === "need") {
    return "bg-[#7c5cff]";
  }

  if (tone === "barter") {
    return "bg-[#f08a24]";
  }

  return "bg-accent";
}

export function LocalRadar({ listings, variant = "full" }: LocalRadarProps) {
  const account = useSyncExternalStore(
    subscribeToLocalSession,
    readLocalAccount,
    () => null,
  );
  const zone = useSyncExternalStore(subscribeToLocalSession, readLocalZone, () => null);
  const [showTrustedPreview, setShowTrustedPreview] = useState(false);
  const [activeMode, setActiveMode] = useState<RadarMode>("all");
  const [query, setQuery] = useState("");
  const requests = useMemo(() => getLocalOpportunityRequests(), []);
  const selectedMode = useMemo(
    () => radarModes.find((mode) => mode.value === activeMode) ?? radarModes[0],
    [activeMode],
  );

  const accessProfile = useMemo(
    () =>
      showTrustedPreview
        ? trustedUserPreview
        : getUserAccessProfile({ account, zone }),
    [account, showTrustedPreview, zone],
  );
  const hero = variant === "hero";
  const normalizedQuery = normalizeSearch(query);
  const filteredListings = useMemo(
    () =>
      listings.filter((item) => {
        const matchesMode = selectedMode.kinds.includes(item.kind);
        const searchable = normalizeSearch(
          `${item.title} ${item.kindLabel} ${item.category} ${item.priceLabel}`,
        );
        const matchesQuery =
          normalizedQuery.length === 0 || searchable.includes(normalizedQuery);

        return matchesMode && matchesQuery;
      }),
    [listings, normalizedQuery, selectedMode],
  );
  const filteredRequests = useMemo(
    () =>
      requests.filter((request) => {
        const matchesMode =
          activeMode === "all" ||
          activeMode === "needs" ||
          activeMode === "barter";
        const searchable = normalizeSearch(
          `${request.title} ${request.categoryLabel} ${request.intentLabel} ${request.matchHint}`,
        );
        const matchesQuery =
          normalizedQuery.length === 0 || searchable.includes(normalizedQuery);
        const matchesBarter =
          activeMode !== "barter" ||
          normalizeSearch(request.intentLabel).includes("trueque");

        return matchesMode && matchesQuery && matchesBarter;
      }),
    [activeMode, normalizedQuery, requests],
  );
  const opportunityMatches = useMemo(
    () =>
      matchOpportunityRequests({
        listings,
        requests: filteredRequests,
      }),
    [filteredRequests, listings],
  );
  const matchesByRequestId = useMemo(
    () =>
      new Map(
        opportunityMatches.map((match) => [match.request.id, match.listings]),
      ),
    [opportunityMatches],
  );
  const visibleListings = filteredListings.slice(0, 3);
  const visibleRequests = filteredRequests.slice(0, 2);
  const publishNeedHref = `/publicaciones/nueva?tipo=need${
    query.trim().length > 0
      ? `&titulo=${encodeURIComponent(query.trim())}`
      : ""
  }`;
  const listingSignals: RadarSignal[] = visibleListings.map((item) => ({
    id: item.id,
    title: item.title,
    href: `/publicaciones/${item.slug}`,
    label: item.kindLabel,
    tone: getSignalTone(item.kind),
  }));
  const requestSignals: RadarSignal[] = visibleRequests.map((request) => ({
    id: request.id,
    title: request.title,
    href: `/publicaciones/nueva?tipo=need&titulo=${encodeURIComponent(
      request.title,
    )}`,
    label: request.intentLabel,
    tone: request.intentLabel.toLowerCase().includes("trueque")
      ? "barter"
      : "need",
  }));
  const radarSignals: RadarSignal[] = [
    ...listingSignals,
    ...requestSignals,
  ].slice(0, pointPositions.length);
  const resultCount = filteredListings.length + filteredRequests.length;

  return (
    <section className="overflow-hidden rounded-lg border border-primary/20 bg-white shadow-[0_18px_50px_rgba(32,35,31,0.08)]">
      <div
        className={`grid gap-5 p-5 sm:p-6 lg:p-7 ${
          hero ? "lg:grid-cols-1" : "lg:grid-cols-[0.82fr_1.18fr]"
        }`}
      >
        {hero ? null : (
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="ui-chip ui-chip-success">Radar local</span>
              <span className="ui-chip ui-chip-info">{accessProfile.label}</span>
            </div>

            <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
              Lo que queres o necesitas, oportunidades cerca.
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
        )}

        <div className="rounded-lg border border-border-soft bg-surface-soft p-3">
          <div className="mb-3 grid gap-3 rounded-md bg-white p-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase text-primary-strong">
                  Radar interactivo
                </p>
                <p className="mt-1 text-sm font-semibold text-muted">
                  {selectedMode.hint}
                </p>
              </div>
              <span className="ui-chip ui-chip-info w-fit">
                {resultCount} señales
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <input
                className="ui-field px-3 text-sm"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ej: bicicleta, electricista, herramientas"
                value={query}
              />
              <Link
                className="ui-button ui-button-secondary min-h-11 px-3 py-2"
                href={publishNeedHref}
              >
                Publicar búsqueda
              </Link>
            </div>

            <div className="grid gap-2 sm:grid-cols-4">
              {radarModes.map((mode) => (
                <button
                  className={`rounded-md border px-3 py-2 text-sm font-extrabold transition ${
                    activeMode === mode.value
                      ? "border-primary bg-primary text-white"
                      : "border-border-soft bg-white text-foreground hover:border-primary"
                  }`}
                  key={mode.value}
                  onClick={() => setActiveMode(mode.value)}
                  type="button"
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`relative overflow-hidden rounded-lg bg-[radial-gradient(circle_at_center,#ffffff_0,#f1f4ee_40%,#e8f3ea_100%)] ${
              hero ? "min-h-[380px] sm:min-h-[480px]" : "min-h-[360px] sm:min-h-[430px] lg:min-h-[520px]"
            }`}
          >
            <div className="absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
            <div className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15" />
            <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
            <div className="absolute left-1/2 top-1/2 z-10 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_10px_rgba(47,125,58,0.14)]" />
            <span className="absolute left-1/2 top-[calc(50%+18px)] -translate-x-1/2 text-[11px] font-extrabold text-primary-strong">
              Tu zona
            </span>

            {radarSignals.map((signal, index) => (
              <Link
                className={`absolute ${pointPositions[index]} group z-20 flex max-w-44 items-start gap-2 rounded-lg border border-border-soft bg-white/95 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary`}
                href={signal.href}
                key={signal.id}
              >
                <span
                  className={`mt-1 size-2.5 rounded-full ${getSignalDotClass(
                    signal.tone,
                  )}`}
                />
                <span>
                  <span className="block text-xs font-extrabold leading-4">
                    {signal.title}
                  </span>
                  <span className="mt-1 block text-[11px] font-bold text-primary-strong">
                    {signal.label}
                  </span>
                </span>
              </Link>
            ))}

            {radarSignals.length === 0 ? (
              <div className="absolute inset-x-4 top-1/2 z-20 -translate-y-1/2 rounded-lg border border-border-soft bg-white/95 p-4 text-center shadow-sm">
                <p className="text-sm font-extrabold">
                  Todavía no hay señales con ese filtro.
                </p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Publicá una búsqueda para que el barrio pueda responder.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-2 border-t border-border-soft bg-white px-5 py-4 md:grid-cols-3">
        {visibleListings.map((item) => {
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
        {visibleListings.length === 0 ? (
          <div className="rounded-md border border-border-soft p-3 md:col-span-3">
            <p className="text-sm font-extrabold">Sin ofertas para este filtro.</p>
            <p className="mt-1 text-xs leading-5 text-muted">
              Probá otra palabra o cambiá el modo del radar.
            </p>
          </div>
        ) : null}
      </div>

      <div className="border-t border-border-soft bg-accent-soft px-5 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-extrabold">
              Busquedas y necesidades cerca
            </h3>
            <p className="text-sm leading-6 text-muted">
              El radar tambien muestra demanda real: quien busca, necesita o
              aceptaria trueque.
            </p>
          </div>
          <Link className="ui-button ui-button-secondary" href={publishNeedHref}>
            Publicar busqueda
          </Link>
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {filteredRequests.map((request) => (
            <article
              className="rounded-md border border-white/70 bg-white p-3"
              key={request.id}
            >
              <div className="flex flex-wrap gap-2">
                <span className="ui-chip ui-chip-info">
                  {request.categoryLabel}
                </span>
                <span className="ui-chip ui-chip-warning">
                  {request.intentLabel}
                </span>
              </div>
              <h4 className="mt-3 text-sm font-extrabold">{request.title}</h4>
              <p className="mt-1 text-sm font-bold text-primary-strong">
                {request.distanceHint}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                {request.matchHint}
              </p>
              <div className="mt-3 space-y-2">
                {(matchesByRequestId.get(request.id) ?? []).map((match) => (
                  <Link
                    className="block rounded-md border border-border-soft bg-surface-soft p-2 transition hover:border-primary hover:bg-primary-soft"
                    href={`/publicaciones/${match.listing.slug}`}
                    key={match.listing.id}
                  >
                    <span className="text-[11px] font-extrabold uppercase text-primary-strong">
                      Coincidencia sugerida
                    </span>
                    <span className="mt-1 block text-xs font-bold">
                      {match.listing.title}
                    </span>
                    <span className="mt-1 block text-[11px] leading-4 text-muted">
                      {match.reason}
                    </span>
                  </Link>
                ))}
              </div>
            </article>
          ))}
          {filteredRequests.length === 0 ? (
            <article className="rounded-md border border-white/70 bg-white p-3 md:col-span-3">
              <h4 className="text-sm font-extrabold">
                Sin búsquedas visibles con este filtro.
              </h4>
              <p className="mt-1 text-xs leading-5 text-muted">
                Usá “Publicar búsqueda” para crear una necesidad concreta.
              </p>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
