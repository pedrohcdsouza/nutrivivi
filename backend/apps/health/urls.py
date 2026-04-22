from django.urls import path
from .api import HealthCheckAPIView

urlpatterns = [
    path('', HealthCheckAPIView.as_view(), name='health-check'),
]
