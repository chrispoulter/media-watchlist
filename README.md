# Media Watchlist

A full-stack app for searching movies and TV shows (via TMDB) and keeping a personal watchlist. Turborepo monorepo with an Hono API and a React SPA.

## Apps & packages

- [apps/api](apps/api/README.md) — Hono API: auth (Better Auth), TMDB search, watchlist, Drizzle/PostgreSQL
- [apps/web](apps/web/README.md) — React (Vite) SPA frontend
- `packages/shared` — Zod schemas and types shared between api and web
- `packages/eslint-config` — Shared ESLint config
- `packages/typescript-config` — Shared tsconfig bases

## Prerequisites

- Node.js >= 20.19.0
- npm 11
- Docker (for Postgres/Mailpit locally, or running the full stack)
- A [TMDB](https://www.themoviedb.org/) API read access token

## Getting started

Install dependencies from the repo root:

```bash
npm install
```

Copy the env files and fill in the values (see each app's README for details):

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Start Postgres and Mailpit (or run the full stack in Docker — see below), then run everything in dev mode via [Turborepo](https://turborepo.com/):

```bash
npm run dev
```

## Root scripts

- `npm run dev` — run all apps in dev mode
- `npm run build` — build all apps/packages
- `npm run typecheck` — typecheck all apps/packages
- `npm run lint` / `npm run lint:fix` — lint all apps/packages
- `npm run format` / `npm run format:check` — Prettier across the repo

## Running with Docker

`docker-compose.yml` runs the full stack: Postgres, Mailpit (for catching outgoing emails locally), a one-off migration job, the API, and the web app (served via nginx).

```bash
cp .env.example .env   # fill in GOOGLE_CLIENT_ID/SECRET and TMDB_API_READ_TOKEN
docker compose up --build
```

- Web: http://localhost:5173
- API: http://localhost:3000 (docs at `/reference`, health at `/health`)
- Mailpit UI: http://localhost:8025

## License

MIT — see [LICENSE](LICENSE).
