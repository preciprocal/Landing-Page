// =============================================================================
// lib/constants.ts  -  SINGLE SOURCE OF TRUTH
//
// Sections:
//   1. SITE CONFIG
//   2. NAVIGATION
//   3. FEATURES / STEPS / PLANS / STATS / UI
//   4. TESTIMONIALS
//   5. ROLE INTERVIEW DATA  (meta + Q&As - ALL roles, not just tech)
//   6. COMPANY PREP DATA
//   7. BLOG POSTS
//   8. FAQ DATA
// =============================================================================

// --- 1. SITE CONFIG ----------------------------------------------------------

export const APP_URL  = "https://app.preciprocal.com";
export const SITE_URL = "https://preciprocal.com";

// --- 2. NAVIGATION -----------------------------------------------------------

export const NAV_LINKS = [
  { label: "Features",     href: "/#features" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Pricing",      href: "/#pricing" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ",          href: "/faq" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features",         href: "/#features" },
      { label: "Pricing",          href: "/#pricing" },
      { label: "Free ATS Checker", href: "/free-ats-checker" },
      { label: "Chrome Extension", href: "/#features" },
    ],
  },
  {
    title: "Interview Prep",
    links: [
      { label: "All Roles",         href: "/interview-questions" },
      { label: "All Companies",     href: "/interview-prep" },
      { label: "Software Engineer", href: "/interview-questions/software-engineer" },
      { label: "Google Prep",       href: "/interview-prep/google" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog",           href: "/blog" },
      { label: "FAQ",            href: "/faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms",          href: "/terms" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",   href: "/#features" },
      { label: "Contact", href: "mailto:support@preciprocal.com" },
      { label: "Support", href: "mailto:support@preciprocal.com" },
    ],
  },
] as const;

// --- 3. FEATURES / STEPS / PLANS / STATS / UI --------------------------------

export const FEATURES = [
  { id: "interviews",   title: "AI Mock Interviews",      icon: "mic"      as const, gradient: "from-indigo-500 to-purple-500", description: "Practice with a panel of AI interviewers who push back, ask follow-ups, and score you like a real hiring committee, so you walk in calm, not clueless." },
  { id: "resume",       title: "Resume Analyser",         icon: "file"     as const, gradient: "from-blue-500 to-cyan-500",    description: "See your resume through a recruiter's eyes: ATS score, 6-second scan simulation, and line-by-line rewrites that turn vague bullets into quantified impact." },
  { id: "cover-letter", title: "Cover Letter Generator",  icon: "pen"      as const, gradient: "from-purple-500 to-pink-500",  description: "Stop staring at a blank page. Our AI researches the company, matches your experience to the role, and writes a letter that sounds like you, not a robot." },
  { id: "planner",      title: "Study Planner",           icon: "calendar" as const, gradient: "from-emerald-500 to-cyan-500", description: "Get a personalised day-by-day prep schedule that adapts when life happens. Miss a day? It rebalances. Fall behind? It reprioritises. No guilt, just progress." },
  { id: "tracker",      title: "Job Tracker",             icon: "kanban"   as const, gradient: "from-amber-500 to-red-500",    description: "Replace the spreadsheet you hate. Kanban pipeline, automatic status tracking, contact finder, and AI-written outreach emails, all from one dashboard." },
  { id: "extension",    title: "Chrome Extension",        icon: "chrome"   as const, gradient: "from-indigo-500 to-blue-500",  description: "See a job on LinkedIn? One click imports it to your tracker, generates a tailored cover letter, and queues up interview prep, before you even close the tab." },
] as const;

export const STEPS = [
  { number: "01", title: "Upload Your Resume",                description: "Drop your resume and watch our AI tear it apart (lovingly). You'll see exactly what ATS systems see, what recruiters skip, and what's costing you callbacks, with fixes you can apply in one click." },
  { number: "02", title: "Practice Until It's Muscle Memory", description: "Run voice-based mock interviews with AI panelists who actually challenge you. Get scored on communication, technical depth, and structure, not just right/wrong answers. The nerves disappear when you've done it 20 times." },
  { number: "03", title: "Apply Smarter, Not Harder",          description: "Generate tailored cover letters in seconds. Track every application on a Kanban board. Find hiring contacts with real emails. Send personalised outreach that gets replies, not silence." },
] as const;

export const PLANS = [
  { id: "free",       name: "Free",       price: "Free",    period: "",        tagline: "Get started and feel the value.",              cta: "Get started free",  ctaHref: "/sign-up",              highlighted: false, mostPopular: false, features: ["5 resume analyses / month","5 cover letters / month","2 LinkedIn optimisations / month","1 interview debrief / month","2 find contacts / month","3 mock interviews / month","Job tracker (10 jobs)","Chrome extension (limited)","Basic analytics"] },
  { id: "pro",        name: "Pro",        price: "$9.99",   period: "/ month", tagline: "Everything you need to land the role.",        cta: "Start Pro free",    ctaHref: "/sign-up?plan=pro",     highlighted: true,  mostPopular: true,  features: ["20 resume analyses / month","30 mock interviews / month","Unlimited cover letters","Full resume editor (PDF + Word export)","Recruiter eye simulation","Candidate benchmarking","Interview intelligence","Full analytics dashboard","LinkedIn optimiser (10/mo)","Cold outreach generator","Interview debrief journal","Contact finder (20/mo)","Job tracker (unlimited)","Chrome extension (full)","Priority support"] },
  { id: "premium",    name: "Premium",    price: "$24.99",  period: "/ month", tagline: "For serious job seekers who won't settle.",    cta: "Go Premium",        ctaHref: "/sign-up?plan=premium", highlighted: false, mostPopular: false, features: ["Everything in Pro","Unlimited resume analyses","Unlimited mock interviews","Company-specific interview prep","Advanced AI study planner","LinkedIn profile full rewrite","Unlimited contact finder","Dedicated priority support","Early access to new features"] },
  { id: "enterprise", name: "Enterprise", price: "Custom",  period: "",        tagline: "For universities, bootcamps & career centres.", cta: "Contact us",        ctaHref: "mailto:hello@preciprocal.com", highlighted: false, mostPopular: false, features: ["Everything in Premium","Unlimited seats across your org","Custom AI interview tracks per role","Dedicated account manager","Flexible invoice billing","GDPR & CCPA ready","Custom DPA available","Pricing based on team size & needs"] },
] as const;

export const STATS = [
  { value: "11",     label: "Career tools in one platform" },
  { value: "150+",   label: "Interview types covered" },
  { value: "$9.99",  label: "Per month, no hidden fees" },
  { value: "30-day", label: "Money-back guarantee" },
] as const;

export const UNIVERSITY_LOGOS = [
  "Stanford","MIT","Harvard","Berkeley","Columbia","NYU","Georgia Tech","UT Austin",
  "Carnegie Mellon","Michigan","Yale","Princeton","Cornell","UCLA","UPenn","Duke",
  "Northwestern","Caltech","Brown","USC","Purdue","Virginia Tech","Illinois",
  "UW Madison","Ohio State","Boston University","Rice","Northeastern","Emory","Vanderbilt",
];

// --- 4. TESTIMONIALS ---------------------------------------------------------
// Leave empty until you have verified real-user quotes (FTC 16 CFR Part 255).

export const TESTIMONIALS: { name: string; role: string; text: string; avatar: string }[] = [];

// =============================================================================
// 5. ROLE INTERVIEW DATA
// =============================================================================

export type RoleSlug =
  // Engineering
  | "software-engineer" | "frontend-developer" | "backend-developer"
  | "full-stack-developer" | "ios-developer" | "android-developer"
  | "machine-learning-engineer" | "devops-engineer" | "cloud-engineer"
  | "site-reliability-engineer" | "cybersecurity-analyst" | "data-engineer"
  // Data & Analytics
  | "data-scientist" | "data-analyst"
  // Product & Design
  | "product-manager" | "ux-designer" | "technical-program-manager"
  // Architecture & IT
  | "solutions-architect" | "it-manager"
  // Business & Operations
  | "business-analyst" | "project-manager" | "operations-manager"
  | "supply-chain-analyst" | "management-consultant"
  // Finance & Accounting
  | "financial-analyst" | "investment-banker" | "accounting-manager"
  | "fp-and-a-analyst"
  // Sales & Marketing
  | "marketing-manager" | "digital-marketing-specialist" | "sales-manager"
  | "account-executive" | "growth-hacker" | "brand-manager"
  // People & HR
  | "hr-manager" | "recruiter" | "talent-acquisition-specialist"
  // Healthcare
  | "healthcare-administrator" | "clinical-data-analyst"
  // Legal
  | "paralegal" | "compliance-analyst";

export interface RoleDisplay {
  name: string;
  category: string;
  icon: string;
}

export const ROLE_DISPLAY: Record<string, RoleDisplay> = {
  // Engineering
  "software-engineer":          { name: "Software Engineer",           category: "Engineering",         icon: "💻" },
  "frontend-developer":         { name: "Frontend Developer",          category: "Engineering",         icon: "🎨" },
  "backend-developer":          { name: "Backend Developer",           category: "Engineering",         icon: "⚙️" },
  "full-stack-developer":       { name: "Full-Stack Developer",        category: "Engineering",         icon: "🔧" },
  "ios-developer":              { name: "iOS Developer",               category: "Engineering",         icon: "📱" },
  "android-developer":          { name: "Android Developer",           category: "Engineering",         icon: "🤖" },
  "machine-learning-engineer":  { name: "ML Engineer",                 category: "Engineering",         icon: "🧠" },
  "devops-engineer":            { name: "DevOps Engineer",             category: "Engineering",         icon: "🚀" },
  "cloud-engineer":             { name: "Cloud Engineer",              category: "Engineering",         icon: "☁️" },
  "site-reliability-engineer":  { name: "Site Reliability Engineer",   category: "Engineering",         icon: "🛡️" },
  "cybersecurity-analyst":      { name: "Cybersecurity Analyst",       category: "Engineering",         icon: "🔒" },
  "data-engineer":              { name: "Data Engineer",               category: "Engineering",         icon: "🗄️" },
  // Data & Analytics
  "data-scientist":             { name: "Data Scientist",              category: "Data & Analytics",    icon: "📊" },
  "data-analyst":               { name: "Data Analyst",                category: "Data & Analytics",    icon: "📈" },
  // Product & Design
  "product-manager":            { name: "Product Manager",             category: "Product & Design",    icon: "🎯" },
  "ux-designer":                { name: "UX Designer",                 category: "Product & Design",    icon: "✏️" },
  "technical-program-manager":  { name: "Technical Program Manager",   category: "Product & Design",    icon: "📋" },
  // Architecture & IT
  "solutions-architect":        { name: "Solutions Architect",         category: "Architecture & IT",   icon: "🏗️" },
  "it-manager":                 { name: "IT Manager",                  category: "Architecture & IT",   icon: "🖥️" },
  // Business & Operations
  "business-analyst":           { name: "Business Analyst",            category: "Business & Ops",      icon: "📑" },
  "project-manager":            { name: "Project Manager",             category: "Business & Ops",      icon: "📅" },
  "operations-manager":         { name: "Operations Manager",          category: "Business & Ops",      icon: "⚡" },
  "supply-chain-analyst":       { name: "Supply Chain Analyst",        category: "Business & Ops",      icon: "🔗" },
  "management-consultant":      { name: "Management Consultant",       category: "Business & Ops",      icon: "🏢" },
  // Finance & Accounting
  "financial-analyst":          { name: "Financial Analyst",           category: "Finance",             icon: "💰" },
  "investment-banker":          { name: "Investment Banker",           category: "Finance",             icon: "📉" },
  "accounting-manager":         { name: "Accounting Manager",          category: "Finance",             icon: "🧾" },
  "fp-and-a-analyst":           { name: "FP&A Analyst",                category: "Finance",             icon: "📐" },
  // Sales & Marketing
  "marketing-manager":          { name: "Marketing Manager",           category: "Sales & Marketing",   icon: "📣" },
  "digital-marketing-specialist":{ name: "Digital Marketing Specialist",category: "Sales & Marketing",  icon: "📲" },
  "sales-manager":              { name: "Sales Manager",               category: "Sales & Marketing",   icon: "🤝" },
  "account-executive":          { name: "Account Executive",           category: "Sales & Marketing",   icon: "💼" },
  "growth-hacker":              { name: "Growth Marketer",             category: "Sales & Marketing",   icon: "📊" },
  "brand-manager":              { name: "Brand Manager",               category: "Sales & Marketing",   icon: "🎖️" },
  // People & HR
  "hr-manager":                 { name: "HR Manager",                  category: "People & HR",         icon: "👥" },
  "recruiter":                  { name: "Recruiter",                   category: "People & HR",         icon: "🔍" },
  "talent-acquisition-specialist":{ name: "Talent Acquisition",        category: "People & HR",         icon: "🌟" },
  // Healthcare
  "healthcare-administrator":   { name: "Healthcare Administrator",    category: "Healthcare",          icon: "🏥" },
  "clinical-data-analyst":      { name: "Clinical Data Analyst",       category: "Healthcare",          icon: "🩺" },
  // Legal
  "paralegal":                  { name: "Paralegal",                   category: "Legal",               icon: "⚖️" },
  "compliance-analyst":         { name: "Compliance Analyst",          category: "Legal",               icon: "📜" },
};

export const ALL_ROLE_CATEGORIES = [
  "Engineering", "Data & Analytics", "Product & Design", "Architecture & IT",
  "Business & Ops", "Finance", "Sales & Marketing", "People & HR", "Healthcare", "Legal",
];

export const ALL_ROLES = Object.keys(ROLE_DISPLAY) as RoleSlug[];

export interface RoleMeta {
  title: string;
  h1: string;
  description: string;
  salaryRange: string;
  topCompanies: string[];
  relatedRoles: RoleSlug[];
}

export const ROLE_META: Record<string, RoleMeta> = {
  // Engineering
  "software-engineer":          { title: "Software Engineer Interview Questions (2026) | Preciprocal",           h1: "Software Engineer Interview Questions & Answers (2026)",           description: "Top 30 software engineer interview questions covering data structures, algorithms, system design, and behavioral questions.",                               salaryRange: "$120,000 - $220,000", topCompanies: ["Google","Amazon","Meta","Microsoft","Apple","Stripe"],       relatedRoles: ["frontend-developer","backend-developer","full-stack-developer"] },
  "frontend-developer":         { title: "Frontend Developer Interview Questions (2026) | Preciprocal",          h1: "Frontend Developer Interview Questions & Answers (2026)",          description: "Top 30 frontend interview questions on JavaScript, React, CSS, performance, accessibility, and UI system design.",                                         salaryRange: "$100,000 - $190,000", topCompanies: ["Google","Meta","Airbnb","Shopify","Stripe","Figma"],         relatedRoles: ["software-engineer","full-stack-developer","ux-designer"] },
  "backend-developer":          { title: "Backend Developer Interview Questions (2026) | Preciprocal",           h1: "Backend Developer Interview Questions & Answers (2026)",           description: "Top 30 backend developer interview questions on APIs, databases, distributed systems, and performance optimization.",                                       salaryRange: "$110,000 - $200,000", topCompanies: ["Google","Amazon","Stripe","Uber","LinkedIn","Databricks"],   relatedRoles: ["software-engineer","full-stack-developer","site-reliability-engineer"] },
  "full-stack-developer":       { title: "Full-Stack Developer Interview Questions (2026) | Preciprocal",        h1: "Full-Stack Developer Interview Questions & Answers (2026)",        description: "Top 30 full-stack developer interview questions covering frontend, backend, databases, and deployment.",                                                  salaryRange: "$105,000 - $195,000", topCompanies: ["Shopify","Atlassian","Stripe","GitHub","Vercel","Linear"],   relatedRoles: ["frontend-developer","backend-developer","software-engineer"] },
  "ios-developer":              { title: "iOS Developer Interview Questions (2026) | Preciprocal",               h1: "iOS Developer Interview Questions & Answers (2026)",               description: "Top 30 iOS developer interview questions on Swift, UIKit, SwiftUI, Xcode, performance, and App Store best practices.",                                   salaryRange: "$110,000 - $195,000", topCompanies: ["Apple","Spotify","Airbnb","Uber","Lyft","Robinhood"],        relatedRoles: ["android-developer","software-engineer","full-stack-developer"] },
  "android-developer":          { title: "Android Developer Interview Questions (2026) | Preciprocal",           h1: "Android Developer Interview Questions & Answers (2026)",           description: "Top 30 Android developer interview questions on Kotlin, Jetpack Compose, Android architecture, and Play Store submission.",                               salaryRange: "$105,000 - $190,000", topCompanies: ["Google","Samsung","Spotify","Airbnb","Uber","Meta"],         relatedRoles: ["ios-developer","software-engineer","full-stack-developer"] },
  "machine-learning-engineer":  { title: "Machine Learning Engineer Interview Questions (2026) | Preciprocal",   h1: "Machine Learning Engineer Interview Questions & Answers (2026)",   description: "Top 30 ML engineer interview questions on model deployment, MLOps, deep learning, feature engineering, and production systems.",                         salaryRange: "$140,000 - $280,000", topCompanies: ["Google","OpenAI","Anthropic","Meta","DeepMind","NVIDIA"],    relatedRoles: ["data-scientist","data-engineer","software-engineer"] },
  "devops-engineer":            { title: "DevOps Engineer Interview Questions (2026) | Preciprocal",             h1: "DevOps Engineer Interview Questions & Answers (2026)",             description: "Top 30 DevOps interview questions on CI/CD, Kubernetes, Docker, cloud infrastructure, monitoring, and SRE practices.",                                  salaryRange: "$120,000 - $210,000", topCompanies: ["Google","Amazon","Microsoft","HashiCorp","Datadog","Cloudflare"], relatedRoles: ["site-reliability-engineer","cloud-engineer","backend-developer"] },
  "cloud-engineer":             { title: "Cloud Engineer Interview Questions (2026) | Preciprocal",              h1: "Cloud Engineer Interview Questions & Answers (2026)",              description: "Top 30 cloud engineer interview questions on AWS, Azure, GCP, infrastructure as code, and cloud architecture patterns.",                                  salaryRange: "$115,000 - $205,000", topCompanies: ["Amazon","Microsoft","Google","Oracle","Accenture","Deloitte"], relatedRoles: ["devops-engineer","solutions-architect","site-reliability-engineer"] },
  "site-reliability-engineer":  { title: "Site Reliability Engineer Interview Questions (2026) | Preciprocal",   h1: "Site Reliability Engineer (SRE) Interview Questions & Answers (2026)", description: "Top 30 SRE interview questions on reliability, incident management, SLOs/SLAs, on-call practices, and production systems.",                             salaryRange: "$130,000 - $230,000", topCompanies: ["Google","Facebook","Netflix","LinkedIn","Uber","Cloudflare"], relatedRoles: ["devops-engineer","cloud-engineer","backend-developer"] },
  "cybersecurity-analyst":      { title: "Cybersecurity Analyst Interview Questions (2026) | Preciprocal",       h1: "Cybersecurity Analyst Interview Questions & Answers (2026)",       description: "Top 30 cybersecurity interview questions covering threat analysis, penetration testing, incident response, and security frameworks.",                      salaryRange: "$90,000 - $170,000",  topCompanies: ["CrowdStrike","Palo Alto Networks","Microsoft","Amazon","IBM","Deloitte"], relatedRoles: ["cloud-engineer","it-manager","compliance-analyst"] },
  "data-engineer":              { title: "Data Engineer Interview Questions (2026) | Preciprocal",               h1: "Data Engineer Interview Questions & Answers (2026)",               description: "Top 30 data engineer interview questions on pipelines, Spark, Kafka, SQL, data modeling, and cloud data warehouses.",                                    salaryRange: "$115,000 - $200,000", topCompanies: ["Databricks","Snowflake","Airbnb","Uber","LinkedIn","Spotify"], relatedRoles: ["data-scientist","data-analyst","machine-learning-engineer"] },
  // Data & Analytics
  "data-scientist":             { title: "Data Scientist Interview Questions (2026) | Preciprocal",              h1: "Data Scientist Interview Questions & Answers (2026)",              description: "Top 30 data scientist interview questions covering statistics, ML, Python, SQL, A/B testing, and case studies.",                                           salaryRange: "$110,000 - $200,000", topCompanies: ["Google","Meta","Netflix","Airbnb","Uber","Spotify"],         relatedRoles: ["machine-learning-engineer","data-analyst","data-engineer"] },
  "data-analyst":               { title: "Data Analyst Interview Questions (2026) | Preciprocal",               h1: "Data Analyst Interview Questions & Answers (2026)",                description: "Top 30 data analyst interview questions on SQL, Python, statistics, data visualization, and business metrics.",                                          salaryRange: "$70,000 - $140,000",  topCompanies: ["Google","Amazon","Meta","Airbnb","Spotify","Netflix"],       relatedRoles: ["data-scientist","business-analyst","data-engineer"] },
  // Product & Design
  "product-manager":            { title: "Product Manager Interview Questions (2026) | Preciprocal",             h1: "Product Manager Interview Questions & Answers (2026)",             description: "Top 30 PM interview questions with frameworks and example answers on product sense, metrics, estimation, strategy, and behavioral questions.",             salaryRange: "$130,000 - $250,000", topCompanies: ["Google","Meta","Amazon","Microsoft","Airbnb","Spotify"],     relatedRoles: ["technical-program-manager","ux-designer","data-analyst"] },
  "ux-designer":                { title: "UX Designer Interview Questions (2026) | Preciprocal",                 h1: "UX Designer Interview Questions & Answers (2026)",                 description: "Top 30 UX designer interview questions on design process, research methods, prototyping, portfolio reviews, and stakeholder management.",                 salaryRange: "$90,000 - $170,000",  topCompanies: ["Google","Apple","Figma","Airbnb","Shopify","Meta"],          relatedRoles: ["product-manager","frontend-developer","solutions-architect"] },
  "technical-program-manager":  { title: "Technical Program Manager Interview Questions (2026) | Preciprocal",  h1: "Technical Program Manager Interview Questions & Answers (2026)",  description: "Top 30 TPM interview questions on cross-functional execution, program planning, risk management, and technical stakeholder alignment.",                  salaryRange: "$140,000 - $240,000", topCompanies: ["Google","Amazon","Microsoft","Meta","Apple","LinkedIn"],      relatedRoles: ["product-manager","project-manager","solutions-architect"] },
  // Architecture & IT
  "solutions-architect":        { title: "Solutions Architect Interview Questions (2026) | Preciprocal",        h1: "Solutions Architect Interview Questions & Answers (2026)",         description: "Top 30 solutions architect interview questions on cloud architecture, system design, technical sales, and enterprise integration patterns.",              salaryRange: "$130,000 - $230,000", topCompanies: ["Amazon","Microsoft","Google","Salesforce","Oracle","IBM"],   relatedRoles: ["cloud-engineer","technical-program-manager","devops-engineer"] },
  "it-manager":                 { title: "IT Manager Interview Questions (2026) | Preciprocal",                 h1: "IT Manager Interview Questions & Answers (2026)",                  description: "Top 30 IT manager interview questions on infrastructure management, team leadership, vendor negotiation, budgeting, and IT strategy.",                   salaryRange: "$85,000 - $155,000",  topCompanies: ["IBM","Accenture","Deloitte","Microsoft","Google","Amazon"],  relatedRoles: ["solutions-architect","cybersecurity-analyst","cloud-engineer"] },
  // Business & Operations
  "business-analyst":           { title: "Business Analyst Interview Questions (2026) | Preciprocal",           h1: "Business Analyst Interview Questions & Answers (2026)",            description: "Top 30 business analyst interview questions on requirements gathering, process mapping, stakeholder management, SQL, and data visualization.",             salaryRange: "$75,000 - $140,000",  topCompanies: ["McKinsey","Deloitte","Accenture","IBM","Salesforce","JPMorgan"], relatedRoles: ["data-analyst","project-manager","product-manager"] },
  "project-manager":            { title: "Project Manager Interview Questions (2026) | Preciprocal",            h1: "Project Manager Interview Questions & Answers (2026)",             description: "Top 30 project manager interview questions on Agile, Scrum, stakeholder management, risk, scope, and PMP certification topics.",                         salaryRange: "$85,000 - $160,000",  topCompanies: ["Google","Amazon","Microsoft","Salesforce","IBM","Accenture"], relatedRoles: ["technical-program-manager","product-manager","business-analyst"] },
  "operations-manager":         { title: "Operations Manager Interview Questions (2026) | Preciprocal",         h1: "Operations Manager Interview Questions & Answers (2026)",          description: "Top 30 operations manager interview questions on process improvement, team leadership, KPI management, and cross-functional execution.",                  salaryRange: "$80,000 - $150,000",  topCompanies: ["Amazon","Google","Apple","Target","Walmart","Goldman Sachs"], relatedRoles: ["project-manager","business-analyst","supply-chain-analyst"] },
  "supply-chain-analyst":       { title: "Supply Chain Analyst Interview Questions (2026) | Preciprocal",       h1: "Supply Chain Analyst Interview Questions & Answers (2026)",        description: "Top 30 supply chain interview questions on logistics, demand forecasting, inventory management, procurement, and ERP systems.",                          salaryRange: "$65,000 - $130,000",  topCompanies: ["Amazon","Apple","Walmart","Target","McKinsey","Deloitte"],   relatedRoles: ["operations-manager","business-analyst","financial-analyst"] },
  "management-consultant":      { title: "Management Consultant Interview Questions (2026) | Preciprocal",      h1: "Management Consultant Interview Questions & Answers (2026)",       description: "Top 30 consulting interview questions, case frameworks, market sizing, profitability analysis, and behavioral questions for McKinsey, BCG, and Bain.",    salaryRange: "$90,000 - $200,000",  topCompanies: ["McKinsey","BCG","Bain","Deloitte","Accenture","Oliver Wyman"], relatedRoles: ["business-analyst","financial-analyst","project-manager"] },
  // Finance & Accounting
  "financial-analyst":          { title: "Financial Analyst Interview Questions (2026) | Preciprocal",          h1: "Financial Analyst Interview Questions & Answers (2026)",           description: "Top 30 financial analyst interview questions on financial modeling, DCF valuation, Excel, accounting, and financial statement analysis.",                 salaryRange: "$70,000 - $140,000",  topCompanies: ["Goldman Sachs","JPMorgan","Morgan Stanley","BlackRock","Fidelity","Deloitte"], relatedRoles: ["investment-banker","fp-and-a-analyst","business-analyst"] },
  "investment-banker":          { title: "Investment Banking Interview Questions (2026) | Preciprocal",         h1: "Investment Banking Interview Questions & Answers (2026)",          description: "Top 30 investment banking interview questions, technical (LBO, DCF, M&A), behaviorals, and market questions for bulge bracket and boutique banks.",       salaryRange: "$110,000 - $250,000", topCompanies: ["Goldman Sachs","Morgan Stanley","JPMorgan","Lazard","Evercore","Jefferies"], relatedRoles: ["financial-analyst","management-consultant","fp-and-a-analyst"] },
  "accounting-manager":         { title: "Accounting Manager Interview Questions (2026) | Preciprocal",         h1: "Accounting Manager Interview Questions & Answers (2026)",          description: "Top 30 accounting manager interview questions on GAAP, month-end close, financial reporting, internal controls, and team management.",                   salaryRange: "$80,000 - $140,000",  topCompanies: ["Deloitte","PwC","KPMG","EY","Amazon","Google"],              relatedRoles: ["financial-analyst","fp-and-a-analyst","business-analyst"] },
  "fp-and-a-analyst":           { title: "FP&A Analyst Interview Questions (2026) | Preciprocal",               h1: "FP&A Analyst Interview Questions & Answers (2026)",                description: "Top 30 FP&A interview questions on budgeting, forecasting, variance analysis, financial modeling, and business partnering.",                             salaryRange: "$80,000 - $150,000",  topCompanies: ["Google","Amazon","Meta","Apple","Goldman Sachs","Salesforce"], relatedRoles: ["financial-analyst","accounting-manager","business-analyst"] },
  // Sales & Marketing
  "marketing-manager":          { title: "Marketing Manager Interview Questions (2026) | Preciprocal",          h1: "Marketing Manager Interview Questions & Answers (2026)",           description: "Top 30 marketing manager interview questions on strategy, campaign management, analytics, brand positioning, and cross-functional collaboration.",         salaryRange: "$80,000 - $160,000",  topCompanies: ["Google","Meta","HubSpot","Salesforce","Amazon","Apple"],     relatedRoles: ["digital-marketing-specialist","brand-manager","product-manager"] },
  "digital-marketing-specialist":{ title: "Digital Marketing Interview Questions (2026) | Preciprocal",         h1: "Digital Marketing Specialist Interview Questions & Answers (2026)", description: "Top 30 digital marketing interview questions on SEO, SEM, paid social, email marketing, analytics, and conversion optimization.",                       salaryRange: "$60,000 - $120,000",  topCompanies: ["Google","Meta","HubSpot","Salesforce","Shopify","Adobe"],    relatedRoles: ["marketing-manager","growth-hacker","brand-manager"] },
  "sales-manager":              { title: "Sales Manager Interview Questions (2026) | Preciprocal",              h1: "Sales Manager Interview Questions & Answers (2026)",               description: "Top 30 sales manager interview questions on pipeline management, quota attainment, team coaching, CRM, and enterprise sales strategy.",                  salaryRange: "$90,000 - $180,000",  topCompanies: ["Salesforce","HubSpot","Microsoft","Oracle","SAP","Workday"], relatedRoles: ["account-executive","marketing-manager","business-analyst"] },
  "account-executive":          { title: "Account Executive Interview Questions (2026) | Preciprocal",          h1: "Account Executive Interview Questions & Answers (2026)",           description: "Top 30 AE interview questions on B2B sales methodology, discovery calls, objection handling, negotiation, and closing enterprise deals.",                salaryRange: "$80,000 - $200,000",  topCompanies: ["Salesforce","HubSpot","Stripe","Snowflake","Databricks","Figma"], relatedRoles: ["sales-manager","marketing-manager","growth-hacker"] },
  "growth-hacker":              { title: "Growth Marketer Interview Questions (2026) | Preciprocal",            h1: "Growth Marketer Interview Questions & Answers (2026)",             description: "Top 30 growth marketer interview questions on acquisition funnels, A/B testing, viral loops, retention, and data-driven experimentation.",                salaryRange: "$80,000 - $160,000",  topCompanies: ["Airbnb","Dropbox","Spotify","Slack","HubSpot","Intercom"],   relatedRoles: ["marketing-manager","digital-marketing-specialist","product-manager"] },
  "brand-manager":              { title: "Brand Manager Interview Questions (2026) | Preciprocal",              h1: "Brand Manager Interview Questions & Answers (2026)",               description: "Top 30 brand manager interview questions on brand strategy, consumer insights, go-to-market planning, budget management, and creative execution.",        salaryRange: "$75,000 - $145,000",  topCompanies: ["P&G","Unilever","Nike","Apple","Google","LVMH"],             relatedRoles: ["marketing-manager","digital-marketing-specialist","product-manager"] },
  // People & HR
  "hr-manager":                 { title: "HR Manager Interview Questions (2026) | Preciprocal",                 h1: "HR Manager Interview Questions & Answers (2026)",                  description: "Top 30 HR manager interview questions on employee relations, performance management, talent development, compliance, and HR strategy.",                   salaryRange: "$75,000 - $140,000",  topCompanies: ["Google","Amazon","Microsoft","IBM","Deloitte","Accenture"],  relatedRoles: ["recruiter","talent-acquisition-specialist","operations-manager"] },
  "recruiter":                  { title: "Recruiter Interview Questions (2026) | Preciprocal",                  h1: "Recruiter Interview Questions & Answers (2026)",                   description: "Top 30 recruiter interview questions on sourcing strategies, candidate assessment, ATS tools, offer negotiation, and employer branding.",                 salaryRange: "$55,000 - $110,000",  topCompanies: ["LinkedIn","Google","Amazon","Korn Ferry","Spencer Stuart","Heidrick & Struggles"], relatedRoles: ["hr-manager","talent-acquisition-specialist","account-executive"] },
  "talent-acquisition-specialist":{ title: "Talent Acquisition Specialist Interview Questions (2026) | Preciprocal", h1: "Talent Acquisition Specialist Interview Questions & Answers (2026)", description: "Top 30 talent acquisition interview questions on full-cycle recruiting, pipeline building, diversity hiring, and candidate experience.",             salaryRange: "$60,000 - $115,000",  topCompanies: ["Google","Amazon","Microsoft","Meta","Salesforce","Stripe"], relatedRoles: ["recruiter","hr-manager","operations-manager"] },
  // Healthcare
  "healthcare-administrator":   { title: "Healthcare Administrator Interview Questions (2026) | Preciprocal",   h1: "Healthcare Administrator Interview Questions & Answers (2026)",   description: "Top 30 healthcare administrator interview questions on hospital operations, regulatory compliance, healthcare finance, and patient experience.",           salaryRange: "$75,000 - $150,000",  topCompanies: ["Mayo Clinic","Kaiser Permanente","HCA Healthcare","CVS Health","UnitedHealth","Optum"], relatedRoles: ["operations-manager","business-analyst","compliance-analyst"] },
  "clinical-data-analyst":      { title: "Clinical Data Analyst Interview Questions (2026) | Preciprocal",      h1: "Clinical Data Analyst Interview Questions & Answers (2026)",       description: "Top 30 clinical data analyst interview questions on healthcare data, SQL, EHR systems, HIPAA compliance, and biostatistics.",                             salaryRange: "$70,000 - $130,000",  topCompanies: ["Optum","Epic","Cerner","Johnson & Johnson","Pfizer","Roche"], relatedRoles: ["data-analyst","healthcare-administrator","compliance-analyst"] },
  // Legal
  "paralegal":                  { title: "Paralegal Interview Questions (2026) | Preciprocal",                  h1: "Paralegal Interview Questions & Answers (2026)",                   description: "Top 30 paralegal interview questions on legal research, case management, document drafting, discovery, and working with attorneys.",                      salaryRange: "$50,000 - $90,000",   topCompanies: ["Skadden","Latham & Watkins","Kirkland & Ellis","Davis Polk","Sullivan & Cromwell","Cravath"], relatedRoles: ["compliance-analyst","business-analyst","project-manager"] },
  "compliance-analyst":         { title: "Compliance Analyst Interview Questions (2026) | Preciprocal",         h1: "Compliance Analyst Interview Questions & Answers (2026)",          description: "Top 30 compliance analyst interview questions on regulatory frameworks (SOX, GDPR, HIPAA), risk assessment, internal controls, and audit processes.",     salaryRange: "$65,000 - $120,000",  topCompanies: ["JPMorgan","Goldman Sachs","Bank of America","Deloitte","KPMG","PwC"], relatedRoles: ["legal-counsel","it-manager","cybersecurity-analyst"] as RoleSlug[] },
};

export function getRoleMeta(slug: string): RoleMeta {
  if (ROLE_META[slug]) return ROLE_META[slug];
  const fmt = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${fmt} Interview Questions (2026) | Preciprocal`,
    h1: `${fmt} Interview Questions & Answers (2026)`,
    description: `Top interview questions for ${fmt.toLowerCase()} roles with detailed answers, salary benchmarks, and preparation tips for 2026.`,
    salaryRange: "$60,000 - $130,000",
    topCompanies: ["Top employers in this field"],
    relatedRoles: ["business-analyst","project-manager"],
  };
}

export type RoleQA = { question: string; answer: string };

export const ROLE_QUESTIONS: Record<string, RoleQA[]> = {
  "software-engineer": [
    { question: "What is the difference between a process and a thread?",                     answer: "A process is an independent program with its own memory space. A thread is a unit of execution within a process that shares the process's memory. Processes are isolated; threads share heap memory but have their own stack. This makes threads faster to create and switch between, but requires synchronization to avoid race conditions." },
    { question: "Explain the four pillars of object-oriented programming.",                   answer: "The four pillars are: (1) Encapsulation: bundling data and methods together and restricting direct access; (2) Abstraction, hiding implementation details and exposing only what's necessary; (3) Inheritance, allowing a class to derive properties from a parent class; (4) Polymorphism, the ability for objects of different types to be treated as the same type through a common interface." },
    { question: "What is the time complexity of quicksort, and when does it degrade?",        answer: "Quicksort has average O(n log n) time complexity and worst-case O(n squared) when the pivot is consistently the smallest or largest element, this typically happens on already-sorted input with a naive pivot selection. To mitigate this, use median-of-three pivot selection or random pivot. Space complexity is O(log n) for the recursive call stack." },
    { question: "How does a hash map work internally?",                                       answer: "A hash map stores key-value pairs. When inserting, the key is run through a hash function that produces an integer index into an underlying array. If two keys hash to the same index (collision), common strategies are chaining (a linked list at each bucket) or open addressing (probing adjacent slots). Java's HashMap uses chaining and converts buckets to balanced trees (O(log n)) when they exceed 8 entries." },
    { question: "What is a deadlock and how do you prevent it?",                              answer: "A deadlock occurs when two or more threads are each waiting for a resource held by the other, creating a circular dependency. Prevention strategies: always acquire locks in a consistent global order, use lock timeouts, prefer lock-free data structures, or use a single resource manager." },
    { question: "Describe the CAP theorem.",                                                  answer: "CAP states that a distributed system can guarantee at most two of three properties: Consistency (every read returns the most recent write), Availability (every request receives a response), and Partition Tolerance. Since network partitions always occur in practice, real systems must choose between CP (e.g., HBase) or AP (e.g., Cassandra)." },
    { question: "What is the difference between SQL and NoSQL databases?",                    answer: "SQL (relational) databases use structured tables, enforce schemas, and support ACID transactions. NoSQL databases offer flexible schemas, horizontal scalability, and high throughput. Examples: PostgreSQL vs MongoDB, MySQL vs Redis." },
    { question: "How would you design a URL shortener like bit.ly?",                          answer: "Key components: (1) unique ID generator (base62 encode a counter or UUID), (2) key-value store mapping short code to long URL (Redis cache + database), (3) redirect service returning 301/302 responses. At scale, add CDN caching, rate limiting, analytics pipeline via async queue, and geographic distribution." },
    { question: "What is a REST API and what are its constraints?",                           answer: "REST is an architectural style with six constraints: client-server separation, statelessness, cacheability, uniform interface (standard HTTP methods + status codes), layered system, and optional code-on-demand. RESTful APIs use resources as URLs, HTTP verbs for actions, and typically communicate in JSON." },
    { question: "What are SOLID principles?",                                                 answer: "SOLID: Single Responsibility (one reason to change), Open/Closed (open for extension, closed for modification), Liskov Substitution (subtypes must be substitutable for their base type), Interface Segregation (prefer narrow interfaces), and Dependency Inversion (depend on abstractions, not concretions)." },
    { question: "How does garbage collection work in Java?",                                  answer: "Java's GC manages memory automatically using generational collection: short-lived objects go to Eden, surviving objects are promoted to Survivor then Old Gen. The GC identifies unreachable objects via reachability analysis from GC roots. Modern JVMs (G1, ZGC, Shenandoah) minimize stop-the-world pauses using concurrent collection." },
    { question: "What is Big O notation and why does it matter?",                             answer: "Big O notation describes the upper bound of an algorithm's time or space growth relative to input size, ignoring constants. O(1) is constant, O(log n) logarithmic, O(n) linear, O(n squared) quadratic. A O(n squared) algorithm processing 1M records is a billion operations vs O(n log n)'s 20M, the difference between 10 seconds and 0.1 seconds." },
    { question: "Describe the difference between synchronous and asynchronous programming.", answer: "Synchronous code executes line by line; each operation blocks until complete. Asynchronous code allows the program to continue while waiting for a long operation (I/O, network) to finish. Async patterns: callbacks, Promises, async/await (JavaScript), CompletableFuture (Java), asyncio (Python). Async is critical for I/O-bound tasks." },
    { question: "How would you optimize a slow database query?",                              answer: "First, use EXPLAIN/EXPLAIN ANALYZE to understand the query plan. Common fixes: add indexes on WHERE/JOIN/ORDER BY columns; avoid SELECT *; rewrite subqueries as JOINs; use query caching; paginate with cursor-based pagination; consider materialized views for aggregations; partition large tables; review N+1 query patterns in ORM code." },
    { question: "Tell me about a time you dealt with a production outage.",                   answer: "Structure with STAR: Situation (system context and what broke), Task (your role), Action (triage, diagnosis, mitigation, fix), Result (time to recovery, lessons, post-mortem). Interviewers want to see: calm under pressure, systematic debugging, clear communication, and blameless post-mortems." },
  ],

  "frontend-developer": [
    { question: "What is the difference between `let`, `const`, and `var` in JavaScript?",   answer: "`var` is function-scoped and hoisted. `let` and `const` are block-scoped and not hoisted. `const` prevents reassignment but not mutation of objects/arrays. Best practice: always use `const` by default, `let` when you need to reassign, never `var`." },
    { question: "Explain the JavaScript event loop.",                                         answer: "JavaScript is single-threaded. The event loop continuously checks the call stack; if it's empty, it moves tasks from the callback queue (or microtask queue for Promises) into the stack. Microtasks (Promises, queueMicrotask) run before macrotasks (setTimeout, setInterval). This allows async operations without blocking the main thread." },
    { question: "What is the virtual DOM and why does React use it?",                         answer: "The virtual DOM is an in-memory representation of the real DOM. When state changes, React re-renders the virtual DOM, diffs it against the previous version (reconciliation), and applies only the minimal set of real DOM changes. This batching approach is faster than direct DOM manipulation for most UI patterns." },
    { question: "What are React hooks and why were they introduced?",                         answer: "Hooks (useState, useEffect, useContext, etc.) let you use state and lifecycle features in functional components without writing classes. They were introduced in React 16.8 to solve problems with class components: confusing `this` binding, difficulty reusing stateful logic between components, and complex lifecycle methods." },
    { question: "How do you optimize the performance of a React application?",               answer: "Key strategies: React.memo to prevent unnecessary re-renders, useMemo/useCallback for expensive calculations and stable function references, code splitting with React.lazy and Suspense, virtualization for long lists (react-window), image optimization, avoiding anonymous functions in JSX, and profiling with React DevTools." },
    { question: "Explain CSS specificity.",                                                   answer: "Specificity determines which CSS rule applies when multiple rules target the same element. It's calculated as (inline styles, IDs, classes/attributes/pseudo-classes, elements). Inline styles beat everything. IDs beat classes. Classes beat elements. Equal specificity means last rule wins. `!important` overrides all specificity." },
    { question: "What is the difference between `==` and `===` in JavaScript?",              answer: "`==` performs type coercion before comparing (`'5' == 5` is true). `===` compares value AND type without coercion (`'5' === 5` is false). Always use `===` to avoid unexpected type coercion bugs. The only common exception: `x == null` checks for both `null` and `undefined`." },
    { question: "What are Web Vitals and how do you improve them?",                           answer: "Core Web Vitals are Google's user experience metrics: LCP (Largest Contentful Paint, loading, target under 2.5s), FID/INP (interaction responsiveness, target under 200ms), CLS (Cumulative Layout Shift, visual stability, target under 0.1). Improve LCP: optimize images, use CDN, preload critical resources. Reduce CLS: set explicit dimensions on images and embeds. Reduce INP: avoid long tasks, use web workers." },
    { question: "What is accessibility (a11y) and how do you implement it?",                 answer: "Web accessibility ensures people with disabilities can use your app. Key practices: semantic HTML (use `<button>` not `<div onClick>`), ARIA labels for non-semantic elements, keyboard navigation (tabindex, focus management), sufficient color contrast (WCAG AA = 4.5:1), alt text on images, and testing with screen readers (NVDA, VoiceOver)." },
    { question: "Explain the difference between server-side rendering and client-side rendering.", answer: "CSR (React default): browser downloads a minimal HTML shell, then JavaScript renders everything client-side. Slow initial load, good for highly interactive apps. SSR (Next.js getServerSideProps): server renders full HTML on each request. Fast initial load, good for SEO. SSG: pages rendered at build time. ISR: SSG with revalidation. Choose based on data freshness requirements vs performance trade-offs." },
  ],

  "backend-developer": [
    { question: "What is the difference between authentication and authorization?",           answer: "Authentication verifies who you are (login, JWT validation). Authorization verifies what you're allowed to do (role-based access, permissions). A common mistake is confusing them: a valid JWT proves identity but doesn't grant access, you still need to check if that identity has permission for the requested resource." },
    { question: "Explain ACID properties in databases.",                                      answer: "ACID: Atomicity (a transaction completes fully or not at all), Consistency (transaction brings database from one valid state to another), Isolation (concurrent transactions don't interfere with each other), Durability (committed transactions survive system failures). These properties prevent data corruption in multi-user systems." },
    { question: "What is N+1 query problem and how do you fix it?",                          answer: "N+1 occurs when you fetch N records then make 1 additional query per record, e.g., fetching 100 users then 100 separate queries for their posts. Fix with: SQL JOINs, eager loading (Eloquent's `with()`, Rails' `.includes()`), GraphQL DataLoader for batching, or denormalization. Always inspect your ORM's generated SQL in development." },
    { question: "How do you design a RESTful API?",                                          answer: "Key principles: use nouns for resources (not verbs), use HTTP methods semantically (GET=read, POST=create, PUT/PATCH=update, DELETE=delete), return appropriate status codes (200, 201, 400, 401, 403, 404, 500), use versioning (/v1/), implement pagination, use consistent error response format, and document with OpenAPI/Swagger." },
    { question: "What is database indexing and when should you use it?",                      answer: "An index is a data structure that speeds up lookups at the cost of write performance and storage. Add indexes on: columns in WHERE clauses, JOIN conditions, ORDER BY/GROUP BY, foreign keys, and high-cardinality columns used in filters. Don't index low-cardinality columns (boolean), columns rarely queried, or tables with very high write rates relative to reads." },
    { question: "What is caching and what are common caching strategies?",                   answer: "Caching stores computed results to avoid repeating expensive work. Strategies: Cache-Aside (app checks cache before DB, writes to cache on miss, most common), Write-Through (write to cache and DB simultaneously), Write-Behind (write to cache immediately, DB asynchronously), Read-Through (cache handles DB reads). Use Redis or Memcached. Key decisions: TTL, eviction policy (LRU/LFU), cache invalidation." },
    { question: "How do you handle database migrations in production?",                       answer: "Best practices: never deploy code and schema changes simultaneously (backward-compatible migrations first, then code, then cleanup); use expand-contract pattern for column renames; add NOT NULL columns with a default or in multiple steps; test migrations on a production-size snapshot; keep migrations idempotent; use tools like Flyway, Liquibase, or Rails migrations with version control." },
    { question: "What is a message queue and when would you use one?",                        answer: "A message queue (Kafka, RabbitMQ, SQS) decouples producers from consumers, enabling asynchronous processing. Use when: work is too slow for synchronous response (email sending, image processing), you need to absorb traffic spikes, multiple services need to react to the same event, or you need guaranteed delivery with retry logic. Trade-off: eventual consistency and increased system complexity." },
    { question: "Explain the difference between horizontal and vertical scaling.",           answer: "Vertical scaling adds more resources to an existing server (more CPU, RAM). Simple but has an upper limit and single point of failure. Horizontal scaling adds more servers. Requires load balancing, session management (stateless design or distributed sessions), and data consistency strategy. Most modern architectures scale horizontally using containerization (Docker/Kubernetes)." },
    { question: "What is rate limiting and how do you implement it?",                         answer: "Rate limiting restricts how often a client can call an API to prevent abuse and ensure fair use. Common algorithms: Token Bucket (smooth bursts), Leaky Bucket (constant rate), Fixed Window (simple but boundary bursting), Sliding Window (most accurate). Implementation: use Redis with atomic INCR/EXPIRE, or middleware like nginx's limit_req_module. Track by IP, API key, or user ID depending on context." },
  ],

  "data-scientist": [
    { question: "What is the difference between overfitting and underfitting?",               answer: "Overfitting: model learns training data too well including noise, performs poorly on new data (high variance). Underfitting: model too simple to capture the pattern (high bias). The bias-variance tradeoff: more complexity reduces bias but increases variance. Fix overfitting: regularization (L1/L2), dropout, early stopping, more data, cross-validation." },
    { question: "Explain the Central Limit Theorem and why it matters.",                      answer: "The CLT states that the distribution of sample means approaches a normal distribution as sample size increases (n >= 30), regardless of the population distribution. It justifies using z-tests and t-tests on non-normal data, underpins A/B testing statistics, and means we can make inferences about populations from samples." },
    { question: "How would you handle class imbalance in a classification problem?",          answer: "(1) Resampling: oversample minority (SMOTE) or undersample majority. (2) Class weights: class_weight='balanced' in sklearn. (3) Threshold tuning, move decision threshold below 0.5 to improve recall. (4) Right metric, use F1, precision-recall AUC, not accuracy. (5) BalancedRandomForest or EasyEnsemble." },
    { question: "What is the difference between precision and recall?",                      answer: "Precision = TP/(TP+FP): of predicted positives, how many are correct? Recall = TP/(TP+FN): of actual positives, how many did you catch? There's a tradeoff. F1 = harmonic mean. Choose: maximize recall when false negatives are costly (cancer screening); maximize precision when false positives are costly (spam filtering)." },
    { question: "How do you design an A/B test?",                                            answer: "(1) Define hypothesis and primary metric. (2) Power analysis for sample size (80% power, 95% confidence, minimum detectable effect). (3) Random user assignment. (4) Run for a full business cycle. (5) Check for novelty effects and sample ratio mismatch. (6) Two-sided t-test or z-test. (7) Check guardrail metrics. (8) Decision requires statistical AND practical significance." },
    { question: "What is gradient boosting and how does it differ from random forests?",      answer: "Random forests build trees independently and average predictions (bagging, reduces variance). Gradient boosting builds trees sequentially, each correcting residual errors of the previous (boosting, reduces bias). XGBoost/LightGBM are optimized implementations. Random forests: faster, less prone to overfitting. Gradient boosting: typically higher accuracy with tuning." },
    { question: "Write a SQL query to find the top 3 products by revenue in each category.", answer: "SELECT category, product, revenue FROM (SELECT category, product, SUM(amount) as revenue, RANK() OVER (PARTITION BY category ORDER BY SUM(amount) DESC) as rank FROM orders JOIN products USING(product_id) GROUP BY category, product) ranked WHERE rank <= 3. Key concept: RANK() window function with PARTITION BY." },
    { question: "How would you build a recommendation system from scratch?",                  answer: "(1) Collaborative filtering: find users with similar history (user-user or item-item CF), scalable with matrix factorization (ALS, SVD), cold-start problem with new users. (2) Content-based: recommend similar items based on features, no cold-start. (3) Hybrid: combine both. For production: candidate generation (FAISS for ANN) + ranking layer (LightGBM with context features)." },
    { question: "What is p-hacking and how do you avoid it?",                                answer: "Running multiple statistical tests until one reaches p<0.05 by chance. With 20 tests at alpha=0.05, expect one false positive. Prevention: pre-register hypothesis; Bonferroni correction (divide alpha by number of tests); use false discovery rate (Benjamini-Hochberg); stop only at pre-calculated sample size; treat initial findings as hypothesis-generating only." },
    { question: "How would you explain a machine learning model to a non-technical stakeholder?", answer: "Start with output: 'This model predicts which users will cancel in the next 30 days.' Explain inputs and key drivers using SHAP values: 'Users inactive for 14+ days are 3x more likely to churn.' Avoid jargon. Acknowledge uncertainty: 'It's right about 85% of the time.' Focus on what decisions it enables and the cost of errors." },
  ],

  "product-manager": [
    { question: "How would you prioritize a backlog with 50 feature requests?",               answer: "Use RICE (Reach, Impact, Confidence, Effort) or ICE scoring to quantify priority. First align with the current strategic goal, retention focus drops acquisition features. Group into themes, validate assumptions with quick stakeholder interviews, stack-rank the top 10 for the next sprint. Everything else goes into a quarterly review." },
    { question: "How do you define and measure product success?",                             answer: "Define a North Star metric, the single number that best captures value delivery. Add input metrics that influence it and guardrail metrics that must not regress. Set targets with baseline data, run experiments, and review weekly. Example: North Star = jobs applied via platform; input = resume analyses completed; guardrail = cancellation rate." },
    { question: "Tell me about a product you launched that failed. What did you learn?",      answer: "Structure: describe the hypothesis, what you built, what signals you missed (user research gaps? wrong metric? poor timing?), and most critically, what you changed about your process. Showing a process change, not just a lesson, is what separates strong PM answers. Interviewers want to see self-awareness and growth mindset." },
    { question: "How do you decide between building a feature vs buying a solution?",         answer: "Evaluate: (1) Core competency: differentiating? Build. Commodity? Buy. (2) 3-year cost comparison including maintenance. (3) Time to market, buying is usually faster. (4) Control needs. (5) Data access, does the vendor get sensitive user data? Present trade-offs with explicit assumptions and a clear recommendation." },
    { question: "How would you design a new feature for Spotify to increase podcast engagement?", answer: "Framework: (1) Clarify goals, time spent, completion rate, or new listeners? (2) Understand users, casual vs power vs commuters. (3) Identify pain points, discovery friction, no social layer. (4) Ideate, timestamped reactions, clip & share, AI episode summaries. (5) Prioritize by impact/effort. (6) Define success metrics before building." },
    { question: "What metrics would you use to measure a SaaS subscription product's health?", answer: "MRR/ARR, MRR growth rate, CAC, LTV, LTV:CAC ratio (target >3x), monthly revenue and logo churn, NPS/CSAT, activation rate (time to 'aha moment'), expansion MRR, payback period. Leading indicators: DAU/MAU ratio, feature adoption rate, support ticket trends." },
    { question: "How do you work with engineers who push back on your timeline?",             answer: "Listen first; engineers have context you don't. If the pushback reveals complexity you missed, revise scope or timeline. If it's priority disagreement, walk through the business rationale. Treat timelines as negotiation: 'What can we ship in 2 weeks that gets us 80% of the value?' beats holding to an arbitrary date every time." },
    { question: "How do you conduct user research on a tight deadline?",                      answer: "5-day sprint: Day 1: write hypothesis and 5 core questions. Days 2-3: run 5 user interviews (30 min each, via Calendly + Prolific or a Slack community). Day 4, affinity mapping, identify top 3 patterns. Day 5, present insights with direct quotes. Even 5 interviews reveal ~80% of usability issues. If only 1 day: use a 5-second test or Hotjar session recordings." },
    { question: "What's the difference between a product roadmap and a backlog?",             answer: "Roadmap: strategic communication tool, outcome-oriented, for stakeholders, quarterly/annual. Shows themes, goals, and rough timing. Backlog: execution tool, a prioritized list of tasks and stories for the engineering team, sprint-level. Roadmaps change with strategy; backlogs change weekly." },
    { question: "How do you handle a feature that engineering estimates will take 3 months but the business wants it in 1 month?", answer: "First, understand the business driver: is the timeline firm (contract, competitor launch) or a preference? Then explore with engineering: what's the 1-month version that delivers the core value? Can we ship a smaller scope now and iterate? Present leadership with: full feature in 3 months vs MVP in 1 month with specific capability gaps. Let them make an informed trade-off." },
  ],

  "hr-manager": [
    { question: "How do you handle a performance improvement plan (PIP)?",                   answer: "A PIP should be a genuine attempt to retain and develop the employee, not a paper trail for termination. Best practice: have the performance conversation before the PIP, the employee should never be surprised. The PIP should: specify measurable behaviors/outcomes expected, timeline with checkpoints, support and resources offered, and consequence if targets aren't met. Meet weekly during the PIP, document everything, and involve legal counsel for any termination." },
    { question: "How do you approach compensation and total rewards?",                       answer: "Framework: (1) Market analysis: benchmark roles against industry data (Radford, Mercer, Glassdoor, Levels.fyi for tech). (2) Define your compensation philosophy, do you pay at 50th, 75th, or 90th percentile? (3) Build salary bands with range minimums, midpoints, and maximums. (4) Account for total rewards: base, bonus, equity, benefits, flexibility, and career development. (5) Audit for pay equity regularly, gender and ethnicity gaps don't always show in intent, they show in outcomes." },
    { question: "How do you manage a situation where two employees are in conflict?",         answer: "First, meet with each party separately to understand their perspective without the other present. Listen without taking sides. Identify the actual issue (often it's a process gap, unclear roles, or communication style, not personal animosity). If appropriate, facilitate a structured conversation between them with agreed ground rules. Document what was discussed and agreed. If the conflict involves misconduct allegations, escalate to an investigation process. Prevention: clear role definitions and communication norms reduce most interpersonal conflicts." },
    { question: "How do you build a talent pipeline?",                                       answer: "Proactive talent acquisition: build relationships with potential candidates before you need them (LinkedIn, conferences, employee referrals), develop a strong employer brand (Glassdoor, LinkedIn Life, employee stories), create a structured internship-to-hire pipeline for early career talent, and identify internal talent for future roles with succession planning. Key metric: what % of roles are filled with internal candidates or pre-identified external candidates vs. reactive sourcing?" },
    { question: "How do you ensure diversity, equity, and inclusion in hiring?",              answer: "Systemic approach, not individual effort: blind resume review removes names/schools, diverse interview panels reduce individual bias, structured interviews with consistent questions allow fair comparison, train interviewers on bias (affinity bias, halo effect), broaden sourcing channels (HBCUs, minority professional associations, non-traditional backgrounds), and track metrics (application-to-interview, interview-to-offer rates by demographic) to identify where the funnel breaks. Representation is the outcome; inclusion is whether people feel they can be themselves once hired." },
    { question: "Describe your experience with HR technology and HRIS systems.",              answer: "Common systems: Workday (enterprise HRIS), BambooHR/Rippling (SMB), Greenhouse/Lever/Workable (ATS), Lattice/Culture Amp (performance management), Deel/Remote (global payroll). Key questions HR should ask of any new system: does it reduce admin work for managers and employees? Does it give better data for decisions? What's the change management required for adoption? HR tech is only as good as the processes it automates, garbage in, garbage out." },
    { question: "How do you design an effective onboarding program?",                        answer: "Onboarding starts before day one (send equipment, Slack access, day-one schedule). Structure: day one (culture, team context, role clarity), first week (meet key stakeholders, understand the business, set 30/60/90 goals), first month (deliverables, regular manager check-ins). Research shows the first 90 days determine long-term retention and performance. Most companies dramatically underinvest, preboarding, buddy programs, and structured check-ins at 30/60/90 days significantly improve outcomes." },
    { question: "How do you measure employee engagement and what do you do with the data?",   answer: "Tools: annual engagement surveys (Gallup Q12, Culture Amp) for deep measurement, quarterly pulse surveys for trend tracking, always-on feedback tools (Leapsome, Lattice). Key metrics: engagement score, eNPS (would you recommend this company to a friend?), and verbatim feedback themes. What to do with data: share results transparently (employees stop participating if nothing changes), create action plans owned by managers (not just HR), track year-over-year trends, and correlate engagement with turnover and performance data." },
    { question: "How do you handle a complaint of workplace harassment?",                    answer: "Immediate steps: take every complaint seriously, reassure the complainant that retaliation won't be tolerated, document the initial conversation. Investigation: assign a neutral investigator (often HR + legal or an external party for senior-level complaints), interview all relevant parties separately, gather documentary evidence. Outcome: take corrective action proportional to findings, communicate outcome to the complainant (without violating the respondent's privacy), and document everything. Post-investigation: monitor for any retaliation, review policies if systemic issues are identified." },
    { question: "What is your approach to change management?",                               answer: "Kotter's 8-step model is a useful framework: create urgency, build a coalition, form a vision, communicate it widely, empower people to act, create short-term wins, maintain momentum, and anchor the change in culture. In practice: people resist change when they don't understand why or feel excluded from the process. Involve impacted employees in designing the change where possible. Over-communicate (people need to hear something 7 times before it sticks). Address the WIIFM ('what's in it for me?') explicitly." },
  ],

  "management-consultant": [
    { question: "How would you structure a case for a client whose profits are declining?",   answer: "Profit = Revenue - Cost. Structure: (1) Revenue decline? Volume down (market shrinking or share loss?) or price down (pricing pressure or mix shift?). (2) Cost increase? COGS up (input costs, supplier issues?) or OPEX up (headcount, overhead?). (3) Gather data to test each branch. (4) Identify 2-3 root causes. (5) Quantify the impact of each. (6) Develop recommendations with implementation roadmap. Always clarify the scope: which product lines? Which geographies? What timeframe?" },
    { question: "Walk me through a market sizing estimate for a product.",                   answer: "Two approaches: top-down and bottom-up. Top-down: start with the total addressable market (e.g., US population = 330M), apply filters to reach your target segment (adults who commute by car = ~130M), estimate penetration rate (10% would use this product) = 13M users x average revenue = market size. Bottom-up: estimate from unit economics upward. Always triangulate both and sense-check against publicly available data. Show your work and state your assumptions clearly." },
    { question: "How do you communicate a recommendation to a skeptical client?",            answer: "Lead with the answer (top-down communication), not the analysis. State the recommendation in the first sentence. Support with 3 key reasons backed by data. Anticipate objections and address them proactively. If the client is skeptical, acknowledge their concern, show you've considered it in your analysis, and explain why you still reach the same conclusion. Never overwhelm with data, every slide should answer a specific question. The goal is to be convincing, not comprehensive." },
    { question: "Describe a situation where your analysis led to an unexpected conclusion.",  answer: "Consulting interviewers love this question because it tests intellectual honesty. Strong answer: a situation where your initial hypothesis was wrong, you noticed the signal in the data (rather than ignoring it), changed your framing, and ultimately delivered a better recommendation. Shows you follow the data, not your assumptions." },
    { question: "How do you manage multiple workstreams and competing client priorities?",    answer: "Ruthless prioritization: not all workstreams are equal; which one is on the critical path to the deliverable? Proactive communication: flag timeline conflicts early, don't absorb them. Structured work planning: MECE workstream breakdown, owner assigned to each piece, clear milestones, daily team standup during crunch. With the client: weekly status updates, no surprises, escalate scope conflicts to the engagement manager before they become crises." },
    { question: "What is a framework you commonly use in consulting engagements?",           answer: "Frameworks are a starting point, not a destination. Common ones: MECE (Mutually Exclusive, Collectively Exhaustive) for issue tree structuring; 3Cs (Company, Customer, Competitor) for strategic analysis; 4Ps for marketing; Porter's Five Forces for industry analysis; McKinsey 7S for organizational change. The skill is knowing which framework fits the problem, not memorizing all frameworks. More importantly: adapting or abandoning the framework when the specific context demands it." },
    { question: "How do you build trust with a client quickly?",                             answer: "Three things: competence (do what you say you'll do, be prepared, catch the details), candor (tell them what they need to hear, not what they want to hear, consultants who tell the truth even when it's uncomfortable build deep trust), and genuine interest (ask about their business, understand their incentives, remember what they've told you). Trust is built through small moments consistently, not one impressive presentation." },
    { question: "Estimate the number of gas stations in the United States.",                 answer: "Approximately 150,000 gas stations in the US. Reasoning: US has ~280M registered vehicles. Average car needs to refuel once per week. One gas station serves ~1,000 fill-ups per day (10 pumps x 6 cars/hour x 16 operating hours). Weekly: 7,000 fill-ups. With ~280M cars filling up weekly, total fill-ups = 280M / 7 = 40M/day. Gas stations needed = 40M / 1,000 = 40,000. But adjust: many vehicles fill up less frequently, and actual data is ~145,000, your estimate should be in the right order of magnitude." },
    { question: "How do you handle a client who wants to implement a strategy you believe is wrong?", answer: "Your job is to give your best professional judgment, not to be agreeable. Present your analysis and recommendation clearly with supporting evidence. If they push back, explore their reasoning, sometimes they have context you don't (political constraints, relationship considerations). If after hearing their reasoning you still disagree, say so explicitly and document it. If they proceed against your advice, implement as excellently as you can while managing the risk. Know your line: there are some recommendations you wouldn't put your name on." },
    { question: "What has been your most challenging project and how did you manage it?",     answer: "Structure: the challenge (ambiguous scope? difficult client? conflicting stakeholder interests? compressed timeline?), your specific actions, what you learned about consulting and about yourself, and the outcome. The best answers are honest about what went wrong and demonstrate that you've internalized the lesson. Consulting interviewers value self-awareness and growth over polished success stories." },
  ],

  "investment-banker": [
    { question: "Walk me through a leveraged buyout (LBO) model.",                           answer: "An LBO model analyzes a PE firm's acquisition of a company using significant leverage. Steps: (1) Set up sources and uses (purchase price, financing structure). (2) Build the debt schedule (term loan, revolver, PIK, interest expense, principal paydown from FCF). (3) Project operating performance (revenue, EBITDA). (4) Calculate FCF to fund debt repayment. (5) At exit, calculate equity proceeds = Enterprise Value - remaining debt. (6) Calculate IRR and MOIC. Target: 20-25% IRR, 2-3x MOIC in 5 years." },
    { question: "How do you value a company?",                                               answer: "Three primary methods: (1) DCF: intrinsic value based on projected free cash flows discounted at WACC plus terminal value. (2) Comparable companies (trading comps), apply peer group multiples (EV/EBITDA, P/E) to subject company's metrics. (3) Precedent transactions (deal comps), what have acquirers paid for similar companies? Then triangulate across methods. For M&A: also include a premiums paid analysis and LBO analysis (what can PE afford to pay?)." },
    { question: "Explain the difference between a merger and an acquisition.",               answer: "Merger: two companies combine to form a new entity (rare; typically equals). Acquisition: one company buys another (most common). Types: strategic acquisition (synergies with existing business), financial acquisition (PE buyout for returns), hostile takeover (without target board approval). From an accounting standpoint, most are acquisitions using purchase accounting, where acquired assets and liabilities are revalued to fair market value and goodwill = purchase price - fair value of net assets." },
    { question: "What are synergies in M&A and how do you value them?",                      answer: "Synergies are value created by combining two companies that either entity couldn't achieve alone. Revenue synergies: cross-selling, new markets, pricing power (harder to achieve, typically discounted). Cost synergies: headcount reduction, facility consolidation, procurement savings (more reliable). Value synergies by estimating annual run-rate impact x tax-affected multiple, then discount for probability of achievement and timing. Buyers pay for synergies through the acquisition premium." },
    { question: "Walk me through the IPO process.",                                          answer: "Stages: (1) Preparation (12-18 months): financial audits, legal restructuring, corporate governance, selecting underwriters via beauty contest. (2) Registration: file S-1 with SEC (or F-1 for foreign issuers), SEC review and comment letters. (3) Roadshow (2 weeks): management presents to institutional investors in 2-3 cities per day, building the book. (4) Pricing: night before listing, bankers price based on demand. (5) Trading: first day on exchange. Underwriters support price with stabilization if needed." },
    { question: "What is EBITDA and why is it used?",                                       answer: "EBITDA = Earnings Before Interest, Taxes, Depreciation, and Amortization. It approximates operating cash flow before capex and working capital. Used in investment banking because: it's capital-structure neutral (remove interest), geography/tax neutral (remove taxes), and removes non-cash charges (D&A). EV/EBITDA is the most common transaction multiple. Limitations: EBITDA does not equal cash flow (ignores capex, working capital), and it can be manipulated." },
    { question: "How does the current interest rate environment affect M&A?",                answer: "Higher rates: increase cost of debt (LBO returns harder to achieve), raise the discount rate in DCFs (lower valuations), reduce PE deal volume, push buyers toward all-cash or all-stock deals, and may cause valuation expectation gaps between buyers and sellers. Lower rates: cheap leverage boosts PE activity, multiple expansion inflates valuations, and strategic acquirers access cheap acquisition financing. Current environment analysis: rising rates since 2022 have compressed deal volumes significantly from 2021 peaks." },
    { question: "Tell me about a deal in the news that interests you.",                      answer: "Research a recent significant M&A deal before your interview. Structure your answer: (1) Deal overview (acquirer, target, price, structure). (2) Strategic rationale, why did the acquirer buy this? Synergies? Market share? Technology? Geographic expansion? (3) Valuation, is the premium reasonable? What multiple did they pay? (4) Your view, do you think this was a good deal and why? Interviewers are testing whether you read the news and can analyze transactions critically." },
    { question: "How do you build relationships with clients in investment banking?",         answer: "IB client relationships are built over years. Early career: be the most prepared person in every meeting, follow up on every commitment same day, bring ideas proactively (not just when hired). Over time: become their trusted advisor by giving them honest advice even when it's not what they want to hear, understanding their business deeply enough to anticipate their needs, and staying in contact between mandates. The best client relationships survive deal outcomes, you maintain them even after a deal falls through." },
    { question: "What is the role of investment banking in capital markets?",               answer: "Investment banks serve as intermediaries between companies that need capital and investors who have capital to deploy. Core functions: (1) Underwriting (IPOs, follow-on equity offerings, debt issuances), bank takes risk by guaranteeing proceeds to the issuer. (2) M&A advisory, advise buyers and sellers on deal strategy, valuation, and execution. (3) Trading/market making, provide liquidity in securities. (4) Research, produce analysis for institutional investors. The bank's reputation for execution and relationships is its primary competitive advantage." },
  ],

  "account-executive": [
    { question: "Describe your sales methodology.",                                          answer: "I use a consultative, value-based approach rooted in frameworks like MEDDIC (Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion) or Challenger Sale. My process: multi-threaded discovery to understand business pain and quantify the cost of inaction; aligning our solution to their specific decision criteria; building a champion who can sell internally; creating urgency around a compelling event; and a mutual action plan with clear milestones. The goal is to be a trusted advisor, not a vendor." },
    { question: "How do you handle objections like 'your price is too high'?",               answer: "Price objections are almost always value objections in disguise. My response: 'I hear you; let's figure out if this makes financial sense for you. What return would you need to see to make this investment worthwhile?' Then quantify the ROI using their own numbers. If the value is clear and they still push back: 'Help me understand what's making this feel expensive, is it the absolute number, or is it that we haven't fully justified the return?' Often there's a real budget constraint, a competing priority, or they haven't sold the value internally." },
    { question: "Walk me through how you manage your pipeline.",                             answer: "Weekly pipeline hygiene: every opportunity has a clear next step with a date. I stage deals based on objective evidence, not optimism, a prospect's verbal interest doesn't move a deal to 'proposal' without a confirmed meeting with the economic buyer. I track coverage ratio (should be 3-4x quota), average deal size, win rate, and sales cycle length. I do a weekly self-review to identify stalled deals and determine: is this real or should I remove it? A clean, accurate pipeline is more valuable than a large, inflated one." },
    { question: "Describe your most complex enterprise sale.",                               answer: "Use STAR. Key elements: the multi-stakeholder environment (who were all the buyers and influencers?), your strategy for building consensus, how you managed a long sales cycle with uncertainty, the competitive dynamics, how you created urgency, and the quantified outcome. Strong answers demonstrate organizational navigation, executive presence, and creative problem-solving under pressure." },
    { question: "How do you research and approach a new prospect?",                          answer: "Research before any outreach: company 10-K or investor presentations (what are their strategic priorities?), recent press releases and earnings calls (what's their current challenge?), LinkedIn (who are the relevant stakeholders, what's their background?), and mutual connections (who in my network knows them?). Outreach: personalize to their specific context, 'I saw your CFO mentioned margin expansion as a priority in your Q3 earnings call. Here's how we've helped similar companies...' Generic outreach goes straight to delete." },
    { question: "How do you build and maintain relationships with economic buyers?",         answer: "Access to the economic buyer is often the difference between winning and losing. Strategies: get introduced through your champion ('Would you be comfortable introducing me to your CFO for a 20-minute business conversation?'), frame the value of their time explicitly, prepare executive-level content focused on business outcomes not product features, send relevant insights between meetings (not just deal updates), and treat their time as scarce. Maintain post-close: quarterly business reviews turn economic buyers into long-term advocates." },
    { question: "What do you do when a deal is stuck in legal/procurement for months?",     answer: "First, understand whether it's truly stuck or whether the business team has deprioritized it. Get your champion to escalate internally with urgency ('What happens to you if this doesn't close by Q3?'). Involve your own legal team proactively, don't just forward documents and wait. Propose a redlined document that addresses their likely objections. Offer executive-to-executive conversations to unblock escalated issues. And set a decision date: if neither side is moving, propose: 'Let's agree that if we can't resolve these issues by [date], we should pause and revisit in Q[X].'" },
    { question: "How do you hit quota in a down market?",                                   answer: "Focus on what you can control: activity volume, quality of pipeline, and retention of existing customers. In a down market: existing customers are often more valuable than new logos (expansion revenue with lower CAC); adjust messaging to ROI and cost reduction rather than innovation; focus on the segments still buying (industries with tailwinds); qualify harder to protect your time (not every opportunity is worth pursuing). Be honest with your manager about what's working and what isn't, the forecast conversation is harder to have but necessary." },
    { question: "Why sales?",                                                                answer: "The best answer is authentic, not rehearsed. Elements of a strong answer: you're genuinely motivated by problem-solving for clients (not just money), you thrive on the scorecard clarity and competitiveness, you find the craft of influence and communication intrinsically interesting, and you have a specific story about when you discovered you were good at it. Avoid: 'I love meeting people' (too generic) and 'unlimited earning potential' (sounds purely mercenary)." },
    { question: "Tell me about a deal you lost and what you learned.",                       answer: "Intellectual honesty and learning orientation matter here more than the outcome. Elements: describe the deal clearly, what you believed was your competitive advantage, what actually happened (lost to competition, no decision, champion left?), your honest assessment of what you could have done differently (better multi-threading? earlier executive access? different ROI framing?), and what you changed in your process. The best answer ends with evidence that you applied the lesson." },
  ],

  "recruiter": [
    { question: "Describe your full-cycle recruiting process.",                              answer: "Full-cycle: intake meeting with hiring manager (agree on must-haves vs nice-to-haves, interview process, salary range, timeline); sourcing strategy (job boards, LinkedIn, internal referrals, targeted outreach); screening calls (30 min: background, motivations, basic qualifications, compensation alignment); coordinating interview process (scheduling, prep for candidates and interviewers); debrief facilitation (structured debrief, gather clear decisions); offer generation and negotiation; and post-hire follow-up (30-day check-in builds relationships and surfaces process improvements)." },
    { question: "How do you source passive candidates who aren't applying to your jobs?",    answer: "LinkedIn Recruiter is the primary tool. Effective approach: Boolean search to find specific profiles (title + skills + company), personalized InMail (reference something specific about their background, not a generic template), build a pipeline before you need it (keep warm leads from past conversations), leverage employee referrals systematically (make it easy for employees to refer and reward them), attend industry events and conferences, and build a strong employer brand so candidates come to you. Response rates are 3-5x higher for messages that reference specific career accomplishments." },
    { question: "How do you assess cultural fit without introducing bias?",                  answer: "Reframe 'culture fit' as 'culture add': does this person bring valuable perspectives and ways of working, even if different from current employees? Use structured behavioral questions tied to specific values ('Tell me about a time you navigated working with someone who had a very different working style'). Avoid: gut-feel judgments, 'would I have a beer with them?' assessments, and penalizing non-traditional backgrounds. Train interviewers on affinity bias and set clear criteria before the interview, not after." },
    { question: "How do you manage a high-volume hiring push?",                              answer: "Scale through process design: standardized JDs across similar roles, automated screening with relevant (not generic) knockout questions, batch scheduling for initial screens (phone screen day = all candidates screened in one day), structured scorecards to enable faster and more consistent decisions, and clear SLAs with hiring managers. Priority: protect candidate experience at every stage, even in high volume, a bad candidate experience creates employer brand damage. Track: time-to-fill, funnel conversion at each stage, and offer acceptance rate." },
    { question: "How do you handle a situation where a hiring manager has unrealistic expectations?", answer: "Bring data: pull market salary data, show the applicant pool for their requirements (or lack thereof), show how similar roles were filled in the past. Frame it as partnership: 'My job is to fill this role successfully, let me share what the market looks like so we can set realistic expectations.' If they insist on requirements that will make the role unfillable, document the conversation, set a timeline ('Let's try this for 30 days and reassess'), and revisit with data. Sometimes the role needs to be rewritten, a different comp band approved, or a different hire profile considered." },
    { question: "What metrics do you track to evaluate your own recruiting performance?",    answer: "Input metrics: outreach volume, source mix, pipeline by stage. Efficiency metrics: time-to-fill, time-to-offer, candidate experience NPS. Quality metrics: offer acceptance rate, new hire 90-day retention, hiring manager satisfaction score, and 1-year performance rating of your hires. The best recruiters obsess over quality-of-hire, not just speed, a fast fill who leaves in 3 months is a failure, not a success." },
    { question: "How do you build a strong relationship with hiring managers?",              answer: "Start every search with a deep intake: understand their team culture, past hiring successes and failures, and what specifically went wrong with the role being replaced. Set clear expectations on your process, timeline, and what you need from them (quick feedback, availability for interviews). Provide proactive updates even when there's nothing new ('The market for this role is tighter than expected, here's what I'm seeing and what I'm adjusting'). Be honest when a search is struggling, not just when it's succeeding. Your credibility is built on candor, not just placements." },
    { question: "How do you think about diversity recruiting?",                              answer: "Diversity recruiting is a sourcing problem, a process problem, and a culture problem. You can't solve it with sourcing alone. Sourcing: expand channels to HBCUs, bootcamps, veteran programs, and women-in-tech organizations. Process: remove bias in screening (standardized questions, blind review where possible), ensure interview panels include diverse interviewers, structured decision-making. Culture: the best diverse candidates will evaluate your company on its culture and existing representation, talk to your ERGs, understand your retention data, and address what you find. If you hire diverse candidates into a non-inclusive culture, you're just increasing churn." },
    { question: "Describe a difficult offer negotiation and how you handled it.",            answer: "Use STAR. Elements: the specific challenge (candidate counter-offering significantly, competing offer, or compensation band constraints), your strategy (understanding their true decision criteria, often it's not just money), how you communicated internally to find flexibility (signing bonus, title adjustment, start date), and the outcome. The key insight interviewers want: negotiation is about understanding what the candidate truly needs, not just trading numbers. Sometimes flexibility in one dimension (remote work, title, start date) unlocks a deal where comp flexibility doesn't exist." },
    { question: "What's the difference between recruitment and talent acquisition?",        answer: "Recruitment is reactive: fill open roles. Talent acquisition is strategic: build a talent pipeline, employer brand, and hiring infrastructure that aligns with where the business is going 1-3 years from now. TA teams think about workforce planning (what roles will we need?), employer value proposition (why should great people join us?), and talent communities (relationships with future candidates before we have roles for them). In practice, both terms are often used interchangeably, but the distinction matters for how you structure the function." },
  ],

  "full-stack-developer": [
    { question: "How do you decide when to use server-side rendering vs client-side rendering?", answer: "SSR with Next.js is best for SEO-critical pages, content that changes per request, and fast initial load. CSR works for highly interactive dashboards, user-authenticated content, and apps where SEO doesn't matter. SSG is ideal for content that rarely changes (docs, blogs). In practice, most full-stack apps use a hybrid: SSG/ISR for marketing pages, SSR for dynamic routes, CSR for dashboard-style UIs." },
    { question: "Explain the difference between REST and GraphQL. When would you choose each?", answer: "REST uses fixed endpoints, each returning a defined shape. GraphQL uses a single endpoint where clients request exactly the data they need. Choose REST for: simple CRUD APIs, caching at the network layer, teams that prefer explicitness. Choose GraphQL for: mobile apps needing to minimize data transfer, complex nested data relationships, multiple clients needing different data shapes from the same API. GraphQL adds complexity; only choose it when REST's over-fetching or under-fetching is a real problem." },
    { question: "How do you manage state in a large React application?", answer: "Local state (useState) for UI state like modals and form inputs. Shared state between nearby components: lift state up or Context. Server state (async data from APIs): React Query or SWR, which handle caching, refetching, and loading states. Global client state: Zustand or Redux Toolkit for complex cases like auth or multi-step flows. The mistake is reaching for Redux too early. Start with local state and promote only when you feel the pain of prop drilling." },
    { question: "What is a database transaction and when do you need one?", answer: "A transaction groups multiple operations so they either all succeed or all fail (atomicity). Use transactions when: transferring money between accounts, creating an order and decrementing inventory, or any operation where partial completion leaves data in an inconsistent state. In SQL: BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT; If either statement fails, ROLLBACK undoes both." },
    { question: "How do you handle authentication and authorization in a full-stack app?", answer: "Authentication (who are you): JWTs for stateless APIs, sessions for server-rendered apps. Store JWTs in httpOnly cookies (not localStorage) to prevent XSS. Use a proven library: Passport.js, Auth.js, or a managed service like Auth0. Authorization (what can you do): role-based access control (RBAC) at the API layer, never just the UI. Every API endpoint must validate permissions server-side regardless of what the frontend shows." },
    { question: "Describe how you would design a notification system.", answer: "Components: notification service that creates and stores notifications, delivery layer (email via SendGrid, push via FCM, in-app via WebSockets), and a queue (Kafka, SQS, Bull) to decouple creation from delivery. Key decisions: at-least-once vs exactly-once delivery (use idempotency keys), user preferences (which notifications, which channels), batching to avoid notification fatigue, and retry logic with exponential backoff for failed deliveries." },
    { question: "What is the N+1 query problem and how do you fix it in a full-stack context?", answer: "N+1 occurs when you fetch a list of N records and then make N additional queries to fetch related data. Example: fetch 50 posts, then 50 separate queries for each post's author. Fix in SQL: use JOINs or include the related data in one query. Fix in ORMs: eager loading (include/with). Fix in GraphQL: DataLoader batches all field resolver calls into a single query per batch. Always check your ORM's generated SQL in development." },
    { question: "How do you approach testing in a full-stack application?", answer: "Unit tests for pure functions and business logic (fast, isolated). Component tests for UI behavior (React Testing Library, test behavior not implementation). Integration tests for API endpoints with a test database. E2E tests for critical user flows (Playwright or Cypress). The testing pyramid: many unit tests, fewer integration tests, few E2E tests. What to test: code that handles money, authentication, data mutations. What not to obsess over: 100% coverage of simple getters, third-party library internals." },
    { question: "How do you handle errors in a full-stack application?", answer: "Frontend: error boundaries for React tree failures, try/catch in async functions, global error handlers for unhandled promise rejections. API layer: consistent error response format ({error: string, code: string, details?: object}), HTTP status codes that actually match the error (400 for validation, 401 for auth, 403 for permissions, 500 for server errors). Logging: structured logs with request IDs to correlate frontend and backend errors. Monitoring: Sentry for error tracking, alerting on error rate spikes." },
    { question: "What is CI/CD and how have you used it in a full-stack project?", answer: "CI (Continuous Integration): automatically run tests, linting, and type checking on every push. CD (Continuous Delivery/Deployment): automatically deploy passing builds to staging, and optionally production. In practice: GitHub Actions or CircleCI runs your test suite on every PR. Passing tests enable merge. Merged code auto-deploys to a staging environment. Manual approval gates production deploys. Vercel and Railway make CD trivial for full-stack apps. The value: catch bugs before they reach users and reduce the friction of shipping." },
  ],

  "ios-developer": [
    { question: "What is the difference between Swift and Objective-C?", answer: "Swift is Apple's modern language (2014): type-safe, concise, safer memory management, better null handling with optionals, faster to write, and now preferred for all new iOS development. Objective-C is the legacy language with dynamic dispatch and message passing from its Smalltalk heritage. You need Objective-C knowledge for maintaining legacy codebases and working with older C/C++ libraries, but all new iOS projects should use Swift." },
    { question: "Explain the iOS app lifecycle.", answer: "Key states: Not Running, Inactive (foreground, not receiving events), Active (foreground, receiving events), Background (executing code in background), Suspended (in memory, no execution). Key delegate methods: application(_:didFinishLaunchingWithOptions:) for setup, applicationDidBecomeActive for resuming, applicationWillResignActive for pausing, applicationDidEnterBackground for saving state, applicationWillTerminate for cleanup. In iOS 13+, scene-based lifecycle replaced app delegate lifecycle for UI." },
    { question: "What is the difference between UIKit and SwiftUI?", answer: "UIKit (2008): imperative, view controllers, mature ecosystem, required for complex animations and edge cases. SwiftUI (2019): declarative, data-driven, automatic support for dark mode/Dynamic Type/accessibility, live previews in Xcode, less code. For new projects, SwiftUI is preferred for most UI. UIKit is still needed for: custom collection view layouts, complex gestures, UIKit-only APIs, and apps supporting iOS 13 or below. Most production apps use both via UIHostingController and UIViewRepresentable." },
    { question: "How does memory management work in Swift (ARC)?", answer: "Swift uses Automatic Reference Counting (ARC). ARC tracks how many references point to each object and deallocates it when the count reaches zero. The common pitfall is retain cycles: object A holds a strong reference to B, B holds a strong reference back to A, so neither is ever deallocated. Fix with `weak` or `unowned` references in closures and delegate patterns. `weak` makes the reference optional (can be nil). `unowned` assumes the referenced object will always be alive (crash if nil). Use weak in closures capturing self unless you're certain about lifetimes." },
    { question: "What is Combine and when would you use it?", answer: "Combine is Apple's reactive framework for handling asynchronous events as streams of values. Publishers emit values, operators transform them, subscribers consume them. Use Combine for: chaining async operations (network request then parse then update UI), binding UI state to data models, handling multiple async events from different sources. In modern Swift, async/await is often preferred for simpler cases. Combine shines for complex reactive scenarios: debouncing search input, combining multiple network requests, or reactive UI binding with SwiftUI." },
    { question: "Explain the difference between frame and bounds in UIKit.", answer: "Frame: the view's position and size in its parent's coordinate system. Bounds: the view's position and size in its own coordinate system. Bounds origin is usually (0,0) but changes when you scroll a UIScrollView. Frame size equals bounds size unless the view is rotated/scaled via its transform. When laying out subviews, use bounds (you're thinking in the view's own space). When positioning a view relative to its parent, use frame." },
    { question: "How do you implement background tasks in iOS?", answer: "Background App Refresh: short tasks scheduled by the system, non-deterministic timing. Background fetch: deprecated in iOS 13+, replaced by BGAppRefreshTask. BGProcessingTask: long-running processing (model training, sync) requiring power and network, runs when device is charging. URLSession background transfers: continue uploads/downloads after app terminates. Push notifications with content-available: wake app in background to process silent push. Key constraint: most background time is limited and not guaranteed, design apps to handle interruption gracefully." },
    { question: "What is Core Data and when should you use it?", answer: "Core Data is Apple's object graph and persistence framework. It manages objects in memory, handles relationships between them, and persists to SQLite, XML, or in-memory stores. Use Core Data when: you have complex object relationships, need offline support with sync, require faulting (lazy loading) for large datasets, or want NSFetchedResultsController for table view performance. For simple key-value storage, use UserDefaults. For small JSON payloads, use Codable with file storage. Core Data has a steep learning curve; consider SwiftData (iOS 17+) for new projects." },
    { question: "How do you handle network requests in a modern iOS app?", answer: "URLSession is the foundation. For production apps, use async/await with URLSession: `let (data, response) = try await URLSession.shared.data(from: url)`. Abstract networking into a dedicated layer with a protocol so you can mock it in tests. Handle errors explicitly: network errors (no connection), HTTP errors (4xx, 5xx), and decoding errors separately. Implement retry with exponential backoff for transient failures. Consider Alamofire or Moya for teams that prefer higher-level abstractions, but URLSession with async/await covers most needs without dependencies." },
    { question: "What is the App Store review process and how do you prepare for it?", answer: "Apple reviews every app submission, typically within 24-48 hours. Common rejection reasons: bugs and crashes (test on physical devices, check crash logs), broken functionality, privacy violations (collecting data without disclosure, improper use of camera/location), guideline violations (inappropriate content, misleading metadata), and payment policy violations (using non-IAP for digital goods). Prepare by: testing on multiple physical devices and OS versions, using App Store Connect's TestFlight for beta testing, reviewing the App Review Guidelines before submission, and providing reviewer credentials for any app requiring login." },
  ],

  "android-developer": [
    { question: "What is the difference between Activity and Fragment?", answer: "Activity is a full-screen UI component with its own lifecycle, representing a single screen. Fragment is a modular section of UI that lives inside an Activity and has its own lifecycle tied to its host. Use Fragments for: multi-pane layouts (tablet), reusable UI components, navigation with the Navigation component. Modern Android development favors single-Activity apps with multiple Fragments managed by the Navigation component, rather than multiple Activities." },
    { question: "Explain the Android Activity lifecycle.", answer: "onCreate: initialize, set content view, restore state. onStart: visible but not interactive. onResume: foreground, interactive, acquire resources. onPause: partially obscured or dialog shown, release resources. onStop: no longer visible, save data. onDestroy: final cleanup. Key patterns: save state in onSaveInstanceState, restore in onCreate. Release camera/sensors in onPause, not onStop. The system can kill your process from onStop or onDestroy without calling onDestroy, so persist critical data in onPause." },
    { question: "What is Jetpack Compose and how does it differ from XML layouts?", answer: "Jetpack Compose (2021) is Android's modern declarative UI toolkit. XML layouts are imperative: you define structure, then manipulate views in code. Compose is declarative: you describe what the UI should look like for a given state, and Compose handles updates. Compose advantages: less code, better type safety, easier state management, live previews, built-in animation support. When to keep XML: legacy codebases, views with no Compose equivalent, complex custom drawing. All new Android projects should use Compose." },
    { question: "What is the difference between ViewModel and Repository in MVVM?", answer: "ViewModel holds and manages UI-related state, survives configuration changes (screen rotation), and exposes data to the UI via StateFlow or LiveData. It doesn't know about Views or Activities. Repository abstracts the data source: it decides whether to return data from local cache (Room) or fetch from network (Retrofit), and handles the caching strategy. ViewModel depends on Repository. UI depends on ViewModel. Neither depends on Android framework classes, making them easily testable." },
    { question: "How does Kotlin Coroutines work and why is it preferred over RxJava?", answer: "Coroutines are lightweight threads that can be suspended and resumed without blocking. They're built into Kotlin and use structured concurrency: coroutines launched in a scope are automatically cancelled when the scope is cancelled (e.g., when a ViewModel is cleared). Preferred over RxJava because: simpler mental model (looks like sequential code), better integration with Android lifecycle, less boilerplate, and easier error handling with try/catch instead of onError callbacks. RxJava is still valid for complex reactive streams, but Coroutines with Flow cover most Android use cases." },
    { question: "What is Room and how does it relate to SQLite?", answer: "Room is a SQLite abstraction layer from Jetpack. It provides compile-time SQL validation, type-safe queries via annotations (@Entity, @Dao, @Database), and Kotlin Coroutines/Flow integration. Room catches SQL errors at compile time, not runtime. Use Room for: offline-first apps, complex queries, relationships between tables. For simple key-value storage, use DataStore (Room's replacement for SharedPreferences). Direct SQLite is only needed for very specific performance-critical scenarios that Room's abstraction can't handle." },
    { question: "How do you handle deep links in Android?", answer: "Deep links open your app from a URL. Three types: explicit (Intent with component), implicit (Intent with action/data, any app can handle), App Links (verified HTTPS links your app exclusively handles). Implement App Links: add intent-filter with autoVerify=true in AndroidManifest, host an assetlinks.json file at your domain. Handle in NavController: NavDeepLinkBuilder or URI patterns in navigation graph. Test with adb: `adb shell am start -a android.intent.action.VIEW -d 'https://yourapp.com/path'`." },
    { question: "What is ProGuard/R8 and why is it important?", answer: "R8 (successor to ProGuard) is Android's code shrinker, obfuscator, and optimizer. It shrinks by removing unused classes, methods, and fields. It obfuscates by renaming classes and methods to short names. It optimizes by inlining methods and removing dead code. Critical for production: reduces APK size (often 50-70%), makes reverse engineering harder, and improves startup time. Configure keep rules in proguard-rules.pro for classes accessed via reflection, serialization models, and third-party libraries that require their class names." },
    { question: "Explain WorkManager and when to use it over alternatives.", answer: "WorkManager is the recommended solution for deferrable, guaranteed background work that must complete even if the app exits or the device restarts. Use for: syncing data, uploading logs, processing images. It chooses the best implementation based on API level (JobScheduler on API 23+, AlarmManager + BroadcastReceiver below). Don't use for: immediate foreground work (use Coroutines), exact-time alarms (use AlarmManager), foreground services with user-visible progress (use ForegroundService). WorkManager's guarantee comes at the cost of timing control; tasks may run hours later." },
    { question: "How do you optimize Android app performance?", answer: "Startup time: use App Startup library, defer non-critical init with lazy loading, avoid heavy work on the main thread. Rendering: 60fps budget is 16ms per frame. Use Layout Inspector to find overdraw. Prefer Compose over deep View hierarchies. Use RecyclerView (or LazyColumn in Compose) for lists. Memory: avoid memory leaks with LeakCanary, don't hold context references in singletons, use WeakReference for large bitmaps. Battery: batch network requests, use WorkManager for deferred work, avoid wakelocks. Profile with Android Studio Profiler before optimizing." },
  ],

  "devops-engineer": [
    { question: "Explain the difference between Docker containers and virtual machines.", answer: "VMs virtualise hardware: each VM has a full OS, kernel, and binaries running on a hypervisor. Heavy (GBs), slow to start (minutes). Containers virtualise the OS: containers share the host kernel, have their own filesystem and process space via namespaces and cgroups. Lightweight (MBs), start in seconds. Use VMs for: strong isolation requirements, different OS types, legacy apps. Use containers for: microservices, CI pipelines, reproducible environments, fast scaling. Containers are not inherently secure against container escapes; don't run untrusted code without additional isolation (gVisor, Kata Containers)." },
    { question: "What is Kubernetes and what problem does it solve?", answer: "Kubernetes (K8s) is a container orchestration platform. It solves: deploying containers across multiple machines, automatically restarting failed containers, scaling services up/down based on load, rolling deployments with zero downtime, service discovery and load balancing between containers, secret and config management. Key concepts: Pod (one or more containers), Deployment (manages replica sets for stateless apps), Service (stable network endpoint), Ingress (HTTP routing), ConfigMap/Secret (configuration). The complexity cost is real; use managed Kubernetes (EKS, GKE, AKS) in production." },
    { question: "What is Infrastructure as Code and which tools have you used?", answer: "IaC means provisioning and managing infrastructure via code files rather than manual UI clicks. Benefits: version control, reproducibility, peer review, disaster recovery. Terraform: cloud-agnostic, declarative, largest ecosystem, best for multi-cloud. Pulumi: IaC with real programming languages (TypeScript, Python). AWS CloudFormation/CDK: AWS-native, CDK uses familiar languages. Ansible: configuration management and provisioning, procedural. Best practice: treat Terraform code like application code: code review, module reuse, remote state (S3 + DynamoDB locking), separate state per environment." },
    { question: "Explain blue-green deployments and canary releases.", answer: "Blue-green: run two identical production environments. Blue is live. Deploy new version to green. Test green. Switch traffic from blue to green instantly. Rollback is instant (switch back). Requires 2x infrastructure. Canary: route a small percentage of traffic (5-10%) to the new version. Monitor error rates and latency. Gradually increase traffic. Roll back immediately if metrics degrade. Use when you can't afford blue-green's infrastructure cost or want to test on real traffic. Implement in Kubernetes with traffic splitting (Istio, Argo Rollouts) or load balancer weighted routing." },
    { question: "What are SLOs, SLAs, and error budgets?", answer: "SLA (Service Level Agreement): contractual commitment to customers with financial penalties. SLO (Service Level Objective): internal target (e.g., 99.9% availability = 43.8 minutes downtime/month). SLI (Service Level Indicator): the actual measurement (request success rate, latency p99). Error budget: what's left between SLO and 100%. If SLO is 99.9%, error budget is 0.1%. When budget is consumed, you slow feature development and focus on reliability. Error budgets align engineering and product: feature velocity directly consumes reliability budget." },
    { question: "How do you handle secrets management in a CI/CD pipeline?", answer: "Never commit secrets to version control. Use: cloud-native secret managers (AWS Secrets Manager, GCP Secret Manager, Azure Key Vault) with IAM roles for access; HashiCorp Vault for multi-cloud environments; Kubernetes Secrets (encrypt at rest with KMS). In CI/CD: inject secrets as environment variables at runtime, not as build arguments (build args appear in image layers). Rotate secrets regularly. Audit secret access. For local development, use .env files excluded by .gitignore and never committed." },
    { question: "Explain the purpose of a service mesh like Istio.", answer: "A service mesh manages service-to-service communication in microservices: traffic management (routing, retries, circuit breaking), mutual TLS between services, observability (distributed tracing, metrics, logs) without code changes. Istio injects a sidecar proxy (Envoy) into each pod to intercept all network traffic. Benefits: consistent security and observability across all services without each team implementing it. Cost: significant operational complexity, Istio is notoriously difficult to configure and debug. Alternative: Linkerd is simpler but less feature-rich. Consider whether your scale justifies the complexity." },
    { question: "What is the difference between monitoring and observability?", answer: "Monitoring: collecting predefined metrics (CPU, memory, request rate, error rate) and alerting on thresholds. Tells you something is wrong. Observability: the ability to understand internal system state from external outputs (logs, metrics, traces). Tells you why something is wrong, even for previously unknown failure modes. Three pillars: metrics (what is happening), logs (what happened), traces (where in the system it happened). Tools: Prometheus + Grafana (metrics), ELK stack or Loki (logs), Jaeger or Tempo (traces). OpenTelemetry is the standard for instrumenting applications." },
    { question: "How do you design a CI/CD pipeline for a microservices architecture?", answer: "Key principles: each service has its own pipeline (independent deploy), trunk-based development with feature flags, automated testing gates before promotion. Pipeline stages: lint/type-check, unit tests, build container image, push to registry, integration tests, deploy to staging, E2E tests, deploy to production (manual gate or automated). Challenges: testing inter-service dependencies (contract testing with Pact), managing deployment order for breaking changes (backward-compatible APIs, versioning), environment parity. Tool stack: GitHub Actions or CircleCI, Docker, ECR/GCR, ArgoCD or Flux for GitOps." },
    { question: "What would you do if production went down right now?", answer: "Incident response: (1) Acknowledge and declare incident severity, page on-call. (2) Establish incident channel (Slack/Teams), assign roles: incident commander, communication lead, technical responders. (3) Diagnose: check dashboards (error rate, latency, saturation), recent deployments, upstream dependencies. (4) Mitigate first, diagnose second: rollback recent deploy if correlated, scale if resource exhaustion, failover if regional issue. (5) Communicate status to stakeholders every 15-30 minutes. (6) Post-incident review within 48 hours: timeline, root cause, action items, no blame. The worst mistake is debugging slowly while users are impacted." },
  ],

  "ux-designer": [
    { question: "Walk me through your design process from brief to delivery.", answer: "Discovery: understand the problem, not the solution. Interview users, review analytics, audit competitors, align with stakeholders on success metrics. Define: synthesize research into insights. Create user personas, journey maps, and a clear problem statement. Ideate: generate multiple solutions before committing. Sketches, design studios, 'how might we' brainstorms. Design: wireframes to test information architecture, high-fidelity mockups after structure is validated. Prototype: interactive prototype matched to research fidelity needs. Test: usability sessions with real users, minimum 5 participants. Iterate: incorporate findings before handoff. Document: design specs, component library updates, rationale notes for engineering." },
    { question: "How do you conduct a usability study?", answer: "Define objectives: what specific questions must this study answer? Recruit 5-8 participants matching your primary persona. Write a test script: scenario-based tasks (not 'click the button', but 'you need to find X, show me how you'd do that'). Use think-aloud protocol: ask participants to narrate their thinking. Observe, don't guide: let them struggle, resist the urge to help. Note observations: where did they pause? Where did they fail? What did they say? Debrief with the team immediately after each session while observations are fresh. Synthesize: cluster findings, identify patterns, prioritize by severity and frequency." },
    { question: "What is the difference between UX and UI design?", answer: "UX (User Experience) encompasses the entire user journey: research, information architecture, interaction design, usability, and how users feel about using the product. It answers 'does this work for users?' UI (User Interface) is the visual layer: typography, color, spacing, iconography, animation, and visual hierarchy. It answers 'does this look right and communicate clearly?' Strong products need both. A beautiful UI with poor UX (confusing navigation, unclear feedback) fails. Good UX with poor UI (structured but unattractive) struggles to build trust. In practice, many designers do both, but larger teams have specialists for each." },
    { question: "How do you handle disagreement with a product manager or engineer about a design decision?", answer: "Start by understanding their concern. Often disagreements are about constraints (technical complexity, timeline) or different interpretations of user data. Separate opinion ('I think it should look like this') from evidence ('users in testing consistently failed here'). Bring data: usability test findings, analytics, user quotes. If it's a genuine opinion disagreement, propose testing both versions. If the constraint is real (engineering complexity), explore design alternatives that achieve the same user goal differently. Document the decision and rationale either way. Not every design battle is worth fighting; choose where you put your energy based on user impact." },
    { question: "Explain the concept of affordances in design.", answer: "An affordance is a design property that signals to users how an object should be used. A door handle shaped for pulling affords pulling. A button that looks raised affords clicking. In digital design: underlined blue text affords clicking (learned convention), a text input field with a cursor affords typing, a progress bar affords waiting. Signifiers are the design cues that communicate affordances (the shadow that makes a button look raised). When affordances are clear, users act correctly without instruction. Poor affordances create UI that requires tutorials. Norman doors (push/pull confusion) are the canonical example of bad affordances." },
    { question: "How do you design for accessibility?", answer: "Accessibility is not an add-on; it is a quality bar. Core practices: color contrast minimum 4.5:1 for body text (3:1 for large text), never use color alone to convey meaning (add labels or patterns), ensure all interactive elements are keyboard navigable and have visible focus states, provide text alternatives for images (alt text), ensure touch targets are at least 44x44 pixels, test with screen readers (VoiceOver on iOS, TalkBack on Android, NVDA on Windows). Design with WCAG 2.1 AA as the baseline. Test with actual users who use assistive technology, not just automated checkers." },
    { question: "What is a design system and how do you contribute to one?", answer: "A design system is a collection of reusable components, design tokens (colors, spacing, typography), interaction patterns, and documentation that enables teams to build consistent products at scale. Contributing: identify repeated patterns across screens and abstract them into components. Document usage guidelines (when to use a modal vs a drawer), variants (button states: default, hover, active, disabled), and accessibility requirements. Keep it a living document, updated as the product evolves. The biggest failure mode for design systems is orphaning: the system falls out of sync with the product. Assign ownership and schedule regular reviews." },
    { question: "How do you measure whether a design is successful?", answer: "Define success metrics before shipping, not after. Task success rate: can users complete the target task without errors or help? Time on task: are users completing tasks faster with the new design? Error rate: are users making fewer mistakes? Satisfaction: post-task surveys (Single Ease Question: 'how difficult was this task?'). Business metrics: conversion rate, activation rate, feature adoption, support ticket volume reduction. Pair qualitative (usability testing, user interviews) with quantitative (analytics, A/B test results). The most honest measure: did user behavior change in the direction you intended?" },
    { question: "Describe a time a design you shipped failed. What did you learn?", answer: "Structure with STAR and be genuinely honest, interviewers can tell when answers are sanitised. Key elements: what was the design decision, what evidence did you have at the time, what happened when it shipped, how did you discover it failed (metrics, user feedback, support tickets), what did you do to fix it, and what you changed about your process. The best answers show intellectual honesty about what you missed, a process change (not just a lesson), and comfort with failure as part of good design practice. Designers who have never shipped something that failed have either not shipped much or are not reflecting accurately." },
  ],

  "data-analyst": [
    { question: "Write a SQL query to find the top 5 customers by total revenue in the last 90 days.", answer: "SELECT customer_id, SUM(order_total) as total_revenue FROM orders WHERE order_date >= CURRENT_DATE - INTERVAL '90 days' GROUP BY customer_id ORDER BY total_revenue DESC LIMIT 5; Key concepts: date filtering with INTERVAL, GROUP BY for aggregation, ORDER BY DESC for ranking, LIMIT for top N." },
    { question: "What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?", answer: "INNER JOIN: returns rows where there is a match in both tables. Non-matching rows from either table are excluded. LEFT JOIN: returns all rows from the left table, with matching rows from the right table. Non-matching right rows become NULL. Use when you want all records from one table regardless of whether a match exists. FULL OUTER JOIN: returns all rows from both tables, NULLs where there is no match. Use to find records in either table that have no match." },
    { question: "How do you identify and handle outliers in a dataset?", answer: "Detection: IQR method (outlier if below Q1 - 1.5*IQR or above Q3 + 1.5*IQR), Z-score (outlier if |z| > 3), or visual inspection with box plots and scatter plots. Handling options: remove if data entry error or clearly impossible value. Cap/floor (Winsorization) if genuine but extreme. Keep and acknowledge if real and meaningful. Transform (log scale) if skewed distribution. The wrong approach is automatically removing outliers without investigation. Always ask: is this an error, a real extreme value, or evidence of a different population segment?" },
    { question: "Explain the difference between correlation and causation with an example.", answer: "Correlation means two variables move together statistically. Causation means one variable directly causes changes in the other. Classic example: ice cream sales correlate with drowning rates. Both are caused by a third variable (hot weather), not each other. In business: page views correlate with conversions, but increasing page views does not necessarily increase conversions. Establish causation with: controlled experiments (A/B tests), natural experiments, or causal inference techniques (difference-in-differences, instrumental variables). Most business questions care about causation; most available data only gives you correlation." },
    { question: "How do you design and analyze an A/B test?", answer: "Design: define the hypothesis and primary metric before starting. Calculate required sample size using power analysis (typically 80% power, 95% confidence, minimum detectable effect based on business significance). Randomly assign users to control and treatment. Run for at least one full business cycle. Analysis: check sample ratio mismatch (assignment bug). Use a two-sided t-test or z-test for proportions. Calculate p-value and confidence interval. A p-value < 0.05 means the result is unlikely due to chance, not necessarily that the effect is large. Also check effect size and practical significance. Common mistakes: peeking at results before reaching target sample size, multiple testing without correction, ignoring guardrail metrics." },
    { question: "What is a cohort analysis and when would you use it?", answer: "Cohort analysis groups users by a shared characteristic (usually the time period they joined) and tracks their behavior over time. This removes the survivorship bias of looking at all active users (who are, by definition, the ones who did not churn). Use cases: tracking retention by signup cohort to see if product improvements are working, comparing LTV across acquisition channels, understanding how behavior changes as users mature. A healthy product shows later cohorts with better retention curves than earlier ones. Flat or worsening retention curves despite growth indicate the product is growing by adding users faster than it loses them, which is unsustainable." },
    { question: "How do you communicate data findings to a non-technical audience?", answer: "Lead with the answer, not the methodology. Executives want the 'so what', not the 'how'. Start with the business implication: 'Checkout conversion dropped 8% in Q3. The data points to a mobile UX issue on the payment step, which I can show you.' Then show the evidence. Use simple visualizations: bar charts and line charts beat scatter plots for most audiences. Annotate key moments on charts (spike on date X = product launch). Avoid jargon: p-value becomes 'statistically significant', cohort becomes 'users who joined in January'. Anticipate the 'but what about...' questions and address them proactively." },
    { question: "What is the difference between mean, median, and when to use each?", answer: "Mean: average of all values. Sensitive to outliers. Use for: normally distributed data, when every data point should influence the summary. Median: middle value when sorted. Robust to outliers. Use for: skewed distributions (income, house prices, response times), when outliers should not dominate. Example: if 9 users spend $10 and 1 spends $10,000, mean spend is $1,009 (misleading), median is $10 (more representative of typical user). For business metrics: use median for latency (p50) and supplement with p95/p99 for tail performance. Revenue and growth metrics typically use mean." },
    { question: "How would you investigate a sudden drop in a key metric?", answer: "Systematic diagnosis before conclusions. Step 1: verify the data is real (check instrumentation, data pipeline, recent code changes to tracking). Step 2: segment the drop (is it all users or a subset? All platforms or mobile only? All regions or one?). Step 3: check for external causes (holiday, competitor event, marketing change). Step 4: correlate with product changes (recent deployments, A/B tests, feature launches). Step 5: check funnel steps upstream and downstream (is the drop isolated or cascading?). Build a hypothesis from the segmentation and test it. The most common root causes: tracking bug, A/B test side effect, platform-specific regression, external marketing change." },
  ],

  "financial-analyst": [
    { question: "Walk me through a DCF analysis.", answer: "A Discounted Cash Flow values a company based on the present value of its future cash flows. Steps: (1) Project unlevered free cash flows (EBIT * (1-tax) + D&A - capex - change in working capital) for 5-10 years using revenue growth and margin assumptions. (2) Calculate terminal value using Gordon Growth Model (FCF * (1+g) / (WACC-g)) or exit multiple method. (3) Discount all cash flows back to present using WACC as the discount rate. (4) Add terminal value PV to sum of projected FCF PVs to get enterprise value. (5) Subtract net debt and add cash to get equity value. Divide by shares outstanding for price per share. Key levers: revenue growth rate, EBIT margins, WACC, and terminal growth rate." },
    { question: "What is WACC and how do you calculate it?", answer: "WACC (Weighted Average Cost of Capital) is the average rate of return a company must earn to satisfy all capital providers. Formula: WACC = (E/V * Re) + (D/V * Rd * (1-T)). E = equity value, D = debt value, V = E+D, Re = cost of equity, Rd = cost of debt, T = tax rate. Cost of equity via CAPM: Rf + Beta * (Rm - Rf). Risk-free rate: current 10-year treasury. Equity risk premium (Rm-Rf): typically 5-7%. Beta from comparable public companies, unlevered then re-levered for target capital structure. Cost of debt: yield on company's bonds or credit spread over risk-free rate." },
    { question: "Explain the three financial statements and how they connect.", answer: "Income statement: revenue - expenses = net income. Shows profitability over a period. Balance sheet: assets = liabilities + equity at a point in time. Cash flow statement: reconciles net income to actual cash movement across operating, investing, and financing activities. Connections: net income from income statement flows into retained earnings on balance sheet. Depreciation is added back in cash flow (non-cash expense). Capex on cash flow reduces or increases PP&E on balance sheet. Borrowings on cash flow increase debt on balance sheet. Balance sheet must balance: if you can build an integrated three-statement model from scratch with all links correct, that's the core financial modeling skill interviewers test." },
    { question: "What is the difference between enterprise value and equity value?", answer: "Enterprise value (EV): total value of the business to all capital providers (debt holders and equity holders). EV = market cap + total debt + preferred stock + minority interest - cash. Equity value: value to equity holders only. Market cap = share price * shares outstanding. Why it matters: EV multiples (EV/EBITDA, EV/Revenue) are capital-structure-neutral and allow comparison across companies with different debt levels. Equity multiples (P/E) are affected by leverage. Use EV multiples for valuation comparisons. Use equity value when you care specifically about what common shareholders own." },
    { question: "How do you build a financial model for a company you have never covered before?", answer: "Start with the business model: how does the company make money? What are the key drivers? For a SaaS company: ARR, new ARR, churn, net revenue retention. For a retailer: store count, same-store sales, revenue per store. Top-down or bottom-up: bottom-up models build revenue from unit economics (price * volume), more accurate. Top-down uses market size * market share, useful for projections but less granular. Historical analysis: at least 3 years of actuals to understand seasonality, margin trends, and growth patterns. Key assumptions: revenue growth, gross margins, EBITDA margins, capex intensity, working capital dynamics. Sensitivity analysis: which assumptions drive value most? That is where you focus diligence." },
    { question: "What does LBO stand for and why would a private equity firm do one?", answer: "LBO: Leveraged Buyout. A PE firm acquires a company using a small equity contribution (20-40%) and a large amount of debt (60-80%) secured by the target's assets and cash flows. Why: debt amplifies equity returns. If you buy a $100M company with $30M equity and sell for $130M, you tripled your equity (returned $60M on $30M). Value creation levers: operational improvements (margin expansion, revenue growth), multiple expansion (buy at 7x, sell at 10x), and debt paydown (reduces enterprise value needed for a given equity return). Ideal LBO candidate: stable cash flows, low capex, defensible market position, pricing power, and a management team that can execute the improvement plan." },
    { question: "How do you value a company with negative earnings?", answer: "P/E is useless for negative earnings. Alternatives: EV/Revenue (useful for early-stage growth companies; compare to sector peers). EV/Gross Profit (more meaningful than revenue when gross margins vary significantly). EV/EBITDA when EBITDA is positive. DCF using projected future cash flows when earnings will turn positive. Comparable transactions: what have similar companies sold for? For early-stage: DAU/MAU multiples, ARR multiples, or user count multiples depending on business model. The key question is always: what metric do investors use to value companies in this sector? Use that metric." },
    { question: "What is working capital and why does it matter for valuation?", answer: "Working capital = current assets - current liabilities (typically: accounts receivable + inventory - accounts payable). It represents the cash tied up in day-to-day operations. Increases in working capital consume cash (you're building inventory or extending credit). Decreases release cash. Negative working capital businesses (Amazon, McDonald's) are attractive: they collect cash before paying suppliers, funding growth with customer money. In DCF models, changes in working capital are subtracted from net income to get free cash flow. Aggressive working capital management can significantly improve a company's cash generation without changing profitability." },
    { question: "How do you approach a case where a company is deciding whether to acquire a competitor?", answer: "Frame it as: strategic rationale, valuation, deal structure, and risk. Strategic rationale: why this target? Revenue synergies (new customers, cross-sell), cost synergies (headcount, procurement, facilities), technology/IP acquisition, market consolidation. Valuation: standalone DCF, then synergy-adjusted DCF. Comparable transaction multiples. What price creates value for the acquirer (synergies > premium paid)? Deal structure: cash vs stock (stock dilutes existing shareholders), earnouts (align seller on synergy delivery), asset vs stock deal (tax implications). Key risks: integration complexity (culture, systems), regulatory approval, synergy realization timeline, management retention." },
  ],

  "marketing-manager": [
    { question: "How do you build a go-to-market strategy for a new product?", answer: "GTM strategy answers: who are we selling to, what are we selling them, how will we reach them, and what will it cost? Steps: (1) Define ICP (ideal customer profile): firmographics, psychographics, pain points, buying triggers. (2) Positioning: how are we different from alternatives? (3) Messaging: what is the core value proposition for each segment? (4) Channel strategy: where does the ICP discover and evaluate products? (5) Pricing: value-based, competitive, or cost-plus? (6) Launch plan: pre-launch (build audience), launch day (press, influencers, paid), post-launch (nurture, case studies). (7) Metrics: pipeline generated, customer acquisition cost, conversion rate at each funnel stage." },
    { question: "Explain the difference between acquisition, activation, retention, referral, and revenue (AARRR).", answer: "AARRR (Pirate Metrics) maps the customer lifecycle: Acquisition: how do users find you? Metrics: sessions, clicks, CPL. Activation: do users have a first great experience? Metrics: signup rate, time to first key action. Retention: do users come back? Metrics: DAU/MAU, 30/60/90-day retention, churn rate. Referral: do users tell others? Metrics: NPS, referral rate, viral coefficient (K-factor). Revenue: do you make money? Metrics: ARPU, LTV, CAC, payback period. Most companies over-invest in acquisition and under-invest in retention. Improving retention has compounding returns: the same acquisition spend generates more lifetime value." },
    { question: "How do you measure the ROI of a marketing campaign?", answer: "Depends on the campaign goal. For direct response: revenue attributed / campaign cost. Attribution models: last-click (easy but gives all credit to final touchpoint), first-click (credits discovery), linear (equal credit to all touchpoints), time-decay (more credit to recent touchpoints), data-driven (ML-based). For brand campaigns: brand lift studies, awareness surveys, share of voice. For content: organic traffic, backlinks, time to rank for target keywords. The most honest measure: incrementality testing. Run the campaign for a holdout group that doesn't see it and compare outcomes. Harder to execute but removes attribution model bias." },
    { question: "What is the difference between brand marketing and performance marketing?", answer: "Brand marketing builds awareness, perception, and long-term preference. Hard to measure directly. Long payback period. Channels: PR, sponsorships, content, brand partnerships, TV/OOH. Measured by: brand awareness, consideration, NPS, share of voice. Performance marketing drives measurable short-term actions (clicks, conversions, purchases). Easy to attribute. Short payback period. Channels: paid search, paid social, display, email, affiliate. Measured by: CPC, CPA, ROAS, CAC. The best marketing organisations do both. Performance without brand: you're buying every customer and price sensitive. Brand without performance: awareness doesn't convert. Balance depends on category maturity and competitive intensity." },
    { question: "How do you prioritize marketing channels for a B2B SaaS company?", answer: "Start with the buyer journey: how does your ICP discover, evaluate, and buy software? Common B2B SaaS channel priority: (1) SEO and content: high-intent organic traffic compounds over time, best LTV. (2) LinkedIn: effective for reaching buying committee members at target accounts. (3) SEM: capture high-intent searches, fast but expensive. (4) Outbound: works for ABM at enterprise targets, high CAC but predictable. (5) Partnerships: integration partners and resellers scale without proportional CAC. (6) Product-led growth: freemium or free trial to drive organic adoption. Start with 2-3 channels, prove unit economics, then scale. Adding channels without proving each one wastes resources." },
    { question: "Describe a campaign you ran that did not perform as expected. What happened?", answer: "Use STAR structure. The most credible answers include: what your hypothesis was, what you expected based on what evidence, what actually happened (specific metrics that missed), your diagnosis of why (audience mismatch, wrong channel, messaging not resonating, bad timing), what you changed, and the result of the iteration. Interviewers are assessing: do you measure things precisely, do you understand why campaigns succeed or fail, can you diagnose problems rather than just acknowledge them, and do you iterate based on evidence. Answers that blame external factors without self-reflection score poorly. Answers showing precise measurement and hypothesis-driven iteration score well." },
    { question: "What is account-based marketing (ABM) and when should you use it?", answer: "ABM flips the funnel: instead of casting wide and filtering, you identify specific target accounts and orchestrate personalized marketing and sales plays toward them. When to use ABM: high-ACV deals (typically $50K+), long sales cycles, small addressable market (if there are only 500 potential customers, broadcasting to millions makes no sense), products with a defined buying committee. ABM tiers: 1:1 for most strategic accounts (fully customized), 1:few for a cluster of similar accounts (lightly personalized), 1:many for broad segments (scaled personalization). Success metrics: account engagement score, pipeline from target accounts, win rate on targeted accounts vs non-targeted." },
    { question: "How do you think about customer lifetime value (LTV) and customer acquisition cost (CAC)?", answer: "LTV: total revenue a customer generates over their relationship, often calculated as ARPU / churn rate for subscription businesses. CAC: total sales and marketing spend to acquire one customer in a period (spend / new customers). LTV:CAC ratio: healthy SaaS is 3:1 or higher. Below 1 means you lose money on every customer. CAC payback period: months until you recover acquisition cost (CAC / monthly gross profit per customer). Healthy: under 18 months for SMB, under 36 months for enterprise. How to improve: increase ARPU (pricing, upsell), reduce churn, improve conversion rates (reduces CAC), optimize channel mix toward lower-CAC channels." },
  ],

  "sales-manager": [
    { question: "How do you build and manage a sales pipeline?", answer: "A healthy pipeline has consistent deal flow at each stage with a ratio that reflects realistic conversion rates. Build it through: outbound prospecting (SDR-sourced), inbound marketing leads, referrals, and existing customer expansion. Manage it with: weekly pipeline reviews focused on deals likely to close in the quarter (not the full pipeline), clear stage definitions with entry/exit criteria, deal health scoring (activity recency, stakeholder coverage, timeline to decision), and mandatory fields at each stage (decision maker identified, budget confirmed, compelling event). Red flags: pipeline concentrated in late stages with weak early stages, deals stalling at the same stage, deals lingering past expected close date without movement." },
    { question: "How do you handle a sales rep who is missing quota consistently?", answer: "Diagnose before deciding. The causes of quota miss fall into: skills gap (can't execute the process), will gap (won't put in the effort), market fit gap (territory or segment doesn't have opportunity), or process gap (the sales process itself is broken for this market). Diagnose by: listening to calls, reviewing pipeline quality, checking activity metrics (calls, meetings, outreach volume), and talking to their customers. Intervention path: coaching for skills gaps (call recordings, role play, targeted training), pipeline reviews and accountability for execution gaps, territory adjustment for market gaps. Performance improvement plans have a timeline and specific measurable milestones. Be honest about when the gap is not fixable." },
    { question: "Explain your approach to sales forecasting.", answer: "Commit-based forecasting: reps assign each deal a category (commit = will close this period, upside = might close, pipeline = working). Forecast accuracy depends on commitment culture: reps who commit conservatively and always hit are more valuable than those who commit high and miss. Historical-based forecasting: use actual conversion rates by stage and age in stage to calculate expected close amounts statistically. AI/ML forecasting: tools like Clari or Gong analyze activity signals to predict close probability independent of rep assessment. Best practice: use a combination. Rep commits provide context, statistical models provide sanity checks. Track forecast accuracy weekly and hold reps accountable for commit accuracy, not just quota attainment." },
    { question: "How do you ramp a new sales rep to full productivity?", answer: "Structure the ramp into phases. Weeks 1-2: product knowledge, sales methodology training, CRM setup, shadowing experienced reps on calls. Weeks 3-4: starts making calls with manager support, builds initial pipeline. Month 2: full outbound activity with weekly coaching on calls. Month 3: independent execution with deal reviews. Full quota expected at month 4-6 depending on sales cycle length (enterprise reps take longer to ramp). Key metrics for ramp: activity volume (calls, emails, meetings) in weeks 1-4, pipeline creation in month 1-2, first close in month 2-3. Common failure modes: insufficient product training, insufficient coaching on discovery and objection handling, and giving reps a bad territory during ramp that produces no results despite good effort." },
    { question: "What is your coaching philosophy for improving a sales rep's performance?", answer: "Coaching must be specific, evidence-based, and focused on one thing at a time. Generic feedback ('you need to listen more') is not coaching. Evidence-based feedback ('in the call on Tuesday, the prospect mentioned budget three times and you never addressed it') is. Sources for coaching: Gong or Chorus call recordings (listen to lost deals, not just wins), deal reviews (walk through the decision-making process on lost deals), role plays. The best sales managers spend 50%+ of their time coaching. Coaching cadence: brief (15 min) weekly check-ins on priority deals, deeper monthly coaching sessions on skill development. Tailor coaching to the rep: a new rep needs playbook reinforcement; an experienced rep needs strategic guidance on their top accounts." },
    { question: "How do you identify and replicate what top performers do?", answer: "Analyze top performers systematically: what does their pipeline look like (deal size distribution, industry concentration)? What is their win rate by segment and deal size? How do they run discovery (what questions do they ask)? What objections do they handle best? How do they multi-thread (engage multiple stakeholders)? How do they create urgency? Sources: call recordings, CRM data, win/loss interviews with their customers. Codify findings into the playbook: discovery question bank, objection handling scripts, account planning templates. Deploy through coaching, not mandates. Show the correlation between the behavior and the outcome ('reps who multi-thread into 3+ stakeholders have a 40% higher win rate'). Let reps see the data and choose to adopt." },
    { question: "How do you create a competitive sales environment without creating a toxic one?", answer: "Healthy competition makes performance visible and celebrated without creating zero-sum dynamics. Tactics that work: public leaderboards on activity metrics (calls, meetings booked) not just revenue (revenue competition creates sandbagging and deal hoarding), team challenges (hit team quota this month, everyone gets a bonus), peer recognition programs where reps nominate colleagues. Tactics that create toxicity: forced ranking that requires a bottom 10% to be fired each quarter, rewarding deal poaching from colleagues, culture where reps hide insights to protect their edge. The goal is a team where every rep wants their colleagues to succeed because a strong team makes them better, not a team of lone wolves protecting their territory." },
    { question: "What metrics do you use to evaluate your sales team's health?", answer: "Leading indicators (predictive): activity volume (calls, emails, meetings per rep per week), pipeline coverage ratio (pipeline value / quota, healthy is 3-4x), qualified pipeline creation rate. Lagging indicators (outcomes): quota attainment percentage (how many reps are at 100%+), average deal size, win rate by stage, sales cycle length. Efficiency metrics: CAC, CAC payback period, pipeline velocity (deals * win rate * ACV / sales cycle length). Warning signs: pipeline coverage dropping below 2x, win rate declining, deals stalling at the same stage, high SDR-to-AE handoff rejection rate. Review leading indicators weekly; review lagging indicators monthly and quarterly." },
  ],

  "business-analyst": [
    { question: "How do you gather requirements from stakeholders who do not know what they want?", answer: "Most stakeholders know what problem they have, not what solution they need. Start with the problem, not the solution. Use facilitation techniques: '5 Whys' to get from symptom to root cause, 'As a user I want' user story format to shift from feature requests to goal framing, process mapping workshops to surface pain points that stakeholders cannot articulate verbally. Prototypes and wireframes elicit clearer feedback than abstract descriptions: 'here are three ways we could solve this, which resonates?' Ask about context, not solutions: 'what does your day look like today and where does this problem occur?' Validate understanding by reflecting back: 'so if I understand correctly, the real problem is X. Is that right?'" },
    { question: "How do you write a good business requirements document (BRD)?", answer: "A BRD answers: what problem are we solving, why are we solving it now, who is affected, what success looks like, and what the system must do. Structure: executive summary (one page), business problem statement, success metrics (specific and measurable), scope (in scope / explicitly out of scope), stakeholders and their roles, functional requirements (what the system must do, not how), non-functional requirements (performance, security, compliance), assumptions and dependencies, open questions. The failure mode for BRDs: writing solution requirements (how it should work) instead of business requirements (what it must accomplish). A good BRD gives engineers freedom to design the best solution while giving the business confidence the right problem is being solved." },
    { question: "Explain the difference between a use case and a user story.", answer: "A use case describes a complete interaction between a user and the system to achieve a goal, including alternative and exception flows. Format: Actor, Precondition, Main flow (numbered steps), Alternative flows (variations), Exception flows (errors). Detailed, formal, good for complex workflows and regulatory documentation. A user story is a brief, informal description of a feature from the user's perspective. Format: As a [user type], I want [goal] so that [benefit]. Short, focused, designed to prompt conversation rather than document everything. User stories are the currency of Agile backlogs; use cases suit formal requirements in regulated industries or complex enterprise systems where all exception paths must be documented." },
    { question: "How do you prioritize a backlog of competing requirements?", answer: "Several frameworks exist. MoSCoW: Must have (launch blocker), Should have (important but not critical), Could have (nice to have), Won't have (explicitly excluded). Value vs Effort matrix: plot each requirement by business value and implementation effort, prioritize high value / low effort. RICE: Reach (how many users affected) * Impact (magnitude of improvement) * Confidence (certainty of estimates) / Effort. In practice: align with stakeholders on strategic goals first. Requirements that directly advance the top 3 goals get priority. Involve engineering early to surface hidden complexity. Reassess when assumptions change. The hardest part is saying no or not yet to stakeholders with legitimate needs." },
    { question: "How do you perform a gap analysis?", answer: "A gap analysis documents the difference between current state and desired future state. Steps: (1) Define the desired future state clearly (regulatory requirement, business goal, competitive parity). (2) Document the current state thoroughly (process maps, system capabilities, data quality, headcount). (3) Identify the gaps: what capabilities, processes, or data are missing or insufficient? (4) Assess impact: which gaps are blockers vs nice-to-haves? (5) Develop recommendations: for each significant gap, what are the options to close it? (6) Prioritize by impact and feasibility. Use case: preparing for a system migration, assessing readiness for a new regulation, or evaluating a company before an acquisition." },
    { question: "How do you handle conflicting requirements from different stakeholders?", answer: "Conflicting requirements usually reflect conflicting priorities, not irrational stakeholders. Process: (1) Document both requirements explicitly without judgment. (2) Understand the underlying goal behind each requirement (often the goals are compatible even when the requirements are not). (3) Involve both stakeholders together: 'you need X and you need Y. Can we look at whether there's a solution that meets both needs?' (4) If a genuine trade-off exists, escalate to a decision-maker with both options and the implications of each. (5) Document the decision and rationale. Avoid being the decision-maker yourself for business trade-offs. Your role is to make the conflict visible and provide the information needed to resolve it, not to decide for stakeholders." },
    { question: "How do you measure whether a solution you delivered was successful?", answer: "Define success metrics before delivery, not after. Without pre-defined metrics, success is whatever the loudest stakeholder says it is. Process: during requirements gathering, agree on measurable outcomes: 'this process improvement should reduce processing time from 4 hours to 1 hour' or 'this feature should increase conversion rate from 3% to 4%'. After go-live: measure the same KPIs used to justify the project. Compare to baseline. If metrics are not moving, investigate: adoption problem (users are not using the solution), training problem (users do not know how), or solution problem (the design does not address the root cause). Schedule a post-implementation review 30, 60, and 90 days after launch." },
    { question: "Describe a project where requirements changed significantly mid-stream. How did you handle it?", answer: "Use STAR. Good answers cover: what triggered the change (new regulation, strategic pivot, technical discovery), how you assessed the impact on scope, timeline, and budget, how you communicated to stakeholders (changes have costs and those costs need to be explicit), how you re-prioritized the backlog, and what you would do differently in requirements gathering to catch this earlier. The maturity signal interviewers look for: did you treat the change as a problem to blame on stakeholders, or as information that improved the outcome? Experienced BAs know that requirements always change; the question is whether your process surfaces changes early enough to manage them gracefully." },
  ],
};

/** Returns Q&As for a role, with a sensible generic fallback */
export function getRoleQuestions(slug: string): RoleQA[] {
  if (ROLE_QUESTIONS[slug]) return ROLE_QUESTIONS[slug];
  const display = ROLE_DISPLAY[slug];
  const name = display?.name ?? slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return [
    { question: `What are the most important skills for a ${name}?`,                         answer: `The core skills depend on the company and context, but universally valued: strong domain expertise, clear communication, and the ability to scope problems and deliver results. Review the job description for the exact requirements, then demonstrate those skills with concrete examples from your experience.` },
    { question: `How should I prepare for a ${name} behavioral interview?`,                  answer: `Use the STAR method (Situation, Task, Action, Result) for every behavioral question. Prepare 5-7 strong stories covering: a project you led, a conflict you resolved, a failure you learned from, a time you showed initiative, and a time you influenced without authority. Quantify results wherever possible.` },
    { question: `What is the ${name} interview process typically like?`,                     answer: `Most organizations follow: (1) recruiter screen (20-30 min), (2) hiring manager screen (45 min, domain knowledge + culture fit), (3) panel/technical rounds (2-4 rounds, role-specific), (4) behavioral/leadership rounds (1-2 rounds), (5) offer. The whole process typically takes 3-6 weeks.` },
    { question: `What salary should I expect as a ${name}?`,                                 answer: `Compensation varies significantly by company size, location, and experience level. Research current ranges on Glassdoor, LinkedIn Salary, and Levels.fyi. Always negotiate, most first offers have room. Know your walk-away number, anchor high, and negotiate base, bonus, and any other components as a package.` },
    { question: `How do I stand out as a ${name} candidate?`,                               answer: `Beyond domain skills: (1) Show ownership, describe projects with impact, not just tasks. (2) Ask great questions, research the company's recent challenges. (3) Demonstrate learning, mention something you've taught yourself recently. (4) Quantify everything. (5) Send a thoughtful thank-you email referencing something specific from the conversation.` },
    { question: `What are the biggest challenges facing ${name}s today?`,                    answer: `The landscape is always evolving. Broadly: rapid automation of routine tasks (requires shifting to higher-value work), increasing cross-functional expectations (specialists must now collaborate more broadly), and the shift to data-driven decision-making in every function. Staying current in your field requires continuous learning, follow industry publications, attend conferences, and build a professional network that helps you anticipate changes.` },
    { question: `How do you prioritize your work as a ${name}?`,                            answer: `I use a combination of impact and urgency to prioritize. Start by aligning with your manager on what matters most this week and this quarter. For day-to-day: tackle the highest-impact work when you have the most cognitive energy, batch similar tasks, and protect focused time from interruptions. When everything feels urgent, ask: what breaks if I don't do this today? That usually clarifies real vs. perceived urgency.` },
  ];
}

// =============================================================================
// 6. COMPANY PREP DATA
// =============================================================================

/**
 * Company prep coverage.
 *
 * The original 20 were all tech, which left every non-tech role in ROLE_DISPLAY
 * without a single relevant company page, a Financial Analyst or Paralegal had
 * nowhere to go. The additions below are weighted toward those uncovered
 * categories: investment banking, quant trading, consulting, Big 4, healthcare
 * and retail, plus the high-volume tech employers that were missing.
 */
export type CompanySlug =
  // Tech, original 20
  | "google" | "amazon" | "meta" | "microsoft" | "apple"
  | "stripe" | "spotify" | "netflix" | "uber" | "airbnb"
  | "linkedin" | "salesforce" | "oracle" | "adobe" | "nvidia"
  | "openai" | "anthropic" | "databricks" | "snowflake" | "palantir"
  // Tech, added
  | "tesla" | "coinbase" | "figma" | "datadog" | "cloudflare"
  | "atlassian" | "shopify" | "doordash" | "robinhood" | "bloomberg"
  // Investment banking
  | "goldman-sachs" | "jpmorgan" | "morgan-stanley" | "evercore" | "blackstone"
  // Quant / trading
  | "citadel" | "jane-street" | "two-sigma"
  // Consulting
  | "mckinsey" | "bcg" | "bain"
  // Big 4 / professional services
  | "deloitte" | "pwc" | "ey" | "kpmg" | "accenture"
  // Healthcare
  | "unitedhealth" | "cvs-health" | "mayo-clinic" | "kaiser-permanente"
  // Consumer / retail / industrial
  | "walmart" | "target" | "procter-and-gamble" | "johnson-and-johnson"
  | "capital-one" | "american-express";

export const ALL_COMPANIES: CompanySlug[] = [
  "google","amazon","meta","microsoft","apple","stripe","spotify","netflix",
  "uber","airbnb","linkedin","salesforce","oracle","adobe","nvidia",
  "openai","anthropic","databricks","snowflake","palantir",
  "tesla","coinbase","figma","datadog","cloudflare",
  "atlassian","shopify","doordash","robinhood","bloomberg",
  "goldman-sachs","jpmorgan","morgan-stanley","evercore","blackstone",
  "citadel","jane-street","two-sigma",
  "mckinsey","bcg","bain",
  "deloitte","pwc","ey","kpmg","accenture",
  "unitedhealth","cvs-health","mayo-clinic","kaiser-permanente",
  "walmart","target","procter-and-gamble","johnson-and-johnson",
  "capital-one","american-express",
];

export interface CompanyMeta {
  displayName: string;
  title: string;
  description: string;
  overview: string;
  interviewProcess: string[];
  culture: string;
  difficulty: "Medium" | "Hard" | "Very Hard" | "Extremely Hard";
  avgRounds: number;
  avgDuration: string;
  topRoles: string[];
  tips: string[];
  relatedCompanies: CompanySlug[];
  tier:
    | "FAANG"
    | "AI Labs"
    | "Top Tier"
    | "Unicorn"
    | "Enterprise"
    | "Investment Banking"
    | "Quant & Trading"
    | "Consulting"
    | "Professional Services"
    | "Healthcare"
    | "Consumer & Retail"
    | "Financial Services";
}

export const COMPANY_META: Record<string, CompanyMeta> = {
  google:     { displayName: "Google",     tier: "FAANG",     difficulty: "Very Hard",      avgRounds: 5, avgDuration: "4-6 weeks",  title: "How to Prepare for a Google Interview (2026) | Preciprocal",     description: "Complete Google interview prep: process, coding expectations, system design, Googleyness, and hiring committee review.",                     overview: "Google evaluates candidates on four dimensions: General Cognitive Ability, Leadership, Googleyness (culture fit), and Role-Related Knowledge. Pedigree doesn't matter, a state school grad who interviews well is evaluated identically to a Stanford PhD.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (45-60 min), 1-2 LeetCode-medium problems","Onsite (4-5 rounds, 45 min each)","  -> 2 coding rounds (algorithms, data structures)","  -> 1 system design round (L4+)","  -> 1-2 Googleyness / behavioral rounds","Hiring committee review, packet reviewed by 4-5 engineers","Team matching (L4 offers)","Offer (4-8 weeks total)"], culture: "Google values intellectual humility, comfort with ambiguity, collaboration over ego, and a bias toward action. Show curiosity: ask clarifying questions, think out loud, and engage genuinely with the interviewer's perspective.", topRoles: ["Software Engineer","Product Manager","Data Scientist","Technical Program Manager"], tips: ["Practice 100+ LeetCode medium/hard problems, trees, graphs, DP, string manipulation.","Prepare 6-8 STAR stories covering leadership, conflict, failure, and cross-functional collaboration.","For system design, practice YouTube, Google Search, Gmail, Maps, deep on trade-offs.","Think out loud. Reasoning process matters more than the perfect answer.","Never assume constraints, always clarify input sizes, edge cases, output format."], relatedCompanies: ["meta","microsoft","amazon"] },
  amazon:     { displayName: "Amazon",     tier: "FAANG",     difficulty: "Hard",           avgRounds: 5, avgDuration: "2-4 weeks",  title: "How to Prepare for an Amazon Interview (2026) | Preciprocal",    description: "Complete Amazon interview prep: all 16 Leadership Principles, Bar Raiser explained, coding expectations, and STAR frameworks.",               overview: "Amazon's process is uniquely driven by their 16 Leadership Principles (LPs). Every question, even technical ones, ties back to an LP. The Bar Raiser is an interviewer from outside your team with veto power whose sole job is maintaining the hiring bar.",     interviewProcess: ["Online assessment (SWE only), 2 coding questions, 90 min","Phone screen (45-60 min), 1 coding + 2-3 LP behavioral questions","Virtual onsite (4-6 rounds, 60 min each)","  -> 2-3 technical rounds (coding, system design for SDE II+)","  -> 1 Bar Raiser round (deep LP + technical)","  -> 1-2 LP behavioral rounds","Hiring manager debrief, same day","Offer (2-4 weeks total)"],                                        culture: "Amazon values Ownership above almost everything else. The LPs probed most often: Customer Obsession, Ownership, Bias for Action, Dive Deep, and Disagree and Commit. They love candidates who took initiative without being asked.",                             topRoles: ["Software Development Engineer","Product Manager","Solutions Architect","Data Engineer"],       tips: ["Prepare one strong STAR story for every one of the 16 Leadership Principles. Non-negotiable.","Speak in complete, structured sentences, Amazon interviewers explicitly take notes.","For 'disagreed with manager', show you pushed back AND committed once the decision was made.","Coding is LeetCode medium: graph BFS/DFS, queues/stacks, string manipulation.","Have depth behind every story, know your numbers, outcome, and what you'd do differently."], relatedCompanies: ["google","microsoft","stripe"] },
  meta:       { displayName: "Meta",       tier: "FAANG",     difficulty: "Very Hard",      avgRounds: 5, avgDuration: "3-6 weeks",  title: "How to Prepare for a Meta Interview (2026) | Preciprocal",       description: "Complete Meta interview prep: coding difficulty, social-scale system design, behavioral framework, and Meta's move-fast culture.",             overview: "Meta interviews are known for coding difficulty and scale-oriented system design (billions of users, petabyte-scale data, real-time communication). Their behavioral framework focuses on Impact, how you moved metrics and influenced people.",              interviewProcess: ["Recruiter screen (15-30 min)","Technical phone screen (45-60 min), 2 LeetCode problems","Virtual onsite (4-5 rounds)","  -> 2 coding rounds (often harder than Google)","  -> 1 system design round (social graph, news feed, distributed systems)","  -> 1 behavioral round (impact, leadership, cross-functional)","Hiring committee vote","Offer (2-6 weeks)"],                                                              culture: "Meta's culture is 'Move fast, have impact.' They value engineers who ship. Behavioral questions probe cross-functional influence, handling ambiguity at scale, and resilience. They ask how you handle disagreements, show backbone combined with execution.", topRoles: ["Software Engineer","Research Scientist","Product Manager","Data Scientist"],                  tips: ["Meta coding is harder than average, practice LeetCode hard, especially graphs and DP.","System design: study Facebook News Feed, Instagram Stories, WhatsApp architecture, distributed caching.","Use specific metrics in behavioral answers: 'I improved DAU by 18% over 6 weeks.'","Know Meta's products deeply, 'What would you change about this product?' is common.","Meta values influence without authority. Prepare stories about rallying people around an idea."], relatedCompanies: ["google","amazon","netflix"] },
  microsoft:  { displayName: "Microsoft",  tier: "FAANG",     difficulty: "Hard",           avgRounds: 5, avgDuration: "2-4 weeks",  title: "How to Prepare for a Microsoft Interview (2026) | Preciprocal",  description: "Complete Microsoft interview prep: growth mindset culture, 'as appropriate' designee, technical expectations, and collaboration emphasis.",       overview: "Microsoft interviews are rigorous but more collaborative than Google or Meta. They use an 'as appropriate' (AA) designee who assesses the hiring bar. Microsoft emphasizes growth mindset (Carol Dweck's framework), they want learners, not people with fixed skills.", interviewProcess: ["Recruiter screen (30 min)","Technical phone/Teams screen (45-60 min), 1-2 coding problems","Onsite (4-5 rounds, 45-60 min each)","  -> 2-3 coding rounds (algorithms, data structures)","  -> 1 system design round (senior roles)","  -> 1 'As Appropriate' round, final bar assessment","  -> 1 behavioral / culture round","Debrief and decision (1-2 weeks post onsite)"],                                              culture: "Satya Nadella transformed Microsoft around 'growth mindset', intelligence is not fixed, failure is a learning opportunity. Show intellectual curiosity, skill development track record, and resilience. Microsoft values inclusion and collaboration; 'brilliant jerks' are an explicit no.", topRoles: ["Software Engineer","Product Manager","Cloud Solutions Architect","Data Scientist"],           tips: ["Prepare 'growth mindset' stories, times you failed, what you learned, how you grew.","LeetCode medium: arrays, strings, trees, graphs.","System design focuses on cloud/Azure architectures.","Be collaborative in interviews, it's more of a dialogue than Google.","For PM roles, root every design decision in customer empathy."], relatedCompanies: ["google","amazon","salesforce"] },
  apple:      { displayName: "Apple",      tier: "FAANG",     difficulty: "Very Hard",      avgRounds: 5, avgDuration: "4-8 weeks",  title: "How to Prepare for an Apple Interview (2026) | Preciprocal",     description: "Complete Apple interview prep: team-specific process, craft culture, technical depth expectations, and what Apple actually looks for.",          overview: "Apple interviews are deeply technical and highly team-specific, there's no single Apple process. Universal: Apple values people who care intensely about quality, who have strong opinions about user experience, and who can execute with minimal guidance.",            interviewProcess: ["Recruiter screen (30 min)","Hiring manager screen (45 min), technical background","Multiple technical rounds (3-6, varies by team)","  -> Coding rounds (algorithms, domain-specific)","  -> Hardware/software design depending on role","  -> Behavioral and culture rounds","Team fit calls, meeting potential teammates","Offer (4-8 weeks, varies significantly)"],                                                               culture: "Apple values craft above almost everything. 'Good enough' doesn't resonate here. They want people who sweat the details, have strong opinions about quality, and can execute without hand-holding. Secrecy is also core, expect questions about handling confidential information.", topRoles: ["Software Engineer","Hardware Engineer","Product Design Engineer","Data Scientist"],            tips: ["Interviews are team-specific, research the specific team, not just Apple generally.","Show attention to detail and passion for quality in every answer.","Prepare for domain-specific deep-dives.","Behavioral questions focus on high-quality decisions with incomplete information.","Show that technical decisions consider the end-user experience."], relatedCompanies: ["google","meta","microsoft"] },
  stripe:     { displayName: "Stripe",     tier: "Top Tier",  difficulty: "Very Hard",      avgRounds: 6, avgDuration: "4-6 weeks",  title: "How to Prepare for a Stripe Interview (2026) | Preciprocal",     description: "Complete Stripe interview prep: API design, payments domain, written communication, and Stripe's unusually thorough hiring bar.",                overview: "Stripe is known for one of the most thorough hiring processes in tech. They care deeply about writing clarity (document-heavy culture), systems thinking, API design, and reliability. Some roles include a written screen, a take-home document exercise.", interviewProcess: ["Recruiter screen (30 min)","Technical screen (60 min), coding + system discussion","Written screen (some roles), document you write and submit","Onsite (4-6 rounds)","  -> 2 coding rounds (algorithms + practical problems)","  -> 1-2 system design rounds (APIs, distributed payments)","  -> 1 written communication round","  -> 1 behavioral round","Hiring debrief (1-2 weeks post onsite)"],                                                 culture: "Stripe values 'users first', rigorous thinking, clear writing, and extreme reliability consciousness, they move money, so correctness over speed. They want people who think about failure modes, build for edge cases, and write documentation others can follow a year later.", topRoles: ["Software Engineer","Product Manager","Solutions Engineer","Data Scientist"],                   tips: ["Study API design deeply, idempotency keys, versioning, error handling, REST best practices.","Write clearly. Stripe will judge your writing in emails, docs, and potentially a written screen.","Know payments fundamentals: card network flow, webhooks, idempotency, reconciliation.","Expect practical coding: 'implement a rate limiter' or 'design a retry mechanism.'","Show reliability thinking: what fails, how do we recover, what's the blast radius."], relatedCompanies: ["amazon","airbnb","uber"] },
  spotify:    { displayName: "Spotify",    tier: "Top Tier",  difficulty: "Hard",           avgRounds: 4, avgDuration: "3-5 weeks",  title: "How to Prepare for a Spotify Interview (2026) | Preciprocal",    description: "Complete Spotify interview prep: Squad model culture, music domain knowledge, backend systems at scale, and data-driven product thinking.",      overview: "Spotify runs a 'Squad model', autonomous cross-functional teams. Interviews reflect this: they value T-shaped skills (deep in one area, broad enough to collaborate across disciplines). Music domain knowledge helps but isn't required for most roles.",              interviewProcess: ["Recruiter screen (30 min)","Hiring manager screen (45 min)","Technical/role-specific rounds (2-3 rounds)","  -> For engineers: coding + system design (audio streaming at scale)","  -> For PMs: product sense + metrics cases","  -> For data scientists: SQL + ML + statistics","Values/behavioral round","Offer (3-5 weeks)"],                                                                                                culture: "Spotify values autonomy with accountability (Squads), passion for music and culture, data-driven decision-making, and a 'fail fast, learn faster' mentality. They look for people who can work independently and influence without authority.", topRoles: ["Backend Engineer","Data Scientist","Product Manager","Machine Learning Engineer"],               tips: ["Understand Spotify's technical challenges: real-time audio streaming, recommendation systems at scale, multi-device sync.","Know their products deeply, playlist algorithms, podcast features, artist tools.","Show data literacy: every decision should connect to a metric.","Research their engineering blog (engineering.atspotify.com) before the interview.","Behavioral questions probe autonomy and self-direction."], relatedCompanies: ["netflix","airbnb","meta"] },
  netflix:    { displayName: "Netflix",    tier: "Top Tier",  difficulty: "Very Hard",      avgRounds: 5, avgDuration: "4-6 weeks",  title: "How to Prepare for a Netflix Interview (2026) | Preciprocal",    description: "Complete Netflix interview prep: freedom and responsibility culture, top-of-market comp, no-policy policy, and what the keeper test means for hiring.", overview: "Netflix has an unusual culture: high talent density, freedom and responsibility, and no traditional HR policies (no vacation policy, no performance improvement plans). They only retain strong performers, they mean it. This shapes interviews: they assess for exceptional, not just good.", interviewProcess: ["Recruiter screen (30 min), values and background","Hiring manager screen (45 min)","Panel interviews (4-5 rounds, virtual)","  -> Technical depth: coding + system design at streaming scale","  -> Judgment and values: 'Would you be comfortable if Netflix shared your work publicly?'","  -> Cross-functional collaboration scenarios","Reference checks (taken very seriously at Netflix)","Offer (4-6 weeks)"],                                                              culture: "Netflix's Freedom and Responsibility culture means high autonomy and high accountability. They famously pay top of market and do the keeper test, would your manager fight hard to keep you? They value judgment, impact, and self-sufficiency over rule-following.", topRoles: ["Senior Software Engineer","Product Manager","Data Scientist","Content Strategist"],            tips: ["Read the Netflix Culture Memo, it genuinely shapes their interviews.","Prepare examples of exercising judgment in ambiguous situations without asking for permission.","Netflix technical questions focus on high-availability distributed systems and CDN architecture.","They value candor: 'What's the most direct feedback you've given a manager?'","References are taken very seriously, give strong references or expect it to surface."], relatedCompanies: ["spotify","meta","airbnb"] },
  uber:       { displayName: "Uber",       tier: "Top Tier",  difficulty: "Hard",           avgRounds: 5, avgDuration: "3-5 weeks",  title: "How to Prepare for an Uber Interview (2026) | Preciprocal",      description: "Complete Uber interview prep: marketplace systems, real-time dispatch at scale, data-heavy decision-making, and Uber's engineering culture.",    overview: "Uber operates complex real-time marketplace systems: matching riders and drivers, surge pricing, logistics optimization, and payments at global scale. Technical interviews often involve marketplace and geospatial systems. Data-driven decision making is core to the culture.",  interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (45-60 min), 1-2 coding problems","Onsite/virtual (4-5 rounds)","  -> 2 coding rounds (algorithms, graphs/BFS are common)","  -> 1 system design round (dispatch, surge, maps)","  -> 1-2 behavioral rounds (Uber values, past impact)","Hiring decision (1-2 weeks post onsite)"],                                                               culture: "Uber values 'big bold bets', customer obsession, and resourcefulness. After significant culture changes post-2017, they've rebuilt around inclusion and humility alongside drive and execution. They value people who can navigate ambiguity and make data-backed decisions quickly.", topRoles: ["Software Engineer","Data Scientist","Product Manager","Operations Manager"],                  tips: ["Study real-time marketplace systems: matching algorithms, dynamic pricing, geospatial indexing.","Uber coding favors graph problems, BFS/DFS, and systems that process events at high throughput.","For PMs: understand two-sided marketplace metrics (supply utilization, demand conversion, surge sensitivity).","For data scientists: experimentation design in a marketplace context is key.","Show you can operate with autonomy and make decisions without complete information."], relatedCompanies: ["airbnb","stripe","meta"] },
  airbnb:     { displayName: "Airbnb",     tier: "Top Tier",  difficulty: "Hard",           avgRounds: 5, avgDuration: "3-5 weeks",  title: "How to Prepare for an Airbnb Interview (2026) | Preciprocal",    description: "Complete Airbnb interview prep: trust and belonging culture, cross-functional emphasis, design sensibility, and technical expectations.",           overview: "Airbnb is known for strong culture fit emphasis, they genuinely believe in their 'belong anywhere' mission and hire for it. They also have high design sensibility across the company, not just design roles. Technical depth is expected alongside cultural alignment.",         interviewProcess: ["Recruiter screen (30 min)","Hiring manager screen (45 min)","Technical rounds (3-4)","  -> 2 coding rounds (clean, readable code matters)","  -> 1 system design or cross-functional design round","  -> 1 'Core Values' round, extensive culture and values assessment","Offer (3-5 weeks)"],                                                                                           culture: "Airbnb's core values (Belong Anywhere, Champion the Mission, Be a Host) are taken seriously. They look for people who are mission-driven (not just job-seeking), who default to collaboration, and who bring care to everything they do, the host mindset.",                    topRoles: ["Software Engineer","Product Manager","Data Scientist","UX Designer"],                         tips: ["Research Airbnb's mission and values deeply, they will come up in every behavioral question.","Code quality matters here: clear variable names, clean structure, not just working code.","For PMs and designers: show design sensibility even in technical discussions.","Prepare stories demonstrating the host mindset, taking care of others, going beyond what's required.","Know Airbnb's marketplace challenges: trust & safety, two-sided demand/supply, international expansion."], relatedCompanies: ["uber","netflix","spotify"] },
  linkedin:   { displayName: "LinkedIn",   tier: "Top Tier",  difficulty: "Hard",           avgRounds: 5, avgDuration: "3-5 weeks",  title: "How to Prepare for a LinkedIn Interview (2026) | Preciprocal",   description: "Complete LinkedIn interview prep: product thinking, trust and safety focus, data-driven culture, and engineering expectations.",                   overview: "LinkedIn sits at the intersection of social networking and professional data at scale. Interviews reflect this: product roles heavily probe economic graph thinking and trust/safety, while engineering roles focus on large-scale data systems and relevance algorithms.", interviewProcess: ["Recruiter screen (30 min)","Hiring manager screen (45 min)","Technical screen (60 min)","Virtual onsite (4-5 rounds)","  -> 2 coding rounds (algorithms + data structures)","  -> 1 system design (feed ranking, search, notifications)","  -> 1-2 behavioral rounds (culture + impact)","Offer (3-5 weeks)"], culture: "LinkedIn values trust, growth mindset, and economic opportunity for all members. They prize people who think about product and user impact holistically. The culture is relatively collaborative compared to some FAANG companies.", topRoles: ["Software Engineer","Product Manager","Data Scientist","Sales Solutions"], tips: ["Study feed ranking systems and large-scale graph problems for engineering roles.","For PMs: think about professional network dynamics and the economic graph.","LinkedIn behavioral questions focus on cross-functional influence and measurable impact.","Know LinkedIn's key products deeply: Feed, Search, Recruiter, Learning, Sales Navigator.","Prepare for trust and safety questions regardless of role."], relatedCompanies: ["microsoft","salesforce","google"] },
  salesforce: { displayName: "Salesforce", tier: "Enterprise", difficulty: "Medium",         avgRounds: 4, avgDuration: "2-4 weeks",  title: "How to Prepare for a Salesforce Interview (2026) | Preciprocal", description: "Complete Salesforce interview prep: Ohana culture, cloud CRM domain knowledge, and technical expectations for engineering and product roles.",    overview: "Salesforce pioneered cloud CRM and has a strong culture identity around their Ohana (family) values. Interviews are generally less algorithmically intense than pure-play tech companies, with heavier emphasis on cultural fit, customer success orientation, and product domain knowledge.", interviewProcess: ["Recruiter screen (30 min)","Hiring manager screen (45 min)","Panel interviews (3-4 rounds)","  -> Technical rounds (domain-specific, less LeetCode-heavy than FAANG)","  -> Behavioral rounds (Ohana values, customer focus)","  -> Case or product sense round (for PM/solution roles)","Offer (2-4 weeks)"], culture: "Salesforce Ohana culture emphasizes trust, customer success, equality, and giving back (1-1-1 model). They want people who are collaborative, customer-obsessed, and mission-driven. Cultural alignment is weighted more heavily here than at pure-play tech companies.", topRoles: ["Software Engineer","Product Manager","Solutions Engineer","Account Executive"], tips: ["Understand Salesforce's core products: Sales Cloud, Service Cloud, Marketing Cloud, Slack.","Ohana values will come up in behavioral questions, prepare stories around trust, giving back, and collaboration.","Technical interviews are more practical and domain-focused than algorithm-heavy.","For solution engineering roles: know Salesforce's ecosystem of integrations and customization options.","Show genuine customer success orientation, not just getting the sale but solving the problem."], relatedCompanies: ["microsoft","oracle","linkedin"] },
  oracle:     { displayName: "Oracle",     tier: "Enterprise", difficulty: "Hard",           avgRounds: 5, avgDuration: "3-5 weeks",  title: "How to Prepare for an Oracle Interview (2026) | Preciprocal",    description: "Complete Oracle interview prep: database and cloud infrastructure focus, enterprise sales culture, and technical depth expectations.",             overview: "Oracle is transitioning from legacy enterprise software to cloud infrastructure (OCI) and SaaS. Technical interviews are rigorous, especially for database and infrastructure roles. The culture is results-driven with a competitive edge.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (45-60 min)","Onsite or virtual (4-5 rounds)","  -> Technical deep-dives (database internals, distributed systems, cloud)","  -> Coding rounds (algorithms, data structures)","  -> Behavioral rounds","Offer (3-5 weeks)"], culture: "Oracle has a competitive, performance-driven culture. They value technical depth, especially in database and cloud infrastructure. The shift to OCI has brought more startup energy alongside the traditional enterprise DNA.", topRoles: ["Software Engineer","Cloud Engineer","Database Administrator","Product Manager"], tips: ["Study database internals: indexing, query optimization, ACID transactions, distributed consensus.","For cloud roles: know OCI architecture and how it differs from AWS and Azure.","Oracle technical interviews often go very deep on fundamentals, expect follow-up questions.","Behavioral questions focus on delivering results under pressure.","Research Oracle's cloud strategy and where OCI competes with AWS/GCP/Azure."], relatedCompanies: ["salesforce","microsoft","amazon"] },
  adobe:      { displayName: "Adobe",      tier: "Top Tier",  difficulty: "Hard",           avgRounds: 5, avgDuration: "3-5 weeks",  title: "How to Prepare for an Adobe Interview (2026) | Preciprocal",     description: "Complete Adobe interview prep: creative cloud ecosystem, design-led culture, subscription business model, and technical expectations.",             overview: "Adobe's transition to Creative Cloud SaaS is one of tech's great business model pivots. Technical interviews reflect their dual identity: deep creative/design culture alongside rigorous engineering for cloud-scale document and media processing.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (45-60 min)","Virtual onsite (4-5 rounds)","  -> 2 coding rounds (algorithms + practical problems)","  -> 1 system design (document processing, media pipelines, CDN)","  -> 1-2 behavioral rounds","Offer (3-5 weeks)"], culture: "Adobe values creativity, genuine curiosity, and the intersection of art and technology. They want people who appreciate design even in engineering roles. The culture is collaborative and relatively stable compared to hyper-growth startups.", topRoles: ["Software Engineer","Product Manager","Data Scientist","UX Designer"], tips: ["Understand Adobe's product ecosystem: Creative Cloud, Document Cloud, Experience Cloud.","System design questions often involve media processing, document formats, and CDN delivery.","Show genuine appreciation for design, understanding UX matters even for engineers.","Behavioral questions probe collaboration, creativity, and customer empathy.","Research Adobe's DX (Digital Experience) platform as it's a major growth area."], relatedCompanies: ["salesforce","microsoft","google"] },
  nvidia:     { displayName: "NVIDIA",     tier: "AI Labs",   difficulty: "Very Hard",      avgRounds: 5, avgDuration: "4-6 weeks",  title: "How to Prepare for an NVIDIA Interview (2026) | Preciprocal",    description: "Complete NVIDIA interview prep: GPU architecture, CUDA programming, AI/ML infrastructure, and the technical depth NVIDIA expects.",                overview: "NVIDIA is the infrastructure layer of the AI era. Their interviews are among the most technically demanding in the industry, especially for hardware and systems roles. Deep knowledge of GPU architecture, parallel computing, and AI/ML systems is expected, not optional.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (60 min), deep technical","Virtual onsite (5-6 rounds)","  -> 2-3 deep technical rounds (GPU architecture, CUDA, systems)","  -> 1 coding round (algorithms + performance optimization)","  -> 1 system design (ML infrastructure, distributed training)","  -> 1 behavioral round","Offer (4-6 weeks)"], culture: "NVIDIA is intensely focused on technical excellence and moving at extraordinary speed. The AI boom has accelerated the culture significantly. They value deep expertise, performance obsession, and people who can operate at the intersection of hardware and software.", topRoles: ["Software Engineer","ML Engineer","Hardware Engineer","Solutions Architect"], tips: ["For engineering roles: know GPU architecture deeply (compute units, memory hierarchy, bandwidth).","CUDA programming and parallel computing fundamentals are expected for many roles.","AI/ML infrastructure knowledge (distributed training, inference optimization) is increasingly required.","Coding questions often include performance optimization, not just correctness.","Understand NVIDIA's stack: GPUs, CUDA, cuDNN, TensorRT, Triton, NeMo, and DGX systems."], relatedCompanies: ["google","meta","anthropic"] },
  openai:     { displayName: "OpenAI",     tier: "AI Labs",   difficulty: "Extremely Hard", avgRounds: 6, avgDuration: "4-8 weeks",  title: "How to Prepare for an OpenAI Interview (2026) | Preciprocal",    description: "Complete OpenAI interview prep: AI safety mission, research engineering depth, and the unusually high technical bar for one of the most competitive companies in tech.", overview: "OpenAI has one of the most selective hiring processes in the industry. They hire for exceptional technical depth AND genuine alignment with their mission around safe, beneficial AI. Research engineers need strong ML foundations; product engineers need systems thinking at scale.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (60 min)","Take-home or coding assessment (some roles)","Virtual onsite (5-6 rounds)","  -> Research/technical deep-dives (ML theory, systems, coding)","  -> Mission and values alignment rounds","  -> Cross-functional collaboration scenarios","Offer (4-8 weeks)"], culture: "OpenAI's culture is mission-first: the belief that they are building one of the most transformative and potentially dangerous technologies in history shapes everything. They want people who take AI safety seriously, think rigorously, and can operate with enormous autonomy.", topRoles: ["Research Engineer","Software Engineer","Product Manager","Policy Researcher"], tips: ["Know transformer architecture, attention mechanisms, and large language model training deeply.","Be prepared to discuss AI safety and alignment, not as lip service but with genuine understanding.","Systems at scale: distributed training, inference optimization, and serving are core competencies.","OpenAI values research thinking even in product/engineering roles.","Read their published papers and safety research before the interview."], relatedCompanies: ["anthropic","google","meta"] },
  anthropic:  { displayName: "Anthropic",  tier: "AI Labs",   difficulty: "Extremely Hard", avgRounds: 6, avgDuration: "4-8 weeks",  title: "How to Prepare for an Anthropic Interview (2026) | Preciprocal", description: "Complete Anthropic interview prep: AI safety focus, interpretability research, and what it takes to join one of the most mission-driven AI labs.",   overview: "Anthropic was founded with AI safety as the primary mission, not a secondary concern. This shapes interviews deeply: they want people who can rigorously reason about AI risk, not just build capable systems. Technical depth requirements are similar to OpenAI but with heavier emphasis on safety-conscious engineering.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (60 min)","Research or engineering assessment","Virtual onsite (5-6 rounds)","  -> Technical depth rounds (ML, systems, research)","  -> Safety and alignment reasoning rounds","  -> Collaboration and mission alignment","Offer (4-8 weeks)"], culture: "Anthropic's culture is serious, research-oriented, and deeply focused on the long-term trajectory of AI. They value intellectual honesty, careful reasoning about uncertainty, and genuine concern for societal impact. The culture is collaborative rather than competitive.", topRoles: ["Research Engineer","Software Engineer","Policy Researcher","Product Manager"], tips: ["Study interpretability research and constitutional AI, know Anthropic's published work.","Be prepared to reason carefully about AI safety tradeoffs, not just recite talking points.","ML fundamentals at depth: training dynamics, RLHF, constitutional AI, scaling laws.","Demonstrate intellectual honesty, Anthropic values people who reason carefully about what they don't know.","Show genuine mission alignment. Why safety specifically? What do you think the real risks are?"], relatedCompanies: ["openai","google","meta"] },
  databricks: { displayName: "Databricks", tier: "Unicorn",   difficulty: "Hard",           avgRounds: 5, avgDuration: "3-5 weeks",  title: "How to Prepare for a Databricks Interview (2026) | Preciprocal", description: "Complete Databricks interview prep: data lakehouse architecture, Apache Spark, the open data stack, and Databricks technical culture.",              overview: "Databricks created the data lakehouse concept and is the commercial home of Apache Spark. Their interviews expect solid data engineering and distributed systems knowledge. The culture is academic-meets-startup, driven by many Apache Spark creators.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (45-60 min)","Virtual onsite (4-5 rounds)","  -> 2 coding rounds (algorithms + data systems problems)","  -> 1 system design (data pipelines, lakehouse architecture)","  -> 1 domain-specific round (Spark, Delta Lake, ML)","  -> 1 behavioral round","Offer (3-5 weeks)"], culture: "Databricks has a high technical bar and academic culture shaped by its Apache Spark origins. They value people who understand data infrastructure deeply, care about open source, and can think about data problems at scale. Fast-paced and engineering-led.", topRoles: ["Software Engineer","Data Engineer","Solutions Architect","Machine Learning Engineer"], tips: ["Know Apache Spark internals: RDDs, DataFrames, execution model, shuffle, and memory management.","Understand Delta Lake architecture: ACID transactions on data lakes, time travel, schema enforcement.","System design questions often involve data pipeline architectures and lakehouse patterns.","Be familiar with the broader open data stack: Delta, MLflow, Unity Catalog.","Coding rounds expect strong CS fundamentals plus data-aware thinking."], relatedCompanies: ["snowflake","google","amazon"] },
  snowflake:  { displayName: "Snowflake",  tier: "Unicorn",   difficulty: "Hard",           avgRounds: 5, avgDuration: "3-5 weeks",  title: "How to Prepare for a Snowflake Interview (2026) | Preciprocal",  description: "Complete Snowflake interview prep: cloud data warehouse architecture, multi-cluster compute, data sharing, and what Snowflake looks for in candidates.", overview: "Snowflake pioneered the separation of storage and compute in cloud data warehousing and remains a market leader. Technical interviews emphasize cloud architecture, SQL optimization, and distributed query processing. The company has strong enterprise sales DNA alongside engineering depth.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (45-60 min)","Virtual onsite (4-5 rounds)","  -> 2 coding rounds (algorithms + SQL-adjacent problems)","  -> 1 system design (data warehouse architecture, query processing)","  -> 1 behavioral round","  -> Sometimes a domain-specific round for senior roles","Offer (3-5 weeks)"], culture: "Snowflake has a performance-driven culture with strong emphasis on customer success and enterprise execution. They value people who move fast and deliver measurable customer outcomes.", topRoles: ["Software Engineer","Solutions Engineer","Data Engineer","Product Manager"], tips: ["Know Snowflake's architecture: virtual warehouses, storage layer, query processing, caching.","SQL optimization and query planning are common technical topics.","Understand multi-cloud data sharing and data marketplace concepts.","Behavioral questions often focus on customer impact and enterprise problem-solving.","Research Snowflake's competitive positioning against BigQuery, Databricks, and Redshift."], relatedCompanies: ["databricks","amazon","microsoft"] },
  palantir:   { displayName: "Palantir",   tier: "Unicorn",   difficulty: "Very Hard",      avgRounds: 6, avgDuration: "4-6 weeks",  title: "How to Prepare for a Palantir Interview (2026) | Preciprocal",   description: "Complete Palantir interview prep: the Deployment Strategist role, Gotham and Foundry platforms, and the distinctive Palantir hiring process.",        overview: "Palantir has one of the most distinctive hiring processes in tech. They primarily hire 'Deployment Strategists' (forward-deployed engineers who work directly with customers) rather than traditional software engineers. The process tests both technical depth and the ability to communicate complex ideas to non-technical stakeholders.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (45-60 min)","Karat or HackerRank coding assessment","Virtual onsite (5-6 rounds)","  -> Decomp round (problem decomposition and system design)","  -> Coding rounds (algorithms)","  -> Logic and math round","  -> Deployment/customer scenario round","Offer (4-6 weeks)"], culture: "Palantir has a mission-driven culture around using data to solve hard problems for governments and enterprises. They are selective and deliberate. The culture can be intense and is not for everyone.", topRoles: ["Forward Deployed Engineer","Software Engineer","Deployment Strategist","Product Manager"], tips: ["The Decomp round is unique to Palantir, practice breaking ambiguous problems into structured components.","Palantir values people who can explain technical concepts clearly to non-engineers.","Know Palantir's two main platforms: Gotham (government/defense) and Foundry (commercial).","Coding rounds are standard LeetCode medium, solid CS fundamentals are expected.","Be prepared to discuss your views on data ethics and the appropriate use of data analytics technology."], relatedCompanies: ["databricks","microsoft","google"] },

  // ── Added: non-tech employers and additional tech ──────────────────────────
  // The original 20 were all tech, which left every Finance, Legal, Healthcare,
  // Sales and HR role in ROLE_DISPLAY without a single relevant company page.
  tesla: { displayName: "Tesla", tier: "Top Tier", difficulty: "Hard", avgRounds: 4, avgDuration: "3-5 weeks", title: "How to Prepare for a Tesla Interview (2026) | Preciprocal", description: "Complete Tesla interview prep: the fast-paced hardware-software culture, first-principles problem solving, and what Tesla actually screens for.", overview: "Tesla interviews are notably pragmatic. Interviewers care less about textbook algorithms than whether you can reason from first principles about a real engineering problem, often one adjacent to what their team is shipping this quarter. Expect direct, fast-moving conversations and questions about projects you have personally built end to end.", interviewProcess: ["Recruiter screen (30 min)","Hiring manager technical screen (45-60 min)","Technical panel (3-4 rounds)","  -> Domain deep-dive on your specific background","  -> Practical coding or design problem","  -> Cross-functional round with an adjacent team","Offer (3-5 weeks)"], culture: "Tesla runs at high intensity with flat hierarchy and unusual individual ownership. Candidates who need process and clear specifications tend to struggle; those who default to action tend to thrive.", topRoles: ["Software Engineer","Mechanical Engineer","Manufacturing Engineer","Data Scientist"], tips: ["Expect first-principles questions over LeetCode patterns, be ready to derive rather than recall.","Bring a project you built end to end and can defend to component level.","Tesla probes ownership hard: what did you personally do when something broke?","Speed is a real evaluation criterion, show you ship without waiting for perfect information.","Know the product line you would be working on, generic enthusiasm reads poorly here."], relatedCompanies: ["nvidia","apple","google"] },
  coinbase: { displayName: "Coinbase", tier: "Top Tier", difficulty: "Hard", avgRounds: 5, avgDuration: "3-5 weeks", title: "How to Prepare for a Coinbase Interview (2026) | Preciprocal", description: "Complete Coinbase interview prep: the remote-first process, crypto domain expectations, and the security-first engineering culture.", overview: "Coinbase runs a structured, fully remote process with a heavy emphasis on security thinking, since it custodies significant customer assets. You are not expected to be a crypto expert, but genuine curiosity about the space is screened for, and indifference to it is a real negative signal.", interviewProcess: ["Recruiter screen (30 min)","Technical screen (60 min, coding)","Virtual onsite (4-5 rounds)","  -> 2 coding rounds","  -> System design with a security emphasis","  -> Behavioural round on Coinbase's operating principles","Offer (3-5 weeks)"], culture: "Coinbase is remote-first with a stated preference for clear communication over consensus. Written communication carries real weight, and the mission framing around economic freedom is taken seriously internally.", topRoles: ["Software Engineer","Security Engineer","Product Manager","Data Scientist"], tips: ["Security reasoning appears in nearly every technical round, discuss threat models unprompted.","You do not need deep crypto knowledge, but be able to explain a blockchain and a wallet clearly.","Remote-first means written communication is assessed, structure your answers explicitly.","Read Coinbase's operating principles and prepare a story for two or three of them.","Financial-grade correctness matters: talk about idempotency, reconciliation and auditability."], relatedCompanies: ["stripe","robinhood","databricks"] },
  figma: { displayName: "Figma", tier: "Top Tier", difficulty: "Hard", avgRounds: 5, avgDuration: "3-5 weeks", title: "How to Prepare for a Figma Interview (2026) | Preciprocal", description: "Complete Figma interview prep: the craft-focused engineering bar, product sense rounds, and what Figma looks for beyond algorithms.", overview: "Figma weights craft and product taste unusually highly for an engineering organisation. Technical rounds are solid but not exotic; what differentiates candidates is the ability to reason about the user experience consequences of a technical decision, and genuine attention to detail in how you work.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (60 min)","Virtual onsite (4-5 rounds)","  -> Coding rounds, practical rather than puzzle-based","  -> System or client-architecture design","  -> Product sense and craft round","  -> Values round","Offer (3-5 weeks)"], culture: "Figma's culture centres on craft, low ego, and taking the user seriously. Engineers are expected to have opinions about product, and designers and engineers work unusually closely.", topRoles: ["Software Engineer","UX Designer","Product Manager","Frontend Developer"], tips: ["Be ready to critique a product, including Figma itself, specifically and constructively.","Frontend and rendering performance depth is genuinely valued here, more than at most companies.","Practical coding over algorithm puzzles, expect to build something small and real.","Show that you notice details, sloppiness in the interview reads as sloppiness in the work.","Have a view on how design and engineering should collaborate, they will ask."], relatedCompanies: ["adobe","stripe","airbnb"] },
  datadog: { displayName: "Datadog", tier: "Top Tier", difficulty: "Hard", avgRounds: 5, avgDuration: "3-4 weeks", title: "How to Prepare for a Datadog Interview (2026) | Preciprocal", description: "Complete Datadog interview prep: the systems-heavy technical bar, observability domain questions, and the interview loop structure.", overview: "Datadog's interviews lean heavily toward systems and scale, which follows from the product: ingesting enormous volumes of telemetry with low latency. Expect concrete questions about data pipelines, time-series storage and the trade-offs of high-cardinality data rather than abstract puzzles.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (60 min)","Take-home or live coding exercise","Virtual onsite (4 rounds)","  -> Systems design at ingest scale","  -> Coding and debugging","  -> Domain discussion on monitoring and observability","Offer (3-4 weeks)"], culture: "Datadog is pragmatic and engineering-led, with a strong preference for people who have operated production systems and been on call for them.", topRoles: ["Software Engineer","Site Reliability Engineer","Solutions Architect","Product Manager"], tips: ["Know observability fundamentals cold: metrics, logs, traces, and the cardinality problem.","Time-series storage and aggregation come up repeatedly, read about their architecture.","On-call and incident experience is a real differentiator, bring specific stories.","Expect debugging exercises on unfamiliar code, narrate your process out loud.","Scale numbers matter, be ready to reason about millions of events per second."], relatedCompanies: ["cloudflare","snowflake","databricks"] },
  cloudflare: { displayName: "Cloudflare", tier: "Top Tier", difficulty: "Hard", avgRounds: 5, avgDuration: "3-5 weeks", title: "How to Prepare for a Cloudflare Interview (2026) | Preciprocal", description: "Complete Cloudflare interview prep: networking and systems depth, the edge computing model, and Cloudflare's hiring loop.", overview: "Cloudflare screens for genuine networking and distributed systems knowledge more than almost any other company at its scale. Candidates who understand what actually happens between a browser and an origin server have a substantial advantage, regardless of the specific role.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (60 min)","Virtual onsite (4-5 rounds)","  -> Systems and networking deep-dive","  -> Coding rounds","  -> Distributed systems design at edge scale","  -> Behavioural and values round","Offer (3-5 weeks)"], culture: "Cloudflare is technically curious and unusually transparent, with a strong public engineering blog culture. Interviewers expect you to have read some of it.", topRoles: ["Software Engineer","Site Reliability Engineer","Cybersecurity Analyst","Solutions Architect"], tips: ["Networking fundamentals are non-negotiable: TCP, TLS, DNS, BGP, HTTP semantics and caching.","Read the Cloudflare engineering blog, interviewers frequently reference their own posts.","Edge computing changes design constraints, think about latency and partial failure at hundreds of locations.","Security thinking is expected across all roles, not just security ones.","Be able to trace a request end to end and name what could fail at each hop."], relatedCompanies: ["datadog","google","amazon"] },
  atlassian: { displayName: "Atlassian", tier: "Enterprise", difficulty: "Medium", avgRounds: 4, avgDuration: "3-4 weeks", title: "How to Prepare for a Atlassian Interview (2026) | Preciprocal", description: "Complete Atlassian interview prep: the values-driven process, distributed work culture, and what each round assesses.", overview: "Atlassian runs one of the more transparent processes in tech, publishing much of what it assesses. Values rounds carry genuine weight rather than being a formality, and the technical bar is solid but less puzzle-oriented than at FAANG companies.", interviewProcess: ["Recruiter screen (30 min)","Technical screen (60 min)","Virtual onsite (3-4 rounds)","  -> Coding round","  -> System design","  -> Values round, explicitly scored","Offer (3-4 weeks)"], culture: "Atlassian's five values, particularly open company no bullshit and don't mess with the customer, are used as real evaluation criteria. The company is distributed-first with a mature remote culture.", topRoles: ["Software Engineer","Product Manager","Site Reliability Engineer","Technical Program Manager"], tips: ["Prepare a specific STAR story for each of the five Atlassian values, they are scored.","The values round is not a formality here, candidates fail on it.","Technical rounds are practical, favouring clean readable code over clever solutions.","Distributed work experience is an asset, discuss how you collaborate asynchronously.","Know the product suite: Jira, Confluence, Bitbucket, and who uses them."], relatedCompanies: ["shopify","salesforce","linkedin"] },
  shopify: { displayName: "Shopify", tier: "Top Tier", difficulty: "Hard", avgRounds: 4, avgDuration: "3-4 weeks", title: "How to Prepare for a Shopify Interview (2026) | Preciprocal", description: "Complete Shopify interview prep: the Life Story interview, technical rounds, and Shopify's merchant-first framing.", overview: "Shopify's process is distinctive for the Life Story interview, an extended conversation walking through your entire career and the decisions behind it. It is not small talk. Interviewers probe motivation, judgement and self-awareness in depth, and candidates who treat it casually do poorly.", interviewProcess: ["Recruiter screen (30 min)","Life Story interview (60-90 min)","Technical screen (60 min)","Technical panel (2-3 rounds)","  -> Pair programming on a realistic problem","  -> Architecture and design discussion","Offer (3-4 weeks)"], culture: "Shopify is intensely merchant-focused and moves fast, with a documented preference for high-agency people. The culture rewards those who pick up unowned problems.", topRoles: ["Software Engineer","Product Manager","Data Scientist","Business Analyst"], tips: ["Prepare for the Life Story round seriously: know why you made each career decision.","Frame technical answers in terms of merchant impact, that is the internal language.","Pair programming is collaborative, ask questions and think aloud rather than going quiet.","High agency is explicitly valued, bring examples of work nobody assigned you.","Ruby and Rails knowledge helps for backend roles but is rarely a hard requirement."], relatedCompanies: ["atlassian","stripe","airbnb"] },
  doordash: { displayName: "DoorDash", tier: "Top Tier", difficulty: "Hard", avgRounds: 5, avgDuration: "3-5 weeks", title: "How to Prepare for a DoorDash Interview (2026) | Preciprocal", description: "Complete DoorDash interview prep: the analytics-heavy process, logistics domain problems, and role-specific loops.", overview: "DoorDash interviews reflect a three-sided marketplace: consumers, dashers and merchants. Expect problems involving matching, routing, pricing and supply-demand balance. Analytical roles face a notably quantitative bar, and product roles are asked to reason with metrics constantly.", interviewProcess: ["Recruiter screen (30 min)","Technical or analytics screen (60 min)","Virtual onsite (4-5 rounds)","  -> Coding rounds or SQL and case work by role","  -> System design or analytics deep-dive","  -> Behavioural round on DoorDash values","Offer (3-5 weeks)"], culture: "DoorDash is metrics-driven and operationally intense, with a culture of getting one percent better every day and leaders expected to do frontline delivery shifts.", topRoles: ["Software Engineer","Data Scientist","Product Manager","Operations Manager"], tips: ["Understand three-sided marketplace dynamics, most cases involve balancing supply and demand.","Analytics roles get a genuinely hard SQL round, practise window functions.","Expect logistics problems: routing, batching, ETA prediction, surge pricing.","Know the core metrics of a delivery business and speak in them.","Operational empathy matters, they value candidates who understand frontline realities."], relatedCompanies: ["uber","airbnb","amazon"] },
  robinhood: { displayName: "Robinhood", tier: "Unicorn", difficulty: "Hard", avgRounds: 5, avgDuration: "3-4 weeks", title: "How to Prepare for a Robinhood Interview (2026) | Preciprocal", description: "Complete Robinhood interview prep: the fintech correctness bar, regulatory context, and the interview loop.", overview: "Robinhood's technical bar centres on correctness and reliability, because the product moves customer money in regulated markets. Interviewers probe how you handle failure, reconciliation and edge cases far more than they test algorithmic cleverness.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (60 min)","Virtual onsite (4-5 rounds)","  -> 2 coding rounds","  -> System design with a correctness and reliability focus","  -> Behavioural round","Offer (3-4 weeks)"], culture: "Robinhood is mission-framed around access to financial markets and operates under real regulatory scrutiny, which shows up as a culture that takes correctness and auditability seriously.", topRoles: ["Software Engineer","Data Scientist","Product Manager","Compliance Analyst"], tips: ["Financial correctness is the theme: discuss idempotency, reconciliation and audit trails unprompted.","Understand market mechanics basics: order types, settlement, clearing.","Reliability under load matters, market-open traffic spikes are a real design constraint.","Regulatory awareness is a plus in every role, not just compliance ones.","Be ready to discuss handling an incident involving customer money."], relatedCompanies: ["coinbase","stripe","capital-one"] },
  bloomberg: { displayName: "Bloomberg", tier: "Enterprise", difficulty: "Hard", avgRounds: 4, avgDuration: "3-5 weeks", title: "How to Prepare for a Bloomberg Interview (2026) | Preciprocal", description: "Complete Bloomberg interview prep: the C++ and systems focus, the Terminal product context, and Bloomberg's hiring loop.", overview: "Bloomberg runs a traditional, fundamentals-heavy technical process with an unusual emphasis on C++ and low-level systems knowledge for many engineering roles. Data structures are tested directly and in depth, more so than at companies that have moved toward practical exercises.", interviewProcess: ["Recruiter screen (30 min)","Technical phone screen (60 min)","Onsite or virtual onsite (3-4 rounds)","  -> Data structures and algorithms, often in C++","  -> System design","  -> Behavioural and motivation round","Offer (3-5 weeks)"], culture: "Bloomberg is engineering-heavy and product-proud, built around the Terminal. The culture is more traditional than tech-startup norms, with long tenures and deep domain expertise.", topRoles: ["Software Engineer","Data Analyst","Financial Analyst","Product Manager"], tips: ["Core data structures are tested directly, know implementation details not just usage.","C++ depth is a genuine advantage for many teams, including memory management.","Understand what the Terminal is and who pays for it, motivation questions are real.","Financial data domain knowledge differentiates candidates meaningfully.","Latency matters in their products, be ready to discuss performance trade-offs."], relatedCompanies: ["jpmorgan","goldman-sachs","oracle"] },
  "goldman-sachs": { displayName: "Goldman Sachs", tier: "Investment Banking", difficulty: "Very Hard", avgRounds: 4, avgDuration: "4-8 weeks", title: "How to Prepare for a Goldman Sachs Interview (2026) | Preciprocal", description: "Complete Goldman Sachs interview prep: the superday format, technical valuation questions, and how to handle why Goldman.", overview: "Goldman's process culminates in a superday: several back-to-back interviews in one day, mixing technical valuation questions with intense motivational probing. Technical accuracy is table stakes; candidates are separated by composure, commercial awareness and a convincing answer to why this firm specifically.", interviewProcess: ["Application and HireVue video interview","First round (2 interviews, 30 min each)","Superday (4-6 back-to-back interviews)","  -> Technical: valuation, accounting, markets","  -> Behavioural and motivational: why banking, why Goldman","  -> Fit rounds with senior bankers","Offer (4-8 weeks)"], culture: "Goldman is intense, hierarchical and prestige-conscious, with a strong internal culture of client service. Long hours are the norm and the culture openly acknowledges it.", topRoles: ["Investment Banker","Financial Analyst","Software Engineer","Compliance Analyst"], tips: ["Master the technicals cold: DCF, comps, precedent transactions, accretion-dilution, the three statements.","Why Goldman needs a specific answer referencing deals, groups or people, not prestige.","Know a live deal in your target group and have a view on it.","Superdays test stamina and composure, practise being sharp in the fifth conversation.","Behavioural answers should demonstrate you understand and accept the hours."], relatedCompanies: ["jpmorgan","morgan-stanley","evercore"] },
  jpmorgan: { displayName: "JPMorgan Chase", tier: "Investment Banking", difficulty: "Hard", avgRounds: 4, avgDuration: "4-8 weeks", title: "How to Prepare for a JPMorgan Chase Interview (2026) | Preciprocal", description: "Complete JPMorgan interview prep: the divisional differences, technical expectations, and the HireVue and superday stages.", overview: "JPMorgan is large enough that the process varies substantially by division. Investment banking runs technical superdays; technology runs coding interviews closer to tech-company standards; asset management emphasises markets knowledge. Identify your division early, because preparing for the wrong one is a common and costly mistake.", interviewProcess: ["Application and HireVue video interview","First round (2 interviews)","Superday or virtual assessment centre","  -> Technical rounds by division","  -> Behavioural and fit rounds","  -> Case or markets discussion for some divisions","Offer (4-8 weeks)"], culture: "JPMorgan is a large, structured institution with more formal processes than tech firms and meaningful variation in culture between divisions.", topRoles: ["Investment Banker","Financial Analyst","Software Engineer","Data Analyst"], tips: ["Identify your division precisely, preparation differs sharply between IB, tech and asset management.","Technology roles here run real coding interviews, do not assume finance-only prep suffices.","HireVue is a genuine screen, practise on camera with the STAR structure.","Know the firm's scale and business mix, commercial awareness is assessed.","For IB, technicals are expected to be flawless rather than merely good."], relatedCompanies: ["goldman-sachs","morgan-stanley","capital-one"] },
  "morgan-stanley": { displayName: "Morgan Stanley", tier: "Investment Banking", difficulty: "Hard", avgRounds: 4, avgDuration: "4-8 weeks", title: "How to Prepare for a Morgan Stanley Interview (2026) | Preciprocal", description: "Complete Morgan Stanley interview prep: technical valuation rounds, fit assessment, and the superday structure.", overview: "Morgan Stanley's process mirrors the bulge-bracket standard: video screen, first rounds, then a superday. Interviewers place noticeable weight on fit and collegiality alongside technical accuracy, and the firm has a reputation for probing genuine interest in its specific franchise strengths.", interviewProcess: ["Application and video interview","First round (2 interviews, 30 min each)","Superday (4-5 interviews)","  -> Technical: valuation and accounting","  -> Markets and commercial awareness","  -> Behavioural and fit rounds","Offer (4-8 weeks)"], culture: "Morgan Stanley emphasises client focus and a somewhat more collegial culture than its closest peers, though the hours and intensity remain those of a bulge-bracket bank.", topRoles: ["Investment Banker","Financial Analyst","Data Analyst","Compliance Analyst"], tips: ["Technical fundamentals must be automatic: walk me through a DCF, EV vs equity value, the three statements.","Have a specific reason for Morgan Stanley over Goldman or JPMorgan.","Fit rounds carry real weight, interviewers assess whether they want you in the room at 2am.","Follow a recent transaction the firm advised on and form a view.","Wealth management and institutional securities are different worlds, target correctly."], relatedCompanies: ["goldman-sachs","jpmorgan","evercore"] },
  evercore: { displayName: "Evercore", tier: "Investment Banking", difficulty: "Very Hard", avgRounds: 4, avgDuration: "3-6 weeks", title: "How to Prepare for a Evercore Interview (2026) | Preciprocal", description: "Complete Evercore interview prep: the elite boutique bar, deep technical rounds, and what advisory-only means for candidates.", overview: "Evercore is an advisory-focused elite boutique, which changes the interview substantially. Deal teams are smaller, so junior bankers get more responsibility and the technical bar is correspondingly higher. Expect deeper modelling questions than at a bulge bracket and a strong preference for genuine interest in advisory work.", interviewProcess: ["Application and screening","First round (2 interviews)","Superday (3-5 interviews with senior bankers)","  -> Deep technical: modelling, valuation, LBO mechanics","  -> Deal discussion and commercial judgement","  -> Fit rounds","Offer (3-6 weeks)"], culture: "Evercore is lean, meritocratic and advisory-focused with no balance sheet, which means the work is pure advice and juniors carry more analytical load than at larger firms.", topRoles: ["Investment Banker","Financial Analyst"], tips: ["Technical depth exceeds bulge-bracket expectations, know modelling mechanics not just concepts.","Understand why advisory-only matters: no lending, no conflicts, pure advice.","Smaller deal teams mean more responsibility, show you can handle autonomy.","Be able to discuss a recent M&A transaction in detail, including the strategic rationale.","Boutique interest must be genuine, applying everywhere is transparent and fatal."], relatedCompanies: ["goldman-sachs","morgan-stanley","blackstone"] },
  blackstone: { displayName: "Blackstone", tier: "Investment Banking", difficulty: "Extremely Hard", avgRounds: 5, avgDuration: "4-8 weeks", title: "How to Prepare for a Blackstone Interview (2026) | Preciprocal", description: "Complete Blackstone interview prep: private equity recruiting, LBO modelling, and the investment judgement bar.", overview: "Blackstone recruits primarily from investment banking analyst programmes, and the bar is exceptionally high. The distinguishing round is investment judgement: given a company, would you buy it and why. Technical modelling ability is assumed, so candidates are separated by the quality of their commercial thinking.", interviewProcess: ["Application, typically via headhunter","First round (2-3 interviews)","Modelling test (LBO, often timed)","Final rounds (3-5 interviews with senior investors)","  -> Investment thesis discussion","  -> Deal experience deep-dive","  -> Fit and culture rounds","Offer (4-8 weeks)"], culture: "Blackstone is performance-driven and intensely selective, with a culture built around investment discipline and long-term returns for limited partners.", topRoles: ["Investment Banker","Financial Analyst"], tips: ["LBO modelling must be second nature, including paper LBOs under time pressure.","Prepare a genuine investment thesis: a company you would buy, at what price, and why.","Know your own deal experience in forensic detail, every number will be questioned.","Understand the PE value creation levers: leverage, operational improvement, multiple expansion.","Headhunters gatekeep much of PE recruiting, that relationship is part of the process."], relatedCompanies: ["goldman-sachs","evercore","citadel"] },
  citadel: { displayName: "Citadel", tier: "Quant & Trading", difficulty: "Extremely Hard", avgRounds: 5, avgDuration: "3-6 weeks", title: "How to Prepare for a Citadel Interview (2026) | Preciprocal", description: "Complete Citadel interview prep: quantitative brainteasers, probability, and the extremely high technical bar.", overview: "Citadel's process is among the most difficult in any industry. Expect rapid-fire probability, statistics and mental maths, plus deep technical rounds specific to your track. Interviewers are looking for genuine quantitative ability under pressure, not memorised solutions, and the pace is deliberately uncomfortable.", interviewProcess: ["Online assessment (quantitative, timed)","Technical phone screen","Virtual or onsite rounds (4-6)","  -> Probability and statistics","  -> Mental maths and estimation under time pressure","  -> Coding or research depth by track","  -> Market and behavioural discussion","Offer (3-6 weeks)"], culture: "Citadel is relentlessly performance-oriented with very high compensation and correspondingly high expectations. The culture is direct and results-focused.", topRoles: ["Data Scientist","Software Engineer","Financial Analyst","Machine Learning Engineer"], tips: ["Probability and statistics are non-negotiable: expected value, conditional probability, distributions.","Practise mental maths under time pressure, speed is genuinely assessed.","Brainteasers test reasoning process, narrate your thinking rather than guessing.","Know your track: quant research, quant trading and software engineering differ substantially.","Expect to be pushed until you reach the edge of your knowledge, that is the point."], relatedCompanies: ["jane-street","two-sigma","blackstone"] },
  "jane-street": { displayName: "Jane Street", tier: "Quant & Trading", difficulty: "Extremely Hard", avgRounds: 5, avgDuration: "3-5 weeks", title: "How to Prepare for a Jane Street Interview (2026) | Preciprocal", description: "Complete Jane Street interview prep: probability games, market making exercises, and the distinctive interview style.", overview: "Jane Street's interviews are conversational but exceptionally demanding, built around probability games and market-making exercises where you quote prices and update on new information. They care far more about how you reason and revise under uncertainty than whether you reach the right number.", interviewProcess: ["Application and online assessment","Phone interview (probability and reasoning)","Virtual or onsite rounds (3-5)","  -> Market making exercises","  -> Probability and combinatorics","  -> Estimation and mental maths","  -> Programming for technical tracks","Offer (3-5 weeks)"], culture: "Jane Street is intellectually intense, collaborative and unusually non-hierarchical, with a strong internal culture of teaching. OCaml is used firm-wide, which is unusual.", topRoles: ["Data Scientist","Software Engineer","Financial Analyst"], tips: ["Market making exercises are central: practise quoting bid-ask spreads and updating on information.","Think out loud constantly, the reasoning process is what is being evaluated.","Probability and combinatorics need to be fluent, not merely familiar.","Be comfortable saying you are uncertain and explaining how you would reduce that uncertainty.","Functional programming exposure helps for technical roles, they use OCaml."], relatedCompanies: ["citadel","two-sigma","google"] },
  "two-sigma": { displayName: "Two Sigma", tier: "Quant & Trading", difficulty: "Extremely Hard", avgRounds: 5, avgDuration: "4-6 weeks", title: "How to Prepare for a Two Sigma Interview (2026) | Preciprocal", description: "Complete Two Sigma interview prep: the research-driven process, machine learning depth, and engineering rounds.", overview: "Two Sigma sits closer to a research organisation than a traditional trading firm, and the interviews reflect that. Expect rigorous statistics and machine learning questions alongside genuine software engineering rounds, with an emphasis on scientific method rather than trading instinct.", interviewProcess: ["Online assessment (coding and quantitative)","Technical phone screens (1-2)","Virtual onsite (4-6 rounds)","  -> Statistics and probability","  -> Machine learning and modelling depth","  -> Software engineering and coding","  -> Research discussion and behavioural","Offer (4-6 weeks)"], culture: "Two Sigma is science-led and engineering-heavy, with a culture that resembles a research lab more than a trading floor. Rigour and intellectual honesty are prized.", topRoles: ["Machine Learning Engineer","Data Scientist","Software Engineer","Data Engineer"], tips: ["Statistical rigour is the core screen: hypothesis testing, overfitting, cross-validation.","Machine learning depth is expected, including why a method fails not just how it works.","Software engineering rounds are real, this is not a finance-only interview.","Discuss research you have done and defend your methodology under questioning.","Intellectual honesty about limitations scores better than overclaiming."], relatedCompanies: ["citadel","jane-street","databricks"] },
  mckinsey: { displayName: "McKinsey & Company", tier: "Consulting", difficulty: "Very Hard", avgRounds: 4, avgDuration: "4-8 weeks", title: "How to Prepare for a McKinsey & Company Interview (2026) | Preciprocal", description: "Complete McKinsey interview prep: the Problem Solving Game, case interviews, and the Personal Experience Interview.", overview: "McKinsey's process combines the Solve assessment, a game-based problem solving test, with interviewer-led case interviews and the Personal Experience Interview. Unlike candidate-led cases elsewhere, McKinsey interviewers drive the structure and ask specific questions, so practising the right format matters.", interviewProcess: ["Application and resume screen","McKinsey Solve assessment (game-based)","First round (2 interviews)","  -> Interviewer-led case","  -> Personal Experience Interview (PEI)","Final round (2-3 interviews with partners)","Offer (4-8 weeks)"], culture: "McKinsey is structured, prestige-conscious and famously rigorous about the obligation to dissent. The culture emphasises client impact and analytical discipline.", topRoles: ["Management Consultant","Business Analyst","Data Scientist","Project Manager"], tips: ["McKinsey cases are interviewer-led, practise responding to their structure rather than driving your own.","The PEI is heavily weighted: prepare deep stories on leadership, personal impact and conflict.","Practise mental maths, case interviews involve live arithmetic you cannot fumble.","Structure everything with MECE frameworks and state your approach before diving in.","Solve is unlike a standard aptitude test, do practice runs before sitting it."], relatedCompanies: ["bcg","bain","deloitte"] },
  bcg: { displayName: "Boston Consulting Group", tier: "Consulting", difficulty: "Very Hard", avgRounds: 4, avgDuration: "4-8 weeks", title: "How to Prepare for a Boston Consulting Group Interview (2026) | Preciprocal", description: "Complete BCG interview prep: the Casey chatbot assessment, case interviews, and BCG's collaborative interview style.", overview: "BCG uses the Casey chatbot assessment early in the process, then runs case interviews that are typically more candidate-led than McKinsey's. Interviewers look for creative problem structuring alongside rigour, and the style is noticeably more conversational.", interviewProcess: ["Application and resume screen","Casey chatbot case assessment","First round (2 interviews)","  -> Candidate-led case","  -> Behavioural and fit discussion","Final round (2-3 interviews with partners)","Offer (4-8 weeks)"], culture: "BCG is collaborative and somewhat less hierarchical than its closest peer, with a culture that encourages creative approaches to structuring problems.", topRoles: ["Management Consultant","Business Analyst","Data Scientist","Product Manager"], tips: ["BCG cases are more candidate-led, you drive the structure so practise opening confidently.","Do the Casey practice assessment, the format surprises unprepared candidates.","Creativity in structuring is rewarded here more than rigid framework recitation.","Quantify your recommendation, always land on a clear answer with supporting numbers.","Fit conversations are genuinely conversational, but prepare specific stories anyway."], relatedCompanies: ["mckinsey","bain","accenture"] },
  bain: { displayName: "Bain & Company", tier: "Consulting", difficulty: "Very Hard", avgRounds: 4, avgDuration: "4-8 weeks", title: "How to Prepare for a Bain & Company Interview (2026) | Preciprocal", description: "Complete Bain interview prep: the written case, case interview style, and Bain's culture-heavy assessment.", overview: "Bain's process includes a written case exercise at some offices and places unusual weight on cultural fit alongside case performance. The firm's ethos that a Bainie never lets another Bainie fail is reflected in interviews that assess whether you would be good to work alongside.", interviewProcess: ["Application and resume screen","Online assessment or written case","First round (2 interviews)","  -> Case interview","  -> Fit and experience discussion","Final round (2-3 interviews with partners)","Offer (4-8 weeks)"], culture: "Bain is known for a strong, supportive internal culture and high internal loyalty. Fit assessment is not a formality, and interviewers screen actively for collaborative temperament.", topRoles: ["Management Consultant","Business Analyst","Project Manager","Operations Manager"], tips: ["Practise written cases if your office uses them, the format rewards prior exposure.","Culture fit is weighted heavily at Bain, prepare stories showing genuine teamwork.","Structure cases cleanly but stay conversational, rigidity reads poorly here.","Be ready to synthesise a recommendation early and then defend it as facts change.","Know why Bain over McKinsey and BCG, with something more specific than culture."], relatedCompanies: ["mckinsey","bcg","deloitte"] },
  deloitte: { displayName: "Deloitte", tier: "Professional Services", difficulty: "Medium", avgRounds: 3, avgDuration: "3-5 weeks", title: "How to Prepare for a Deloitte Interview (2026) | Preciprocal", description: "Complete Deloitte interview prep: service line differences, behavioural rounds, and the case or technical assessment.", overview: "Deloitte is enormous and the interview differs sharply by service line: Consulting runs cases, Audit tests accounting knowledge, Risk and Financial Advisory tests domain specifics, and Technology runs technical screens. The behavioural component is consistent across all of them and matters more than candidates expect.", interviewProcess: ["Application and online assessment","Recruiter or HR screen (30 min)","Interview rounds (2-3)","  -> Case interview for consulting tracks","  -> Technical or accounting for audit and tech tracks","  -> Behavioural round on Deloitte values","Offer (3-5 weeks)"], culture: "Deloitte has a large, structured corporate culture with clear promotion paths and strong emphasis on professional development and client service.", topRoles: ["Management Consultant","Accounting Manager","Business Analyst","Compliance Analyst"], tips: ["Identify your service line and prepare for its specific format, they differ substantially.","Behavioural rounds carry real weight, prepare STAR stories on client service and teamwork.","Consulting tracks get cases, but they are typically less intense than MBB cases.","Audit tracks need genuine GAAP and internal controls knowledge.","Know a Deloitte client story or practice area relevant to your target group."], relatedCompanies: ["pwc","ey","kpmg"] },
  pwc: { displayName: "PwC", tier: "Professional Services", difficulty: "Medium", avgRounds: 3, avgDuration: "3-5 weeks", title: "How to Prepare for a PwC Interview (2026) | Preciprocal", description: "Complete PwC interview prep: the assessment centre format, technical expectations by line of service, and behavioural rounds.", overview: "PwC frequently uses assessment centres combining group exercises, individual presentations and interviews. Group exercises are genuinely assessed for collaboration, and candidates who dominate the discussion score poorly even when their analysis is strongest.", interviewProcess: ["Application and online assessments","Video interview","Assessment centre","  -> Group exercise, assessed for collaboration","  -> Individual case or presentation","  -> Competency-based interview","Offer (3-5 weeks)"], culture: "PwC emphasises professional standards, structured career progression and a collaborative client-service culture across its lines of service.", topRoles: ["Accounting Manager","Management Consultant","Compliance Analyst","Financial Analyst"], tips: ["Group exercises reward collaboration, not dominance, bring others in deliberately.","Competency questions map to a published framework, prepare against it explicitly.","Assurance roles need real technical accounting depth, do not wing GAAP questions.","Know your line of service and why it rather than the others.","Presentation exercises are assessed on structure and clarity as much as content."], relatedCompanies: ["deloitte","ey","kpmg"] },
  ey: { displayName: "EY", tier: "Professional Services", difficulty: "Medium", avgRounds: 3, avgDuration: "3-5 weeks", title: "How to Prepare for a EY Interview (2026) | Preciprocal", description: "Complete EY interview prep: the strengths-based interview format, service line differences, and assessment day structure.", overview: "EY leans toward strengths-based interviewing, asking what you enjoy and do naturally rather than only asking for past examples. This trips up candidates who prepared exclusively competency-style STAR answers, since the questions are framed quite differently.", interviewProcess: ["Application and online assessments","Strengths-based video interview","Assessment day","  -> Group exercise","  -> Case study or technical assessment","  -> Partner interview","Offer (3-5 weeks)"], culture: "EY's culture centres on its building a better working world purpose, with strong emphasis on professional development and inclusion.", topRoles: ["Accounting Manager","Compliance Analyst","Management Consultant","Business Analyst"], tips: ["Strengths-based questions differ from competency ones, practise answering what energises you.","Be genuine rather than strategic in strengths answers, inconsistency is detectable.","Know EY's purpose statement and have a real reaction to it.","Technical requirements vary by service line, confirm what yours expects.","Partner interviews assess commercial awareness, follow relevant business news."], relatedCompanies: ["deloitte","pwc","kpmg"] },
  kpmg: { displayName: "KPMG", tier: "Professional Services", difficulty: "Medium", avgRounds: 3, avgDuration: "3-5 weeks", title: "How to Prepare for a KPMG Interview (2026) | Preciprocal", description: "Complete KPMG interview prep: the digital assessment, launch pad format, and what each service line tests.", overview: "KPMG often runs a Launch Pad style process that compresses assessment and offer into a short window, sometimes issuing decisions within days. Preparation timing matters more than at firms with longer cycles, because there is little room to improve between stages.", interviewProcess: ["Application and digital assessment","Video or phone interview","Launch pad or assessment day","  -> Technical or case assessment","  -> Behavioural interview","  -> Partner conversation","Offer, sometimes within days"], culture: "KPMG has a structured professional services culture with clear qualification pathways, particularly for audit and tax professionals.", topRoles: ["Accounting Manager","Compliance Analyst","Business Analyst","Financial Analyst"], tips: ["The compressed format leaves little recovery room, arrive fully prepared to every stage.","Audit and tax roles test genuine technical knowledge, study the fundamentals.","Behavioural questions map to KPMG's stated capabilities, prepare against them.","Have a clear answer on why professional services and why KPMG specifically.","Ask about qualification support, it signals you understand the career path."], relatedCompanies: ["deloitte","pwc","ey"] },
  accenture: { displayName: "Accenture", tier: "Professional Services", difficulty: "Medium", avgRounds: 3, avgDuration: "3-4 weeks", title: "How to Prepare for a Accenture Interview (2026) | Preciprocal", description: "Complete Accenture interview prep: the technical and consulting tracks, case format, and behavioural assessment.", overview: "Accenture spans strategy consulting and large-scale technology delivery, and the interview reflects which side you are applying to. Technology roles get genuine technical screens; strategy roles get cases. Both include behavioural rounds mapped to Accenture's core values.", interviewProcess: ["Application and online assessment","Recruiter screen","Interview rounds (2-3)","  -> Technical screen or case interview by track","  -> Behavioural and values round","  -> Client-facing scenario discussion","Offer (3-4 weeks)"], culture: "Accenture is delivery-focused and highly global, with a culture oriented around client outcomes and large-scale technology transformation.", topRoles: ["Management Consultant","Solutions Architect","Business Analyst","Project Manager"], tips: ["Technology and strategy tracks differ substantially, prepare for the right one.","Technology roles run real technical interviews, including cloud and architecture questions.","Client-facing scenarios are common, practise explaining technical ideas to non-technical stakeholders.","Know Accenture's scale and delivery model, it shapes the work considerably.","Behavioural rounds map to stated values, prepare specific examples for each."], relatedCompanies: ["deloitte","bcg","salesforce"] },
  unitedhealth: { displayName: "UnitedHealth Group", tier: "Healthcare", difficulty: "Medium", avgRounds: 3, avgDuration: "3-5 weeks", title: "How to Prepare for a UnitedHealth Group Interview (2026) | Preciprocal", description: "Complete UnitedHealth interview prep: the Optum and insurance divisions, behavioural focus, and healthcare domain expectations.", overview: "UnitedHealth spans insurance through UnitedHealthcare and health services and technology through Optum, and the interviews differ accordingly. Both weight behavioural competencies heavily and expect genuine understanding of US healthcare payment mechanics, which many otherwise strong candidates lack.", interviewProcess: ["Application and screening","Recruiter phone screen (30 min)","Hiring manager interview (45-60 min)","Panel interview (2-3 interviewers)","  -> Behavioural competency questions","  -> Domain or technical questions by role","Offer (3-5 weeks)"], culture: "UnitedHealth is large and process-oriented with a mission framing around making the health system work better. Compliance awareness is embedded throughout.", topRoles: ["Healthcare Administrator","Clinical Data Analyst","Data Analyst","Compliance Analyst"], tips: ["Understand US healthcare payment basics: payers, providers, claims, and value-based care.","HIPAA awareness is expected in every role that touches data.","Behavioural competency questions are structured, use STAR consistently.","Know whether you are interviewing for UnitedHealthcare or Optum, they differ.","Scale matters here, be ready to discuss working within large, regulated processes."], relatedCompanies: ["cvs-health","kaiser-permanente","mayo-clinic"] },
  "cvs-health": { displayName: "CVS Health", tier: "Healthcare", difficulty: "Medium", avgRounds: 3, avgDuration: "3-5 weeks", title: "How to Prepare for a CVS Health Interview (2026) | Preciprocal", description: "Complete CVS Health interview prep: the retail, pharmacy and Aetna divisions, and what each interview assesses.", overview: "CVS Health combines retail pharmacy, pharmacy benefits management and the Aetna insurance business. Interviews are behaviourally structured and increasingly probe understanding of integrated care delivery, since that integration is the company's central strategic bet.", interviewProcess: ["Application and assessment","Recruiter screen (30 min)","Hiring manager interview","Panel or team interviews (2-3)","  -> Behavioural competency rounds","  -> Role-specific technical or clinical questions","Offer (3-5 weeks)"], culture: "CVS Health is operationally focused with a strong patient-care framing and the structured processes of a large regulated enterprise.", topRoles: ["Healthcare Administrator","Clinical Data Analyst","Operations Manager","Data Analyst"], tips: ["Know the three-part business: retail pharmacy, pharmacy benefits management, and Aetna insurance.","Integrated care delivery is the strategic story, have a view on it.","Behavioural rounds are competency-mapped, prepare structured examples.","Regulatory and compliance awareness is assessed across roles.","Operational roles should expect questions about scale and standardisation."], relatedCompanies: ["unitedhealth","walmart","kaiser-permanente"] },
  "mayo-clinic": { displayName: "Mayo Clinic", tier: "Healthcare", difficulty: "Medium", avgRounds: 3, avgDuration: "4-6 weeks", title: "How to Prepare for a Mayo Clinic Interview (2026) | Preciprocal", description: "Complete Mayo Clinic interview prep: the patient-first culture, team-based care model, and the behavioural interview focus.", overview: "Mayo Clinic's interviews are built around its founding principle that the needs of the patient come first. Behavioural questions consistently probe how you have prioritised patient or customer outcomes over convenience, and the team-based care model means collaboration is assessed heavily.", interviewProcess: ["Application and screening","Recruiter or HR screen","Hiring manager interview","Panel interview with team members","  -> Behavioural questions on patient-first values","  -> Role-specific technical or clinical assessment","Offer (4-6 weeks)"], culture: "Mayo Clinic has an unusually strong values-driven culture centred on team-based, patient-first care, with long tenures and high internal standards.", topRoles: ["Healthcare Administrator","Clinical Data Analyst","Data Analyst","Project Manager"], tips: ["The patient-first principle is genuinely operational, prepare stories that demonstrate it.","Team-based care means collaboration questions are weighted heavily.","Epic experience is valuable for administrative and analytics roles.","Quality and safety metrics knowledge differentiates candidates.","Research and academic medicine context matters, Mayo is a teaching institution."], relatedCompanies: ["kaiser-permanente","unitedhealth","cvs-health"] },
  "kaiser-permanente": { displayName: "Kaiser Permanente", tier: "Healthcare", difficulty: "Medium", avgRounds: 3, avgDuration: "4-6 weeks", title: "How to Prepare for a Kaiser Permanente Interview (2026) | Preciprocal", description: "Complete Kaiser Permanente interview prep: the integrated payer-provider model, behavioural rounds, and role expectations.", overview: "Kaiser Permanente is both insurer and care provider, an integrated model that shapes every role. Interviewers look for candidates who grasp why that integration changes incentives around preventive care, and behavioural rounds probe collaboration across clinical and administrative lines.", interviewProcess: ["Application and screening","Recruiter screen (30 min)","Hiring manager interview (45-60 min)","Panel interview","  -> Behavioural competency questions","  -> Domain or technical assessment by role","Offer (4-6 weeks)"], culture: "Kaiser Permanente is mission-driven with a strong preventive care orientation and a heavily unionised, process-mature operating environment.", topRoles: ["Healthcare Administrator","Clinical Data Analyst","Operations Manager","HR Manager"], tips: ["Understand the integrated payer-provider model and why it changes preventive care incentives.","Prepare examples of working across clinical and administrative boundaries.","HIPAA and regulatory fluency is expected throughout.","Quality improvement methodology knowledge is a genuine differentiator.","Know the regional structure, Kaiser operates differently by region."], relatedCompanies: ["unitedhealth","mayo-clinic","cvs-health"] },
  walmart: { displayName: "Walmart", tier: "Consumer & Retail", difficulty: "Medium", avgRounds: 4, avgDuration: "3-5 weeks", title: "How to Prepare for a Walmart Interview (2026) | Preciprocal", description: "Complete Walmart interview prep: the tech and corporate tracks, behavioural framework, and supply chain domain questions.", overview: "Walmart's corporate and technology organisations run quite different loops. Walmart Global Tech interviews resemble standard tech-company processes with coding and system design; merchandising, supply chain and corporate roles run behavioural and case-style interviews grounded in retail operations.", interviewProcess: ["Application and assessment","Recruiter screen (30 min)","Hiring manager interview","Panel or virtual onsite (2-4 rounds)","  -> Coding and system design for tech roles","  -> Case or domain questions for corporate roles","  -> Behavioural rounds on Walmart values","Offer (3-5 weeks)"], culture: "Walmart combines enormous operational scale with a cost-discipline culture inherited from its founding. Decisions are evaluated against customer savings.", topRoles: ["Software Engineer","Supply Chain Analyst","Data Analyst","Operations Manager"], tips: ["Walmart Global Tech runs real coding interviews, prepare as you would for any tech company.","Supply chain roles need genuine domain knowledge: inventory, logistics, forecasting.","Cost discipline is the cultural thread, frame answers around efficiency and customer savings.","Scale is the recurring theme, be ready to reason about thousands of stores.","Know the omnichannel strategy and Walmart's competitive position against Amazon."], relatedCompanies: ["target","amazon","procter-and-gamble"] },
  target: { displayName: "Target", tier: "Consumer & Retail", difficulty: "Medium", avgRounds: 3, avgDuration: "3-4 weeks", title: "How to Prepare for a Target Interview (2026) | Preciprocal", description: "Complete Target interview prep: the behavioural interview structure, retail domain questions, and corporate role expectations.", overview: "Target uses a consistent, structured behavioural format across most corporate roles, with questions mapped to defined competencies. Interviewers reward specific, well-organised examples, and the brand-and-guest orientation runs through every round.", interviewProcess: ["Application and screening","Recruiter phone screen (30 min)","Hiring manager interview (45-60 min)","Panel interview (2-3 rounds)","  -> Structured behavioural competency questions","  -> Role-specific case or technical assessment","Offer (3-4 weeks)"], culture: "Target has a design-conscious, guest-focused culture that is notably more brand-driven than most large retailers, with strong emphasis on team collaboration.", topRoles: ["Business Analyst","Supply Chain Analyst","Marketing Manager","Operations Manager"], tips: ["Behavioural questions are competency-mapped and consistent, prepare structured STAR examples.","Target calls customers guests, and the distinction reflects a real cultural emphasis.","Retail fundamentals matter: inventory turns, margin, seasonality, assortment.","Brand and design sensibility differentiates Target, show you understand its positioning.","Supply chain and merchandising roles need genuine domain preparation."], relatedCompanies: ["walmart","procter-and-gamble","cvs-health"] },
  "procter-and-gamble": { displayName: "Procter & Gamble", tier: "Consumer & Retail", difficulty: "Hard", avgRounds: 4, avgDuration: "4-6 weeks", title: "How to Prepare for a Procter & Gamble Interview (2026) | Preciprocal", description: "Complete P&G interview prep: the PEAK Performance Factors, the online assessment, and the brand management track.", overview: "P&G's process is built around its PEAK Performance Factors and a distinctive online assessment. Interviews are rigorously behavioural, and every answer is expected to map to a specific factor. P&G's promote-from-within model means they hire for long-term potential rather than immediate fit.", interviewProcess: ["Application and P&G online assessment","Digital or phone interview","Interview rounds (2-3)","  -> Behavioural questions mapped to PEAK factors","  -> Business case or brand exercise","  -> Manager and cross-functional rounds","Offer (4-6 weeks)"], culture: "P&G is famously systematic about talent development, promoting almost entirely from within. The culture prizes analytical brand management and structured thinking.", topRoles: ["Brand Manager","Marketing Manager","Supply Chain Analyst","Financial Analyst"], tips: ["Learn the PEAK Performance Factors and prepare an example for each one.","The online assessment is a genuine hurdle, take practice versions seriously.","Brand management here is analytical, not creative, expect market share and P&L questions.","P&G promotes from within, so they assess long-term potential over current skills.","Know their brand portfolio and be able to analyse one brand's market position."], relatedCompanies: ["johnson-and-johnson","target","walmart"] },
  "johnson-and-johnson": { displayName: "Johnson & Johnson", tier: "Healthcare", difficulty: "Medium", avgRounds: 4, avgDuration: "4-6 weeks", title: "How to Prepare for a Johnson & Johnson Interview (2026) | Preciprocal", description: "Complete Johnson & Johnson interview prep: the Credo-based assessment, segment differences, and behavioural rounds.", overview: "J&J's interviews are anchored in Our Credo, the company's founding statement of responsibilities to patients, employees, communities and shareholders in that order. Candidates are expected to engage with it substantively. The three segments, pharmaceutical, medtech and consumer health, run quite different processes.", interviewProcess: ["Application and assessment","Recruiter screen (30 min)","Hiring manager interview","Panel interviews (2-3 rounds)","  -> Credo-based behavioural questions","  -> Technical or scientific assessment by segment","  -> Cross-functional round","Offer (4-6 weeks)"], culture: "J&J is a large, regulated, values-driven organisation where Our Credo genuinely informs decision-making and is referenced constantly in interviews.", topRoles: ["Healthcare Administrator","Clinical Data Analyst","Compliance Analyst","Brand Manager"], tips: ["Read Our Credo and prepare specific stories aligned to its stated priorities.","Identify your segment: pharmaceutical, medtech and consumer health interview differently.","Regulatory awareness is essential, FDA and quality systems context matters.","Behavioural rounds are structured, use STAR with quantified outcomes.","Patient-first framing should be genuine, this is a heavily regulated environment."], relatedCompanies: ["unitedhealth","procter-and-gamble","cvs-health"] },
  "capital-one": { displayName: "Capital One", tier: "Financial Services", difficulty: "Hard", avgRounds: 4, avgDuration: "3-5 weeks", title: "How to Prepare for a Capital One Interview (2026) | Preciprocal", description: "Complete Capital One interview prep: the case interview format, technical rounds, and the analytical bar.", overview: "Capital One is unusual among banks for running business case interviews across many non-consulting roles, including technology and analytics. The cases are quantitative and specific, and candidates who prepare only technical material are consistently caught out.", interviewProcess: ["Application and online assessment","Recruiter or phone screen","Power Day (virtual or onsite, 3-4 rounds)","  -> Business case interview, quantitative","  -> Technical or coding round by track","  -> Behavioural round","Offer (3-5 weeks)"], culture: "Capital One operates more like a technology company than a traditional bank, with a strongly analytical, data-driven decision culture.", topRoles: ["Data Analyst","Software Engineer","Financial Analyst","Business Analyst"], tips: ["Case interviews appear in technology and analytics roles too, prepare for them regardless of track.","Cases are quantitative, practise mental maths and clean structuring.","Credit risk and lending economics knowledge is a genuine advantage.","Technical roles get real coding rounds alongside the case.","Frame recommendations with explicit numbers, this culture expects them."], relatedCompanies: ["jpmorgan","american-express","robinhood"] },
  "american-express": { displayName: "American Express", tier: "Financial Services", difficulty: "Medium", avgRounds: 4, avgDuration: "3-5 weeks", title: "How to Prepare for a American Express Interview (2026) | Preciprocal", description: "Complete American Express interview prep: the behavioural framework, analytics rounds, and the customer-service culture.", overview: "Amex interviews weight customer-centricity heavily, reflecting a business built on premium service and a closed-loop network that gives it unusually rich transaction data. Analytics roles get quantitative rounds; most roles get structured behavioural interviews mapped to defined competencies.", interviewProcess: ["Application and online assessment","Recruiter screen (30 min)","Hiring manager interview","Panel or virtual onsite (2-3 rounds)","  -> Behavioural competency rounds","  -> Analytics, case or technical assessment by role","Offer (3-5 weeks)"], culture: "American Express has a service-oriented, brand-conscious culture with a strong internal emphasis on customer relationships and the premium positioning of the brand.", topRoles: ["Data Analyst","Financial Analyst","Marketing Manager","Business Analyst"], tips: ["Customer-centricity is the cultural core, prepare stories about going beyond for a customer.","Understand the closed-loop network model and why it gives Amex a data advantage.","Analytics roles get genuinely quantitative rounds including SQL.","Brand positioning matters, Amex competes on service rather than price.","Behavioural rounds map to stated competencies, prepare against them explicitly."], relatedCompanies: ["capital-one","jpmorgan","bloomberg"] },
};

export function getCompanyMeta(slug: string): CompanyMeta | null {
  return COMPANY_META[slug] ?? null;
}

export function getCompanyQuestions(slug: string): RoleQA[] {
  const meta = COMPANY_META[slug];
  if (!meta) return [];
  const name = meta.displayName;
  return [
    { question: `How hard is it to get a job at ${name}?`,              answer: `${name} is considered ${meta.difficulty.toLowerCase()} to interview at. Acceptance rates at top tech companies average 1-3%. The process takes ${meta.avgDuration}. Preparation depth is the key differentiator, candidates who practice systematically outperform those who rely on talent alone.` },
    { question: `How many interview rounds does ${name} have?`,         answer: `${name} typically runs ${meta.avgRounds} rounds: ${meta.interviewProcess.slice(0,3).join("; ")}. The total process takes ${meta.avgDuration}. Rounds can split over multiple days for in-person onsites or compress into a single day virtually.` },
    { question: `What coding questions does ${name} ask?`,              answer: `${name} typically asks LeetCode medium to hard difficulty problems. Focus areas: arrays and strings, binary trees and graphs, dynamic programming, and system design. The best preparation is solving 80-100 curated problems, focusing on pattern recognition rather than memorizing solutions.` },
    { question: `What behavioral questions does ${name} ask?`,          answer: `${name} asks behavioral questions tied to their culture. ${meta.culture.substring(0, 200)}... Prepare 6-8 STAR stories covering leadership, conflict, failure, cross-functional collaboration, and initiative. Quantify impact in every story.` },
    { question: `What is the ${name} interview process like in 2026?`,  answer: `The ${name} interview process: ${meta.interviewProcess.slice(0,4).join("; ")}. Most candidates complete the process in ${meta.avgDuration}. Virtual formats have largely replaced in-person onsites, though some teams still offer hybrid options.` },
    { question: `What are the top tips for getting a job at ${name}?`,  answer: meta.tips.join(" ") },
    { question: `What roles does ${name} hire most for?`,               answer: `${name}'s highest-volume roles are: ${meta.topRoles.join(", ")}. Engineers focus on coding and system design, PMs on product sense and metrics, data scientists on SQL/statistics/ML.` },
  ];
}

// =============================================================================
// 7. BLOG POSTS
// =============================================================================

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  { slug: "how-to-pass-ats-resume-screening",       title: "How to Pass ATS Resume Screening in 2026 (Complete Guide)",              description: "Most resumes are rejected before a human sees them. Here's exactly how ATS systems work, why they reject qualified candidates, and the 10 fixes that get you past the filter.",                                            category: "Resume",          readTime: "8 min read",  publishedAt: "2026-01-15", updatedAt: "2026-05-01", featured: true,  content: `## What is ATS and why does it matter?\n\nAn Applicant Tracking System (ATS) is software companies use to receive, sort, and filter job applications before a recruiter ever sees them. If your resume doesn't pass the automated screen, no human reads it, regardless of your qualifications.\n\n## Why good resumes fail ATS\n\nThe most counterintuitive truth: a beautifully designed resume often scores worse than a plain text one. Multi-column layouts, tables, text boxes, graphics, and custom fonts all break ATS parsers.\n\nThe five most common ATS rejection reasons:\n\n**Missing keywords**, mirror the exact language from the job posting.\n\n**Non-standard section headers**, use "Work Experience" not "Professional History."\n\n**Text in headers/footers**, most ATS systems can't read content outside the main body.\n\n**Tables and text boxes**, these render as blank space or are skipped entirely.\n\n**Wrong file format**, unless requested, submit .docx not PDF.\n\n## The 10 fixes that move your score\n\n**Fix 1: Use a single-column layout.** No multi-column formatting, no graphics.\n\n**Fix 2: Mirror job description language exactly.** "Agile methodology" not "agile process."\n\n**Fix 3: Add a Skills section.** List the exact tools from the job description near the top.\n\n**Fix 4: Use standard section headers.** Work Experience, Education, Skills, Certifications.\n\n**Fix 5: Move contact info to the main body.** Not in a document header.\n\n**Fix 6: Remove tables and text boxes.** Reformat as plain text.\n\n**Fix 7: Spell out acronyms once.** "Search Engine Optimization (SEO)" then just "SEO."\n\n**Fix 8: Quantify everything.** "Managed a team of 8" beats "Managed a team."\n\n**Fix 9: Tailor for every application.** One resume for all jobs is the biggest mistake.\n\n**Fix 10: Check your score first.** Use Preciprocal's free ATS checker before submitting.\n\n## What ATS can't evaluate\n\nPassing ATS is the floor, not the ceiling. A score above 75 gets your resume to a human. Now you need to survive the 6-second recruiter scan, clear structure, strong verbs, and quantified impact.` },
  { slug: "software-engineer-interview-prep-guide", title: "The Complete Software Engineer Interview Prep Guide (2026)",             description: "A systematic 8-week study plan for SWE interviews: data structures, algorithms, system design, behavioral, and company-specific prep.",                                                                                   category: "Interview Prep",  readTime: "12 min read", publishedAt: "2026-01-22", updatedAt: "2026-05-01", featured: true,  content: `## The honest truth about SWE interview prep\n\nMost engineers prepare wrong. They grind 300 random LeetCode problems, then panic when the actual interview asks something slightly different. The problem isn't the problems, it's the lack of a system.\n\n## Week 1-2: Data structures and core algorithms\n\n**Arrays and two pointers:** Practice Two Sum, Best Time to Buy Stock, Longest Substring Without Repeating Characters, Container With Most Water.\n\n**Hash maps and sets:** Group Anagrams, Top K Frequent Elements, Valid Anagram.\n\n**Linked lists:** Reverse Linked List, Merge Two Sorted Lists, Linked List Cycle, LRU Cache.\n\n**Stacks and queues:** Valid Parentheses, Daily Temperatures, Min Stack.\n\n## Week 3-4: Trees and graphs\n\n**Binary trees:** Traversals (recursive + iterative), Maximum Depth, Validate BST, Level Order Traversal, Serialize/Deserialize.\n\n**Graphs:** BFS for shortest path, DFS for connectivity. Number of Islands, Clone Graph, Course Schedule, Pacific Atlantic Water Flow.\n\n## Week 5: Dynamic programming\n\nMaster five patterns: 1D DP, 2D DP, knapsack, interval DP, string DP. Practice: Climbing Stairs, Coin Change, Longest Common Subsequence, Word Break, House Robber, Edit Distance.\n\n## Week 6: System design\n\nThe framework: clarify requirements, estimate scale, design high-level architecture, deep-dive critical components, discuss trade-offs. Practice: URL shortener, Twitter feed, YouTube, WhatsApp, Uber.\n\n## Week 7: Behavioral prep\n\nPrepare 7 STAR stories: project you led, conflict with a teammate, a failure, decision with incomplete info, influence without authority, technical decision you defended, greatest accomplishment.\n\n## Week 8: Company-specific prep and mock interviews\n\nResearch the company's engineering blog and recent conference talks. Do at least 3 full mock interviews, with voice, under time pressure, with behavioral questions. Think out loud. Always.` },
  { slug: "how-to-answer-tell-me-about-yourself",   title: "How to Answer 'Tell Me About Yourself' (With Examples for 2026)",       description: "The most common interview question, and the most mishandled. A proven framework plus 3 word-for-word example answers for tech, business, and entry-level roles.",                                                         category: "Behavioral",      readTime: "6 min read",  publishedAt: "2026-02-03", updatedAt: "2026-05-01",          content: `## Why this question trips people up\n\nMost candidates either recite their resume chronologically or give vague generalities like "I'm a hard worker." Neither works. This question is an opportunity, the one moment you fully control the narrative.\n\n## The Present-Past-Future framework\n\n**Present** (1-2 sentences): current role, scope, what you're working on.\n\n**Past** (2-3 sentences): the highlights that explain why you're good at what you do. Not a full history, only what's relevant.\n\n**Future** (2-3 sentences): why this role, at this company, right now. Name something specific.\n\nTarget: 90 seconds to 2 minutes total.\n\n## Example 1: Software engineer (3 years)\n\n"Right now I'm a software engineer at a Series B fintech working on payments infrastructure, I've spent the last year building the reconciliation pipeline that processes $2 billion in transactions daily. Before that I was the second engineer at a startup, which meant I touched everything from APIs to on-call response. I'm most proud of reducing our failed transaction rate by 38% by redesigning our idempotency key system. I'm looking at Stripe because the reliability engineering challenges here, particularly what I read about your deterministic simulation testing, are exactly what I want to be solving next."\n\n## Example 2: New graduate\n\n"I'm finishing my CS degree at Georgia Tech in May, focused on machine learning and distributed systems. Last summer at Capital One I built a feature extraction pipeline that improved fraud detection precision by 8 points, it went to production before I left. Before that I built an open-source neural network visualization tool that got ~400 GitHub stars. I'm excited about this role because your team is working on real-time ML inference at scale, which is exactly the direction I want to go deep in."\n\n## What makes these answers work\n\nSpecific scope. Numbers. A future that names something real about the company. No words like "passionate" or "hardworking."` },
  { slug: "star-method-behavioral-interviews",      title: "The STAR Method: How to Answer Every Behavioral Interview Question (2026)", description: "Situation, Task, Action, Result, the framework behind every great behavioral answer. Includes 15 question-to-story mappings.",                                                                                       category: "Behavioral",      readTime: "10 min read", publishedAt: "2026-02-10", updatedAt: "2026-05-01",          content: `## What STAR is and why it works\n\nSTAR: Situation, Task, Action, Result. It works because behavioral interviews seek evidence, not assertions. "I'm good at conflict resolution" tells the interviewer nothing. A specific story with a clear action and quantified result gives them the evidence they need.\n\n## How to build each section\n\n**Situation (2-3 sentences):** just enough context. Don't over-explain.\n\n**Task (1-2 sentences):** YOUR specific responsibility, not the team's.\n\n**Action (3-5 sentences):** the most important part. What did YOU specifically do? Say "I" not "we."\n\n**Result (2-3 sentences):** what happened? Quantify. Close with what you learned or what you'd do differently.\n\n## The 7 stories to prepare\n\n**Story 1, Leadership/initiative:** ownership beyond your job description.\n\n**Story 2, Conflict/disagreement:** disagreed with manager or teammate and how you handled it.\n\n**Story 3, Failure/mistake:** something that went wrong and what you changed.\n\n**Story 4, Ambiguity:** decision made with incomplete information.\n\n**Story 5, Influence without authority:** getting results when you didn't have direct control.\n\n**Story 6, Technical decision:** meaningful decision you made and defended.\n\n**Story 7, Greatest accomplishment:** your strongest story, fully quantified.\n\n## 15 questions mapped to stories\n\nTell me about a time you took initiative: Story 1\nDescribe a time you led a project: Story 1\nTell me about a disagreement with your manager: Story 2\nTell me about your biggest failure: Story 3\nHow do you handle ambiguity?: Story 4\nTell me about influencing without authority: Story 5\nDescribe a difficult technical decision: Story 6\nWhat's your greatest accomplishment?: Story 7\n\n## The most common STAR mistakes\n\n**Too much situation:** three minutes of context, thirty seconds of action. Flip it.\n\n**Using "we" throughout:** the interviewer is evaluating you.\n\n**No numbers in the result:** "The project was a success" is weak. "We reduced complaints by 22%" is strong.\n\n**Not practicing out loud:** STAR answers that sound crisp in your head sound stilted when spoken. Target 2-3 minutes per answer.` },
  { slug: "system-design-interview-tips",           title: "System Design Interview Tips: How to Think Like a Senior Engineer (2026)", description: "The framework top candidates use to tackle any system design question, from clarifying requirements to drawing the final architecture.",                                                                          category: "Technical",       readTime: "14 min read", publishedAt: "2026-02-17", updatedAt: "2026-05-01",          content: `## Why system design interviews are different\n\nCoding interviews have right answers. System design interviews don't. There are only trade-offs, and the interviewer is evaluating how clearly you reason about them.\n\n## The 6-step framework\n\n**Step 1, Clarify requirements (5 min):** Never start drawing. Ask: Who are the users? What's the core use case? What are non-functional requirements (availability, latency, consistency)? Write them on the board.\n\n**Step 2, Estimate scale (3 min):** Users, requests/second, read/write ratio, storage. These numbers drive architectural choices.\n\n**Step 3, Define the API (3 min):** What endpoints? What do they take and return? Forces precision before design.\n\n**Step 4, High-level design (10 min):** Draw major components: clients, load balancer, app servers, database(s), cache, CDN, message queue. Don't go deep yet.\n\n**Step 5, Deep dive (15 min):** The interviewer steers you. Common deep-dives: database schema, cache invalidation, scaling the write path, handling failures.\n\n**Step 6, Failure and edge cases (5 min):** What happens when a server dies? Database unreachable? Traffic spike?\n\n## 5 worked examples\n\n**URL shortener:** Write path, base62 ID generator, key-value store (Redis cache + DB). Read path, Redis lookup, DB fallback, redirect. Scale: cache hit rate is critical (reads >> writes).\n\n**Twitter timeline:** Fan-out on write (push to follower timelines at write time) vs fan-out on read. Twitter uses a hybrid: fan-out on write for most users, fan-out on read for celebrities with millions of followers.\n\n**WhatsApp messaging:** Exactly-once delivery via message queue per recipient. Key challenge: ordering guarantees. Use sequence numbers per conversation.\n\n**YouTube:** Separate write and read paths. Upload: video to blob storage to transcoding queue to CDN. Stream: manifest file, CDN chunks. Video data is immutable, perfect for caching.\n\n**Autocomplete:** Trie data structure. At Google's scale: pre-compute popular queries, distribute by geographic region, separate ranking layer weighted by location and query frequency.\n\n## What interviewers want to see\n\nDrive the conversation. Know where the hard parts are. Make trade-offs out loud. "We could do X, but that would mean Y. Given the scale requirements, I'd choose Z because...", that sentence is the whole interview.` },
  { slug: "how-to-negotiate-salary-offer",          title: "How to Negotiate Your Salary Offer in 2026 (Scripts That Work)",         description: "Most offers have room to negotiate. Here are the exact scripts, timing strategies, and tactics that can meaningfully increase your total compensation.",                                                             category: "Career Strategy", readTime: "9 min read",  publishedAt: "2026-02-24", updatedAt: "2026-05-01",          content: `## The negotiation most people skip\n\nMost job seekers accept the first offer. Starting salary anchors every future raise and offer for years. Negotiating is expected, most recruiters have a range and the first offer is rarely the top of it.\n\n## Before you negotiate: know your numbers\n\nResearch Levels.fyi (tech), Glassdoor, LinkedIn Salary, and Blind. Have a target (what you want) and a walk-away (what you need for the move to make sense). Understand total compensation: base, equity, signing bonus, benefits, flexibility.\n\n## The timing\n\nDon't negotiate during the interview process. If asked for salary expectations early, deflect: "I'd love to learn more about the full scope of the role first, I'm confident we can find a number that works for both sides."\n\nWhen you receive a written offer, take 24-48 hours. Use the time to prepare.\n\n## The counter: exact scripts\n\n**By email:** "Thank you, I'm genuinely excited about the role. After reviewing the details, I was hoping we could discuss the base salary. Based on my research and experience, I was targeting closer to $[target]. Is there flexibility there?"\n\n**By phone:** "I appreciate the offer and I'm very interested. I've done some research on the market rate, and I was hoping to land closer to $[target]. Is that something we could work toward?"\n\n**When they say no to base:** "I understand. Would there be flexibility on the signing bonus or equity? Even a small increase would help bridge the gap."\n\n**With a competing offer:** "I want to be transparent, I have another offer at $[X]. I'm more excited about this role, which is why I'm bringing this to you first. Is there any way to get closer?"\n\n## What can be negotiated\n\n**Base salary:** most impactful and most common.\n\n**Signing bonus:** one-time cost, often easier to move.\n\n**Equity:** especially at pre-IPO companies.\n\n**Start date:** giving proper notice protects your reputation.\n\n**Title:** matters for future negotiations.\n\n**Remote flexibility:** if hybrid, sometimes you can reduce in-office days.` },
  { slug: "google-interview-process-explained",     title: "The Google Interview Process Explained (2026)",                           description: "Everything you need to know about Google's hiring process, from the recruiter screen to the hiring committee vote.",                                                                                             category: "Company Guides",  readTime: "11 min read", publishedAt: "2026-03-03", updatedAt: "2026-05-01",          content: `## How Google evaluates candidates\n\nGoogle assesses on four dimensions: General Cognitive Ability, Leadership, Googleyness (culture fit), and Role-Related Knowledge. Pedigree doesn't predict performance here, a state school graduate who interviews well is evaluated identically to a Stanford PhD.\n\n## The process, step by step\n\n**Stage 1, Recruiter screen (30 min):** Background and interest. Be warm, clear, and express genuine enthusiasm for Google specifically.\n\n**Stage 2, Technical phone screen (45-60 min):** One or two LeetCode-style problems, usually medium. Talk through your thinking, don't code silently.\n\n**Stage 3, Onsite (4-5 rounds, 45 min each):** Two coding rounds (medium to hard), one system design round (L4+), one or two Googleyness/behavioral rounds using STAR.\n\n**Stage 4, Hiring committee:** 4-5 engineers who weren't in your interviews review your full packet and vote. This means every round matters, one weak round can sink you.\n\n**Stage 5, Team matching (some levels):** After committee approval, you meet potential teams.\n\n## How to prepare\n\n**Coding:** 75-100 LeetCode problems, focused on trees, graphs, DP, string manipulation. Prioritize mediums.\n\n**System design:** 8-10 practice systems using the 6-step framework. Google-scale: search autocomplete, YouTube, Google Maps, Gmail, Google Docs collaborative editing.\n\n**Googleyness:** Show intellectual humility, changed your mind based on data, sought out feedback, supported teammates without personal benefit.\n\n## The thing most candidates underestimate\n\nGoogle's bar is set by committee, not individual interviewers. Consistency across rounds matters more than crushing one round. If behavioral questions are your weakness, fix that before the onsite, your coding won't compensate.` },
  { slug: "amazon-leadership-principles-interview", title: "How to Answer Amazon Leadership Principles Questions (All 16), 2026",    description: "Amazon's 16 Leadership Principles drive every interview. Here's what each one means, what interviewers look for, and answer frameworks.",                                                                          category: "Company Guides",  readTime: "15 min read", publishedAt: "2026-03-10", updatedAt: "2026-05-01",          content: `## Why the LPs matter more than you think\n\nAt Amazon, the Leadership Principles are the actual hiring rubric. Every interviewer is assigned specific LPs to probe. Every hiring decision is made against them. The Bar Raiser uses LPs as their primary framework.\n\n## The 5 most-probed LPs\n\n**Customer Obsession:** Show a concrete example of identifying what customers really needed (not just what they asked for) and prioritizing their outcome over an easier path. Weak: "I always try to put the customer first." Strong: specific situation with quantified result.\n\n**Ownership:** Evidence you treated the company's resources as your own and took on problems outside your formal scope.\n\n**Bias for Action:** Calculated risk-taking, launch with 70% information rather than waiting for 100%. Show you identified which decisions were reversible vs. not.\n\n**Dive Deep:** You discovered a critical problem by looking at raw data or talking directly to customers, and that insight changed a decision.\n\n**Disagree and Commit:** Two things in the same story: (1) you pushed back on a decision you disagreed with, and (2) once the decision was made, you executed with full commitment.\n\n## The remaining 11 LPs\n\n**Invent and Simplify:** Simplify a complex process, simpler outcomes show more skill.\n\n**Are Right, A Lot:** Judgment was validated; show you sought diverse input before deciding.\n\n**Learn and Be Curious:** Something significant you taught yourself recently.\n\n**Hire and Develop the Best:** Help teammates grow or raise the team's bar.\n\n**Insist on the Highest Standards:** Held a quality bar higher than strictly required.\n\n**Think Big:** Proposed something that changed trajectory, not just incremental optimization.\n\n**Frugality:** Accomplished more with fewer resources.\n\n**Earn Trust:** Admitting a mistake, or giving difficult feedback to a peer.\n\n**Deliver Results:** Your clearest example of measurable impact. Numbers required.\n\n**Strive to Be Earth's Best Employer** and **Success and Scale Bring Broad Responsibility:** For managers and senior leaders.\n\n## Practical prep\n\nPrepare one strong STAR story for every LP, all 16. Practice saying "I" not "we." Have depth behind every story: know your numbers, the outcome, and what you'd do differently.` },
  { slug: "leetcode-study-plan-4-weeks",            title: "The 4-Week LeetCode Study Plan That Gets You Hired (2026)",               description: "Stop grinding random problems. This structured 4-week plan covers the patterns that appear in the vast majority of FAANG interviews.",                                                                            category: "Technical",       readTime: "7 min read",  publishedAt: "2026-03-17", updatedAt: "2026-05-01",          content: `## The problem with random grinding\n\nMost engineers solve 150 problems but can't reliably solve a medium they haven't seen. The goal isn't memorization, it's pattern recognition. See a problem, identify the pattern, apply the template.\n\n## Week 1: Arrays, strings, hash maps\n\n**Two pointers (days 1-2):** Reduces O(n squared) problems to O(n). Practice: Two Sum II, 3Sum, Container With Most Water, Trapping Rain Water.\n\n**Sliding window (days 3-4):** For subarray/substring problems with a constraint. Practice: Longest Substring Without Repeating Characters, Minimum Window Substring.\n\n**Hash maps (day 5):** O(1) lookup. Practice: Group Anagrams, Top K Frequent Elements.\n\nDaily target: 4-5 problems. Understand the pattern, don't just get the solution.\n\n## Week 2: Trees and graphs\n\n**Binary trees (days 1-2):** Recursive + iterative traversals. Practice: Max Depth, Invert Binary Tree, Diameter, Level Order Traversal, Lowest Common Ancestor.\n\n**Graphs (days 4-5):** BFS for shortest path, DFS for connectivity. Practice: Number of Islands, Course Schedule, Word Ladder.\n\n## Week 3: Dynamic programming and binary search\n\n**1D DP (days 1-2):** Climbing Stairs, House Robber, Coin Change, LIS.\n\n**2D DP (days 3-4):** Unique Paths, LCS, Edit Distance.\n\n**Binary search (day 5):** Binary search on the answer. Practice: Find Minimum in Rotated Array, Koko Eating Bananas.\n\n## Week 4: Stacks, heaps, mock interviews\n\n**Stacks (days 1-2):** Monotonic stack. Daily Temperatures, Largest Rectangle in Histogram.\n\n**Heaps (day 3):** K-th largest problems. Merge K Sorted Lists, Task Scheduler.\n\n**Full mock interviews (days 4-7):** Set a timer. Code while talking out loud. Analyze complexity. Do at least 4 full mocks.\n\n## The rules that make this work\n\nSolve every problem twice (48 hours apart). Time-box struggle to 15 minutes. Do the mocks out loud, coding silently is a different skill.` },
  { slug: "resume-keywords-that-get-past-ats",      title: "Resume Keywords That Get Past ATS in 2026 (By Role)",                    description: "The exact keywords ATS systems look for in software engineering, data science, product management, and 6 other roles, with examples of how to use them naturally.",                                              category: "Resume",          readTime: "8 min read",  publishedAt: "2026-03-24", updatedAt: "2026-05-01",          content: `## How ATS keyword matching works\n\nModern ATS platforms use semantic matching and contextual analysis. But the core principle holds: if your resume doesn't contain the language the job description uses, your score suffers. The solution isn't keyword stuffing, it's ensuring relevant concepts appear naturally in context.\n\n## Software Engineer\n\nCore keywords: Python, JavaScript, TypeScript, Java, Go, SQL, REST API, GraphQL, microservices, distributed systems, CI/CD, Docker, Kubernetes, AWS/GCP/Azure, system design, agile, TDD.\n\nAction verbs: architected, built, optimized, reduced, scaled, migrated, deployed, shipped.\n\nPattern: "Architected and deployed [system] using [tech], reducing [metric] by [X]%."\n\n## Data Scientist\n\nCore keywords: Python, R, SQL, machine learning, statistical modeling, A/B testing, hypothesis testing, regression, neural networks, feature engineering, Pandas, scikit-learn, TensorFlow, PyTorch, Spark.\n\nDifferentiating keywords (signal depth): production ML, MLOps, model deployment, causal inference, Bayesian methods.\n\n## Product Manager\n\nCore keywords: product roadmap, user research, A/B testing, KPIs, OKRs, stakeholder management, cross-functional, agile, go-to-market, user stories, backlog prioritization, data-driven, DAU, MAU, NPS.\n\nTrap: listing responsibilities not outcomes. "Managed the roadmap" vs. "Prioritized and shipped 4 features that grew DAU by 18% in Q3."\n\n## Financial Analyst\n\nCore keywords: financial modeling, DCF, EBITDA, LBO, comparable companies, Excel, PowerPoint, variance analysis, budget, forecast, P&L, balance sheet, cash flow, GAAP, Bloomberg.\n\n## Marketing Manager\n\nCore keywords: go-to-market, demand generation, content marketing, SEO, SEM, paid social, email marketing, CRM, HubSpot, Salesforce, analytics, Google Analytics, attribution, funnel, conversion rate.\n\n## HR Manager\n\nCore keywords: talent acquisition, HRIS, Workday, performance management, compensation benchmarking, employee relations, DEI, onboarding, workforce planning, compliance, FLSA, FMLA.\n\n## How to use these keywords naturally\n\nPasting a keyword list at the bottom is detectable and suspicious. Put keywords inside bullets describing what you did with them: "Reduced customer churn by 18% through a data-driven segmentation model using Python and scikit-learn."\n\nRun your resume through Preciprocal's ATS checker after updating, see exactly which keywords are present, which are missing, and your overall match score before you submit.` },
{slug: "how-to-get-first-tech-job-no-experience",
    title: "How to Get Your First Tech Job With No Experience (2026 Guide)",
    description: "Breaking into tech without experience is possible, but the path is different from what most guides tell you. Here is the exact strategy that works for new grads and career switchers in 2026.",
    category: "Career Strategy",
    readTime: "11 min read",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-08",
    featured: true,
    content: `## The honest reality of getting your first tech job
 
Most advice about breaking into tech is written by people who did it 10 years ago or who already had connections. The reality in 2026 is more competitive and more navigable than ever, but you need a different playbook.
 
The good news: companies hire people with no professional experience every day. The bad news: your resume, interview skills, and job search strategy all have to compensate for what your work history cannot show.
 
## Why "apply everywhere" doesn't work
 
The default strategy most new grads use is to spray applications across 50-100 job postings and wait. This approach fails for three reasons.
 
First, your resume gets filtered by ATS before a human sees it. If your resume isn't optimised for the specific job description, it scores below the threshold and no recruiter ever reads it.
 
Second, without targeted preparation, interviews feel like random tests rather than predictable conversations. Companies ask the same types of questions repeatedly. You can prepare for them.
 
Third, volume without strategy is exhausting and demoralising. A focused approach to 15 well-matched jobs outperforms scattering 100 applications.
 
## Step 1: Build a resume that passes ATS before it reaches humans
 
ATS systems filter resumes before any human sees them. For entry-level candidates, this is where most applications die.
 
What makes a new grad resume pass ATS:
 
**Mirror the job description language exactly.** If the posting says "proficiency in Python and SQL," your resume should say "proficiency in Python and SQL," not "experience with programming languages." ATS systems do keyword matching. Use the exact phrases from the posting.
 
**Use a single-column, plain-text-friendly format.** No multi-column layouts, no graphics, no tables, no text boxes. These break ATS parsers. A clean single-column resume scores higher than a beautifully designed two-column one.
 
**Put a Skills section near the top.** List the exact tools and languages from the job description. This gives the ATS multiple hits on your keywords early.
 
**Lead with projects and internships, not your GPA.** Hiring managers want evidence you can do the work. A GitHub project that solves a real problem is more compelling than a 3.8 GPA with no applied work.
 
Run every resume version through an ATS checker before submitting. Most rejections happen here, not at the interview stage.
 
## Step 2: Build projects that prove you can do the job
 
If you have no professional experience, projects are your experience section. They need to be substantial enough to generate interview conversations, not just checkbox items.
 
What makes a project worth including:
 
It solves a real problem. "Expense tracker app" is weak. "Expense tracker that used ML to categorise 3 years of my family's spending and identified $4,200 in recurring subscriptions we didn't know about" is a conversation starter.
 
It demonstrates skills directly relevant to the roles you're targeting. Backend engineering roles want to see APIs, databases, and system design. Data science roles want to see data cleaning, model training, and evaluation. Match your projects to your target role.
 
It has a live link or public repository. Something you can demo in an interview is worth 10x a project that only exists on your resume. Deploy your projects. Make them publicly visible.
 
Aim for 2-3 substantial projects over many shallow ones. Depth is what generates interesting interview conversations.
 
## Step 3: Get the application itself right
 
**Target companies that hire new grads systematically, not just by preference.** Large tech companies (Google, Microsoft, Amazon, Meta) have structured new grad programs with specific headcount set aside. Mid-size companies with 50-500 engineers often prefer candidates with some experience. Startups under 20 people rarely have the bandwidth to train someone from scratch. Target large tech, scale-ups, and companies with explicit new grad programs.
 
**Apply early in hiring cycles.** Most tech companies open new grad positions in August through October for the following year. By January, many roles are already filled. If you're graduating in May, apply the preceding autumn.
 
**Tailor your resume for each application.** This does not mean rewriting from scratch. It means adjusting your Skills section and 2-3 bullet points to mirror the specific job description. A 20-minute tailoring effort per application meaningfully improves your ATS score.
 
## Step 4: Prepare for interviews like they are predictable, because they are
 
Technical interviews for entry-level roles test a specific, learnable set of patterns. They are not random. They are not tests of intelligence. They are tests of preparation.
 
**For software engineering:** Data structures and algorithms cover approximately 80% of coding interview content. The patterns that appear most often are two pointers, sliding window, binary search, BFS/DFS on trees and graphs, and dynamic programming. Study the pattern, not the individual problem. Practice out loud, not silently.
 
**For all roles:** Every entry-level interview includes behavioural questions. Prepare 5-6 STAR stories from your projects, internships, or academic experiences. Cover: a project you led, a challenge you overcame, a time you worked with others through disagreement, something you taught yourself, and your most impactful result. Quantify every story, even from project work.
 
**Mock interviews before the real thing.** Answering interview questions alone in your room feels easy. Answering them in front of another person under time pressure feels completely different. The gap between the two is practice under realistic conditions. Do at least 3 full mock interviews before any real interview.
 
## Step 5: Manage the job search like a project
 
Track every application: company, role, date applied, status, next action. This matters because the average tech job search for a new grad takes 3-6 months and 50-150 applications before an offer. Without a tracking system, you lose context, miss follow-ups, and cannot identify patterns in what is and isn't working.
 
Follow up on every application that reaches a human reviewer. A brief, professional email 5-7 days after a phone screen or onsite is not aggressive; it is professional. Most candidates don't do it.
 
Adjust your strategy based on data. If you're getting no callbacks, the problem is your resume or your targeting. If you're getting callbacks but not passing phone screens, the problem is your initial pitch and communication. If you're passing phone screens but failing onsites, the problem is technical or behavioural interview preparation. Each stage requires a different fix.
 
## The most important thing nobody tells you
 
Breaking into tech for the first time is a volume-and-quality game. You will get rejected many more times than you get offers. This is not a signal that you are not good enough. It is a signal that the process is a numbers game with a long tail.
 
The candidates who get offers are not always the most talented. They are the most prepared, the most persistent, and the most strategic about where they spend their energy. Build the skills, build the projects, prepare for interviews, and apply consistently. The offer comes.`,
  },
  {
    slug: "ats-resume-tips-new-grads",
    title: "ATS Resume Tips for New Grads in 2026 (No Work Experience? No Problem)",
    description: "New grads face a harder ATS challenge than experienced candidates. Your resume gets compared against people with years of keywords you don't have yet. Here is how to close that gap.",
    category: "Resume",
    readTime: "9 min read",
    publishedAt: "2026-05-08",
    updatedAt: "2026-05-08",
    featured: false,
    content: `## Why ATS is harder for new grads than everyone else
 
ATS (Applicant Tracking System) software doesn't know you're a new grad. It compares your resume against a job description using keyword matching and scores you against every other applicant, including people with 3-5 years of experience who have the exact keywords you're still building.
 
This means new grads face a structural disadvantage: less work history means fewer opportunities to naturally accumulate the language that ATS systems reward. The fix isn't to lie, it's to be more strategic about how you present what you actually have.
 
## Understand what ATS is actually scoring
 
Modern ATS platforms score resumes on several dimensions. Understanding each one helps you know where to focus your effort.
 
**Keyword match:** Does your resume contain the specific terms from the job description? This is the most important dimension and the most fixable. The system looks for exact or near-exact phrase matches. "Machine learning" and "ML" may score differently. "SQL" and "structured query language" may score differently. Use the exact language from the posting.
 
**Section recognition:** Does your resume have standard, recognisable sections? ATS parsers are trained on standard headers: Work Experience, Education, Skills, Projects, Certifications. Non-standard headers ("Where I've Been," "Things I'm Good At") confuse parsers and result in content being miscategorised or skipped entirely.
 
**Format compatibility:** Can the ATS actually read your resume? Multi-column layouts, tables, text boxes, headers and footers, graphics, and complex formatting all break ATS parsers in different ways. A resume that looks stunning in Word or PDF may parse as near-empty in an ATS.
 
**Content depth:** How much relevant content does your resume contain overall? Thin resumes, common for new grads, score lower simply because there is less content for the system to evaluate.
 
## The new grad ATS advantage you're not using: the Projects section
 
Most new grad resumes have a Projects section that reads like a list of technologies rather than a demonstration of skills. This is a missed opportunity.
 
A weak projects entry looks like this:
"Personal Finance Tracker - Python, Flask, PostgreSQL, React"
 
A strong projects entry, one that scores well on ATS and generates interview conversations, looks like this:
"Personal Finance Tracker - Built a full-stack web application using Python (Flask), PostgreSQL, and React that automatically categorised 3 years of transaction data using a custom ML classification model. Achieved 91% categorisation accuracy. Reduced manual review time by 4 hours per month."
 
The second version contains: Python, Flask, PostgreSQL, React, machine learning, classification model, accuracy (a metric), and a quantified impact. Every one of those terms is a potential ATS keyword match. The first version contains only technology names with no context.
 
Rewrite every project entry to describe what you built, what technology you used (explicitly), what the result was, and how you could measure it.
 
## Keyword strategy for new grads
 
You cannot fake experience. But you can ensure that the experience you do have is described using the language that ATS systems and recruiters recognise.
 
**Step 1: Copy the job description into a document.** Highlight every technical term, tool, methodology, and skill mentioned. This is your keyword target list.
 
**Step 2: Map every keyword to something real in your background.** If the posting mentions "REST APIs" and you built one in a class project, your project description should say "REST API," not "back-end web service." If it mentions "agile" and you followed a sprint structure in a group project, say "agile sprint methodology." Accurate, specific language.
 
**Step 3: Add a Skills section near the top of your resume.** This section exists purely for ATS. List every tool, language, framework, and methodology you have genuine familiarity with, using the exact terms from job postings in your target area. Keep it factual. The interview will verify everything on this list.
 
**Step 4: Check your score before submitting.** Run your tailored resume through an ATS checker with the specific job description. Your goal is a match score above 75%. Below that, you're likely getting filtered before a human sees you.
 
## Format rules that matter most
 
These formatting decisions have a direct and measurable impact on ATS scores for new grads.
 
**Single column only.** Two-column resumes are the most common ATS formatting mistake. The parser reads left-to-right, top-to-bottom. In a two-column layout, it reads half a sentence from the left column, then half a sentence from the right column, producing gibberish. Use a single-column format.
 
**Standard fonts only.** Arial, Calibri, Helvetica, Times New Roman, Georgia. Custom or decorative fonts sometimes fail to render in ATS parsers, turning text into encoding errors.
 
**No graphics, icons, or profile photos.** These are invisible to ATS and waste space that could contain keywords.
 
**No headers or footers for contact information.** Many ATS systems cannot read content inside document headers and footers. Put your name, email, phone, and LinkedIn URL in the main body of the document.
 
**Save as .docx, not PDF, unless specifically requested otherwise.** Some ATS systems parse .docx more reliably than PDF. When in doubt, use .docx.
 
**Keep it to one page if under 2 years of experience.** Recruiters and ATS systems both prefer focused, dense resumes over padded two-page documents for new grads. Every line should earn its place.
 
## What to put in your resume when you have limited work history
 
The concern most new grads have is that they simply don't have enough to fill a resume. Here is the order of priority for content when you have limited professional experience.
 
**Lead with a Skills section.** This is your highest-density keyword opportunity. Two to three rows listing languages, frameworks, tools, and methodologies. Keep it factual. You should be able to demonstrate everything listed in an interview.
 
**Projects section comes second for tech roles.** Three to four substantial projects described with impact and metrics as described above. This is your de facto experience section.
 
**Internships and part-time work.** Even non-tech internships demonstrate professional behaviour, communication, and work ethic. Describe them using the same impact-and-metric framing. A customer service role becomes "Resolved an average of 45 customer issues per day with a 4.8/5 satisfaction rating."
 
**Education.** For most new grads, education goes near the top. Include: degree, institution, graduation date, and GPA if above 3.5. Also include relevant coursework if it directly maps to the job requirements (e.g., "Relevant coursework: Data Structures and Algorithms, Database Systems, Machine Learning").
 
**Certifications and relevant coursework.** AWS certifications, Google data analytics certificates, Coursera specialisations in relevant areas. These add keywords and demonstrate initiative.
 
## The mistake that costs the most ATS points
 
The single most common and most costly ATS mistake new grads make is submitting the same resume to every job.
 
ATS systems compare your resume to a specific job description. A resume optimised for a software engineering role at a startup will score poorly against a data analyst role at a bank, even if you are qualified for both. Tailoring is not optional. It is the entire game.
 
The good news is that tailoring does not mean rewriting from scratch. It means adjusting your Skills section to prioritise the tools mentioned in this specific posting, and rewriting 2-3 bullet points to use the exact language from the description. This takes 20-30 minutes per application and meaningfully changes your outcomes.
 
Use an ATS checker with the specific job description every time before submitting. Treat anything below a 70% match score as a signal to spend another 20 minutes tailoring before you hit submit.
 
## After the ATS: what happens next
 
Passing ATS gets your resume in front of a human recruiter. The average recruiter spends 6-7 seconds on an initial resume scan. In that 6 seconds, they are looking for: your name and contact info (top), your most recent or most relevant role (first third of the page), a recognisable company or institution, and a number that catches their eye (any quantified metric).
 
Structure your resume so that the most compelling information sits in the top half of the page. Lead with your strongest project or most recent experience. Make your metrics visible at a glance.
 
Passing the ATS screen is necessary but not sufficient. After that, you need to be ready to interview. Run mock interviews before every real interview. Know your projects deeply enough to be questioned on implementation decisions. Have your STAR stories practised out loud, not just in your head. The resume gets you in the room. Preparation is what gets you the offer.`,
  },
  {
    slug: "how-to-get-job-with-visa-sponsorship-2026",
    title: "How to Get a Job With Visa Sponsorship in the US (2026 Guide for International Students)",
    description: "Visa sponsorship is not a dealbreaker if you approach it correctly. Here is the exact strategy international students use to land sponsored roles at US companies in 2026.",
    category: "Career Strategy",
    readTime: "12 min read",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-15",
    featured: true,
    content: `## The sponsorship problem is real but solvable

Most international students treat visa sponsorship as a filter that eliminates them from most jobs. That framing is wrong. Sponsorship is a cost and a process, not a moral judgment about your worth. The companies that sponsor do it routinely. Your job is to find them and give them a reason to say yes.

The H-1B lottery system is broken and unpredictable. But OPT and STEM OPT give you 1-3 years of work authorization without needing a sponsor to file anything. That window is your most valuable job-searching asset. Use it.

## The three-tier strategy

**Tier 1: Large tech and finance companies that sponsor routinely.**
Companies like Google, Microsoft, Amazon, Meta, JPMorgan, Goldman Sachs, and McKinsey file hundreds of H-1B petitions every year. They have immigration lawyers on retainer. For them, sponsoring one more engineer is a rounding error. These are your highest-probability targets.

**Tier 2: Mid-size companies that have sponsored before.**
Use myvisajobs.com and h1bdata.info to filter companies by H-1B filing history. Any company that has filed in the past 3 years has the infrastructure to do it again. Filter your job search to these companies first.

**Tier 3: Startups and smaller companies.**
Possible but harder. They need to believe you are so valuable that the cost and complexity of sponsorship is worth it. This means you need to be further along in the process, ideally with competing offers, before the topic comes up.

## When and how to raise sponsorship

Do not put "requires visa sponsorship" on your resume or LinkedIn. Raise it after you have demonstrated value, ideally after a first-round interview when they are already interested.

When asked directly, use this framing: "I am currently on OPT and authorized to work in the US for the next [X] years without any action required from the employer. Down the line I would need H-1B sponsorship, which I know your company has experience with."

This reframes the conversation. You are not asking for a favour. You are describing a timeline.

## The roles that get sponsored most

Engineering roles dominate H-1B filings. Data science, product management, and finance roles at large firms also sponsor regularly. Design and marketing roles are harder. Check h1bdata.info for your specific role and target companies before investing heavily in applications.

## Networking as a visa strategy

A referral from inside the company changes the calculus entirely. When someone internal vouches for you, the hiring manager is already thinking "how do we make this work" rather than "is this worth the hassle." LinkedIn outreach to alumni from your university who work at your target companies is the highest-ROI activity you can do in your job search.

## What international students get wrong

Applying only to companies with "visa sponsorship available" in the job posting. Most companies that sponsor do not advertise it. They decide case by case based on the candidate. Apply broadly to companies with H-1B filing history, not just those that explicitly advertise sponsorship.

Disclosing sponsorship needs too early. Every premature sponsorship conversation is a conversation that did not happen about your skills. Lead with value. Raise logistics after they want you.

Not using OPT strategically. Your OPT period is your trial period with the US job market. Use it to get your first role, build US work experience, and make yourself an obvious sponsorship candidate when the time comes.`,
  },
  {
    slug: "ai-tools-actually-help-job-search-2026",
    title: "The AI Tools That Actually Help Your Job Search in 2026 (And the Ones That Waste Your Time)",
    description: "Not all AI job search tools are equal. Here is an honest breakdown of what works, what is overhyped, and how to use AI without making your applications look generic.",
    category: "Career Strategy",
    readTime: "9 min read",
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
    featured: true,
    content: `## The AI job search landscape in 2026

38% of job seekers now use AI tools in their job search. The tools range from genuinely useful to actively harmful to your candidacy. Using AI wrong is now one of the most common reasons candidates get filtered out, as recruiters and ATS systems have become increasingly good at detecting generic AI-generated content.

Here is an honest breakdown of what actually works.

## What AI is genuinely good at in a job search

**Resume tailoring.** This is the highest-value use of AI. Paste a job description, paste your resume, ask the AI to identify missing keywords and suggest rewrites for specific bullets. The output is a starting point, not a final draft. Rewrite every suggestion in your own voice before submitting.

**Cover letter first drafts.** AI can produce a serviceable first draft in 30 seconds. The problem is that "serviceable" generic cover letters perform worse than a well-written personal one. Use AI to get past the blank page, then rewrite the opening paragraph and any company-specific references completely. The goal is a letter that sounds like you, not like a press release.

**Interview preparation.** This is where AI provides the most underappreciated value. AI mock interview tools let you practice answering questions out loud, get feedback on your answer structure, and run through company-specific scenarios without scheduling time with another person. Candidates who practice with AI interviewers consistently outperform those who only read sample answers.

**Research.** Use AI to quickly summarize a company's recent news, understand their business model, or generate a list of smart questions to ask an interviewer. 20 minutes of AI-assisted research produces better interview preparation than 2 hours of aimless Googling.

## What AI is bad at

**Auto-applying to hundreds of jobs.** Tools that apply to jobs automatically on your behalf produce a high volume of low-quality applications. Recruiters can tell. ATS systems deprioritize repeat applicants from the same IP submitting identical materials. Your response rate will be worse than a targeted manual search, not better.

**Writing your entire resume from scratch.** AI does not know what you actually accomplished. It fills gaps with plausible-sounding but vague claims. A resume written entirely by AI tends to be generic, unverifiable, and forgettable.

**Predicting what an interviewer will ask.** AI-generated "likely interview questions" lists are based on generic patterns, not the specific team, manager, or role you are interviewing for. Use them as warm-up, not as your primary prep.

## The detection problem

Over 90% of employers now use AI screening tools. Some of these tools score AI-generated content negatively. Even when they do not, recruiters who read hundreds of cover letters per week can spot the AI pattern immediately: "I am excited to apply for the [role] at [company] because your mission of [mission] aligns with my passion for [thing]."

The fix is not to avoid AI. It is to use AI as a starting point and then edit heavily. The test: read your application out loud. If it sounds like you talking to someone, submit it. If it sounds like a LinkedIn post, rewrite it.

## The tools worth using in 2026

Resume ATS checkers: run your resume against each job description before applying. A 60% keyword match is leaving callbacks on the table.

AI mock interview tools: practice is the only thing that actually reduces interview anxiety. Doing it with an AI that can give immediate feedback is more efficient than practicing in your head.

Salary research tools: Levels.fyi, Glassdoor, and LinkedIn Salary give you the data you need to negotiate. Going into an offer without this information costs real money.

Job tracking tools: a simple tracker prevents the embarrassing mistake of forgetting where you applied and ensures you follow up at the right time.`,
  },
  {
    slug: "how-to-answer-why-are-you-looking-for-new-job",
    title: "How to Answer Why Are You Looking for a New Job Without Saying the Wrong Thing",
    description: "This question sounds simple but kills more candidates than any technical question. Here is the framework that keeps you honest, positive, and compelling at the same time.",
    category: "Behavioral",
    readTime: "6 min read",
    publishedAt: "2026-05-22",
    updatedAt: "2026-05-22",
    content: `## Why this question is harder than it looks

"Why are you looking for a new job?" is not really asking for your reason. It is a test of your professionalism, your self-awareness, and your ability to stay positive under mild pressure. The recruiter already suspects the real answer might involve money, a bad manager, or frustration. They want to see how you handle that.

The wrong answers are obvious in retrospect but easy to give in the moment: complaining about your boss, describing internal politics, citing compensation directly, or saying you were laid off in a way that sounds defensive.

The right answer is forward-looking, specific to the role, and honest without being damaging.

## The framework

Your answer needs to do three things simultaneously. First, give a real reason that is positive or neutral (not a complaint). Second, connect that reason to something specific about this role or company. Third, be brief. 60 to 90 seconds maximum.

**Structure:**
1. What you are moving toward (not running from)
2. Why this specific role fits that direction
3. One sentence acknowledging what you valued about your current or previous role

## Answer templates by situation

**You want more growth:**
"I have learned a lot in my current role, particularly around [specific area]. I am at a point where I want to take on [specific type of challenge] and work at a larger scale. This role caught my attention because [specific thing about the role or company]. I am excited about the opportunity to grow in that direction."

**You were laid off:**
"My company went through a round of layoffs that affected my team. It was disappointing, but it gave me the chance to be intentional about my next move rather than just reactive. I have been looking specifically for roles where I can [specific goal], and this one stood out because [specific reason]."

**Your company or role changed:**
"The company shifted direction significantly over the past year, and the work I was doing changed with it. I spent the last 18 months on [thing], but what energises me is [other thing]. This role is much better aligned with that."

**You want more money (but cannot say that):**
Do not say money. What you can say is: "I am looking for a role where my scope of impact matches my level of experience. I am ready for more responsibility and the kind of work that [describes what you want to do], and I think this is that opportunity."

## What not to say

Do not say anything negative about your current employer, manager, or colleagues. Even if it is true. Even if they deserve it. Recruiters worry that you will say the same things about them someday.

Do not say you are "exploring options" or "seeing what is out there." It signals lack of direction.

Do not say the job posting seemed interesting. That is not a reason, it is a dodge.

## The follow-up question

After you answer, some interviewers ask "what specifically did not work in your current role?" This is not an invitation to complain. Stay with the forward-looking frame: "There is nothing wrong with it as a role, I just think I am ready for a different kind of challenge and this opportunity is more aligned with where I want to go."`,
  },
  {
    slug: "networking-for-introverts-get-referrals-2026",
    title: "How to Network and Get Referrals When You Hate Networking (2026 Guide)",
    description: "Most networking advice assumes you are an extrovert who enjoys small talk. This guide is for everyone else. Specific tactics that work without requiring you to be someone you are not.",
    category: "Career Strategy",
    readTime: "10 min read",
    publishedAt: "2026-05-25",
    updatedAt: "2026-05-25",
    content: `## The networking advice you have already heard does not work for most people

"Go to industry events." "Put yourself out there." "Build your personal brand." This advice is written for people who find social interaction energising. For everyone else, it produces anxiety and avoidance, which produces no results.

The good news is that the most effective networking tactics in 2026 are low-volume, highly targeted, and mostly asynchronous. You do not need to enjoy networking. You need to do about 10 specific things well.

## Why referrals matter more than ever

A referred candidate is 4x more likely to be hired than one who applies through a job board. At many large tech companies, 30-50% of hires come through employee referrals. Recruiters treat referred candidates differently: they are more likely to receive a response, more likely to pass the resume screen, and more likely to get scheduling priority.

Getting one referral from inside a target company is worth more than 50 cold applications through the careers page.

## The asynchronous outreach method

This works on LinkedIn or email. It does not require attending events, making phone calls, or pretending to enjoy small talk.

**Step 1:** Identify 3-5 target companies you genuinely want to work at.

**Step 2:** Find 2-3 people at each company who are in a role similar to the one you want, or who work on the team you are targeting. LinkedIn search by company plus job title.

**Step 3:** Send a short, specific message. Not "I am looking for a job, can you refer me?" That is a request from a stranger. Instead:

"Hi [name], I have been following [company]'s work on [specific thing]. I am a [your background] exploring opportunities in [area] and would love to hear about your experience on the [team]. Would you be open to a 15-minute call?"

You are asking for a conversation, not a referral. The referral often comes naturally once they have met you.

**Step 4:** If they agree to talk, prepare 5 specific questions. Ask about their experience, the team culture, what they look for in candidates, and whether they would be comfortable passing along your resume if they think you could be a fit. Most people will say yes to that last question if the conversation went well.

## The alumni network is underused

Your university alumni network is the highest-conversion outreach you will ever do. Alumni feel an obligation to help other alumni that they do not feel toward strangers. A message to a fellow alumnus at your target company gets a response rate of 40-60% compared to 5-10% for cold outreach.

Search LinkedIn for alumni at your target companies. Filter by graduation year if you want people closer to your stage. The opener is simple: "Hi [name], I noticed we are both [University] alumni. I am currently exploring opportunities in [area] and would love to connect briefly and hear about your experience at [company] if you have 15 minutes."

## What to do when someone says yes

Show up prepared. Know the company's recent news, the team's work, and have 5 specific questions. Do not ask them to review your resume unprompted. Do not make the conversation about your job search until they bring it up. Focus on learning from them.

End by asking: "Is there anyone else you would recommend I talk to?" and "If anything comes up that seems like a fit, would you be open to passing along my resume?" Both questions are low-pressure and both expand your reach.

## The follow-up

Send a thank-you within 24 hours. One paragraph. Reference something specific from the conversation. This is not a formality, it is the thing that makes people remember you when a role opens up.

## The number that actually matters

Five genuine conversations with people inside your target companies are worth more than 200 applications through career pages. Do the math on where to spend your time.`,
  },
  {
    slug: "how-to-handle-job-rejection-keep-going",
    title: "How to Handle Job Rejection Without Losing Momentum",
    description: "Rejection is inevitable in any serious job search. Here is how to process it quickly, extract what is useful, and keep your pipeline moving without burning out.",
    category: "Career Strategy",
    readTime: "7 min read",
    publishedAt: "2026-05-28",
    updatedAt: "2026-05-28",
    content: `## The math of rejection in 2026

The average job seeker in 2026 sends 50-200 applications and receives 3-10 interview invitations. That means a response rate of roughly 5-10%. If you make it to final rounds, you might win 1 in 3 or 1 in 5. This is not a reflection of your worth. It is the structure of a market where every job opening receives hundreds of applications.

Understanding the math does not make rejection feel better immediately, but it reframes it correctly. You are not uniquely failing. You are experiencing the expected output of the system.

## The 24-hour rule

Give yourself 24 hours to feel whatever you feel. Disappointed, frustrated, demoralized, whatever is true. Do not suppress it and do not performance-manage your emotions into fake positivity. It does not work and it costs energy.

After 24 hours, extract what is useful and move on. This is not a platitude. It is a practical process.

## Extracting what is useful

Ask yourself three questions about every rejection:

**Did I get any signal about why?** If the recruiter gave specific feedback, use it. If they said "we went with someone with more [X] experience," that tells you something about your positioning or your target roles. If they said nothing, you learned nothing and there is nothing to extract.

**Was this a targeting problem or an execution problem?** A targeting problem means you are applying for roles where the gap between your experience and their requirements is too large. An execution problem means the fit was there but you did not demonstrate it well enough in the interview. These require different fixes.

**Was this a role I genuinely wanted?** Rejection stings more for roles you were excited about. It barely registers for roles you applied to out of desperation or habit. If your pipeline is full of jobs you do not really want, fix the pipeline, not your emotional response to rejection.

## Keeping the pipeline moving

The single most effective protection against rejection-driven demoralization is a full pipeline. When you have 8 active processes in progress, a rejection from one of them is a setback. When you have 1 or 2, it feels like a disaster.

Treat your job search like a sales funnel. The top of the funnel is applications and outreach. The middle is phone screens and first rounds. The bottom is final rounds and offers. If the top of the funnel is not continuously being filled, everything downstream dries up.

After every rejection, the first action is not to grieve. It is to add 5 new applications to the top of the funnel the same day.

## What not to do

Do not personalise systemic outcomes. Most rejections say nothing about you specifically. You were one of 400 applicants. The hiring manager had a preferred internal candidate. The budget was cut after the job posted. The role was redefined mid-process. None of these are about you.

Do not stop applying while waiting to hear back. The time between interview rounds is the most common period when candidates stop adding to their pipeline. Then they get rejected and have nothing in progress. Keep the funnel moving at all times.

Do not ask for feedback unless it was a final-round rejection. Most recruiters will not provide meaningful feedback for earlier stages. Asking for it creates friction without producing useful information.

## The pattern that matters

A job search where you send 100 targeted applications, practice interviews consistently, tailor each application to the role, and maintain an active network will produce offers. The timeline is unpredictable. The outcome, if you keep going, is not.`,
  },
  {
    slug: "linkedin-profile-that-gets-recruiter-messages",
    title: "The LinkedIn Profile That Gets Recruiter Messages (2026 Checklist)",
    description: "Most LinkedIn profiles are passive documents that say you exist. This guide shows you exactly how to turn yours into an inbound machine that brings recruiters to you.",
    category: "Resume",
    readTime: "8 min read",
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-01",
    featured: true,
    content: `## Why your LinkedIn profile is not generating inbound

Recruiters on LinkedIn use Boolean search and LinkedIn Recruiter's keyword and filter system to find candidates. If your profile does not contain the right keywords in the right fields, you are invisible to that search regardless of how qualified you are.

The profiles that generate consistent recruiter outreach have four things in common: keyword-dense headlines, an open-to-work signal, a summary that reads like a value proposition rather than a biography, and experience bullets that mirror the language of job descriptions in their target field.

## The headline (most important field on your profile)

Most people write their job title as their headline. "Software Engineer at Acme Corp." This is the worst possible use of the most important SEO field on your profile.

Your headline appears in every search result, every connection request, and every message preview. It is the first and sometimes only thing a recruiter reads before deciding to click.

**Formula:** [Role you want] specialising in [skill 1], [skill 2], and [skill 3]. Open to opportunities.

**Example:** "Full-Stack Engineer specialising in React, Node.js, and AWS. 4 years of experience. Open to senior and staff-level roles."

This headline contains 6 keywords, signals your level, and explicitly states you are open. It will outperform "Software Engineer at Acme Corp" in recruiter search results.

## Open to Work: turn it on

The green Open to Work banner has a stigma among some candidates who worry it signals desperation. The data disagrees. Profiles with Open to Work active receive significantly more recruiter messages. Use the private setting if you do not want your current employer to see it, which shows the signal only to recruiters using LinkedIn Recruiter.

## The About section

Most About sections are either empty or read like a cover letter written by a committee. Recruiters skip them.

Write yours in first person. Keep it under 200 words. Cover three things: what you do and how long you have been doing it, what specifically you are good at with one concrete example, and what you are looking for next.

"I am a product manager with 5 years of experience in B2B SaaS. I specialise in 0-to-1 product development and have shipped 3 products that collectively reached $8M ARR. I am currently exploring senior PM and group PM roles at companies building in [space]. If that sounds like your team, I would like to talk."

This About section will perform better than 90% of profiles because it is specific, has a number, and ends with a clear call to action.

## Experience bullets: the keyword opportunity

Your experience section is your second most important SEO field after your headline. Every bullet is a keyword opportunity.

Weak: "Led development of new features for the platform."
Strong: "Architected and shipped 4 new API endpoints using Node.js and PostgreSQL, reducing average response time by 40% and supporting 3x user growth."

The strong version contains 5 keywords (Node.js, PostgreSQL, API, response time, user growth) and a quantified result. It will surface in recruiter searches for multiple different queries.

## Skills section

Add every relevant skill you can legitimately claim. LinkedIn's algorithm weights the Skills section heavily in search ranking. Aim for 30-50 skills. Prioritise the tools and technologies in job descriptions for roles you are targeting.

## The activity signal

Recruiters look at whether a profile is active. A post or comment from 3 years ago signals that you may not be reachable. You do not need to create content. Commenting on posts in your field, sharing an article once a month, or liking posts from people in your industry is enough to signal that you are active on the platform.

## The profile photo

Profiles with photos receive 21 times more profile views than those without. It does not need to be professional headshot quality. It needs to be clear, show your face, and not be a group photo or something obviously casual. A photo taken on a phone in front of a plain background is better than no photo.

## The checklist

Profile photo: present and professional. Headline: role title plus 3 skills plus open to opportunities. About section: under 200 words, specific, one number, call to action. Experience bullets: each one contains keywords and a quantified result. Skills: 30 or more relevant skills listed. Open to Work: enabled with your preferences specified. Activity: at least one post or comment in the past 30 days.`,
  },
  {
    slug: "how-to-follow-up-after-interview-without-being-annoying",
    title: "How to Follow Up After an Interview Without Being Annoying",
    description: "Most candidates either never follow up or follow up too aggressively. Here is the exact cadence and wording that keeps you top of mind without irritating the hiring team.",
    category: "Behavioral",
    readTime: "5 min read",
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    content: `## Why follow-up matters more than candidates think

Studies consistently show that a thoughtful post-interview follow-up improves hiring outcomes. A well-written thank-you note within 24 hours signals professionalism, reinforces your interest, and gives you one more chance to address something you wish you had said better. Most candidates skip it. That is your advantage.

The line between helpful follow-up and annoying follow-up is mostly about timing and content. Here is the exact cadence.

## The thank-you email (send within 24 hours)

Send a separate thank-you to each person you interviewed with. Not a group email. Personalise each one with something specific from your conversation.

**Subject:** Thank you, [first name]

**Body:**

"[First name], thank you for taking the time to speak with me today about the [role] position.

I particularly enjoyed our conversation about [specific topic from the interview]. It reinforced my excitement about [specific aspect of the role or team].

One thing I wanted to add that I did not get a chance to mention: [brief point that strengthens your candidacy or addresses a gap].

I remain very interested in the role and look forward to the next steps. Please do not hesitate to reach out if you need anything else from me.

[Your name]"

Keep it under 200 words. The specific reference is the thing that makes it memorable. Generic thank-you emails get skimmed and forgotten.

## When to follow up if you have not heard back

Ask about timeline at the end of every interview: "What are the next steps and what is your expected timeline?" This gives you a benchmark.

If the stated timeline passes without a response, one follow-up is appropriate.

**Email template:**

"Hi [name], I wanted to follow up as I had understood you were hoping to make a decision around [date]. I remain very interested in the role and would love to know if there are any updates or if there is anything further I can provide. Happy to work around whatever timeline works for you."

Send this once. If you receive no response after another week, send one final note: "Hi [name], I just wanted to make sure my previous note did not get lost. I remain interested in the [role]. If the position has been filled or the process has changed, please feel free to let me know. Thank you for your time throughout this process."

After that, move on. Sending more than three follow-ups is counterproductive.

## The one situation where aggressive follow-up is appropriate

If you have a competing offer with a deadline, you have standing to escalate. Be direct: "I wanted to be transparent that I have received another offer with a decision deadline of [date]. [Company] remains my first choice and I would love to make a decision with full information. Is there any update on the timeline your team is working toward?"

This is not annoying. It is professional and gives the hiring team useful information. Most will either accelerate their process or let you know honestly that they cannot match your timeline.

## What not to do

Do not call the recruiter unless they specifically invited it. Phone calls without an invitation are perceived as aggressive.

Do not copy in the hiring manager and the recruiter on the same follow-up email. Pick one contact, usually the recruiter who coordinated your process.

Do not use the follow-up to add new information unless it is genuinely relevant, a new project, a certification you just received, or a relevant piece of news about their company.

Do not apologise for following up. "Sorry to bother you" positions you as an inconvenience. You are a candidate they are evaluating. A professional follow-up is expected, not an intrusion.`,
  },
  {
    slug: "what-to-do-first-30-days-new-job",
    title: "What to Do in Your First 30 Days at a New Job to Make a Strong Impression",
    description: "The first month sets the tone for everything that follows. Here is the exact playbook for building credibility, learning fast, and avoiding the mistakes that make new hires forgettable.",
    category: "Career Strategy",
    readTime: "8 min read",
    publishedAt: "2026-06-05",
    updatedAt: "2026-06-05",
    content: `## Why the first 30 days matter disproportionately

Research on workplace dynamics consistently shows that first impressions made in a new role are sticky and hard to revise. The way your colleagues and manager experience you in the first month shapes how they interpret your behaviour for the next year. A strong start creates an assumption of competence that survives future mistakes. A weak start creates an assumption of underperformance that requires significant effort to overcome.

This is not about performing. It is about being intentional during the period when everything you do carries extra weight.

## Week 1: Listen more than you talk

Your primary job in week 1 is to understand how things actually work, not how they are supposed to work on paper. Ask a lot of questions. Take notes. Do not propose changes, offer opinions on strategy, or explain how things were done at your previous company.

The people who come in fast and loud in week 1 are rarely the people who are most effective by month 3. The people who spend week 1 listening carefully, building relationships, and understanding context almost always have stronger trajectories.

Specific things to do in week 1: have a 1:1 with your manager and ask what success looks like in your first 90 days. Meet every person on your immediate team informally. Ask each of them: "What do you wish someone had told you when you started?" and "What are the things that matter most to this team that might not be obvious from the outside?"

## Week 2: Start delivering small wins

By week 2, you should understand enough about your role to identify low-complexity tasks you can complete well and visibly. Do not wait to be asked. Take initiative on something small, execute it well, and make sure the output is shared with the right people.

Small wins in the first two weeks signal that you are a doer, not just a learner. They also give your manager something concrete to point to when describing your onboarding to their own manager.

## Week 3: Map the informal power structure

Every organisation has an informal structure that matters as much as the org chart. Understand who the respected senior contributors are (not necessarily the most senior by title). Understand which teams your work depends on and who your key cross-functional relationships need to be. Understand what your manager actually values and what they are rewarded for.

The fastest way to do this is through casual conversations, not formal meetings. Coffee chats, walks to the kitchen, messages asking for advice. People reveal the informal structure naturally when they are not in a formal context.

## Week 4: Have a direct conversation with your manager

By the end of week 4, have an explicit conversation with your manager about how things are going. Do not wait for them to initiate it. Ask: "How do you think my first month has gone? Is there anything you think I should be doing differently?" and "What would make the next 60 days most valuable for the team?"

This conversation serves two purposes. It gives you feedback that you can act on before impressions harden. And it signals to your manager that you are reflective, open to feedback, and thinking about your performance proactively. Both are genuinely good signals.

## The things that derail new hires in the first 30 days

Talking too much in meetings before they have earned credibility. Being visibly unimpressed by how things are done. Spending too much time on solo work and not enough time building relationships. Missing deadlines, even small ones, because they underestimated the complexity of a new environment. Making commitments they cannot keep because they want to seem capable.

The first 30 days are not about impressing people with brilliance. They are about demonstrating reliability, curiosity, and professionalism consistently. Brilliance can come later. Reliability matters from day one.`,
  },
  {
    slug: "how-to-get-a-job-in-todays-market-2026",
    title: "How to Get a Job in Today's Market (2026): The Complete Playbook",
    description: "The job market in 2026 is more competitive and more navigable than ever. Here is exactly what works right now, from cutting through ATS filters to landing offers faster using AI tools built for job seekers.",
    category: "Career Strategy",
    readTime: "14 min read",
    publishedAt: "2026-06-06",
    updatedAt: "2026-06-06",
    featured: true,
    content: `## The honest state of the job market in 2026

The job market in 2026 is not broken. It is just different from what most advice assumes.

Applications are up. A single software engineering role at a recognisable company now receives 400 to 1,000 applications within 48 hours of posting. AI tools have made applying faster and cheaper, which means volume has exploded while hiring headcount has stayed flat or declined. The result is that the old playbook, upload your resume to 50 job boards and wait, produces almost no results.

At the same time, referrals still close at 4x the rate of cold applications. ATS scores above 75 still get human eyes on resumes. Interview preparation still separates candidates who look equivalent on paper. And companies are still hiring aggressively for roles that match their current priorities.

The candidates landing offers in 2026 are not luckier than those who are not. They are more systematic. This guide gives you their playbook.

## Why most job searches fail in 2026

Before getting to what works, it is worth understanding exactly why most job searches stall.

**The ATS wall.** Most resumes never reach a human. ATS systems filter by keyword match, formatting compatibility, and section structure before a recruiter ever opens the document. A resume with a 55% keyword match against the job description is rejected automatically, even if the candidate is genuinely qualified. Most candidates do not know their match score. Most do not tailor their resume for each application. Both are fixable problems.

**Interview unreadiness.** Getting an interview and passing an interview are completely different skills. Most candidates treat interviews as conversations where they will improvise. Hiring managers treat interviews as evidence-gathering exercises where they are looking for specific signals. The gap between those two framings explains most rejections.

**Shallow pipeline.** A job search with 3 active processes in progress is not a pipeline, it is a lottery ticket. When one falls through, the search effectively restarts. Building and maintaining a pipeline of 8 to 15 active processes requires discipline and tracking infrastructure most candidates do not have.

**No referral strategy.** Most candidates apply exclusively through job boards. The highest-conversion channel, referrals, requires active work: identifying the right people, sending targeted outreach, and building relationships before you need them. Most candidates skip this entirely.

## Step 1: Fix your resume before you send it anywhere

Your resume's job is to pass two filters: the ATS algorithm and the 6-second recruiter scan. Most resumes fail both.

**The ATS filter.** Modern ATS platforms score your resume against the job description using keyword matching, semantic analysis, and formatting checks. The score determines whether your application reaches a recruiter or disappears. A score below 70% typically means automatic rejection.

The most common reasons resumes score poorly:
- Keywords from the job description are missing or phrased differently
- Multi-column layouts break the parser
- Contact information in headers or footers is unreadable
- Non-standard section headers like "My Experience" instead of "Work Experience"
- Skills mentioned only in context, never in a dedicated Skills section

The fix is specific and learnable. Tailor your resume's language to mirror the exact phrases in each job description. Add a Skills section near the top listing every relevant tool and technology. Use a single-column format with standard headers. Move contact information into the main body.

Then check your score before submitting. This step alone separates candidates who get callbacks from those who do not.

**The 6-second scan.** Once a recruiter opens your resume, they spend an average of 6 to 7 seconds before deciding whether to keep reading. In that window they look for: a recognisable role or company, a number that catches their eye, and a clean structure that makes the resume easy to skim.

The practical implication: your most compelling information should sit in the top third of the page. Lead with your strongest job title, your most impactful metric, or your most relevant skills. Everything below the fold is secondary.

## Step 2: Build a pipeline, not a wishlist

A pipeline is an active system with applications at multiple stages simultaneously. A wishlist is a list of companies you vaguely want to work at.

Most candidates have a wishlist. It produces sporadic action and a lot of waiting. A pipeline produces consistent progress and options when individual processes fall through.

Build your pipeline by targeting companies in three tiers.

**Tier 1:** 5 to 8 companies you genuinely want to work at. These get your highest-effort applications: fully tailored resumes, personalised cover letters, and active networking inside the company.

**Tier 2:** 10 to 15 companies that are strong fits. These get tailored resumes and targeted applications but less networking effort.

**Tier 3:** 20 to 30 companies where the role is a reasonable match. These get efficient applications using your best template, customised in 20 minutes per application.

The discipline is to keep all three tiers moving simultaneously and to replenish the top of the funnel every week regardless of how many processes are active. A job search where you stop applying while waiting to hear back always results in a dry pipeline when rejections arrive.

## Step 3: Make referrals your primary channel

Referred candidates are hired at 4 times the rate of cold applicants. At large tech companies, 30 to 50 percent of hires come through employee referrals. This is the highest-ROI activity in your job search and the one most candidates skip.

Getting referrals is not about asking strangers for favours. It is about having genuine conversations with people who can vouch for you.

The process: identify 2 to 3 people at each of your Tier 1 target companies who are in a role similar to the one you want. Send a short, specific message asking for a 15-minute conversation, not a referral. Frame it around wanting to learn from their experience. Most people say yes to that.

In the conversation, ask about their experience, the team, and what they look for in candidates. Near the end, ask if they would be comfortable passing along your resume if they think you could be a fit. Most people who had a good conversation will say yes.

A university alumni network dramatically increases response rates. Shared alma mater creates an obligation to help that strangers do not feel. Filter LinkedIn for alumni at your target companies before doing any other outreach.

## Step 4: Prepare for interviews like they are predictable

Interviews are predictable. Companies ask the same types of questions repeatedly. The patterns for coding interviews, case interviews, and behavioural interviews are documented and learnable. Candidates who treat interviews as unpredictable conversations they will improvise through almost always lose to candidates who prepared systematically.

**For coding interviews:** focus on patterns, not problems. Two pointers, sliding window, BFS and DFS on graphs, dynamic programming, binary search. Solving 100 LeetCode problems randomly produces less improvement than solving 50 curated problems across these 5 patterns. Practice out loud. Silence during a coding interview is a red flag regardless of whether you are solving correctly.

**For behavioural interviews:** prepare 6 to 8 STAR stories before any interview. Cover: a project you led, a time you disagreed with a decision, a failure and what you changed, a time you influenced without authority, and your most impactful result. Quantify every story. Knowing your numbers signals preparedness and professionalism.

**For any interview:** research the company for 20 minutes before going in. Know their recent news, their business model, and 2 to 3 things you would ask an interviewer. Candidates who ask specific, informed questions are consistently rated more favourably than those who ask generic questions or nothing at all.

**The most underrated preparation tactic:** mock interviews before real ones. The gap between answering interview questions in your head and answering them out loud under time pressure is enormous. Candidates who run mock interviews consistently outperform those who only read sample answers. Do at least 3 full mock interviews before any real interview, voice-on, timed, with feedback.

## Step 5: Track everything and follow up

A job search without tracking infrastructure produces duplicate applications, missed follow-ups, and no ability to identify what is working. You need to know: where you applied, when, what stage you are at, and what your next action is.

Follow up on every application that reaches a human. A brief, professional email 5 to 7 days after a phone screen signals professionalism and genuine interest. Most candidates do not do this. The ones who do stay top of mind when hiring teams are comparing finalists.

When you receive an offer, negotiate. Most first offers have room. Research market rates before you receive any offer so you know your target and your walk-away. The first counteroffer is almost always met with some flexibility. Starting salary anchors every future raise and offer for years.

## How Preciprocal helps at every stage

The playbook above works. The challenge for most job seekers is that executing every part of it simultaneously is genuinely hard. Tailoring resumes, running mock interviews, tracking applications, researching companies, and building a referral network all compete for limited time and energy.

Preciprocal is built to handle the mechanical work so you can focus on the human parts.

**Resume analysis and tailoring.** Upload your resume and paste a job description. Preciprocal gives you your ATS score, shows you exactly which keywords are missing, and rewrites specific bullets to close the gap. The Recruiter Eye Simulation shows you how an HR screener, technical lead, and hiring manager scan your document, with an attention heatmap showing what gets missed. The Candidate Benchmarking tool shows you how your resume compares to others applying for the same type of role.

**Mock interviews.** Voice-based mock interviews with a multi-agent AI panel: an HR screener, a technical lead, and a hiring manager. You speak, they respond with real follow-up questions, and you get a detailed debrief with scoring across five dimensions. You can target specific companies and roles, adjust difficulty, and run as many sessions as you need. Candidates who use mock interview tools consistently perform better in real interviews because the format stops being unfamiliar.

**Cover letters.** The cover letter generator researches your target company in real time, analyses the job description, and writes a personalised letter that connects your specific experience to their needs. The output sounds like you, not like a template. Every change is shown in an original-to-rewrite format so you control what goes in.

**Study planning.** Enter your target role, interview date, current skill level, and daily time availability. The AI generates a day-by-day prep schedule with tasks, curated resources, and daily quizzes. An AI coach is available throughout to answer questions about anything in the plan.

**Application tracking.** The Job Tracker keeps every application organised with status, next actions, and timeline visibility. The Contact Finder identifies hiring managers and team leads at your target companies with verified contact information. The Cold Outreach Generator writes personalised first-contact emails based on the person's role and your background.

**Chrome extension.** Save jobs from LinkedIn and any job board with one click, automatically import job descriptions for tailoring, and track applications without leaving the page.

The whole platform costs $9.99 a month on Pro. Every tool described above is included. The free tier covers 3 mock interviews, 5 resume analyses, and 5 cover letters per month with no credit card required.

## The mindset that makes the difference

The job market in 2026 rewards systematicness, not desperation. Candidates who spray 200 applications without tailoring, skip interview prep, and never follow up get worse results than candidates who send 30 targeted applications with full preparation at each stage.

You will get rejected more times than you get offers. This is not a signal that you are not good enough. It is the expected output of a competitive market where every opening receives hundreds of applications. The candidates who get offers are the most prepared and the most persistent, not the most talented.

Start with your resume. Check your ATS score against the jobs you are targeting. Run a mock interview before your next real one. Build a pipeline and keep adding to it every week. The offer comes to the candidates who keep going.

Start free at app.preciprocal.com. No credit card required.`,
  },
  {
    slug: "ead-card-f1-visa-opt-complete-guide-2026",
    title: "EAD Card for F1 Students: The Complete OPT Guide (2026)",
    description: "Everything F1 students need to know about getting their EAD card through OPT and STEM OPT in 2026: exact steps, timelines, costs, and what happens if USCIS is slow.",
    category: "Visa & Immigration",
    readTime: "13 min read",
    publishedAt: "2026-06-06",
    updatedAt: "2026-06-06",
    featured: true,
    content: `## What is an EAD card and why does it matter for F1 students

An Employment Authorization Document (EAD) is the physical card that proves you are legally allowed to work in the United States. For F1 students, the EAD is issued by USCIS as part of the Optional Practical Training (OPT) process. Without it in hand, you cannot legally start working, even if your employer is ready for you and your OPT has been approved.

The EAD card shows your name, photo, the start and end dates of your work authorization, and the category of authorization (C3A for standard OPT, C3C for STEM OPT extension). You need to show this card to your employer when completing Form I-9 on or before your first day of work.

## OPT: the 12-month work authorization every F1 student gets

Optional Practical Training (OPT) gives F1 students up to 12 months of work authorization in a field directly related to their major area of study. You can use OPT before graduation (pre-completion OPT) or after graduation (post-completion OPT). Most students use it after graduation.

The 12 months is a lifetime limit per degree level. If you used 3 months of pre-completion OPT, you have 9 months of post-completion OPT remaining.

## STEM OPT: the 24-month extension for STEM graduates

If your degree is in a STEM field (Science, Technology, Engineering, or Mathematics) with a qualifying CIP code on the DHS STEM Designated Degree Program List, you can apply for a 24-month STEM OPT extension after your initial 12 months of OPT. This gives you up to 36 months total of post-graduation work authorization.

STEM OPT has stricter requirements than standard OPT. Your employer must be enrolled in E-Verify, your role must be directly related to your STEM degree, you must complete a formal training plan (Form I-983) with your employer, and you must report to your DSO every 6 months throughout the extension period.

## The full step-by-step process to get your EAD card

### Step 1: Apply to your DSO for an OPT recommendation (4 to 6 weeks before you want to start)

Your university's Designated School Official (DSO) at the international students office must first recommend you for OPT in SEVIS and issue you a new I-20 with the OPT recommendation before you can apply to USCIS. You cannot skip this step or do it simultaneously with the USCIS application.

You can apply to your DSO no earlier than 90 days before your program completion date. Submit your request through your university's international student portal (ISS Connect, iServices, MyISSS, or equivalent). Most universities take 5 to 10 business days to process the request and issue your OPT recommendation I-20.

Choose your OPT start date carefully at this stage. Once submitted, you cannot change it. The start date must be within 60 days of your program completion date. It can be as early as the day after completion or as late as 60 days after.

### Step 2: Receive your OPT recommendation I-20

Once your DSO approves your request, they will update your SEVIS record and issue a new I-20 that shows the OPT recommendation and your requested start and end dates. This I-20 will have a new Date Issued printed on it. Note this date carefully: you must file with USCIS within 30 days of this Date Issued.

### Step 3: File Form I-765 with USCIS (within 30 days of the Date Issued on your I-20)

Form I-765 is the Application for Employment Authorization. This is the form that results in your EAD card. You file it directly with USCIS, either online at my.uscis.gov or by mail to the designated USCIS lockbox.

**Required documents for your I-765 package:**

- Completed and signed Form I-765
- Filing fee: $470 (online) or $520 (paper) as of 2026
- Copy of your current OPT recommendation I-20 (all pages)
- Copy of your most recent prior I-20 showing your program of study (all pages)
- Copy of your passport biographical page (valid for at least 6 months beyond your OPT start date)
- Copy of your F1 visa stamp
- Copy of your most recent I-94 (download from the CBP website, not the paper card)
- Two passport-style photos if filing by mail (not required for online filing)
- Copies of all previous EAD cards if you have had prior OPT

**Filing deadline:** USCIS must receive your application no earlier than 90 days before your program completion date and no later than 30 days after the Date Issued on your OPT I-20. Missing either deadline means starting over.

### Step 4: Receive your receipt notice (I-797C)

Within 2 to 4 weeks of USCIS receiving your application, they will mail you a Receipt Notice (Form I-797C). This confirms your application was received and gives you your receipt number (format: EAC, WAC, LIN, or SRC followed by numbers). Save this. You use the receipt number to track your case on the USCIS website.

Filing online gives you immediate digital confirmation and access to your case in your USCIS online account.

### Step 5: USCIS processes your application (90 to 150 days)

This is the waiting period. USCIS currently takes 3 to 5 months to process standard OPT EAD applications. Premium processing is available for $1,780 and reduces the timeline to 30 business days. Many students pay for premium processing to ensure their EAD arrives before their intended start date.

During this period:
- Track your case at egov.uscis.gov using your receipt number
- If your address changes, update it with USCIS immediately using their online change of address tool. USPS cannot forward official government mail including your EAD card.
- If USCIS sends a Request for Evidence (RFE), respond immediately with the requested documents. An RFE can add significant time to your processing.

### Step 6: Receive your approval notice and EAD card

USCIS will mail an approval notice (I-797) and your physical EAD card separately. They often arrive days apart. The card shows your authorized start and end dates, your photo, and your authorization category. Inspect it immediately for errors in your name, date of birth, or dates. If there is an error not your fault, contact USCIS for a free replacement.

**You cannot begin work until:**
1. You have the physical EAD card in hand
2. The start date printed on the card has arrived

Working before either condition is met is a serious immigration violation.

## STEM OPT: additional steps on top of standard OPT

If you qualify for the 24-month STEM extension, here is what the process adds:

**Apply 90 days before your OPT expires.** If you wait until the last minute, you risk a gap in work authorization. USCIS will automatically extend your work authorization by 180 days while your STEM OPT application is pending, but only if you file on time before your OPT expires.

**Complete Form I-983 with your employer.** This Training Plan for STEM OPT Students is a multi-section form that you and your employer fill out together. It describes your job duties, how the role relates to your STEM degree, your compensation, and the learning objectives for the training period. Your employer must sign it. Both you and your employer are subject to the terms of this plan for the full 24 months.

**Your employer must be E-Verify enrolled.** This is a hard requirement. If your employer is not in E-Verify, you are not eligible for STEM OPT with them regardless of how well your role fits your degree.

**Report to your DSO every 6 months.** Throughout your STEM OPT period, you must submit a validation report to your DSO every 6 months confirming your employment details have not materially changed. At 12 months and 24 months, you and your employer must complete formal evaluations on Form I-983.

## Timeline summary

| Stage | Timeframe |
|---|---|
| Apply to DSO for OPT recommendation | 90 days before program completion |
| DSO issues OPT I-20 | 5 to 10 business days after DSO request |
| File I-765 with USCIS | Within 30 days of OPT I-20 Date Issued |
| USCIS receipt notice | 2 to 4 weeks after filing |
| Standard USCIS processing | 90 to 150 days |
| Premium processing | 30 business days ($1,780 additional fee) |
| Total time from DSO application to EAD | 4 to 6 months without premium processing |

## Critical rules that catch students off guard

**The 90-day unemployment rule.** During your OPT period, you cannot accumulate more than 90 days of unemployment. During STEM OPT, that limit is 150 days cumulative across both periods. Weekends count. Days between jobs count. Exceeding this limit is a violation of your F1 status.

**Employment must start within 90 days of your EAD start date.** If USCIS approves your OPT after your requested start date, they may adjust the start date forward, but the end date will not be extended beyond 14 months from your I-20 completion date.

**Your SEVIS record must remain active.** If your SEVIS record is terminated for any reason during OPT, your EAD is automatically invalidated. Keep your DSO informed of any changes to your employment or address.

**Report new employment within 10 days.** Whenever you start a new job during OPT, you must report it to your DSO within 10 days through your university's portal.

## How to check your EAD processing status

Go to egov.uscis.gov and enter your receipt number. The case status will show one of the following:

- Case Received: USCIS has your application
- Case Is Being Actively Reviewed: normal processing
- Request for Evidence: action required from you
- Card Was Mailed To Me: EAD is on the way (usually arrives within 10 business days)
- Case Was Approved: approval notice issued

If your application has been pending longer than the published processing time for your service center, you can submit a service request (e-Request) through your USCIS online account or contact the USCIS Contact Center.

## What Preciprocal can help with

While USCIS processes your EAD, use the time to get job-ready. Most international students on OPT have a 4 to 6 month window between applying to USCIS and starting work. That window is the best time to prepare systematically.

Preciprocal's mock interview tool runs voice-based interviews tailored to your target role and industry. The resume analysis shows your ATS score and tells you exactly which keywords to add for each job you apply to. The cover letter generator writes personalised letters that address your work authorization status naturally and professionally. The job tracker helps you manage applications across companies that sponsor international candidates, so nothing falls through the gap while you are waiting on USCIS.

Start free at app.preciprocal.com. No credit card required.`,
  },
  {
    slug: "how-to-stop-the-clock-f1-students-opt-2026",
    title: "How to Stop the Clock on OPT as an F1 Student (Cap-Gap and STEM Strategies, 2026)",
    description: "Your OPT clock is ticking from day one. Here is exactly how F1 students can extend their work authorization, trigger the cap-gap bridge to H-1B, and maximise every day of their US work window in 2026.",
    category: "Visa & Immigration",
    readTime: "11 min read",
    publishedAt: "2026-06-06",
    updatedAt: "2026-06-06",
    featured: true,
    content: `## The clock problem every F1 student faces

The moment your OPT EAD card activates, a countdown begins. Standard OPT gives you 12 months. STEM OPT extends that to 36 months. H-1B status starts October 1 each year. These three timelines do not always line up cleanly, and the gaps between them have ended thousands of international careers in the US.

Stopping the clock, or more precisely, strategically extending and bridging your work authorization, requires understanding exactly which rules govern each phase and acting before deadlines arrive, not after.

This guide covers every legal mechanism F1 students can use to extend their US work window in 2026.

## Mechanism 1: Use your 12 months of OPT strategically

Your initial OPT is 12 months (technically 364 days, ending the day before the one-year anniversary of your start date). Every day your OPT is active but you are not employed counts toward the 90-day unemployment limit.

**The strategic implication:** do not activate your OPT until you are close to employment. If you choose an OPT start date 60 days after graduation but you are not employed until day 91, you have already violated your status. Choose a start date that is realistic given your job search timeline, not the earliest possible date.

You cannot pause or freeze OPT once it starts. The clock runs continuously. But you can delay when it starts by choosing a later start date when you submit your DSO request.

## Mechanism 2: STEM OPT extension (24 additional months)

If your degree is in a qualifying STEM field, you can apply for the 24-month STEM OPT extension and get up to 36 months total of post-graduation work authorization. This is the single most powerful tool for stopping the effective clock because it gives you up to two additional H-1B lottery chances.

**Key requirements to preserve your STEM OPT eligibility:**

Your employer must be E-Verify enrolled. Verify this before accepting a job offer if you are counting on STEM OPT. A company that is not in E-Verify cannot sponsor your STEM extension regardless of the role.

File your STEM OPT application at least 90 days before your standard OPT expires. If you file on time and your OPT expires while the STEM application is pending, USCIS will automatically extend your work authorization by 180 days. This automatic extension is what truly stops the clock: you keep working uninterrupted while USCIS processes your new EAD.

If you miss the filing deadline and your OPT expires before your STEM application is received by USCIS, you lose the 180-day automatic extension and your work authorization lapses. This is one of the most catastrophic mistakes an international student can make.

**STEM OPT unemployment rules.** During your 24-month STEM extension, the unemployment limit increases to 150 days cumulative across both your initial OPT and STEM OPT combined. Plan your job transitions accordingly.

## Mechanism 3: The cap-gap bridge from OPT to H-1B

The cap-gap is a regulatory provision that automatically extends an F1 student's work authorization from the expiration of their OPT to September 30 of the H-1B fiscal year, bridging the gap until H-1B status begins on October 1.

As of the January 2025 DHS modernization rule, the cap-gap extension now runs through April 1 of the H-1B fiscal year (not just October 1), giving eligible students up to 6 additional months of status and work authorization compared to the old rules.

**How the cap-gap works in 2026:**

The H-1B lottery for FY 2027 registration opens in March 2026. If your employer registers you and you are selected, they file the full H-1B petition (Form I-129) between April and June 2026. If your OPT is active at the time of filing and the petition requests a change of status (not consular processing), your work authorization is automatically extended to September 30, 2026, the day before your H-1B becomes active on October 1.

Under the new April 1 rule, the cap-gap can extend as far as April 1 of the fiscal year for which the H-1B is requested, whichever comes first.

**The two types of cap-gap extension:**

If you are on active OPT or STEM OPT when your employer files the H-1B petition: your status is extended AND your work authorization is extended. You can keep working through September 30.

If you are in your 60-day grace period when your employer files: your status is extended but your work authorization is NOT extended. You cannot work during the grace period or cap-gap if you were already past your OPT end date when the petition was filed.

This distinction is critical. File for your STEM OPT extension on time so you are on active work authorization, not in a grace period, when H-1B petition season arrives.

**Cap-gap eligibility requirements:**

1. You must be in valid F1 status at the time your employer files the I-129 petition
2. The H-1B petition must request a change of status from F1 to H-1B within the US (not consular processing)
3. Your employer must file the petition on time during the H-1B filing window
4. You must be selected in the H-1B lottery

The cap-gap is automatic once the petition is filed. You do not apply for it separately. USCIS updates your SEVIS record and your DSO can issue you a cap-gap I-20 showing your extended authorized period.

## Mechanism 4: The H-1B lottery and multiple attempts

STEM OPT gives you 36 months of total work authorization after graduation. The H-1B lottery runs annually in March. This means a STEM OPT student who starts their OPT in May 2025 could potentially enter the lottery in March 2026, March 2027, and March 2028 before their authorization runs out.

**2026 H-1B lottery facts:**
- Registration fee: $215 per beneficiary
- Total annual cap: 85,000 (65,000 regular cap plus 20,000 advanced degree exemption)
- FY 2026 selection rate: approximately 35% of 343,981 eligible registrations were selected
- Master's degree holders have approximately 46% cumulative selection probability versus 26% for bachelor's holders

The beneficiary-centric selection process introduced in FY 2025 means each person is entered only once regardless of how many employers register on their behalf. This eliminated the advantage of having multiple employers register you.

The new H-1B fee of $100,000 per new petition introduced by September 2025 executive action has significantly reduced employer willingness to sponsor entry-level positions. Target employers with high H-1B filing histories and established immigration programs. Check h1bdata.info to verify any employer's H-1B filing track record before investing time in their interview process.

## Mechanism 5: Change of status versus consular processing

When your H-1B is approved, you have two options for transitioning: change of status within the US, or consular processing (leaving the US and getting an H-1B visa stamp at a US embassy abroad).

Change of status is almost always the better choice for F1 students because it is the only way to access the cap-gap extension. Consular processing requires you to leave the US after your OPT ends, get an H-1B visa stamp, and re-enter. During this period you have no US work authorization and your US employment is interrupted.

Choose change of status unless your attorney has a specific reason for recommending consular processing.

## The unemployment clock: rules that trip people up

**Standard OPT:** 90 days maximum unemployment
**STEM OPT:** 150 days maximum cumulative (across both OPT and STEM OPT combined, not 150 days for STEM alone)

What counts as unemployment: any day you are not employed in a qualifying position, including weekends, public holidays, and days between jobs. Vacations and sick days taken while actively employed do not count.

What does not help: remote work for a foreign company, volunteer work, or self-employment typically do not count as qualifying employment under OPT rules. You need paid employment with a US employer in a role related to your degree.

If you are approaching the unemployment limit, contact your DSO immediately. Options include applying to your DSO to end your OPT early (which preserves your F1 status) or returning to school to begin a new program (which resets your OPT eligibility at the new degree level).

## The practical job search strategy given these constraints

The companies most likely to hire you on OPT and sponsor your H-1B are large tech companies, financial institutions, consulting firms, and established mid-size companies with existing H-1B programs. Startups can hire you on OPT but many are not E-Verify enrolled (which blocks STEM OPT) and few have the financial runway to pay the $100,000 H-1B fee.

Start your job search targeting companies that have filed H-1B petitions in the past 3 years. Use h1bdata.info and myvisajobs.com to filter by company and role. Apply 6 to 9 months before your OPT start date to have an offer before your EAD arrives.

Frame your work authorization timeline clearly with employers: "I am authorized to work in the US for 3 years on OPT and STEM OPT. I would need H-1B sponsorship starting in my second or third year." This is factual, gives them a timeline, and removes the ambiguity that causes employers to quietly pass on international candidates.

## How Preciprocal helps international students on OPT

The OPT window is the most competitive job search of your life. You have a fixed number of months, a restricted employer pool, and a job market where your immigration status is a factor in every hiring decision.

Preciprocal's resume analysis shows you your ATS score against each specific job description and tells you exactly which keywords to add. Tailoring your resume for the roles most likely to sponsor, large tech, finance, and established companies, is more important than volume.

The mock interview tool runs voice-based practice sessions with a simulated panel that pushes back with follow-up questions and scores your answers across five dimensions. Candidates who practice consistently outperform those who improvise, and in a market where the margin between an offer and a rejection is small, that preparation matters more for international students than anyone else.

The job tracker keeps every application organised with status, next steps, and timeline notes. For OPT students managing a hard deadline, knowing exactly where every application stands is not optional. It is how you ensure you have an offer before the clock runs out.

Start free at app.preciprocal.com. No credit card required.`,
  },
  {
    slug: "h1b-visa-complete-guide-2026",
    title: "H-1B Visa in 2026: The Complete Guide to the Lottery, Fees, and What Actually Changed",
    description: "The H-1B process changed dramatically in 2026. New $100,000 fees, a wage-weighted lottery, and stricter enforcement mean the old playbook no longer works. Here is exactly what you need to know.",
    category: "Visa & Immigration",
    readTime: "14 min read",
    publishedAt: "2026-06-06",
    updatedAt: "2026-06-06",
    featured: true,
    content: `## What the H-1B visa is and who it is for

The H-1B is a nonimmigrant work visa that allows US employers to temporarily employ foreign nationals in specialty occupations. A specialty occupation requires the theoretical and practical application of highly specialised knowledge and at minimum a bachelor's degree (or equivalent) in a specific field directly related to the job.

In practice, H-1B holders work across software engineering, data science, finance, accounting, architecture, medicine, law, and dozens of other professional fields. It is the primary pathway for international graduates on OPT to remain in the US after their work authorization expires, and for international professionals to transfer to the US from abroad.

The H-1B is valid for 3 years initially, extendable to 6 years total. After 6 years, you must leave the US for at least 1 year unless you have an approved I-140 immigrant petition (green card application) that allows indefinite extensions in 1 or 3 year increments.

## The 2026 changes that matter most

The H-1B landscape changed more dramatically between 2025 and 2026 than in the previous decade combined. Three changes have the biggest impact on candidates and employers.

### Change 1: The $100,000 supplemental fee

A September 2025 executive proclamation introduced a $100,000 supplemental fee for new H-1B petitions filed on behalf of beneficiaries who are outside the United States or who require consular notification. This fee is in addition to standard government filing fees.

Critically, the $100,000 fee does NOT apply to:
- Beneficiaries already in the US in valid status seeking a change of status (this includes F-1 OPT holders)
- H-1B extensions for existing H-1B holders
- H-1B transfers between employers for existing H-1B holders
- H-1B amendments

The practical implication: if you are an F-1 student on OPT applying for H-1B through change of status, you are exempt from the $100,000 fee. If you are being hired from abroad (outside the US), your employer faces a $100,000 supplemental cost that dramatically changes the hiring calculus.

### Change 2: The wage-weighted lottery

Starting with the FY 2027 cap season (registration opened March 4, 2026), USCIS implemented a wage-weighted selection process. Under the old system, every registration had an equal random chance of selection. Under the new system, the number of lottery entries you receive depends on the wage level of the offered position:

- Level 4 wage (highest): 4 lottery entries
- Level 3 wage: 3 lottery entries
- Level 2 wage: 2 lottery entries
- Level 1 wage (entry level): 1 lottery entry

Wage levels are defined by the Occupational Employment and Wage Statistics (OEWS) survey for the specific occupation and geographic area. A Level 4 engineer in San Francisco has a dramatically higher chance of selection than a Level 1 engineer in a smaller market.

### Change 3: Reduced registrations, improved odds

USCIS announced that total registrations for FY 2027 fell to approximately 211,600, down significantly from prior years. The beneficiary-centric selection process (each person entered once regardless of how many employers register them) and the new wage-weighted system together have changed the competitive dynamics. The FY 2026 selection rate was approximately 35% from 343,981 registrations, selecting 120,141 beneficiaries.

## The H-1B annual cap

Each fiscal year USCIS issues a maximum of 85,000 new H-1B visas: 65,000 under the regular cap and 20,000 reserved for individuals with a master's degree or higher from a US institution. Fiscal year runs October 1 to September 30. H-1B status for cap-subject petitions begins October 1 each year.

Cap-exempt employers (universities, nonprofit research organisations, government research organisations) can file H-1B petitions year-round without the lottery. Working for a cap-exempt employer directly, or being placed at a cap-exempt employer by a staffing firm, bypasses the lottery entirely.

## The complete H-1B process step by step

### Step 1: Employer gets a Labor Condition Application (LCA) certified (1 to 7 business days)

Before filing any H-1B petition, the employer must file a Labor Condition Application (LCA) with the Department of Labor. The LCA certifies that the employer will pay the prevailing wage for the occupation and location, will not use the H-1B worker to replace a US worker, and has notified existing employees about the H-1B filing. LCA certification typically takes 1 to 7 business days through the Department of Labor's FLAG system.

### Step 2: Employer registers in the H-1B lottery (March each year, $215 per beneficiary)

During the annual registration window (typically 2 to 3 weeks in March), employers submit an electronic registration for each H-1B beneficiary they want to sponsor. For FY 2027, the window ran March 4 to March 19, 2026. The registration fee is $215 per beneficiary. Employers must now include the wage level, SOC code, area of intended employment, and whether the beneficiary has a US master's degree.

### Step 3: USCIS conducts the lottery (late March to early April)

Within a few weeks of the registration window closing, USCIS conducts the weighted lottery and notifies selected registrants. If selected, the employer has approximately 90 days to file a complete H-1B petition.

### Step 4: File the full H-1B petition, Form I-129 (April to June)

For selected registrations, the employer files Form I-129, Petition for a Nonimmigrant Worker, along with supporting documentation. Key documents include the certified LCA, evidence of the specialty occupation (job description, degree requirements), evidence of the beneficiary's qualifications (degree transcripts, credentials evaluation if needed), and evidence of the employer-employee relationship.

Standard government filing fees (subject to change, verify at uscis.gov):
- I-129 base fee: $730
- ACWIA training fee: $750 to $1,500 depending on employer size
- Fraud prevention and detection fee: $500
- Asylum program fee: $600 (for most employers)
- Premium processing (optional): $2,965 for 15-business-day processing (effective March 1, 2026)

### Step 5: USCIS adjudicates the petition (3 to 6 months standard, 15 business days premium)

Standard processing takes 3 to 6 months. Premium processing costs $2,965 and guarantees a decision (approval, denial, or RFE) within 15 business days. For OPT holders whose EAD expires before October 1, the cap-gap extension provides automatic work authorization through September 30 once the petition is filed, reducing the urgency of premium processing in most cases.

Approximately 17% of petitions receive a Request for Evidence (RFE) requesting additional documentation. Respond to any RFE promptly with thorough supporting materials. RFE response time is typically 87 days but the sooner you respond, the better.

### Step 6: H-1B status begins October 1

If approved with a change of status, your H-1B status begins October 1 of the fiscal year. You continue working on your OPT authorization (extended by cap-gap if needed) until then.

## Who should target H-1B sponsorship

The $100,000 supplemental fee for overseas hires means employers are dramatically more selective about which international candidates to pursue. The employers most likely to sponsor in 2026 are those with established H-1B programs, high volumes of existing H-1B employees, and roles with Level 3 or Level 4 wages that benefit most from the new weighted lottery.

Target employers by checking h1bdata.info and myvisajobs.com for H-1B filing history. Any employer that has filed 20 or more H-1B petitions per year for the past 3 years has the infrastructure and willingness to sponsor. Avoid employers with no H-1B history unless they explicitly confirm they will sponsor.

Software engineering, data science, quantitative finance, and other high-wage technical roles in major metro areas typically command Level 3 or Level 4 wages, giving you significantly higher lottery odds under the new weighted system.

## After H-1B: the path to a green card

The H-1B is a dual-intent visa, meaning you can pursue permanent residence while on H-1B status without jeopardising your visa. Most H-1B holders pursue green cards through the employment-based (EB) categories:

EB-1B (Outstanding Professor or Researcher) and EB-1C (Multinational Manager) offer faster processing without PERM labor certification.

EB-2 and EB-3 require PERM labor certification, which can add 12 to 24 months to the process. For Indian and Chinese nationals, visa backlogs in these categories mean decades-long waits. EB-1 and the National Interest Waiver (NIW) under EB-2 are increasingly important alternatives.

## How Preciprocal helps H-1B candidates

Landing the employer willing to sponsor your H-1B in 2026 requires stronger interview performance, better-targeted applications, and more strategic networking than ever before. The $100,000 fee means employers are increasingly selective about which international candidates they invest in.

Preciprocal's mock interviews run voice-based practice sessions with a multi-agent panel tailored to your target role, whether software engineering, finance, or consulting. The resume analysis gives you your ATS score against each job description and shows exactly which keywords to add to get past the automated filter at companies with the highest H-1B filing rates. The job tracker helps you monitor applications at your target sponsor companies so nothing falls through while you wait on USCIS.

Start free at app.preciprocal.com. No credit card required.`,
  },
  {
    slug: "l1-visa-complete-guide-2026",
    title: "L-1 Visa in 2026: Intracompany Transfer Guide for Managers, Executives, and Specialists",
    description: "The L-1 visa lets multinationals transfer employees to the US without the H-1B lottery. Here is exactly how L-1A and L-1B work, what qualifies, processing times, and the fastest path to a green card.",
    category: "Visa & Immigration",
    readTime: "11 min read",
    publishedAt: "2026-06-06",
    updatedAt: "2026-06-06",
    featured: false,
    content: `## What the L-1 visa is and why it matters

The L-1 visa allows multinational companies to transfer employees from a foreign office to a US office in a qualifying role. It has no annual cap and no lottery, which makes it one of the most reliable pathways for international professionals at global companies to work in the United States.

There are two categories of L-1 visa: L-1A for managers and executives, and L-1B for workers with specialised knowledge. The distinction matters enormously for both processing and the long-term green card pathway.

## L-1A: Managers and executives

The L-1A is for employees who are being transferred to the US to work in a managerial or executive capacity. USCIS defines these terms specifically.

An executive directs the management of an organisation or major component, establishes goals and policies, and has wide latitude in decision-making with only general supervision from higher-level executives or a board.

A manager primarily manages an organisation, department, subdivision, function, or component; supervises and controls the work of other supervisory, professional, or managerial employees (or manages an essential function); has authority to hire and fire; and exercises discretion over day-to-day operations.

The L-1A is valid for 3 years initially for established offices or 1 year for new offices, extendable to a maximum of 7 years. It directly feeds the EB-1C green card category, which requires no PERM labor certification and offers significantly faster processing than EB-2 or EB-3.

## L-1B: Specialised knowledge workers

The L-1B is for employees with specialised knowledge of the company's products, services, research, equipment, techniques, management, or US market, and its application in international markets.

Specialised knowledge must be knowledge that is not commonly held in the industry and that was gained through significant experience with the company. It is a higher bar than it sounds. USCIS scrutinises L-1B petitions carefully, and generic descriptions of technical expertise are frequently rejected. The knowledge must be specific to the company, not just the field.

The L-1B is valid for 3 years initially (1 year for new offices), extendable to a maximum of 5 years. The green card pathway from L-1B typically goes through EB-2 or EB-3, which usually requires PERM labor certification.

## Eligibility requirements for both categories

To qualify for either L-1 category, you must meet all of the following:

**Employment abroad.** You must have been continuously employed by a qualifying organisation abroad for at least 1 continuous year within the 3 years immediately preceding the petition filing date. Part-time work counts if the year of experience was full-time equivalent at that employer. Gaps in employment reset the clock.

**Qualifying relationship between entities.** The foreign company and the US company must be related as a parent, branch, subsidiary, or affiliate. Your employer must document this relationship with corporate structure evidence: articles of incorporation, shareholder records, organisational charts showing the ownership chain.

**Qualifying role in the US.** The position in the United States must qualify as managerial, executive (L-1A) or specialised knowledge (L-1B).

## The L-1 application process

### For individual petitions (most common)

**Step 1: Employer files Form I-129 with L supplement**

The US employer files the petition with USCIS. No lottery. No registration window. Petitions can be filed at any time of year.

Processing time: 3 to 6 months standard. Premium processing ($2,965 effective March 2026) guarantees a response in 15 calendar days.

**Step 2: If outside the US, apply for L-1 visa stamp at US consulate**

After USCIS approves the petition, beneficiaries outside the US apply for an L-1 visa stamp at a US embassy or consulate in their country. Processing time varies significantly by country and consulate workload, from days to months.

**Step 3: Enter the US and begin work**

Once you have either the L-1 visa stamp (if coming from abroad) or an approved change of status (if already in the US), you can begin work on the approved start date.

### For blanket petitions (large multinationals)

Companies that transfer large numbers of employees to the US can obtain an L-1 blanket approval. Once the blanket is approved, qualifying employees can bypass individual I-129 petitions and apply directly at a US consulate with much faster processing. Blanket petitions are available to companies that have been operating in the US for at least 1 year, have at least 3 domestic and foreign offices, and have either filed at least 10 individual L petitions in the past 12 months or have US sales over $25 million.

## L-1 processing times in 2026

Standard individual petition processing: 3 to 6 months depending on the USCIS service center and current caseload.

Premium processing: 15 calendar day response guaranteed for $2,965.

New office petitions require additional documentation (business plan, lease, proof of funding) and are sometimes more closely scrutinised. USCIS may schedule site visits through the Fraud Detection and National Security directorate.

## What makes L-1 petitions get denied or receive RFEs

The most common reasons for L-1 denial or Request for Evidence:

**L-1A:** Insufficient evidence that the US role is genuinely managerial or executive rather than hands-on work. Job descriptions that mention operational tasks alongside management duties undermine the petition.

**L-1B:** Insufficient demonstration that the knowledge is truly specialised to the company rather than industry-wide knowledge. Generic technical descriptions are almost always challenged.

**Both:** Inadequate documentation of the qualifying relationship between foreign and US entities. Corporate structures with multiple holding companies require complete documentation of every link in the chain.

**Both:** Employment abroad that does not clearly add up to 1 continuous year within the past 3 years. Document employment with pay stubs, tax records, and employer letters with specific dates.

## The L-1A to green card pathway

The L-1A feeds directly into the EB-1C immigrant visa category for multinational managers and executives. The EB-1C path is one of the fastest employment-based green card routes available because it does not require PERM labor certification.

For most countries, the EB-1C green card timeline is 12 to 24 months total from I-140 filing to green card approval. For Indian and Chinese nationals, EB-1C dates are current (no backlog) as of 2026, making it even more attractive. This compares to multi-decade backlogs for Indian nationals in EB-2 and EB-3.

Timeline for L-1A to EB-1C:
1. File I-140 immigrant petition (standard 18 to 20 months, premium processing 15 business days)
2. If visa dates are current, file I-485 adjustment of status concurrently or immediately after
3. Receive EAD and advance parole while I-485 is pending (allows work and travel)
4. Green card approved: 6 to 18 months after I-485 filing for most countries

## L-1 versus H-1B: which is right for you

If you work for a multinational company with qualifying entities in both your home country and the US, L-1 is almost always preferable to H-1B for one reason: there is no lottery. H-1B selection is uncertain by definition. L-1 approval is determined by the merits of your petition.

The tradeoff is that L-1 requires prior employment with the same corporate family. You cannot use L-1 to move to a new employer. If you want to work for a US company you have not previously worked for, H-1B or another category is your path.

## How Preciprocal helps L-1 candidates

L-1 holders and candidates pursuing L-1 sponsorship still need to compete in the job market, whether they are securing internal transfers with demonstrated impact or looking for their next role after L-1 status. Preciprocal's resume analysis, mock interviews, and job tracker are equally relevant for professionals navigating intracompany transfer timelines and planning their long-term career in the US.

Start free at app.preciprocal.com. No credit card required.`,
  },
  {
    slug: "o1-visa-extraordinary-ability-guide-2026",
    title: "O-1 Visa: The Extraordinary Ability Visa Explained (2026 Guide)",
    description: "The O-1 visa has no cap, no lottery, and no employer size requirement. If your achievements are strong enough, it can be faster than H-1B and available year-round. Here is the full guide.",
    category: "Visa & Immigration",
    readTime: "10 min read",
    publishedAt: "2026-06-06",
    updatedAt: "2026-06-06",
    featured: false,
    content: `## What the O-1 visa is

The O-1 visa is a nonimmigrant work visa for individuals with extraordinary ability in the sciences, education, business, or athletics (O-1A), or extraordinary achievement in the arts, motion picture, or television (O-1B). It has no annual cap, no lottery, and no requirement that your employer be a large company.

The O-1 is one of the least understood pathways in US immigration, partly because the word "extraordinary" sounds out of reach for most professionals. In practice, extraordinary ability means being at the top of your field, but top of your field does not mean the absolute best in the world. It means demonstrably distinguished from the ordinary practitioner in your occupation.

If you have a strong publication record, significant citations, competitive prizes, high salary relative to peers, membership in selective professional organisations, speaking invitations at major conferences, media coverage of your work, or a track record of significant contributions to your field, you may qualify even if you do not consider yourself famous.

## O-1A versus O-1B

O-1A is for extraordinary ability in sciences, education, business, or athletics. Most STEM professionals, researchers, engineers, entrepreneurs, and business executives pursue O-1A.

O-1B is for extraordinary achievement in arts, motion picture, or television. Directors, actors, musicians, cinematographers, and other entertainment industry professionals typically pursue O-1B.

The criteria and evidence standards differ between the two. This guide focuses primarily on O-1A, which is the most common category for career-focused professionals.

## The O-1A criteria: how USCIS evaluates your case

To qualify for O-1A, you must demonstrate sustained national or international acclaim and recognition in your field. USCIS evaluates this through a regulatory list of criteria. You must satisfy at least 3 of the following 8 criteria, OR demonstrate a one-time achievement of major significance (a Nobel Prize, Olympic medal, or equivalent).

**Criterion 1: Awards.** You have received nationally or internationally recognised prizes or awards for excellence in your field. Industry-specific awards, competitive fellowships, and grants can qualify if they are peer-reviewed and selective.

**Criterion 2: Membership.** You are a member of associations in your field that require outstanding achievements as a condition of membership, as judged by recognised national or international experts.

**Criterion 3: Press.** Published material in professional or major media about you and your work in the field. Articles about your company or team generally do not count unless you are the clear focus.

**Criterion 4: Judging.** You have participated as a judge of the work of others in the same or an allied field, individually or on a panel. Reviewing papers for academic conferences or journals, serving on grant review committees, and similar activities qualify.

**Criterion 5: Original contributions.** You have made original scientific, scholarly, or business-related contributions of major significance to the field. This is the most subjective criterion and requires expert letters attesting to the significance of your work.

**Criterion 6: Scholarly articles.** You have authored scholarly articles in professional journals or other major media in your field. Citation counts and impact factor of the publication strengthen this criterion.

**Criterion 7: Critical role.** You have performed in a critical or leading role for organisations or establishments that have a distinguished reputation.

**Criterion 8: High salary.** You command or have commanded a high salary relative to others in the field. If your compensation is in the top percentile for your occupation and location, this can be documented with employer letters and industry salary surveys.

## Building your O-1A case

Most professionals do not satisfy 3 criteria in isolation. A strong O-1A case is built by identifying every piece of evidence that arguably satisfies each criterion and presenting it persuasively. This is why attorney quality matters enormously for O-1 petitions: the same set of facts can result in approval or denial depending on how they are framed and which criteria they are mapped to.

Key elements of a strong O-1A petition:

**Expert recommendation letters.** O-1A petitions typically include 6 to 10 letters from recognised experts in your field who attest to the significance of your contributions, the selectivity of awards you have received, or the impact of your work. These letters should be from people who know your work directly, not generic character references. The writers should themselves be recognised in the field.

**Comprehensive evidence compilation.** Every award, publication, citation, speaking invitation, media mention, and professional membership should be documented with primary evidence: award certificates, conference programs, journal pages, Google Scholar profiles, press clippings.

**Detailed petition letter.** The attorney writes a comprehensive brief explaining how each piece of evidence satisfies specific regulatory criteria. The legal argument connecting your evidence to the regulatory standard is as important as the evidence itself.

## The O-1 application process

### Step 1: Find a US employer or agent to sponsor you

Unlike EB-1A (the extraordinary ability green card), the O-1 visa requires a US petitioner: either your employer or a US agent if you work in multiple engagements or freelance arrangements. The petitioner files the I-129 on your behalf.

### Step 2: File Form I-129 with O supplement (no lottery, anytime)

Your employer or agent files Form I-129 with USCIS. The O-1 has no annual cap and can be filed at any time of year. There is no registration period and no lottery.

Processing time: Standard processing takes 2 to 4 months. Premium processing ($2,965) guarantees a response in 15 business days.

The O-1 is initially approved for the period needed to complete the event or activity, up to 3 years. It can be extended in 1-year increments indefinitely as long as you continue to qualify.

### Step 3: If outside the US, apply for O-1 visa stamp at consulate

Once USCIS approves the petition, you apply for the O-1 visa stamp at a US embassy or consulate in your home country. Bring the approval notice, passport, and supporting documents.

### Step 4: Enter the US and begin work

O-1 status is employer-specific. If you change jobs, your new employer must file a new O-1 petition before you can begin work for them.

## O-1A versus H-1B: when to choose O-1

The O-1 is often the better choice when:

- Your H-1B lottery registration was not selected and you need an alternative
- You are in a field with strong evidence (academic, research, competitive tech)
- You cannot wait for the annual March lottery window
- Your employer or potential employer is willing to file year-round
- You are changing employers and need a faster approval than H-1B transfer timing allows

The O-1 is not appropriate when:

- Your evidence does not clearly satisfy at least 3 criteria with strong documentation
- Your field does not lend itself to objective measures of distinction (some support or operational roles)
- You are early in your career with limited accomplishments

## O-1A to EB-1A: the extraordinary ability green card

The O-1A and the EB-1A green card use similar but not identical standards. Successfully obtaining an O-1A does not guarantee EB-1A approval, but a strong O-1A case with a well-documented evidence package is often a strong foundation for EB-1A.

The EB-1A allows self-petitioning, meaning no employer sponsorship is required. If you can make a compelling extraordinary ability case, EB-1A offers a path to permanent residence that is independent of any employer's willingness to sponsor a green card.

## How Preciprocal helps O-1 candidates

Professionals building toward O-1 eligibility are often already doing significant work but have not systematically documented it. Use Preciprocal to present your experience as compellingly as possible during your job search. The resume analysis tools help you frame your publications, speaking engagements, and contributions in language that resonates with US hiring managers. The mock interview tool prepares you to discuss your work and its significance in an interview context.

Start free at app.preciprocal.com. No credit card required.`,
  },
  {
    slug: "tn-visa-canada-mexico-professionals-2026",
    title: "TN Visa for Canadian and Mexican Professionals: Complete 2026 Guide",
    description: "The TN visa has no lottery, no annual cap, and can be approved at the US border in minutes for Canadians. Here is everything you need to know about eligibility, the 63 qualifying occupations, and how to apply.",
    category: "Visa & Immigration",
    readTime: "9 min read",
    publishedAt: "2026-06-06",
    updatedAt: "2026-06-06",
    featured: false,
    content: `## What the TN visa is

The TN visa is a nonimmigrant work visa created under the United States-Mexico-Canada Agreement (USMCA, previously NAFTA) that allows citizens of Canada and Mexico to work temporarily in the United States in specific professional occupations. It has no annual cap, no lottery, and no prevailing wage requirement.

For Canadian citizens, TN status can be obtained at the border in a matter of minutes with the right documents. This makes it one of the fastest work authorizations available for qualifying professionals and a compelling alternative to the H-1B for Canadians and Mexicans who qualify.

TN status is granted for up to 3 years at a time and can be renewed indefinitely. There is no maximum number of renewals, meaning TN holders can theoretically remain on TN status for their entire career.

## Who qualifies: the 63 USMCA professional occupations

TN status is limited to specific professional occupations listed in Appendix 1603.D.1 of the USMCA. There are 63 qualifying occupations across multiple fields. Most require at minimum a bachelor's degree in a directly related field, though some allow equivalent work experience to substitute.

Key qualifying occupations include:

**Technology and Engineering:** Computer Systems Analyst, Engineer (all disciplines including Civil, Electrical, Chemical, Industrial, Mechanical), Scientist (multiple specialties)

**Business and Finance:** Accountant, Management Consultant, Financial Analyst, Economist

**Science:** Chemist, Physicist, Geologist, Agricultural Scientist, Biologist, Zoologist

**Healthcare:** Dentist, Physician (primarily medical research and teaching), Registered Nurse, Pharmacist, Veterinarian, Dietitian, Physiotherapist, Medical Laboratory Technologist

**Legal and Research:** Lawyer (Licenciado or LLB required), Librarian, Social Worker, Urban Planner

**Education:** College or University Teacher, Research Assistant (at a post-secondary institution)

**Hospitality:** Hotel Manager (for Canadian citizens with hospitality degree)

If your occupation is not on the list, TN is not available regardless of your qualifications. There are no waivers or exceptions for unlisted occupations.

## Canadian citizens: the border application process

Canadian citizens do not need a visa stamp and do not need to apply in advance at a consulate. They apply for TN status directly at a US port of entry (land border crossing, international airport, or pre-clearance station) at the time of entry.

**What to bring:**

- Valid Canadian passport (must be valid for your intended period of stay)
- US employer support letter (the most important document, details below)
- Proof of your qualifications: degree certificates, transcripts, professional licenses
- Application fee: $50 USD

**The employer support letter must include:**

- Description of the professional activity you will perform
- The projected length of stay
- Your educational qualifications and credentials
- Arrangements for remuneration (salary and whether paid by US or Canadian entity)
- The TN occupation category you are applying under

The letter should be on company letterhead, signed by an authorised company representative, and addressed to US Customs and Border Protection.

**At the port of entry:**

Present your documents to a CBP officer. If the officer is satisfied, they will admit you in TN status with an I-94 indicating the duration of your stay (up to 3 years) and the category TN or TN-1. The process typically takes 15 to 60 minutes at land crossings and can be faster at designated processing ports.

If the officer has concerns or questions, they may refer you to secondary inspection. Having thorough, well-organised documents reduces this risk significantly.

## Mexican citizens: the consulate process

Mexican citizens cannot apply at the border. They must obtain a TN visa stamp at a US embassy or consulate in Mexico before entering the United States.

**The process:**

1. Complete Form DS-160, the Online Nonimmigrant Visa Application, at the US travel.state.gov website
2. Pay the visa application fee ($185 MRV fee)
3. Schedule and attend a consular interview at a US embassy or consulate in Mexico. Bring the same supporting documents as Canadian applicants, plus proof of fee payment and a visa photo
4. If approved, receive the TN visa stamp in your passport with a validity period and number of permitted entries

Processing time at Mexican consulates varies. Apply well in advance of your intended start date. The TN visa stamp does not itself authorize entry: CBP at the port of entry makes the final determination.

## TN versus H-1B: the comparison that matters

For Canadians and Mexicans in qualifying occupations, TN is almost always preferable to H-1B in 2026 for the following reasons:

**No lottery.** H-1B selection is random (now wage-weighted). TN approval depends entirely on your documents and qualifications. There is no chance element.

**No annual filing window.** You can apply for TN status at any time of year. H-1B petitions for new cap-subject positions can only start October 1.

**Faster for Canadians.** A Canadian can go from job offer to working in the US in days, compared to months for H-1B.

**Lower cost.** TN filing fees are minimal compared to H-1B government fees and attorney costs.

**Indefinitely renewable.** No 6-year maximum as with H-1B (though individual renewals are capped at 3 years per renewal).

The primary disadvantage of TN is the occupation list restriction. If your role is not on the 63-occupation list, TN is not available. Additionally, TN is technically a nonimmigrant visa that requires nonimmigrant intent, meaning you should not be actively pursuing a green card simultaneously through employment-based categories (though in practice many TN holders do eventually pursue green cards through other mechanisms).

## Renewing TN status

**For Canadians:** Renew at a US port of entry with the same documents as the initial application, or have your employer file Form I-129 with USCIS for renewal without requiring you to leave the US. The I-129 renewal takes 3 to 6 months standard or 15 business days with premium processing.

**For Mexican citizens:** Apply for a new TN visa at a US consulate before your current status expires, or have your employer file Form I-129 for renewal from within the US.

Both renewal methods allow you to continue working while the renewal is pending if you file before your current status expires, provided you filed on time.

## Changing employers on TN

TN status is employer-specific. If you change US employers, you must either:

- Leave the US and re-enter with TN documentation for the new employer (Canadians can do this at the border)
- Have your new employer file Form I-129 with USCIS before you begin working for them

You cannot simply start working for a new employer because your TN was approved for a different employer. Doing so violates your immigration status.

## TN to green card

TN is technically a nonimmigrant visa requiring nonimmigrant intent. However, many TN holders eventually pursue green cards through various pathways. The most common options:

**EB-1A:** If you have extraordinary ability in your field (see the O-1 guide), EB-1A allows self-petitioning without employer sponsorship.

**EB-2 NIW (National Interest Waiver):** Available to professionals whose work is in the national interest of the United States. Allows self-petitioning.

**H-1B as a bridge:** Some TN holders transition to H-1B (through the annual lottery) to gain access to employer-sponsored green card processing under EB-2 or EB-3 while continuing to work.

The key constraint is that TN by itself does not demonstrate immigrant intent in the same way H-1B does (H-1B is a dual-intent visa), so pursuing employment-based green card sponsorship while on TN requires careful navigation to avoid problems at the border. Consult an immigration attorney before beginning the green card process while on TN.

## How Preciprocal helps TN professionals

Whether you are a Canadian professional applying for TN status for the first time or a Mexican professional navigating the consular process, the job market competition remains fierce. TN status gives you authorization to work, but it does not give you an edge in the application process.

Preciprocal's resume analysis, mock interview practice, and job tracker are used by professionals across immigration categories. The ATS scoring helps you tailor every application to the specific job description. The voice-based mock interview panel prepares you for the rigorous interview processes at the large employers most likely to hire TN professionals.

Start free at app.preciprocal.com. No credit card required.`,
  },
  {
    slug: "green-card-employment-based-pathways-2026",
    title: "Employment-Based Green Card Pathways Explained (EB-1 to EB-5): 2026 Guide",
    description: "EB-1, EB-2, EB-3, EB-4, EB-5. Each employment-based green card category has different requirements, processing times, and backlogs. Here is a plain-language breakdown of every pathway in 2026.",
    category: "Visa & Immigration",
    readTime: "13 min read",
    publishedAt: "2026-06-06",
    updatedAt: "2026-06-06",
    featured: true,
    content: `## What an employment-based green card is

A green card (formally, Lawful Permanent Residence) gives you the right to live and work permanently in the United States. Employment-based (EB) green cards are for individuals who qualify based on their professional skills, achievements, or investment.

The US issues 140,000 employment-based green cards per year, divided across five preference categories. The category you qualify for determines your priority and how long you wait. For some countries (particularly India and China), backlogs in lower preference categories now span decades. Understanding which category to pursue, and pursuing it as early as possible, is one of the most important career decisions an international professional in the US can make.

## The process overview: two stages for most EB categories

Most employment-based green card cases involve two major stages.

**Stage 1: Immigrant petition (I-140)**

Your employer (or you, for self-petition categories) files Form I-140 to establish that you qualify for the category. USCIS approves or denies the petition. Standard I-140 processing takes 18 to 20 months. Premium processing ($2,805) gets a decision in 15 business days for most categories.

**Stage 2: Adjustment of Status (I-485) or Consular Processing**

Once your priority date (the date your I-140 was filed) becomes current in the monthly USCIS Visa Bulletin, you can file for Adjustment of Status if you are in the US, or go through consular processing if you are abroad. This stage involves biometrics, a medical exam, and an interview in some cases.

For most countries, Stages 1 and 2 can happen quickly once an I-140 is approved. For Indian and Chinese nationals, the wait between Stage 1 approval and Stage 2 eligibility can be years or decades depending on the category.

## EB-1: Priority Workers (no PERM required)

EB-1 is the fastest employment-based category and does not require PERM labor certification, which makes it significantly faster than EB-2 and EB-3 for most applicants.

### EB-1A: Extraordinary Ability

For individuals with extraordinary ability in sciences, arts, education, business, or athletics. Requires sustained national or international acclaim demonstrated by satisfying at least 3 of 10 regulatory criteria (awards, media coverage, high salary, judging, original contributions, scholarly articles, critical role, membership in selective organisations, display of work at artistic exhibitions, or commercial success in the performing arts).

Self-petition: you do not need an employer to file the I-140. No job offer required.

Processing time (2026): I-140 standard 18 to 20 months, premium 15 business days. For most countries, I-485 can be filed concurrently with I-140.

**Who should pursue EB-1A:** Researchers with strong citation records and publication histories, engineers who have made significant technical contributions, business leaders with documented industry impact, competitive athletes, and artists with international recognition.

### EB-1B: Outstanding Professor or Researcher

For professors and researchers who are recognised internationally as outstanding in their academic field. Requires at least 3 years of experience in teaching or research, an offer of tenured or tenure-track position (or comparable research position), and satisfaction of at least 2 of 6 criteria (major prizes, membership in selective organisations, published material about your work, participation as a judge, original contributions of major significance, or authorship of scholarly books or articles).

Employer must file the I-140. No PERM required.

**Who should pursue EB-1B:** University faculty, corporate research scientists, and postdoctoral researchers at recognised institutions.

### EB-1C: Multinational Manager or Executive

For multinational executives and managers being transferred to or already working in the US. Requires at least 1 year of employment abroad with the qualifying organisation in an executive or managerial capacity within the past 3 years.

Employer must file the I-140. No PERM required. Feeds directly from L-1A status.

Processing time: same as EB-1A. For most countries including India and China, EB-1C priority dates are current (no backlog) as of 2026.

**Who should pursue EB-1C:** L-1A visa holders, senior managers at multinationals who have been transferred to the US, and executives who have worked for the same corporate family abroad.

## EB-2: Professionals with Advanced Degrees or Exceptional Ability

EB-2 is for members of professions holding advanced degrees (master's or higher, or bachelor's plus 5 years of progressive experience) or individuals with exceptional ability in sciences, arts, or business.

Most EB-2 cases require PERM labor certification before the I-140 can be filed. PERM is a Department of Labor process that tests the US labor market to verify no qualified US workers are available for the position. PERM adds 12 to 24 months to the overall timeline before you can even file the I-140.

### EB-2 NIW: National Interest Waiver

The National Interest Waiver allows you to bypass PERM and self-petition if your work is in the national interest of the United States. USCIS evaluates NIW petitions under a three-prong test: your proposed endeavor has substantial merit and national importance, you are well-positioned to advance the endeavor, and it would be beneficial to the United States to waive the job offer requirement.

NIW is increasingly pursued by researchers, STEM professionals, healthcare workers, educators, and entrepreneurs who can demonstrate their work benefits the US. It does not require extraordinary ability, only that your specific work in your specific field advances national interests.

**Who should pursue EB-2 NIW:** STEM researchers, healthcare professionals in underserved areas, technology professionals with documented contributions, and entrepreneurs building businesses in the US.

Processing time: I-140 premium processing is 15 business days. For most countries other than India and China, I-485 can follow relatively quickly. For Indian nationals, the EB-2 backlog extends over a decade as of 2026.

## EB-3: Skilled Workers, Professionals, and Unskilled Workers

EB-3 is the broadest employment-based category and the one with the longest backlogs for Indian and Chinese nationals. It requires PERM labor certification for most cases.

- Skilled workers: jobs requiring at least 2 years of training or experience
- Professionals: jobs requiring a bachelor's degree
- Unskilled workers (other workers): jobs requiring less than 2 years of training

EB-3 is typically the pathway for professionals who do not meet the higher bars of EB-1 or EB-2. Many H-1B holders whose employers are willing to sponsor green cards end up in EB-3 after PERM certification.

For Indian nationals, EB-3 final action dates as of mid-2026 are in the early 2010s, representing a 15-year backlog or more. For most other countries, EB-3 dates are current or have shorter waits.

## EB-4: Special Immigrants

EB-4 covers a range of special immigrant categories: religious workers, certain broadcasters, certain employees of US government abroad, certain physicians, certain armed forces members, and others. This category is less commonly pursued by the general professional population and has category-specific requirements.

## EB-5: Investor Visa

EB-5 is for foreign nationals who invest a qualifying amount of capital in a US commercial enterprise that creates at least 10 full-time US jobs.

The minimum investment amounts as of 2026:
- $1,050,000 for standard direct investment
- $800,000 for investment in a Targeted Employment Area (rural or high unemployment area), or through an approved Regional Center

EB-5 does not require a job offer or employer sponsorship. It is purely investment-based. The green card is initially conditional (2 years) and you must demonstrate the investment was sustained and jobs were created to have conditions removed.

Regional Center EB-5 (investing through a USCIS-approved pooled investment fund) is the more common approach as it requires less direct involvement in business management. The integrity fund fee for Regional Center investors is $1,000.

Processing: EB-5 I-526E petitions take 2 to 4 years currently. Priority dates are current for most countries, meaning you can file I-485 once I-526E is approved.

## Country backlogs: the most important factor you might be ignoring

For most countries, employment-based green cards are available without significant wait once an I-140 is approved. For India and China, demand dramatically exceeds supply, creating per-country caps that create multi-decade backlogs in EB-2 and EB-3.

As of 2026, Indian nationals in EB-2 face waits of 10 or more years from priority date to visa availability. EB-3 India waits are 15 or more years.

EB-1A, EB-1B, and EB-1C do not have India-specific backlogs as of 2026, making them disproportionately important for Indian professionals.

If you are an Indian or Chinese national, your employment-based green card strategy must account for backlogs from day one. The choice of category is not just about eligibility. It is about waiting 5 years versus waiting 50.

## Practical strategy: start early, file I-140 as soon as eligible

The priority date is set when USCIS receives your I-140. Even if your visa date will not be current for years, filing your I-140 as early as possible locks in an earlier priority date. For Indian nationals in particular, every year of earlier I-140 filing is a year earlier in the queue.

Many professionals file an EB-1 I-140 in parallel with an EB-2 or EB-3 case. The EB-1 attempt may succeed quickly; if it does not, the EB-2 or EB-3 I-140 approval with the earlier priority date preserves the queue position for the longer path.

Once an I-140 is approved, even if you are years from visa availability, you gain certain benefits: H-1B extensions beyond the 6-year limit in 1-year or 3-year increments, and portability rights allowing you to change employers without losing your priority date after the I-140 has been approved for 180 days.

## How Preciprocal fits into the green card journey

The employment-based green card process is measured in years, not months. During that time, you are still competing in the job market, navigating performance reviews, and building the career record that will eventually support your next visa or green card petition.

Preciprocal helps international professionals present their experience and achievements as compellingly as possible at every stage: when applying for the role that will sponsor the green card, when building toward EB-1 extraordinary ability criteria, and when switching employers after I-140 approval vests portability rights.

Start free at app.preciprocal.com. No credit card required.`,
  },
  {
    slug: "us-visa-policy-updates-2026",
    title: "New US Visa Updates (2026): Duration of Status Ends, the H-1B Fee Is Blocked, EAD Extensions Are Gone",
    description: "Four rule changes reshaped US work and student visas in 2026. What actually changed, what is still in litigation, the dates that matter, and what each change means for your job search.",
    category: "Visa & Immigration",
    readTime: "13 min read",
    publishedAt: "2026-08-30",
    updatedAt: "2026-08-30",
    featured: true,
    content: `## Why this year is different

Most years bring incremental immigration changes: a fee adjustment here, a form revision there. 2026 did not work that way. Four separate changes landed within twelve months, and together they alter how long international students can stay, how work permits are renewed, how the H-1B lottery picks winners, and how much it costs to bring someone in from abroad.

This guide covers what changed, what is confirmed versus still being fought in court, and the specific dates you need on your calendar. It is a summary of public policy, not legal advice. Confirm anything that affects your own case with your DSO or an immigration attorney before you act on it.

## Update 1: Duration of status ends on September 15, 2026

This is the biggest structural change to student visas in decades.

**What it was.** For decades, F and J nonimmigrants were admitted for "duration of status" (D/S). Your I-94 said D/S rather than a date. As long as you kept making normal progress in your program, your status kept up with you. Program extended by a semester? Your DSO issued a new I-20 and that was the end of it.

**What it is now.** DHS published the final rule on July 17, 2026, and it takes effect September 15, 2026. New admissions get a fixed admit-until date on the I-94, tied to the program end date on the I-20, and capped at four years regardless of how long the program actually runs. When you need more time, you file with USCIS instead of handling it entirely through your school.

**The mechanics that matter:**

- New admissions are admitted until the program end date on the I-20, not to exceed four years, plus a departure grace period.
- The departure grace period for F nonimmigrants admitted under the new fixed-date system is 30 days, down from the 60 days students have had for years.
- To stay past your admit-until date, whether to finish a longer program, start a new one, or do OPT, you file Form I-539, Application to Extend/Change Nonimmigrant Status, with USCIS. The current fee is $420 online or $470 by mail.
- Doctoral programs are the obvious pressure point. A five or six year PhD no longer fits inside a single admission period.

**The transition provision, and why the date March 18, 2027 matters.**

If you were properly maintaining F status and admitted for D/S before the effective date, you are not immediately converted to a fixed date. Under the transition rules, you remain authorized until the later of the program end date on your valid I-20, or the expiration of your EAD if you are on OPT or STEM OPT, capped at four years from the effective date, plus the applicable grace period.

More importantly for anyone graduating soon: F-1 students who were admitted for D/S, are present in the US on the effective date, and who timely file Form I-765 for post-completion OPT or a STEM OPT extension **on or before March 18, 2027** do not need to file a separate I-539 extension of stay for that OPT period. File after that window and the extension of stay becomes a separate application, with its own fee and its own processing time.

**Travel ends your transition treatment.** If you leave the US and re-enter after September 15, 2026, CBP issues a new I-94 with a fixed admit-until date based on your current program dates. You are then on the new system. Plan international travel around this deliberately, especially if you are mid-program with more than a year remaining.

## Update 2: the 540-day automatic EAD extension is gone

DHS issued an interim final rule on October 30, 2025 that ended automatic extensions of employment authorization for most renewal applicants. USCIS stopped granting them as of that date.

**What the old rule did.** If you filed your EAD renewal on time, your existing card kept working for up to 540 days past its printed expiration date while USCIS processed the renewal. It was the safety net that kept hundreds of thousands of people employed through processing backlogs.

**What happens now.** For most renewal categories, a timely-filed I-765 no longer extends anything. Your work authorization stops on the date printed on your card. If USCIS has not approved the renewal by then, you stop working, your employer must take you off payroll, and you resume only when the new card arrives.

**Categories hit hardest:** H-4 spouses (C26), E and L-1 spouses (A17 and A18), pending asylum applicants (C08), pending adjustment of status applicants (C09), TPS holders (A12), VAWA self-petitioners (C31), and several others.

**What did not change:** the 180-day automatic extension for STEM OPT is a separate regulation and remains in place. If you file your STEM OPT extension before your post-completion OPT EAD expires, your authorization continues for up to 180 days while the case is pending. F-1 students on OPT are not caught by the 540-day repeal, though they are affected by the duration of status rule above.

The practical consequence is simple and harsh: file renewals at the earliest date your category allows, and treat your EAD expiration date as a hard employment cliff rather than a soft one.

## Update 3: the wage-weighted H-1B lottery is now live

DHS finalized the weighted selection rule effective February 27, 2026, and it governed the FY2027 registration season in March 2026. The purely random lottery is gone.

**How selection works now.** Each registration receives entries based on the OEWS wage level that the offered salary meets or exceeds for that occupation and metro area:

| Wage level | Lottery entries |
|---|---|
| Level IV | 4 |
| Level III | 3 |
| Level II | 2 |
| Level I | 1 |

Every wage level can still be selected. But a Level I offer now competes against Level IV offers that carry four times the weight.

**What it means for candidates.** The salary an employer offers is no longer just a compensation question, it is a selection-odds question. An entry-level offer that lands at Level I materially reduces your chance of selection compared to the same role priced at Level III. If you are negotiating an offer with a sponsoring employer before a cap season, the wage level is a legitimate and important topic to raise. Ask which OEWS level the offer falls into for your occupation code and location.

**Cap status.** The FY2027 cap filing deadline passed on June 30, 2026, and USCIS announced the cap was reached on July 17, 2026 with no second lottery. The next cap-subject registration period is expected in March 2027. If you need cap-subject H-1B sponsorship and were not selected this year, your realistic timeline is a March 2027 registration for an October 2027 start.

## Update 4: the $100,000 H-1B fee has been struck down, for now

Proclamation 10973 introduced a $100,000 payment tied to certain H-1B beneficiaries entering from abroad. It has been in litigation ever since, and the status has changed several times.

**Where it stands as of late August 2026:**

- On June 8, 2026, the US District Court for the District of Massachusetts ruled the fee unlawful, finding that the implementation exceeded executive authority and violated the Administrative Procedure Act.
- A brief administrative stay reinstated the fee on June 12, 2026.
- On July 24, 2026, the First Circuit denied the government's motion to stay the district court judgment, finding the government unlikely to succeed on appeal. The vacatur stands while the appeal proceeds.
- The fee is not currently collectible. The merits appeal continues, and a separate case in Washington, DC that reached the opposite conclusion is still pending.
- The proclamation itself was not vacated, only the policy implementing it, which leaves room for re-implementation on a different legal basis.
- The 12-month restriction in Proclamation 10973 is scheduled to expire on September 20, 2026 unless it is extended, renewed, or reissued.

**What it meant in practice.** The fee applied to beneficiaries entering from abroad, not to workers already in the US changing status. That distinction drove a lot of 2026 hiring behavior: employers strongly preferred candidates already in the US on F-1 OPT or another status over candidates who would need consular processing.

**What to do with this.** Do not assume the issue is settled in either direction. If you are interviewing with a company that went quiet on sponsorship during the fee period, it is worth re-opening the conversation now that the fee is not collectible. If you are abroad and relying on the current status quo, watch the September 20 expiry and the appeal.

## The dates that matter

| Date | What happens |
|---|---|
| September 15, 2026 | Duration of status ends; fixed admission periods begin for new F and J admissions |
| September 20, 2026 | Proclamation 10973's 12-month H-1B entry restriction is scheduled to expire unless extended |
| March 18, 2027 | Last day D/S-admitted F-1 students can timely file I-765 for OPT or STEM OPT without a separate I-539 extension of stay |
| March 2027 (expected) | FY2028 H-1B cap registration, under wage-weighted selection |

## What this means if you are job searching right now

**If you are an F-1 student graduating in the next year:** your OPT filing timing is now a status question, not just a work authorization question. File your I-765 as early as your program completion date allows, and get it in before March 18, 2027 if you are covered by the transition provision. Talk to your DSO this term, not the week before you graduate.

**If you are on an EAD in a renewal-dependent category:** calendar your renewal filing at the earliest permitted date. With no automatic extension and I-765 processing running months, filing late now means unpaid time off work rather than a paperwork inconvenience.

**If you need H-1B sponsorship:** the wage level in your offer affects your lottery odds. Target employers and roles where the offered salary clears Level II or higher for your occupation and metro. Ask about it directly during offer conversations.

**If you are competing for sponsored roles:** employers spent 2026 in a defensive crouch on immigration cost and risk. The candidates who won sponsored offers were the ones who could explain their own status clearly and confidently, in one or two sentences, without making the recruiter do the research. That is a preparable skill.

## How Preciprocal helps

You cannot control USCIS timelines or federal rulemaking. You can control how prepared you are when a sponsoring employer finally calls back.

Preciprocal's voice-based mock interviews let you practise the sponsorship conversation until it sounds routine rather than apologetic. The resume analysis shows your ATS score against each specific job description and tells you which keywords are missing. The cover letter generator addresses your work authorization status accurately and professionally instead of leaving a recruiter guessing. The job tracker keeps every application, follow-up, and immigration deadline in one place, so nothing gets lost in a six-month processing window.

Start free at app.preciprocal.com. No credit card required.`,
  },
  {
    slug: "ead-renewal-2026-automatic-extension-ended",
    title: "EAD Renewal in 2026: The 540-Day Automatic Extension Is Gone (What to Do Now)",
    description: "DHS ended automatic EAD extensions for most renewal categories. Here is exactly who is affected, how to time your I-765 filing, what to tell your employer, and what to do if your card expires while USCIS is still processing.",
    category: "Visa & Immigration",
    readTime: "12 min read",
    publishedAt: "2026-08-30",
    updatedAt: "2026-08-30",
    content: `## The rule that quietly changed everything

For years, EAD renewals had a safety net. File your Form I-765 renewal on time, and your expired card kept working, first for 180 days, later for up to 540 days, while USCIS processed the new one. Employers could keep you on payroll using your expired card plus your receipt notice. Processing delays were annoying, not catastrophic.

DHS issued an interim final rule on October 30, 2025 that ended automatic extensions for most renewal applicants. USCIS stopped granting them as of that date. Applicants who filed renewals on or after October 30, 2025 generally do not receive an automatic extension unless a separate law or Federal Register notice authorises one for their specific category.

The safety net is gone. Your work authorization now ends on the date printed on your card, full stop.

This guide is a summary of public policy, not legal advice. Verify your own category and timeline with an immigration attorney.

## Who is affected

The repeal hits the categories that depended on it most:

- **H-4 dependent spouses (C26)** of H-1B workers
- **E and L-1 dependent spouses (A17 and A18)**
- **Pending asylum applicants (C08)**
- **Pending adjustment of status applicants (C09)**
- **TPS holders (A12)**
- **Withholding of removal recipients (A10)**
- **Cancellation of removal applicants (C10)**
- **VAWA self-petitioners (C31)**

If you are in one of these categories, your renewal timing is now the single most important variable in whether you keep working continuously.

## Who is not affected

**STEM OPT applicants keep their 180-day extension.** The 180-day continued employment authorization for STEM OPT is a separate regulation and was not part of the 540-day framework that was repealed. If USCIS receives your STEM OPT I-765 before your post-completion OPT EAD expires, your work authorization continues for up to 180 days while the application is pending, or until USCIS decides, whichever comes first.

**Initial OPT applicants were never covered.** Post-completion OPT is an initial grant, not a renewal, so there was never an automatic extension to lose. What matters there is filing early enough that the card arrives before you want to start.

Note that F-1 students face a separate change: the duration of status rule taking effect September 15, 2026 alters how long you are admitted for and when you need to file Form I-539. That is a different rule with different deadlines, and it interacts with your OPT filing.

## What this means in practice

Here is the sequence that used to be survivable and now is not:

Your EAD expires March 1. You file your renewal in January. USCIS takes five months. Under the old rule, you kept working the entire time on your expired card plus the receipt notice. Under the current rule, you stop working on March 1. Your employer must remove you from payroll. You sit unpaid until the card arrives, potentially in June. Depending on your category, a gap may also raise questions about your underlying status.

USCIS processing times for Form I-765 across many categories are running well past six months in 2026. The gap between a reasonably timed filing and an approval is now often larger than the buffer you have.

## The new filing timeline

**File at the earliest date your category permits.** For most renewal categories that is 180 days before expiration. Not 90. Not 60. The earliest permitted date, and then treat it as a deadline rather than a target.

**Build a 6 to 9 month runway.** Given current processing times, six months of lead time is the minimum defensible plan and nine months is safer where your category allows it.

**Set three calendar reminders.** One at 210 days before expiration to gather documents, one at 180 days to file, and one at 90 days to check status and consider a service request if the case has not moved.

## Filing checklist

**Fees as of 2026:**

| Item | Cost |
|---|---|
| Form I-765, online filing | $470 |
| Form I-765, paper filing | $520 |
| Premium processing (where available) | approximately $1,780, 30 business days |

USCIS began adjusting fees for inflation annually starting January 1, 2026. Confirm the exact current amount on uscis.gov the day you file, because the most common rejection reason is an outdated fee.

**File online, not on paper.** Online filing gives you immediate confirmation, a digital case record, faster receipting, and in many categories noticeably faster adjudication. Paper filings for OPT-type cases have been running roughly 3 to 5 months against 2 to 3 months online.

**Documents to have ready:**

- Completed Form I-765 with the correct eligibility category code
- Copy of your current and all previous EAD cards
- Copy of your I-94, downloaded from the CBP website
- Copy of your passport biographical page and current visa stamp
- Category-specific evidence: your spouse's H-1B approval notice and marriage certificate for H-4, your I-797 receipt for a pending I-485 for C09, and so on
- Two passport-style photos if filing by mail

**Check the eligibility category code twice.** A wrong category code is the fastest way to a rejection or a Request for Evidence, and an RFE can add months you no longer have room for.

## What to tell your employer, and when

Do not surprise your employer in the last two weeks. Have the conversation the moment you file.

**What to say:** "My work authorization card expires on [date]. I filed my renewal on [date], which is the earliest USCIS allows. The automatic extension rule that used to cover this gap was eliminated in October 2025, so if USCIS has not approved my renewal by [expiration date], I will need to be off payroll until the new card arrives. I wanted to flag this early so we can plan around it."

**What to ask for:** an unpaid leave of absence rather than a termination, with your role held open. Employers can accommodate this when they know months in advance. They usually cannot when they find out on the Friday before.

**What your employer must do legally.** For Form I-9 purposes, once your EAD expires without a valid automatic extension, they cannot continue to employ you in that authorization. This is not a policy they can waive as a favour. Approach it as a scheduling problem to solve together, not a rule to negotiate around.

## If your card is going to expire before approval

**Check whether premium processing is available for your category.** For OPT-related I-765 filings, premium processing targets 30 business days. Availability varies by category, so check the current USCIS premium processing page for your specific code.

**Submit a service request if you are past posted processing times.** Through your USCIS online account, submit an e-Request "case outside normal processing time." Include your receipt number and the published processing time for your form and category.

**Contact the USCIS Contact Center and ask about expedite criteria.** Expedite requests are granted sparingly, but severe financial loss to a company or person is a recognised criterion. Documented evidence of imminent job loss is stronger than a general statement of hardship.

**Ask your Congressional representative's office for a case inquiry.** Every House and Senate office has caseworkers who submit congressional inquiries to USCIS. It is free, it takes about fifteen minutes to request online, and it sometimes moves a stalled case. Have your receipt number, A-number, and filing date ready.

**Do not keep working past the expiration date.** Unauthorised employment carries consequences far worse than an unpaid gap, including on future adjustment of status applications. No paycheque is worth it.

## How to track your case

Go to egov.uscis.gov and enter your receipt number, or check your USCIS online account for a richer status view. Typical statuses:

- **Case Was Received:** USCIS has the filing
- **Case Is Being Actively Reviewed:** normal processing
- **Request for Evidence Was Sent:** respond immediately, and by the deadline on the notice
- **New Card Is Being Produced:** approval is done, card production has started
- **Card Was Mailed To Me:** typically arrives within about 10 business days
- **Case Was Approved:** approval notice issued

**Keep your address current with USCIS.** USPS does not forward EAD cards. If your card is mailed to an old address it can be returned or lost, and replacement adds weeks. Update your address through your USCIS online account immediately when you move.

## Use the waiting period

If you are facing an unpaid gap, or you are simply stuck waiting on USCIS, that time is worth something. The candidates who come out of a processing gap in the strongest position are the ones who used it to prepare for the next move rather than refreshing a case status page.

Preciprocal's mock interviews let you practise the sponsorship and work authorization conversation until it sounds routine. The resume analysis scores your resume against each specific job description and shows the missing keywords before you submit. The cover letter generator handles your authorization status accurately and professionally. The job tracker keeps applications, follow-ups, and immigration deadlines in one view, which matters a great deal when your work window is defined by a date on a card.

Start free at app.preciprocal.com. No credit card required.`,
  },
  {
    slug: "how-to-check-your-visa-status-2026",
    title: "How to Check Your Visa Status in 2026 (I-94, SEVIS, USCIS Case Status)",
    description: "Your visa stamp is not your status. Here is how to verify your actual immigration status using your I-94, SEVIS record, and USCIS case tracking, plus what changes when duration of status ends on September 15, 2026.",
    category: "Visa & Immigration",
    readTime: "10 min read",
    publishedAt: "2026-08-30",
    updatedAt: "2026-08-30",
    content: `## The distinction that trips up almost everyone

Your visa is not your status. They are two different things issued by two different agencies, and confusing them is the single most common reason people accidentally fall out of status.

**Your visa** is the stamp or foil in your passport, issued by a US consulate abroad. It is an entry document. It says you may present yourself at a port of entry and request admission until a certain date. Once you are inside the United States, an expired visa stamp is not itself a problem. You need a valid one only to re-enter after travelling abroad.

**Your status** is what you are permitted to do while inside the United States. It is set by CBP when you are admitted and maintained through your conduct: enrolling full-time, working only where authorized, filing timely applications. Status is what determines whether you are lawfully present, and it is recorded on your I-94.

You can be in perfectly valid status with an expired visa stamp. You can also hold a visa stamp valid for five more years and be out of status. The stamp is not the answer.

This guide summarises public information and is not legal advice. Confirm your own situation with your DSO or an immigration attorney.

## Check 1: your I-94, the record that actually defines your status

The Form I-94 arrival record is the authoritative record of your admission. It shows the class of admission and, crucially, your admit-until date.

**How to check it:** go to i94.cbp.dhs.gov, select "Get Most Recent I-94," and enter your name, date of birth, and passport details exactly as they appear in your passport. The record is free and available immediately. Download the PDF, do not just look at it.

**What to verify on it, every single time:**

- **Class of admission:** F1, H1B, L1, J1, and so on. Confirm it matches what you expect. Data-entry errors happen at the port of entry and are far easier to fix in the first weeks than a year later.
- **Admit until date:** this is the date your authorized stay ends. Historically F and J records showed "D/S" here. Under the rule taking effect September 15, 2026, new admissions show an actual date.
- **Name spelling and date of birth:** errors here cascade into every subsequent filing.

**Check your I-94 after every single entry to the US.** Not once a year. Every entry generates a new record, and every entry is an opportunity for an error that only you will catch.

**If something is wrong:** for errors made at an airport or seaport, contact a CBP Deferred Inspection Site. For land border errors, return to the port of entry. Do not wait, and do not assume your school or employer will notice.

## What changes on September 15, 2026

The duration of status framework for F and J nonimmigrants ends on that date, and it directly changes what you will see on your I-94.

Under D/S, your I-94 said "D/S" and your status tracked your program. Under the new rule, new admissions receive a fixed admit-until date tied to the program end date on your I-20, capped at four years, plus a departure grace period. Students admitted under the new fixed-date system have a 30-day departure period, shortened from the 60 days that applied previously.

**If you were admitted for D/S before the effective date** and are maintaining status, transition provisions let you remain until the later of your program end date on your valid I-20, or your EAD expiration if you are on OPT or STEM OPT, capped at four years from the effective date, plus the applicable grace period.

**Two consequences worth internalising:**

First, if you travel and re-enter the US after September 15, 2026, you receive a new I-94 with a fixed admit-until date based on your current program dates. The transition treatment ends at that point.

Second, extending your stay is now a USCIS filing. To stay beyond your admit-until date, whether to finish a longer program, begin a new one, or engage in OPT or STEM OPT, you file Form I-539, Application to Extend/Change Nonimmigrant Status, currently $420 online or $470 by mail. One important carve-out: F-1 students admitted for D/S who timely file Form I-765 for post-completion OPT or STEM OPT on or before March 18, 2027 are not required to file a separate I-539 for that OPT period.

After September 15, 2026, checking your I-94 stops being an occasional formality and becomes the thing that tells you your actual deadline.

## Check 2: your SEVIS record, if you are on F or J status

Your SEVIS record is the government database entry that underpins your F or J status. If it is terminated, your status and any associated work authorization end, regardless of what your documents say.

**How to check it:** you cannot query SEVIS directly. Your DSO or responsible officer can, and they can confirm your record is Active. Email your international student office and ask them to verify your SEVIS status and registration for the current term. Do this at the start of each term and after any change in enrollment, employment, or address.

**What your I-20 tells you:** check the program end date, the SEVIS ID (starting with N), your enrollment status, and, if you are on OPT, the recommendation and the employment dates. Confirm the details match your I-94 and EAD.

**What terminates a SEVIS record:** dropping below full-time enrollment without prior DSO authorization, unauthorized employment, failure to report a change of address within 10 days, exceeding unemployment limits during OPT, or failing to report new employment within 10 days during OPT.

**The reporting duties people forget:** address changes within 10 days, new OPT employment within 10 days, and STEM OPT validation reports every six months. Missing these is one of the most common causes of accidental status problems, and none of them feel urgent at the time.

## Check 3: your USCIS case status, if you have a pending application

If you have filed an I-765, I-539, I-129, I-140, or I-485, that case has a status you should be tracking actively.

**Where to check:** egov.uscis.gov with your receipt number, or your USCIS online account for a fuller picture including notices and document uploads.

**What the statuses mean:**

| Status | What it means |
|---|---|
| Case Was Received | USCIS has your filing and issued a receipt |
| Case Is Being Actively Reviewed | Normal processing, no action needed |
| Request for Evidence Was Sent | Action required; respond by the deadline on the notice |
| Response To USCIS Request Received | Your RFE response is in, clock restarted |
| New Card Is Being Produced | Approved, card production started |
| Card Was Mailed To Me | Typically arrives within about 10 business days |
| Case Was Approved | Approval notice issued |
| Case Was Denied | Read the notice carefully and consult an attorney immediately |

**Compare against posted processing times.** USCIS publishes processing times by form, category, and service centre at egov.uscis.gov/processing-times. If your case is past the posted time for your specific form and category, you can submit an e-Request through your online account for a case outside normal processing time.

**Set up automatic case alerts** in your USCIS online account rather than checking manually. And keep your address current with USCIS, because official government mail including EAD cards is not forwarded by USPS.

## Check 4: your work authorization dates

If you are working, three dates govern your legal ability to do so, and you should know all three from memory.

**Your EAD validity dates.** You may not work before the start date printed on the card, and you may not work after the end date. As of the October 2025 rule change, most renewal categories no longer receive an automatic extension past the printed expiration, so that end date is a hard stop. STEM OPT retains a separate 180-day continued employment provision when the extension is filed before the current EAD expires.

**Your I-94 admit-until date.** Work authorization does not extend your permission to be in the US, and being in the US does not by itself authorize work.

**Your petition validity dates, if you are in a petition-based status** such as H-1B or L-1. Your I-797 approval notice shows the validity period, and you are authorized to work for the petitioning employer within those dates.

## A quarterly 15-minute status audit

Put this on a recurring calendar invite. It takes fifteen minutes and prevents the failure modes that take months to fix.

1. Download your current I-94 from i94.cbp.dhs.gov and confirm the class of admission and admit-until date.
2. Confirm your passport is valid at least six months out, and renew if it is not.
3. Check your EAD expiration date and calculate how many days remain until the earliest permitted renewal filing date.
4. Email your DSO to confirm your SEVIS record is Active, if you are on F or J status.
5. Check any pending USCIS case status and compare it against posted processing times.
6. Confirm your address is current with USCIS, SEVIS, and your employer.

## Where Preciprocal fits

Knowing your status cold is not only defensive paperwork, it is also an interview skill. Recruiters routinely ask international candidates about work authorization, and the answers that work are short, specific, and confident: what status you are in, what dates it runs through, and what the employer would need to do, if anything.

Preciprocal's mock interviews let you rehearse that answer until it is automatic. The resume analysis and cover letter tools help you present your experience without the authorization question overshadowing it. The job tracker keeps your applications and your immigration deadlines in the same place, so a renewal date never sneaks up on you in the middle of an interview loop.

Start free at app.preciprocal.com. No credit card required.`,
  },
  {
    slug: "us-job-market-late-2026-data",
    title: "The US Job Market in Late 2026: What the Data Actually Says",
    description: "Job postings are near their pre-pandemic baseline, but software development is 25% below it and new grad unemployment is elevated. Here is what the numbers show and how to run a job search around them.",
    category: "Career Strategy",
    readTime: "11 min read",
    publishedAt: "2026-08-30",
    updatedAt: "2026-08-30",
    content: `## The market is not collapsing, and it is not fine either

Job market commentary in 2026 splits into two camps that are both wrong. One says the labour market is healthy because the headline unemployment rate is low. The other says hiring has collapsed. The data supports neither.

What the numbers actually show is a low-churn market: few layoffs, few hires, and very little movement. That is a specific condition with specific implications for how you should run a search, and it is very different from either a boom or a bust.

Here is what the aggregate data shows as of August 2026, and what to do about it.

## The headline numbers

| Indicator | Level | Reading |
|---|---|---|
| Unemployment rate | 4.1% (July) | Low, but partly driven by labour supply decline |
| Indeed Job Postings Index | 101.8 | 1.8% above the February 2020 baseline |
| New postings index | 97.2 | 3% below baseline |
| Postings, year over year | -2.9% | Slowly declining |
| Hires rate | 3.4% | Low |
| Quits rate | 2.0% | Low, people are staying put |
| Layoffs rate | 1.1% | Low, companies are not cutting broadly |
| Vacancy-to-unemployment ratio | 1.0 | One opening per unemployed worker |
| Posted wage growth | 2.5% year over year | Below CPI inflation of 3.4% |

Two things stand out.

**Total postings are roughly at the pre-pandemic baseline.** The overall volume of open jobs is not unusual by historical standards. What is unusual is how little movement there is around them.

**Low layoffs plus low hiring is a specific trap.** If you have a job, you are relatively safe. If you want a different job, the pipeline is slow. Quits at 2.0% means people are not voluntarily leaving, which means fewer backfill openings, which means fewer entry points. This is the mechanism behind the widespread feeling that the market is worse than the statistics say.

**Real wages are slightly negative.** Posted wage growth of 2.5% against 3.4% CPI means the typical new offer is losing ground against inflation. Staying put has a cost too.

## The sector picture is extremely uneven

The aggregate hides enormous variation.

**Software development postings sit at an index of 74.4**, roughly 25% below the February 2020 baseline. Among major categories, this is one of the weakest. If you are a software engineer, you are not imagining the difficulty, and the aggregate "postings are at baseline" story does not describe your market.

**Physical and operational roles are growing.** Production and manufacturing postings are up about 8% year over year, and loading and stocking up about 11%. The demand is real, it is just not where most white-collar job seekers are looking.

**Healthcare is normalising.** After years of outperforming, healthcare postings are beginning to fall in line with the rest of the market.

**Human resources postings are below pre-pandemic levels**, which is a compounding problem for job seekers: fewer recruiters processing a larger applicant pool means slower responses everywhere.

**AI-related postings are about 6.3% of all postings.** Growing, and worth noting, but not yet large enough to offset softness elsewhere. Where it does show up is in role requirements rather than role counts.

## The new graduate picture is genuinely difficult

This is where the numbers are worst, and where honest advice matters most.

As of Q2 2026, unemployment for recent college graduates sat around 5.6%, with underemployment near 42%. Recent computer engineering graduates faced roughly 7.5% unemployment and computer science graduates roughly 6.1%, against about 3.6% for college graduates overall.

Read that again: computer science, the degree that was marketed for a decade as the safe bet, now carries recent-graduate unemployment well above the college-graduate average.

Two forces are behind it. Employers are reducing entry-level headcount through a mix of attrition, fewer new openings, and selective cuts. And a growing share of postings that used to be genuinely entry-level now ask for three to five years of experience.

**What this means for you if you are a new grad:** the difficulty is structural, not personal. Rejections at this stage are largely a market condition. That does not make them feel better, but it should change your strategy: volume alone will not fix a structural shortage of entry points, and it burns you out. Precision and proof of ability will do more.

## Six strategies that follow from this data

**1. Target the experience-inflated postings anyway.** When a genuinely junior role asks for three to five years, that requirement is often aspirational. Employers routinely hire candidates below the stated bar when the applicant demonstrates the specific skills. Apply if you meet roughly 60% of the requirements, and address the gap directly in your cover letter rather than hoping it is not noticed.

**2. Fix your ATS match before you increase volume.** In a market with one opening per unemployed worker and fewer recruiters to read applications, the automated screen carries more weight than it did. Tailoring 20 applications to a strong keyword match beats sending 200 generic ones. Check your score against each specific job description before submitting.

**3. Go where the postings are.** If you are in software and open to adjacent paths, note that manufacturing, logistics, and operations are hiring. Internal tools, data, and automation roles inside those sectors are still technical work, and they are competing against a much smaller applicant pool than a consumer tech job posting.

**4. Treat referrals as the main channel, not the backup.** Low quits means fewer openings ever get posted publicly. Referrals and internal moves fill a larger share of what does open. A referral is worth more in a low-churn market than in a hot one, because the pipeline it bypasses is longer.

**5. Take the wage-growth data into your negotiation.** Posted wage growth of 2.5% against 3.4% inflation means employers are anchoring low and expecting acceptance. It also means the cost of not negotiating is higher than usual: a flat offer is a real pay cut. Negotiate, and use total compensation levers such as signing bonus and equity when base salary is inflexible.

**6. Assume a longer search and build for endurance.** With a hires rate of 3.4% and a vacancy-to-unemployment ratio of 1.0, timelines stretch. Plan for a search measured in months. Set weekly process targets you control, applications sent, conversations had, mocks completed, rather than outcome targets you do not control.

## What is genuinely different this year

**Entry-level compression is the defining feature.** The 2026 market is hardest at exactly the point where people enter it. Mid and senior candidates with specific in-demand skills still move, though more slowly than in 2021.

**Skills are being evaluated more explicitly.** With fewer openings and more applicants, employers are running more structured assessments. Interview performance carries more weight relative to resume pedigree than it did.

**The AI question shows up in interviews now.** For technical and analytical roles, candidates are increasingly asked how they use AI tools in their work. The strong answer is specific: what you use it for, where you do not trust it, and how you verify output. Vague enthusiasm or blanket dismissal both read poorly.

**Foreign-born labour force declines are shaping the supply side.** Part of the unemployment rate decline reflects a shrinking labour force rather than expanding employment, which matters for interpreting the headline number but does not change what a given job seeker should do.

## The honest summary

If you have a job in 2026, your risk of layoff is historically low, and your leverage to leave is also low.

If you are looking, the openings exist but the process is slow, and you are competing against a larger and more experienced pool than the posting suggests.

If you are graduating, the entry-level market is genuinely constrained, and the answer is not more applications. It is fewer, better-targeted applications, real proof of ability, referrals wherever you can find them, and preparation good enough that you convert the interviews you do get.

The candidates getting offers in this market are not the ones sending the most applications. They are the ones who match the keywords, get the referral, and are prepared enough to convert a scarce interview into an offer.

## How to prepare for a market like this

When interviews are scarce, conversion rate matters more than pipeline volume. Every interview you get needs to count.

Preciprocal's voice-based mock interviews put you in a realistic panel with follow-up questions and a detailed debrief, so your first live interview in months is not your first practice run. The resume analysis gives you an ATS score against each specific job description and tells you which keywords are missing. The cover letter generator writes tailored letters that address experience gaps directly. The job tracker and contact finder help you build the referral pipeline that matters most when few roles are posted publicly.

Start free at app.preciprocal.com. No credit card required.`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const ALL_BLOG_SLUGS = BLOG_POSTS.map((p) => p.slug);

// =============================================================================
// 8. FAQ DATA
// =============================================================================

export type FAQCategory = "general" | "pricing" | "interviews" | "resume" | "cover-letter" | "planner" | "technical";
export interface FAQItem { id: string; q: string; a: string; category: FAQCategory; }

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
  { id: "g1", category: "general",      q: "What is Preciprocal?",                           a: "Preciprocal is an AI-powered job search operating system. It combines resume analysis (ATS scoring, recruiter eye simulation, candidate benchmarking, interview intelligence), voice-based mock interviews with a multi-agent panel, cover letter generation, AI study planning, LinkedIn optimisation, cold outreach, and a job tracker with contact finder, all in one platform." },
  { id: "g2", category: "general",      q: "Who is Preciprocal for?",                        a: "Students, recent graduates, and early-career professionals preparing for any role: tech, finance, consulting, marketing, HR, healthcare, legal, and more. Every tool adapts to your target role and industry." },
  { id: "g3", category: "general",      q: "How do I get started?",                          a: "Sign up free at app.preciprocal.com, no credit card needed. Upload a resume and get your ATS score in 2 minutes, or jump straight into a mock interview. The platform walks you through everything." },
  { id: "g4", category: "general",      q: "Is there a mobile app?",                         a: "Not yet. Preciprocal is fully web-based and works on any device with a modern browser. A native app is on our roadmap." },
  { id: "g5", category: "general",      q: "How is this different from using ChatGPT?",      a: "ChatGPT is a general-purpose chatbot. Preciprocal is a purpose-built system with specialised AI agents for each task, ATS scoring calibrated against real hiring data, a multi-agent interview panel, recruiter eye-tracking simulation based on published research, and a full application pipeline." },
  { id: "g6", category: "general",      q: "Do you have a Chrome extension?",                a: "Yes. The Preciprocal Chrome extension lets you save jobs from LinkedIn and job boards with one click, auto-import job descriptions for resume tailoring, and track applications without leaving the page." },
  { id: "g7", category: "general",      q: "How many tools does Preciprocal include?",       a: "11 core tools: Resume Analysis (ATS + Benchmarking + Recruiter Sim + Interview Intel), Resume Tailoring, Mock Interviews, Cover Letter Generator, Study Planner, LinkedIn Optimiser, Cold Outreach Generator, Interview Debrief Journal, Job Tracker, Contact Finder, and Chrome Extension." },
  { id: "g8", category: "general",      q: "Does it work for non-tech roles?",               a: "Absolutely. Every tool adapts to your target role, whether you're applying for software engineering, finance, consulting, marketing, HR, healthcare, or any other field. The AI tailors its analysis, questions, and recommendations to the specific role and job description you provide." },
  { id: "p1", category: "pricing",      q: "Is Preciprocal really $9.99/mo?",                a: "Yes. Pro is $9.99/month (or $7.49/mo billed annually). We built Preciprocal for students and early-career professionals who can't afford $50-100/mo tools." },
  { id: "p2", category: "pricing",      q: "Do you offer a free plan?",                      a: "Yes. The free tier includes 5 resume analyses, 3 mock interviews, 5 cover letters, 2 LinkedIn optimisations, 1 interview debrief, 2 contact lookups, a 10-job tracker, and basic analytics per month. It's a real free plan, not a 7-day trial." },
  { id: "p3", category: "pricing",      q: "Is there a student discount?",                   a: "Students with a .edu email get 1 month of Pro completely free, no credit card required to activate." },
  { id: "p4", category: "pricing",      q: "What's the difference between Pro and Premium?", a: "Pro ($9.99/mo): 20 resume analyses, 30 mock interviews, unlimited cover letters, full resume editor, recruiter eye simulation, and complete analytics. Premium ($24.99/mo): unlimited everything, company-specific prep, advanced study planning, and a full LinkedIn rewrite." },
  { id: "p5", category: "pricing",      q: "Is there a money-back guarantee?",               a: "Yes, 30 days, no questions asked. If Preciprocal doesn't help your job search, email support@preciprocal.com for a full refund." },
  { id: "p6", category: "pricing",      q: "Can I cancel anytime?",                          a: "Yes. Cancel from Settings, Billing, Cancel Subscription. No fee, no waiting period. You keep access until the end of your billing period." },
  { id: "i1", category: "interviews",   q: "How do mock interviews work?",                   a: "Our voice-based interviews use a multi-agent AI system to simulate a real interview panel: HR screener, technical lead, and hiring manager. You speak into your mic, they respond with follow-up questions, and you get a detailed debrief with scoring across 5 dimensions." },
  { id: "i2", category: "interviews",   q: "Do I need a webcam?",                            a: "No. Mock interviews are voice-only, you just need a microphone. Your built-in laptop mic works fine." },
  { id: "i3", category: "interviews",   q: "What types of interviews can I practise?",       a: "Technical (coding + system design), behavioural (STAR method), case interviews (consulting), finance interviews (DCF, LBO), marketing strategy, and general screening. You can target specific companies and roles, select difficulty level, and the AI adjusts accordingly." },
  { id: "i4", category: "interviews",   q: "Can I practise for a specific company?",         a: "Yes. Enter the company name and role, and the AI tailors questions to that company's known interview style, values, and technical focus areas." },
  { id: "r1", category: "resume",       q: "What is ATS scoring?",                           a: "ATS (Applicant Tracking System) is the software used by most large employers to automatically filter resumes before a human sees them. Our ATS scorer analyses your resume across keyword matching, formatting compatibility, section structure, and header parsing, and gives you a score out of 100 with specific fixes." },
  { id: "r2", category: "resume",       q: "What is the Recruiter Eye Simulation?",          a: "Based on published eye-tracking research, we simulate how three reviewers approach your document: an HR screener (quick first pass), a technical lead (deeper skill evaluation), and a hiring manager (impact & leadership focus). You see an attention heatmap showing where each reviewer's eyes go and what gets missed." },
  { id: "r3", category: "resume",       q: "Can I tailor my resume to a specific job?",      a: "Yes. Paste a job description into the Tailor tab, and the AI rewrites specific bullets to better match, adjusting keywords, reframing experience, and prioritising relevant skills. Every change is shown in a clear 'original to rewrite' format for your approval." },
  { id: "c1", category: "cover-letter", q: "How does the cover letter generator work?",      a: "Paste a job description and the AI (1) researches the company in real-time, (2) analyses job requirements against your resume, and (3) writes a personalised letter connecting your experience to their needs, referencing real company details." },
  { id: "s1", category: "planner",      q: "How does the AI Study Planner work?",            a: "Enter your target role, interview date, current skill level, and daily time commitment. The AI generates a personalised day-by-day schedule with tasks, curated resources, daily quizzes, and an AI coach you can ask questions anytime." },
  // NOTE: t1 and t2 make legal commitments and must stay consistent with
  // app/privacy/page.tsx. The earlier wording claimed we "never share it with
  // third parties", which contradicted the Privacy Policy's own service
  // provider section and the analytics we actually run.
  { id: "t1", category: "technical",    q: "Is my data safe?",                               a: "Yes. All data is encrypted in transit (TLS 1.2 or higher) and at rest (AES-256). We never sell your data and never use it for advertising. We do share data with the service providers needed to run the platform, such as Stripe for payments, our hosting provider, and the AI APIs that generate your results, each under agreements barring them from retaining it to train models. Analytics providers receive data only if you accept analytics cookies. Our Privacy Policy names every provider we use." },
  { id: "t2", category: "technical",    q: "Do you use my resume to train AI models?",       a: "No. Your content is used to serve you, not to train models. We will not use your resume, cover letters or interview recordings to train, fine-tune or improve any AI model without your explicit opt-in, and our agreements with the AI providers we call prohibit them from retaining your content for training either." },
  { id: "t3", category: "technical",    q: "How do I contact support?",                      a: "Email support@preciprocal.com or use the in-app support widget in Settings, Support. We respond within 24 hours on weekdays." },
];

export const LANDING_FAQ_IDS = ["p1", "g5", "p2", "i1", "t1", "p5"] as const;
export const LANDING_FAQS = FAQS.filter((f) => (LANDING_FAQ_IDS as readonly string[]).includes(f.id));