/**
 * lib/roleContent.ts
 *
 * Per-role content for the three programmatic sections: /resume-tips/[role],
 * /salary-guide/[role] and /cover-letter-examples/[role].
 *
 * WHY THIS EXISTS
 * Those three templates previously had hand-written data for only a handful of
 * roles and fell back to a generic block for the rest, interpolating nothing but
 * the role name. The result was 113 pages that were 95-97% word-identical to one
 * another, which is why Google crawled them and declined to index them ("Crawled
 * - currently not indexed" in Search Console).
 *
 * The fix is to compose each page from three layers of genuinely role-specific
 * material rather than one generic template:
 *
 *   1. ROLE_KEYWORDS      — a real ATS keyword set per role (all 41 authored)
 *   2. CATEGORY_PROFILE   — framing that differs per job family, so a Paralegal
 *                           page and an SRE page share no structural advice
 *   3. ROLE_META          — salary range, six real top companies, related roles
 *                           (already in constants.ts, previously unused here)
 *
 * Two roles in different categories now share almost nothing. Two roles in the
 * same category share the category framing but differ in keywords, salary,
 * employers, and cross-links.
 *
 * When adding a role to ROLE_DISPLAY, add its keywords here too. A role with no
 * entry still renders, but it falls back to its category's keyword set and will
 * read closer to its siblings than it should.
 */

import { ROLE_DISPLAY, ROLE_QUESTIONS, getRoleMeta, type RoleQA, type RoleSlug } from "@/lib/constants";

// ─── Per-role ATS keywords ────────────────────────────────────────────────────
// These are the terms that actually appear in job descriptions for each role.
// This is the single strongest differentiator between two pages in the same
// category, and it is also the most useful part of the page for a reader.

export const ROLE_KEYWORDS: Record<string, string[]> = {
  // Engineering
  "software-engineer": ["Python", "Java", "Go", "TypeScript", "REST API", "microservices", "distributed systems", "CI/CD", "Docker", "Kubernetes", "system design", "unit testing"],
  "frontend-developer": ["React", "TypeScript", "Next.js", "CSS", "web accessibility", "WCAG", "Core Web Vitals", "responsive design", "state management", "component library", "bundle size", "cross-browser"],
  "backend-developer": ["REST API", "GraphQL", "PostgreSQL", "Redis", "message queues", "Kafka", "database indexing", "caching", "horizontal scaling", "idempotency", "rate limiting", "observability"],
  "full-stack-developer": ["React", "Node.js", "TypeScript", "PostgreSQL", "REST API", "authentication", "deployment", "Docker", "end-to-end testing", "CI/CD", "cloud hosting", "API design"],
  "ios-developer": ["Swift", "SwiftUI", "UIKit", "Xcode", "Core Data", "App Store Connect", "MVVM", "Combine", "push notifications", "TestFlight", "memory management", "accessibility"],
  "android-developer": ["Kotlin", "Jetpack Compose", "Android SDK", "MVVM", "Room", "Coroutines", "Gradle", "Play Console", "dependency injection", "Material Design", "ProGuard", "unit testing"],
  "machine-learning-engineer": ["PyTorch", "TensorFlow", "MLOps", "model deployment", "feature engineering", "model serving", "inference latency", "experiment tracking", "data pipelines", "A/B testing", "model monitoring", "fine-tuning"],
  "devops-engineer": ["Kubernetes", "Terraform", "CI/CD", "Docker", "AWS", "Ansible", "infrastructure as code", "Prometheus", "Grafana", "GitOps", "incident response", "cost optimisation"],
  "cloud-engineer": ["AWS", "Azure", "GCP", "Terraform", "IAM", "VPC", "serverless", "cloud migration", "cost optimisation", "high availability", "disaster recovery", "CloudFormation"],
  "site-reliability-engineer": ["SLO", "SLI", "error budget", "incident response", "on-call", "postmortem", "observability", "Prometheus", "capacity planning", "chaos engineering", "toil reduction", "runbook"],
  "cybersecurity-analyst": ["SIEM", "threat detection", "incident response", "vulnerability assessment", "penetration testing", "NIST", "SOC 2", "endpoint security", "phishing analysis", "risk assessment", "log analysis", "MITRE ATT&CK"],
  "data-engineer": ["Spark", "Airflow", "Kafka", "dbt", "Snowflake", "ETL", "data modeling", "data warehouse", "streaming pipelines", "partitioning", "data quality", "SQL optimisation"],

  // Data & Analytics
  "data-scientist": ["Python", "SQL", "scikit-learn", "A/B testing", "statistical modeling", "hypothesis testing", "regression", "causal inference", "pandas", "feature engineering", "experiment design", "data visualisation"],
  "data-analyst": ["SQL", "Excel", "Tableau", "Power BI", "dashboards", "cohort analysis", "data cleaning", "KPI reporting", "Python", "pivot tables", "stakeholder reporting", "funnel analysis"],

  // Product & Design
  "product-manager": ["product roadmap", "user research", "A/B testing", "OKRs", "KPIs", "backlog prioritisation", "go-to-market", "stakeholder management", "user stories", "DAU", "retention", "product strategy"],
  "ux-designer": ["Figma", "user research", "wireframing", "prototyping", "usability testing", "design system", "information architecture", "accessibility", "personas", "journey mapping", "interaction design", "design critique"],
  "technical-program-manager": ["program management", "cross-functional", "risk management", "dependency tracking", "roadmap", "stakeholder alignment", "technical requirements", "launch readiness", "status reporting", "RACI", "scope management", "agile"],

  // Architecture & IT
  "solutions-architect": ["solution design", "cloud architecture", "AWS", "integration patterns", "scalability", "technical documentation", "pre-sales", "proof of concept", "migration strategy", "security architecture", "cost modeling", "stakeholder workshops"],
  "it-manager": ["IT operations", "vendor management", "ITIL", "helpdesk", "asset management", "budget management", "SLA", "identity management", "endpoint management", "disaster recovery", "compliance", "team leadership"],

  // Business & Ops
  "business-analyst": ["requirements gathering", "process mapping", "stakeholder interviews", "SQL", "user acceptance testing", "gap analysis", "business requirements document", "process improvement", "data analysis", "workflow design", "JIRA", "documentation"],
  "project-manager": ["project planning", "agile", "Scrum", "budget management", "risk register", "stakeholder communication", "resource allocation", "Gantt", "JIRA", "change management", "status reporting", "PMP"],
  "operations-manager": ["process improvement", "KPI tracking", "capacity planning", "vendor management", "cost reduction", "SOP development", "team leadership", "forecasting", "quality control", "Lean", "Six Sigma", "workflow optimisation"],
  "supply-chain-analyst": ["demand forecasting", "inventory optimisation", "SAP", "procurement", "logistics", "supplier management", "lead time analysis", "cost analysis", "ERP", "S&OP", "warehouse management", "Excel modeling"],
  "management-consultant": ["case analysis", "market sizing", "financial modeling", "stakeholder interviews", "PowerPoint", "hypothesis-driven", "cost reduction", "operating model", "due diligence", "client workshops", "benchmarking", "change management"],

  // Finance
  "financial-analyst": ["financial modeling", "DCF", "variance analysis", "forecasting", "budgeting", "Excel", "P&L", "cash flow", "GAAP", "scenario analysis", "management reporting", "SQL"],
  "investment-banker": ["DCF", "LBO", "comparable companies", "precedent transactions", "pitch books", "due diligence", "M&A", "capital markets", "valuation", "financial modeling", "CIM", "deal execution"],
  "accounting-manager": ["month-end close", "GAAP", "reconciliations", "journal entries", "audit support", "internal controls", "SOX", "accounts payable", "accounts receivable", "financial reporting", "ERP", "team management"],
  "fp-and-a-analyst": ["budgeting", "forecasting", "variance analysis", "financial modeling", "management reporting", "KPI dashboards", "business partnering", "scenario planning", "Excel", "Anaplan", "headcount planning", "board reporting"],

  // Sales & Marketing
  "marketing-manager": ["go-to-market", "campaign management", "brand positioning", "content strategy", "marketing analytics", "budget management", "lead generation", "CRM", "segmentation", "attribution", "product marketing", "customer insights"],
  "digital-marketing-specialist": ["SEO", "SEM", "Google Ads", "Google Analytics", "paid social", "email marketing", "conversion rate optimisation", "A/B testing", "attribution", "HubSpot", "landing pages", "keyword research"],
  "sales-manager": ["quota attainment", "pipeline management", "forecasting", "Salesforce", "team coaching", "territory planning", "deal strategy", "MEDDIC", "win rate", "sales enablement", "account planning", "revenue growth"],
  "account-executive": ["quota attainment", "pipeline generation", "Salesforce", "discovery calls", "negotiation", "closing", "MEDDIC", "outbound prospecting", "ACV", "sales cycle", "renewals", "upsell"],
  "growth-hacker": ["growth experiments", "A/B testing", "funnel optimisation", "activation", "retention", "CAC", "LTV", "referral loops", "analytics", "cohort analysis", "landing page testing", "product-led growth"],
  "brand-manager": ["brand strategy", "positioning", "creative direction", "campaign management", "market research", "brand guidelines", "consumer insights", "agency management", "brand health", "go-to-market", "messaging", "budget management"],

  // People & HR
  "hr-manager": ["employee relations", "performance management", "HRIS", "Workday", "compensation benchmarking", "onboarding", "compliance", "FLSA", "workforce planning", "DEI", "policy development", "employee engagement"],
  "recruiter": ["full-cycle recruiting", "sourcing", "ATS", "Greenhouse", "candidate pipeline", "Boolean search", "offer negotiation", "time-to-fill", "candidate experience", "interview coordination", "LinkedIn Recruiter", "hiring manager partnership"],
  "talent-acquisition-specialist": ["sourcing strategy", "employer branding", "ATS", "pipeline building", "diversity sourcing", "recruiting metrics", "offer management", "talent mapping", "university recruiting", "candidate experience", "intake meetings", "time-to-hire"],

  // Healthcare
  "healthcare-administrator": ["patient care operations", "HIPAA", "regulatory compliance", "budget management", "staff scheduling", "quality improvement", "EHR", "Epic", "accreditation", "revenue cycle", "policy development", "care coordination"],
  "clinical-data-analyst": ["clinical data", "SQL", "EHR", "Epic", "HIPAA", "quality metrics", "SAS", "clinical reporting", "data validation", "patient outcomes", "regulatory reporting", "R"],

  // Legal
  "paralegal": ["legal research", "document review", "case management", "e-filing", "discovery", "deposition preparation", "contract review", "Westlaw", "LexisNexis", "trial preparation", "citation checking", "client communication"],
  "compliance-analyst": ["regulatory compliance", "risk assessment", "policy development", "audit support", "AML", "KYC", "SOX", "internal controls", "compliance monitoring", "regulatory reporting", "gap analysis", "remediation"],
};

// ─── Per-role notes ───────────────────────────────────────────────────────────
// Category profiles differentiate a Paralegal page from an SRE page, but they
// cannot separate two roles inside the same family — an Account Executive and a
// Sales Manager share a profile. These notes carry the role-specific substance
// that makes siblings genuinely different pages.
//
//   positioning — what distinguishes this role from its closest neighbours
//   screened    — what hiring managers uniquely probe for in this role
//   payNote     — what actually moves compensation for this specific role

interface RoleNote {
  positioning: string;
  screened: string;
  payNote: string;
}

export const ROLE_NOTES: Record<string, RoleNote> = {
  // Engineering
  "software-engineer": { positioning: "The generalist engineering role, which means the bar is breadth plus one area of genuine depth rather than narrow specialisation.", screened: "whether you can design a system from an ambiguous requirement and defend the trade-offs out loud", payNote: "Levelling is the dominant factor — the gap between L4 and L5 at a large tech company usually exceeds the gap between two different employers at the same level." },
  "frontend-developer": { positioning: "Judged on what users actually experience: rendering performance, accessibility and interaction quality, not just whether the component renders.", screened: "whether you understand the browser beneath the framework — rendering, layout, and bundle cost", payNote: "Depth in performance and accessibility pays above general React work, because far fewer candidates can evidence it." },
  "backend-developer": { positioning: "Measured on what happens under load and under failure, so data modelling and correctness matter more than feature velocity.", screened: "how you reason about consistency, retries and failure modes in a distributed setting", payNote: "Roles owning data-critical paths such as payments or auth pay above general API work at the same level." },
  "full-stack-developer": { positioning: "Valued for shipping a feature end to end without handoffs, which suits smaller teams where ownership spans the whole stack.", screened: "whether your breadth is real on both sides or genuinely deep on one and shallow on the other", payNote: "Pay tracks the stack half you are strongest in; startups pay a premium for genuine end-to-end ownership." },
  "ios-developer": { positioning: "A platform specialisation where App Store constraints, release cadence and device fragmentation shape the whole job.", screened: "memory management, lifecycle handling, and how you ship and roll back a release you cannot hotfix", payNote: "A smaller candidate pool than web keeps senior iOS compensation competitive even when general hiring slows." },
  "android-developer": { positioning: "Defined by device and OS fragmentation, which makes compatibility and performance across a wide hardware range a constant concern.", screened: "Kotlin depth, lifecycle correctness, and how you handle fragmentation without shipping three codebases", payNote: "Compose migration experience currently carries a premium as teams move off legacy View systems." },
  "machine-learning-engineer": { positioning: "Distinguished from data science by production ownership: serving, latency, monitoring and retraining rather than analysis.", screened: "whether you have shipped a model into production and kept it healthy afterwards, not just trained one", payNote: "One of the highest-paying engineering specialisations, and production ML ownership is the single largest differentiator within it." },
  "devops-engineer": { positioning: "Sits between development and operations, measured on deployment velocity and the reliability of the pipeline itself.", screened: "infrastructure-as-code fluency and how you have reduced toil rather than automated around it", payNote: "Kubernetes and Terraform depth remain the clearest premium; cost-optimisation wins are increasingly negotiable leverage." },
  "cloud-engineer": { positioning: "Focused on the platform layer — provisioning, networking, identity and cost — rather than the applications running on it.", screened: "depth in one cloud rather than shallow familiarity with three, plus real cost awareness", payNote: "Current certifications matter more here than in most engineering roles, and multi-cloud experience is genuinely scarce." },
  "site-reliability-engineer": { positioning: "An engineering role defined by error budgets and operational rigour, where reducing toil counts as much as shipping features.", screened: "how you have run incidents and what you changed afterwards, evidenced through real postmortems", payNote: "On-call load is compensated differently across companies and is a legitimate, often overlooked negotiation point." },
  "cybersecurity-analyst": { positioning: "Split between detection work and compliance work, and the two career tracks diverge sharply in tooling and pay.", screened: "practical detection and response experience rather than certification lists alone", payNote: "Clearances and specialised incident-response experience command the steepest premiums in this field." },
  "data-engineer": { positioning: "Owns the reliability and shape of data that everyone downstream depends on, so correctness beats cleverness.", screened: "how you handle schema evolution, late data and pipeline failures without silent corruption", payNote: "Streaming experience pays above batch-only work, and warehouse cost ownership is increasingly part of the role." },

  // Data & Analytics
  "data-scientist": { positioning: "Distinguished from analytics by inference and experimentation — causality and uncertainty, not just reporting what happened.", screened: "experimental design and whether you can identify when a result is not actually significant", payNote: "Product data science and research science are different markets; production modelling pulls pay toward ML engineering bands." },
  "data-analyst": { positioning: "The role closest to the business question, judged on speed and clarity rather than modelling sophistication.", screened: "SQL fluency under pressure and whether you can turn a vague question into a defined metric", payNote: "The widest band in analytics — moving into product analytics or experimentation raises pay substantially." },

  // Product & Design
  "product-manager": { positioning: "Accountable for outcomes without owning the people who produce them, so influence is the core mechanic of the job.", screened: "product judgement — why this problem, why now, and what you chose not to build", payNote: "Owning a revenue surface rather than an internal tool is the largest single factor in the band." },
  "ux-designer": { positioning: "Evaluated primarily through the portfolio, where reasoning and process matter more than final visual polish.", screened: "whether your case studies show research and iteration or only the finished screens", payNote: "Product design pays above visual design; design systems and research specialisations carry their own premium." },
  "technical-program-manager": { positioning: "Owns execution across teams that do not report to you, making dependency and risk management the actual craft.", screened: "how you surfaced and resolved a cross-team dependency before it slipped the date", payNote: "TPM bands track engineering closely at large tech companies, and technical depth is what unlocks the upper half." },

  // Architecture & IT
  "solutions-architect": { positioning: "Straddles engineering and the customer, so persuasion and documentation matter as much as the design itself.", screened: "whether you can defend a design to both engineers and executives in the same conversation", payNote: "Pre-sales facing roles add variable compensation, which changes the shape of the offer considerably." },
  "it-manager": { positioning: "Runs the internal technology estate, judged on uptime, security posture and spend rather than shipped features.", screened: "vendor negotiation, budget ownership, and how you handled a major outage or migration", payNote: "Headcount and budget under management drive the band far more than technical depth does." },

  // Business & Ops
  "business-analyst": { positioning: "The translation layer between business intent and technical delivery, where requirement clarity is the deliverable.", screened: "whether you can elicit real requirements from stakeholders who disagree with each other", payNote: "Technical BAs who write SQL and own data models earn materially above pure documentation roles." },
  "project-manager": { positioning: "Owns delivery against scope, time and budget, with the discipline living in risk and change management.", screened: "how you recovered a project that was slipping, specifically what you cut or renegotiated", payNote: "Industry drives this band more than title — construction, pharma and tech pay very differently for identical scope." },
  "operations-manager": { positioning: "Accountable for throughput and cost of a running function, so improvement is measured in sustained deltas.", screened: "a process you changed and whether the improvement held six months later", payNote: "Scope — sites, headcount and budget — determines the band more than sector or tooling." },
  "supply-chain-analyst": { positioning: "Balances inventory cost against service level, a trade-off that defines nearly every decision in the role.", screened: "forecasting accuracy and how you handled a genuine disruption to supply", payNote: "ERP depth, particularly SAP, is the clearest premium; manufacturing and retail pay differently for the same work." },
  "management-consultant": { positioning: "Sold on structured problem solving under time pressure, with communication weighted as heavily as analysis.", screened: "case structuring live, and whether you can defend a recommendation you formed in minutes", payNote: "Firm tier dominates everything else, and the progression is steep and highly structured by year." },

  // Finance
  "financial-analyst": { positioning: "Supports decisions through modelling and variance discipline, where accuracy is assumed and insight differentiates.", screened: "model build quality and whether you can explain what drives the output, not just produce it", payNote: "Industry matters more than title; the CFA carries a clear and measurable premium in this band." },
  "investment-banker": { positioning: "Defined by transaction execution under sustained deadline pressure, where deal exposure is the career currency.", screened: "technical valuation depth and evidence of real deal exposure rather than coursework", payNote: "Bonus routinely exceeds base at senior levels, so the headline base figure understates the package considerably." },
  "accounting-manager": { positioning: "Owns close accuracy and control integrity, where the deliverable is a clean, on-time, auditable result.", screened: "close cycle ownership, audit outcomes, and how you handled a material control weakness", payNote: "The CPA is close to a prerequisite above a certain level and carries a distinct premium below it." },
  "fp-and-a-analyst": { positioning: "The forward-looking counterpart to accounting, valued for business partnering as much as modelling accuracy.", screened: "forecast accuracy and whether operational leaders actually used your analysis to decide something", payNote: "Business-partnering roles pay above pure reporting; board-facing exposure accelerates the band notably." },

  // Sales & Marketing
  "marketing-manager": { positioning: "Owns a channel or segment outcome, with the constant challenge of attributing results to activity.", screened: "attribution — whether you can connect what you ran to pipeline that closed", payNote: "Owning a pipeline number rather than a brand metric pulls compensation toward revenue bands." },
  "digital-marketing-specialist": { positioning: "The most directly measurable marketing role, judged on channel economics and conversion efficiency.", screened: "channel depth and whether you have managed real budget against a CAC target", payNote: "Paid acquisition experience with meaningful budget pays above organic-only backgrounds." },
  "sales-manager": { positioning: "Carries a team number rather than a personal one, so coaching and forecast accuracy become the core skills.", screened: "team attainment, forecast accuracy, and how you turned around an underperforming rep", payNote: "Team size and segment set the band; forecast reliability is what earns the larger territory." },
  "account-executive": { positioning: "Owns an individual number end to end, from pipeline generation through close, with attainment as the sole headline metric.", screened: "attainment history with quota size attached, and whether you self-generated pipeline", payNote: "Segment and deal size drive OTE more than title; the base-to-variable split is genuinely negotiable." },
  "growth-hacker": { positioning: "Sits between product and marketing, defined by experiment throughput across the whole funnel rather than one channel.", screened: "experiment velocity and whether your wins compounded or were one-off spikes", payNote: "Product-led growth experience pays above channel marketing; equity is often a larger component here." },
  "brand-manager": { positioning: "Owns positioning and long-term brand equity, where the outcomes are slower and harder to attribute than performance marketing.", screened: "whether you can connect brand work to a commercial result rather than awareness alone", payNote: "CPG and consumer brands pay differently from tech; agency management scope influences the band." },

  // People & HR
  "hr-manager": { positioning: "Balances employee advocacy against organisational risk, and the judgement in that tension is the job.", screened: "how you handled a genuinely difficult employee relations matter end to end", payNote: "Headcount supported sets the band; compensation and employee relations specialisms pay above generalist work." },
  recruiter: { positioning: "Measured on throughput and quality of hire simultaneously, with the tension between them defining the role.", screened: "time-to-fill and offer acceptance rates, plus how you handled a hiring manager who kept rejecting the pipeline", payNote: "Technical and executive recruiting pay well above generalist; agency and in-house structures differ substantially." },
  "talent-acquisition-specialist": { positioning: "More strategic than transactional recruiting, weighted toward pipeline building and employer brand over req closing.", screened: "sourcing strategy for a scarce profile and how you built a pipeline before the req opened", payNote: "Specialised sourcing for scarce technical profiles commands the clearest premium in this family." },

  // Healthcare
  "healthcare-administrator": { positioning: "Runs clinical operations inside hard regulatory constraints, where compliance is a precondition rather than a goal.", screened: "regulatory fluency alongside evidence of operational improvement that clinicians accepted", payNote: "Facility size and type dominate; revenue cycle ownership pays above general administration." },
  "clinical-data-analyst": { positioning: "Combines clinical domain knowledge with analytics, a pairing that is genuinely scarce in the hiring market.", screened: "whether you understand clinical data quality problems rather than treating EHR data as clean", payNote: "The clinical-plus-technical combination is scarce enough to pay above general analytics roles." },

  // Legal
  paralegal: { positioning: "Practice area defines the job almost entirely — litigation and corporate support share very little day to day.", screened: "practice area match and evidence of accuracy under filing deadlines", payNote: "Large firms and in-house teams pay well above small practices; specialisation raises the band further." },
  "compliance-analyst": { positioning: "Sits between legal and operations, translating regulation into controls the business will actually follow.", screened: "specific regulatory frameworks you have worked under and a remediation you drove to completion", payNote: "Financial services compliance pays above most other sectors, and AML and KYC depth is consistently in demand." },
};

// ─── Category profiles ────────────────────────────────────────────────────────
// Framing that genuinely differs per job family. This is what stops an
// Account Executive page from reading like a Site Reliability Engineer page.

interface CategoryProfile {
  /** How this field measures a strong candidate on paper */
  provesValue: string;
  /** The shape of a strong resume bullet in this field */
  bulletFormula: string;
  /** What hiring managers in this field screen for first */
  screeningFocus: string;
  /** Resume advice specific to the job family */
  resumeSections: { title: string; body: string }[];
  /** Mistakes that are specific to this field, not generic resume advice */
  commonMistakes: string[];
  /** What actually moves compensation in this field */
  payDrivers: string[];
  /** What a cover letter in this field has to establish */
  coverLetterAngle: string;
}

const CATEGORY_PROFILES: Record<string, CategoryProfile> = {
  Engineering: {
    provesValue: "systems you built and the measurable behaviour of those systems in production",
    bulletFormula: "Action verb + what you built + the technology + the production metric that moved",
    screeningFocus: "technical depth and whether you have operated something real at scale",
    resumeSections: [
      { title: "Lead with systems, not tickets", body: "Engineering resumes fail when they read as a list of tasks completed. A hiring manager wants to know what you built, what it had to survive, and how you knew it worked. 'Implemented caching' says nothing; 'introduced a Redis read-through cache that cut p99 latency from 800ms to 120ms at 2M daily requests' is a technical conversation starter." },
      { title: "Name the production reality", body: "Scale, traffic, data volume, and uptime are the numbers that separate engineers who have run systems from those who have only written code. If you cannot share exact figures, approximate honestly: 'roughly 40k requests/minute at peak' is far better than silence." },
      { title: "Make your stack scannable", body: "A recruiter screens for stack match in seconds and an ATS matches literally. Group your skills by Languages, Frameworks, Infrastructure, and Data, list your genuinely strong ones first, and make sure the technologies in your bullets also appear in the skills block." },
      { title: "Show ownership beyond the code", body: "On-call rotations, incident response, design docs, code review, and mentoring all signal seniority more reliably than another framework name. One bullet about a system you owned end-to-end, including its failures, is worth three about features you shipped." },
    ],
    commonMistakes: [
      "Listing technologies you touched once — every item on your resume is fair game in the interview",
      "Describing team output as though it were yours, which collapses under one follow-up question",
      "No scale or performance numbers anywhere, leaving the reader unable to calibrate your level",
      "A visually complex two-column template that ATS parsers mangle into unreadable text",
      "Burying the projects section, which is often the strongest signal for junior engineers",
    ],
    payDrivers: [
      "Company tier and funding stage — the same title varies enormously between a Series A startup and a public tech company",
      "Location, even for remote roles, since most companies still band pay geographically",
      "Depth in a scarce specialisation such as distributed systems, ML infrastructure, or security",
      "Equity, which at senior levels frequently exceeds the difference in base salary between offers",
    ],
    coverLetterAngle: "one specific technical problem you solved that resembles what this team is working on",
  },

  "Data & Analytics": {
    provesValue: "decisions that changed because of analysis you produced",
    bulletFormula: "Analysis you ran + the method + the decision it drove + the business outcome",
    screeningFocus: "statistical rigour paired with evidence that stakeholders acted on your work",
    resumeSections: [
      { title: "End every bullet at the decision", body: "The most common failure in analytics resumes is stopping at the deliverable. 'Built a churn dashboard' is output. 'Built a churn model that identified the 8% of accounts driving 40% of revenue loss, prompting a retention campaign that recovered $1.2M ARR' is impact. The second sentence is what gets you interviewed." },
      { title: "Be precise about method", body: "Say which technique you used and why. Logistic regression, causal inference, difference-in-differences, or a simple cohort analysis all signal different depth. Vague phrasing like 'used data science to improve outcomes' reads as someone who cannot defend their own work." },
      { title: "SQL is assumed, so differentiate above it", body: "Every candidate lists SQL. What separates people is the difficulty of the questions they answered with it: experiment design, data quality problems you found and fixed, metric definitions you owned, or a pipeline you built to make the analysis repeatable." },
      { title: "Show stakeholder fluency", body: "Analytics roles are as much about translation as computation. Mention who consumed your work and how you communicated it: an exec readout, a self-serve dashboard adopted by a team, or a metric definition that became the company standard." },
    ],
    commonMistakes: [
      "Listing tools rather than the questions you used them to answer",
      "No mention of whether anyone acted on the analysis you produced",
      "Vague method language that suggests you cannot defend the technique in an interview",
      "Omitting data scale, which makes a spreadsheet project indistinguishable from a warehouse-scale one",
      "Treating dashboards as the achievement rather than the decisions they enabled",
    ],
    payDrivers: [
      "Whether the role is closer to product analytics, ML modeling, or business reporting — modeling-heavy work pays more",
      "Industry, with tech and finance paying well above healthcare and non-profit for identical skills",
      "Production ownership: analysts who ship models into production earn closer to engineering bands",
      "Domain expertise in a regulated or specialised field, which is much harder to hire for",
    ],
    coverLetterAngle: "an analysis you ran end to end and the decision it changed",
  },

  "Product & Design": {
    provesValue: "outcomes for users and the business, not features shipped",
    bulletFormula: "What you shipped or designed + the user problem + the metric that moved + magnitude",
    screeningFocus: "judgement — why you chose this problem over the alternatives",
    resumeSections: [
      { title: "Outcome first, feature second", body: "The single biggest weakness in product and design resumes is describing what was built. 'Redesigned the onboarding flow' is output. 'Redesigned onboarding after research showed 60% drop-off at step three, cutting time-to-first-value from 8 minutes to 2.5 and lifting D7 retention 22%' shows research, judgement and result in one line." },
      { title: "Show the judgement, not just the execution", body: "Anyone can execute a roadmap handed to them. What gets you hired is evidence you decided what to build. Reference something you deprioritised or killed, and why — it demonstrates the reasoning that interviewers spend the entire loop probing for." },
      { title: "Speak the right metric dialect", body: "Consumer roles want engagement, retention and DAU/MAU. B2B roles want ARR, churn, expansion and NPS. Platform roles want adoption and developer velocity. Read the posting and mirror its vocabulary, because using the wrong dialect signals a mismatch before anyone reads your bullets." },
      { title: "Designers: your portfolio carries the weight", body: "For design roles the resume exists to get someone to open your portfolio. Make the link unmissable, and make sure each case study shows process rather than only final visuals: the problem, the research, what you tried, what failed, and what shipped." },
    ],
    commonMistakes: [
      "Listing features shipped with no indication of whether they worked",
      "No numbers at all, which is fatal in a field evaluated on metrics",
      "Claiming credit ambiguously in work that was obviously cross-functional",
      "Design-heavy resume templates with icons and charts that ATS cannot parse",
      "A portfolio link that is broken, gated, or buried at the bottom of the page",
    ],
    payDrivers: [
      "Product surface — revenue-owning and platform roles pay above internal tools work",
      "Company stage, with late-stage and public companies paying materially more than seed startups",
      "Technical depth for PM roles, which unlocks the higher-paying technical PM and TPM bands",
      "Scope: number of engineers supported and whether you own a P&L line",
    ],
    coverLetterAngle: "a product decision you made and the reasoning behind it",
  },

  "Architecture & IT": {
    provesValue: "systems and services you designed or ran, and their reliability and cost",
    bulletFormula: "What you designed or ran + the constraint + the reliability, cost or adoption result",
    screeningFocus: "breadth across the stack plus evidence you can talk to non-technical stakeholders",
    resumeSections: [
      { title: "Lead with the constraint you solved for", body: "Architecture is the discipline of trade-offs, so state the constraint: cost, latency, compliance, migration risk, or headcount. 'Designed a multi-region failover architecture meeting a 15-minute RTO for a regulated workload' communicates far more than 'designed cloud architecture'." },
      { title: "Quantify in money and uptime", body: "These roles are judged on availability and spend. Percentage uptime, incident reduction, migration timelines, and annual infrastructure cost savings are the numbers that matter, and they are unusually persuasive because they are directly comparable across candidates." },
      { title: "Show the stakeholder half of the job", body: "Architects and IT managers spend much of their time with vendors, finance, security and executives. Mention proposals you defended, vendor negotiations you led, and technical decisions you had to justify to non-technical leadership." },
      { title: "Name your platforms explicitly", body: "This field screens hard on platform match. Name the clouds, the identity providers, the ITSM tooling, and the compliance regimes you have worked under — these are literal ATS matches and genuine differentiators." },
    ],
    commonMistakes: [
      "Describing architecture in abstractions with no concrete platforms or numbers attached",
      "Omitting cost outcomes, which is often the primary metric leadership cares about",
      "No evidence of stakeholder or vendor management, which is half the role at senior level",
      "Failing to mention compliance and security context in regulated environments",
      "Listing certifications without any accompanying delivery evidence",
    ],
    payDrivers: [
      "Cloud platform depth and current certifications, which are unusually well rewarded here",
      "Industry regulation — finance and healthcare pay a premium for compliance-aware architects",
      "Whether the role is pre-sales facing, which typically adds a variable compensation component",
      "Team and budget size under your ownership",
    ],
    coverLetterAngle: "an architecture or infrastructure decision you owned and its measurable result",
  },

  "Business & Ops": {
    provesValue: "processes you improved and the time, cost or error rate that fell as a result",
    bulletFormula: "Process you changed + the method + the efficiency or cost outcome + scale affected",
    screeningFocus: "structured thinking and evidence you drove change without direct authority",
    resumeSections: [
      { title: "Quantify the before and after", body: "Operations work is measured in deltas. Every meaningful bullet should carry a before-and-after: cycle time reduced from 12 days to 4, error rate down from 8% to 1.2%, or annual spend cut by $340k. Without both numbers the reader cannot judge the size of the improvement." },
      { title: "Name the method", body: "Say how you did it. Process mapping, root cause analysis, Lean, Six Sigma, a systems migration, or a redesigned approval workflow. The method signals whether you improvise or work from a repeatable discipline, and interviewers probe hard on this." },
      { title: "Show influence without authority", body: "Most operational improvement requires changing behaviour in teams you do not manage. Explicitly describe how many people or which functions were affected, and how you got them to adopt the change. This is the hardest part of the job and the least commonly evidenced on resumes." },
      { title: "Make scale legible", body: "A process serving 8 people and one serving 800 are different jobs. State headcount affected, transaction volumes, budget size, or number of sites, so the reader can calibrate the complexity you have handled." },
    ],
    commonMistakes: [
      "Describing duties held rather than changes made",
      "Improvement claims with no baseline, making the result impossible to interpret",
      "No indication of scale, which flattens a large programme into a small one",
      "Omitting the tools and systems you worked in, which are direct ATS matches",
      "Failing to show cross-functional influence, the core competency being screened for",
    ],
    payDrivers: [
      "Scope of ownership — headcount, budget and number of sites drive the band more than title",
      "Industry margin, with tech and pharma paying well above retail and non-profit",
      "Specialised systems expertise such as SAP or a major ERP, which commands a clear premium",
      "Whether the role owns a cost centre or a P&L",
    ],
    coverLetterAngle: "a process you fixed, how you got people to adopt it, and what improved",
  },

  Finance: {
    provesValue: "deal sizes, budgets and portfolios you worked on, and the decisions your analysis supported",
    bulletFormula: "Analysis or model you built + the transaction or budget size + the decision it informed",
    screeningFocus: "technical modeling ability and the magnitude of what you have handled",
    resumeSections: [
      { title: "Sizes are the currency of this field", body: "Finance resumes are read for magnitude. Deal size, budget owned, portfolio value, revenue supported, headcount in scope. 'Built a DCF model' is unremarkable; 'built the DCF supporting a $340M acquisition, including three downside scenarios presented to the investment committee' is a different candidate entirely." },
      { title: "Name the model types explicitly", body: "DCF, LBO, three-statement, merger and accretion-dilution, sensitivity and scenario analysis are all literal ATS matches and genuine skill signals. Generic 'financial modeling' tells a reviewer nothing about your actual depth." },
      { title: "Excel is table stakes, so go further", body: "Everyone lists Excel. Distinguish yourself with specifics — pivot tables, Power Query, VBA — and then the tooling above it: SQL, Python, Bloomberg, FactSet, Capital IQ, or your ERP for corporate finance roles." },
      { title: "Tailor for buy-side, sell-side or corporate", body: "These are three different jobs. Buy-side wants modeling depth and investment judgement. Sell-side wants pitch books, coverage and client execution. Corporate finance wants business partnering, budget ownership and variance discipline. Match the posting or you read as unfocused." },
    ],
    commonMistakes: [
      "Omitting deal, budget or portfolio sizes, which is the primary calibration signal in finance",
      "Generic modeling language that does not name a single model type",
      "No mention of which decision or transaction your analysis actually supported",
      "Failing to distinguish buy-side, sell-side and corporate experience for the target role",
      "Under-selling Excel depth in junior roles, where it remains the core screening tool",
    ],
    payDrivers: [
      "Sector — investment banking and private equity sit far above corporate FP&A for equivalent tenure",
      "Bonus structure, which at senior levels often exceeds base salary and varies enormously by firm",
      "Certifications, with the CFA and CPA carrying real, measurable premiums",
      "Firm tier and location, particularly the gap between money-centre cities and regional offices",
    ],
    coverLetterAngle: "a transaction or analysis you contributed to and the decision it supported",
  },

  "Sales & Marketing": {
    provesValue: "revenue, pipeline and growth numbers attributable to your work",
    bulletFormula: "What you ran + the audience or territory + the revenue, pipeline or conversion result",
    screeningFocus: "quota and target attainment, stated plainly and in percentage terms",
    resumeSections: [
      { title: "Lead with attainment", body: "Sales resumes are read for one thing first: did you hit your number. State quota attainment as a percentage, with the quota size and the period. '127% of a $1.4M annual quota, ranked 3 of 22 on the team' answers the only question the screener has, and answers it in the first bullet." },
      { title: "Show the whole funnel, not just the close", body: "Strong candidates evidence pipeline generation as well as closing: outbound activity, meetings booked, conversion by stage, average deal size, and sales cycle length. This distinguishes someone who inherited a strong territory from someone who built one." },
      { title: "Marketing: attribute or it did not happen", body: "Marketing resumes fail on attribution. Connect activity to outcome: leads generated, cost per acquisition, pipeline sourced, conversion lift, or organic traffic growth. 'Managed social media accounts' is a duty; 'grew organic pipeline 3.2x to $4.1M sourced ARR in 14 months' is a result." },
      { title: "Name your systems and methodology", body: "Salesforce, HubSpot, Outreach, Marketo, and methodologies like MEDDIC or Challenger are direct ATS matches and shorthand for how you work. Include the CRM you actually lived in every day." },
    ],
    commonMistakes: [
      "Omitting quota attainment, which reads as though you missed",
      "Percentages without the underlying quota size, which makes them impossible to interpret",
      "Marketing activity described with no attribution to pipeline or revenue",
      "No mention of territory, segment or average deal size, so the reader cannot calibrate the role",
      "Claiming team results without clarifying your individual contribution",
    ],
    payDrivers: [
      "On-target earnings split — the base-to-variable ratio matters as much as the headline number",
      "Segment, with enterprise roles paying well above SMB for the same title",
      "Deal size and sales cycle length, which drive the whole compensation band",
      "Marketing: whether the role owns pipeline targets, which pulls pay toward revenue bands",
    ],
    coverLetterAngle: "a number you hit and the specific approach that got you there",
  },

  "People & HR": {
    provesValue: "hiring, retention and engagement outcomes you can attach numbers to",
    bulletFormula: "Programme you ran + the population it covered + the hiring, retention or engagement metric",
    screeningFocus: "operational rigour plus judgement in genuinely sensitive situations",
    resumeSections: [
      { title: "HR is measurable, so measure it", body: "People roles are frequently written as duties because the outcomes feel soft. They are not. Time-to-fill, offer acceptance rate, first-year attrition, engagement scores, and internal mobility are all real numbers. 'Reduced time-to-fill from 52 to 31 days across 40 technical roles' is a far stronger claim than 'managed recruiting'." },
      { title: "State the population you supported", body: "Supporting 40 employees and supporting 4,000 are different jobs requiring different systems. Give headcount, number of locations, and whether the population was technical, hourly, unionised or international, because each changes the complexity substantially." },
      { title: "Name your systems", body: "Workday, BambooHR, Greenhouse, Lever, and Ashby are literal ATS matches, and the systems you have administered signal your operational level. For recruiting roles, the ATS you worked in daily is one of the first filters applied." },
      { title: "Show judgement in hard situations", body: "The differentiator at senior level is handling genuinely difficult matters: investigations, restructures, performance exits, and compliance issues. Reference these carefully and without identifying detail, but do reference them — they are what separates coordination from partnership." },
    ],
    commonMistakes: [
      "Writing the role as duties because the outcomes seem hard to quantify",
      "No headcount or population context, which flattens scope entirely",
      "Omitting the HRIS or ATS, which are among the first filters in this field",
      "No evidence of handling sensitive matters, the core senior-level competency",
      "Generic DEI mentions with no programme or measurable outcome attached",
    ],
    payDrivers: [
      "Company size and headcount supported, the primary determinant of the band",
      "Specialisation — compensation, HRIS and employee relations pay above generalist roles",
      "Industry, with tech paying well above non-profit and public sector for identical scope",
      "Whether the role is a strategic business partner or transactional support",
    ],
    coverLetterAngle: "a people programme you ran and the measurable outcome it produced",
  },

  Healthcare: {
    provesValue: "patient outcomes, compliance records and operational efficiency you contributed to",
    bulletFormula: "What you managed or analysed + the patient or operational scale + the quality or cost outcome",
    screeningFocus: "regulatory fluency alongside operational competence",
    resumeSections: [
      { title: "Compliance fluency is a screening gate", body: "Healthcare resumes are filtered on regulatory literacy before anything else. HIPAA, Joint Commission accreditation, CMS requirements and state regulations are not decoration — they are prerequisites, and their absence reads as inexperience regardless of your actual background." },
      { title: "Quantify in patients and outcomes", body: "State patient volumes, bed counts, department size, or records handled. Then attach the outcome: readmission rates, wait times, patient satisfaction scores, or audit results. These numbers are the field's common language and they travel well between employers." },
      { title: "Name your clinical systems", body: "Epic, Cerner, Meditech and the specific modules you have worked in are heavily screened. For analytics roles add SQL, SAS or R alongside the clinical systems, since the combination is genuinely scarce and worth surfacing." },
      { title: "Show the cross-functional reality", body: "Healthcare operations sit between clinical staff, administration and compliance. Evidence of working across all three — a protocol you implemented with clinician buy-in, an audit you led — signals you understand the actual constraints of the environment." },
    ],
    commonMistakes: [
      "No regulatory or compliance vocabulary, which fails the first screen",
      "Omitting facility size and patient volume, leaving scope unclear",
      "Listing clinical systems without naming the modules or your depth in them",
      "Operational claims with no quality or outcome metric attached",
      "Neglecting to mention accreditation or audit involvement, which carries real weight",
    ],
    payDrivers: [
      "Facility type and size, with large hospital systems paying above clinics and practices",
      "Geographic region, where healthcare pay varies more sharply than most fields",
      "Clinical credentials or licensure alongside administrative experience",
      "Specialisation in revenue cycle, informatics or compliance, all of which pay above general administration",
    ],
    coverLetterAngle: "an operational or quality improvement you delivered inside real regulatory constraints",
  },

  Legal: {
    provesValue: "matters supported, accuracy under deadline, and risk you helped avoid",
    bulletFormula: "Matter or programme + the volume or complexity + the accuracy, timeline or risk outcome",
    screeningFocus: "precision, discretion, and familiarity with the relevant practice area",
    resumeSections: [
      { title: "Practice area is the first filter", body: "Legal roles screen on domain before anything else. Litigation, corporate, immigration, IP, employment and regulatory compliance are effectively different professions. Name your practice areas prominently and match the posting, because a generalist framing reads as a weaker fit than it usually is." },
      { title: "Volume and complexity are your metrics", body: "Quantify what you handled: number of matters supported, documents reviewed, filings prepared, or contracts processed, along with deadline pressure and case complexity. 'Managed document review across 40,000 documents for a multi-district litigation' establishes scale immediately." },
      { title: "Name your research and case tools", body: "Westlaw, LexisNexis, Relativity, e-filing systems and contract lifecycle management platforms are direct ATS matches. For compliance roles add the regulatory frameworks — AML, KYC, SOX, GDPR — that you have worked under." },
      { title: "Accuracy and discretion are the whole job", body: "Evidence of error-free filing records, audit outcomes, or handling privileged and confidential material speaks directly to what this field screens for. A clean record under deadline pressure is the strongest signal you can offer." },
    ],
    commonMistakes: [
      "No practice area specified, which reads as an unfocused generalist",
      "Matter volumes and complexity omitted, leaving experience level unclear",
      "Research platforms and e-filing systems missing, which are hard ATS filters",
      "No evidence of accuracy or deadline performance, the field's core competency",
      "Over-explaining routine duties while under-selling the complex matters you supported",
    ],
    payDrivers: [
      "Firm type — large law firms and in-house corporate roles pay well above small practices",
      "Practice area, with corporate, IP and regulatory compliance commanding clear premiums",
      "Certifications and specialised training relevant to the practice area",
      "Geographic market, where legal pay differs sharply between major and regional markets",
    ],
    coverLetterAngle: "a matter you supported and how your accuracy or judgement affected its outcome",
  },
};

// A last-resort profile. Every current category is covered above, so this only
// applies if a new category is added to ROLE_DISPLAY without a profile here.
const DEFAULT_PROFILE: CategoryProfile = CATEGORY_PROFILES["Business & Ops"];

// ─── Public accessors ─────────────────────────────────────────────────────────

export interface RoleContent {
  slug: string;
  name: string;
  category: string;
  salaryRange: string;
  topCompanies: string[];
  relatedRoles: RoleSlug[];
  keywords: string[];
  profile: CategoryProfile;
  note: RoleNote;
}

/** Used only if a role is added to ROLE_DISPLAY without a ROLE_NOTES entry. */
const DEFAULT_NOTE: RoleNote = {
  positioning: "Evaluated on the outcomes you owned rather than the duties you held.",
  screened: "evidence that you drove a result rather than participated in one",
  payNote: "Scope of ownership and industry drive the band more than job title alone.",
};

/**
 * Everything the three programmatic sections need for one role, composed from
 * the role's own keyword set, its category profile, and ROLE_META. Returns null
 * for an unknown slug so callers can notFound().
 */
export function getRoleContent(slug: string): RoleContent | null {
  const display = ROLE_DISPLAY[slug];
  if (!display) return null;

  const meta = getRoleMeta(slug);
  const profile = CATEGORY_PROFILES[display.category] ?? DEFAULT_PROFILE;

  // Fall back to a sibling role's keywords only if this slug has no set of its
  // own. Every role in ROLE_DISPLAY should have one; this keeps the page alive
  // if someone adds a role and forgets.
  const keywords =
    ROLE_KEYWORDS[slug] ??
    Object.entries(ROLE_KEYWORDS).find(([s]) => ROLE_DISPLAY[s]?.category === display.category)?.[1] ??
    [];

  return {
    slug,
    name: display.name,
    category: display.category,
    salaryRange: meta.salaryRange,
    topCompanies: meta.topCompanies,
    relatedRoles: meta.relatedRoles,
    keywords,
    profile,
    note: ROLE_NOTES[slug] ?? DEFAULT_NOTE,
  };
}

// ─── Interview questions ──────────────────────────────────────────────────────

/**
 * Role-specific interview Q&A.
 *
 * ROLE_QUESTIONS in constants.ts covers 20 of the 41 roles. The other 21 were
 * falling back to a generic set that interpolated only the role name, which made
 * those pages 92% word-identical to each other — the same defect that kept the
 * resume-tips and salary-guide sections out of Google's index.
 *
 * Hand-written questions always win. For the rest, this composes questions from
 * the role's own keyword set, its positioning note and its category profile, so
 * a Brand Manager page and a Digital Marketing Specialist page ask genuinely
 * different questions rather than the same eight with a name swapped in.
 *
 * Lives here rather than in constants.ts because it depends on ROLE_KEYWORDS and
 * ROLE_NOTES; constants.ts must not import this module.
 */
export function getRoleInterviewQuestions(slug: string): RoleQA[] {
  if (ROLE_QUESTIONS[slug]) return ROLE_QUESTIONS[slug];

  const content = getRoleContent(slug);
  if (!content) return [];

  const { name, keywords, salaryRange, topCompanies, profile, note } = content;
  const k = (i: number) => keywords[i] ?? "the core skill for this role";
  const employers = topCompanies.slice(0, 3).join(", ");

  return [
    {
      question: `What does a ${name} interview actually focus on?`,
      answer: `${note.positioning} In practice that means interviewers concentrate on ${note.screened}. Expect the conversation to keep returning to ${profile.provesValue} — panels for this role are calibrated to look for exactly that, and answers that stay at the level of duties performed tend to stall. Come with two or three examples where you can go three questions deep on the details.`,
    },
    {
      question: `What technical topics come up in a ${name} interview?`,
      answer: `The recurring areas for ${name} roles are ${keywords.slice(0, 6).join(", ")}. Interviewers rarely ask you to define these — they ask you to describe a time you used one and then probe the decisions you made. Be ready to explain why you chose ${k(0)} over the alternative in a specific situation, since that reasoning is what distinguishes real experience from familiarity.`,
    },
    {
      question: `How do I demonstrate ${k(0)} experience in a ${name} interview?`,
      answer: `Pick one example and carry it all the way through: the situation, what you specifically did with ${k(0)}, what constraint made it difficult, and the measurable outcome. Then be prepared for follow-ups about what you would do differently. A single example you can defend in depth is considerably stronger than listing five you can only describe at surface level.`,
    },
    {
      question: `What is the biggest mistake candidates make in ${name} interviews?`,
      answer: `${profile.commonMistakes[0] ?? "Describing responsibilities rather than results"}. It shows up in interviews the same way it shows up on resumes: the candidate explains what the team did and what they were responsible for, without ever stating what changed as a result of their own work. Interviewers are trying to assess ${note.screened}, and a duty-level answer gives them nothing to evaluate.`,
    },
    {
      question: `How should I prepare for the behavioural round as a ${name}?`,
      answer: `Build five to seven STAR stories and make sure they collectively cover a project you led, a disagreement you handled, a failure you learned from, a decision made without enough information, and a time you influenced people who did not report to you. For ${name} roles specifically, at least two of those stories should demonstrate ${profile.provesValue}, because that is the thread interviewers will keep pulling on.`,
    },
    {
      question: `What is the ${name} interview process typically like?`,
      answer: `Most employers run a recruiter screen of 20 to 30 minutes, a hiring manager conversation of about 45 minutes covering domain depth, two to four role-specific rounds, and one or two behavioural rounds before an offer. At companies like ${employers} the middle stage is where ${name} candidates are most often filtered, since that is where ${note.screened} gets tested directly. The full process usually runs three to six weeks.`,
    },
    {
      question: `What questions should I ask at the end of a ${name} interview?`,
      answer: `Ask things that only someone who understands the role would think to ask: how success is measured in the first six months, what the biggest constraint on the team currently is, and how decisions about ${k(1)} get made in practice. Avoid questions answered on the careers page — they signal you did not prepare, which undercuts an otherwise strong interview.`,
    },
    {
      question: `What salary should I expect as a ${name}?`,
      answer: `${name} roles currently span roughly ${salaryRange} across US markets, varying with location, company stage and scope. ${note.payNote} Research your specific market on Levels.fyi, Glassdoor and LinkedIn Salary before the conversation, and treat the first offer as an opening position — most have room, and the base you agree to anchors every subsequent raise.`,
    },
  ];
}
