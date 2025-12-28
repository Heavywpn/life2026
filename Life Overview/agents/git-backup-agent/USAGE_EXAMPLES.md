# Git Backup Agent - Usage Examples

## Quick Reference

```bash
# One-time setup (per project)
git-backup init          # Interactive setup

# Daily usage
git-backup run           # Create a backup
git-backup status        # Check backup status
git-backup config        # View configuration
```

## Example 1: Simple Local Backup

Backup a Node.js project to a local directory without remote push.

```bash
cd ~/projects/my-app

# Initialize (interactive)
git-backup init
# → Project name: my-app
# → Backup directory: .backup
# → Use remote: No
# → Auto commit: Yes
# → Auto push: No

# Create first backup
git-backup run

# Check status
git-backup status
```

## Example 2: Backup with GitHub Remote

Backup with automatic push to a private GitHub repository.

```bash
cd ~/projects/sensitive-data

# Create private GitHub repo first
gh repo create my-backup-repo --private

# Initialize backup
git-backup init
# → Project name: sensitive-data
# → Backup directory: .backup
# → Use remote: Yes
# → Git remote URL: git@github.com:yourusername/my-backup-repo.git
# → Auto commit: Yes
# → Auto push: Yes

# Run backup (will push to GitHub)
git-backup run
```

## Example 3: Encrypted Backup

Backup with git-crypt encryption for sensitive files.

```bash
cd ~/projects/api-keys-project

# Install git-crypt first
sudo apt install git-crypt  # Ubuntu/Debian
# or
brew install git-crypt      # macOS

# Initialize with encryption
git-backup init
# → Enable encryption: Yes
# → (complete other prompts)

# Initialize the backup repo
git-backup init-repo

# Create encrypted backup
git-backup run

# Files matching *.env, *.key, *.pem are now encrypted in backup
```

## Example 4: Python Project with Virtual Environment

Automatically excludes virtual environment and Python cache files.

```bash
cd ~/projects/python-ml-project

# The agent detects Python project automatically
git-backup init
# → Detected project type: Python
# → Default excludes: __pycache__, venv, .venv, *.pyc
# → (complete other prompts)

git-backup run

# Verify excluded files
git-backup config
# → Shows: __pycache__, venv, .venv, *.pyc in exclude patterns
```

## Example 5: Multi-Project Backup Script

Set up automated backups for multiple projects.

```bash
# Set up each project once
cd ~/projects/project1
git-backup init

cd ~/projects/project2
git-backup init

cd ~/projects/project3
git-backup init

# Create a backup-all script
cat > ~/bin/backup-all.sh << 'EOF'
#!/bin/bash

PROJECTS=(
  "$HOME/projects/project1"
  "$HOME/projects/project2"
  "$HOME/projects/project3"
)

for project in "${PROJECTS[@]}"; do
  if [ -f "$project/.backup-config.json" ]; then
    echo "=== Backing up $project ==="
    cd "$project"
    git-backup run
    echo ""
  fi
done

echo "All backups complete!"
EOF

chmod +x ~/bin/backup-all.sh

# Run all backups
~/bin/backup-all.sh
```

## Example 6: Automated Daily Backups with Cron

Set up automatic daily backups at 2 AM.

```bash
cd ~/projects/my-app
git-backup init

# Edit crontab
crontab -e

# Add this line:
0 2 * * * cd /home/user/projects/my-app && /usr/local/bin/git-backup run >> /var/log/my-app-backup.log 2>&1

# Verify cron job
crontab -l
```

## Example 7: Backup on Every Git Commit

Automatically backup after each commit to your main project.

```bash
cd ~/projects/my-app
git-backup init

# Create post-commit hook
cat > .git/hooks/post-commit << 'EOF'
#!/bin/bash
echo "Creating backup..."
git-backup run --dir "$(git rev-parse --show-toplevel)"
EOF

chmod +x .git/hooks/post-commit

# Now every commit triggers a backup
git add .
git commit -m "Test commit"
# → Backup runs automatically
```

## Example 8: Backup from CI/CD Pipeline

Integrate backups into your CI/CD workflow.

**.github/workflows/backup.yml**:
```yaml
name: Daily Backup

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily
  workflow_dispatch:      # Manual trigger

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install git-backup agent
        run: |
          npm install -g @rick/git-backup-agent

      - name: Configure git
        run: |
          git config --global user.name "Backup Bot"
          git config --global user.email "backup@bot.com"

      - name: Run backup
        env:
          SSH_KEY: ${{ secrets.BACKUP_SSH_KEY }}
        run: |
          mkdir -p ~/.ssh
          echo "$SSH_KEY" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          git-backup init  # Use pre-configured .backup-config.json
          git-backup run
```

## Example 9: Selective File Backup

Backup only specific file types or directories.

```bash
cd ~/projects/documentation

git-backup init
# → (complete prompts)

# Edit config to exclude everything except docs
cat > .backup-config.json << 'EOF'
{
  "sourceDir": "/home/user/projects/documentation",
  "projectName": "docs-only",
  "backupRepoPath": ".backup",
  "autoCommit": true,
  "excludePatterns": [
    "*",
    "!docs/**",
    "!*.md",
    "!README*"
  ]
}
EOF

git-backup run
# Only docs/ directory and markdown files are backed up
```

## Example 10: Restore from Backup

How to restore files from your backup.

```bash
# Option 1: View backup history
cd ~/projects/my-app/.backup
git log --oneline
git show <commit-hash>

# Option 2: Restore specific file
cd ~/projects/my-app/.backup
git checkout <commit-hash> -- path/to/file
cp path/to/file ../path/to/file  # Copy back to source

# Option 3: Full restore to specific date
cd ~/projects/my-app
mv ~/projects/my-app ~/projects/my-app.old  # Backup current state
cp -r ~/projects/my-app.old/.backup ~/projects/my-app-restore
cd ~/projects/my-app-restore
git checkout $(git rev-list -n 1 --before="2024-01-15" main)
# Files are now at state from Jan 15, 2024

# Option 4: Compare current vs backup
cd ~/projects/my-app
diff -r . .backup/
```

## Example 11: Backup with Size Limits

Handle large files or limit backup size.

```bash
cd ~/projects/large-media-project

git-backup init

# Exclude large files
# Edit .backup-config.json to add:
cat > .backup-config.json << 'EOF'
{
  "excludePatterns": [
    "*.mp4",
    "*.mov",
    "*.avi",
    "*.zip",
    "*.tar.gz",
    "videos/",
    "archives/"
  ]
}
EOF

# Or use .gitattributes for Git LFS if needed
git-backup run
```

## Example 12: Monitor Backup Health

Create a monitoring script to check backup status.

```bash
cat > ~/bin/check-backups.sh << 'EOF'
#!/bin/bash

PROJECTS=(
  "$HOME/projects/project1"
  "$HOME/projects/project2"
)

for project in "${PROJECTS[@]}"; do
  cd "$project"

  if [ ! -f ".backup-config.json" ]; then
    echo "⚠️  $project: No backup configured"
    continue
  fi

  # Get last backup info
  status=$(git-backup status 2>&1)

  if echo "$status" | grep -q "No backups created yet"; then
    echo "❌ $project: No backups exist"
  elif echo "$status" | grep -q "Uncommitted Changes: Yes"; then
    echo "⚠️  $project: Uncommitted changes detected"
  else
    last_backup=$(echo "$status" | grep "Date:" | sed 's/.*Date: //')
    echo "✅ $project: Last backup $last_backup"
  fi
done
EOF

chmod +x ~/bin/check-backups.sh
~/bin/check-backups.sh
```

## Troubleshooting Examples

### Problem: Backup repo has conflicts

```bash
cd ~/projects/my-app/.backup
git status
# → Shows conflicts

# Reset to clean state
git reset --hard HEAD
git clean -fd

# Re-run backup
cd ..
git-backup run
```

### Problem: Large uncommitted changes

```bash
# Check what's uncommitted
cd ~/projects/my-app
git-backup status
# → Shows uncommitted changes

# See what files are pending
cd .backup
git status

# Force commit
git add -A
git commit -m "Manual commit of pending changes"
```

### Problem: Remote push fails

```bash
# Check remote configuration
git-backup config
# → Check Git Remote URL

# Test SSH connection
ssh -T git@github.com

# Add SSH key if needed
ssh-keygen -t ed25519 -C "your@email.com"
cat ~/.ssh/id_ed25519.pub
# → Add to GitHub SSH keys

# Retry backup
git-backup run
```

## Advanced Configuration Examples

### Custom exclude patterns for monorepo

```json
{
  "excludePatterns": [
    "node_modules",
    "*/dist",
    "*/build",
    "packages/*/coverage",
    "apps/*/tmp",
    "*.log"
  ]
}
```

### Multiple backup destinations

```bash
# Primary backup (local)
git-backup init
# → Backup directory: .backup-local
# → Use remote: No

# Secondary backup (remote)
# Create second config manually
cat > .backup-config-remote.json << 'EOF'
{
  "sourceDir": ".",
  "backupRepoPath": ".backup-remote",
  "gitRemoteUrl": "git@github.com:user/backup.git",
  "autoPush": true
}
EOF

# Run both backups
git-backup run --dir .
git-backup run --config .backup-config-remote.json --dir .
```

## Best Practices

1. **Test restores regularly**: Periodically test restoring from backups
2. **Monitor backup size**: Keep an eye on backup repository size
3. **Use encryption for sensitive data**: Enable git-crypt for projects with secrets
4. **Automate backups**: Set up cron jobs or CI/CD pipelines
5. **Version control your config**: Commit `.backup-config.json` (without secrets)
6. **Multiple backup locations**: Use both local and remote backups
7. **Regular health checks**: Monitor backup status across all projects
8. **Document exclusions**: Comment why specific patterns are excluded
