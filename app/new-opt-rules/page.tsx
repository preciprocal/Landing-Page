/**
 * app/new-opt-rules/page.tsx
 *
 * Targets: "new OPT rules", "OPT rule change 2026", "OPT fee $70,000", "STEM
 * OPT new rules", "duration of status rule blocked".
 *
 * A standing tracker with a year-free URL, same as /new-h1b-rules. Fee-specific
 * queries ("OPT fee 70000") belong to /opt/fees, which this page links to; the
 * title here stays on "what changed" so the two do not compete.
 *
 * EVERY status below was verified on the snapshot date against the sources
 * listed at the bottom. When you re-check, update the rows, the body, the
 * timeline, and then bump "visa-rule-trackers" in lib/contentFreshness.ts.
 */

import type { Metadata } from "next";
import Link from "next/link";
import RuleTrackerPage, { type RuleRow } from "@/components/RuleTrackerPage";
import { formatCheckedAt } from "@/lib/contentFreshness";

const MONTH = formatCheckedAt("visa-rule-trackers");
const DESCRIPTION =
  "Every OPT rule change and where it stands: the proposed $70,000 and $30,000 OPT fees, the blocked duration of status rule, the EAD extension change, and the OPT and STEM OPT rules that have not changed.";

export const metadata: Metadata = {
  title: `New OPT Rules (${MONTH}): What Changed`,
  description: DESCRIPTION,
  keywords: [
    "new OPT rules",
    "OPT rule change 2026",
    "OPT fee 70000",
    "OPT fee proposal",
    "STEM OPT new rules",
    "duration of status rule blocked",
    "OPT unemployment days",
    "F-1 OPT news",
  ],
  alternates: { canonical: "https://preciprocal.com/new-opt-rules" },
  openGraph: {
    title: `New OPT Rules (${MONTH}): What Is Actually in Force`,
    description: DESCRIPTION,
    url: "https://preciprocal.com/new-opt-rules",
    type: "article",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `New OPT Rules (${MONTH})`,
    description: "The $70,000 OPT fee proposal, the blocked D/S rule, and what has not changed.",
  },
};

const ROWS: RuleRow[] = [
  {
    rule: "Proposed $70,000 and $30,000 OPT fees",
    status: "proposed",
    anchor: "opt-fees",
    summary:
      "Schools would pay $70,000 for a student's first OPT recommendation and $30,000 for each later one, including STEM OPT. Published October 8, 2026. Comments are open until November 9. Not in effect.",
  },
  {
    rule: "End of duration of status (fixed admission periods)",
    status: "blocked",
    anchor: "duration-of-status",
    summary:
      "Was due to start September 15, 2026. A federal court blocked it nationwide on September 14, and the government has appealed. D/S still applies.",
  },
  {
    rule: "Proposed $103,265 H-1B cap fee",
    status: "proposed",
    anchor: "h1b-fee",
    summary:
      "Would apply to F-1 students changing status to a cap-subject H-1B inside the US, which the blocked $100,000 fee did not. Not in effect.",
  },
  {
    rule: "End of automatic EAD extensions for renewals",
    status: "in-effect",
    anchor: "ead-extension",
    summary:
      "Ended for most renewal categories in October 2025. The separate 180-day extension for timely STEM OPT applications still applies.",
  },
  {
    rule: "Core OPT and STEM OPT rules",
    status: "unchanged",
    anchor: "unchanged",
    summary:
      "12 months of OPT, a 24-month STEM extension, 90 days of unemployment (150 with STEM), the filing windows, and the cap-gap extension all work as before.",
  },
];

const FAQS = [
  {
    q: "Is the $70,000 OPT fee in effect?",
    a: "No. It is a proposed rule published on October 8, 2026. It would take effect only after DHS reviews public comments and publishes a final rule, and then 60 days after that. Current OPT and STEM OPT rules and fees still apply.",
  },
  {
    q: "Who would pay the proposed OPT fee, the student or the school?",
    a: "The proposal puts the fee on the school. A DSO could not enter the OPT recommendation in SEVIS until the school pays, and USCIS could not approve the EAD until it is paid. DHS acknowledges that schools may pass the cost on to students or employers, so how it lands on you would depend on your school.",
  },
  {
    q: "I am already on OPT. Will I have to pay?",
    a: "Not for your current period. As proposed, students already on OPT or STEM OPT, and students whose OPT is recommended or approved before the effective date, are not charged for that OPT period. A later request, such as a STEM OPT extension recommended after the rule takes effect, would carry the $30,000 fee.",
  },
  {
    q: "Does the OPT fee apply to the STEM OPT extension?",
    a: "Yes, as proposed. The STEM extension counts as a later OPT recommendation, so it would carry the $30,000 fee. A full OPT plus STEM OPT path would total $100,000 if both recommendations fall after the effective date.",
  },
  {
    q: "How do I comment on the OPT fee proposal?",
    a: "Through regulations.gov, under docket ICEB-2026-0100. DHS's notice gives November 9, 2026 as the close of comments, while some law firm summaries give November 7, so submit early. Comments sent by email or mail are not considered, and submitted comments, including personal details, are published.",
  },
  {
    q: "Is duration of status ending?",
    a: "Not right now. DHS published a final rule replacing D/S with fixed admission dates, due to start September 15, 2026, but a federal court in Massachusetts blocked it nationwide on September 14. The government appealed to the First Circuit on September 30. Until the courts say otherwise, D/S remains in place.",
  },
  {
    q: "How many unemployment days do I get on OPT?",
    a: "Unchanged: up to 90 days in total during post-completion OPT, plus 60 more during a STEM OPT extension, for 150 in total. The count is cumulative across your whole OPT period.",
  },
  {
    q: "Should I apply for OPT early because of the proposed fee?",
    a: "You cannot file earlier than the rules allow, which is up to 90 days before your program end date. But within the allowed window, an earlier recommendation and filing means you are more likely to be covered before any final rule takes effect. Talk to your DSO about your school's plans now.",
  },
];

const TIMELINE = [
  { date: "October 30, 2025", event: "DHS ends automatic EAD extensions for most renewal categories." },
  { date: "July 17, 2026", event: "DHS publishes the final rule ending duration of status, effective September 15." },
  { date: "August 2026", event: "DHS proposes the $103,265 H-1B cap fee, which would reach F-1 change of status cases." },
  { date: "September 14, 2026", event: "Federal court in Massachusetts blocks the duration of status rule nationwide." },
  { date: "September 30, 2026", event: "Government appeals the duration of status ruling to the First Circuit." },
  { date: "October 8, 2026", event: "DHS publishes the proposed $70,000 and $30,000 OPT fees." },
  { date: "November 9, 2026", event: "Public comments on the OPT fee proposal close, per DHS." },
  { date: "Final rule + 60 days", event: "When the OPT fees would take effect, if finalised." },
];

const SOURCES = [
  { label: "Study in the States (DHS): proposed rule establishing OPT fees", href: "https://studyinthestates.dhs.gov/2026/10/dhs-publishes-proposed-rule-establishing-fees-for-optional-practical-training" },
  { label: "DHS press release: proposed fees for the foreign student work program", href: "https://www.dhs.gov/news/2026/10/07/dhs-proposes-fees-foreign-student-work-program-protect-american-jobs" },
  { label: "Duane Morris: details of the $70,000 and $30,000 OPT fees", href: "https://blogs.duanemorris.com/immigrationlaw/2026/10/07/dhs-proposes-70000-and-30000-fees-for-f-1-optional-practical-training/" },
  { label: "NAFSA: legal challenge to the duration of status rule", href: "https://www.nafsa.org/legal-defense-DS" },
  { label: "USCIS: DHS Proposes Additional H-1B Fee", href: "https://www.uscis.gov/newsroom/news-releases/dhs-proposes-additional-h-1b-fee" },
];

export default function NewOptRulesPage() {
  return (
    <RuleTrackerPage
      breadcrumbName="New OPT Rules"
      canonicalPath="/new-opt-rules"
      headline={`New OPT Rules (${MONTH}): The $70,000 Fee Proposal and What Is in Force`}
      description={DESCRIPTION}
      datePublished="2026-10-13"
      h1="New OPT rules"
      h1Accent="what changed and what did not"
      intro="A proposed $70,000 OPT fee, a blocked rule on how long F-1 students can stay, and an H-1B fee proposal that would reach OPT students for the first time. Here is what each one does, whether it applies today, and what to do about it."
      rows={ROWS}
      ctaTool="resume-tailoring"
      bottomTitle="Your OPT clock is the one thing that has not changed."
      bottomBody="Tailored resumes, a tracker for every application, and interview practice, so the unemployment days you have go further."
      timeline={TIMELINE}
      faqs={FAQS}
      sources={SOURCES}
      relatedLinks={[
        { label: "OPT and STEM OPT fees", href: "/opt/fees" },
        { label: "All OPT guides", href: "/opt" },
        { label: "New H-1B rules", href: "/new-h1b-rules" },
        { label: "F-1 OPT and the EAD card", href: "/blog/ead-card-f1-visa-opt-complete-guide-2026" },
        { label: "How to stop the OPT clock", href: "/blog/how-to-stop-the-clock-f1-students-opt-2026" },
        { label: "Job search for international students", href: "/for/international-students" },
        { label: "Finding a job with visa sponsorship", href: "/blog/how-to-get-job-with-visa-sponsorship-2026" },
        { label: "How to check your visa status", href: "/blog/how-to-check-your-visa-status-2026" },
      ]}
      body={
        <>
          <h2 id="opt-fees">The proposed $70,000 and $30,000 OPT fees</h2>
          <p>
            On October 8, 2026, DHS published a proposed rule (docket ICEB-2026-0100) that would attach new fees to OPT
            recommendations. DHS says the aim is to fight fraud, protect US workers, and make schools more selective about
            which students they recommend.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="mb-3">How the fee would work</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>$70,000</strong> for a student&apos;s first OPT recommendation. Law firm summaries describe this as
                the first OPT of any type, which would include pre-completion OPT.
              </li>
              <li>
                <strong>$30,000</strong> for each later recommendation, including the STEM OPT extension.
              </li>
              <li>
                <strong>Paid by the school</strong>, before the DSO can enter the recommendation in SEVIS. USCIS could not
                approve the EAD until it is paid.
              </li>
              <li>
                <strong>Takes effect 60 days after a final rule</strong>, not before.
              </li>
              <li>
                <strong>Current students are protected for their current period:</strong> anyone already on OPT or STEM
                OPT, or recommended or approved before the effective date, is not charged for that period.
              </li>
            </ul>
          </div>
          <p>
            <strong>What it means for you:</strong> nothing changes today. If it is finalised, the question becomes how
            your school responds. DHS itself acknowledges schools may pass the cost on to students or employers, and some
            schools may recommend far fewer students. If you will need OPT in the next year, ask your international student
            office what they plan to do, and file as early as your window allows. If you are on OPT now and will need STEM
            OPT later, note that the extension would carry the $30,000 fee if it is recommended after the effective date.
          </p>
          <p>
            Our <Link href="/opt/fees">OPT fees guide</Link> has a checker for whether the proposed fee would apply
            to you, and what you pay today. Comments are open on regulations.gov under docket ICEB-2026-0100. DHS gives November 9, 2026 as the deadline;
            some law firm summaries give November 7, so submit early. Specific, factual comments about how the fee would
            affect you carry more weight than form letters.
          </p>

          <h2 id="duration-of-status">Duration of status: blocked by a court</h2>
          <p>
            DHS published a final rule on July 17, 2026 that would replace &quot;duration of status&quot; with a fixed
            admit-until date tied to your I-20 program end date, capped at four years, with a 30-day grace period instead
            of 60. Extensions would have required Form I-539 filed with USCIS. It was due to start on September 15, 2026.
          </p>
          <p>
            On September 14, 2026, Judge F. Dennis Saylor IV of the US District Court for the District of Massachusetts
            blocked the rule nationwide and barred DHS and ICE from implementing it while the case, brought by NAFSA and a
            coalition of plaintiffs, continues. The government appealed to the First Circuit on September 30.
          </p>
          <p>
            <strong>What it means for you:</strong> D/S still applies, and the transition dates you may have read about,
            including the March 18, 2027 OPT filing date, only matter if the rule eventually takes effect. If you have
            international travel planned, keep watching the appeal, because a reversal could change how your re-entry I-94
            is issued.
          </p>

          <h2 id="h1b-fee">The H-1B fee that would reach OPT students</h2>
          <p>
            The blocked $100,000 H-1B fee never applied to F-1 students changing status inside the US. The separate
            $103,265 fee DHS proposed in August 2026 would: as proposed, it covers cap-subject change of status petitions,
            which is how most OPT students move to H-1B. It is not in effect. Cap-exempt employers, such as universities and
            nonprofit research organisations, would not pay it.
          </p>
          <p>
            Our <Link href="/new-h1b-rules" className="text-indigo-300 underline underline-offset-2">H-1B rules tracker</Link>{" "}
            covers this fee, the wage-weighted lottery, and the other H-1B changes in detail.
          </p>

          <h2 id="ead-extension">Automatic EAD extensions ended, but not the STEM OPT one</h2>
          <p>
            An interim final rule on October 30, 2025 ended automatic extensions of work authorisation for most EAD renewal
            categories. That mostly hits H-4 spouses, pending adjustment applicants and similar categories. For F-1
            students, the separate 180-day rule still applies: if you file your STEM OPT extension before your
            post-completion OPT EAD expires, you can keep working for up to 180 days while it is pending.
          </p>

          <h2 id="unchanged">What has not changed</h2>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <ul className="space-y-3 text-sm">
              {[
                "Post-completion OPT gives up to 12 months of work authorisation per degree level",
                "STEM OPT adds 24 months, with an E-Verify employer and a Form I-983 training plan",
                "Up to 90 days of unemployment on post-completion OPT, and 60 more on STEM OPT, for 150 in total",
                "File Form I-765 for OPT up to 90 days before your program end date and no later than 60 days after, and within 30 days of your DSO's recommendation",
                "Report a new employer or address within 10 days",
                "The cap-gap extension carries status and work authorisation to April 1 for students with a pending or approved cap H-1B petition",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p>
            The fixed clock is still the real constraint. Whatever happens to the fee proposal, the 90 days of
            unemployment are what decide most OPT job searches, so the useful work is the same as before: start before
            graduation, apply to fewer and better-targeted roles, and get very good at the interviews you land.
          </p>
        </>
      }
    />
  );
}
