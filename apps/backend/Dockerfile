FROM node:20-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/backend ./apps/backend

RUN pnpm install --filter "./apps/backend..."

EXPOSE 3000

CMD ["pnpm", "--filter", "./apps/backend", "start"]