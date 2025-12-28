# ⚠️ ACTION REQUIRED: Register Redirect URI

## Your Setup is GOOD ✓

The diagnostic showed:
- ✓ Port 8080 available
- ✓ Python dependencies installed
- ✓ Configuration correct

## The ONE Thing You Need to Do

**Register the redirect URI in Whoop Developer Dashboard**

### Step-by-Step Instructions

#### 1. Open Your Browser

Go to: **https://developer-dashboard.whoop.com/**

#### 2. Log In

Use your Whoop developer account credentials

#### 3. Navigate to Your App

You should see your app listed:
- App ID: `603e12fa-1d71-4dc5-b707-2905670e1e51`
- Click on it to open the app settings

#### 4. Find the Redirect URI Field

Look for one of these sections:
- **"Redirect URIs"**
- **"OAuth Settings"**
- **"OAuth Redirect URIs"**
- **"Callback URLs"**
- **"Authorized Redirect URIs"**

It might be in:
- Settings tab
- OAuth tab
- Configuration tab
- API Settings section

#### 5. Add This Exact URL

Click "Add" or "New Redirect URI" and enter:

```
http://localhost:8080/callback
```

**⚠️ CRITICAL: Must be EXACTLY this:**
- Use `http://` (not `https://`)
- Use `localhost` (not `127.0.0.1`)
- Use port `8080`
- Include `/callback` at the end
- No trailing slash
- No extra spaces

#### 6. Save/Apply Changes

Click the Save/Update/Apply button

#### 7. Wait 30 Seconds

Sometimes changes take a moment to propagate

#### 8. Test Authentication

```bash
./whoop --auth-only
```

## What Should Happen

### ✅ Success Looks Like:

```
Starting local server to receive OAuth callback...
Redirect URI: http://localhost:8080/callback

Opening browser for authorization...
Waiting for authorization callback...
(Listening on http://localhost:8080/callback)

[DEBUG] Callback received:
[DEBUG] Path: /callback?code=abc123def456...
[DEBUG] Query params: {'code': ['abc123def456...']}
[DEBUG] ✓ Authorization code received: abc123def456...

Exchanging authorization code for tokens...

Authentication successful!
Access token: eyJhbGciOiJSUzI1Ni...
Refresh token: eyJhbGciOiJSUzI1Ni...
Tokens saved to whoop_tokens.json

✓ Authentication complete!
```

### ❌ Failure Looks Like:

```
[DEBUG] Callback received:
[DEBUG] Path: /callback
[DEBUG] Query params: {}
[DEBUG] ✗ No authorization code or error in callback
```

This means redirect URI is NOT registered properly.

## Still Having Issues?

### Issue 1: Can't Find Redirect URI Field

**Try these locations in the dashboard:**
1. Click on your app name
2. Look for tabs: Settings, OAuth, Configuration, API
3. Scroll down - the field might be below the fold
4. Look for a section labeled "OAuth 2.0" or "Authorization"

### Issue 2: Browser Shows "redirect_uri_mismatch"

This means:
- The URI in dashboard doesn't match exactly
- Double-check for typos
- Ensure no trailing slash
- Must be `http://` not `https://`

### Issue 3: Browser Shows "invalid_client"

This means:
- Your Client ID or Secret might be wrong
- Re-check `config.py` has the correct credentials

### Issue 4: Nothing Happens in Browser

The authorization URL is:
```
https://api.prod.whoop.com/oauth/oauth2/auth?client_id=603e12fa-1d71-4dc5-b707-2905670e1e51&redirect_uri=http://localhost:8080/callback&response_type=code&scope=read:recovery%20read:cycles%20read:sleep%20read:workout%20read:profile%20read:body_measurement%20offline
```

Copy and paste this into your browser manually.

## Need Help?

Run diagnostics again:
```bash
./check
```

Check what's using port 8080:
```bash
lsof -i :8080
```

Test port manually:
```bash
python3 -m http.server 8080
# Then Ctrl+C to stop
```

## After Successful Registration

Once you see "✓ Authentication complete!", you can fetch data:

```bash
./whoop --days 30
```

This will download your last 30 days of Whoop data!
