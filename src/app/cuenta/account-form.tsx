"use client";

import { useState } from "react";
import Link from "next/link";
import { saveLocalAccount } from "@/modules/platform/application/local-session";

export function AccountForm() {
  const [displayName, setDisplayName] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [savedName, setSavedName] = useState("");
  const [error, setError] = useState("");

  function saveAccount() {
    try {
      const account = saveLocalAccount({ displayName, phoneOrEmail });
      setSavedName(account.displayName);
      setError("");
    } catch {
      setError("Completa nombre y contacto para crear la cuenta local.");
    }
  }

  return (
    <div className="mt-6 grid gap-4">
      <label className="grid gap-2 text-sm font-bold">
        Nombre visible
        <input
          className="h-12 rounded-md border border-[#d4c8b7] px-3 font-normal outline-none focus:border-[#193f3a]"
          onChange={(event) => setDisplayName(event.target.value)}
          placeholder="Ej: Juan de Barrio Centro"
          value={displayName}
        />
      </label>

      <label className="grid gap-2 text-sm font-bold">
        Telefono o email
        <input
          className="h-12 rounded-md border border-[#d4c8b7] px-3 font-normal outline-none focus:border-[#193f3a]"
          onChange={(event) => setPhoneOrEmail(event.target.value)}
          placeholder="Para recuperar cuenta o coordinar"
          value={phoneOrEmail}
        />
      </label>

      <button
        className="h-12 rounded-md bg-[#193f3a] px-5 text-sm font-bold text-white"
        onClick={saveAccount}
        type="button"
      >
        Crear cuenta local
      </button>

      {error ? (
        <p className="rounded-md bg-[#f6e6d9] p-3 text-sm font-semibold text-[#8d3c28]">
          {error}
        </p>
      ) : null}

      {savedName ? (
        <div className="rounded-md bg-[#e8f1df] p-3 text-sm text-[#355d2d]">
          <p className="font-bold">Cuenta creada para {savedName}</p>
          <Link className="mt-2 inline-block font-bold" href="/zona">
            Continuar con zona
          </Link>
        </div>
      ) : null}
    </div>
  );
}
