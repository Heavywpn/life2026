#!/usr/bin/env python3
"""
WHOOP API Integration for Telos
Fetches recovery, strain, and sleep data from WHOOP API.

Usage:
    python whoop.py [--days N] [--output FILE]

Setup:
    1. Create app at https://developer.whoop.com/
    2. Complete OAuth flow to get access/refresh tokens
    3. Add credentials to .claude/config/integrations.env
"""

import os
import sys
import json
import argparse
from datetime import datetime, timedelta
from pathlib import Path

# Try to import requests, provide helpful error if missing
try:
    import requests
except ImportError:
    print("Error: 'requests' module not installed.")
    print("Install with: pip install requests")
    sys.exit(1)

# Paths
SCRIPT_DIR = Path(__file__).parent
TELOS_ROOT = SCRIPT_DIR.parent.parent
CONFIG_DIR = TELOS_ROOT / ".claude" / "config"
DATA_DIR = TELOS_ROOT / ".claude" / "data"
ENV_FILE = CONFIG_DIR / "integrations.env"

# WHOOP API endpoints
WHOOP_API_BASE = "https://api.prod.whoop.com/developer/v1"


def load_env():
    """Load environment variables from integrations.env"""
    env = {}
    if ENV_FILE.exists():
        with open(ENV_FILE) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    env[key.strip()] = value.strip()
    return env


def get_headers(access_token: str) -> dict:
    """Get API request headers"""
    return {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }


def fetch_recovery(access_token: str, start_date: str, end_date: str) -> list:
    """Fetch recovery scores for date range"""
    url = f"{WHOOP_API_BASE}/recovery"
    params = {
        "start": start_date,
        "end": end_date
    }

    try:
        response = requests.get(url, headers=get_headers(access_token), params=params)
        response.raise_for_status()
        return response.json().get("records", [])
    except requests.RequestException as e:
        print(f"Error fetching recovery: {e}")
        return []


def fetch_sleep(access_token: str, start_date: str, end_date: str) -> list:
    """Fetch sleep data for date range"""
    url = f"{WHOOP_API_BASE}/sleep"
    params = {
        "start": start_date,
        "end": end_date
    }

    try:
        response = requests.get(url, headers=get_headers(access_token), params=params)
        response.raise_for_status()
        return response.json().get("records", [])
    except requests.RequestException as e:
        print(f"Error fetching sleep: {e}")
        return []


def fetch_workout(access_token: str, start_date: str, end_date: str) -> list:
    """Fetch workout/strain data for date range"""
    url = f"{WHOOP_API_BASE}/workout"
    params = {
        "start": start_date,
        "end": end_date
    }

    try:
        response = requests.get(url, headers=get_headers(access_token), params=params)
        response.raise_for_status()
        return response.json().get("records", [])
    except requests.RequestException as e:
        print(f"Error fetching workouts: {e}")
        return []


def fetch_cycle(access_token: str, start_date: str, end_date: str) -> list:
    """Fetch physiological cycle (strain) data"""
    url = f"{WHOOP_API_BASE}/cycle"
    params = {
        "start": start_date,
        "end": end_date
    }

    try:
        response = requests.get(url, headers=get_headers(access_token), params=params)
        response.raise_for_status()
        return response.json().get("records", [])
    except requests.RequestException as e:
        print(f"Error fetching cycles: {e}")
        return []


def format_for_journal(data: dict) -> str:
    """Format WHOOP data for journal inclusion"""
    output = []
    output.append("## WHOOP Data")
    output.append(f"*Synced: {datetime.now().strftime('%Y-%m-%d %H:%M')}*\n")

    # Latest recovery
    if data.get("recovery"):
        latest = data["recovery"][0] if data["recovery"] else None
        if latest:
            score = latest.get("score", {})
            output.append("### Recovery")
            output.append(f"- **Recovery Score:** {score.get('recovery_score', 'N/A')}%")
            output.append(f"- **HRV:** {score.get('hrv_rmssd_milli', 'N/A')} ms")
            output.append(f"- **Resting HR:** {score.get('resting_heart_rate', 'N/A')} bpm")
            output.append(f"- **SPO2:** {score.get('spo2_percentage', 'N/A')}%")
            output.append("")

    # Latest sleep
    if data.get("sleep"):
        latest = data["sleep"][0] if data["sleep"] else None
        if latest:
            score = latest.get("score", {})
            output.append("### Sleep")

            # Calculate hours from milliseconds
            total_ms = score.get("total_in_bed_time_milli", 0)
            sleep_ms = score.get("total_sleep_time_milli", 0)
            total_hrs = round(total_ms / 3600000, 1) if total_ms else "N/A"
            sleep_hrs = round(sleep_ms / 3600000, 1) if sleep_ms else "N/A"

            output.append(f"- **Sleep Performance:** {score.get('sleep_performance_percentage', 'N/A')}%")
            output.append(f"- **Time in Bed:** {total_hrs} hrs")
            output.append(f"- **Actual Sleep:** {sleep_hrs} hrs")
            output.append(f"- **Sleep Efficiency:** {score.get('sleep_efficiency_percentage', 'N/A')}%")
            output.append("")

    # Latest strain/cycle
    if data.get("cycles"):
        latest = data["cycles"][0] if data["cycles"] else None
        if latest:
            score = latest.get("score", {})
            output.append("### Strain")
            output.append(f"- **Day Strain:** {score.get('strain', 'N/A')}")
            output.append(f"- **Average HR:** {score.get('average_heart_rate', 'N/A')} bpm")
            output.append(f"- **Max HR:** {score.get('max_heart_rate', 'N/A')} bpm")
            output.append(f"- **Calories:** {score.get('kilojoule', 0) * 0.239:.0f} kcal")
            output.append("")

    # Workouts
    if data.get("workouts"):
        output.append("### Workouts")
        for workout in data["workouts"][:3]:  # Last 3 workouts
            score = workout.get("score", {})
            sport = workout.get("sport_id", "Unknown")
            output.append(f"- **{sport}:** Strain {score.get('strain', 'N/A')}, "
                         f"{score.get('kilojoule', 0) * 0.239:.0f} kcal")
        output.append("")

    return "\n".join(output)


def main():
    parser = argparse.ArgumentParser(description="Fetch WHOOP data for Telos journal")
    parser.add_argument("--days", type=int, default=1, help="Number of days to fetch (default: 1)")
    parser.add_argument("--output", type=str, help="Output file path (default: stdout)")
    parser.add_argument("--json", action="store_true", help="Output raw JSON instead of markdown")
    args = parser.parse_args()

    # Load credentials
    env = load_env()
    access_token = env.get("WHOOP_ACCESS_TOKEN")

    if not access_token:
        print("Error: WHOOP_ACCESS_TOKEN not found in integrations.env")
        print(f"Please add your credentials to: {ENV_FILE}")
        sys.exit(1)

    # Calculate date range
    end_date = datetime.now().isoformat() + "Z"
    start_date = (datetime.now() - timedelta(days=args.days)).isoformat() + "Z"

    # Fetch all data
    data = {
        "fetched_at": datetime.now().isoformat(),
        "date_range": {"start": start_date, "end": end_date},
        "recovery": fetch_recovery(access_token, start_date, end_date),
        "sleep": fetch_sleep(access_token, start_date, end_date),
        "workouts": fetch_workout(access_token, start_date, end_date),
        "cycles": fetch_cycle(access_token, start_date, end_date)
    }

    # Output
    if args.json:
        output = json.dumps(data, indent=2)
    else:
        output = format_for_journal(data)

    if args.output:
        output_path = Path(args.output)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w') as f:
            f.write(output)
        print(f"Data written to: {output_path}")
    else:
        print(output)

    # Also save JSON cache
    cache_file = DATA_DIR / "whoop_latest.json"
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with open(cache_file, 'w') as f:
        json.dump(data, f, indent=2)


if __name__ == "__main__":
    main()
