.PHONY: help up down build logs backend-shell frontend-shell db-shell migrate test

# Docker compose commands
COMPOSE = docker compose -f infra/dev/docker-compose.yml

help:
	@echo "Comandos disponíveis:"
	@echo "  make up            - Inicia os containers em background"
	@echo "  make down          - Para e remove os containers"
	@echo "  make build         - Faz o build forçado das imagens"
	@echo "  make logs          - Exibe logs de todos os containers"
	@echo "  make backend-shell - Acessa o shell do backend"
	@echo "  make frontend-shell- Acessa o shell do frontend"
	@echo "  make db-shell      - Acessa o PostgreSQL"
	@echo "  make migrate       - Roda as migrações do Django"

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
