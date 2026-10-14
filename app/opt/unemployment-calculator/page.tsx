/**
 * app/opt/unemployment-calculator/page.tsx
 *
 * Targets: "OPT unemployment calculator", "how to stop the OPT clock", "OPT
 * 90 days unemployment", "STEM OPT 150 days", "what counts as employment on
 * OPT", "volunteer to stop OPT clock".
 *
 * The tool owns the "calculator" and day-to-day "stop the clock" queries; the
 * long-form blog post /blog/how-to-stop-the-clock-f1-students-opt-2026 covers
 * the wider strategy (STEM extension, cap-gap, H-1B) and is linked from here.
 *
 * Employment types: SEVP Policy Guidance 1004-03, section 7.2.1. Counting
 * rules: same guidance 7.1.5 to 7.1.8, and the USCIS Policy Manual.
 */

import type { Metadata } from "next";
import Link from "next/link";
import OptGuidePage from "@/components/OptGuidePage";
import UnemploymentCalculator from "@/components/opt/UnemploymentCalculator";
import { SRC } from "@/lib/optSources";

const DESCRIPTION =
  "Count your OPT unemployment days (90 on OPT, 150 with STEM OPT) and see the date you would hit the limit. Plus every kind of work SEVP says stops the clock, including unpaid, contract and self-employment.";

export const metadata: Metadata = {
  title: "OPT Unemployment Calculator: Stop the Clock",
  description: DESCRIPTION,
  keywords: [
    "OPT unemployment calculator",
    "how to stop the OPT clock",
    "OPT 90 days unemployment",
    "STEM OPT 150 days unemployment",
    "what counts as employment on OPT",
    "volunteer to stop OPT unemployment",
    "OPT unemployment days weekends",
  ],
  alternates: { canonical: "https://preciprocal.com/opt/unemployment-calculator" },
  openGraph: {
    title: "OPT Unemployment Day Calculator, and How to Stop the Clock",
    description: DESCRIPTION,
    url: "https://preciprocal.com/opt/unemployment-calculator",
    type: "article",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
};

const FAQS = [
  {
    q: "How many unemployment days do I get on OPT?",
    a: "Up to 90 days in total during post-completion OPT. If you get a STEM OPT extension, the limit becomes 150 days across both periods combined, so it includes whatever you used on initial OPT.",
  },
  {
    q: "When does the OPT unemployment clock start?",
    a: "On the employment start date printed on your EAD, not the day you graduate and not the day the card arrives. From then on, every day without qualifying employment counts.",
  },
  {
    q: "Do weekends count as unemployment days?",
    a: "Yes. SEVP guidance counts each day, including weekends, that you do not have qualifying employment. Weekends and holidays inside a period of qualifying employment do not count.",
  },
  {
    q: "Does volunteering stop the OPT clock?",
    a: "On post-completion OPT, yes, if the volunteer or unpaid internship role is directly related to your degree, is at least 20 hours a week, and does not violate labor laws. Keep evidence from the organisation of your hours and duties. Unpaid work does not count on STEM OPT.",
  },
  {
    q: "Do days outside the US count as unemployment?",
    a: "Yes, unless you were employed at the time, either on leave your employer authorised or travelling for the job.",
  },
  {
    q: "What happens if I go over 90 days?",
    a: "The regulation says you may not accrue more than 90 days (150 with STEM OPT), so going over puts your F-1 status at risk. If you are close to or past the limit, talk to your DSO immediately about your options before you do anything else.",
  },
  {
    q: "Does the clock keep running during the cap-gap extension?",
    a: "Yes. The USCIS Policy Manual says unemployment during the cap-gap automatic extension counts toward the 90-day limit.",
  },
];

export default function UnemploymentCalculatorPage() {
  return (
    <OptGuidePage
      breadcrumbName="OPT unemployment calculator"
      canonicalPath="/opt/unemployment-calculator"
      headline="OPT Unemployment Day Calculator, and How to Stop the Clock"
      description={DESCRIPTION}
      h1="OPT unemployment calculator"
      h1Accent="and how to stop the clock"
      intro="Every day on OPT without qualifying work counts against a fixed limit: 90 days on post-completion OPT, 150 in total with STEM OPT. Count where you stand, then see which kinds of work stop the count, according to SEVP's own guidance."
      keyFacts={[
        { value: "90", label: "Unemployment days on post-completion OPT" },
        { value: "150", label: "Total with a STEM OPT extension" },
        { value: "20 hrs", label: "Per week to count as employed" },
        { value: "10 days", label: "To report a new employer or address" },
      ]}
      tool={<UnemploymentCalculator />}
      ctaTool="job-tracker"
      bottomTitle="The fastest way to stop the clock is a job."
      bottomBody="Tailored applications, a tracker for every one, and interview practice that turns interviews into offers. Free to start."
      faqs={FAQS}
      sources={[SRC.sevpGuidance, SRC.policyManual, SRC.uscisOpt, SRC.stemOverview, SRC.templeUnemployment, SRC.gatechEmployment]}
      body={
        <>
          <h2>How the count works</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>The clock starts on the employment start date on your EAD.</li>
            <li>Every day without qualifying employment counts, including weekends.</li>
            <li>Qualifying means at least 20 hours a week, directly related to your degree. A variable schedule should average at least 20 hours a week over a month.</li>
            <li>Days outside the US count, unless you were employed and on authorised leave or travelling for work.</li>
            <li>The limit is cumulative. A job between two gaps stops the clock but does not reset it.</li>
            <li>
              <strong>SEVIS only knows what is reported.</strong> SEVP counts every day without employer information on
              your record as unemployment, so a job you have not reported does not stop the count SEVIS keeps. Report
              within 10 days.
            </li>
          </ul>

          <h2>What stops the clock on post-completion OPT</h2>
          <p>
            SEVP&apos;s OPT policy guidance lists the kinds of employment that count on regular post-completion OPT. All
            of them must be directly related to your degree program.
          </p>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <ul className="space-y-4 text-sm">
              {[
                ["Paid employment", "Part time (at least 20 hours a week) or full time."],
                ["Multiple employers", "You can work for more than one employer, as long as every job is related to your degree. Ask your DSO how hours across several part-time jobs will be counted."],
                ["Contract or 1099 work", "Work for hire based on a contract. Keep records of each contract period and the contracting company's name and address."],
                ["Self-employment", "You can start a business. You need the proper business licences and must be actively engaged in a business related to your degree."],
                ["Agency or consulting firm", "Allowed, with evidence that you averaged at least 20 hours a week."],
                ["Volunteer or unpaid internship", "Allowed if it does not violate labor laws and is at least 20 hours a week, with evidence from the organisation of the hours you worked."],
                ["Short-term gigs", "For performing artists with several short engagements. Keep a list of every gig with dates and duration."],
              ].map(([type, rule]) => (
                <li key={type}>
                  <p className="text-slate-200 font-medium">{type}</p>
                  <p className="text-slate-400">{rule}</p>
                </li>
              ))}
            </ul>
          </div>
          <p>
            Self-employment has its own rules, and they differ on STEM OPT and H-1B. See{" "}
            <Link href="/opt/self-employment">self-employment on OPT, STEM OPT and H-1B</Link>.
          </p>

          <h2>On STEM OPT the options are narrower</h2>
          <p>
            During the STEM extension, only work for an E-Verify employer that signs your Form I-983 counts, at least 20
            hours a week, in a bona fide employer-employee relationship. The USCIS Policy Manual says you may not work for
            the employer on a volunteer basis, so unpaid work does not stop the clock on STEM OPT. See the{" "}
            <Link href="/opt/stem-opt-extension">STEM OPT guide</Link>.
          </p>

          <h2>What does not stop the clock</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Travelling abroad while unemployed.</li>
            <li>The cap-gap extension: unemployment during cap-gap still counts toward the limit.</li>
            <li>
              Starting a new degree. Beginning study at a new education level, or transferring schools, ends your OPT
              authorisation altogether, according to USCIS. Talk to your DSO before enrolling.
            </li>
          </ul>
          <p>
            For the longer-term ways to buy time, from the STEM extension to the cap-gap bridge to H-1B, read our guide on{" "}
            <Link href="/blog/how-to-stop-the-clock-f1-students-opt-2026">how F-1 students stop the clock</Link>.
          </p>
        </>
      }
    />
  );
}
