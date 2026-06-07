/**
 * app/blog/[slug]/layout.tsx
 *
 * This layout lives alongside the "use client" page.tsx.
 * Next.js allows generateMetadata in a layout even when the page is a client component.
 * This is the cleanest way to add per-post SEO metadata without refactoring page.tsx.
 */

import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/constants";
import { BLOG_SEO } from "@/lib/blogSeo";

const SITE_URL = "https://preciprocal.com";

interface Props {
  params: { slug: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Blog | Preciprocal",
      description: "Career advice, job search strategy, interview prep, and visa guides for international professionals.",
    };
  }

  const seo = BLOG_SEO[post.slug];
  const title = seo?.title ?? `${post.title} | Preciprocal`;
  const description = seo?.description ?? post.description;
  const keywords = seo?.keywords ?? [];
  const ogTitle = seo?.ogTitle ?? post.title;
  const ogDescription = seo?.ogDescription ?? post.description;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = `${SITE_URL}/ogimage.png`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: ["Preciprocal Team"],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [imageUrl],
    },
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default function BlogSlugLayout({ children }: Props) {
  return <>{children}</>;
}