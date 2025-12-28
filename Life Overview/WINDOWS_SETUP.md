# Windows Setup Guide for Life Overview

This guide provides step-by-step instructions to set up Life Overview on a Windows machine, including Claude Code integration and automated backup sync.

## Prerequisites

### 1. Install Required Software

Download and install the following in order:

1. **Git for Windows**: https://git-scm.com/download/win
   - During installation, select "Git from the command line and also from 3rd-party software"
   - Choose "Use Windows' default console window" or "Use MinTTY"

2. **Node.js (LTS version)**: https://nodejs.org/
   - Download the Windows Installer (.msi)
   - Version 18.x or higher recommended
   - Verify installation: Open PowerShell and run `node --version`

3. **Claude Code**: https://claude.ai/download
   - Download the Windows installer
   - Install to default location (typically `C:\Users\<username>\AppData\Local\Programs\claude-code`)

4. **Visual Studio Code** (Optional but recommended): https://code.visualstudio.com/

### 2. Configure Git

Open PowerShell and configure git:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Set up SSH Keys for GitHub

```powershell
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"
# Press Enter to accept default location (C:\Users\<username>\.ssh\id_ed25519)
# Optionally set a passphrase

# Start ssh-agent
Start-Service ssh-agent

# Add SSH key
ssh-add $env:USERPROFILE\.ssh\id_ed25519

# Copy public key to clipboard
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard
```

Add the SSH key to GitHub:
1. Go to https://github.com/settings/keys
2. Click "New SSH key"
3. Paste the key and save

Test connection:
```powershell
ssh -T git@github.com
```

## Installation Steps

### 1. Choose Installation Directory

Pick a location for your `life` folder. Recommended options:
- `C:\Users\<username>\life` (user directory)
- `D:\life` (if you have a second drive)

For this guide, we'll use `C:\Users\<username>\life`. Adjust paths as needed.

### 2. Clone the Backup Repository

Open PowerShell:

```powershell
# Navigate to your home directory
cd $env:USERPROFILE

# Clone the life-backup repository
git clone git@github.com:Heavywpn/life-backup.git life

# Navigate into the directory
cd life
```

If you set up git-crypt encryption on Linux, you'll need to decrypt:

```powershell
# Install git-crypt for Windows (using scoop or chocolatey)
# Option 1: Using Scoop
scoop install git-crypt

# Option 2: Using Chocolatey
choco install git-crypt

# Then unlock the repository (if encrypted)
cd life
git-crypt unlock
```

### 3. Set up Life Overview Application

```powershell
# Navigate to the Life Overview directory
cd "$env:USERPROFILE\life\Life Overview"

# Install dependencies
npm install

# Build the TypeScript project
npm run build
```

### 4. Configure Environment Variables

Create a `.env` file in the `Life Overview` directory:

```powershell
# Copy the example file
Copy-Item .env.example .env

# Edit with notepad or VS Code
notepad .env
# OR
code .env
```

Update the `.env` file with Windows paths:

```env
# API Configuration
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Paths (Windows format)
LIFE_ROOT_PATH=C:\Users\<username>\life
DB_PATH=C:\Users\<username>\life\Life Overview\data\life-index.db
BACKUP_REPO_PATH=C:\Users\<username>\life

# Git Configuration
GIT_REMOTE_URL=git@github.com:Heavywpn/life-backup.git

# Optional: Encryption (if using git-crypt)
# ENCRYPTION_KEY=<base64-encoded-key>
```

**Important**: Replace `<username>` with your actual Windows username.

### 5. Initial Index

Run the initial indexing:

```powershell
npm run start -- index
```

This will create the SQLite database and index all your Claude projects.

### 6. Test the Setup

```powershell
# Test search
npm run start -- search "test query"

# Test AI query (requires ANTHROPIC_API_KEY)
npm run start -- ask "What projects do I have?"

# Test stats
npm run start -- stats

# Test backup
npm run start -- backup
```

## Claude Code Setup on Windows

### 1. Install Claude Code

If not already installed, download from https://claude.ai/download

### 2. Configure Claude Code for the Project

1. Open Claude Code
2. Use `Ctrl+O` or File → Open Folder
3. Navigate to `C:\Users\<username>\life\Life Overview`
4. Claude Code will recognize the `CLAUDE.md` file automatically

### 3. Verify Claude Code Integration

In Claude Code, try asking:
- "Index my life projects"
- "Show me statistics about my files"
- "Search for projects related to AI"

Claude Code will use the tools and commands defined in the project.

## Automation on Windows

### Option 1: Task Scheduler (Recommended)

Create a scheduled task to run daily backups and indexing.

#### Create the Batch Script

Save as `C:\Users\<username>\life\Life Overview\scripts\daily-job.bat`:

```batch
@echo off
REM Daily Life Overview backup and index job

SET SCRIPT_DIR=%~dp0
SET PROJECT_DIR=%SCRIPT_DIR%..
SET LOG_DIR=%PROJECT_DIR%\logs
SET LOG_FILE=%LOG_DIR%\daily-%date:~-4,4%-%date:~-10,2%-%date:~-7,2%.log

REM Create logs directory if it doesn't exist
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

echo ====================================== >> "%LOG_FILE%"
echo Daily Job Started: %date% %time% >> "%LOG_FILE%"
echo ====================================== >> "%LOG_FILE%"

cd "%PROJECT_DIR%"

echo. >> "%LOG_FILE%"
echo [INDEXING] Starting... >> "%LOG_FILE%"
call npm run start -- index >> "%LOG_FILE%" 2>&1
echo [INDEXING] Complete >> "%LOG_FILE%"

echo. >> "%LOG_FILE%"
echo [SUMMARY] Starting... >> "%LOG_FILE%"
call npm run start -- summary >> "%LOG_FILE%" 2>&1
echo [SUMMARY] Complete >> "%LOG_FILE%"

echo. >> "%LOG_FILE%"
echo [BACKUP] Starting... >> "%LOG_FILE%"
call npm run start -- backup >> "%LOG_FILE%" 2>&1
echo [BACKUP] Complete >> "%LOG_FILE%"

echo. >> "%LOG_FILE%"
echo ====================================== >> "%LOG_FILE%"
echo Daily Job Completed: %date% %time% >> "%LOG_FILE%"
echo ====================================== >> "%LOG_FILE%"
```

#### Create the Task Scheduler Entry

Save as `C:\Users\<username>\life\Life Overview\scripts\install-scheduled-task.ps1`:

```powershell
# PowerShell script to install Windows Scheduled Task for Life Overview

$taskName = "LifeOverviewDaily"
$projectDir = "C:\Users\$env:USERNAME\life\Life Overview"
$scriptPath = "$projectDir\scripts\daily-job.bat"

# Check if task already exists
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

if ($existingTask) {
    Write-Host "Task '$taskName' already exists. Removing old task..."
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

# Create scheduled task action
$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c `"$scriptPath`""

# Create trigger (daily at 2:00 AM)
$trigger = New-ScheduledTaskTrigger -Daily -At 2:00AM

# Create settings
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -RunOnlyIfNetworkAvailable

# Create principal (run whether user is logged on or not)
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType S4U

# Register the task
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Description "Daily Life Overview indexing, summary, and backup"

Write-Host "Scheduled task '$taskName' installed successfully!"
Write-Host "It will run daily at 2:00 AM"
Write-Host "You can modify it in Task Scheduler (taskschd.msc)"
```

Run the installation script (as Administrator):

```powershell
# Right-click PowerShell and "Run as Administrator"
cd "C:\Users\<username>\life\Life Overview\scripts"
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\install-scheduled-task.ps1
```

### Option 2: Manual Scheduled Task via GUI

1. Press `Win+R`, type `taskschd.msc`, press Enter
2. Click "Create Basic Task"
3. Name: "LifeOverviewDaily"
4. Trigger: Daily at 2:00 AM
5. Action: Start a program
   - Program: `cmd.exe`
   - Arguments: `/c "C:\Users\<username>\life\Life Overview\scripts\daily-job.bat"`
6. Finish

## Syncing Changes from GitHub

To pull the latest changes from the Linux machine:

```powershell
cd "$env:USERPROFILE\life"

# Pull latest changes
git pull origin main

# If using git-crypt, it will auto-decrypt

# Re-index after pulling
cd "Life Overview"
npm run start -- index
```

## Running Claude Code Agents

The Life Overview project doesn't have separate "agents" per se, but the AI query functionality acts as an intelligent agent. To use it:

### Via Command Line:

```powershell
cd "$env:USERPROFILE\life\Life Overview"

# Ask questions
npm run start -- ask "What are my recent projects?"

# Get daily summary
npm run start -- summary

# Get project insights
npm run start -- insights "Project Name"
```

### Via Claude Code:

1. Open Claude Code
2. Open the Life Overview project
3. Ask Claude Code to run commands:
   - "Index my projects"
   - "Search for files about X"
   - "Give me a summary of today's work"

Claude Code will execute the CLI commands and present the results.

## Differences from Linux Setup

### Path Separators
- Linux: `/home/rick/life`
- Windows: `C:\Users\<username>\life`

### Line Endings
Git on Windows handles CRLF/LF conversion automatically. No action needed.

### Scripts
- Linux uses bash scripts (`.sh`)
- Windows uses batch files (`.bat`) or PowerShell (`.ps1`)

### Cron vs Task Scheduler
- Linux: `crontab` entries
- Windows: Task Scheduler or PowerShell scheduled jobs

### Case Sensitivity
- Windows is case-insensitive for file paths
- Linux is case-sensitive
- Git preserves the case from the repository

## Troubleshooting

### "npm not recognized"
Restart PowerShell or add Node.js to PATH manually:
```powershell
$env:Path += ";C:\Program Files\nodejs\"
```

### "Cannot run script - execution policy"
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "Permission denied" with git
Check SSH key setup:
```powershell
ssh -T git@github.com
```

### Database locked errors
Close any programs that might have the SQLite database open (like DB Browser).

### Large file warnings on push
Add Python virtual environments to `.gitignore`:
```
*_env/
venv/
.venv/
env/
```

### Git-crypt not unlocking
Ensure you have the encryption key from the Linux machine. Transfer it securely and run:
```powershell
git-crypt unlock path\to\keyfile
```

## Keeping Both Systems in Sync

### Recommended Workflow:

1. **Linux Machine**: Primary development/daily use
   - Daily automated backups push to GitHub

2. **Windows Machine**: Secondary access/backup
   - Pull changes regularly:
   ```powershell
   cd "$env:USERPROFILE\life"
   git pull origin main
   cd "Life Overview"
   npm run start -- index
   ```

3. **Making changes on Windows**:
   ```powershell
   # After making changes
   cd "$env:USERPROFILE\life"
   git add .
   git commit -m "Changes from Windows"
   git push origin main
   ```

4. **Sync back to Linux**:
   ```bash
   cd ~/life
   git pull origin main
   cd "Life Overview"
   npm run start -- index
   ```

## Additional Tools for Windows

### Recommended PowerShell Modules

```powershell
# Better directory listing
Install-Module -Name posh-git

# Colored output
Install-Module -Name PSColors
```

### Recommended VS Code Extensions

- SQLite Viewer (for browsing the database)
- GitLens (for git history)
- PowerShell (for script editing)
- Error Lens (for inline TypeScript errors)

## Security Notes

- Keep `.env` file secure (contains API key)
- Use Windows Credential Manager for git credentials
- Consider BitLocker encryption for the `life` folder
- Use Windows Firewall to protect the SQLite database
- SSH keys in `C:\Users\<username>\.ssh\` should be protected (Windows sets this automatically)

## Next Steps

1. Set up the scheduled task for automated backups
2. Configure Claude Code to open the project automatically on startup
3. Test the full workflow: index → query → backup
4. Set up a reminder to pull from GitHub weekly (or automate it)

## Support

If you encounter issues:
1. Check the log files in `logs/` directory
2. Verify all paths in `.env` use Windows format
3. Ensure all npm dependencies installed correctly
4. Test each component individually (index, search, ask, backup)
