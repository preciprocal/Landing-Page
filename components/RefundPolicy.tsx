"use client";

/**
 * components/RefundPolicy.tsx
 *
 * A single one-line refund notice under the plan cards on the homepage and on
 * /pricing. It replaced a two-card block, which in turn replaced a guarantee
 * claim we no longer offer.
 *
 * Deliberately one line and one container. It states both refund routes under a
 * single promise, then stops: the processing-fee deduction, the three required
 * items and the one-billing-period scope are in the Terms, which is what this
 * links to. Do not reintroduce that detail here; two copies of a refund policy
 * is how the old claim went stale on eleven surfaces at once.
 *
 * Four weights of emphasis carry the structure without any extra markup:
 *   emerald bold   the hook, sized up so it is what the eye lands on first
 *   slate-400      the usage refund, with its eligibility gate stated inline
 *   slate-200      the Success Refund, the payoff, so it closes
 *   slate-500      the legal pointer
 * The order is a deliberate arc: name the reader's fear, answer it with two
 * concrete refunds, then point at the conditions. A reader gets the offer at a
 * glance and the specifics only if they go looking, without either being hidden.
 */

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { REFUND_POLICY } from "@/lib/pricing";
import { RevealOnScroll } from "@/components/LandingAnimations";

const linkClass =
  "text-slate-200 underline underline-offset-2 decoration-white/25 hover:decoration-white/60 transition-colors";

export default function RefundPolicy() {
  return (
    <RevealOnScroll
      delay={0.2}
      className="mt-10 max-w-4xl mx-auto flex items-center justify-center gap-2.5 rounded-2xl
                 border border-emerald-500/20 bg-emerald-500/[0.04] px-5 py-3.5"
    >
      <ShieldCheck className="w-[18px] h-[18px] flex-shrink-0 text-emerald-400" aria-hidden="true" />
      <p className="text-[13px] text-slate-400 leading-relaxed">
        <span className="text-[14px] font-bold text-emerald-400">{REFUND_POLICY.hook}</span>{" "}
        {REFUND_POLICY.usageLine}{" "}
        <span className="font-medium text-slate-200">{REFUND_POLICY.successLine}</span>{" "}
        <span className="text-slate-500">
          Full conditions in our{" "}
          <Link href="/terms" className={linkClass}>
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className={linkClass}>
            Privacy Policy
          </Link>
          .
        </span>
      </p>
    </RevealOnScroll>
  );
}
