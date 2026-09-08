# media-watchlist

An npm-workspaces monorepo with three packages:

- [`packages/api`](packages/api) — Express API (TypeScript, ESM)
- [`packages/ui`](packages/ui) — React UI (Vite, TypeScript)
- `packages/shared` — shared types (zod schemas) used by both

## Prerequisites

- Node.js >= 20.19

## Setup

```sh
npm install
```

Installs dependencies for both workspaces from the repo root.

Each package needs its own local `.env`, copied from its `.env.example` (see [packages/api/README.md](packages/api/README.md) and `packages/ui/.env.example`) — the UI talks to the API over an absolute `VITE_API_URL` (CORS + cookies), not a dev-server proxy.

## Commands

| Command                | Description                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `npm run dev`          | Starts the API (`:3000`) and UI dev server (`:5173`) together via Turborepo.            |
| `npm run build`        | Builds all packages via Turborepo (cached — unchanged packages are skipped on rebuild). |
| `npm run typecheck`    | Type-checks all packages via Turborepo (cached).                                        |
| `npm run lint`         | Lints all packages via Turborepo (cached), using the shared root ESLint config.         |
| `npm run lint:fix`     | Same, applying auto-fixes.                                                              |
| `npm run format`       | Formats the whole workspace with Prettier.                                              |
| `npm run format:check` | Checks formatting without writing changes.                                              |

## Debugging

VS Code launch configs are provided in [.vscode/launch.json](.vscode/launch.json):

- **Debug API** — launches the Express server directly under Node with `tsx`, with full TypeScript breakpoint support.
- **Debug UI (Chrome)** — starts the Vite dev server and attaches Chrome's built-in debugger.
- **Debug Full Stack** — runs both together.

## Docker

Runs the whole stack — API, UI, Postgres, and Mailpit (a local SMTP sink) — without any local Node setup:

```sh
cp .env.example .env
# fill in GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / TMDB_API_READ_TOKEN in .env

docker compose up --build
```

| Service  | URL                   |
| -------- | --------------------- |
| UI       | http://localhost:5173 |
| API      | http://localhost:3000 |
| Mailpit  | http://localhost:8025 |
| Postgres | localhost:5432        |

A one-off `migrate` service applies Drizzle migrations before the API starts. Both images are built with `turbo prune`, so each only bundles the source it actually depends on (`packages/shared` plus its own package).

Docker Compose and `npm run dev` both claim ports `3000`/`5173` — use one or the other, not both at once.

## Notable version choices

- **TypeScript is pinned to `^6.0.3`**, not npm's `latest` (`7.x`) — `typescript-eslint` doesn't support the new TS 7 compiler yet. Revisit once it does.
- **Express `^5.2.1`** is used instead of 4.x, since Express 4 is maintenance-only and nearing end of life.
