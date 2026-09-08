# media-watchlist

An npm-workspaces monorepo with two packages:

- [`packages/api`](packages/api) — Express API (TypeScript, ESM)
- [`packages/ui`](packages/ui) — React UI (Vite, TypeScript)

## Prerequisites

- Node.js >= 20.19

## Setup

```sh
npm install
```

Installs dependencies for both workspaces from the repo root.

## Commands

| Command                | Description                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Starts the API (`:3001`) and UI dev server (`:5173`) together via Turborepo; the UI proxies `/api/*` to the API. |
| `npm run build`        | Builds both packages via Turborepo (cached — unchanged packages are skipped on rebuild).                         |
| `npm run lint`         | Lints the whole workspace with the shared root ESLint config.                                                    |
| `npm run lint:fix`     | Same, applying auto-fixes.                                                                                       |
| `npm run format`       | Formats the whole workspace with Prettier.                                                                       |
| `npm run format:check` | Checks formatting without writing changes.                                                                       |

## Debugging

VS Code launch configs are provided in [.vscode/launch.json](.vscode/launch.json):

- **Debug API** — launches the Express server directly under Node with `tsx`, with full TypeScript breakpoint support.
- **Debug UI (Chrome)** — starts the Vite dev server and attaches Chrome's built-in debugger.
- **Debug Full Stack** — runs both together.

## Notable version choices

- **TypeScript is pinned to `^6.0.3`**, not npm's `latest` (`7.x`) — `typescript-eslint` doesn't support the new TS 7 compiler yet. Revisit once it does.
- **Express `^5.2.1`** is used instead of 4.x, since Express 4 is maintenance-only and nearing end of life.
