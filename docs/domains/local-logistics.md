# Domain - Local Logistics

## Principio

La red local de movilidad debe ser un modulo independiente. No debe mezclarse
con marketplace, pagos ni reputacion, aunque se integre con ellos.

## Participantes

- mensajerias;
- cadetes;
- motoqueros;
- ciclistas;
- peatones;
- personas con vehiculo particular;
- fletes;
- camionetas;
- transportistas;
- empresas logisticas locales.

## Prestador logistico

Campos sugeridos:

- id;
- profileId;
- transportMode;
- zone;
- radius;
- schedule;
- capacity;
- maxWeight;
- acceptedCategories;
- excludedCategories;
- indicativeRate;
- commercialMode;
- availability;
- validationStatus;
- reputationSummary.

## Entregas

Estados sugeridos:

- requested;
- options_presented;
- proposal_sent;
- accepted;
- rejected;
- coordinated;
- in_progress;
- completed;
- cancelled;
- disputed.

## Restriccion

No asumir pago automatico. Inicialmente admitir coordinacion externa, pago
acordado o pago al recibir. Mercado Pago y comisiones son fases posteriores.
