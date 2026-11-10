/**
 * components/FAQSection.tsx
 *
 * The homepage FAQ: the six questions in LANDING_FAQS, in the same FaqSection
 * every other page uses, so the FAQ looks and behaves the same across the
 * site. The homepage FAQ structured data (FAQJsonLd in app/page.tsx) lists the
 * same six, so it matches what is shown. The rest live on /faq.
 */

import { LANDING_FAQS } from "@/lib/constants";
import { FaqSection } from "@/components/page/Layout";

export default function FAQSection() {
  return (
    <FaqSection
      items={LANDING_FAQS.map((f) => ({ q: f.q, a: f.a }))}
      more={{ href: "/faq", label: "See all questions" }}
    />
  );
}
