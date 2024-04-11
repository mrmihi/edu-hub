FROM node:alpine AS cleaner

WORKDIR /app

RUN yarn global add turbo pnpm

COPY . .

RUN turbo prune --scope=frontend --docker
 
FROM node:alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN yarn global add pnpm

COPY .gitignore .gitignore
COPY --from=cleaner /app/out/json/ .
COPY --from=cleaner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --ignore-scripts
 
COPY --from=cleaner /app/out/full/ .

ARG VITE_SERVER_URL
ARG VITE_STRIPE_PUBLISH_KEY
ARG VITE_FRONTEND_BASE_URL

RUN pnpm turbo run build --filter=frontend

FROM nginx:1.23.4-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder /app/frontend/nginx/nginx.conf /etc/nginx/conf.d

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/frontend/dist .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]