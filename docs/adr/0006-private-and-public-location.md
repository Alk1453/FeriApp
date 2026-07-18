# ADR 0006 - Private and public location

## Decision

Separar ubicacion privada de ubicacion publica aproximada.

## Rationale

La distancia es central para FeriApp, pero la ubicacion exacta es sensible.

## Consequences

- La ubicacion privada se usa para calculos, coincidencias y coordinacion segura.
- La ubicacion publica muestra barrio, localidad, radio o distancia estimada.
- Nunca se expone domicilio exacto por defecto.
