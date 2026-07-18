"use client";

import { useState } from "react";
import { updateLocalPublicationStatus } from "@/modules/marketplace/application/local-publications";
import type { Publication } from "@/modules/marketplace/domain/listing";

type OwnerPublicationActionsProps = {
  publicationId: string;
  status: Publication["status"];
};

const statusLabels: Record<Publication["status"], string> = {
  draft: "Borrador",
  active: "Activa",
  paused: "Pausada",
  reserved: "Reservada",
  closed: "Cerrada",
};

export function OwnerPublicationActions({
  publicationId,
  status,
}: OwnerPublicationActionsProps) {
  const [currentStatus, setCurrentStatus] = useState(status);

  function updateStatus(nextStatus: Publication["status"]) {
    const updated = updateLocalPublicationStatus(publicationId, nextStatus);
    setCurrentStatus(updated?.status ?? nextStatus);
  }

  return (
    <section className="rounded-lg border border-[#d9d0c0] bg-white p-5">
      <h2 className="text-lg font-bold">Gestion del propietario</h2>
      <p className="mt-2 text-sm leading-6 text-[#69665f]">
        Acciones locales de demo para administrar el ciclo de vida de la
        publicacion.
      </p>
      <p className="mt-3 rounded-md bg-[#fdfbf6] p-3 text-sm font-bold">
        Estado actual: {statusLabels[currentStatus]}
      </p>
      <div className="mt-4 grid gap-2">
        <button
          className="h-11 rounded-md border border-[#cfc3b0] px-4 text-sm font-bold hover:bg-[#f5f1e8]"
          onClick={() => updateStatus("active")}
          type="button"
        >
          Activar
        </button>
        <button
          className="h-11 rounded-md border border-[#cfc3b0] px-4 text-sm font-bold hover:bg-[#f5f1e8]"
          onClick={() => updateStatus("paused")}
          type="button"
        >
          Pausar
        </button>
        <button
          className="h-11 rounded-md bg-[#a1452e] px-4 text-sm font-bold text-white"
          onClick={() => updateStatus("closed")}
          type="button"
        >
          Marcar como cerrada
        </button>
      </div>
    </section>
  );
}
