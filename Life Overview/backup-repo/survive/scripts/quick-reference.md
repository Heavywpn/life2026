# Quick Reference Guide

## Daily Commands

### Starting a New Book
```bash
# Copy template
cp books/TEMPLATE.md "books/in-progress/[book-title].md"

# Edit the file
nano "books/in-progress/[book-title].md"

# Add to reading log
nano resources/reading-log.md
```

### Adding a Podcast Episode
```bash
# Copy template
cp podcasts/TEMPLATE.md "podcasts/summaries/[podcast-episode].md"

# Add to podcast log
nano resources/podcast-log.md

# If you have transcript
nano "podcasts/transcripts/[podcast-episode].txt"
```

### Creating a New Skill
```bash
# Copy skill template
cp skills/SKILL-TEMPLATE.md "skills/[category]/[skill-name].md"

# Add to index
nano skills/INDEX.md
```

### Planning a Field Test
```bash
# Create field test log
nano "experiments/field-tests/$(date +%Y-%m-%d)-[technique].md"
```

### Creating an Analysis
```bash
# Copy analysis template
cp analysis/ANALYSIS-TEMPLATE.md "analysis/[topic-name].md"
```

### Adding a Content Creator
```bash
# Copy creator template
cp creators/CREATOR-PROFILE-TEMPLATE.md "creators/profiles/[creator-name].md"

# Edit the profile
nano "creators/profiles/[creator-name].md"

# Add to master list
nano creators/content-logs/creators-master-list.md
```

## File Organization

### Directory Structure
```
survive/
├── books/
│   ├── completed/          # Finished books
│   ├── in-progress/        # Currently reading
│   ├── to-read/            # Queue
│   └── TEMPLATE.md         # Book template
│
├── podcasts/
│   ├── transcripts/        # Raw transcripts
│   ├── summaries/          # Episode notes
│   ├── to-listen/          # Queue
│   └── TEMPLATE.md         # Podcast template
│
├── creators/
│   ├── profiles/           # Creator biographies
│   ├── content-logs/       # Tracking and master list
│   └── CREATOR-PROFILE-TEMPLATE.md  # Profile template
│
├── skills/
│   ├── wilderness/         # Survival skills
│   ├── homesteading/       # Self-sufficiency
│   ├── tactical/           # Navigation, security
│   ├── medical/            # First aid, trauma
│   ├── tools/              # Equipment skills
│   ├── mental/             # Mindset, resilience
│   ├── INDEX.md            # Master skills list
│   └── SKILL-TEMPLATE.md   # Skill template
│
├── experiments/
│   ├── field-tests/        # Test logs
│   ├── gear-reviews/       # Equipment evaluation
│   └── technique-validation/ # Comparative testing
│
├── resources/
│   ├── checklists/         # Quick reference lists
│   ├── reference/          # Guides and manuals
│   ├── field-manuals/      # Military FMs
│   ├── reading-log.md      # Book tracking
│   └── podcast-log.md      # Podcast tracking
│
├── analysis/
│   ├── deep-dives/         # Topic research
│   ├── synthesis/          # Cross-source integration
│   └── cross-reference/    # Comparative analysis
│
└── scripts/
    ├── transcript-analyzer.md
    ├── book-analysis-workflow.md
    ├── field-test-protocol.md
    └── quick-reference.md (this file)
```

## Workflow Cheatsheet

### Book Processing
1. Add to reading-log.md (To Read queue)
2. Start reading → Create file in books/in-progress/
3. Extract techniques → Create skill files
4. Complete book → Move to books/completed/
5. Update reading-log.md with rating/takeaways

### Podcast Processing
1. Add to podcast-log.md (To Listen queue)
2. Listen + get transcript → Save to podcasts/transcripts/
3. Create summary → Use podcasts/TEMPLATE.md
4. Extract techniques → Create/update skill files
5. Update podcast-log.md with key topics

### Skill Development
1. Identify skill from source
2. Create skill file (if new)
3. Document technique from source
4. Add to skills/INDEX.md
5. Schedule field test
6. Conduct test → Log in experiments/
7. Update skill file with validation results

### Analysis Creation
1. Identify topic needing deep dive
2. Gather all sources (books, podcasts, experience)
3. Create analysis file in analysis/
4. Compare approaches across sources
5. Synthesize best practices
6. Document recommendations

## Common Tags

Use these in notes for easy searching:

### Priority
- `#PRIORITY-HIGH` - Critical skill
- `#PRIORITY-MED` - Important skill
- `#PRIORITY-LOW` - Nice to have

### Status
- `#TO-PRACTICE` - Needs field work
- `#FIELD-TEST` - Ready for testing
- `#VALIDATED` - Tested and confirmed
- `#MODIFIED` - Adapted version
- `#REJECTED` - Doesn't work as claimed

### Category
- `#WILDERNESS` - Outdoor survival
- `#HOMESTEAD` - Self-sufficiency
- `#TACTICAL` - Navigation/security
- `#MEDICAL` - First aid/health
- `#TOOLS` - Equipment/gear
- `#MENTAL` - Mindset/psychology

### Context
- `#MILITARY-DIFF` - Differs from service
- `#MILITARY-SAME` - Aligns with service
- `#GEAR-NEEDED` - Requires equipment
- `#NO-GEAR` - Improvised/primitive
- `#QUESTION` - Needs research
- `#CROSS-REF` - Check other sources

## Weekly Review Process

### Sunday Evening (30 minutes)
```markdown
## Weekly Review - [Date]

### This Week's Progress
- Books read: [X] pages / [Y] chapters
- Podcasts listened: [X] episodes
- Skills documented: [X]
- Field tests conducted: [X]
- Analysis completed: [X]

### Key Learnings
1.
2.
3.

### What Worked
-
-

### What Didn't Work
-
-

### Next Week's Focus
- [ ] Book: Continue/start [title]
- [ ] Podcast: Listen to [episode]
- [ ] Skill: Practice [technique]
- [ ] Field test: [technique]
- [ ] Analysis: [topic]

### Adjustments Needed
-
-
```

## Monthly Maintenance

### First of Month Tasks
- [ ] Rotate supplies/gear check
- [ ] Review quarterly goals progress
- [ ] Archive completed work
- [ ] Update skills proficiency levels
- [ ] Review and prioritize technique queue
- [ ] Plan next month's field tests

### Monthly Report Template
```markdown
## Monthly Report - [Month Year]

### Metrics
- Books completed: [X]
- Podcasts analyzed: [X]
- New skills documented: [X]
- Skills validated: [X]
- Field tests: [X]
- Analysis reports: [X]

### Highlights
Most valuable book:
Most valuable podcast:
Most useful skill learned:
Best field test:

### Challenges
-
-

### Gaps Identified
Knowledge gaps:
-

Skill gaps:
-

Equipment needs:
-

### Next Month Focus
1.
2.
3.
```

## Emergency Quick Access

### Core Survival Priorities
1. **Shelter** - Protection from elements (3 hours)
2. **Water** - Hydration (3 days)
3. **Fire** - Warmth, purification, signal (varies)
4. **Food** - Energy (3 weeks)
5. **Security** - Safety, navigation, signaling

### The 5 Cs (Always Have)
- Cutting tool (knife)
- Combustion device (fire)
- Cover (shelter/clothing)
- Container (water)
- Cordage (rope/paracord)

### Rule of 3s
- 3 minutes without air
- 3 hours without shelter (harsh conditions)
- 3 days without water
- 3 weeks without food

### STOP Principle
- **S**top - Don't panic
- **T**hink - Assess situation
- **O**bserve - Survey resources
- **P**lan - Make decisions

## File Naming Conventions

### Books
`[author-lastname]-[short-title].md`
Example: `canterbury-bushcraft-101.md`

### Podcasts
`[podcast-name]-ep[number]-[topic].md`
Example: `survival-podcast-ep42-water-purification.md`

### Skills
`[skill-name].md` (lowercase, hyphens)
Example: `bow-drill-fire.md`

### Field Tests
`[YYYY-MM-DD]-[technique-name].md`
Example: `2025-11-15-bow-drill-fire.md`

### Analysis
`[topic-name]-analysis.md`
Example: `water-purification-methods-analysis.md`

## Search Tips

### Find all references to a technique
```bash
grep -r "bow drill" .
```

### Find all high priority items
```bash
grep -r "#PRIORITY-HIGH" .
```

### Find all validated skills
```bash
grep -r "#VALIDATED" skills/
```

### Find all field tests for a skill
```bash
grep -r "[skill-name]" experiments/field-tests/
```

### Find cross-references
```bash
grep -r "Related:" books/ podcasts/
```

## Project Philosophy

**Collect** → **Validate** → **Practice** → **Master**

- Read/listen broadly
- Test critically
- Practice deliberately
- Document thoroughly
- Share responsibly

Remember: Knowledge without practice is just theory. Practice without knowledge is just luck. Combine both with your military experience for true competence.
