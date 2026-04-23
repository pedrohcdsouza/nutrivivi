# Sprint 11 — Deploy

## 🎯 Objetivo
Configurar a pipeline de deploy automatizado via GitHub Actions que é acionada através da criação de tags específicas e realiza o deploy no servidor VPS (IP: 76.13.170.209).

---

## 📋 O que deverá ser feito (Tarefas Técnicas)

1. **Configuração GitHub Actions (`.github/workflows/deploy.yml`)**
   - Criar um workflow que seja acionado no evento de `push` de `tags` com o padrão `v*-main` (ex: `v1.0.0-main`).
   - O workflow deve possuir um job de deploy.
   - Utilizar a action `appleboy/ssh-action` para acessar o servidor VPS via SSH.
   - Os secrets necessários serão `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` (chave privada) e `VPS_PORT` (opcional, padrão 22).
   - O comando executado no servidor deve clonar/puxar o código do repositório (com a tag específica) ou enviar o código da action para o servidor.
   - Alternativamente, vamos utilizar a action `appleboy/scp-action` para enviar o código do repositório inteiro para uma pasta do servidor VPS (ex: `/home/ubuntu/nutrivivi`), e depois com `appleboy/ssh-action` acessar e rodar o `docker compose -f infra/prod/docker-compose.yml up -d --build`.

2. **Preparação no Servidor (Conceitual para execução posterior)**
   - O servidor VPS precisará ter Docker e Docker Compose instalados.
   - Será preciso criar um arquivo `.env` na pasta de destino no servidor com as variáveis de produção reais.

---

## ✅ Critérios de Aceite (Definition of Done)

- [x] Arquivo de CI/CD para deploy (`deploy.yml`) criado, configurado para reagir a tags `v*-main`.
- [x] Pipeline estruturada para enviar/atualizar os arquivos e rodar o docker compose em produção utilizando SSH e SCP (ou similar).