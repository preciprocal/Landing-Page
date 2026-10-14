/**
 * app/thank-you-email-after-interview/page.tsx
 *
 * Targets: "thank you email after interview", "interview thank you email
 * template", "follow up email after interview", "thank you note after phone
 * interview".
 *
 * One of the highest-volume job search queries the site did not target. The
 * searcher wants text to copy, so the page leads with a working generator that
 * needs no account, then examples, then the sign-up for mock interviews, which
 * is the natural next thing someone mid-process needs.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import ThankYouEmailBuilder from "@/components/ThankYouEmailBuilder";

export const metadata: Metadata = {
  title: "Thank You Email After Interview (Free Tool)",
  description:
    "Write a thank you email after your interview in under a minute. Free generator for phone screens, technical rounds and final rounds, plus examples and timing rules. No sign-up.",
  keywords: [
    "thank you email after interview",
    "interview thank you email template",
    "thank you note after interview",
    "follow up email after interview",
    "thank you email after phone interview",
    "thank you email after final interview",
    "post interview thank you email",
  ],
  alternates: { canonical: "https://preciprocal.com/thank-you-email-after-interview" },
  openGraph: {
    title: "Free Thank You Email Generator for After Your Interview",
    description: "A specific, short thank you email for any interview stage, ready to copy. No sign-up.",
    url: "https://preciprocal.com/thank-you-email-after-interview",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thank You Email After Interview: Free Generator",
    description: "A specific, short thank you email for any interview stage, ready to copy.",
  },
};

const FAQS = [
  {
    q: "Should I send a thank you email after an interview?",
    a: "Yes. It rarely wins an offer on its own, but leaving it out can count against you when two candidates are close, and it costs five minutes. It is also your last chance to fix a weak answer or add something you forgot, which is worth more than the courtesy itself.",
  },
  {
    q: "How soon after the interview should I send it?",
    a: "Within 24 hours, and ideally the same day. Panels often meet to discuss candidates the next morning, so an email sent two days later can arrive after the decision has already been made.",
  },
  {
    q: "Who should I send it to if I met several people?",
    a: "Send a separate, short email to each interviewer, each mentioning something specific from your conversation with them. Interviewers on the same panel compare notes, so identical emails sent to everyone are noticed. If you only have the recruiter's address, send one to the recruiter and ask them to pass your thanks along.",
  },
  {
    q: "How long should a thank you email be?",
    a: "Three short paragraphs, under 150 words. Thank them, mention one specific thing you discussed, then close. Anything longer starts to read as a second cover letter, and interviewers skim it.",
  },
  {
    q: "Is it okay to send a thank you email after a phone screen?",
    a: "Yes, and the recruiter is usually the right person for it. Keep it even shorter than after a full interview: thank them, say you are still keen on the role, and say you are looking forward to next steps.",
  },
  {
    q: "What if I did not hear back after sending a thank you email?",
    a: "Wait until the date the recruiter gave you, or about a week if they did not give one, then send one short follow-up asking whether there is an update on the timeline. After that, stop and put your energy into other applications.",
  },
  {
    q: "Is this thank you email generator really free?",
    a: "Yes. It runs entirely in your browser, needs no account, and nothing you type is sent anywhere. Preciprocal's paid features are the mock interviews, resume analysis and other tools in the app, which have a free plan of their own.",
  },
];

const FEATURES = [
  { label: "Stage-aware wording", description: "A phone screen, a technical round and a final round each call for a different tone." },
  { label: "The specific line", description: "Prompts you for the one detail that shows you were listening, which is what makes it land." },
  { label: "Reinforce a point", description: "A natural place to strengthen an answer you were not happy with." },
  { label: "No sign-up", description: "Runs in your browser. Nothing you type leaves the page." },
  { label: "One-click copy", description: "Subject line and body, ready to paste into Gmail or Outlook." },
  { label: "Under 150 words", description: "Short enough to read on a phone between meetings, which is where it will be read." },
];

const STEPS = [
  { step: "1", title: "Pick the interview stage", body: "Recruiter screen, technical round, or final round. The opening and closing change with each." },
  { step: "2", title: "Add one specific detail", body: "Something you actually talked about. This is the line that separates you from a template." },
  { step: "3", title: "Copy, edit, send", body: "Read it once out loud, cut anything that does not sound like you, and send it within 24 hours." },
];

const EXAMPLES = [
  {
    title: "After a recruiter phone screen",
    subject: "Thank you for today's conversation about the Data Analyst role",
    body: [
      "Hi Jordan,",
      "Thank you for taking the time to speak with me today about the Data Analyst role. It was helpful to hear how the analytics team works with product on experiment design.",
      "I'm looking forward to the next steps, and I'm happy to share anything else that would be useful in the meantime.",
      "Best,\nSam",
    ],
  },
  {
    title: "After a technical round, reinforcing a weak answer",
    subject: "Thank you for today's conversation about the Backend Engineer role",
    body: [
      "Hi Priya,",
      "Thank you for the conversation today. I enjoyed the rate limiter problem, and I kept thinking about it afterwards: a sliding window log would have handled the burst case we discussed more cleanly than the fixed window I started with.",
      "If it would help to see more of how I approach this kind of work, I'm glad to follow up with anything you need.",
      "Best,\nAlex",
    ],
  },
  {
    title: "After a final round",
    subject: "Thank you for today",
    body: [
      "Hi Morgan,",
      "Thank you for the time you and the team spent with me today. Hearing how you are rebuilding onboarding for small business customers made me even more interested in the Product Manager role.",
      "Whatever the outcome, I appreciated how open everyone was about the team and the work. I'd be excited to join.",
      "Best,\nTaylor",
    ],
  },
];

export default function ThankYouEmailPage() {
  return (
    <ToolPage
      breadcrumbName="Thank You Email Generator"
      canonicalPath="/thank-you-email-after-interview"
      badge="Free tool, no sign-up"
      h1="Thank you email after an interview"
      h1Accent="written in under a minute"
      subhead="Pick the interview stage, add one specific thing you talked about, and copy a short thank you email that does not read like a template. Runs in your browser, no account needed."
      ctaTool="mock-interview"
      ctaLabel="Practice your next round free"
      ctaMicrocopy="Free plan includes an AI mock interview · No credit card"
      tool={<ThankYouEmailBuilder />}
      featuresTitle="What makes a thank you email work"
      featuresSubtitle="Short, specific, and sent the same day. The generator is built around those three rules."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="Thank you email examples and the rules behind them"
      faqTitle="Thank you email FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "How to follow up after an interview", href: "/blog/how-to-follow-up-after-interview-without-being-annoying" },
        { label: "AI mock interview", href: "/ai-mock-interview" },
        { label: "Interview debrief", href: "/interview-debrief" },
        { label: "STAR method guide", href: "/blog/star-method-behavioral-interviews" },
        { label: "How to negotiate a salary offer", href: "/blog/how-to-negotiate-salary-offer" },
        { label: "Interview questions by role", href: "/interview-questions" },
      ]}
      bottomTitle="The email is sent. Now prepare for the next round."
      bottomBody="Practice with AI interviewers that ask follow-up questions, and get scored on structure and clarity before the real thing."
      bottomMicrocopy="Free plan · No credit card · Practice by voice"
      body={
        <>
          <p>
            A thank you email will not turn a weak interview into an offer. What it can do is break a
            tie, show that you were paying attention, and give you one last chance to improve an
            answer you were not happy with. That last part is the most useful, and most candidates
            skip it.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">The four rules</h3>
            <ul className="space-y-3">
              {[
                "Send it within 24 hours, because panels often decide the next morning",
                "One email per interviewer, each mentioning something from your conversation with them",
                "Under 150 words, which is three short paragraphs",
                "No new asks. Do not ask about salary, timelines or other roles in a thank you email",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            The line that matters most is the specific one. &quot;I enjoyed learning about the
            role&quot; could have been sent by anyone. &quot;I enjoyed hearing how you moved
            reconciliation to an event-driven pipeline&quot; could only have come from someone who was
            in that room. One sentence like that is worth more than a paragraph of enthusiasm.
          </p>

          {EXAMPLES.map((ex) => (
            <div key={ex.title} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">{ex.title}</h3>
              <p className="text-sm text-slate-400 mb-3">
                <strong className="text-slate-200">Subject:</strong> {ex.subject}
              </p>
              {ex.body.map((para, i) => (
                <p key={i} className="text-sm text-slate-400 leading-relaxed mb-3 last:mb-0 whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          ))}

          <p>
            The technical round example shows the reinforcing move. The candidate did not apologise for
            the weaker answer. They showed they had kept thinking about the problem and named a better
            approach in one sentence. Interviewers remember that, because it is what good engineers do
            after a design review.
          </p>
          <p>
            If you only have the recruiter&apos;s email, send one to them and ask them to pass your thanks
            on to the panel. Do not hunt down personal email addresses or send LinkedIn connection
            requests to every interviewer on the same day. That reads as pressure, not gratitude.
          </p>
        </>
      }
    />
  );
}
