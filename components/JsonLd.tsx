/**
 * JsonLd.tsx — All structured data (schema.org) for Preciprocal.
 *
 * ⚠️  IMPORTANT: Do not add aggregateRating until you have a verified
 * review platform (e.g. G2, Trustpilot, Product Hunt) you can link to.
 * Fabricated ratings fed to Google via JSON-LD violate Google's structured
 * data guidelines and can result in a manual action against your site.
 *
 * Once you have real reviews, add:
 *   aggregateRating: {
 *     "@type": "AggregateRating",
 *     ratingValue: "<actual average>",
 *     ratingCount: "<actual count>",
 *     bestRating: "5",
 *     worstRating: "1",
 *     url: "https://www.g2.com/products/preciprocal/reviews",
 *   }
 */

import { FAQS } from "@/lib/constants";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://preciprocal.com/#organization",
    name: "Preciprocal",
    url: "https://preciprocal.com",
    logo: {
      "@type": "ImageObject",
      url: "https://preciprocal.com/logo.png",
      width: 192,
      height: 192,
    },
    description:
      "AI-powered job search operating system with mock interviews, resume analysis, cover letter generation, study planning, and job tracking.",
    foundingDate: "2024",
    sameAs: [
      "https://twitter.com/preciprocal",
      "https://linkedin.com/company/preciprocal",
      "https://github.com/preciprocal",
      "https://www.producthunt.com/products/preciprocal",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "support@preciprocal.com",
        contactType: "customer support",
        availableLanguage: "English",
        areaServed: "Worldwide",
      },
      {
        "@type": "ContactPoint",
        email: "hello@preciprocal.com",
        contactType: "sales",
        availableLanguage: "English",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareAppJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://preciprocal.com/#software",
    name: "Preciprocal",
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "Career Preparation",
    operatingSystem: "Web",
    url: "https://preciprocal.com",
    description:
      "AI-powered job search operating system with mock interviews, resume ATS scoring, cover letter generation, study planning, and job tracking.",
    screenshot: "https://preciprocal.com/og-image.png",
    featureList: [
      "AI Mock Interviews with multi-agent panel",
      "Resume ATS Scoring",
      "Recruiter Eye Simulation",
      "Candidate Benchmarking",
      "Cover Letter Generator with real-time company research",
      "AI Study Planner",
      "Job Tracker with Kanban board",
      "Chrome Extension",
      "Cold Outreach Generator",
      "Interview Debrief Journal",
    ],
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        name: "Free",
        description: "5 resume analyses, 3 mock interviews, 5 cover letters per month",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        price: "9.99",
        priceCurrency: "USD",
        name: "Pro",
        billingIncrement: "P1M",
        description: "20 resume analyses, 30 mock interviews, unlimited cover letters, full analytics",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        price: "24.99",
        priceCurrency: "USD",
        name: "Premium",
        billingIncrement: "P1M",
        description: "Unlimited everything, company-specific prep, priority support",
        availability: "https://schema.org/InStock",
      },
    ],
    // aggregateRating intentionally omitted — add once real reviews exist.
    author: {
      "@id": "https://preciprocal.com/#organization",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://preciprocal.com/#website",
    name: "Preciprocal",
    url: "https://preciprocal.com",
    description:
      "AI-powered job search operating system — mock interviews, resume analysis, cover letters, study planner, job tracker.",
    publisher: { "@id": "https://preciprocal.com/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://preciprocal.com/interview-questions/{search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── NEW: WebPageJsonLd ────────────────────────────────────────────────────────
// Explicitly links all homepage schemas together into a single entity graph.
// This tells Google: "this URL is a WebPage, it's part of this WebSite,
// it's about this Organization, and its primary image is the OG image."
// Improves Knowledge Panel eligibility and rich result completeness.
export function WebPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://preciprocal.com/#webpage",
    url: "https://preciprocal.com",
    name: "Preciprocal — AI-Powered Job Search Operating System",
    description:
      "Land your dream job with AI mock interviews, resume ATS scoring, cover letter generation, personalized study plans, and job tracking.",
    isPartOf: {
      "@id": "https://preciprocal.com/#website",
    },
    about: {
      "@id": "https://preciprocal.com/#organization",
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": "https://preciprocal.com/#primaryimage",
      url: "https://preciprocal.com/og-image.png",
      width: 1200,
      height: 630,
    },
    datePublished: "2026-01-20",
    dateModified: "2026-04-27",
    inLanguage: "en-US",
    potentialAction: [
      {
        "@type": "ReadAction",
        target: ["https://preciprocal.com"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem { name: string; url: string; }

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

interface InterviewPageJsonLdProps {
  role: string; slug: string; description: string;
  questions: Array<{ question: string; answer: string }>;
}

export function InterviewPageJsonLd({ role, slug, description, questions }: InterviewPageJsonLdProps) {
  const pageUrl = `https://preciprocal.com/interview-questions/${slug}`;
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage", "@id": `${pageUrl}#faq`,
    name: `${role} Interview Questions`, description, url: pageUrl,
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question", name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://preciprocal.com" },
      { "@type": "ListItem", position: 2, name: "Interview Questions", item: "https://preciprocal.com/interview-questions" },
      { "@type": "ListItem", position: 3, name: `${role} Interview Questions`, item: pageUrl },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

interface CompanyPageJsonLdProps {
  company: string; slug: string; description: string;
  questions: Array<{ question: string; answer: string }>;
}

export function CompanyPageJsonLd({ company, slug, description, questions }: CompanyPageJsonLdProps) {
  const pageUrl = `https://preciprocal.com/interview-prep/${slug}`;
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage", "@id": `${pageUrl}#faq`,
    name: `${company} Interview Preparation Guide`, description, url: pageUrl,
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question", name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://preciprocal.com" },
      { "@type": "ListItem", position: 2, name: "Interview Prep", item: "https://preciprocal.com/interview-prep" },
      { "@type": "ListItem", position: 3, name: `${company} Interview Prep`, item: pageUrl },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

interface BlogPostJsonLdProps {
  title: string; description: string; slug: string; datePublished: string;
  dateModified?: string; authorName?: string; imageUrl?: string;
}

export function BlogPostJsonLd({
  title, description, slug, datePublished, dateModified,
  authorName = "Preciprocal Team",
  imageUrl = "https://preciprocal.com/og-image.png",
}: BlogPostJsonLdProps) {
  const pageUrl = `https://preciprocal.com/blog/${slug}`;
  const schema = {
    "@context": "https://schema.org", "@type": "Article", "@id": `${pageUrl}#article`,
    headline: title, description, url: pageUrl,
    image: { "@type": "ImageObject", url: imageUrl, width: 1200, height: 630 },
    datePublished, dateModified: dateModified ?? datePublished,
    author: { "@type": "Organization", name: authorName, url: "https://preciprocal.com" },
    publisher: { "@id": "https://preciprocal.com/#organization" },
    isPartOf: { "@type": "Blog", "@id": "https://preciprocal.com/blog" },
    mainEntityOfPage: pageUrl,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://preciprocal.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://preciprocal.com/blog" },
      { "@type": "ListItem", position: 3, name: title, item: pageUrl },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}