from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
import logging

logger = logging.getLogger(__name__)

def send_anamnese_notification(anamnese):
    """
    Envia um e-mail transacional para a nutricionista informando sobre
    a nova anamnese recebida.
    Atualiza o campo `notification_status` da instância da anamnese.
    """
    subject = f"Nova anamnese recebida: {anamnese.full_name}"
    
    # Criar o conteúdo HTML a partir do template
    context = {
        'anamnese': anamnese,
        'frontend_url': getattr(settings, 'NEXT_PUBLIC_API_URL', 'http://localhost:3000').replace('/api/v1', '')
    }
    
    try:
        # Conteúdo HTML e fallback em texto puro
        html_message = render_to_string('email/anamnese_submitted.html', context)
        plain_message = render_to_string('email/anamnese_submitted.txt', context)

        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.NUTRITIONIST_EMAIL],
            html_message=html_message,
            fail_silently=False,
        )
        
        # Sucesso
        anamnese.notification_status = 'sent'
        anamnese.save(update_fields=['notification_status'])
        logger.info(f"Notification SENT for Anamnese {anamnese.id}")

    except Exception as e:
        # Falha
        anamnese.notification_status = 'failed'
        anamnese.save(update_fields=['notification_status'])
        logger.error(f"Failed to send notification for Anamnese {anamnese.id}: {str(e)}")
