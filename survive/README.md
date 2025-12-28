# Survival Knowledge Project

## Overview
A comprehensive project for tracking, analyzing, and synthesizing practical survival techniques and off-the-grid living knowledge. Combines military experience with civilian survival expertise from books, podcasts, and field practice.

## Mission
To build a personal knowledge base of actionable survival skills that bridge military training with practical homesteading, wilderness survival, and self-sufficiency techniques.

## Project Goals
- Track and analyze survival books with key takeaways
- Collect and transcribe survival podcast episodes
- Extract actionable techniques and skills
- Cross-reference knowledge across sources
- Build practical skill checklists
- Document personal experiments and field tests
- Integrate military knowledge with civilian survival tactics

## Core Focus Areas
1. **Wilderness Survival** - Shelter, fire, water, food procurement
2. **Homesteading & Self-Sufficiency** - Gardening, animal husbandry, food preservation
3. **Tactical Skills** - Navigation, situational awareness, security, OPSEC
4. **Medical & First Aid** - Field medicine, trauma care, herbal remedies
5. **Tools & Equipment** - Maintenance, improvisation, essential gear
6. **Mental Resilience** - Stress management, decision-making under pressure
7. **Cyber Security & Digital OPSEC** - Digital preparedness, online security, privacy
8. **Fitness & Conditioning** - Tactical fitness, functional strength, endurance training
9. **Nutrition & Food Preparedness** - Performance nutrition, food storage, field meal planning

## Directory Structure
```
survive/
├── books/              # Book notes and analysis
│   ├── completed/      # Finished books
│   ├── in-progress/    # Currently reading
│   ├── to-read/        # Reading queue
│   └── life-changing/  # Books that fundamentally changed perspective or approach
├── podcasts/           # Podcast transcripts and summaries
├── creators/           # Content creator profiles and tracking
├── skills/             # Categorized skill documentation
├── experiments/        # Field test logs and results
├── resources/          # Reference materials and checklists
└── analysis/           # Deep dives and synthesis reports
```

## Quick Start
Run the initialization script to set up the project structure:
```bash
bash .init
```

## Tracking System
- Each book gets a markdown file with structured notes
- **Life-Changing Books:** Special section at `books/life-changing/` for books that fundamentally transformed perspective, behavior, or approach
  - Master list: `books/life-changing/LIFE-CHANGING-BOOKS-MASTER.md`
  - Detailed analyses with before/after comparisons
  - Integration with survival project learnings
  - 8 categories: Mental Resilience, Survival, Learning, Philosophy, Health, Leadership, Technical, Homesteading
- Podcasts are transcribed and analyzed for key insights
- **Podcast Index:** Fast retrieval system at `podcasts/INDEX.md` with searchable tags
- Content creators have comprehensive profiles tracking their work
- Skills are extracted and cross-referenced
- Progress tracked through regular reviews

## Content Creators
The project tracks key survival, preparedness, and tactical content creators to systematically learn from their expertise:
- **Mike Glover** (Mike Force Podcast) - Former SF, FieldCraft Survival CEO
  - Profile: `creators/profiles/mike-glover.md`
  - Focus: Tactical preparedness, survival, medical training
  - Credibility: Verified Special Forces background

- **Tim Ferriss** (The Tim Ferriss Show) - Author, Entrepreneur, Podcast Host
  - Profile: `creators/profiles/tim-ferriss.md`
  - Focus: Peak performance, mental resilience, learning strategies
  - Credibility: 5 #1 NYT bestsellers, 1B+ podcast downloads
  - Value: World-class performers' tactics, mental optimization frameworks

Each creator profile includes:
- Background and credentials verification
- Content tracking (episodes, books mentioned, skills taught)
- Credibility assessment and potential biases
- Cross-reference with military experience
- Gear recommendations and validation
- Integration guidelines for project use

## Analysis Approach
1. **Collection** - Gather raw material (books, transcripts)
2. **Extraction** - Pull out specific techniques and skills
3. **Validation** - Cross-reference with military experience
4. **Categorization** - Organize by skill area
5. **Synthesis** - Identify patterns and best practices
6. **Application** - Document field testing results

## Resources Integration
- YouTube survival channels
- Podcast series (survival, homesteading, preparedness)
- Military field manuals
- Historical survival accounts
- Modern preparedness literature

## Progress Tracking
Use `resources/reading-log.md` and `resources/podcast-log.md` to maintain current progress.

## Fast Retrieval System

### Podcast Transcripts & Analyses
All podcast content is indexed for fast retrieval at `podcasts/INDEX.md`.

**Quick search examples:**
```bash
# Search by tag
grep "#cybersecurity" podcasts/INDEX.md

# Search by guest or topic
grep -i "infrastructure" podcasts/INDEX.md

# Search within transcripts
grep -r "keyword" podcasts/transcripts/

# Search within analyses
grep -r "topic" podcasts/summaries/
```

**Current indexed content:**
- Mike Force Podcast - Lee Hunkovic (Cybersecurity Expert)
  - Transcript: `podcasts/transcripts/mike-force-lee-hunkovic-cybersecurity-transcript.txt`
  - Analysis: `podcasts/summaries/mike-force-lee-hunkovic-cybersecurity-analysis.md`
  - Tags: #cybersecurity #preparedness #ai #infrastructure #china #parenting #veteran
  - Reading List: `books/recommended-reading-cybersecurity.md` (21 books with ratings)

- James Alofs - One Year Building an Off-Grid Homestead
  - Transcript: `podcasts/transcripts/james-alofs-offgrid-homestead-year1-transcript.txt`
  - Analysis: `podcasts/summaries/james-alofs-offgrid-homestead-year1-analysis.md`
  - Tags: #homesteading #building #wilderness #preparedness #traditional-skills
  - Reading List: `books/recommended-reading-homesteading.md` (20+ books with ratings)
  - Technical Notes: `skills/building/log-cabin-construction-notes.md` (detailed construction guide)

- Network Chuck - My First Time at DEFCON (Hacker Conference)
  - Transcript: `podcasts/transcripts/network-chuck-defcon-experience-transcript.txt`
  - Analysis: `podcasts/summaries/network-chuck-defcon-experience-analysis.md`
  - Tags: #cybersecurity #hacking #networking #physical-security #social-engineering
  - Reading List: `books/recommended-reading-security-hacking.md` (15+ books with ratings)
  - Technical Notes: `skills/tactical/defcon-villages-security-techniques.md` (village techniques guide)

- AI Security & Penetration Testing 2025 (Hidden Layer Interview)
  - Transcript: `ai_pentest_security_transcript.txt`
  - Comprehensive Guide: `skills/tactical/ai-security-penetration-testing-2025.md`
  - Tags: #ai-security #prompt-injection #mcp-security #penetration-testing #cybersecurity
  - Key Focus: 6-stage AI pentest methodology, 80% chatbots leak prompts, MCP vulnerabilities, business opportunity for Core Computers

- Cybersecurity & Privacy Recommendations 2025 (UK NCSC Guidance)
  - Transcript: `cybersecurity_2025_transcript.txt`
  - Comprehensive Guide: `skills/tactical/cybersecurity-privacy-recommendations-2025.md`
  - Tags: #cybersecurity #privacy #iot-security #data-protection #resilience-engineering #offline-systems
  - Key Focus: Password management, IoT risks, local NAS backups, organizational resilience, 204 nationally significant attacks in 2025

- GrapheneOS 30-Day Experiment (Privacy-Focused Mobile OS)
  - Transcript: `podcasts/transcripts/grapheneos-30day-experiment-transcript.txt`
  - Analysis: `podcasts/summaries/grapheneos-30day-experiment-analysis.md`
  - Tags: #privacy #mobile-security #cybersecurity #degoogle #preparedness
  - Reading List: `books/recommended-reading-privacy-mobile.md` (12+ books with ratings)
  - Technical Notes: `skills/tactical/grapheneos-setup-privacy-hardening.md` (setup and configuration guide)

- Jocko Willink - Discipline Equals Freedom (Mental Resilience & Accountability)
  - Transcript: `creators/transcripts/jocko-willink-discipline-freedom-transcript.txt`
  - Analysis: `creators/summaries/jocko-willink-discipline-freedom-analysis.md`
  - Profile: `creators/profiles/jocko-willink.md`
  - Tags: #mental-resilience #discipline #extreme-ownership #seal-training #leadership #accountability
  - Accountability System: `scripts/jocko-agent.md` (morning/night agent with philosophy)
  - Scripts: `scripts/morning` & `scripts/night` (daily accountability automation)

- Jocko Willink - Confidence Through Humility (Performance Psychology & Execution)
  - Transcript: `creators/transcripts/jocko-willink-confidence-humility-transcript.txt`
  - Analysis: `creators/summaries/jocko-willink-confidence-humility-analysis.md`
  - Tags: #confidence #humility #execution #preparation #performance-psychology #mental-resilience
  - Key Framework: Two-state mental model (prepare with humility, execute with confidence)
  - Core Insight: "If you want to be confident, you got to be humble"
  - Applications: The physical "switch" trigger, lowering the bar, alter ego strategy, 100% acceptance
  - Complements: Discipline video (tactical execution), Gary Brecka cold therapy (daily hard things), all survival scenarios

- Gary Brecka - Cold Plunging & Human Optimization (Ultimate Human Podcast)
  - Transcript: `creators/transcripts/gary-brecka-cold-plunge-transcript.txt`
  - Profile: `creators/profiles/gary-brecka.md`
  - Tags: #biohacking #cold-therapy #optimization #methylation #longevity #MTHFR
  - Special Project Notes:
    - `skills/health-fitness/cold-therapy-protocols.md` (comprehensive cold plunge guide)
    - `skills/health-fitness/biohacking-optimization-guide.md` (methylation, testing, supplementation)

## Fitness & Nutrition Resources

Comprehensive guides for tactical fitness and performance nutrition integrated with survival preparedness:

### Tactical Fitness Framework
**Location:** `skills/fitness/tactical-fitness-framework.md`

**Covers:**
- Foundational movement patterns (squat, hinge, push, pull, carry, core)
- Progressive strength training programs (beginner/intermediate/advanced)
- Cardiovascular endurance and rucking protocols
- Mobility and injury prevention
- Combat/self-defense fitness
- Integration with homesteading manual labor
- Testing benchmarks and progress tracking

**Real-World Context:**
- References James Alofs' off-grid cabin build (hauling concrete, cutting logs)
- Manual labor caloric requirements
- Functional fitness for survival scenarios

### Nutrition & Preparedness Guide
**Location:** `skills/nutrition/nutrition-preparedness-guide.md`

**Covers:**
- Caloric needs by activity level (sedentary to extreme survival conditions)
- Macronutrient breakdown (protein, carbs, fats for performance)
- 30-day food storage pantry checklist
- Cold weather nutrition (lessons from -22°C operations)
- Hydration requirements and deficiency prevention
- Field nutrition planning (backcountry, bug-out, homesteading)
- Performance nutrition timing (pre/during/post-work)
- Common nutrition mistakes in survival scenarios
- Integration with fitness training programs

**Real-World Context:**
- James Alofs' 4,000-5,000 calorie/day needs during winter cabin build
- Field meal planning for various scenarios
- Food storage for preparedness (shelf-stable options)

**Tags:** #fitness #nutrition #preparedness #tactical-fitness #food-storage

**Quick Access:**
```bash
# View fitness guide
cat skills/fitness/tactical-fitness-framework.md

# View nutrition guide
cat skills/nutrition/nutrition-preparedness-guide.md

# Search for specific topics
grep -i "rucking" skills/fitness/tactical-fitness-framework.md
grep -i "cold weather" skills/nutrition/nutrition-preparedness-guide.md
```

## Health Optimization & Longevity

Comprehensive protocols for reversing aging, optimizing health span, and building mental resilience through evidence-based foundational practices.

### Longevity Optimization & Anti-Aging Protocol
**Location:** `skills/health-fitness/longevity-optimization-anti-aging.md`

**Primary Source:** Dr. Seth Capehart (ER Doctor, Former Special Ops)
**Result:** 22-year metabolic age reversal (12 years older → 10 years younger)

**The Four Pillars:**

1. **Mindset** - Neuroplasticity and mental programming
   - Think young again (stop "too old" self-talk)
   - Brain rewiring through positive programming
   - Identity-based change protocols

2. **Body** - Physical foundation
   - **Sleep**: #1 health priority (7-9 hours, sleep hygiene protocol)
   - **Movement**: Daily walks, mobility, use it or lose it
   - **Nutrition**: Food as medicine, eat close to nature

3. **Connections** - Social and environmental
   - **Tribe**: Blue Zones research on social connections
   - **Nature**: Grounding, forest bathing, seasonal living

4. **Mission** - Purpose and meaning
   - **Ikigai**: Your reason for getting up
   - Finding your why
   - 10-year mission planning

**Covers:**
- Sleep hygiene protocol (cool, dark, silent, timing)
- Movement protocols (frozen shoulder analogy, daily baseline)
- Nature-based nutrition (farmers markets, whole foods, sugar reduction)
- Grounding/earthing and forest bathing
- Blue Zones longevity findings
- 30-day quick start protocol
- 90-day transformation checklist
- Integration with tactical fitness and preparedness

**Real-World Context:**
- Special ops sleep deprivation lessons (C4 explosives incident)
- ER doctor perspective on medication vs lifestyle
- Military mental programming under pressure
- Tribal living for survival and resilience

### Neuroplasticity & Mental Programming
**Location:** `skills/mental/neuroplasticity-mental-programming.md`

**Core Concept:** You become what you repeatedly tell yourself

**Covers:**
- Neural pathway creation and modification
- The vicious cycle of negative self-programming
- Awareness and interruption techniques
- Replacement programming protocols
- Daily affirmation systems
- Identity-based change (I am vs I want to)
- Visualization and mental rehearsal
- Environmental reinforcement
- 30-day neuroplasticity challenge
- Stress inoculation training

**Tactical Applications:**
- Military mental conditioning (selection, combat, operations)
- Survival will and decision-making under pressure
- Preparedness mindset and capability belief
- Integration with Jocko Willink philosophy
- Support for physical training and cold therapy

**Real-World Context:**
- Special ops selection mental requirements
- Neural patterns under stress and fatigue
- Survival scenario decision-making
- Building "I will survive" pathways in advance

**Tags:** #longevity #anti-aging #neuroplasticity #mindset #sleep #movement #nutrition #nature-connection #mental-resilience #blue-zones

**Quick Access:**
```bash
# View longevity protocol
cat skills/health-fitness/longevity-optimization-anti-aging.md

# View neuroplasticity guide
cat skills/mental/neuroplasticity-mental-programming.md

# View full analysis
cat resources/dr_seth_capehart_reverse_aging_analysis.md

# Search for specific topics
grep -i "sleep hygiene" skills/health-fitness/longevity-optimization-anti-aging.md
grep -i "affirmations" skills/mental/neuroplasticity-mental-programming.md
grep -i "forest bathing" skills/health-fitness/longevity-optimization-anti-aging.md
```

**Video Source:** [How I Reversed Aging at 40 Without Crazy Biohacking](https://www.youtube.com/watch?v=fzeGKAaVd3I) - Dr. Seth Capehart

### Fat Loss Protocol - Body Composition Transformation
**Location:** `skills/health-fitness/fat-loss-protocol.md`

**Primary Source:** Dr. Seth Capehart (ER Doctor, Former Special Ops)
**Focus:** The 5 mistakes keeping men stuck at 20% body fat + practical implementation

**The 5 Fatal Mistakes:**

1. **Poor Sleep** - Drops testosterone 15% in one night, spikes hunger, stops fat burning
2. **Alcohol** - "You will never optimize your health if you keep filling it with poison"
3. **Short-Term Thinking** - Think in years, not days (5 lbs/month is GOOD and REAL)
4. **Not Tracking** - "If you're not tracking, you're guessing - and guessing is why you're stuck"
5. **Overestimating Calorie Burn** - Trackers overestimate 30-50%, stop "earning" food with workouts

**The 3 Buckets System:**
- **Bucket 1**: How much you eat → Controls WEIGHT
- **Bucket 2**: What you eat → Controls HEALTH
- **Bucket 3**: How much you move → Controls BODY COMPOSITION

**Key Insight**: People use Bucket 3 (movement) to lose weight. Use Bucket 1 (how much) for faster results.

**Covers:**
- Cave protocol for sleep (dark, cool, quiet, consistent)
- Alcohol elimination protocol (2-week experiment minimum)
- Long-term thinking vs short-term (Damian client example: 20 lbs in 3 months)
- Food tracking with My Fitness Pal (calorie + protein targets)
- TDEE calculation and deficit (300-500 calories)
- Exercise for performance, not calorie burn
- Body fat % guidelines (30% → 20% vs below 15%)
- 90-day transformation protocol
- Troubleshooting plateaus and strength loss
- Integration with tactical fitness and longevity protocols

**Real Results:**
- Dr. Capehart: 22-year metabolic age reversal (12 years older → 10 years younger)
- Client Damian: 20 lbs in 3 months + off blood pressure meds
- Full-time ER doctor + business + 4 kids (proves "no time" excuse invalid)

**Real-World Context:**
- Special ops alcohol culture (post-mission drinking → realized fat gain and poor recovery)
- Medical career sleep deprivation (got softer, slower, older looking)
- Delayed payoff mindset from careers (2-23 year training timelines)
- ER physician perspective on medication vs lifestyle

**Tags:** #fat-loss #body-composition #sleep #tracking #alcohol #mindset #3-buckets #calorie-deficit #testosterone

**Quick Access:**
```bash
# View fat loss protocol
cat skills/health-fitness/fat-loss-protocol.md

# View analysis documents
cat resources/dr_seth_capehart_body_fat_mistakes_analysis.md
cat resources/dr_seth_capehart_reverse_aging_analysis.md

# Search for specific topics
grep -i "cave protocol" skills/health-fitness/fat-loss-protocol.md
grep -i "3 buckets" skills/health-fitness/fat-loss-protocol.md
grep -i "tracking" skills/health-fitness/fat-loss-protocol.md
grep -i "alcohol" skills/health-fitness/fat-loss-protocol.md
```

**Video Sources:**
- [5 Mistakes That Keep Men Stuck at 20% Body Fat](https://www.youtube.com/watch?v=5eBq4WV6m94)
- [How I Reversed Aging at 40 Without Crazy Biohacking](https://www.youtube.com/watch?v=fzeGKAaVd3I)
- [Doctor Ranks Best & Worst Belly Fat Hacks (Men 40+)](https://www.youtube.com/watch?v=Uadw76HliwA)

**NEW: Tier Ranking System** - What Works & What Doesn't

Based on Dr. Capehart's comprehensive testing ("on myself, my clients, my dog, and basically anyone who couldn't run away fast enough"), here's what's worth your time:

**S TIER ⭐⭐⭐⭐⭐ - The Undefeated Champions:**
- **The Trifecta**: Sleep (7-9hrs) + Strength Training + Calorie Deficit
  - "Your body has no choice but to change"
  - Not flashy, but undefeated winner
- **Calorie Deficit + Whole Foods**: The foundation of ALL fat loss
  - "Every successful method works because it creates a calorie deficit"

**A TIER ⭐⭐⭐⭐ - Real Merit, Science-Backed:**
- **Resistance Training + Protein**: Beats cardio alone for long-term fat loss
  - "Losing muscle = firing your calorie burning staff"
- **GLP-1 Meds** (Ozempic, etc.): 15-20% weight loss BUT...
  - $$$$$ ($1,000/month)
  - GI side effects common
  - Must change lifestyle or regain all weight
  - "If you'd just adjusted lifestyle before, you wouldn't be here now"

**B TIER ⭐⭐⭐ - Works for Some:**
- **Intermittent Fasting**: Makes deficit easier for some
  - Not magic, just tool for calorie control
  - Can still overeat in window

**C TIER ⭐ - Overpriced:**
- **Fat Burners**: "Just caffeine + green tea + NASA marketing"
  - Maybe 50-100 cal/day ("half a slice of pizza")
  - "Can't out-supplement a bad habit"

**D TIER ⭐ - Water Weight Only:**
- **Waist Trainers/Sauna Suits**: "Like ringing out a sponge"
  - Results vanish immediately
  - Back injuries, organ compression
  - "If it doesn't burn fat, build muscle, or keep results - not worth it"

**F TIER ⭐ - Complete Waste:**
- **Detox/Juice Cleanses**: "Save your money and your dignity"
  - "Liver and kidneys already detox - that's literally their job"
  - Lose water and muscle, not fat
  - Weight back "faster than Amazon Prime delivery"

**The Universal Truth:**
> "Every successful fat loss method from keto to vegan to intermittent fasting works because it puts you into a calorie deficit."

**Quick Access:**
```bash
# View tier ranking analysis
cat resources/dr_seth_capehart_belly_fat_hacks_analysis.md

# View updated fat loss protocol (includes tier system)
cat skills/health-fitness/fat-loss-protocol.md

# Search tier rankings
grep -i "tier" skills/health-fitness/fat-loss-protocol.md
```
