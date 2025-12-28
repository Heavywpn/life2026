# SERVICE LEVEL AGREEMENT

## Between Venturer Technology Pty Ltd and {{ client.company_name }}

**Effective Date:** {{ effective_date }}
**Service Tier:** {{ tier_name }}

---

## 1. SERVICE AVAILABILITY

### 1.1 Target Uptime

| Service Category | Monthly Uptime Target |
|-----------------|----------------------|
| Critical Business Systems | 99.9% |
| Standard Business Systems | 99.5% |
| Non-Critical Systems | 99.0% |

### 1.2 Scheduled Maintenance

- Default maintenance window: Saturday 10:00 PM - Sunday 6:00 AM AEST
- Minimum 48 hours notice for scheduled maintenance
- Emergency maintenance may be performed with shorter notice

---

## 2. SERVICE RESPONSE AND RESOLUTION

### 2.1 Priority Definitions

| Priority | Definition | Examples |
|----------|------------|----------|
| **P1 - Critical** | Complete business stoppage | Server down, network outage, ransomware |
| **P2 - High** | Major function impaired | Application crash, VPN failure |
| **P3 - Medium** | Minor function impaired | Single workstation issue |
| **P4 - Low** | General requests | Password reset, new user setup |

### 2.2 Response and Resolution Times ({{ tier_name }} Tier)

| Priority | Response Time | Resolution Target |
|----------|---------------|-------------------|
{% for sl in service_levels.levels %}
| {{ sl.priority.value }} - {{ sl.priority.name }} | {{ sl.response_time }} | {{ sl.resolution_target }} |
{% endfor %}

### 2.3 Support Hours

**{{ service_levels.support_hours }}**

After-hours: {{ service_levels.after_hours }}

---

## 3. SERVICES COVERED

{% for service in services_list %}
- {{ service }}
{% endfor %}

---

## 4. COMMUNICATION

### 4.1 Incident Communication

| Priority | Update Frequency |
|----------|-----------------|
| P1 - Critical | Every 30 minutes |
| P2 - High | Every 2 hours |
| P3 - Medium | Daily |
| P4 - Low | Upon completion |

### 4.2 Escalation

| Level | Timeframe | Contact |
|-------|-----------|---------|
| Level 1 | Initial | helpdesk@venturertech.com.au |
| Level 2 | Response exceeded | Assigned technician |
| Level 3 | Resolution exceeded | Service Manager |

---

## 5. SERVICE CREDITS

| Metric | Performance | Credit |
|--------|-------------|--------|
| Uptime (Critical) | 99.0-99.9% | 5% |
| Uptime (Critical) | 98.0-99.0% | 10% |
| Uptime (Critical) | <98.0% | 15% |

Maximum credit: 25% of monthly fee per month.

---

## AGREEMENT

**Venturer Technology Pty Ltd:**

| | |
|---|---|
| Signature | _________________________________ |
| Name | _________________________________ |
| Date | _________________________________ |

**{{ client.company_name }}:**

| | |
|---|---|
| Signature | _________________________________ |
| Name | _________________________________ |
| Date | _________________________________ |

---

*SLA Version 2.0 | Venturer Technology*
