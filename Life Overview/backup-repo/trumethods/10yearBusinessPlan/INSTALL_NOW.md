# Quick Installation Instructions 🚀

## Run These Commands Now

Copy and paste these commands in your terminal:

### 1. Install System Dependencies (Requires sudo password)

```bash
sudo apt update && sudo apt install -y python3.12-venv python3-pip
```

### 2. Setup Fabric MCP Server

```bash
cd ~/life/trumethods/10yearBusinessPlan/fabric-mcp-server
./setup.sh
```

### 3. Setup Autotask MCP Server

```bash
cd ~/life/trumethods/10yearBusinessPlan/autotask-mcp-server
./setup.sh
```

**Note:** The Autotask setup will ask you to edit the `.env` file with your credentials.

### 4. Add Autotask Credentials

```bash
cd ~/life/trumethods/10yearBusinessPlan/autotask-mcp-server
nano .env
```

Update these lines:
```
AUTOTASK_API_USERNAME=your_actual_username
AUTOTASK_API_SECRET=your_actual_secret
AUTOTASK_API_INTEGRATION_CODE=your_actual_code
AUTOTASK_ZONE=ww6
```

Press `Ctrl+X`, then `Y`, then `Enter` to save.

### 5. Test Fabric Server

```bash
cd ~/life/trumethods/10yearBusinessPlan/fabric-mcp-server
.venv/bin/python3 src/main.py
```

You should see:
```
🚀 Loading Fabric patterns...
✅ Loaded 228 Fabric patterns
📊 Categories: analysis, creation, extraction, ...
```

Press `Ctrl+C` to stop.

### 6. Test Autotask Server (if you have credentials)

```bash
cd ~/life/trumethods/10yearBusinessPlan/autotask-mcp-server
.venv/bin/python3 src/main.py
```

You should see:
```
MCP Server running on stdio
```

Press `Ctrl+C` to stop.

## Configure Claude Desktop

Create or edit: `~/.config/Claude/claude_desktop_config.json`

```bash
mkdir -p ~/.config/Claude
nano ~/.config/Claude/claude_desktop_config.json
```

Paste this configuration:

```json
{
  "mcpServers": {
    "fabric": {
      "command": "/home/rick/life/trumethods/10yearBusinessPlan/fabric-mcp-server/.venv/bin/python3",
      "args": ["/home/rick/life/trumethods/10yearBusinessPlan/fabric-mcp-server/src/main.py"],
      "env": {
        "TRANSPORT": "stdio"
      }
    },
    "autotask": {
      "command": "/home/rick/life/trumethods/10yearBusinessPlan/autotask-mcp-server/.venv/bin/python3",
      "args": ["/home/rick/life/trumethods/10yearBusinessPlan/autotask-mcp-server/src/main.py"],
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

**Important:** Replace `your_username`, `your_secret`, `your_code` with your actual Autotask credentials!

Press `Ctrl+X`, then `Y`, then `Enter` to save.

## Restart Claude Desktop

Completely quit Claude Desktop and restart it.

## Test in Claude

Once Claude Desktop restarts, try these commands:

### Test Fabric:
```
List all Fabric patterns in the extraction category
```

### Test Autotask (if configured):
```
Search for companies in Autotask
```

## Done! 🎉

You now have:
- ✅ **Fabric MCP Server** with 228 AI patterns
- ✅ **Autotask MCP Server** with 35+ tools
- ✅ Both integrated with Claude Desktop

## Troubleshooting

If something doesn't work:

1. **Check terminal output** for error messages
2. **Verify paths** in claude_desktop_config.json are absolute
3. **Restart Claude Desktop** completely
4. **Check logs** in Claude Desktop if tools don't appear
5. **Review** `~/life/trumethods/10yearBusinessPlan/SETUP_GUIDE.md` for detailed help

## Need Help?

See the comprehensive guide:
```bash
cat ~/life/trumethods/10yearBusinessPlan/SETUP_GUIDE.md
```

---

**Start with step 1 and work your way down!** 🚀
