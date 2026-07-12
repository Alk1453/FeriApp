# FeriApp

FeriApp es la feria digital de tu barrio: una plataforma hiperlocal para
comprar, vender, intercambiar, donar y descubrir oportunidades cerca de casa.

El proyecto esta preparado para crecer por modulos y ahora la app web vive en
la raiz del repositorio para que Vercel la detecte sin configuracion manual de
Root Directory.

## Demo local

```bash
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
- Root Directory: dejar vacio
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Output Directory: dejar vacio, Vercel lo detecta para Next.js

## Arquitectura inicial

- `src/app`: presentacion con Next.js App Router.
- `src/modules`: modulos de producto.
- `src/shared`: reglas compartidas y dominio comun.
- `docs`: reglas tecnicas del proyecto.
