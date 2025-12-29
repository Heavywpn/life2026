#!/usr/bin/env python3
"""
WHOOP OAuth Setup Helper
Completes the OAuth flow to get access and refresh tokens.

Usage:
    python whoop_auth.py

This will:
1. Open your browser to authorize with WHOOP
2. Start a local server to receive the callback
3. Exchange the code for tokens
4. Save tokens to your integrations.env file
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
REDIRECT_PORT = 8080
REDIRECT_URI = f"http://localhost:{REDIRECT_PORT}/callback"
AUTH_URL = "https://api.prod.whoop.com/oauth/oauth2/auth"
TOKEN_URL = "https://api.prod.whoop.com/oauth/oauth2/token"
SCOPES = "read:recovery read:sleep read:workout read:cycles read:profile offline"


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
        if line.startswith('WHOOP_ACCESS_TOKEN='):
            new_lines.append(f'WHOOP_ACCESS_TOKEN={access_token}')
        elif line.startswith('WHOOP_REFRESH_TOKEN='):
            new_lines.append(f'WHOOP_REFRESH_TOKEN={refresh_token}')
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
                    <h1>Authorization Successful!</h1>
                    <p>You can close this window and return to the terminal.</p>
                </body>
                </html>
                """)
            else:
                error = query.get('error', ['Unknown error'])[0]
                self.send_response(400)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(f"<h1>Error: {error}</h1>".encode())
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        pass  # Suppress logging


def main():
    print("=" * 60)
    print("WHOOP OAuth Setup")
    print("=" * 60)

    # Load credentials
    env = load_env()
    client_id = env.get('WHOOP_CLIENT_ID')
    client_secret = env.get('WHOOP_CLIENT_SECRET')

    if not client_id or not client_secret:
        print("Error: WHOOP_CLIENT_ID and WHOOP_CLIENT_SECRET must be set in integrations.env")
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
        'state': 'telos_setup'
    }
    auth_url = f"{AUTH_URL}?{urllib.parse.urlencode(auth_params)}"

    print("\n" + "-" * 60)
    print("Step 1: Opening browser for authorization...")
    print("-" * 60)
    print(f"\nIf browser doesn't open, visit this URL:\n{auth_url}\n")

    # Start local server
    with socketserver.TCPServer(("", REDIRECT_PORT), OAuthHandler) as httpd:
        print(f"Waiting for callback on port {REDIRECT_PORT}...")

        # Open browser
        webbrowser.open(auth_url)

        # Wait for callback
        while OAuthHandler.auth_code is None:
            httpd.handle_request()

    auth_code = OAuthHandler.auth_code
    print(f"\nReceived authorization code: {auth_code[:20]}...")

    print("\n" + "-" * 60)
    print("Step 2: Exchanging code for tokens...")
    print("-" * 60)

    # Exchange code for tokens
    token_data = {
        'grant_type': 'authorization_code',
        'code': auth_code,
        'redirect_uri': REDIRECT_URI,
        'client_id': client_id,
        'client_secret': client_secret
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

    print(f"\nAccess token: {access_token[:20]}...")
    print(f"Refresh token: {refresh_token[:20] if refresh_token else 'None'}...")
    print(f"Expires in: {expires_in} seconds")

    print("\n" + "-" * 60)
    print("Step 3: Saving tokens...")
    print("-" * 60)

    if save_tokens(access_token, refresh_token or ''):
        print(f"\nTokens saved to: {ENV_FILE}")
        print("\n" + "=" * 60)
        print("Setup complete! You can now run:")
        print("  python whoop.py --days 1")
        print("=" * 60)
    else:
        print("\nFailed to save tokens. Please add manually:")
        print(f"WHOOP_ACCESS_TOKEN={access_token}")
        print(f"WHOOP_REFRESH_TOKEN={refresh_token}")


if __name__ == "__main__":
    main()
