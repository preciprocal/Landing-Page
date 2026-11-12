/**
 * app/opt/employer-lookup/page.tsx
 *
 * Targets: "H-1B sponsor lookup", "does this company sponsor H-1B", "E-Verify
 * employer search", "is this company E-Verify", "STEM OPT employer check".
 * Was /opt/e-verify-employer-search (permanent redirect in next.config.ts).
 *
 * An independent employer check over two public USCIS datasets (lib/everify.ts):
 * the E-Verify Employer Search, refreshed daily, and the H-1B Employer Data
 * Hub, refreshed as USCIS publishes it. It speaks as a third-party reference
 * tool: it names its sources and says it is not affiliated with USCIS, rather
 * than describing how the data is collected.
 *
 * Facts: OPT is authorised through the student's EAD and must relate to the
 * major (USCIS OPT page); STEM OPT needs an E-Verify employer in good standing
 * and an I-983 (USCIS OPT page, DHS STEM OPT overview); H-1B counts are
 * workers on first decision (USCIS Data Hub guide).
 */

import type { Metadata } from "next";
import Link from "next/link";
import OptGuidePage from "@/components/OptGuidePage";
import EverifySearch from "@/components/opt/EverifySearch";
import { SRC } from "@/lib/optSources";

const TITLE = "H-1B Sponsor and E-Verify Employer Lookup for OPT and STEM OPT";
const DESCRIPTION =
  "Free employer lookup for F-1 students: see if a company is enrolled in E-Verify for STEM OPT, and how many H-1B workers USCIS approved for it each year.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "H-1B sponsor lookup",
    "H-1B sponsor search",
    "does this company sponsor H-1B",
    "H-1B sponsoring companies",
    "H-1B employer data",
    "E-Verify employer search",
    "E-Verify employer lookup",
    "is this company E-Verify",
    "E-Verify companies list",
    "STEM OPT employer check",
    "STEM OPT E-Verify employer",
    "OPT employer lookup",
    "visa sponsorship companies for F-1 students",
    "employer lookup for international students",
  ],
  alternates: { canonical: "https://preciprocal.com/opt/employer-lookup" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://preciprocal.com/opt/employer-lookup",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v3.png", width: 1200, height: 630 }],
  },
};

const FAQS = [
  {
    q: "Does an employer need to sponsor me for OPT?",
    a: "No. OPT is authorised by USCIS through your own Employment Authorization Document, not by an employer petition. Any employer can hire you on OPT, as long as the role is directly related to your major.",
  },
  {
    q: "What does an employer need for STEM OPT?",
    a: "It must be enrolled in and using E-Verify, remain in good standing with the program, and sign your Form I-983 training plan. Start-ups and small businesses qualify if they meet every requirement.",
  },
  {
    q: "Does an H-1B record mean the company will sponsor me?",
    a: "No. It shows how many H-1B workers USCIS approved for that employer, based on USCIS's first decision on each petition. It is a strong signal that the company sponsors, but whether it sponsors a given role is the employer's decision. Ask the recruiter early.",
  },
  {
    q: "A company shows no record. Does that mean it is not eligible?",
    a: "Not necessarily. Records are listed under the name the employer used with USCIS, which may be a legal name, a trade name or an abbreviation, and large companies often file through separate legal entities. Try alternative names, and confirm with the employer.",
  },
  {
    q: "How current is the data?",
    a: "USCIS updates the E-Verify Employer Search daily and the H-1B Employer Data Hub quarterly. The search shows the date each dataset is current to.",
  },
  {
    q: "Is Preciprocal affiliated with USCIS or E-Verify?",
    a: "No. This is an independent reference tool built on public records. For an authoritative answer, use the official USCIS tools or ask the employer.",
  },
];

export default function EmployerLookupPage() {
  return (
    <OptGuidePage
      breadcrumbName="Employer lookup"
      canonicalPath="/opt/employer-lookup"
      headline={TITLE}
      description={DESCRIPTION}
      h1="Employer lookup"
      h1Accent={"for OPT, STEM OPT and H-⁠1B"}
      intro="Look up any US employer to see its E-Verify enrolment, which STEM OPT requires, and how many H-1B workers USCIS has approved for it each year. Know where you stand before you apply."
      badge={<span>Public USCIS records</span>}
      disclaimer="Independent reference tool, not affiliated with USCIS or the Department of Homeland Security. For general information, not legal advice."
      sourcesTitle="Data and references"
      hideCheckedDate
      keyFacts={[
        { value: "1.2M+", label: "E-Verify employer records" },
        { value: "55,000+", label: "Employers with H-1B decisions in FY2026" },
        { value: "3 years", label: "Of H-1B approvals per employer" },
        { value: "Free", label: "No account required" },
      ]}
      tool={<EverifySearch />}
      ctaTool="job-tracker"
      bottomTitle="Know where every employer stands."
      bottomBody="The Preciprocal job tracker shows E-Verify status and H-1B history on each application automatically. Free to start."
      faqs={FAQS}
      sources={[SRC.uscisOpt, SRC.stemOverview, SRC.everifySearch, SRC.h1bHub, SRC.h1bHubGuide]}
      body={
        <>
          <h2>What each stage needs</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>OPT:</strong> no employer petition. Your EAD authorises the work, and the role must be directly
              related to your major.
            </li>
            <li>
              <strong>STEM OPT:</strong> an employer enrolled in and using E-Verify, in good standing, that signs your Form
              I-983. See the <Link href="/opt/stem-opt-extension">STEM OPT guide</Link>.
            </li>
            <li>
              <strong>H-1B:</strong> the employer files the petition. Its approval history shows whether it has done so
              before, and how often.
            </li>
          </ul>

          <h2>Reading the H-1B figures</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Approved</strong> counts workers across every petition type: new employment, continuation, change
              of employer, concurrent and amended.
            </li>
            <li>
              <strong>New</strong> is the subset approved for new employment, the closest measure of new hires sponsored.
            </li>
            <li>Figures reflect USCIS&apos;s first decision on each petition and exclude petitions still pending.</li>
            <li>Fiscal years run October to September, so FY2026 ended on September 30, 2026.</li>
          </ul>

          <h2>No match found</h2>
          <p>
            Search the formal name shown on the job posting or offer letter, and try removing words such as
            &ldquo;Technologies&rdquo; or &ldquo;Group&rdquo;. Large employers often file through a separate legal entity,
            such as &ldquo;Amazon.com Services&rdquo;. If the employer still does not appear, ask the recruiter directly.
          </p>
        </>
      }
    />
  );
}
