# Final Setup Steps - Both MCP Servers Ready! 🎉

Both the **Fabric MCP Server** (228 AI patterns) and **Autotask MCP Server** (35+ tools) are installed and ready to use!

## Option 1: Just Fabric (No Autotask Credentials Needed) ✅

If you want to start with just Fabric patterns:

### Copy Configuration:
```bash
cp ~/life/trumethods/10yearBusinessPlan/claude_desktop_config.json ~/.config/Claude/claude_desktop_config.json
```

This will give you access to all 228 Fabric AI patterns.

---

## Option 2: Both Fabric + Autotask (Requires Autotask Credentials) 🎫

### Step 1: Add Your Autotask Credentials

Edit the combined config file:
```bash
nano ~/life/trumethods/10yearBusinessPlan/claude_desktop_config_BOTH.json
```

Replace these placeholders with your actual Autotask credentials:
- `YOUR_USERNAME_HERE` → your actual Autotask username
- `YOUR_SECRET_HERE` → your actual Autotask secret
- `YOUR_INTEGRATION_CODE_HERE` → your actual integration code
- `ww6` → your Autotask zone (if different)

**Save:** Press `Ctrl+X`, then `Y`, then `Enter`

### Step 2: Copy the Combined Configuration

```bash
# Create Claude config directory
mkdir -p ~/.config/Claude

# Copy the combined config
cp ~/life/trumethods/10yearBusinessPlan/claude_desktop_config_BOTH.json ~/.config/Claude/claude_desktop_config.json
```

---

## Get Autotask API Credentials (If You Don't Have Them)

1. Log into your Autotask instance
2. Go to **Admin** → **API User Security**
3. Create or select an API user
4. Copy these values:
   - API Integration Code
   - Username
   - Secret
5. Find your zone (ww4, ww6, etc.) from the Autotask URL

---

## After Copying Configuration

### Verify the Configuration:
```bash
cat ~/.config/Claude/claude_desktop_config.json
```

### Restart Claude Desktop:
1. **Completely quit** Claude Desktop (don't just close the window)
2. **Wait 5 seconds**
3. **Start Claude Desktop** again

---

## Test in Claude Desktop

### Test Fabric (Available for Everyone):

```
List all Fabric patterns
```

```
List Fabric patterns in the extraction category
```

```
Apply the extract_wisdom pattern to this quote:
"The only way to do great work is to love what you do." - Steve Jobs
```

### Test Autotask (Only if you added credentials):

```
Search for companies in Autotask
```

```
List all available Autotask tools
```

---

## What You Get

### With Fabric (228 Patterns):
- 📊 **Analysis** (40+): analyze_claims, analyze_paper, analyze_incident, etc.
- 🎯 **Extraction** (40+): extract_wisdom, extract_ideas, extract_insights, etc.
- ✍️ **Creation** (60+): create_summary, create_quiz, create_visualization, etc.
- 📝 **Summarization** (15+): summarize, summarize_micro, summarize_paper, etc.
- 🔧 **Improvement** (10+): improve_writing, improve_prompt, etc.
- And many more categories!

### With Autotask (35+ Tools):
- 🎫 **Tickets**: Create, update, search, add notes
- 🏢 **Companies**: Get, create, search companies
- 👥 **Contacts**: Get, create, search contacts
- 📋 **Projects**: Get, create, search projects
- ✅ **Tasks**: Get, create, search tasks
- ⏱️ **Time Entries**: Create, search time logs
- 💻 **Configuration Items**: Manage assets
- 💼 **Contracts**: View and search contracts
- 💡 **Opportunities**: Create and track opportunities
- And more!

---

## Quick Start Commands

### Copy just Fabric config:
```bash
cp ~/life/trumethods/10yearBusinessPlan/claude_desktop_config.json ~/.config/Claude/claude_desktop_config.json
```

### Or copy both (after adding credentials):
```bash
nano ~/life/trumethods/10yearBusinessPlan/claude_desktop_config_BOTH.json
# Edit credentials, save
cp ~/life/trumethods/10yearBusinessPlan/claude_desktop_config_BOTH.json ~/.config/Claude/claude_desktop_config.json
```

### Verify:
```bash
cat ~/.config/Claude/claude_desktop_config.json
```

### Then: Restart Claude Desktop!

---

## Troubleshooting

### Claude Doesn't Show the Tools?

1. **Verify config exists:**
   ```bash
   ls -la ~/.config/Claude/claude_desktop_config.json
   ```

2. **Check JSON syntax:**
   ```bash
   cat ~/.config/Claude/claude_desktop_config.json | python3 -m json.tool
   ```

3. **Completely quit Claude Desktop** (not just close window)

4. **Check if servers work manually:**
   ```bash
   # Test Fabric
   cd ~/life/trumethods/10yearBusinessPlan/fabric-mcp-server
   .venv/bin/python3 src/main.py
   # Should show: Loading patterns... ✅ Loaded 228 patterns

   # Test Autotask
   cd ~/life/trumethods/10yearBusinessPlan/autotask-mcp-server
   .venv/bin/python3 src/main.py
   # Should show: MCP Server running on stdio
   ```

### Autotask Authentication Errors?

- Verify credentials in the config file
- Check that API user is active in Autotask
- Confirm zone is correct (ww6, ww4, etc.)

---

## 🎯 Recommended: Start with Fabric

I recommend starting with just Fabric (Option 1) to test everything works, then add Autotask later if needed:

```bash
# Quick setup - Just Fabric
cp ~/life/trumethods/10yearBusinessPlan/claude_desktop_config.json ~/.config/Claude/claude_desktop_config.json
```

Then restart Claude Desktop and try:
```
List all Fabric patterns
```

---

## Summary

✅ Both servers installed successfully
✅ Configuration files created
✅ Ready to use!

**Next:** Choose Option 1 or Option 2 above, copy the config, restart Claude Desktop, and start using your new AI powers! 🚀
