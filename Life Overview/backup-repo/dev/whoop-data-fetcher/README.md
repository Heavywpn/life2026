# Whoop Data Fetcher

A Python tool to authenticate with the Whoop API and fetch your health data locally for analysis with AI.

## Quick Start

```bash
# 1. Register redirect URI at https://developer-dashboard.whoop.com/
#    Add: http://localhost:8080/callback

# 2. Run setup
./setup.sh

# 3. Authenticate
./whoop --auth-only

# 4. Fetch data
./whoop --days 30
```

## Features

- OAuth2 authentication with Whoop
- Fetch sleep, recovery, workout, and physiological cycle data
- Export data to CSV format for easy analysis
- Token management with automatic refresh
- Data summary statistics

## Setup

### 1. Prerequisites

- Python 3.7 or higher
- A Whoop developer account with API credentials
- Registered OAuth redirect URI in your Whoop Developer Dashboard

### 2. Register Redirect URI

**IMPORTANT:** Before running the tool, you must register the following redirect URI in your Whoop Developer Dashboard:

```
http://localhost:8080/callback
```

To do this:
1. Go to https://developer-dashboard.whoop.com/
2. Select your application
3. Add `http://localhost:8080/callback` to the list of allowed redirect URIs
4. Save changes

### 3. Install Dependencies

The easiest way is to use the setup script:

```bash
./setup.sh
```

Or manually create a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 4. Configure Credentials

Your credentials are already configured in `config.py`:
- Client ID: 603e12fa-1d71-4dc5-b707-2905670e1e51
- Client Secret: (already set)

## Usage

### Using the Convenience Script (Recommended)

The `whoop` script automatically handles the virtual environment for you:

```bash
./whoop                    # Fetch last 30 days
./whoop --days 60         # Fetch different time period
./whoop --auth-only       # Only authenticate
./whoop --no-export       # Skip CSV export
./whoop --output-dir my_data  # Custom output directory
```

### Using Python Directly

If you prefer to use Python directly:

```bash
source venv/bin/activate   # Activate virtual environment
python main.py --days 30   # Run the script
deactivate                 # Deactivate when done
```

### Options

- `--days N` - Fetch N days of data (default: 30)
- `--auth-only` - Only authenticate, don't fetch data
- `--no-export` - Fetch data but skip CSV export
- `--output-dir DIR` - Specify custom output directory (default: whoop_data)

### First Time Authentication

1. Run the authentication:
   ```bash
   ./whoop --auth-only
   ```

2. A browser window will open asking you to authorize the application
3. Log in to your Whoop account and grant access
4. The tokens will be saved to `whoop_tokens.json`

### Fetching Your Data

Once authenticated, fetch your data:

```bash
./whoop --days 90
```

This will:
1. Fetch all available data for the past 90 days
2. Save raw JSON data
3. Export to CSV files in `whoop_data/` directory
4. Generate a summary with statistics

## Output Files

The tool creates several files:

### JSON Files
- `whoop_data_TIMESTAMP.json` - Raw API response data
- `whoop_data/profile_TIMESTAMP.json` - User profile information
- `whoop_data/body_measurement_TIMESTAMP.json` - Body measurements
- `whoop_data/summary_TIMESTAMP.json` - Data summary and statistics

### CSV Files (in `whoop_data/` directory)
- `sleep_TIMESTAMP.csv` - Sleep data (duration, stages, scores)
- `recovery_TIMESTAMP.csv` - Recovery scores and HRV data
- `workouts_TIMESTAMP.csv` - Workout activities and strain
- `cycles_TIMESTAMP.csv` - Physiological cycle data

## Data Structure

### Sleep Data
- Sleep duration and efficiency
- Sleep stages (deep, REM, light, awake)
- Sleep performance score
- Respiratory rate
- Time in bed vs. time asleep

### Recovery Data
- Recovery score (0-100%)
- Resting heart rate
- Heart rate variability (HRV)
- Sleep performance
- Skin temperature

### Workout Data
- Activity type
- Duration
- Strain score
- Average heart rate
- Max heart rate
- Calories burned

### Cycle Data
- Daily strain
- Energy levels
- Physiological metrics over 24-hour periods

## Using Data with AI

The CSV files are formatted for easy import into:
- Pandas DataFrames for analysis
- AI/ML models for pattern recognition
- ChatGPT, Claude, or other LLMs for insights
- Data visualization tools

Example:

```python
import pandas as pd

# Load sleep data
sleep_df = pd.read_csv('whoop_data/sleep_20250112_120000.csv')

# Basic analysis
print(sleep_df['score_sleep_performance'].describe())

# Or feed to AI for insights
with open('whoop_data/sleep_20250112_120000.csv', 'r') as f:
    data = f.read()
    # Send to AI model for analysis
```

## Token Management

- Tokens are saved in `whoop_tokens.json`
- Access tokens expire after a period (typically 1 hour)
- The tool automatically refreshes tokens using the refresh token
- Keep `whoop_tokens.json` secure and never commit it to version control

## Troubleshooting

### "Failed to get authorization code"
- Ensure `http://localhost:8080/callback` is registered in your Whoop Developer Dashboard
- Check that port 8080 is not in use by another application

### "Token exchange failed"
- Verify your Client ID and Client Secret in `config.py`
- Ensure your app is enabled in the Whoop Developer Dashboard

### "API request failed: 401"
- Your tokens may have expired
- Delete `whoop_tokens.json` and re-authenticate

### "No module named 'requests'"
- Install dependencies: `pip install -r requirements.txt`

## API Documentation

For more details about the Whoop API:
- API Docs: https://developer.whoop.com/api/
- OAuth Guide: https://developer.whoop.com/docs/developing/oauth
- Developer Dashboard: https://developer-dashboard.whoop.com/

## Security Notes

- Never share your `whoop_tokens.json` file
- Keep your Client Secret confidential
- The redirect URI must match exactly what's registered in your dashboard
- Access tokens are short-lived for security
- Refresh tokens allow long-term access

## License

This is a personal tool for accessing your own Whoop data.
