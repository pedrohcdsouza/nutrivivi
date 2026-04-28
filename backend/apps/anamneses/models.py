import uuid
from decimal import Decimal
from django.db import models
from django.utils import timezone


class NotificationStatus(models.TextChoices):
    PENDING = "pending", "Pendente"
    SENT = "sent", "Enviado"
    FAILED = "failed", "Falha"


class Anamnese(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Data de Envio")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última Atualização")

    # 1. Identificação do Paciente
    full_name = models.CharField(max_length=150, verbose_name="Nome Completo")
    age_years = models.PositiveSmallIntegerField(verbose_name="Idade")
    profession = models.CharField(max_length=120, verbose_name="Profissão")
    consultation_reason = models.TextField(verbose_name="Motivo da Consulta")

    # 2. Antropometria Inicial
    weight_kg = models.DecimalField(
        max_digits=5, decimal_places=2, verbose_name="Peso Atual (kg)"
    )
    height_cm = models.DecimalField(
        max_digits=5, decimal_places=2, verbose_name="Altura (cm)"
    )
    bmi = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True, verbose_name="IMC"
    )

    # 3. Perfil de Saúde e Estilo de Vida
    sleep_quality = models.PositiveSmallIntegerField(
        verbose_name="Qualidade do Sono (1-5)"
    )
    anxiety_level = models.PositiveSmallIntegerField(
        verbose_name="Nível de Ansiedade (1-5)"
    )
    stress_level = models.PositiveSmallIntegerField(
        verbose_name="Nível de Estresse (1-5)"
    )
    does_physical_activity = models.BooleanField(
        default=False, verbose_name="Pratica Atividade Física?"
    )
    activity_modality = models.CharField(
        max_length=120, blank=True, null=True, verbose_name="Modalidade"
    )
    activity_weekly_frequency = models.PositiveSmallIntegerField(
        blank=True, null=True, verbose_name="Frequência Semanal"
    )
    activity_workout_time = models.CharField(
        max_length=50, blank=True, null=True, verbose_name="Horário do Treino"
    )
    activity_duration_minutes = models.PositiveSmallIntegerField(
        blank=True, null=True, verbose_name="Duração (min)"
    )

    # 4. Suplementação Atual
    uses_supplement = models.BooleanField(default=False, verbose_name="Usa Suplemento?")
    supplements = models.TextField(
        blank=True, null=True, verbose_name="Quais suplementos"
    )

    # 5. Recordatório Alimentar
    recall_breakfast = models.TextField(verbose_name="Café da Manhã")
    recall_lunch = models.TextField(verbose_name="Almoço")
    recall_snack = models.TextField(verbose_name="Lanche")
    recall_dinner = models.TextField(verbose_name="Jantar")
    recall_supper_other = models.TextField(verbose_name="Ceia/Outros")

    # 6. Observações adicionais
    additional_observations = models.TextField(
        blank=True, null=True, verbose_name="Observações Adicionais"
    )

    # Operacional
    notification_status = models.CharField(
        max_length=20,
        choices=NotificationStatus.choices,
        default=NotificationStatus.PENDING,
        verbose_name="Status da Notificação",
    )

    class Meta:
        verbose_name = "Anamnese"
        verbose_name_plural = "Anamneses"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} - {self.created_at.strftime('%d/%m/%Y')}"

    def save(self, *args, **kwargs):
        # Calculate BMI = weight(kg) / (height(m) * height(m))
        if self.weight_kg and self.height_cm and self.height_cm > 0:
            height_m = Decimal(self.height_cm) / Decimal("100")
            self.bmi = Decimal(self.weight_kg) / (height_m**2)

        super().save(*args, **kwargs)
