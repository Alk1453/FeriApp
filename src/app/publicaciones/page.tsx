import Link from "next/link";
import Image from "next/image";
import { getPublications } from "@/modules/marketplace/application/get-publications";
import { getPublicationShareLinks } from "@/modules/marketplace/application/get-publication-share-links";
import { BottomNavigation } from "../_components/bottom-navigation";
import { LocalPublicationsSection } from "./local-publications-section";

export const metadata = {
  title: "Publicaciones | FeriApp",
  description:
    "Publicaciones cercanas para comprar, intercambiar, donar y descubrir en tu barrio.",
};

export default function PublicationsPage() {
  const publications = getPublications();

  return (
    <main className="ui-page px-4 py-5 pb-24 sm:px-6 lg:px-8 md:pb-5">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="ui-surface flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
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
            className="ui-button ui-button-primary"
            href="/publicaciones/nueva"
          >
            Nueva publicacion
          </Link>
        </header>

        <LocalPublicationsSection />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {publications.map((publication) => {
            const shareLinks = getPublicationShareLinks(publication);

            return (
              <article
                className="ui-surface overflow-hidden"
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
                    <span className="ui-chip ui-chip-warning">
                      {publication.kindLabel}
                    </span>
                    <span className="ui-chip ui-chip-success">
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
                        className="ui-button ui-button-secondary min-h-10 px-3 py-2"
                        href={shareLinks.whatsappUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        WhatsApp
                      </a>
                      <Link
                        className="ui-button ui-button-secondary min-h-10 px-3 py-2"
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
      <BottomNavigation />
    </main>
  );
}
