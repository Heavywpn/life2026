# SERVICE LEVEL AGREEMENT

## Between Venturer Technology Pty Ltd and {{ client.company_name }}

**Effective Date:** {{ effective_date }}

**Agreement Reference:** SLA-{{ client.company_name|replace(" ", "")|upper }}-{{ effective_date|replace("-", "") }}

---

## 1. INTRODUCTION

### 1.1 Purpose
This Service Level Agreement (SLA) defines the level of service expected by **{{ client.company_name }}** ("Client") from **Venturer Technology Pty Ltd** ("Provider") as part of the Managed Services Agreement dated {{ effective_date }}.

### 1.2 Scope
This SLA applies to all IT support services provided under the Managed Services Agreement, including but not limited to:

{% for service in services_list %}
- {{ service }}
{% endfor %}

---

## 2. SERVICE AVAILABILITY

### 2.1 Target Uptime
Provider commits to maintaining the following availability targets for managed systems:

| Service Category | Monthly Uptime Target |
|-----------------|----------------------|
| Critical Business Systems | 99.9% |
| Standard Business Systems | 99.5% |
| Non-Critical Systems | 99.0% |

### 2.2 Scheduled Maintenance
- Scheduled maintenance will be performed during agreed maintenance windows
- Default maintenance window: {{ maintenance_window | default("Saturday 10:00 PM - Sunday 6:00 AM AEST") }}
- Provider will give at least 48 hours' notice for scheduled maintenance
- Emergency maintenance may be performed with shorter notice if required to maintain system security or stability

### 2.3 Uptime Calculation
Uptime percentage = ((Total Minutes - Downtime Minutes) / Total Minutes) x 100

Excluded from downtime calculations:
- Scheduled maintenance windows
- Client-caused outages
- Force majeure events
- Third-party service provider outages beyond Provider's control

---

## 3. SERVICE RESPONSE AND RESOLUTION

### 3.1 Priority Definitions

| Priority | Definition | Examples |
|----------|------------|----------|
| **P1 - Critical** | Complete business stoppage affecting all users | Server down, network outage, email system failure, ransomware attack |
| **P2 - High** | Major function impaired affecting multiple users | Application crash, printer server down, VPN failure |
| **P3 - Medium** | Minor function impaired affecting individual users | Single workstation issue, software error, performance degradation |
| **P4 - Low** | General requests or minor issues | Password reset, new user setup, general inquiries |

### 3.2 Response Time Targets

| Priority | Response Time (Business Hours) | Response Time (After Hours) |
|----------|-------------------------------|----------------------------|
| P1 - Critical | 15 minutes | 30 minutes |
| P2 - High | 1 hour | 2 hours |
| P3 - Medium | 4 hours | Next business day |
| P4 - Low | 8 hours | Next business day |

**Response Time Definition:** Time from ticket creation to first technician acknowledgment and initial assessment.

### 3.3 Resolution Time Targets

| Priority | Target Resolution Time |
|----------|----------------------|
| P1 - Critical | 4 hours |
| P2 - High | 8 hours |
| P3 - Medium | 24 hours |
| P4 - Low | 5 business days |

**Note:** Resolution times are targets, not guarantees. Complex issues may require longer resolution times. Provider will keep Client informed of progress.

### 3.4 Business Hours
**Standard Support Hours:** {{ support_hours }}

**After-Hours Support:** Available for P1 and P2 issues at additional rates as specified in the Statement of Work.

**Public Holidays:** Queensland public holidays are not considered business hours.

---

## 4. COMMUNICATION AND REPORTING

### 4.1 Incident Communication

| Priority | Update Frequency |
|----------|-----------------|
| P1 - Critical | Every 30 minutes until resolved |
| P2 - High | Every 2 hours until resolved |
| P3 - Medium | Daily until resolved |
| P4 - Low | Upon completion |

### 4.2 Escalation Procedures

| Escalation Level | Timeframe | Contact |
|-----------------|-----------|---------|
| Level 1 - Technical Support | Initial contact | helpdesk@venturertech.com.au |
| Level 2 - Senior Technician | Response time exceeded | Assigned account technician |
| Level 3 - Service Manager | Resolution target exceeded by 50% | service.manager@venturertech.com.au |
| Level 4 - Management | Major SLA breach or client escalation | management@venturertech.com.au |

### 4.3 Monthly Reporting
Provider will deliver a monthly service report including:
- Ticket summary (opened, closed, pending)
- Response and resolution time performance
- System availability metrics
- Security incident summary
- Recommendations for improvement

---

## 5. SERVICE LEVEL CREDITS

### 5.1 Credit Eligibility
If Provider fails to meet the SLA targets in any calendar month, Client may be eligible for service credits as follows:

| Metric | Performance Level | Credit (% of Monthly Fee) |
|--------|------------------|---------------------------|
| Uptime (Critical Systems) | 99.0% - 99.9% | 5% |
| Uptime (Critical Systems) | 98.0% - 99.0% | 10% |
| Uptime (Critical Systems) | < 98.0% | 15% |
| P1 Response Time | > 50% missed | 5% |
| P1 Resolution Target | > 50% missed | 5% |

### 5.2 Credit Limitations
- Maximum credit per month: 25% of monthly fee
- Credits are not cumulative across months
- Credits are applied to future invoices, not refunded
- Client must request credits within 30 days of the incident

### 5.3 Credit Exclusions
Credits do not apply when failures are caused by:
- Client actions or inactions
- Third-party services not managed by Provider
- Force majeure events
- Scheduled maintenance
- Client's failure to meet minimum system requirements

---

## 6. CLIENT RESPONSIBILITIES

To enable Provider to meet SLA targets, Client agrees to:

### 6.1 Access and Information
- Provide timely access to systems and facilities
- Maintain current contact information for key personnel
- Respond to Provider requests for information within reasonable timeframes

### 6.2 System Requirements
- Maintain systems meeting minimum requirements as specified in the SOW
- Keep all software properly licensed
- Apply updates and patches as recommended by Provider

### 6.3 Security Compliance
- Follow security policies and procedures provided by Provider
- Report suspected security incidents immediately
- Ensure staff complete security awareness training

### 6.4 Backup Responsibilities
- Verify backups are completing successfully (if not managed by Provider)
- Test restoration procedures annually
- Maintain offsite copies of critical data

---

## 7. REVIEW AND AMENDMENTS

### 7.1 Regular Reviews
This SLA will be reviewed:
- Quarterly during regular service review meetings
- Upon significant changes to Client's IT environment
- Upon Client's reasonable request

### 7.2 Amendments
Any changes to this SLA must be agreed in writing by both parties. Changes will take effect from the first day of the month following agreement.

---

## 8. DEFINITIONS

| Term | Definition |
|------|------------|
| **Business Hours** | {{ support_hours }} |
| **Downtime** | Period when managed systems are unavailable to users |
| **Incident** | Any event that causes or may cause an interruption to service |
| **Response Time** | Time from ticket creation to first technician contact |
| **Resolution Time** | Time from ticket creation to issue resolution |
| **Ticket** | Formal record of a service request or incident |

---

## AGREEMENT

This Service Level Agreement is incorporated into and forms part of the Managed Services Agreement between the parties.

**Venturer Technology Pty Ltd**

| | |
|---|---|
| Signature | _________________________________ |
| Name | _________________________________ |
| Title | _________________________________ |
| Date | _________________________________ |

**{{ client.company_name }}**

| | |
|---|---|
| Signature | _________________________________ |
| Name | _________________________________ |
| Title | _________________________________ |
| Date | _________________________________ |
