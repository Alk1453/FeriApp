"use client";

import { useMemo, useState } from "react";
import { publicationDraftSchema } from "@/modules/marketplace/domain/listing.schema";

const publicationKinds = [
  {
    value: "sale",
    label: "Venta",
    hint: "Precio definido y contacto simple.",
    pricePlaceholder: "$48.000",
  },
  {
    value: "barter",
    label: "Trueque",
    hint: "Intercambio por otra cosa o servicio.",
    pricePlaceholder: "Acepto herramientas",
  },
  {
    value: "donation",
    label: "Donacion",
    hint: "Entrega gratuita con prioridad comunitaria.",
    pricePlaceholder: "Gratis",
  },
  {
    value: "gift",
    label: "Regalo",
    hint: "Para retirar sin intercambio.",
    pricePlaceholder: "Gratis, retirar hoy",
  },
  {
    value: "service",
    label: "Servicio",
    hint: "Oficio, reparacion, flete o ayuda local.",
    pricePlaceholder: "Desde $10.000",
  },
] as const;

const categories = [
  { value: "home", label: "Hogar" },
  { value: "transport", label: "Transporte" },
  { value: "books", label: "Libros" },
  { value: "clothing", label: "Indumentaria" },
  { value: "tools", label: "Herramientas" },
  { value: "services", label: "Servicios" },
  { value: "other", label: "Otro" },
] as const;

const contactModes = [
  {
    value: "whatsapp",
    label: "WhatsApp directo",
    hint: "Menor friccion. Ideal para primeras pruebas.",
    signal: "direct",
  },
  {
    value: "in-app",
    label: "Propuesta dentro de FeriApp",
    hint: "Permite medir interesados antes de compartir datos.",
    signal: "lead",
  },
  {
    value: "feriapp-mediated",
    label: "Mediado por FeriApp",
    hint: "Base futura para comision, reserva o proteccion.",
    signal: "transaction",
  },
  {
    value: "phone",
    label: "Telefono",
    hint: "Simple, pero menos medible para la plataforma.",
    signal: "direct",
  },
] as const;

type PublicationKind = (typeof publicationKinds)[number]["value"];
type PublicationCategory = (typeof categories)[number]["value"];
type ContactMode = (typeof contactModes)[number]["value"];

type DraftState = {
  title: string;
  description: string;
  kind: PublicationKind;
  category: PublicationCategory;
  priceLabel: string;
  locality: string;
  neighborhood: string;
  imageCount: number;
  contactMode: ContactMode;
};

const initialDraft: DraftState = {
  title: "",
  description: "",
  kind: "sale",
  category: "home",
  priceLabel: "",
  locality: "",
  neighborhood: "",
  imageCount: 0,
  contactMode: "whatsapp",
};

function getContactMode(value: ContactMode) {
  return contactModes.find((mode) => mode.value === value) ?? contactModes[0];
}

function getKind(value: PublicationKind) {
  return publicationKinds.find((kind) => kind.value === value) ?? publicationKinds[0];
}

export function NewPublicationForm() {
  const [draft, setDraft] = useState<DraftState>(initialDraft);
  const selectedKind = getKind(draft.kind);
  const selectedContact = getContactMode(draft.contactMode);

  const validation = useMemo(
    () =>
      publicationDraftSchema.safeParse({
        title: draft.title,
        description: draft.description,
        kind: draft.kind,
        category: draft.category,
        priceLabel: draft.priceLabel,
        locality: draft.locality,
        neighborhood: draft.neighborhood,
        imageCount: draft.imageCount,
        contact: {
          preferredChannel: selectedContact.value,
          label: selectedContact.label,
          monetizationSignal: selectedContact.signal,
        },
      }),
    [draft, selectedContact],
  );

  const completion = validation.success
    ? "Lista para guardar"
    : `${Math.max(0, 7 - validation.error.issues.length)}/7 datos clave`;

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1fr_380px]">
      <form className="rounded-lg border border-[#d9d0c0] bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 border-b border-[#e7dfd1] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Nueva publicacion</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#69665f]">
              Crea una publicacion clara, cercana y compartible sin exponer tu
              ubicacion exacta.
            </p>
          </div>
          <span className="w-fit rounded-md bg-[#e8f1df] px-3 py-1 text-sm font-bold text-[#355d2d]">
            {completion}
          </span>
        </div>

        <div className="mt-6 grid gap-5">
          <label className="grid gap-2 text-sm font-bold">
            Titulo
            <input
              className="h-12 rounded-md border border-[#d4c8b7] px-3 font-normal outline-none focus:border-[#193f3a]"
              onChange={(event) =>
                setDraft((current) => ({ ...current, title: event.target.value }))
              }
              placeholder="Ej: Silla de comedor para donar"
              value={draft.title}
            />
          </label>

          <label className="grid gap-2 text-sm font-bold">
            Descripcion
            <textarea
              className="min-h-32 rounded-md border border-[#d4c8b7] px-3 py-3 font-normal leading-6 outline-none focus:border-[#193f3a]"
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="Contale al barrio que ofreces, estado, condiciones y como se coordina."
              value={draft.description}
            />
          </label>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold">Tipo de publicacion</legend>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
              {publicationKinds.map((kind) => (
                <button
                  className={`min-h-24 rounded-md border p-3 text-left text-sm transition ${
                    draft.kind === kind.value
                      ? "border-[#193f3a] bg-[#e8f1df]"
                      : "border-[#d4c8b7] bg-white hover:bg-[#f5f1e8]"
                  }`}
                  key={kind.value}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      kind: kind.value,
                      priceLabel: current.priceLabel || kind.pricePlaceholder,
                    }))
                  }
                  type="button"
                >
                  <span className="font-bold">{kind.label}</span>
                  <span className="mt-1 block leading-5 text-[#69665f]">
                    {kind.hint}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              Categoria
              <select
                className="h-12 rounded-md border border-[#d4c8b7] bg-white px-3 font-normal outline-none focus:border-[#193f3a]"
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    category: event.target.value as PublicationCategory,
                  }))
                }
                value={draft.category}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Precio o condicion
              <input
                className="h-12 rounded-md border border-[#d4c8b7] px-3 font-normal outline-none focus:border-[#193f3a]"
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    priceLabel: event.target.value,
                  }))
                }
                placeholder={selectedKind.pricePlaceholder}
                value={draft.priceLabel}
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              Localidad
              <input
                className="h-12 rounded-md border border-[#d4c8b7] px-3 font-normal outline-none focus:border-[#193f3a]"
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    locality: event.target.value,
                  }))
                }
                placeholder="San Martin"
                value={draft.locality}
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Barrio visible
              <input
                className="h-12 rounded-md border border-[#d4c8b7] px-3 font-normal outline-none focus:border-[#193f3a]"
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    neighborhood: event.target.value,
                  }))
                }
                placeholder="Barrio Centro"
                value={draft.neighborhood}
              />
            </label>
          </div>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold">Imagenes</legend>
            <div className="rounded-md border border-dashed border-[#c7bda9] bg-[#fdfbf6] p-4">
              <p className="text-sm font-semibold">Agregar fotos del producto</p>
              <p className="mt-1 text-sm leading-6 text-[#69665f]">
                En esta version demo contamos fotos; luego se conectara Storage.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <button
                  className="size-10 rounded-md border border-[#cfc3b0] text-lg font-bold"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      imageCount: Math.max(0, current.imageCount - 1),
                    }))
                  }
                  type="button"
                >
                  -
                </button>
                <span className="min-w-24 text-center text-sm font-bold">
                  {draft.imageCount} / 6 fotos
                </span>
                <button
                  className="size-10 rounded-md border border-[#cfc3b0] text-lg font-bold"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      imageCount: Math.min(6, current.imageCount + 1),
                    }))
                  }
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </fieldset>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold">Forma de contacto</legend>
            <div className="grid gap-2 md:grid-cols-2">
              {contactModes.map((mode) => (
                <button
                  className={`rounded-md border p-3 text-left text-sm transition ${
                    draft.contactMode === mode.value
                      ? "border-[#193f3a] bg-[#e8f1df]"
                      : "border-[#d4c8b7] bg-white hover:bg-[#f5f1e8]"
                  }`}
                  key={mode.value}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      contactMode: mode.value,
                    }))
                  }
                  type="button"
                >
                  <span className="font-bold">{mode.label}</span>
                  <span className="mt-1 block leading-5 text-[#69665f]">
                    {mode.hint}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <p className="text-sm leading-6 text-[#69665f]">
              Al publicar, FeriApp mostrara zona aproximada y mantendra la
              ubicacion exacta privada por defecto.
            </p>
            <button
              className="h-12 rounded-md bg-[#193f3a] px-5 text-sm font-bold text-white transition hover:bg-[#102d29]"
              type="button"
            >
              Guardar borrador
            </button>
          </div>
        </div>
      </form>

      <aside className="flex flex-col gap-6">
        <section className="rounded-lg border border-[#d9d0c0] bg-white p-5">
          <h2 className="text-lg font-bold">Vista previa</h2>
          <div className="mt-4 rounded-lg border border-[#e3dacb] bg-[#fdfbf6] p-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-[#f6e6d9] px-2.5 py-1 text-xs font-bold text-[#8d3c28]">
                {selectedKind.label}
              </span>
              <span className="rounded-md bg-[#e8f1df] px-2.5 py-1 text-xs font-bold text-[#355d2d]">
                Zona aproximada
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold">
              {draft.title || "Titulo de la publicacion"}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#69665f]">
              {draft.description ||
                "La descripcion ayudara a que un vecino entienda estado, condicion y forma de coordinar."}
            </p>
            <p className="mt-4 font-bold">
              {draft.priceLabel || selectedKind.pricePlaceholder}
            </p>
            <p className="mt-1 text-sm text-[#69665f]">
              {(draft.neighborhood || "Barrio visible") +
                ", " +
                (draft.locality || "Localidad")}
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-[#d9d0c0] bg-[#193f3a] p-5 text-white">
          <h2 className="text-lg font-bold">Contacto y monetizacion futura</h2>
          <p className="mt-2 text-sm leading-6 text-[#dbe9df]">
            El contacto elegido queda marcado como senal de negocio, sin cobrar
            todavia ni cerrar una regla prematura.
          </p>
          <div className="mt-4 rounded-md bg-white/10 p-3">
            <p className="text-xs font-bold uppercase text-[#f4c86b]">
              Senal actual
            </p>
            <p className="mt-1 text-sm font-semibold">
              {selectedContact.signal}
            </p>
          </div>
        </section>
      </aside>
    </section>
  );
}
