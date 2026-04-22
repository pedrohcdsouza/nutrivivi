# Sprint 9 — Filtros

## 🎯 Objetivo
Adicionar capacidade de busca e filtragem no painel da nutricionista. A filtragem ocorrerá tanto via backend (utilizando `django-filter` no DRF) quanto no frontend, enviando parâmetros via Query String na requisição.

---

## 📋 O que deverá ser feito (Tarefas Técnicas)

1. **Configuração de Filtros no Backend (`apps/anamneses/api.py`)**
   - Instalar `django-filter` se não estiver no requirements (já incluímos anteriormente nas features de DRF se aplicável, senão verificar). *Nota: não o adicionamos no requirement do Sprint 1, devemos instalar e colocar em requirements*.
   - Em `AdminAnamneseListAPIView`, configurar:
     ```python
     from django_filters.rest_framework import DjangoFilterBackend
     from rest_framework import filters

     filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
     filterset_fields = ['notification_status']
     search_fields = ['full_name']
     ordering_fields = ['created_at', 'full_name']
     ordering = ['-created_at']
     ```

2. **Frontend: Integração dos Filtros (`src/app/painel/anamneses/page.tsx`)**
   - Criar uma barra superior contendo um input de Busca (por `full_name`) utilizando o componente `Input.Search` do AntD.
   - Atualizar a função `getAnamneses(params)` no `admin.ts` para receber e concatenar os parâmetros `search`, `ordering`, etc.
   - Recarregar os dados na tabela sempre que a busca for alterada.

---

## ✅ Critérios de Aceite (Definition of Done)

- [x] Biblioteca `django-filter` devidamente instalada e adicionada no `requirements.txt` e no `INSTALLED_APPS`.
- [x] Backend permite busca textual por nome parcial e filtros de status.
- [x] Tela de painel exibe um Input de busca por nome.
- [x] Digitar no campo de busca atualiza os resultados na tabela exibida em tela via chamada a API.