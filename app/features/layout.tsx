/**
 * app/features/layout.tsx
 *
 * Exists solely to attach metadata to this route, matching app/pricing/layout.tsx.
 *
 * app/features/page.tsx is a client component ("use client"), and client
 * components cannot export metadata. Next.js does not read a bare metadata.ts
 * file either, only page/layout/route exports, so without this the page would
 * silently inherit the root layout's title and show the homepage title in
 * search results.
 */

export { metadata } from "./metadata";

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
