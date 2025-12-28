# Fabric MCP Server 🎨

A comprehensive Model Context Protocol (MCP) server that brings **200+ Fabric AI patterns** to your AI assistant. Each Fabric pattern becomes a dedicated tool for intelligent text analysis, extraction, creation, and transformation.

## 🌟 What is Fabric?

[Fabric](https://github.com/danielmiessler/Fabric) is a collection of AI prompts/patterns designed to solve specific problems using a crowdsourced approach. Each pattern is a carefully crafted prompt that transforms input in a specific way.

This MCP server makes ALL Fabric patterns available as MCP tools that work seamlessly with Claude Desktop, Cursor, and other MCP-compatible AI assistants.

## ✨ Features

### 200+ AI-Powered Tools
Every Fabric pattern is automatically loaded and exposed as an MCP tool:

#### 📊 Analysis Patterns (40+)
- `analyze_claims` - Analyze arguments and claims
- `analyze_paper` - Analyze academic papers
- `analyze_presentation` - Analyze presentations
- `analyze_incident` - Analyze security incidents
- `analyze_debate` - Analyze debates
- `analyze_prose` - Analyze writing style
- `analyze_threat_report` - Analyze cybersecurity threats
- And 30+ more...

#### 🎯 Extraction Patterns (40+)
- `extract_wisdom` - Extract insights, quotes, and wisdom
- `extract_ideas` - Extract key ideas
- `extract_insights` - Extract learnings
- `extract_recommendations` - Extract action items
- `extract_questions` - Extract questions
- `extract_references` - Extract citations
- `extract_patterns` - Extract patterns and trends
- And 30+ more...

#### ✍️ Creation Patterns (60+)
- `create_summary` - Create comprehensive summaries
- `create_visualization` - Create Mermaid diagrams
- `create_quiz` - Generate quiz questions
- `create_keynote` - Create presentation outlines
- `create_report_finding` - Create security findings
- `create_video_chapters` - Create chapter markers
- `create_essay` - Create essay structures
- And 50+ more...

#### 📝 Summarization Patterns (15+)
- `summarize` - General purpose summaries
- `summarize_micro` - Ultra-concise summaries
- `summarize_paper` - Academic paper summaries
- `summarize_meeting` - Meeting summaries
- `summarize_lecture` - Lecture summaries
- And 10+ more...

#### 🔧 Improvement Patterns (10+)
- `improve_writing` - Improve writing quality
- `improve_academic_writing` - Improve academic writing
- `improve_prompt` - Improve AI prompts
- And more...

#### 🔍 Utility Patterns (40+)
- `rate_content` - Rate content quality
- `compare_and_contrast` - Compare items
- `find_hidden_message` - Find hidden meanings
- `check_agreement` - Check agreement levels
- `translate` - Translate content
- `write_essay` - Write complete essays
- And 30+ more...

### Smart Features
- ✅ **Dynamic Loading**: Patterns loaded from GitHub on startup
- ✅ **Intelligent Caching**: Patterns cached locally for performance
- ✅ **Auto-Categorization**: Patterns organized by type
- ✅ **Rich Metadata**: Each pattern includes description and category
- ✅ **Universal Executor**: Single tool to apply any pattern
- ✅ **Category Shortcuts**: Quick access tools for common tasks
- ✅ **Pattern Discovery**: Tools to explore available patterns
- ✅ **Live Updates**: Refresh patterns from GitHub anytime

## 🚀 Installation

### Prerequisites
- Python 3.12 or higher
- Internet connection (for initial pattern loading)

### Setup

1. **Install dependencies:**
   ```bash
   cd fabric-mcp-server
   pip install uv
   uv pip install -e .
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```

3. **Test the server:**
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

## 📖 Usage

### Integration with Claude Desktop

**For macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**For Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "fabric": {
      "command": "python",
      "args": ["/absolute/path/to/fabric-mcp-server/src/main.py"],
      "env": {
        "TRANSPORT": "stdio"
      }
    }
  }
}
```

### Integration with Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "fabric": {
      "command": "python",
      "args": ["/absolute/path/to/fabric-mcp-server/src/main.py"],
      "env": {
        "TRANSPORT": "stdio"
      }
    }
  }
}
```

## 🎯 Example Usage with Claude

Once configured, you can ask Claude to use any Fabric pattern:

### Extract Wisdom from Content
```
Use the extract_wisdom pattern to analyze this article:
[paste article content]
```

### Create a Summary
```
Use the create_summary pattern to summarize this meeting transcript:
[paste transcript]
```

### Analyze a Paper
```
Use the analyze_paper pattern to analyze this research paper:
[paste paper content]
```

### Create a Visualization
```
Use the create_mermaid_visualization pattern to create a diagram from this process:
[paste process description]
```

### Improve Writing
```
Use the improve_writing pattern to enhance this paragraph:
[paste text]
```

## 🔧 Available Tools

### Pattern Discovery Tools

#### `list_fabric_patterns`
List all available Fabric patterns, optionally filtered by category.
```
List all analysis patterns in Fabric
```

#### `list_fabric_categories`
List all pattern categories with counts.
```
Show me all Fabric pattern categories
```

#### `get_fabric_pattern_info`
Get detailed information about a specific pattern.
```
Get info about the extract_wisdom pattern
```

#### `refresh_fabric_patterns`
Refresh patterns from GitHub repository.
```
Refresh Fabric patterns from GitHub
```

### Universal Pattern Executor

#### `apply_fabric_pattern`
Apply any Fabric pattern to your input text.
```
Apply the extract_insights pattern to this content: [content]
```

### Quick Access Category Tools

#### `analyze_content`
Quick access to analysis patterns.
```
Analyze this debate using the claims analysis: [debate content]
```

#### `extract_information`
Quick access to extraction patterns.
```
Extract key ideas from this article: [article]
```

#### `create_content`
Quick access to creation patterns.
```
Create a quiz from this lecture: [lecture notes]
```

#### `summarize_content`
Quick access to summarization patterns.
```
Create a micro summary of this paper: [paper]
```

#### `improve_content`
Quick access to improvement patterns.
```
Improve this academic writing: [text]
```

## 📊 Pattern Categories

The server automatically categorizes all patterns:

| Category | Count | Examples |
|----------|-------|----------|
| **Analysis** | 40+ | analyze_claims, analyze_paper, analyze_incident |
| **Extraction** | 40+ | extract_wisdom, extract_ideas, extract_insights |
| **Creation** | 60+ | create_summary, create_quiz, create_visualization |
| **Summarization** | 15+ | summarize, summarize_micro, summarize_paper |
| **Improvement** | 10+ | improve_writing, improve_prompt |
| **Writing** | 15+ | write_essay, write_report, write_latex |
| **Evaluation** | 10+ | rate_content, rate_ai_response |
| **Explanation** | 5+ | explain_code, explain_terms, explain_project |
| **Identification** | 10+ | identify_job_stories, identify_dsrp |
| **Recommendation** | 5+ | recommend_artists, recommend_pipeline_upgrades |
| **Utility** | 40+ | translate, convert, compare, check |

## 🏗️ Architecture

### Project Structure
```
fabric-mcp-server/
├── src/
│   ├── __init__.py              # Package initialization
│   ├── main.py                  # MCP server with all tools
│   └── pattern_loader.py        # Dynamic pattern loader
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore patterns
├── pyproject.toml              # Dependencies
└── README.md                   # This file
```

### How It Works

1. **Pattern Loading**: On startup, fetches all patterns from Fabric GitHub repo
2. **Caching**: Patterns cached locally in `~/.fabric_mcp_cache/patterns.json`
3. **Tool Generation**: Each pattern becomes an MCP tool
4. **Dynamic Execution**: Tools apply pattern prompts to user input
5. **AI Processing**: Claude uses the pattern prompt to transform the input

### Performance

- **First Run**: ~30 seconds to load 200+ patterns from GitHub
- **Subsequent Runs**: < 1 second using local cache
- **Pattern Refresh**: Available via `refresh_fabric_patterns` tool
- **Memory Usage**: ~50MB for all patterns cached

## 🎓 Advanced Usage

### Custom Pattern Workflow

1. **Discover patterns:**
   ```
   List all extraction patterns
   ```

2. **Get pattern details:**
   ```
   Get info about extract_wisdom pattern
   ```

3. **Apply the pattern:**
   ```
   Apply extract_wisdom to this video transcript: [transcript]
   ```

### Chaining Patterns

You can chain multiple patterns:

```
1. First, summarize this article
2. Then, extract key insights from the summary
3. Finally, create quiz questions from the insights
```

### Category Exploration

```
Show me all patterns in the 'creation' category
```

## 🔄 Updating Patterns

Fabric patterns are regularly updated. To get the latest:

```
Refresh Fabric patterns from GitHub
```

This will fetch the latest patterns and update your local cache.

## 🐛 Troubleshooting

### Patterns Not Loading
- Check internet connection
- Verify GitHub is accessible
- Try: `python src/main.py` manually to see error messages

### Cache Issues
- Delete cache: `rm -rf ~/.fabric_mcp_cache`
- Restart the server

### Tool Not Available in Claude
- Restart Claude Desktop completely
- Check MCP config file syntax is valid JSON
- Verify path to Python and main.py is absolute

## 📚 Resources

- [Fabric GitHub Repository](https://github.com/danielmiessler/Fabric)
- [Fabric Patterns Documentation](https://github.com/danielmiessler/Fabric/tree/main/data/patterns)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [FastMCP Framework](https://github.com/punkpeye/fastmcp)

## 🤝 Contributing

Contributions are welcome! To add features:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with multiple patterns
5. Submit a pull request

## 📄 License

MIT License - free to use in your projects!

## 🙏 Credits

- **Fabric Patterns**: [Daniel Miessler](https://github.com/danielmiessler/Fabric)
- **MCP Protocol**: [Anthropic](https://anthropic.com)
- **FastMCP**: [Punkpeye](https://github.com/punkpeye/fastmcp)

## 🚀 Future Enhancements

Planned features:
- [ ] Pattern versioning and history
- [ ] Custom user patterns
- [ ] Pattern composition and chaining
- [ ] Performance metrics
- [ ] Pattern recommendations based on input type
- [ ] Batch processing multiple inputs
- [ ] Export results in multiple formats

## 💡 Use Cases

### Content Creators
- Summarize videos and articles
- Extract key quotes and insights
- Create chapter markers
- Generate quiz questions

### Researchers
- Analyze academic papers
- Extract references and citations
- Summarize research findings
- Compare and contrast studies

### Developers
- Analyze code and documentation
- Extract key algorithms
- Create technical summaries
- Review and improve code

### Security Professionals
- Analyze threat reports
- Extract IOCs and TTPs
- Create incident summaries
- Review security findings

### Writers
- Improve prose and style
- Create essay outlines
- Extract themes and patterns
- Generate content ideas

### Business Professionals
- Summarize meetings
- Extract action items
- Analyze presentations
- Create reports

---

**Built with ❤️ using Fabric patterns and FastMCP**

🎨 **200+ patterns. Unlimited possibilities.**
