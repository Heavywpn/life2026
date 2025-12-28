# NGINX Deployment - internal-web-01

**Status**: Active
**Deployed**: 2024-01-15
**Last Updated**: 2025-11-10
**Maintained By**: Infrastructure Team

---

## Overview

### Purpose
NGINX serves as the primary web server and reverse proxy for internal web applications, handling SSL termination and load balancing for backend services.

### Quick Facts
- **Software**: NGINX v1.26.2
- **Server**: Internal Web Server 01 (internal-web-01)
- **Environment**: Production
- **Installation Method**: APT (Ubuntu package manager)
- **Service Name**: `nginx`

---

## Installation & Configuration

### Prerequisites
- Ubuntu 22.04 LTS server
- Root or sudo access
- Open ports: 80, 443
- Valid SSL certificates (Let's Encrypt)

### Installation Steps

```bash
# Update package index
sudo apt update

# Install NGINX
sudo apt install nginx -y

# Install certbot for SSL
sudo apt install certbot python3-certbot-nginx -y

# Enable and start service
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Configuration Files

**Main Config**: `/etc/nginx/nginx.conf`
**Site Configs**: `/etc/nginx/sites-available/`
**Enabled Sites**: `/etc/nginx/sites-enabled/`
**SSL Certs**: `/etc/letsencrypt/live/`

Key configuration snippets:

```nginx
# /etc/nginx/sites-available/internal-apps
server {
    listen 80;
    server_name apps.internal.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name apps.internal.local;

    ssl_certificate /etc/letsencrypt/live/apps.internal.local/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/apps.internal.local/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Environment Variables
None required for basic operation.

---

## Architecture & Dependencies

### System Dependencies
- OpenSSL 3.0.2 (for SSL/TLS)
- Certbot 2.6.0 (for Let's Encrypt certificates)

### Integration Points
- Reverse proxy to internal applications on ports 3000, 8080
- Load balances traffic across multiple backend instances
- SSL termination point for all HTTPS traffic

### Network Configuration
- Ports used: 80 (HTTP), 443 (HTTPS), 22 (SSH management)
- Firewall rules: Allow 80/443 from internal network only
- No external internet exposure
- Internal DNS: apps.internal.local -> 192.168.1.10

### Data Flow
```
[Internal Users] -> [NGINX:443] -> [Backend App:3000]
                                 -> [Backend App:8080]
```

---

## Operations

### Starting/Stopping Service

```bash
# Start
sudo systemctl start nginx

# Stop
sudo systemctl stop nginx

# Restart (for config changes)
sudo systemctl restart nginx

# Reload config (zero downtime)
sudo systemctl reload nginx

# Status
sudo systemctl status nginx

# Test configuration
sudo nginx -t
```

### Logs

**Access Log**: `/var/log/nginx/access.log`
**Error Log**: `/var/log/nginx/error.log`

```bash
# View live access logs
sudo tail -f /var/log/nginx/access.log

# View live error logs
sudo tail -f /var/log/nginx/error.log

# View last 100 errors
sudo tail -n 100 /var/log/nginx/error.log

# Search for specific IP
sudo grep "192.168.1.50" /var/log/nginx/access.log
```

### Monitoring

- Health check: `curl -I http://localhost`
- Status page: Not configured (can be enabled at /nginx_status)
- Monitoring: System resource monitoring via Prometheus (planned)

---

## Maintenance

### Backup Procedures

**Schedule**: Daily at 2:00 AM
**Location**: `/backup/nginx/`

```bash
# Manual backup
sudo tar -czf /backup/nginx/nginx-config-$(date +%Y%m%d).tar.gz \
  /etc/nginx/ \
  /etc/letsencrypt/

# Backup script location
/usr/local/bin/backup-nginx.sh
```

### Restore Procedures

```bash
# Stop NGINX
sudo systemctl stop nginx

# Restore configuration
sudo tar -xzf /backup/nginx/nginx-config-YYYYMMDD.tar.gz -C /

# Test configuration
sudo nginx -t

# Start NGINX
sudo systemctl start nginx

# Verify
sudo systemctl status nginx
curl -I https://apps.internal.local
```

### Update Procedure

1. Check current version: `nginx -v`
2. Review changelog: https://nginx.org/en/CHANGES
3. Create backup (see above)
4. Perform update:

```bash
# Update package list
sudo apt update

# Check available version
apt-cache policy nginx

# Update NGINX
sudo apt upgrade nginx -y

# Test configuration
sudo nginx -t

# Reload if test passes
sudo systemctl reload nginx

# Verify version
nginx -v
```

5. Monitor logs for errors
6. Verify all sites are accessible

### Scaling Considerations
- Can handle ~10,000 concurrent connections with current resources
- To scale: add more backend servers and update upstream configuration
- Consider moving to dedicated load balancer if traffic exceeds capacity

---

## Troubleshooting

### Common Issues

#### Issue 1: Configuration Test Fails
**Symptoms**:
- `nginx -t` shows syntax errors
- Service fails to reload

**Diagnosis**:
```bash
# Test configuration
sudo nginx -t

# Check for specific error
sudo journalctl -u nginx -n 50
```

**Resolution**:
```bash
# Review recent config changes
sudo diff /etc/nginx/sites-available/internal-apps /backup/nginx/internal-apps

# Fix syntax error in config file
sudo vim /etc/nginx/sites-available/internal-apps

# Test again
sudo nginx -t

# Reload when test passes
sudo systemctl reload nginx
```

#### Issue 2: SSL Certificate Expired
**Symptoms**:
- Browser shows certificate error
- Logs show SSL handshake failures

**Diagnosis**:
```bash
# Check certificate expiry
sudo certbot certificates
```

**Resolution**:
```bash
# Renew certificates
sudo certbot renew

# Test renewal without actually renewing
sudo certbot renew --dry-run

# Reload NGINX to use new cert
sudo systemctl reload nginx
```

#### Issue 3: High Memory Usage
**Symptoms**:
- Server running slow
- High memory usage in monitoring

**Diagnosis**:
```bash
# Check NGINX worker processes
ps aux | grep nginx

# Check connections
sudo netstat -an | grep :80 | wc -l
```

**Resolution**:
```bash
# Review worker_processes in nginx.conf
# Typically set to number of CPU cores

# Adjust worker_connections if needed
# /etc/nginx/nginx.conf:
#   events {
#     worker_connections 768;
#   }

# Reload after changes
sudo systemctl reload nginx
```

### Debug Mode

```bash
# Enable debug logging (temporary)
# Edit /etc/nginx/nginx.conf:
# error_log /var/log/nginx/error.log debug;

sudo systemctl reload nginx

# View debug logs
sudo tail -f /var/log/nginx/error.log

# Remember to disable after troubleshooting
# Change back to: error_log /var/log/nginx/error.log warn;
```

### Performance Issues

- Check resource usage: `htop`
- Review access logs for unusual patterns
- Check backend service response times
- Consider enabling caching for static content

---

## Security

### Authentication/Authorization
- No authentication at NGINX level
- Backend applications handle authentication
- Internal network access only

### Network Security
- Firewall: UFW enabled, allows only 80/443 from 192.168.1.0/24
- SSL/TLS: TLS 1.2 and 1.3 only
- Security headers enabled (see configuration above)
- No external internet exposure

### Secrets Management
- SSL private keys in `/etc/letsencrypt/live/`
- Permissions: 600 (root only)
- No secrets in configuration files

### Security Updates
- Ubuntu security updates: Automatic
- NGINX updates: Manual, tested in dev first
- SSL certificate auto-renewal via certbot cron

---

## Disaster Recovery

### RTO/RPO
- **Recovery Time Objective**: 1 hour
- **Recovery Point Objective**: 24 hours (daily backups)

### Disaster Recovery Steps
1. Assess the situation (hardware failure, corruption, etc.)
2. Provision new server if needed (or use dev-test-01 temporarily)
3. Install NGINX: `sudo apt install nginx certbot python3-certbot-nginx`
4. Restore configuration from backup
5. Update DNS if server IP changed
6. Restore SSL certificates or request new ones
7. Test configuration: `sudo nginx -t`
8. Start service: `sudo systemctl start nginx`
9. Verify all sites are accessible
10. Monitor for issues

---

## References

### Documentation Links
- Official documentation: https://nginx.org/en/docs/
- SSL config generator: https://ssl-config.mozilla.org/
- Let's Encrypt docs: https://letsencrypt.org/docs/

### Related Deployments
- Backend applications proxied through this NGINX instance
- See `inventory/deployments.yaml` for complete list

### Configuration Repository
- Backups: `/backup/nginx/`
- Version control: Planned (not yet implemented)

---

## Change Log

| Date | Version | Change | By |
|------|---------|--------|-----|
| 2024-01-15 | 1.26.2 | Initial deployment | Infrastructure Team |
| 2024-03-20 | 1.26.2 | Added SSL certificates | Infrastructure Team |
| 2024-06-10 | 1.26.2 | Added new backend proxy config | Infrastructure Team |
| 2025-11-10 | 1.26.2 | Documentation update | Infrastructure Team |

---

## Notes

- SSL certificates auto-renew via certbot systemd timer
- Consider implementing rate limiting if public access is ever needed
- Monitoring integration pending (Prometheus exporter to be added)
- Backup verification tested monthly
- Configuration is relatively simple; complexity in backend applications
