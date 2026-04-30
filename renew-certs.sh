#!/bin/bash
set -e

cd "$(dirname "$0")"

docker compose --env-file .env run --rm certbot renew --quiet
docker compose exec nginx nginx -s reload
