/**
 * app/blog/[slug]/layout.tsx
 *
 * Next.js 15: params is now a Promise, must be awaited in generateMetadata.
 */

import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/constants";
import { stripBrand } from "@/lib/seoTitle";
import { BLOG_SEO } from "@/lib/blogSeo";

const SITE_URL = "https://preciprocal.com";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Blog | Preciprocal",
      description:
        "Career advice, job search strategy, interview prep, and visa guides for international professionals.",
    };
  }

  const seo = BLOG_SEO[post.slug];
  // BLOG_SEO titles already end with "| Preciprocal"; the layout template
  // appends it again, so strip the stored one.
  const title = stripBrand(seo?.title ?? post.title);
  const description = seo?.description ?? post.description;
  const keywords = seo?.keywords ?? [];
  const ogTitle = seo?.ogTitle ?? post.title;
  const ogDescription = seo?.ogDescription ?? post.description;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = `${SITE_URL}/og-image.png`;

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

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}