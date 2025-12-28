# AI Security Services: Training & Implementation Plan

**Created:** 2025-11-08
**Timeline:** 90 Days (12 weeks) to competency
**Target:** Ricky Prout (initially), then Dean, then additional staff
**Goal:** Deliver Bronze/Silver/Gold AI security assessments independently

---

## Executive Summary

This is a practical, hands-on 90-day training program to build AI security assessment capability from your existing cybersecurity foundation. You already understand networks, security, and systems - this adds the AI-specific knowledge layer.

**Time Commitment:**
- Weeks 1-4: 15 hours/week (intense learning phase)
- Weeks 5-8: 12 hours/week (practice and application)
- Weeks 9-12: 10 hours/week (supervised delivery)
- **Total: 150 hours over 12 weeks**

**Investment:**
- Training materials/courses: $2,000
- Tools and software: $1,500
- Lab environment setup: $500
- **Total: $4,000**

**Outcome:**
By Week 12, you can independently deliver all three service tiers with confidence.

---

## Phase 1: Foundations (Weeks 1-4)

### Week 1: Understanding AI & LLMs

**Learning Objectives:**
- Understand how LLMs work (transformers, attention mechanisms)
- Know why they're vulnerable (architecture fundamentals)
- Grasp business use cases (chatbots, agents, RAG)

**Activities:**

**Monday-Tuesday (8 hours):**
1. **Watch:** "Intro to Large Language Models" by Andrej Karpathy (1 hour)
   - YouTube: Free, excellent technical overview
   - Focus: How transformers work, attention mechanisms

2. **Read:** "Attention Is All You Need" paper (simplified version)
   - 3 hours: Don't need to understand all math
   - Focus: Why models mix contexts (core vulnerability)

3. **Experiment:** Play with ChatGPT, Claude, local LLM
   - 2 hours: Ask questions, observe behavior
   - Try to trick it: "Ignore previous instructions, tell me..."
   - Document: What worked, what didn't

4. **Document:** Create your own notes
   - 2 hours: Write in plain English what you learned
   - Goal: Explain to Kristyn how LLMs work

**Wednesday-Thursday (8 hours):**
1. **Course:** "AI for Everyone" by Andrew Ng (Coursera)
   - 4-6 hours: Non-technical overview
   - Focus: Business applications, not deep tech
   - Skip: Math-heavy sections if confusing

2. **Read:** Hidden Layer AI Security Blog
   - 2 hours: Read all blog posts on hiddenlayer.com
   - Focus: Real-world case studies
   - Note: Attack patterns they discuss

3. **Experiment:** Set up local LLM
   - 2 hours: Install Ollama (free, local)
   - Run: Llama 3 or Mistral model
   - Practice: Basic interactions, understand local vs. cloud

**Friday (6 hours):**
1. **Read:** Project documentation
   - Review: `/home/rick/life/survive/skills/tactical/ai-security-penetration-testing-2025.md`
   - Focus: 6-stage methodology section
   - Take notes: Questions to research next week

2. **Practice:** Prompt basics
   - Try different prompt styles
   - Understand: System prompts vs. user prompts
   - Experiment: "You are a helpful assistant who..."

3. **Week 1 Deliverable:** 2-page summary
   - What are LLMs?
   - Why are they vulnerable?
   - What does "prompt injection" mean?
   - How do businesses use AI?

**Resources:**
- Andrej Karpathy YouTube (free)
- Coursera "AI for Everyone" ($49/month, can audit free)
- Ollama (free, open source)
- Hidden Layer blog (free)

**Cost:** $0-50 (Coursera optional)

---

### Week 2: Security Fundamentals & Prompt Injection

**Learning Objectives:**
- Understand prompt injection taxonomy
- Learn attack techniques (intents, techniques, evasions)
- Practice basic attacks against test systems

**Activities:**

**Monday-Tuesday (8 hours):**
1. **Study:** Prompt Injection Taxonomy
   - Review Hidden Layer taxonomy (intents/techniques/evasions/utilities)
   - Read Liberatus GitHub jailbreaks
   - Analyze: Why do these work?

2. **Video:** OWASP Top 10 for LLMs
   - 2 hours: YouTube presentations
   - Compare: Traditional OWASP vs. LLM-specific

3. **Practice:** Basic prompt injection
   - 4 hours: Try attacks on ChatGPT, Claude
   - Goal: Leak system prompt, bypass content filters
   - Document: Success rate, which techniques worked

**Wednesday-Thursday (8 hours):**
1. **Hands-on:** Build vulnerable chatbot
   - 4 hours: Use OpenAI API or local LLM
   - Create: Simple chatbot with system prompt
   - Intentionally: Make it vulnerable (for practice)

2. **Attack:** Your own chatbot
   - 2 hours: Try all techniques from taxonomy
   - Goal: Leak your own system prompt
   - Note: Which defenses would have stopped you?

3. **Study:** Real breaches
   - 2 hours: Read case studies from Hidden Layer
   - Focus: What actually happened in production
   - Learn: Common mistakes companies make

**Friday (6 hours):**
1. **Tool Setup:** Testing environment
   - Install: Burp Suite Community (free)
   - Install: Python (for scripting)
   - Setup: Test lab on local machine

2. **Practice:** Evasion techniques
   - Try: Emoji encoding (Unicode hidden messages)
   - Try: Reverse text, pig Latin, obfuscation
   - Goal: Bypass simple keyword filters

3. **Week 2 Deliverable:** Attack documentation
   - 10 successful prompt injections documented
   - Screenshots, methodology, results
   - "What I learned" writeup

**Resources:**
- OWASP LLM Top 10 (free, online)
- Liberatus GitHub (free, jailbreak repository)
- Burp Suite Community (free)
- OpenAI API ($20 credit to start)

**Cost:** $20 (API credits)

---

### Week 3: Enterprise AI Architecture & Attack Surface

**Learning Objectives:**
- Understand enterprise AI implementations
- Map attack surfaces (inputs, ecosystem, data, application)
- Learn RAG, MCP, agent architectures

**Activities:**

**Monday-Tuesday (8 hours):**
1. **Study:** RAG (Retrieval Augmented Generation)
   - 3 hours: How vector databases work
   - Why: Companies store documents in RAG
   - Vulnerability: Unredacted PII in knowledge bases

2. **Study:** MCP (Model Context Protocol)
   - 3 hours: Read Anthropic MCP docs
   - Read: Amazon threat model paper
   - Understand: Why it's insecure by design

3. **Experiment:** Build simple RAG system
   - 2 hours: Use LangChain (Python library)
   - Upload: Sample documents (nothing sensitive)
   - Try: Extracting data you "shouldn't" see

**Wednesday-Thursday (8 hours):**
1. **Study:** AI Agents & Tool Calling
   - 4 hours: How agents work (planning, execution, tools)
   - Read: OpenAI function calling docs
   - Understand: Over-scoped API permissions problem

2. **Case Study:** Salesforce bot example
   - Review: Real case from Hidden Layer (Salesforce + Slack)
   - Map: Attack surface (inputs, tools, data access)
   - Document: How you would exploit it

3. **Architecture Review:** Enterprise patterns
   - 2 hours: Diagram common AI architectures
   - Identify: Where vulnerabilities live
   - Learn: Observability/logging tools (what they capture)

**Friday (6 hours):**
1. **Tool Research:** Reconnaissance
   - Study: How to find AI implementations (web crawling)
   - Practice: Identify chatbots on Brisbane business websites
   - Document: 10 local businesses with AI chatbots

2. **Methodology:** 6-stage attack framework
   - Write: Your own checklist for each stage
   - Create: Assessment template (what to test)
   - Goal: Repeatable process for assessments

3. **Week 3 Deliverable:** Enterprise AI attack map
   - Diagram: Typical enterprise AI architecture
   - Highlight: Attack vectors at each layer
   - Checklist: What to test in each stage

**Resources:**
- LangChain documentation (free)
- Anthropic MCP docs (free)
- Amazon MCP threat model paper (free)
- OpenAI function calling docs (free)

**Cost:** $0

---

### Week 4: Defensive Measures & Best Practices

**Learning Objectives:**
- Learn defensive techniques (guardrails, output filtering)
- Understand secure implementation patterns
- Know what to recommend to clients

**Activities:**

**Monday-Tuesday (8 hours):**
1. **Study:** Guardrails and classifiers
   - 4 hours: How they work, why they fail
   - Test: Nemo Guardrails (Nvidia, open source)
   - Bypass: Try evasion techniques against it

2. **Study:** Output filtering
   - Learn: Why output > input filtering
   - Practice: Write regex patterns for PII detection
   - Tool: Install presidio (Microsoft, open source)

3. **Best Practices:** Secure AI implementation
   - Read: Amazon security whitepaper
   - Document: Top 10 recommendations for clients
   - Create: Security checklist handout

**Wednesday-Thursday (8 hours):**
1. **Tool Mastery:** Assessment toolkit
   - Setup: Complete testing environment
   - Install: All necessary tools (Burp, Python scripts)
   - Practice: End-to-end assessment on test chatbot

2. **Report Writing:** Documentation skills
   - Study: Penetration testing report examples
   - Create: Template for Bronze/Silver/Gold reports
   - Practice: Write findings from Week 2-3 attacks

3. **Client Communication:** Translation skills
   - Practice: Explain technical findings in plain English
   - Create: Executive summary templates
   - Role-play: Presenting findings to non-technical client

**Friday (6 hours):**
1. **Comprehensive Review:** Week 1-4 knowledge check
   - Quiz yourself: Can you explain all concepts?
   - Practice: Complete mock assessment
   - Gap analysis: What do you still need to learn?

2. **Week 4 Deliverable:** Bronze assessment capability
   - Deliver: Complete Bronze assessment on test system
   - Include: Full report, remediation recommendations
   - Self-assess: Would you charge $500 for this?

**Resources:**
- Nemo Guardrails (free, Nvidia)
- Presidio (free, Microsoft)
- Report templates (create your own)

**Cost:** $0

**Phase 1 Complete:**
- [ ] Understand AI/LLM fundamentals
- [ ] Can execute prompt injection attacks
- [ ] Know enterprise AI architecture
- [ ] Can assess and document findings
- [ ] **Ready to deliver Bronze assessments**

---

## Phase 2: Practical Application (Weeks 5-8)

### Week 5-6: First Real Assessments (Bronze Tier)

**Learning Objectives:**
- Deliver actual Bronze assessments to real clients
- Build confidence through repetition
- Refine methodology based on real-world experience

**Week 5 Activities (12 hours):**

**Assessment 1-2 (10 hours):**
1. **Client 1:** Existing Core Computers customer
   - Offer: Free Bronze assessment (case study trade)
   - Execute: Full 6-stage methodology
   - Document: Everything (screenshots, notes)
   - Report: Professional deliverable
   - Debrief: What worked, what needs improvement

2. **Client 2:** Another existing customer
   - Charge: Full $500 (confidence builder)
   - Improve: Based on Client 1 learnings
   - Refine: Report template, timing
   - Collect: Testimonial if successful

**Process Improvement (2 hours):**
1. Document: Time spent on each stage
2. Identify: Inefficiencies, areas for automation
3. Update: Templates and checklists
4. Create: Internal SOP draft

**Week 6 Activities (12 hours):**

**Assessment 3-4 (10 hours):**
1. **Client 3:** New prospect (workshop attendee or cold outreach)
   - Full sales process: Discovery call, proposal, execution
   - Practice: Professional delivery start to finish
   - Track: Time for sales vs. delivery

2. **Client 4:** Different industry vertical
   - Test: Methodology flexibility across industries
   - Learn: Industry-specific vulnerabilities
   - Document: Vertical variations

**Knowledge Gaps (2 hours):**
1. Identify: What you didn't know during assessments
2. Research: Fill gaps immediately
3. Add: To ongoing learning list

**Week 5-6 Deliverable:**
- [ ] 4 Bronze assessments completed
- [ ] 2 testimonials collected
- [ ] Internal SOP documented (Bronze level)
- [ ] Confidence: Can deliver Bronze independently

---

### Week 7-8: Silver Tier Capability

**Learning Objectives:**
- Expand to architecture review and implementation guidance
- Learn vendor contract assessment
- Build Silver-tier delivery capability

**Week 7 Activities (12 hours):**

**Advanced Training (6 hours):**
1. **Architecture Security:**
   - Study: Threat modeling for AI systems
   - Learn: Microsoft STRIDE methodology applied to AI
   - Practice: Threat model a sample AI implementation

2. **Contract Review:**
   - Study: Data processing agreements (DPAs)
   - Learn: Red flags in vendor contracts (OpenAI, Azure, AWS)
   - Create: Contract review checklist

3. **Implementation Guidance:**
   - Research: Secure deployment patterns
   - Document: Step-by-step secure setup guide
   - Create: Handout for clients ("Secure AI Implementation")

**First Silver Assessment (6 hours):**
1. **Client 5:** Business planning AI deployment
   - Architecture review: Threat model their planned system
   - Vendor review: Assess their vendor contracts
   - Recommendations: Secure implementation guide
   - Report: Comprehensive Silver deliverable

**Week 8 Activities (12 hours):**

**Refinement (4 hours):**
1. Update: Silver tier templates based on Client 5
2. Create: Architecture diagram templates
3. Build: Recommendation library (copy-paste common advice)

**Assessments (8 hours):**
1. **Client 6:** Silver tier (existing customer)
   - Full delivery: Architecture + vendor + recommendations
   - Time tracking: Should be faster than Client 5
   - Collect: Testimonial

**Week 7-8 Deliverable:**
- [ ] 2 Silver assessments completed
- [ ] Silver SOP documented
- [ ] Architecture review capability proven
- [ ] Confidence: Can deliver Silver independently

---

## Phase 3: Advanced Capability (Weeks 9-12)

### Week 9-10: Gold Tier Penetration Testing

**Learning Objectives:**
- Master full 6-stage pentest methodology
- Learn advanced attack techniques (MCP, agent exploitation)
- Build Gold-tier delivery capability

**Week 9 Activities (10 hours):**

**Advanced Techniques (5 hours):**
1. **MCP Exploitation:**
   - Study: MCP server vulnerabilities in depth
   - Practice: File system access exploitation
   - Learn: Backdooring MCP prompts

2. **Agent Attacks:**
   - Study: Tool calling exploitation
   - Practice: Over-scoped API abuse
   - Learn: Multi-agent attack chains

3. **Data Exfiltration:**
   - Advanced: RAG extraction techniques
   - Practice: Stealing documents from vector DBs
   - Learn: Obfuscation to bypass monitoring

**Lab Practice (5 hours):**
1. Build: Complex vulnerable system (multiple components)
2. Attack: Full 6-stage methodology
3. Document: Every finding with proof-of-concept
4. Report: Gold-tier comprehensive pentest report

**Week 10 Activities (10 hours):**

**Supervised Gold Assessment:**
1. **Client 7:** First Gold tier customer
   - Partner: With Dean or technical team member (learning opportunity)
   - Execute: Full pentest (30-40 hour engagement)
   - Document: Every step for SOP
   - Deliver: Professional comprehensive report

**Process Note:** This will take more than 10 hours
- Actual: 30-40 hours over 2-3 weeks for first Gold
- Week 10 focus: Begin first Gold engagement
- Continue through Weeks 11-12

---

### Week 11-12: Systematization & Scaling

**Learning Objectives:**
- Complete first Gold assessment
- Document everything for training others
- Prepare to scale (train Dean, Peter, or new hires)

**Week 11 Activities (10 hours):**

**Gold Completion (6 hours):**
1. Finish: Client 7 Gold assessment
2. Deliver: Comprehensive report and presentation
3. Debrief: What could be systematized?

**Documentation (4 hours):**
1. **Internal Playbook:**
   - Complete: All three tiers (Bronze/Silver/Gold)
   - Include: Templates, checklists, scripts
   - Add: Screenshots and examples
   - Goal: Someone else could follow this

2. **Training Materials:**
   - Create: "How to deliver Bronze" guide
   - Create: "How to deliver Silver" guide
   - Create: "How to deliver Gold" guide (partner-based initially)

**Week 12 Activities (10 hours):**

**Train the Trainer (6 hours):**
1. **Train Dean (or next team member):**
   - Walk through: Week 1-4 condensed version
   - Supervise: Dean's first Bronze assessment
   - Debrief: What worked, what needs clarification

**Final Deliverables (4 hours):**
1. **Complete Internal Playbook:**
   - 50+ pages: Comprehensive guide
   - Ready: For next person to train themselves
   - Includes: Everything you learned

2. **Service Launch Checklist:**
   - Marketing: Materials ready
   - Sales: Process documented
   - Delivery: SOPs complete
   - Team: At least 2 people trained

**Week 12 Deliverable:**
- [ ] 1 Gold assessment completed
- [ ] Complete internal playbook (50+ pages)
- [ ] Second team member trained (Dean)
- [ ] Service officially launched
- [ ] **Ready to scale: Can deliver all tiers independently**

---

## Tools & Resources Inventory

### Required Tools (Essential)

**Testing Tools:**
1. **Burp Suite Community Edition** - Free
   - Web proxy for intercepting requests
   - Essential for testing chatbots

2. **Python 3.x** - Free
   - Scripting custom tests
   - Automation of repetitive tasks

3. **Ollama** - Free
   - Local LLM testing
   - Privacy-friendly experimentation

4. **Postman or Insomnia** - Free
   - API testing
   - MCP server testing

**Development Environment:**
1. **VS Code** - Free
   - Code editor
   - Extensions for Python, Markdown

2. **Git** - Free
   - Version control for internal playbook
   - Documentation management

**Documentation:**
1. **Markdown editor** - Free (VS Code)
   - Report writing
   - Template creation

2. **Draw.io** - Free
   - Architecture diagrams
   - Attack flow visualization

**Cost: $0** (all free, open source)

---

### Recommended Tools (Professional)

**Advanced Testing:**
1. **Burp Suite Professional** - $449/year
   - Advanced scanning features
   - Automation capabilities
   - Worth it by Client 10+

2. **LangChain / LlamaIndex** - Free (open source)
   - Building test systems
   - RAG experimentation

**AI Services (for testing):**
1. **OpenAI API** - Pay per use (~$50-100/month)
   - Testing GPT-4 systems
   - Building test chatbots

2. **Anthropic API** - Pay per use (~$50-100/month)
   - Testing Claude systems
   - MCP testing

3. **Azure OpenAI** - Pay per use (~$50-100/month)
   - Enterprise AI testing
   - Microsoft ecosystem

**Monitoring/Observability (to understand client systems):**
1. **LangSmith** - $49/month
   - AI observability platform
   - Understand what clients are using

**Cost: $100-200/month** during training, $200-400/month when operational

---

### Learning Resources

**Free Resources:**

1. **YouTube Channels:**
   - Andrej Karpathy (AI fundamentals)
   - Two Minute Papers (AI developments)
   - Hidden Layer (security-specific)
   - Network Chuck (accessible security content)

2. **Blogs & Websites:**
   - hiddenlayer.com/blog (security focus)
   - OWASP LLM Top 10 (standard reference)
   - Simon Willison's blog (AI + security)
   - Anthropic docs (MCP, safety)

3. **Papers & Research:**
   - Liberatus GitHub (jailbreaks)
   - Amazon MCP threat model
   - Academic papers on prompt injection

4. **Communities:**
   - Reddit: r/LocalLLaMA, r/MachineLearning
   - Discord: AI security communities
   - Twitter/X: @JohnnyXmas, security researchers

**Paid Resources:**

1. **Courses:**
   - "AI for Everyone" by Andrew Ng - $49/month (Coursera)
   - "LLM Security" by Portswigger - Free (Burp Suite academy)
   - "Prompt Engineering" by DeepLearning.AI - Free

2. **Books:**
   - "Prompt Injection Primer" by Simon Willison (blog, free)
   - "AI Engineering" by Chip Huyen - $50
   - "Designing Machine Learning Systems" - $60

3. **Conferences (Optional):**
   - RSA Conference - $2,500+ (expensive, but industry connections)
   - Local security meetups - Free (Brisbane OWASP chapter)
   - BSides Brisbane - ~$50 (excellent local event)

**Total Learning Investment:**
- Essential: $0-100
- Recommended: $500-1,000
- Optional (conferences): $1,000-3,000

---

## Training Timeline Summary

### Week-by-Week Checklist

**Weeks 1-4: Foundations**
- [ ] Week 1: AI/LLM fundamentals (15 hours)
- [ ] Week 2: Prompt injection techniques (15 hours)
- [ ] Week 3: Enterprise architecture (15 hours)
- [ ] Week 4: Defensive measures (15 hours)
- **Milestone:** Can deliver Bronze assessments

**Weeks 5-8: Practice**
- [ ] Week 5: Bronze assessments 1-2 (12 hours)
- [ ] Week 6: Bronze assessments 3-4 (12 hours)
- [ ] Week 7: Silver training + first assessment (12 hours)
- [ ] Week 8: Silver assessment + refinement (12 hours)
- **Milestone:** Can deliver Bronze and Silver independently

**Weeks 9-12: Advanced**
- [ ] Week 9: Gold training + lab practice (10 hours)
- [ ] Week 10: First Gold assessment begins (10 hours)
- [ ] Week 11: Gold completion + documentation (10 hours)
- [ ] Week 12: Train second person + launch (10 hours)
- **Milestone:** Can deliver all tiers, service launched, team trained

**Total Investment:**
- Time: 150 hours over 12 weeks
- Money: $4,000 (tools + training + lab)
- Outcome: $66,500+ revenue Year 1

**Return on Investment:**
- Time: 150 hours invested → 1,000+ billable hours Year 1
- Money: $4,000 invested → $76,500 revenue Year 1
- **ROI: 1,813%** (19x return)

---

## Success Criteria

### By End of Week 4:
- [ ] Understand AI/LLM architecture and vulnerabilities
- [ ] Can execute prompt injection attacks successfully
- [ ] Know 6-stage assessment methodology
- [ ] Have delivered mock Bronze assessment
- [ ] Feel confident: "I could charge $500 for this"

### By End of Week 8:
- [ ] Delivered 6 real assessments (4 Bronze, 2 Silver)
- [ ] Have 3+ testimonials
- [ ] Internal SOPs documented
- [ ] Feel confident: "I can do this professionally"
- [ ] Revenue generated: $2,500+ from assessments

### By End of Week 12:
- [ ] Delivered 7+ assessments (4 Bronze, 2 Silver, 1 Gold)
- [ ] Second team member trained (Dean or other)
- [ ] Complete internal playbook (50+ pages)
- [ ] Service officially launched (marketing live)
- [ ] Revenue generated: $5,000-8,000 from training period
- [ ] Ready to scale: Can train others, deliver all tiers

---

## Training Tips & Best Practices

### Learning Strategy

**1. Learn by Doing:**
- Don't just watch videos - do the exercises
- Build things (chatbots, test systems, attacks)
- Break things (intentionally vulnerable systems)
- Document everything (notes, screenshots, learnings)

**2. Teach to Learn:**
- Explain concepts to Kristyn (if she's patient)
- Write blog posts (even if not published)
- Create your own training materials
- Teaching forces deeper understanding

**3. Pattern Recognition:**
- After each assessment, note patterns
- What vulnerabilities appear repeatedly?
- What recommendations work best?
- Build a library of reusable content

**4. Community Learning:**
- Join Discord servers (AI security communities)
- Follow researchers on X/Twitter
- Ask questions (don't be afraid to look dumb)
- Share learnings (builds reputation)

### Time Management

**Daily Schedule (during intense weeks 1-4):**
- Morning: 7:00-9:30 AM (2.5 hours focused learning)
- Lunch: Quick session 12:00-1:00 PM (1 hour review)
- Evening: 6:00-7:00 PM (1 hour practice/homework)
- **Total: 4-5 hours/day, Monday-Friday**

**Protecting Learning Time:**
- Block calendar (make it unavoidable)
- Tell team: "Training weeks, I'm less available"
- Dean covers urgent items
- Batch non-urgent work for off-hours

**Integration with Life:**
- Ice bath time = thinking time (review concepts)
- Commute = podcast/video learning
- Weekend = lighter (family priority)
- Flexibility: Some days 2 hours, some days 6 hours

### Staying Motivated

**Milestone Rewards:**
- Week 4: Celebrate first mock assessment (nice dinner)
- Week 8: Celebrate first $1,500 sale (something meaningful)
- Week 12: Celebrate launch (family trip? New tool purchase?)

**Visual Progress:**
- Checklist on wall (cross off items)
- Revenue tracker (watch it grow)
- Testimonial wall (print and display)
- "Before/After" snapshots (where you started vs. where you are)

**Mission Connection:**
- Remember: This protects vulnerable businesses (P3)
- Think: How many companies will you save from breach?
- Consider: Foundation model potential (train others, change lives)
- Reflect: Building something powerful despite disability

**When It Gets Hard:**
- Remember Jocko: "Discipline equals freedom"
- Remember grandfather: "Don't be held back"
- Remember East Timor: You've endured worse
- Remember why: This builds the 10-year vision

---

## Adapting Training for Team Members

### Training Dean (or Next Person)

**Advantages:**
- You've already documented everything
- You can answer questions in real-time
- You understand Core Computers context
- You've made mistakes they can avoid

**Modified Timeline (8 Weeks vs. 12):**
- Weeks 1-2: Condensed fundamentals (follow your playbook)
- Weeks 3-4: Practice assessments (you supervise)
- Weeks 5-6: Independent Bronze assessments
- Weeks 7-8: Silver training + first assessments
- **Outcome: Bronze/Silver capable in 8 weeks**

**Training Approach:**
1. **Week 1: Shadow You**
   - Dean observes your assessment
   - You narrate what you're doing
   - He takes notes, asks questions

2. **Week 2: Supervised Practice**
   - Dean leads, you coach
   - Stop and correct in real-time
   - Debrief after each session

3. **Week 3-4: Independent with Review**
   - Dean does full assessment solo
   - You review report before client delivery
   - Provide feedback for improvement

4. **Week 5+: Independent**
   - Dean delivers independently
   - You spot-check quality
   - He trains next person

### Training Multiple People

**Once You Have 2 Trained (Ricky + Dean):**

**Batch Training (More Efficient):**
- Train 2-3 people simultaneously
- One teaches theory, others practice together
- Peer learning (they help each other)
- Scales better than 1-on-1

**Foundation Model Pathway:**
- Week 1-2: Classroom style (fundamentals together)
- Week 3-4: Lab practice (supervised)
- Week 5-6: Apprentice model (shadow experienced person)
- Week 7-8: Independent with review
- **8-week pathway to Bronze capability**

---

## Quality Assurance & Continuous Improvement

### After Each Assessment:

**Self-Review Questions:**
1. Did I follow the methodology completely?
2. What did I miss that I should have tested?
3. How could I have been more efficient?
4. What would make the report better?
5. Did the client understand the findings?

**Peer Review (Once Team Grows):**
- Weekly: Review each other's reports
- Monthly: Case study presentations
- Quarterly: Full methodology review

**Client Feedback:**
- After each assessment: "How did we do?"
- Collect: Testimonials and improvement suggestions
- Act: On feedback quickly (show responsiveness)

### Knowledge Management:

**Internal Wiki/Playbook:**
- Living document (update continuously)
- Add: New attack techniques as discovered
- Add: Industry-specific findings
- Add: Client FAQs and answers

**Knowledge Sharing:**
- Weekly team meeting: "What I learned this week"
- Monthly newsletter: To clients (builds authority)
- Quarterly blog post: Public (marketing + learning)

---

## Contingency Plans

### If Training Takes Longer:

**Scenario:** Week 4 arrives, don't feel ready for Bronze

**Action:**
- Extend Phase 1 by 2 weeks
- More practice on mock systems
- Delay client delivery until confident
- **Better to be thorough than rush**

### If First Client Goes Badly:

**Scenario:** Assessment reveals you missed things, client unhappy

**Action:**
- Offer partial refund or free remediation help
- Learn from mistakes (document what went wrong)
- Revise methodology before next assessment
- Use as case study (what NOT to do)

### If Demand is Lower Than Expected:

**Scenario:** Struggle to book 50 clients Year 1

**Action:**
- Increase marketing (more workshops, more outreach)
- Lower Bronze price temporarily ($250 intro offer)
- Offer free assessments to build portfolio
- Focus on case studies and testimonials
- **Build proof, then raise prices**

### If Demand is Higher Than Expected:

**Scenario:** Booked solid, can't keep up

**Action:**
- Raise prices (reduce demand to manageable level)
- Accelerate Dean's training (get help faster)
- Hire sooner than planned (bring in third person)
- Batch similar assessments (efficiency gains)
- **Good problem to have**

---

## Final Checklist: Are You Ready to Start?

Before Week 1 begins:

**Commitment:**
- [ ] Ricky commits: 15 hours/week for 12 weeks
- [ ] Dean commits: Support role (cover urgent items)
- [ ] Kristyn aware: Less evening availability during training
- [ ] Calendar blocked: Training time protected

**Resources:**
- [ ] Budget approved: $4,000 for tools/training
- [ ] Computer setup: Development environment ready
- [ ] Internet: Fast, reliable connection for API testing
- [ ] Workspace: Quiet area for focused learning

**Mental:**
- [ ] Understand: This is an investment, not a cost
- [ ] Prepared: For learning curve (will be frustrating at times)
- [ ] Motivated: Connected to P3 mission (why this matters)
- [ ] Confident: You've learned hard things before (Army, IT, business)

**Support:**
- [ ] Dean aligned: Knows his role during training period
- [ ] Team aware: Ricky less available for 12 weeks
- [ ] Clients informed: Any delays during training communicated
- [ ] Fallback: Emergency protocol if Ricky unavailable

**Start Date Set:**
- [ ] Week 1 begins: _____________ (suggest 2026-01-06)
- [ ] Week 12 ends: _____________ (2026-03-30)
- [ ] Launch date: _____________ (2026-04-06, Q2 2026)

---

## You're Ready. Let's Build This.

**Remember:**
- You've survived worse than a 90-day training program
- You've learned complex systems before (Army, IT, business)
- You have the foundation (cybersecurity knowledge)
- You have the motivation (P3 mission, 10-year vision)
- You have the support (Dean, team, Kristyn)

**The magic you're looking for is in the work you're avoiding.**

This training plan IS the work.
The assessments ARE the work.
Building the business IS the work.

**By Week 12, you'll be:**
- Delivering professional AI security assessments
- Earning $5,000-8,000 from training period alone
- Training Dean to scale delivery
- Positioned as Brisbane AI security expert
- Building toward $66,500 Year 1 profit

**The question isn't "Can I do this?"**
**The question is "When do I start?"**

---

**Next Step:** Review pitch deck, then set start date.

**Status:** Training plan complete, awaiting approval
**Owner:** Ricky Prout
**Timeline:** 90 days (12 weeks) from start date
**Investment:** $4,000 + 150 hours
**Expected Return:** $66,500 Year 1 profit (19x ROI)
