from rest_framework import serializers
from .models import Anamnese

class AnamneseCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anamnese
        fields = [
            'full_name', 'birth_date', 'profession', 'consultation_reason',
            'weight_kg', 'height_cm',
            'sleep_quality', 'anxiety_level', 'stress_level',
            'does_physical_activity', 'activity_modality', 'activity_weekly_frequency',
            'activity_workout_time', 'activity_duration_minutes',
            'uses_supplement', 'supplements',
            'recall_breakfast', 'recall_lunch', 'recall_snack', 'recall_dinner', 'recall_supper_other',
            'additional_observations'
        ]

    def validate(self, data):
        # Validações condicionais
        if data.get('does_physical_activity'):
            if not data.get('activity_modality'):
                raise serializers.ValidationError({"activity_modality": "Obrigatório se pratica atividade física."})
            if not data.get('activity_weekly_frequency'):
                raise serializers.ValidationError({"activity_weekly_frequency": "Obrigatório se pratica atividade física."})
            if not data.get('activity_workout_time'):
                raise serializers.ValidationError({"activity_workout_time": "Obrigatório se pratica atividade física."})
            if not data.get('activity_duration_minutes'):
                raise serializers.ValidationError({"activity_duration_minutes": "Obrigatório se pratica atividade física."})
        
        if data.get('uses_supplement') and not data.get('supplements'):
            raise serializers.ValidationError({"supplements": "Obrigatório se usa suplemento."})

        return data


class AnamneseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anamnese
        fields = ['id', 'full_name', 'created_at', 'age_years', 'bmi', 'notification_status']


class AnamneseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anamnese
        fields = '__all__'
