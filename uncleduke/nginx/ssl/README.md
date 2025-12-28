# SSL Certificates

Place your SSL certificates in this directory for HTTPS support.

## Required Files

- `dashboard.crt` - SSL certificate
- `dashboard.key` - Private key

## Generate Self-Signed Certificates (Testing Only)

For development/testing, you can generate self-signed certificates:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout dashboard.key \
  -out dashboard.crt \
  -subj "/C=US/ST=State/L=City/O=Company/CN=dashboard.internal.company.com"
```

## Production Certificates

For production, use certificates from a trusted Certificate Authority (CA) or your organization's internal CA.

### Using Let's Encrypt

If your dashboard is accessible from the internet, you can use Let's Encrypt:

```bash
certbot certonly --standalone -d dashboard.company.com
cp /etc/letsencrypt/live/dashboard.company.com/fullchain.pem dashboard.crt
cp /etc/letsencrypt/live/dashboard.company.com/privkey.pem dashboard.key
```

## Security Notes

- Never commit actual certificates to version control
- Protect private keys with appropriate file permissions (600)
- Use strong key sizes (minimum 2048-bit RSA)
- Renew certificates before expiration
