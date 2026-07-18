# FeriApp - Principios por pantalla

## Proposito

Este documento define reglas concretas para las pantallas principales de FeriApp. Complementa `ux-principles.md` y `visual-system.md`.

La regla general es mantener cada pantalla enfocada en una tarea principal, con informacion progresiva y acciones claras.

## 1. Inicio

Objetivo: permitir descubrir rapidamente que hay cerca y que se puede hacer.

Debe priorizar:

- zona actual o seleccion de zona;
- buscador simple;
- categorias principales;
- publicaciones cercanas;
- acceso visible a publicar;
- senales breves de confianza local.

Debe evitar:

- explicaciones largas;
- exceso de modulos futuros;
- datos tecnicos;
- marketing que tape la experiencia real.

Accion principal: explorar o publicar.

## 2. Explorar publicaciones

Objetivo: facilitar comparacion rapida entre oportunidades cercanas.

Cada publicacion debe mostrar:

- imagen cuando exista;
- tipo: venta, trueque, donacion, regalo o servicio;
- titulo;
- precio o condicion;
- ubicacion aproximada;
- distancia;
- acceso a ver detalle;
- opcion de compartir cuando tenga sentido.

Debe evitar:

- tarjetas con demasiado texto;
- filtros avanzados prematuros;
- acciones que compitan con abrir la publicacion.

Accion principal: abrir publicacion.

## 3. Crear publicacion

Objetivo: publicar con la menor friccion posible, sin exponer ubicacion privada.

Debe pedir solo lo esencial:

- titulo;
- descripcion;
- tipo;
- categoria;
- precio o condicion;
- zona publica aproximada;
- ubicacion privada para coordinar;
- imagenes;
- forma de contacto.

Debe mostrar:

- progreso simple;
- ayuda contextual;
- vista previa;
- confirmaciones claras;
- diferencia entre ubicacion privada y publica.

Debe evitar:

- campos obligatorios sin valor inmediato;
- lenguaje tecnico;
- pasos largos;
- monetizacion explicita antes de validar el modelo.

Accion principal: guardar o publicar.

## 4. Detalle de publicacion

Objetivo: permitir evaluar, confiar, contactar y compartir.

Debe mostrar primero:

- imagen;
- tipo;
- distancia;
- senal de confianza;
- titulo;
- precio o condicion;
- descripcion;
- zona publica;
- forma de contacto.

Luego puede mostrar:

- panel de interes;
- opciones de entrega;
- compartir;
- privacidad geografica;
- informacion del propietario o puesto virtual.

Debe evitar:

- pedir instalacion para compartir;
- mostrar ubicacion exacta;
- mezclar demasiadas decisiones en el primer vistazo.

Accion principal: marcar interes, contactar o compartir.

## 5. Perfil

Objetivo: construir confianza sin volver burocratica la experiencia.

Debe mostrar:

- nombre visible;
- zona o localidad general;
- reputacion simple;
- publicaciones activas;
- historial basico;
- datos verificados cuando existan.

Debe evitar:

- formularios extensos al inicio;
- pedir datos sensibles sin necesidad;
- convertir una publicacion simple en una tienda obligatoria.

Accion principal: completar identidad minima o gestionar publicaciones.

## 6. Puesto virtual

Objetivo: dar presencia digital a comercios, oficios, productores y servicios locales.

Debe diferenciarse de una publicacion simple.

Puede incluir:

- nombre del puesto;
- rubro;
- descripcion breve;
- catalogo;
- servicios;
- horarios;
- zona de trabajo;
- reputacion;
- formas de contacto;
- publicaciones destacadas.

Debe evitar:

- obligar a usuarios ocasionales a crear puesto;
- plantillas demasiado complejas;
- estetica corporativa pesada.

Accion principal: ver catalogo, contactar o seguir.

## 7. Logistica local

Objetivo: resolver traslados sin convertir FeriApp en una empresa de envios prematuramente.

Debe funcionar como modulo independiente y progresivo.

Puede mostrar:

- retiro coordinado;
- traslado cercano;
- bici, auto, flete o ayuda local;
- disponibilidad aproximada;
- costo estimado;
- acuerdo entre partes.

Debe evitar:

- prometer cobertura garantizada;
- calcular comisiones definitivas sin validacion;
- mezclar pagos, seguros o responsabilidades antes de tener reglas claras.

Accion principal: solicitar o explorar alternativas de entrega.

## 8. Actividad

Objetivo: reunir seguimiento simple de intereses, publicaciones y entregas.

Debe mostrar:

- intereses enviados;
- respuestas recibidas;
- publicaciones propias;
- estados de publicaciones;
- solicitudes de entrega;
- acciones pendientes.

Debe evitar:

- notificaciones excesivas;
- lenguaje tecnico;
- paneles de gestion complejos.

Accion principal: retomar una conversacion, publicacion o entrega.

## 9. Estados de publicacion

Los estados deben ser claros y visibles:

- `draft`: borrador;
- `active`: activa;
- `paused`: pausada;
- `reserved`: reservada;
- `closed`: cerrada o vendida.

Los estados deben poder entenderse sin leer documentacion. El color debe acompanar al texto, no reemplazarlo.

## 10. Regla de avance

Antes de sumar o redisenar una pantalla, verificar:

- cual es la tarea principal;
- que informacion aparece primero;
- que queda para profundizar;
- que accion debe estar mas visible;
- que riesgo de privacidad existe;
- como se comparte;
- que ocurre en movil.
