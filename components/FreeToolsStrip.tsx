/**
 * components/FreeToolsStrip.tsx
 *
 * Homepage section linking the free, no-account tools and the main guide
 * hubs. Two jobs: it gives a visitor who is not ready to sign up something to
 * do on the spot (the free tools are the softest way into the product), and it
 * gives the homepage contextual links into the site. Before this, every
 * internal link on the homepage was in the navbar or footer.
 *
 * Only tools that run on the page without signing up belong in TOOLS. The
 * ATS checker qualifies since it runs its preview in the page (the full
 * report needs an account).
 */

import Link from "next/link";

const TOOLS = [
  {
    href: "/interview-question-predictor",
    title: "Interview question predictor",
    body: "Paste a job description, get the 5 questions you will likely be asked, then answer out loud and get scored.",
    tag: "New",
  },
  {
    href: "/free-ats-checker",
    title: "Free ATS resume checker",
    body: "Upload your resume for an honest score out of 100 and your top fixes, with rewrites.",
  },
  {
    href: "/opt/unemployment-calculator",
    title: "OPT unemployment calculator",
    body: "On F-1 OPT? Count your unemployment days against the limit and see how many you have left.",
  },
  {
    href: "/thank-you-email-after-interview",
    title: "Thank you email writer",
    body: "A short, specific thank you email for any interview stage, ready to copy.",
  },
];

const GUIDES = [
  { href: "/interview-questions", label: "Interview questions by role" },
  { href: "/interview-prep", label: "Company interview guides" },
  { href: "/salary-guide", label: "Salary guides" },
  { href: "/resume-tips", label: "Resume tips by role" },
  { href: "/opt", label: "OPT guides for F-1 students" },
  { href: "/blog", label: "Career prep blog" },
];

export default function FreeToolsStrip() {
  return (
    <div className="py-20 px-6 sm:px-10 lg:px-16 xl:px-32 2xl:px-48 border-t border-white/[0.04]">
      <div className="text-center mb-10">
        <p className="text-[12px] uppercase tracking-wider text-emerald-300 font-semibold mb-3">No account needed</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Start free, right now</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Try a piece of Preciprocal before you sign up. Nothing to install, nothing stored.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-400/30 hover:bg-indigo-500/[0.05]"
          >
            {t.tag && (
              <span className="absolute top-5 right-5 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                {t.tag}
              </span>
            )}
            <p className="text-white font-semibold mb-2 pr-12">{t.title}</p>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">{t.body}</p>
            <span className="text-sm font-semibold text-indigo-300 group-hover:text-indigo-200">Try it free →</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {GUIDES.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="px-4 py-2 rounded-xl border border-white/[0.08] text-slate-400 text-sm hover:text-white hover:border-white/[0.15] transition-all"
          >
            {g.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
