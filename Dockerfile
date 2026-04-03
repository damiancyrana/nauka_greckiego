# ── Stage 1: Build ──────────────────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Production ────────────────────────────────
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY server.js .
COPY --from=build /app/dist ./dist

# Cloud Run injects PORT env variable (default 8080)
ENV PORT=8080
EXPOSE 8080

USER node

CMD ["node", "server.js"]
