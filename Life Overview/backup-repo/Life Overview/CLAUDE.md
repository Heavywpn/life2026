# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Life Overview is a TypeScript CLI application that indexes, searches, and backs up Claude projects located in `/home/rick/life/`. It provides AI-powered querying, full-text search, and automated encrypted git backups.

**Target data**: 6 Claude projects (~2.6GB) in `/home/rick/life/` with `.claude` directories.

## Build & Development Commands

```bash
# Build TypeScript
npm run build

# Run CLI (development)
npm run start -- <command>

# Examples:
npm run start -- index
npm run start -- search "query"
npm run start -- ask "question"
npm run start -- stats

# Watch mode for TypeScript
npm run dev
```

## Core Architecture

### Four-Layer System

The application consists of four independent layers that interact through well-defined interfaces:

1. **Database Layer** (`database.ts`)
   - SQLite with better-sqlite3 in WAL mode
   - Three tables: `files`, `files_fts` (FTS5 virtual table), `query_history`
   - FTS sync maintained via SQLite triggers (insert/update/delete)
   - Exports `LifeDatabase` class with query methods
   - Database path configurable via `DB_PATH` env var

2. **Indexer Layer** (`indexer.ts`)
   - Accepts `LifeDatabase` instance via constructor
   - Discovers Claude projects by finding `.claude` directories
   - Reads file content for text extensions (<1MB limit)
   - Calculates SHA-256 hashes for change detection
   - Upserts into database using `file_path` as unique key
   - Optional watch mode using chokidar for real-time re-indexing

3. **AI Query Layer** (`ai-query.ts`)
   - Accepts `LifeDatabase` instance and Anthropic API key via constructor
   - Query flow: Extract search terms → FTS search → Build context → Claude API call
   - Three main operations:
     - `askQuestion()`: RAG-based Q&A using FTS search + Claude
     - `generateDailySummary()`: Time-filtered analysis of modified files
     - `getProjectInsights()`: Project-specific analysis with file sampling
   - Context building limits content to 2000 chars per file (top 10 files)
   - Uses claude-3-5-sonnet-20241022 model

4. **Backup Layer** (`backup.ts`)
   - Git repository manager with rsync or manual sync
   - Optional git-crypt encryption for sensitive files (`.gitattributes` patterns)
   - Auto-commit with timestamps
   - Optional remote push to GitHub/GitLab
   - Fallback to manual copy if rsync unavailable

### CLI Layer (`cli.ts`)

Commander.js-based CLI that orchestrates all layers:
- Instantiates database, passes to indexer/AI engine
- Loads config from `.env` via dotenv
- Each command creates fresh layer instances (stateless)
- Uses chalk for colored output

### Data Flow Patterns

**Indexing Flow**:
```
CLI → Indexer.indexAllProjects()
  → glob('**/.claude') finds projects
  → for each project: Indexer.indexProject()
    → glob('**/*') finds files (excludes EXCLUDE_DIRS)
    → for each file: read metadata + content (if text)
    → Database.insertOrUpdateFile() (upsert by file_path)
      → SQLite triggers update files_fts table
```

**AI Query Flow**:
```
CLI → AIQueryEngine.askQuestion()
  → extractSearchTerms() (removes stop words, joins with OR)
  → Database.searchFullText() (FTS5 query)
  → buildContext() (top 10 files, 2000 chars each)
  → Anthropic API call with context + question
  → return answer + sources
```

**Backup Flow**:
```
CLI/Cron → BackupManager.performBackup()
  → syncFiles() (rsync or manual copy, excludes EXCLUDE_DIRS)
  → git status --porcelain (check for changes)
  → if changes: git add -A + commit + push
```

## Environment Configuration

Required in `.env`:
```bash
ANTHROPIC_API_KEY=sk-ant-...          # Required for AI features
LIFE_ROOT_PATH=/home/rick/life        # Root path to scan
DB_PATH=.../data/life-index.db        # SQLite database location
BACKUP_REPO_PATH=.../backup-repo     # Git backup repository
GIT_REMOTE_URL=git@...                # Optional: remote backup
ENCRYPTION_KEY=<base64>               # Optional: git-crypt key
```

The `.env` file is excluded from git and backups for security.

## Key Design Decisions

### Database Schema

**files table**: Main storage with indexes on `project_name`, `file_type`, `last_modified`
- `file_path` is UNIQUE constraint for upsert behavior
- `hash` (SHA-256) enables change detection
- `content` stores full text for searchable files

**files_fts**: FTS5 virtual table linked to `files` via triggers
- Indexes: `project_name`, `relative_path`, `content`
- Auto-synced via `files_ai`, `files_ad`, `files_au` triggers
- Ranked search with `ORDER BY rank`

**Why triggers instead of manual sync?** Ensures FTS always matches files table, even if code fails mid-operation.

### Indexing Strategy

**Two-phase approach**:
1. Find all `.claude` dirs (identifies Claude projects)
2. For each project, glob all files (excludes common build/dependency dirs)

**Content reading logic**:
- Only read content if extension in `TEXT_EXTENSIONS` set
- Size limit: 1MB for content reading, 10MB for indexing
- Prevents memory issues with large binary files or videos

**Why upsert instead of delete+insert?** Preserves FTS rowid stability, allows incremental updates without full re-index.

### AI Context Management

**Token budget strategy**:
- Limit to top 10 search results
- Truncate each file to 2000 chars
- Total context typically <20k tokens
- Leaves room for response (2048 token limit)

**Search term extraction**:
- Remove stop words (what, where, is, are, etc.)
- Join remaining terms with OR operator
- Broader search than AND (more recall, less precision)

**Why FTS before Claude?** Reduces API costs and latency by pre-filtering relevant content.

### Backup Architecture

**Why rsync + git?**
- rsync: Efficient sync (only changed files)
- git: Version history and remote push
- Combined: Fast local sync + cloud backup

**Encryption approach**:
- git-crypt for file-level encryption (transparent to git)
- Patterns in `.gitattributes`: `*.env`, `*.key`, `*.pem`, `*.db`
- Optional: Not all users need encryption

**Exclusions**: Same dirs as indexing (`EXCLUDE_DIRS`) to avoid backing up dependencies/build artifacts.

## Common Modification Patterns

### Adding a New Command

1. Add command in `cli.ts` using `program.command()`
2. Create handler function (async)
3. Instantiate required layers (Database, Indexer, AIQueryEngine, BackupManager)
4. Call layer methods and format output with chalk
5. Always close database with `db.close()`

### Adding New File Types to Index

Modify `TEXT_EXTENSIONS` set in `indexer.ts`:
```typescript
private readonly TEXT_EXTENSIONS = new Set([
  '.md', '.txt', // existing
  '.new-extension' // add here
]);
```

### Changing Search Behavior

Modify `searchFullText()` in `database.ts`:
- Change `LIMIT 50` to adjust result count
- Modify `ORDER BY rank` for different ranking
- Add additional WHERE clauses for filtering

### Extending AI Context

Modify `buildContext()` in `ai-query.ts`:
- Change slice(0, 10) to include more/fewer files
- Adjust substring(0, 2000) for longer/shorter snippets
- Add additional context sections (e.g., file metadata)

## Testing

No formal test suite currently. Manual testing approach:

```bash
# Test indexing
npm run start -- index
# Verify: Check data/life-index.db was created and populated

# Test search
npm run start -- search "test query"
# Verify: Results match expected files

# Test AI (requires API key)
npm run start -- ask "What projects exist?"
# Verify: Coherent answer with file references

# Test backup
npm run start -- backup --init
npm run start -- backup
# Verify: backup-repo/ created with git history
```

## Daily Automation

`scripts/daily-job.sh` runs three operations sequentially:
1. `npm run start -- index` (refresh database)
2. `npm run start -- summary` (generate AI summary)
3. `npm run start -- backup` (create git backup)

Installed via `scripts/install-cron.sh` (creates crontab entry for 2 AM).

Logs written to `logs/daily-YYYY-MM-DD.log`.

## Security Considerations

- `.env` file: Contains API key, never committed (in `.gitignore`)
- Backup excludes `.env` via rsync/manual copy logic
- Database contains file content: Not encrypted at rest
- git-crypt: Optional encryption for sensitive patterns
- SSH keys recommended for git remote (not HTTPS passwords)

## Performance Characteristics

- **Indexing**: ~100 files/second (with content reading)
- **FTS search**: <50ms for typical queries
- **AI queries**: 2-5 seconds (network + Claude processing)
- **Backup sync**: ~30 seconds after initial (rsync delta)

Database size: ~50-100MB for 2.6GB source (text extraction + metadata).

## Troubleshooting

**"ANTHROPIC_API_KEY not set"**: Copy `.env.example` to `.env` and add key

**Empty search results**: Run `npm run start -- index` first

**Backup push fails**: Check SSH keys, verify `GIT_REMOTE_URL` in `.env`

**Large database**: Adjust `maxFileSize` in indexer options or exclude more file types

**API rate limits**: Reduce query frequency or implement caching layer
