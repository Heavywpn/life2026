# Life Overview - Complete Setup Guide

This guide will walk you through setting up Life Overview step-by-step, including secure backup configuration.

## Prerequisites

- Node.js v20 or higher
- Git installed
- Anthropic API key (get one at https://console.anthropic.com/)
- GitHub/GitLab account (for backup remote)

## Step 1: Initial Installation

```bash
cd "/home/rick/life/Life Overview"
npm install
```

## Step 2: Get Your Anthropic API Key

1. Visit https://console.anthropic.com/
2. Sign in or create an account
3. Go to "API Keys" section
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)

## Step 3: Configure Environment

Create your `.env` file:

```bash
cp .env.example .env
nano .env
```

Add your API key:

```bash
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

# These are good defaults, change if needed
LIFE_ROOT_PATH=/home/rick/life
DB_PATH=/home/rick/life/Life Overview/data/life-index.db
BACKUP_REPO_PATH=/home/rick/life/Life Overview/backup-repo

# We'll add these in Step 5
GIT_REMOTE_URL=
ENCRYPTION_KEY=
```

Save and exit (Ctrl+X, then Y, then Enter).

## Step 4: Initial Indexing

Build and run your first index:

```bash
npm run build
npm run start -- index
```

You should see output like:

```
🔍 Life Overview - Indexer

Found 6 Claude projects

Indexing project: Life
  ✓ Indexed 1234 files

Indexing project: telos
  ✓ Indexed 89 files

...

✓ Indexing complete!
```

Test it works:

```bash
# View stats
npm run start -- stats

# Search for something
npm run start -- search "goals"

# Ask a question
npm run start -- ask "What projects do I have?"
```

## Step 5: Set Up Secure Backup

### 5a. Create Private GitHub Repository

1. Go to https://github.com/new
2. Name: `life-backup` (or any name you prefer)
3. **Important**: Select "Private"
4. Don't initialize with README
5. Click "Create repository"

### 5b. Set Up SSH Keys (if you haven't already)

Check if you have SSH keys:

```bash
ls -la ~/.ssh/id_*.pub
```

If no keys exist, create them:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for default location
# Enter a passphrase (optional but recommended)
```

Add key to GitHub:

```bash
# Copy your public key
cat ~/.ssh/id_ed25519.pub
```

1. Go to https://github.com/settings/keys
2. Click "New SSH key"
3. Paste your public key
4. Click "Add SSH key"

Test connection:

```bash
ssh -T git@github.com
# Should see: "Hi username! You've successfully authenticated"
```

### 5c. Generate Encryption Key

```bash
openssl rand -base64 32
```

Copy the output (something like `xJ9kL2mP5qR8sT1vW4yZ7aC0dE3fG6hI9jK2lM5nP8q=`).

### 5d. Update .env with Backup Configuration

Edit `.env` again:

```bash
nano .env
```

Add your Git remote URL and encryption key:

```bash
# Replace 'yourusername' with your GitHub username
GIT_REMOTE_URL=git@github.com:yourusername/life-backup.git

# Paste the encryption key you generated
ENCRYPTION_KEY=xJ9kL2mP5qR8sT1vW4yZ7aC0dE3fG6hI9jK2lM5nP8q=
```

### 5e. Install git-crypt (Optional but Recommended)

For additional encryption of sensitive files:

```bash
sudo apt update
sudo apt install git-crypt
```

If not available via apt:

```bash
# Build from source
cd /tmp
git clone https://www.agwa.name/git/git-crypt.git
cd git-crypt
make
sudo make install
```

### 5f. Initialize Backup System

```bash
npm run start -- backup --init
```

You should see:

```
🔧 Initializing backup system...

Initializing git repository...
✓ Added git remote
✓ Encryption configured
✓ Backup system initialized
```

### 5g. Perform First Backup

```bash
npm run start -- backup
```

Output should be:

```
📦 Starting backup at [timestamp]...

Syncing files...
✓ Files synced
✓ Created backup commit
Pushing to remote...
✓ Created main branch and pushed to remote

✓ Backup completed successfully
```

Verify on GitHub:

1. Go to your repository: `https://github.com/yourusername/life-backup`
2. You should see your files (encrypted if configured)

### 5h. Check Backup Info

```bash
npm run start -- backup --info
```

Should show:

```
Backup Information:

Total Commits: 1

Last Backup:
  Date: [timestamp]
  Commit: [hash]
  Message: Automated backup - [timestamp]

Uncommitted Changes: No
Remote Configured: Yes
```

## Step 6: Set Up Daily Automation

Install the cron job:

```bash
./scripts/install-cron.sh
```

Output:

```
Installing Life Overview daily cron job...
Schedule: 0 2 * * * (daily at 2 AM)
✓ Cron job installed successfully!

Current cron jobs:
0 2 * * * /home/rick/life/Life Overview/scripts/daily-job.sh
```

The system will now automatically:

- Index your projects daily at 2 AM
- Generate a daily summary
- Create and push a backup

## Step 7: Test Everything

Try all the features:

```bash
# Search
npm run start -- search "health"

# Ask questions
npm run start -- ask "What are my top priorities?"

# Statistics
npm run start -- stats
npm run start -- stats --project telos

# Daily summary
npm run start -- summary

# Project insights
npm run start -- insights telos

# Recent files
npm run start -- recent -n 10
```

## Step 8: Verify Daily Job (Optional)

Test the daily job manually:

```bash
./scripts/daily-job.sh
```

Check the log:

```bash
cat "logs/daily-$(date +%Y-%m-%d).log"
```

## Backup Security Checklist

- [ ] API key in `.env` (never commit this file)
- [ ] `.env` is in `.gitignore`
- [ ] GitHub repository is **Private**
- [ ] SSH keys set up (not using passwords)
- [ ] Encryption key generated and in `.env`
- [ ] git-crypt installed (optional)
- [ ] First backup completed successfully
- [ ] Verified backup on GitHub
- [ ] Cron job installed
- [ ] Daily job tested manually

## Understanding Your Data Security

### What's Encrypted

1. **In transit**: Git uses SSH, all data encrypted during push/pull
2. **At rest on GitHub**: Repository is private, only you have access
3. **Sensitive files**: If using git-crypt, matching patterns are encrypted
4. **API key**: Never leaves your machine, not in backups

### What's Not Backed Up

- `node_modules/` (dependencies, can be reinstalled)
- `.env` (contains secrets, must keep separately)
- `data/` (SQLite database, can be regenerated)
- `backup-repo/` (the backup itself)
- Log files

### Backup Strategy

You now have:

1. **Original files**: `/home/rick/life/`
2. **Local backup**: `/home/rick/life/Life Overview/backup-repo/`
3. **Remote backup**: Your private GitHub repository
4. **Version history**: Full git history of all changes

## Disaster Recovery

If you lose your machine:

1. Clone your backup repo:

```bash
git clone git@github.com:yourusername/life-backup.git ~/life
```

2. Reinstall Life Overview:

```bash
cd ~/life/Life\ Overview
npm install
```

3. Recreate `.env` (you'll need to remember or store separately):

```bash
cp .env.example .env
nano .env  # Add your keys
```

4. Re-index:

```bash
npm run start -- index
```

## Maintenance

### View Logs

```bash
# Latest log
tail -f "logs/daily-$(date +%Y-%m-%d).log"

# All recent logs
ls -lh logs/

# View specific log
cat logs/daily-2024-11-07.log
```

### Update Remote URL

If you change repositories:

```bash
cd backup-repo
git remote set-url origin git@github.com:newuser/newrepo.git
```

### Re-index After Major Changes

```bash
npm run start -- index
```

### Check Backup Status

```bash
npm run start -- backup --info
```

## Troubleshooting

### "Permission denied (publickey)"

Your SSH key isn't set up. Go back to Step 5b.

### "remote: Repository not found"

Check your repository name and that it's created on GitHub.

### Backup push fails with conflicts

```bash
cd backup-repo
git pull origin main --rebase
cd ..
npm run start -- backup
```

### Cron job not running

Check system logs:

```bash
grep CRON /var/log/syslog | tail -20
```

### Want to change backup schedule

Edit cron:

```bash
crontab -e
```

Change `0 2 * * *` to your preferred time (format: minute hour day month weekday).

## Next Steps

- Explore AI features: `npm run start -- ask "What should I focus on?"`
- Check your stats regularly: `npm run start -- stats`
- Review daily summaries
- Consider setting up additional backup destinations
- Create a secure backup of your `.env` file (encrypted USB drive, password manager, etc.)

## Getting Help

If something doesn't work:

1. Check the error message
2. Review logs in `logs/`
3. Check your `.env` configuration
4. Verify GitHub repository is accessible
5. Test git commands manually in `backup-repo/`

## Important Notes

- **Keep your `.env` file safe** - it contains your API key
- **Keep your encryption key safe** - without it, you can't decrypt backups
- **Monitor your API usage** - Check https://console.anthropic.com/
- **Verify backups periodically** - Check GitHub to ensure pushes are working

Your life projects are now indexed, searchable, backed up, and protected! 🎉
