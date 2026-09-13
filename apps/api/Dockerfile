FROM node:24-alpine AS base

FROM base AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune @media-watchlist/api --docker

FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN npm ci
COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/turbo.json ./turbo.json
COPY --from=pruner /app/tsconfig.base.json ./tsconfig.base.json
RUN npx turbo run build --filter=@media-watchlist/api

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
COPY --from=builder /app/packages/api/package.json ./packages/api/package.json
COPY --from=builder /app/packages/api/dist ./packages/api/dist
COPY --from=builder /app/packages/api/drizzle ./packages/api/drizzle
COPY --from=builder /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
EXPOSE 3000
CMD ["node", "packages/api/dist/index.js"]
