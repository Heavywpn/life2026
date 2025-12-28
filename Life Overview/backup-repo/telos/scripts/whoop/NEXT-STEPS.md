# Whoop Integration - Next Steps

## Current Status

✅ Python virtual environment created
✅ Dependencies installed (requests, python-dotenv)
✅ Script created and ready
❌ **Credentials need verification** - Got "invalid_client" error

## When You Return

### Step 1: Get Correct Credentials from Whoop Developer Portal

1. Go to: https://developer.whoop.com/
2. Log in with your Whoop account
3. Click on your application (should show "10 Remaining test users")
4. Find and copy these THREE values:

   - **Client ID**: `________________________`
   - **Client Secret**: `________________________`
   - **Redirect URI**: Should be `http://localhost:8080/callback`

### Step 2: Update the .env File

```bash
cd /home/rick/life/telos/scripts/whoop
nano .env
```

Replace the values for:
- `WHOOP_CLIENT_ID=` (paste your real Client ID)
- `WHOOP_CLIENT_SECRET=` (paste your real Client Secret)

Save (Ctrl+X, Y, Enter)

### Step 3: Run the Script

```bash
./whoop
```

The browser will open, you'll authorize, and data will flow.

---

## What Went Wrong Earlier?

The "invalid_client" error means the Client ID or Client Secret in `.env` doesn't match what's in your Whoop Developer Portal.

**This is NOT a firewall issue** - the error happens at Whoop's servers before any localhost connection.

---

## After Successful Authentication

Once you authenticate successfully ONE time:
- Script saves a refresh token
- Future runs just work: `./whoop`
- No browser needed after first time
- Data auto-fetched for yesterday (or specify `--date`)

---

## Questions?

Read: `README.md` for full documentation
