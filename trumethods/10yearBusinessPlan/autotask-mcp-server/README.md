# Autotask MCP Server

A comprehensive Model Context Protocol (MCP) server for Autotask PSA integration. This server enables AI assistants like Claude to interact with Autotask's REST API for managing tickets, projects, time entries, contacts, and more.

## Features

### Supported Resources

This MCP server provides **35+ tools** covering the following Autotask resources:

#### 🎫 Service Desk
- **Tickets**: Create, read, update, and search tickets
- **Ticket Notes**: Add notes to tickets with configurable visibility

#### 🏢 CRM
- **Companies**: Manage customer and vendor companies
- **Contacts**: Create and manage contacts with company associations

#### 📋 Project Management
- **Projects**: Create and track projects with status management
- **Tasks**: Manage project tasks with assignment and estimation
- **Time Entries**: Log billable and non-billable time

#### 💼 Business Operations
- **Opportunities**: Track sales opportunities and pipeline
- **Contracts**: View and search service contracts
- **Configuration Items**: Manage assets and equipment (CIs)
- **Resources**: Search staff members and technicians

### Available MCP Tools

#### Ticket Tools
- `get_ticket` - Retrieve ticket details by ID
- `create_ticket` - Create new service tickets
- `update_ticket` - Update existing tickets
- `search_tickets` - Search tickets by company, status, or keywords
- `add_ticket_note` - Add notes to tickets

#### Company Tools
- `get_company` - Get company details
- `create_company` - Create new companies
- `search_companies` - Search companies by name or type

#### Contact Tools
- `get_contact` - Get contact details
- `create_contact` - Create new contacts
- `search_contacts` - Search contacts by company, email, or name

#### Project Tools
- `get_project` - Get project details
- `create_project` - Create new projects
- `search_projects` - Search projects by company, status, or name

#### Task Tools
- `get_task` - Get task details
- `create_task` - Create project tasks
- `search_tasks` - Search tasks by project, status, or assignee

#### Time Entry Tools
- `create_time_entry` - Log time against tickets or tasks
- `search_time_entries` - Search time entries by resource, ticket, task, or date range

#### Configuration Item (Asset) Tools
- `get_configuration_item` - Get CI details
- `create_configuration_item` - Create new configuration items
- `search_configuration_items` - Search CIs by company, product, or serial number

#### Contract Tools
- `get_contract` - Get contract details
- `search_contracts` - Search contracts by company, status, or type

#### Opportunity Tools
- `get_opportunity` - Get opportunity details
- `create_opportunity` - Create sales opportunities
- `search_opportunities` - Search opportunities by company, status, or stage

#### Resource (Staff) Tools
- `get_resource` - Get staff member details
- `search_resources` - Search staff by email or name

## Installation

### Prerequisites

- Python 3.12 or higher
- Autotask API credentials (Integration Code, Username, and Secret)
- Access to your Autotask instance

### Getting Autotask API Credentials

1. Log into Autotask
2. Go to **Admin** > **API User Security**
3. Create or select an API user
4. Note down:
   - API Integration Code
   - Username
   - Secret
   - Your Autotask zone (e.g., ww6)

### Setup

1. **Clone or download this repository:**
   ```bash
   cd /path/to/your/projects
   git clone <repository-url>
   cd autotask-mcp-server
   ```

2. **Install dependencies:**
   ```bash
   # Install uv package manager if you don't have it
   pip install uv

   # Install project dependencies
   uv pip install -e .
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Autotask credentials:
   ```env
   TRANSPORT=stdio
   AUTOTASK_API_USERNAME=your_username
   AUTOTASK_API_SECRET=your_secret
   AUTOTASK_API_INTEGRATION_CODE=your_integration_code
   AUTOTASK_ZONE=ww6
   ```

## Usage

### Running Locally for Testing

#### stdio Mode (Command Line)
```bash
python src/main.py
```

#### SSE Mode (HTTP Server)
```bash
# Set transport to sse in .env
echo "TRANSPORT=sse" >> .env

# Start the server
python src/main.py
```

The server will start on `http://localhost:8050` (or the port specified in .env)

### Integration with Claude Desktop

Add this to your Claude Desktop MCP configuration file:

**For macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**For Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "autotask": {
      "command": "python",
      "args": ["/absolute/path/to/autotask-mcp-server/src/main.py"],
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

### Integration with Cursor

Add to `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "autotask": {
      "command": "python",
      "args": ["/absolute/path/to/autotask-mcp-server/src/main.py"],
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

### Using with Docker (Optional)

Create a `Dockerfile`:
```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY pyproject.toml .
RUN pip install uv && uv pip install -e .

COPY src/ ./src/

ENV TRANSPORT=sse
ENV HOST=0.0.0.0
ENV PORT=8050

CMD ["python", "src/main.py"]
```

Build and run:
```bash
docker build -t autotask-mcp-server .
docker run --env-file .env -p 8050:8050 autotask-mcp-server
```

## Example Usage with Claude

Once configured, you can ask Claude to interact with Autotask:

### Create a Ticket
```
Create a new ticket for company ID 12345 with title "Network Issues"
and description "Customer reporting intermittent connectivity problems"
```

### Search for Companies
```
Find all companies with "Tech" in their name
```

### Log Time
```
Create a time entry for resource ID 678, 2.5 hours on ticket 9999,
worked today with summary "Investigated and resolved network issue"
```

### Create a Project
```
Create a new project called "Office 365 Migration" for company ID 12345
with a start date of tomorrow
```

### Search Opportunities
```
Show me all open opportunities for company ID 12345
```

## API Reference

### Common Field Values

#### Ticket Priority
- 1 = Critical
- 2 = High
- 3 = Medium
- 4 = Low

#### Ticket Status
- 1 = New
- 5 = Complete
- (Other status values depend on your Autotask configuration)

#### Company Type
- 1 = Customer
- 2 = Lead
- (Other types depend on your configuration)

#### Project Type
- 1 = Fixed Price
- 2 = Time and Materials
- 3 = Retainer

#### Opportunity Stage
- 1 = Qualification
- 2 = Proposal
- 3 = Negotiation
- 4 = Closed

#### Opportunity Status
- 1 = Open
- 2 = Won
- 3 = Lost

## Architecture

### Project Structure
```
autotask-mcp-server/
├── src/
│   ├── main.py              # MCP server with all tool definitions
│   └── autotask_client.py   # Autotask REST API client
├── .env.example             # Environment variable template
├── .gitignore              # Git ignore patterns
├── pyproject.toml          # Project dependencies
└── README.md               # This file
```

### How It Works

1. **FastMCP Server**: The server uses the FastMCP framework to expose tools to AI assistants
2. **Autotask Client**: A comprehensive REST API client handles all communication with Autotask
3. **Context Management**: Lifespan context ensures the Autotask client is properly initialized
4. **Error Handling**: All tools return JSON responses with proper error handling
5. **Transport Support**: Supports both stdio (local) and SSE (remote) transports

## Extending the Server

### Adding New Tools

To add a new tool, define it in `src/main.py`:

```python
@mcp.tool()
async def my_new_tool(ctx: Context, param1: str, param2: int = None) -> str:
    """Description of what this tool does.

    Args:
        ctx: The MCP server provided context
        param1: Description of param1
        param2: Description of param2 (optional)

    Returns:
        JSON string containing the result
    """
    try:
        client = ctx.request_context.lifespan_context.autotask_client
        # Your logic here
        result = await client.some_method(param1, param2)
        return json.dumps(result, indent=2)
    except Exception as e:
        return json.dumps({"error": str(e)}, indent=2)
```

### Adding New API Methods

Add new methods to `src/autotask_client.py`:

```python
async def my_new_method(self, param: str) -> Dict[str, Any]:
    """Description of what this method does"""
    return await self._make_request("GET", f"SomeResource/{param}")
```

## Troubleshooting

### Authentication Errors
- Verify your API credentials are correct
- Check that your API user has appropriate permissions in Autotask
- Ensure your Integration Code is active

### Connection Issues
- Verify your Autotask zone is correct (ww6, ww4, etc.)
- Check network connectivity to Autotask servers
- Review firewall settings

### Tool Not Available
- Restart Claude Desktop or Cursor after configuration changes
- Check the MCP configuration file syntax is valid JSON
- Verify the path to the Python executable and main.py is absolute

### API Rate Limits
- Autotask has API rate limits; reduce frequency if you hit limits
- Implement caching for frequently accessed data if needed

## Resources

- [Autotask REST API Documentation](https://ww6.autotask.net/help/developerhelp/Content/APIs/REST/REST_API_Home.htm)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [FastMCP Framework](https://github.com/punkpeye/fastmcp)
- [Autotask API Getting Started](https://ww1.autotask.net/help/Content/AdminSetup/2ExtensionsIntegrations/APIs/REST/GettingStarted.htm)

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this in your projects!

## Support

For issues or questions:
- Check the [Autotask API Documentation](https://ww6.autotask.net/help/developerhelp/)
- Review the troubleshooting section above
- Open an issue on GitHub (if applicable)

## Changelog

### Version 0.1.0 (Initial Release)
- ✅ Comprehensive Autotask API client
- ✅ 35+ MCP tools covering major resources
- ✅ Support for Tickets, Companies, Contacts, Projects, Tasks
- ✅ Time entry logging
- ✅ Configuration item (asset) management
- ✅ Contract and opportunity tracking
- ✅ Resource (staff) lookup
- ✅ stdio and SSE transport support
- ✅ Full error handling and JSON responses

## Roadmap

Future enhancements planned:
- [ ] Add support for webhooks
- [ ] Implement caching for improved performance
- [ ] Add batch operations
- [ ] Support for file attachments
- [ ] Enhanced search with advanced filters
- [ ] Dashboard and reporting tools
- [ ] Service call management
- [ ] Invoice and quote management
- [ ] Product catalog integration
