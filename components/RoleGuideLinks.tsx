/**
 * components/RoleGuideLinks.tsx
 *
 * "More for <role>" block shared by the four role templates: interview
 * questions, resume tips, salary guide and cover letter examples. Each of the
 * 41 roles has a page in all four sections (ALL_ROLES in lib/constants.ts), and
 * before this the interview questions pages linked to none of their sibling
 * guides and the cover letter pages to only one, so a reader on one guide had
 * no path to the others for the same role.
 *
 * Links the three sibling guides for the role, plus one free tool: the ATS
 * resume checker, which is the site's main hook, or on the cover letter pages
 * (which already link the checker in their body) the interview question
 * predictor.
 */

import Link from "next/link";
import Chevron from "@/components/Chevron";

export type RoleGuideSection = "interview-questions" | "resume-tips" | "salary-guide" | "cover-letter-examples";

const GUIDES: { section: RoleGuideSection; title: string; blurb: (role: string) => string }[] = [
  { section: "interview-questions", title: "Interview questions", blurb: (r) => `Real ${r} questions with answers` },
  { section: "resume-tips", title: "Resume tips", blurb: (r) => `ATS keywords and bullets for ${r} resumes` },
  { section: "salary-guide", title: "Salary guide", blurb: (r) => `${r} pay by level and city` },
  { section: "cover-letter-examples", title: "Cover letter examples", blurb: (r) => `${r} cover letters to adapt` },
];

const card = "group p-4 rounded-xl border transition-all hover:border-indigo-500/30 hover:bg-white/[0.03]";
const cardStyle = { background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" };

export default function RoleGuideLinks({
  role,
  roleName,
  current,
  className = "mt-12",
}: {
  /** The role slug, e.g. "software-engineer". */
  role: string;
  /** Display name, e.g. "Software Engineer". */
  roleName: string;
  current: RoleGuideSection;
  className?: string;
}) {
  const siblings = GUIDES.filter((g) => g.section !== current);
  const tool =
    current === "cover-letter-examples"
      ? { href: "/interview-question-predictor", title: "Predict your interview questions", blurb: `Paste a ${roleName} job description, free` }
      : { href: "/free-ats-checker", title: "Check your resume's ATS score", blurb: `Free score and top fixes for your ${roleName} resume` };

  return (
    <section aria-label={`More ${roleName} guides`} className={className}>
      <h2 style={{ color: "#ffffff" }} className="font-semibold text-lg mb-4">
        More {roleName} guides
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {siblings.map((g) => (
          <Link key={g.section} href={`/${g.section}/${role}`} className={card} style={cardStyle}>
            <p style={{ color: "#e2e8f0" }} className="font-medium text-sm mb-1 group-hover:text-white">
              {roleName} {g.title.toLowerCase()}
            </p>
            <p style={{ color: "#64748b" }} className="text-xs leading-relaxed">
              {g.blurb(roleName)} <Chevron />
            </p>
          </Link>
        ))}
        <Link
          href={tool.href}
          className={`${card} hover:border-indigo-400/40`}
          style={{ background: "rgba(99,102,241,0.06)", borderColor: "rgba(99,102,241,0.25)" }}
        >
          <p style={{ color: "#e2e8f0" }} className="font-medium text-sm mb-1 group-hover:text-white">
            {tool.title}
          </p>
          <p style={{ color: "#94a3b8" }} className="text-xs leading-relaxed">
            {tool.blurb} <Chevron />
          </p>
        </Link>
      </div>
    </section>
  );
}
