# FeriApp - Current Audit

## 1. Partes existentes

- App Next.js desplegada en Vercel.
- Repositorio GitHub publico.
- Publicaciones mock.
- Listado de publicaciones.
- Detalle publico compartible.
- Formulario de publicacion con validacion local.
- Cuenta local de prueba.
- Zona local de prueba.
- Ubicacion privada separada de zona publica aproximada.
- Compartir por WhatsApp, Facebook, X, copiar enlace y compartir nativo.

## 2. Conceptos reutilizables

- Modelo `Publication`.
- Zod como validacion de frontera.
- `local-session` como prototipo reemplazable por Supabase Auth.
- `local-publications` como prototipo reemplazable por Postgres/Storage.
- `get-publication-share-links` como servicio interno de difusion.
- Componentes actuales de publicacion y share panel.

## 3. Modulos faltantes

- confianza y reputacion;
- denuncias y moderacion;
- puestos virtuales;
- servicios y oficios;
- validacion documental;
- red local de movilidad;
- operaciones;
- valoraciones;
- pagos;
- administracion.

## 4. Dependencias que podrian aparecer

- Supabase Auth;
- Supabase Database;
- Supabase Storage;
- PostGIS;
- mapas/geocoding;
- generacion de imagenes sociales;
- QR;
- Mercado Pago;
- analitica;
- notificaciones.

No agregar dependencias hasta que un flujo lo necesite.

## 5. Riesgos tecnicos

- Mezclar datos locales de demo con persistencia real.
- Hardcodear territorios.
- Acoplar UI a proveedores.
- Crear un modelo de reputacion dificil de explicar.
- Implementar logistica o pagos antes de validar uso.
- Perder rendimiento movil por formularios extensos.

## 6. Riesgos legales y privacidad

- Exponer ubicaciones exactas.
- Prometer garantias legales sobre profesionales.
- Manejar documentacion sensible sin reglas de acceso.
- Procesar pagos o envios sin terminos claros.
- Permitir categorias reguladas sin moderacion.
- No conservar evidencia administrativa suficiente.

## 7. Partes que no deben implementarse aun

- pagos reales;
- comisiones automaticas;
- optimizacion de rutas;
- garantias legales;
- validacion documental obligatoria general;
- reputacion numerica opaca;
- todos los modulos a la vez.
