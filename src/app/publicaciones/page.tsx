import Link from "next/link";
import Image from "next/image";
import { getPublications } from "@/modules/marketplace/application/get-publications";
import { getPublicationShareLinks } from "@/modules/marketplace/application/get-publication-share-links";

export const metadata = {
  title: "Publicaciones | FeriApp",
  description:
    "Publicaciones cercanas para comprar, intercambiar, donar y descubrir en tu barrio.",
};

export default function PublicationsPage() {
  const publications = getPublications();

  return (
    <main className="min-h-screen bg-[#f5f1e8] px-4 py-5 text-[#1f211d] sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-lg border border-[#d9d0c0] bg-white p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Link className="text-sm font-bold text-[#a1452e]" href="/">
              FeriApp
            </Link>
            <h1 className="mt-2 text-3xl font-bold">Publicaciones cercanas</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#69665f]">
              El marketplace empieza por publicaciones simples, compartibles y
              orientadas a la cercania geografica.
            </p>
          </div>
          <Link
            className="flex h-11 items-center justify-center rounded-md bg-[#193f3a] px-4 text-sm font-bold text-white transition hover:bg-[#102d29]"
            href="/publicaciones/nueva"
          >
            Nueva publicacion
          </Link>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {publications.map((publication) => {
            const shareLinks = getPublicationShareLinks(publication);

            return (
              <article
                className="overflow-hidden rounded-lg border border-[#d9d0c0] bg-white"
                key={publication.id}
              >
                <Image
                  alt=""
                  className="aspect-[16/10] w-full object-cover"
                  height={420}
                  src={publication.imageUrl}
                  width={640}
                />
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-[#f6e6d9] px-2.5 py-1 text-xs font-bold text-[#8d3c28]">
                      {publication.kindLabel}
                    </span>
                    <span className="rounded-md bg-[#e8f1df] px-2.5 py-1 text-xs font-bold text-[#355d2d]">
                      {publication.location.distanceLabel}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold">{publication.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#69665f]">
                    {publication.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <strong>{publication.priceLabel}</strong>
                    <div className="flex gap-2">
                      <a
                        className="rounded-md border border-[#cfc3b0] px-3 py-2 text-sm font-bold hover:bg-[#f5f1e8]"
                        href={shareLinks.whatsappUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        WhatsApp
                      </a>
                      <Link
                        className="rounded-md border border-[#cfc3b0] px-3 py-2 text-sm font-bold hover:bg-[#f5f1e8]"
                        href={`/publicaciones/${publication.slug}`}
                      >
                        Ver
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}
