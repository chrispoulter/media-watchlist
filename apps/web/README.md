# @media-watchlist/web

React single-page app for Media Watchlist — search TMDB for movies/TV shows, manage account/security settings, and maintain a personal watchlist.

## Stack

- React 19 + Vite, TypeScript
- React Router (data routes)
- TanStack Query for server state
- [Better Auth](https://www.better-auth.com/) client — email/password, Google OAuth, TOTP 2FA
- Tailwind CSS v4 + shadcn/ui (Radix primitives)
- React Hook Form + Zod for forms/validation

## Prerequisites

- Node.js >= 20.19.0
- The [API](../api/README.md) running (locally or elsewhere)

## Setup

From the repo root, install dependencies (this is an npm workspace, so run installs from the root, not here):

```bash
npm install
```

Copy the env file and point it at your API:

```bash
cp apps/web/.env.example apps/web/.env
```

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Base URL of the API (default `http://localhost:3000`) |

## Development

```bash
npm run dev
```

The app runs at http://localhost:5173.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — typecheck and build for production
- `npm run preview` — preview the production build locally
- `npm run typecheck` — `tsc -b`
- `npm run lint` / `npm run lint:fix`
- `npm run generate-favicons` — regenerate favicon assets from the source image

## Project structure

```
src/
  app.tsx             # router/providers setup
  main.tsx            # entry point
  components/         # shared components, including shadcn/ui primitives in ui/
  features/           # feature modules (auth, profile, search, watchlist), each with routes/queries/pages
  lib/                # API client, auth client, app config, query client, utils
  pages/              # top-level error/not-found pages
```

## Deployment

Ships as static files. `vercel.json` configures SPA rewrites for Vercel; `Dockerfile` builds and serves the app via nginx (used by the root `docker-compose.yml`), reading runtime config through `20-generate-env-config.sh`.
