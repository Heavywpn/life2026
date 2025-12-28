# MUST DO: Register Redirect URI

## The Problem

You're getting "Authorization failed" because Whoop doesn't know where to send you back after login.

## The Solution (Takes 2 minutes)

### Step 1: Open Whoop Developer Dashboard

Go to: **https://developer-dashboard.whoop.com/**

### Step 2: Select Your Application

Click on your app: **603e12fa-1d71-4dc5-b707-2905670e1e51**

### Step 3: Find Redirect URIs Section

Look for a section called:
- "Redirect URIs" or
- "OAuth Redirect URIs" or
- "Callback URLs"

### Step 4: Add This EXACT URL

```
http://localhost:8080/callback
```

**IMPORTANT:** It must be EXACTLY this:
- ✓ `http://localhost:8080/callback` (correct)
- ✗ `https://localhost:8080/callback` (wrong - https)
- ✗ `http://localhost:8080` (wrong - missing /callback)
- ✗ `http://localhost:8080/` (wrong - extra slash)

### Step 5: SAVE

Click Save/Update/Apply (whatever button saves the changes)

### Step 6: Wait a Moment

Sometimes it takes 10-30 seconds for the change to propagate.

### Step 7: Try Authentication Again

```bash
./whoop --auth-only
```

## What Should Happen

1. Browser opens with Whoop login
2. You log in to your Whoop account
3. Whoop asks "Allow this app to access your data?"
4. You click "Allow"
5. Browser redirects to `http://localhost:8080/callback?code=...`
6. Terminal shows "✓ Authorization code received"
7. Tokens are saved

## Still Not Working?

Run the diagnostic:
```bash
source venv/bin/activate
python check_setup.py
```

### Check These:

1. **Redirect URI registered?**
   - Log in to https://developer-dashboard.whoop.com/
   - Check your app settings
   - Verify `http://localhost:8080/callback` is listed

2. **Port 8080 available?**
   ```bash
   lsof -i :8080
   ```
   (Should show nothing)

3. **Did you click "Allow"?**
   - If you clicked "Deny", try again
   - You need to authorize the app

4. **App enabled in dashboard?**
   - Check if your app is active/enabled
   - Some dashboards have an enable/disable toggle

## Screenshot Locations

When you're in the Whoop Developer Dashboard, look for:
- Settings tab
- OAuth section
- Configuration section
- API Settings section

One of these should have the Redirect URIs field.
