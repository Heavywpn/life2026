# Contributing Guide

This is a private personal knowledge base. This document outlines the conventions and practices used to maintain consistency across the repository.

## Markdown Conventions

### File Naming

- Use **kebab-case** for multi-word filenames: `project-overview.md`
- Use **UPPERCASE** for project-level documentation: `README.md`, `CLAUDE.md`
- Avoid spaces in filenames when possible

### Document Structure

```markdown
# Document Title

Brief description of the document's purpose.

## Overview

High-level context and background.

## Main Sections

Content organized by topic.

### Subsections

Detailed content as needed.

## See Also

- [Related Document](path/to/doc.md)
```

### Headers

- Use `#` for the document title (one per file)
- Use `##` for main sections
- Use `###` for subsections
- Avoid going deeper than `####`

### Links

- Use relative paths: `[Link Text](../folder/file.md)`
- Use URL encoding for spaces: `[Link](path%20with%20spaces/file.md)`

### Code Blocks

Always specify the language:

```typescript
const example = "code";
```

## Project-Specific CLAUDE.md Files

Each major project should contain a `CLAUDE.md` file that provides:

1. **Project Overview** - What the project does and its purpose
2. **Key Files** - Important files and their roles
3. **Commands** - How to build, run, and test
4. **Architecture** - How components fit together
5. **Working Instructions** - How to resume or continue work

## Obsidian Features

### Internal Links

Use double brackets for internal linking:
- `[[Document Name]]` - Link to document
- `[[Document Name#Section]]` - Link to section
- `[[Document Name|Display Text]]` - Custom display text

### Tags

Use tags for categorization:
- `#project` - Project-related content
- `#reference` - Reference material
- `#todo` - Items requiring action

### Frontmatter

Optional YAML frontmatter for metadata:

```yaml
---
title: Document Title
created: 2025-01-01
tags: [project, reference]
status: active
---
```

## Git Workflow

### Commit Messages

Use clear, descriptive commit messages:

```
Add travel planning documentation

- Added main itinerary
- Added packing list
- Added emergency contacts
```

### Branching

Main branch: `main`

For major changes, consider feature branches:
- `feature/new-project`
- `docs/update-readme`

## Directory Organization

### New Projects

When adding a new project:

1. Create a folder with a descriptive name
2. Add a `README.md` with project overview
3. Add a `CLAUDE.md` for AI assistant context
4. Organize files into logical subdirectories

### File Placement

- **Documents** go in the project root or `docs/`
- **Source code** goes in `src/`
- **Configuration** goes in the project root
- **Data files** go in `data/`

## Sensitive Information

### Never Commit

- API keys or tokens
- Passwords or credentials
- Personal identification numbers
- Financial account details

### Use Environment Variables

Store sensitive configuration in `.env` files (gitignored):

```bash
API_KEY=your_secret_key
```

## Backup Practices

1. Commit and push changes regularly
2. Use the Life Overview backup system for automated backups
3. Verify backups periodically

## Questions

For questions about conventions or practices, consult the `CLAUDE.md` files in individual projects or the main `README.md`.
