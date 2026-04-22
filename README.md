# Nutrivivi

O projeto **Nutrivivi** é um sistema web completo para uma nutricionista.

## Tecnologias (Stack)

* **Backend:** Python, Django, Django REST Framework, PostgreSQL
* **Frontend:** Next.js, React, Ant Design
* **Infraestrutura:** Docker, Docker Compose, Nginx

## Como rodar o projeto (Desenvolvimento)

Certifique-se de ter o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados em sua máquina.

1. Copie o arquivo de exemplo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```

2. Utilize o **Makefile** para iniciar os containers:
   ```bash
   make up
   # Ou, caso não tenha o Make instalado:
   # docker compose -f infra/dev/docker-compose.yml up -d --build
   ```

3. O sistema estará disponível em:
   * **Frontend:** [http://localhost:3000](http://localhost:3000)
   * **Backend (API):** [http://localhost:8000](http://localhost:8000)

### Comandos úteis (Makefile)

* `make down`: Para e remove os containers.
* `make logs`: Exibe os logs em tempo real.
* `make build`: Reconstrói as imagens dos containers.
* `make migrate`: Aplica as migrações no banco de dados.
* `make backend-shell` / `make frontend-shell`: Acessa o terminal dos containers.
