export const APP_URL = "https://app.preciprocal.com";

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "/faq" },
] as const;

export const FEATURES = [
  {
    id: "interviews",
    title: "AI Mock Interviews",
    description:
      "Practice with a panel of AI interviewers who push back, ask follow-ups, and score you like a real hiring committee — so you walk in calm, not clueless.",
    icon: "mic" as const,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "resume",
    title: "Resume Analyser",
    description:
      "See your resume through a recruiter's eyes — ATS score, 6-second scan simulation, and line-by-line rewrites that turn 'Built a testing suite' into 'Saved 15 engineering hours per sprint.'",
    icon: "file" as const,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "cover-letter",
    title: "Cover Letter Generator",
    description:
      "Stop staring at a blank page. Our AI researches the company, matches your experience to the role, and writes a letter that sounds like you — not a robot.",
    icon: "pen" as const,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "planner",
    title: "Study Planner",
    description:
      "Get a personalised day-by-day prep schedule that adapts when life happens. Miss a day? It rebalances. Fall behind? It reprioritises. No guilt, just progress.",
    icon: "calendar" as const,
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    id: "tracker",
    title: "Job Tracker",
    description:
      "Replace the spreadsheet you hate. Kanban pipeline, automatic status tracking, contact finder, and AI-written outreach emails — all from one dashboard.",
    icon: "kanban" as const,
    gradient: "from-amber-500 to-red-500",
  },
  {
    id: "extension",
    title: "Chrome Extension",
    description:
      "See a job on LinkedIn? One click imports it to your tracker, generates a tailored cover letter, and queues up interview prep — before you even close the tab.",
    icon: "chrome" as const,
    gradient: "from-indigo-500 to-blue-500",
  },
] as const;

export const STEPS = [
  {
    number: "01",
    title: "Upload Your Resume",
    description:
      "Drop your resume and watch our AI tear it apart (lovingly). You'll see exactly what ATS systems see, what recruiters skip, and what's costing you callbacks — with fixes you can apply in one click.",
  },
  {
    number: "02",
    title: "Practice Until It's Muscle Memory",
    description:
      "Run voice-based mock interviews with AI panelists who actually challenge you. Get scored on communication, technical depth, and structure — not just right/wrong answers. The nerves disappear when you've done it 20 times.",
  },
  {
    number: "03",
    title: "Apply Smarter, Not Harder",
    description:
      "Generate tailored cover letters in seconds. Track every application on a Kanban board. Find hiring contacts with real emails. Send personalised outreach that gets replies — not silence.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Jamie L.",
    role: "Career Switcher → Shopify",
    text: "I spent 4 months applying to everything and hearing nothing. Turns out my resume was getting auto-rejected before anyone read it. Preciprocal showed me exactly why — my ATS score was 34. After the rewrites it hit 89. Three weeks later I had two offers. I literally cried when Shopify called.",
    avatar: "JL",
  },
  {
    name: "Ananya M.",
    role: "New Grad → Atlassian",
    text: "I had zero real interview experience and was terrified of freezing up. Did about 15 mock interviews on Preciprocal and by the end answering felt automatic. When Atlassian asked me a curveball behavioral question, I didn't panic — I just answered like I'd done it before. Because I had.",
    avatar: "AM",
  },
  {
    name: "Carlos R.",
    role: "Support → Product Manager at HubSpot",
    text: "Everyone told me switching from customer support to product was unrealistic without an MBA. Preciprocal helped me reframe every bullet on my resume to highlight the PM skills I already had — user research, stakeholder communication, prioritisation. HubSpot's hiring manager said my application was one of the strongest she'd seen from a non-traditional background.",
    avatar: "CR",
  },
  {
    name: "Taylor S.",
    role: "Freelancer → Datadog",
    text: "The cover letter generator genuinely shocked me. I expected robotic filler but it actually sounded like me — referenced a specific blog post from Datadog's engineering team and tied it to my freelance monitoring work. The recruiter mentioned it in our first call. That never happens.",
    avatar: "TS",
  },
  {
    name: "Priya K.",
    role: "Grad Student → Stripe",
    text: "I was drowning — applying on LinkedIn, prepping on LeetCode, tracking everything in a messy spreadsheet, writing cover letters at 2am. Preciprocal replaced all of that. One dashboard. The study planner alone saved me 2 hours a day. I actually slept during my job search.",
    avatar: "PK",
  },
  {
    name: "Marcus W.",
    role: "Bootcamp Grad → Twilio",
    text: "No CS degree. No internships. Just a bootcamp and a lot of impostor syndrome. The mock interviews taught me how to talk about my projects like a real engineer instead of apologising for not having a traditional background. Twilio offered me the role after one loop. Still processing that.",
    avatar: "MW",
  },
  {
    name: "Sophie H.",
    role: "Marketing → Canva",
    text: "I used the Find Contacts feature to reach the actual hiring manager at Canva. Preciprocal wrote a cold email that was specific and warm — not the desperate template I would have sent. She replied in an hour. I skipped the recruiter screen entirely. That feature alone is worth the subscription.",
    avatar: "SH",
  },
  {
    name: "Daniel P.",
    role: "Laid Off → Notion",
    text: "Got laid off on a Tuesday. By Thursday I had my resume rebuilt, 12 applications tracked, and 3 mock interviews done. Preciprocal turned what could have been months of panic into a structured plan. Had an offer from Notion within 5 weeks. My only regret is not using it sooner.",
    avatar: "DP",
  },
] as const;

export const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "Free",
    period: "",
    tagline: "Get started and feel the value.",
    cta: "Get started free",
    ctaHref: "/sign-up",
    highlighted: false,
    mostPopular: false,
    features: [
      "5 resume analyses / month",
      "5 cover letters / month",
      "2 LinkedIn optimisations / month",
      "1 interview debrief / month",
      "2 find contacts / month",
      "3 mock interviews / month",
      "Job tracker (10 jobs)",
      "Chrome extension (limited)",
      "Basic analytics",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.99",
    period: "/mo",
    tagline: "Everything an active job seeker needs.",
    cta: "Start Pro",
    ctaHref: "/sign-up?plan=pro",
    highlighted: true,
    mostPopular: true,
    features: [
      "20 resume analyses / month",
      "30 mock interviews / month",
      "Unlimited cover letters",
      "5 LinkedIn optimisations / month",
      "5 interview debriefs / month",
      "10 find contacts / month",
      "5 active study plans",
      "Unlimited job tracker",
      "Chrome extension (full)",
      "Resume editor + PDF & Word export",
      "Recruiter eye simulation",
      "Full analytics dashboard",
      "Priority AI responses",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$24.99",
    period: "/mo",
    tagline: "Unlimited access for serious candidates.",
    cta: "Start Premium",
    ctaHref: "/sign-up?plan=premium",
    highlighted: false,
    mostPopular: false,
    features: [
      "Unlimited everything",
      "Company-specific interview prep",
      "AI interview coach + deep analysis",
      "Post-interview improvement roadmap",
      "All Pro features included",
      "Priority support (24hr SLA)",
      "Early access to new features",
      "Student: 1 month free — no card needed",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "For teams, hiring pipelines & organisations.",
    cta: "Contact us",
    ctaHref: "mailto:hello@preciprocal.com",
    highlighted: false,
    mostPopular: false,
    features: [
      "Everything in Premium",
      "Unlimited seats across your org",
      "Custom AI interview tracks per role",
      "Dedicated account manager",
      "Flexible invoice billing",
      "End-to-end encryption · Google Cloud secured",
      "No data selling · Your data stays yours",
      "GDPR & CCPA ready · Full privacy compliance",
      "Custom DPA available · On request for universities",
      "Pricing based on team size & needs",
    ],
  },
] as const;

export const STATS = [
  { value: 25000, suffix: "+", label: "Mock Interviews Taken" },
  { value: 92, suffix: "%", label: "Land Interviews Faster" },
  { value: 150, suffix: "+", label: "Interview Types" },
  { value: 4.9, suffix: "", label: "User Rating", isDecimal: true },
] as const;

export const UNIVERSITY_LOGOS = [
  "Stanford", "MIT", "Harvard", "Berkeley", "Columbia",
  "NYU", "Georgia Tech", "UT Austin", "Carnegie Mellon", "Michigan",
  "Yale", "Princeton", "Cornell", "UCLA", "UPenn",
  "Duke", "Northwestern", "Caltech", "Brown", "USC",
  "Purdue", "Virginia Tech", "Illinois", "UW Madison", "Ohio State",
  "Boston University", "Rice", "Northeastern", "Emory", "Vanderbilt",
];

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Chrome Extension", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Interview Guide", href: "#" },
      { label: "Resume Tips", href: "#" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "mailto:support@preciprocal.com" },
    ],
  },
] as const;


// ═══════════════════════════════════════════════════════════════════════════════
// FAQ DATA — single source of truth for both /faq page and landing page teaser
// ═══════════════════════════════════════════════════════════════════════════════

export type FAQCategory = "general" | "pricing" | "interviews" | "resume" | "cover-letter" | "planner" | "technical";

export interface FAQItem {
  id: string;
  q: string;
  a: string;
  category: FAQCategory;
}

export const FAQ_CATEGORIES: { id: FAQCategory; label: string }[] = [
  { id: "general",      label: "General" },
  { id: "pricing",      label: "Pricing & Plans" },
  { id: "interviews",   label: "Mock Interviews" },
  { id: "resume",       label: "Resume Analysis" },
  { id: "cover-letter", label: "Cover Letters" },
  { id: "planner",      label: "Study Planner" },
  { id: "technical",    label: "Account & Security" },
];

export const FAQS: FAQItem[] = [
  // ════════════ GENERAL ════════════
  { id: "g1", category: "general", q: "What is Preciprocal?", a: "Preciprocal is an AI-powered job search operating system. It combines resume analysis (ATS scoring, recruiter eye simulation, candidate benchmarking, interview intelligence), voice-based mock interviews with a multi-agent panel, cover letter generation with real-time company research, AI study planning, LinkedIn optimisation, cold outreach, and a job tracker with contact finder — all in one platform at a student-friendly price." },
  { id: "g2", category: "general", q: "Who is Preciprocal for?", a: "Students, recent graduates, and early-career professionals preparing for internships or their first few full-time roles. We're especially popular with CS, business, and engineering students at top universities, but anyone actively job-searching benefits from the platform." },
  { id: "g3", category: "general", q: "How do I get started?", a: "Sign up free at app.preciprocal.com — no credit card needed. You can upload a resume and get your ATS score within 2 minutes, or jump straight into a mock interview. The platform walks you through everything." },
  { id: "g4", category: "general", q: "Is there a mobile app?", a: "Not yet — Preciprocal is fully web-based and works on any device with a modern browser. The interface is responsive and optimised for mobile, but a native app is on our 2026 roadmap." },
  { id: "g5", category: "general", q: "How is this different from using ChatGPT for job search?", a: "ChatGPT is a general-purpose chatbot. Preciprocal is a purpose-built system with specialised AI agents for each task — ATS scoring calibrated against real hiring data, a multi-agent interview panel (not a single chatbot), recruiter eye-tracking simulation based on published research, and a full application pipeline. It's the difference between asking a friend for advice and having a dedicated career operations team." },
  { id: "g6", category: "general", q: "Do you have a Chrome extension?", a: "Yes. The Preciprocal Chrome extension lets you save jobs from LinkedIn and job boards with one click, auto-import job descriptions for resume tailoring, and track applications without leaving the page you're on. Available for Chrome and Chromium-based browsers." },
  { id: "g7", category: "general", q: "How many tools does Preciprocal include?", a: "11 core tools: Resume Analysis (ATS + Benchmarking + Recruiter Sim + Interview Intel), Resume Tailoring & Rewriting, Mock Interviews, Cover Letter Generator, Study Planner, LinkedIn Optimiser, Cold Outreach Generator, Interview Debrief Journal, Job Tracker, Contact Finder, and the Chrome Extension." },
  { id: "g8", category: "general", q: "Can I use Preciprocal for different roles?", a: "Absolutely. Every tool adapts to your target role — whether you're applying for software engineering, data science, product management, consulting, finance, or any other field. The AI tailors its analysis, questions, and recommendations to the specific job description you provide." },

  // ════════════ PRICING ════════════
  { id: "p1", category: "pricing", q: "Is Preciprocal really $9.99/mo?", a: "Yes. Pro is $9.99/month (or $7.49/mo billed annually). We built Preciprocal for students and early-career professionals who can't afford $50–100/mo tools. The price is intentional and non-negotiable — it's core to our mission of making quality career prep accessible." },
  { id: "p2", category: "pricing", q: "Do you offer a free plan?", a: "Yes. The free tier includes 5 resume analyses, 3 mock interviews, 5 cover letters, 2 LinkedIn optimisations, 1 interview debrief, 2 contact lookups, a 10-job tracker, and basic analytics per month. It's a real free plan, not a 7-day trial." },
  { id: "p3", category: "pricing", q: "Is there a student discount?", a: "Students with a .edu email get 1 month of Pro completely free — no credit card required to activate. After that, Pro is already $9.99/mo, which is the lowest price in the market for this feature set." },
  { id: "p4", category: "pricing", q: "What's the difference between Pro and Premium?", a: "Pro ($9.99/mo) gives you 20 resume analyses, 30 mock interviews, unlimited cover letters, the full resume editor with PDF/Word export, recruiter eye simulation, and complete analytics. Premium ($24.99/mo) unlocks unlimited everything, company-specific interview prep, deep AI coaching, post-interview improvement roadmaps, priority support with a 24-hour SLA, and early access to new features." },
  { id: "p5", category: "pricing", q: "Can I cancel anytime?", a: "Yes. No contracts, no lock-in, no cancellation fees. Cancel with one click in your Settings page. Your access continues until the end of your billing period." },
  { id: "p6", category: "pricing", q: "What payment methods do you accept?", a: "All major credit and debit cards processed securely through our payment provider. We don't store your card details — payment processing is handled by an industry-standard PCI-compliant processor." },
  { id: "p7", category: "pricing", q: "Do you offer refunds?", a: "Yes — we offer a 30-day money-back guarantee. If Preciprocal doesn't help you land an interview within 30 days of subscribing, email us and we'll refund you in full. No hoops, no fine print." },
  { id: "p8", category: "pricing", q: "What happens when I hit my free plan limit?", a: "You'll see a clear message showing your usage and the option to upgrade. We never cut you off mid-analysis — you'll always get your results. You just can't start new analyses until your monthly limit resets on your billing date, or you upgrade." },
  { id: "p9", category: "pricing", q: "Is there an annual plan?", a: "Yes. Pro is $7.49/mo billed annually ($89.88/year — saves 25%). Premium is $19.99/mo billed annually ($239.88/year — saves 20%). Annual plans lock in the price for 12 months." },

  // ════════════ MOCK INTERVIEWS ════════════
  { id: "i1", category: "interviews", q: "How do mock interviews work?", a: "Our voice-based interviews use a multi-agent AI system to simulate a real interview panel — HR screener, technical lead, and hiring manager. Each agent has distinct priorities and evaluation criteria. You speak into your mic, they respond naturally with follow-up questions based on your actual answers, and you get a detailed debrief with scoring across multiple dimensions." },
  { id: "i2", category: "interviews", q: "Do I need a webcam?", a: "No. Mock interviews are voice-only — you just need a microphone. Your built-in laptop mic works fine. We focus on what you say and how you say it, not what you look like." },
  { id: "i3", category: "interviews", q: "What types of interviews can I practise?", a: "Technical (coding + system design), behavioural (STAR method), system design (architecture), and general screening interviews. You can target specific companies and roles, select difficulty level, and the AI adjusts question style, depth, and follow-ups accordingly." },
  { id: "i4", category: "interviews", q: "How realistic are the AI interviewers?", a: "Each interviewer is a separate AI agent with its own personality. The HR screener focuses on culture fit and communication. The tech lead probes for depth, asks 'why' and 'what if' questions. The hiring manager evaluates problem-solving approach and leadership potential. They interrupt naturally, ask follow-ups based on what you actually said, and don't follow scripted paths." },
  { id: "i5", category: "interviews", q: "Can I review my past interviews?", a: "Yes. Every interview is saved with a full transcript, per-question scoring, category breakdowns (technical accuracy, communication, problem-solving, confidence), AI-generated strengths and improvement areas, and a final assessment. You can re-read transcripts and track your scores over time on the analytics dashboard." },
  { id: "i6", category: "interviews", q: "How is the interview scored?", a: "You receive scores across 5 dimensions: Technical Accuracy, Communication Clarity, Problem-Solving Approach, Confidence & Delivery, and Overall Readiness. Each comes with specific feedback and actionable suggestions. Your total score is benchmarked against industry averages." },
  { id: "i7", category: "interviews", q: "Can I practise for a specific company?", a: "Yes. Enter the company name and role, and the AI tailors questions to that company's known interview style, values, and technical focus areas. For example, a system design interview targeting a particular company will focus on the types of distributed systems problems they're known to ask." },
  { id: "i8", category: "interviews", q: "How long is each mock interview?", a: "Duration varies by type — screening interviews are typically 15–20 minutes, behavioural rounds 20–30 minutes, and technical/system design rounds 30–45 minutes. You can end early or extend if you want more practice." },

  // ════════════ RESUME ANALYSIS ════════════
  { id: "r1", category: "resume", q: "What is ATS scoring?", a: "ATS (Applicant Tracking System) is the software 73% of companies use to automatically filter resumes before a human sees them. Our ATS scorer analyses your resume against the same criteria — keyword matching, formatting compatibility, section structure, and header parsing — and gives you a score out of 100 with specific fixes." },
  { id: "r2", category: "resume", q: "What is the Recruiter Eye Simulation?", a: "Based on the TheLadders eye-tracking study, we simulate how three different reviewers scan your resume: an HR screener (6-second first pass), a technical lead (deeper skill evaluation), and a hiring manager (impact & leadership focus). You see an attention heatmap showing where each reviewer's eyes go, what stands out, what gets missed, and their internal hiring notes." },
  { id: "r3", category: "resume", q: "What is Candidate Benchmarking?", a: "We compare your resume against a research-calibrated model of candidates who were actually hired for similar roles. You see your percentile ranking across ATS compatibility, content quality, structure, and impact. Plus a specific list of what hired candidates had that you currently don't — with actionable fixes." },
  { id: "r4", category: "resume", q: "What is Interview Intelligence?", a: "Our AI aggregates market intelligence from public sources like job review sites, salary databases, and professional forums to show you what interviewers at your target companies actually look for, common rejection reasons, salary benchmarks for your experience level, and the specific questions you're most likely to face." },
  { id: "r5", category: "resume", q: "Can I tailor my resume to a specific job?", a: "Yes. Paste a job description into the Tailor tab, and the AI rewrites specific bullets on your resume to better match — adjusting keywords, reframing experience, and prioritising relevant skills. Every change is shown in a clear 'original → rewrite' format, and you approve each one before applying." },
  { id: "r6", category: "resume", q: "What file formats are supported?", a: "PDF and Word (.docx) for upload. The built-in resume editor lets you edit inline with AI suggestions (apply, ignore, or undo each one), and export as both PDF and Word. We also extract clean text from your resume for downstream analysis." },
  { id: "r7", category: "resume", q: "How does the inline resume editor work?", a: "After analysis, switch to the Writer tab to see your resume in an editable format. The AI highlights specific lines and suggests rewrites. Each suggestion has Apply, Ignore, and Undo buttons. You can also type directly to make manual edits, then export the final version as PDF or Word." },
  { id: "r8", category: "resume", q: "How often should I re-analyse my resume?", a: "Re-analyse after every major edit, and always before submitting to a new role — especially if you're tailoring to a specific job description. Your ATS score can change significantly with even small wording adjustments." },
  { id: "r9", category: "resume", q: "Does the analysis work for non-tech roles?", a: "Yes. While we have deep expertise in tech roles (SWE, data science, PM), the ATS scoring, recruiter simulation, and benchmarking work for any industry — business, finance, consulting, healthcare, marketing, and more. The AI adapts its evaluation criteria to your target role." },

  // ════════════ COVER LETTERS ════════════
  { id: "c1", category: "cover-letter", q: "How does the cover letter generator work?", a: "Paste a job description and the AI does three things: (1) researches the company in real-time — recent news, projects, culture, and values, (2) analyses the job requirements against your resume, and (3) writes a personalised letter that connects your specific experience to their needs, referencing real company details. The result sounds like you wrote it after hours of research." },
  { id: "c2", category: "cover-letter", q: "Does it use my resume information?", a: "Yes. If you have a resume uploaded, the AI automatically pulls your specific experience, metrics, skills, and projects into the cover letter. This ensures consistency between your application materials and highlights your most relevant qualifications with actual numbers from your resume." },
  { id: "c3", category: "cover-letter", q: "Can I customise the tone?", a: "Yes — choose from Professional, Enthusiastic, Formal, Friendly, or Confident. The AI adapts writing style while maintaining the company research and personalisation. You can also regenerate with a different tone if the first version doesn't feel right." },
  { id: "c4", category: "cover-letter", q: "How long does generation take?", a: "Typically 10–30 seconds. The AI performs real-time company research (5–10s), analyses the job description against your resume (3–5s), then writes the letter (5–10s). You can immediately copy, edit, or download in PDF or Word format." },
  { id: "c5", category: "cover-letter", q: "Can I edit the generated letter?", a: "Yes. After generation, you can copy to your preferred editor or use our built-in editor to make changes. The AI gives you a strong, research-backed foundation that you can personalise further to match your voice." },
  { id: "c6", category: "cover-letter", q: "How many can I generate per month?", a: "Free plan: 5/month. Pro: unlimited. Premium: unlimited. All generated letters are saved in your dashboard for future reference and editing." },

  // ════════════ STUDY PLANNER ════════════
  { id: "s1", category: "planner", q: "How does the AI Study Planner work?", a: "Enter your target role, interview date, current skill level, and daily time commitment. The AI generates a personalised day-by-day schedule with specific tasks (solve this LeetCode problem, read this article, watch this video), curated resources, daily quizzes to test retention, and an AI coach you can ask questions anytime." },
  { id: "s2", category: "planner", q: "What resources does the planner include?", a: "Each task links to curated resources — LeetCode problems with difficulty ratings, YouTube explanations from top educators, technical articles, and documentation. Resources are selected based on your skill level and the specific topic for that day." },
  { id: "s3", category: "planner", q: "What are streaks and how do they work?", a: "Completing at least one task per day maintains your streak. The streak counter appears on your planner dashboard and resets if you miss a day. It's a simple accountability mechanism — users with 7+ day streaks are significantly more likely to complete their full plan." },
  { id: "s4", category: "planner", q: "Can I customise my study plan?", a: "Yes. The AI generates an initial plan optimised for your timeline, but you can add, remove, reorder, or modify any task. You can also adjust the daily time commitment and the plan will redistribute tasks accordingly." },
  { id: "s5", category: "planner", q: "How does the Knowledge Quiz work?", a: "At the end of each day's tasks, the planner generates a short quiz (4–6 questions) covering that day's material. Questions are multiple-choice with explanations for each answer. Your quiz scores feed into the AI coach's understanding of your weak areas." },
  { id: "s6", category: "planner", q: "What is the AI Coach?", a: "A built-in chat assistant within the planner that knows your study plan, progress, and quiz results. Ask it questions like 'When should I use BFS vs DFS?' or 'Explain the trade-offs of consistent hashing' and it gives contextual answers based on what you're currently studying." },
  { id: "s7", category: "planner", q: "What happens if I miss a day?", a: "The plan adapts. Missed tasks get redistributed across remaining days without overwhelming you. Your streak resets, but your overall progress is preserved. You can also manually mark tasks as skipped if a topic is already familiar." },

  // ════════════ ACCOUNT & SECURITY ════════════
  { id: "t1", category: "technical", q: "Is my data safe?", a: "Yes. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We use enterprise-grade authentication and database infrastructure that is SOC 2 compliant. We never sell your data, never use it for advertising, and never share it with third parties." },
  { id: "t2", category: "technical", q: "Can I delete my account and all data?", a: "Yes. Go to Settings → Danger Zone → Delete Account. All your resumes, interview transcripts, cover letters, study plans, and personal data are permanently and irreversibly deleted within 24 hours." },
  { id: "t3", category: "technical", q: "What browsers are supported?", a: "Chrome, Firefox, Safari, and Edge — all latest versions. Chrome is recommended for the best experience with voice-based mock interviews and the Chrome extension." },
  { id: "t4", category: "technical", q: "Do you use my resume to train AI models?", a: "No. Your resume and interview data are processed by AI to generate your personalised results, but they are never used to train, fine-tune, or improve any AI models. Your data is used exclusively to serve you." },
  { id: "t5", category: "technical", q: "How do I contact support?", a: "Email support@preciprocal.com or use the in-app support widget in Settings → Support. We respond within 24 hours on weekdays. Pro and Premium users get priority support." },
  { id: "t6", category: "technical", q: "Can I export my data?", a: "Yes. Go to Settings → Danger Zone → Export Data. You'll receive a download link via email within 24 hours containing all your interview transcripts, resume analyses, cover letters, and account data. This is your right under GDPR and CCPA." },
  { id: "t7", category: "technical", q: "Do I need a microphone for mock interviews?", a: "Yes — a microphone is required for voice-based mock interviews. Your built-in laptop mic works fine. No webcam is needed. Make sure your browser has microphone permissions enabled for app.preciprocal.com." },
  { id: "t8", category: "technical", q: "What happens to my data if I cancel?", a: "Your data remains accessible for 30 days after cancellation. After that, you drop to the free tier limits but your historical data (past analyses, interview transcripts) stays available read-only. You can export or delete it anytime." },
];

/**
 * Subset of FAQs shown on the landing page teaser (6 most common questions).
 * The full /faq page shows all FAQS.
 */
export const LANDING_FAQ_IDS = ["p1", "g5", "p2", "i1", "t1", "p5"] as const;

export const LANDING_FAQS = FAQS.filter((f) =>
  (LANDING_FAQ_IDS as readonly string[]).includes(f.id)
);