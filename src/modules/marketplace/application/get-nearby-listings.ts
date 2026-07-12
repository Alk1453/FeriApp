import type { ListingSummary } from "../domain/listing";
import { listingSummaryListSchema } from "../domain/listing.schema";

export function getNearbyListings(): ListingSummary[] {
  const listings = [
    {
      title: "Bicicleta urbana rodado 26",
      kind: "sale",
      kindLabel: "Venta",
      priceLabel: "$48.000",
      location: {
        neighborhood: "Barrio Centro",
        locality: "San Martin",
        distanceLabel: "900 m",
      },
      trustLabel: "Vecino verificado",
    },
    {
      title: "Mesa plegable para intercambio",
      kind: "barter",
      kindLabel: "Trueque",
      priceLabel: "Acepta herramientas",
      location: {
        neighborhood: "Villa Norte",
        locality: "Palmira",
        distanceLabel: "1.4 km",
      },
      trustLabel: "3 recomendaciones",
    },
    {
      title: "Libros escolares para donar",
      kind: "donation",
      kindLabel: "Donacion",
      priceLabel: "Gratis",
      location: {
        neighborhood: "San Martin",
        locality: "Junin",
        distanceLabel: "2.1 km",
      },
      trustLabel: "Comercio local",
    },
  ];

  return listingSummaryListSchema.parse(listings);
}
