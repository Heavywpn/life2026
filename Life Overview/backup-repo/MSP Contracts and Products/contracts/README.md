# Contracts Folder

## Quick Start: New Client Contract

1. Copy `templates/MSA-MASTER-TEMPLATE.md`
2. Save as `client-agreements/[client-name]-msa-YYYY-MM-DD.md`
3. Fill in client details (search for `[INSERT`)
4. Complete Schedule 1 with services and pricing
5. Convert to PDF/Word for signing

---

## Folder Structure

```
contracts/
├── README.md                    # This file
│
├── templates/                   # USE THESE FOR NEW CLIENTS
│   ├── MSA-MASTER-TEMPLATE.md   # Main contract (start here)
│   └── SERVICE-SCHEDULE-TEMPLATE.md  # Detailed SOW (optional)
│
├── client-agreements/           # Store executed contracts here
│   └── [client-name]-msa-YYYY-MM-DD.md
│
└── reference/                   # Alternative templates
    └── msa-alternative-template.md
```

---

## Templates

### MSA-MASTER-TEMPLATE.md (Primary)
- **Use for:** All new managed services clients
- **Pre-filled:** Venturer Technology ABN, address
- **Includes:** Schedule 1 (Statement of Work)
- **Based on:** Your reviewed Australian-compliant docx

### SERVICE-SCHEDULE-TEMPLATE.md (Optional)
- **Use for:** More detailed service breakdowns
- **When:** Client needs extensive service documentation beyond Schedule 1
- **Includes:** Tier selection, detailed edges, contact details

---

## New Client Workflow

### Step 1: Create Contract
```
cp templates/MSA-MASTER-TEMPLATE.md client-agreements/acme-charity-msa-2024-12-01.md
```

### Step 2: Fill Client Details
Search and replace these placeholders:
- `[INSERT DATE]` - Effective date
- `[INSERT CLIENT NAME]` - Legal entity name
- `[INSERT ABN/ACN]` - Client's ABN or ACN
- `[INSERT CLIENT ADDRESS]` - Registered address
- `[12/24/36]` - Initial term length

### Step 3: Complete Schedule 1
- List services included
- Specify systems covered (users, devices)
- Set SLA response times
- Enter fee schedule
- List exclusions

### Step 4: Review & Sign
- Convert to PDF or Word
- Send for client review
- Execute via DocuSign or wet signature
- Store executed copy

---

## Naming Convention

```
[client-name]-msa-YYYY-MM-DD.md

Examples:
- brisbane-youth-services-msa-2024-12-15.md
- smith-accounting-msa-2025-01-10.md
- qld-community-foundation-msa-2025-02-01.md
```

---

## Key Contract Terms Reference

| Term | Value |
|------|-------|
| Payment terms | 14 days |
| Late payment interest | 10% p.a. |
| Early termination fee | 50% remaining term |
| Non-renewal notice | 60 days |
| Price increase cap | 5% or CPI |
| Liability cap | 12 months fees or $50k |
| Data breach notification | 48 hours |
| Non-solicitation period | 12 months |
| Jurisdiction | Queensland |

---

## Legal Reminder

Always recommend clients have agreements reviewed by their own legal counsel before signing. These templates are designed for Australian compliance but individual circumstances may require modifications.
