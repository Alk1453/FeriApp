export type LocalOpportunityRequest = {
  id: string;
  title: string;
  category: "home" | "transport" | "books" | "clothing" | "tools" | "services" | "other";
  categoryLabel: string;
  distanceHint: string;
  intentLabel: string;
  matchHint: string;
  keywords: string[];
};

export function getLocalOpportunityRequests(): LocalOpportunityRequest[] {
  return [
    {
      id: "need-bike-26",
      title: "Busca bicicleta rodado 26",
      category: "transport",
      categoryLabel: "Transporte",
      distanceHint: "a menos de 1 km",
      intentLabel: "Compra o trueque",
      matchHint: "Coincide con bicicletas publicadas cerca",
      keywords: ["bicicleta", "bici", "rodado", "transporte"],
    },
    {
      id: "need-electrician",
      title: "Necesita electricista",
      category: "services",
      categoryLabel: "Servicios",
      distanceHint: "cerca de tu zona",
      intentLabel: "Servicio",
      matchHint: "Puede aparecer a oficios verificados",
      keywords: ["electricista", "electricidad", "servicio", "oficio"],
    },
    {
      id: "need-tools",
      title: "Busca herramientas manuales",
      category: "tools",
      categoryLabel: "Herramientas",
      distanceHint: "a menos de 2 km",
      intentLabel: "Trueque",
      matchHint: "Puede interesar a vendedores de hogar/taller",
      keywords: ["herramientas", "manuales", "taller", "trueque"],
    },
  ];
}
