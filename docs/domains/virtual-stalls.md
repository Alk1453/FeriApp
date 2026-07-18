# Domain - Virtual Stalls

## Principio

El puesto virtual es opcional. No debe exigirse para crear una publicacion
simple.

## Usuarios objetivo

- artesanos;
- fabricantes;
- comercios;
- emprendimientos;
- profesionales;
- trabajadores de oficios;
- prestadores de servicios;
- pequenas empresas;
- personas con oferta recurrente.

## Entidad sugerida

Puesto virtual:

- id;
- ownerId;
- name;
- coverImage;
- description;
- zone;
- catalog;
- services;
- openingHours;
- deliveryModes;
- contact;
- reputationSummary;
- socialLinks;
- status.

Estados:

- draft;
- active;
- paused;
- under_review;
- suspended;
- closed.

## Relacion con publicaciones

Una publicacion puede pertenecer a un puesto, pero no es obligatorio. Una misma
persona puede tener un puesto y tambien publicar cosas personales fuera del
puesto.
