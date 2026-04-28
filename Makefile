.PHONY: help up down build logs backend-shell frontend-shell db-shell migrate test \
        prod-up prod-down prod-build prod-logs prod-migrate

# Docker compose commands
COMPOSE     = docker compose -f infra/dev/docker-compose.yml
COMPOSE_PROD = docker compose -f infra/prod/docker-compose.yml --env-file .env

help:
        @echo "Comandos disponíveis (dev):"
        @echo "  make up            - Inicia os containers em background"
        @echo "  make down          - Para e remove os containers"
        @echo "  make build         - Faz o build forçado das imagens"
        @echo "  make logs          - Exibe logs de todos os containers"
        @echo "  make backend-shell - Acessa o shell do backend"
        @echo "  make frontend-shell- Acessa o shell do frontend"
        @echo "  make db-shell      - Acessa o PostgreSQL"
        @echo "  make migrate       - Roda as migrações do Django"
        @echo ""
        @echo "Comandos disponíveis (prod):"
        @echo "  make prod-up       - Sobe produção em background"
        @echo "  make prod-down     - Para produção"
        @echo "  make prod-build    - Build forçado de produção"
        @echo "  make prod-logs     - Logs de produção"
        @echo "  make prod-migrate  - Roda migrações em produção"

up:
        $(COMPOSE) up -d

down:
        $(COMPOSE) down

build:
        $(COMPOSE) build

logs:
        $(COMPOSE) logs -f

backend-shell:
        $(COMPOSE) exec backend bash

frontend-shell:
        $(COMPOSE) exec frontend sh

db-shell:
        $(COMPOSE) exec db psql -U nutrivivi -d nutrivivi

migrate:
        $(COMPOSE) exec backend python manage.py migrate

# --- Produção ---
prod-up:
        $(COMPOSE_PROD) up -d

prod-down:
        $(COMPOSE_PROD) down

prod-build:
        $(COMPOSE_PROD) build

prod-logs:
        $(COMPOSE_PROD) logs -f

prod-migrate:
        $(COMPOSE_PROD) exec backend python manage.py migrate