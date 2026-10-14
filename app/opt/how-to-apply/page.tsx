/**
 * app/opt/how-to-apply/page.tsx
 *
 * Targets: "how to apply for OPT", "OPT application", "when to apply for
 * OPT", "OPT filing deadline", "I-765 for OPT", "OPT start date".
 *
 * Eligibility and limits: USCIS Policy Manual Vol. 2 Part F Ch. 5. Filing
 * windows: USCIS OPT page and I-765 page. Fees: G-1055 (10/07/26). The
 * calculator encodes the same windows (components/opt/FilingDateCalculator).
 */

import type { Metadata } from "next";
import Link from "next/link";
import OptGuidePage from "@/components/OptGuidePage";
import FilingDateCalculator from "@/components/opt/FilingDateCalculator";
import { SRC } from "@/lib/optSources";

const DESCRIPTION =
  "How to apply for OPT step by step: eligibility, the DSO recommendation, Form I-765, the 90-day and 60-day filing window, the 30-day deadline after your recommendation, and a free deadline calculator.";

export const metadata: Metadata = {
  title: "How to Apply for OPT: Dates and Deadlines",
  description: DESCRIPTION,
  keywords: [
    "how to apply for OPT",
    "OPT application process",
    "when to apply for OPT",
    "OPT filing deadline",
    "I-765 for OPT",
    "OPT start date",
    "OPT 14 month rule",
    "pre-completion OPT",
  ],
  alternates: { canonical: "https://preciprocal.com/opt/how-to-apply" },
  openGraph: {
    title: "How to Apply for OPT: Every Date and Deadline, with a Calculator",
    description: DESCRIPTION,
    url: "https://preciprocal.com/opt/how-to-apply",
    type: "article",
    images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }],
  },
};

const FAQS = [
  {
    q: "When can I apply for OPT?",
    a: "For post-completion OPT, USCIS must receive your Form I-765 no earlier than 90 days before your program end date and no later than 60 days after it. You also have to file within 30 days of your DSO entering the OPT recommendation in SEVIS, and that 30-day limit is often the deadline that actually bites.",
  },
  {
    q: "Who is eligible for OPT?",
    a: "F-1 students who have been lawfully enrolled full time for one full academic year. You get up to 12 months of OPT per education level, and a new 12 months when you move to a higher level. You are not eligible for post-completion OPT if you used one year or more of full-time CPT.",
  },
  {
    q: "What start date should I choose for OPT?",
    a: "Any date from the day after your program ends up to 60 days after it. You cannot request a start more than 60 days after your program end date. Choose carefully: the unemployment clock starts on your EAD start date, so a start date earlier than your likely job start uses up unemployment days.",
  },
  {
    q: "Can I start working before my EAD arrives?",
    a: "No. You cannot start OPT until USCIS has approved your Form I-765, you have your EAD, and the start date on the card has arrived.",
  },
  {
    q: "How much does it cost to apply for OPT?",
    a: "$470 if you file Form I-765 online, $520 on paper, plus $1,780 for optional premium processing. A proposed $70,000 OPT fee would be paid by schools, not students, and is not in effect.",
  },
  {
    q: "Does pre-completion OPT reduce my post-completion OPT?",
    a: "Yes. Any pre-completion OPT at the same education level is deducted from your 12 months. Part-time pre-completion OPT (20 hours a week or less) counts at half: USCIS's example is that one year of part-time pre-completion OPT uses 6 months, leaving 6. A full year of full-time pre-completion OPT uses all 12, leaving none.",
  },
  {
    q: "What is the 14-month rule?",
    a: "All post-completion OPT must be completed within 14 months after your program ends. If USCIS approves your application late, your OPT end date does not move past that 14-month point. The rule does not apply to the STEM extension.",
  },
];

export default function HowToApplyPage() {
  return (
    <OptGuidePage
      breadcrumbName="How to apply for OPT"
      canonicalPath="/opt/how-to-apply"
      headline="How to Apply for OPT: Every Date and Deadline"
      description={DESCRIPTION}
      h1="How to apply for OPT"
      h1Accent="every date and deadline"
      intro="Applying for OPT means two steps against two clocks: your DSO's recommendation, then Form I-765 with USCIS inside a fixed window. Put in your program end date to see yours."
      keyFacts={[
        { value: "90 days", label: "Earliest filing before your program ends" },
        { value: "60 days", label: "Latest filing after your program ends" },
        { value: "30 days", label: "To file after your DSO's recommendation" },
        { value: "$470", label: "I-765 fee online ($520 on paper)" },
      ]}
      tool={<FilingDateCalculator />}
      ctaTool="resume-tailoring"
      bottomTitle="Apply for OPT. Then make the days count."
      bottomBody="Get your resume and interviews ready before your EAD start date, so the unemployment clock barely runs."
      faqs={FAQS}
      sources={[SRC.uscisOpt, SRC.uscisI765, SRC.policyManual, SRC.uscisFees, SRC.sevpGuidance]}
      body={
        <>
          <h2>Before you apply: are you eligible?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You have been lawfully enrolled full time for one full academic year.</li>
            <li>You have not used one year or more of full-time CPT, which makes you ineligible for post-completion OPT.</li>
            <li>You have OPT time left at this education level. Any pre-completion OPT you used is deducted from the 12 months.</li>
            <li>The work you plan to do is directly related to your major.</li>
          </ul>

          <h2>Step by step</h2>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>Ask your DSO for an OPT recommendation.</strong> Your school has its own request process. The DSO
              enters the recommendation in SEVIS and issues an updated I-20. Pick your requested start date here: any day
              from the day after your program ends up to 60 days after.
            </li>
            <li>
              <strong>File Form I-765 within 30 days of the recommendation.</strong> Category (c)(3)(B) for
              post-completion OPT, or (c)(3)(A) for pre-completion. It must also fall inside the window of 90 days before
              to 60 days after your program end date. The fee is $470 online or $520 on paper.
            </li>
            <li>
              <strong>Decide on premium processing.</strong> It is optional and costs $1,780 on top of the filing fee.
            </li>
            <li>
              <strong>Wait for approval and the card.</strong> You cannot work until the I-765 is approved, you have the
              EAD, and its start date has arrived.
            </li>
            <li>
              <strong>Once working, report your employer within 10 days</strong> through the SEVP Portal or your DSO,
              and report any later change of employer, address or name within 10 days too.
            </li>
          </ol>

          <h2>Choosing your start date</h2>
          <p>
            The unemployment count starts on the start date on your EAD, so the earliest possible start date is not
            always the best one. If you do not have a job lined up, a later start (still within 60 days of your program
            end) keeps unemployment days in reserve. If you have an offer, match the start date to it. Track your count
            with the <Link href="/opt/unemployment-calculator">unemployment calculator</Link>.
          </p>

          <h2>Pre-completion OPT</h2>
          <p>
            You can also use OPT before you finish your program, after one full academic year. While school is in
            session it is limited to 20 hours a week; full time is allowed during breaks. Every month of it is deducted
            from your post-completion OPT at the same education level.
          </p>

          <h2>After OPT</h2>
          <p>
            If your degree is on the STEM list, you can extend by 24 months: see the{" "}
            <Link href="/opt/stem-opt-extension">STEM OPT guide</Link>. If an employer files a cap H-1B petition for you,
            the <Link href="/opt/cap-gap">cap-gap extension</Link> can bridge the gap to your H-1B start.
          </p>
        </>
      }
    />
  );
}
