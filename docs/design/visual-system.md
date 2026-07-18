# FeriApp - Sistema visual base

## Proposito

Este documento traduce los principios de UX en decisiones visuales concretas para la primera evolucion de la interfaz.

El sistema debe ayudar a que FeriApp se sienta simple, confiable, local y facil de usar. No busca cerrar una identidad definitiva, sino dar una base consistente para redisenar pantallas sin improvisar estilos.

## 1. Direccion visual

FeriApp debe sentirse:

- clara;
- cercana;
- activa;
- confiable;
- accesible;
- barrial;
- moderna sin parecer fria.

La interfaz debe evitar verse demasiado corporativa, lujosa, infantil o saturada.

## 2. Paleta de color

La base debe ser blanca o gris muy claro. Los colores vivos deben usarse para orientar acciones, estados y pequenas senales de identidad.

### Colores principales

```text
Fondo principal     #F8F9F6
Superficie          #FFFFFF
Superficie suave    #F1F4EE
Texto principal     #20231F
Texto secundario    #667064
Borde suave         #DDE5D8
```

### Colores de identidad

```text
Verde primario      #2F7D3A
Verde suave         #E8F3EA
Verde profundo      #1F5E2C
Naranja acento      #F28C28
Naranja suave       #FFF1E2
Violeta apoyo       #7556A8
Violeta suave       #F0EBFA
```

### Uso recomendado

- Verde: confianza, publicar, acciones principales, estados positivos.
- Naranja: avisos utiles, oportunidades, energia, llamados secundarios.
- Violeta: categorias especiales, comunidad, identidad secundaria o detalles puntuales.
- Blanco/gris claro: estructura, descanso visual, lectura.

Regla: ningun color vivo debe dominar la pantalla completa. El verde puede ser protagonista, pero siempre con fondos claros y mucho espacio.

## 3. Estados visuales

Los estados deben ser evidentes aun para usuarios con poca experiencia digital.

```text
Activo / publicado  Verde #2F7D3A sobre #E8F3EA
Pausado             Naranja #A65F12 sobre #FFF1E2
Cerrado / vendido   Gris #5F665E sobre #EEF1EC
Exito               Verde #2F7D3A sobre #E8F3EA
Error               Rojo #C63D32 sobre #FDECEA
Informativo         Violeta #7556A8 sobre #F0EBFA
```

Los estados activos deben cambiar de tono de forma clara: fondo suave para reposo, color pleno para seleccionado o accion confirmada.

## 4. Tipografia

La tipografia debe ser de facil lectura, amable y no demasiado dura.

Opciones recomendadas:

- `Nunito`: redondeada, amable, muy legible. Recomendada para FeriApp.
- `Plus Jakarta Sans`: moderna, limpia, algo mas seria.
- `Rubik`: cercana, simple, buena para interfaces moviles.

Decision inicial recomendada: usar `Nunito` para acercarse al caracter amable de Arial Rounded sin depender de una fuente menos comun.

Escala base:

```text
Titulo grande       28px / 700
Titulo de pantalla  22px / 700
Subtitulo           18px / 700
Texto principal     16px / 400
Texto secundario    14px / 400
Texto auxiliar      12px / 500
```

Reglas:

- no usar textos demasiado pequenos en acciones importantes;
- no escalar fuentes con el ancho de pantalla;
- evitar mayusculas sostenidas salvo etiquetas muy breves;
- mantener letter spacing en 0.

## 5. Botones

Los botones deben ser claros, grandes y faciles de tocar en movil.

### Primario

Uso: publicar, confirmar, contactar, enviar.

```text
Fondo        Verde primario
Texto        Blanco
Borde        Verde primario
Altura       44px minimo
Radio        8px
```

### Secundario

Uso: compartir, editar, ver mas, cancelar sin riesgo.

```text
Fondo        Blanco
Texto        Texto principal
Borde        Borde suave
Altura       44px minimo
Radio        8px
```

### Seleccionable

Uso: tipo de publicacion, categoria, metodo de entrega, filtros.

Estado inactivo:

```text
Fondo        Superficie suave
Texto        Texto principal
Borde        Transparente o borde suave
```

Estado activo:

```text
Fondo        Verde suave
Texto        Verde profundo
Borde        Verde primario
```

Cuando una opcion se activa, debe notarse por color, borde y peso visual, no solo por texto.

## 6. Tarjetas

Las tarjetas deben ayudar a escanear informacion, no decorar.

Reglas:

- radio de 8px;
- borde suave;
- sombra minima o inexistente;
- imagen visible cuando el contenido la necesita;
- titulo claro;
- precio o condicion en segundo nivel fuerte;
- distancia y ubicacion como dato auxiliar;
- estado visible si aplica.

Tarjeta de publicacion:

```text
Imagen
Titulo
Precio / condicion
Ubicacion aproximada
Distancia
Estado o forma de entrega cuando aporte valor
```

Evitar tarjetas dentro de tarjetas y secciones enteras flotando como grandes cards.

## 7. Navegacion inferior

La navegacion movil es prioritaria.

Estructura recomendada:

```text
Inicio
Explorar
Publicar
Actividad
Perfil
```

Reglas:

- siempre visible en pantallas principales moviles;
- `Publicar` al centro con mayor presencia;
- iconos simples y consistentes;
- etiqueta textual breve debajo de cada icono;
- estado activo en verde;
- fondo blanco con borde superior suave.

En desktop puede convertirse en navegacion superior o lateral simple, manteniendo los mismos destinos.

## 8. Iconografia

Usar una sola familia de iconos. Si el proyecto incorpora una libreria, priorizar `lucide-react` por claridad y consistencia.

Los iconos deben representar acciones reconocibles:

- casa para inicio;
- lupa para explorar;
- mas para publicar;
- mensaje o campana para actividad;
- usuario para perfil;
- compartir para difusion;
- mapa o pin para ubicacion;
- bicicleta/vehiculo/persona para movilidad local cuando corresponda.

## 9. Movimiento y feedback

Usar animaciones discretas y utiles:

- cambio de color al seleccionar;
- confirmacion breve al copiar o enviar;
- loaders simples;
- transiciones cortas en paneles desplegables.

Evitar animaciones decorativas que retrasen la accion principal.

## 10. Primera aplicacion en la demo

El sistema visual debe aplicarse primero a:

- inicio;
- listado de publicaciones;
- formulario de nueva publicacion;
- detalle publico compartible;
- barra de navegacion inferior.

Luego se puede extender a:

- cuenta;
- zona;
- perfil;
- puesto virtual;
- logistica local;
- confianza y reputacion.

## 11. Decisiones abiertas

Estas decisiones deben validarse al implementar:

- confirmar si `Nunito` sera la fuente definitiva;
- probar contraste real de verde, naranja y violeta en mobile;
- definir si el boton central de publicar sera circular o cuadrado con radio 8px;
- decidir cuanta informacion mostrar en tarjetas para no saturar el listado;
- validar que la navegacion inferior no tape acciones del formulario.
