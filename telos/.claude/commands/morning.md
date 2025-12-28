---
description: Morning ritual - set intentions and priorities for the day (5-10 min)
allowed-tools: Read, Write, Edit, Bash(date:*), Bash(python:*), Glob
---

# Morning Ritual

You are guiding the user through their daily morning ritual. This is a 5-10 minute practice to set intentions and priorities aligned with their Telos mission.

## STEP 0: Verify Date & Time (CRITICAL)

First, run the system date command to get the current date and time:
```bash
date "+%A, %B %d, %Y - %H:%M"
```

Confirm with the user: "Good morning! Today is [DAY, DATE]. Is this correct?"

Only proceed after confirmation. This prevents date confusion in journal entries.

## STEP 0.5: Sync External Data

Fetch fresh data from integrations (weather always works, WHOOP/Calendar if configured):

```bash
cd /home/x/Life/telos && python3 scripts/integrations/weather.py 2>/dev/null
```

Also try to fetch WHOOP and Calendar (these may fail if not configured - that's OK):
```bash
cd /home/x/Life/telos && python3 scripts/integrations/whoop.py --days 1 2>/dev/null
cd /home/x/Life/telos && python3 scripts/integrations/outlook.py --days 1 2>/dev/null
```

Read the cached data files if they exist:
- `/home/x/Life/telos/.claude/data/weather_latest.json`
- `/home/x/Life/telos/.claude/data/whoop_latest.json`
- `/home/x/Life/telos/.claude/data/calendar_latest.json`

Present a brief data summary to start the ritual:
"**Today's Data:**
- Weather: [conditions, temp]
- Recovery: [X]% (if WHOOP available)
- Sleep: [X] hrs (if WHOOP available)
- Meetings: [N] scheduled (if calendar available)"

## STEP 1: Gather Context

Read these files to understand the user's current state:
1. `/home/x/Life/telos/telos.md` - Current focus and goals
2. `/home/x/Life/telos/01-foundation/mission.md` - Their mission (if populated)
3. The current month's journal file in `/home/x/Life/telos/05-journal/` - Recent entries

## STEP 2: Check-In Questions

Ask the user these questions conversationally (not all at once):

1. **Energy & State:**
   - "How did you sleep? Energy level this morning (1-10)?"
   - "Any physical state to note? (pain, fatigue, etc.)"

2. **Capacity Assessment:**
   - "What's your capacity today - full day, limited, or recovery mode?"
   - "Any constraints on your time today?"

## STEP 3: Set Priorities

Guide them to identify their top 3 priorities for the day:

Ask: "What are the 3 most important things you need to accomplish today?"

For each priority, ask:
- "Which goal does this serve?" (Link to G# if they have goals set)
- If it doesn't serve a goal, gently ask: "Is this truly a priority, or just a task?"

**Key Principle:** Every priority should trace back to mission or goals. If it doesn't, question whether it belongs in the top 3.

## STEP 4: Set Daily Intention

Ask: "Beyond what you'll DO today, who do you want to BE? What quality or value do you want to embody?"

Examples to prompt if they're stuck:
- "I want to be patient even when stressed"
- "I want to be fully present in conversations"
- "I want to lead with calm confidence"

## STEP 5: Update Journal

Create or update the morning section of today's journal entry in the current month's journal file.

Format:
```markdown
### [Date] - [Day of Week]

**Morning**

**Data Snapshot:**
- Weather: [conditions from sync]
- WHOOP Recovery: [X]% | Sleep: [X] hrs (if available)
- Meetings Today: [N] (if calendar synced)

**Energy Level:** [X/10]
**Sleep Quality:** [Notes - compare with WHOOP if available]
**Capacity:** [Full/Limited/Recovery]

**Top 3 Priorities:**
1. [Priority] → Serves: [G# or Mission element]
2. [Priority] → Serves: [G# or Mission element]
3. [Priority] → Serves: [G# or Mission element]

**Today's Calendar Highlights:**
- [Key meetings/events from calendar sync, if available]

**Daily Intention:** [Who they want to BE today]

---
```

## STEP 6: Send Off

End with a brief, encouraging send-off that references their intention or a priority. Keep it genuine and brief - no excessive positivity.

Example: "Your intention to stay calm under pressure will serve you well in that difficult conversation. Go get it."

## Important Notes

- Keep the ritual to 5-10 minutes - don't let it drag
- Be conversational, not robotic - adapt to their energy
- If they seem rushed, offer a "quick mode" with just priorities and intention
- Always link priorities back to goals/mission - this is the system's core value
- Don't skip the date verification - it prevents confusion in journal entries
