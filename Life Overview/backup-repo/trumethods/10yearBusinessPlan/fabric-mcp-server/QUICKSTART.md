# Quick Start - Fabric MCP Server 🚀

Get up and running with 200+ Fabric AI patterns in 5 minutes!

## Step 1: Install Dependencies

```bash
cd fabric-mcp-server
pip install uv
uv pip install -e .
```

## Step 2: Configure Environment

```bash
cp .env.example .env
```

The default `.env` works out of the box - no configuration needed!

## Step 3: Test the Server

```bash
python src/main.py
```

You should see:
```
🚀 Loading Fabric patterns...
✅ Loaded 200+ Fabric patterns
📊 Categories: analysis, creation, extraction, summarization, ...
📡 Starting Fabric MCP server in stdio mode
```

Press `Ctrl+C` to stop.

## Step 4: Connect to Claude Desktop

### For macOS:
Edit `~/Library/Application Support/Claude/claude_desktop_config.json`

### For Windows:
Edit `%APPDATA%\Claude\claude_desktop_config.json`

Add this configuration:
```json
{
  "mcpServers": {
    "fabric": {
      "command": "python",
      "args": ["/FULL/PATH/TO/fabric-mcp-server/src/main.py"],
      "env": {
        "TRANSPORT": "stdio"
      }
    }
  }
}
```

**Important:** Replace `/FULL/PATH/TO/` with the absolute path!

## Step 5: Restart Claude Desktop

Completely quit and restart Claude Desktop.

## Step 6: Try It Out! 🎉

### Example 1: Extract Wisdom
```
Use the extract_wisdom pattern to analyze this quote:
"The only way to do great work is to love what you do." - Steve Jobs
```

### Example 2: Create a Summary
```
List all Fabric patterns in the 'extraction' category
```

### Example 3: Analyze Content
```
Use the analyze_claims pattern to analyze:
"AI will replace all jobs within 5 years"
```

### Example 4: Create Visualization
```
Use create_mermaid_visualization to create a diagram of:
1. User requests data
2. Server processes request
3. Database returns results
4. Server sends response
```

## 🎯 Most Popular Patterns

### Top 10 Must-Try Patterns:

1. **extract_wisdom** - Extract insights, quotes, and wisdom from any content
2. **create_summary** - Create comprehensive summaries
3. **analyze_paper** - Analyze academic papers
4. **create_quiz** - Generate quiz questions
5. **improve_writing** - Enhance writing quality
6. **summarize_micro** - Ultra-concise summaries
7. **extract_insights** - Extract key learnings
8. **create_visualization** - Create Mermaid diagrams
9. **analyze_claims** - Analyze arguments
10. **rate_content** - Rate content quality

## 🔍 Discovery Commands

### See all patterns:
```
List all Fabric patterns
```

### See patterns by category:
```
List all Fabric patterns in the 'creation' category
```

### Get pattern details:
```
Get info about the extract_wisdom pattern
```

### See all categories:
```
Show me all Fabric pattern categories
```

## 💡 Usage Patterns

### Simple Direct Usage:
```
Apply the extract_ideas pattern to this article:
[paste article]
```

### Category Quick Access:
```
Extract wisdom from this podcast transcript:
[paste transcript]
```

### Chained Operations:
```
1. First, summarize this long article
2. Then, extract key insights from the summary
3. Finally, create quiz questions from the insights
```

## 🐛 Troubleshooting

### "Module not found" error
```bash
# Make sure you're in the project directory
cd fabric-mcp-server
uv pip install -e .
```

### Claude can't see the tools
- Restart Claude Desktop completely
- Check config file is valid JSON
- Use absolute path to main.py

### Patterns not loading
- Check internet connection
- Patterns download from GitHub on first run
- Takes ~30 seconds on first startup

### Still having issues?
- Check the main [README.md](README.md)
- Delete cache: `rm -rf ~/.fabric_mcp_cache`
- Run manually: `python src/main.py`

## 📊 Pattern Categories

Quick reference of available categories:

- **analysis** (40+) - Analyze content, claims, papers, etc.
- **creation** (60+) - Create summaries, quizzes, visualizations, etc.
- **extraction** (40+) - Extract wisdom, insights, ideas, etc.
- **summarization** (15+) - Various types of summaries
- **improvement** (10+) - Improve writing, prompts, etc.
- **writing** (15+) - Write essays, reports, etc.
- **evaluation** (10+) - Rate and evaluate content
- **utility** (40+) - Translate, convert, compare, etc.

## 🎓 Learning Path

### Beginner (Start Here):
1. `list_fabric_patterns` - See what's available
2. `extract_wisdom` - Try on a quote or short text
3. `create_summary` - Summarize a short article
4. `improve_writing` - Enhance a paragraph

### Intermediate:
1. `analyze_paper` - Analyze an academic paper
2. `create_quiz` - Generate quiz from content
3. `extract_insights` - Deep dive on insights
4. `create_visualization` - Create diagrams

### Advanced:
1. Chain multiple patterns together
2. Use category shortcuts for efficiency
3. Explore specialized patterns
4. Create custom workflows

## ⚡ Pro Tips

1. **Use Discovery First**: Always run `list_fabric_patterns` to see what's available
2. **Category Shortcuts**: Use `extract_information`, `analyze_content`, etc. for quick access
3. **Pattern Info**: Use `get_fabric_pattern_info` to understand a pattern before using
4. **Refresh Patterns**: Run `refresh_fabric_patterns` to get the latest from GitHub
5. **Batch Similar Tasks**: Group similar content and use the same pattern

## 🌟 Next Steps

- Read the full [README.md](README.md)
- Explore the [Fabric patterns repository](https://github.com/danielmiessler/Fabric/tree/main/data/patterns)
- Try different pattern categories
- Create your own pattern workflows
- Share your favorite patterns!

---

**Happy pattern-ing! 🎨**

Need help? Check the main README.md or the Fabric documentation.
