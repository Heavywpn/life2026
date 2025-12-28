# Server: [Server Name]

**ID**: [server-id]
**Type**: [Internal/Cloud]
**Environment**: [Production/Staging/Development]
**Status**: [Active/Maintenance/Decommissioned]

---

## Server Information

### Hardware/Instance Specs
- **OS**: [Operating System and Version]
- **CPU**: [Cores/vCPUs]
- **RAM**: [Amount]
- **Storage**: [Size and Type]
- **Instance Type** (if cloud): [Instance type]

### Network Configuration
- **Hostname**: [hostname]
- **Public IP**: [IP address or N/A]
- **Private IP**: [IP address]
- **DNS**: [DNS entries]
- **Ports**: [Open ports]
- **Security Group** (if cloud): [Security group name/ID]

### Location
- **Provider** (if cloud): [AWS/Azure/GCP/etc.]
- **Region** (if cloud): [Region]
- **Physical Location** (if internal): [Datacenter/Office]

---

## Deployed Software

| Software | Version | Status | Ports | Documentation |
|----------|---------|--------|-------|---------------|
| [Name] | [Version] | Active | [80, 443] | [Link] |
| | | | | |

---

## Access & Authentication

### SSH Access
```bash
ssh [user]@[hostname]
# or
ssh -i [key-path] [user]@[ip-address]
```

### SSH Keys
- Key location: [Path or Key management system]
- Authorized users: [List of users with access]

### Sudo Access
- Users with sudo: [List]

### Other Access Methods
- Web console: [URL]
- VPN required: [Yes/No]
- Bastion host: [If applicable]

---

## System Configuration

### Operating System Setup
- Base OS: [OS and version]
- Installed from: [ISO/AMI/Image]
- Last OS update: [Date]

### Package Management
```bash
# Update system
sudo apt update && sudo apt upgrade -y
# or
sudo yum update -y
```

### Installed Packages
Key system packages:
- [package-name] - [purpose]

### System Services
```bash
# List all services
systemctl list-units --type=service
```

Key services:
- [service-name] - [Description and purpose]

---

## Monitoring & Logging

### Monitoring Tools
- **Monitoring Agent**: [Prometheus/Datadog/CloudWatch/etc.]
- **Metrics Endpoint**: [URL:port]
- **Dashboard**: [URL]

### Log Management
- **System Logs**: `/var/log/syslog` or `/var/log/messages`
- **Application Logs**: [Locations]
- **Log Aggregation**: [Service used, if any]

### Alerts
- CPU usage > 80%
- Memory usage > 90%
- Disk usage > 85%
- Service down alerts

---

## Backup & Recovery

### Backup Strategy
- **Method**: [Snapshots/rsync/Custom scripts]
- **Schedule**: [Daily/Weekly]
- **Retention**: [How long backups are kept]
- **Location**: [Backup storage location]

### Snapshot/Backup Procedures
```bash
# Create backup
[backup commands]
```

### Recovery Procedures
1. [Step-by-step recovery process]
2. Estimated recovery time: [Time]

---

## Security

### Firewall Rules
```bash
# View current rules
sudo ufw status
# or
sudo iptables -L
```

Key rules:
- [Rule description]

### Security Hardening
- SSH key-only authentication: [Yes/No]
- Root login disabled: [Yes/No]
- Fail2ban installed: [Yes/No]
- Auto-updates enabled: [Yes/No]
- Security patches applied: [Date of last update]

### Vulnerability Scanning
- Last scan date: [Date]
- Scanner used: [Tool name]
- Critical issues: [Number/None]

---

## Maintenance

### Scheduled Maintenance Windows
- [Day/Time]
- Maintenance contact: [Name/Email]

### Update Policy
- OS updates: [Automatic/Manual/Schedule]
- Application updates: [Policy]
- Reboot schedule: [If applicable]

### Maintenance Tasks
- [ ] Weekly: Check disk space
- [ ] Weekly: Review logs for errors
- [ ] Monthly: Review security patches
- [ ] Monthly: Review backup success
- [ ] Quarterly: Full system audit

---

## Costs (if Cloud)

### Current Costs
- **Monthly estimate**: $[amount]
- **Instance cost**: $[amount]
- **Storage cost**: $[amount]
- **Network cost**: $[amount]
- **Other costs**: $[amount]

### Cost Optimization Notes
- Reserved instance: [Yes/No]
- Spot instance: [Yes/No]
- Optimization opportunities: [Notes]

---

## Disaster Recovery

### Business Criticality
- **Criticality Level**: [Critical/High/Medium/Low]
- **RTO**: [Recovery Time Objective]
- **RPO**: [Recovery Point Objective]

### DR Plan
1. [Step-by-step disaster recovery procedure]
2. Failover server: [Server ID if applicable]
3. Contact list: [On-call contacts]

---

## Troubleshooting

### Common Issues

#### High CPU Usage
```bash
# Check processes
top
htop
```

#### High Memory Usage
```bash
# Check memory
free -h
ps aux --sort=-%mem | head
```

#### Disk Space Issues
```bash
# Check disk usage
df -h
du -sh /* | sort -hr | head
```

#### Network Issues
```bash
# Check connectivity
ping [target]
traceroute [target]
netstat -tuln
```

---

## Decommission Plan

### Prerequisites Before Decommissioning
- [ ] All services migrated
- [ ] Data backed up
- [ ] DNS updated
- [ ] Firewall rules removed
- [ ] Stakeholders notified

### Decommission Steps
1. [Step-by-step process]

---

## Change Log

| Date | Change | By | Notes |
|------|--------|-----|-------|
| YYYY-MM-DD | Server provisioned | [Name] | Initial setup |
| | | | |

---

## Notes

[Any additional notes, quirks, or important information about this server]
