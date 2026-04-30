#!/bin/bash
set -e

DOMAINS=(nutrivivi.com.br www.nutrivivi.com.br api.nutrivivi.com.br)
EMAIL="pedrohcsouza2005@gmail.com"
CERTBOT_DIR="./certbot"
CONF_DIR="$CERTBOT_DIR/conf"
WWW_DIR="$CERTBOT_DIR/www"

echo "### Criando diretórios..."
mkdir -p "$CONF_DIR/live/nutrivivi.com.br" "$WWW_DIR"

echo "### Baixando parâmetros TLS recomendados pelo certbot..."
curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf \
  -o "$CONF_DIR/options-ssl-nginx.conf"
curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem \
  -o "$CONF_DIR/ssl-dhparams.pem"

echo "### Criando certificado dummy para o nginx subir..."
openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
  -keyout "$CONF_DIR/live/nutrivivi.com.br/privkey.pem" \
  -out "$CONF_DIR/live/nutrivivi.com.br/fullchain.pem" \
  -subj "/CN=localhost" 2>/dev/null

echo "### Subindo nginx com cert dummy..."
docker compose --env-file .env up -d nginx

echo "### Aguardando nginx..."
sleep 3

echo "### Removendo cert dummy..."
rm -rf "$CONF_DIR/live"

echo "### Solicitando certificado real ao Let's Encrypt..."
docker compose --env-file .env run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d nutrivivi.com.br \
  -d www.nutrivivi.com.br \
  -d api.nutrivivi.com.br

echo "### Recarregando nginx com certificado real..."
docker compose exec nginx nginx -s reload

echo "### Pronto! HTTPS ativo para: ${DOMAINS[*]}"
