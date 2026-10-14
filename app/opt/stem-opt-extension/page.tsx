/**
 * app/opt/stem-opt-extension/page.tsx
 *
 * Targets: "STEM OPT extension", "STEM OPT eligibility", "STEM OPT
 * requirements", "how to apply for STEM OPT", "STEM OPT reporting", "STEM OPT
 * E-Verify", "Form I-983".
 *
 * Eligibility and employer rules: DHS STEM OPT Hub. Filing window and the
 * 180-day extension: USCIS OPT page. Reporting: STEM OPT overview and FAQ.
 * Fees: USCIS G-1055 (10/07/26).
 */

import type { Metadata } from "next";
import Link from "next/link";
import OptGuidePage from "@/components/OptGuidePage";
import FilingDateCalculator from "@/components/opt/FilingDateCalculator";
import { SRC } from "@/lib/optSources";

const DESCRIPTION =
  "The 24-month STEM OPT extension: who qualifies, the E-Verify and Form I-983 requirements, when to file, the 180-day automatic extension, reporting every six months, and the 150-day unemployment limit.";

export const metadata: Metadata = {
  title: "STEM OPT Extension: Eligibility and Rules",
  description: DESCRIPTION,
  keywords: [
    "STEM OPT extension",
    "STEM OPT eligibility",
    "STEM OPT requirements",
    "how to apply for STEM OPT",
    "STEM OPT reporting requirements",
    "STEM OPT E-Verify",
    "Form I-983",
    "STEM OPT 180 day extension",
  ],
  alternates: { canonical: "https://preciprocal.com/opt/stem-opt-extension" },
  openGraph: {
    title: "STEM OPT Extension: Eligibility, Employer Rules and Deadlines",
    description: DESCRIPTION,
    url: "https://preciprocal.com/opt/stem-opt-extension",
    type: "article",
    images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }],
  },
};

const FAQS = [
  {
    q: "Who is eligible for the STEM OPT extension?",
    a: "F-1 students in their initial period of post-completion OPT who hold a bachelor's or higher degree in a field on the DHS STEM Designated Degree Program List, from an accredited, SEVP-certified school, and who have a job offer from an E-Verify employer that will sign a Form I-983 training plan.",
  },
  {
    q: "Can I use an earlier STEM degree if my current degree is not STEM?",
    a: "Yes, if your most recent degree is from an accredited, SEVP-certified school, and the earlier STEM degree (bachelor's or higher) was earned within 10 years of your STEM OPT application. The field must be on the STEM list at the time you apply, not when you earned the degree.",
  },
  {
    q: "When should I apply for STEM OPT?",
    a: "Up to 90 days before your current OPT expires, and within 60 days of your DSO entering the recommendation in SEVIS. It must be filed before your OPT ends: you cannot apply during the 60-day grace period.",
  },
  {
    q: "Can I keep working while my STEM OPT application is pending?",
    a: "Yes, if you filed on time. When a timely STEM OPT application is pending and your OPT expires, USCIS automatically extends your work authorization for up to 180 days. It ends when USCIS decides the application.",
  },
  {
    q: "Does my STEM OPT employer have to be my OPT employer?",
    a: "No. Your STEM OPT employer can be different from your post-completion OPT employer, as long as it meets the STEM OPT requirements, including E-Verify enrolment.",
  },
  {
    q: "How many times can I get STEM OPT?",
    a: "Once per degree level, so at most twice in your academic career. The second requires a second qualifying degree at a higher level.",
  },
  {
    q: "Can I be unpaid or self-employed on STEM OPT?",
    a: "No for unpaid: the USCIS Policy Manual says you may not work for the employer on a volunteer basis. Self-employment generally does not work either, because you must be a bona fide employee of an employer that signs the I-983, and you cannot sign the employer attestation yourself. See our self-employment guide.",
  },
];

export default function StemOptPage() {
  return (
    <OptGuidePage
      breadcrumbName="STEM OPT extension"
      canonicalPath="/opt/stem-opt-extension"
      headline="STEM OPT Extension: Eligibility, Employer Rules and Deadlines"
      description={DESCRIPTION}
      h1="The STEM OPT extension"
      h1Accent="eligibility, rules and deadlines"
      intro="If your degree is on the DHS STEM list, you can extend OPT by 24 months. The extension comes with stricter rules than regular OPT: an E-Verify employer, a signed training plan, and reports to your DSO every six months."
      keyFacts={[
        { value: "24 months", label: "Length of the extension" },
        { value: "150", label: "Total unemployment days, OPT plus STEM" },
        { value: "90 days", label: "Earliest you can file before OPT ends" },
        { value: "180 days", label: "Automatic extension if filed on time" },
      ]}
      tool={<FilingDateCalculator />}
      ctaTool="job-tracker"
      bottomTitle="STEM OPT starts with an E-Verify employer."
      bottomBody="Track every application, note which employers use E-Verify, and practise the interviews that get you the offer."
      faqs={FAQS}
      sources={[SRC.stemEligibility, SRC.stemOverview, SRC.stemFaq, SRC.uscisOpt, SRC.uscisI765, SRC.policyManual, SRC.uscisFees]}
      body={
        <>
          <h2>Eligibility</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>A bachelor&apos;s or higher degree in a field on the DHS STEM Designated Degree Program List, from a school that is accredited and SEVP-certified when you apply.</li>
            <li>Or an earlier qualifying STEM degree earned within 10 years of applying, if your most recent degree is from an accredited, SEVP-certified school.</li>
            <li>You must be in your initial period of post-completion OPT. You cannot apply in the 60-day grace period after it ends.</li>
            <li>Once per degree level, and no more than twice in total.</li>
          </ul>

          <h2>What your employer has to do</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Be enrolled in E-Verify. Start-ups can qualify if they meet every requirement.</li>
            <li>Guarantee at least 20 hours of work a week.</li>
            <li>Provide formal training and learning objectives, and complete Form I-983 with you, showing the training relates directly to your STEM degree.</li>
            <li>Have a bona fide employer-employee relationship with you. You cannot sign the employer attestation yourself, and volunteer arrangements are not allowed.</li>
            <li>Report to your DSO within five business days if you leave the job early.</li>
          </ul>
          <p>
            E-Verify enrolment is the requirement most likely to rule out an employer, especially small companies and
            start-ups. Ask about it early in the hiring process, before you accept an offer that depends on STEM OPT.
          </p>

          <h2>How to apply</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Get a job offer from an eligible employer and complete Form I-983 together.</li>
            <li>Submit the I-983 to your DSO and request the STEM OPT recommendation.</li>
            <li>
              File Form I-765 with USCIS within 60 days of the recommendation, and no earlier than 90 days before your
              current OPT ends. The fee is $470 online or $520 on paper, plus $1,780 if you want premium processing.
            </li>
            <li>If you filed on time, you can keep working for up to 180 days past your current EAD while USCIS decides.</li>
          </ol>
          <p>The calculator above works out your filing window from your current EAD end date.</p>

          <h2>Reporting while on STEM OPT</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Report to your DSO every six months to confirm your name, address and employer details.</li>
            <li>Complete self-evaluations on your training: one within the first 12 months and a final one before the extension ends.</li>
            <li>
              Report material changes to your training plan as soon as possible, with a modified I-983 signed by you and
              your employer. These include a drop below 20 hours a week and a pay cut not explained by fewer hours.
            </li>
            <li>Report a change of name, address or employer within 10 days. A new employer needs a new Form I-983.</li>
          </ul>

          <h2>Unemployment on STEM OPT</h2>
          <p>
            The limit becomes 150 days across your whole OPT period, including what you used on initial OPT. Only
            qualifying work for an E-Verify employer under an I-983 stops the clock. Use the{" "}
            <Link href="/opt/unemployment-calculator">unemployment calculator</Link> in STEM mode to see where you stand.
          </p>

          <h2>The proposed $30,000 STEM OPT fee</h2>
          <p>
            DHS proposed in October 2026 that schools pay $30,000 for each OPT recommendation after a student&apos;s
            first, which would include the STEM extension. It is a proposal, not in effect, and would not apply to
            extensions recommended before a final rule takes effect. Details and a checker are in our{" "}
            <Link href="/opt/fees">OPT fees guide</Link>.
          </p>
        </>
      }
    />
  );
}
