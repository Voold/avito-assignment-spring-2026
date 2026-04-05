FROM node:20-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/backend ./apps/backend

# Устанавливаем зависимости
RUN pnpm install --filter "./apps/backend..."

# Собираем (если есть билд-степ для TS)
#RUN pnpm --filter "./apps/backend" build

EXPOSE 3000
# Используем путь к папке для запуска
CMD ["pnpm", "--filter", "./apps/backend", "start"]