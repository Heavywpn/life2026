# Quick Start Guide - Autotask MCP Server

Get up and running with the Autotask MCP Server in 5 minutes!

## Step 1: Get Your Autotask API Credentials

1. Log into your Autotask instance
2. Navigate to **Admin** → **API User Security**
3. Create or select an API user
4. Copy these values:
   - ✅ API Integration Code
   - ✅ Username
   - ✅ Secret
   - ✅ Zone (e.g., ww6, ww4)

## Step 2: Install Dependencies

```bash
# Navigate to the project directory
cd autotask-mcp-server

# Install uv if you don't have it
pip install uv

# Install the project
uv pip install -e .
```

## Step 3: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your credentials
nano .env  # or use your favorite editor
```

Your `.env` should look like this:
```env
TRANSPORT=stdio
AUTOTASK_API_USERNAME=your_actual_username
AUTOTASK_API_SECRET=your_actual_secret
AUTOTASK_API_INTEGRATION_CODE=your_actual_code
AUTOTASK_ZONE=ww6
```

## Step 4: Test the Server

```bash
# Run the server
python src/main.py
```

You should see: `MCP Server running on stdio`

Press `Ctrl+C` to stop.

## Step 5: Connect to Claude Desktop

### For macOS:
Edit `~/Library/Application Support/Claude/claude_desktop_config.json`

### For Windows:
Edit `%APPDATA%\Claude\claude_desktop_config.json`

Add this configuration:
```json
{
  "mcpServers": {
    "autotask": {
      "command": "python",
      "args": ["/FULL/PATH/TO/autotask-mcp-server/src/main.py"],
      "env": {
        "TRANSPORT": "stdio",
        "AUTOTASK_API_USERNAME": "your_username",
        "AUTOTASK_API_SECRET": "your_secret",
        "AUTOTASK_API_INTEGRATION_CODE": "your_code",
        "AUTOTASK_ZONE": "ww6"
      }
    }
  }
}
```

**Important:** Replace `/FULL/PATH/TO/` with the absolute path to your project!

## Step 6: Restart Claude Desktop

Completely quit and restart Claude Desktop for the changes to take effect.

## Step 7: Test It Out!

In Claude Desktop, try asking:

> "Search for companies in Autotask with 'Tech' in the name"

> "Show me ticket 12345 from Autotask"

> "Create a new ticket in Autotask for company 67890 with title 'Test Ticket'"

## 🎉 Success!

You should now see Claude interacting with your Autotask instance!

## Troubleshooting

### "Module not found" error
- Make sure you ran `uv pip install -e .` in the project directory
- Use the full absolute path in the config file

### "Authentication failed" error
- Double-check your credentials in `.env`
- Verify the API user is active in Autotask
- Confirm your zone is correct

### Claude can't see the tools
- Restart Claude Desktop completely
- Check the config file is valid JSON
- Make sure the path to `main.py` is absolute, not relative

### Still having issues?
- Check the main README.md for detailed troubleshooting
- Verify your Python version is 3.12+: `python --version`
- Test the server manually: `python src/main.py`

## Next Steps

- Read the full [README.md](README.md) for all available tools
- Explore the [Autotask API Documentation](https://ww6.autotask.net/help/developerhelp/)
- Customize the tools to match your workflow
- Add new tools for additional Autotask resources

## Common Use Cases

### Create a Ticket
Ask Claude:
> "Create a ticket in Autotask for company 12345 titled 'Network Issue' with description 'Internet down in main office'"

### Log Time
Ask Claude:
> "Log 2.5 hours of work on ticket 9999 for resource 100 with summary 'Troubleshooting network connectivity'"

### Search Projects
Ask Claude:
> "Find all active projects for company 12345 in Autotask"

### Get Company Info
Ask Claude:
> "Show me details for company 12345 in Autotask"

Happy automating! 🚀
