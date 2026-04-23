# Sprint 13 - Autenticação JWT e Página de Login

## 🎯 Objetivo
Substituir a autenticação básica via Nginx (Basic Auth) no painel administrativo por uma arquitetura robusta de login com JWT utilizando Django Rest Framework (DRF) e Next.js. O painel deve ser acessado por uma página customizada de login (`/login`), restrita ao nutricionista (sem necessidade de registro público).

---

## 🛠️ O que deverá ser feito (Tarefas Técnicas)

1. **Backend (Django/DRF + SimpleJWT)**
   - Adicionar `djangorestframework-simplejwt` ao `requirements.txt`.
   - Configurar o `REST_FRAMEWORK` no `settings/base.py` para incluir o `JWTAuthentication`.
   - Adicionar as rotas de JWT (`api/v1/auth/login/` e `api/v1/auth/refresh/`) em `backend/config/urls.py`.
   - Alterar as *views* administrativas (`AdminAnamneseListAPIView` e `AdminAnamneseDetailAPIView`) em `backend/apps/anamneses/api.py` para exigir `IsAuthenticated`.
   - Garantir que a *view* pública (`PublicAnamneseCreateAPIView`) continue com `AllowAny`.

2. **Frontend (Next.js)**
   - Instalar dependências para gerenciar cookies de auth se necessário (ex: `nookies` ou usar cookies nativos do Next).
   - Criar uma página `/login` com formulário para e-mail/usuário e senha.
   - Atualizar a configuração do Axios (`src/lib/api.ts`) para incluir o token JWT (`Bearer Token`) e lidar com interceptors de refresh/401 se necessário.
   - Proteger a rota `/dashboard` utilizando middleware ou contexto, redirecionando usuários não autenticados para `/login`.

3. **Infraestrutura**
   - Remover as restrições e menções ao Basic Auth (`.htpasswd`) nos arquivos de configuração do Nginx (`infra/prod/nginx`).

---

## ✅ Critérios de Aceite (Definition of Done)

- [x] A rota `POST /api/v1/auth/login/` retorna tokens Access e Refresh válidos.
- [x] A listagem e detalhes de anamneses no backend estão protegidos contra acesso anônimo (`401 Unauthorized`).
- [x] O frontend possui uma página `/login` funcional que autentica contra a nova rota JWT.
- [x] Acessar `/dashboard` sem estar logado redireciona para `/login`.
- [x] O Nginx de produção não exige mais o pop-up de Basic Auth do navegador.
