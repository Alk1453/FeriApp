export type DeliveryOption = {
  id: string;
  title: string;
  description: string;
  priceLabel: string;
  availabilityLabel: string;
};

export function getLocalDeliveryOptions(): DeliveryOption[] {
  return [
    {
      id: "pickup",
      title: "Retiro coordinado",
      description: "Las partes coordinan un punto cercano sin exponer domicilio.",
      priceLabel: "Sin costo",
      availabilityLabel: "Disponible hoy",
    },
    {
      id: "bike",
      title: "Entrega en bici",
      description: "Para paquetes chicos dentro del barrio o zonas cercanas.",
      priceLabel: "Tarifa orientativa",
      availabilityLabel: "Radio 2 km",
    },
    {
      id: "freight",
      title: "Flete local",
      description: "Para muebles, herramientas grandes o traslados con volumen.",
      priceLabel: "A coordinar",
      availabilityLabel: "Con reserva",
    },
  ];
}
