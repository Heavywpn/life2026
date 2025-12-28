# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Deployment Tracker is a dual-format infrastructure documentation system combining:
- **Machine-readable YAML inventory** (`inventory/`) for structured data about servers, software, and deployments
- **Human-readable Markdown documentation** (`docs/`) for detailed procedures, architecture, and troubleshooting

The system uses a relational model where deployments link software to servers via IDs.

## Core Architecture

### Three-Entity Data Model

The inventory system is built around three interconnected entities in YAML:

1. **Servers** (`inventory/servers.yaml`): Physical/cloud infrastructure
   - Unique `id` field (e.g., `internal-web-01`, `cloud-app-01`)
   - Categorized by `type` (internal/cloud) and `environment` (production/staging/development)
   - Contains specs, network config, location metadata

2. **Software** (`inventory/software.yaml`): Catalog of all open-source tools
   - Unique `id` field (e.g., `nginx`, `postgresql`)
   - Categorized by `category` (web-server, database, monitoring, etc.)
   - Tracks current stable versions, licenses, repositories

3. **Deployments** (`inventory/deployments.yaml`): Links software to servers
   - Unique `id` field typically formatted as `{software-id}-{server-id}`
   - **Foreign keys**: `software_id` and `server_id` must reference valid entries
   - Tracks version, installation method, status, configuration paths
   - `documentation_ref` points to detailed markdown docs

### Documentation Structure

```
docs/
├── templates/           # Reusable templates (copy, don't modify)
│   ├── deployment-template.md   # For documenting software deployments
│   └── server-template.md       # For documenting servers
├── deployments/         # One folder per software
│   └── {software-name}/
│       └── {server-id}.md       # Deployment-specific details
├── servers/             # One file per server
│   └── {server-id}.md
└── procedures/          # Standard operating procedures
    └── backup-restore.md
```

Each deployment markdown file should follow the template structure covering:
- Installation steps (exact commands used)
- Configuration files and locations
- Operations (start/stop/logs)
- Maintenance procedures
- Troubleshooting common issues
- Security considerations
- Disaster recovery

## Common Commands

### Generate Inventory Report
```bash
./scripts/generate-report.sh
```
Displays summary of servers, software, deployments by status, and active deployment details.

### Query Inventory

Find what's running on a specific server:
```bash
grep "server_id: {server-id}" inventory/deployments.yaml
```

Find where software is deployed:
```bash
grep "software_id: {software-id}" inventory/deployments.yaml
```

List all active deployments:
```bash
grep -A 1 "status: active" inventory/deployments.yaml | grep "id:"
```

Count servers by type:
```bash
grep "type:" inventory/servers.yaml | sort | uniq -c
```

### Creating New Documentation

For new deployment:
```bash
mkdir -p docs/deployments/{software-name}
cp docs/templates/deployment-template.md docs/deployments/{software-name}/{server-id}.md
```

For new server:
```bash
cp docs/templates/server-template.md docs/servers/{server-id}.md
```

## Workflow for Adding Deployments

The correct sequence when documenting a new deployment:

1. **Add server** to `inventory/servers.yaml` (if new server)
2. **Add software** to `inventory/software.yaml` (if new software)
3. **Add deployment** to `inventory/deployments.yaml` linking the two via IDs
4. **Create deployment documentation** using the template at `docs/deployments/{software}/{server}.md`
5. Optionally create detailed server docs at `docs/servers/{server}.md`

## Key Constraints and Conventions

### ID Naming
- Server IDs: Descriptive format like `{type}-{purpose}-{number}` (e.g., `internal-web-01`, `cloud-db-02`)
- Software IDs: Short, lowercase name (e.g., `nginx`, `postgresql`, `prometheus`)
- Deployment IDs: Typically `{software-id}-{server-id}` (e.g., `nginx-internal-web-01`)

### Status Values
Deployments use these status values:
- `active`: Live and operational
- `planned`: Scheduled for deployment
- `testing`: Currently being tested
- `maintenance`: Under maintenance
- `deprecated`: Scheduled for removal
- `archived`: No longer in use

### Referential Integrity
When modifying inventory YAML:
- `deployments.yaml` references must point to valid `server_id` and `software_id`
- `documentation_ref` field should match actual file path in `docs/deployments/`
- Changing server/software IDs requires updating all dependent deployment entries

### Documentation Standards
- All dates in YYYY-MM-DD format
- Version numbers must be specified for all deployments
- Include exact commands used (not approximate or generic)
- Update changelog sections when modifying existing deployments
- Templates contain comprehensive sections - fill them all in, don't delete unused sections

## Source of Truth Rules

- **Inventory YAML** = source of truth for structured data (versions, IPs, ports, status)
- **Markdown docs** = source of truth for procedures and commands
- When data conflicts, verify actual state and update both

## Example Workflow Reference

See the included NGINX example for the complete pattern:
- `inventory/deployments.yaml` lines 6-24 (deployment entry)
- `docs/deployments/nginx/internal-web-01.md` (full deployment docs)
- `docs/servers/internal-web-01.md` (server-level docs)

This example demonstrates the expected level of detail for production deployments.
