# Sprint 3 — Modelos Anamnese

## 🎯 Objetivo
Criar a modelagem de dados no banco de dados para armazenar as anamneses nutricionais. Isso inclui a criação da entidade principal com todos os campos especificados, bem como a lógica interna do modelo para calcular automaticamente a idade do paciente e o seu IMC no momento do salvamento.

---

## 📋 O que deverá ser feito (Tarefas Técnicas)

1. **Criação do App Anamneses**
   - Criar o app `anamneses` dentro de `backend/apps/`.
   - Adicionar o app em `INSTALLED_APPS` no arquivo `config/settings/base.py`.

2. **Criação do Modelo `Anamnese`**
   - Criar a classe `Anamnese` em `apps/anamneses/models.py`.
   - Implementar todos os campos divididos pelas 6 sessões requeridas:
     - *Identificação:* Nome, data de nascimento, idade (calculada), profissão, motivo.
     - *Antropometria:* Peso, altura, IMC (calculado).
     - *Estilo de Vida:* Sono, ansiedade, estresse, atividade física (e seus campos condicionais: modalidade, frequência, horário, duração).
     - *Suplementação:* Usa suplemento (booleano), quais suplementos.
     - *Recordatório:* Café, almoço, lanche, jantar, ceia.
     - *Observações:* Campo de texto livre.
     - *Operacional:* Status de notificação (pending, sent, failed).
   - Utilizar `UUIDField` como chave primária e campos de timestamp (`created_at`, `updated_at`).

3. **Lógica de Negócio no Modelo (Regras de Cálculo)**
   - Sobrescrever o método `save()` do modelo (ou usar signals) para calcular automaticamente:
     - `idade` (`age_years`) baseado na `data_nascimento` comparada com a data atual.
     - `imc` (`bmi`) baseado no `peso_atual` (kg) e `altura` (cm). A fórmula é peso / (altura_em_metros ^ 2).

4. **Migrações e Configuração no Admin**
   - Gerar as migrações iniciais do app (`python manage.py makemigrations`).
   - Registrar o modelo no `admin.py` para facilitar testes (embora o painel final seja customizado, o admin nativo ajuda no debug durante o desenvolvimento).

---

## ✅ Critérios de Aceite (Definition of Done)

- [x] App `anamneses` criado e configurado.
- [x] Modelo `Anamnese` criado com todos os campos mapeados corretamente (nulos quando opcional, obrigatórios quando exigido).
- [x] Lógica de cálculo do IMC (IMC = peso / (altura/100)²) implementada no modelo.
- [x] Lógica de cálculo da Idade baseada na data de nascimento implementada no modelo.
- [x] Arquivos de migração gerados com sucesso sem erros de validação no Django.