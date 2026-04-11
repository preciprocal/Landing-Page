export const APP_URL = "https://app.preciprocal.com";

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
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
    name: "Sarah K.",
    role: "Software Engineer → Google",
    text: "I'd been rejected from 40+ companies before Preciprocal. The mock interviews showed me I was bombing the behavioral rounds without knowing it. 6 weeks later — Google offer in hand. I still can't believe it.",
    avatar: "SK",
  },
  {
    name: "Marcus J.",
    role: "Product Manager → Meta",
    text: "The resume analyser was brutal in the best way. It showed me my resume was getting auto-rejected by ATS systems. After the rewrites, my callback rate went from 5% to 40% in two weeks. Two. Weeks.",
    avatar: "MJ",
  },
  {
    name: "Priya R.",
    role: "Data Scientist → Amazon",
    text: "I was spending 3 hours a day bouncing between LeetCode, resume edits, and application tracking spreadsheets. Preciprocal put everything in one place and gave me my evenings back. The study planner kept me honest.",
    avatar: "PR",
  },
  {
    name: "Alex C.",
    role: "UX Designer → Spotify",
    text: "Every cover letter I wrote felt fake. Preciprocal's generator actually captured my voice — a recruiter at Spotify said my application stood out because it felt 'refreshingly personal.' That was AI. Wild.",
    avatar: "AC",
  },
  {
    name: "David L.",
    role: "Backend Engineer → Stripe",
    text: "The Find Contacts feature is insane. It found the hiring manager's email at Stripe and wrote a cold email so good I thought a human wrote it. Got a response in 2 hours. Interview the next week. Offer the week after.",
    avatar: "DL",
  },
  {
    name: "Nina T.",
    role: "New Grad → Microsoft",
    text: "As a fresh graduate with zero interview experience, I was terrified. The multi-interviewer simulation made me practice until answering felt natural. By my Microsoft loop, I was the calmest person in the room.",
    avatar: "NT",
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
      { label: "FAQ", href: "#" },
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