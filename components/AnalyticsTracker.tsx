"use client";

/**
 * components/AnalyticsTracker.tsx
 *
 * Mounts first-party analytics once, from app/layout.tsx, and reports a page
 * view on every App Router navigation.
 *
 * Deliberately NOT inside ConsentedAnalytics. That component gates Google
 * Analytics and Microsoft Clarity, which are third parties that set cookies and
 * must not load until the visitor opts in. This one is first-party and
 * cookieless until consent is given: it runs for everyone, but sends no
 * persistent identifier unless the banner was accepted. Keeping the two
 * separate is what lets the site measure all of its traffic while still
 * honouring a decline.
 *
 * It reads `usePathname` but deliberately not `useSearchParams`, which would
 * opt every page into dynamic rendering and force a Suspense boundary. The
 * query string is read straight off window.location instead, which is
 * equivalent here because this only ever runs in the browser.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { startAnalytics, trackPageView } from "@/lib/analytics/client";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  // Start once. React 18 strict mode mounts effects twice in development, so
  // startAnalytics is idempotent and returns a real teardown.
  useEffect(() => startAnalytics(), []);

  useEffect(() => {
    if (!pathname || pathname === lastPath.current) return;
    lastPath.current = pathname;

    // One frame of delay so the new route has painted: document.title is still
    // the previous page's at the moment the effect fires, and the sections of
    // the incoming page are not in the DOM yet for the observer to find.
    const id = requestAnimationFrame(() => trackPageView(pathname, document.title));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
