FROM node:24-alpine AS base

FROM base AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune @media-watchlist/ui --docker

FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN npm ci
COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/turbo.json ./turbo.json
COPY --from=pruner /app/tsconfig.base.json ./tsconfig.base.json
ARG GIT_COMMIT_SHA
ENV GIT_COMMIT_SHA=$GIT_COMMIT_SHA
RUN npx turbo run build --filter=@media-watchlist/ui

FROM nginx:alpine AS runner
COPY --from=builder /app/packages/ui/dist /usr/share/nginx/html
COPY packages/ui/default.conf.template /etc/nginx/templates/default.conf.template
COPY packages/ui/20-generate-env-config.sh /docker-entrypoint.d/20-generate-env-config.sh
RUN chmod +x /docker-entrypoint.d/20-generate-env-config.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
