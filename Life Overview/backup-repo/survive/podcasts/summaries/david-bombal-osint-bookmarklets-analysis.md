# YouTube Video Analysis: Build Your First OSINT Bookmarklet in 5 Minutes

**Video URL**: https://www.youtube.com/watch?v=-nQWos7H1LQ
**Analysis Date**: 2025-11-05

---

## 1. VIDEO METADATA

**Channel**: David Bombal
**Creator/Host**: David Bombal
**Guests/Participants**:
- Micah Hoffman (OSINT expert, recovering hacker, tool developer)
- Griffin Davis (OSINT investigator, National Child Protection Task Force)

**Title**: Build Your First OSINT Bookmarklet in 5 Minutes
**Upload Date**: November 2, 2025
**Duration**: 49 minutes 7 seconds
**View Count**: 56,810 views

**Main Topic**: How to use and create OSINT (Open Source Intelligence) bookmarklets for investigative work, including techniques for extracting hidden data from social media platforms, websites, and other online sources using JavaScript-based browser tools.

**Tags**: OSINT training, open source intelligence, OSINT tools, bookmarklet tutorial, TikTok investigation, Telegram investigation, WordPress user enumeration, digital forensics, browser automation, sock puppet accounts

---

## 2. DEEP SUMMARY

### Overview
This comprehensive video demonstrates how OSINT investigators use browser-based JavaScript bookmarklets to extract hidden data from social media platforms and websites for investigative purposes. The video covers both practical usage of existing tools and step-by-step instructions for creating custom bookmarklets using AI assistance.

### Main Topics Covered

**Introduction to Bookmarklets**
The video opens with live demonstrations showing how bookmarklets reveal hidden data already present in your browser but not rendered on the page. Examples include extracting TikTok user IDs, creation dates, and epoch timestamps from social media posts—critical information for legal processes and investigations.

**Real-World Applications**
Griffin Davis explains his full-time work with the National Child Protection Task Force, where these tools are used daily to find missing, exploited, and trafficked children. The bookmarklets help capture unchanging user identification numbers across platforms, which remains constant even when users change their display names or usernames to evade detection.

**Technical Foundation**
Micah Hoffman explains that bookmarklets are JavaScript code snippets that execute in the browser, manipulating the Document Object Model (DOM) to reveal or extract data. This approach removes barriers associated with traditional tools—no Python installation required, no approval processes, and works on any system with a browser.

**Platform-Specific Demonstrations**

- **TikTok**: Extracting user IDs, creation dates, and video posting timestamps by decoding epoch time from URLs
- **Telegram**: Revealing truncated profile information that extends beyond visible "..." ellipses
- **Instagram/Threads**: Discovering connected Threads accounts on private Instagram profiles to access follower/following lists
- **X/Twitter**: Extracting precise account creation timestamps down to the second
- **Cash App**: Revealing hidden profile pictures not visible in the web interface
- **Facebook**: Bypassing locked profile restrictions to access profile photos at full resolution
- **WordPress**: Enumerating user accounts and authors on WordPress sites for connecting networks of related websites

**Security Considerations**
The guests emphasize multiple layers of operational security:
- Always verify bookmarklet code before installation by reviewing it with an LLM (Large Language Model)
- Use isolated virtual environments (like Chasm) for running untrusted code
- Employ sock puppet (fake research) accounts rather than personal accounts
- Use VPNs and proxies to protect network identity
- Apply defense-in-depth principles: protect the user, protect the system, protect the network

**Three Installation Methods**
1. Simple drag-and-drop from bookmark library to browser toolbar
2. TamperMonkey browser extension for automatic updates and contextual menus
3. Manual creation via browser bookmark manager

**Creating Custom Bookmarklets with AI**
The video demonstrates using AI tools (specifically Duck.ai) to:
- Create custom bookmarklets from natural language descriptions
- Review existing bookmarklets for security risks
- Debug and modify bookmarklet behavior
- Example shown: Creating a URL extractor that automatically copies all hyperlinks from a page to clipboard

**Advanced Use Cases**
- Deblurring intentionally obscured data on people search engines (when data exists in page source)
- WordPress site enumeration to connect networks of related websites through common author accounts
- Bypassing platform restrictions to access source data (profile photos, metadata)
- Automating repetitive investigative tasks

**Educational Mission**
Griffin emphasizes that AI democratizes tool creation—investigators without programming backgrounds can now create custom tools to enhance their capabilities. Both guests stress making OSINT training and tools accessible to everyone through their company Myiosent Training.

---

## 3. GUEST BACKGROUNDS

### Griffin Davis

**Professional Background**:
- Full-time investigator for the National Child Protection Task Force (nonprofit organization)
- 20+ years of experience in OSINT investigation
- Criminal investigations background in law enforcement
- Specializes in finding missing, exploited, and trafficked children

**Expertise Areas**:
- Social media investigation techniques
- Legal process and evidence gathering
- Threat actor tracking and identification
- Disinformation analysis
- Non-technical investigative approaches

**Unique Perspective**: Griffin brings the operational investigator's viewpoint—someone who needs tools to work efficiently in high-stakes, time-sensitive situations. His non-programming background demonstrates how modern AI tools enable investigators to create their own solutions without coding knowledge. He emphasizes practical efficiency and the importance of unchanging identifiers when tracking individuals who attempt to evade detection.

**What Makes Him Valuable**: Deep real-world experience in the most critical type of investigations (child protection), combined with an investigator's intuition for what data matters and where to look for hidden information. His curiosity-driven approach ("what else could be there?") leads to discovering new data sources.

### Micah Hoffman

**Professional Background**:
- Self-described "recovering hacker"
- 20+ years in cybersecurity and offensive security
- Former web application penetration tester
- Tool developer and programmer (Python, Perl, JavaScript)
- Co-founder of Myiosent Training

**Expertise Areas**:
- Tool development and automation
- JavaScript programming and browser manipulation
- Cybersecurity and offensive security techniques
- API interaction and web scraping
- Teaching and making technical concepts accessible

**Unique Perspective**: Micah bridges the gap between technical hacking/development skills and practical investigative needs. He has the rare ability to translate complex programming concepts into accessible tools that non-technical users can operate. His philosophy centers on "meeting users where they're at" (the browser) rather than requiring complex tool installations.

**What Makes Him Valuable**: The technical complement to Griffin's investigative expertise. Micah's hacker background gives him insight into where hidden data might exist and how to extract it. His commitment to efficiency ("if we do something repeatedly, let's automate it") and accessibility drives tool creation that serves the broader OSINT community.

### Synergy Between Guests
Griffin describes their skills as "complimentary—his chocolate and my peanut butter." Griffin's 20 years of investigation experience combined with Micah's technical tool-building capabilities creates a powerful partnership. Griffin identifies investigative needs and data sources; Micah builds the tools to access them efficiently. Both share a mission to make OSINT accessible and to protect vulnerable populations.

---

## 4. THREE PERSPECTIVES

### BEGINNER PERSPECTIVE (New to OSINT)

**What a Beginner Would Learn**:

This video is exceptionally beginner-friendly because it demystifies OSINT investigation tools and shows that you don't need to be a programmer to use sophisticated investigative techniques.

**Key Beginner Takeaways**:
- OSINT is about finding publicly available information that's already present but not always visible
- Many websites and social media platforms send more data to your browser than they display on screen
- Bookmarklets are simple tools that reveal this hidden data without requiring software installation or programming knowledge
- You can start using these tools immediately by simply dragging them to your browser bookmark bar
- Modern AI tools allow anyone to create custom investigative tools by describing what they want in plain English

**Accessibility**: The video shows Griffin, who has no programming background, successfully creating and using these tools. This is incredibly empowering for beginners who might feel intimidated by the technical aspects of OSINT.

**First Steps for Beginners**:
1. Visit tools.mmyiosent.training and explore the free bookmarklet library
2. Start with simple bookmarklets like the TikTok ID extractor or X user ID tool
3. Practice on your own social media accounts to understand what data is revealed
4. Learn the drag-and-drop installation method before exploring TamperMonkey
5. Gradually experiment with creating simple custom bookmarklets using AI assistance

**Mindset Shift**: This video teaches beginners to ask "What other data might be here?" when visiting any website—developing investigative curiosity and a deeper understanding of how web technologies work.

### PRACTICAL/APPLICATION PERSPECTIVE (How to Use This Information)

**Immediate Practical Applications**:

**For Investigation Professionals**:
- Capture unchanging user IDs for legal process requests to social media companies
- Extract precise timestamps for establishing timelines in investigations
- Identify connected accounts across platforms (Instagram/Threads relationship)
- Verify identities using profile photos not readily visible (Cash App example)
- Track threat actors who change usernames by using persistent identifiers
- Connect networks of related websites through WordPress user enumeration

**For Cybersecurity Professionals**:
- Enumerate WordPress site users to identify potential attack vectors
- Extract all hyperlinks from a page for reconnaissance
- Analyze website structures and content delivery networks
- Identify data leakage in web applications (information in page source not rendered)
- Automate repetitive reconnaissance tasks

**For Open Source Researchers/Journalists**:
- Verify exact account creation times to identify sock puppet accounts or coordinated campaigns
- Track disinformation actors across platforms using persistent identifiers
- Extract hidden contact information or references from truncated profiles
- Connect networks of related websites spreading similar narratives

**Workflow Integration**:

1. **Setup Phase**:
   - Install bookmarklets relevant to your investigation areas
   - Set up isolated research environment (virtual machine or Chasm)
   - Create sock puppet accounts for platforms you'll investigate
   - Configure VPN/proxy for network protection

2. **Investigation Phase**:
   - Visit target profiles/accounts
   - Click relevant bookmarklets to extract hidden data
   - Document user IDs, timestamps, connections, and metadata
   - Use extracted data as pivot points for deeper investigation

3. **Automation Phase**:
   - Identify repetitive tasks in your workflow
   - Use AI to create custom bookmarklets for these tasks
   - Test bookmarklets in isolated environment
   - Add to permanent toolkit if useful

**Time Savings**: As Micah notes, even simple tasks like extracting a Facebook ID, when done hundreds of times per month, represent significant time expenditure. Bookmarklets reduce multi-step processes to single clicks.

**Tool Creation Process**:
1. Identify repetitive manual task
2. Describe desired functionality to an AI (ChatGPT, Claude, Duck.ai)
3. Request JavaScript bookmarklet format (single line, no returns)
4. Review code with AI to understand what it does and identify security risks
5. Test in isolated environment
6. Install and use in production workflow

**Security Practices**:
- Always review bookmarklet code before installation
- Use virtual environments for untrusted code
- Never use personal accounts for investigation work
- Use VPNs especially with "offensive" bookmarklets that make additional queries
- Apply defense-in-depth: protect user identity, system security, and network location

### CRITICAL/ANALYSIS PERSPECTIVE (Strengths, Weaknesses, Biases)

**Strengths**:

**Practical Expertise**: Both guests use these tools daily in high-stakes investigations, lending tremendous credibility. This isn't theoretical—they're sharing battle-tested techniques.

**Accessibility Focus**: The emphasis on making tools available to non-programmers democratizes OSINT capabilities. The fact that Griffin (non-programmer) can create these tools with AI is transformative.

**Security Awareness**: Extensive discussion of operational security, trust verification, and defense-in-depth demonstrates mature security thinking appropriate for the audience.

**Free Resource Sharing**: Offering tools freely at tools.mmyiosent.training benefits the entire OSINT community and aligns with open-source intelligence principles.

**AI Integration**: Demonstrating AI for tool creation and code review is forward-thinking and teaches viewers to leverage modern capabilities.

**Ethical Framework**: Clear mission focus on protecting vulnerable populations (missing children) provides ethical grounding for these techniques.

**Weaknesses and Limitations**:

**Platform Dependence**: Bookmarklets break when platforms change their code structure or data formats. This requires ongoing maintenance (though TamperMonkey method addresses this with automatic updates).

**Browser Limitations**: These tools only work in web browsers, limiting effectiveness on mobile-app-only platforms or platforms with restricted web interfaces.

**Technical Barriers Remain**: While drag-and-drop is simple, the TamperMonkey installation and custom creation still require some technical comfort. True beginners might struggle initially.

**Legal and Ethical Gray Areas**:
- WordPress user enumeration could be viewed as offensive reconnaissance
- Bypassing platform restrictions (locked profiles) may violate terms of service
- The video doesn't deeply explore legal limits of these techniques across jurisdictions

**Scope Limitations**: Bookmarklets only reveal data already sent to the browser—they can't access server-side data or perform deep API queries without additional authentication.

**Verification Challenges**: The video shows trusting AI to review code for security, but AI can miss sophisticated attacks. More paranoid security professionals might prefer manual code review.

**Potential Biases**:

**Commercial Interest**: The guests run Myiosent Training and promote their courses, though they balance this by offering substantial free content. The 10% discount code and Black Friday sale mentions are promotional.

**Technical Optimism**: Strong emphasis on "anyone can do this" might oversimplify the learning curve for complete beginners. Some technical literacy is still beneficial.

**U.S.-Centric**: Discussion centers on U.S. law enforcement processes, U.S. platforms (Cash App), and U.S.-based nonprofit work. International applicability varies.

**Law Enforcement Perspective**: Both guests have law enforcement/security backgrounds, which influences their ethical framework. Others might view some techniques (offensive bookmarklets, profile access) differently.

**Platform Selection**: Focuses on popular Western social media platforms (TikTok, Instagram, X, Telegram, Facebook). Techniques for other regional platforms (WeChat, VK, etc.) not addressed.

**Critical Considerations**:

**Terms of Service**: Many platforms explicitly prohibit automated data extraction or circumventing access controls. Using these tools might violate TOS and result in account bans or legal action.

**Legal Variance**: What's permissible for law enforcement (with proper legal process) differs from what private citizens or journalists can do. The video doesn't clearly delineate these boundaries.

**Ethical Use**: While the guests emphasize child protection, these same techniques could be used for stalking, harassment, or invasion of privacy. The video trusts viewers to use tools ethically.

**Detection Risk**: "Offensive" bookmarklets that make additional queries can be logged by website administrators. IP address exposure is mentioned, but detection risk could be explored further.

**Data Accuracy**: Hidden data might be outdated, cached, or incorrect. The video doesn't discuss verification or cross-referencing extracted data.

**Overall Assessment**:

Despite these limitations and biases, the video provides exceptional value. The practical techniques are immediately useful, the security guidance is sound, and the educational mission is admirable. The commercial promotion is minimal and balanced by genuinely useful free content. The guests' expertise and real-world experience shine through, making this one of the most practical OSINT resources available.

The primary weakness is insufficient discussion of legal/ethical boundaries and terms of service implications. Viewers should supplement this knowledge with legal research relevant to their jurisdiction and use case.

---

## 5. RECOMMENDED READING & RESOURCES

### Explicitly Mentioned Resources

**1. Brilliant.org (Video Sponsor)**
- **Type**: Online learning platform
- **Focus**: Math, science, programming, data analysis, and AI through interactive visual lessons
- **Relevant Courses Mentioned**:
  - Programming with Python (hands-on puzzles and immediate feedback)
  - Thinking in Code (breaking problems into clear steps)
- **Why Use It**: Structured, beginner-friendly approach to learning programming fundamentals. Builds confidence through small, focused lessons. Useful for OSINT practitioners who want to understand the programming concepts behind bookmarklets and eventually create more sophisticated tools.
- **Access**: brilliant.org/davidbombal (20% discount mentioned for annual subscription)

**2. Myiosent Training (Guest's Company)**
- **Type**: Online OSINT training academy
- **Courses Mentioned**:
  - OSINT Immersion (foundational concepts bundle covering IPs, usernames, people searches, image analysis)
  - Deep dives into social media platforms
  - AI and OSINT course
  - Virtual machine building for OSINT
  - À la carte individual courses
- **Why Take It**: Created by practitioners who use these techniques daily in real investigations. Focused on making training "approachable and accessible to everyone" with emphasis on end-user experience. Combines Griffin's investigative expertise with Micah's technical tool-building knowledge.
- **Access**: Myiosent Training website (10% discount code for David Bombal viewers mentioned in video description)
- **Free Content**: Several free courses available, regular free webinars, social media content

**3. Tools.mmyiosent.training (Free Bookmarklet Library)**
- **Type**: Free web-based tool collection
- **Contains**: Ever-evolving collection of bookmarklets for various platforms
- **Categories**:
  - TikTok tools
  - Telegram tools
  - Instagram/Threads tools
  - X/Twitter tools
  - Cash App tools
  - Facebook tools
  - WordPress tools
  - General web tools
- **Why Use It**: Free, immediately usable, regularly updated, created by experienced OSINT practitioners for real investigative work
- **Features**: Descriptions of what each tool does, drag-and-drop installation, TamperMonkey integration option, clear labeling of "offensive" bookmarklets that make additional queries
- **Update Notifications**: Site indicates when tools are updated/refreshed

**4. Chasm (Virtual OSINT Environment)**
- **Type**: Cloud-based virtual Linux system for OSINT work
- **Purpose**: Isolated research environment for running untrusted tools
- **Why Use It**: Contains potential security issues (malware, exploits) to virtual environment rather than your personal system. Protects your main computer while allowing you to investigate potentially dangerous content or use untrusted tools.
- **Use Case**: Mentioned as Griffin's preferred platform for running bookmarklets and conducting investigations safely

**5. Duck.ai (AI Tool)**
- **Type**: Privacy-focused AI interface
- **Features**: Proxy to multiple LLMs (Large Language Models) with privacy protection
- **Why Use It**:
  - Review bookmarklet code for security risks before installation
  - Create custom bookmarklets from natural language descriptions
  - Debug and explain existing code
  - Privacy-focused alternative to direct ChatGPT/Claude usage
- **Application**: Demonstrated extensively in video for both security verification and tool creation

**6. TamperMonkey (Browser Extension)**
- **Type**: Userscript manager browser extension
- **Purpose**: Manage and execute JavaScript code on web pages
- **Why Use It**:
  - Automatically updates bookmarklets as Myiosent Training releases new versions
  - Provides contextual menus showing only relevant bookmarklets for current platform
  - Reduces toolbar clutter
  - One-time setup enables ongoing automatic updates
- **Advanced Feature**: Can host full scripts beyond simple bookmarklets

### Implicitly Useful Resources (Not Directly Mentioned but Relevant)

**7. Social Media Platform APIs and Documentation**
- **Why Study Them**: Understanding official API documentation helps identify what data platforms make available, what identifiers persist, and what privacy controls exist
- **Application**: Griffin's WordPress enumeration technique and TikTok ID extraction are based on understanding platform architecture

**8. Craig Silverman's Indicator Articles**
- **Type**: Journalism/investigation reporting
- **Mention**: Griffin references "our friend Craig Silverman at the Indicator" covering WordPress enumeration techniques
- **Why Read**: Real-world applications of OSINT techniques in investigative journalism, disinformation research
- **Focus**: WordPress investigation, website network analysis

**9. Browser Developer Tools Documentation**
- **Type**: Technical reference
- **Why Learn It**: Understanding how to view page source, inspect elements, and analyze network traffic helps identify hidden data independently
- **Application**: Enables you to identify opportunities for bookmarklet creation without relying on pre-built tools

**10. Epoch Time Converters and Unix Timestamp Resources**
- **Why Understand It**: Many platforms encode timestamps as Unix epoch time (seconds since January 1, 1970). Understanding this standard enables you to decode timestamps manually or build tools that do so
- **Application**: TikTok video posting time extraction demonstrated in video

### Survival/Preparedness Connections

**Physical Security & Situational Awareness Books** (Complementary Reading):
- **The Gift of Fear by Gavin de Becker**: Understanding threat assessment and intuition—complements OSINT's investigative mindset
- **Left of Bang by Patrick Van Horne & Jason Riley**: Combat Hunter program for threat detection—parallels the investigative curiosity Griffin demonstrates
- **Surveillance Tradecraft by Peter Jenkins**: Understanding how surveillance works helps you conduct OSINT while protecting your own operational security

**Technical Self-Sufficiency**:
- **Privacy and Security Resources**: Since these OSINT techniques can also be used against you, understanding them aids in personal security
- **Network Security Fundamentals**: VPN usage, proxy chains, and IP obfuscation mentioned extensively as protective measures

**Skills Development Philosophy**:
The video's emphasis on tool creation and self-sufficiency aligns with preparedness principles—don't rely solely on pre-built tools; learn to create solutions for your specific needs. Griffin's AI-enabled tool creation despite no programming background exemplifies skill stacking and adaptation.

---

## 6. SHOULD I WATCH THIS? (Recommendation)

### RATING: 9/10

**Recommendation**: STRONGLY RECOMMENDED for anyone interested in OSINT, cybersecurity, investigations, or modern research techniques.

### Who Would Benefit Most

**MUST WATCH (10/10 value)**:
- OSINT practitioners and investigators (law enforcement, private investigators, fraud investigators)
- Cybersecurity professionals conducting reconnaissance or threat intelligence
- Journalists and researchers investigating online networks, disinformation, or threat actors
- Child protection advocates and organizations
- Social media safety professionals
- Anyone currently performing manual data extraction from social media/websites

**HIGHLY VALUABLE (8-9/10 value)**:
- Information security students and professionals
- Digital forensics practitioners
- Competitive intelligence researchers
- Open-source researchers (Bellingcat-style investigations)
- Penetration testers and security assessors
- Academic researchers studying online behavior, networks, or platforms

**VALUABLE (6-7/10 value)**:
- General IT professionals wanting to understand browser capabilities
- Privacy advocates (learning these techniques helps protect against them)
- Anyone interested in how data exists but isn't displayed on websites
- Technical hobbyists and lifelong learners
- People building personal knowledge management systems
- Content creators researching topics and sources

**MODERATE VALUE (4-5/10 value)**:
- General preparedness community members (tangential skills)
- People uncomfortable with gray-area legal/ethical territory
- Those without regular need for online investigation
- Viewers who won't actually implement the techniques (interesting but not actionable)

### Survival/Preparedness Relevance: 6/10

**Direct Connections**:
- **Operational Security**: Extensive discussion of defense-in-depth, VPN usage, isolated systems, and identity protection—directly applicable to personal security
- **Situational Awareness**: The investigative mindset ("what else might be here?") parallels tactical awareness and threat assessment
- **Self-Sufficiency**: Learning to create your own tools rather than depending on others is core preparedness philosophy
- **Intelligence Gathering**: In WROL (Without Rule of Law) or community security scenarios, the ability to research threats or verify identities has tactical value
- **Privacy Protection**: Understanding how investigators extract data from social media helps you protect your own information

**Indirect Connections**:
- **Technical Skills**: Browser-based tool use and JavaScript basics expand technical capability
- **Critical Thinking**: Analytical approach to information and data verification
- **Network Building**: Understanding how to research individuals helps vet community members or potential threats
- **Adaptability**: Using AI to create tools demonstrates adapting to new technologies

**Why Not Higher Relevance**:
This video focuses on digital/online investigation rather than physical preparedness, tactical skills, homesteading, or survival scenarios. While the operational security principles transfer well, the core skills (social media investigation, bookmarklet creation) are less immediately applicable in physical survival situations than topics like:
- Medical training
- Food production/preservation
- Physical security
- Communications (radio)
- Firearms training
- Primitive skills

However, for modern preparedness that includes:
- Community vetting
- Threat assessment
- Information warfare awareness
- Personal privacy protection
- Technical self-sufficiency

...this video provides excellent value.

### Why This Rating?

**Strengths Justifying High Rating (9/10)**:
- **Immediately Actionable**: You can start using these tools within minutes of watching
- **Real Expertise**: Guests actively use these techniques in high-stakes investigations daily
- **Comprehensive Coverage**: Moves from "why" to "how" to "how to build your own"
- **Security-Conscious**: Extensive operational security guidance
- **Free Resources**: Substantial practical value at no cost
- **Accessible**: Designed for non-programmers; Griffin demonstrates this
- **Modern**: Incorporates AI tool creation—forward-thinking approach
- **Ethical Foundation**: Clear mission focus on protecting vulnerable populations

**Limitations Preventing Perfect Score**:
- **Narrow Technical Focus**: Highly specialized to OSINT/cybersecurity domains
- **Platform Dependence**: Techniques can break with platform changes
- **Legal/Ethical Gray Areas**: Insufficient discussion of legal limitations across jurisdictions
- **Limited Physical Preparedness Connection**: Primarily digital skills
- **Time Investment**: 49 minutes is substantial for the core concepts (could be condensed)

### Time Investment Assessment

**Core Concepts**: Could be absorbed in 20-25 minutes at 1.5x speed
**Full Value**: All 49 minutes worthwhile if you'll implement these techniques
**Follow-Up Time**: 30-60 minutes to install bookmarklets, test on your accounts, experiment with AI creation

**ROI**: If you perform online investigation or research regularly, the time savings from automation will pay back the 49-minute investment within days or weeks.

### Alternative: Watch If...

**You Should DEFINITELY Watch If**:
- You currently manually extract data from social media or websites
- You investigate online threats, fraud, or missing persons
- You want to understand what data websites leak about users
- You're interested in browser-based automation
- You want to learn tool creation without programming experience

**You Can SKIP If**:
- You have zero interest in online investigation or research
- You're looking specifically for physical survival/preparedness skills
- You're uncomfortable with potentially TOS-violating techniques
- You already know JavaScript and bookmarklet creation well
- You don't use computers for research or investigation work

### Bottom Line

This is one of the most practical, immediately useful OSINT videos available. The combination of expert practitioners sharing free tools, demonstrating real techniques, and teaching self-sufficiency through AI-powered tool creation provides exceptional value. While not directly focused on traditional survival/preparedness topics, the operational security principles, investigative mindset, and technical self-sufficiency align well with preparedness philosophy.

**For the survival/preparedness community specifically**: Watch for the OpSec (operational security) principles, threat assessment methodology, and personal privacy protection understanding. The digital investigation skills have moderate direct application but excellent indirect value for modern security awareness.

**For anyone conducting online research or investigation**: This is essential viewing. Drop what you're doing and watch it.

---

## 7. KEY TAKEAWAYS

### Most Actionable Information from the Video

**1. Bookmarklets Reveal Hidden Data Already in Your Browser**
Websites and social media platforms send more data to your browser than they display on screen. Bookmarklets are simple JavaScript tools that extract and display this hidden information—no hacking, exploits, or special access required. This includes unchanging user IDs, precise timestamps, truncated profile information, and metadata critical for investigations. Visit tools.mmyiosent.training to access a free library of platform-specific bookmarklets that you can install with simple drag-and-drop.

**2. Unchanging User IDs Are Critical for Tracking Across Platform Changes**
When investigating individuals online, always capture the persistent user identification number that platforms assign to accounts. Unlike usernames and display names (which users can change freely to evade detection), these internal IDs remain constant. They're essential for legal process requests to platforms and for maintaining continuity in investigations when subjects modify their visible profiles. The most basic bookmarklet that extracts these IDs is also the most consistently useful in daily investigation work.

**3. Operational Security Requires Three Layers of Protection**
Apply defense-in-depth principles to OSINT work: (1) Protect the User—never use personal or work accounts; create sock puppet research accounts instead. (2) Protect the System—use isolated virtual environments (like Chasm) to contain potential malware or exploits when downloading files or running untrusted tools. (3) Protect the Network—use VPNs and proxies to mask your IP address, especially when using "offensive" bookmarklets that make additional queries to websites. Always verify bookmarklet code with an AI tool before installation.

**4. Anyone Can Create Custom OSINT Tools Using AI—No Programming Required**
Modern AI tools (ChatGPT, Claude, Duck.ai) enable non-programmers to create sophisticated bookmarklets by simply describing desired functionality in natural language. The process: (1) Describe what you want the tool to do, (2) Request JavaScript bookmarklet format in a single line, (3) Review the code with AI to understand risks, (4) Test in an isolated environment, (5) Install and use. This democratizes tool creation—Griffin (with no programming background) creates custom investigative tools regularly using this method.

**5. Instagram's Connected Threads Accounts Often Bypass Private Profile Restrictions**
When encountering a private Instagram profile that hides follower/following lists, check if the user has a connected Threads account (Instagram's micro-blogging platform). By default, Threads follower/following lists are public even when Instagram's are private, and users don't have to display the connection on their Instagram profile. Use a bookmarklet that automatically takes the Instagram username and opens the corresponding Threads profile—this often reveals the network of connections that was hidden on Instagram, providing valuable pivot points for investigation.

**6. WordPress Sites Leak User Account Information Through Enumeration**
Websites built on WordPress (a popular blogging platform) often allow enumeration of user accounts and author information through specific URL queries. This data—including usernames, given names, and user IDs—can help connect networks of related websites (useful for tracking disinformation campaigns, fraud networks, or coordinated activities). NOTE: This is an "offensive" technique that makes additional queries to the target website and may expose your IP address to administrators. Use VPN protection and be aware this may violate website terms of service.

**7. Automate Repetitive Investigation Tasks to Multiply Your Effectiveness**
When you find yourself manually performing the same data extraction process multiple times (viewing page source, finding specific IDs, copying data, etc.), create a bookmarklet to automate it. Even simple tasks, when performed hundreds of times monthly, represent significant time expenditure. Bookmarklets reduce multi-step manual processes to single clicks, allowing you to focus cognitive energy on analysis and investigation rather than data extraction mechanics. The efficiency gains compound dramatically over time.

### Bonus Tactical Takeaway for Preparedness Community

**8. Digital Investigation Skills Enhance Physical Security Vetting**
The same OSINT techniques used to find missing children or track threat actors can help you vet potential community members, research background of individuals, or identify threats to your group. Understanding what investigators can learn about YOU from your social media presence also helps you protect your own operational security—review your accounts with these techniques to identify what persistent IDs, timestamps, connections, and hidden data you're leaking. Privacy protection starts with understanding what's visible to skilled investigators.

---

## APPENDIX: CONNECTIONS TO SURVIVAL/PREPAREDNESS

### Relevant Skills and Principles

**Operational Security (OpSec)**
- Defense-in-depth methodology directly applicable to personal security
- VPN usage and network protection
- Identity compartmentalization (sock puppet accounts parallel to cover identities)
- System isolation and containment strategies

**Intelligence and Reconnaissance**
- Investigative mindset: "What else might be here?"
- Passive intelligence gathering without alerting targets
- Tracking individuals across platforms despite evasion attempts
- Network mapping (connecting related accounts, websites, individuals)

**Technical Self-Sufficiency**
- Creating your own tools rather than depending on proprietary solutions
- Understanding underlying technologies (browsers, JavaScript, APIs)
- Adapting to changing circumstances (platform changes, new tools needed)
- AI augmentation of capabilities without deep technical knowledge

**Situational Awareness**
- Understanding what information you're leaking through online presence
- Recognizing that more data exists than what's visually displayed
- Persistent identifiers that can't be changed (parallel to physical identifiers)
- Network analysis—understanding relationships and connections

**Threat Assessment**
- Verifying identities and claims
- Tracking activity patterns and timelines
- Identifying coordinated networks (disinformation, threat groups)
- Privacy protection through understanding attacker techniques

### Limited Direct Applications

**Why This Isn't Core Survival Content**:
- Requires internet access and functional infrastructure
- Digital rather than physical skills
- Limited applicability in WROL scenarios
- No food, water, shelter, or medical relevance
- Not directly related to homesteading, farming, or self-sufficiency

**Where It Fits in Preparedness**:
- Modern threats include digital/information warfare
- Community vetting before SHTF requires research capability
- Personal privacy protection is preparedness
- Technical skills diversity strengthens group capabilities
- Understanding investigative techniques helps counter-surveillance

### Recommended Position in Knowledge Base

**Category**: Tactical/Security > Information Security > OSINT Techniques
**Priority Level**: Tier 2 (valuable specialized knowledge, not core survival skills)
**Prerequisite Knowledge**: Basic computer literacy, understanding of social media platforms
**Related Topics**: Operational security, privacy protection, threat assessment, technical skills development

---

## SUMMARY FOR QUICK REFERENCE

David Bombal interviews OSINT experts Micah Hoffman and Griffin Davis about browser-based bookmarklets for extracting hidden data from social media platforms and websites. The 49-minute video demonstrates how these JavaScript tools reveal persistent user IDs, exact timestamps, truncated information, and other metadata already in your browser but not displayed on screen. Includes live demonstrations across TikTok, Telegram, Instagram, X, Cash App, Facebook, and WordPress platforms. Emphasizes operational security (isolated systems, VPNs, sock puppet accounts, code verification) and shows how non-programmers can create custom tools using AI. Both guests work in child protection and use these techniques daily in real investigations. Free bookmarklet library available at tools.mmyiosent.training. Strong operational security guidance and immediately actionable techniques make this valuable for investigators, researchers, cybersecurity professionals, and anyone performing online research.

---

*Analysis completed using yt-dlp transcript extraction and Claude Code analysis*
*Video published: November 2, 2025*
*Analysis date: November 5, 2025*
