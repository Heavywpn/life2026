# Pegasus Malware & NSO Group - Interview Summary

**Video:** https://www.youtube.com/watch?v=e9n3TxzS3sY
**Interview:** David Bombal with OTW (Author of Linux Basics for Hackers)
**Date Retrieved:** 2025-11-10

---

## Executive Summary

This interview covers the recent court ruling against NSO Group's Pegasus spyware, the broader landscape of mobile device malware, and surprising revelations about widespread hacking of consumer devices including iPhones, Android phones, and smart home systems.

**Key Revelation:** OTW's forensic investigation firm has discovered extensive malware on Apple devices despite Apple's marketing claims that iPhones are "unhackable." The malware ecosystem is far more pervasive than generally understood.

---

## Main Topics Covered

### 1. Court Ruling Against NSO Group

**What Happened:**
- A U.S. court ruled (October 19th) that NSO Group's Pegasus spyware cannot intercept messages on WhatsApp
- The lawsuit was brought by Meta (Facebook), not the government
- It's a permanent injunction but ONLY applies to Meta products (WhatsApp, Facebook, Instagram)
- The case took **6 years** to reach a ruling

**Limitations of the Ruling:**
- Very narrow in scope - only protects WhatsApp/Meta products
- Does NOT prevent Pegasus from accessing:
  - Other messaging apps
  - Phone calls
  - Emails
  - Location data
  - Any other app on the device

**Implications:**
- Opens the door for class action lawsuits against NSO
- Individuals who were spied on may have grounds to sue
- Sets a precedent but doesn't solve the broader problem

### 2. NSO Group Background

**Business Model:**
- Charges **$20,000 per phone** for Pegasus access
- End cost to governments: approximately **$50,000 per phone**
- Recently acquired by U.S. investor group (despite being controversial)
- Extremely profitable business

**Technical Capabilities:**
- Pegasus is "probably the most sophisticated and malicious malware in the world"
- Allows complete control of target devices
- Can access all communications, location data, and device functions
- Primarily used against: journalists, human rights activists, political dissidents, diplomats

**Connection to Unit 8200:**
- NSO has strong ties to Israel's Unit 8200 (elite cyber warfare unit)
- Cross-pollination between Unit 8200, NSO Group, and Apple facilities in Israel
- This gives NSO deep insight into Apple's operating system

### 3. Government Surveillance

**Three-Letter Agencies:**
- Pegasus is technically banned in the U.S., but this doesn't stop U.S. intelligence agencies
- The NSA, CIA, and 15 other U.S. intelligence agencies can:
  - Develop their own similar tools
  - Contract out development to private companies
  - Purchase equivalent tools from other vendors
- "Whatever they decide is legal is legal" - agencies operate above typical law

**NSA's Mission:**
- Can spy on Americans if they communicate with someone deemed an "enemy"
- This broad definition essentially excludes no one
- OTW notes: "I actually get messages [from intelligence agencies] saying 'we're listening'"

**International Cooperation:**
- Referenced Edward Snowden revelations
- U.S. agencies worked with UK's GCHQ to spy on U.S. citizens (circumventing domestic spying restrictions)

**Non-NSA Uses:**
- Similar software used by ICE (Immigration and Customs Enforcement) to locate deportation targets
- Governments use location tracking to "disappear" or kill targets

### 4. The "Unhackable iPhone" Myth - MAJOR REVELATION

**OTW's Shocking Discovery:**
> "I will tell you from firsthand experience that there's a lot of malware on Apple phones. We see a lot."

**Key Points:**
- Apple's claim that "off-the-shelf malware cannot be used against Apple products is FALSE"
- OTW's forensic investigation firm regularly sees iPhones "full of malware"
- Many clients bought iPhones specifically because they believed they were unhackable
- The malware is NOT just from sophisticated state actors - it's widespread consumer-level infection

**Apple's New Security Measures (iPhone 17):**
- Memory Integrity Enforcement feature
- Similar to ASLR (Address Space Layout Randomization) which has existed for over a decade
- OTW's assessment: "It'll slow some people down... but quite frankly, it's not that hard right now"
- Comparison to existing protections that malware has learned to overcome

**Apple vs. Android:**
- Apple DOES take security more seriously than Google/Android
- Android phones are easier to hack
- But Apple's marketing is "marketing fluff, not real"
- The gap is smaller than advertised

### 5. Apple's Bug Bounty Program

**Current Bounties:**
- Increased from $1 million to **$2 million** for most exploits
- Up to **$5 million** for hacks that bypass lockdown mode with memory integrity protection

**The Problem:**
- Black market pays far more than Apple's bounties
- A Pegasus-level exploit is worth $50-100+ million on the black market
- OTW: "Five million is great... but there are bright people who are going, I can get $5 million from Apple or I can get 50 million or 100 million from selling to governments"
- Suggestion: Apple would need to offer $50+ million bounties to compete with black market

### 6. The Shocking Malware Epidemic

**OTW's Most Surprising Finding:**

For years, OTW dismissed clients who claimed everything was hacked (phone, computer, smart home, garage door, car) as having mental health issues. **He now takes that back:**

> "I take that back. They really are hacked. We have been going through these homes and they've been going through these phones and we've been going through these computers and they're full of malware."

**What They're Finding:**
- Phones: Multiple sources of malware (not just one)
- Computers: Extensively compromised
- Routers: Full of malware
- Smart home devices: Fully compromised
- Real-world impacts:
  - Garage doors opening randomly
  - Lights turning on/off
  - Doors opening and closing
  - Complete smart home control

**Sources of Infection:**
- NOT primarily governments or advanced persistent threats
- Low-level hackers attacking regular people
- "Hacker for hire" services
- Examples:
  - YouTuber's competitor paid someone to hack his phone
  - Friends hacking friends
  - Neighbors hacking neighbors
  - Business competitors

**Timeline:**
- This widespread malware discovery is recent - approximately **9 months ago** (as of interview date)
- Before that, even OTW (a cybersecurity expert) didn't realize the extent of the problem

### 7. The Malware-as-a-Service Industry

**Modular Malware:**
- Malware sold in modules on the dark web
- Can purchase different components:
  - Phone access module
  - Computer access module
  - Smart home access module
- Like "building a house" - pick and choose features
- Different price points for different sophistication levels

**No Coding Skills Required:**
- Low-level hackers can buy pre-made malware
- Don't need to understand how it works
- Just deploy and use

**Hacker-for-Hire Services:**
- Widespread availability
- Pricing: $500 - $2,000+ for typical jobs
- Services offered: Hack phone, computer, smart home, etc.
- Multi-layered ecosystem operating on the dark web

**Future Threat:**
- Ransomware for phones hasn't appeared yet but is "coming probably"
- "We got access to your phone and we're going to threaten you unless you pay us"

### 8. How Devices Get Infected

**Primary Vector: Social Engineering**

OTW's estimate: **80% of hacks have a social engineering element**

**Two-Part Attack:**
1. **Entry:** Social engineering to gain initial access
2. **Persistence:** Technical malware to maintain control

**Specific iPhone Attack Vector:**
- OTW knows of a "very simple way" to get into iPhones
- He refuses to disclose it publicly to prevent wider exploitation
- It's so simple and effective that he's shocked nobody is discussing it publicly
- Has an element of social engineering

**Reference to Mr. Robot:**
- Mentioned scenario: Getting on same Wi-Fi network with weak password
- Once on same network, hacking becomes "relatively easy"

### 9. Meta/Facebook's Irony

**The Cynical Take:**
- Mark Zuckerberg upset that someone is spying on his software
- Yet Facebook/Meta spy on users constantly and sell their data
- David's characterization: "This is our territory. Only we can spy here."

**Software as Service vs. Product:**
- In the U.S., all software is legally classified as a "service" not a "product"
- Product liability laws don't apply to software
- If software were a product, users could sue for damages from hacks (like suing car manufacturers for defects)
- Lobbyists ensured this classification to protect software companies
- Bruce Schneier's argument: If software makers were held liable like product manufacturers, there would be far less vulnerable software

### 10. The Real-World Market for Zero-Days

**Three Markets:**
1. **Defensive (Apple/Vendors):** $2-5 million
2. **Government/Military:** $50-100+ million
3. **Criminal (Dark Web):** Varies, potentially very high

**It's Legal to Develop Malware:**
- "There's actually a legitimate career that's legal to produce malware for governments"
- Legal when serving government
- Illegal when serving others
- Creates a parallel industry of government contractors developing exploits

---

## Security Recommendations from OTW

### Essential Protections:

1. **Resist Social Engineering**
   - Most important defense
   - Defeats 80% of all attacks
   - Be skeptical of tricks to gain access

2. **Don't Trust Manufacturer Claims**
   - "Everything's fine, we'll take care of you" is false
   - iPhones ARE hackable despite marketing
   - Take personal responsibility for security

3. **Use Security Tools:**
   - VPN
   - Password manager
   - Complex passwords (not simple ones)

4. **Stay Vigilant:**
   - If your device is "acting funny," something IS wrong
   - Don't dismiss unusual behavior
   - Investigate anomalies

5. **Educate Yourself:**
   - Learn about cybersecurity and IT
   - Understand the threats
   - Knowledge is the best defense

---

## OTW's Resources

**Books:**
- "Linux Basics for Hackers"
- "Network Basics for Hackers"
- "Getting Started: Becoming a Master Hacker"
- "Python for Hackers" (coming soon)

**Online:**
- YouTube: Hackers Arise (300+ educational videos)
- Website: hackers-arise.com (training courses)
- Twitter: @HackersArise

**Services:**
- Forensic investigations for hacked devices
- Cybersecurity training

---

## Critical Insights & Quotes

### On iPhone Security:
> "I got all these phones right here that are full of malware. So that's my proof. People come to me like, 'I bought an iPhone because I thought it was unhackable.' Well, you're proof that it's not."

### On the Malware Epidemic:
> "I'm shocked to see how much malware these people have on their phones... It's coming from all different places. And it's not the government."

### On Previously Dismissed Claims:
> "For years I thought that those people were imagining that they were hacked... But in reality, they are hacked. They have been hacked."

### On Government Agencies:
> "The three-letter agencies are always above the law. They make the law. Whatever they decide is legal is legal."

### On Bug Bounties:
> "I can get $5 million from Apple or I can get 50 million or 100 million from selling to governments. What do you think I'm going to do?"

### On Apple's Marketing:
> "To sell the idea that it's unhackable is not true. That's marketing fluff. That's not real."

---

## The Big Picture

This interview reveals that:

1. **The threat is far more pervasive than publicly acknowledged** - Even security experts like OTW were surprised by the extent of malware infections in regular consumer devices

2. **The court ruling against NSO is symbolically important but practically limited** - It only protects one company's products and took 6 years to achieve

3. **A massive underground malware economy exists** - Making sophisticated attacks accessible to low-level hackers and regular people wanting to spy on others

4. **iPhone security is oversold** - Apple's marketing doesn't match reality, though they're still better than Android

5. **Government agencies operate beyond legal constraints** - Banning tools like Pegasus in the US doesn't stop US intelligence agencies from using equivalent capabilities

6. **The economic incentives favor attackers** - Black market pays 10-20x what vendors pay for vulnerabilities

7. **Social engineering remains the primary attack vector** - Technical defenses matter less when users can be tricked into granting access

8. **Smart home integration has created massive new attack surfaces** - Once a network is compromised, everything connected to it becomes vulnerable

---

## Conclusion

The interview paints a sobering picture of modern cybersecurity. While developments like the NSO ruling are steps in the right direction, the fundamental problems are:
- Economic incentives favor attackers
- Legal frameworks lag behind technology
- Manufacturer security claims are marketing rather than reality
- The malware industry has industrialized and democratized hacking
- Most users are completely unaware of the true threat landscape

OTW's main message: Don't rely on device manufacturers to protect you. Take cybersecurity seriously, educate yourself, and maintain healthy skepticism about security claims.
