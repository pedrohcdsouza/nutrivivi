# Sprint 1 — Docker Dev

## 🎯 Objetivo
Criar e estabilizar o ambiente de desenvolvimento unificado usando Docker Compose. Isso garantirá que qualquer pessoa do time consiga subir o backend, o frontend e o banco de dados com apenas um comando, sem se preocupar com dependências locais do sistema operacional.

---

## 📋 O que deverá ser feito (Tarefas Técnicas)

1. **Dockerfile do Backend (Django)**
   - Criar `backend/Dockerfile` utilizando uma imagem base leve do Python (ex: `python:3.12-slim`).
   - Configurar a instalação de dependências via `requirements.txt` ou `pyproject.toml`.
   - Configurar variáveis de ambiente essenciais (ex: `PYTHONUNBUFFERED`, `PYTHONDONTWRITEBYTECODE`).
   - Definir o comando padrão para rodar o servidor de desenvolvimento do Django (`python manage.py runserver 0.0.0.0:8000`).

2. **Dockerfile do Frontend (Next.js)**
   - Criar `frontend/Dockerfile` utilizando uma imagem base leve do Node.js (ex: `node:20-alpine`).
   - Configurar o diretório de trabalho, instalação de dependências e mapeamento de volumes.
   - Definir o comando padrão para rodar o servidor de desenvolvimento do Next.js (`npm run dev` / `npm run dev`).

3. **Arquivo Docker Compose (Desenvolvimento)**
   - Criar `infra/dev/docker-compose.yml`.
   - **Serviço `db`:** Imagem do PostgreSQL (ex: `postgres:15-alpine`). Configurar um volume local (persistência de dados) e variáveis de ambiente (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`).
   - **Serviço `backend`:** Fazer o build do `backend/Dockerfile`. Mapear a porta `8000`. Conectar com a rede e serviço do banco de dados (exigindo que o `db` inicie primeiro via `depends_on`). Mapear o volume local para `/app` garantindo hot-reload.
   - **Serviço `frontend`:** Fazer o build do `frontend/Dockerfile`. Mapear a porta `3000`. Mapear o volume local para `/app` garantindo hot-reload.
   - Definir variáveis de ambiente corretas em cada serviço, lendo de preferência do `.env` raiz ou criando arquivos `.env` específicos para o compose.

4. **Scripts Facilitadores (Opcional, porém recomendado)**
   - Adicionar as instruções de execução atualizadas no `README.md`.
   - Criar um `Makefile` na raiz com atalhos como `make up`, `make down`, `make build`, para simplificar os comandos longos do docker-compose.

---

## ✅ Critérios de Aceite (Definition of Done)

- [x] Arquivo `backend/Dockerfile` criado e configurado para desenvolvimento.
- [x] Arquivo `frontend/Dockerfile` criado e configurado para desenvolvimento.
- [x] Arquivo `infra/dev/docker-compose.yml` configurado com os serviços `backend`, `frontend` e `postgres`.
- [x] O comando `docker compose -f infra/dev/docker-compose.yml up --build` sobe todos os serviços sem erros.
- [x] O banco de dados PostgreSQL aceita conexões localmente via container.
- [x] A pasta local de código do backend mapeia para dentro do container e o "hot-reload" do Django (quando aplicável) funciona.
- [x] A pasta local de código do frontend mapeia para dentro do container e o "hot-reload" do Next.js funciona.
- [x] O arquivo `README.md` possui instruções claras sobre como rodar o projeto usando Docker.