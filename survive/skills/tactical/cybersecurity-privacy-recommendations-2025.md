# Cybersecurity & Privacy Recommendations 2025

## Source
YouTube Video: https://www.youtube.com/watch?v=ikkA3EMI3vc
Transcript: `/home/rick/life/survive/cybersecurity_2025_transcript.txt`
Date Added: 2025-11-08

## Overview
Based on UK National Cyber Security Center (NCSC) guidance and emerging threats in 2025, recommendations for individuals and organizations to protect against cyber attacks and privacy invasion.

## Critical Statistics (2025)
- **429 total cyber attacks** handled by UK NCSC
- **204 nationally significant incidents** (up from 89 in 2024)
- **Nearly 50% of attacks** now categorized as nationally significant
- Major victims: Jaguar Land Rover, Marks & Spencer, Co-op

## Key Threat Categories
1. **Category 1**: National cyber security emergency
2. **Category 2**: Highly significant event
- Trend: More attacks affecting entire national infrastructure and major corporations

---

## Part 1: Personal Cybersecurity Recommendations

### Password Management

#### Physical Password Books
**Recommendation**: Consider for specific use cases

**Pros:**
- Not vulnerable to online hacks
- No cloud breach exposure
- Simple for non-technical users (elderly family members)
- Works during internet outages

**Cons:**
- Physical theft risk
- Fire/water damage vulnerability
- Cannot use strong random passwords easily
- No auto-fill convenience

**Best Practices if Using Physical Books:**
1. Store in extremely secure location (safe, hidden place)
2. NOT for travel use
3. Use different passwords for each site
4. Change passwords frequently
5. Keep backup copy in separate secure location
6. Never photograph or digitize the book

**Ideal Use Cases:**
- Elderly family members who struggle with technology
- Backup for critical accounts during cyber emergencies
- Rarely-used accounts with high security needs
- Estate planning (executor access to accounts)

#### Online Password Managers
**Recommendation**: Still viable with precautions

**Pros:**
- Strong random password generation
- Encrypted storage
- Multi-device sync
- Auto-fill convenience
- Breach monitoring

**Cons:**
- Single point of failure
- Cloud breach vulnerability
- Requires master password security
- Internet dependency

**Best Practices:**
1. Use offline/local password managers (KeePass, KeePassXC)
2. Store database on local NAS, not cloud
3. Use hardware security keys (YubiKey) for 2FA
4. Regular encrypted backups to multiple offline locations
5. Strong master password + 2FA
6. Avoid browser-based password managers

### Data Storage Strategy

#### Move Away from Cloud
**Recommendation**: Prioritize local/offline storage

**Rationale:**
- Microsoft and others forcing cloud migration
- AI scanning of your data
- Ownership questions (who owns your data?)
- Privacy invasion
- Vulnerability to ransomware attacks

#### Local NAS Solutions
**Recommended Approach:**

**Hardware Options:**
- Synology NAS (user-friendly)
- QNAP NAS (advanced features)
- TrueNAS (open source, enterprise-grade)
- DIY build with Ubuntu Server + ZFS

**Configuration:**
1. Set up RAID for redundancy (RAID 1 or RAID 10)
2. Automated local backups (3-2-1 rule)
3. Offline backup drives stored off-site
4. No internet exposure (air-gapped critical data)
5. VPN-only access if remote access needed

**3-2-1 Backup Rule:**
- **3** copies of data
- **2** different media types
- **1** off-site backup

### IoT Device Policy

#### Avoid Connected Devices
**Recommendation**: Default to offline/analog devices

**Threat Categories:**
1. **Subscription Hostage**: Devices bricked without monthly fees
2. **Privacy Invasion**: Monitoring usage, selling data, targeted ads
3. **Security Vulnerability**: Botnet recruitment, hacking vectors
4. **Loss of Control**: Remote disable, forced updates

**High-Risk IoT Categories:**
- Smart TVs (Samsung monitoring, forced ads)
- Smart refrigerators (ads, data collection)
- Connected washing machines (subscription locks)
- Exercise equipment (subscription or brick)
- Smart cars (ads, monitoring, subscription features)
- Home automation systems (single point of failure)

**Purchase Guidelines:**
1. Prefer "dumb" appliances without connectivity
2. If IoT unavoidable, isolate on separate VLAN
3. Block internet access at firewall level
4. Use local-only control (Home Assistant, not cloud)
5. Research manufacturer privacy policies before purchase
6. Consider right-to-repair and offline functionality

**Examples of Predatory IoT:**
- BMW heated seats requiring subscription
- Car acceleration locked behind subscription
- Exercise bikes bricked without monthly payment
- Netflix-style "ad tier" on devices you own

### Privacy Services

#### Data Broker Removal
**Recommendation**: Use services like DeleteMe

**Why:**
- 200+ data broker sites republish your info
- DIY removal is time-consuming and never-ending
- Reduces doxxing, harassment, scam risks
- Ongoing monitoring prevents republishing

**Expectations:**
- Not 100% invisible/anonymous
- Significant reduction in public data exposure
- Requires ongoing subscription for monitoring
- Worth the investment for high-risk individuals

**Alternative (DIY Approach):**
1. Use optoutprescreen.com (credit bureaus)
2. Manual opt-out from major data brokers
3. Google yourself quarterly
4. Request removal under GDPR (if applicable)
5. Use privacy-focused services (ProtonMail, Signal)

---

## Part 2: Organizational Cybersecurity Recommendations

### Resilience Engineering Framework

#### UK NCSC Guidance (2025)
**Core Principle**: "Anticipate, Absorb, Recover, Adapt"

Organizations must plan to:
1. **Anticipate**: Threat modeling and attack surface analysis
2. **Absorb**: Continue operations during attack
3. **Recover**: Rebuild IT systems at pace
4. **Adapt**: Learn and improve defenses

### Offline Contingency Planning

#### Physical Documentation Requirements
**Recommendation**: Maintain paper copies of critical plans

**What to Document on Paper:**
1. **Incident Response Plans**
   - Contact information (personal phones, not work email)
   - Chain of command
   - Communication protocols
   - System recovery procedures

2. **Business Continuity Plans**
   - Analog workarounds for digital systems
   - Manual processes for critical operations
   - Supplier/vendor contact lists
   - Customer communication templates

3. **Technical Recovery Information**
   - Network diagrams and IP addressing
   - Critical system configurations
   - Backup restoration procedures
   - Vendor support contacts and account numbers

4. **Communication Protocols**
   - Non-email communication methods
   - Personal phone numbers (not company directory)
   - Physical meeting locations
   - Radio frequencies (if applicable)

**Storage Requirements:**
- Multiple copies in secure locations
- Protected from fire/water damage
- Accessible without electricity
- Updated quarterly
- Not dependent on IT infrastructure

### Attack Surface Reduction

#### Minimize Connected Systems
**Recommendation**: Question necessity of every internet-connected system

**Critical Questions:**
1. Does this system need internet access?
2. Can we use air-gapped alternatives?
3. What's the blast radius if compromised?
4. Do we have offline backup capability?

**High-Priority Air-Gap Candidates:**
- Backup systems
- Critical infrastructure controls (SCADA)
- Financial systems
- HR/payroll systems
- R&D and intellectual property
- Security camera footage storage

#### Network Segmentation
**Recommendation**: Implement zero-trust architecture

**Segmentation Strategy:**
1. **Critical Systems**: Air-gapped, no internet
2. **Operational Systems**: Isolated VLAN, strict firewall rules
3. **Office Network**: Standard user access
4. **Guest Network**: Completely isolated, no internal access
5. **IoT/Building Systems**: Separate VLAN, no sensitive data access

### Supply Chain Security

#### Vendor Risk Assessment
**Recommendation**: Treat vendors as extension of attack surface

**Assessment Checklist:**
1. Do they have access to our systems?
2. What data do they handle?
3. What's their incident response plan?
4. Do they have cyber insurance?
5. Can we operate without them for 30 days?

**High-Risk Vendors:**
- Cloud service providers
- SaaS applications with data access
- MSPs with remote access
- Payment processors
- Email/communication platforms

### Testing and Drills

#### Regular Cyber Attack Simulations
**Recommendation**: Quarterly tabletop exercises

**Drill Scenarios:**
1. **Ransomware Attack**: All systems encrypted
2. **Data Breach**: Customer data stolen
3. **DDoS Attack**: Services unavailable
4. **Insider Threat**: Privileged account compromised
5. **Supply Chain Compromise**: Critical vendor hacked

**Test Objectives:**
- Can teams communicate without work email?
- Are paper plans accessible and current?
- Can critical operations continue manually?
- How long to restore from backup?
- Are roles and responsibilities clear?

---

## Part 3: Hybrid Approach - Best of Both Worlds

### Balanced Strategy
**Recommendation**: Strategic use of technology with offline backups

#### Critical Systems
- **Primary**: Offline/air-gapped
- **Secondary**: Online with heavy monitoring
- **Backup**: Physical documentation

#### Non-Critical Systems
- **Primary**: Online with security hardening
- **Backup**: Offline capability documented

### Decision Matrix

| System Type | Internet Connected? | Backup Strategy | Priority |
|-------------|-------------------|-----------------|----------|
| Financial records | No | Encrypted offline + paper | Critical |
| Customer database | Yes (monitored) | Air-gapped backup | Critical |
| Email | Yes | Export archives monthly | High |
| Project files | Local NAS only | 3-2-1 backup rule | High |
| Marketing | Yes | Weekly backups | Medium |
| Social media | Yes | N/A | Low |

---

## Part 4: Family/Personal Action Plan

### Immediate Actions (Week 1)

1. **Audit Connected Devices**
   - List all IoT devices in home
   - Identify which can be replaced with analog
   - Disable unnecessary features
   - Change default passwords

2. **Password Assessment**
   - Evaluate current password management
   - Choose: physical book, offline manager, or hybrid
   - Implement 2FA on critical accounts
   - Document recovery codes offline

3. **Data Inventory**
   - List what's in the cloud
   - Identify critical data to move offline
   - Set up local NAS or external backup drives
   - Create 3-2-1 backup system

4. **Family Communication Plan**
   - Exchange personal phone numbers
   - Establish non-digital meeting points
   - Create emergency contact cards (paper)
   - Discuss what to do if internet/phones down

### Short-Term Actions (Month 1)

1. **Implement Local Storage**
   - Purchase and configure NAS
   - Migrate critical data from cloud
   - Set up automated backup schedule
   - Test restoration procedures

2. **IoT Reduction**
   - Replace critical "smart" devices with analog
   - Segment remaining IoT on separate network
   - Block unnecessary internet access
   - Document manual workarounds

3. **Privacy Hardening**
   - Sign up for data broker removal service
   - Review and tighten social media privacy
   - Use privacy-focused alternatives (Signal, ProtonMail)
   - VPN for all internet browsing

4. **Emergency Documentation**
   - Print critical information (contacts, accounts)
   - Create physical binder with emergency procedures
   - Store in fireproof safe
   - Create duplicate for off-site storage

### Long-Term Actions (Ongoing)

1. **Quarterly Reviews**
   - Update paper documentation
   - Test backup restoration
   - Audit new devices/services
   - Review and rotate passwords

2. **Continuous Learning**
   - Follow NCSC and CISA alerts
   - Stay informed on emerging threats
   - Participate in security communities
   - Update plans based on new threats

3. **Family Training**
   - Practice communication plan
   - Teach basic OPSEC principles
   - Regular password hygiene discussions
   - Scenario planning exercises

---

## Part 5: Red Lines - When to Reject Technology

### Non-Negotiable Rejections

1. **Subscription to Use Owned Device**
   - BMW heated seats model
   - Car acceleration unlocks
   - Exercise equipment ransomware
   - Any device that bricks without payment

2. **Forced Cloud Storage**
   - No offline alternative
   - No data export capability
   - Vendor owns your data
   - AI training on your files

3. **Always-On Monitoring**
   - Smart TV watching habits
   - Car location tracking
   - Home assistant always listening
   - Fitness tracker selling health data

4. **No Offline Capability**
   - Critical systems requiring internet
   - No manual override
   - Single point of failure
   - No redundancy path

### Acceptable Use Cases for Connected Devices

**Criteria for Acceptance:**
1. Clear offline fallback mode
2. No subscription hostage situation
3. Local-only control option available
4. Data stays on device (not cloud)
5. Open source firmware option
6. Can be network-isolated and still function

**Examples:**
- Smart thermostat (local control, manual override)
- Security cameras (local NVR, no cloud)
- Home Assistant (open source, local-only)
- Network attached storage (local network only)

---

## Part 6: Military-Civilian Integration

### Lessons from Military OPSEC

#### Applicable to Civilian Life

1. **Compartmentalization**
   - Don't put all data in one place
   - Separate work/personal devices
   - Multiple backup locations
   - Need-to-know basis for sharing

2. **Defense in Depth**
   - Multiple layers of security
   - No single point of failure
   - Redundant systems
   - Assume breach mentality

3. **Communications Security (COMSEC)**
   - Encrypt sensitive communications
   - Use secure channels (Signal, not SMS)
   - Verify recipient before sending
   - Minimize metadata leakage

4. **Physical Security**
   - Lock sensitive documents
   - Shred before disposal
   - Screen capture precautions
   - Secure home network

### Tactical Application

**Threat Modeling:**
1. What are you protecting? (data, privacy, finances)
2. Who are the threats? (hackers, corporations, government)
3. What are their capabilities? (ransomware, surveillance, data mining)
4. What are the impacts? (financial loss, identity theft, doxxing)

**Risk Matrix:**
- **High Value, High Risk**: Air-gap, multiple backups, physical security
- **High Value, Low Risk**: Standard security, regular backups
- **Low Value, High Risk**: Minimize/eliminate, use disposable accounts
- **Low Value, Low Risk**: Standard practices, minimal effort

---

## Part 7: Recommended Tools & Resources

### Password Management
- **KeePassXC** (offline, open source)
- **Bitwarden** (self-hosted option)
- **YubiKey** (hardware 2FA)
- Physical password book (for elderly family)

### Data Storage
- **Synology NAS** (user-friendly)
- **TrueNAS** (advanced, open source)
- **Cryptomator** (file encryption)
- **Veracrypt** (full disk encryption)

### Privacy Tools
- **DeleteMe** (data broker removal)
- **ProtonMail** (encrypted email)
- **Signal** (encrypted messaging)
- **Mullvad VPN** (privacy-focused VPN)
- **GrapheneOS** (see existing project notes)

### Network Security
- **pfSense** (open source firewall)
- **Pi-hole** (ad blocking, tracking protection)
- **WireGuard** (VPN protocol)
- **Suricata** (intrusion detection)

### Offline Backup
- **External HDDs** (offline, rotated)
- **Fireproof safe** (for critical documents)
- **Off-site storage** (bank safe deposit box)
- **rsync** (automated backup scripts)

---

## Part 8: Quick Reference Checklists

### Personal Security Checklist

- [ ] Choose password management strategy (physical/offline/hybrid)
- [ ] Implement 2FA on all critical accounts
- [ ] Set up local NAS or backup system
- [ ] Migrate critical data from cloud to local
- [ ] Audit and reduce IoT devices
- [ ] Sign up for data broker removal service
- [ ] Create physical emergency documentation
- [ ] Store backups in multiple locations
- [ ] Test backup restoration procedures
- [ ] Review privacy settings on all accounts
- [ ] Install VPN and use consistently
- [ ] Replace SMS 2FA with app-based or hardware
- [ ] Create family communication plan
- [ ] Practice offline operation scenarios

### Organizational Security Checklist

- [ ] Create paper copies of incident response plans
- [ ] Document analog workarounds for digital systems
- [ ] Establish non-email communication protocols
- [ ] Implement network segmentation
- [ ] Conduct vendor risk assessments
- [ ] Test offline operations capability
- [ ] Schedule quarterly cyber attack drills
- [ ] Review and minimize attack surface
- [ ] Implement air-gapping for critical systems
- [ ] Create 3-2-1 backup strategy
- [ ] Train staff on manual processes
- [ ] Update physical documentation quarterly
- [ ] Verify incident response team contacts
- [ ] Test backup restoration procedures

### IoT Device Evaluation

Before purchasing any connected device, ask:
- [ ] Can I use a "dumb" version instead?
- [ ] Does it work without internet?
- [ ] Is there a subscription requirement?
- [ ] Can it be network isolated?
- [ ] What data does it collect?
- [ ] Where is data stored (device/cloud)?
- [ ] Can I control it locally?
- [ ] What happens if manufacturer shuts down?
- [ ] Is there a manual override?
- [ ] Can firmware be updated indefinitely?

---

## Part 9: Integration with Existing Project Knowledge

### Cross-References

#### Related Project Files
1. **GrapheneOS Setup**: `skills/tactical/grapheneos-setup-privacy-hardening.md`
   - Mobile privacy hardening
   - Degoogle strategies
   - Secure mobile communication

2. **DEFCON Security Techniques**: `skills/tactical/defcon-villages-security-techniques.md`
   - Physical security awareness
   - Social engineering defense
   - Hacker mindset understanding

3. **Cybersecurity Reading Lists**:
   - `books/recommended-reading-cybersecurity.md` (21 books)
   - `books/recommended-reading-privacy-mobile.md` (12 books)
   - `books/recommended-reading-security-hacking.md` (15+ books)

4. **Mike Force Podcast - Lee Hunkovic**: `podcasts/summaries/mike-force-lee-hunkovic-cybersecurity-analysis.md`
   - China infrastructure threats
   - AI cybersecurity implications
   - Veteran cybersecurity careers

### Comprehensive Security Framework

This document integrates with:
- **Tactical Skills**: Physical security, OPSEC
- **Preparedness**: Offline operations, resilience
- **Mental Resilience**: Decision-making under pressure
- **Resources**: Tools and equipment for security

### Practical Application

**Homesteading Context** (James Alofs references):
- Off-grid cabin doesn't need smart home tech
- Manual systems are more reliable
- No subscription hostage for basic appliances
- Self-sufficiency reduces digital dependence

**Tactical Fitness Context** (Jocko Willink principles):
- Discipline in security hygiene
- Extreme ownership of your digital footprint
- Accountability for family security
- No excuses for basic protections

**Biohacking Context** (Gary Brecka references):
- Protect health data privacy
- Local storage of medical records
- Avoid fitness tracker data mining
- Control your biological information

---

## Part 10: Conclusions & Philosophy

### The 2025 Reality

We face a convergence of threats:
1. **Increased attacks**: 204 nationally significant incidents (up 129% from 2024)
2. **Predatory business models**: Subscription hostage, forced obsolescence
3. **Privacy erosion**: Surveillance capitalism, data mining
4. **Single points of failure**: Over-reliance on cloud and connectivity

### The Path Forward

**Not Luddism - Strategic Technology Use**

The goal is not to reject all technology, but to:
- Use technology on YOUR terms, not corporate terms
- Maintain offline capabilities as backup
- Prioritize privacy and security over convenience
- Own your data, devices, and digital life

**Analog Revival for Resilience**

Physical systems provide:
- Immunity to ransomware and cyber attacks
- No subscription extortion
- True ownership
- Resilience during infrastructure failure

**Balanced Approach**

- Use technology where it provides real value
- Maintain analog backups for critical functions
- Question necessity of connectivity
- Default to privacy-preserving options

### Personal Agency

**You control:**
- What devices you purchase
- Where your data is stored
- Who has access to your information
- Your preparedness level

**You don't control:**
- Corporate data breaches
- Government surveillance capabilities
- Sophisticated nation-state attacks
- Internet infrastructure failures

**Therefore:** Focus your energy on what you can control. Build resilience through redundancy, offline capability, and strategic technology use.

---

## Final Recommendation

**For Individuals:**
Start with the immediate actions checklist. Implement local backups this month. Gradually reduce IoT dependence. Treat it like any other survival skill - practice, test, refine.

**For Organizations:**
Follow UK NCSC guidance. Create and TEST offline contingency plans. Conduct quarterly drills. Treat cyber resilience as business continuity, not just IT security.

**For Families:**
Have the conversation. Create a plan. Practice it. Make security a family value, not a chore.

**Universal Principle:**
Hope for the best, prepare for the worst. Build systems that anticipate failure and can absorb, recover, and adapt.

---

## Additional Resources

- UK National Cyber Security Center: https://www.ncsc.gov.uk/
- CISA Cyber Essentials: https://www.cisa.gov/
- Electronic Frontier Foundation (Privacy): https://www.eff.org/
- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework

---

**Tags:** #cybersecurity #privacy #preparedness #resilience-engineering #iot-security #data-protection #offline-systems #ncsc #2025-threats

**Created:** 2025-11-08
**Source:** YouTube analysis + UK NCSC 2025 guidance
**Status:** Living document - update as threats evolve
