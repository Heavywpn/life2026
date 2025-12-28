# Transcript Analysis Guide

## Getting Podcast Transcripts

### Method 1: YouTube Videos
If the podcast is available on YouTube:
1. Get the video URL
2. Use a transcript extraction tool or service
3. Common tools:
   - YouTube's built-in transcript feature (click "...More" → "Show transcript")
   - Browser extensions for transcript download
   - Online services like `youtubetranscript.com`

### Method 2: Podcast Platforms
Some platforms provide transcripts:
- Spotify (select episodes)
- Apple Podcasts (select shows)
- Podcast website/show notes

### Method 3: Audio Transcription Services
For audio files:
- Whisper AI (local, free, open-source)
- Otter.ai
- Rev.com
- Descript

## Analysis Workflow

### Step 1: Initial Processing
```
1. Save raw transcript to podcasts/transcripts/[podcast-name]-[episode].txt
2. Create summary file using podcasts/TEMPLATE.md
3. Add entry to resources/podcast-log.md
```

### Step 2: First Pass - Identification
Read through and identify:
- [ ] Main topics discussed
- [ ] Specific techniques mentioned
- [ ] Gear/equipment recommendations
- [ ] Book/resource references
- [ ] Expert opinions or controversial points

### Step 3: Deep Analysis
For each key topic:
- [ ] Extract exact quotes with timestamps
- [ ] Note any step-by-step instructions
- [ ] Identify claims that need validation
- [ ] Cross-reference with books/other sources
- [ ] Flag for field testing if applicable

### Step 4: Skill Extraction
- [ ] Create new skill files for any novel techniques
- [ ] Update existing skill files with additional sources
- [ ] Add to skills/INDEX.md if new category needed

### Step 5: Synthesis
- [ ] Write summary in podcasts/summaries/
- [ ] Add actionable items to personal queue
- [ ] Update cross-references in related materials
- [ ] Create analysis document if topic warrants deep dive

## Key Questions to Answer

### Technique Validation
- Is this technique practical for my situation?
- How does it compare to military training?
- What are the prerequisites?
- What could go wrong?
- Can I test this safely?

### Source Credibility
- What's the speaker's background/credentials?
- Is this first-hand experience or hearsay?
- Are there conflicting opinions from other experts?
- Is this region-specific knowledge?

### Practical Application
- Do I have the resources to implement this?
- What's the skill progression required?
- How often should this be practiced?
- What's the use case (emergency, regular prep, training)?

## Analysis Templates

### Technique Analysis Card
```
Technique: [Name]
Source: [Podcast] - [Episode] @ [Timestamp]
Speaker: [Name/Credentials]

Description:
[1-2 sentence summary]

Steps:
1.
2.
3.

Required:
- Equipment:
- Knowledge:
- Conditions:

Validation:
[ ] Cross-referenced with [X] sources
[ ] Field tested on [date]
[ ] Integrated into skill file

Military comparison:
[How this relates to/differs from military training]

Personal notes:
[Your assessment]
```

### Topic Deep Dive Template
```
Topic: [Name]
Trigger: [What prompted this analysis]

Sources:
- Podcast: [Episode]
- Book: [Title]
- Field Manual: [Reference]
- Personal experience: [When]

Current understanding:
[What you knew before]

New information:
[What you learned]

Conflicts/questions:
[Discrepancies between sources or unclear points]

Synthesis:
[Your integrated understanding]

Action plan:
- [ ] Next steps for learning
- [ ] Skills to practice
- [ ] Resources to acquire
```

## Automation Tips

### Batch Processing
When analyzing multiple episodes:
1. Download all transcripts first
2. Skim for high-value episodes
3. Deep analyze top priority content
4. Create summary sheets for medium priority
5. Archive low-value for future reference

### Time Management
- Quick pass (10-15 min): Identify topics and flag for deep dive
- Standard analysis (30-45 min): Extract techniques, create summaries
- Deep dive (1-2 hours): Cross-reference, validate, synthesize

### Tracking Progress
Use checkbox system in podcast-log.md:
- 📥 Downloaded
- 👀 Skimmed
- ✍️ Analyzed
- 🔗 Cross-referenced
- ✅ Complete
