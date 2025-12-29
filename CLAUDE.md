# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an Obsidian vault serving as a personal and professional knowledge base for Venturer Technology. It combines markdown documentation, project planning, and TypeScript development projects.

## Key Commands

### Life Overview CLI (main development tool)

```bash
cd "Life Overview"
npm run build              # Build TypeScript
npm run start -- index     # Index all projects
npm run start -- search "query"  # Full-text search
npm run start -- ask "question"  # AI-powered Q&A (requires ANTHROPIC_API_KEY)
npm run start -- backup    # Create encrypted git backup
```

## Project Structure

| Directory | Purpose |
|-----------|---------|
| `Life Overview/` | TypeScript CLI for indexing/search/backup - has its own detailed `CLAUDE.md` |
| `dev/` | Development projects (deployment-tracker, whoop-data-fetcher) |
| `10YearBusinessPlan/` | EOS strategic planning documents |
| `telos/` | Personal life management system |
| `GreatOceanRD/` | Travel planning with itineraries |
| `venturer-msp-toolkit/` | MSP business tools |

## Conventions

### File Naming
- **kebab-case** for multi-word files: `project-overview.md`
- **UPPERCASE** for project docs: `README.md`, `CLAUDE.md`
- Avoid spaces in new filenames

### Document Structure
- Single `#` title per file
- `##` for main sections, `###` for subsections
- Use Obsidian wiki-links: `[[Document Name]]` or `[[Document#Section]]`

### New Projects
1. Create folder with descriptive name
2. Add `README.md` with overview
3. Add `CLAUDE.md` for AI context
4. Organize into `src/`, `docs/`, `data/` subdirectories as needed

## Environment Setup

For projects requiring API access:
```bash
# In project directory, create .env file
ANTHROPIC_API_KEY=sk-ant-...
LIFE_ROOT_PATH=/path/to/life
```

`.env` files are gitignored and excluded from backups.

## Sub-Project Documentation

Major projects have their own `CLAUDE.md` files with detailed architecture:
- `Life Overview/CLAUDE.md` - Full CLI architecture, data flows, modification patterns
