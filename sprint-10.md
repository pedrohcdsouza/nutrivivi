# Sprint 10 — Docker Produção

## 🎯 Objetivo
Preparar as imagens Docker para o ambiente de produção, visando otimização, redução de tamanho da imagem e ganho de performance. Implementar o Nginx como Proxy Reverso oficial (já mapeando o tráfego do frontend e backend) e adequar a arquitetura para suportar o deploy sem código de desenvolvimento.

---

## 📋 O que deverá ser feito (Tarefas Técnicas)

1. **Dockerfile de Produção Backend (`backend/Dockerfile.prod`)**
   - Imagem base menor (Alpine ou distroless, ou manter slim se `psycopg` precisar de muitas C-libs).
   - Instalar `gunicorn` para rodar o Django.
   - Não copiar variáveis de ambiente (`.env`), pois serão injetadas pelo docker-compose ou runtime.
   - Expor porta 8000 chamando `gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3`.

2. **Dockerfile de Produção Frontend (`frontend/Dockerfile.prod`)**
   - Implementar o padrão `Multi-stage build`.
   - Fase `builder`: Instalar deps, rodar `npm run build`.
   - Modificar o Next.js config para suportar saída "standalone" (`output: "standalone"` no `next.config.ts`), fundamental para gerar containers minúsculos no App Router.
   - Fase `runner`: Copiar apenas os diretórios vitais `.next/standalone`, `.next/static` e rodar a aplicação em modo *production*.

3. **Configuração Nginx (`infra/prod/nginx/nginx.conf`)**
   - Criar arquivo de configuração roteando porta 80.
   - Tráfego `location /api/v1/`: redireciona para container `backend:8000`.
   - Tráfego genérico `location /`: redireciona para container `frontend:3000`.
   - (Hardening virá depois, no sprint 12).

4. **Docker Compose Produção (`infra/prod/docker-compose.yml`)**
   - Criar compose file final integrando PostgreSQL, Backend, Frontend e Nginx.
   - Apenas o serviço Nginx expõe portas para a máquina host (`80:80`). Os outros se comunicam por network interna.

---

## ✅ Critérios de Aceite (Definition of Done)

- [x] `backend/Dockerfile.prod` criado para rodar Gunicorn.
- [x] `frontend/Dockerfile.prod` criado rodando Multi-stage build com Standalone Next.js.
- [x] Configuração do Nginx criada como proxy reverso roteando corretamente `/api/` para Django e resto para Next.
- [x] `docker-compose.yml` (prod) não expõe as portas do banco, frontend e backend, somente do Nginx.