# Backup and Restore Procedures

This document outlines standard backup and restore procedures for all deployments.

---

## Backup Strategy Overview

### Backup Types
1. **Full Backup**: Complete copy of all data
2. **Incremental Backup**: Only changed data since last backup
3. **Configuration Backup**: System and application configurations
4. **Database Backup**: Database dumps
5. **Snapshot Backup**: Full system/volume snapshots

### Retention Policy
- Daily backups: Kept for 7 days
- Weekly backups: Kept for 4 weeks
- Monthly backups: Kept for 12 months
- Yearly backups: Kept for [X] years

---

## General Backup Procedures

### Pre-Backup Checklist
- [ ] Verify sufficient storage space
- [ ] Check backup system is operational
- [ ] Verify network connectivity (for remote backups)
- [ ] Note current system state

### Manual Backup Trigger

```bash
# Example manual backup command
sudo /usr/local/bin/backup-script.sh

# Or using specific tools
# For rsync:
rsync -avz --delete /source/path/ /backup/path/

# For tar:
tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz /path/to/data
```

### Automated Backup Setup

```bash
# Example cron job for daily backups at 2 AM
# Edit crontab
crontab -e

# Add line:
0 2 * * * /usr/local/bin/backup-script.sh >> /var/log/backup.log 2>&1
```

---

## Service-Specific Backup Procedures

### Database Backups

#### PostgreSQL
```bash
# Backup single database
pg_dump -U [username] -h [host] [database_name] > backup.sql

# Backup all databases
pg_dumpall -U [username] > all_databases.sql

# Compressed backup
pg_dump -U [username] [database_name] | gzip > backup.sql.gz
```

#### MySQL/MariaDB
```bash
# Backup single database
mysqldump -u [username] -p [database_name] > backup.sql

# Backup all databases
mysqldump -u [username] -p --all-databases > all_databases.sql

# Compressed backup
mysqldump -u [username] -p [database_name] | gzip > backup.sql.gz
```

### Docker Volumes
```bash
# Backup docker volume
docker run --rm -v [volume_name]:/data -v $(pwd):/backup \
  ubuntu tar czf /backup/volume-backup.tar.gz -C /data .

# List volumes
docker volume ls
```

### Configuration Files
```bash
# Backup configuration directory
tar -czf config-backup-$(date +%Y%m%d).tar.gz \
  /etc/nginx/ \
  /etc/systemd/system/ \
  /opt/application/config/
```

### File System / Data Directories
```bash
# Using rsync
rsync -avz --delete /data/ /backup/data/

# Using tar
tar -czf data-backup-$(date +%Y%m%d).tar.gz /data/
```

---

## Cloud-Specific Backups

### AWS
```bash
# EC2 Snapshot
aws ec2 create-snapshot --volume-id vol-xxxxx \
  --description "Backup $(date +%Y%m%d)"

# S3 Sync
aws s3 sync /local/path s3://bucket-name/backup/

# RDS Snapshot
aws rds create-db-snapshot \
  --db-snapshot-identifier mydb-snapshot-$(date +%Y%m%d) \
  --db-instance-identifier mydb
```

---

## Restore Procedures

### Pre-Restore Checklist
- [ ] Identify correct backup to restore
- [ ] Verify backup integrity
- [ ] Stop affected services
- [ ] Notify stakeholders of downtime
- [ ] Document current state before restore

### General Restore Steps

1. **Stop the service**
   ```bash
   sudo systemctl stop [service-name]
   # or
   docker-compose down
   ```

2. **Backup current state** (in case restore fails)
   ```bash
   mv /data /data.before-restore-$(date +%Y%m%d-%H%M%S)
   ```

3. **Restore from backup**
   ```bash
   # From tar
   tar -xzf backup.tar.gz -C /

   # From rsync backup
   rsync -avz /backup/data/ /data/
   ```

4. **Set correct permissions**
   ```bash
   chown -R [user]:[group] /data
   chmod -R [permissions] /data
   ```

5. **Start the service**
   ```bash
   sudo systemctl start [service-name]
   # or
   docker-compose up -d
   ```

6. **Verify restoration**
   ```bash
   # Check service status
   systemctl status [service-name]

   # Check logs
   journalctl -u [service-name] -n 50

   # Test functionality
   [service-specific tests]
   ```

### Database Restore

#### PostgreSQL
```bash
# Stop connections
sudo systemctl stop [application]

# Restore database
psql -U [username] -h [host] [database_name] < backup.sql

# For compressed backups
gunzip -c backup.sql.gz | psql -U [username] [database_name]

# Restart application
sudo systemctl start [application]
```

#### MySQL/MariaDB
```bash
# Restore database
mysql -u [username] -p [database_name] < backup.sql

# For compressed backups
gunzip -c backup.sql.gz | mysql -u [username] -p [database_name]
```

### Docker Volume Restore
```bash
# Restore docker volume
docker run --rm -v [volume_name]:/data -v $(pwd):/backup \
  ubuntu tar xzf /backup/volume-backup.tar.gz -C /data
```

---

## Verification

### Backup Verification Checklist
- [ ] Backup completed without errors
- [ ] Backup file size is reasonable (not 0 bytes, not suspiciously small)
- [ ] Backup is accessible/readable
- [ ] Test restore in non-production environment (periodic)
- [ ] Verify backup integrity (checksums if available)

### Restore Verification Checklist
- [ ] Service starts successfully
- [ ] Application is accessible
- [ ] Data is present and correct
- [ ] All expected functionality works
- [ ] Performance is normal
- [ ] No errors in logs

---

## Testing Backups

### Scheduled Restore Tests
- **Frequency**: Monthly (at minimum)
- **Environment**: Non-production test environment
- **Process**:
  1. Select a recent backup
  2. Restore to test environment
  3. Verify all data and functionality
  4. Document results
  5. Address any issues found

---

## Monitoring and Alerts

### Backup Monitoring
```bash
# Check backup script logs
tail -f /var/log/backup.log

# Check for failed backups
grep -i "error\|fail" /var/log/backup.log
```

### Alerts to Configure
- Backup job fails
- Backup storage reaching capacity
- Backup not completed within expected timeframe
- Backup file size anomalies

---

## Troubleshooting

### Backup Fails

**Check disk space**:
```bash
df -h
```

**Check permissions**:
```bash
ls -la /backup/path
```

**Check logs**:
```bash
journalctl -xe
tail -f /var/log/backup.log
```

### Restore Fails

**Verify backup integrity**:
```bash
# For tar files
tar -tzf backup.tar.gz > /dev/null

# Check file
file backup.tar.gz
```

**Check target disk space**:
```bash
df -h /target/path
```

---

## Emergency Contacts

| Role | Name | Contact |
|------|------|---------|
| Primary Admin | [Name] | [Email/Phone] |
| Backup Admin | [Name] | [Email/Phone] |
| On-Call | [Rotation] | [Contact Method] |

---

## References

- [Link to backup storage location documentation]
- [Link to disaster recovery plan]
- [Link to specific service backup docs]
