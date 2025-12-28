# Quick Start - Life Overview

Get up and running in 5 minutes!

## 1. Add Your API Key

```bash
nano .env
```

Add your Anthropic API key (get one at https://console.anthropic.com/):

```bash
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Save and exit (Ctrl+X, Y, Enter).

## 2. Index Your Projects

```bash
npm run start -- index
```

This will scan all 6 Claude projects in `/home/rick/life/` and index them.

## 3. Try It Out

```bash
# Search for something
npm run start -- search "goals"

# Ask a question
npm run start -- ask "What projects do I have?"

# View statistics
npm run start -- stats

# See recent files
npm run start -- recent
```

## 4. Set Up Backup (Optional)

1. Create a private GitHub repository
2. Add to `.env`:

```bash
GIT_REMOTE_URL=git@github.com:yourusername/life-backup.git
ENCRYPTION_KEY=$(openssl rand -base64 32)
```

3. Initialize:

```bash
npm run start -- backup --init
npm run start -- backup
```

## 5. Automate Daily (Optional)

```bash
./scripts/install-cron.sh
```

Done! Your projects will be indexed, summarized, and backed up daily at 2 AM.

## Next Steps

- Read [README.md](README.md) for full documentation
- Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup instructions
- Explore AI features: `npm run start -- summary`

## All Commands

- `index` - Index all projects
- `search <query>` - Search files
- `ask <question>` - AI-powered Q&A
- `stats` - Project statistics
- `summary` - Daily AI summary
- `insights <project>` - Project insights
- `recent` - Recently modified files
- `backup` - Create backup

For help: `npm run start -- --help`
