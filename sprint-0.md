# Sprint 0 — Setup do repositório

## 🎯 Objetivo
Inicializar o projeto **Nutrivivi** estabelecendo o controle de versão, a estrutura base de diretórios, a documentação inicial e as ferramentas de padronização de código e integração contínua (CI).

---

## 📋 O que deverá ser feito (Tarefas Técnicas)

1. **Inicialização e Estrutura de Diretórios**
   - Inicializar o repositório Git local.
   - Criar a estrutura base de pastas conforme planejado: `backend/`, `frontend/` e `infra/`.
   - Criar e configurar o arquivo `.editorconfig` na raiz do projeto para garantir a mesma configuração de IDE entre desenvolvedores.
   - Criar os arquivos `.gitignore` apropriados na raiz e/ou dentro de cada subdiretório (ignorando `node_modules`, `__pycache__`, `.env`, arquivos de sistema operacional, etc).

2. **Documentação Inicial**
   - Criar o arquivo `README.md` na raiz contendo:
     - Título e descrição do projeto.
     - Stack tecnológica utilizada.
     - Instruções iniciais (mesmo que ainda placeholders para os próximos sprints sobre como rodar o projeto).
   - Adicionar arquivos de template, como `.env.example` (vazio ou com chaves de exemplo).

3. **Configuração de Padronização (Lint e Format)**
   - **Frontend:** Inicializar um projeto base (Next.js) vazio ou apenas configurar os pacotes de linting (`eslint`, `prettier`) para React/TypeScript.
   - **Backend:** Configurar as ferramentas de linting e formatação para Python (recomendado o uso do `ruff` ou a trinca `flake8`, `black` e `isort`).

4. **Hooks do Git e Regras de Commit**
   - Configurar o `pre-commit` (para Python) e/ou `husky` (para JS/TS) para rodar linters e formatadores automaticamente antes de cada commit.
   - Configurar a obrigatoriedade do padrão **Conventional Commits** (ex: `feat:`, `fix:`, `chore:`) através do commitlint ou ferramentas similares no hook de commit-msg.

5. **Integração Contínua (CI Básica)**
   - Criar um workflow de CI (ex: GitHub Actions `ci.yml`).
   - O CI deve ter steps básicos para fazer checkout do código e rodar as ferramentas de linting configuradas (garantindo que não seja feito merge de código fora do padrão).

---

## ✅ Critérios de Aceite (Definition of Done)

- [ ] Repositório Git local inicializado e sincronizado com o repositório remoto.
- [ ] Estrutura de pastas `backend/`, `frontend/` e `infra/` existente no branch `main`.
- [ ] O arquivo `README.md` descreve o projeto adequadamente.
- [ ] Arquivos `.gitignore` e `.editorconfig` configurados e comitados.
- [ ] É impossível realizar um commit com uma mensagem fora do padrão Conventional Commits graças aos git hooks (ex: commitlint).
- [ ] É impossível realizar um commit com código mal formatado (pre-commit roda com sucesso barrando erros).
- [ ] A pipeline de CI (GitHub Actions ou similar) foi criada e roda (passando com sucesso) em qualquer PR aberto contra a branch `main`.
