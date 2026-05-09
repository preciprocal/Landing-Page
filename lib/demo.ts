// Shared types, constants, and user data for the Chrome Extension demo section

// ── Fictional demo user ───────────────────────────────────────────────────────
export const U = {
  initials: "AK",
  name:     "Alex Kim",
  first:    "Alex",
  last:     "Kim",
  email:    "a.kim@mit.edu",
  phone:    "+1 (617) 555-0192",
  linkedin: "linkedin.com/in/alex-kim-ds",
  address:  "45 Commonwealth Ave, Apt 2B",
  city:     "Boston",
  state:    "MA",
  zip:      "02215",
  country:  "United States of America",
  resume:   "AlexKim_DataAnalytics_Resume.pdf",
  university: "Massachusetts Institute of Technology",
  degree:   "B.S. Computer Science & Statistics",
  gpa:      "3.8 / 4.0",
  employer: "Accenture",
  title:    "Data Analyst",
  heard:    "LinkedIn",
};

// ── Workday form types ────────────────────────────────────────────────────────
export type FieldType = "text" | "select" | "upload" | "textarea";

export interface Field {
  label: string;
  value: string;
  required?: boolean;
  type?: FieldType;
}

export interface Step {
  id: string;
  title: string;
  fields: Field[];
}

// ── Workday form steps ────────────────────────────────────────────────────────
export const STEPS: Step[] = [
  {
    id: "autofill",
    title: "Autofill with Resume",
    fields: [
      { label: "Resume / CV *",    value: U.resume,  type: "upload" },
      { label: "First Name *",     value: U.first  },
      { label: "Last Name *",      value: U.last   },
      { label: "Email Address *",  value: U.email  },
    ],
  },
  {
    id: "info",
    title: "My Information",
    fields: [
      { label: "How Did You Hear About Us?",                      value: U.heard,   type: "select" },
      { label: "Have you previously worked at Morgan Stanley? *", value: "No",      type: "select" },
      { label: "Legal Name – First *",   value: U.first  },
      { label: "Legal Name – Last *",    value: U.last   },
      { label: "I have a preferred name",value: "No",    type: "select" },
      { label: "Street Address *",       value: U.address },
      { label: "City *",                 value: U.city   },
      { label: "State / Province *",     value: U.state  },
      { label: "Postal Code *",          value: U.zip    },
      { label: "Country *",              value: U.country, type: "select" },
      { label: "Email Address *",        value: U.email  },
      { label: "Phone Number *",         value: U.phone  },
    ],
  },
  {
    id: "experience",
    title: "My Experience",
    fields: [
      { label: "Resume / CV *",          value: U.resume,      type: "upload"   },
      { label: "LinkedIn Profile URL",   value: U.linkedin                      },
      { label: "Skills",                 value: "Python, SQL, Tableau, R, Excel, Machine Learning", type: "textarea" },
      { label: "Most Recent Employer *", value: U.employer  },
      { label: "Job Title *",            value: U.title     },
      { label: "University / College *", value: U.university },
      { label: "Degree *",               value: U.degree,   type: "select" },
      { label: "GPA",                    value: U.gpa       },
    ],
  },
  {
    id: "questions",
    title: "Application Questions",
    fields: [
      { label: "Are you legally authorized to work in the US? *",     value: "Yes", type: "select" },
      { label: "Will you now or in the future require sponsorship? *", value: "No",  type: "select" },
      { label: "Have you been subject to any regulatory action? *",    value: "No",  type: "select" },
      { label: "Do you have Series 7 or 63 licenses? *",              value: "No",  type: "select" },
      { label: "Earliest available start date *",                      value: "June 2, 2025" },
    ],
  },
  {
    id: "disclosures",
    title: "Voluntary Disclosures",
    fields: [
      { label: "Registered in securities industry? *",              value: "No",             type: "select" },
      { label: "Government Official in past 3 years? *",            value: "No",             type: "select" },
      { label: "Ability to influence Morgan Stanley business? *",    value: "Not Applicable", type: "select" },
      { label: "Subject to post-employment restrictions? *",         value: "Not Applicable", type: "select" },
      { label: "Immediate Family of Government Official? *",         value: "No",             type: "select" },
      { label: "Referred by a Government Official? *",               value: "No",             type: "select" },
      { label: "Consent to follow-up via SMS / WhatsApp? *",         value: "Yes",            type: "select" },
    ],
  },
  {
    id: "review",
    title: "Review",
    fields: [],
  },
];

export const STEP_LABELS = [
  "Autofill with Resume",
  "My Information",
  "My Experience",
  "Application Questions",
  "Voluntary Disclosures",
  "Review",
];

export const TOTAL_FIELDS = STEPS.slice(0, -1).reduce((s, st) => s + st.fields.length, 0);

// ── Timeline — flat array of fill events ──────────────────────────────────────
export interface FillEvent { stepIdx: number; fieldIdx: number; }

export function buildTimeline(): FillEvent[] {
  const events: FillEvent[] = [];
  STEPS.slice(0, -1).forEach((step, si) => {
    step.fields.forEach((_, fi) => events.push({ stepIdx: si, fieldIdx: fi }));
  });
  return events;
}

// TIMELINE is a plain FillEvent[] — use it directly, not TIMELINE.events
export const TIMELINE: FillEvent[] = buildTimeline();

export function fieldsFilledInStep(events: FillEvent[], tick: number, stepIdx: number): number {
  return events.slice(0, tick).filter(e => e.stepIdx === stepIdx).length;
}

// ── Job Tracker types ─────────────────────────────────────────────────────────
export interface TrackerJob {
  id: string;
  company: string;
  title: string;
  status: string;
  date: string;
  workType: string;
  source: string;
  url: string;
  initial: string;
  color: string;
}

export const STATUS_CFG = [
  { label: "Wishlist",     dot: "bg-slate-400",  text: "text-slate-300"  },
  { label: "Applied",      dot: "bg-blue-500",    text: "text-blue-300"   },
  { label: "Phone Screen", dot: "bg-purple-400",  text: "text-purple-300" },
  { label: "Technical",    dot: "bg-indigo-400",  text: "text-indigo-300" },
  { label: "Final Round",  dot: "bg-yellow-400",  text: "text-yellow-300" },
  { label: "Offer",        dot: "bg-emerald-400", text: "text-emerald-300" },
  { label: "Rejected",     dot: "bg-red-400",     text: "text-red-300"    },
  { label: "Ghosted",      dot: "bg-slate-500",   text: "text-slate-400"  },
  { label: "Withdrew",     dot: "bg-orange-400",  text: "text-orange-300" },
] as const;

export const PREP_TIMES = ["3 days", "1 week", "2 weeks", "3 weeks", "1 month", "Custom"] as const;

export const JOB_META: Record<string, Omit<TrackerJob, "id" | "status" | "date">> = {
  ms:   { company:"Morgan Stanley", title:"Associate, LCD Data and Analytics", initial:"M", color:"bg-[#1a2744]", source:"chrome_extension", url:"https://www.linkedin.com/jobs/search/?currentJobId=123", workType:"Onsite" },
  msft: { company:"Microsoft",      title:"Applied Scientist",                 initial:"M", color:"bg-[#0078d4]", source:"chrome_extension", url:"https://www.linkedin.com/jobs/search/?currentJobId=456", workType:"Onsite" },
  goog: { company:"Google",         title:"Data Scientist",                    initial:"G", color:"bg-white",     source:"chrome_extension", url:"https://www.linkedin.com/jobs/search/?currentJobId=789", workType:"Onsite" },
  visa: { company:"Visa",           title:"Data Scientist - VCS",              initial:"V", color:"bg-[#1a1f71]", source:"chrome_extension", url:"https://www.linkedin.com/jobs/search/?currentJobId=012", workType:"Onsite" },
};