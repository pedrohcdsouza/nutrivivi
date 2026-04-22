# Sprint 7 — Formulário Anamnese

## 🎯 Objetivo
Implementar o formulário completo da anamnese no site público, consumindo os componentes otimizados de formulário do Ant Design. Este formulário coletará todas as 6 seções de dados mapeadas, fará a validação primária localmente e enviará os dados para a API do backend (`POST /api/v1/public/anamneses/`), apresentando ao final uma tela de sucesso para o paciente.

---

## 📋 O que deverá ser feito (Tarefas Técnicas)

1. **Estruturação da Página e Componentes**
   - Criar `src/app/anamnese/page.tsx` para comportar a tela do formulário.
   - Utilizar o componente `Form` do Ant Design (`useForm`) por sua performance otimizada em re-renderizações.
   - Dividir visualmente o formulário por seções utilizando `Card` ou `Divider` do AntD.

2. **Mapeamento dos Campos**
   - **Identificação:** Nome (input), data de nascimento (datepicker), profissão (input), motivo (textarea).
   - **Antropometria:** Peso (input number), altura (input number).
   - **Estilo de Vida:** Qualidade do sono, Ansiedade, Estresse (Select ou Rate/Slider 1 a 5). Atividade física (Switch ou Radio), se sim revelar campos de modalidade, frequência, etc.
   - **Suplementação:** Switch/Radio, se sim, um textarea para informar quais.
   - **Recordatório:** 5 Textareas básicos para as refeições.
   - **Observações:** Textarea final.

3. **Integração com a API (Fetch)**
   - Criar uma função helper em `src/lib/api/anamneses.ts` responsável por fazer o `fetch` para o backend com o payload.
   - Tratar estado de loading (`submiting`) e exibir `message` ou `notification` do AntD em caso de erro da API.
   - Após o sucesso (`201 Created`), substituir o form por um componente de Result do AntD (`Result status="success"`), informando ao usuário que a nutricionista já recebeu os dados.

4. **Validações de Interface**
   - Marcar os campos obrigatórios via *rules* do Ant Design Form (`[{ required: true, message: 'Campo obrigatório' }]`).
   - Implementar lógicas condicionais no form usando `Form.useWatch` ou `shouldUpdate`.

---

## ✅ Critérios de Aceite (Definition of Done)

- [x] Tela de `/anamnese` renderiza um formulário completo e organizado.
- [x] Validações de obrigatoriedade estão ativas em tela (exibindo vermelho em caso de erro).
- [x] Se o paciente marca que pratica atividade física ou usa suplemento, os campos extras aparecem.
- [x] Ao enviar o form válido, uma chamada HTTP POST é disparada para `/api/v1/public/anamneses/`.
- [x] Em caso de erro na requisição (API fora, validation error de backend), uma mensagem de erro é exibida.
- [x] Em caso de sucesso, o paciente visualiza uma tela/feedback de agradecimento/sucesso.