/**
 * app/opt/page.tsx
 *
 * Hub for the OPT cluster. Targets the head terms ("OPT", "OPT for F-1
 * students", "what is OPT") and passes link equity down to every guide in
 * lib/optGuides.ts, which is what makes the cluster crawlable as a unit.
 */

import type { Metadata } from "next";
import Link from "next/link";
import OptGuidePage from "@/components/OptGuidePage";
import { OPT_GUIDES } from "@/lib/optGuides";
import { SRC } from "@/lib/optSources";

const DESCRIPTION =
  "OPT for F-1 students in one place: how to apply and when, the 90 and 150 day unemployment limits, STEM OPT, self-employment, cap-gap, current fees and the proposed $70,000 fee. Checked against USCIS and DHS.";

export const metadata: Metadata = {
  title: "OPT Guide for F-1 Students (2026)",
  description: DESCRIPTION,
  keywords: [
    "OPT",
    "OPT for F-1 students",
    "what is OPT",
    "optional practical training",
    "OPT rules",
    "OPT guide",
    "STEM OPT",
  ],
  alternates: { canonical: "https://preciprocal.com/opt" },
  openGraph: {
    title: "OPT Guide for F-1 Students: Rules, Dates, Fees and Tools",
    description: DESCRIPTION,
    url: "https://preciprocal.com/opt",
    type: "article",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
};

const FAQS = [
  {
    q: "What is OPT?",
    a: "Optional Practical Training is temporary work authorization for F-1 students in a job directly related to their major. You get up to 12 months per education level, before or after you finish your program, and STEM graduates can extend it by 24 months.",
  },
  {
    q: "Is OPT changing in 2026?",
    a: "The core rules have not changed. DHS has proposed new fees, $70,000 for a first OPT and $30,000 for later ones including STEM OPT, paid by schools, but that is a proposal and not in effect. A separate rule ending duration of status was blocked by a court in September 2026.",
  },
  {
    q: "How long can I stay on OPT?",
    a: "Up to 12 months of post-completion OPT, which must be finished within 14 months of your program end date, plus 24 more months if you qualify for the STEM extension.",
  },
  {
    q: "Do I need a job offer to apply for OPT?",
    a: "USCIS does not list a job offer among the requirements for regular post-completion OPT, which is why the 90-day unemployment allowance exists: you can look for work after your OPT starts. The STEM extension is different: you need an E-Verify employer that signs a Form I-983 training plan before you apply.",
  },
];

export default function OptHubPage() {
  return (
    <OptGuidePage
      breadcrumbName="OPT guides"
      canonicalPath="/opt"
      headline="OPT Guide for F-1 Students: Rules, Dates, Fees and Tools"
      description={DESCRIPTION}
      h1="OPT for F-1 students"
      h1Accent="rules, dates, fees and tools"
      intro="Everything about Optional Practical Training and the STEM extension, checked against USCIS, DHS and SEVP sources, with calculators for your filing window and your unemployment days."
      keyFacts={[
        { value: "12 months", label: "OPT per education level" },
        { value: "+24 months", label: "STEM OPT extension" },
        { value: "90 / 150", label: "Unemployment days, OPT / with STEM" },
        { value: "$470", label: "I-765 fee online today" },
      ]}
      ctaTool="resume-tailoring"
      bottomTitle="OPT is a clock. Use it well."
      bottomBody="Tailored resumes, a tracker for every application, and interview practice, so your OPT turns into an offer. Free to start."
      faqs={FAQS}
      sources={[SRC.uscisOpt, SRC.policyManual, SRC.stemEligibility, SRC.uscisFees, SRC.optFeeNotice]}
      body={
        <>
          <h2>Start here</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OPT_GUIDES.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="block bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.15] transition-colors !no-underline"
              >
                <p className="text-white font-semibold">{g.label}</p>
                <p className="text-slate-500 text-sm mt-1">{g.blurb}</p>
              </Link>
            ))}
          </div>

          <h2>OPT in one minute</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Available after one full academic year of full-time enrolment in F-1 status.</li>
            <li>The job must be directly related to your major. On post-completion OPT it must be at least 20 hours a week to count.</li>
            <li>Up to 12 months per education level, before or after graduation. Pre-completion OPT is deducted from the 12 months.</li>
            <li>Apply between 90 days before and 60 days after your program end date, within 30 days of your DSO&apos;s recommendation.</li>
            <li>You can be unemployed for up to 90 days in total, or 150 with STEM OPT. Weekends and days abroad count.</li>
            <li>STEM graduates can extend by 24 months with an E-Verify employer and a Form I-983 training plan.</li>
            <li>Report your employer, and any change of employer, address or name, within 10 days.</li>
          </ul>

          <h2>What is changing</h2>
          <p>
            Two proposals and one blocked rule are worth knowing about: the proposed $70,000 and $30,000 OPT fees, the
            proposed $103,265 H-1B fee that would reach F-1 students changing status, and the blocked rule ending duration
            of status. None is in effect. The <Link href="/new-opt-rules">OPT rules tracker</Link> and the{" "}
            <Link href="/new-h1b-rules">H-1B rules tracker</Link> follow each one.
          </p>

          <p>
            Looking for work on OPT? Our <Link href="/for/international-students">guide for international students</Link>{" "}
            covers the job search itself.
          </p>
        </>
      }
    />
  );
}
