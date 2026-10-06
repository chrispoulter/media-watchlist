# Media Watchlist

A React SPA for tracking movies and TV shows you want to watch. Search TMDB, build your list, manage your account — all in one place.

Connects to the [API](../api/README.md) in this monorepo for data and authentication.

## Tech Stack

- **[Vite 8](https://vite.dev/)** + **[React 19](https://react.dev/)** + **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS v4](https://tailwindcss.com/)** for styling
- **[shadcn/ui](https://ui.shadcn.com/)** component library (Vega style, Radix UI primitives)
- **[TanStack Query v5](https://tanstack.com/query/latest)** for server state
- **[React Hook Form](https://react-hook-form.com/)** + **[Zod](https://zod.dev/)** for forms and validation
- **[better-auth](https://better-auth.com/)** for authentication (cookie-based sessions)
- **[React Router v7](https://reactrouter.com/)** for client-side routing
- **[ky](https://github.com/sindresorhus/ky)** for API requests
- **[Sonner](https://sonner.emilkowal.ski/)** for toast notifications

## Features

### Authentication

- Register with email, password, first name, last name, and date of birth
- Register / sign in with Google OAuth
- Sign in with email and password (remember me option)
- Two-factor authentication (TOTP) at sign-in
- Forgot password / reset password via email link

### Watchlist

- Search TMDB for movies and TV shows with debounced input and type filter (All / Movies / TV)
- Add titles to your watchlist directly from search results
- View your full watchlist as a poster grid
- Reorder your watchlist
- Remove titles from your watchlist

### Profile

- Update name and date of birth
- Change email address
- Change password (revokes other sessions), or set one if you signed up with a social provider
- Link / unlink social accounts
- Enable / disable TOTP two-factor authentication with QR code setup flow
- Delete account

## Prerequisites

- Repo-wide prerequisites from the [root README](../../README.md#prerequisites)
- **API** running (see [apps/api](../api/README.md) for setup)

## Getting Started

```bash
# 1. Install dependencies (from the repo root)
npm install

# 2. Copy environment file and set the API URL
cd apps/web
cp .env.example .env

# 3. Start the dev server
npm run dev
```

Running `npm run dev` from the repo root starts the API and web app together.

The app will be available at `http://localhost:5173`. API requests are directed to `API_URL` during development.

## Environment Variables

| Variable  | Description                         | Default                 |
| --------- | ----------------------------------- | ----------------------- |
| `API_URL` | Base URL of the media-watchlist-api | `http://localhost:3000` |

## Available Scripts

Run from `apps/web`, or from the repo root with `-w @media-watchlist/web`.

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite dev server with HMR       |
| `npm run build`   | Type check and build for production  |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |
| `npm run format`  | Format all files with Prettier       |

## Docker

To run the full stack locally with Docker Compose, see the [root README](../../README.md#running-with-docker).

Build the image from the repo root (nginx serves the static site):

```bash
docker build -f apps/web/Dockerfile -t media-watchlist-web .
```

Run with the API URL supplied at runtime:

```bash
docker run -p 80:80 \
  -e API_URL=https://your-api.example.com \
  media-watchlist-web
```

At container startup, nginx substitutes `API_URL` into its config and proxies `/api/*` to it, so the same image runs in any environment without rebuilding. Any other runtime config (e.g. feature flags or public keys) can be added to `env.js` in `20-generate-env-config.sh`; the app reads it via `window.__ENV__`. nginx serves the SPA via `try_files $uri /index.html`.

## Project Structure

```
src/
├── lib/                    # API client, better-auth singleton, social providers, utilities
├── components/
│   ├── ui/                 # shadcn/ui generated components
│   ├── layout/             # app shell: root layout, header, footer, menus
│   ├── form/               # React Hook Form field wrappers
│   └── ...                 # route guards, metadata, shared media cards
├── pages/                  # error and not-found fallback pages
└── features/
    ├── account/            # login, register, two-factor, forgot/reset password
    ├── profile/            # profile info, security (2FA settings), danger zone
    ├── watchlist/          # React Query hooks, grid, item cards
    └── search/             # debounced search bar, result cards
```

Types shared with the API live in [`packages/shared`](../../packages/shared).
