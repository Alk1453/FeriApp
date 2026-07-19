# FeriApp - Busquedas, necesidades y propuestas de trueque

## Proposito

FeriApp debe mostrar oferta y demanda local. No alcanza con publicar lo que una persona tiene; tambien debe poder declarar lo que busca o necesita.

Esto convierte el radar en una herramienta de oportunidades en ambos sentidos:

- quien ofrece algo encuentra interesados;
- quien necesita algo aparece ante posibles oferentes;
- quien quiere truecar puede proponer aunque el vendedor no lo haya previsto.

## Busco / necesito

`Busco / necesito` es un tipo de publicacion o senal de radar.

Debe servir para:

- productos;
- servicios;
- oficios;
- donaciones;
- trueques;
- ayuda puntual;
- oportunidades comerciales.

Ejemplo:

```text
Usuario X busca bicicleta rodado 26 a menos de 1 km.
```

La app puede mostrar esa necesidad dentro de categorias compatibles, como transporte o bicicletas.

## Propuesta de trueque

Una persona puede ofrecer trueque sobre una publicacion que originalmente era venta.

Regla:

> El trueque debe ser una propuesta mediada por FeriApp, no un salto directo fuera de la app.

Esto permite:

- registrar interes;
- medir demanda;
- proteger privacidad;
- evitar que la operacion salga demasiado rapido de la plataforma;
- abrir futuras formas de monetizacion o mediacion.

## Aplicacion en demo

La demo incorpora:

- tipo de publicacion `Busco / necesito`;
- bloque de busquedas cercanas en el radar;
- filtros interactivos de radar: `Todo`, `Ofertas`, `Buscan` y `Trueque`;
- busqueda textual sobre productos, servicios, categorias e intenciones;
- senales combinadas en el mapa: publicaciones y necesidades;
- enlace desde el radar hacia el formulario con `Busco / necesito` precargado;
- accion `Ofrecer trueque` dentro del detalle de publicacion.

## Regla de arquitectura

Separar `publicacion` de `senal de radar`.

Una publicacion tiene URL propia, estado, contacto, descripcion y reglas de
privacidad. Una senal de radar puede ser mas liviana: una necesidad, una
intencion de trueque, una alerta barrial o una oportunidad detectada.

Esta separacion permite que FeriApp muestre utilidad antes de exigir demasiada
carga al usuario, pero sin confundir datos temporales con publicaciones reales.

## Modos del radar

- `Todo`: mezcla oferta y demanda local.
- `Ofertas`: ventas, servicios, regalos y donaciones.
- `Buscan`: necesidades publicadas o declaradas por vecinos.
- `Trueque`: publicaciones de intercambio y necesidades compatibles con trueque.

El radar no debe revelar ubicacion exacta. Debe mostrar distancia aproximada,
zona o radio segun nivel de confianza y consentimiento.

## Flujo recomendado

Cuando una persona usa el radar y no encuentra lo que busca, FeriApp debe
ofrecerle publicar esa necesidad con el menor esfuerzo posible.

Ejemplo:

```text
Busca "bicicleta" en el radar -> Publicar busqueda -> formulario en modo
Busco / necesito con el titulo sugerido.
```

Esto convierte una busqueda sin resultado en una senal util para la comunidad y
para futuros oferentes.

## Riesgos a cuidar

- no saturar el radar con pedidos irrelevantes;
- no mostrar datos personales del buscador;
- no prometer coincidencias exactas sin backend;
- no obligar al vendedor a aceptar trueques;
- diferenciar claramente consulta, compra, propuesta y trueque.
