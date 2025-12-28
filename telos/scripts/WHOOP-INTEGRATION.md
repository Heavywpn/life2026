
# Whoop Integration for TELOS Agents

Your Whoop data is now integrated into your TELOS morning and evening rituals!

## File Locations

**Working Whoop Fetcher:**
- Location: `/home/rick/life/dev/whoop-data-fetcher/`
- Already authenticated and working!

**TELOS Scripts:**
- Fetch script: `/home/rick/life/telos/scripts/fetch-whoop.sh`
- Summary script: `/home/rick/life/telos/scripts/whoop-summary.py`

**Whoop Data Storage:**
- Location: `/home/rick/life/telos/04-tracking/whoop/`
- Contains: sleep, recovery, workouts, cycles CSVs

## How It Works

### Morning Agent
1. Fetches latest Whoop data (previous night's sleep + recovery)
2. Shows sleep metrics (hours, efficiency, stages)
3. Shows recovery score and HRV
4. Informs the energy check discussion

### Evening Agent
1. Fetches today's workout data
2. Shows activity type, duration, strain
3. Shows heart rate and calories
4. Enhances the fitness check section

## Usage

### Manual Test
```bash
# Fetch latest data
/home/rick/life/telos/scripts/fetch-whoop.sh

# View morning summary
python3 /home/rick/life/telos/scripts/whoop-summary.py morning

# View evening summary
python3 /home/rick/life/telos/scripts/whoop-summary.py evening
```

### In Agent Prompts

Add this to **morning-ritual.md** after STEP 2 (Warm Greeting):

```markdown
### STEP 2.5: FETCH WHOOP DATA (Silent Background)

Before asking about sleep and energy, fetch Whoop data:

```bash
/home/rick/life/telos/scripts/fetch-whoop.sh
python3 /home/rick/life/telos/scripts/whoop-summary.py morning
```

Use this objective data to:
- Inform your questions about sleep quality
- Contextualize their energy level report
- Validate or question their self-assessment

**Example:**
- User says: "I slept okay, maybe 7/10"
- Whoop shows: 5.2 hours, 78% efficiency, recovery 45%
- You say: "Interesting - Whoop shows 5.2 hours with 78% efficiency and recovery at 45%. That 'okay' feeling makes sense with those numbers. How does your body actually feel?"

Don't rely solely on Whoop - it's context, not truth. Their subjective experience matters most.
\```

Add this to **evening-reflection.md** after STEP 4 (Fitness & Body Check):

```markdown
### STEP 4.5: FETCH WHOOP WORKOUT DATA (Silent Background)

Before or during the fitness discussion, fetch Whoop data:

```bash
/home/rick/life/telos/scripts/fetch-whoop.sh
python3 /home/rick/life/telos/scripts/whoop-summary.py evening
```

Use this to:
- Validate workout details they mention
- Catch workouts they forgot to mention
- Understand actual intensity vs perceived effort

**Example:**
- User says: "Did a light workout, nothing special"
- Whoop shows: 45 min, Strain 14.2, Avg HR 165
- You say: "Whoop tracked 45 minutes with a strain of 14.2 and average heart rate of 165 - that's actually pretty solid work! How did it feel?"

Use it to enrich the conversation, not replace it.
\```

## Data Refresh Schedule

**Automatic:** None - manual trigger via agents

**Manual:**
- Morning: Fetch when running morning ritual
- Evening: Fetch when running evening reflection
- Anytime: Run fetch script manually

## Troubleshooting

### No data showing up
```bash
cd /home/rick/life/dev/whoop-data-fetcher
./whoop --days 1  # Test if fetcher works
```

### Authentication expired
```bash
cd /home/rick/life/dev/whoop-data-fetcher
./whoop --auth-only  # Re-authenticate
```

### Script errors
Check that the paths are correct:
- Whoop fetcher: `/home/rick/life/dev/whoop-data-fetcher/`
- TELOS scripts: `/home/rick/life/telos/scripts/`
- Data storage: `/home/rick/life/telos/04-tracking/whoop/`

## What Gets Tracked

**Sleep Metrics:**
- Total time in bed
- Actual sleep hours
- Sleep efficiency %
- Sleep stages (Deep, REM, Light, Awake)
- Respiratory rate
- Sleep performance score

**Recovery Metrics:**
- Recovery score (0-100%)
- HRV (heart rate variability)
- Resting heart rate
- Calibration status

**Workout Metrics:**
- Activity type
- Duration
- Strain score
- Average/max heart rate
- Calories burned

## Integration Benefits

1. **Objective Data:** Complements subjective feelings
2. **Pattern Recognition:** Track sleep/recovery over time
3. **Accountability:** Can't fake the data
4. **Insight:** Understand energy patterns
5. **Optimization:** See what actually works

## Privacy Note

All data stays local:
- Stored in `/home/rick/life/telos/04-tracking/whoop/`
- Never leaves your machine
- Not committed to git (see .gitignore)
- Only you and your agents see it

## Next Steps

1. Test the integration:
   ```bash
   /home/rick/life/telos/scripts/fetch-whoop.sh
   python3 /home/rick/life/telos/scripts/whoop-summary.py morning
   ```

2. Update your agent prompts (manual edit for now)

3. Run your morning ritual with Whoop data!

4. Enjoy data-driven self-awareness 📊💪
