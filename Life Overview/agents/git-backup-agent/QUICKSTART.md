# Git Backup Agent - Quick Start

Get your project backed up in 60 seconds.

## Installation

```bash
# From the agent directory
cd agents/git-backup-agent
npm install
npm run build
npm link
```

## Setup Your First Backup

### Option 1: Non-Interactive (Fastest)

```bash
# Navigate to any project
cd /path/to/your/project

# Setup with defaults (no prompts)
git-backup init --yes
```

This uses intelligent defaults based on your project type!

### Option 2: Interactive Setup

```bash
# Navigate to any project
cd /path/to/your/project

# Run interactive setup
git-backup init
```

Answer the prompts:
- **Project name**: (auto-detected from folder name)
- **Backup directory**: `.backup` (recommended)
- **Use remote**: `No` (for now, can add later)
- **Auto commit**: `Yes`
- **Initialize now**: `Yes`

## Create Your First Backup

```bash
git-backup run
```

That's it! Your project is now backed up.

## Check Backup Status

```bash
git-backup status
```

Output:
```
Backup Status

Project: your-project
Source: /path/to/your/project
Backup: /path/to/your/project/.backup

Backup Information:
Total Commits: 1
Last Backup:
  Date: 2024-01-15 10:30:00
  Commit: abc12345
  Message: [your-project] Automated backup - 2024-01-15T10:30:00
```

## What Just Happened?

1. **Config Created**: `.backup-config.json` in your project root
2. **Backup Repo**: `.backup/` directory with git repository
3. **Files Synced**: All files copied (excluding node_modules, .git, etc.)
4. **Commit Created**: Git commit with timestamp
5. **Ready to Go**: Future backups are one command away

## Next Steps

### Add to Daily Routine

Create a cron job:
```bash
crontab -e
# Add: 0 2 * * * cd /path/to/project && git-backup run
```

### Add Remote Backup

Edit `.backup-config.json`:
```json
{
  "gitRemoteUrl": "git@github.com:yourusername/backup-repo.git",
  "autoPush": true
}
```

Then:
```bash
git-backup init-repo  # Re-initialize to add remote
git-backup run        # Will now push to GitHub
```

### Enable Encryption

Install git-crypt:
```bash
sudo apt install git-crypt  # Ubuntu/Debian
brew install git-crypt      # macOS
```

Edit `.backup-config.json`:
```json
{
  "encryptionEnabled": true
}
```

Re-initialize:
```bash
git-backup init-repo
```

## Common Commands

```bash
git-backup run       # Create backup now
git-backup status    # Check backup info
git-backup config    # View configuration
git-backup init      # Setup new project
```

## Exclude Additional Files

Edit `.backup-config.json` to add patterns:
```json
{
  "excludePatterns": [
    "node_modules",
    "dist",
    ".env",
    "secrets/",
    "*.log",
    "my-custom-folder/"
  ]
}
```

## Restore a File

```bash
cd .backup
git log --oneline                    # Find the commit you want
git show <commit>:path/to/file       # View file content
git show <commit>:path/to/file > ../path/to/file  # Restore it
```

## Multiple Projects

Set up backups for all your projects:
```bash
for project in ~/projects/*; do
  cd "$project"
  git-backup init
done
```

Create a backup-all script:
```bash
cat > ~/backup-all.sh << 'EOF'
#!/bin/bash
for project in ~/projects/*; do
  [ -f "$project/.backup-config.json" ] && cd "$project" && git-backup run
done
EOF
chmod +x ~/backup-all.sh
```

## Troubleshooting

**Can't find git-backup command**:
```bash
npm link  # Re-run from agent directory
```

**Backup has conflicts**:
```bash
cd .backup
git reset --hard HEAD
cd ..
git-backup run
```

**Remote push fails**:
```bash
# Check SSH keys
ssh -T git@github.com

# If needed, add key
cat ~/.ssh/id_ed25519.pub
# Add to GitHub settings
```

## That's It!

You now have automated, version-controlled backups of your project.

For more advanced usage, see:
- [README.md](README.md) - Full documentation
- [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md) - Real-world examples
