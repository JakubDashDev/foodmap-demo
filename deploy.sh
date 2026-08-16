#!/usr/bin/env bash
set -euo pipefail

# Run this on the VPS, from the repo root, after a `git pull`.
#
# Builds both frontends with a throwaway Node container (so the VPS never
# needs Node installed permanently — only Docker), then builds and starts the
# long-running stack (Postgres, Rails, Caddy).

cd "$(dirname "$0")"

if [ ! -f .env.production ]; then
  echo "Missing .env.production — copy .env.production.example and fill it in first." >&2
  exit 1
fi

build_frontend() {
  local app="$1"
  echo "==> Building ${app}"
  docker run --rm \
    -v "$PWD/${app}:/app" \
    -w /app \
    node:22-slim \
    sh -c "corepack enable && pnpm install --frozen-lockfile && pnpm build"
}

build_frontend main_app_client
build_frontend main_app_dashboard

echo "==> Building and starting the stack"
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build

echo "==> Done. Tailing logs (Ctrl-C to stop watching — the stack keeps running):"
docker compose -f docker-compose.prod.yml logs -f --tail=50
