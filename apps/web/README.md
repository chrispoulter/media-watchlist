# @media-watchlist/web

A React SPA for tracking movies and TV shows you want to watch. Talks to [`apps/api`](../api) for data and authentication.

## Features

- Email/password authentication and social login (Google OAuth)
- Email verification and password reset flows
- Two-factor authentication (TOTP), with backup codes
- Search for movies and TV shows via TMDB
- Personal watchlist management — add and remove items
- Light/dark/system theme

## Tech stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Build tool     | Vite                              |
| Framework      | React 19                          |
| Styling        | Tailwind CSS + shadcn/ui (Radix)  |
| Data fetching  | TanStack Query                    |
| Forms          | React Hook Form + Zod             |
| Authentication | better-auth (cookie-based client) |
| Routing        | React Router                      |
| HTTP client    | ky                                |
| Toasts         | Sonner                            |

## Setup

From the repo root:

```sh
npm install
cp apps/web/.env.example apps/web/.env
# fill in VITE_API_URL if it differs from the default
```

The API ([`apps/api`](../api)) needs to be running for anything beyond the login/register pages to work. Then:

```sh
npm run dev -w apps/web
```

Or use the root-level `npm run dev`, which starts this alongside the API via Turborepo.

## Environment variables

| Variable       | Required | Default                 | Description         |
| -------------- | -------- | ----------------------- | ------------------- |
| `VITE_API_URL` | Yes      | `http://localhost:3000` | Base URL of the API |

## Pages

### Auth

| Path               | Access     | Description                             |
| ------------------ | ---------- | --------------------------------------- |
| `/login`           | Guest only | Sign in with email/password or Google   |
| `/register`        | Guest only | Create an account                       |
| `/forgot-password` | Guest only | Request a password reset email          |
| `/reset-password`  | Anyone     | Reset password from an emailed link     |
| `/two-factor`      | Anyone     | TOTP / backup code challenge at sign-in |
| `/auth/error`      | Anyone     | OAuth error fallback                    |

### Profile (`/profile`, requires auth)

| Path                | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `/profile`          | Update name/date of birth, change email                      |
| `/profile/security` | Change password, linked social accounts, two-factor settings |
| `/profile/danger`   | Delete account                                               |

### Search & watchlist (require auth)

| Path      | Description                                   |
| --------- | --------------------------------------------- |
| `/search` | Search TMDB for movies and TV shows           |
| `/`       | Your watchlist — add/remove items from search |

## Scripts

Run with `-w apps/web` from the repo root (or `cd apps/web` first).

| Script              | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `dev`               | Start the Vite dev server with hot reload            |
| `build`             | Type-check and build for production                  |
| `preview`           | Preview the production build locally                 |
| `typecheck`         | Run TypeScript type checking                         |
| `lint`              | Lint this package with the shared root ESLint config |
| `lint:fix`          | Same, applying auto-fixes                            |
| `generate-favicons` | Regenerate the favicon set from source art           |

`format`/`format:check` are handled at the workspace root (`npm run format`) — Prettier isn't part of the per-package Turborepo task graph the way `lint`/`typecheck`/`build` are.
