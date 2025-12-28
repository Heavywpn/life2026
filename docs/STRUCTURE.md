# Repository Structure

This document provides detailed information about each directory in the Life 2026 repository.

## Business & Strategy

### 10YearBusinessPlan/

Strategic business planning using the EOS (Entrepreneurial Operating System) framework for Venturer Technology MSP.

```
10YearBusinessPlan/
├── CLAUDE.md                    # AI assistant instructions
├── README.md                    # Project overview and status
├── discovery-session.md         # Main discovery document (93% complete)
├── VTO-venturer-technology.md   # Vision/Traction Organizer
├── strategic-overview-1-page.md # One-page strategic summary
├── team-session-agenda.md       # Team planning session guide
├── summary-for-kristyna.md      # Team member summary
├── meetings/
│   ├── l10-meeting-notes.md     # Level 10 meeting logs
│   └── l10-prep-template.md     # Meeting preparation template
├── rocks/
│   ├── README.md                # Rock system guide
│   ├── company-rocks.md         # Company-wide priorities
│   ├── rick-rocks.md            # Individual rocks
│   ├── kristyn-rocks.md
│   └── dean-rocks.md
├── trumethodsFoundation/        # TruMethods PDFs and analysis
└── trumethodscomplete/          # TruMethods implementation guides
```

**Key Features:**
- Complete V/TO document with 10-year target
- Quarterly rock tracking system
- L10 meeting framework
- TruMethods MSP methodology integration

### MSP Contracts and Products/

Business contracts, service agreements, and product documentation for managed services.

### msp_agreement/

MSP service agreement templates and documentation.

### venturer-msp-toolkit/

Tools and utilities for MSP operations.

### VentKPIDashBoard/

Business KPI dashboard for tracking key performance indicators.

## Development Projects

### dev/

Development tools and automation projects.

```
dev/
├── deployment-tracker/    # Deployment tracking system
└── whoop-data-fetcher/    # Health data integration tool
```

### Life Overview/

TypeScript CLI application for project management and backup.

```
Life Overview/
├── src/
│   ├── cli.ts           # Command-line interface
│   ├── database.ts      # SQLite with full-text search
│   ├── indexer.ts       # File indexing engine
│   ├── ai-query.ts      # AI-powered queries
│   └── backup.ts        # Git backup manager
├── scripts/
│   ├── daily-job.sh     # Daily automation
│   └── install-cron.sh  # Cron installation
├── agents/              # Automation agents
├── data/                # SQLite database
├── backup-repo/         # Git backup repository
└── node_modules/        # Dependencies
```

**Features:**
- Full-text search across projects
- AI-powered Q&A
- Automated encrypted backups
- Daily summaries

### uncleduke/

Web development project with Docker deployment.

```
uncleduke/
├── src/      # Source code
├── nginx/    # Nginx configuration
└── docker/   # Docker configuration
```

## Travel & Personal

### GreatOceanRD/

Comprehensive Great Ocean Road trip planning.

```
GreatOceanRD/
├── MAIN_ITINERARY.md           # Primary travel plan
├── BOOKING_TRACKER.md          # Accommodation bookings
├── CAMPING_BOOKINGS_GUIDE.md   # Campsite information
├── EMERGENCY_QUICK_CARD.md     # Emergency contacts
├── HILUX_PACKING_LIST.md       # Vehicle packing list
├── QUICK_REFERENCE_GUIDE.md    # Quick reference
└── travel_agent_env/           # AI travel agent (Python)
```

### Travel/

General travel planning and documentation.

### telos/

Personal life management system.

```
telos/
├── 01-foundation/   # Core principles and values
├── 02-strategic/    # Long-term planning
├── 03-tactical/     # Short-term actions
├── 04-tracking/     # Progress tracking
├── 05-journal/      # Personal journaling
├── 06-domains/      # Life domain goals
├── 07-archive/      # Completed items
└── scripts/         # Automation scripts
```

### survive/

Survival skills and preparedness resources.

```
survive/
├── books/        # Reference books
├── skills/       # Skill guides
├── scripts/      # Automation
├── analysis/     # Research analysis
├── creators/     # Content creators
├── podcasts/     # Podcast notes
├── resources/    # General resources
└── experiments/  # Experiments and tests
```

### Life/

Personal notes and imports.

```
Life/
├── Notion/              # Notion imports
├── Notion Import Images/ # Imported images
├── Great Ocean RD 25 26/ # Additional travel notes
└── Untitled/            # Miscellaneous
```

### Renovate Our Boat/

Boat renovation project documentation.

```
Renovate Our Boat/
└── Bayliner 195 Renovation Project/
```

## Professional Resources

### HR/

Human resources documentation.

```
HR/
├── 2025 Fair-Work-Information-Statement.pdf
├── HR Outsourcing - SMEs - July 2025.pdf
└── hr-tracker/
```

### presentations/

Business presentations and slides.

### trumethods/

TruMethods MSP framework resources.

```
trumethods/
└── 10yearBusinessPlan/   # Related business planning
```

## Other

### fallout4/

Gaming resources and notes for Fallout 4.

## Configuration Files

### .obsidian/

Obsidian vault configuration.

```
.obsidian/
├── app.json           # Application settings
├── appearance.json    # Theme and styling
├── core-plugins.json  # Enabled plugins
├── graph.json         # Graph view settings
└── workspace.json     # Window layout
```

### Root Files

```
Life/
├── README.md              # Repository overview
├── CONTRIBUTING.md        # Contribution guidelines
├── Sunday Lunch and Wine.md  # Personal note
└── Untitled.canvas        # Obsidian canvas
```

## Size Estimates

| Directory | Approximate Size | Primary Content |
|-----------|-----------------|-----------------|
| GreatOceanRD | ~500MB | Python venv, travel docs |
| Life Overview | ~200MB | Node modules, TypeScript |
| 10YearBusinessPlan | ~50MB | PDFs, markdown |
| survive | ~20MB | Documents, resources |
| telos | ~10MB | Markdown documents |
| Other | ~20MB | Various documents |

**Total Repository:** ~800MB (varies with dependencies)

## Maintenance

### Regular Tasks

1. **Weekly**: Update rocks and L10 meeting notes
2. **Monthly**: Review and archive completed items
3. **Quarterly**: Update strategic documents

### Cleanup Recommendations

Consider excluding from git to reduce repository size:
- `node_modules/` directories
- `*_env/` Python virtual environments
- `dist/` and `build/` directories
- Large binary files

Add to `.gitignore`:
```
node_modules/
*_env/
dist/
build/
*.log
.env
```
