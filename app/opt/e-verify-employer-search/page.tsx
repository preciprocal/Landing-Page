/**
 * app/opt/e-verify-employer-search/page.tsx
 *
 * Targets: "E-Verify employer search", "is this company E-Verify", "E-Verify
 * companies list", "STEM OPT E-Verify employer", "E-Verify check company".
 *
 * An independent lookup over the public E-Verify Employer Search records,
 * refreshed daily (lib/everify.ts). It speaks as a third-party reference
 * tool: it names its data source and says it is not affiliated with USCIS,
 * rather than describing how the data is collected.
 *
 * Field meanings and caveats: the USCIS search page. The STEM OPT
 * requirement: the DHS Study in the States STEM OPT overview.
 */

import type { Metadata } from "next";
import Link from "next/link";
import OptGuidePage from "@/components/OptGuidePage";
import EverifySearch from "@/components/opt/EverifySearch";
import { SRC } from "@/lib/optSources";

const DESCRIPTION =
  "Look up any employer's E-Verify enrolment status, enrolment date and workforce size. Search more than 1.2 million employer records, updated daily from USCIS.";

export const metadata: Metadata = {
  title: "E-Verify Employer Search | Check Any Company's Enrolment",
  description: DESCRIPTION,
  keywords: [
    "E-Verify employer search",
    "is this company E-Verify",
    "E-Verify companies list",
    "STEM OPT E-Verify employer",
    "E-Verify check company",
  ],
  alternates: { canonical: "https://preciprocal.com/opt/e-verify-employer-search" },
  openGraph: {
    title: "E-Verify Employer Search",
    description: DESCRIPTION,
    url: "https://preciprocal.com/opt/e-verify-employer-search",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v3.png", width: 1200, height: 630 }],
  },
};

const FAQS = [
  {
    q: "Does an employer need E-Verify for STEM OPT?",
    a: "Yes. The 24-month STEM OPT extension must be pursued through an employer enrolled in E-Verify, and the employer must remain in good standing with the program.",
  },
  {
    q: "Where does this data come from?",
    a: "From the public E-Verify Employer Search published by USCIS, which USCIS updates daily. Records are self-reported by employers at enrolment, so their accuracy depends on what each employer submitted.",
  },
  {
    q: "A company does not appear. Does that mean it is not enrolled?",
    a: "Not necessarily. Employers enrol under a name of their choosing, which may be a legal name, a trade name or an abbreviation. A doing-business-as name only appears if the employer provided one. Try alternative names, and confirm directly with the employer.",
  },
  {
    q: "Why are there several records for one company?",
    a: "Large organisations often hold separate accounts for different legal entities or hiring sites, and terminated accounts remain on record. Employers with several locations may also choose which sites participate in E-Verify.",
  },
  {
    q: "Is Preciprocal affiliated with USCIS or E-Verify?",
    a: "No. This is an independent reference tool built on public records. For an authoritative answer, use the official E-Verify Employer Search or ask the employer.",
  },
];

export default function EverifyEmployerSearchPage() {
  return (
    <OptGuidePage
      breadcrumbName="E-Verify employer search"
      canonicalPath="/opt/e-verify-employer-search"
      headline="E-Verify Employer Search"
      description={DESCRIPTION}
      h1="E-Verify employer search"
      h1Accent="for any US company"
      intro="Check whether an employer participates in E-Verify, the federal program a STEM OPT employer must be enrolled in. See enrolment status, enrolment date and reported workforce size in seconds."
      badge={<span>Public USCIS records, updated daily</span>}
      disclaimer="Independent reference tool, not affiliated with USCIS or the Department of Homeland Security. Records are self-reported by employers."
      sourcesTitle="Data and references"
      hideCheckedDate
      keyFacts={[
        { value: "1.2M+", label: "Employer records searchable" },
        { value: "Daily", label: "Updates from USCIS" },
        { value: "STEM OPT", label: "Requires an E-Verify employer" },
        { value: "Free", label: "No account required" },
      ]}
      tool={<EverifySearch />}
      ctaTool="job-tracker"
      bottomTitle="Know the status of every employer you apply to."
      bottomBody="The Preciprocal job tracker shows E-Verify status on each application automatically. Free to start."
      faqs={FAQS}
      sources={[SRC.everifySearch, SRC.stemOverview]}
      body={
        <>
          <h2>Why it matters</h2>
          <p>
            An employer must be enrolled in E-Verify, and remain in good standing, to employ a student on the STEM OPT
            extension. Start-ups and small businesses are eligible if they meet every requirement. Confirming enrolment
            before you apply helps you focus on employers that can support your extension. The{" "}
            <Link href="/opt/stem-opt-extension">STEM OPT guide</Link> covers the remaining employer requirements.
          </p>

          <h2>Reading a record</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Employer name:</strong> the name used at enrolment, which may be a legal name, trade name or
              abbreviation.
            </li>
            <li>
              <strong>Enrolled:</strong> the date the employer signed the E-Verify Memorandum of Understanding.
            </li>
            <li>
              <strong>Terminated:</strong> the date that agreement ended. A future date means the account is active until
              then.
            </li>
            <li>
              <strong>Workforce:</strong> the size band the employer reported, shown for employers with five or more
              employees.
            </li>
          </ul>

          <h2>No match found</h2>
          <p>
            Search the formal name shown on the job posting or offer letter, and try removing words such as
            &ldquo;Technologies&rdquo; or &ldquo;Group&rdquo;. If the employer still does not appear, confirm with the
            recruiter whether the company uses E-Verify at the hiring site you would join.
          </p>
        </>
      }
    />
  );
}
