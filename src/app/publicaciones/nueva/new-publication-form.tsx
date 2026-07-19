"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createLocalPublication,
  saveLocalPublication,
} from "@/modules/marketplace/application/local-publications";
import { publicationDraftSchema } from "@/modules/marketplace/domain/listing.schema";
import {
  readLocalAccount,
  readLocalZone,
  subscribeToLocalSession,
} from "@/modules/platform/application/local-session";

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
  {
    value: "need",
    label: "Busco / necesito",
    hint: "Pedido visible para que el barrio pueda ofrecer.",
    pricePlaceholder: "Busco usado o por trueque",
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
  privateLocationNote: string;
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
  privateLocationNote: "",
  imageCount: 0,
  contactMode: "whatsapp",
};

function getContactMode(value: ContactMode) {
  return contactModes.find((mode) => mode.value === value) ?? contactModes[0];
}

function getKind(value: PublicationKind) {
  return publicationKinds.find((kind) => kind.value === value) ?? publicationKinds[0];
}

function parsePublicationKind(value?: string): PublicationKind {
  return publicationKinds.some((kind) => kind.value === value)
    ? (value as PublicationKind)
    : "sale";
}

function getInitialDraft(initialKind?: string, initialTitle?: string): DraftState {
  const kind = parsePublicationKind(initialKind);
  const selectedKind =
    publicationKinds.find((item) => item.value === kind) ?? publicationKinds[0];
  const cleanTitle = initialTitle?.trim().slice(0, 90) ?? "";

  return {
    ...initialDraft,
    kind,
    title: cleanTitle,
    priceLabel: kind === "need" ? selectedKind.pricePlaceholder : "",
    contactMode: kind === "need" ? "in-app" : "whatsapp",
  };
}

export function NewPublicationForm() {
  const router = useRouter();
  const account = useSyncExternalStore(
    subscribeToLocalSession,
    readLocalAccount,
    () => null,
  );
  const zone = useSyncExternalStore(subscribeToLocalSession, readLocalZone, () => null);
  const [draft, setDraft] = useState<DraftState>(initialDraft);
  const [saveStatus, setSaveStatus] = useState("");
  const selectedKind = getKind(draft.kind);
  const selectedContact = getContactMode(draft.contactMode);
  const isNeed = draft.kind === "need";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialKind = params.get("tipo") ?? undefined;
    const initialTitle = params.get("titulo") ?? undefined;

    if (!initialKind && !initialTitle) {
      return;
    }

    setDraft(getInitialDraft(initialKind, initialTitle));
  }, []);

  const validation = useMemo(
    () =>
      publicationDraftSchema.safeParse({
        title: draft.title,
        description: draft.description,
        kind: draft.kind,
        category: draft.category,
        priceLabel: draft.priceLabel,
        locality: zone?.locality ?? draft.locality,
        neighborhood: zone?.neighborhood ?? draft.neighborhood,
        privateLocationNote: draft.privateLocationNote,
        imageCount: draft.imageCount,
        contact: {
          preferredChannel: selectedContact.value,
          label: selectedContact.label,
          monetizationSignal: selectedContact.signal,
        },
      }),
    [draft, selectedContact, zone?.locality, zone?.neighborhood],
  );

  const completion = validation.success
    ? "Lista para guardar"
    : `${Math.max(0, 7 - validation.error.issues.length)}/7 datos clave`;

  function saveDraft() {
    if (!account) {
      setSaveStatus("Crea una cuenta local antes de publicar.");
      return;
    }

    if (!zone) {
      setSaveStatus("Selecciona tu zona antes de publicar.");
      return;
    }

    if (!validation.success) {
      setSaveStatus(validation.error.issues[0]?.message ?? "Revisa los datos.");
      return;
    }

    const publication = createLocalPublication({
      title: validation.data.title,
      description: validation.data.description,
      kind: validation.data.kind,
      kindLabel: selectedKind.label,
      category: validation.data.category,
      priceLabel: validation.data.priceLabel,
      locality: zone.locality,
      neighborhood: zone.neighborhood,
      privateLocationNote: validation.data.privateLocationNote,
      contact: validation.data.contact,
    });

    saveLocalPublication(publication);
    router.push(`/publicaciones/local/${publication.id}`);
  }

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1fr_380px]">
      <form className="ui-surface p-4 sm:p-5">
        <div className="flex flex-col gap-3 border-b border-[#e7dfd1] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {isNeed ? "Publicar busqueda" : "Nueva publicacion"}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#69665f]">
              {isNeed
                ? "Contale al barrio que necesitas para que aparezca ante posibles oferentes, sin exponer tu ubicacion exacta."
                : "Crea una publicacion clara, cercana y compartible sin exponer tu ubicacion exacta."}
            </p>
          </div>
          <span className="ui-chip ui-chip-success w-fit">
            {completion}
          </span>
        </div>

        <div className="mt-6 grid gap-5">
          <div className="ui-surface-soft grid gap-3 p-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase text-[#69665f]">
                Cuenta
              </p>
              {account ? (
                <p className="mt-1 text-sm font-semibold">
                  {account.displayName}
                </p>
              ) : (
                <Link
                  className="mt-1 inline-block text-sm font-bold text-[#a1452e]"
                  href="/cuenta"
                >
                  Crear cuenta para publicar
                </Link>
              )}
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-[#69665f]">
                Zona publica aproximada
              </p>
              {zone ? (
                <p className="mt-1 text-sm font-semibold">
                  {zone.neighborhood}, {zone.locality}
                </p>
              ) : (
                <Link
                  className="mt-1 inline-block text-sm font-bold text-[#a1452e]"
                  href="/zona"
                >
                  Seleccionar zona
                </Link>
              )}
            </div>
          </div>

          <label className="grid gap-2 text-sm font-bold">
            Titulo
            <input
              className="ui-field font-normal"
              onChange={(event) =>
                setDraft((current) => ({ ...current, title: event.target.value }))
              }
              placeholder={
                isNeed
                  ? "Ej: Busco bicicleta rodado 26"
                  : "Ej: Silla de comedor para donar"
              }
              value={draft.title}
            />
          </label>

          <label className="grid gap-2 text-sm font-bold">
            Descripcion
            <textarea
              className="ui-field min-h-32 font-normal leading-6"
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder={
                isNeed
                  ? "Contale que buscas, para que lo necesitas, si aceptas compra, trueque, donacion o ayuda."
                  : "Contale al barrio que ofreces, estado, condiciones y como se coordina."
              }
              value={draft.description}
            />
          </label>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold">Tipo de publicacion</legend>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {publicationKinds.map((kind) => (
                <button
                  className={`min-h-24 rounded-md border p-3 text-left text-sm transition ${
                    draft.kind === kind.value
                      ? "border-primary bg-primary-soft text-primary-strong"
                      : "border-border-soft bg-white hover:bg-surface-soft"
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
                className="ui-field font-normal"
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
              {isNeed ? "Condicion o propuesta" : "Precio o condicion"}
              <input
                className="ui-field font-normal"
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

          <label className="grid gap-2 text-sm font-bold">
            Ubicacion privada
            <input
              className="ui-field font-normal"
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  privateLocationNote: event.target.value,
                }))
              }
              placeholder="Ej: cerca de plaza principal, porton azul"
              value={draft.privateLocationNote}
            />
            <span className="text-xs font-normal leading-5 text-[#69665f]">
              No se muestra publicamente; sirve para coordinar luego con el
              interesado.
            </span>
          </label>

          <div className="rounded-md bg-primary-soft p-4">
            <p className="text-sm font-bold text-primary-strong">
              Ubicacion publica generada
            </p>
            <p className="mt-1 text-sm leading-6 text-primary-strong">
              {zone
                ? `${zone.neighborhood}, ${zone.locality} - ${zone.approximateRadiusLabel}`
                : "Selecciona tu zona para generar la ubicacion publica aproximada."}
            </p>
          </div>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-bold">Imagenes</legend>
            <div className="rounded-md border border-dashed border-border-soft bg-surface-soft p-4">
              <p className="text-sm font-semibold">
                {isNeed
                  ? "Agregar imagen de referencia"
                  : "Agregar fotos del producto"}
              </p>
              <p className="mt-1 text-sm leading-6 text-[#69665f]">
                {isNeed
                  ? "En esta version demo podes indicar si tenes una referencia visual; luego se conectara Storage."
                  : "En esta version demo contamos fotos; luego se conectara Storage."}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <button
                  className="size-10 rounded-md border border-border-soft text-lg font-bold"
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
                  className="size-10 rounded-md border border-border-soft text-lg font-bold"
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
                      ? "border-primary bg-primary-soft text-primary-strong"
                      : "border-border-soft bg-white hover:bg-surface-soft"
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
              className="ui-button ui-button-primary"
              onClick={saveDraft}
              type="button"
            >
              {isNeed ? "Guardar busqueda" : "Guardar borrador"}
            </button>
          </div>
          {saveStatus ? (
            <p className="rounded-md bg-accent-soft p-3 text-sm font-semibold text-[#a65f12]">
              {saveStatus}
            </p>
          ) : null}
        </div>
      </form>

      <aside className="flex flex-col gap-6">
        <section className="ui-surface p-5">
          <h2 className="text-lg font-bold">Vista previa</h2>
          <div className="ui-surface-soft mt-4 p-4">
            <div className="flex flex-wrap gap-2">
              <span className="ui-chip ui-chip-warning">
                {selectedKind.label}
              </span>
              <span className="ui-chip ui-chip-success">
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
              {zone
                ? `${zone.neighborhood}, ${zone.locality}`
                : "Barrio visible, Localidad"}
            </p>
          </div>
        </section>

        <section className="rounded-lg border border-primary bg-primary-strong p-5 text-white">
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
