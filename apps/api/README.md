# @media-watchlist/api

A REST API for tracking movies and TV shows you want to watch. Built with Express, TypeScript, and PostgreSQL.

## Features

- Email/password authentication and social login (Google OAuth)
- Email verification and password reset flows
- Two-factor authentication (TOTP)
- Search for movies and TV shows via The Movie Database (TMDB)
- Personal watchlist management — add and remove items
- Transactional emails with React Email templates
- Interactive API documentation (Scalar) at the root route

## Tech stack

| Layer          | Technology               |
| -------------- | ------------------------ |
| Framework      | Express 5                |
| Database       | PostgreSQL + Drizzle ORM |
| Authentication | Better Auth              |
| Media search   | TMDB API                 |
| Email          | Nodemailer + React Email |
| API docs       | Scalar (OpenAPI)         |
| Logging        | Pino                     |

## Setup

From the repo root:

```sh
npm install
cp packages/api/.env.example packages/api/.env
# fill in required values in packages/api/.env — see Environment variables below
```

You'll need a reachable PostgreSQL database (`DATABASE_URL`) and, to actually send email, an SMTP sink such as [Mailpit](https://mailpit.axllent.org). The repo root's `docker compose up` (see the [root README](../../README.md#docker)) starts both for you — or point `DATABASE_URL`/`SMTP_*` at whatever you already have running locally.

Apply migrations, then start the dev server:

```sh
npm run db:migrate -w packages/api
npm run dev -w packages/api
```

Or use the root-level `npm run dev`, which starts this alongside the UI via Turborepo.

## Environment variables

| Variable               | Required | Default                 | Description                                                      |
| ---------------------- | -------- | ----------------------- | ---------------------------------------------------------------- |
| `PORT`                 | No       | `3000`                  | Port the server listens on                                       |
| `DATABASE_URL`         | Yes      | —                       | PostgreSQL connection string                                     |
| `BETTER_AUTH_SECRET`   | Yes      | —                       | Auth signing secret (min 32 chars)                               |
| `BETTER_AUTH_URL`      | No       | `http://localhost:3000` | Public base URL of the API                                       |
| `CLIENT_ORIGIN`        | No       | `http://localhost:5173` | Allowed CORS origin(s), comma-separated                          |
| `GOOGLE_CLIENT_ID`     | No       | —                       | Google OAuth client ID                                           |
| `GOOGLE_CLIENT_SECRET` | No       | —                       | Google OAuth client secret                                       |
| `TMDB_API_READ_TOKEN`  | Yes      | —                       | TMDB API read access token                                       |
| `SMTP_HOST`            | No       | `localhost`             | SMTP server host                                                 |
| `SMTP_PORT`            | No       | `587`                   | SMTP server port                                                 |
| `SMTP_SECURE`          | No       | `false`                 | Use TLS/SSL for SMTP                                             |
| `SMTP_FROM`            | Yes      | —                       | From address for outgoing emails                                 |
| `SMTP_USER`            | No       | —                       | SMTP username                                                    |
| `SMTP_PASS`            | No       | —                       | SMTP password                                                    |
| `LOG_LEVEL`            | No       | `info`                  | Log level: `fatal`, `error`, `warn`, `info`, `debug`, or `trace` |

## API overview

Interactive documentation with a request explorer is available at `GET /` when the server is running.

### Health

| Method | Path      | Auth | Description                                                            |
| ------ | --------- | ---- | ---------------------------------------------------------------------- |
| GET    | `/health` | No   | Checks database, mailer, and TMDB — returns 503 if any service is down |
| GET    | `/alive`  | No   | Lightweight liveness probe — always returns 200, no downstream checks  |

### Authentication (`/api/auth/*`)

All auth routes are handled by Better Auth.

| Method | Path                               | Description                           |
| ------ | ---------------------------------- | ------------------------------------- |
| POST   | `/api/auth/sign-up/email`          | Register with email and password      |
| POST   | `/api/auth/sign-in/email`          | Sign in with email and password       |
| POST   | `/api/auth/sign-out`               | Sign out                              |
| GET    | `/api/auth/get-session`            | Get current session                   |
| GET    | `/api/auth/sign-in/social`         | Sign in with Google                   |
| POST   | `/api/auth/forget-password`        | Request password reset                |
| POST   | `/api/auth/reset-password`         | Reset password with token             |
| POST   | `/api/auth/two-factor/enable`      | Enable TOTP two-factor authentication |
| POST   | `/api/auth/two-factor/disable`     | Disable two-factor authentication     |
| POST   | `/api/auth/two-factor/verify-totp` | Verify a TOTP code                    |

### Search

| Method | Path                        | Auth | Description                         |
| ------ | --------------------------- | ---- | ----------------------------------- |
| GET    | `/api/search?query=<query>` | Yes  | Search TMDB for movies and TV shows |

### Watchlist

| Method | Path                 | Auth | Description                       |
| ------ | -------------------- | ---- | --------------------------------- |
| GET    | `/api/watchlist`     | Yes  | Get the current user's watchlist  |
| POST   | `/api/watchlist`     | Yes  | Add an item to the watchlist      |
| DELETE | `/api/watchlist/:id` | Yes  | Remove an item from the watchlist |

**Add item request body:**

```json
{
  "providerId": "tmdb:550",
  "mediaType": "movie",
  "title": "Fight Club",
  "posterUrl": "https://image.tmdb.org/t/p/w300/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg",
  "overview": "...",
  "releaseDate": "1999-10-15"
}
```

## Scripts

Run with `-w packages/api` from the repo root (or `cd packages/api` first).

| Script        | Description                                          |
| ------------- | ---------------------------------------------------- |
| `dev`         | Start development server with hot reload             |
| `build`       | Compile TypeScript to `dist/`                        |
| `start`       | Run the compiled server                              |
| `typecheck`   | Run TypeScript type checking                         |
| `lint`        | Lint this package with the shared root ESLint config |
| `lint:fix`    | Same, applying auto-fixes                            |
| `db:generate` | Generate a new Drizzle migration                     |
| `db:migrate`  | Apply pending migrations                             |
| `db:studio`   | Open Drizzle Studio                                  |
| `email:dev`   | Preview email templates (port 3001)                  |

`format`/`format:check` are handled at the workspace root (`npm run format`) — Prettier isn't part of the per-package Turborepo task graph the way `lint`/`typecheck`/`build` are.

`db:generate`/`db:migrate`/`db:studio` are intentionally not wired into Turborepo's task graph — they're one-off, side-effecting commands against a real database rather than cacheable build steps.
