# Life Overview

A powerful TypeScript application to index, search, and backup all your Claude projects with AI-powered insights.

## Features

- **🔍 Full-Text Search**: Instantly search across all your projects and files
- **🤖 AI-Powered Q&A**: Ask questions about your projects using Claude
- **📊 Project Statistics**: Track file counts, sizes, and activity across projects
- **💾 Encrypted Git Backup**: Secure, automated backups with encryption
- **📅 Daily Summaries**: AI-generated insights about your daily progress
- **⚡ Real-time Indexing**: Watch mode for automatic re-indexing on file changes

## Quick Start

### 1. Installation

```bash
cd "/home/rick/life/Life Overview"
npm install
```

### 2. Configuration

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```bash
# Required: Your Anthropic API key
ANTHROPIC_API_KEY=your_api_key_here

# Optional: Customize paths (defaults shown)
LIFE_ROOT_PATH=/home/rick/life
DB_PATH=/home/rick/life/Life Overview/data/life-index.db
BACKUP_REPO_PATH=/home/rick/life/Life Overview/backup-repo

# Optional: Git backup remote (e.g., private GitHub repo)
GIT_REMOTE_URL=

# Optional: Encryption key for git-crypt
ENCRYPTION_KEY=
```

To generate a secure encryption key:

```bash
openssl rand -base64 32
```

### 3. Initial Setup

```bash
# Build the project
npm run build

# Index your projects for the first time
npm run start -- index

# Initialize backup system
npm run start -- backup --init
```

### 4. Set Up Daily Automation

```bash
# Install cron job (runs daily at 2 AM)
./scripts/install-cron.sh
```

## Usage

### Indexing

```bash
# Index all projects
npm run start -- index

# Index with watch mode (auto re-index on changes)
npm run start -- index --watch
```

### Search

```bash
# Search across all projects
npm run start -- search "kubernetes deployment"

# Search within a specific project
npm run start -- search "authentication" --project telos
```

### AI-Powered Queries

```bash
# Ask questions about your projects
npm run start -- ask "What are my main goals this year?"

# Focus on a specific project
npm run start -- ask "What features are implemented?" --project uncleduke
```

### Statistics

```bash
# View overall statistics
npm run start -- stats

# View project-specific stats
npm run start -- stats --project telos
```

### Daily Summary

```bash
# Generate AI summary of today's activity
npm run start -- summary
```

### Project Insights

```bash
# Get AI-powered insights about a project
npm run start -- insights telos
```

### Recent Files

```bash
# Show 20 most recently modified files
npm run start -- recent

# Show 50 most recent files
npm run start -- recent -n 50
```

### Backup

```bash
# Create a backup
npm run start -- backup

# View backup information
npm run start -- backup --info

# Initialize backup system
npm run start -- backup --init
```

## Backup Setup

### Option 1: Private GitHub Repository (Recommended)

1. Create a private GitHub repository
2. Add it to your `.env`:

```bash
GIT_REMOTE_URL=git@github.com:yourusername/life-backup.git
```

3. Initialize and push:

```bash
npm run start -- backup --init
npm run start -- backup
```

### Option 2: Private GitLab Repository

Same as GitHub, but use your GitLab URL:

```bash
GIT_REMOTE_URL=git@gitlab.com:yourusername/life-backup.git
```

### Option 3: Self-Hosted Git Server

Set up a git server on your own infrastructure and use that URL.

### Encryption

For sensitive files, the backup system supports git-crypt:

1. Install git-crypt:

```bash
sudo apt install git-crypt
```

2. Set an encryption key in `.env`:

```bash
ENCRYPTION_KEY=$(openssl rand -base64 32)
```

3. Files matching patterns in `.gitattributes` will be encrypted:
   - `*.env`
   - `*.key`
   - `*.pem`
   - `*.db`

## Daily Automation

The cron job runs three tasks every day at 2 AM:

1. **Index**: Re-index all projects to capture new/modified files
2. **Summary**: Generate AI summary of the day's activity
3. **Backup**: Create encrypted backup and push to remote

Logs are stored in `logs/daily-YYYY-MM-DD.log`

View logs:

```bash
tail -f logs/daily-*.log
```

## Project Structure

```
Life Overview/
├── src/
│   ├── cli.ts           # Command-line interface
│   ├── database.ts      # SQLite database with FTS
│   ├── indexer.ts       # File indexing engine
│   ├── ai-query.ts      # AI-powered query engine
│   └── backup.ts        # Git backup manager
├── scripts/
│   ├── daily-job.sh     # Daily automation script
│   └── install-cron.sh  # Cron installation script
├── data/                # SQLite database (auto-created)
├── backup-repo/         # Git backup repository (auto-created)
├── logs/                # Daily job logs (auto-created)
└── .env                 # Configuration (create from .env.example)
```

## What Gets Indexed

The indexer automatically finds all Claude projects (directories with `.claude` folder) and indexes:

- **Text files**: `.md`, `.txt`, `.js`, `.ts`, `.json`, `.yaml`, `.py`, etc.
- **Metadata**: File size, modification time, file type, location
- **Content**: Full text content for text files under 1MB

**Excluded directories**: `node_modules`, `.git`, `dist`, `build`, `venv`, `target`, etc.

## API Key Security

Your Anthropic API key is stored in `.env` which is:

- Not committed to git (in `.gitignore`)
- Not included in backups (excluded in backup system)
- Only readable by your user account

Keep your `.env` file secure and never share it.

## Troubleshooting

### "ANTHROPIC_API_KEY not set"

Make sure you created `.env` file and added your API key:

```bash
cp .env.example .env
nano .env  # Add your API key
```

### No results in search

Run indexing first:

```bash
npm run start -- index
```

### Backup push fails

1. Check your git remote URL is correct
2. Ensure you have SSH keys set up for GitHub/GitLab
3. Test git access manually:

```bash
cd backup-repo
git push origin main
```

### Cron job not running

Check if it's installed:

```bash
crontab -l
```

View cron logs:

```bash
grep CRON /var/log/syslog
```

## Commands Reference

| Command | Description |
|---------|-------------|
| `index` | Index all projects |
| `index --watch` | Index and watch for changes |
| `search <query>` | Full-text search |
| `ask <question>` | AI-powered question |
| `stats` | View statistics |
| `summary` | Daily AI summary |
| `insights <project>` | Project insights |
| `recent` | Recently modified files |
| `backup` | Create backup |
| `backup --init` | Initialize backup |
| `backup --info` | Backup information |

## Security Best Practices

1. **API Key**: Keep your `.env` file secure, never commit it
2. **Encryption**: Use encryption key for sensitive data
3. **Private Repo**: Use private repositories for backups
4. **SSH Keys**: Use SSH keys for git authentication (not passwords)
5. **Permissions**: Ensure only your user can read your life folder

## Future Enhancements

Potential improvements:

- Web UI for browsing and searching
- Export to PDF/HTML reports
- Integration with calendar/task management
- Multi-user support
- Cloud sync options (Dropbox, OneDrive)
- Mobile app

## Support

For issues or questions:

1. Check this README
2. Review log files in `logs/`
3. Check Claude Code documentation
4. Review your `.env` configuration

## License

MIT - Use freely for personal projects
