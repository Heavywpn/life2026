# Life 2026

A comprehensive personal and professional knowledge base built with [Obsidian](https://obsidian.md/), encompassing business planning, project management, travel documentation, and personal development systems.

## Overview

This repository serves as a central hub for:

- **Business Strategy & Planning** - 10-year business plan using EOS (Entrepreneurial Operating System)
- **Development Projects** - Tools, dashboards, and automation systems
- **Travel Planning** - Detailed itineraries and trip documentation
- **Personal Systems** - Life management and goal tracking
- **Professional Resources** - HR, contracts, and business documentation

## Directory Structure

```
Life/
├── 10YearBusinessPlan/     # EOS strategic planning for Venturer Technology MSP
├── dev/                    # Development projects and tools
│   ├── deployment-tracker/ # Deployment tracking system
│   └── whoop-data-fetcher/ # Health data integration
├── fallout4/               # Gaming resources
├── GreatOceanRD/           # Great Ocean Road trip planning
├── HR/                     # Human resources documentation
├── Life/                   # Personal life notes and imports
├── Life Overview/          # TypeScript CLI for project indexing and backup
├── msp_agreement/          # MSP service agreements
├── MSP Contracts and Products/ # Business contracts and products
├── presentations/          # Business presentations
├── Renovate Our Boat/      # Boat renovation project
├── survive/                # Survival skills and resources
├── telos/                  # Personal life management system
├── Travel/                 # Travel planning and documentation
├── trumethods/             # TruMethods MSP framework resources
├── uncleduke/              # Web development project
├── VentKPIDashBoard/       # Business KPI dashboard
└── venturer-msp-toolkit/   # MSP tools and utilities
```

## Key Projects

### 10-Year Business Plan

Strategic planning for Venturer Technology using the EOS (Entrepreneurial Operating System) framework:

- **Discovery Session** - 93% complete with 53 of 57 questions answered
- **V/TO Document** - Complete Vision/Traction Organizer
- **Quarterly Rocks** - Team and individual priority tracking
- **L10 Meetings** - Weekly Level 10 meeting documentation

**Core Goals:**
- Transform from 30% to 80% recurring revenue
- Increase pricing from $45/seat to $150/seat
- Improve profit margins from 15% to 25-50%

### Life Overview

A TypeScript CLI application for managing and backing up projects:

- Full-text search across all projects
- AI-powered Q&A using Claude
- Automated encrypted Git backups
- Daily summaries and project insights

See [Life Overview/README.md](Life%20Overview/README.md) for detailed documentation.

### Great Ocean Road Planning

Comprehensive travel documentation including:

- Detailed itineraries
- Camping bookings guide
- Emergency quick cards
- Packing lists

### Telos Life System

Personal life management with structured folders:

- Foundation principles
- Strategic planning
- Tactical execution
- Tracking and journals
- Domain-specific goals

## Getting Started

### Opening in Obsidian

1. Download and install [Obsidian](https://obsidian.md/)
2. Open Obsidian and select "Open folder as vault"
3. Navigate to this repository's root directory
4. The vault will open with all markdown files linked

### Using the Life Overview CLI

```bash
cd "Life Overview"
npm install
npm run build

# Index all projects
npm run start -- index

# Search across projects
npm run start -- search "your query"

# Ask AI-powered questions
npm run start -- ask "What are my main goals?"
```

## Syncing & Backup

This repository is synchronized to GitHub for version control and backup:

```bash
# Pull latest changes
git pull origin main

# Push new changes
git add -A
git commit -m "Your commit message"
git push origin main
```

## Requirements

- **Obsidian** (recommended for viewing/editing)
- **Node.js 18+** (for Life Overview CLI)
- **Git** (for version control)

## File Types

- **`.md`** - Markdown documents (primary content)
- **`.pdf`** - Reference documents and guides
- **`.canvas`** - Obsidian canvas files for visual mapping
- **`.ts/.js`** - TypeScript/JavaScript source code

## Configuration

### Obsidian Settings

The `.obsidian/` folder contains vault-specific settings:

- `app.json` - Application preferences
- `appearance.json` - Theme and styling
- `core-plugins.json` - Enabled core plugins
- `workspace.json` - Window layout

### Environment Variables

For projects requiring configuration, create a `.env` file:

```bash
# Example for Life Overview
ANTHROPIC_API_KEY=your_api_key_here
LIFE_ROOT_PATH=/path/to/life
```

## Contributing

This is a personal knowledge base. However, the structure and tools may be useful as templates for similar systems.

## License

Private repository. All rights reserved.

---

*Last updated: December 28, 2025 - Prepared for 2026*
