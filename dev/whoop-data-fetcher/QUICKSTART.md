# Whoop Data Fetcher - Quick Start

## One-Time Setup

### 1. Register Redirect URI
Go to: https://developer-dashboard.whoop.com/apps/603e12fa-1d71-4dc5-b707-2905670e1e51

Add this redirect URI:
```
http://localhost:8080/callback
```

### 2. Run Setup
```bash
cd /home/rick/life/dev/whoop-data-fetcher
./setup.sh
```

### 3. Authenticate
```bash
./whoop --auth-only
```

A browser will open - log in to Whoop and authorize the app.

## Daily Usage

### Fetch Data
```bash
./whoop                  # Last 30 days
./whoop --days 60       # Last 60 days
./whoop --days 90       # Last 90 days
```

## Output

Data is saved in `whoop_data/`:
- `sleep_*.csv` - Sleep metrics
- `recovery_*.csv` - Recovery scores, HRV
- `workouts_*.csv` - Workout data
- `cycles_*.csv` - Daily cycles
- `summary_*.json` - Statistics

## Using with AI

### Load in Python
```python
import pandas as pd
sleep = pd.read_csv('whoop_data/sleep_TIMESTAMP.csv')
recovery = pd.read_csv('whoop_data/recovery_TIMESTAMP.csv')
```

### Feed to Claude/ChatGPT
Just upload the CSV files or paste their contents for analysis!

## Troubleshooting

### "Failed to get authorization code"
- Ensure `http://localhost:8080/callback` is registered in Whoop dashboard
- Check that port 8080 is available

### "Token exchange failed"
- Verify credentials in `config.py`
- Check that your app is enabled in Whoop dashboard

### "API request failed: 401"
- Tokens expired - delete `whoop_tokens.json` and re-authenticate

### Start fresh
```bash
rm whoop_tokens.json
./whoop --auth-only
```

## Common Commands

```bash
./whoop --auth-only              # Authenticate only
./whoop --days 30                # Fetch 30 days
./whoop --days 60 --no-export   # Fetch but don't export CSV
./whoop --output-dir my_folder  # Custom output location
```
