# Security & Technology Stack

## For Kurbingui Youth Development Limited

---

**Prepared by:** Venturer Technology Pty Ltd

**Date:** [INSERT DATE]

---

## Overview

This document outlines the security and technology stack that Venturer Technology will deploy and manage as part of your Premium Partnership. Each component has been selected to provide enterprise-grade protection while aligning with the Australian Cyber Security Centre's Essential 8 framework.

---

## 1. MICROSOFT 365 TENANT SECURITY

### Tenant Administration

| Component | Details |
|-----------|---------|
| Tenant Management | Full administration of your Microsoft 365 environment |
| User Lifecycle Management | Onboarding, offboarding, role changes |
| Licence Management | Optimisation and allocation of M365 licences |
| Group & Distribution List Management | Security groups, distribution lists, shared mailboxes |

### Identity & Access Management (Microsoft Entra ID)

| Component | Details | Essential 8 Alignment |
|-----------|---------|----------------------|
| Multi-Factor Authentication (MFA) | Enforced for all users | Restrict Administrative Privileges |
| Conditional Access Policies | Location, device, risk-based access controls | Restrict Administrative Privileges |
| Privileged Identity Management | Just-in-time admin access | Restrict Administrative Privileges |
| Password Policies | Complexity, expiry, banned password lists | User Application Hardening |
| Self-Service Password Reset | Secure password recovery with MFA | - |
| Sign-in Risk Policies | Automated response to suspicious sign-ins | - |

### Email Security

| Component | Details | Essential 8 Alignment |
|-----------|---------|----------------------|
| Exchange Online Protection | Inbound/outbound mail filtering | - |
| Anti-Phishing Policies | Protection against impersonation attacks | User Application Hardening |
| Anti-Malware Scanning | Attachment scanning and blocking | Application Control |
| Safe Attachments | Sandboxing of suspicious attachments | Application Control |
| Safe Links | Real-time URL scanning and rewriting | User Application Hardening |
| DMARC/DKIM/SPF | Email authentication to prevent spoofing | - |
| Spam Filtering | Multi-layer spam detection | - |
| Quarantine Management | Review and release of quarantined items | - |

### Data Protection

| Component | Details |
|-----------|---------|
| Sensitivity Labels | Classification and protection of sensitive data |
| Data Loss Prevention (DLP) | Prevention of accidental data leakage |
| Information Barriers | Separation of confidential data between groups |
| Retention Policies | Compliance-driven data retention |
| eDiscovery | Legal hold and search capabilities |

---

## 2. ENDPOINT PROTECTION & MANAGEMENT

### VSA X (Remote Monitoring & Management)

| Component | Details | Essential 8 Alignment |
|-----------|---------|----------------------|
| 24/7 Device Monitoring | Real-time health and performance monitoring | - |
| Automated Patch Management | Windows, macOS, and third-party patching | Patch Applications, Patch Operating Systems |
| Software Deployment | Centralised application deployment | Application Control |
| Remote Access | Secure remote support capabilities | - |
| Hardware & Software Inventory | Complete asset tracking | - |
| Scripting & Automation | Automated remediation and maintenance | - |
| Compliance Reporting | Patch compliance and system health reports | Patch Applications, Patch Operating Systems |

### Datto EDR (Endpoint Detection & Response)

| Component | Details | Essential 8 Alignment |
|-----------|---------|----------------------|
| Behavioural Threat Detection | AI-powered detection of suspicious behaviour | Application Control |
| Ransomware Protection | Real-time ransomware detection and blocking | Application Control |
| Fileless Attack Detection | Detection of in-memory attacks | Application Control |
| Threat Isolation | Automatic isolation of compromised endpoints | - |
| Threat Forensics | Detailed attack timeline and analysis | - |
| Automated Response | Pre-configured response to common threats | - |
| Managed Threat Hunting | Proactive search for hidden threats | - |

### Windows Defender for Business

| Component | Details | Essential 8 Alignment |
|-----------|---------|----------------------|
| Next-Gen Antivirus | Cloud-powered threat protection | Application Control |
| Attack Surface Reduction | Rules to block common attack vectors | User Application Hardening |
| Network Protection | Blocking of malicious network connections | User Application Hardening |
| Web Content Filtering | Category-based web filtering | User Application Hardening |
| Exploit Protection | Mitigation of common exploit techniques | User Application Hardening |
| Controlled Folder Access | Ransomware protection for key folders | Application Control |
| Tamper Protection | Prevention of security setting changes | - |

---

## 3. SECURITY OPERATIONS CENTER (SOC)

### RocketCyber Managed SOC

| Component | Details | Essential 8 Alignment |
|-----------|---------|----------------------|
| 24/7/365 Monitoring | Round-the-clock security monitoring | - |
| Threat Detection | Real-time detection of security events | Application Control |
| Threat Intelligence | Global threat feed integration | - |
| Incident Response | Immediate response to confirmed threats | - |
| Threat Hunting | Proactive search for advanced threats | - |
| Security Alerts | Priority-based alerting and escalation | - |
| Monthly Reporting | Executive security summary reports | - |
| SIEM Integration | Centralised security event logging | - |

### SOC Coverage Includes

- Endpoint security events (Datto EDR, Windows Defender)
- Microsoft 365 security events
- User behaviour analytics
- Network anomaly detection
- Brute force attack detection
- Privilege escalation attempts
- Data exfiltration attempts
- Malware and ransomware events

---

## 4. SAAS SECURITY

### SaaS Alerts

| Component | Details | Essential 8 Alignment |
|-----------|---------|----------------------|
| Microsoft 365 Monitoring | Detection of suspicious M365 activity | Restrict Administrative Privileges |
| Impossible Travel Detection | Alerts for geographically impossible logins | - |
| Mail Forwarding Rules | Detection of malicious forwarding rules | - |
| Admin Activity Monitoring | Tracking of privileged account usage | Restrict Administrative Privileges |
| File Sharing Alerts | Monitoring of external sharing | - |
| New App Permissions | Detection of OAuth app consent | User Application Hardening |
| Credential Compromise | Detection of compromised credentials | - |
| Automated Response | Automatic disabling of compromised accounts | - |

---

## 5. BACKUP & DISASTER RECOVERY

### Spanning Backup for Microsoft 365

| Component | Details |
|-----------|---------|
| Backup Frequency | 3x daily automated backups |
| Retention | Unlimited retention |
| Recovery Options | Granular item-level or full restore |
| Search & Export | Cross-user search and export capabilities |
| Compliance | GDPR, HIPAA, SOC 2 compliant |

### What We Back Up

| Microsoft 365 Service | Data Protected |
|-----------------------|----------------|
| **Exchange Online** | Emails, folders, contacts, calendars, tasks |
| **OneDrive for Business** | All files and folder structures |
| **SharePoint Online** | Sites, document libraries, lists, metadata |
| **Microsoft Teams** | Teams, channels, conversations, files, tabs |

### Backup Testing

| Activity | Frequency |
|----------|-----------|
| Backup Success Verification | Daily (automated) |
| Sample Restore Testing | Monthly |
| Full Restore Drill | Annually |
| Backup Reporting | Monthly in business reviews |

---

## 6. DOCUMENTATION & ASSET MANAGEMENT

### IT Glue (Real-Time Documentation)

| Component | Details |
|-----------|---------|
| Configuration Documentation | All systems, configurations, and settings |
| Password Management | Secure, audited credential storage |
| Network Documentation | Diagrams, IP schemes, VLANs |
| Asset Tracking | Hardware and software inventory |
| Runbooks | Standard operating procedures |
| Relationship Mapping | Connections between systems, vendors, contacts |
| SSL Certificate Tracking | Expiry monitoring and alerting |
| Domain Tracking | Registration expiry monitoring |
| Warranty Tracking | Hardware warranty status |
| Vendor Contacts | Centralised vendor information |

### Documentation Standards

- Updated in real-time as changes are made
- Reviewed quarterly for accuracy
- Available for client reference (read-only portal access)
- Facilitates seamless handover if ever required

---

## 7. SERVICE MANAGEMENT

### Autotask PSA (Ticketing & Service Desk)

| Component | Details |
|-----------|---------|
| Ticket Management | Full lifecycle ticket tracking |
| SLA Tracking | Automated SLA monitoring and alerts |
| Client Portal | Self-service ticket logging and tracking |
| Knowledge Base | Common issue resolution guides |
| Time Tracking | Accurate time recording for all work |
| Asset Integration | Tickets linked to affected assets |
| Reporting | Service delivery and performance metrics |

### Ticket Submission Options

| Method | Details |
|--------|---------|
| Phone | Direct to help desk during support hours |
| Email | support@venturertechnology.com.au |
| Portal | Self-service client portal (24/7) |
| SOC | 24/7 for security-related incidents |

---

## 8. COMPLIANCE & REPORTING

### MyITprocess (Reporting & Essential 8 Alignment)

| Component | Details |
|-----------|---------|
| Essential 8 Assessment | Formal maturity assessment against all 8 controls |
| Compliance Scorecards | Visual representation of compliance status |
| Gap Analysis | Identification of compliance gaps |
| Remediation Roadmap | Prioritised improvement plan |
| Progress Tracking | Ongoing tracking of improvement initiatives |
| Executive Reporting | Board-ready compliance reports |
| Benchmarking | Comparison against industry standards |

### Essential 8 Alignment Dashboard

| Essential 8 Control | Current Tools | Coverage |
|--------------------|---------------|----------|
| **Application Control** | Datto EDR, Windows Defender, Entra ID | ✓ Managed |
| **Patch Applications** | VSA X automated patching | ✓ Managed |
| **Configure Microsoft Office Macro Settings** | Group Policy, Intune | ✓ Managed |
| **User Application Hardening** | Windows Defender, Conditional Access | ✓ Managed |
| **Restrict Administrative Privileges** | Entra ID PIM, Conditional Access | ✓ Managed |
| **Patch Operating Systems** | VSA X automated patching | ✓ Managed |
| **Multi-Factor Authentication** | Microsoft Entra ID MFA | ✓ Managed |
| **Regular Backups** | Spanning M365 Backup | ✓ Managed |

### Reporting Cadence

| Report | Frequency | Delivered To |
|--------|-----------|--------------|
| Security Summary | Monthly | Primary Contact, TAM |
| Essential 8 Scorecard | Quarterly | Leadership, Board (as needed) |
| Patch Compliance | Monthly | TAM Review |
| Backup Success | Monthly | Primary Contact |
| Incident Summary | Monthly | Primary Contact |
| Full Compliance Review | Annually | Leadership, Board |

---

## 9. ESSENTIAL 8 MATURITY ALIGNMENT

### How Our Stack Maps to Essential 8

| Essential 8 Control | Maturity Level Supported | How We Deliver |
|--------------------|-------------------------|----------------|
| **Application Control** | Level 1-2 | Datto EDR application blocking, Windows Defender controlled folders, Entra ID app consent policies |
| **Patch Applications** | Level 1-3 | VSA X automated third-party patching with compliance reporting, 14-day patch window |
| **Configure Microsoft Office Macro Settings** | Level 1-2 | Group Policy macro restrictions, Intune policy deployment |
| **User Application Hardening** | Level 1-2 | Windows Defender ASR rules, browser hardening, Safe Links/Attachments |
| **Restrict Administrative Privileges** | Level 1-2 | Entra ID PIM, Conditional Access, regular privilege reviews, no standing admin |
| **Patch Operating Systems** | Level 1-3 | VSA X automated OS patching with compliance reporting, 14-day patch window |
| **Multi-Factor Authentication** | Level 1-3 | Entra ID MFA enforced for all users, phishing-resistant MFA available |
| **Regular Backups** | Level 1-3 | Spanning M365 backup 3x daily, monthly restore testing, offline copies |

### Your Essential 8 Journey

1. **Onboarding** - Initial Essential 8 maturity assessment included
2. **Baseline** - Establish current maturity level across all 8 controls
3. **Roadmap** - Prioritised remediation plan based on risk
4. **Quarterly Reviews** - Progress tracking and maturity improvement
5. **Annual Assessment** - Formal reassessment and reporting

---

## 10. STACK SUMMARY

| Category | Tools | Purpose |
|----------|-------|---------|
| **RMM & Patching** | VSA X | Monitoring, patching, remote support |
| **Endpoint Protection** | Datto EDR | Threat detection and response |
| **Antivirus** | Windows Defender for Business | Next-gen antivirus and web protection |
| **SOC** | RocketCyber | 24/7 security monitoring and response |
| **SaaS Security** | SaaS Alerts | M365 activity monitoring |
| **Backup** | Spanning | M365 data protection |
| **Documentation** | IT Glue | Real-time IT documentation |
| **Ticketing** | Autotask PSA | Service desk and ticket management |
| **Compliance** | MyITprocess | Essential 8 alignment and reporting |
| **Identity** | Microsoft Entra ID | Access management and MFA |

---

## Questions?

Contact your Technical Account Manager to discuss any aspect of the security stack or to request additional information.

**Venturer Technology**
Shop 4 / 720 Albany Creek Road
Albany Creek QLD 4035

Email: [INSERT EMAIL]
Phone: [INSERT PHONE]

---

*Document Version: 1.0*
*Prepared for: Kurbingui Youth Development Limited*
*Last Updated: December 2024*
