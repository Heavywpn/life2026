---
description: Sync external data sources (WHOOP, Calendar, Weather) for journal
allowed-tools: Bash(python:*), Read, Write, Glob
---

# Sync External Data

Pull data from all configured integrations and cache it for use in morning/evening rituals.

## Overview

This command fetches data from:
1. **WHOOP** - Recovery, sleep, strain data
2. **Outlook Calendar** - Today's events and meetings
3. **Weather** - Current conditions and forecast

## STEP 1: Check Configuration

First, check if the integrations.env file exists:

```bash
ls -la /home/x/Life/telos/.claude/config/integrations.env 2>/dev/null || echo "NOT_CONFIGURED"
```

If NOT_CONFIGURED, inform the user:
"External integrations are not configured yet. To set up:
1. Copy the example file: `cp .claude/config/integrations.env.example .claude/config/integrations.env`
2. Edit `.claude/config/integrations.env` with your API credentials
3. Run `/sync` again

I'll still fetch weather (no API key required)."

## STEP 2: Fetch Weather (Always Available)

Weather works without API keys using wttr.in:

```bash
cd /home/x/Life/telos && python3 scripts/integrations/weather.py
```

This will output the current weather and save to `.claude/data/weather_latest.json`

## STEP 3: Fetch WHOOP Data (If Configured)

Check for WHOOP credentials and fetch if available:

```bash
cd /home/x/Life/telos && python3 scripts/integrations/whoop.py --days 1
```

If the script fails due to missing credentials, note this but continue.

## STEP 4: Fetch Calendar (If Configured)

Check for Outlook credentials and fetch if available:

```bash
cd /home/x/Life/telos && python3 scripts/integrations/outlook.py --days 1
```

If the script fails due to missing credentials, note this but continue.

## STEP 5: Create Combined Summary

After fetching all available data, read the cached files and create a combined summary:

Read from `.claude/data/`:
- `weather_latest.json`
- `whoop_latest.json` (if exists)
- `calendar_latest.json` (if exists)

Create a combined markdown file at `.claude/data/daily_summary.md` with:

```markdown
# Daily Data Summary

*Generated: [timestamp]*

---

[Weather section from weather script output]

---

[WHOOP section from whoop script output, if available]

---

[Calendar section from calendar script output, if available]

---

## Quick Stats

| Metric | Value |
|--------|-------|
| Recovery | [X]% |
| Sleep | [X] hrs |
| Meetings Today | [N] |
| Weather | [Conditions] |
```

## STEP 6: Report Results

Tell the user what was synced:
- Weather: ✓ Synced
- WHOOP: ✓ Synced / ✗ Not configured / ⚠ Error
- Calendar: ✓ Synced / ✗ Not configured / ⚠ Error

Provide the path to the summary: `.claude/data/daily_summary.md`

## Notes

- Weather uses wttr.in by default (free, no API key)
- WHOOP requires OAuth setup (see scripts/integrations/whoop.py for instructions)
- Outlook requires Azure AD app registration (see scripts/integrations/outlook.py)
- Data is cached in `.claude/data/` for use by morning/evening commands
- Run `/sync` before `/morning` to get fresh data
