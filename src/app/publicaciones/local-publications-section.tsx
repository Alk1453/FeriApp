"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  localPublicationsEventName,
  readLocalPublications,
} from "@/modules/marketplace/application/local-publications";

function subscribeToStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(localPublicationsEventName, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(localPublicationsEventName, onStoreChange);
  };
}

export function LocalPublicationsSection() {
  const publications = useSyncExternalStore(
    subscribeToStorage,
    readLocalPublications,
    () => [],
  );

  if (publications.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-[#d9d0c0] bg-[#193f3a] p-5 text-white">
      <h2 className="text-lg font-bold">Borradores creados en este navegador</h2>
      <p className="mt-2 text-sm leading-6 text-[#dbe9df]">
        Estos borradores prueban el flujo vertical hasta que conectemos Supabase.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {publications.map((publication) => (
          <Link
            className="rounded-md bg-white/10 p-4 transition hover:bg-white/15"
            href={`/publicaciones/local/${publication.id}`}
            key={publication.id}
          >
            <span className="text-xs font-bold uppercase text-[#f4c86b]">
              {publication.kindLabel}
            </span>
            <h3 className="mt-2 font-bold">{publication.title}</h3>
            <p className="mt-1 text-sm text-[#dbe9df]">
              {publication.location.neighborhood}, {publication.location.locality}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
