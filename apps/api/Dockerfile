FROM node:24-alpine AS base

FROM base AS pruner
WORKDIR /app
RUN npm install -g turbo@2.11.6
COPY . .
RUN turbo prune @media-watchlist/api @media-watchlist/web --docker \
    && turbo prune @media-watchlist/api --docker --out-dir out-api

FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN --mount=type=cache,target=/root/.npm npm ci
COPY --from=pruner /app/out/full/ .
ARG GIT_COMMIT_SHA
ENV GIT_COMMIT_SHA=$GIT_COMMIT_SHA
RUN npx turbo run build

FROM base AS prod-deps
WORKDIR /app
COPY --from=pruner /app/out-api/json/ .
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev --omit=optional

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/package.json ./package.json
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/drizzle ./apps/api/drizzle
COPY --from=builder /app/apps/web/dist ./apps/api/public
COPY --from=builder /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
ARG GIT_COMMIT_SHA
ENV GIT_COMMIT_SHA=$GIT_COMMIT_SHA
USER node
EXPOSE 3000
CMD ["node", "apps/api/dist/index.js"]
