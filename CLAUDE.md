# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nutrivivi is a nutritional anamnesis platform. Patients submit health questionnaires via a public form; the nutritionist receives email notifications and reviews submissions through a protected admin panel. The app is split into a Django REST Framework backend and a Next.js frontend.

## Commands

### Backend (run from `backend/`)

```bash
# Activate virtualenv first (Windows)
venv\Scripts\activate

# Run dev server
DJANGO_SETTINGS_MODULE=config.settings.dev python manage.py runserver

# Run tests
python manage.py test

# Migrations
python manage.py makemigrations
python manage.py migrate

# Lint & format
ruff check .
ruff format .
```

The `.env` file lives at the **repo root** (not inside `backend/`). Django reads it via `django-environ`. Use `.env.example` as a reference.

### Frontend (run from `frontend/`)

```bash
npm run dev       # dev server on :3000
npm run build     # production build
npm run lint      # eslint
```

### Pre-commit / CI

```bash
pre-commit run --all-files   # runs ruff, ruff-format, and trailing-whitespace hooks
```

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint pre-commit hook).

## Architecture

### Backend (`backend/`)

```
config/
  settings/base.py   # shared settings; reads .env from repo root
  settings/dev.py    # CORS_ALLOW_ALL_ORIGINS, browsable API
  settings/prod.py   # ALLOWED_HOSTS / CORS from env vars
  urls.py            # mounts JWT endpoints + app routers
apps/
  anamneses/         # core domain
    models.py        # Anamnese model (UUID PK); auto-calculates age & BMI on save
    serializers.py   # three serializers: Create / List / Detail
    api.py           # three API views: PublicCreate / AdminList / AdminDetail
    urls.py          # /api/v1/public/anamneses/, /api/v1/admin/anamneses/
  notifications/
    services.py      # send_anamnese_notification() — renders HTML/text templates,
                     # sends via SMTP, updates notification_status on the Anamnese
  health/
    api.py           # unauthenticated GET /api/v1/health/ → {status, version}
```

**Auth**: SimpleJWT. `POST /api/v1/auth/login/` returns `access` (60 min) and `refresh` (7 days) tokens. Public endpoints use `AllowAny`; admin endpoints use `IsAuthenticated`.

**Email flow**: `PublicAnamneseCreateAPIView.perform_create` registers a `transaction.on_commit` callback to `send_anamnese_notification`. This keeps the DB write and the email dispatch decoupled — if the email fails, `notification_status` is set to `failed` (not `sent`).

**Settings module selection**: Set `DJANGO_SETTINGS_MODULE=config.settings.dev` (or `prod`) before running management commands or the server.

### Frontend (`frontend/src/`)

```
app/
  layout.tsx                  # root layout: AntdRegistry + ConfigProvider (pt-BR, green theme)
  page.tsx                    # home / landing
  anamnese/page.tsx           # public patient form (Ant Design Form, no auth required)
  login/page.tsx              # login page
  painel/anamneses/
    page.tsx                  # admin list with search (JWT-protected)
    [id]/page.tsx             # admin detail view
components/layout/
  MainLayout.tsx              # Ant Design Layout shell (header + content + footer)
lib/
  auth.ts                     # login(), logout(), getToken(), fetchWithAuth()
                              # fetchWithAuth auto-refreshes the access token on 401
  api/anamneses.ts            # submitAnamnese() — unauthenticated POST
  api/admin.ts                # getAnamneses(), getAnamneseById() — use fetchWithAuth
middleware.ts                 # protects /painel/* (redirects to /login if no cookie)
                              # redirects authenticated users away from /login
```

**Auth storage**: JWT tokens are stored in cookies (`access_token`, `refresh_token`) via `js-cookie`. The middleware reads the `access_token` cookie server-side. `fetchWithAuth` reads it client-side and retries once with a refreshed token on 401.

**API base URL**: Configured via `NEXT_PUBLIC_API_URL` env var; defaults to `http://localhost:8000/api/v1`.

**UI library**: Ant Design 6 with `@ant-design/nextjs-registry` for SSR compatibility. The theme overrides `colorPrimary` to green (`#52c41a`) and locale is `pt-BR`.

## Key Constraints

- Python 3.12, Django 5+, `ruff` line length 88 (E501 ignored). Migrations are excluded from most lint rules.
- `DJANGO_SETTINGS_MODULE` must always be explicitly set — there is no default.
- The `notification_status` field on `Anamnese` is operational metadata; it should never be sent in `AnamneseCreateSerializer`.
- Activity and supplement fields are conditionally required — validation lives in `AnamneseCreateSerializer.validate()` and mirrored in the frontend form with `shouldUpdate`.
