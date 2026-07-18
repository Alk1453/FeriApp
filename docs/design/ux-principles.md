# FeriApp - Principios de experiencia de usuario (UX)

## Proposito

Este documento define los principios visuales, funcionales y emocionales que deben guiar toda decision de interfaz dentro de FeriApp.

FeriApp no es solamente un marketplace ni una aplicacion de clasificados. Su mision es convertirse en:

> La herramienta digital para quienes nunca tuvieron una.

Cada pantalla, componente y flujo debe respetar este objetivo.

## 1. Principios fundamentales

Toda decision de diseno debe responder a estos principios:

- simplicidad;
- confianza;
- transparencia;
- cercania;
- accesibilidad;
- rapidez;
- familiaridad;
- utilidad real.

La aplicacion debe sentirse moderna, amable, limpia, seria, local y facil de comprender.

Debe evitar transmitir complejidad, burocracia, tecnicismos, agresividad comercial, exceso corporativo o saturacion visual.

## 2. Referencia visual

Airbnb puede servir como referencia de claridad, jerarquia y limpieza, pero FeriApp no debe parecer una copia.

La identidad propia debe estar ligada a:

- economia local;
- barrio;
- confianza;
- pequenos comercios;
- oficios;
- personas reales.

Objetivos visuales:

- abundancia de espacios en blanco;
- jerarquias claras;
- pocos colores principales;
- tarjetas limpias;
- tipografia legible;
- componentes reconocibles;
- navegacion intuitiva.

## 3. Progresion de la informacion

La interfaz debe revelar contenido progresivamente. La informacion no debe mostrarse toda al mismo tiempo.

### Nivel 1 - Descubrir

Mostrar unicamente:

- ubicacion;
- buscador;
- categorias;
- publicaciones;
- boton de publicar.

Objetivo: permitir que el usuario entienda rapidamente que puede hacer.

### Nivel 2 - Explorar

Al abrir una publicacion, mostrar:

- fotografias;
- precio o condicion;
- distancia aproximada;
- confianza basica;
- formas de entrega;
- accion de compartir.

Objetivo: permitir evaluar la oferta sin distracciones.

### Nivel 3 - Profundizar

Solo cuando el usuario lo solicite, mostrar:

- perfil completo;
- puesto virtual;
- historial;
- valoraciones;
- datos profesionales;
- logistica;
- detalles adicionales.

Regla principal:

> Primero descubrir, luego confiar y recien despues decidir.

## 4. Consistencia visual

Todos los modulos deben compartir el mismo lenguaje visual.

Mantener:

- una sola familia tipografica;
- una sola familia de iconos;
- sistema unificado de tarjetas;
- espaciados coherentes;
- radios consistentes;
- animaciones discretas.

Evitar:

- estilos mezclados;
- componentes duplicados;
- colores arbitrarios;
- iconografia inconsistente.

## 5. Paleta emocional

La interfaz debe transmitir transparencia, serenidad, seguridad y proximidad.

Base visual recomendada:

- blanco;
- gris claro;
- tonos piedra;
- superficies suaves;
- acentos verdes moderados;
- detalles calidos.

Los colores deben ayudar a comprender, no decorar. Evitar colores intensos o agresivos como recurso principal.

## 6. Feedback inmediato

Toda accion del usuario debe producir una respuesta visible e inmediata.

Ejemplos:

- publicacion creada;
- enlace copiado;
- mensaje enviado;
- perfil actualizado;
- entrega solicitada;
- denuncia registrada;
- busqueda guardada.

El usuario nunca debe preguntarse si la accion funciono o no.

Priorizar mensajes claros, indicadores de carga, confirmaciones breves, estados visibles y animaciones discretas.

## 7. Publicar debe ser extremadamente sencillo

Publicar es una funcion central. Debe sentirse tan simple como enviar una foto por WhatsApp.

Principios:

- pocos pasos;
- lenguaje cotidiano;
- autocompletado cuando sea posible;
- ayudas contextuales;
- posibilidad de editar mas tarde.

Evitar formularios extensos, campos innecesarios y terminologia tecnica.

## 8. Navegacion principal

La navegacion movil tendra prioridad absoluta.

Estructura recomendada:

```text
Inicio
Explorar
Publicar
Actividad
Perfil
```

El boton "Publicar" debe ocupar una posicion destacada.

## 9. Publicaciones simples y puestos virtuales

FeriApp debe diferenciar claramente dos modelos.

### Publicacion simple

Pensada para:

- ventas ocasionales;
- donaciones;
- intercambios;
- anuncios puntuales;
- trabajos esporadicos.

Debe requerir el minimo esfuerzo.

### Puesto virtual

Pensado para:

- profesionales;
- comercios;
- artesanos;
- fabricantes;
- empresas;
- oficios.

Debe ofrecer catalogo, reputacion, horarios, identidad visual, servicios e informacion ampliada.

Ambos modelos deben convivir sin conflictos.

## 10. Compartir como funcion estrategica

Compartir no es una caracteristica secundaria. Todo contenido importante debe poder compartirse facilmente.

Prioridades:

- WhatsApp;
- Instagram;
- Facebook;
- enlaces publicos;
- codigos QR.

Objetivo: permitir que cualquier usuario promocione su actividad incluso sin conocimientos digitales.

## 11. Accesibilidad

Disenar pensando en usuarios reales.

Considerar:

- distintos niveles de experiencia tecnologica;
- pantallas pequenas;
- conexiones lentas;
- personas mayores;
- cansancio visual;
- dificultades de concentracion.

Priorizar textos legibles, botones grandes, contraste adecuado, navegacion clara y acciones reversibles.

## 12. Filosofia general

Cada nueva funcion debera responder positivamente a estas preguntas:

- Es facil de entender?
- Genera confianza?
- Reduce la complejidad?
- Puede usarla alguien sin experiencia digital?
- Se siente rapida?
- Mantiene coherencia visual?
- Ayuda a la economia local?

Si la respuesta es negativa, la funcion debera redisenarse antes de implementarse.

## Criterio de implementacion

Estos principios no obligan a redisenar toda la aplicacion de una vez. Deben aplicarse de forma progresiva, empezando por los flujos centrales:

- inicio y exploracion;
- listado de publicaciones;
- detalle publico compartible;
- formulario de creacion;
- perfil o puesto virtual cuando exista una necesidad concreta.
