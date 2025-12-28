# How to Get YouTube Transcripts for Analysis

## Episode: Mike Force - Cyber Security with Prometheus
**URL**: https://www.youtube.com/watch?v=mfvzTHfC_NE

## Method 1: YouTube Built-In (Easiest)

1. Go to the video URL
2. Click the **three dots (...)** below the video player
3. Click **"Show transcript"**
4. A panel will appear on the right side with the full transcript
5. Click the **three dots** in the transcript panel
6. Select **"Toggle timestamps"** (optional - removes timestamps for easier reading)
7. **Select all** the text (Ctrl+A or Cmd+A)
8. **Copy** the text
9. Save to: `/home/rick/life/survive/podcasts/transcripts/mike-force-cyber-security-prometheus.txt`

## Method 2: Install yt-dlp (Best for Automation)

```bash
# Install yt-dlp
pip3 install yt-dlp

# Download transcript only (no video)
yt-dlp --write-auto-sub --skip-download "https://www.youtube.com/watch?v=mfvzTHfC_NE"

# This will create a .vtt file with the transcript
# Convert it to plain text:
yt-dlp --write-auto-sub --skip-download --sub-format vtt "https://www.youtube.com/watch?v=mfvzTHfC_NE"
```

## Method 3: Install youtube-transcript-api (Python)

```bash
# Install the package
pip3 install youtube-transcript-api

# Run Python script to get transcript
python3 << 'EOF'
from youtube_transcript_api import YouTubeTranscriptApi

# Get transcript
video_id = 'mfvzTHfC_NE'
transcript = YouTubeTranscriptApi.get_transcript(video_id)

# Save to file
with open('/home/rick/life/survive/podcasts/transcripts/mike-force-cyber-security-prometheus.txt', 'w') as f:
    for item in transcript:
        f.write(f"{item['text']}\n")

print("Transcript saved successfully!")
EOF
```

## Method 4: Browser Extension

Install one of these Chrome/Firefox extensions:
- **YouTube Transcript** (by kha-github)
- **YouTube Transcript Downloader**
- **Transcript Saver for YouTube**

## After Getting the Transcript

Once you have the transcript saved to:
`/home/rick/life/survive/podcasts/transcripts/mike-force-cyber-security-prometheus.txt`

Run this command to analyze it:
```bash
# I can then read and analyze the transcript file
cat podcasts/transcripts/mike-force-cyber-security-prometheus.txt
```

## What I'll Provide Once We Have the Transcript

1. **Deep Summary** (2-3 paragraphs)
2. **Recommended Reading** (books, resources, tools mentioned)
3. **Three Perspectives**:
   - Military/Tactical Operator
   - Average Civilian/Family
   - Preparedness/Survival Community
4. **Should You Listen?** (YES/NO with reasoning)
5. **Actionable Takeaways** (Top 3-5 action items)
6. **Integration with Project** (skills to add, follow-up research)
7. **Key Quotes** (with timestamps)
8. **Specific Techniques** (step-by-step extractions)

## Quick Start (Recommended)

**Fastest way right now:**
1. Open YouTube video: https://www.youtube.com/watch?v=mfvzTHfC_NE
2. Click "..." → "Show transcript"
3. Copy all text
4. Paste into new file:
   ```bash
   nano /home/rick/life/survive/podcasts/transcripts/mike-force-cyber-security-prometheus.txt
   ```
5. Save and let me know - I'll analyze it immediately

**Estimated time**: 2 minutes to get transcript
