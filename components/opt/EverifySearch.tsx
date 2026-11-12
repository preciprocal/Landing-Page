"use client";

/**
 * components/opt/EverifySearch.tsx
 *
 * Search-as-you-type over the full public E-Verify employer list (see
 * lib/everify.ts and app/api/tools/everify/route.ts). STEM OPT needs an
 * employer enrolled in E-Verify, so this answers "can this company sponsor my
 * STEM OPT?" before a student spends an application on it.
 *
 * The data is employer-reported and matched on the name the employer enrolled
 * under, so "not found" is never presented as "not enrolled": the result
 * always points to the official search for a second look. The query is kept
 * in ?q= so a search can be shared.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";

const OFFICIAL_SEARCH = "https://www.e-verify.gov/e-verify-employer-search";
const EXAMPLES = ["Google", "Deloitte", "Stripe", "Northeastern University"];
const DEBOUNCE_MS = 250;

type State = "enrolled" | "ending" | "ended";
interface Account {
  employer: string;
  dba: string | null;
  open: boolean;
  enrolledOn: string | null;
  terminatesOn: string | null;
  workforce: string | null;
}
interface Match {
  name: string;
  enrolledAs: string | null;
  state: State;
  exact: boolean;
  accounts: Account[];
}
interface Result {
  query: string;
  matches: Match[];
  syncedAt: string;
  sourceUpdated: string | null;
  totalEmployers: number;
}

const input =
  "min-h-[52px] w-full min-w-0 rounded-xl bg-white/[0.04] border border-white/[0.08] pl-11 pr-4 py-3 text-[15px] text-white placeholder:text-slate-500 transition-colors hover:border-white/[0.14] focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/25";

const DATE = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const day = (iso: string | null) => (iso ? DATE.format(new Date(`${iso}T00:00:00Z`)) : null);

const BADGE: Record<State, { label: (m: Match) => string; cls: string }> = {
  enrolled: { label: () => "Enrolled", cls: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" },
  ending: {
    label: (m) => `Enrolled until ${day(m.accounts[0].terminatesOn)}`,
    cls: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  ended: { label: () => "Enrollment ended", cls: "border-rose-400/30 bg-rose-400/10 text-rose-300" },
};

export default function EverifySearch() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const reduce = useReducedMotion();
  const abort = useRef<AbortController | null>(null);

  // Read ?q= after mount so the server render and the client agree.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    if (initial) setQ(initial);
  }, []);

  useEffect(() => {
    const term = q.trim();
    const url = new URL(window.location.href);
    if (term) url.searchParams.set("q", term);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);

    abort.current?.abort();
    if (term.replace(/[^a-z0-9]/gi, "").length < 2) {
      setResult(null);
      setError(null);
      setLoading(false);
      return;
    }
    const ctrl = new AbortController();
    abort.current = ctrl;
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/tools/everify?q=${encodeURIComponent(term)}`, { signal: ctrl.signal });
        const body = await res.json();
        if (!res.ok) {
          setError(body.error ?? "Search failed. Try again.");
          setResult(null);
        } else {
          setError(null);
          setResult(body as Result);
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") setError("Search failed. Check your connection and try again.");
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, DEBOUNCE_MS);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q]);

  const fade = {
    initial: reduce ? false : { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? undefined : { opacity: 0 },
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070b16]">
      <div className="border-b border-white/[0.06] p-6 sm:p-8">
        <p className="text-lg font-semibold text-white">E-Verify employer search</p>
        <p className="mt-1.5 text-[12px] text-slate-400">
          The full public USCIS list{result ? `, ${result.totalEmployers.toLocaleString("en-US")} employer accounts` : ""}, copied
          daily. No account needed.
        </p>

        <div className="relative mt-5">
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            aria-label="Company name"
            placeholder="Company name, e.g. Google"
            className={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {loading && (
            <span
              aria-hidden="true"
              className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-white/15 border-t-accent-soft"
            />
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-slate-400">
          <span>Try</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setQ(ex)}
              className="min-h-[32px] rounded-full border border-white/[0.08] bg-white/[0.02] px-3 text-slate-300 transition-colors hover:border-white/[0.16] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/[0.015] p-6 sm:p-8" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {error ? (
            <motion.p key="error" {...fade} className="rounded-xl border border-rose-400/20 bg-rose-400/[0.05] px-5 py-4 text-sm text-rose-200">
              {error}
            </motion.p>
          ) : !result ? (
            <motion.p key="empty" {...fade} className="rounded-xl border border-dashed border-white/[0.08] px-5 py-6 text-sm text-slate-400">
              Type a company name to see whether it is enrolled in E-Verify, since when, and how big it says it is.
            </motion.p>
          ) : result.matches.length === 0 ? (
            <motion.div key={`none-${result.query}`} {...fade} className="rounded-xl border border-white/[0.08] px-5 py-5 text-sm text-slate-300">
              <p className="font-medium text-white">No E-Verify account under &ldquo;{result.query}&rdquo;.</p>
              <p className="mt-1.5 text-slate-400">
                That does not prove the company is not enrolled. Employers enrol under the name they choose, so try a shorter
                or more formal version of the name, then check the{" "}
                <a href={OFFICIAL_SEARCH} target="_blank" rel="noopener noreferrer" className="text-accent-soft underline underline-offset-4 hover:text-white">
                  official search
                </a>{" "}
                and ask the employer.
              </p>
            </motion.div>
          ) : (
            <motion.ul key={`list-${result.query}`} {...fade} className="space-y-3">
              {result.matches.map((m) => (
                <MatchRow key={`${m.name}-${m.accounts.length}-${m.accounts[0].enrolledOn}`} m={m} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <p className="mt-5 text-[11px] leading-relaxed text-slate-400">
          Employer-reported data from the USCIS E-Verify Employer Search
          {result?.sourceUpdated ? `, updated by USCIS on ${day(result.sourceUpdated)}` : ""}. Results match the name an employer
          enrolled under, and a company can have several accounts. Confirm on the{" "}
          <a href={OFFICIAL_SEARCH} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-accent-soft underline underline-offset-4 hover:text-white">
            official search
            <ExternalLink aria-hidden="true" className="h-3 w-3" />
          </a>{" "}
          and with the employer before you rely on it.
        </p>
      </div>
    </div>
  );
}

function MatchRow({ m }: { m: Match }) {
  const best = m.accounts[0];
  const badge = BADGE[m.state];
  const others = m.accounts.length - 1;
  return (
    <li className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 sm:px-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="break-words text-[15px] font-semibold text-white">{m.name}</p>
          {m.enrolledAs && <p className="mt-0.5 break-words text-[12px] text-slate-400">Enrolled as {m.enrolledAs}</p>}
          <p className="mt-1 text-[12px] text-slate-400">
            {[
              best.enrolledOn && `Enrolled ${day(best.enrolledOn)}`,
              best.terminatesOn && `${best.open ? "Ends" : "Ended"} ${day(best.terminatesOn)}`,
              best.workforce && `Workforce ${best.workforce}`,
            ]
              .filter(Boolean)
              .join("  ·  ")}
          </p>
        </div>
        <span className={`inline-flex w-fit shrink-0 items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${badge.cls}`}>
          {badge.label(m)}
        </span>
      </div>

      {others > 0 && (
        <details className="group mt-2.5">
          <summary className="inline-flex min-h-[28px] cursor-pointer list-none items-center text-[12px] font-medium text-accent-soft hover:text-white [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">
              {others} more account{others > 1 ? "s" : ""} under this name
            </span>
            <span className="hidden group-open:inline">Hide other accounts</span>
          </summary>
          <ul className="mt-2 space-y-1.5 border-l border-white/[0.08] pl-3">
            {m.accounts.slice(1).map((a, i) => (
              <li key={i} className="text-[12px] text-slate-400">
                <span className="text-slate-300">{a.employer}</span>
                {a.dba ? ` (${a.dba})` : ""}
                {" · "}
                <span className={a.open ? "text-emerald-300" : "text-rose-300"}>{a.open ? "Open" : "Ended"}</span>
                {a.enrolledOn ? ` · enrolled ${day(a.enrolledOn)}` : ""}
                {a.terminatesOn ? ` · ${a.open ? "ends" : "ended"} ${day(a.terminatesOn)}` : ""}
                {a.workforce ? ` · ${a.workforce}` : ""}
              </li>
            ))}
          </ul>
        </details>
      )}
    </li>
  );
}
