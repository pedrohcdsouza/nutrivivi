# Sprint 4 — API Anamnese

## 🎯 Objetivo
Expor os endpoints REST para o formulário de anamnese. Isso inclui a rota pública para o paciente enviar seus dados (POST) e as rotas administrativas para o painel da nutricionista listar e visualizar os detalhes das anamneses recebidas (GET).

---

## 📋 O que deverá ser feito (Tarefas Técnicas)

1. **Serializers (`apps/anamneses/serializers.py`)**
   - Criar `AnamneseCreateSerializer`:
     - Expor apenas os campos preenchíveis pelo usuário no formulário.
     - Garantir que campos como `age_years`, `bmi`, `notification_status` sejam definidos como *read-only* ou excluídos do *payload* de entrada, já que são calculados pelo backend.
     - Incluir validações extras, se necessário (ex: obrigatoriedade de campos condicionais de atividade física).
   - Criar `AnamneseListSerializer` e `AnamneseDetailSerializer` para a listagem e detalhamento no painel administrativo.

2. **Views (`apps/anamneses/api.py` ou `views.py`)**
   - Criar `PublicAnamneseCreateAPIView` (POST):
     - View aberta (`AllowAny`) para receber a submissão do formulário público.
   - Criar `AdminAnamneseListAPIView` e `AdminAnamneseDetailAPIView` (GET):
     - Views para listar e detalhar as anamneses.
     - Como a proteção real do painel no MVP será feita via Nginx (Basic Auth e path routing), no código Django podemos deixar temporariamente aberto ou com uma permissão simples, mas separando as rotas (ex: prefixo `admin/`).

3. **Roteamento (`apps/anamneses/urls.py`)**
   - Configurar as rotas do app:
     - `POST /public/anamneses/` -> Criação (público)
     - `GET /admin/anamneses/` -> Listagem (painel)
     - `GET /admin/anamneses/<uuid:pk>/` -> Detalhes (painel)
   - Incluir o `urls.py` do app `anamneses` no arquivo principal `config/urls.py`.

4. **Testes Básicos e Verificação**
   - Rodar `manage.py check` para garantir que não há erros no DRF.

---

## ✅ Critérios de Aceite (Definition of Done)

- [x] Arquivo de serializers criado com a lógica de separar campos públicos de leitura/escrita.
- [x] Endpoints públicos e administrativos criados usando Views/Generics do DRF.
- [x] Rotas `public/anamneses/` e `admin/anamneses/` configuradas e incluídas no roteador principal.
- [x] A checagem do Django (`check`) passa sem problemas.