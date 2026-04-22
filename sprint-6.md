# Sprint 6 — Frontend Base Next

## 🎯 Objetivo
Configurar o alicerce do projeto frontend em React utilizando Next.js com App Router. Será implementada a biblioteca de componentes visuais Ant Design (obrigatório) mantendo a estética voltada para saúde, com cores predominantes em tons de verde claro, além da estruturação de layouts globais de cabeçalho e rodapé.

---

## 📋 O que deverá ser feito (Tarefas Técnicas)

1. **Instalação e Configuração do Ant Design**
   - Instalar `antd` e as dependências auxiliares (`@ant-design/nextjs-registry` para suporte SSR no Next App Router).
   - Configurar o provedor de registro de estilos do AntD no `src/app/layout.tsx`.
   - Modificar o tema principal do Ant Design (via `ConfigProvider`) sobrescrevendo as variáveis de cor para a paleta especificada (verde claro e estética limpa da área de saúde).

2. **Estrutura Base (Layout)**
   - Criar um componente de `Layout` base em `src/components/layout/MainLayout.tsx` (ou utilizando o próprio `layout.tsx` global) integrando `Layout`, `Header`, `Content` e `Footer` do Ant Design.
   - Definir os estilos básicos do header (nome/logo do projeto) e footer (copyright).

3. **Página Inicial e Limpeza do Template**
   - Limpar o conteúdo boilerplate gerado pelo Next.js no `src/app/page.tsx` e `globals.css`.
   - Adicionar uma mensagem de boas-vindas na tela inicial utilizando componentes de tipografia do Ant Design, servindo de porta de entrada e confirmação visual da configuração.

---

## ✅ Critérios de Aceite (Definition of Done)

- [x] Biblioteca Ant Design instalada.
- [x] Next.js configurado para suportar CSS-in-JS e SSR com o Ant Design (`nextjs-registry`).
- [x] Tema global configurado com o tom verde claro como cor primária.
- [x] Layout principal com Cabeçalho e Rodapé criado e rodando na home page.
- [x] Remoção completa dos estilos boilerplates que vêm por padrão no Next.js App Router (SVG, estilos obscuros em page.tsx, etc).