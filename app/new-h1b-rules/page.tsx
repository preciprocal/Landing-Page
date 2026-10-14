/**
 * app/new-h1b-rules/page.tsx
 *
 * Targets: "new H-1B rules", "H-1B changes 2026", "H-1B $100,000 fee status",
 * "H-1B weighted lottery", "new H-1B fee for F-1 students".
 *
 * A standing tracker, not a dated post: the URL has no year so links and
 * ranking accumulate on one page, and the title month is read from the
 * freshness snapshot so it cannot claim a newer check than really happened.
 *
 * EVERY status below was verified on the snapshot date against the sources
 * listed at the bottom. When you re-check, update the rows, the body, the
 * timeline, and then bump "visa-rule-trackers" in lib/contentFreshness.ts.
 */

import type { Metadata } from "next";
import RuleTrackerPage, { type RuleRow } from "@/components/RuleTrackerPage";
import { formatCheckedAt } from "@/lib/contentFreshness";

const MONTH = formatCheckedAt("visa-rule-trackers");
const DESCRIPTION =
  "Every H-1B rule change and where it stands now: the blocked $100,000 fee, the proposed $103,265 cap fee that would reach F-1 students, the wage-weighted lottery, the layoff order, and the DOL wage proposal.";

export const metadata: Metadata = {
  title: `New H-1B Rules (${MONTH}): What Changed`,
  description: DESCRIPTION,
  keywords: [
    "new H-1B rules",
    "H-1B changes 2026",
    "H-1B $100,000 fee status",
    "H-1B weighted lottery",
    "H-1B $103,265 fee",
    "H-1B fee F-1 students",
    "H-1B prevailing wage rule",
    "FY2028 H-1B lottery",
  ],
  alternates: { canonical: "https://preciprocal.com/new-h1b-rules" },
  openGraph: {
    title: `New H-1B Rules (${MONTH}): What Is Actually in Force`,
    description: DESCRIPTION,
    url: "https://preciprocal.com/new-h1b-rules",
    type: "article",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `New H-1B Rules (${MONTH})`,
    description: "What is in force, what is blocked, and what is only proposed.",
  },
};

const ROWS: RuleRow[] = [
  {
    rule: "Wage-weighted H-1B lottery",
    status: "in-effect",
    anchor: "weighted-lottery",
    summary:
      "Higher offered wage levels get more lottery entries (Level I gets 1, Level IV gets 4). Used for the FY2027 cap in March 2026, and expected to govern the FY2028 registration in March 2027.",
  },
  {
    rule: "$100,000 fee on new H-1B petitions (Proclamation 10973)",
    status: "blocked",
    anchor: "100k-fee",
    summary:
      "Extended on September 18, 2026 to September 21, 2027, but blocked by two federal courts. It cannot be collected today. Appeals are pending, so it could return.",
  },
  {
    rule: "Proposed $103,265 fee on cap-subject petitions",
    status: "proposed",
    anchor: "103k-fee",
    summary:
      "A separate DHS rule proposed in August 2026. Unlike the $100,000 fee, it would also apply to F-1 students changing status inside the US. Not in effect until a final rule is published.",
  },
  {
    rule: "Executive order on layoffs and H-1B decisions",
    status: "in-effect",
    anchor: "layoff-order",
    summary:
      "Agencies must consider whether a sponsor had layoffs in the past year, or plans them, when deciding H-1B petitions and labor condition applications. Implementation details are still thin.",
  },
  {
    rule: "DOL proposal to raise prevailing wage levels",
    status: "proposed",
    anchor: "prevailing-wage",
    summary:
      "Would move the four wage levels from the 17th, 34th, 50th and 67th percentiles to the 34th, 52nd, 70th and 88th. Proposed in March 2026, not final.",
  },
];

const FAQS = [
  {
    q: "Is the $100,000 H-1B fee in effect right now?",
    a: "No. It was extended on September 18, 2026 to September 21, 2027, but a Massachusetts federal court vacated the policy implementing it in June 2026, the First Circuit refused to pause that ruling in July, and a California federal court blocked the renewed version on September 30, 2026. USCIS cannot collect it today. Appeals are pending, so the status can change.",
  },
  {
    q: "Do F-1 students on OPT have to pay the $100,000 fee?",
    a: "The $100,000 fee was aimed at beneficiaries coming from abroad, not at people already in the US changing status, so F-1 students changing to H-1B inside the US were not covered by it. It is also blocked for now. The separate proposed $103,265 fee is different: as proposed, it would apply to cap-subject change of status petitions, which includes most F-1 to H-1B cases.",
  },
  {
    q: "Who pays the H-1B fee, the employer or the employee?",
    a: "Both fees are charged to the petitioning employer as part of the H-1B petition. Whether an employer can recover the cost from the worker is a separate question governed by wage and labor rules, so ask an attorney before agreeing to repay any petition cost.",
  },
  {
    q: "How does the wage-weighted H-1B lottery work?",
    a: "Each registration is entered a number of times based on the OEWS wage level that the offered salary meets for that occupation and location: Level I once, Level II twice, Level III three times, Level IV four times. Every level can still be selected, but a higher wage level improves the odds. If several employers register the same person, the lowest wage level among them is used.",
  },
  {
    q: "When is the next H-1B lottery?",
    a: "The FY2028 registration is expected in March 2027, for jobs starting October 1, 2027. USCIS had not announced the exact dates when we last checked. The FY2027 cap was reached, with no second lottery, on July 17, 2026.",
  },
  {
    q: "Which employers are exempt from the H-1B cap and the proposed fee?",
    a: "Universities, nonprofits affiliated with universities, and nonprofit or government research organisations are cap-exempt. They can file H-1B petitions year-round without the lottery, and the proposed $103,265 fee would not apply to them.",
  },
  {
    q: "Does the layoff executive order mean companies with layoffs cannot sponsor?",
    a: "No. It requires adjudicators to consider whether the sponsor had layoffs in the past year or plans them, especially where similarly situated US workers were affected. It does not ban sponsorship. Expect slower processing and more scrutiny of employers with recent layoffs.",
  },
];

const TIMELINE = [
  { date: "February 27, 2026", event: "Wage-weighted selection rule takes effect." },
  { date: "March 4 to 19, 2026", event: "FY2027 registration, the first under weighted selection." },
  { date: "March 27, 2026", event: "DOL publishes its proposal to raise prevailing wage levels." },
  { date: "June 8, 2026", event: "Massachusetts federal court vacates the policy implementing the $100,000 fee." },
  { date: "July 17, 2026", event: "USCIS announces the FY2027 cap is reached. No second lottery." },
  { date: "July 24, 2026", event: "First Circuit denies the government's request to pause the Massachusetts ruling." },
  { date: "August 2026", event: "DHS proposes a $103,265 fee on cap-subject H-1B petitions. Comments closed in late September." },
  { date: "September 18, 2026", event: "Proclamation extends the $100,000 fee to September 21, 2027. An executive order on layoffs and H-1B decisions is issued alongside it." },
  { date: "September 30, 2026", event: "California federal court blocks the renewed $100,000 fee until DHS completes notice-and-comment rulemaking." },
  { date: "March 2027 (expected)", event: "FY2028 H-1B registration." },
];

const SOURCES = [
  { label: "USCIS: DHS Proposes Additional H-1B Fee (August 24, 2026)", href: "https://www.uscis.gov/newsroom/news-releases/dhs-proposes-additional-h-1b-fee" },
  { label: "Fragomen: scope of the proposed $103,265 fee", href: "https://www.fragomen.com/insights/united-states-uscis-proposes-new-fee-of-over-dollar100000-for-h-1b-cap-subject-petitions.html" },
  { label: "JURIST: second federal judge blocks the $100,000 fee", href: "https://www.jurist.org/news/2026/10/second-federal-judge-blocks-president-trumps-100k-h-1b-visa-fee-and-orders-dhs-to-complete-proper-rulemaking/" },
  { label: "Klasko: timeline of the $100,000 fee litigation", href: "https://www.klaskolaw.com/august-2026-100000-h-1b-fee-blocked-again/" },
  { label: "Yale OISS: proclamation extends the fee, fee remains blocked", href: "https://oiss.yale.edu/news/presidential-proclamation-extends-h-1b-100000-fee-policy-fee-remains-blocked-by-court-order" },
  { label: "Law firm summary: the extension and the layoff executive order", href: "https://tandslaw.com/white-house-issues-proclamation-extending-100000-h-1b-fee-and-executive-order-requiring-consideration-of-past-and-planned-employee-layoffs-in-h-1b-adjudications/" },
  { label: "Holland & Knight: DOL prevailing wage proposal", href: "https://www.hklaw.com/en/insights/publications/2026/03/dol-targets-prevailing-wages-sweeping-increases-proposed-for-h1b-h1b1" },
  { label: "Boundless: DOL proposal published March 27, 2026", href: "https://www.boundless.com/blog/dol-h1b-prevailing-wage-nprm-2026" },
  { label: "Mintz: FY2027 cap reached, no second lottery", href: "https://www.mintz.com/insights-center/viewpoints/2806/2026-07-20-uscis-announces-fy2027-h-1b-cap-reached-no-second" },
];

export default function NewH1bRulesPage() {
  return (
    <RuleTrackerPage
      breadcrumbName="New H-1B Rules"
      canonicalPath="/new-h1b-rules"
      headline={`New H-1B Rules (${MONTH}): What Is in Force, Blocked, and Proposed`}
      description={DESCRIPTION}
      datePublished="2026-10-13"
      h1="New H-1B rules"
      h1Accent="what is actually in force"
      intro="H-1B policy changed more in the past year than in the decade before it, and much of what you read is out of date within weeks. Here is every change, whether it applies today, and what it means if you are an F-1 student or a worker hoping to be sponsored."
      rows={ROWS}
      ctaTool="mock-interview"
      bottomTitle="Rules you cannot control. Interviews you can."
      bottomBody="With fewer sponsored roles and higher stakes on wage level, the interviews you do get matter more. Practise them with AI interviewers that ask follow-up questions."
      timeline={TIMELINE}
      faqs={FAQS}
      sources={SOURCES}
      relatedLinks={[
        { label: "New OPT rules", href: "/new-opt-rules" },
        { label: "Self-employment and H-1B", href: "/opt/self-employment" },
        { label: "Cap-gap extension", href: "/opt/cap-gap" },
        { label: "The complete H-1B guide", href: "/blog/h1b-visa-complete-guide-2026" },
        { label: "Finding a job with visa sponsorship", href: "/blog/how-to-get-job-with-visa-sponsorship-2026" },
        { label: "Job search for international students", href: "/for/international-students" },
        { label: "O-1 visa guide", href: "/blog/o1-visa-extraordinary-ability-guide-2026" },
        { label: "How to negotiate a salary offer", href: "/blog/how-to-negotiate-salary-offer" },
      ]}
      body={
        <>
          <h2 id="weighted-lottery">The wage-weighted lottery is live</h2>
          <p>
            The purely random H-1B lottery is gone. DHS finalised a weighted selection rule that took effect on February
            27, 2026 and governed the FY2027 registration in March 2026. Each registration is now entered a number of times
            based on the OEWS prevailing wage level that the offered salary meets for that occupation and area.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-200">
                  <th className="pb-2">Offered wage level</th>
                  <th className="pb-2">Lottery entries</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Level IV", "4"],
                  ["Level III", "3"],
                  ["Level II", "2"],
                  ["Level I", "1"],
                ].map(([level, entries]) => (
                  <tr key={level} className="border-t border-white/[0.06]">
                    <td className="py-2">{level}</td>
                    <td className="py-2">{entries}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            <strong>What it means for you:</strong> salary is now a selection-odds question, not just a pay question. An
            entry-level offer priced at Level I has a quarter of the weight of a Level IV offer. If you are negotiating with
            a sponsoring employer before a cap season, it is reasonable to ask which wage level the offer falls into for
            your occupation code and location. If more than one employer registers you, the lowest level among them is the
            one that counts.
          </p>

          <h2 id="100k-fee">The $100,000 fee: extended, but blocked</h2>
          <p>
            Proclamation 10973, signed in September 2025, required a $100,000 payment for new H-1B petitions, aimed at
            beneficiaries outside the US. It has been switched on and off by courts ever since:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>June 8, 2026:</strong> the US District Court for the District of Massachusetts vacated the agency
              policy implementing the fee.
            </li>
            <li>
              <strong>July 24, 2026:</strong> the First Circuit refused to pause that ruling, finding the government
              unlikely to win on appeal. The merits appeal continues.
            </li>
            <li>
              <strong>September 18, 2026:</strong> a new proclamation extended the fee for another 12 months, to September
              21, 2027, with the same amount and exemptions.
            </li>
            <li>
              <strong>September 30, 2026:</strong> Judge Haywood Gilliam Jr. of the Northern District of California blocked
              implementation of the renewed proclamation until DHS completes notice-and-comment rulemaking.
            </li>
          </ul>
          <p>
            <strong>What it means for you:</strong> the fee cannot be collected today. Employers who stopped hiring from
            abroad during the fee period may be open to it again, so it is worth reopening those conversations. But a
            government win on appeal could bring it back, so anyone relying on consular processing should keep watching.
          </p>

          <h2 id="103k-fee">The proposed $103,265 fee is the one F-1 students should watch</h2>
          <p>
            On August 24, 2026, DHS announced a separate proposed rule that would charge $103,265 on every cap-subject H-1B
            petition, on top of the normal filing fees. This one is going through formal rulemaking, which is exactly
            what the courts said the $100,000 fee skipped, so it is on firmer legal ground if it is finalised.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="mb-3">As proposed, the fee would apply to</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>All cap-subject petitions, including the US master&apos;s cap</li>
              <li>Change of status petitions filed inside the US, which covers most F-1 OPT to H-1B cases</li>
              <li>Consular notification petitions for people abroad</li>
            </ul>
            <h3 className="mt-5 mb-3">It would not apply to</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Cap-exempt employers: universities, affiliated nonprofits, and nonprofit or government research organisations</li>
              <li>People already counted against the cap, such as extensions</li>
            </ul>
          </div>
          <p>
            <strong>What it means for you:</strong> today, staying in the US on OPT shields you from the $100,000 fee. If
            this rule is finalised, that advantage goes away for cap-subject jobs, and every new cap H-1B would cost the
            employer roughly $103,000 more. Expect employers to sponsor more selectively, mostly for senior and high-wage
            roles. Cap-exempt employers become relatively more attractive, so add them to your target list if your field
            has them. The comment period closed in late September 2026, and no final rule or effective date had been
            published when we last checked.
          </p>

          <h2 id="layoff-order">The layoff executive order</h2>
          <p>
            Issued alongside the September 2026 extension, an executive order directs the Departments of State, Labor and
            Homeland Security to coordinate with Commerce, Education and the Small Business Administration when deciding
            H-1B petitions, visa applications and labor condition applications. Adjudicators must consider whether the
            sponsor directly or indirectly had layoffs in the previous year, or plans them, affecting similarly situated US
            workers. The Department of Labor was told to begin reviewing previously filed labor condition applications
            within 30 days.
          </p>
          <p>
            <strong>What it means for you:</strong> it is not a ban, but sponsors with recent layoffs face more scrutiny
            and probably slower processing. When you are weighing offers, a sponsor&apos;s recent layoff history is now a
            fair question to ask.
          </p>

          <h2 id="prevailing-wage">The DOL prevailing wage proposal</h2>
          <p>
            The Department of Labor published a proposed rule on March 27, 2026 that would raise the four prevailing wage
            levels used for H-1B, H-1B1, E-3 and PERM green card cases. Level I would move from the 17th to the 34th
            percentile of local wages, Level II from the 34th to the 52nd, Level III from the 50th to the 70th, and Level
            IV from the 67th to the 88th. It would apply to new filings after it takes effect, not to approved cases. It
            was still a proposal when we last checked, so the current levels apply.
          </p>
          <p>
            <strong>What it means for you:</strong> if it is finalised, the minimum salary for a sponsored role goes up.
            Our reading is that, because lottery weight follows those same wage levels, a given salary would also land at a
            lower level and earn fewer lottery entries. Ask your employer&apos;s immigration counsel how they read it for
            your role.
          </p>
        </>
      }
    />
  );
}
