# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Repository Overview

This is a **personal life tracking system** based on the Telos Framework. It integrates with an EOS (Entrepreneurial Operating System) business plan for Venturer Technology.

**Not a software project** - This is a personal knowledge management system with markdown files, slash commands, and external data integrations.

---

## ⚠️ SESSION RESTART POINT - START HERE ⚠️

**Last Session:** 2025-12-28
**Status:** System reset for 2026, integrations configured, business plan integrated

### What Was Completed This Session

**1. System Reset for 2026**
- Archived all 2025 content to `07-archive/old-versions/2025/`
- Reset all foundation files to blank templates
- Created fresh `telos.md` and journal structure

**2. Slash Commands Created** (in `.claude/commands/`)
- `/morning` - Morning ritual (5-10 min) with WHOOP/weather data
- `/evening` - Evening reflection (10-15 min) with day strain
- `/weekly` - Weekly review (30-45 min) with 3-persona analysis
- `/sync` - Manual data refresh from integrations

**3. External Integrations Set Up** (in `scripts/integrations/`)
- **Weather:** ✅ Working - Portland, Victoria default
- **WHOOP:** ✅ Working - V2 API, OAuth complete
  - Recovery, sleep, strain, workouts all syncing
  - Tokens saved in `.claude/config/integrations.env`
- **Outlook Calendar:** ⏸️ Pending
  - Client ID/Secret configured
  - Needs redirect URI added in Azure portal: `http://localhost:8081/callback`
  - Then run: `python3 scripts/integrations/outlook_auth.py`

**4. Business Plan Integrated**
- Linked to `/home/x/Life/10YearBusinessPlan/` (EOS/VTO system)
- Updated `telos.md` with mission, values, goals from VTO
- Updated `02-strategic/goals.md` with full goal hierarchy

---

## Current System State

### User Profile

**Name:** Rick (prefers "Ricky")
**Business:** Venturer Technology (MSP), Core Computers, Fortified
**Wife:** Kristyn - 25 years married, Operations Director
**Sons:** Ronin (20, QUT AI/Robotics), Parker (22, Melbourne)

### Mission

> "Empowering mission-driven organizations to focus on their purpose by providing technology leadership they can trust completely."

### Core Values

1. **Fiercely Protect Our Clients** - Honest advice, say "no" when needed
2. **Grow With Our Clients** - Partnership over transactions
3. **Community and Sacrifice Mindset** - Veterans, disabilities, survivors

### Goal Hierarchy

```
10-Year (2035): $5-10M, 80% recurring, self-sustaining, foundation
    ↓
3-Year (2028): $3M, 45-50% recurring, 6 staff, Rick exited L1/L2
    ↓
1-Year (2026): $1.5M, $130-150/seat, first hire, EOS complete
    ↓
Q1 Rocks: Profit First, First Hire, L10 Rhythm, Process Docs, $375k
```

### Current Problems (P1-P3)

- **P1:** Mission-driven orgs struggling with technology
- **P2:** Owner-dependent business limiting freedom
- **P3:** Underpriced services ($45/seat) limiting profitability

---

## File Structure

```
telos/
├── telos.md                    # Main context file (UPDATED)
├── CLAUDE.md                   # This file
├── .claude/
│   ├── commands/               # Slash commands
│   │   ├── morning.md          # /morning ritual
│   │   ├── evening.md          # /evening reflection
│   │   ├── weekly.md           # /weekly review
│   │   └── sync.md             # /sync data
│   ├── config/
│   │   └── integrations.env    # API credentials (DO NOT COMMIT)
│   └── data/                   # Cached integration data
│       ├── weather_latest.json
│       ├── whoop_latest.json
│       └── calendar_latest.json
├── scripts/integrations/       # Data sync scripts
│   ├── weather.py              # wttr.in (no API key needed)
│   ├── whoop.py                # WHOOP V2 API
│   ├── whoop_auth.py           # WHOOP OAuth helper
│   ├── outlook.py              # Microsoft Graph API
│   └── outlook_auth.py         # Outlook OAuth helper
├── 01-foundation/              # Identity layer (templates)
├── 02-strategic/
│   └── goals.md                # Full goal hierarchy (UPDATED)
├── 03-tactical/                # Execution layer
├── 04-tracking/
│   └── reviews/weekly/         # Weekly review files
├── 05-journal/                 # Daily journal entries
├── 06-domains/                 # Life area deep-dives
└── 07-archive/
    └── old-versions/2025/      # Archived 2025 content
```

---

## External Systems

### Business Planning
**Location:** `/home/x/Life/10YearBusinessPlan/`

Key files:
- `VTO-venturer-technology.md` - Complete Vision/Traction Organizer
- `rocks/` - Quarterly rock tracking (company + individual)
- `meetings/` - L10 meeting notes and prep

### Integration Credentials
**Location:** `.claude/config/integrations.env`

```
WHOOP: Configured and working (V2 API)
WEATHER: Portland,Victoria default (wttr.in, no key needed)
OUTLOOK: Client ID/Secret set, needs OAuth completion
```

---

## Slash Commands

### /morning (5-10 min)
1. Verifies date/time
2. Syncs weather + WHOOP recovery/sleep
3. Asks about energy, sleep, capacity
4. Sets 3 priorities linked to goals
5. Sets daily intention
6. Updates journal

### /evening (10-15 min)
1. Verifies date/time
2. Syncs WHOOP day strain
3. Reviews morning priorities
4. Captures wins, struggles, insights
5. **Non-negotiable:** Family connection check
6. Updates journal

### /weekly (30-45 min)
1. Pulls 7 days of WHOOP data
2. Analyzes journal patterns
3. Reviews goal progress
4. **Three Personas:**
   - 🤗 Supportive Coach
   - ⚖️ Balanced Advisor
   - 💀 Brutal Truth-Teller (don't soften!)
5. Plans next week
6. Creates review file in `04-tracking/reviews/weekly/`

### /sync
Manual data refresh from all integrations.

---

## What Needs to Be Done Next

### Immediate
- [ ] Complete Outlook OAuth (add redirect URI in Azure, run auth script)
- [ ] First `/morning` ritual to test full integration
- [ ] Populate `01-foundation/` files (history, problems, mission, values)

### Soon
- [ ] Team session with Kristyn & Dean (complete Q54-Q57 in EOS)
- [ ] Set specific Q1 2026 Rocks
- [ ] Schedule L10 meetings for January 2026
- [ ] First hire job posting

### Foundation Files Still Templates
- `01-foundation/history.md`
- `01-foundation/problems.md`
- `01-foundation/mission.md`
- `01-foundation/values.md`
- `01-foundation/narratives.md`
- `01-foundation/wisdom.md`

---

## Key Reminders

### For Daily Rituals
- Always verify date/time first (STEP 0)
- Sync external data before starting
- Link priorities to goals (G#)
- Family section is NON-NEGOTIABLE in evening

### For Weekly Reviews
- All three personas are necessary
- Don't soften the Brutal Truth-Teller
- Create review file before closing
- This is THE MOST IMPORTANT practice

### For Business Context
- EOS system in `/home/x/Life/10YearBusinessPlan/`
- L10 meetings: Monday 9:00 AM with Kristyn, Rick, Dean
- Quarterly rocks tracked in `rocks/` folder
- VTO is the strategic foundation

---

## Integration Commands

```bash
# Test weather
python3 scripts/integrations/weather.py

# Test WHOOP (needs auth completed first)
python3 scripts/integrations/whoop.py --days 1

# Complete Outlook OAuth (after adding redirect URI)
python3 scripts/integrations/outlook_auth.py

# Test Outlook calendar
python3 scripts/integrations/outlook.py --days 1
```

---

## The Most Important Thing

**Everything must trace back to a problem the user cares about solving.**

If you're helping add something that can't answer "Which problem does this solve?", question whether it belongs in the system.

---

*Last updated: 2025-12-28*
