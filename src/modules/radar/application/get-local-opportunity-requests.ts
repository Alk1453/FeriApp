export type LocalOpportunityRequest = {
  id: string;
  title: string;
  categoryLabel: string;
  distanceHint: string;
  intentLabel: string;
  matchHint: string;
};

export function getLocalOpportunityRequests(): LocalOpportunityRequest[] {
  return [
    {
      id: "need-bike-26",
      title: "Busca bicicleta rodado 26",
      categoryLabel: "Transporte",
      distanceHint: "a menos de 1 km",
      intentLabel: "Compra o trueque",
      matchHint: "Coincide con bicicletas publicadas cerca",
    },
    {
      id: "need-electrician",
      title: "Necesita electricista",
      categoryLabel: "Servicios",
      distanceHint: "cerca de tu zona",
      intentLabel: "Servicio",
      matchHint: "Puede aparecer a oficios verificados",
    },
    {
      id: "need-tools",
      title: "Busca herramientas manuales",
      categoryLabel: "Herramientas",
      distanceHint: "a menos de 2 km",
      intentLabel: "Trueque",
      matchHint: "Puede interesar a vendedores de hogar/taller",
    },
  ];
}
