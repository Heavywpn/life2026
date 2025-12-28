# Quick Start Guide

Get started with Deployment Tracker in 5 minutes!

## Step 1: Review the Example

The project comes with a complete example of an NGINX deployment. Review these files:

```bash
# View the example deployment in the inventory
cat inventory/deployments.yaml | grep -A 20 "nginx-internal-web-01"

# View the detailed deployment documentation
cat docs/deployments/nginx/internal-web-01.md

# View the server documentation
cat docs/servers/internal-web-01.md
```

## Step 2: Add Your First Server

Edit `inventory/servers.yaml` and add your server:

```bash
vim inventory/servers.yaml
```

Use this template (add at the end of the `servers:` list):

```yaml
  - id: my-server-01              # Unique ID (no spaces)
    name: My First Server         # Human-readable name
    type: internal                # or 'cloud'
    environment: production       # or 'staging', 'development'
    specs:
      os: Ubuntu 24.04 LTS
      cpu: 4 cores
      ram: 16GB
      storage: 500GB SSD
    network:
      ip: 192.168.1.20           # Server IP
      hostname: my-server.local  # Hostname
      ports: [22, 80, 443]       # Open ports
    location: On-premises        # Physical location
    notes: My first tracked server
```

## Step 3: Add Your First Software

Edit `inventory/software.yaml`:

```bash
vim inventory/software.yaml
```

Add your software to the `software:` list:

```yaml
  - id: my-app                    # Short identifier
    name: My Application          # Full name
    category: web-server          # See categories list at bottom of file
    description: Brief description of the software
    homepage: https://example.com
    documentation: https://docs.example.com
    license: MIT
    repository: https://github.com/user/repo
    current_stable_version: 1.0.0
    notes: Any additional notes
```

## Step 4: Document Your Deployment

### Add to inventory

Edit `inventory/deployments.yaml`:

```bash
vim inventory/deployments.yaml
```

Add your deployment:

```yaml
  - id: my-app-my-server-01
    software_id: my-app           # Must match software.yaml
    server_id: my-server-01       # Must match servers.yaml
    version: 1.0.0
    installation_method: docker   # apt, docker, source, binary, etc.
    deployed_date: 2025-11-10
    deployed_by: your-name
    status: active                # active, planned, testing, deprecated
    config_location: /opt/my-app/config
    data_location: /opt/my-app/data
    service_name: my-app
    ports: [8080]
    documentation_ref: docs/deployments/my-app/my-server-01.md
    notes: Production deployment
```

### Create detailed documentation

```bash
# Create directory for your software
mkdir -p docs/deployments/my-app

# Copy the template
cp docs/templates/deployment-template.md \
   docs/deployments/my-app/my-server-01.md

# Edit with your details
vim docs/deployments/my-app/my-server-01.md
```

Fill in the template with your deployment details. Key sections:
- Installation steps (the exact commands you used)
- Configuration (your actual config files)
- How to start/stop the service
- Where logs are located
- Backup procedures
- Troubleshooting common issues

## Step 5: Generate a Report

See what you've tracked:

```bash
./scripts/generate-report.sh
```

This shows:
- Total servers (internal vs cloud)
- Software catalog summary
- Deployment status
- Active deployments detail

## Next Steps

### Document a Server (Optional but Recommended)

```bash
# Copy template
cp docs/templates/server-template.md \
   docs/servers/my-server-01.md

# Fill in server details
vim docs/servers/my-server-01.md
```

### Set Up Version Control

```bash
cd deployment-tracker
git init
git add .
git commit -m "Initial deployment tracker setup"
```

### Create Backup Procedures

Review and customize:
```bash
vim docs/procedures/backup-restore.md
```

### Regular Maintenance

Add to your schedule:
- **Weekly**: Update deployment status, review changes
- **Monthly**: Update software versions, test backup restores
- **Quarterly**: Full audit, update all documentation

## Common Tasks Reference

### Find what's on a server
```bash
grep "server_id: my-server-01" inventory/deployments.yaml
```

### Find where software is deployed
```bash
grep "software_id: nginx" inventory/deployments.yaml
```

### List all active deployments
```bash
grep -B 1 "status: active" inventory/deployments.yaml | grep "id:"
```

### View deployment documentation
```bash
# Check the documentation_ref field in deployments.yaml
cat docs/deployments/nginx/internal-web-01.md
```

## Tips

1. **Start Small**: Document what you already have deployed first
2. **Keep It Current**: Update immediately after changes (don't wait)
3. **Use Examples**: Reference the NGINX example when creating new docs
4. **Be Consistent**: Use the same format for IDs (e.g., software-server-##)
5. **Test Procedures**: Actually test the commands in your documentation

## Getting Help

- Read the full [README.md](README.md)
- Review the [templates](docs/templates/)
- Look at the [NGINX example](docs/deployments/nginx/internal-web-01.md)
- Check [backup procedures](docs/procedures/backup-restore.md)

## Template Checklist

When documenting a new deployment, make sure to include:

- [ ] Installation steps (exact commands)
- [ ] Configuration file locations
- [ ] How to start/stop the service
- [ ] Log file locations
- [ ] Backup procedures
- [ ] Common troubleshooting steps
- [ ] Update procedure
- [ ] Network/firewall configuration
- [ ] Dependencies

---

Ready to track your infrastructure! 🚀
