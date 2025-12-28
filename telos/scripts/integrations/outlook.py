#!/usr/bin/env python3
"""
Microsoft Outlook Calendar Integration for Telos
Fetches calendar events using Microsoft Graph API.

Usage:
    python outlook.py [--days N] [--output FILE]

Setup:
    1. Register app at https://portal.azure.com/ (Azure AD -> App registrations)
    2. Add permissions: Calendars.Read, User.Read
    3. Complete OAuth flow to get access/refresh tokens
    4. Add credentials to .claude/config/integrations.env
"""

import os
import sys
import json
import argparse
from datetime import datetime, timedelta
from pathlib import Path

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

# Microsoft Graph API
GRAPH_API_BASE = "https://graph.microsoft.com/v1.0"


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


def fetch_events(access_token: str, start_date: str, end_date: str) -> list:
    """Fetch calendar events for date range"""
    url = f"{GRAPH_API_BASE}/me/calendar/calendarView"
    params = {
        "startDateTime": start_date,
        "endDateTime": end_date,
        "$orderby": "start/dateTime",
        "$top": 50,
        "$select": "subject,start,end,location,isAllDay,showAs,categories"
    }

    try:
        response = requests.get(url, headers=get_headers(access_token), params=params)
        response.raise_for_status()
        return response.json().get("value", [])
    except requests.RequestException as e:
        print(f"Error fetching calendar: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response: {e.response.text}")
        return []


def format_time(dt_str: str) -> str:
    """Format datetime string to readable time"""
    try:
        dt = datetime.fromisoformat(dt_str.replace('Z', '+00:00'))
        return dt.strftime('%H:%M')
    except:
        return dt_str


def format_for_journal(data: dict) -> str:
    """Format calendar data for journal inclusion"""
    output = []
    output.append("## Calendar")
    output.append(f"*Synced: {datetime.now().strftime('%Y-%m-%d %H:%M')}*\n")

    events = data.get("events", [])

    if not events:
        output.append("*No events scheduled*\n")
        return "\n".join(output)

    # Group by date
    events_by_date = {}
    for event in events:
        start = event.get("start", {})
        date_str = start.get("dateTime", start.get("date", ""))[:10]
        if date_str not in events_by_date:
            events_by_date[date_str] = []
        events_by_date[date_str].append(event)

    # Format each date
    for date_str in sorted(events_by_date.keys()):
        try:
            date_obj = datetime.strptime(date_str, "%Y-%m-%d")
            day_name = date_obj.strftime("%A")
            output.append(f"### {day_name}, {date_str}")
        except:
            output.append(f"### {date_str}")

        for event in events_by_date[date_str]:
            subject = event.get("subject", "Untitled")
            start = event.get("start", {})
            end = event.get("end", {})
            is_all_day = event.get("isAllDay", False)
            location = event.get("location", {}).get("displayName", "")
            show_as = event.get("showAs", "busy")

            if is_all_day:
                time_str = "All day"
            else:
                start_time = format_time(start.get("dateTime", ""))
                end_time = format_time(end.get("dateTime", ""))
                time_str = f"{start_time} - {end_time}"

            # Status indicator
            status_icon = {
                "free": "",
                "tentative": "?",
                "busy": "",
                "oof": "",
                "workingElsewhere": ""
            }.get(show_as, "")

            event_line = f"- **{time_str}** {status_icon} {subject}"
            if location:
                event_line += f" @ {location}"
            output.append(event_line)

        output.append("")

    # Summary stats
    total_events = len(events)
    meetings = len([e for e in events if not e.get("isAllDay", False)])
    output.append(f"**Total:** {total_events} events ({meetings} meetings)")

    return "\n".join(output)


def main():
    parser = argparse.ArgumentParser(description="Fetch Outlook calendar for Telos journal")
    parser.add_argument("--days", type=int, default=1, help="Number of days to fetch (default: 1)")
    parser.add_argument("--output", type=str, help="Output file path (default: stdout)")
    parser.add_argument("--json", action="store_true", help="Output raw JSON instead of markdown")
    args = parser.parse_args()

    # Load credentials
    env = load_env()
    access_token = env.get("MICROSOFT_ACCESS_TOKEN")

    if not access_token:
        print("Error: MICROSOFT_ACCESS_TOKEN not found in integrations.env")
        print(f"Please add your credentials to: {ENV_FILE}")
        sys.exit(1)

    # Calculate date range
    start_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    end_date = start_date + timedelta(days=args.days)

    # Fetch events
    events = fetch_events(
        access_token,
        start_date.isoformat(),
        end_date.isoformat()
    )

    data = {
        "fetched_at": datetime.now().isoformat(),
        "date_range": {
            "start": start_date.isoformat(),
            "end": end_date.isoformat()
        },
        "events": events
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
    cache_file = DATA_DIR / "calendar_latest.json"
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with open(cache_file, 'w') as f:
        json.dump(data, f, indent=2)


if __name__ == "__main__":
    main()
