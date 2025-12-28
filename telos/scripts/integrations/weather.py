#!/usr/bin/env python3
"""
Weather Integration for Telos
Fetches current weather and forecast.

Usage:
    python weather.py [--output FILE]

Options:
    - Uses wttr.in (no API key required) as default
    - Can use OpenWeatherMap if API key is provided

Setup (optional for OpenWeatherMap):
    1. Get free API key from https://openweathermap.org/api
    2. Add to .claude/config/integrations.env
"""

import os
import sys
import json
import argparse
from datetime import datetime
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


def fetch_wttr(city: str) -> dict:
    """Fetch weather from wttr.in (no API key needed)"""
    url = f"https://wttr.in/{city}?format=j1"

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching weather from wttr.in: {e}")
        return {}


def fetch_openweather(api_key: str, city: str, country: str, units: str = "metric") -> dict:
    """Fetch weather from OpenWeatherMap API"""
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": f"{city},{country}",
        "appid": api_key,
        "units": units
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching weather from OpenWeatherMap: {e}")
        return {}


def format_wttr_for_journal(data: dict) -> str:
    """Format wttr.in data for journal inclusion"""
    output = []
    output.append("## Weather")
    output.append(f"*Synced: {datetime.now().strftime('%Y-%m-%d %H:%M')}*\n")

    if not data:
        output.append("*Weather data unavailable*\n")
        return "\n".join(output)

    # Current conditions
    current = data.get("current_condition", [{}])[0]
    area = data.get("nearest_area", [{}])[0]

    location = area.get("areaName", [{}])[0].get("value", "Unknown")
    region = area.get("region", [{}])[0].get("value", "")
    country = area.get("country", [{}])[0].get("value", "")

    temp_c = current.get("temp_C", "N/A")
    feels_like = current.get("FeelsLikeC", "N/A")
    humidity = current.get("humidity", "N/A")
    weather_desc = current.get("weatherDesc", [{}])[0].get("value", "Unknown")
    wind_kmph = current.get("windspeedKmph", "N/A")
    wind_dir = current.get("winddir16Point", "")
    uv_index = current.get("uvIndex", "N/A")

    output.append(f"### Current: {location}")
    if region:
        output.append(f"*{region}, {country}*\n")

    output.append(f"- **Conditions:** {weather_desc}")
    output.append(f"- **Temperature:** {temp_c}°C (feels like {feels_like}°C)")
    output.append(f"- **Humidity:** {humidity}%")
    output.append(f"- **Wind:** {wind_kmph} km/h {wind_dir}")
    output.append(f"- **UV Index:** {uv_index}")
    output.append("")

    # Today's forecast
    weather = data.get("weather", [])
    if weather:
        today = weather[0]
        max_temp = today.get("maxtempC", "N/A")
        min_temp = today.get("mintempC", "N/A")
        sunrise = today.get("astronomy", [{}])[0].get("sunrise", "N/A")
        sunset = today.get("astronomy", [{}])[0].get("sunset", "N/A")

        output.append("### Today's Forecast")
        output.append(f"- **High/Low:** {max_temp}°C / {min_temp}°C")
        output.append(f"- **Sunrise:** {sunrise}")
        output.append(f"- **Sunset:** {sunset}")
        output.append("")

        # Hourly highlights
        hourly = today.get("hourly", [])
        if hourly:
            output.append("### Hourly Outlook")
            key_hours = [h for h in hourly if int(h.get("time", "0")) in [600, 900, 1200, 1500, 1800, 2100]]
            for hour in key_hours[:6]:
                time_val = int(hour.get("time", "0"))
                time_str = f"{time_val // 100:02d}:00"
                temp = hour.get("tempC", "N/A")
                desc = hour.get("weatherDesc", [{}])[0].get("value", "")
                rain_chance = hour.get("chanceofrain", "0")

                rain_str = f" ({rain_chance}% rain)" if int(rain_chance) > 20 else ""
                output.append(f"- **{time_str}:** {temp}°C - {desc}{rain_str}")
            output.append("")

    return "\n".join(output)


def format_openweather_for_journal(data: dict) -> str:
    """Format OpenWeatherMap data for journal inclusion"""
    output = []
    output.append("## Weather")
    output.append(f"*Synced: {datetime.now().strftime('%Y-%m-%d %H:%M')}*\n")

    if not data:
        output.append("*Weather data unavailable*\n")
        return "\n".join(output)

    location = data.get("name", "Unknown")
    country = data.get("sys", {}).get("country", "")

    main = data.get("main", {})
    temp = main.get("temp", "N/A")
    feels_like = main.get("feels_like", "N/A")
    humidity = main.get("humidity", "N/A")

    weather = data.get("weather", [{}])[0]
    description = weather.get("description", "Unknown").capitalize()

    wind = data.get("wind", {})
    wind_speed = wind.get("speed", "N/A")

    output.append(f"### Current: {location}, {country}")
    output.append(f"- **Conditions:** {description}")
    output.append(f"- **Temperature:** {temp}°C (feels like {feels_like}°C)")
    output.append(f"- **Humidity:** {humidity}%")
    output.append(f"- **Wind:** {wind_speed} m/s")
    output.append("")

    return "\n".join(output)


def main():
    parser = argparse.ArgumentParser(description="Fetch weather for Telos journal")
    parser.add_argument("--city", type=str, help="City name (default: from config or Brisbane)")
    parser.add_argument("--output", type=str, help="Output file path (default: stdout)")
    parser.add_argument("--json", action="store_true", help="Output raw JSON instead of markdown")
    parser.add_argument("--source", choices=["wttr", "openweather"], default="wttr",
                       help="Weather source (default: wttr)")
    args = parser.parse_args()

    # Load config
    env = load_env()
    city = args.city or env.get("WEATHER_CITY", "Brisbane")
    country = env.get("WEATHER_COUNTRY", "AU")

    # Fetch weather
    if args.source == "openweather":
        api_key = env.get("OPENWEATHER_API_KEY")
        if not api_key:
            print("Error: OPENWEATHER_API_KEY not found, falling back to wttr.in")
            data = fetch_wttr(city)
            output = format_wttr_for_journal(data) if not args.json else json.dumps(data, indent=2)
        else:
            data = fetch_openweather(api_key, city, country)
            output = format_openweather_for_journal(data) if not args.json else json.dumps(data, indent=2)
    else:
        data = fetch_wttr(city)
        output = format_wttr_for_journal(data) if not args.json else json.dumps(data, indent=2)

    if args.output:
        output_path = Path(args.output)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w') as f:
            f.write(output)
        print(f"Data written to: {output_path}")
    else:
        print(output)

    # Save JSON cache
    cache_file = DATA_DIR / "weather_latest.json"
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with open(cache_file, 'w') as f:
        json.dump(data, f, indent=2)


if __name__ == "__main__":
    main()
