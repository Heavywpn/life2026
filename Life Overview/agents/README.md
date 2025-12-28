# Life Overview Agents

This directory contains standalone agents extracted from Life Overview that can be used across any project.

## Available Agents

### 🔄 Git Backup Agent

A universal backup solution for any project with intelligent exclusions, version control, and optional encryption.

**Location**: `git-backup-agent/`

**Quick Start**:
```bash
cd git-backup-agent
npm install
npm run build
npm link

# Use from any project
cd /path/to/your/project
git-backup init
git-backup run
```

**Documentation**:
- [README.md](git-backup-agent/README.md) - Complete documentation
- [QUICKSTART.md](git-backup-agent/QUICKSTART.md) - 60-second setup
- [USAGE_EXAMPLES.md](git-backup-agent/USAGE_EXAMPLES.md) - Real-world examples
- [AGENT_SUMMARY.md](git-backup-agent/AGENT_SUMMARY.md) - Technical overview

**Features**:
- ✅ Works with any project type (Node.js, Python, Rust, Go, etc.)
- ✅ Auto-detects project type and excludes build artifacts
- ✅ Git-based versioned backups
- ✅ Optional remote push to GitHub/GitLab
- ✅ Optional git-crypt encryption
- ✅ Interactive setup with smart defaults

---

## Philosophy

These agents follow a common design pattern:

1. **Standalone**: No dependencies on Life Overview
2. **Universal**: Work with any project or directory
3. **Configurable**: Per-project configuration files
4. **Interactive**: Guided setup with sensible defaults
5. **Well-documented**: Complete guides and examples

## Adding New Agents

When extracting functionality into a new agent:

1. Create new directory: `agents/your-agent-name/`
2. Initialize npm package with TypeScript
3. Implement core logic in `src/`
4. Create CLI wrapper in `src/cli.ts`
5. Add comprehensive documentation:
   - README.md (complete reference)
   - QUICKSTART.md (fast setup)
   - USAGE_EXAMPLES.md (real-world patterns)
6. Make it installable: `npm link` or publish to npm

## Usage from Life Overview

You can use these agents within Life Overview itself:

### Example: Backup Life Overview with Git Backup Agent

```bash
# From Life Overview root
cd /home/rick/life/"Life Overview"

# Initialize backup (if not already done)
git-backup init
# → Project name: Life Overview
# → Backup directory: backup-repo  # Use existing!
# → Use remote: Yes
# → Git remote URL: (your git URL)

# Create backup
git-backup run

# This replaces the old `npm run start -- backup` command
```

### Integration with Life Overview Commands

You can integrate agents into Life Overview CLI:

**In `src/cli.ts`**:
```typescript
import { GitBackupAgent } from '../agents/git-backup-agent/dist/index.js';

program
  .command('backup')
  .description('Backup Life Overview using git-backup agent')
  .action(async () => {
    const config = {
      sourceDir: process.cwd(),
      backupRepoPath: './backup-repo',
      // ... other config
    };

    const agent = new GitBackupAgent(config);
    await agent.performBackup();
  });
```

## Future Agents

Potential agents to extract:

- **📊 Stats Agent**: File statistics and analysis (from Life Overview)
- **🔍 Search Agent**: Full-text search across projects
- **🤖 AI Query Agent**: AI-powered Q&A about codebases
- **📁 File Indexer**: Database indexing for any directory
- **📝 Summary Generator**: AI summaries of project changes
- **🔐 Secret Scanner**: Find and secure sensitive data
- **📦 Dependency Analyzer**: Analyze and report on dependencies
- **🧹 Cleanup Agent**: Remove build artifacts and caches

## Contributing

When creating or modifying agents:

1. **Test thoroughly**: Ensure it works across different project types
2. **Document well**: Include README, QUICKSTART, and examples
3. **Handle errors**: Graceful failures with helpful messages
4. **Follow conventions**: Use TypeScript, Commander, Chalk
5. **Consider portability**: Avoid hardcoded paths
6. **Provide defaults**: Make it work out-of-the-box

## License

MIT (same as Life Overview parent project)
