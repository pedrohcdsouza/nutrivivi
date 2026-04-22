# 📌 Projeto: Nutrivivi

O projeto **Nutrivivi** é um sistema web completo para uma nutricionista.

## Objetivo inicial (MVP)

O sistema terá inicialmente apenas:
* Um site público
* Envio de formulários de anamnese nutricional
* Sem autenticação do paciente
* Após envio:
  * os dados são salvos no banco
  * a nutricionista recebe notificação por e-mail

---

## Stack obrigatória

### Backend
* Python
* Django
* Django REST Framework
* PostgreSQL
* Envio de e-mail via SMTP
* API REST versionada (/api/v1)

### Frontend
* Next.js
* React
* Ant Design (obrigatório)
* Interface simples
* Design clean
* Cores predominantes:
  * verde claro
  * estética profissional de saúde

### Infraestrutura
O projeto deve ser profissional desde o início.
Incluir:
* Docker para desenvolvimento
* Docker para produção
* docker-compose
* containers separados:
  * frontend
  * backend
  * postgres
  * nginx (produção)
* variáveis de ambiente
* preparação para deploy

---

## Funcionalidades do MVP

### 1️⃣ Site Público
* Página inicial
* Página de anamnese
* Formulário completo
* Envio sem login

### 2️⃣ Anamnese Nutricional
A anamnese DEVE seguir exatamente esta estrutura:

1. Identificação do Paciente
* Nome Completo
* Data de Nascimento
* Idade
* Profissão
* Motivo da Consulta

2. Antropometria Inicial
* Peso Atual
* Altura
* IMC

3. Perfil de Saúde e Estilo de Vida
* Qualidade do Sono
* Nível de Ansiedade
* Nível de Estresse
* Prática de Atividade Física
* Modalidade
* Frequência Semanal
* Horário do Treino
* Duração

4. Suplementação Atual
* Usa suplemento?
* Quais suplementos

5. Recordatório Alimentar
* Café da Manhã
* Almoço
* Lanche
* Jantar
* Ceia/Outros

6. Observações adicionais

### 3️⃣ Painel da Nutricionista
Tela administrativa própria (não usar admin do Django):
* Listagem de anamneses
* Visualizar anamnese individual
* Filtros:
  * nome do cliente
  * data de envio
* ordenação por data
* layout simples e funcional

---

## 1. Visão Geral do Projeto

### Objetivo
Construir um sistema web completo para uma nutricionista, composto por um site público e um fluxo de envio de anamnese nutricional (sem login do paciente), persistindo os dados em PostgreSQL e notificando a nutricionista por e-mail via SMTP, além de um painel administrativo próprio (fora do Django Admin) para consulta e gestão das anamneses recebidas.

### Escopo do MVP
Site público:
- Página inicial (`/`)
- Página de anamnese (`/anamnese`)
- Envio do formulário sem autenticação do paciente
- Feedback de sucesso/erro pós-envio

Anamnese nutricional:
- Formulário seguindo exatamente a estrutura e campos especificados.
- Validações no frontend e no backend.
- Persistência em PostgreSQL.
- Cálculos derivados consistentes (IMC e idade) com fonte de verdade no backend.

Notificações:
- Disparo de e-mail à nutricionista após persistência bem-sucedida.

Painel da nutricionista (custom):
- Listagem de anamneses.
- Visualização individual.
- Filtros e ordenação.

### Visão futura (pós-MVP)
- Autenticação de paciente.
- Prontuário e histórico.
- Dashboard nutricional.

---

## 2. Arquitetura do Sistema

### Diagrama lógico (produção)
```mermaid
flowchart LR
  U1[Paciente] -->|HTTPS| NGINX[Nginx (Reverse Proxy)]
  U2[Nutricionista] -->|HTTPS| NGINX

  NGINX -->|/ e /painel| FE[Next.js (Node)]
  NGINX -->|/api/v1/*| BE[Django + DRF (Gunicorn)]

  BE --> DB[(PostgreSQL)]
  BE --> SMTP[(Servidor SMTP)]
  SMTP -->|E-mail| U2
```

### Comunicação frontend/backend
- Frontend consome a API REST via requisições HTTP (`fetch` ou biblioteca cliente).
- Payload transita em formato JSON.
- Separação de rotas no Nginx: requisições para `/api/*` vão para o backend, o restante para o frontend.

### Fluxo de dados
1. Usuário preenche formulário no frontend.
2. Frontend envia `POST /api/v1/anamneses/`.
3. Backend valida os dados, calcula IMC/Idade e salva no banco.
4. Hook pós-persistência no backend dispara o e-mail via SMTP.
5. Resposta `201 Created` retorna ao frontend, que exibe mensagem de sucesso.

---

## 3. Estrutura de Pastas

```text
nutrivivi/
  backend/
    apps/
      anamneses/
      core/
    config/
      settings/
    requirements.txt
    Dockerfile
    manage.py
  frontend/
    src/
      app/
      components/
      lib/
    package.json
    Dockerfile
  infra/
    dev/
      docker-compose.yml
    prod/
      docker-compose.yml
      nginx/
        nginx.conf
```

---

## 4. Modelagem Inicial do Banco (PostgreSQL)

### Entidades e Campos

**Tabela: `anamneses_anamnese`**
- `id` (UUID, PK)
- `created_at` (DateTime)
- `nome_completo` (String)
- `data_nascimento` (Date)
- `idade` (Integer - calculado)
- `profissao` (String)
- `motivo_consulta` (Text)
- `peso_atual` (Decimal)
- `altura` (Decimal)
- `imc` (Decimal - calculado)
- `qualidade_sono` (String)
- `nivel_ansiedade` (String)
- `nivel_estresse` (String)
- `pratica_atividade_fisica` (Boolean)
- `modalidade` (String, nullable)
- `frequencia_semanal` (Integer, nullable)
- `horario_treino` (Time, nullable)
- `duracao` (Integer, nullable)
- `usa_suplemento` (Boolean)
- `quais_suplementos` (Text, nullable)
- `recordatorio_cafe` (Text)
- `recordatorio_almoco` (Text)
- `recordatorio_lanche` (Text)
- `recordatorio_jantar` (Text)
- `recordatorio_ceia` (Text)
- `observacoes` (Text, nullable)

---

## 5. Planejamento por Sprints

### Sprint 0 — Setup do repositório
- **Objetivo**: Inicializar projeto e versionamento.
- **Entregáveis**: Repositório Git, README, linting/formatting básico.
- **DoD**: Código base pushado no branch main, CI básico rodando.

### Sprint 1 — Docker Dev
- **Objetivo**: Criar ambiente de desenvolvimento unificado.
- **Entregáveis**: `docker-compose.yml` para dev, Dockerfiles de backend e frontend.
- **DoD**: Comando `docker compose up` sobe banco, backend e frontend.

### Sprint 2 — Backend base DRF
- **Objetivo**: Configurar o Django e o Django REST Framework.
- **Entregáveis**: App core, configurações de banco, rotas base (`/api/v1/`).
- **DoD**: Endpoint de healthcheck respondendo `200 OK`.

### Sprint 3 — Modelos Anamnese
- **Objetivo**: Criar a modelagem de dados no banco.
- **Entregáveis**: Model `Anamnese`, migrations geradas e aplicadas.
- **DoD**: Banco reflete os campos exatos solicitados, lógica de cálculo de IMC/idade nos signals ou save do model.

### Sprint 4 — API Anamnese
- **Objetivo**: Expor os endpoints REST.
- **Entregáveis**: Serializers e Views (POST público, GET listagem/detalhe admin).
- **DoD**: Postman/Insomnia consegue criar e listar anamneses.

### Sprint 5 — Sistema de Email
- **Objetivo**: Notificar a nutricionista a cada novo envio.
- **Entregáveis**: Integração SMTP, template de e-mail básico, hook `transaction.on_commit`.
- **DoD**: E-mail chega na caixa de testes (ex: Mailtrap) após envio bem sucedido.

### Sprint 6 — Frontend Base Next
- **Objetivo**: Configurar Next.js e Ant Design.
- **Entregáveis**: Tema customizado (verde claro), layout principal (header/footer).
- **DoD**: Página inicial renderizando com os estilos globais e componentes AntD.

### Sprint 7 — Formulário Anamnese
- **Objetivo**: Implementar o formulário público.
- **Entregáveis**: Página `/anamnese`, formulário com Ant Design Form, validações de frontend, integração com POST da API.
- **DoD**: Paciente preenche, envia e visualiza tela de sucesso.

### Sprint 8 — Painel Nutricionista
- **Objetivo**: Criar tela administrativa.
- **Entregáveis**: Rota `/painel`, tabela AntD consumindo o GET da API, modal ou página de detalhes da anamnese.
- **DoD**: Nutricionista consegue visualizar a lista e clicar para ver detalhes completos.

### Sprint 9 — Filtros
- **Objetivo**: Adicionar capacidade de busca no painel.
- **Entregáveis**: Backend com `django-filter`, Frontend com inputs de busca (nome e data).
- **DoD**: Tabela atualiza os resultados ao aplicar os filtros.

### Sprint 10 — Docker Produção
- **Objetivo**: Preparar containers otimizados.
- **Entregáveis**: Dockerfile multi-stage pro Next.js, Gunicorn no Django, Nginx como reverse proxy.
- **DoD**: `docker-compose.prod.yml` sobe a stack inteira expondo apenas a porta 80/443 no Nginx.

### Sprint 11 — Deploy
- **Objetivo**: Colocar o sistema no ar.
- **Entregáveis**: Servidor configurado (ex: VPS), variáveis de ambiente de produção, certificados SSL.
- **DoD**: Sistema acessível via domínio público com HTTPS.

### Sprint 12 — Hardening e melhorias
- **Objetivo**: Segurança e otimização.
- **Entregáveis**: Proteção do `/painel` no Nginx (Basic Auth), CORS restrito, Rate Limiting.
- **DoD**: Painel inacessível sem credenciais Nginx, logs operando corretamente.

---

## 6. Estratégia de Deploy

* **Ambientes**: Apenas Desenvolvimento (Local/Docker) e Produção (VPS via Docker).
* **Variáveis**: Gerenciadas via `.env` não versionado. Contará com `DB_PASSWORD`, `SMTP_PASS`, `DJANGO_SECRET_KEY`, etc.
* **CI/CD (conceitual)**: GitHub Actions rodando lint/tests em PRs. Deploy manual via script SSH executando `git pull` e `docker compose up -d --build` (adequado para MVP).
* **Build containers**: Frontend usará Multi-stage build do Next.js standalone. Backend usará imagem leve Alpine/Slim Python rodando Gunicorn. Nginx será o proxy reverso oficial.

---

## 7. Boas Práticas e Padrões

* **Backend**: Fat models/Thin views. Lógica de cálculo contida no modelo ou camada de serviços. Retorno HTTP padronizado.
* **Frontend**: Componentização rigorosa. Custom Hooks para chamadas de API. Formulários gerenciados exclusivamente pelo Form Provider do AntD para performance.
* **Git Workflow**: Feature branch (`feature/nome-da-feature`), PRs obrigatórios para a `main`.
* **Commits**: Padrão Conventional Commits (`feat:`, `fix:`, `chore:`).
* **Versionamento API**: URL path prefixing (`/api/v1/`), garantindo que mudanças futuras não quebrem o MVP.

---

## 8. Roadmap Pós-MVP

* **Login Paciente**: Autenticação com JWT, permitindo ao paciente visualizar seu próprio plano.
* **Prontuário e Evolução Clínica**: Cadastro de consultas de retorno e gráficos de acompanhamento de peso/medidas.
* **Dashboard Nutricional**: Tela de métricas para a nutricionista (ex: envios por mês, perfil médio dos pacientes).
* **Geração de PDF**: Exportar os dados da anamnese diretamente do painel para impressão.