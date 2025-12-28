# Self-Hosted Subscription Replacement - Project Summary

**Creator**: Unknown Tech YouTuber (31 years old)
**Video ID**: UFmZCyo_vHY
**Date Analyzed**: 2025-11-22
**Project**: Replace $1,600/year in subscriptions for under $100

---

## Project Overview

### Goal
Replace Netflix, Hulu, Apple TV+, Paramount+, Spotify, and iCloud with self-hosted alternatives for less than $100 total cost.

### Result
**SUCCESS** - Total cost: ~$100 (hardware only)

---

## Hardware Solution

### Base System
- **Device**: Dell Optiplex (7th gen i5, 8GB RAM)
- **Source**: eBay
- **Cost**: $55
- **Reason for availability**: Windows 10 end-of-life causing businesses to upgrade, flooding market with functional PCs

### Additional Hardware
- **USB Blu-ray drive**: $40 (for 4K media ripping)
- Built-in DVD drive included in Optiplex

### Storage
- Spare SSD (creator had on hand)
- No hard drive included with PC (likely from hospital with privacy requirements)

---

## Software Stack

### Operating System
- **Ubuntu Desktop** (not Server version)
- **Rationale**:
  - Security updates (vs. Windows 10 EOL)
  - Prevents forced reboots
  - Well-supported for troubleshooting
  - 5-minute installation time

### Media Server (Netflix/Hulu/etc. replacement)
- **Software**: Plex
- **Alternatives mentioned**: Emby, Jellyfin
- **Features**:
  - Native Ubuntu installer
  - Built-in music player (Spotify replacement)
  - Remote access via port forwarding
  - Automatic media organization

### Photo Backup (iCloud replacement)
- **Software**: Immich
- **Features**:
  - Free and open-source
  - Auto-sync on WiFi (or mobile data if configured)
  - Person recognition/search
  - Live photo support
  - Better interface than iCloud (per creator)
- **Performance**: 5,000 photos synced in ~1 hour

### Media Ripping
- **DVD**: Drag-and-drop (no encryption)
- **Blu-ray**: MakeMKV software
- **CD**: Drag-and-drop (minimal encryption)

---

## Technical Challenges Encountered

### Docker Permissions (30 minutes)
- **Problem**: Plex couldn't see desktop folders
- **Cause**: Docker acts as separate user without full file access
- **Solution**: Found Reddit thread with command to grant permissions
- **Lesson**: Linux learning curve exists but solvable

### IP Address Configuration (20 minutes)
- **Problem**: Immich app needed server IP, unfamiliar with Ubuntu networking
- **Attempted**: Windows-style "ipconfig" (didn't work)
- **Solution**: `hostname -I` command revealed local IP
- **Lesson**: Windows knowledge doesn't directly transfer

---

## Cost Analysis

### Subscriptions Replaced
- Netflix
- Hulu
- Apple TV+
- Paramount Plus
- Spotify
- iCloud (200GB+ tier at $10/month)

**Estimated savings**: $1,600/year

### One-Time Costs
- Dell Optiplex: $55
- USB Blu-ray drive: $40
- **Total**: $95

### Ongoing Costs
- Physical media: $5-20 per disc (variable)
- Half Price Books trip shown as example
- Note: Could become expensive for large libraries

### Time Investment
- Hardware acquisition: ~5 days shipping
- OS installation: 5 minutes
- Plex setup: ~1 hour (including troubleshooting)
- Immich setup: ~5 minutes + 1 hour sync
- Media ripping: Ongoing, per-disc time investment
- **Initial setup**: ~10 minutes of "real effort" + troubleshooting time

---

## Key Insights

### What Worked Well
1. **Hardware sourcing**: Windows 10 EOL timing perfect for cheap business PCs
2. **eBay buyer protections**: Low risk for hardware purchases
3. **Ubuntu Desktop**: Easier than Server version for beginners
4. **Plex native installer**: Simplified setup significantly
5. **Immich reliability**: Worked immediately after IP issue resolved
6. **Dell Optiplex design**: Toolless drive installation, multiple USB ports
7. **Blu-ray drive**: Handled encryption without issues

### Limitations & Concerns
1. **Streaming-exclusive content**: Cannot access Netflix originals without subscription
2. **Maintenance not covered**: Updates, backups, hardware failure scenarios
3. **Learning curve**: Requires comfort with troubleshooting
4. **Physical media cost**: Heavy viewers might spend more on discs than subscriptions
5. **Legal considerations**: DVD/Blu-ray ripping laws vary by jurisdiction (not discussed)
6. **Bandwidth**: Remote access data costs not calculated

---

## ROI Calculation

**Initial Investment**: $95
**Annual Savings**: $1,600
**Payback Period**: 22 days
**5-Year Savings**: $7,905

*Note: Assumes full replacement of all services; actual savings depend on usage patterns*

---

## Technical Specs

### Dell Optiplex Capabilities
- 6x USB 3.0 ports
- 4x USB 2.0 ports
- Built-in DVD drive
- 3x display outputs
- 7th generation i5 processor
- 8GB RAM
- Sufficient for media server, not main workstation
- "Some people host on Raspberry Pi, this has way more power"

### Software Requirements
- Ubuntu Desktop (latest stable)
- Plex Media Server
- Immich
- MakeMKV (for Blu-ray ripping)

---

## Comparison to Alternatives

### Why Not Windows 10?
- No more security updates (EOL)
- Forced reboots interrupt server uptime
- Creator cares about security ("stalker subscribers not doxing my gym day")

### Why Not Ubuntu Server?
- Requires more command-line expertise
- More SSH knowledge needed
- Desktop version easier for beginners
- Creator plans to attempt Server "another day"

### Why Plex over Jellyfin?
- Reputation for ease of use
- Native Ubuntu installer
- Built-in music player
- Large community support

---

## Practical Takeaways

1. **Windows 10 EOL = opportunity**: Business PCs available for $50-100
2. **eBay buyer-friendly**: Strong protections make used hardware low-risk
3. **Ubuntu Desktop viable**: Don't need Server version for home use
4. **Docker permissions gotcha**: Common Linux issue with solutions available
5. **Physical media viable**: 4K uncompressed quality advantage over streaming
6. **Time investment**: Setup is quick, but media ripping is ongoing
7. **ROI is real**: Payback in less than a month at full subscription rates

---

## Follow-Up Questions

- [ ] Creator identification needed (channel name unknown)
- [ ] Maintenance procedures? (updates, backups)
- [ ] Hardware failure recovery plan?
- [ ] Advanced Plex optimization content?
- [ ] Ubuntu Server follow-up video?
- [ ] Long-term reliability after 6+ months?
- [ ] Bandwidth usage data for remote access?

---

## Project Replication Checklist

- [ ] Search eBay for business PCs (Dell Optiplex, HP EliteDesk, Lenovo ThinkCentre)
- [ ] Verify: DVD drive included, 8GB+ RAM, recent i5/i7 processor
- [ ] Purchase USB Blu-ray drive if 4K content desired
- [ ] Download Ubuntu Desktop ISO
- [ ] Create bootable USB installer
- [ ] Install Ubuntu (5 minutes)
- [ ] Install Plex from official Ubuntu package
- [ ] Configure Docker permissions for media folders
- [ ] Install Immich (follow Thomas Wild's 5-minute YouTube guide)
- [ ] Configure Immich with server IP
- [ ] Set up Plex libraries (Movies, TV, Music)
- [ ] Configure router port forwarding for remote access
- [ ] Begin ripping physical media collection
- [ ] Install MakeMKV for Blu-ray ripping
- [ ] Test remote access from phone/other devices

---

**Bottom Line**: Practical, achievable project that delivers on promise. Best for people with technical comfort, physical media interest, and willingness to invest time in setup and maintenance. Not suitable for those wanting completely streaming-exclusive content or hands-off solutions.
