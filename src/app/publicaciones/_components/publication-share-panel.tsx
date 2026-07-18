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
    <section className="rounded-lg border border-primary bg-primary-strong p-5 text-white">
      <h2 className="text-lg font-bold">Compartir</h2>
      <p className="mt-2 text-sm leading-6 text-[#dbe9df]">
        Esta publicacion tiene URL propia y puede circular por fuera de FeriApp
        sin pedir instalacion.
      </p>
      <div className="mt-4 grid gap-3">
        <a
          className="ui-button bg-accent text-foreground hover:bg-[#dc7818]"
          href={whatsappUrl}
          rel="noreferrer"
          target="_blank"
        >
          WhatsApp
        </a>
        <a
          className="ui-button border border-white/20 text-white hover:bg-white/10"
          href={facebookUrl}
          rel="noreferrer"
          target="_blank"
        >
          Facebook
        </a>
        <a
          className="ui-button border border-white/20 text-white hover:bg-white/10"
          href={xUrl}
          rel="noreferrer"
          target="_blank"
        >
          X / Twitter
        </a>
        <button
          className="ui-button border border-white/20 text-white hover:bg-white/10"
          onClick={shareNative}
          type="button"
        >
          Compartir desde el celular
        </button>
        <button
          className="ui-button bg-white text-primary-strong hover:bg-primary-soft"
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
