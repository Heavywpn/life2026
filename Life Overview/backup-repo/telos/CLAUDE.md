# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a **personal life tracking system** based on the Telos Framework by Daniel Miessler. It's a structured documentation system for maintaining clarity about life purpose, goals, and daily progress.

**Not a software project** - This is a personal knowledge management system consisting entirely of markdown files and folders.

## Core Architecture

### The Telos Flow (Causal Chain)

Everything in this system follows a strict traceability chain:

```
Problems → Mission → Narratives → Goals → Challenges → Strategies → Projects → Journal
```

**Critical principle:** Every goal, strategy, or project must trace back to a fundamental problem the user cares about solving. This prevents "busy work" and maintains mission alignment.

### File Hierarchy & Relationships

```
telos.md (Single Source of Truth)
    ↓
01-foundation/ (Identity layer - rarely changes)
    ↓
02-strategic/ (Direction layer - quarterly changes)
    ↓
03-tactical/ (Execution layer - weekly changes)
    ↓
04-tracking/ (Measurement layer - weekly updates)
    ↓
05-journal/ (Temporal layer - daily updates)
    ↓
06-domains/ (Context layer - monthly updates)
    ↓
07-archive/ (Historical layer - annual archiving)
```

### Key Architectural Concepts

**1. Streaming Activity Log**
- `telos.md` is a living document that should always reflect **current reality**, not aspirations
- Updates should be continuous (weekly minimum), not event-driven
- Think of it as a real-time dashboard, not a static plan

**2. Bidirectional Traceability**
- Forward: Problem → Goal → Project (Why am I doing this?)
- Backward: Project → Strategy → Challenge → Goal → Mission → Problem (What justifies this work?)

**3. Layered Abstraction**
- **Foundation** (01-foundation/): Timeless identity and purpose
- **Strategic** (02-strategic/): Multi-year objectives
- **Tactical** (03-tactical/): Current execution
- **Tracking** (04-tracking/): Measurement and reflection
- **Journal** (05-journal/): Day-to-day logging
- **Domains** (06-domains/): Life area deep-dives

## Working with This Repository

### When Helping User Update Content

**Always maintain traceability:**
1. If adding a new goal to `02-strategic/goals.md`, verify it links to a problem in `01-foundation/problems.md`
2. If creating a project in `03-tactical/projects/active/`, ensure it implements a strategy from `03-tactical/strategies.md`
3. If suggesting changes, trace the chain both directions to ensure alignment

**Update frequency guidelines:**
- `telos.md`: Daily/weekly (Current State section especially)
- `02-strategic/goals.md`: Weekly (progress percentages)
- `03-tactical/challenges.md`: Weekly (status changes)
- `05-journal/[month].md`: Daily (new entries)
- `04-tracking/kpis.md`: Weekly (metric updates)
- `06-domains/*.md`: Monthly (deep reviews)
- `01-foundation/*.md`: Quarterly (only if fundamentals shift)

### When Creating New Content

**For new goals (in `02-strategic/goals.md`):**
- Must include: Problem link, target date, measurable success criteria, current progress %, next action
- Use ID format: G1, G2, G3...
- Must trace back to mission and problem

**For new challenges (in `03-tactical/challenges.md`):**
- Must include: Which goals it blocks, severity, status, description, current strategies addressing it
- Use ID format: C1, C2, C3...

**For new strategies (in `03-tactical/strategies.md`):**
- Must include: Which challenge it addresses, which goal it serves, success metrics, review date
- Use ID format: S1, S2, S3...

**For journal entries (in `05-journal/`):**
- Use monthly files: `YYYY-MM.md` format
- Include daily sections with: energy level, priorities, wins, struggles, insights
- Copy structure from `05-journal/daily-template.md`

**For reviews (in `04-tracking/reviews/`):**
- Weekly reviews go in `weekly/YYYY-W[##].md`
- Monthly reviews go in `monthly/YYYY-MM.md`
- Must include: goal progress, KPI check, next week priorities

### When Creating Projects

New projects should be created in `03-tactical/projects/active/` as markdown files:

```markdown
# [Project Name]

**Strategy:** → S[#]: [Strategy name]
**Goal:** → G[#]: [Goal name]
**Status:** [Planning/Active/Blocked/Complete]
**Timeline:** [Start] - [Target end]

## Objective
[What this project achieves]

## Success Criteria
- [ ] [Measurable outcome]
- [ ] [Measurable outcome]

## Current Status
[What's been done]

## Next Actions
- [ ] [Task]
- [ ] [Task]

## Blockers
[What's in the way]

## Progress Log
- [Date]: [Update]
```

When a project completes, move it from `active/` to `completed/`.

### AI Collaboration Pattern

The user is designed to share `telos.md` with AI assistants for contextually-aware help. When the user shares their `telos.md`:

1. **Understand their mission first** - Everything else flows from this
2. **Identify their active goals** - These are their current focus
3. **Notice their challenges** - Where they're stuck
4. **Suggest strategies** that align with their mission and values
5. **Help them trace backwards** - "Does this actually serve your mission?"

### Review Schedule (Critical to System Function)

The review cycle is non-negotiable for system effectiveness:
- **Weekly (30 min):** Journal review → Goal progress → Plan next week
- **Monthly (1 hour):** All weekly reviews → KPI update → One domain deep-dive
- **Quarterly (2-3 hours):** Full goal assessment → Mission check → All domains
- **Annual (half day):** Complete assessment → Archive old version → Set new year

When user mentions skipping reviews, emphasize this is the system's core mechanism.

## Important Constraints

### What NOT to Do

**Don't suggest version control:**
- The `07-archive/old-versions/` folder is for annual snapshots
- This is personal data, not collaborative code
- User may want version control, but don't assume it

**Don't over-structure:**
- User should start simple: problems → mission → goals
- Additional structure (domains, detailed tracking) comes later
- Prefer "Version 1.0 now, iterate later" over perfectionism

**Don't break traceability:**
- Never add goals without problem links
- Never create projects without strategy links
- Always ask "which problem does this solve?"

**Don't treat as software project:**
- No "setup", "build", or "run" commands
- No dependencies or testing
- This is a personal documentation system

### What TO Do

**Maintain the causal chain:**
- When editing goals, verify problem linkage
- When adding projects, ensure strategy connection
- Help user trace any activity back to core problems

**Respect the streaming log principle:**
- Suggest updates to reflect current reality
- Help user keep `telos.md` accurate and current
- Encourage weekly minimum updates

**Support the review habit:**
- Remind about review schedules when appropriate
- Help create review files in `04-tracking/reviews/`
- Encourage consistent reflection practice

**Use proper ID references:**
- Goals: G1, G2, G3...
- Challenges: C1, C2, C3...
- Strategies: S1, S2, S3...
- Problems: P1, P2, P3...
- These IDs enable traceability across files

## Custom Agents

This repository includes specialized agents in `.claude/agents/` that implement the Telos daily and weekly rituals. These agents are critical to the system's success.

### The Three Core Ritual Agents

**1. morning-ritual** (5-10 minutes, daily)
- **When to invoke:** Every morning, or when user says "help me plan my day", "morning routine", "let's start the day"
- **What it does:**
  - **STEP 0: Verifies current date/time using system date command and confirms with user** (CRITICAL - added Nov 7, 2025)
  - Reads `telos.md` and recent journal entries for context
  - Asks about energy level, sleep, and capacity
  - Guides user to set top 3 priorities linked to goals (G#)
  - Helps set daily intention (who they want to BE, not just DO)
  - Creates/updates morning section of daily journal entry
  - Ensures priorities trace back to mission
- **Key principle:** Every priority must serve a goal. If it doesn't, question whether it's truly a priority.

**2. evening-reflection** (10-15 minutes, daily)
- **When to invoke:** Every evening, or when user says "end of day", "evening reflection", "let's close out today"
- **What it does:**
  - **STEP 0: Verifies current date/time using system date command and confirms with user** (CRITICAL - added Nov 7, 2025)
  - Reviews morning priorities and asks how they went
  - Checks on fitness & body (exercise, recovery, nutrition)
  - Captures wins and celebrates progress
  - Processes frustrations and struggles
  - Captures thoughts and insights from the day
  - **MOST IMPORTANT:** Prompts for specific positive reflections about family (wife Kristyn, sons Ronin and Parker)
  - Updates evening section of daily journal entry
- **Key principle:** Family connection is non-negotiable. Push for specific moments, not generic "they were great."

**3. weekly-review** (30-45 minutes, weekly - typically Sunday)
- **When to invoke:** Every Sunday evening (or user's preferred day), or when user says "weekly review", "week in review"
- **What it does:**
  - Reads entire past week of journal entries and analyzes patterns
  - Guides through deep reflection questions about the week
  - Reviews progress on each active goal
  - Identifies energy patterns, what drained/energized, fitness consistency
  - Assesses mission alignment (what % of time served goals?)
  - Plans next week's top 3 priorities
  - **UNIQUE FEATURE:** Generates 3 distinct persona analyses:
    - **The Supportive Coach** 🤗: Kind, encouraging, celebrates effort
    - **The Balanced Advisor** ⚖️: Honest but constructive, data-driven, practical
    - **The Brutal Truth-Teller** 💀: Direct, no BS, calls out excuses and misalignment
  - Creates comprehensive weekly review file in `04-tracking/reviews/weekly/`
- **Key principle:** This is THE MOST IMPORTANT practice in the entire system. The weekly review is the learning loop that makes everything else work.

### How the Agents Work Together

```
Daily Cycle:
Morning Ritual → Set intentions aligned with mission
    ↓
Daily Action → Work on priorities
    ↓
Evening Reflection → Process day, reconnect with family
    ↓
[Repeat 7 days]
    ↓
Weekly Review → Extract patterns, get 3 perspectives, plan next week
```

### Important Context About the User

**Family:**
- Wife: **Kristyn** (not Krystina or Kristyna) - 25 years married, age 47, works full-time with Ricky in business
- **Kristyn's current focus:** Becoming Rotary club president next year, KBN (Key Business Networking) member building business friendships, PT sessions working on health at 47
- Sons: **Ronin** (20, QUT AI/Robotics master's, Brisbane, independent) and **Parker** (22, Melbourne, fashion/business, partner Liam, fostering Liam's brother)
- Family moments are a core part of the evening reflection - always prompt for specific moments with each person

**Key Staff to Track:**
- **Dean:** Navy veteran, manages Core Computers business, calm advisor on staff issues
- **Peter:** First employee (lost legs + left arm to cancer) - proof of mission model working
- **Maddy:** Young, partner of veteran, DV father, housing commission background - unreliability issue being addressed (as of Nov 5)
- **Sam:** Recently given Friday WFH, already wanting to change arrangement

**Ritual Timing:**
- Morning ritual: Start of day (before diving into work)
- Evening reflection: End of day (before bed, after family time)
- Weekly review: Sunday evenings preferred (sacred time for reflection)

### When Working with These Agents

**If user skips daily rituals:**
- Gently remind that the system works through consistent practice
- Even 5 minutes of morning + evening is better than skipping

**If user skips weekly review:**
- This is NON-NEGOTIABLE - emphasize strongly
- Weekly review is where daily data becomes wisdom
- Without it, they're just collecting journal entries, not learning

**The Three Personas (Weekly Review):**
- All three are necessary - don't soften the Brutal Truth-Teller
- Different weeks need different voices
- The discomfort from Persona 3 is intentional and therapeutic
- Uses actual data from the week (completion %, goals ignored, specific patterns)

**Traceability in Rituals:**
- Morning: Every priority must link to a goal (G#)
- Evening: Reflects on whether priorities served mission
- Weekly: Analyzes alignment % - did the week actually move goals forward?

## Quick Reference

**User needs help starting:** → Point to `GETTING-STARTED.md`
**User asks about philosophy:** → Reference `README.md` and the Problems → Mission → Goals flow
**User wants quick lookup:** → Point to `SYSTEM-OVERVIEW.md`
**User shares telos.md for advice:** → Read mission/goals first, suggest aligned with their values
**User asks about review process:** → Emphasize weekly review is non-negotiable, reference review templates
**User wants daily ritual:** → Suggest `/agents morning-ritual` or `/agents evening-reflection`
**User mentions it's Sunday/review time:** → Proactively suggest `/agents weekly-review`

## Current Telos Setup Status (as of 2025-11-04)

### Completed Foundation Work

Ricky has completed the initial Telos foundation setup. The following files are populated with his personal context:

**✅ `/01-foundation/history.md`** - Complete personal history including:
- Born 1976 Mackay, Queensland
- Army service 1994-2004 (Infantry, East Timor deployment, medically discharged)
- Extensive injuries (13 bolts in leg, extreme tinnitus, wheelchair time)
- Family: Wife Kristyn (25 years), sons Parker (22, Melbourne) & Ronin (20, QUT)
- Career: Founded Venturer Technology solo → now one of Brisbane's largest MSPs
- Recent: Sabre (dog) passed 4 months ago, started ice bath routine for drinking habit

**✅ `/01-foundation/problems.md`** - Three core problems identified:
- **P1:** People being left behind by systems that should protect them (veterans, disabilities, charities)
- **P2:** Integrity and service replaced by greed in business (IT industry specifically)
- **P3:** People/businesses vulnerable to cyber threats they can't defend against

**✅ `/01-foundation/mission.md`** - Mission articulated:
- "I exist to protect and serve people who've been failed, broken, or exploited by systems that should have helped them - by proving every single day that integrity, service, and disability don't stop you from building something powerful."
- Five execution methods: hire discarded people, protect vulnerable, serve charities, model integrity, travel/experience life

**✅ `/home/rick/life/telos/telos.md`** - Main context file populated with summaries of above

### TruMethods/EOS Integration (Completed)

**✅ Business Planning Structure Created** - Goals are now integrated with EOS methodology

Ricky's goals follow the Entrepreneurial Operating System (EOS) framework with TruMethods methodology. The business planning files have been created and linked to the Telos mission:

**✅ `/home/rick/life/trumethods/10yearBusinessPlan/10-year/vision-2034.md`**
- 10-year target when Ricky will be ~58 years old
- Business vision: 16+ staff, $5-10M turnover, 3 office locations, foundation model operational
- Personal vision: Manager running operations, Kristyn exited to own projects, travel/family time, legacy documented
- Everything linked to Telos mission (P1, P2, P3)

**✅ `/home/rick/life/trumethods/10yearBusinessPlan/3-year/picture-2027.md`**
- 3-year checkpoint (halfway to 10-year vision)
- Targets: 8-10 staff, $2-3M turnover, 60-70% MRR/ARR
- North QLD office open, foundation designed and piloting
- Manager identified and in training, Ricky 30-40% less day-to-day
- Personal: 3 years ice bath routine, 150+ weekly reviews completed, Kristyn planning exit

**✅ `/home/rick/life/trumethods/10yearBusinessPlan/1-year/plan-2025-2026.md`**
- Current 12-month action plan (Nov 2025 - Nov 2026)
- Business goals: Hire 2-3 mission-aligned staff, increase MRR/ARR, foundation research/design, manager identification, North QLD scouting
- Personal goals: Ice bath 90%+ consistency (330+ days), drinking control maintained, 52 weekly reviews, 1 significant trip with Kristyn
- Family support: Parker & Ronin connections, Kristyn Rotary presidency support

**✅ `/home/rick/life/trumethods/10yearBusinessPlan/quarterly-rocks/2025-Q1-Nov-Jan.md`**
- Q1 2025 Rocks (November 2025 - January 2026) - 7 specific 90-day priorities
- **Rock 1:** Hire 1 mission-aligned staff member
- **Rock 2:** Increase MRR by $X (needs specific number from Ricky)
- **Rock 3:** Research foundation legal structures (3 consultations)
- **Rock 4:** Maintain ice bath routine 90%+ days (81+ of 90 days)
- **Rock 5:** Complete Telos foundation files (values.md, narratives.md)
- **Rock 6:** Plan Kristyn trip (destination decided, dates blocked)
- **Rock 7:** Scout 1-2 North QLD locations
- Weekly check-ins: Green/Yellow/Red status tracking
- All rocks trace back to specific Telos problems and mission

**✅ `/home/rick/life/telos/telos.md` Goals Section Updated**
- Goals section now references all TruMethods/EOS planning files
- Clear hierarchy: 10-year → 3-year → 1-year → quarterly rocks
- Every 90 days new rocks are set based on progress

### Integration Points Between Systems

**Telos → TruMethods Flow:**
```
Problems (P1, P2, P3) in telos.md
    ↓
Mission in telos.md
    ↓
10-Year Vision (2034) - Proves mission at scale
    ↓
3-Year Picture (2027) - Validation checkpoint
    ↓
1-Year Plan (2025-2026) - Current focus
    ↓
Quarterly Rocks (Q1 2025) - 90-day execution
    ↓
Daily Journal - Action and reflection
```

**When working with Rocks (Quarterly Priorities):**
- Each Rock must link to Telos mission (shown in Rock summary tables)
- Mix of business + personal rocks (typically 4-5 business, 2-3 personal)
- Weekly check-ins using Green/Yellow/Red status
- End of quarter: score each rock (100%, 75-99%, 50-74%, <50%)
- Use quarterly review to set next quarter's rocks

### ⚠️ SESSION RESTART POINT - START HERE ⚠️

**Last Session Completed:** 2025-11-19 (Wednesday morning - morning ritual)
**Status:** Daily practice IN PROGRESS - Week 3, Day 16 of Q1

**CURRENT STATE (as of Wednesday Nov 19, 2025 morning - 0530):**

**✅ Completed:**
- Telos foundation files (history, problems, mission) ✅
- TruMethods business planning (10-year vision, 3-year picture, 1-year plan) ✅
- Q1 2025 Rocks (7 specific 90-day priorities) ✅
- All systems cross-referenced in telos.md ✅
- **Agent date verification fix** ✅ (Nov 7 - both morning-ritual and evening-reflection verify date before proceeding)
- **Weekly reviews:** ✅ Week 1 (Nov 4-10) completed Nov 11 | ✅ Week 2 (Nov 11-17) completed Nov 17
- **Daily practice tracking:**
  - Morning rituals: Building consistency through Week 3
  - Evening reflections: Ongoing through Week 3

**📊 Q1 Progress (Day 16 of 90 - Wednesday Nov 19):**

**Rock #4 Status (Ice Bath/Cold Exposure 90%+):** 🟢 GREEN
- Target: 81+ days out of 90 (can miss maximum 9 days)
- As of Nov 18: 10/15 days completed (66.7%)
- Strong pattern re-established after Week 2
- **PROTOCOL:** 4-5 minutes ice bath (down from 3-10 min) per medical advice to reduce cardiovascular load at age 49
- **Pattern HOLDING:** Ice bath → no drinking → quality time with Kristyn

**Rock #5 Status (Business Plan & Telos Files):** 🎉 MAJOR PROGRESS
- **HUGE WIN:** 10-year, 3-year, 1-year business plan COMPLETED ✅
- Values.md: Template exists, needs Ricky's content
- Narratives.md: Template exists, needs Ricky's content

**Alcohol Control Progress:**
- Pattern from Week 1-2: Ice bath routine helping control nightly drinking habit
- Social/controlled drinking vs nightly habit he's breaking - clear distinction maintained
- Week 2 review noted: Strong alcohol discipline throughout the week

**✅ WEEKLY REVIEWS COMPLETED:**
- Week 1 (Nov 4-10): Completed Nov 11, 2025 - 65% mission alignment, business plan milestone
- Week 2 (Nov 11-17): Completed Nov 17, 2025 - 90%+ mission alignment, discipline building week, Remembrance Day $40K+ raised, Farm Angels Chinchilla trip

**📋 Staff Situation to Track:**
- **Maddy:** Partner of veteran, DV father, housing commission background (fits P1 mission). Unreliability issues being addressed. Plan: Sit down conversation with Dean, start advertising per Dean's advice
- **Sam:** Wanting to change Friday WFH arrangement after one day (doesn't suit business)
- **Dean:** Navy vet, Core Computers manager - calm approach, good advisor on staff issues

**🎯 Your Q1 Rocks (Nov 2025 - Jan 2026):**
1. Hire 1 mission-aligned staff member (Dean's advice: advertise now)
2. Increase MRR by $X *(needs your revenue data)*
3. Research foundation legal structures (3 consultations)
4. Maintain ice bath routine 90%+ days (81+ of 90 days) - 🟢 GREEN (83.3% through Day 6)
5. Complete Telos foundation files - 🎉 BUSINESS PLAN DONE! Still need values.md, narratives.md
6. Plan Kristyn trip (destination decided)
7. Scout 1-2 North QLD locations

**CURRENT WEEK (Week 3, Nov 18-24):**
- Day 16 of 90 in Q1
- Morning ritual completed Nov 19 ✅
- Today's priorities: Maddy conversation, Dean pricing discussion, Annaley meeting prep

**CRITICAL AGENT FIX (Nov 7, 2025):**
Both morning-ritual and evening-reflection agents now have **STEP 0: VERIFY DATE & TIME** that runs system date command and confirms with user BEFORE proceeding. This fixes the date confusion issue that happened Nov 6-7.

**HEALTH PROTOCOL UPDATE (Nov 10, 2025):**
Ice bath protocol adjusted to 4-5 minutes (down from 3-10 minutes) with less time underwater, based on medical advice to reduce cardiovascular load at age 49. Update all future ice bath discussions to reflect this protocol.

---

**Context Files to Review Before Responding:**
1. `/home/rick/life/telos/telos.md` - Main context file
2. `/home/rick/life/telos/01-foundation/history.md` - Full personal history (AGE: 49, not 48)
3. `/home/rick/life/telos/01-foundation/problems.md` - Three core problems
4. `/home/rick/life/telos/01-foundation/mission.md` - Mission statement
5. `/home/rick/life/trumethods/10yearBusinessPlan/quarterly-rocks/2025-Q1-Nov-Jan.md` - Current quarter priorities
6. `/home/rick/life/telos/05-journal/2025-11.md` - Current journal (Week 3 in progress)
7. `/home/rick/life/telos/04-tracking/reviews/weekly/` - Completed weekly reviews

### What's Still Needed

**Foundation Files (Rock 5 Target):**
- `/01-foundation/values.md` - Deep dive on 5 core values
- `/01-foundation/narratives.md` - Identity stories and limiting beliefs

**Q1 Rocks Finalization:**
- Rock 2 needs specific MRR increase target (requires current revenue data from Ricky)
- All rocks have weekly action items but actual execution dates to be determined

**Telos Practice Status:**
- ✅ Weekly review sessions: Week 1 completed Nov 11, Week 2 completed Nov 17
- ✅ Morning ritual: Nov 19 completed (building consistency)
- ✅ Evening reflection: Ongoing through Week 3
- ✅ Daily ice bath tracking: 10/15 days (66.7%) - strong pattern re-established
- ✅ Diet tracking: Breakfast/supplements (morning), snacks/coffee (evening)

### Critical Context for Working with Ricky

**Personal Details:**
- Prefers "Ricky" (Army nickname "Prouty")
- **Age: 49** (born 1976, not 48)
- Wife: **Kristyn** (not Krystina) - 25 years married, works with him full-time
- Sons: **Parker** (22, openly gay, fostering Liam's brother), **Ronin** (20, AI/Robotics masters at QUT)
- Recent loss: **Sabre** (Siberian Husky, 14 years, passed ~July 2024) - still grieving

**Physical Reality:**
- Constant pain: leg (13 bolts + plate), ribs (misaligned fractures), arm (doesn't bend)
- **Tinnitus 24/7** - "gives me no peace" - major factor in drinking habit
- Wheelchair time was "extremely depressing"
- He IS a person with disabilities who succeeded - not just an advocate

**Current Active Work:**
- Ice baths nightly (4-5 min at 4°C) - Protocol established, working well
- Drinking reduced to social occasions only (was 4-6 nights/week, full bottle wine)
- Still craves drink nightly (root causes: tinnitus, racing thoughts, pain)
- Goal: control the problem, not replace it
- Pattern: Ice bath → no drinking → quality time with Kristyn

**Mission Context:**
- First employee: **Peter** (lost legs + left arm to cancer) - hired because Ricky had been in wheelchair
- Venturer Technology hiring model: ONLY veterans, people with disabilities, or life-changers
- Charity work: Treasurer of Clayfield Toombul Subbranch, Rotary (Kristyn = president next year), hosts Connecting Charities (90+ attendees, 5th year)
- East Timor trauma drives everything - witnessed exploitation, cannot unsee it

**Communication Style:**
- Direct, honest, no BS
- Raw about struggles (drinking, pain, grief)
- Fiercely protective of mission integrity
- Values action over talk ("prove through action")

### Files Still Need Population

After goals are set, these files will need attention:
- `/01-foundation/values.md` - Deep dive on 5 core values
- `/01-foundation/narratives.md` - Identity stories and limiting beliefs
- `/02-strategic/goals.md` - Detailed goal tracking
- `/03-tactical/challenges.md` - Obstacles blocking goals
- `/03-tactical/strategies.md` - Approaches to overcome challenges
- `/04-tracking/kpis.md` - Key metrics for mission and health
- `/06-domains/health.md` - Detailed health tracking (pain, ice baths, drinking, fitness)
- `/06-domains/relationships.md` - Kristyn, Parker, Ronin, Sabre loss

---

## The Most Important Thing

**Everything must trace back to a problem the user cares about solving.**

If you're helping add something that can't answer "Which problem does this solve?", question whether it belongs in the system.
