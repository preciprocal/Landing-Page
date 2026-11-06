/**
 * components/Chevron.tsx
 *
 * The one "go" mark for links and buttons across the site, in place of the
 * text arrow (→). Sized to the surrounding text and coloured by it, so it can
 * sit at the end of any label: <>Start free <Chevron /></>. Inside a `group`
 * it nudges right on hover.
 */

import { ChevronRight } from "lucide-react";

export default function Chevron({ className = "" }: { className?: string }) {
  return (
    <ChevronRight
      aria-hidden="true"
      strokeWidth={2.25}
      className={`inline-block h-[1.1em] w-[1.1em] shrink-0 align-[-0.2em] transition-transform group-hover:translate-x-0.5 ${className}`}
    />
  );
}
