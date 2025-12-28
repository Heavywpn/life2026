# Mobile Device Security Testing & Certification Procedures
## iPhone & Android

**Document Purpose:** Enterprise guidelines for detecting compromised iOS and Android devices
**Last Updated:** 2025-11-10
**Based On:** Industry best practices and OTW interview revelations

---

## Executive Summary

Given OTW's revelations that "there's a lot of malware on Apple phones" despite Apple's marketing, and that Android devices are "easier to hack," organizations need robust testing procedures to validate device security across both platforms. This document outlines software tools, procedures, and certification workflows for **both iOS and Android** devices.

**Key Principles:**
- Don't trust manufacturer "unhackable" marketing claims. Verify through independent testing.
- Android is generally easier to compromise than iOS, but both platforms have significant malware presence
- The threat is real, pervasive, and affects regular people—not just high-value targets

---

## PART 1: DETECTION SOFTWARE & TOOLS

### Tier 1: Professional Mobile Forensics Tools
**(Support both iOS and Android unless noted)**

#### 1. **Cellebrite UFED (Universal Forensic Extraction Device)**
- **Platforms:** iOS and Android
- **What It Does:** Full device extraction and analysis
- **Capabilities:**
  - Physical and logical data extraction
  - Malware detection
  - Timeline analysis
  - Jailbreak/root detection
  - Anomaly identification
  - App analysis (both platforms)
- **Cost:** $5,000-$15,000+ per license
- **Best For:** Large enterprises, high-security environments
- **Contact:** Cellebrite.com

#### 2. **Magnet AXIOM**
- **Platforms:** iOS and Android
- **What It Does:** Mobile forensics and incident response
- **Capabilities:**
  - iOS and Android artifact analysis
  - Cloud data correlation
  - Malware indicators
  - Communication analysis
  - App behavior monitoring
  - APK analysis (Android)
- **Cost:** $3,000-$10,000+ per license
- **Best For:** Security teams, incident response
- **Contact:** MagnetForensics.com

#### 3. **Oxygen Forensic Detective**
- **Platforms:** iOS and Android
- **What It Does:** Mobile device forensics
- **Capabilities:**
  - iOS and Android extraction (multiple methods)
  - Jailbreak/root detection
  - Malicious app detection
  - Network activity analysis
  - Cloud extraction
  - Advanced Android support (ADB, rooted devices)
- **Cost:** $3,000-$8,000+ per license
- **Best For:** Corporate security, investigations
- **Contact:** Oxygen-forensic.com

#### 4. **MSAB XRY**
- **Platforms:** iOS and Android
- **What It Does:** Mobile forensics and analysis
- **Capabilities:**
  - iOS and Android data extraction
  - Bypass techniques for locked devices
  - Malware detection
  - Deleted data recovery
  - Extensive Android device support
- **Cost:** $5,000-$15,000+ per license
- **Best For:** Law enforcement-grade security needs
- **Contact:** MSAB.com

### Tier 2: Enterprise MDM with Security Analytics

#### 5. **Jamf Protect** (iOS/macOS only)
- **Platforms:** iOS and macOS
- **What It Does:** Endpoint protection for Mac/iOS
- **Capabilities:**
  - Real-time threat detection
  - Behavioral analytics
  - Jailbreak detection
  - Configuration monitoring
  - Integration with Jamf Pro MDM
- **Cost:** $3-$7 per device/month
- **Best For:** Organizations already using Jamf MDM (Apple-only environments)
- **Contact:** Jamf.com

#### 6. **Microsoft Defender for Endpoint**
- **Platforms:** iOS and Android
- **What It Does:** Mobile threat defense
- **Capabilities:**
  - Malicious app detection
  - Phishing protection
  - Network threat detection
  - Risk scoring
  - Integration with Microsoft 365
  - Android-specific: Play Protect integration, sideload detection
- **Cost:** Included with Microsoft 365 E5 or standalone
- **Best For:** Microsoft-centric environments, unified endpoint management
- **Contact:** Microsoft.com/security

#### 7. **Lookout Mobile Endpoint Security**
- **Platforms:** iOS and Android
- **What It Does:** Mobile threat defense platform
- **Capabilities:**
  - Malware detection
  - Phishing protection
  - Network security
  - App risk assessment
  - Zero-day threat protection
  - Android-specific: APK scanning, root detection, ROM analysis
- **Cost:** $3-$8 per device/month
- **Best For:** BYOD environments, mobile-first companies
- **Contact:** Lookout.com

#### 8. **Zimperium zIPS**
- **Platforms:** iOS and Android
- **What It Does:** On-device mobile threat defense
- **Capabilities:**
  - Machine learning threat detection
  - Network attack detection
  - Device compromise detection
  - App behavior analysis
  - No cloud dependency (on-device analysis)
  - Android-specific: Kernel-level analysis, exploit detection
- **Cost:** $4-$10 per device/month
- **Best For:** High-security environments, regulated industries
- **Contact:** Zimperium.com

#### 8a. **Google Play Protect** (Android only - Built-in)
- **Platforms:** Android only
- **What It Does:** Google's built-in malware scanning
- **Capabilities:**
  - Automatic app scanning
  - Installation warnings for risky apps
  - Find My Device integration
  - Basic device security checks
- **Cost:** Free (built into Android)
- **Best For:** Baseline protection on Android devices
- **Note:** Useful but insufficient as sole protection; missed 31% of malware in independent testing
- **How to Check:** Settings > Security > Google Play Protect

#### 8b. **VMware Workspace ONE** (Unified Endpoint Management)
- **Platforms:** iOS and Android
- **What It Does:** Comprehensive MDM with security features
- **Capabilities:**
  - Device management and compliance
  - App management (including MAM - Mobile Application Management)
  - Security posture assessment
  - Conditional access
  - Integration with security tools
  - Android Enterprise support
- **Cost:** $3-$10 per device/month
- **Best For:** Enterprise with mixed mobile fleet
- **Contact:** VMware.com

### Tier 3: Network-Level Detection
**(Platform-agnostic - works with both iOS and Android)**

#### 9. **Cisco Umbrella** (DNS Security)
- **Platforms:** All devices (network-level)
- **What It Does:** DNS-layer security and visibility
- **Capabilities:**
  - Malicious domain blocking
  - C2 (Command & Control) detection
  - Data exfiltration detection
  - Anomalous DNS queries
- **Cost:** $2-$5 per user/month
- **Best For:** Network-wide visibility
- **Contact:** Cisco.com

#### 10. **Darktrace Mobile**
- **Platforms:** All devices (network-level)
- **What It Does:** AI-powered network threat detection
- **Capabilities:**
  - Behavioral analysis of mobile devices
  - Anomaly detection
  - C2 communication identification
  - Self-learning AI
- **Cost:** Enterprise pricing (typically $50k+ annually)
- **Best For:** Large enterprises, advanced threats
- **Contact:** Darktrace.com

### Tier 4: User-Accessible Tools (Limited but useful)

#### iOS-Specific Tools:

#### 11. **iMazing** (iOS only)
- **Platforms:** iOS
- **What It Does:** iOS device management and backup
- **Capabilities:**
  - File system access
  - App data inspection
  - Backup analysis
  - Configuration profile viewing
  - Anomaly identification (manual)
- **Cost:** $45-$70 one-time purchase
- **Best For:** IT staff preliminary checks, small businesses
- **Contact:** iMazing.com

#### 12. **iVerify** (iOS only)
- **Platforms:** iOS
- **What It Does:** Consumer/enterprise iOS security scanning
- **Capabilities:**
  - Automated security scans
  - Configuration analysis
  - Anomaly detection
  - Threat indicators
  - Easy-to-understand reports
- **Cost:** Free (basic) to $5-$10/month (enterprise)
- **Best For:** End-user self-service checks, awareness
- **Contact:** iVerify.io
- **Note:** Referenced by security researchers as accessible option

#### Android-Specific Tools:

#### 12a. **ADB (Android Debug Bridge)** (Android only - Built-in Developer Tool)
- **Platforms:** Android
- **What It Does:** Command-line tool for Android device communication
- **Capabilities:**
  - App installation/removal
  - Device shell access
  - Log extraction (logcat)
  - File system access
  - Package manager access
  - System information
- **Cost:** Free (part of Android SDK)
- **Best For:** IT staff, manual investigations
- **Installation:** Download Android SDK Platform Tools
- **Link:** developer.android.com/studio/command-line/adb

#### 12b. **Malwarebytes for Android**
- **Platforms:** Android
- **What It Does:** Anti-malware scanning for Android
- **Capabilities:**
  - Malware detection and removal
  - Privacy audit
  - App permission analysis
  - Adware detection
  - Real-time protection (premium)
- **Cost:** Free (basic) / $12/year (premium)
- **Best For:** End-user protection, quick scans
- **Contact:** Malwarebytes.com

#### 12c. **Lookout Personal** (Android)
- **Platforms:** Android (iOS version also available)
- **What It Does:** Consumer mobile security
- **Capabilities:**
  - Malware scanning
  - Wi-Fi security monitoring
  - Phishing protection
  - Identity theft monitoring (premium)
  - Breach alerts
- **Cost:** Free (basic) / $3-10/month (premium)
- **Best For:** BYOD users, personal device security
- **Contact:** Lookout.com

#### 12d. **Avast Mobile Security** (Android)
- **Platforms:** Android
- **What It Does:** Comprehensive mobile security suite
- **Capabilities:**
  - Antivirus scanning
  - App permissions scanner
  - Wi-Fi security scanner
  - VPN (premium)
  - Anti-theft features
  - Photo vault
- **Cost:** Free (ad-supported) / $2/month (premium)
- **Best For:** General users, basic protection
- **Contact:** Avast.com

### Tier 5: Open Source / Free Tools

#### iOS Tools:

#### 13. **libimobiledevice** (iOS only)
- **Platforms:** iOS
- **What It Does:** Open source iOS communication library
- **Capabilities:**
  - Device information extraction
  - Backup creation/analysis
  - File system access (if jailbroken)
  - Syslog monitoring
- **Cost:** Free (open source)
- **Best For:** Custom scripting, tech-savvy teams
- **Installation:** `brew install libimobiledevice` (Mac) or compile from source
- **Link:** libimobiledevice.org

#### Both iOS and Android:

#### 14. **MVT (Mobile Verification Toolkit)** by Amnesty International
- **Platforms:** iOS and Android
- **What It Does:** Forensic tool for detecting Pegasus and similar spyware
- **Capabilities:**
  - iOS backup analysis
  - Android backup analysis (requires ADB)
  - Indicator of Compromise (IoC) detection
  - Pegasus-specific checks
  - Suspicious process identification
  - SMS/file analysis
- **Cost:** Free (open source)
- **Best For:** Targeted threat detection, high-risk users (journalists, activists)
- **Installation:** `pip3 install mvt`
- **Link:** github.com/mvt-project/mvt
- **Note:** Specifically designed to detect NSO Group Pegasus on both platforms

#### Android Tools:

#### 14a. **APKTool**
- **Platforms:** Android (analysis tool runs on desktop)
- **What It Does:** Reverse engineering tool for Android apps
- **Capabilities:**
  - APK decompilation
  - Resource extraction
  - Code analysis
  - Manifest examination
  - Identify malicious code patterns
- **Cost:** Free (open source)
- **Best For:** Analyzing suspicious APK files
- **Installation:** Download from APKTool.org
- **Link:** apktool.org

#### 14b. **androguard**
- **Platforms:** Android (analysis tool runs on desktop)
- **What It Does:** Python framework for Android app analysis
- **Capabilities:**
  - APK/DEX/ODEX file analysis
  - Malware detection
  - Permission analysis
  - Code similarity detection
  - Network behavior analysis
- **Cost:** Free (open source)
- **Best For:** Deep malware analysis, custom automation
- **Installation:** `pip3 install androguard`
- **Link:** github.com/androguard/androguard

#### 14c. **Hypatia** (Android Malware Scanner)
- **Platforms:** Android
- **What It Does:** Real-time malware scanner for Android
- **Capabilities:**
  - App scanning using VirusTotal
  - Permission analysis
  - Privacy audit
  - Open source (no hidden telemetry)
- **Cost:** Free (open source)
- **Best For:** Privacy-conscious users, FOSS enthusiasts
- **Installation:** F-Droid or GitHub
- **Link:** github.com/Divested-Mobile/Hypatia

#### 14d. **AirGuard** (Android Tracker Detection)
- **Platforms:** Android
- **What It Does:** Detects Apple AirTags and Tile trackers being used to track you
- **Capabilities:**
  - Bluetooth tracker detection
  - AirTag stalking protection
  - Notification of unknown trackers
  - Location history of trackers
- **Cost:** Free (open source)
- **Best For:** Physical security, anti-stalking
- **Installation:** F-Droid or Play Store
- **Link:** github.com/seemoo-lab/AirGuard

#### 14e. **F-Droid** (Alternative App Store)
- **Platforms:** Android
- **What It Does:** Free and Open Source Software (FOSS) app repository
- **Capabilities:**
  - Curated FOSS apps only
  - No tracking or ads
  - Source code available
  - Reproducible builds
  - More secure than sideloading unknown APKs
- **Cost:** Free
- **Best For:** Installing trusted open-source security tools
- **Link:** f-droid.org

#### 14f. **Exodus Privacy** (App Privacy Checker)
- **Platforms:** Android (web-based and app)
- **What It Does:** Analyzes Android apps for trackers and permissions
- **Capabilities:**
  - Tracker detection (advertising, analytics)
  - Permission analysis
  - Privacy score
  - Database of 400,000+ analyzed apps
- **Cost:** Free (open source)
- **Best For:** Evaluating app privacy before installation
- **Installation:** F-Droid or web at exodus-privacy.eu.org
- **Link:** exodus-privacy.eu.org

---

## PART 2: TESTING PROCEDURES

### iOS TESTING PROCEDURES

### Procedure A (iOS): Initial Triage (5-10 minutes)

**Purpose:** Quick assessment to determine if deeper analysis is needed

**Steps:**

1. **User Interview**
   - "What behaviors make you think your phone is compromised?"
   - Document specific symptoms:
     - Battery draining faster than normal
     - Device running hot when idle
     - Unexplained data usage spikes
     - Apps opening/closing spontaneously
     - Strange messages or calls
     - Interference during calls (clicking, static)
     - Device rebooting randomly
     - Settings changing without user action

2. **Visual Inspection**
   - Check for jailbreak indicators:
     - Cydia app installed
     - Settings > General > About > Check version for anomalies
     - Unknown apps in app drawer
   - Configuration profiles:
     - Settings > General > VPN & Device Management
     - Note any unknown profiles (red flag if user didn't install)

3. **Network Activity Check**
   - Settings > Cellular > scroll to bottom
   - Look for apps with unexpectedly high data usage
   - Unknown apps using background data

4. **Quick Scan with iVerify** (if available)
   - Install iVerify app
   - Run automated scan
   - Review threat indicators

**Decision Point:**
- Low Risk: User education, continue monitoring
- Medium Risk: Proceed to Procedure B
- High Risk: Immediate containment, proceed to Procedure C

### Procedure B: Standard Security Audit (30-60 minutes)

**Purpose:** Comprehensive check for compromise indicators

**Prerequisites:**
- User consent documented
- Backup of device created
- Chain of custody form (if evidence needed)

**Steps:**

1. **Configuration Profile Analysis**
   ```
   Settings > General > VPN & Device Management
   ```
   - Document all profiles
   - Verify legitimacy of each with IT/MDM team
   - RED FLAG: Unknown profiles, especially with remote management capabilities

2. **App Inventory Audit**
   - List all installed apps
   - Cross-reference against:
     - Company approved app list
     - User's expected apps
     - Known malicious apps database
   - RED FLAG: Apps user doesn't recognize or didn't install

3. **Network Connection Analysis**
   - Settings > Wi-Fi > Check configured networks
   - RED FLAG: Unknown Wi-Fi networks saved
   - Settings > VPN > Check VPN configurations
   - RED FLAG: VPN user didn't configure

4. **Certificate Analysis**
   - Settings > General > About > Certificate Trust Settings
   - RED FLAG: Custom root certificates installed

5. **Backup Analysis with iMazing**
   - Create iTunes/iMazing backup
   - Extract and analyze:
     - Installed apps (including hidden/system)
     - SMS/iMessage database for anomalies
     - Call logs for unexpected entries
     - Configuration files
     - System logs

6. **Syslog Monitoring**
   - Connect device via USB
   - Use `idevicesyslog` (from libimobiledevice)
   - Monitor for 5-10 minutes
   - Look for:
     - Unusual process names
     - Repeated crashes
     - Unknown services
     - Suspicious network connections

7. **Network Traffic Analysis**
   - Option A: Configure device to use proxy (Charles Proxy, Burp Suite)
   - Option B: Monitor at network level (if on corporate Wi-Fi)
   - Capture 15-30 minutes of traffic
   - Look for:
     - Connections to suspicious IPs/domains
     - Unexpected encrypted traffic
     - Data exfiltration patterns
     - C2 beaconing behavior

**Deliverable:** Security audit report with findings and risk assessment

### Procedure C: Deep Forensic Analysis (2-8 hours)

**Purpose:** Comprehensive forensic examination for suspected compromise

**Prerequisites:**
- Written authorization
- Forensically sound backup
- Forensic workstation prepared
- Chain of custody documentation

**Tools Required:**
- Professional forensic tool (Cellebrite, Oxygen, Magnet AXIOM, or MSAB)
- MVT (Mobile Verification Toolkit)
- Network capture tools
- Analysis workstation (air-gapped recommended)

**Steps:**

1. **Physical Isolation**
   - Enable Airplane Mode
   - Document device state
   - Photograph screen, settings, app layout

2. **Full Device Extraction**
   - Use professional forensic tool
   - Attempt both logical and physical extraction
   - Create forensic image
   - Document extraction method and results

3. **MVT Analysis for Pegasus/Spyware**
   ```bash
   # Create encrypted backup
   idevicebackup2 backup --full /path/to/backup

   # Run MVT analysis
   mvt-ios check-backup --output /path/to/output /path/to/backup

   # Check against known IoCs
   mvt-ios check-backup --iocs pegasus.stix2 --output /path/to/output /path/to/backup
   ```

4. **Timeline Analysis**
   - Reconstruct device activity timeline
   - Identify:
     - When compromise likely occurred
     - What access was gained
     - What data was potentially exfiltrated
     - Duration of compromise

5. **Artifact Analysis**
   - **System Logs:** Look for anomalies, crashes, unusual processes
   - **Network Connections:** Historical connection data
   - **Installed Apps:** Full analysis including hidden/system apps
   - **File System:** Unexpected files, modified system files
   - **Databases:** SMS, calls, contacts, photos, app data
   - **Crash Logs:** Repeated crashes may indicate exploitation attempts
   - **Diagnostic Data:** Apple's diagnostic dumps

6. **Indicator of Compromise (IoC) Analysis**
   - Check against known malware signatures
   - Check against Pegasus IoCs (updated regularly by Amnesty International)
   - Check against custom threat intelligence feeds

7. **Memory Analysis** (if possible)
   - Requires jailbreak or specialized tools
   - Analyze running processes
   - Check for suspicious kernel extensions

8. **Network Behavior Analysis**
   - If device must be powered on for testing:
     - Use isolated network
     - Capture all traffic
     - Identify C2 communications
     - Document external connections

**Deliverable:**
- Full forensic report
- Evidence package
- Remediation recommendations
- Attribution assessment (if possible)

### Procedure D: Ongoing Monitoring (Continuous)

**Purpose:** Detect compromise in real-time or near-real-time

**Implementation:**

1. **MDM with Threat Detection**
   - Deploy Jamf Protect, Microsoft Defender, Lookout, or Zimperium
   - Configure policies:
     - Alert on jailbreak detection
     - Alert on unknown configuration profiles
     - Alert on suspicious app installations
     - Alert on network anomalies
     - Alert on device policy violations

2. **Network-Level Monitoring**
   - DNS filtering (Cisco Umbrella, etc.)
   - SIEM integration
   - Alert on:
     - Connections to known malicious IPs/domains
     - Unusual data volumes
     - C2 beaconing patterns
     - Tor/VPN usage (if against policy)

3. **User Behavior Analytics**
   - Baseline normal behavior
   - Alert on deviations:
     - Login from unusual locations
     - Access at unusual times
     - Unusual data access patterns

4. **Regular Automated Scans**
   - Weekly: Lightweight scans (iVerify or MDM)
   - Monthly: Configuration audits
   - Quarterly: Deep security reviews for high-risk users

---

### ANDROID TESTING PROCEDURES

### Procedure A (Android): Initial Triage (5-10 minutes)

**Purpose:** Quick assessment to determine if deeper analysis is needed

**Steps:**

1. **User Interview**
   - "What behaviors make you think your phone is compromised?"
   - Document specific symptoms:
     - Battery draining faster than normal
     - Device running hot when idle
     - Unexplained data usage spikes
     - Apps opening/closing spontaneously
     - Strange messages or calls
     - Pop-ups or ads appearing everywhere
     - Device slowing down significantly
     - Unknown apps installed
     - Settings changing without user action
     - Permissions requested by unexpected apps

2. **Visual Inspection**
   - Check for root/unlock indicators:
     - Settings > About Phone > Check if "Bootloader unlocked" or "OEM unlocking"
     - Look for root management apps (Magisk, SuperSU, KingRoot)
     - Unknown apps in app drawer
     - Developer options enabled (Settings > System > Developer options)
   - Check installed apps:
     - Settings > Apps > See all apps
     - Look for unfamiliar apps, especially system apps user didn't install
     - Check apps with Device Admin rights: Settings > Security > Device admin apps

3. **Permission Audit (Quick)**
   - Settings > Privacy > Permission manager
   - Look for unexpected apps with sensitive permissions:
     - Camera access by unknown apps
     - Microphone access by games/utilities
     - Location always-on for suspicious apps
     - SMS/Phone access by non-communication apps

4. **Play Protect Check**
   - Settings > Security > Google Play Protect
   - Check scan status and any warnings
   - Note: Play Protect misses ~31% of malware, so clean scan doesn't mean device is clean

5. **Quick Network Check**
   - Settings > Network & internet > Data usage
   - Look for apps with unexpectedly high data usage
   - Check for unknown VPN: Settings > Network & internet > VPN

**Decision Point:**
- Low Risk: User education, continue monitoring
- Medium Risk: Proceed to Procedure B
- High Risk: Immediate containment, proceed to Procedure C

### Procedure B (Android): Standard Security Audit (30-60 minutes)

**Purpose:** Comprehensive check for compromise indicators

**Prerequisites:**
- User consent documented
- Backup of device created (if possible)
- Chain of custody form (if evidence needed)

**Steps:**

1. **Device Information Collection**
   - Model, manufacturer, Android version
   - Security patch level: Settings > About phone > Android security update
   - Build number (check if custom ROM)
   - Kernel version

2. **Root Detection**
   - Use app: Root Checker (free on Play Store)
   - Check for Magisk Hide or other root-hiding tools
   - RED FLAG: Device is rooted without user's knowledge

3. **App Inventory Audit**
   - Use ADB to get complete app list:
     ```
     adb shell pm list packages -f
     ```
   - Cross-reference against:
     - Company approved app list
     - User's expected apps
     - Known malware databases (VirusTotal, Hypatia)
   - RED FLAG: Apps installed from unknown sources
   - RED FLAG: Apps with obfuscated names (com.android.systemupdate123)

4. **Permission Analysis Deep Dive**
   - Check Device Admin apps:
     ```
     adb shell dumpsys device_policy
     ```
   - List apps with dangerous permissions:
     ```
     adb shell pm list permissions -d -g
     ```
   - RED FLAG: Non-system apps with Device Admin
   - RED FLAG: Apps with Accessibility Service access (common malware vector)
   - Check Accessibility: Settings > Accessibility

5. **Installed from Unknown Sources Check**
   - Settings > Apps > Special app access > Install unknown apps
   - RED FLAG: Many apps allowed to install from unknown sources
   - RED FLAG: User didn't enable these intentionally

6. **ADB Backup and Analysis**
   - Create backup:
     ```
     adb backup -f backup.ab -all -apk -system
     ```
   - Extract with Android Backup Extractor
   - Analyze app data for anomalies
   - Check for suspicious files

7. **Log Analysis**
   - Capture system log:
     ```
     adb logcat -d > logcat.txt
     ```
   - Look for:
     - Crash loops
     - Permission denial attempts
     - Suspicious service names
     - Network connection attempts to unknown IPs

8. **Network Traffic Analysis**
   - Option A: Install network monitor app (PCAPdroid from F-Droid)
   - Option B: Route through proxy on WiFi
   - Capture 15-30 minutes of traffic
   - Look for:
     - Connections to suspicious IPs/domains
     - Data exfiltration patterns
     - C2 beaconing
     - Tor/proxy usage

9. **Certificate Analysis**
   - Settings > Security > Encryption & credentials > Trusted credentials
   - Check User certificates tab
   - RED FLAG: Unknown user-installed certificates (can intercept HTTPS)

10. **Scan with Multiple Tools**
    - Malwarebytes for Android
    - Hypatia (from F-Droid)
    - Upload suspicious APKs to VirusTotal
    - Compare results

**Deliverable:** Security audit report with findings and risk assessment

### Procedure C (Android): Deep Forensic Analysis (2-8 hours)

**Purpose:** Comprehensive forensic examination for suspected compromise

**Prerequisites:**
- Written authorization
- Forensically sound backup
- Forensic workstation prepared
- Chain of custody documentation

**Tools Required:**
- Professional forensic tool (Cellebrite, Oxygen, Magnet AXIOM, or MSAB)
- MVT (Mobile Verification Toolkit)
- ADB (Android Debug Bridge)
- APKTool, androguard
- Network capture tools
- Analysis workstation (air-gapped recommended)

**Steps:**

1. **Physical Isolation**
   - Enable Airplane Mode
   - Document device state
   - Photograph screen, settings, app layout
   - Photograph About Phone information

2. **Forensic Image Creation**
   - Use professional forensic tool for extraction
   - Attempt both logical and physical extraction
   - Document device state (locked/unlocked, rooted/unrooted)
   - Create forensic image
   - Document extraction method and results

3. **MVT Analysis for Pegasus/Spyware**
   ```bash
   # Enable ADB backup on device (may require user interaction)
   # Create backup
   adb backup -f android-backup.ab -all -apk

   # Run MVT analysis
   mvt-android check-backup --output /path/to/output android-backup.ab

   # Check against known IoCs
   mvt-android check-backup --iocs pegasus.stix2 --output /path/to/output android-backup.ab
   ```

4. **APK Analysis of Suspicious Apps**
   - Extract APKs:
     ```
     adb shell pm list packages | grep suspicious
     adb shell pm path com.package.name
     adb pull /path/to/app.apk
     ```
   - Analyze with APKTool:
     ```
     apktool d app.apk
     ```
   - Analyze with androguard:
     ```
     androguard analyze app.apk
     ```
   - Check for:
     - Obfuscation
     - Hidden permissions in manifest
     - Native libraries
     - Network endpoints
     - Encryption/data hiding

5. **Timeline Analysis**
   - Reconstruct device activity timeline
   - Identify:
     - When compromise likely occurred
     - What malware was installed
     - What data was potentially exfiltrated
     - Duration of compromise
     - Infection vector (sideload, phishing, etc.)

6. **Artifact Analysis**
   - **System Logs:** logcat, kernel logs, dmesg
   - **Network Connections:** netstat data, connection history
   - **Installed Apps:** System and user apps, including hidden
   - **File System:** /data, /sdcard, unusual files
   - **Databases:** SMS, calls, contacts, browser history
   - **Cache:** App caches for evidence
   - **Downloads:** Check download folder for APKs

7. **Root/Bootloader Analysis**
   - Check bootloader status:
     ```
     adb shell getprop ro.boot.verifiedbootstate
     adb shell getprop ro.boot.flash.locked
     ```
   - Check for custom recovery (TWRP, etc.)
   - Check for Magisk or other root frameworks
   - Examine boot partition for modifications

8. **Indicator of Compromise (IoC) Analysis**
   - Check against known Android malware signatures
   - Check against Pegasus IoCs (MVT database)
   - Check against custom threat intelligence feeds
   - VirusTotal analysis of all APKs

9. **Memory Analysis** (if possible)
   - Requires root or specialized extraction
   - Dump running processes
   - Check for suspicious daemons
   - Analyze loaded libraries

10. **Network Behavior Analysis**
    - If device must be powered on for testing:
      - Use isolated network
      - Capture all traffic
      - Identify C2 communications
      - Document external connections
      - DNS queries analysis

**Deliverable:**
- Full forensic report
- Evidence package (APKs, logs, screenshots)
- Remediation recommendations
- Attribution assessment (if possible)
- IoC list for organization-wide scanning

### Procedure D (Android): Ongoing Monitoring (Continuous)

**Purpose:** Detect compromise in real-time or near-real-time

**Implementation:**

1. **MDM with Threat Detection**
   - Deploy Microsoft Defender, Lookout, Zimperium, or VMware Workspace ONE
   - Configure policies:
     - Alert on root detection
     - Alert on unknown app installations
     - Alert on sideloading
     - Alert on Developer Mode enabled
     - Alert on network anomalies
     - Alert on Device Admin app installations
     - Alert on Accessibility Service misuse
     - Alert on security patch level falling behind

2. **Enforce Android Enterprise / Work Profile**
   - Separate personal and work data
   - Work profile apps containerized
   - Corporate data encrypted separately
   - Can wipe work data without affecting personal

3. **Network-Level Monitoring**
   - DNS filtering (Cisco Umbrella, etc.)
   - SIEM integration
   - Alert on:
     - Connections to known malicious IPs/domains
     - Unusual data volumes
     - C2 beaconing patterns
     - Tor/VPN usage (if against policy)

4. **Google Play Protect Integration**
   - Monitor Play Protect status via MDM
   - Alert if Play Protect disabled
   - Note: Insufficient alone, but useful data point

5. **Automated Scanning**
   - Weekly: MDM compliance check
   - Bi-weekly: Remote malware scan (if MDM supports)
   - Monthly: App inventory audit
   - Quarterly: Deep security review for high-risk users

6. **Update Monitoring**
   - Track Android security patch level
   - Alert if device >3 months behind on patches
   - Alert if manufacturer no longer provides updates (EOL devices)

---

## PART 3: CERTIFICATION WORKFLOW

### Level 1: Basic Certification (Low-Risk Users)

**Suitable For:** General employees, low-value targets

**Requirements:**
- Procedure A: Initial Triage (passed)
- iVerify scan or equivalent (clean)
- MDM compliance check (passed)
- User security awareness training (completed)

**Certification Validity:** 3 months

**Re-certification:** Automated via MDM if no alerts

### Level 2: Standard Certification (Medium-Risk Users)

**Suitable For:** Managers, access to sensitive data, executive assistants

**Requirements:**
- Procedure B: Standard Security Audit (passed)
- Professional tool scan (Jamf Protect, Lookout, etc.) (clean)
- Network behavior analysis (1 week, clean)
- Advanced security training (completed)

**Certification Validity:** 1 month

**Re-certification:** Monthly audit

### Level 3: High-Security Certification (High-Risk Users)

**Suitable For:** Executives, journalists, activists, security personnel, legal team, high-value targets

**Requirements:**
- Procedure C: Deep Forensic Analysis (passed)
- MVT scan against Pegasus IoCs (clean)
- Professional forensic tool full extraction (clean)
- Continuous monitoring enabled (mandatory)
- Lockdown mode enabled (mandatory)
- Regular threat briefings (mandatory)

**Certification Validity:** 2 weeks

**Re-certification:** Bi-weekly forensic scan

**Additional Measures:**
- Consider providing clean devices from secure supply chain
- Enable Apple's Lockdown Mode
- Restrict app installations (MDM controlled only)
- Disable iMessage/FaceTime (use Signal or secure alternative)
- VPN mandatory for all connections
- Consider rotation to fresh device quarterly

---

## PART 4: REMEDIATION PROCEDURES

### IMMEDIATE ACTIONS (Both Platforms)

**If Compromise Detected - Do These Steps First:**

1. **Containment**
   - Enable Airplane Mode immediately
   - Do NOT wipe device yet (preserve evidence)
   - Isolate from network
   - Document current state (screenshots, photos)
   - Note time of detection

2. **Notification**
   - Inform user (if not aware)
   - Notify security team
   - Notify legal (if required)
   - Notify executives (if material breach)
   - Consider law enforcement (if criminal activity)

3. **Evidence Preservation**
   - Create full forensic backup (iOS: iTunes/iMazing, Android: ADB)
   - Document all findings
   - Preserve logs from network/MDM
   - Chain of custody paperwork
   - Screenshot all indicators of compromise

4. **Damage Assessment**
   - What data was on device?
   - What access did device have (email, cloud, corporate apps)?
   - What credentials were stored?
   - What duration of compromise?
   - What data likely exfiltrated?
   - What sensitive conversations occurred during compromise?

5. **Containment Expansion**
   - Reset ALL passwords accessible from device
   - Revoke access tokens/sessions
   - Monitor for lateral movement to other systems
   - Check other devices user owns
   - Review access logs for abuse
   - Alert other users if targeted attack

---

### iOS-SPECIFIC REMEDIATION

**Complete Device Wipe:**

1. **DFU Mode Restore** (Most Thorough)
   - Connect to computer with iTunes/Finder
   - Enter DFU (Device Firmware Update) mode:
     - iPhone 8 or later: Volume Up (quick), Volume Down (quick), Hold Side button
     - iPhone 7: Hold Volume Down + Side button
     - iPhone 6s or earlier: Hold Home + Side button
   - Restore in iTunes/Finder
   - This wipes everything including firmware

2. **Standard Factory Reset** (Alternative if DFU fails)
   - Settings > General > Transfer or Reset iPhone > Erase All Content and Settings
   - Less thorough than DFU but acceptable if DFU not possible

**Clean Setup:**

1. **Fresh iOS Install**
   - Do NOT restore from backup (backup may contain malware)
   - Set up as new iPhone
   - Use latest iOS version
   - Skip data migration

2. **MDM Enrollment First**
   - Enroll in MDM before adding any data
   - Wait for all MDM policies to apply
   - Install corporate certificates

3. **Selective Data Restoration**
   - Manually re-download apps from App Store only
   - Sync contacts/calendars from cloud (not backup)
   - Re-enter passwords manually (don't use keychain backup)
   - Review photos individually before syncing

4. **Security Hardening**
   - Enable Lockdown Mode (for high-risk users)
   - Disable iMessage if not needed
   - Review all app permissions
   - New strong passcode
   - New Apple ID password
   - Enable 2FA on all accounts

**Enhanced Monitoring (90 days):**
- Weekly security scans
- Bi-weekly certification checks
- Monitor for repeat compromise
- User education on attack vector

---

### ANDROID-SPECIFIC REMEDIATION

**Complete Device Wipe:**

1. **Factory Reset via Settings** (Preferred if accessible)
   - Settings > System > Reset options > Erase all data (factory reset)
   - This wipes /data partition and returns to stock

2. **Recovery Mode Factory Reset** (If device compromised/locked)
   - Power off device
   - Enter recovery mode (varies by manufacturer):
     - Samsung: Volume Up + Power
     - Google Pixel: Volume Down + Power, then navigate to Recovery
     - Most others: Volume Up + Power
   - Select "Wipe data/factory reset"
   - Confirm wipe

3. **Flash Stock ROM** (If rooted or custom ROM installed)
   - Download official stock ROM from manufacturer
   - Use manufacturer's flash tool:
     - Samsung: Odin
     - Google: Android Flash Tool or fastboot
     - Other manufacturers: Specific flash tools
   - Completely overwrites all partitions
   - Most thorough method for rooted devices

4. **Re-lock Bootloader** (If it was unlocked)
   - Boot to fastboot mode
   - Command: `fastboot flashing lock`
   - WARNING: This will wipe device again
   - Essential for security

**Clean Setup:**

1. **Fresh Android Install**
   - Do NOT restore from backup (backup may contain malware)
   - Set up as new device
   - Latest Android version
   - Skip data migration/restore options

2. **Security Verification**
   - Verify bootloader status (should be locked)
   - Verify device NOT rooted
   - Check security patch level (should be current after reset)
   - Verify SafetyNet/Play Integrity passes

3. **MDM Enrollment First**
   - Enroll in Android Enterprise / Work Profile
   - Wait for all policies to apply
   - Install corporate certificates
   - Container work data separately

4. **Selective Data Restoration**
   - Manually install apps from Play Store only
   - Do NOT sideload any APKs
   - Sync contacts/calendars from cloud (not backup)
   - Re-enter passwords manually
   - Review photos individually before syncing

5. **Security Hardening**
   - Verify Developer Options disabled
   - Verify USB Debugging disabled
   - Verify OEM Unlocking disabled
   - Enable Google Play Protect
   - Review "Install unknown apps" - should be none
   - Review Device Admin apps - should only be MDM
   - Review Accessibility Service - should be none or only trusted
   - Review all app permissions
   - Strong lock screen (PIN 6+ digits or password)
   - Enable biometric + strong PIN/password
   - New Google account password
   - Enable 2FA on all accounts

6. **Long-term Protection**
   - Disable "Install unknown apps" for all apps
   - Keep security patches current
   - Regular app audits via Exodus Privacy
   - Use F-Droid for open source apps when possible

**Enhanced Monitoring (90 days):**
- Weekly malware scans (Malwarebytes, Hypatia)
- Bi-weekly certification checks
- Monthly root detection scans
- Monitor app installations via MDM
- User education on attack vector (likely sideloading or phishing)

---

### INVESTIGATION (Both Platforms)

**1. Root Cause Analysis**

Determine attack vector:
- **Social engineering?**
  - Phishing link clicked
  - Malicious profile installed (iOS)
  - APK sideloaded (Android)
  - Wi-Fi password shared
- **Technical vulnerability?**
  - Zero-day exploit
  - Unpatched device
  - Unsecured app
- **Physical access?**
  - Device left unattended
  - Stolen/lost then returned
- **Malicious app?**
  - From App Store/Play Store
  - Sideloaded (Android)
  - Enterprise app

**2. Attribution** (if possible)
- Who did this?
  - State actor (Pegasus-level sophistication)
  - Hacker-for-hire service
  - Personal adversary
  - Competitor
  - Criminal group
- Why were we targeted?
  - High-value target
  - Specific data/access
  - Ransom/extortion
  - Espionage
- What was their goal?
  - Data theft
  - Surveillance
  - Credential theft
  - Financial gain
- Are others at risk?
  - Same department
  - Similar roles
  - Using same apps

**3. Prevention**
- Update procedures to prevent recurrence
- Platform-specific controls:
  - iOS: Require Lockdown Mode for execs
  - Android: Disable sideloading, enforce Android Enterprise
- Additional training on specific attack vector
- Technical controls (MDM policies, network filtering)
- Policy updates (BYOD restrictions, app whitelisting)
- Consider replacing devices if supply chain compromise suspected

---

## PART 5: PREVENTIVE MEASURES

### Technical Controls

1. **MDM Deployment** (Mandatory)
   - Enforce device encryption
   - Require strong passcodes (6+ digits, alphanumeric recommended)
   - Auto-lock after 2 minutes
   - Wipe after 10 failed attempts
   - Disable Siri on lock screen
   - Require OS updates within 7 days
   - App installation restrictions

2. **Network Security**
   - VPN required for all corporate data access
   - DNS filtering (block malicious domains)
   - Certificate pinning for corporate apps
   - Network access control (NAC)

3. **Apple Lockdown Mode** (High-Risk Users)
   - Settings > Privacy & Security > Lockdown Mode
   - Significantly reduces attack surface
   - Trade-off: Reduces functionality
   - Recommended for: Executives, high-value targets

4. **Threat Detection Software**
   - Deploy mobile threat defense platform
   - Real-time monitoring
   - Automated alerting

### Policy Controls

1. **BYOD Policy**
   - Only approved devices
   - MDM enrollment mandatory
   - Containerization for corporate data
   - Right to inspect if compromise suspected
   - User acknowledgment of monitoring

2. **App Restrictions**
   - Whitelist approved apps only
   - Blacklist high-risk apps
   - No jailbreaking (automatic wipe if detected)
   - Regular app audits

3. **User Responsibilities**
   - Report suspicious behavior immediately
   - Don't share Wi-Fi passwords
   - Don't click unknown links
   - Don't install unknown profiles
   - Regular security training

4. **Incident Response Plan**
   - Clear escalation procedures
   - Contact list (security team, legal, forensics)
   - Predefined workflows
   - Communication templates

### User Education

**Required Training Topics:**

1. **Social Engineering Awareness**
   - Don't share Wi-Fi passwords with strangers
   - Verify identity before granting access
   - Phishing recognition
   - Pretexting scenarios

2. **Technical Hygiene**
   - Only install from App Store
   - Review app permissions
   - Don't accept unknown configuration profiles
   - Keep iOS updated
   - Use strong unique passwords

3. **Threat Awareness**
   - "Unhackable iPhone" is marketing myth
   - Real threats exist (Pegasus, consumer malware)
   - Low-level hackers, not just governments
   - You ARE a potential target

4. **Reporting Procedures**
   - When to report concerns
   - Who to contact
   - What information to provide
   - No penalty for false positives

---

## PART 6: COST ANALYSIS & RECOMMENDATIONS

### Budget Tiers

#### Tier 1: Minimal Budget (<$5,000)
**Tools:**
- iVerify (free/low-cost): $0-$500/year
- iMazing: $500-$1,000 for licenses
- MVT (free): $0
- libimobiledevice (free): $0

**Capabilities:**
- Basic scanning
- Manual audits
- Limited detection

**Suitable For:** <50 devices, low-risk environment

#### Tier 2: Small Business ($5,000-$50,000)
**Tools:**
- Jamf Protect or Lookout: $10,000-$20,000/year
- iMazing for audits: $1,000
- Professional forensics (as-needed): $5,000-$15,000/incident

**Capabilities:**
- Real-time threat detection
- Automated monitoring
- Professional forensics when needed

**Suitable For:** 50-500 devices, moderate risk

#### Tier 3: Enterprise ($50,000-$250,000)
**Tools:**
- Enterprise MTD (Zimperium, Lookout, MS Defender): $30,000-$100,000/year
- Professional forensics platform (Cellebrite, Magnet): $50,000-$100,000
- Network security (Cisco Umbrella, Darktrace): $20,000-$50,000/year
- Staff training: $10,000-$20,000/year

**Capabilities:**
- Comprehensive detection
- In-house forensics
- Real-time response
- Advanced threat intelligence

**Suitable For:** 500+ devices, high-risk environment

#### Tier 4: High-Security (>$250,000)
**Tools:**
- All of Tier 3, plus:
- Multiple forensic platforms (redundancy)
- Dedicated forensics team
- Threat intelligence feeds
- Security operations center (SOC)
- Incident response retainer

**Capabilities:**
- State-of-the-art detection
- Immediate response
- Threat hunting
- Attribution capabilities

**Suitable For:** Critical infrastructure, defense contractors, high-value targets

---

## PART 7: RECOMMENDED IMPLEMENTATION PLAN

### Phase 1: Foundation (Month 1-2)

**Goals:** Establish basic capabilities

1. **Select and deploy MDM** (if not already in place)
   - Recommendation: Jamf Pro (iOS-focused) or Microsoft Intune (if Microsoft shop)

2. **Add mobile threat defense**
   - Recommendation: Jamf Protect (Jamf users) or Microsoft Defender (Microsoft users)

3. **Deploy network security**
   - Recommendation: Cisco Umbrella or similar DNS filtering

4. **Purchase audit tools**
   - Recommendation: iMazing (all orgs) + MVT (free)

5. **Develop policies**
   - BYOD policy
   - Incident response procedures
   - User acceptable use policy

6. **Train security team**
   - Procedures A & B mastery
   - Tool familiarization

### Phase 2: Operationalization (Month 3-4)

**Goals:** Begin active monitoring and testing

1. **User onboarding**
   - Enroll all devices in MDM
   - Install threat detection software
   - Initial security audits (Procedure B)
   - User training

2. **Establish baseline**
   - Normal behavior patterns
   - Legitimate apps
   - Typical network usage

3. **Configure alerting**
   - MDM compliance alerts
   - Threat detection alerts
   - Network anomaly alerts

4. **Test incident response**
   - Tabletop exercise
   - Simulate compromise
   - Validate procedures

### Phase 3: Maturity (Month 5-6)

**Goals:** Advanced capabilities and continuous improvement

1. **Add professional forensics** (if budget permits)
   - Purchase Cellebrite, Oxygen, or Magnet AXIOM
   - Train team on deep forensics (Procedure C)

2. **Implement certification program**
   - Define risk tiers
   - Establish certification schedules
   - Create tracking system

3. **Enhance monitoring**
   - SIEM integration
   - Correlation rules
   - Automated response

4. **Regular testing**
   - Quarterly audits for all users
   - Penetration testing
   - Red team exercises

### Phase 4: Continuous Improvement (Ongoing)

**Goals:** Stay ahead of threats

1. **Threat intelligence**
   - Subscribe to IoC feeds
   - Update MVT regularly
   - Industry sharing (ISAC, etc.)

2. **Tool updates**
   - Keep software current
   - Evaluate new tools annually
   - Retire ineffective tools

3. **Training updates**
   - Quarterly user refreshers
   - Annual security team deep-dive
   - Lessons learned integration

4. **Metrics and reporting**
   - Track: Devices scanned, threats detected, incidents, certification status
   - Report to leadership quarterly
   - Adjust budget/resources based on threat landscape

---

## PART 8: RED FLAGS CHECKLIST

### User-Reported Symptoms (Both Platforms)
- [ ] Battery draining unusually fast
- [ ] Device hot when idle
- [ ] Unexpected data usage spikes
- [ ] Apps opening/closing spontaneously
- [ ] Strange texts or calls
- [ ] Interference during calls (clicking, echoes, static)
- [ ] Device rebooting randomly
- [ ] Settings changing without user action
- [ ] Slower performance than normal
- [ ] Pop-ups or ads in unexpected places
- [ ] Camera/microphone activating unexpectedly
- [ ] Unusual network activity lights/indicators
- [ ] Apps crashing frequently
- [ ] Delayed shutdown or restart

### iOS-Specific Technical Indicators
- [ ] Unknown configuration profiles installed
- [ ] Jailbreak detected (Cydia, Sileo, etc.)
- [ ] Custom root certificates installed
- [ ] Unknown VPN configurations
- [ ] Suspicious process names in logs
- [ ] Modified system files
- [ ] Unknown Apple ID activity
- [ ] Lockdown Mode mysteriously disabled
- [ ] Profile & Device Management section present when shouldn't be
- [ ] iMessage/FaceTime deactivated unexpectedly

### Android-Specific Technical Indicators
- [ ] Device rooted without user knowledge (Magisk, SuperSU, KingRoot)
- [ ] Bootloader unlocked status (when user didn't unlock)
- [ ] Unknown apps installed from unknown sources
- [ ] Apps with Device Admin privileges user didn't grant
- [ ] Apps with Accessibility Service access user didn't grant
- [ ] Custom ROM installed (check build number)
- [ ] Developer options enabled when user didn't enable
- [ ] USB debugging enabled without user action
- [ ] Google Play Protect disabled
- [ ] Multiple apps allowed to "Install unknown apps"
- [ ] System UI changes (unexpected overlays, banners)
- [ ] OEM unlock status enabled
- [ ] Suspicious APK files in Downloads folder
- [ ] Unknown user certificates installed
- [ ] Apps requesting to overlay other apps
- [ ] Unusual system apps with generic names (e.g., "System Update Service")
- [ ] Custom recovery installed (TWRP, CWM)
- [ ] Security patch level more than 6 months old (could indicate fake/modified ROM)

### Common Technical Indicators (Both Platforms)
- [ ] Unrecognized apps installed
- [ ] Custom root certificates installed
- [ ] Unknown VPN configurations
- [ ] Suspicious process names in logs
- [ ] Connections to suspicious IPs/domains
- [ ] Unusual network traffic patterns
- [ ] Suspicious crash logs
- [ ] Unknown Wi-Fi networks saved
- [ ] Apps with unexpected permissions
- [ ] SMS messages to unknown short codes (premium rate scams)
- [ ] Unexplained charges on phone bill
- [ ] Bluetooth enabled when user keeps it off
- [ ] Location services enabled for unknown apps

### Behavioral Indicators (Both Platforms)
- [ ] User received suspicious links before symptoms
- [ ] User clicked on phishing link
- [ ] User shared Wi-Fi password with unknown person
- [ ] User installed configuration profile from non-IT source (iOS)
- [ ] User sideloaded APK from unknown source (Android)
- [ ] User is high-value target (exec, journalist, activist, lawyer, etc.)
- [ ] User has adversaries (litigation, competitors, ex-partners, etc.)
- [ ] User reports feeling "watched"
- [ ] Conversations referenced in unexpected ways
- [ ] User visited untrusted websites
- [ ] User connected to public Wi-Fi without VPN
- [ ] User downloaded attachments from unknown senders
- [ ] User granted excessive permissions to apps
- [ ] User ignored security warnings
- [ ] Device left unattended in public places

---

## PART 9: VENDOR CONTACT INFORMATION

### Professional Forensics
- **Cellebrite:** https://cellebrite.com | sales@cellebrite.com
- **Oxygen Forensics:** https://oxygen-forensic.com | sales@oxygen-forensic.com
- **Magnet Forensics:** https://magnetforensics.com | sales@magnetforensics.com
- **MSAB:** https://msab.com | info@msab.com

### Mobile Threat Defense
- **Jamf:** https://jamf.com | sales@jamf.com
- **Lookout:** https://lookout.com | info@lookout.com
- **Zimperium:** https://zimperium.com | sales@zimperium.com
- **Microsoft:** https://microsoft.com/security | Contact your MS rep

### Network Security
- **Cisco Umbrella:** https://umbrella.cisco.com | Contact Cisco rep
- **Darktrace:** https://darktrace.com | info@darktrace.com

### Audit Tools
- **iMazing:** https://imazing.com (direct purchase)
- **iVerify:** https://iverify.io | support@iverify.io

### Open Source
- **MVT:** https://github.com/mvt-project/mvt
- **libimobiledevice:** https://libimobiledevice.org

---

## PART 10: QUICK REFERENCE DECISION TREE

```
Employee reports concern about iPhone
           |
           v
    Run Procedure A (Triage)
           |
           v
    Risk Level?
      /    |    \
    Low  Medium  High
     |     |      |
     v     v      v
   Clean  Proc B  Proc C
          /  \      |
         /    \     v
     Clean  Suspect  |
        |       \    |
        v        v   v
    Document  Forensics
              Analysis
                 |
                 v
           Compromised?
              /    \
            No     Yes
            |       |
            v       v
        Monitor  Remediate
                    |
                    v
                Investigate
                    |
                    v
                  Update
                 Defenses
```

---

## APPENDIX A: Sample Report Template

**Device Security Assessment Report**

**Date:** [DATE]
**Analyst:** [NAME]
**Device Owner:** [NAME/DEPT]
**Device:** [iPhone Model, iOS Version, Serial Number]
**Assessment Level:** [A/B/C]

**Executive Summary:**
[Clean / Indicators of Compromise Detected / Compromised]

**Assessment Performed:**
- [ ] User Interview
- [ ] Visual Inspection
- [ ] Configuration Analysis
- [ ] App Inventory
- [ ] Network Analysis
- [ ] Backup Analysis
- [ ] Forensic Extraction
- [ ] MVT Scan
- [ ] Traffic Capture

**Findings:**
1. [Finding 1]
2. [Finding 2]
...

**Risk Level:** [Low / Medium / High / Critical]

**Indicators of Compromise:**
[None / List IoCs]

**Recommendations:**
1. [Recommendation 1]
2. [Recommendation 2]
...

**Next Steps:**
[Continue monitoring / Re-test in X days / Immediate remediation required]

**Certification Status:**
[Certified for X months / Not certified - remediation required]

---

## APPENDIX B: Useful Commands & Scripts

### iOS Commands (libimobiledevice)

```bash
# List connected devices
idevice_id -l

# Get device info
ideviceinfo

# Get device logs in real-time
idevicesyslog

# Create backup
idevicebackup2 backup --full /path/to/backup

# List installed apps
ideviceinstaller -l

# Get crash reports
idevicecrashreport /path/to/output
```

### Android Commands (ADB - Android Debug Bridge)

```bash
# List connected devices
adb devices

# Get device info
adb shell getprop

# Get detailed device info
adb shell getprop | grep -E "model|manufacturer|version|security_patch"

# Check bootloader status
adb shell getprop ro.boot.verifiedbootstate
adb shell getprop ro.boot.flash.locked

# Create full backup (requires device approval)
adb backup -f backup.ab -all -apk -system

# List all installed packages
adb shell pm list packages -f

# List only user-installed apps
adb shell pm list packages -3

# Get app information
adb shell dumpsys package com.package.name

# List apps with dangerous permissions
adb shell pm list permissions -d -g

# Check Device Admin apps
adb shell dumpsys device_policy

# Get system logs
adb logcat -d > logcat.txt

# Get kernel logs
adb shell dmesg > dmesg.txt

# Pull APK from device
adb shell pm path com.package.name
adb pull /path/to/app.apk

# Check for root
adb shell su -c id  # If returns uid=0, device is rooted

# Install app
adb install app.apk

# Uninstall app
adb uninstall com.package.name

# Take screenshot
adb shell screencap /sdcard/screenshot.png
adb pull /sdcard/screenshot.png

# Get running processes
adb shell ps

# Get network statistics
adb shell dumpsys netstats

# Check certificate store
adb shell ls /system/etc/security/cacerts/  # System certs
adb shell ls /data/misc/user/0/cacerts-added/  # User certs
```

### MVT Commands (Both Platforms)

```bash
# Install MVT
pip3 install mvt

# ===== iOS =====
# Check iOS backup for compromise
mvt-ios check-backup --output /path/to/output /path/to/backup

# Check iOS backup with Pegasus IoCs
# First, download IoCs from: https://github.com/AmnestyTech/investigations
mvt-ios check-backup --iocs pegasus.stix2 --output /path/to/output /path/to/backup

# Decrypt iOS backup (if encrypted)
mvt-ios decrypt-backup -p PASSWORD /path/to/encrypted /path/to/decrypted

# ===== Android =====
# Check Android backup for compromise
mvt-android check-backup --output /path/to/output backup.ab

# Check Android backup with Pegasus IoCs
mvt-android check-backup --iocs pegasus.stix2 --output /path/to/output backup.ab

# Extract Android backup
# First, install Android Backup Extractor
# Then: abe unpack backup.ab backup.tar
# Then: tar xvf backup.tar
```

### APK Analysis Commands (Android)

```bash
# Install APKTool
# Download from https://apktool.org

# Decompile APK
apktool d app.apk -o output_directory

# View AndroidManifest.xml
apktool d app.apk
cat output_directory/AndroidManifest.xml

# Install androguard
pip3 install androguard

# Analyze APK with androguard
androguard analyze app.apk

# Get APK info
androguard axml app.apk

# Check for malicious patterns (requires androguard)
python3 -c "from androguard.core.bytecodes.apk import APK; a = APK('app.apk'); print(a.get_permissions())"
```

### Network Analysis (Both Platforms)

```bash
# Capture traffic with tcpdump (on monitoring network)
# For iOS:
sudo tcpdump -i en0 -w iphone_traffic.pcap host [IPHONE_IP]

# For Android:
sudo tcpdump -i en0 -w android_traffic.pcap host [ANDROID_IP]

# Analyze with tshark
tshark -r traffic.pcap -Y "dns or http or tls"

# Look for suspicious domains
tshark -r traffic.pcap -Y dns -T fields -e dns.qry.name | sort | uniq

# Filter for specific IP
tshark -r traffic.pcap -Y "ip.addr == 192.168.1.100"

# Show HTTP requests
tshark -r traffic.pcap -Y http.request -T fields -e http.host -e http.request.uri

# Identify C2 beaconing (regular connections to same IP)
tshark -r traffic.pcap -T fields -e ip.dst | sort | uniq -c | sort -rn
```

### Root/Jailbreak Detection Scripts

```bash
# iOS - Check for jailbreak indicators
ideviceinfo | grep -i "jailbreak"
ideviceinstaller -l | grep -E "Cydia|Sileo|Zebra"

# Android - Check for root (on device)
# Method 1: Check for su binary
adb shell "which su"

# Method 2: Check for common root apps
adb shell pm list packages | grep -E "magisk|supersu|kingroot"

# Method 3: Try to execute su
adb shell "su -c id" 2>&1 | grep -q "uid=0" && echo "ROOTED" || echo "NOT ROOTED"

# Method 4: Check for Magisk
adb shell pm list packages | grep "com.topjohnwu.magisk"
```

---

## CONCLUSION

Given OTW's revelations that **"there's a lot of malware on Apple phones"** despite Apple's marketing, and that **Android devices are "easier to hack"**, organizations must take mobile security seriously for **both platforms**.

### Key Takeaways:

1. **Don't trust manufacturer marketing:**
   - Apple's "unhackable" claims ≠ reality
   - Android's openness = larger attack surface
   - Both platforms are actively compromised in the wild

2. **Implement platform-appropriate detection:**
   - Deploy tools appropriate to your risk/budget
   - iOS: Focus on jailbreak detection, profile monitoring, MDM compliance
   - Android: Focus on root detection, sideloading prevention, app permissions

3. **Establish testing procedures:**
   - Triage → Audit → Forensics pipeline for both platforms
   - Platform-specific red flags and indicators
   - Regular certification cycles

4. **Train users on platform-specific threats:**
   - Social engineering is 80% of attacks (both platforms)
   - iOS: Beware malicious profiles, phishing for Apple ID
   - Android: Never sideload APKs, review app permissions carefully

5. **Monitor continuously:**
   - One-time checks are insufficient
   - iOS: iVerify, Jamf Protect, lockdown mode
   - Android: Play Protect + enterprise MTD, work profiles

6. **Respond decisively:**
   - Have platform-specific remediation procedures ready
   - iOS: DFU restore, selective data restoration
   - Android: Factory reset or flash stock ROM, re-lock bootloader

### Critical Reality Check:

**The threat is REAL, PERVASIVE, and affects REGULAR PEOPLE—not just high-value targets.**

According to OTW:
- Multiple malware sources on single devices
- Low-level hackers targeting everyday people
- Smart homes, routers, phones all compromised
- Hacker-for-hire services: $500-$2,000
- Malware-as-a-service: modular, accessible, no coding required

**Every organization should:**
- Assume compromise is possible on ANY mobile device
- Test regularly with appropriate tools
- Maintain heightened security posture
- Educate users continuously
- Have incident response procedures ready

### Platform-Specific Recommendations:

**For iOS environments:**
- Enable Lockdown Mode for executives and high-risk users
- Require MDM enrollment for all corporate devices
- Deploy mobile threat defense (Jamf Protect, Lookout, Zimperium)
- Regular MVT scans for high-value targets

**For Android environments:**
- Enforce Android Enterprise with work profiles
- Block all sideloading via MDM
- Require monthly security patches
- Deploy mobile threat defense with root detection
- Regular app audits and permission reviews

**For mixed environments:**
- Platform-agnostic network security (Cisco Umbrella, Darktrace)
- Unified endpoint management (Microsoft Intune, VMware Workspace ONE)
- Consistent security policies adapted for each platform
- Cross-platform threat intelligence sharing

---

**Document Version:** 2.0 (Updated with Android procedures)
**Last Updated:** 2025-11-10
**Platforms Covered:** iOS and Android
**Next Review:** 2026-02-10 (or when new threats emerge)
**Based On:** OTW interview revelations, industry best practices, forensics experience
