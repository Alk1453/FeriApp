# FeriApp

FeriApp es la feria digital de tu barrio: una plataforma hiperlocal para
comprar, vender, intercambiar, donar y descubrir oportunidades cerca de casa.

El proyecto esta organizado como un repositorio preparado para crecer por
modulos. La app web principal vive en `apps/web`.

## Demo local

```bash
cd apps/web
pnpm install
pnpm dev
```

La vista local queda disponible en:

```text
http://127.0.0.1:3000
```

Si el puerto `3000` ya esta ocupado, se puede usar otro:

```bash
pnpm dev -- --port 3001
```

## Despliegue en Vercel

Configuracion recomendada al importar el repositorio:

- Framework: Next.js
- Root Directory: `apps/web`
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Output Directory: dejar vacio, Vercel lo detecta para Next.js

## Arquitectura inicial

- `apps/web/src/app`: presentacion con Next.js App Router.
- `apps/web/src/modules`: modulos de producto.
- `apps/web/src/shared`: reglas compartidas y dominio comun.
- `apps/web/docs`: reglas tecnicas del proyecto.
