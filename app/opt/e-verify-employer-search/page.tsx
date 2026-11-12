/**
 * app/opt/e-verify-employer-search/page.tsx
 *
 * Targets: "E-Verify employer search", "is this company E-Verify", "E-Verify
 * companies list", "STEM OPT E-Verify employer", "E-Verify check company".
 *
 * The tool searches the full public E-Verify Employer Search list, copied
 * daily (lib/everify.ts). Field meanings and caveats: the USCIS search page
 * itself. The STEM OPT requirement: DHS Study in the States STEM OPT overview.
 */

import type { Metadata } from "next";
import Link from "next/link";
import OptGuidePage from "@/components/OptGuidePage";
import EverifySearch from "@/components/opt/EverifySearch";
import { SRC } from "@/lib/optSources";

const DESCRIPTION =
  "Search the full USCIS E-Verify employer list, copied daily, to see if a company is enrolled before you apply. STEM OPT needs an E-Verify employer.";

export const metadata: Metadata = {
  title: "E-Verify Employer Search for STEM OPT",
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
    title: "E-Verify Employer Search for STEM OPT",
    description: DESCRIPTION,
    url: "https://preciprocal.com/opt/e-verify-employer-search",
    type: "article",
    images: [{ url: "https://preciprocal.com/og-image-v3.png", width: 1200, height: 630 }],
  },
};

const FAQS = [
  {
    q: "Does my employer need E-Verify for regular OPT?",
    a: "No. E-Verify is a requirement of the 24-month STEM OPT extension: you have to pursue it through an employer enrolled in E-Verify. If you plan to extend, check early, because the employer you join on regular OPT is often the one you extend with.",
  },
  {
    q: "Where does this list come from?",
    a: "The public E-Verify Employer Search run by USCIS, which it updates daily at about 2 a.m. ET. This page copies the whole list once a day. The details are what employers reported when they enrolled, so USCIS does not vouch for them.",
  },
  {
    q: "The company is not in the results. Does that mean it does not use E-Verify?",
    a: "Not necessarily. Employers enrol under the name they choose, which can be a legal name, a trade name or an abbreviation, and a doing-business-as name only shows if they gave one. Try other versions of the name, check the official search, and ask the employer directly.",
  },
  {
    q: "Why does one company show several accounts?",
    a: "Large employers often enrol more than once, for different legal entities or hiring sites, and old accounts stay on the list as terminated. A listed company also does not mean every one of its hiring sites uses E-Verify, since employers choose which sites take part.",
  },
  {
    q: "What does \"enrolled until\" mean?",
    a: "The account is open but has a termination date in the future. After that date it is no longer enrolled.",
  },
];

export default function EverifyEmployerSearchPage() {
  return (
    <OptGuidePage
      breadcrumbName="E-Verify employer search"
      canonicalPath="/opt/e-verify-employer-search"
      headline="E-Verify Employer Search for STEM OPT"
      description={DESCRIPTION}
      h1="E-Verify employer search"
      h1Accent="before you apply"
      intro="STEM OPT only works with an employer enrolled in E-Verify. Search the full USCIS list, copied daily, and know before you spend an application on a company that cannot sign your extension."
      keyFacts={[
        { value: "Required", label: "E-Verify enrolment for a STEM OPT employer" },
        { value: "Daily", label: "USCIS updates the list, around 2 a.m. ET" },
        { value: "Self-reported", label: "Employers enter their own details" },
        { value: "5+", label: "Employees before workforce size is shown" },
      ]}
      tool={<EverifySearch />}
      ctaTool="job-tracker"
      bottomTitle="See this for every company you apply to."
      bottomBody="The job tracker puts an E-Verify badge on each application, from the same daily list. Free to start."
      faqs={FAQS}
      sources={[SRC.everifySearch, SRC.stemOverview]}
      body={
        <>
          <h2>Why it matters on STEM OPT</h2>
          <p>
            DHS requires you to pursue the STEM OPT extension through an employer enrolled in E-Verify, and the employer has
            to stay in good standing with E-Verify. Start-ups and small companies can qualify, as long as every requirement
            is met. See the <Link href="/opt/stem-opt-extension">STEM OPT guide</Link> for the rest of what the employer has
            to do.
          </p>

          <h2>How to read a result</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Employer name</strong> is the name used at enrolment: a legal name, a trade name or an abbreviation.
            </li>
            <li>
              <strong>Enrolled</strong> is the date the employer signed the E-Verify Memorandum of Understanding.
              <strong> Ended</strong> is the date that agreement was terminated.
            </li>
            <li>
              <strong>Workforce</strong> is the size band the employer reported. It only appears for employers with at least
              five employees.
            </li>
            <li>The badge uses the open account first, then the most recent one, when a name has several.</li>
          </ul>

          <h2>If the company is missing</h2>
          <p>
            Search for the name on the offer letter or the company&apos;s formal name, and drop words like
            &ldquo;Technologies&rdquo; or &ldquo;Group&rdquo; one at a time. If it still does not show, check the official
            search, then ask the recruiter whether the company uses E-Verify for the site you would work at. A missing
            result is a question to ask, not an answer.
          </p>
        </>
      }
    />
  );
}
