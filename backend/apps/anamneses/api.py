from rest_framework import generics
from rest_framework.permissions import AllowAny
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
