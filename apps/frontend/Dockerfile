# Стейдж 1: Сборка
FROM node:20-slim AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# 1. Копируем конфиги монорепа
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# 2. Копируем фронтенд (и общие пакеты, если они появятся)
COPY apps/frontend ./apps/frontend
# COPY packages ./packages

# 3. Устанавливаем зависимости (фильтр по пути к папке)
RUN pnpm install --filter "./apps/frontend..."

# 4. Собираем статику
ARG VITE_API_URL
ENV VITE_API_URL=http://127.0.0.1:3000
RUN pnpm --filter "./apps/frontend" build

# Стейдж 2: Nginx
FROM nginx:stable-alpine
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]