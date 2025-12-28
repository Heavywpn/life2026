# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Australian-compliant MSP contracts and service packages for Venturer Technology. The business is transitioning from commodity pricing ($45/seat) to premium trusted advisor positioning ($130-150/seat).

## Current Project Status

**Last Updated:** November 2024

### Completed
- [x] Essential tier fully defined ($85/user)
- [x] Professional tier fully defined ($130/user)
- [x] **Premium tier fully defined ($175-220/user)** - includes TAM, 24/7 critical, ISO 27001 readiness
- [x] Service tiers document updated (`packages/venturer-service-tiers.md`)
- [x] Edges definition updated (`packages/edges-definition.md`)
- [x] **Pricing calculator updated for 3-tier model** (`pricing/pricing-calculator.md`)
- [x] **Industry vertical documents created** (`industry-verticals/`)
  - NFP/Charity (`nfp-charity.md`)
  - Financial Services (`financial-services.md`)
  - Healthcare (`healthcare.md`)
- [x] MSA template created (`contracts/templates/MSA-MASTER-TEMPLATE.md`)
- [x] Service schedule template created (`contracts/templates/SERVICE-SCHEDULE-TEMPLATE.md`)
- [x] Discovery questionnaire created (`sales-process/discovery-questionnaire.md`)
- [x] **Proposal template created** (`sales-process/proposal-template.md`)
- [x] **Onboarding checklist created** (`sales-process/onboarding-checklist.md`)

### Project Complete

All core deliverables for the MSP contracts and service packages project have been completed. The 3-tier service model (Essential, Professional, Premium) is fully documented with supporting sales and onboarding materials.

### Future Enhancements (Optional)
- Case study templates (once client relationships established)
- Update discovery questionnaire tier names (still references old Business/Enterprise)
- Quarterly review/QBR template
- Client satisfaction survey template

---

## Key Reference Documents

**Business Strategy (10-Year Plan):**
- `/home/rick/life/10YearBusinessPlan/VTO-venturer-technology.md` - Core values, targets, strategy
- `/home/rick/life/10YearBusinessPlan/strategic-overview-1-page.md` - Quick reference

**TruMethods Framework:**
- `/home/rick/life/10YearBusinessPlan/trumethodscomplete/Step-1-Packaging-Your-Service-Offering.md`
- `/home/rick/life/10YearBusinessPlan/trumethodscomplete/Step-2-Defining-Your-Edges.md`
- `/home/rick/life/10YearBusinessPlan/trumethodscomplete/Step-3-Pricing-Your-Service-Offering.md`
- `/home/rick/life/10YearBusinessPlan/trumethodscomplete/Step-5-MSP-Agreements.md`

---

## Service Tiers (3-Tier Structure)

| Tier | Target | Price | Min Users | Contract |
|------|--------|-------|-----------|----------|
| **Essential** | 1-3 staff, simple businesses | $85/user | None | 12 months |
| **Professional** | 4-50 staff OR high-compliance | $130/user | 4 | 12 months |
| **Premium** | 50+ staff | $175-220/user | 50 | 24 months |

**Additional pricing (all tiers):**
- Additional device: $12/device/month
- Additional mailbox backup: $8/mailbox/month

### Essential Tier Highlights
- Support: 8:30am-5pm Brisbane
- No 24/7 SOC (Datto EDR only)
- No vCIO (quarterly check-in + annual review instead)
- On-site: $160/hour + travel
- Unlimited remote MACs

### Professional Tier Highlights
- Support: 8:00am-5:30pm Brisbane
- 24/7 SOC: RocketCyber
- Full security stack: EDR, Windows Defender for Business, DNS filtering, email security, DMARC/DKIM, SaaS Alerts, dark web monitoring, MDM
- Phishing campaigns + cyber awareness training
- Essential 8 compliance mapping + continual improvement
- vCIO: Monthly check-ins, quarterly QBRs
- 5 MACs/month included, 2hrs/month proactive time
- On-site: Included when Venturer determines necessary

### Premium Tier Highlights
- Support: 7:30am-6:30pm extended hours + 24/7 critical (30-min response)
- Dedicated Technical Account Manager (TAM) with quarterly on-site visits
- 8hrs/month proactive time, unlimited MACs
- Advanced security: SIEM integration, threat hunting, quarterly vulnerability scans
- Advanced compliance: ISO 27001 readiness, APRA CPS 234, annual external pen test
- Fortnightly vCIO meetings, monthly business reviews, board-ready reporting
- Enhanced onboarding: 10-12 weeks, $15k-$35k scoped separately
- Minimum: 50 users, 24-month term, $8,750-$11,000/month

### Industry Requirements (Must Use Professional+)
- Financial services (accounting, financial planners)
- Legal practices
- NDIS service providers
- Government-funded organisations
- Healthcare (patient data)

---

## Contract Structure (Two-Part)

1. **MSA (Master Service Agreement)** - Legal framework, signed once per client
   - Location: `contracts/templates/MSA-MASTER-TEMPLATE.md`

2. **Service Schedule** - Specific services and pricing, customized per client
   - Location: `contracts/templates/SERVICE-SCHEDULE-TEMPLATE.md`

**Workflow:** Copy MSA template, search for `[INSERT` placeholders, fill in client details, complete Schedule 1 with services/pricing.

---

## Australian Legal Requirements

**Must comply with:**
- Australian Consumer Law (ACL) - unfair contract terms provisions
- Privacy Act 1988 (Cth) - Australian Privacy Principles
- Notifiable Data Breaches (NDB) scheme - 48-hour notification
- Electronic Transactions Act 1999 - electronic signatures

**Contract requirements:**
- ABN/ACN for both parties
- GST treatment (prices exclusive)
- Queensland governing law
- Mediation-first dispute resolution
- Reasonable liability caps (12 months fees or $50k)

---

## Minimum Standards (All Tiers)

**Hardware:** Less than 4 years old

**Operating Systems:**
- Windows 11 Professional (Home upgraded during onboarding at client cost)
- macOS: Current minus 1

**Required on all devices:**
- VSA X (RMM)
- Datto EDR

**Microsoft 365:**
- Business Basic/Standard minimum
- 1x Entra ID P1 license per tenant (MFA, conditional access)

**Security:**
- No local admin (owner exception with documented liability)
- Password manager required
- Licensed software only (no torrenting)
- VPN for overseas travel

---

## Exclusions (All Tiers)

**Hardware & Equipment:**
- Hardware over 4 years old (best-effort only)
- Unsupported operating systems
- Printers (unless Venturer-purchased)
- CCTV, access control, phone systems

**Network:**
- Third-party internet/network (unless Venturer-supplied)
- Home network troubleshooting

**Applications & Training:**
- Office product training
- Third-party app training
- Line-of-business app internal support
- Website support & maintenance

**Data:**
- Recovery without backup in place
- Malware cleanup (repeat offenders - billable after 2 incidents)

**Projects (Always Separate Quote):**
- Office relocations, server migrations, application implementations
- Major version upgrades (Win 10 to 11)

---

## Specialized Agents

- **au-msp-contract-architect** - Contract drafting and compliance review
- **msp-growth-advisor** - Strategic pricing and positioning
- **trumethods-pdf-analyzer** - Processing TruMethods materials

---

## Venturer Core Values (Reflect in All Documents)

1. **Fiercely Protect Our Clients** - Security-first, honest advice
2. **Grow With Our Clients** - Partnership language, strategic guidance included
3. **Community and Sacrifice Mindset** - Values alignment, NFP focus

---

## File Locations Quick Reference

| Document | Path |
|----------|------|
| Service Tiers | `packages/venturer-service-tiers.md` |
| Edges Definition | `packages/edges-definition.md` |
| Pricing Calculator | `pricing/pricing-calculator.md` |
| MSA Template | `contracts/templates/MSA-MASTER-TEMPLATE.md` |
| Service Schedule Template | `contracts/templates/SERVICE-SCHEDULE-TEMPLATE.md` |
| Discovery Questionnaire | `sales-process/discovery-questionnaire.md` |
| Proposal Template | `sales-process/proposal-template.md` |
| Onboarding Checklist | `sales-process/onboarding-checklist.md` |
| Contract Workflow | `contracts/README.md` |
| **Industry Verticals** | |
| - NFP/Charity | `industry-verticals/nfp-charity.md` |
| - Financial Services | `industry-verticals/financial-services.md` |
| - Healthcare | `industry-verticals/healthcare.md` |
