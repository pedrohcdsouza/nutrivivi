from django.db import transaction
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny, IsAuthenticated
from apps.notifications.services import send_anamnese_notification
from .models import Anamnese
from .serializers import (
    AnamneseCreateSerializer, 
    AnamneseListSerializer, 
    AnamneseDetailSerializer
)

class PublicAnamneseCreateAPIView(generics.CreateAPIView):
    """
    Endpoint publico para submissao de uma nova anamnese pelo paciente.
    Nao requer autenticacao.
    """
    queryset = Anamnese.objects.all()
    serializer_class = AnamneseCreateSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        """
        Sobrescreve a criacao para garantir o hook de email apos persistencia.
        """
        # Salva o objeto no banco na transacao atual
        anamnese = serializer.save()

        # Dispara notificacao de email apenas quando o banco efetivar o commit
        transaction.on_commit(lambda: send_anamnese_notification(anamnese))


class AdminAnamneseListAPIView(generics.ListAPIView):
    """
    Endpoint administrativo para listar todas as anamneses recebidas.
    (Protegido via JWT)
    """
    queryset = Anamnese.objects.all()
    serializer_class = AnamneseListSerializer
    permission_classes = [IsAuthenticated]
    
    # Configuracao de Filtros e Busca
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['notification_status']
    search_fields = ['full_name']
    ordering_fields = ['created_at', 'full_name']
    ordering = ['-created_at']


class AdminAnamneseDetailAPIView(generics.RetrieveAPIView):
    """
    Endpoint administrativo para buscar os detalhes completos de uma anamnese.
    (Protegido via JWT)
    """
    queryset = Anamnese.objects.all()
    serializer_class = AnamneseDetailSerializer
    permission_classes = [IsAuthenticated]
