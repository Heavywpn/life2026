# MSP Agreement Generator

A comprehensive tool for generating Managed Service Provider (MSP) agreements, Service Level Agreements (SLAs), client questionnaires, and meeting preparation documents.

Based on Australian-compliant MSA templates with support for Venturer Technology Pty Ltd branding.

## Features

- **MSA Generation**: Full Managed Services Agreement documents with customizable terms
- **SLA Generation**: Detailed Service Level Agreements with response/resolution targets
- **Client Questionnaires**: Discovery, onboarding, and review questionnaires
- **Meeting Prep**: Pre-built templates for discovery, proposal, onboarding, QBR, and more
- **Interactive Agent**: CLI-based agent that guides you through document creation

## Installation

```bash
# Install dependencies
pip install -r requirements.txt
```

## Quick Start

### Interactive Mode

Run the interactive agent:

```bash
python src/agent.py
```

The agent will guide you through:
1. Creating new MSA/SLA agreements
2. Running client questionnaires
3. Creating meeting prep documents
4. Quick generation with defaults

### Programmatic Usage

```python
from src.generator import DocumentGenerator
from src.models import (
    Agreement, ClientInfo, SystemsCovered,
    ServiceScope, FeeStructure, ContractTerms
)
from datetime import date

# Create client info
client = ClientInfo(
    company_name="Example Business Pty Ltd",
    abn_acn="12 345 678 901",
    address="123 Business St, Brisbane QLD 4000",
    contact_name="John Smith",
    contact_email="john@example.com.au",
    contact_phone="07 1234 5678"
)

# Define systems covered
systems = SystemsCovered(
    workstations=15,
    servers=2,
    network_devices=4,
    mobile_devices=8,
    printers=2
)

# Define services
services = ServiceScope(
    remote_support=True,
    network_monitoring=True,
    cybersecurity=True,
    backup_management=True,
    microsoft_365_admin=True
)

# Define pricing
fees = FeeStructure(
    monthly_base_fee=2000.00,
    per_additional_user=75.00,
    after_hours_rate=185.00,
    onsite_rate=165.00
)

# Contract terms
terms = ContractTerms(
    initial_term_months=24,
    payment_terms_days=14
)

# Create agreement
agreement = Agreement(
    client=client,
    systems=systems,
    services=services,
    fees=fees,
    terms=terms,
    effective_date=date.today()
)

# Generate documents
generator = DocumentGenerator()
msa_path = generator.generate_msa(agreement)
sla_path = generator.generate_sla(agreement)

print(f"MSA: {msa_path}")
print(f"SLA: {sla_path}")
```

### Questionnaires

```python
from src.questionnaire import QuestionnaireManager

manager = QuestionnaireManager()

# List available questionnaires
for q in manager.list_questionnaires():
    print(f"{q['id']}: {q['title']}")

# Load a questionnaire
questionnaire = manager.load_questionnaire("discovery_v1")

# Export blank questionnaire to markdown
md_content = manager.export_to_markdown(questionnaire)
```

### Meeting Prep

```python
from src.meeting_prep import MeetingPrepGenerator
from datetime import date

generator = MeetingPrepGenerator()

# List meeting types
for t in generator.list_meeting_types():
    print(f"{t['id']}: {t['name']}")

# Quick prep with defaults
output = generator.quick_prep(
    client_name="Example Client",
    meeting_type="discovery",
    meeting_date=date.today(),
    attendees=["John Smith", "Jane Doe"]
)
print(f"Meeting prep: {output}")
```

## Project Structure

```
msp_agreement/
├── src/
│   ├── __init__.py
│   ├── agent.py           # Interactive CLI agent
│   ├── generator.py       # Document generation
│   ├── meeting_prep.py    # Meeting prep generation
│   ├── models.py          # Data models
│   └── questionnaire.py   # Questionnaire management
├── templates/
│   ├── msa_template.md    # MSA document template
│   ├── sla_template.md    # SLA document template
│   ├── meeting_prep_template.md
│   └── meeting_types.json # Meeting type definitions
├── questionnaires/
│   ├── discovery_questionnaire.json
│   ├── onboarding_questionnaire.json
│   └── review_questionnaire.json
├── output/                # Generated documents
├── data/                  # Saved questionnaire responses
├── requirements.txt
└── README.md
```

## Available Questionnaires

1. **Discovery Questionnaire** (`discovery_v1`)
   - Business overview
   - Current IT environment
   - Security & compliance
   - Backup & disaster recovery
   - Growth planning
   - Service expectations

2. **Onboarding Questionnaire** (`onboarding_v1`)
   - Company details
   - Key contacts
   - Network infrastructure
   - Servers & storage
   - Software & services
   - Credentials & access

3. **Quarterly Review Questionnaire** (`quarterly_review_v1`)
   - Service satisfaction
   - Environment changes
   - Security review
   - Future planning
   - Net Promoter Score

## Meeting Types

| Type | Description |
|------|-------------|
| `discovery` | Initial meeting with prospective client |
| `proposal` | Presenting a proposal |
| `onboarding` | New client onboarding kickoff |
| `review` | Quarterly business review |
| `renewal` | Contract renewal discussion |
| `project` | Project kickoff |
| `incident` | Major incident review |

## Customization

### Templates

Templates use Jinja2 syntax. Key variables:
- `{{ client.company_name }}` - Client company name
- `{{ effective_date }}` - Agreement effective date
- `{{ fees.monthly_base_fee }}` - Monthly fee amount
- `{{ terms.initial_term_months }}` - Contract term length

### Adding New Questionnaires

Create a JSON file in `questionnaires/` with this structure:

```json
{
  "questionnaire_id": "custom_v1",
  "title": "Custom Questionnaire",
  "description": "Description here",
  "version": "1.0",
  "categories": [
    {
      "id": "category_1",
      "name": "Category Name",
      "questions": [
        {
          "id": "q1",
          "question": "Your question?",
          "type": "text",
          "required": true
        }
      ]
    }
  ]
}
```

Question types: `text`, `number`, `choice`, `multiselect`, `rating`

### Adding Meeting Types

Edit `templates/meeting_types.json` to add new meeting types with default agenda, questions, and document lists.

## Legal Notice

This tool generates document templates based on Australian law, including:
- Australian Consumer Law (Competition and Consumer Act 2010)
- Privacy Act 1988 (Cth)
- Queensland jurisdiction

**Important**: Generated documents are templates and should be reviewed by a legal professional before use. The templates are provided as-is and do not constitute legal advice.

## License

Proprietary - Venturer Technology Pty Ltd
