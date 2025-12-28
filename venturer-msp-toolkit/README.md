# Venturer MSP Toolkit

Comprehensive toolkit for Managed Service Provider (MSP) operations, combining agreement generation, pricing calculations, client questionnaires, and meeting preparation.

## Features

- **Pricing Calculator** - TruMethods Picanomics-based pricing with 3-tier model
- **Agreement Generator** - MSA, SLA, and proposal document generation
- **Client Questionnaires** - Discovery, onboarding, and QBR questionnaires
- **Meeting Preparation** - Templates for discovery, proposal, onboarding, QBR, renewal
- **Industry Verticals** - Specialized guidance for NFP, healthcare, legal, financial, NDIS
- **Interactive Agent** - CLI-based agent for guided workflows

## Service Tiers

| Tier | Base Price | Min Users | Min MRR | Contract |
|------|------------|-----------|---------|----------|
| **Essential** | $85/user | 1 | $85 | 12 months |
| **Professional** | $130/user | 4 | $520 | 12 months |
| **Premium** | $175-220/user | 50 | $8,750 | 24 months |

## Quick Start

```bash
# Run the interactive agent
python3 run.py
```

### Main Menu Options

1. **Pricing Calculator** - Calculate quotes with complexity adjustments
2. **Create Agreement** - Generate MSA, SLA, and proposal
3. **Discovery Session** - Guided client discovery with tier recommendation
4. **Meeting Prep** - Generate meeting preparation documents
5. **Industry Guide** - View industry-specific guidance
6. **Quick Generate** - Generate sample documents

## Project Structure

```
venturer-msp-toolkit/
├── src/
│   ├── __init__.py
│   ├── agent.py           # Interactive CLI agent
│   ├── generator.py       # Document generation
│   ├── models.py          # Data models
│   └── pricing.py         # Pricing calculator
├── templates/
│   ├── contracts/
│   │   ├── msa_template.md
│   │   └── sla_template.md
│   ├── proposals/
│   │   └── proposal_template.md
│   └── meeting_prep/
│       └── meeting_template.md
├── questionnaires/
│   ├── discovery.json
│   ├── onboarding_technical.json
│   └── qbr_review.json
├── industry_verticals/
│   └── verticals.json
├── output/                 # Generated documents
├── data/                   # Saved responses
├── run.py
└── README.md
```

## Pricing Calculator

```python
from src.pricing import PricingCalculator
from src.models import Industry

calc = PricingCalculator()

# Get tier recommendation
tier = calc.recommend_tier(
    users=15,
    industry=Industry.HEALTHCARE,
    has_compliance=True
)

# Calculate quote
quote = calc.generate_quote(
    client=client,
    users=15,
    tier=tier,
    complexity_factors=["regulated_health"]
)

print(f"Monthly: ${quote['summary']['monthly_ex_gst']:.2f}")
```

## Agreement Generation

```python
from src.models import Agreement, ClientInfo, Industry, ServiceTier
from src.generator import DocumentGenerator

client = ClientInfo(
    company_name="Example Pty Ltd",
    abn_acn="12 345 678 901",
    address="123 Example St, Brisbane QLD 4000",
    contact_name="John Smith",
    contact_email="john@example.com.au",
    contact_phone="07 1234 5678",
    industry=Industry.PROFESSIONAL_SERVICES
)

agreement = Agreement.create(
    client=client,
    tier=ServiceTier.PROFESSIONAL,
    users=15
)

generator = DocumentGenerator()
docs = generator.generate_all(agreement)
```

## Industry Verticals

Supported industries with specialized guidance:

- **NFP/Charity** - Government funding compliance, volunteer management
- **Financial Services** - APRA CPS 234, tax agent requirements
- **Healthcare** - RACGP, patient data protection
- **Legal** - Client confidentiality, legal privilege
- **NDIS** - Practice Standards compliance
- **Professional Services** - Project-based support

Each vertical includes:
- Recommended tier and reasoning
- Professional/Premium criteria
- Compliance considerations
- Common pain points
- Value propositions
- Discovery questions
- Pricing adjustments

## Questionnaires

### Discovery Questionnaire
- Organisation overview
- Current IT provider analysis
- Pain points rating (1-5)
- Technology inventory
- Security & compliance
- Priorities & decision process
- Values alignment

### Onboarding Technical
- Company details
- Key contacts
- Network infrastructure
- Servers & storage
- Software & services
- Credentials & access

### QBR Review
- Service satisfaction ratings
- Environment changes
- Security review
- Future planning
- Net Promoter Score

## Meeting Types

| Type | Purpose |
|------|---------|
| Discovery | Initial prospect meeting |
| Proposal | Present solution and pricing |
| Onboarding | New client kickoff |
| QBR | Quarterly business review |
| Renewal | Contract renewal discussion |

## Based On

- TruMethods Picanomics pricing principles
- Australian-compliant MSA templates
- Essential 8 compliance framework
- APRA, RACGP, NDIS Practice Standards

## Legal Notice

Templates are for Queensland, Australia jurisdiction. Review with legal professional before use.

## Version

2.0.0 - Combined toolkit from:
- msp_agreement project
- MSP Contracts and Products documentation
