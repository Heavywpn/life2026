# MCP Servers Setup Guide 🚀

Complete guide for setting up both the Fabric and Autotask MCP servers.

## Prerequisites

- Ubuntu/Debian Linux system
- Python 3.12+
- Sudo access (for installing system packages)
- Claude Desktop or Cursor IDE

## Quick Setup (Both Servers)

### Step 1: Install System Dependencies

```bash
# Update package list
sudo apt update

# Install Python venv and pip
sudo apt install -y python3.12-venv python3-pip
```

### Step 2: Set Up Fabric MCP Server

```bash
cd ~/life/trumethods/10yearBusinessPlan/fabric-mcp-server

# Run the setup script
./setup.sh

# Or manually:
python3 -m venv .venv
.venv/bin/pip install mcp httpx python-dotenv
cp .env.example .env
```

### Step 3: Set Up Autotask MCP Server

```bash
cd ~/life/trumethods/10yearBusinessPlan/autotask-mcp-server

# Run the setup script
./setup.sh

# Edit .env with your Autotask credentials
nano .env
```

Add your Autotask credentials:
```env
AUTOTASK_API_USERNAME=your_username
AUTOTASK_API_SECRET=your_secret
AUTOTASK_API_INTEGRATION_CODE=your_code
AUTOTASK_ZONE=ww6
```

### Step 4: Test Both Servers

#### Test Fabric Server:
```bash
cd ~/life/trumethods/10yearBusinessPlan/fabric-mcp-server
.venv/bin/python3 src/main.py
```

Expected output:
```
🚀 Loading Fabric patterns...
✅ Loaded 228 Fabric patterns
📊 Categories: analysis, creation, extraction, ...
📡 Starting Fabric MCP server in stdio mode
```

Press `Ctrl+C` to stop.

#### Test Autotask Server:
```bash
cd ~/life/trumethods/10yearBusinessPlan/autotask-mcp-server
.venv/bin/python3 src/main.py
```

Expected output:
```
MCP Server running on stdio
```

Press `Ctrl+C` to stop.

## Claude Desktop Configuration

### Location

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Linux:** `~/.config/Claude/claude_desktop_config.json`

### Configuration File

Create or edit the `claude_desktop_config.json` file:

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
        "AUTOTASK_API_INTEGRATION_CODE": "your_integration_code",
        "AUTOTASK_ZONE": "ww6"
      }
    }
  }
}
```

**Important:**
- Use **absolute paths** for both `command` and `args`
- Replace `/home/rick/...` with your actual paths
- Replace Autotask credentials with your actual credentials

### Restart Claude Desktop

Completely quit and restart Claude Desktop for changes to take effect.

## Cursor IDE Configuration

Add to `.cursor/mcp.json` in your project:

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
        "AUTOTASK_API_INTEGRATION_CODE": "your_integration_code",
        "AUTOTASK_ZONE": "ww6"
      }
    }
  }
}
```

## Verification

### Test Fabric Patterns

Open Claude Desktop and ask:

```
List all Fabric patterns
```

```
List Fabric patterns in the extraction category
```

```
Apply the extract_wisdom pattern to this text:
"The only way to do great work is to love what you do." - Steve Jobs
```

### Test Autotask Integration

```
Search for companies in Autotask with 'Tech' in the name
```

```
Get ticket 12345 from Autotask
```

## Troubleshooting

### "Module not found" Error

```bash
# Make sure you installed dependencies
cd fabric-mcp-server  # or autotask-mcp-server
.venv/bin/pip list

# Reinstall if needed
.venv/bin/pip install mcp httpx python-dotenv
```

### Claude Can't See Tools

1. **Restart Claude Desktop** completely (quit, not just close window)
2. **Check config syntax** - must be valid JSON
3. **Use absolute paths** - no ~/ or relative paths
4. **Check permissions** - ensure files are readable

### Fabric Patterns Not Loading

1. **Check internet connection** - patterns download from GitHub
2. **Wait for startup** - first run takes ~30 seconds
3. **Check cache** - delete `~/.fabric_mcp_cache` if needed
4. **Run manually** to see errors:
   ```bash
   .venv/bin/python3 src/main.py
   ```

### Autotask Authentication Error

1. **Check credentials** in .env file
2. **Verify API user** in Autotask Admin > API User Security
3. **Check zone** (ww6, ww4, etc.)
4. **Test connectivity** to Autotask servers

### Permission Denied

```bash
# Make sure scripts are executable
chmod +x fabric-mcp-server/setup.sh
chmod +x autotask-mcp-server/setup.sh
```

## Manual Installation (Alternative)

If setup scripts don't work, install manually:

```bash
# For Fabric
cd fabric-mcp-server
python3 -m venv .venv
.venv/bin/pip install --upgrade pip
.venv/bin/pip install mcp httpx python-dotenv
cp .env.example .env

# For Autotask
cd autotask-mcp-server
python3 -m venv .venv
.venv/bin/pip install --upgrade pip
.venv/bin/pip install mcp httpx python-dotenv
cp .env.example .env
# Edit .env with credentials
```

## Getting Autotask API Credentials

1. Log into your Autotask instance
2. Navigate to **Admin** → **API User Security**
3. Create or select an API user
4. Copy:
   - **API Integration Code**
   - **Username**
   - **Secret**
5. Find your zone at: https://ww1.autotask.net/help/Content/AdminSetup/2ExtensionsIntegrations/APIs/REST/GettingStarted.htm

## Directory Structure

```
10yearBusinessPlan/
├── fabric-mcp-server/
│   ├── .venv/              # Virtual environment
│   ├── src/
│   │   ├── main.py
│   │   └── pattern_loader.py
│   ├── .env                # Configuration
│   ├── setup.sh            # Setup script
│   └── README.md
├── autotask-mcp-server/
│   ├── .venv/              # Virtual environment
│   ├── src/
│   │   ├── main.py
│   │   └── autotask_client.py
│   ├── .env                # Configuration with credentials
│   ├── setup.sh            # Setup script
│   └── README.md
└── SETUP_GUIDE.md          # This file
```

## Quick Command Reference

```bash
# Install system dependencies
sudo apt install -y python3.12-venv python3-pip

# Setup Fabric
cd fabric-mcp-server && ./setup.sh

# Setup Autotask
cd autotask-mcp-server && ./setup.sh

# Test Fabric
cd fabric-mcp-server && .venv/bin/python3 src/main.py

# Test Autotask
cd autotask-mcp-server && .venv/bin/python3 src/main.py

# Get Python paths for config
echo "$(pwd)/.venv/bin/python3"
```

## Support Resources

- [Fabric GitHub](https://github.com/danielmiessler/Fabric)
- [Autotask API Docs](https://ww6.autotask.net/help/developerhelp/)
- [MCP Documentation](https://modelcontextprotocol.io/)
- [Claude Desktop](https://claude.ai/download)

## Next Steps

1. ✅ Install system dependencies
2. ✅ Run setup scripts for both servers
3. ✅ Test both servers manually
4. ✅ Configure Claude Desktop
5. ✅ Restart Claude Desktop
6. ✅ Test with example commands
7. ✅ Explore Fabric patterns and Autotask tools!

---

**You're all set! 🎉**

Both MCP servers are ready to use with Claude Desktop or Cursor IDE.
