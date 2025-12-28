# Client Onboarding Checklist

## Overview

This checklist guides the onboarding of new Venturer Technology managed services clients. Onboarding is the critical transition period where we establish the foundation for a successful long-term partnership.

### Onboarding by Tier

| Tier | Typical Duration | Investment Range | Key Differences |
|------|-----------------|------------------|-----------------|
| Essential | 1-2 weeks | $500-1,500 | Basic assessment, tool deployment |
| Professional | 2-4 weeks | $2,500-7,500 | Full assessment, security baseline, compliance gap analysis |
| Premium | 10-12 weeks | $15,000-35,000 | Comprehensive discovery, TAM assignment, executive alignment |

---

## Pre-Onboarding (Before Day 1)

### Administrative Setup

| Task | Owner | Done |
|------|-------|------|
| Signed MSA received and filed | Admin | [ ] |
| Signed Service Schedule received and filed | Admin | [ ] |
| Onboarding fee invoiced | Admin | [ ] |
| Onboarding fee payment received | Admin | [ ] |
| Client added to PSA (ConnectWise/Autotask) | Admin | [ ] |
| Client added to billing system | Admin | [ ] |
| Client folder created in documentation system | Tech Lead | [ ] |
| Welcome email sent to primary contact | Account Manager | [ ] |
| Kickoff meeting scheduled | Account Manager | [ ] |

### Access & Credentials

| Task | Owner | Done |
|------|-------|------|
| Request M365 Global Admin access (or delegated admin) | Tech Lead | [ ] |
| Request network access credentials | Tech Lead | [ ] |
| Request current IT documentation from client | Tech Lead | [ ] |
| Request user list with roles | Tech Lead | [ ] |
| Request software license information | Tech Lead | [ ] |
| Previous provider transition details obtained | Account Manager | [ ] |
| Previous provider offboarding date confirmed | Account Manager | [ ] |

### Previous Provider Transition

| Task | Owner | Done |
|------|-------|------|
| Contact previous provider (if applicable) | Account Manager | [ ] |
| Confirm transition date with previous provider | Account Manager | [ ] |
| Request documentation handover from previous provider | Tech Lead | [ ] |
| Confirm no data will be deleted during transition | Tech Lead | [ ] |
| Get list of scheduled tasks/maintenance from previous provider | Tech Lead | [ ] |
| Confirm DNS and domain registrar access | Tech Lead | [ ] |

---

## Phase 1: Kickoff (Day 1)

### Kickoff Meeting Agenda

| Item | Duration | Notes |
|------|----------|-------|
| Introductions | 10 min | Who's who at Venturer, who's who at client |
| Review partnership scope | 15 min | Walk through Service Schedule |
| Set expectations | 10 min | Response times, communication channels, escalation |
| Discuss timeline | 10 min | Onboarding phases and milestones |
| Collect remaining access | 15 min | Credentials, contacts, permissions |
| Q&A | 15 min | Client questions |
| Schedule next check-in | 5 min | Typically weekly during onboarding |

### Kickoff Deliverables

| Task | Owner | Done |
|------|-------|------|
| Kickoff meeting completed | Account Manager | [ ] |
| Meeting notes documented | Account Manager | [ ] |
| Primary contact confirmed | Account Manager | [ ] |
| Emergency contact confirmed | Account Manager | [ ] |
| Billing contact confirmed | Admin | [ ] |
| Support request process explained | Tech Lead | [ ] |
| Client portal access provided | Tech Lead | [ ] |
| Onboarding timeline shared | Account Manager | [ ] |

---

## Phase 2: Discovery & Assessment (Week 1-2)

### Environment Discovery

| Task | Owner | Done |
|------|-------|------|
| M365 tenant review | Tech Lead | [ ] |
| User account audit | Tech Lead | [ ] |
| License inventory | Tech Lead | [ ] |
| Shared mailbox inventory | Tech Lead | [ ] |
| Distribution list inventory | Tech Lead | [ ] |
| SharePoint/OneDrive review | Tech Lead | [ ] |
| Teams configuration review | Tech Lead | [ ] |

### Device Inventory

| Task | Owner | Done |
|------|-------|------|
| Workstation inventory completed | Technician | [ ] |
| Server inventory completed (if applicable) | Tech Lead | [ ] |
| Network device inventory | Tech Lead | [ ] |
| Mobile device inventory | Technician | [ ] |
| Printer/MFD inventory | Technician | [ ] |
| Device age assessment | Tech Lead | [ ] |
| Hardware replacement recommendations documented | Tech Lead | [ ] |

### Network Assessment

| Task | Owner | Done |
|------|-------|------|
| Internet connection details documented | Tech Lead | [ ] |
| Firewall configuration reviewed | Tech Lead | [ ] |
| Network topology documented | Tech Lead | [ ] |
| WiFi configuration reviewed | Tech Lead | [ ] |
| VPN configuration reviewed (if applicable) | Tech Lead | [ ] |
| Network diagram created/updated | Tech Lead | [ ] |

### Security Assessment

| Task | Owner | Done |
|------|-------|------|
| Current antivirus/EDR status | Tech Lead | [ ] |
| MFA status audit | Tech Lead | [ ] |
| Password policy review | Tech Lead | [ ] |
| Admin account audit | Tech Lead | [ ] |
| Conditional access review | Tech Lead | [ ] |
| External sharing settings review | Tech Lead | [ ] |
| Backup status review | Tech Lead | [ ] |
| Security gaps documented | Tech Lead | [ ] |

### Application Inventory

| Task | Owner | Done |
|------|-------|------|
| Line-of-business applications documented | Tech Lead | [ ] |
| Application vendors and support contacts | Tech Lead | [ ] |
| Application integration points | Tech Lead | [ ] |
| Licensing status confirmed | Tech Lead | [ ] |
| Critical applications identified | Tech Lead | [ ] |

### Documentation Review

| Task | Owner | Done |
|------|-------|------|
| Existing documentation received | Tech Lead | [ ] |
| Documentation gaps identified | Tech Lead | [ ] |
| Password vault reviewed/migrated | Tech Lead | [ ] |
| Vendor contact list created | Tech Lead | [ ] |

---

## Phase 3: Tool Deployment (Week 2-3)

### RMM Deployment (VSA X)

| Task | Owner | Done |
|------|-------|------|
| VSA X organisation created | Tech Lead | [ ] |
| Deployment package configured | Tech Lead | [ ] |
| Agent deployed to all workstations | Technician | [ ] |
| Agent deployed to all servers | Tech Lead | [ ] |
| Agent health verified on all devices | Technician | [ ] |
| Monitoring policies applied | Tech Lead | [ ] |
| Maintenance schedules configured | Tech Lead | [ ] |
| Patch policies applied | Tech Lead | [ ] |

### Security Tool Deployment

| Task | Essential | Prof/Prem | Owner | Done |
|------|-----------|-----------|-------|------|
| Datto EDR deployed | Yes | Yes | Technician | [ ] |
| Datto EDR policies configured | Yes | Yes | Tech Lead | [ ] |
| Windows Defender for Business configured | No | Yes | Tech Lead | [ ] |
| RocketCyber SOC onboarded | No | Yes | Tech Lead | [ ] |
| DNS filtering deployed | No | Yes | Tech Lead | [ ] |
| Email security configured | No | Yes | Tech Lead | [ ] |
| DMARC/DKIM configured | No | Yes | Tech Lead | [ ] |
| SaaS Alerts configured | No | Yes | Tech Lead | [ ] |
| Dark web monitoring enabled | No | Yes | Tech Lead | [ ] |
| MDM enrolled (company devices) | No | Yes | Technician | [ ] |

### Backup Configuration

| Task | Owner | Done |
|------|-------|------|
| Spanning M365 backup configured | Tech Lead | [ ] |
| Backup policies applied | Tech Lead | [ ] |
| Initial backup completed | Tech Lead | [ ] |
| Backup monitoring configured | Tech Lead | [ ] |
| Test restore performed | Tech Lead | [ ] |
| Test restore documented | Tech Lead | [ ] |

### M365 Security Hardening

| Task | Owner | Done |
|------|-------|------|
| MFA enabled for all users | Tech Lead | [ ] |
| MFA registration completed by all users | Technician | [ ] |
| Break-glass admin account created | Tech Lead | [ ] |
| Conditional access policies applied | Tech Lead | [ ] |
| Legacy authentication disabled | Tech Lead | [ ] |
| Admin accounts secured | Tech Lead | [ ] |
| Audit logging enabled | Tech Lead | [ ] |
| External sharing policies configured | Tech Lead | [ ] |
| Email signatures deployed (Prof/Prem) | Technician | [ ] |

---

## Phase 4: Security Baseline (Week 3-4)

### Workstation Hardening

| Task | Owner | Done |
|------|-------|------|
| Local admin accounts audited | Technician | [ ] |
| Local admin removed (where appropriate) | Technician | [ ] |
| Owner exception documented (if applicable) | Tech Lead | [ ] |
| BitLocker enabled on all devices | Technician | [ ] |
| BitLocker keys stored in Entra ID | Technician | [ ] |
| Windows 11 Pro verified (or upgrade scheduled) | Technician | [ ] |
| Screensaver/lock policy applied | Tech Lead | [ ] |
| USB policy applied (if required) | Tech Lead | [ ] |

### Network Security

| Task | Owner | Done |
|------|-------|------|
| Firewall rules reviewed and hardened | Tech Lead | [ ] |
| Unnecessary ports closed | Tech Lead | [ ] |
| WiFi security verified (WPA3/WPA2) | Tech Lead | [ ] |
| Guest WiFi isolated | Tech Lead | [ ] |
| Network segmentation implemented (if required) | Tech Lead | [ ] |

### Vulnerability Remediation

| Task | Owner | Done |
|------|-------|------|
| Critical vulnerabilities identified | Tech Lead | [ ] |
| Remediation plan created | Tech Lead | [ ] |
| Critical patches applied | Technician | [ ] |
| Unsupported software identified | Tech Lead | [ ] |
| Unsupported software remediation scheduled | Tech Lead | [ ] |

### Compliance Gap Analysis (Professional/Premium)

| Task | Owner | Done |
|------|-------|------|
| Essential 8 baseline assessment | Tech Lead | [ ] |
| Maturity level documented | Tech Lead | [ ] |
| Gap analysis completed | Tech Lead | [ ] |
| Remediation roadmap created | Tech Lead | [ ] |
| Industry-specific compliance reviewed | Tech Lead | [ ] |

---

## Phase 5: Documentation & Knowledge Transfer (Week 3-4)

### Environment Documentation

| Task | Owner | Done |
|------|-------|------|
| Organisation overview documented | Tech Lead | [ ] |
| User list with roles documented | Technician | [ ] |
| Device inventory documented | Technician | [ ] |
| Network diagram completed | Tech Lead | [ ] |
| Application list documented | Tech Lead | [ ] |
| Vendor contacts documented | Tech Lead | [ ] |
| Password vault populated | Tech Lead | [ ] |
| Runbooks created for critical systems | Tech Lead | [ ] |

### Client Knowledge Transfer

| Task | Owner | Done |
|------|-------|------|
| Support request process training | Technician | [ ] |
| Portal access training | Technician | [ ] |
| MFA setup assistance completed | Technician | [ ] |
| Password manager training (if applicable) | Technician | [ ] |
| Key contacts at Venturer communicated | Account Manager | [ ] |
| Escalation process explained | Account Manager | [ ] |

### Internal Knowledge Transfer

| Task | Owner | Done |
|------|-------|------|
| Environment briefing to support team | Tech Lead | [ ] |
| Special requirements documented | Tech Lead | [ ] |
| Known issues documented | Tech Lead | [ ] |
| VIP users identified | Account Manager | [ ] |
| Quirks and gotchas documented | Tech Lead | [ ] |

---

## Phase 6: Go-Live (Week 4+)

### Support Transition

| Task | Owner | Done |
|------|-------|------|
| Previous provider support ended | Account Manager | [ ] |
| Venturer support officially begins | Account Manager | [ ] |
| Client notified of go-live | Account Manager | [ ] |
| Staff notified of new support process | Client | [ ] |
| First support tickets handled successfully | Technician | [ ] |

### Monitoring Verification

| Task | Owner | Done |
|------|-------|------|
| All devices reporting in RMM | Tech Lead | [ ] |
| All security tools reporting | Tech Lead | [ ] |
| Backup jobs successful | Tech Lead | [ ] |
| Alerting working correctly | Tech Lead | [ ] |
| SOC integration verified (Prof/Prem) | Tech Lead | [ ] |

### Communication

| Task | Owner | Done |
|------|-------|------|
| Go-live confirmation email sent | Account Manager | [ ] |
| First week check-in scheduled | Account Manager | [ ] |
| Feedback requested from client | Account Manager | [ ] |

---

## Phase 7: Stabilisation (Week 4-8)

### Post-Go-Live Monitoring

| Task | Owner | Done |
|------|-------|------|
| Daily check-in with client (Week 1) | Account Manager | [ ] |
| Ticket volume monitoring | Tech Lead | [ ] |
| Issue trends identified | Tech Lead | [ ] |
| Quick wins completed | Technician | [ ] |
| User feedback collected | Account Manager | [ ] |

### Optimisation

| Task | Owner | Done |
|------|-------|------|
| Monitoring thresholds tuned | Tech Lead | [ ] |
| False positive alerts addressed | Tech Lead | [ ] |
| Automation opportunities identified | Tech Lead | [ ] |
| Performance baselines established | Tech Lead | [ ] |

### First Month Review

| Task | Owner | Done |
|------|-------|------|
| 30-day review meeting scheduled | Account Manager | [ ] |
| 30-day review completed | Account Manager | [ ] |
| Outstanding items documented | Tech Lead | [ ] |
| Remediation projects scoped | Tech Lead | [ ] |
| Client satisfaction confirmed | Account Manager | [ ] |

---

## Phase 8: Handover to BAU (Week 6-12)

### Transition to Business as Usual

| Task | Owner | Done |
|------|-------|------|
| Onboarding project closed | Account Manager | [ ] |
| Ongoing support team briefed | Tech Lead | [ ] |
| vCIO introduced (Prof/Prem) | Account Manager | [ ] |
| TAM assigned (Premium) | Account Manager | [ ] |
| First QBR scheduled (Prof/Prem) | Account Manager | [ ] |
| Proactive hours scheduled (Prof/Prem) | Tech Lead | [ ] |
| Regular meeting cadence established | Account Manager | [ ] |

### Final Documentation

| Task | Owner | Done |
|------|-------|------|
| All documentation complete | Tech Lead | [ ] |
| Onboarding summary report created | Tech Lead | [ ] |
| Recommendations for future work documented | Tech Lead | [ ] |
| Compliance roadmap delivered (Prof/Prem) | Tech Lead | [ ] |

### Financial Close-Out

| Task | Owner | Done |
|------|-------|------|
| Onboarding hours reconciled | Admin | [ ] |
| Any additional work quoted/invoiced | Admin | [ ] |
| First monthly invoice issued | Admin | [ ] |
| Billing confirmed correct | Admin | [ ] |

---

## Premium Tier: Additional Items

*These items apply only to Premium tier onboarding*

### Executive Alignment

| Task | Owner | Done |
|------|-------|------|
| Executive sponsor identified | Account Manager | [ ] |
| Executive alignment meeting completed | Account Manager | [ ] |
| Board/leadership briefing scheduled | Account Manager | [ ] |
| Strategic priorities documented | Account Manager | [ ] |
| Success metrics defined | Account Manager | [ ] |

### TAM Assignment

| Task | Owner | Done |
|------|-------|------|
| TAM assigned | Account Manager | [ ] |
| TAM introduction meeting completed | TAM | [ ] |
| TAM contact details provided | TAM | [ ] |
| Regular check-in cadence established | TAM | [ ] |
| First quarterly on-site scheduled | TAM | [ ] |

### Advanced Security

| Task | Owner | Done |
|------|-------|------|
| SIEM integration scoped | Tech Lead | [ ] |
| Threat hunting baseline established | Tech Lead | [ ] |
| Vulnerability scan completed | Tech Lead | [ ] |
| Penetration test scheduled | Tech Lead | [ ] |
| ISO 27001 gap analysis (if applicable) | Tech Lead | [ ] |
| APRA CPS 234 assessment (if applicable) | Tech Lead | [ ] |

### Enhanced Documentation

| Task | Owner | Done |
|------|-------|------|
| DR procedures documented | Tech Lead | [ ] |
| Runbooks for critical systems | Tech Lead | [ ] |
| Executive reporting templates created | TAM | [ ] |
| Board presentation template created | TAM | [ ] |

---

## Common Onboarding Issues & Solutions

| Issue | Solution |
|-------|----------|
| Client can't provide admin access | Escalate to Account Manager; may need executive intervention |
| Previous provider unresponsive | Document attempts; proceed with discovery from scratch |
| Devices older than 4 years | Document; recommend replacement roadmap |
| Windows Home licenses | Upgrade during onboarding (client cost) |
| No MFA in place | Priority 1; complete before go-live |
| Shadow IT discovered | Document; plan migration to managed environment |
| Unsupported applications | Risk document; discuss remediation timeline |
| Incomplete user list | Use M365/AD to verify; reconcile with client |
| Complex LOB application | Engage vendor early; document integration requirements |

---

## Onboarding Quality Checklist

Before closing onboarding, verify:

### Technical Readiness

- [ ] All devices have VSA X agent installed and reporting
- [ ] All devices have Datto EDR installed and reporting
- [ ] All security tools deployed and verified (per tier)
- [ ] Backup configured, tested, and verified
- [ ] MFA enabled for all users
- [ ] Admin accounts secured
- [ ] Documentation complete and accurate

### Client Readiness

- [ ] Client knows how to submit support requests
- [ ] Client has portal access
- [ ] Key contacts at Venturer are known
- [ ] Escalation process is understood
- [ ] Staff have been notified of new IT support

### Business Readiness

- [ ] Billing is set up correctly
- [ ] First invoice is correct
- [ ] Onboarding project is profitable (or variance explained)
- [ ] Client is satisfied with transition
- [ ] No outstanding critical issues

---

## Onboarding Timeline Templates

### Essential Tier (1-2 Weeks)

| Week | Activities |
|------|-----------|
| Pre | Agreements signed, access requested |
| 1 | Kickoff, discovery, tool deployment |
| 2 | Security baseline, go-live, stabilisation |

### Professional Tier (2-4 Weeks)

| Week | Activities |
|------|-----------|
| Pre | Agreements signed, access requested, previous provider notified |
| 1 | Kickoff, discovery, environment assessment |
| 2 | Tool deployment, security baseline |
| 3 | Compliance gap analysis, documentation |
| 4 | Go-live, stabilisation, 30-day review scheduled |

### Premium Tier (10-12 Weeks)

| Week | Activities |
|------|-----------|
| Pre | Agreements signed, TAM assigned, executive alignment scheduled |
| 1-2 | Kickoff, deep-dive discovery, stakeholder interviews |
| 2-3 | Transition planning, baseline documentation |
| 3-6 | Phased tool deployment, security hardening |
| 6-8 | Advanced security setup, compliance assessments |
| 8-10 | Stabilisation, optimisation, knowledge transfer |
| 10-12 | TAM relationship established, first quarterly review |

---

## Onboarding Metrics

Track these metrics for continuous improvement:

| Metric | Target |
|--------|--------|
| Onboarding completed on time | 90% |
| Client satisfaction (post-onboarding survey) | 4.5/5 |
| Onboarding profitability | Break-even or better |
| Critical issues at go-live | Zero |
| Days to first ticket resolution | < 2 |
| Tool deployment success rate | 100% |
| Documentation completeness | 100% |

---

*Onboarding Checklist Version: 1.0*
*Last Updated: November 2024*
*Aligned with Venturer Technology 3-Tier Service Model*
