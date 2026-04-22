from django.db import transaction
from rest_framework import generics
from rest_framework.permissions import AllowAny
from apps.notifications.services import send_anamnese_notification
from .models import Anamnese
from .serializers import (
    AnamneseCreateSerializer, 
    AnamneseListSerializer, 
    AnamneseDetailSerializer
)

class PublicAnamneseCreateAPIView(generics.CreateAPIView):
    """
    Endpoint público para submissão de uma nova anamnese pelo paciente.
    Não requer autenticação.
    """
    queryset = Anamnese.objects.all()
    serializer_class = AnamneseCreateSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        """
        Sobrescreve a criação para garantir o hook de email após persistência.
        """
        # Salva o objeto no banco na transação atual
        anamnese = serializer.save()

        # Dispara notificação de email apenas quando o banco efetivar o commit
        transaction.on_commit(lambda: send_anamnese_notification(anamnese))


class AdminAnamneseListAPIView(generics.ListAPIView):
    """
    Endpoint administrativo para listar todas as anamneses recebidas.
    (Proteção de acesso via Nginx no MVP).
    """
    queryset = Anamnese.objects.all()
    serializer_class = AnamneseListSerializer
    permission_classes = [AllowAny]


class AdminAnamneseDetailAPIView(generics.RetrieveAPIView):
    """
    Endpoint administrativo para buscar os detalhes completos de uma anamnese.
    (Proteção de acesso via Nginx no MVP).
    """
    queryset = Anamnese.objects.all()
    serializer_class = AnamneseDetailSerializer
    permission_classes = [AllowAny]
