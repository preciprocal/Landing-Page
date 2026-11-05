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
 * Links the three sibling guides for the role, plus the free interview
 * question predictor, which is the most useful next step from any of them.
 * The interview questions template already has its own predictor callout, so
 * the predictor card is left out there.
 */

import Link from "next/link";

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
  const showPredictor = current !== "interview-questions";

  return (
    <section aria-label={`More ${roleName} guides`} className={className}>
      <h2 style={{ color: "#ffffff" }} className="font-semibold text-lg mb-4">
        More {roleName} guides
      </h2>
      <div className={`grid gap-3 sm:grid-cols-2 ${showPredictor ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {siblings.map((g) => (
          <Link key={g.section} href={`/${g.section}/${role}`} className={card} style={cardStyle}>
            <p style={{ color: "#e2e8f0" }} className="font-medium text-sm mb-1 group-hover:text-white">
              {roleName} {g.title.toLowerCase()}
            </p>
            <p style={{ color: "#64748b" }} className="text-xs leading-relaxed">
              {g.blurb(roleName)} →
            </p>
          </Link>
        ))}
        {showPredictor && (
          <Link
            href="/interview-question-predictor"
            className={`${card} hover:border-indigo-400/40`}
            style={{ background: "rgba(99,102,241,0.06)", borderColor: "rgba(99,102,241,0.25)" }}
          >
            <p style={{ color: "#e2e8f0" }} className="font-medium text-sm mb-1 group-hover:text-white">
              Predict your interview questions
            </p>
            <p style={{ color: "#94a3b8" }} className="text-xs leading-relaxed">
              Paste a {roleName} job description, free →
            </p>
          </Link>
        )}
      </div>
    </section>
  );
}
