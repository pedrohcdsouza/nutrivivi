# Sprint 8 — Painel Nutricionista

## 🎯 Objetivo
Criar uma tela administrativa customizada para a nutricionista consultar as anamneses recebidas. Esta tela deve possuir uma listagem em tabela (Table do Ant Design) baseada na rota GET da API e permitir a visualização detalhada de cada anamnese clicando nos registros.

---

## 📋 O que deverá ser feito (Tarefas Técnicas)

1. **Módulo de Fetch de Admin (`src/lib/api/admin.ts`)**
   - Criar arquivo `admin.ts` para agrupar as chamadas de administração.
   - Criar `getAnamneses()` para buscar a lista de `/api/v1/admin/anamneses/`.
   - Criar `getAnamneseById(id)` para buscar detalhes.

2. **Tela de Listagem (`src/app/painel/anamneses/page.tsx`)**
   - Implementar componente de Tabela (`Table` do Ant Design).
   - Configurar colunas: Nome, Data de Envio, Idade, IMC, Status de Notificação.
   - Mapear a propriedade `columns` da tabela.
   - Integrar com o estado de loading e preencher o `dataSource` da tabela com a resposta do `getAnamneses()`.
   - Adicionar uma coluna de ação (ex: botão "Ver Detalhes") que redireciona para a tela de visualização ou abre um modal.

3. **Tela de Detalhes (`src/app/painel/anamneses/[id]/page.tsx`)**
   - Criar a rota dinâmica para receber o ID (`[id]`).
   - Fazer o fetch em `useEffect` de `getAnamneseById(id)`.
   - Exibir todos os dados da anamnese utilizando o componente `Descriptions` do Ant Design, que é perfeito para exibir pares chave/valor de forma elegante.

4. **Tratamento de Estado**
   - Exibir spinners (`Spin` ou `Skeleton` do AntD) enquanto as requisições acontecem.
   - Usar tags (`Tag` do AntD) para colorir visualmente o status da notificação (ex: verde para enviado, amarelo para pendente, vermelho para erro).

---

## ✅ Critérios de Aceite (Definition of Done)

- [x] Tela de listagem em `/painel/anamneses` renderiza a tabela do AntD com os dados retornados pela API.
- [x] Indicadores de carregamento são visíveis enquanto a requisição à API é feita.
- [x] É possível clicar em uma anamnese e ser redirecionado para a página de detalhes dela.
- [x] A página de detalhes exibe *todos* os campos da anamnese de forma organizada utilizando os `Descriptions` do AntD.
- [x] O status da notificação é exibido visualmente com o componente `Tag`.