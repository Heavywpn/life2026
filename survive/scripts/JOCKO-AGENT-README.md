# Jocko Accountability Agent - Quick Start Guide

## What Is This?

A no-nonsense accountability system based on Jocko Willink's philosophy of extreme ownership, discipline, and personal responsibility. It gives you a morning motivation kick and a nightly accountability check-in.

## Core Philosophy

**"Discipline equals freedom"**

- Take extreme ownership of everything in your life
- No excuses, no blame, no rationalization
- Execute on your commitments
- Push through things that suck
- Get better every single day

## Installation

The scripts are already installed in your survive project:
```
/home/rick/life/survive/scripts/morning
/home/rick/life/survive/scripts/night
```

## Daily Usage

### Morning Routine (0400-0800)

Run the morning script to set your daily priorities:

```bash
~/life/survive/scripts/morning
```

This will:
1. Ask for your **3 top priorities** for the day
2. Get your **physical commitment** (workout/training)
3. Identify the **hardest task** (which you'll do FIRST)
4. Log everything to a daily accountability file
5. Give you a discipline reminder

**Time commitment:** 2-3 minutes

### Night Routine (1900-2300)

Run the night script to review your day:

```bash
~/life/survive/scripts/night
```

This will:
1. Show your morning commitments
2. Ask if you **executed** on each priority
3. Check if you did your **physical work**
4. Make you identify **excuses** you made
5. Ask what you **avoided** today
6. Get your **commitment** for tomorrow
7. Append everything to your daily log

**Time commitment:** 5-7 minutes

## Quick Access Setup

Add these aliases to your `~/.bashrc` or `~/.zshrc`:

```bash
# Jocko Accountability Agent
alias morning='~/life/survive/scripts/morning'
alias night='~/life/survive/scripts/night'
alias jocko='cat ~/life/survive/scripts/jocko-agent.md | less'
```

Then reload:
```bash
source ~/.bashrc  # or source ~/.zshrc
```

Now you can just type:
- `morning` - Run morning protocol
- `night` - Run night accountability
- `jocko` - Read full agent documentation

## Daily Logs

All your accountability sessions are logged to:
```
~/life/survive/experiments/daily-logs/accountability-YYYY-MM-DD.md
```

Each log contains:
- Morning priorities and commitments
- Night execution results
- Truth checks on excuses
- What you avoided
- Tomorrow's specific commitment

### Review Your Logs

```bash
# View today's log
cat ~/life/survive/experiments/daily-logs/accountability-$(date +%Y-%m-%d).md

# List all logs
ls -lh ~/life/survive/experiments/daily-logs/

# Search for patterns (e.g., how often you make excuses)
grep -i "excuses" ~/life/survive/experiments/daily-logs/*.md

# Count completed priorities over time
grep "Priority.*: y" ~/life/survive/experiments/daily-logs/*.md | wc -l
```

## Key Principles

### Morning Focus
- **3 priorities only** - Not 10 things. Three things that matter.
- **Do the hardest thing FIRST** - Attack it before anything else.
- **Physical commitment** - Move your body. Get stronger every day.

### Night Focus
- **Extreme ownership** - Everything is YOUR fault. Own it.
- **No excuses** - Identify where you rationalized today.
- **Truth check** - Did you actually execute, or did you make excuses?
- **Specific commitment** - What EXACTLY will you do differently tomorrow?

## Common Mistakes to Avoid

1. **Being vague with priorities**
   - Bad: "Work on project"
   - Good: "Write 1000 words of chapter 3"

2. **Making excuses in the night review**
   - The point is to catch yourself making excuses
   - Be brutally honest
   - Your ego will fight you - push through it

3. **Skipping the physical commitment**
   - If you can't do one pull-up, hang on the bar
   - Start small, build consistency
   - No negotiations

4. **Not doing the hardest thing first**
   - That's when your discipline is highest
   - Attack it in the morning
   - Everything else gets easier after

## Integration with Survival Project

This agent ensures you **EXECUTE** on what you learn:

- Reading a survival book? What skill did you PRACTICE today?
- Listened to a podcast? What technique did you IMPLEMENT?
- Made a plan? Did you EXECUTE on it?

**Knowledge without action is useless.**

## Weekly Review (Optional)

Every Sunday, review your week:

```bash
# View all logs from this week
ls -lh ~/life/survive/experiments/daily-logs/accountability-$(date +%Y-%m)*

# Count your wins
grep -c "Priority.*: y" ~/life/survive/experiments/daily-logs/accountability-$(date +%Y-%m)*.md

# Identify patterns in excuses
grep "Excuses Made" -A 2 ~/life/survive/experiments/daily-logs/accountability-$(date +%Y-%m)*.md
```

Ask yourself:
- How many priorities did I complete this week?
- What excuses do I keep making?
- What am I consistently avoiding?
- Am I getting better or just staying comfortable?

## Troubleshooting

**Q: I keep skipping the morning routine**
- A: That's an excuse. Do you actually want this or not? If yes, execute. If no, admit it.

**Q: The night review is uncomfortable**
- A: Good. That means it's working. Extreme ownership hurts, but it's also liberating.

**Q: I'm not making progress**
- A: Are you actually executing on your priorities, or just planning? Review your logs honestly.

**Q: This seems harsh**
- A: It's not harsh. It's honest. You can handle honest feedback. The question is: do you want to get better?

## Remember

"You can decide who you want to become and you can become that person through hard work and through discipline."

"If you have discipline, you will attain freedom."

Now get after it.

---

## Files in This System

- `jocko-agent.md` - Full persona documentation and philosophy
- `morning` - Morning accountability script
- `night` - Night accountability script
- `JOCKO-AGENT-README.md` - This guide
- `../experiments/daily-logs/accountability-*.md` - Your daily logs

## Support

This is a self-accountability system. There is no support. There is only execution.

If something breaks, fix it. That's extreme ownership.
