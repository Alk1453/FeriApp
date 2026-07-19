"use client";

import { useState } from "react";
import { getLocalDeliveryOptions } from "@/modules/logistics/application/get-local-delivery-options";

type InterestAndDeliveryPanelProps = {
  publicationTitle: string;
  publicZone: string;
};

export function InterestAndDeliveryPanel({
  publicationTitle,
  publicZone,
}: InterestAndDeliveryPanelProps) {
  const [interestSent, setInterestSent] = useState(false);
  const [proposalMode, setProposalMode] = useState<"buy" | "barter">("buy");
  const [barterOffer, setBarterOffer] = useState("");
  const [deliveryNeed, setDeliveryNeed] = useState<"pickup" | "delivery" | "">("");
  const deliveryOptions = getLocalDeliveryOptions();

  return (
    <section className="ui-surface p-5">
      <h2 className="text-lg font-bold">Interes y entrega</h2>
      <p className="mt-2 text-sm leading-6 text-[#69665f]">
        Marca interes sin exponer datos sensibles. Despues se puede coordinar
        retiro o ver alternativas locales.
      </p>

      <button
        className="ui-button ui-button-primary mt-4 w-full"
        onClick={() => setInterestSent(true)}
        type="button"
      >
        Me interesa
      </button>

      {interestSent ? (
        <div className="mt-4 rounded-md bg-primary-soft p-3 text-sm text-primary-strong">
          <p className="font-bold">Interes registrado</p>
          <p className="mt-1 leading-6">
            Demo: FeriApp registraria interes por {publicationTitle} en{" "}
            {publicZone}.
          </p>
        </div>
      ) : null}

      {interestSent ? (
        <fieldset className="mt-4 grid gap-3">
          <legend className="text-sm font-bold">Como queres proponer?</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              className={`rounded-md border p-3 text-left text-sm ${
                proposalMode === "buy"
                  ? "border-primary bg-primary-soft text-primary-strong"
                  : "border-border-soft bg-white hover:bg-surface-soft"
              }`}
              onClick={() => setProposalMode("buy")}
              type="button"
            >
              <span className="font-bold">Consultar / comprar</span>
              <span className="mt-1 block text-[#69665f]">
                Seguir la forma de contacto elegida por el propietario.
              </span>
            </button>
            <button
              className={`rounded-md border p-3 text-left text-sm ${
                proposalMode === "barter"
                  ? "border-primary bg-primary-soft text-primary-strong"
                  : "border-border-soft bg-white hover:bg-surface-soft"
              }`}
              onClick={() => setProposalMode("barter")}
              type="button"
            >
              <span className="font-bold">Ofrecer trueque</span>
              <span className="mt-1 block text-[#69665f]">
                Proponer algo aunque el vendedor no lo haya pedido.
              </span>
            </button>
          </div>

          {proposalMode === "barter" ? (
            <label className="grid gap-2 text-sm font-bold">
              Que ofreces a cambio?
              <textarea
                className="ui-field min-h-24 font-normal leading-6"
                onChange={(event) => setBarterOffer(event.target.value)}
                placeholder="Ej: ofrezco herramientas, una bici menor o servicio de pintura."
                value={barterOffer}
              />
              <span className="text-xs font-normal leading-5 text-muted">
                Demo: esta propuesta quedaria dentro de FeriApp para que el
                propietario pueda aceptarla, rechazarla o responder.
              </span>
            </label>
          ) : null}
        </fieldset>
      ) : null}

      {interestSent ? (
        <fieldset className="mt-4 grid gap-3">
          <legend className="text-sm font-bold">Como queres resolver la entrega?</legend>
          <div className="grid gap-2">
            <button
              className={`rounded-md border p-3 text-left text-sm ${
                deliveryNeed === "pickup"
                  ? "border-primary bg-primary-soft text-primary-strong"
                  : "border-border-soft bg-white hover:bg-surface-soft"
              }`}
              onClick={() => setDeliveryNeed("pickup")}
              type="button"
            >
              <span className="font-bold">Puedo retirar</span>
              <span className="mt-1 block text-[#69665f]">
                Coordinar punto cercano con el propietario.
              </span>
            </button>
            <button
              className={`rounded-md border p-3 text-left text-sm ${
                deliveryNeed === "delivery"
                  ? "border-primary bg-primary-soft text-primary-strong"
                  : "border-border-soft bg-white hover:bg-surface-soft"
              }`}
              onClick={() => setDeliveryNeed("delivery")}
              type="button"
            >
              <span className="font-bold">Necesito traslado</span>
              <span className="mt-1 block text-[#69665f]">
                Ver opciones locales compatibles.
              </span>
            </button>
          </div>
        </fieldset>
      ) : null}

      {deliveryNeed === "delivery" ? (
        <div className="mt-4 grid gap-3">
          {deliveryOptions.map((option) => (
            <article
              className="rounded-md border border-border-soft bg-surface-soft p-3"
              key={option.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold">{option.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#69665f]">
                    {option.description}
                  </p>
                </div>
                <span className="ui-chip ui-chip-success bg-white">
                  {option.availabilityLabel}
                </span>
              </div>
              <p className="mt-2 text-sm font-bold">{option.priceLabel}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
