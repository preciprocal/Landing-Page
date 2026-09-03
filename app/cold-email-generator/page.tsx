/**
 * app/cold-email-generator/page.tsx
 *
 * Targets: "cold email for job", "how to email a recruiter", "cold outreach
 * template job search", "referral request message".
 *
 * These are template-hunting queries, people want text they can copy. The body
 * content therefore includes a real annotated example rather than describing
 * one, which is also what makes the page worth linking to.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Cold Email Generator: Outreach That Gets Replies",
  description:
    "Write cold emails to recruiters, hiring managers, and potential referrers that actually get answered. Personalised from your background and the specific role, in seconds.",
  keywords: [
    "cold email for job",
    "how to email a recruiter",
    "cold outreach template job search",
    "referral request message",
    "cold email generator",
    "recruiter outreach email",
    "networking email template",
    "how to ask for a referral",
  ],
  alternates: { canonical: "https://preciprocal.com/cold-email-generator" },
  openGraph: {
    title: "Cold Email Generator for Job Seekers, Outreach That Gets Replies",
    description:
      "Most cold emails fail for the same three reasons. Write ones that get answered.",
    url: "https://preciprocal.com/cold-email-generator",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold Email Generator for Job Seekers",
    description: "Outreach to recruiters and referrers that actually gets replies.",
  },
};

const FAQS = [
  {
    q: "Do cold emails actually work for job searching?",
    a: "They work better than applying through a portal, which is a low bar but a meaningful one. A cold email that reaches an actual person bypasses the automated screen entirely. Response rates vary enormously with quality: a generic template sent to fifty people typically gets almost nothing, while a specific, short, well-targeted message often gets replies from a meaningful fraction of recipients. Cold outreach is a quality game, not a volume game.",
  },
  {
    q: "Should I email the recruiter or the hiring manager?",
    a: "The hiring manager, if you can identify them. Recruiters are managing dozens of open roles and a full inbox; the hiring manager owns this specific opening and feels the pain of it being unfilled. If you cannot find the hiring manager, an engineer or team member on the team is often a better target than the recruiter, because they can refer you internally.",
  },
  {
    q: "How long should a cold email be?",
    a: "Under 150 words. It should be readable on a phone without scrolling. The most common failure is length: a long email signals that replying will be work, so it gets deferred and then forgotten. Three short paragraphs, who you are, why them specifically, and one clear small ask, is the whole structure.",
  },
  {
    q: "What's the right ask in a cold email?",
    a: "Something small and specific. 'Would you be open to a 15-minute call next week?' works far better than 'I'd love to learn more about opportunities at your company.' Asking for a referral in a first message from a stranger is usually too large an ask; asking for a short conversation, then earning the referral, works considerably better.",
  },
  {
    q: "How do I find someone's email address?",
    a: "Most companies use a predictable format, usually firstname.lastname or first initial plus surname at the domain. Preciprocal's contact finder identifies the pattern for a given company and verifies the address before you send, which matters because bouncing emails hurt your sender reputation and you never learn the message failed.",
  },
  {
    q: "Should I follow up if they don't reply?",
    a: "Once, after about a week, and then stop. A single short follow-up meaningfully increases response rates because inboxes are noisy and your first message may simply have been missed. A second and third follow-up damages your reputation with someone you may want to contact again later in your career.",
  },
  {
    q: "Is the cold outreach generator free?",
    a: "The free plan includes cold outreach generation along with 2 contact lookups per month. Pro raises the lookup limit and adds sequencing so you can track who you have contacted and when a follow-up is due.",
  },
];

const FEATURES = [
  { label: "Personalised from your resume", description: "Pulls the one or two things about your background that are relevant to this role." },
  { label: "Company-specific hooks", description: "References something real about the team, not 'I admire your company culture'." },
  { label: "Right-sized asks", description: "A 15-minute call, not an immediate referral from a stranger." },
  { label: "Subject line variants", description: "Several options scored for open rate, since the subject decides whether any of it is read." },
  { label: "Follow-up sequencing", description: "One well-timed follow-up drafted and scheduled, then it stops." },
  { label: "Tone matching", description: "Different register for a startup founder, a FAANG recruiter, and an alum." },
];

const STEPS = [
  { step: "1", title: "Pick your target", body: "The person and the role. Hiring manager or team member beats recruiter where you can identify them." },
  { step: "2", title: "Generate the message", body: "Your background and the role are combined into a short, specific email with a small clear ask." },
  { step: "3", title: "Edit and send", body: "Cut anything that doesn't sound like you. The best cold email reads like you wrote it in five minutes." },
];

export default function ColdEmailGeneratorPage() {
  return (
    <ToolPage
      breadcrumbName="Cold Email Generator"
      canonicalPath="/cold-email-generator"
      badge="Free, outreach included"
      h1="Cold email generator"
      h1Accent="outreach that gets replies"
      subhead="A cold email that reaches a real person skips the automated screen entirely. Most fail for the same three reasons: too long, too generic, and asking for too much. Write ones that don't."
      ctaTool="cold-outreach"
      ctaLabel="Write my outreach free"
      ctaMicrocopy="Free on the starter plan · No credit card · Editable before sending"
      featuresTitle="What the outreach generator does"
      featuresSubtitle="Short, specific, and small-ask by default, because that is what actually gets answered."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="Why most job search cold emails get ignored"
      faqTitle="Cold email FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "Networking for introverts", href: "/blog/networking-for-introverts-get-referrals-2026" },
        { label: "How to follow up after an interview", href: "/blog/how-to-follow-up-after-interview-without-being-annoying" },
        { label: "Recruiter contact finder", href: "/recruiter-contact-finder" },
        { label: "LinkedIn profile optimizer", href: "/linkedin-profile-optimizer" },
        { label: "Job application tracker", href: "/job-application-tracker" },
        { label: "Cover letter generator", href: "/cover-letter-generator" },
      ]}
      bottomTitle="Skip the portal. Reach a person."
      bottomBody="In a market where few roles are posted publicly and fewer get read, outreach is where the openings actually are."
      bottomMicrocopy="Free on the starter plan · No credit card · Every message editable"
      body={
        <>
          <p>
            Cold outreach has a terrible reputation among job seekers, and it is deserved, but the
            reason is not that the channel does not work. It is that almost every cold email sent by
            a job seeker makes the same three mistakes, and those mistakes are entirely fixable.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">The three failures</h3>
            <ul className="space-y-3">
              {[
                "Too long, anything past 150 words signals that replying will be work, so it gets deferred forever",
                "Too generic, 'I'm passionate about your mission' is indistinguishable from the other forty emails that week",
                "Ask too large, a stranger will not refer you, but they might take a 15-minute call",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-rose-400 flex-shrink-0 mt-0.5">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            The generic problem is the deepest one. A recipient can tell in about two seconds whether
            a message was written for them or blasted to a list, and the tell is usually the second
            sentence. Anything that could have been sent to any company at any time reads as a mail
            merge, regardless of how sincere it is.
          </p>
          <p>
            The fix is one concrete, specific detail. Not the company&apos;s mission statement, something
            you could only know by paying attention. A talk someone on the team gave, a design
            decision in their public API, a post about how they handle on-call. One line of genuine
            specificity outperforms three paragraphs of enthusiasm.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">What a working cold email looks like</h3>
            <p className="text-sm text-slate-400 mb-3">
              <strong className="text-slate-200">Subject:</strong> Question about the payments team
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mb-3">
              Hi Priya, I read your write-up on moving the reconciliation pipeline to event
              sourcing, particularly the part about idempotency keys under retry storms. I spent
              last year on the same problem at a smaller scale and took a different approach, so it
              was a genuinely useful read.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mb-3">
              I&apos;m a backend engineer with three years on payments infrastructure, currently looking
              at the Senior Backend Engineer opening on your team.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Would you be open to 15 minutes in the next couple of weeks? Happy to work around your
              schedule.
            </p>
          </div>

          <p>
            That message is 108 words. It opens with something only a reader of the actual post
            could write, establishes relevance in one sentence, and asks for something small enough
            to say yes to without thinking hard. It does not mention passion, culture fit, or how
            excited the sender is about the opportunity.
          </p>
          <p>
            Note also what it does not ask for: a referral, a resume review, or an introduction to
            the hiring manager. Those are things you earn in the second conversation. Asking for
            them in the first is the most common reason an otherwise good email gets no reply.
          </p>
        </>
      }
    />
  );
}
