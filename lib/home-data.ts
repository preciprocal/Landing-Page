// =============================================================================
// lib/home-data.ts
//
// Homepage lists: features, steps, university names, testimonials.
// Re-exported from lib/constants.ts. Client components import this file
// directly: lib/constants.ts holds every blog post and role guide (~480 KB),
// and importing it from a client component ships all of that to the browser.
// =============================================================================

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

export const UNIVERSITY_LOGOS = [
  "Stanford","MIT","Harvard","Berkeley","Columbia","NYU","Georgia Tech","UT Austin",
  "Carnegie Mellon","Michigan","Yale","Princeton","Cornell","UCLA","UPenn","Duke",
  "Northwestern","Caltech","Brown","USC","Purdue","Virginia Tech","Illinois",
  "UW Madison","Ohio State","Boston University","Rice","Northeastern","Emory","Vanderbilt",
];

// --- 4. TESTIMONIALS ---------------------------------------------------------
// Leave empty until you have verified real-user quotes (FTC 16 CFR Part 255).

export const TESTIMONIALS: { name: string; role: string; text: string; avatar: string }[] = [];
