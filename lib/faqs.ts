// =============================================================================
// lib/faqs.ts
//
// FAQ data for /faq and the homepage FAQ.
// Re-exported from lib/constants.ts. Client components import this file
// directly: lib/constants.ts holds every blog post and role guide (~480 KB),
// and importing it from a client component ships all of that to the browser.
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
  { id: "g1", category: "general",      q: "What is Preciprocal?",                           a: "Preciprocal is an AI-powered career prep platform. It combines resume analysis (ATS scoring, recruiter eye simulation, candidate benchmarking, interview intelligence), voice-based mock interviews with a multi-agent panel, cover letter generation, AI study planning, LinkedIn optimisation, cold outreach, and a job tracker with contact finder, all in one platform." },
  { id: "g2", category: "general",      q: "Who is Preciprocal for?",                        a: "It is built first for F-1 international students on OPT, who have a fixed number of unemployment days to land a job. It works just as well for any student, recent graduate or early-career job seeker, for any role: tech, finance, consulting, marketing, healthcare and more. Every tool adapts to your target role." },
  { id: "g3", category: "general",      q: "How do I get started?",                          a: "Sign up free at app.preciprocal.com, no credit card needed. Upload a resume and get your ATS score in 2 minutes, or jump straight into a mock interview. The platform walks you through everything." },
  { id: "g4", category: "general",      q: "Is there a mobile app?",                         a: "Not yet. Preciprocal is fully web-based and works on any device with a modern browser. A native app is on our roadmap." },
  { id: "g5", category: "general",      q: "How is this different from ChatGPT or Claude?",  a: "ChatGPT and Claude are great general assistants. Preciprocal does one job: getting you hired. Your resume is scored against each posting, mock interviews ask follow-ups and score your answers, and your plan, applications and OPT dates stay in one place, with no prompts to write. Many people use both." },
  { id: "g6", category: "general",      q: "Do you have a Chrome extension?",                a: "Yes. The Preciprocal Chrome extension lets you save jobs from LinkedIn and job boards with one click, auto-import job descriptions for resume tailoring, and track applications without leaving the page." },
  { id: "g7", category: "general",      q: "How many tools does Preciprocal include?",       a: "11 core tools: Resume Analysis (ATS + Benchmarking + Recruiter Sim + Interview Intel), Resume Tailoring, Mock Interviews, Cover Letter Generator, Study Planner, LinkedIn Optimiser, Cold Outreach Generator, Interview Debrief Journal, Job Tracker, Contact Finder, and Chrome Extension." },
  { id: "g8", category: "general",      q: "Does it work for non-tech roles?",               a: "Absolutely. Every tool adapts to your target role, whether you're applying for software engineering, finance, consulting, marketing, HR, healthcare, or any other field. The AI tailors its analysis, questions, and recommendations to the specific role and job description you provide." },
  { id: "p1", category: "pricing",      q: "Is Preciprocal really $9.99/mo?",                a: "Yes. Pro is $9.99/month. We built Preciprocal for students and early-career job seekers, so it is priced for a student budget, with a free plan to start." },
  { id: "p2", category: "pricing",      q: "Do you offer a free plan?",                      a: "Yes. The free tier includes 1 tailored application, 2 resume analyses, 2 cover letters, 1 mock interview, 1 study plan, 1 LinkedIn optimisation, 2 outreach messages and 2 recruiter contact searches per month, plus unlimited interview debriefs and job tracking. It's a real free plan, not a 7-day trial." },
  { id: "p3", category: "pricing",      q: "Is there a student discount?",                   a: "Yes. Verify a .edu email and Pro is free for 30 days. No card is needed and nothing is ever charged: after 30 days your account moves to the Free plan, and you can upgrade any time. It is once per student email and device." },
  { id: "p4", category: "pricing",      q: "What's the difference between Pro and Premium?", a: "Both plans include the same tools; Premium raises the monthly limits. Pro gives you 6 tailored applications, 10 resume analyses, 10 cover letters and 3 mock interviews of 10 minutes each. Premium ($24.99/mo) gives you 12, 20, 20 and 5 of 12 minutes each, plus 5 study plans, 5 LinkedIn optimisations, 20 outreach messages and 20 recruiter contact searches, and it adds priority support on a 24-hour SLA plus early access to new features." },
  { id: "p5", category: "pricing",      q: "Can I get a refund?",                            a: "Yes, whenever you ask, from Settings > Plan & Billing > Refunds in the app. At any point in your billing month you can get back the part of that month you have not used, less card processing fees (our payment provider keeps those, about $0.66 on a $9.99 payment). Each feature counts by what it costs to run, so a mock interview counts for more than a cover letter. In your first 7 days, if you have barely used your plan, you get your first payment back instead, less the same fees. Once a new billing month starts the previous one can no longer be refunded, and an unused-credits refund is available once every 6 months. Separately, if you land a job while subscribed, send us your offer letter, a public LinkedIn post about your experience and a short testimonial, all three, and we will refund that month's subscription in full; this covers your most recent billing period only. One-time packs can be returned within 7 days of purchase if none of the pack has been used, less the card processing fee." },
  { id: "p6", category: "pricing",      q: "Can I cancel anytime?",                          a: "Yes. Cancel from Settings, Billing, Cancel Subscription. No fee, no waiting period. You keep access until the end of your billing period." },
  { id: "i1", category: "interviews",   q: "How do mock interviews work?",                   a: "Our voice-based interviews use a multi-agent AI system to simulate a real interview panel: an HR interviewer and a technical lead ask the questions, with a third panelist observing. You speak into your mic, they respond with follow-up questions, and you get a detailed debrief with scoring across 5 dimensions." },
  { id: "i2", category: "interviews",   q: "Do I need a webcam?",                            a: "No. Mock interviews are voice-only, you just need a microphone. Your built-in laptop mic works fine." },
  { id: "i3", category: "interviews",   q: "What types of interviews can I practise?",       a: "Technical (coding + system design), behavioural (STAR method), case interviews (consulting), finance interviews (DCF, LBO), marketing strategy, and general screening. You can target specific companies and roles, select difficulty level, and the AI adjusts accordingly." },
  { id: "i4", category: "interviews",   q: "Can I practise for a specific company?",         a: "Yes. Enter the company name and role, and the AI tailors questions to that company's known interview style, values, and technical focus areas." },
  { id: "r1", category: "resume",       q: "What is ATS scoring?",                           a: "ATS (Applicant Tracking System) is the software used by most large employers to automatically filter resumes before a human sees them. Our scorer reviews your resume across five dimensions: content and impact, ATS compatibility, skills, structure, and tone, and gives you a score out of 100 with specific fixes." },
  { id: "r2", category: "resume",       q: "What is the Recruiter Eye Simulation?",          a: "An AI simulation of how three reviewers approach your document: an HR screener (quick first pass), a technical lead (deeper skill evaluation), and a hiring manager (impact & leadership focus). You see an attention heatmap showing where each reviewer's eyes go and what gets missed." },
  { id: "r3", category: "resume",       q: "Can I tailor my resume to a specific job?",      a: "Yes. Paste a job description into the Tailor tab, and the AI rewrites specific bullets to better match, adjusting keywords, reframing experience, and prioritising relevant skills. Every change is shown in a clear 'original to rewrite' format for your approval." },
  { id: "c1", category: "cover-letter", q: "How does the cover letter generator work?",      a: "Paste a job description and the AI (1) draws on what is widely known about the company, (2) analyses job requirements against your resume, and (3) writes a personalised letter connecting your experience to their needs." },
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
/**
 * Shorter answers for the homepage, where the FAQ is a quick scan. The full
 * answers stay on /faq. The homepage FAQ JSON-LD is built from LANDING_FAQS,
 * so the structured data always matches what the homepage shows.
 */
const LANDING_FAQ_SHORT: Partial<Record<(typeof LANDING_FAQ_IDS)[number], string>> = {
  p2: "Yes, a real free plan, not a trial: 1 tailored application, 2 resume analyses, 2 cover letters and 1 mock interview a month, plus unlimited interview debriefs and job tracking. The full list is on the pricing page.",
  p5: "Yes, from Settings in the app. Any time in your billing month you get back the part you have not used, less card fees, and in your first 7 days, if you have barely used your plan, your first payment back instead. The Terms have the full conditions.",
  i1: "You speak with a voice AI panel, an HR interviewer and a technical lead, who ask follow-up questions like a real round. Afterwards you get a debrief scored across 5 dimensions.",
  t1: "Yes. Data is encrypted in transit and at rest, and we never sell it or use it for advertising. Our Privacy Policy names every service provider we use.",
};
export const LANDING_FAQS = FAQS.filter((f) => (LANDING_FAQ_IDS as readonly string[]).includes(f.id)).map((f) => ({
  ...f,
  a: LANDING_FAQ_SHORT[f.id as (typeof LANDING_FAQ_IDS)[number]] ?? f.a,
}));
