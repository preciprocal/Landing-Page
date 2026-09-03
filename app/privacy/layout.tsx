/**
 * app/privacy/layout.tsx
 *
 * Exists solely to attach metadata to this route.
 *
 * app/privacy/page.tsx is a client component ("use client"), and client
 * components cannot export metadata. The metadata lived in ./metadata.ts, but
 * Next.js does not read a bare metadata.ts file, only page/layout/route
 * exports, so this page was silently falling back to the root layout's default
 * title and rendering the homepage title in search results.
 */

export { metadata } from "./metadata";

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
