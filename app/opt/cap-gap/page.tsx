/**
 * app/opt/cap-gap/page.tsx
 *
 * Targets: "cap gap extension", "cap gap OPT", "cap gap April 1", "cap gap
 * travel", "cap gap unemployment".
 *
 * Sources: DHS Study in the States on the April 1 change (H-1B modernization
 * rule, effective January 17, 2025), the USCIS small entity compliance guide
 * for that rule, the USCIS Policy Manual (unemployment during cap-gap), and
 * SEVP Policy Guidance 1004-03 section 9.4.2 (travel).
 */

import type { Metadata } from "next";
import Link from "next/link";
import OptGuidePage from "@/components/OptGuidePage";
import { SRC } from "@/lib/optSources";

const DESCRIPTION =
  "The cap-gap extension keeps F-1 students in status, and working, from OPT to an October H-1B start. Since 2025 it runs to April 1. Who qualifies, when it ends, unemployment, and why not to travel.";

export const metadata: Metadata = {
  title: "Cap-Gap Extension: OPT to H-1B (April 1)",
  description: DESCRIPTION,
  keywords: [
    "cap gap extension",
    "cap gap OPT",
    "cap gap April 1",
    "cap gap travel",
    "cap gap unemployment",
    "cap gap H-1B F-1",
    "what is cap gap",
  ],
  alternates: { canonical: "https://preciprocal.com/opt/cap-gap" },
  openGraph: {
    title: "Cap-Gap Extension: Staying in Status from OPT to H-1B",
    description: DESCRIPTION,
    url: "https://preciprocal.com/opt/cap-gap",
    type: "article",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
};

const FAQS = [
  {
    q: "What is the cap-gap extension?",
    a: "An automatic extension of F-1 status, and in many cases work authorization, for students whose OPT or STEM OPT would end before their H-1B starts. It covers the gap between the end of OPT and an H-1B start date in the new fiscal year, which begins October 1.",
  },
  {
    q: "How long does cap-gap last now?",
    a: "Until April 1 of the fiscal year the H-1B is requested for. It used to end on October 1. DHS moved it to April 1 in the H-1B modernization rule, effective January 17, 2025, starting with the FY2026 registration.",
  },
  {
    q: "Who qualifies for cap-gap?",
    a: "F-1 students in a valid period of status who have not violated it, and who are the beneficiary of a timely filed cap-subject H-1B petition that requests a change of status (not consular processing) with a start date in the fiscal year. To keep working, you must be in a valid period of post-completion OPT or STEM OPT.",
  },
  {
    q: "Can I work during cap-gap?",
    a: "Yes, if you were in a valid period of post-completion OPT or STEM OPT. The extension covers both status and work authorization. If you were only in your grace period, it extends status but not the right to work.",
  },
  {
    q: "What happens if my H-1B petition is denied?",
    a: "The cap-gap extension ends immediately if the petition is denied, withdrawn, rejected or revoked. You lose F-1 work authorization at that point and have a 60-day grace period to prepare to depart.",
  },
  {
    q: "Can I travel during cap-gap?",
    a: "SEVP recommends not travelling if possible. USCIS treats a change of status application as abandoned if you leave the US while it is pending, so travelling can mean giving up the change of status your cap-gap depends on. Talk to your DSO and your employer's immigration counsel before booking anything.",
  },
  {
    q: "Do unemployment days still count during cap-gap?",
    a: "Yes. The USCIS Policy Manual says unemployment during the cap-gap automatic extension counts toward the 90-day limit.",
  },
];

export default function CapGapPage() {
  return (
    <OptGuidePage
      breadcrumbName="Cap-gap extension"
      canonicalPath="/opt/cap-gap"
      headline="Cap-Gap Extension: Staying in Status from OPT to H-1B"
      description={DESCRIPTION}
      h1="The cap-gap extension"
      h1Accent="from OPT to H-1B, now to April 1"
      intro="If your OPT ends before your H-1B starts on October 1, cap-gap can keep you in status and working in between. Since 2025 it lasts until April 1, which also covers petitions that are still pending when the fiscal year begins."
      keyFacts={[
        { value: "April 1", label: "When cap-gap now ends (was October 1)" },
        { value: "Jan 17, 2025", label: "When the change took effect" },
        { value: "60 days", label: "Grace period if the petition is denied" },
        { value: "90", label: "Unemployment limit still applies" },
      ]}
      ctaTool="mock-interview"
      bottomTitle="Cap-gap starts with an H-1B offer."
      bottomBody="Practise the interviews that lead to sponsored offers, with AI interviewers that ask follow-up questions. Free to start."
      faqs={FAQS}
      sources={[SRC.capGap, SRC.h1bModernizationRule, SRC.policyManual, SRC.sevpGuidance]}
      body={
        <>
          <h2>Who qualifies</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You are in a valid period of F-1 status and have not violated it.</li>
            <li>You are the beneficiary of a timely filed, cap-subject H-1B petition.</li>
            <li>The petition requests a change of status to H-1B, not consular processing.</li>
            <li>It requests an employment start date in the fiscal year the H-1B is for.</li>
            <li>To keep working, you are in a valid period of post-completion OPT or STEM OPT.</li>
          </ul>

          <h2>What changed in 2025</h2>
          <p>
            Cap-gap used to end on October 1, the first day of the new fiscal year. If USCIS had not approved the H-1B by
            then, students fell out of work authorization while they waited. The H-1B modernization rule, effective
            January 17, 2025, moved the end date to April 1 of the relevant fiscal year, starting with the FY2026
            registration. A petition still pending on October 1 no longer pushes you off payroll.
          </p>

          <h2>When cap-gap ends early</h2>
          <p>
            If the H-1B petition is denied, withdrawn, rejected or revoked, the extension ends immediately. You lose F-1
            work authorization and have a 60-day grace period to prepare to depart. If you are not
            selected in the lottery, there is no petition, so there is no cap-gap.
          </p>

          <h2>Rules that still apply</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Unemployment keeps counting.</strong> Days without qualifying work during cap-gap count toward your
              limit. Check yours with the <Link href="/opt/unemployment-calculator">unemployment calculator</Link>.
            </li>
            <li>
              <strong>Reporting continues.</strong> Report any change of address, name or employment interruption to
              your DSO within 10 days, as on regular OPT.
            </li>
            <li>
              <strong>Avoid travel.</strong> SEVP recommends not leaving the US during cap-gap, because USCIS treats a
              pending change of status as abandoned if you leave.
            </li>
          </ul>

          <h2>H-1B changes to watch</h2>
          <p>
            The lottery is now weighted by wage level, and DHS has proposed a $103,265 fee on cap-subject petitions that
            would, unlike the blocked $100,000 fee, apply to change of status petitions from F-1. The{" "}
            <Link href="/new-h1b-rules">H-1B rules tracker</Link> has where each stands.
          </p>
        </>
      }
    />
  );
}
