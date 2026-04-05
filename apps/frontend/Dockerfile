FROM node:20-slim AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

COPY apps/frontend ./apps/frontend

RUN pnpm install --filter "./apps/frontend..."

ARG VITE_API_URL
ENV VITE_API_URL=http://127.0.0.1:3000
RUN pnpm --filter "./apps/frontend" build

FROM nginx:stable-alpine
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]