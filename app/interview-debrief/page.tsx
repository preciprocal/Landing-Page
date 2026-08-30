/**
 * app/interview-debrief/page.tsx
 *
 * Targets: "interview debrief", "what to do after an interview", "how to
 * remember interview questions", "interview reflection template".
 *
 * Lowest search volume of the eight, but the queries are high-intent and almost
 * nobody covers them properly — the SERP is mostly employer-side content about
 * how hiring panels run debriefs, not candidate-side. That mismatch is the
 * opening.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Interview Debrief Journal — Learn From Every Interview You Take",
  description:
    "Log what was asked, what you said, and what you'd change while it's still fresh. Turn each interview into preparation for the next one instead of a vague memory.",
  keywords: [
    "interview debrief",
    "what to do after an interview",
    "how to remember interview questions",
    "interview reflection template",
    "interview journal",
    "post interview notes",
    "learn from failed interviews",
    "interview feedback tracker",
  ],
  alternates: { canonical: "https://preciprocal.com/interview-debrief" },
  openGraph: {
    title: "Interview Debrief Journal — Learn From Every Interview You Take",
    description:
      "Most candidates take the same interview five times and learn nothing. Capture it while it's fresh.",
    url: "https://preciprocal.com/interview-debrief",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interview Debrief Journal",
    description: "Turn every interview into preparation for the next one.",
  },
};

const FAQS = [
  {
    q: "What should I write down right after an interview?",
    a: "Every question you were asked, as close to verbatim as you can manage; what you actually answered, not what you wish you had said; where you felt the conversation stall; and anything the interviewer told you about the team, the role, or the next steps. Do it within an hour. Recall of specific question wording degrades sharply after that, and the wording is the part that turns out to be useful later.",
  },
  {
    q: "Why does this matter if I got rejected anyway?",
    a: "Because companies reuse questions, and so does an entire industry. The system design question you fumbled at one company has a high chance of appearing at the next. Candidates who debrief systematically get noticeably stronger over a search; candidates who do not can take eight interviews and arrive at the ninth with the same weaknesses they started with.",
  },
  {
    q: "Companies rarely give feedback. Does that make this pointless?",
    a: "It makes it more important, not less. Since almost no company gives real feedback beyond a template rejection, your own notes are the only feedback signal you will ever have. The pattern that emerges across five debriefs — that you consistently run out of time on the coding round, or freeze on ambiguity questions — is information nobody else is going to hand you.",
  },
  {
    q: "How do I use debriefs to actually improve?",
    a: "Look across them rather than at any single one. After three or four interviews, patterns appear: a category of question you always fumble, a stage where you consistently get cut, a story you keep reaching for that keeps landing flat. Those patterns tell you what to work on far more reliably than a general sense that you should 'do more LeetCode'.",
  },
  {
    q: "Should I record the interview?",
    a: "No. Recording without explicit consent is illegal in many jurisdictions and will end your candidacy anywhere it is discovered. Write notes immediately afterward instead. The reconstruction is imperfect, but it is legal, and it is enough for the purpose.",
  },
  {
    q: "What about the thank-you note?",
    a: "Write it within 24 hours, and use your debrief notes to make it specific. Referencing an actual point from the conversation is what separates a note that gets read from one that gets archived. Doing the debrief first makes the thank-you note materially better, which is a useful side benefit.",
  },
  {
    q: "Is the debrief journal free?",
    a: "The free plan includes 1 interview debrief per month. Pro removes the limit and adds pattern analysis across all your debriefs, which is where most of the value is, since the insight comes from the aggregate rather than any single entry.",
  },
];

const FEATURES = [
  { label: "Structured capture", description: "Prompts for questions, answers, and stumbles so you don't stare at a blank page." },
  { label: "Question bank", description: "Everything you've been asked, searchable and tagged by company and round." },
  { label: "Pattern analysis", description: "The category of question you consistently fumble, surfaced across interviews." },
  { label: "Stage tracking", description: "Where in the funnel you get cut, which points at very different problems." },
  { label: "Thank-you note drafting", description: "Pulls a specific moment from your notes into the follow-up email." },
  { label: "Prep loop", description: "Weak areas feed straight into your next study plan and mock interviews." },
];

const STEPS = [
  { step: "1", title: "Debrief within the hour", body: "Guided prompts capture the questions and your answers while your recall is still accurate." },
  { step: "2", title: "Tag what went wrong", body: "Mark where you stalled, ran out of time, or gave an answer you weren't happy with." },
  { step: "3", title: "Work the patterns", body: "After a few interviews the recurring weakness becomes obvious, and it feeds your next study plan." },
];

export default function InterviewDebriefPage() {
  return (
    <ToolPage
      breadcrumbName="Interview Debrief Journal"
      canonicalPath="/interview-debrief"
      badge="Free — 1 debrief per month"
      h1="Interview debrief journal"
      h1Accent="learn from every interview"
      subhead="Almost no company tells you why you were rejected. Your own notes are the only feedback you will ever get, and they are worthless if you write them three days later."
      ctaTool="interview-debrief"
      ctaLabel="Start a debrief free"
      ctaMicrocopy="1 free debrief/month · Guided prompts · No credit card"
      featuresTitle="What the debrief journal captures"
      featuresSubtitle="Structured while it's fresh, so the pattern across interviews becomes visible."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="Why most candidates take the same interview five times"
      faqTitle="Interview debrief FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "How to follow up after an interview", href: "/blog/how-to-follow-up-after-interview-without-being-annoying" },
        { label: "How to handle job rejection", href: "/blog/how-to-handle-job-rejection-keep-going" },
        { label: "The STAR method explained", href: "/blog/star-method-behavioral-interviews" },
        { label: "Interview study planner", href: "/interview-study-planner" },
        { label: "AI mock interview", href: "/ai-mock-interview" },
        { label: "Company prep guides", href: "/interview-prep" },
      ]}
      bottomTitle="Stop repeating the same interview."
      bottomBody="Eight interviews should make you dramatically better. For most candidates they don't, because nothing is captured."
      bottomMicrocopy="1 free debrief per month · No credit card · Takes about 10 minutes"
      body={
        <>
          <p>
            Here is the pattern that plays out across most job searches. You interview at a company
            and it goes badly in a specific, identifiable way — you ran out of time on the second
            coding problem, or you gave a weak answer to a question about handling conflict. You
            feel bad for an afternoon. Two weeks later you interview somewhere else and{" "}
            <strong className="text-white">the same thing happens again</strong>.
          </p>
          <p>
            This is not a memory failure so much as a capture failure. The specific texture of an
            interview — the exact wording of the question, the moment you started rambling, the
            follow-up that caught you out — fades within hours. What survives is a vague emotional
            residue: that one went badly. Emotional residue is useless as a training signal.
          </p>
          <p>
            The problem compounds because companies almost never give real feedback. Legal caution
            means you get a templated rejection with no detail. So the only feedback loop available
            to you is the one you build yourself, and most candidates never build it.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">What to capture, within the hour</h3>
            <ul className="space-y-3">
              {[
                "Every question, as close to verbatim as you can manage — the wording matters more than you'd think",
                "What you actually answered, not the improved version you thought of in the car",
                "The exact moment you stalled, and what you were being asked when it happened",
                "Anything they told you about the team, the role, or the timeline",
                "Your read on how it went, so you can later calibrate that read against the outcome",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-indigo-400 flex-shrink-0 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            That last item is quietly the most valuable. Most candidates are badly calibrated about
            how their interviews went — some are convinced they bombed a round they passed
            comfortably, others feel great about rounds that sank them. Recording your prediction
            and comparing it against the result, several times, fixes that calibration. And knowing
            whether your instinct is trustworthy changes how you run the rest of your search.
          </p>
          <p>
            The real payoff arrives at around the fourth or fifth debrief, when patterns become
            visible that no single interview would reveal. Consistently cut at the recruiter screen
            points at a resume or positioning problem. Consistently strong until the system design
            round points at a specific, fixable knowledge gap. Consistently reaching the final round
            and losing points at something else entirely. These three situations demand completely
            different responses, and without notes they all just feel like rejection.
          </p>
          <p>
            There is also an immediate practical use. Your thank-you note should reference something
            specific from the conversation, and writing the debrief first means you actually have
            that detail rather than falling back on generic appreciation.
          </p>
        </>
      }
    />
  );
}
