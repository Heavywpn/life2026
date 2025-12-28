# Windows Quick Start Guide

This is the quick reference for setting up Life Overview on Windows. For detailed instructions, see `WINDOWS_SETUP.md`.

## Prerequisites Checklist

- [ ] Git for Windows installed
- [ ] Node.js (LTS) installed
- [ ] Claude Code installed
- [ ] SSH key added to GitHub
- [ ] Repository cloned to Windows machine

## Quick Setup (5 Minutes)

### 1. Clone the Repository

```powershell
cd $env:USERPROFILE
git clone git@github.com:Heavywpn/life-backup.git life
cd "life\Life Overview"
```

### 2. Run Setup Script

```powershell
# Run automated setup
.\scripts\setup-windows.ps1
```

This script will:
- Check prerequisites
- Install npm dependencies
- Build the project
- Create `.env` file
- Run initial indexing

### 3. Configure API Key

Edit `.env` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 4. Test the Setup

```powershell
# Test basic functionality
npm run start -- stats
npm run start -- search "test"
npm run start -- ask "What projects do I have?"
```

## Daily Commands

```powershell
# Index projects (after making changes)
npm run start -- index

# Search for files
npm run start -- search "keyword"

# Ask AI questions
npm run start -- ask "Your question here"

# Generate summary
npm run start -- summary

# Create backup
npm run start -- backup

# Pull latest from GitHub
cd $env:USERPROFILE\life
git pull origin main
cd "Life Overview"
npm run start -- index
```

## Automated Backup Setup

Install the scheduled task (runs daily at 2 AM):

```powershell
# Run as Administrator
cd "$env:USERPROFILE\life\Life Overview\scripts"
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\install-scheduled-task.ps1
```

## Claude Code Integration

1. Open Claude Code
2. File → Open Folder → Navigate to `C:\Users\<username>\life\Life Overview`
3. Claude Code will recognize the `CLAUDE.md` configuration

Now you can ask Claude Code to:
- "Index my life projects"
- "Search for files about X"
- "Give me a summary of my work"
- "Create a backup"

## Troubleshooting

### Command not found errors
Restart PowerShell to refresh PATH.

### API key errors
Check `.env` file has valid `ANTHROPIC_API_KEY`.

### Git push/pull errors
Verify SSH key: `ssh -T git@github.com`

### Build errors
Delete `node_modules` and run:
```powershell
npm install
npm run build
```

## File Locations

- **Projects**: `C:\Users\<username>\life\`
- **Database**: `C:\Users\<username>\life\Life Overview\data\life-index.db`
- **Logs**: `C:\Users\<username>\life\Life Overview\logs\`
- **Config**: `C:\Users\<username>\life\Life Overview\.env`

## Getting Help

- Full guide: `WINDOWS_SETUP.md`
- Project docs: `CLAUDE.md`
- GitHub issues: Report problems on GitHub
