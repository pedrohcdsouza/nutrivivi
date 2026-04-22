# Sprint 2 — Backend base DRF

## 🎯 Objetivo
Configurar o alicerce do backend com Django e Django REST Framework (DRF), organizando a estrutura de configurações por ambiente (base, dev, prod), estabelecendo a conexão com o PostgreSQL e criando a primeira rota da API (`/api/v1/health/`) para garantir que o roteamento e o framework estão operando corretamente.

---

## 📋 O que deverá ser feito (Tarefas Técnicas)

1. **Estrutura de Settings**
   - Refatorar o arquivo `config/settings.py` gerado pelo Django para um módulo `config/settings/` contendo `base.py`, `dev.py` e `prod.py`.
   - Atualizar `manage.py`, `wsgi.py` e `asgi.py` para apontarem para `config.settings.dev` como padrão.
   - Configurar o pacote `django-environ` no `base.py` para ler variáveis de ambiente do arquivo `.env` e do OS.

2. **Configuração de Banco e Apps Base**
   - Configurar a variável `DATABASE_URL` no environ para estabelecer a conexão com o PostgreSQL via pacote `psycopg`.
   - Adicionar `rest_framework` e `corsheaders` no `INSTALLED_APPS`.
   - Configurar o middleware do CORS (`CorsMiddleware`).

3. **App Healthcheck**
   - Criar o diretório `apps/` na raiz do backend e dentro dele o app `health`.
   - Criar um endpoint simples (API View do DRF) em `apps/health/api.py` que retorne um JSON `{"status": "ok"}`.
   - Configurar o roteamento deste app em `apps/health/urls.py`.

4. **Roteamento Principal (API v1)**
   - Configurar o `config/urls.py` do projeto para englobar todas as rotas da API sob o prefixo `api/v1/`.
   - Incluir as rotas do app `health` neste prefixo (ex: `/api/v1/health/`).

---

## ✅ Critérios de Aceite (Definition of Done)

- [x] Estrutura de settings dividida em `base.py`, `dev.py` e `prod.py`.
- [x] Conexão com o banco de dados PostgreSQL configurada usando `django-environ` e `DATABASE_URL`.
- [x] Django REST Framework e CORS configurados.
- [x] App `health` criado dentro do diretório `apps/`.
- [x] Rota `/api/v1/health/` configurada.
- [x] O comando de checagem do Django (`python manage.py check`) roda sem apontar erros de importação ou sintaxe.