from django.contrib import admin
from .models import Anamnese

@admin.register(Anamnese)
class AnamneseAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'created_at', 'age_years', 'bmi', 'notification_status')
    search_fields = ('full_name',)
    list_filter = ('created_at', 'notification_status')
    readonly_fields = ('age_years', 'bmi', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Metadados Operacionais', {
            'fields': ('created_at', 'updated_at', 'notification_status')
        }),
        ('1. Identificação do Paciente', {
            'fields': ('full_name', 'birth_date', 'age_years', 'profession', 'consultation_reason')
        }),
        ('2. Antropometria Inicial', {
            'fields': ('weight_kg', 'height_cm', 'bmi')
        }),
        ('3. Perfil de Saúde e Estilo de Vida', {
            'fields': (
                'sleep_quality', 'anxiety_level', 'stress_level',
                'does_physical_activity', 'activity_modality',
                'activity_weekly_frequency', 'activity_workout_time', 'activity_duration_minutes'
            )
        }),
        ('4. Suplementação Atual', {
            'fields': ('uses_supplement', 'supplements')
        }),
        ('5. Recordatório Alimentar', {
            'fields': ('recall_breakfast', 'recall_lunch', 'recall_snack', 'recall_dinner', 'recall_supper_other')
        }),
        ('6. Observações Adicionais', {
            'fields': ('additional_observations',)
        })
    )
