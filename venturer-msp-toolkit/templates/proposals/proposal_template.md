# Technology Partnership Proposal

---

## PROPOSAL FOR: {{ client.company_name }}

**Prepared by:** Venturer Technology
**Date:** {{ proposal_date }}
**Valid until:** {{ valid_until }}

---

## Executive Summary

### Your Investment

| Component | Investment |
|-----------|------------|
| **Monthly Partnership** | **{{ monthly_fee }} + GST** |
| One-Time Onboarding | {{ onboarding_low }} - {{ onboarding_high }} + GST |

*{{ pricing.users }} users at {{ price_per_user }}/user per month*

---

## Your {{ tier_name }} Technology Partnership

### What You Receive

**Complete technology leadership for your {{ pricing.users }} team members, including:**

#### Technology Protection

{% for service in services_list %}
- {{ service }}
{% endfor %}

#### Support Hours

{{ service_levels.support_hours }}

{{ service_levels.after_hours }}

---

## Partnership Details

### Monthly Investment

| Component | Calculation | Monthly |
|-----------|-------------|---------|
| {{ tier_name }} Partnership | {{ pricing.users }} users × {{ price_per_user }} | {{ monthly_fee }} |
{% if pricing.additional_devices > 0 %}
| Additional devices | {{ pricing.additional_devices }} × $12 | ${{ pricing.additional_devices * 12 }} |
{% endif %}
| **Monthly Total (excl GST)** | | **{{ monthly_fee }}** |
| GST (10%) | | ${{ pricing.gst }} |
| **Monthly Total (incl GST)** | | **{{ monthly_fee_inc_gst }}** |

**Annual Investment:** {{ annual_fee }} + GST

### One-Time Onboarding

**Investment:** {{ onboarding_low }} - {{ onboarding_high }} + GST

Onboarding typically takes {{ onboarding.estimated_weeks }} weeks.

### Agreement Terms

| Term | Details |
|------|---------|
| Contract length | {{ pricing.tier.contract_months }} months |
| Billing | Monthly in advance |
| Payment terms | 14 days |

---

## What's Included vs. Excluded

### Quoted Separately

{% for excluded in excluded_services %}
- {{ excluded }}
{% endfor %}

---

## Why Venturer Technology?

### What Makes Us Different

1. **Mission-Aligned Partnership** - We share your values through our community hiring mission
2. **Bundled vCIO Strategic Advisory** - Technology planning included, not extra
3. **Fierce Protection Philosophy** - Your security is our priority

### Our Commitment

- Predictable costs - no surprise bills
- Proactive approach - prevent problems
- Strategic focus - plan for your future
- Accountability - regular reviews

---

## Getting Started

1. **Review & Questions** - Let us know any questions
2. **Agreement Signing** - Sign the MSA and Service Schedule
3. **Onboarding Kickoff** - Schedule kickoff meeting
4. **Transition Period** - {{ onboarding.estimated_weeks }} weeks structured transition
5. **Go Live** - Full partnership begins

---

## Acceptance

**For {{ client.company_name }}:**

| | |
|---|---|
| Name | _________________________________ |
| Position | _________________________________ |
| Signature | _________________________________ |
| Date | _________________________________ |

**Accepted terms:**
- [ ] {{ tier_name }} Partnership at {{ monthly_fee }}/month + GST
- [ ] Onboarding at {{ onboarding_low }} - {{ onboarding_high }} + GST
- [ ] {{ pricing.tier.contract_months }}-month agreement

---

## Contact

**Venturer Technology**
Shop 4 / 720 Albany Creek Road
Albany Creek, QLD 4035

ABN: 64 627 324 814

---

*Proposal prepared by Venturer Technology*
*Valid for 30 days*
