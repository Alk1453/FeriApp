"use client";

import { useState } from "react";
import Link from "next/link";
import { saveLocalZone } from "@/modules/platform/application/local-session";

export function ZoneForm() {
  const [locality, setLocality] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [savedZone, setSavedZone] = useState("");
  const [error, setError] = useState("");

  function saveZone() {
    try {
      const zone = saveLocalZone({
        locality,
        neighborhood,
        source: "manual",
      });
      setSavedZone(`${zone.neighborhood}, ${zone.locality}`);
      setError("");
    } catch {
      setError("Completa localidad y barrio para configurar tu zona.");
    }
  }

  return (
    <div className="mt-6 grid gap-4">
      <div className="rounded-md bg-[#fdfbf6] p-4">
        <p className="text-sm font-bold">Ubicacion publica aproximada</p>
        <p className="mt-1 text-sm leading-6 text-[#69665f]">
          FeriApp mostrara barrio, localidad y radio aproximado. No mostrara
          domicilio ni coordenadas exactas.
        </p>
      </div>

      <label className="grid gap-2 text-sm font-bold">
        Localidad
        <input
          className="h-12 rounded-md border border-[#d4c8b7] px-3 font-normal outline-none focus:border-[#193f3a]"
          onChange={(event) => setLocality(event.target.value)}
          placeholder="Ej: San Martin"
          value={locality}
        />
      </label>

      <label className="grid gap-2 text-sm font-bold">
        Barrio o zona visible
        <input
          className="h-12 rounded-md border border-[#d4c8b7] px-3 font-normal outline-none focus:border-[#193f3a]"
          onChange={(event) => setNeighborhood(event.target.value)}
          placeholder="Ej: Barrio Centro"
          value={neighborhood}
        />
      </label>

      <button
        className="h-12 rounded-md bg-[#193f3a] px-5 text-sm font-bold text-white"
        onClick={saveZone}
        type="button"
      >
        Guardar zona
      </button>

      {error ? (
        <p className="rounded-md bg-[#f6e6d9] p-3 text-sm font-semibold text-[#8d3c28]">
          {error}
        </p>
      ) : null}

      {savedZone ? (
        <div className="rounded-md bg-[#e8f1df] p-3 text-sm text-[#355d2d]">
          <p className="font-bold">Zona guardada: {savedZone}</p>
          <Link className="mt-2 inline-block font-bold" href="/publicaciones/nueva">
            Crear publicacion
          </Link>
        </div>
      ) : null}
    </div>
  );
}
