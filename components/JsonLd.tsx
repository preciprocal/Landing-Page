export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Preciprocal",
    url: "https://preciprocal.com",
    logo: "https://preciprocal.com/icon.svg",
    sameAs: [
      "https://twitter.com/preciprocal",
      "https://linkedin.com/company/preciprocal",
      "https://github.com/preciprocal",
    ],
    description:
      "AI-powered job search operating system with mock interviews, resume analysis, cover letter generation, study planning, and job tracking.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SoftwareAppJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Preciprocal",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://preciprocal.com",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        name: "Free Plan",
      },
      {
        "@type": "Offer",
        price: "19",
        priceCurrency: "USD",
        name: "Pro Plan",
        billingIncrement: 1,
        unitCode: "MON",
      },
      {
        "@type": "Offer",
        price: "39",
        priceCurrency: "USD",
        name: "Premium Plan",
        billingIncrement: 1,
        unitCode: "MON",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1250",
      bestRating: "5",
    },
    featureList: [
      "AI Mock Interviews",
      "Resume ATS Analysis",
      "Cover Letter Generator",
      "Study Planner",
      "Job Tracker with Kanban",
      "Chrome Extension for LinkedIn",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQJsonLd() {
  const faqs = [
    {
      question: "What is Preciprocal?",
      answer:
        "Preciprocal is an AI-powered job search operating system that helps you prepare for interviews, optimize your resume, generate cover letters, create study plans, and track job applications — all in one platform.",
    },
    {
      question: "Is Preciprocal free to use?",
      answer:
        "Yes! Preciprocal offers a free plan with 10 mock interviews and 5 resume analyses per month. Pro and Premium plans offer expanded limits and advanced features.",
    },
    {
      question: "How does the AI mock interview work?",
      answer:
        "Our AI simulates real interview panels with multiple interviewers including technical leads, HR managers, and hiring managers. Each interviewer has different priorities and asks follow-up questions based on your actual answers, delivered via voice.",
    },
    {
      question: "Does Preciprocal offer student discounts?",
      answer:
        "Yes! University students can get up to 50% off Pro and Premium plans by verifying with their .edu email address.",
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}