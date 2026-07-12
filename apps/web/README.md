# FeriApp

FeriApp es la feria digital de tu barrio: una plataforma hiperlocal para
comprar, vender, intercambiar, donar y descubrir oportunidades cerca de casa.

El marketplace es el primer modulo de una plataforma preparada para crecer hacia
radar del barrio, modo vecino, embajadores locales, comercios, servicios,
eventos, beneficios, empleo y turismo.

## Principios

- Priorizar cercania geografica.
- Proteger la ubicacion exacta por defecto.
- Mantener una arquitectura modular.
- Separar interfaz, reglas de negocio, acceso a datos e integraciones.
- Validar reglas criticas fuera de la interfaz.
- Disenar mobile-first y con baja friccion tecnologica.

## Desarrollo

```bash
pnpm dev
```

La app local abre en:

```text
http://127.0.0.1:3000
```

## Estructura

- `src/app`: presentacion con Next.js App Router.
- `src/modules`: modulos de producto.
- `src/shared`: reglas compartidas y dominio comun.
- `docs`: reglas y decisiones tecnicas del proyecto.
