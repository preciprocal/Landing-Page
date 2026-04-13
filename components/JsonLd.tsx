import { FAQS } from "@/lib/constants";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Preciprocal",
    url: "https://preciprocal.com",
    logo: "https://preciprocal.com/logo.png",
    sameAs: [
      "https://twitter.com/preciprocal",
      "https://linkedin.com/company/preciprocal",
      "https://github.com/preciprocal",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@preciprocal.com",
      contactType: "customer support",
      availableLanguage: "English",
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
    name: "Preciprocal",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://preciprocal.com",
    description:
      "AI-powered job search operating system with mock interviews, resume analysis, cover letter generation, study planning, and job tracking.",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        name: "Free",
        description: "5 resume analyses, 3 mock interviews, 5 cover letters per month",
      },
      {
        "@type": "Offer",
        price: "9.99",
        priceCurrency: "USD",
        name: "Pro",
        description: "20 resume analyses, 30 mock interviews, unlimited cover letters, full analytics",
      },
      {
        "@type": "Offer",
        price: "24.99",
        priceCurrency: "USD",
        name: "Premium",
        description: "Unlimited everything, company-specific prep, priority support",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "2500",
      bestRating: "5",
      worstRating: "1",
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
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}