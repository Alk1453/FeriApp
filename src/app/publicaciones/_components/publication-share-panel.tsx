"use client";

import { useState } from "react";

type PublicationSharePanelProps = {
  absoluteUrl: string;
  facebookUrl: string;
  title: string;
  whatsappUrl: string;
  xUrl: string;
};

export function PublicationSharePanel({
  absoluteUrl,
  facebookUrl,
  title,
  whatsappUrl,
  xUrl,
}: PublicationSharePanelProps) {
  const [copyStatus, setCopyStatus] = useState("Copiar enlace");

  async function copyLink() {
    await navigator.clipboard.writeText(absoluteUrl);
    setCopyStatus("Enlace copiado");
    window.setTimeout(() => setCopyStatus("Copiar enlace"), 1800);
  }

  async function shareNative() {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    await navigator.share({
      title,
      text: "Mira esta publicacion en FeriApp",
      url: absoluteUrl,
    });
  }

  return (
    <section className="rounded-lg border border-[#d9d0c0] bg-[#193f3a] p-5 text-white">
      <h2 className="text-lg font-bold">Compartir</h2>
      <p className="mt-2 text-sm leading-6 text-[#dbe9df]">
        Esta publicacion tiene URL propia y puede circular por fuera de FeriApp
        sin pedir instalacion.
      </p>
      <div className="mt-4 grid gap-3">
        <a
          className="flex h-11 items-center justify-center rounded-md bg-[#f4c86b] px-4 text-sm font-bold text-[#1f211d]"
          href={whatsappUrl}
          rel="noreferrer"
          target="_blank"
        >
          WhatsApp
        </a>
        <a
          className="flex h-11 items-center justify-center rounded-md border border-white/20 px-4 text-sm font-bold text-white"
          href={facebookUrl}
          rel="noreferrer"
          target="_blank"
        >
          Facebook
        </a>
        <a
          className="flex h-11 items-center justify-center rounded-md border border-white/20 px-4 text-sm font-bold text-white"
          href={xUrl}
          rel="noreferrer"
          target="_blank"
        >
          X / Twitter
        </a>
        <button
          className="h-11 rounded-md border border-white/20 px-4 text-sm font-bold text-white"
          onClick={shareNative}
          type="button"
        >
          Compartir desde el celular
        </button>
        <button
          className="h-11 rounded-md bg-white px-4 text-sm font-bold text-[#193f3a]"
          onClick={copyLink}
          type="button"
        >
          {copyStatus}
        </button>
      </div>
      <p className="mt-4 break-all rounded-md bg-white/10 p-3 text-xs leading-5 text-[#dbe9df]">
        {absoluteUrl}
      </p>
    </section>
  );
}
