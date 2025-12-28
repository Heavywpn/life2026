# MANAGED SERVICES AGREEMENT

This Managed Services Agreement (this "Agreement") is made and entered into as of **{{ effective_date }}** ("Effective Date"), by and between:

**Venturer Technology Pty Ltd** (ABN 64 627 324 814), having its principal place of business at Shop 4 / 720 Albany Creek Road, Albany Creek, QLD 4035 ("Provider"); and

**{{ client.company_name }}** (ABN/ACN {{ client.abn_acn }}), having its principal place of business at {{ client.address }} ("Client").

---

## RECITALS

A. Provider is in the business of providing outsourced information technology services, managed IT support, cybersecurity services, and related consulting services.

B. Client desires to engage Provider to provide the Services (as defined below) to Client and Provider desires to accept such engagement pursuant to the terms and conditions set forth in this Agreement.

C. The Parties acknowledge and agree that Australian law, including the Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010 (Cth)) and the Privacy Act 1988 (Cth), applies to this Agreement.

---

## 1. SERVICES

### 1.1 Provision of Services

Provider will provide, as an independent contractor, the {{ tier_name }} tier managed services as detailed in Schedule 1 (Statement of Work).

### 1.2 Service Standards

Provider will perform the Services with due care and skill, in accordance with generally accepted industry standards and practices for managed IT service providers in Australia.

---

## 2. TERM

### 2.1 Initial Term

This Agreement shall continue for an initial term of **{{ terms.initial_term_months }}** months commencing on the Effective Date.

### 2.2 Renewal

At the end of the Initial Term, this Agreement will automatically renew for successive periods of **{{ terms.renewal_term_months }}** months each unless either Party provides written notice of its intent not to renew at least **{{ terms.notice_period_days }}** days prior to expiration.

### 2.3 Early Termination Fee

If Client terminates this Agreement during the Initial Term without Provider Cause, Client shall pay Provider an early termination fee equal to **{{ terms.early_termination_fee_percent }}%** of the monthly recurring charges multiplied by the remaining months in the Initial Term.

---

## 3. FEES AND PAYMENT

### 3.1 Fees

Client agrees to pay Provider the Fees as set forth in Schedule 1. All Fees are stated in Australian Dollars (AUD) and are exclusive of GST.

### 3.2 Billing

The Base Fee will be invoiced monthly in advance. Client will pay Provider within **{{ terms.payment_terms_days }}** days of the invoice date.

### 3.3 Late Payment

Interest shall accrue on outstanding amounts at **{{ terms.late_payment_interest }}%** per annum.

---

## 4. PRICE ADJUSTMENTS

### 4.1 Annual CPI Adjustment

On each anniversary, the Base Fee may be increased by the CPI change (Brisbane, All Groups), capped at **{{ terms.cpi_cap_percent }}%** per annum.

### 4.2 User/Device Changes

Client agrees to promptly inform Provider of changes to the number of users or devices covered by the Services.

---

## 5. LIMITATION OF LIABILITY

### 5.1 Australian Consumer Law

Nothing in this Agreement excludes any consumer guarantee that cannot be excluded by law.

### 5.2 Limitation Cap

Each Party's total aggregate liability shall not exceed the greater of: (a) total Fees paid in the preceding 12 months; or (b) $50,000 AUD.

---

## 6. CONFIDENTIALITY AND PRIVACY

### 6.1 Privacy Act Compliance

Each Party agrees to comply with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.

### 6.2 Data Breach Notification

Each Party agrees to notify the other within 48 hours of becoming aware of any data breach.

---

## 7. GENERAL PROVISIONS

### 7.1 Governing Law

This Agreement is governed by the laws of Queensland, Australia.

### 7.2 Dispute Resolution

Before commencing legal proceedings, Parties must attempt good faith negotiations for at least 20 business days.

### 7.3 Entire Agreement

This Agreement, together with all Schedules, constitutes the entire agreement between the Parties.

---

## EXECUTION

**EXECUTED by Venturer Technology Pty Ltd:**

| | |
|---|---|
| Signature | _________________________________ |
| Name | _________________________________ |
| Date | _________________________________ |

**EXECUTED by {{ client.company_name }}:**

| | |
|---|---|
| Signature | _________________________________ |
| Name | _________________________________ |
| Date | _________________________________ |

---

# SCHEDULE 1: STATEMENT OF WORK

## 1. SERVICE TIER

**{{ tier_name }} Partnership**

## 2. SERVICES INCLUDED

{% for service in services_list %}
- {{ service }}
{% endfor %}

## 3. SYSTEMS COVERED

| Category | Count |
|----------|-------|
| Windows Workstations | {{ systems.workstations_windows }} |
| Mac Workstations | {{ systems.workstations_mac }} |
| Laptops | {{ systems.laptops }} |
| Physical Servers | {{ systems.servers_physical }} |
| Virtual Servers | {{ systems.servers_virtual }} |
| Cloud Servers | {{ systems.servers_cloud }} |
| Network Devices | {{ systems.network_devices }} |
| Mobile Devices | {{ systems.mobile_devices }} |
| Printers | {{ systems.printers }} |

**Total Users:** {{ pricing.users }}

## 4. SERVICE LEVELS

| Priority | Description | Response Time | Resolution Target |
|----------|-------------|---------------|-------------------|
{% for sl in service_levels.levels %}
| {{ sl.priority.value }} | {{ sl.description }} | {{ sl.response_time }} | {{ sl.resolution_target }} |
{% endfor %}

**Support Hours:** {{ service_levels.support_hours }}

**After Hours:** {{ service_levels.after_hours }}

## 5. FEES

| Item | Amount (excl. GST) |
|------|-------------------|
| Monthly Base Fee ({{ pricing.users }} users × {{ price_per_user }}) | {{ monthly_fee }} |
| Additional Devices | ${{ pricing.additional_devices }} × $12 |
| After-Hours Support | {{ pricing.after_hours_rate }}/hour |
| Project Work | {{ pricing.project_rate }}/hour |

## 6. EXCLUDED SERVICES

{% for excluded in excluded_services %}
- {{ excluded }}
{% endfor %}

## 7. COMMENCEMENT DATE

This SOW commences on: **{{ effective_date }}**

---

*Document Version: 2.0 | Venturer Technology Pty Ltd | Queensland, Australia*
