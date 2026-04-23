# Sprint 12 — Hardening e melhorias

## 🎯 Objetivo
Proteger o painel de produção da nutricionista, que por não ter uma arquitetura de login em JWT no MVP, precisará ser fechado pelo Nginx através de Basic Auth. Adicionar headers de segurança e restrições de CORS.

---

## 📋 O que deverá ser feito (Tarefas Técnicas)

1. **Nginx Basic Auth (`infra/prod/nginx/auth/htpasswd.example`)**
   - Criar pasta `/auth/` dentro de `/nginx/`.
   - Adicionar `.htpasswd.example` contendo exemplo de geração da senha pelo terminal (`htpasswd -c .htpasswd admin`).
   - No `nutrivivi.conf` do Nginx, na seção do `/painel/` (frontend admin) e do `/api/v1/admin/` (backend admin), aplicar o Basic Auth:
     ```nginx
     auth_basic "Área Restrita Nutricionista";
     auth_basic_user_file /etc/nginx/auth/.htpasswd;
     ```
   - *Nota:* Certifique-se de que o arquivo real não seja comitado (colocar `.htpasswd` no `.gitignore`).

2. **CORS e Headers**
   - Garantir que o `CORS_ALLOWED_ORIGINS` no Django (`settings/prod.py`) fique restrito ao domínio real de produção (`https://seusite.com.br`).
   - Adicionar headers de segurança no Nginx (X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, X-Content-Type-Options).

---

## ✅ Critérios de Aceite (Definition of Done)

- [x] Proteção `.htpasswd` configurada no Nginx de produção, travando a rota `/painel` e `/api/v1/admin`.
- [x] O arquivo real `.htpasswd` incluído no `.gitignore`.
- [x] Headers básicos de segurança aplicados nas respostas HTTP.
- [x] O backend está configurado para aceitar apenas o domínio de produção no CORS.