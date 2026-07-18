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
  const [deliveryNeed, setDeliveryNeed] = useState<"pickup" | "delivery" | "">("");
  const deliveryOptions = getLocalDeliveryOptions();

  return (
    <section className="rounded-lg border border-[#d9d0c0] bg-white p-5">
      <h2 className="text-lg font-bold">Interes y entrega</h2>
      <p className="mt-2 text-sm leading-6 text-[#69665f]">
        Marca interes sin exponer datos sensibles. Despues se puede coordinar
        retiro o ver alternativas locales.
      </p>

      <button
        className="mt-4 h-11 w-full rounded-md bg-[#193f3a] px-4 text-sm font-bold text-white transition hover:bg-[#102d29]"
        onClick={() => setInterestSent(true)}
        type="button"
      >
        Me interesa
      </button>

      {interestSent ? (
        <div className="mt-4 rounded-md bg-[#e8f1df] p-3 text-sm text-[#355d2d]">
          <p className="font-bold">Interes registrado</p>
          <p className="mt-1 leading-6">
            Demo: FeriApp registraria interes por {publicationTitle} en{" "}
            {publicZone}.
          </p>
        </div>
      ) : null}

      {interestSent ? (
        <fieldset className="mt-4 grid gap-3">
          <legend className="text-sm font-bold">Como queres resolver la entrega?</legend>
          <div className="grid gap-2">
            <button
              className={`rounded-md border p-3 text-left text-sm ${
                deliveryNeed === "pickup"
                  ? "border-[#193f3a] bg-[#e8f1df]"
                  : "border-[#d4c8b7] bg-white hover:bg-[#f5f1e8]"
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
                  ? "border-[#193f3a] bg-[#e8f1df]"
                  : "border-[#d4c8b7] bg-white hover:bg-[#f5f1e8]"
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
              className="rounded-md border border-[#e3dacb] bg-[#fdfbf6] p-3"
              key={option.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold">{option.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#69665f]">
                    {option.description}
                  </p>
                </div>
                <span className="rounded-md bg-white px-2.5 py-1 text-xs font-bold text-[#355d2d]">
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
