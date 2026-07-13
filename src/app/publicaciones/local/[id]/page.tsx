"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PublicationSharePanel } from "../../_components/publication-share-panel";
import { getPublicationShareLinks } from "@/modules/marketplace/application/get-publication-share-links";
import { getLocalPublicationById } from "@/modules/marketplace/application/local-publications";

function subscribeToStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

export default function LocalPublicationDetailPage() {
  const params = useParams<{ id: string }>();
  const publication = useSyncExternalStore(
    subscribeToStorage,
    () => getLocalPublicationById(params.id) ?? null,
    () => null,
  );

  if (!publication) {
    return (
      <main className="min-h-screen bg-[#f5f1e8] px-4 py-5 text-[#1f211d]">
        <section className="mx-auto max-w-3xl rounded-lg border border-[#d9d0c0] bg-white p-5">
          <Link className="text-sm font-bold text-[#a1452e]" href="/publicaciones">
            Publicaciones
          </Link>
          <h1 className="mt-3 text-2xl font-bold">Borrador no encontrado</h1>
          <p className="mt-2 text-sm leading-6 text-[#69665f]">
            Esta publicacion local vive en el navegador donde fue creada. Cuando
            conectemos Supabase, estas URLs seran publicas para cualquier
            persona.
          </p>
        </section>
      </main>
    );
  }

  const shareLinks = getPublicationShareLinks(publication);

  return (
    <main className="min-h-screen bg-[#f5f1e8] px-4 py-5 text-[#1f211d] sm:px-6 lg:px-8">
      <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
        <article className="overflow-hidden rounded-lg border border-[#d9d0c0] bg-white">
          <Image
            alt=""
            className="aspect-[16/9] w-full object-cover"
            height={420}
            src={publication.imageUrl}
            width={640}
          />
          <div className="p-5 sm:p-6">
            <Link className="text-sm font-bold text-[#a1452e]" href="/publicaciones">
              Publicaciones
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[#f6e6d9] px-2.5 py-1 text-xs font-bold text-[#8d3c28]">
                {publication.kindLabel}
              </span>
              <span className="rounded-md bg-[#e8f1df] px-2.5 py-1 text-xs font-bold text-[#355d2d]">
                {publication.location.distanceLabel}
              </span>
              <span className="rounded-md bg-[#f5f1e8] px-2.5 py-1 text-xs font-bold text-[#69665f]">
                Borrador local
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              {publication.title}
            </h1>
            <p className="mt-3 text-xl font-bold">{publication.priceLabel}</p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#57534b]">
              {publication.description}
            </p>

            <section className="mt-6 grid gap-3 rounded-lg bg-[#fdfbf6] p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase text-[#69665f]">
                  Zona publica
                </p>
                <p className="mt-1 font-semibold">
                  {publication.location.neighborhood},{" "}
                  {publication.location.locality}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-[#69665f]">
                  Contacto
                </p>
                <p className="mt-1 font-semibold">{publication.contact.label}</p>
              </div>
            </section>
          </div>
        </article>

        <aside className="flex flex-col gap-6">
          <PublicationSharePanel
            absoluteUrl={shareLinks.absoluteUrl}
            facebookUrl={shareLinks.facebookUrl}
            title={publication.title}
            whatsappUrl={shareLinks.whatsappUrl}
            xUrl={shareLinks.xUrl}
          />

          <section className="rounded-lg border border-[#d9d0c0] bg-white p-5">
            <h2 className="text-lg font-bold">Estado del flujo</h2>
            <p className="mt-2 text-sm leading-6 text-[#69665f]">
              Este borrador ya completa el ciclo crear, validar, guardar, ver y
              compartir en el mismo navegador. El siguiente paso natural es
              persistirlo en Supabase para hacerlo publico en cualquier
              dispositivo.
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
}
