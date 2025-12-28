# Deployment Tracker

A comprehensive system for tracking, documenting, and managing open-source software deployments across internal and cloud servers.

## Overview

This project combines machine-readable inventory data (YAML) with human-readable documentation (Markdown) to provide a complete picture of your infrastructure deployments.

### Key Features

- **Server Inventory**: Track all internal and cloud servers with specs, networking, and metadata
- **Software Catalog**: Maintain a catalog of all open-source software in use
- **Deployment Mapping**: Track which software versions are deployed where
- **Comprehensive Documentation**: Detailed deployment guides, procedures, and troubleshooting
- **Template-Driven**: Consistent documentation using proven templates

## Project Structure

```
deployment-tracker/
├── README.md                          # This file
├── inventory/                         # Machine-readable data
│   ├── servers.yaml                  # Server inventory
│   ├── software.yaml                 # Software catalog
│   └── deployments.yaml              # Deployment mappings
├── docs/                             # Human-readable documentation
│   ├── templates/                    # Templates for new docs
│   │   ├── deployment-template.md   # Deployment documentation template
│   │   └── server-template.md       # Server documentation template
│   ├── deployments/                  # Deployment-specific docs
│   │   └── [software-name]/         # One folder per software
│   │       └── [server-id].md       # Deployment documentation
│   ├── servers/                      # Server documentation
│   │   └── [server-id].md           # One file per server
│   └── procedures/                   # Standard procedures
│       └── backup-restore.md        # Backup/restore procedures
└── scripts/                          # Helper scripts
    └── (utility scripts as needed)
```

## Quick Start

### 1. Add a New Server

Edit `inventory/servers.yaml` and add your server:

```yaml
servers:
  - id: my-new-server
    name: My New Server
    type: internal  # or cloud
    environment: production
    specs:
      os: Ubuntu 24.04 LTS
      cpu: 4 cores
      ram: 16GB
      storage: 500GB SSD
    network:
      ip: 192.168.1.20
      hostname: my-server.local
    location: On-premises
    notes: Description of server purpose
```

Optionally, create detailed server documentation:

```bash
cp docs/templates/server-template.md docs/servers/my-new-server.md
# Edit the file with server-specific details
```

### 2. Add New Software to Catalog

Edit `inventory/software.yaml`:

```yaml
software:
  - id: my-software
    name: My Software
    category: web-server  # See categories list in file
    description: What this software does
    homepage: https://example.com
    documentation: https://docs.example.com
    license: MIT
    repository: https://github.com/org/repo
    current_stable_version: 1.0.0
    notes: Additional notes
```

### 3. Document a Deployment

#### Step 1: Add to deployment inventory

Edit `inventory/deployments.yaml`:

```yaml
deployments:
  - id: my-software-my-server
    software_id: my-software
    server_id: my-new-server
    version: 1.0.0
    installation_method: docker
    deployed_date: 2025-11-10
    deployed_by: your-name
    status: active
    config_location: /opt/my-software/config
    data_location: /opt/my-software/data
    service_name: my-software
    ports: [8080]
    documentation_ref: docs/deployments/my-software/my-new-server.md
    notes: Brief deployment notes
```

#### Step 2: Create detailed documentation

```bash
# Create software directory if it doesn't exist
mkdir -p docs/deployments/my-software

# Copy template
cp docs/templates/deployment-template.md \
   docs/deployments/my-software/my-new-server.md

# Edit with deployment-specific details
vim docs/deployments/my-software/my-new-server.md
```

Fill in all sections of the template with your specific deployment details.

## Usage Patterns

### Finding Information

**"What's running on server X?"**

```bash
# Check deployments.yaml
grep "server_id: my-server" inventory/deployments.yaml

# Read server documentation
cat docs/servers/my-server.md
```

**"Where is software Y deployed?"**

```bash
# Check deployments.yaml
grep "software_id: nginx" inventory/deployments.yaml
```

**"How do I update software Z?"**

```bash
# Read the deployment documentation
cat docs/deployments/nginx/my-server.md
# Look for the "Update Procedure" section
```

### Maintenance Workflows

**Weekly Review**:
1. Check all deployments with `status: active` in `deployments.yaml`
2. Verify backups are running (check backup procedures)
3. Review software catalog for version updates

**Monthly Review**:
1. Update software versions in `software.yaml`
2. Check for security updates
3. Review and update documentation
4. Test backup restores in non-production

**Adding New Deployment**:
1. Add server to `servers.yaml` (if new)
2. Add software to `software.yaml` (if new)
3. Perform the installation
4. Document in `deployments.yaml`
5. Create detailed docs using template
6. Test and verify
7. Update changelog

## Best Practices

### Documentation

1. **Keep It Current**: Update documentation immediately after making changes
2. **Be Specific**: Include exact commands, file paths, and versions
3. **Include Context**: Explain why decisions were made
4. **Document Failures**: Record what didn't work and why
5. **Use Templates**: Start with templates for consistency

### Inventory Management

1. **Unique IDs**: Use clear, descriptive IDs (e.g., `nginx-web-01`, not `server1`)
2. **Consistent Naming**: Follow a naming convention across all entries
3. **Version Tracking**: Always include version numbers
4. **Status Updates**: Keep deployment status current
5. **Reference Links**: Always link inventory to documentation

### Deployment Process

1. **Test First**: Deploy to development/staging before production
2. **Document During**: Write docs while deploying, not after
3. **Backup Before**: Always backup before major changes
4. **Verify After**: Test functionality after deployment
5. **Monitor**: Set up monitoring for new deployments

## Templates Guide

### Deployment Template
Use `docs/templates/deployment-template.md` for any software deployment. It covers:
- Installation and configuration
- Architecture and dependencies
- Operations (start/stop/logs)
- Maintenance and updates
- Troubleshooting
- Security considerations
- Disaster recovery

### Server Template
Use `docs/templates/server-template.md` for server documentation. It covers:
- Hardware/instance specifications
- Network configuration
- Deployed software inventory
- Access and authentication
- Monitoring and logging
- Backup and recovery
- Security hardening

## Useful Commands

### Inventory Analysis

```bash
# Count total servers
grep -c "^  - id:" inventory/servers.yaml

# List all active deployments
grep -A 1 "status: active" inventory/deployments.yaml | grep "id:"

# Find deployments by software
grep -A 10 "software_id: nginx" inventory/deployments.yaml
```

### Documentation Search

```bash
# Find all references to a specific technology
grep -r "Docker" docs/

# List all deployment docs
find docs/deployments -name "*.md"

# Search for troubleshooting sections
grep -r "## Troubleshooting" docs/
```

### Generate Reports

```bash
# List all servers by type
grep "type:" inventory/servers.yaml | sort | uniq -c

# List software by category
grep "category:" inventory/software.yaml | sort | uniq -c

# Find deployments needing updates
# (requires comparing versions - can be scripted)
```

## Integration Ideas

### Version Control
```bash
cd deployment-tracker
git init
git add .
git commit -m "Initial deployment tracker setup"
```

### Automation Scripts
Create scripts in `scripts/` directory for:
- Generating inventory reports
- Checking for software updates
- Validating YAML syntax
- Creating deployment documentation from templates
- Backup verification

### Monitoring Integration
Link deployment information to your monitoring system:
- Export inventory to monitoring config
- Generate alerts based on deployment status
- Track deployment changes in monitoring timeline

## Maintenance

### Regular Updates

**Daily**:
- Review deployment logs
- Check backup status

**Weekly**:
- Update deployment status
- Review recent changes
- Check for security updates

**Monthly**:
- Update software versions in catalog
- Review and update documentation
- Test backup restores
- Audit access and permissions

**Quarterly**:
- Full infrastructure audit
- Update procedures based on lessons learned
- Review and optimize costs (cloud)
- Disaster recovery drill

## Troubleshooting

### Common Issues

**Can't find deployment information**:
1. Check `inventory/deployments.yaml` for deployment ID
2. Follow `documentation_ref` link to detailed docs
3. Check `docs/servers/[server-id].md` for server-level info

**Documentation out of date**:
1. Update the documentation immediately
2. Update changelog with date and changes
3. Review related deployments that might be affected

**Inconsistent information**:
1. Inventory (YAML) is the source of truth for structured data
2. Documentation (MD) is the source of truth for procedures
3. When in conflict, verify current state and update both

## Contributing

When adding or updating deployments:

1. Update inventory YAML files first
2. Create or update markdown documentation
3. Test all documented procedures
4. Update changelog in documentation
5. Review for completeness using template checklist

## Support

For questions or issues with this tracking system:
- Review this README
- Check template files for guidance
- Review example deployments in `docs/deployments/`
- Consult `docs/procedures/` for standard processes

## License

This deployment tracker template is provided as-is for infrastructure documentation purposes.

## Next Steps

1. **Customize**: Adapt templates and structure to your specific needs
2. **Populate**: Add your existing servers, software, and deployments
3. **Automate**: Create scripts for common tasks
4. **Integrate**: Connect with your monitoring and deployment tools
5. **Maintain**: Keep documentation current with infrastructure changes

---

**Last Updated**: 2025-11-10
**Maintained By**: [Your Name/Team]
