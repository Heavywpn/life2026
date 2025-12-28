# Server: Internal Web Server 01

**ID**: internal-web-01
**Type**: Internal
**Environment**: Production
**Status**: Active

---

## Server Information

### Hardware/Instance Specs
- **OS**: Ubuntu 22.04 LTS (Jammy Jellyfish)
- **CPU**: 4 cores (Intel Xeon)
- **RAM**: 16GB DDR4
- **Storage**: 500GB SSD (RAID 1)
- **Instance Type**: Physical server

### Network Configuration
- **Hostname**: web-01.internal.local
- **Public IP**: N/A (internal only)
- **Private IP**: 192.168.1.10
- **DNS**: apps.internal.local (points to this server)
- **Ports**: 80 (HTTP), 443 (HTTPS), 22 (SSH)
- **Gateway**: 192.168.1.1
- **DNS Servers**: 192.168.1.1, 8.8.8.8

### Location
- **Physical Location**: On-premises datacenter, Rack A3, Unit 15
- **Network**: Internal LAN (192.168.1.0/24)
- **Console Access**: IPMI/iLO available at 192.168.2.10

---

## Deployed Software

| Software | Version | Status | Ports | Documentation |
|----------|---------|--------|-------|---------------|
| NGINX | 1.26.2 | Active | 80, 443 | [Link](../deployments/nginx/internal-web-01.md) |
| Certbot | 2.6.0 | Active | - | Part of NGINX setup |
| UFW | 0.36.1 | Active | - | Firewall management |
| Prometheus Node Exporter | 1.6.0 | Planned | 9100 | Monitoring (planned) |

---

## Access & Authentication

### SSH Access
```bash
# From within internal network
ssh admin@192.168.1.10

# Or using hostname
ssh admin@web-01.internal.local
```

### SSH Keys
- Key location: `~/.ssh/authorized_keys`
- Authorized users:
  - admin (primary)
  - infrastructure-team (group access)
- Key management: Keys stored in team password manager

### Sudo Access
- Users with sudo: admin, infrastructure-team members
- Sudo config: `/etc/sudoers.d/`
- Password required for sudo: Yes

### Other Access Methods
- Web console: IPMI available at https://192.168.2.10
- Physical access: Datacenter on-site (keycard required)
- VPN required: No (already on internal network)

---

## System Configuration

### Operating System Setup
- Base OS: Ubuntu 22.04 LTS Server
- Installed from: Ubuntu Server ISO
- Installation date: 2024-01-10
- Last OS update: 2025-11-01
- Kernel: 5.15.0-91-generic

### Package Management
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Auto-updates enabled via unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

### Installed Packages
Key system packages:
- nginx - Web server
- ufw - Uncomplicated Firewall
- certbot - Let's Encrypt SSL certificates
- htop - System monitoring
- net-tools - Network utilities
- curl, wget - Download tools
- vim - Text editor
- git - Version control

### System Services
```bash
# List all services
systemctl list-units --type=service --state=running
```

Key services:
- nginx.service - NGINX web server
- ssh.service - OpenSSH server
- ufw.service - Firewall
- systemd-timesyncd.service - Time synchronization
- unattended-upgrades.service - Automatic security updates

---

## Monitoring & Logging

### Monitoring Tools
- **Monitoring Agent**: Prometheus Node Exporter (planned)
- **Metrics Endpoint**: http://192.168.1.10:9100/metrics (when deployed)
- **Dashboard**: Grafana dashboard (planned)
- **Current Monitoring**: Manual checks via htop, journalctl

### Log Management
- **System Logs**: `/var/log/syslog`
- **Auth Logs**: `/var/log/auth.log`
- **Application Logs**: `/var/log/nginx/`
- **Journal**: `journalctl` for systemd logs
- **Log Rotation**: Configured via logrotate (7 days retention)
- **Log Aggregation**: None (local only)

### Alerts
Current alerts (manual monitoring):
- Disk usage > 85%
- High CPU sustained > 5 minutes
- NGINX service down
- SSH brute force attempts (fail2ban)

Planned automated alerts:
- Integration with Prometheus Alertmanager
- Email notifications for critical issues

---

## Backup & Recovery

### Backup Strategy
- **Method**: Automated rsync to backup server
- **Schedule**: Daily at 2:00 AM
- **Retention**:
  - Daily: 7 days
  - Weekly: 4 weeks
  - Monthly: 3 months
- **Location**:
  - Primary: `/backup/` on backup-server-01 (192.168.1.100)
  - Offsite: Weekly backup to external drive

### Snapshot/Backup Procedures
```bash
# Backup script runs via cron
/usr/local/bin/backup-web-01.sh

# Manual backup trigger
sudo /usr/local/bin/backup-web-01.sh

# Backup includes:
# - /etc/ (system configuration)
# - /var/www/ (web content)
# - /home/ (user data)
# - /opt/ (optional software)
# - Package list: dpkg --get-selections
```

### Restore Procedures

1. Boot from Ubuntu Server ISO or use spare server
2. Install base system with same Ubuntu version
3. Configure network with same IP address
4. Restore files from backup:

```bash
# Mount backup location
sudo mount -t nfs 192.168.1.100:/backup/web-01 /mnt/backup

# Restore system files
sudo rsync -av /mnt/backup/etc/ /etc/
sudo rsync -av /mnt/backup/var/www/ /var/www/
sudo rsync -av /mnt/backup/home/ /home/

# Reinstall packages
sudo dpkg --set-selections < /mnt/backup/package-list.txt
sudo apt-get dselect-upgrade

# Restore specific service configs
sudo systemctl restart nginx
```

5. Verify services are running
6. Test web applications
7. Estimated recovery time: 2-4 hours

---

## Security

### Firewall Rules
```bash
# View current rules
sudo ufw status verbose

# Current rules:
# - Allow 22/tcp from 192.168.1.0/24
# - Allow 80/tcp from 192.168.1.0/24
# - Allow 443/tcp from 192.168.1.0/24
# - Deny all other incoming
# - Allow all outgoing
```

### Security Hardening
- SSH key-only authentication: Yes
- Root login disabled: Yes (root login via SSH disabled)
- Fail2ban installed: Yes (protects SSH)
- Auto-updates enabled: Yes (security updates only)
- Security patches applied: Weekly
- Last security audit: 2025-10-15

Additional hardening:
- Disabled unused services
- Minimal package installation
- AppArmor enabled
- Kernel parameters tuned for security

### Vulnerability Scanning
- Last scan date: 2025-11-01
- Scanner used: OpenVAS (quarterly scans)
- Critical issues: None
- Medium issues: None
- Low issues: 2 (documented, accepted risk)

---

## Maintenance

### Scheduled Maintenance Windows
- **Window**: 2nd Saturday of each month, 6:00 AM - 10:00 AM
- **Purpose**: System updates, patches, hardware checks
- **Notification**: 1 week advance notice to users
- **Maintenance contact**: infrastructure-team@company.local

### Update Policy
- **OS updates**: Automatic security updates, manual feature updates
- **Application updates**: Manual, tested in dev first
- **Reboot schedule**: As needed during maintenance windows
- **Kernel updates**: Quarterly, requires reboot

### Maintenance Tasks
Weekly:
- [x] Check disk space: `df -h`
- [x] Review logs for errors: `sudo journalctl -p err -n 100`
- [x] Verify backup success: Check backup-server-01 logs
- [x] Check service status: `systemctl status nginx`

Monthly:
- [x] Review security patches: `apt list --upgradable`
- [x] Review firewall rules: `sudo ufw status`
- [x] Test backup restore (non-production)
- [x] Review SSL certificate expiry: `sudo certbot certificates`

Quarterly:
- [x] Full system audit
- [x] Review and rotate logs
- [x] Hardware check (fans, RAID status, temperatures)
- [x] Vulnerability scan
- [x] Update documentation

---

## Costs (if Cloud)

N/A - This is an on-premises physical server

**Hardware Cost**: ~$2,500 (one-time, purchased 2024)
**Power Cost**: ~$15/month estimated
**Maintenance**: Included in datacenter operations

---

## Disaster Recovery

### Business Criticality
- **Criticality Level**: High
- **RTO**: 4 hours (can failover to dev-test-01 temporarily)
- **RPO**: 24 hours (daily backups)
- **Impact of Outage**: Internal applications unavailable

### DR Plan

1. **Immediate Actions** (0-15 minutes):
   - Assess severity of failure
   - Notify infrastructure team
   - Determine if failover to dev-test-01 is needed

2. **Temporary Failover** (15-60 minutes):
   - Configure dev-test-01 with production configs
   - Update DNS to point to dev-test-01 (192.168.1.50)
   - Verify applications are accessible
   - Notify users of temporary setup

3. **Full Recovery** (1-4 hours):
   - Diagnose hardware issue
   - Replace failed hardware OR provision new server
   - Restore from backup (see restore procedure above)
   - Verify all services
   - Switch DNS back to production server
   - Monitor for issues

4. **Post-Incident** (Next 24 hours):
   - Document incident
   - Review what went wrong
   - Update DR procedures if needed
   - Schedule post-mortem meeting

### Failover Resources
- **Backup server**: dev-test-01 (192.168.1.50)
- **Spare hardware**: Check inventory for compatible parts
- **Alternative**: Can temporarily migrate to cloud if extended outage

---

## Troubleshooting

### Common Issues

#### High CPU Usage
```bash
# Check processes
top
htop

# Check NGINX worker processes
ps aux | grep nginx

# Check for unusual processes
ps aux | grep -v "nginx\|systemd\|root" | sort -k3 -rn | head
```

#### High Memory Usage
```bash
# Check memory
free -h

# Check per-process memory
ps aux --sort=-%mem | head -20

# Clear cache if needed (usually not necessary)
sudo sync && sudo sysctl -w vm.drop_caches=3
```

#### Disk Space Issues
```bash
# Check disk usage
df -h

# Find large directories
du -sh /* | sort -hr | head -10

# Clean up old logs
sudo journalctl --vacuum-time=7d

# Check for large log files
find /var/log -type f -size +100M -exec ls -lh {} \;
```

#### Network Issues
```bash
# Check connectivity
ping 8.8.8.8
ping 192.168.1.1

# Check DNS
nslookup google.com

# Check open connections
sudo netstat -tuln

# Check firewall
sudo ufw status verbose
```

#### NGINX Won't Start
See: [NGINX deployment documentation](../deployments/nginx/internal-web-01.md#troubleshooting)

---

## Decommission Plan

### Prerequisites Before Decommissioning
- [ ] All services migrated to new server
- [ ] Final backup completed and verified
- [ ] DNS updated to point to new server
- [ ] Firewall rules updated
- [ ] Monitoring updated
- [ ] Users notified of migration
- [ ] 30-day waiting period (keep powered on but idle)

### Decommission Steps
1. Shut down all services: `sudo systemctl stop nginx`
2. Create final backup
3. Power off server: `sudo shutdown -h now`
4. Wait 30 days for any issues to surface
5. Wipe drives securely: `sudo shred -vfz -n 5 /dev/sda`
6. Remove from rack
7. Update asset inventory
8. Archive documentation (move to archive folder)
9. Repurpose or dispose of hardware per company policy

---

## Change Log

| Date | Change | By | Notes |
|------|--------|-----|-------|
| 2024-01-10 | Server provisioned | Infrastructure Team | Initial setup |
| 2024-01-15 | NGINX deployed | Infrastructure Team | Production web server |
| 2024-03-20 | SSL certificates added | Infrastructure Team | Let's Encrypt |
| 2025-06-15 | RAM upgraded 8GB -> 16GB | Infrastructure Team | Performance improvement |
| 2025-11-10 | Documentation updated | Infrastructure Team | Complete audit |

---

## Notes

- Server running reliably since January 2024
- RAM upgrade performed successfully with zero downtime (during maintenance window)
- Consider adding Prometheus monitoring in next quarter
- Hardware warranty expires January 2027
- RAID array: healthy, both drives operational
- Temperature consistently normal (40-50°C under load)
- Excellent candidate for migration to cloud if future needs change
