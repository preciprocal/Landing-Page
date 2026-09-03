/**
 * app/interview-study-planner/page.tsx
 *
 * Targets: "interview study plan", "interview preparation plan", "how to
 * prepare for an interview in 2 weeks", "coding interview study schedule".
 *
 * The date-bounded queries ("2 weeks", "30 days") are the winnable ones here,
 * they carry real urgency and the big career sites answer them poorly, with
 * generic listicles rather than an actual schedule.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "AI Interview Study Planner: Day-by-Day Prep Plan",
  description:
    "Get a personalised interview prep schedule built around your target role, your interview date, and the hours you actually have. Daily tasks, curated resources, and progress tracking.",
  keywords: [
    "interview study plan",
    "interview preparation plan",
    "coding interview study schedule",
    "how to prepare for an interview in 2 weeks",
    "interview prep timeline",
    "AI study planner",
    "technical interview study plan",
    "interview preparation schedule",
  ],
  alternates: { canonical: "https://preciprocal.com/interview-study-planner" },
  openGraph: {
    title: "AI Interview Study Planner, A Day-by-Day Plan to Your Interview Date",
    description:
      "Stop grinding random problems. Get a schedule built backward from your interview date.",
    url: "https://preciprocal.com/interview-study-planner",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Interview Study Planner",
    description: "A day-by-day prep schedule built around your role, your date, and your hours.",
  },
};

const FAQS = [
  {
    q: "How long do I need to prepare for a technical interview?",
    a: "With a full-time job and roughly 10 hours a week, eight weeks is a comfortable runway for a mid-level software engineering loop. Four weeks is workable if you have prior interview experience. Two weeks means triaging: patterns over coverage, and mock interviews over new material. The planner builds backward from whatever date you actually have rather than assuming an ideal timeline.",
  },
  {
    q: "What should I study first if my interview is in two weeks?",
    a: "Patterns, not problem count. In two weeks you cannot cover the space, so you want the highest-frequency patterns, two pointers, sliding window, BFS and DFS, and basic dynamic programming, plus at least three full mock interviews under time pressure. Candidates who do fewer problems but talk through all of them out loud consistently outperform those who silently solve twice as many.",
  },
  {
    q: "How many LeetCode problems do I actually need?",
    a: "Between 75 and 150 well-understood problems beats 400 skimmed ones. The metric that matters is not how many you have seen but whether you can recognise which pattern a new problem belongs to within about two minutes. The planner tracks that recognition rate rather than a raw problem count, because the count is a vanity metric.",
  },
  {
    q: "Should I study behavioural questions too?",
    a: "Yes, and it is the most commonly skipped part. Behavioural rounds sink more candidates at the senior level than coding rounds do, because people prepare exhaustively for the technical loop and improvise the rest. Every plan the tool generates reserves time for building seven STAR stories, because that is the reusable asset that covers most behavioural questions you will face.",
  },
  {
    q: "What if I fall behind the plan?",
    a: "The plan reschedules around you. Everyone falls behind, a work deadline lands, a week disappears. What matters is that the remaining time gets re-prioritised toward the highest-value material rather than you simply continuing from where you stopped, which is what causes people to arrive at the interview having never practised system design.",
  },
  {
    q: "Does it cover system design?",
    a: "Yes, for roles where it applies. If you are targeting a mid-level or senior engineering position, the plan allocates time to the six-step framework and a set of worked systems. For new-grad plans it is de-emphasised in favour of coding fundamentals, since most new-grad loops weight it lightly or skip it.",
  },
  {
    q: "Is the study planner free?",
    a: "The free plan includes a full personalised study plan with daily tasks and resources. Pro adds the daily quizzes, the AI coach you can ask questions at any point, and progress analytics across topics.",
  },
];

const FEATURES = [
  { label: "Built from your date", description: "The schedule works backward from your actual interview, not a generic 8-week template." },
  { label: "Role-specific topics", description: "A data scientist plan and a backend plan share almost nothing. Yours matches your target." },
  { label: "Daily task lists", description: "What to do today, sized to the hours you said you have." },
  { label: "Curated resources", description: "Specific problems and readings per topic, not a link dump to sort through." },
  { label: "Adaptive rescheduling", description: "Fall behind and the remaining time re-prioritises instead of silently sliding." },
  { label: "Progress tracking", description: "Pattern recognition rate and topic coverage, rather than a raw problem count." },
];

const STEPS = [
  { step: "1", title: "Set your target and date", body: "Your role, the company if you know it, your interview date, and honest hours per week." },
  { step: "2", title: "Get your day-by-day plan", body: "A full schedule with daily tasks, topics, and specific practice material to work through." },
  { step: "3", title: "Track and adapt", body: "Mark tasks complete, take the daily quiz, and let the plan re-prioritise when life gets in the way." },
];

export default function InterviewStudyPlannerPage() {
  return (
    <ToolPage
      breadcrumbName="Interview Study Planner"
      canonicalPath="/interview-study-planner"
      badge="Free, full personalised plan"
      h1="AI interview study planner"
      h1Accent="a plan built to your date"
      subhead="Most people prepare by grinding random problems and hoping. Get a day-by-day schedule built backward from your actual interview date, sized to the hours you actually have."
      ctaTool="study-planner"
      ctaLabel="Build my study plan free"
      ctaMicrocopy="Free personalised plan · No credit card · Ready in 60 seconds"
      featuresTitle="What the study planner builds"
      featuresSubtitle="A schedule that accounts for your role, your date, and the fact that you have a job."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="Why most interview prep fails"
      faqTitle="Interview study plan FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "The 4-week LeetCode study plan", href: "/blog/leetcode-study-plan-4-weeks" },
        { label: "Complete SWE interview prep guide", href: "/blog/software-engineer-interview-prep-guide" },
        { label: "System design interview tips", href: "/blog/system-design-interview-tips" },
        { label: "Company prep guides", href: "/interview-prep" },
        { label: "Interview questions by role", href: "/interview-questions" },
        { label: "AI mock interview", href: "/ai-mock-interview" },
      ]}
      bottomTitle="Know what to do today."
      bottomBody="Preparation fails from lack of structure far more often than lack of effort."
      bottomMicrocopy="Free personalised plan · No credit card · Adapts when you fall behind"
      body={
        <>
          <p>
            Ask ten candidates how they are preparing and nine will describe the same approach: work
            through LeetCode, watch some system design videos, and skim a list of behavioural
            questions the night before. Then they are surprised when the interview asks something
            slightly different from anything they drilled.
          </p>
          <p>
            The failure is not effort. People put in serious hours. The failure is that{" "}
            <strong className="text-white">the hours are not allocated against anything</strong>.
            There is no model of what the interview will actually contain, no sense of which topics
            carry the most weight, and no feedback loop telling you whether the last three weeks
            moved you closer to being ready.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">The four ways unstructured prep goes wrong</h3>
            <ul className="space-y-3">
              {[
                "Over-indexing on coding, 90% of prep time on the round that's often 50% of the decision",
                "Breadth without depth, 300 problems seen once, no pattern recognition built",
                "Skipping behavioural entirely, the round that sinks the most senior candidates",
                "Never practising out loud, silent solving is a genuinely different skill from interviewing",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-rose-400 flex-shrink-0 mt-0.5">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            The last one is worth dwelling on. Solving a problem in your head at your own pace is a
            different activity from explaining your reasoning aloud, to a stranger, while typing, on
            a clock. Candidates who have only ever done the first are routinely blindsided by how
            much harder the second is, and it is entirely trainable, which is why every plan the
            tool generates reserves time for mock interviews rather than treating them as optional.
          </p>
          <p>
            A good plan is mostly an allocation problem. Given eight weeks, ten hours a week, and a
            backend role at a company that weights system design heavily, how should those eighty
            hours be divided? That is a question with a defensible answer, and it looks nothing like
            the answer for a new grad with two weeks and a data science loop.
          </p>
          <p>
            The other thing a plan gives you is a defence against the sliding deadline. Without a
            schedule, prep expands to fill all available time and still feels incomplete on the day.
            With one, you know on any given Tuesday whether you are on track, and you can make a
            deliberate decision about what to cut instead of discovering the gap during the
            interview.
          </p>
        </>
      }
    />
  );
}
