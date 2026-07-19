# FeriApp - Inteligencia de economia local

## Idea

FeriApp puede generar informacion valiosa sobre la economia real de una zona:
que se ofrece, que se busca, que precios aparecen, que servicios faltan, que
categorias se mueven y donde hay oportunidades barriales.

Esto no deberia nacer como un proyecto aparte. Conviene tratarlo como un modulo
futuro dentro de FeriApp, alimentado por el uso normal de la plataforma.

## Valor posible

- Informes para comercios, feriantes, cooperativas o municipios.
- Deteccion de demanda insatisfecha por zona.
- Tendencias de precios locales por categoria.
- Mapa de oficios, servicios y necesidades frecuentes.
- Senales para logistica barrial, donaciones y economia circular.
- Datos agregados para potenciales inversores o aliados.

## Datos utiles a recolectar

- Tipo de publicacion: venta, trueque, regalo, donacion, servicio o necesidad.
- Categoria y subcategoria.
- Zona aproximada, nunca domicilio exacto.
- Rango de precio o condicion de intercambio.
- Cantidad de vistas, guardados, compartidos e interesados.
- Propuestas recibidas: consulta, compra, trueque o ayuda.
- Tiempo hasta pausar, reservar o cerrar.
- Palabras de busqueda sin identificar a la persona.

## Reglas de privacidad

- No vender datos personales.
- No exponer ubicacion exacta.
- Trabajar con datos agregados por zona, categoria y periodo.
- Separar identidad de usuario de comportamiento estadistico.
- Permitir explicar que datos se usan y para que.
- Evitar conclusiones sobre una persona individual.

## Arquitectura sugerida

El modulo puede llamarse `local-economic-intelligence`.

Al inicio solo debe definir eventos simples:

- `publication_created`
- `radar_filter_used`
- `search_submitted`
- `interest_sent`
- `barter_proposal_sent`
- `publication_shared`
- `publication_closed`

Cada evento debe guardar datos minimos y agregables:

- fecha;
- zona aproximada;
- categoria;
- tipo de accion;
- tipo de publicacion;
- senal de monetizacion si corresponde.

## Riesgo a cuidar

Si se recolecta mal, puede sentirse invasivo. La ventaja competitiva no debe ser
"vigilar usuarios", sino entender mejor la economia local para crear mas
oportunidades utiles.

La regla de producto deberia ser:

> FeriApp aprende del movimiento local sin exponer a las personas.
