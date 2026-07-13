import type { Publication } from "../domain/listing";
import { publicationSchema } from "../domain/listing.schema";

export const localPublicationsStorageKey = "feriapp.local-publications.v1";

type LocalPublicationDraft = {
  title: string;
  description: string;
  kind: Publication["kind"];
  kindLabel: string;
  category: Publication["category"];
  priceLabel: string;
  locality: string;
  neighborhood: string;
  contact: Publication["contact"];
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 64);
}

function getImageUrl(category: Publication["category"]): string {
  if (category === "transport") {
    return "/publication-bike.svg";
  }

  if (category === "books") {
    return "/publication-books.svg";
  }

  return "/publication-table.svg";
}

export function createLocalPublication(
  draft: LocalPublicationDraft,
): Publication {
  const id = `local-${Date.now()}`;
  const slug = `${slugify(draft.title)}-${id}`;

  return publicationSchema.parse({
    id,
    slug,
    title: draft.title,
    kind: draft.kind,
    kindLabel: draft.kindLabel,
    priceLabel: draft.priceLabel,
    category: draft.category,
    location: {
      neighborhood: draft.neighborhood,
      locality: draft.locality,
      distanceLabel: "Zona cercana",
    },
    trustLabel: "Borrador local",
    status: "draft",
    description: draft.description,
    createdAt: new Date().toISOString(),
    imageUrl: getImageUrl(draft.category),
    shareUrl: `/publicaciones/local/${id}`,
    contact: draft.contact,
    publicNotes: [
      "Esta publicacion fue creada como borrador local de demo.",
      "La ubicacion exacta no se muestra por defecto.",
    ],
  });
}

export function readLocalPublications(): Publication[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(localPublicationsStorageKey);
  if (!raw) {
    return [];
  }

  const parsed = JSON.parse(raw);
  return publicationSchema.array().parse(parsed);
}

export function saveLocalPublication(publication: Publication): void {
  const publications = readLocalPublications();
  const nextPublications = [
    publication,
    ...publications.filter((item) => item.id !== publication.id),
  ].slice(0, 12);

  window.localStorage.setItem(
    localPublicationsStorageKey,
    JSON.stringify(nextPublications),
  );
}

export function getLocalPublicationById(id: string): Publication | undefined {
  return readLocalPublications().find((publication) => publication.id === id);
}
