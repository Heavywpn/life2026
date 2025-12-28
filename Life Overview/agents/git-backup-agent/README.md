# Git Backup Agent

A standalone, project-agnostic git backup agent that can be run from any project directory. Automatically detects project type, intelligently excludes build artifacts and dependencies, and maintains versioned backups with optional remote push and encryption.

## Features

- **Universal**: Works with any project type (Node.js, Python, Rust, Go, Java, Ruby, etc.)
- **Smart Detection**: Auto-detects project type and suggests appropriate exclusions
- **Interactive Setup**: Guided configuration with sensible defaults
- **Git-based**: Version-controlled backups with full git history
- **Remote Backup**: Optional push to GitHub/GitLab/Bitbucket
- **Encryption**: Optional git-crypt encryption for sensitive files
- **Efficient Sync**: Uses rsync when available, falls back to manual copy
- **Zero Dependencies**: Only requires git (and optionally git-crypt for encryption)

## Installation

### From this directory:

```bash
cd agents/git-backup-agent
npm install
npm run build
npm link
```

### Using the agent globally:

Once linked, you can use `git-backup` from any project directory:

```bash
cd /path/to/your/project
git-backup init
```

## Quick Start

### 1. Initialize backup for your project

**Quick setup (non-interactive)**:
```bash
cd /path/to/your/project
git-backup init --yes
```

**Interactive setup**:
```bash
cd /path/to/your/project
git-backup init
```

This will:
- Detect your project type (Node.js, Python, etc.)
- Suggest appropriate exclude patterns
- Walk you through configuration (or use defaults with `--yes`)
- Initialize the backup repository

**Advanced options**:
```bash
# With remote repository
git-backup init --yes --remote git@github.com:user/backup-repo.git

# Custom backup directory
git-backup init --yes --backup-dir /path/to/backup

# Both
git-backup init --yes --remote git@github.com:user/repo.git --backup-dir ~/backups/myproject
```

### 2. Create your first backup

```bash
git-backup run
```

### 3. Check backup status

```bash
git-backup status
```

## Commands

### `git-backup init`

Interactive setup wizard that creates `.backup-config.json` in your project.

Options:
- `-d, --dir <directory>` - Specify project directory (default: current directory)

### `git-backup init-repo`

Initialize the backup git repository without creating a backup.

### `git-backup run`

Perform a backup now. This will:
1. Sync files to backup directory (excluding configured patterns)
2. Create a git commit (if auto-commit enabled)
3. Push to remote (if configured and auto-push enabled)

### `git-backup status`

Show backup information:
- Initialization status
- Last backup date and commit
- Uncommitted changes
- Remote configuration
- Encryption status

### `git-backup config`

Display current backup configuration.

## Configuration

The agent stores configuration in `.backup-config.json` in your project root:

```json
{
  "sourceDir": "/path/to/project",
  "projectName": "my-project",
  "backupRepoPath": "/path/to/project/.backup",
  "gitBranch": "main",
  "gitRemoteUrl": "git@github.com:user/backup-repo.git",
  "encryptionEnabled": false,
  "autoCommit": true,
  "autoPush": false,
  "commitMessagePrefix": "[my-project]",
  "excludePatterns": [
    "node_modules",
    ".git",
    "dist",
    ".env",
    "*.log"
  ]
}
```

### Configuration Options

- **sourceDir**: Project root directory
- **projectName**: Name used in commit messages
- **backupRepoPath**: Where backup files are stored
- **gitBranch**: Git branch name (default: "main")
- **gitRemoteUrl**: Optional remote repository URL
- **encryptionEnabled**: Enable git-crypt encryption
- **autoCommit**: Automatically create commits (default: true)
- **autoPush**: Automatically push to remote (default: false)
- **commitMessagePrefix**: Prefix for commit messages
- **excludePatterns**: Files/directories to exclude from backup

## Project Type Detection

The agent automatically detects common project types and suggests appropriate exclusions:

| Project Type | Detection | Default Excludes |
|--------------|-----------|------------------|
| Node.js | package.json | node_modules, dist, build, .next, coverage |
| Python | requirements.txt, setup.py | __pycache__, venv, .env, *.pyc, .pytest_cache |
| Rust | Cargo.toml | target, Cargo.lock |
| Go | go.mod | vendor, bin |
| Java/Maven | pom.xml | target, .m2, .gradle |
| Ruby | Gemfile | vendor/bundle, .bundle, tmp, log |

Additional common excludes are always applied:
- `.git`, `.DS_Store`, `Thumbs.db`, `*.log`, `.idea`, `.vscode`, `.cache`, `tmp`, `temp`

## Encryption

To enable encryption for sensitive files:

1. Install git-crypt:
   ```bash
   # Ubuntu/Debian
   sudo apt install git-crypt

   # macOS
   brew install git-crypt
   ```

2. Enable during setup or manually in config:
   ```json
   {
     "encryptionEnabled": true
   }
   ```

3. Run `git-backup init-repo` to set up encryption

The agent will encrypt these file types by default:
- `*.env`
- `*.key`
- `*.pem`
- `*.db`
- Files in `secrets/` and `credentials/` directories

## Remote Backup

To push backups to a remote repository:

1. Create a private repository on GitHub/GitLab/etc.

2. Configure during setup or add to `.backup-config.json`:
   ```json
   {
     "gitRemoteUrl": "git@github.com:yourusername/your-backup-repo.git",
     "autoPush": true
   }
   ```

3. Ensure SSH keys are configured for authentication

## Automation

### Cron (Linux/macOS)

Add to crontab (`crontab -e`):

```bash
# Daily backup at 2 AM
0 2 * * * cd /path/to/project && /usr/local/bin/git-backup run >> /var/log/git-backup.log 2>&1
```

### Systemd Timer (Linux)

Create `/etc/systemd/system/git-backup@.service`:

```ini
[Unit]
Description=Git Backup for %i

[Service]
Type=oneshot
WorkingDirectory=/path/to/%i
ExecStart=/usr/local/bin/git-backup run
```

Create `/etc/systemd/system/git-backup@.timer`:

```ini
[Unit]
Description=Daily Git Backup for %i

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

Enable: `sudo systemctl enable --now git-backup@your-project.timer`

### Git Hook (Automatic on commit)

Add to `.git/hooks/post-commit`:

```bash
#!/bin/bash
git-backup run
```

Make executable: `chmod +x .git/hooks/post-commit`

## Examples

### Backup a Node.js project

```bash
cd ~/projects/my-app
git-backup init
# Follow prompts, agent detects Node.js and suggests node_modules exclusion
git-backup run
```

### Backup with remote push

```bash
cd ~/projects/my-app
git-backup init
# Enable remote push during setup
# Enter GitHub repo URL: git@github.com:user/my-app-backup.git
# Enable auto-push: Yes
git-backup run
# Files are backed up and pushed to GitHub
```

### Backup with encryption

```bash
cd ~/projects/sensitive-project
git-backup init
# Enable encryption during setup
git-backup init-repo
git-backup run
# Sensitive files are encrypted in the backup
```

### Multiple project setup

```bash
# Set up backups for multiple projects
for project in ~/projects/*; do
  cd "$project"
  git-backup init
done

# Create a script to backup all projects
cat > ~/bin/backup-all-projects.sh << 'EOF'
#!/bin/bash
for project in ~/projects/*; do
  if [ -f "$project/.backup-config.json" ]; then
    echo "Backing up $project..."
    cd "$project"
    git-backup run
  fi
done
EOF
chmod +x ~/bin/backup-all-projects.sh
```

## Troubleshooting

### "git-backup: command not found"

Run `npm link` from the agent directory, or use the full path.

### Backup repository conflicts

If you see merge conflicts in the backup repo:
```bash
cd .backup  # or your configured backup path
git reset --hard HEAD
cd ..
git-backup run
```

### rsync not available

The agent will automatically fall back to manual file copy. Install rsync for better performance:
```bash
sudo apt install rsync  # Ubuntu/Debian
brew install rsync      # macOS
```

### git-crypt issues

Ensure git-crypt is installed and initialized:
```bash
which git-crypt
cd .backup
git-crypt status
```

## Security Considerations

- **Config file**: `.backup-config.json` may contain sensitive URLs. Add to `.gitignore`.
- **Encryption keys**: If using encryption, never commit encryption keys to version control.
- **Remote access**: Use SSH keys instead of passwords for remote repositories.
- **Backup location**: Ensure backup directory has appropriate permissions.
- **.env files**: By default excluded from backups. Enable encryption if you need to back them up.

## Architecture

The agent consists of three main components:

1. **ConfigManager** (`config.ts`): Handles configuration loading, saving, and project type detection
2. **GitBackupAgent** (`backup-agent.ts`): Performs file syncing, git operations, and encryption setup
3. **CLI** (`cli.ts`): Interactive command-line interface

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Development mode (watch)
npm run dev

# Link for testing
npm link

# Test from another project
cd /path/to/test/project
git-backup init
```

## License

MIT
