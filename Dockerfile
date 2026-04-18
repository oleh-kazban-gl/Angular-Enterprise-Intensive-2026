# ─────────────────────────────────────────────
# Stage 1: Build
# ─────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Enable pnpm via corepack (ships with Node 16+)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only manifests first – maximises layer-cache hits
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

# Copy the full monorepo source
COPY . .

# Production build → dist/apps/instaglam
RUN pnpm nx build instaglam --configuration=production

# ─────────────────────────────────────────────
# Stage 2: Serve
# ─────────────────────────────────────────────
FROM nginx:alpine AS runner

# Custom nginx config: SPA routing + API proxy
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from the build stage
COPY --from=builder /app/dist/apps/instaglam /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
