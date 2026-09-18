FROM node:24-alpine AS base

FROM base AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune @media-watchlist/api-hono --docker

FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN npm ci
COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/turbo.json ./turbo.json
RUN npx turbo run build --filter=@media-watchlist/api-hono

FROM base AS prod-deps
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN npm ci --omit=dev && npm cache clean --force

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ARG GIT_COMMIT_SHA
ENV GIT_COMMIT_SHA=$GIT_COMMIT_SHA
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/package.json ./package.json
COPY --from=builder /app/apps/api-hono/package.json ./apps/api-hono/package.json
COPY --from=builder /app/apps/api-hono/dist ./apps/api-hono/dist
COPY --from=builder /app/apps/api-hono/drizzle ./apps/api-hono/drizzle
EXPOSE 3001
CMD ["node", "apps/api-hono/dist/index.js"]
