from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

# CORS settings
CORS_ALLOW_ALL_ORIGINS = True

# Add browsable API in dev mode
REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] += (
    'rest_framework.renderers.BrowsableAPIRenderer',
)

# Se não quiser enviar de verdade em dev, descomente abaixo:
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
