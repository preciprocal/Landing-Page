/**
 * lib/demoChapters.ts
 *
 * The story behind the product demo: one candidate (Arjun) and one chapter
 * per tool. The homepage walkthrough (components/HeroProductDemo.tsx) plays
 * every chapter in order; tool pages play their own chapter as the hero
 * (components/ProductHero.tsx). Both read the narration and timings from here
 * so the story stays identical wherever it is told.
 *
 * stepDurations drive the matching preview in components/examples: the
 * preview is rendered at step 0, 1, 2 ... and each step is held for that many
 * milliseconds.
 */

export type ChapterId = "resume" | "cover-letter" | "career-tools" | "job-tracker" | "planner" | "interview" | "debrief";

export interface ChapterData {
  title: string;
  narration: string;
  completedLabel: string;
  stepDurations: number[];
  /** Shown in the product frame's address pill on tool-page heroes. */
  path: string;
}

export const CHAPTER_DATA: Record<ChapterId, ChapterData> = {
  resume: {
    title: "Fix His Resume",
    narration: "347 applications with the same resume. Zero callbacks. Before applying, Arjun needs to know what's holding him back.",
    completedLabel: "Resume scored 75/100",
    stepDurations: [800, 1800, 1800, 1800, 1800, 1800, 1200],
    path: "app.preciprocal.com/resume",
  },
  "cover-letter": {
    title: "Write the Cover Letter",
    narration: "75/100. Weak verbs, missing summary, no metrics. But Meta needs a cover letter. Not the generic one he's been reusing.",
    completedLabel: "Meta cover letter done",
    stepDurations: [1500, 1200, 1500, 2500],
    path: "app.preciprocal.com/cover-letter",
  },
  "career-tools": {
    title: "Fix LinkedIn & Send Outreach",
    narration: "Cover letter ready. But his LinkedIn reads 'Aspiring Data Scientist | Open to Work.' No recruiter will reach out to that. He also needs warm intros.",
    completedLabel: "LinkedIn 42 to 84, emails sent",
    stepDurations: [1800, 1500, 3500, 2800, 1500, 3500],
    path: "app.preciprocal.com/career-tools",
  },
  "job-tracker": {
    title: "Track the Application",
    narration: "LinkedIn fixed, outreach sent. Now Arjun adds Meta to his tracker. AI finds the right contacts inside Meta.",
    completedLabel: "Meta tracked, 3 contacts found",
    stepDurations: [2000, 1000, 1800, 2200, 2200, 2200, 4500, 2800],
    path: "app.preciprocal.com/tracker",
  },
  planner: {
    title: "Prepare for the Interview",
    narration: "Meta replied. Technical interview in two weeks. Arjun hasn't touched LeetCode in months. He needs a structured plan.",
    completedLabel: "7-day prep ready",
    stepDurations: [1800, 1500, 3200, 3500, 3500, 5000, 5500, 2000],
    path: "app.preciprocal.com/planner",
  },
  interview: {
    title: "Practice the Interview",
    narration: "Day 7. Interview is tomorrow. One last mock. Full panel: HR, tech lead, developer. The system design question he dreads.",
    completedLabel: "Mock done, 78/100",
    stepDurations: [2000, 1800, 1800, 4000, 4000, 2200, 3500],
    path: "app.preciprocal.com/interview",
  },
  debrief: {
    title: "Debrief & Result",
    narration: "Mock done. He knows the gap now. After his real Meta screen, he logs it. AI spots the pattern. Three weeks later, the email arrives.",
    completedLabel: "$165K offer",
    stepDurations: [4000, 1800, 3500, 3500, 1800, 4000],
    path: "app.preciprocal.com/debrief",
  },
};
