#!/usr/bin/env python3
"""
Microsoft Outlook OAuth Setup Helper
Completes the OAuth flow to get access and refresh tokens.

Usage:
    python outlook_auth.py

SETUP REQUIRED FIRST:
1. Go to https://portal.azure.com/
2. Search for "App registrations" and click it
3. Click "New registration"
4. Name: "Telos Calendar" (or whatever you want)
5. Supported account types: "Personal Microsoft accounts only"
   (or "Accounts in any organizational directory and personal Microsoft accounts" for work+personal)
6. Redirect URI: Select "Web" and enter: http://localhost:8081/callback
7. Click "Register"
8. Copy the "Application (client) ID" - this is your MICROSOFT_CLIENT_ID
9. Go to "Certificates & secrets" in the left menu
10. Click "New client secret", add a description, select expiry
11. Copy the secret VALUE (not the ID) - this is your MICROSOFT_CLIENT_SECRET
12. Add these to your integrations.env file
13. Run this script to complete OAuth
"""

import os
import sys
import webbrowser
import http.server
import socketserver
import urllib.parse
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
ENV_FILE = CONFIG_DIR / "integrations.env"

# OAuth settings
REDIRECT_PORT = 8081
REDIRECT_URI = f"http://localhost:{REDIRECT_PORT}/callback"
# Use "organizations" for work/school accounts
AUTH_URL = "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize"
TOKEN_URL = "https://login.microsoftonline.com/organizations/oauth2/v2.0/token"
SCOPES = "openid profile email offline_access Calendars.Read User.Read"


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


def save_tokens(access_token: str, refresh_token: str):
    """Save tokens to integrations.env"""
    if not ENV_FILE.exists():
        print(f"Error: {ENV_FILE} not found")
        return False

    with open(ENV_FILE, 'r') as f:
        content = f.read()

    # Replace token lines
    lines = content.split('\n')
    new_lines = []
    for line in lines:
        if line.startswith('MICROSOFT_ACCESS_TOKEN='):
            new_lines.append(f'MICROSOFT_ACCESS_TOKEN={access_token}')
        elif line.startswith('MICROSOFT_REFRESH_TOKEN='):
            new_lines.append(f'MICROSOFT_REFRESH_TOKEN={refresh_token}')
        else:
            new_lines.append(line)

    with open(ENV_FILE, 'w') as f:
        f.write('\n'.join(new_lines))

    return True


class OAuthHandler(http.server.SimpleHTTPRequestHandler):
    """Handle OAuth callback"""

    auth_code = None

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/callback':
            query = urllib.parse.parse_qs(parsed.query)
            if 'code' in query:
                OAuthHandler.auth_code = query['code'][0]
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(b"""
                <html>
                <body style="font-family: system-ui; text-align: center; padding: 50px;">
                    <h1>Microsoft Authorization Successful!</h1>
                    <p>You can close this window and return to the terminal.</p>
                </body>
                </html>
                """)
            elif 'error' in query:
                error = query.get('error', ['Unknown'])[0]
                error_desc = query.get('error_description', [''])[0]
                self.send_response(400)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(f"""
                <html>
                <body style="font-family: system-ui; text-align: center; padding: 50px;">
                    <h1>Error: {error}</h1>
                    <p>{error_desc}</p>
                </body>
                </html>
                """.encode())
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        pass  # Suppress logging


def main():
    print("=" * 60)
    print("Microsoft Outlook OAuth Setup")
    print("=" * 60)

    # Load credentials
    env = load_env()
    client_id = env.get('MICROSOFT_CLIENT_ID')
    client_secret = env.get('MICROSOFT_CLIENT_SECRET')

    if not client_id or client_id == 'your_client_id_here':
        print("\nError: MICROSOFT_CLIENT_ID not configured!")
        print("\nYou need to register an Azure app first:")
        print("1. Go to https://portal.azure.com/")
        print("2. Search for 'App registrations'")
        print("3. Click 'New registration'")
        print("4. Name: 'Telos Calendar'")
        print("5. Account type: 'Personal Microsoft accounts only'")
        print(f"6. Redirect URI: Web -> {REDIRECT_URI}")
        print("7. Click 'Register'")
        print("8. Copy 'Application (client) ID' to integrations.env as MICROSOFT_CLIENT_ID")
        print("9. Go to 'Certificates & secrets' -> 'New client secret'")
        print("10. Copy the secret VALUE to integrations.env as MICROSOFT_CLIENT_SECRET")
        print("\nThen run this script again.")
        sys.exit(1)

    if not client_secret or client_secret == 'your_client_secret_here':
        print("\nError: MICROSOFT_CLIENT_SECRET not configured!")
        print("Go to Azure portal -> Your app -> Certificates & secrets")
        print("Create a new client secret and add the VALUE to integrations.env")
        sys.exit(1)

    print(f"\nClient ID: {client_id[:8]}...")
    print(f"Redirect URI: {REDIRECT_URI}")
    print(f"Scopes: {SCOPES}")

    # Build authorization URL
    auth_params = {
        'client_id': client_id,
        'redirect_uri': REDIRECT_URI,
        'response_type': 'code',
        'scope': SCOPES,
        'response_mode': 'query',
        'state': 'telos_outlook_setup'
    }
    auth_url = f"{AUTH_URL}?{urllib.parse.urlencode(auth_params)}"

    print("\n" + "-" * 60)
    print("Step 1: Opening browser for Microsoft sign-in...")
    print("-" * 60)
    print(f"\nIf browser doesn't open, visit:\n{auth_url}\n")

    # Start local server
    with socketserver.TCPServer(("", REDIRECT_PORT), OAuthHandler) as httpd:
        print(f"Waiting for callback on port {REDIRECT_PORT}...")

        # Open browser
        webbrowser.open(auth_url)

        # Wait for callback
        while OAuthHandler.auth_code is None:
            httpd.handle_request()

    auth_code = OAuthHandler.auth_code
    print(f"\nReceived authorization code: {auth_code[:30]}...")

    print("\n" + "-" * 60)
    print("Step 2: Exchanging code for tokens...")
    print("-" * 60)

    # Exchange code for tokens
    token_data = {
        'grant_type': 'authorization_code',
        'code': auth_code,
        'redirect_uri': REDIRECT_URI,
        'client_id': client_id,
        'client_secret': client_secret,
        'scope': SCOPES
    }

    try:
        response = requests.post(TOKEN_URL, data=token_data)
        response.raise_for_status()
        tokens = response.json()
    except requests.RequestException as e:
        print(f"Error exchanging code: {e}")
        if hasattr(e, 'response') and e.response:
            print(f"Response: {e.response.text}")
        sys.exit(1)

    access_token = tokens.get('access_token')
    refresh_token = tokens.get('refresh_token')
    expires_in = tokens.get('expires_in', 0)

    if not access_token:
        print("Error: No access token in response")
        print(f"Response: {tokens}")
        sys.exit(1)

    print(f"\nAccess token: {access_token[:30]}...")
    print(f"Refresh token: {refresh_token[:30] if refresh_token else 'None'}...")
    print(f"Expires in: {expires_in} seconds ({expires_in // 3600} hours)")

    print("\n" + "-" * 60)
    print("Step 3: Saving tokens...")
    print("-" * 60)

    if save_tokens(access_token, refresh_token or ''):
        print(f"\nTokens saved to: {ENV_FILE}")
        print("\n" + "=" * 60)
        print("Setup complete! You can now run:")
        print("  python outlook.py --days 1")
        print("=" * 60)
    else:
        print("\nFailed to save tokens. Please add manually:")
        print(f"MICROSOFT_ACCESS_TOKEN={access_token}")
        print(f"MICROSOFT_REFRESH_TOKEN={refresh_token}")


if __name__ == "__main__":
    main()
