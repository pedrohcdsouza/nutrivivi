from django.urls import path
from .api import (
    PublicAnamneseCreateAPIView,
    AdminAnamneseListAPIView,
    AdminAnamneseDetailAPIView
)

urlpatterns = [
    # Rota Pública (Paciente)
    path('public/anamneses/', PublicAnamneseCreateAPIView.as_view(), name='public-anamnese-create'),
    
    # Rotas Administrativas (Nutricionista)
    path('admin/anamneses/', AdminAnamneseListAPIView.as_view(), name='admin-anamnese-list'),
    path('admin/anamneses/<uuid:pk>/', AdminAnamneseDetailAPIView.as_view(), name='admin-anamnese-detail'),
]
