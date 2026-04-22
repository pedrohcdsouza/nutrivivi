# Sprint 5 — Sistema de Email

## 🎯 Objetivo
Configurar o envio de e-mails transacionais via SMTP para notificar a nutricionista imediatamente após um paciente enviar uma nova anamnese com sucesso, utilizando o hook `transaction.on_commit` para garantir que o e-mail só seja disparado se os dados forem persistidos no banco.

---

## 📋 O que deverá ser feito (Tarefas Técnicas)

1. **Configuração SMTP**
   - Atualizar `backend/config/settings/base.py` para ler as variáveis de ambiente de e-mail (`EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, `EMAIL_USE_TLS`).
   - Configurar o backend de e-mail padrão. Em `dev.py` pode-se usar o backend de console ou SMTP (como Mailtrap) lido do `.env`.

2. **Criação do App Notifications**
   - Criar o app `notifications` em `backend/apps/`.
   - Adicionar aos `INSTALLED_APPS`.
   - Criar uma camada de serviço `services.py` contendo a função `send_anamnese_notification(anamnese)`.

3. **Templates de E-mail**
   - Criar arquivos de template simples em texto puro (`anamnese_submitted.txt`) ou HTML (`anamnese_submitted.html`) contendo o nome do paciente, data do envio e um link (ou aviso) para acessar o painel.

4. **Hook de Disparo (`transaction.on_commit`)**
   - Na view de criação (`PublicAnamneseCreateAPIView` em `apps/anamneses/api.py`), sobrescrever o método `perform_create(self, serializer)`.
   - Salvar a anamnese e, dentro de um `transaction.on_commit`, chamar o serviço de notificação passando o objeto criado.
   - Atualizar o `notification_status` da anamnese para `SENT` em caso de sucesso ou `FAILED` em caso de erro, e salvar novamente.

---

## ✅ Critérios de Aceite (Definition of Done)

- [x] Configurações de SMTP integradas ao `settings/base.py`.
- [x] Serviço de envio de e-mails construído com suporte a templates básicos.
- [x] O envio do e-mail está atrelado ao `transaction.on_commit` durante a submissão de uma nova anamnese.
- [x] O status de `notification_status` da anamnese é atualizado corretamente após a tentativa de envio.