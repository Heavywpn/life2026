# Whoop Data Integration for Telos Journal

This tool fetches your Whoop health metrics and formats them for easy copy-paste into your daily journal entries.

## What Data Does It Pull?

- **Sleep**: Total hours, REM/Deep/Light/Awake breakdown, performance %, consistency, efficiency, disturbances, respiratory rate
- **Recovery**: Recovery score %, resting heart rate, HRV (RMSSD), skin temperature, SpO2
- **Strain**: Daily strain score, energy burned (kJ), average/max heart rate
- **Workouts**: Each workout with sport type, duration, strain, heart rate, calories
- **Vitals**: Resting heart rate, respiratory rate tracked across all metrics

## Setup (One-Time)

### 1. Verify Your Whoop Developer Portal Settings

Before running the script, go to https://developer.whoop.com/ and verify:

1. **Open your application** (the one you created for "Personal Telos Journal Integration")
2. **Copy the EXACT values** from the developer portal:
   - **Client ID** (long string like `603e12fa-...`)
   - **Client Secret** (long string - might need to click "Show")
   - **Redirect URI** - Must be EXACTLY: `http://localhost:8080/callback`

3. **Update `.env` file** with the correct values:
   ```bash
   cd /home/rick/life/telos/scripts/whoop
   nano .env
   ```

   Replace `WHOOP_CLIENT_ID` and `WHOOP_CLIENT_SECRET` with values from portal.

4. **Save and exit** (Ctrl+X, Y, Enter)

### 2. Install Python Dependencies

```bash
cd /home/rick/life/telos/scripts/whoop
./install.sh
```

This creates a virtual environment and installs dependencies (requests, python-dotenv).

### 3. First Run - Authentication

The first time you run the script, it will:
1. Open your web browser to Whoop's authorization page
2. Ask you to log in and approve access
3. Save a secure refresh token for future use
4. Fetch your data

```bash
./whoop
```

After the first run, you won't need to re-authenticate (unless you revoke access in Whoop settings).

## Daily Usage

### During Morning Ritual

Run this to get **yesterday's** data (Whoop finalizes data after your sleep):

```bash
cd /home/rick/life/telos/scripts/whoop
./whoop
```

The script will:
- Display formatted data in your terminal
- Save it to a text file: `whoop_data_YYYY-MM-DD.txt`
- You can copy-paste into your journal entry

### Get Data for Specific Date

```bash
./whoop --date 2025-11-08
```

### Example Output

```
======================================================================
WHOOP DATA - Friday, November 08, 2025
======================================================================

💤 SLEEP
  Total: 7.2h
  REM: 1.8h | Deep: 1.2h | Light: 3.9h | Awake: 0.3h
  Performance: 85%
  Consistency: 78%
  Efficiency: 96%
  Disturbances: 12
  Respiratory Rate: 14.5 bpm

🔋 RECOVERY
  Recovery Score: 72%
  Resting Heart Rate: 52 bpm
  HRV (RMSSD): 68.3 ms
  Skin Temp: 33.8°C
  SpO2: 97%

💪 STRAIN
  Day Strain: 14.2
  Energy Burned: 12453 kJ
  Avg Heart Rate: 78 bpm
  Max Heart Rate: 165 bpm

🏃 WORKOUTS
  • Functional Fitness: 45 min | Strain: 12.1 | Avg HR: 142 bpm | 432 cal

======================================================================
```

## Integration with Daily Rituals

### Morning Ritual Flow

1. Run your morning ritual agent: `Task morning-ritual`
2. When agent asks about energy/sleep, run Whoop script
3. Copy-paste Whoop data into morning journal section
4. Reference recovery score when setting daily priorities

Example journal entry addition:

```markdown
### Morning (Nov 8, 2025)

**Energy**: 7/10 (Whoop Recovery: 72%, HRV: 68ms)
**Sleep**: 7.2h (85% performance, slight disturbances but decent REM/Deep)
**Capacity**: Moderate - recovery isn't peak but HRV is stable

[rest of morning ritual...]
```

### Evening Reflection Flow

1. Run your evening ritual agent: `Task evening-reflection`
2. When reflecting on fitness/body, reference day's strain
3. Copy relevant Whoop workout data if you trained

Example:

```markdown
### Evening (Nov 8, 2025)

**Fitness & Body**:
- CrossFit workout: 45min functional fitness (Whoop strain: 12.1, avg HR 142)
- Ice bath: 5min at 4°C ✓ (Day 5/90)
- Body feeling: Leg pain 6/10 (manageable), ribs okay
- Strain: 14.2 for the day - good solid effort

[rest of evening reflection...]
```

## How Whoop Metrics Connect to Your Mission

Remember your mission: "prove every single day that integrity, service, and disability don't stop you from building something powerful."

**These metrics prove your daily effort:**

- **Recovery/HRV**: Shows your body's resilience despite chronic pain (13 bolts in leg, ribs, tinnitus)
- **Sleep quality**: Tracks whether ice bath routine is improving sleep
- **Strain**: Demonstrates daily physical commitment despite injuries
- **Consistency**: Weekly/monthly trends show discipline over time

When you see:
- **Low recovery but you still showed up** → That's the mission in action
- **High strain despite pain** → Proof that disability doesn't stop you
- **Improving sleep patterns** → Ice bath strategy working, drinking strategy working
- **Consistent workout data** → Daily action, not just talk

## Troubleshooting

### "Module not found" errors

Re-run the install script:
```bash
./install.sh
```

Or manually:
```bash
./venv/bin/pip install requests python-dotenv
```

### "No data available" for all metrics

Whoop data finalizes ~30-60 minutes after you wake up. If you run the script too early, data might not be ready yet. Try again in an hour, or fetch previous day's data:

```bash
python fetch_whoop_data.py --date 2025-11-07
```

### Authentication expired

If you get authentication errors, delete the token file and re-authenticate:

```bash
rm refresh_token.json
python fetch_whoop_data.py
```

### Browser doesn't open for authentication

The script will print the authorization URL. Copy-paste it into your browser manually.

## Files in This Directory

- `fetch_whoop_data.py` - Main script
- `.env` - Your API credentials (KEEP SECURE)
- `refresh_token.json` - Stored auth token (created after first run)
- `whoop_data_*.txt` - Saved output files (one per date)
- `.gitignore` - Protects credentials from version control
- `README.md` - This file

## Data Privacy

- All data stays on your local machine
- Credentials stored in `.env` (protected by .gitignore)
- Whoop API uses OAuth2 (secure, revocable access)
- You can revoke access anytime in Whoop app settings

## Questions?

Read the script code - it's heavily commented and straightforward. Python expertise not required to use it, but it's there if you want to customize the output format.
