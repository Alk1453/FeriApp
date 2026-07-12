import type { Publication } from "../domain/listing";
import { publicationListSchema } from "../domain/listing.schema";

const publications = [
  {
    id: "pub-001",
    slug: "bicicleta-urbana-rodado-26",
    title: "Bicicleta urbana rodado 26",
    kind: "sale",
    kindLabel: "Venta",
    priceLabel: "$48.000",
    category: "transport",
    location: {
      neighborhood: "Barrio Centro",
      locality: "San Martin",
      distanceLabel: "900 m",
    },
    trustLabel: "Vecino verificado",
    status: "active",
    description:
      "Bicicleta urbana en buen estado, ideal para moverse dentro del barrio. Tiene cambios revisados, asiento comodo y cubiertas listas para usar.",
    createdAt: "2026-07-12",
    imageUrl: "/publication-bike.svg",
    shareUrl: "/publicaciones/bicicleta-urbana-rodado-26",
    contact: {
      preferredChannel: "whatsapp",
      label: "Coordinar por WhatsApp",
    },
    publicNotes: [
      "La ubicacion exacta se comparte solo si ambas partes acuerdan.",
      "Retiro en zona aproximada de Barrio Centro.",
    ],
  },
  {
    id: "pub-002",
    slug: "mesa-plegable-para-intercambio",
    title: "Mesa plegable para intercambio",
    kind: "barter",
    kindLabel: "Trueque",
    priceLabel: "Acepta herramientas",
    category: "home",
    location: {
      neighborhood: "Villa Norte",
      locality: "Palmira",
      distanceLabel: "1.4 km",
    },
    trustLabel: "3 recomendaciones",
    status: "active",
    description:
      "Mesa plegable firme y facil de transportar. Busco intercambiar por herramientas manuales, organizadores o articulos utiles para taller.",
    createdAt: "2026-07-11",
    imageUrl: "/publication-table.svg",
    shareUrl: "/publicaciones/mesa-plegable-para-intercambio",
    contact: {
      preferredChannel: "in-app",
      label: "Enviar propuesta",
    },
    publicNotes: [
      "Publicacion orientada a economia circular.",
      "Se muestra barrio aproximado, no domicilio exacto.",
    ],
  },
  {
    id: "pub-003",
    slug: "libros-escolares-para-donar",
    title: "Libros escolares para donar",
    kind: "donation",
    kindLabel: "Donacion",
    priceLabel: "Gratis",
    category: "books",
    location: {
      neighborhood: "San Martin",
      locality: "Junin",
      distanceLabel: "2.1 km",
    },
    trustLabel: "Comercio local",
    status: "active",
    description:
      "Lote de libros escolares de primaria y secundaria para donar a familias de la zona. Se entregan juntos o por nivel segun necesidad.",
    createdAt: "2026-07-10",
    imageUrl: "/publication-books.svg",
    shareUrl: "/publicaciones/libros-escolares-para-donar",
    contact: {
      preferredChannel: "phone",
      label: "Consultar disponibilidad",
    },
    publicNotes: [
      "Prioridad para vecinos cercanos.",
      "Ideal para compartir en grupos de WhatsApp del barrio.",
    ],
  },
] satisfies Publication[];

export function getPublications(): Publication[] {
  return publicationListSchema.parse(publications);
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  return getPublications().find((publication) => publication.slug === slug);
}
