# FeriApp - Architecture

## Estado actual

La aplicacion ya esta construida con:

- Next.js App Router;
- React;
- TypeScript estricto;
- Tailwind CSS;
- Zod para validacion;
- despliegue en Vercel;
- repositorio GitHub publico.

Existen rutas para:

- explorar publicaciones sin cuenta;
- crear cuenta local de prueba;
- seleccionar zona local;
- crear publicacion local;
- ver publicacion publica mock;
- ver borrador local;
- compartir publicaciones.

## Capas

La arquitectura debe mantener cuatro capas:

- Presentacion: rutas, paginas, componentes y formularios.
- Aplicacion: casos de uso, flujos, repositorios y servicios internos.
- Dominio: entidades, estados, permisos, reputacion, validaciones y reglas.
- Infraestructura: Supabase, Storage, mapas, pagos, WhatsApp, redes,
  notificaciones y analitica.

## Modulos

Modulos actuales:

- Marketplace/Publicaciones simples.
- Plataforma local de cuenta y zona demo.
- Compartir publicaciones.
- Radar del barrio como concepto inicial.

Modulos faltantes:

- confianza y reputacion;
- denuncias y moderacion;
- puestos virtuales;
- perfiles profesionales;
- servicios y oficios;
- red local de movilidad;
- operaciones;
- valoraciones;
- pagos/comisiones;
- administracion.

## Reglas de integracion

- No acoplar componentes visuales a proveedores externos.
- No hardcodear territorios en reglas de negocio.
- No exponer ubicacion exacta.
- No crear puntuaciones de confianza opacas.
- No obligar a crear puesto virtual para publicar algo simple.
- No implementar pagos ni logistica automatizada antes de validar demanda.
