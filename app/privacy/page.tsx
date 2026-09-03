"use client";

/**
 * app/privacy/page.tsx
 * Fully self-contained Privacy Policy page. No separate component needed.
 */

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RevealOnScroll, FloatingDots } from "@/components/LandingAnimations";


// Renders content strings, parses **bold** markers into <strong> tags
function renderContent(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={j} className="text-slate-200 font-semibold">{part.slice(2, -2)}</strong>
            : part
        )}
        {i < text.split("\n").length - 1 && "\n"}
      </span>
    );
  });
}

const SECTIONS = [
  {
    title: "Introduction and scope",
    content: `This Privacy Policy (**Policy**) describes how Preciprocal (**Company**, **we**, **us**, or **our**) collects, uses, discloses, and protects personal information about you (**User**, **you**, or **your**) when you access or use the Preciprocal platform, including all associated websites, applications, and services (collectively, the **Service**).

By accessing or using the Service, you acknowledge that you have read and understood this Policy. If you do not agree with this Policy, please do not use the Service.

This Policy applies to all users of the Service globally. Where applicable, we describe additional rights available to users in specific jurisdictions, including the European Economic Area (EEA), United Kingdom, and California.

This Policy is incorporated into and forms part of our Terms of Service.`,
  },
  {
    title: "Information we collect",
    content: `We collect the following categories of personal information:

Account Information: When you register, we collect your name, email address, and password (stored in hashed form). If you subscribe to a paid plan, our payment processor (Stripe) collects your billing information. We never see or store your full payment card number.

User-Submitted Content: To provide our AI-powered tools, we collect and process content you voluntarily submit, including resume text and files, job descriptions, cover letter drafts, interview recordings and transcripts, and any other documents or text you upload.

Usage and Analytics Data: We automatically collect information about how you interact with the Service, including pages and features accessed, session duration, clickstream data, device type and operating system, browser type and version, and IP address.

Session Recordings and Interaction Analytics: If you consent to analytics cookies, we use **Microsoft Clarity** to record how you interact with our pages. This includes mouse movement, scrolling, clicks, and reconstructed session replays showing your navigation through the Service, together with heatmaps and detection of rage clicks and dead clicks. These recordings are used to diagnose usability problems. Microsoft Clarity applies automatic masking to text you type into form fields, and we do not use it to capture the content of your resumes, cover letters or interview responses. Microsoft processes this data as described in the Microsoft Privacy Statement. **If you decline analytics cookies, Microsoft Clarity is not loaded and no session recording takes place.**

Communications: If you contact us for support or other inquiries, we collect the contents of your messages and your contact information.

Cookies and Tracking Technologies: We use cookies and similar technologies as described in Section 9 of this Policy.

We do not knowingly collect sensitive personal information such as government identification numbers, financial account details beyond what is required for payment processing, health or medical information, or biometric data.`,
  },
  {
    title: "Legal bases for processing (GDPR)",
    content: `If you are located in the EEA, United Kingdom, or Switzerland, we process your personal data under the following legal bases:

Performance of a Contract (Article 6(1)(b) GDPR): Processing necessary to provide the Service you have requested, including operating your account, processing payments, and delivering AI-powered tools.

Legitimate Interests (Article 6(1)(f) GDPR): Processing necessary for our legitimate business interests, including improving and securing the Service, preventing fraud, analyzing usage patterns, and communicating with you about your account, provided such interests are not overridden by your rights.

Consent (Article 6(1)(a) GDPR): Where we rely on your consent, such as for optional marketing communications or the use of non-essential cookies. You may withdraw consent at any time without affecting the lawfulness of prior processing.

Legal Obligation (Article 6(1)(c) GDPR): Processing necessary to comply with applicable laws and regulations.

Where we have no applicable legal basis for processing, we will not process your personal data for that purpose.`,
  },
  {
    title: "How we use your information",
    content: `We use the information we collect for the following purposes:

Service Delivery: To operate and provide the Service, including processing your uploaded content through our AI tools, storing your history and outputs, and enabling you to access your account.

Account Management: To create and manage your account, verify your identity, process payments, and communicate with you about your subscription.

Product Improvement: To analyze usage patterns, identify bugs and performance issues, develop new features, and improve the overall quality and reliability of the Service. Usage analytics are aggregated and anonymized where possible.

Security and Fraud Prevention: To detect, investigate, and prevent fraudulent transactions, unauthorized access, and other illegal or harmful activities.

Legal Compliance: To comply with applicable laws, regulations, legal processes, and governmental requests.

Communications: To send transactional communications (account confirmations, payment receipts, password resets, security alerts) and, with your consent, product updates and promotional materials. You may opt out of marketing communications at any time.

AI MODEL TRAINING RESTRICTION: Your resume, cover letters, interview recordings, and other personal content submitted to the Service will NOT be used to train, fine-tune, or improve any AI models without your explicit, affirmative opt-in consent. This restriction applies regardless of whether you are a free or paid user.`,
  },
  {
    title: "Disclosure of your information",
    content: `We do not sell, rent, or trade your personal information to third parties for their marketing purposes. We disclose your information only in the following circumstances:

Service Providers: We share information with trusted third-party service providers who assist us in operating the Service, subject to confidentiality obligations. These include:

- **Stripe** (payment processing)
- Hosting and cloud infrastructure providers (serving the Service and storing data, including server logs that contain IP addresses)
- AI API providers (processing submitted content to generate outputs, subject to data processing agreements that prohibit retention for training)
- **Google Analytics 4** (aggregate usage analytics, loaded only after you consent)
- **Microsoft Clarity** (session replay and interaction analytics, loaded only after you consent)

Google Analytics and Microsoft Clarity are the only analytics providers we use, and both are gated behind your cookie consent choice as described in Section 9.

Legal Requirements: We may disclose your information if required to do so by law, regulation, legal process, or governmental request, including to comply with a court order, subpoena, or similar legal obligation.

Protection of Rights: We may disclose information where we believe disclosure is necessary to protect the rights, property, or safety of Preciprocal, our users, or the public, including to prevent fraud or other illegal activity.

Business Transfers: In the event of a merger, acquisition, reorganization, bankruptcy, or sale of all or substantially all of our assets, your information may be transferred to the acquiring entity. We will notify you via email and/or prominent notice on the Service prior to your information becoming subject to a different privacy policy.

With Your Consent: We may share your information with third parties when you have given us explicit consent to do so.

We require all third parties that process personal data on our behalf to enter into data processing agreements that obligate them to protect your information and process it only as instructed by us.`,
  },
  {
    title: "Data retention",
    content: `We retain your personal information for as long as necessary to provide the Service and fulfill the purposes described in this Policy, unless a longer retention period is required or permitted by law.

Account Data: Retained for the duration of your account and for up to 90 days following account deletion, after which it is permanently deleted or anonymized, except where retention is required by law.

User-Submitted Content: Retained while your account is active. Upon account deletion, your submitted content is deleted within 30 days, except for anonymized aggregates that cannot be linked back to you.

Payment Records: Retained for 7 years following the transaction to comply with financial record-keeping requirements.

Usage Analytics: Retained in identifiable form for up to 24 months, after which data is aggregated and anonymized.

Legal Hold: Notwithstanding the above, we may retain certain information for longer periods where necessary to comply with legal obligations, resolve disputes, or enforce our agreements.

You may request deletion of your data at any time as described in Section 8 of this Policy. Please note that deletion requests are subject to our legal retention obligations.`,
  },
  {
    title: "International data transfers",
    content: `Preciprocal is based in the United States. If you access the Service from outside the United States, your information will be transferred to and processed in the United States, where data protection laws may differ from those in your jurisdiction.

For transfers of personal data from the EEA, United Kingdom, or Switzerland to the United States, we rely on the following transfer mechanisms:

Standard Contractual Clauses (SCCs): We use the European Commission's approved Standard Contractual Clauses for transfers of personal data to third countries, incorporated into our data processing agreements with service providers.

Adequacy Decisions: Where available, we rely on adequacy decisions issued by the European Commission recognizing the destination country as providing adequate data protection.

By using the Service, you acknowledge that your information may be transferred to and processed in the United States and other countries. We take appropriate safeguards to ensure that your personal information receives an adequate level of protection wherever it is processed.`,
  },
  {
    title: "Your rights and choices",
    content: `Depending on your location, you may have the following rights regarding your personal information:

Right of Access: You may request a copy of the personal information we hold about you, including information about how it is used and with whom it is shared.

Right to Rectification: You may request correction of inaccurate or incomplete personal information.

Right to Erasure (**Right to Be Forgotten**): You may request deletion of your personal information, subject to certain exceptions, including where retention is required by law or necessary for legal claims.

Right to Restriction of Processing: You may request that we restrict the processing of your personal information in certain circumstances.

Right to Data Portability: You may request a copy of your personal information in a structured, machine-readable format for transfer to another service.

Right to Object: You may object to our processing of your personal information where we rely on legitimate interests as our legal basis.

Right to Withdraw Consent: Where processing is based on your consent, you may withdraw that consent at any time without affecting the lawfulness of prior processing.

Right to Non-Discrimination: We will not discriminate against you for exercising any of your privacy rights.

California Residents (CCPA/CPRA): In addition to the rights above, California residents have the right to know the categories of personal information collected, sold, or disclosed; the right to opt out of the sale or sharing of personal information (we do not sell personal information); and the right to limit the use of sensitive personal information.

To exercise any of these rights, please contact us at support@preciprocal.com. We will respond to verified requests within 30 days (or within the timeframe required by applicable law). We may need to verify your identity before processing your request. We will not charge a fee for reasonable requests but may charge for excessive or repetitive requests.

If you are in the EEA or UK and believe we have processed your data unlawfully, you have the right to lodge a complaint with your local data protection authority. A list of EEA data protection authorities is available at https://edpb.europa.eu/about-edpb/about-edpb/members_en.`,
  },
  {
    title: "Cookies and tracking technologies",
    content: `We use cookies and similar tracking technologies (collectively, "cookies") to operate and improve the Service. Cookies are small text files stored on your device that help us recognize you and remember your preferences.

Categories of cookies we use:

Strictly Necessary Cookies: Essential for the Service to function. These cookies enable core features such as user authentication, session management, and security. They cannot be disabled without impairing Service functionality.

Analytics Cookies: Help us understand how users interact with the Service. We use **Google Analytics 4** for aggregate usage measurement and **Microsoft Clarity** for session replay and interaction analytics, as described in Section 2.

**These are set only if you consent.** Neither Google Analytics nor Microsoft Clarity is loaded until you opt in. Until you accept analytics cookies, no analytics script runs and no request is made to Google or Microsoft. Choosing "Essential only" on our cookie banner, or dismissing it without choosing, means neither is ever loaded.

Preference Cookies: Remember your settings and preferences to enhance your experience. These cookies can be declined.

We do NOT use advertising cookies, behavioral tracking cookies, or cross-site tracking technologies. We do not share cookie data with advertising networks, and we have not enabled Google Analytics advertising features or data sharing for advertising purposes.

**Managing and withdrawing your choice:** our cookie banner appears on your first visit. You can change your decision at any time using the **Cookie preferences** link in the footer of any page, which reopens the banner. You may also use your browser settings, noting that blocking all cookies may affect Service functionality, or email support@preciprocal.com.

Withdrawing consent stops further collection but does not by itself delete cookies already stored on your device from a prior opt-in. To remove those, clear cookies through your browser settings.

For more information about cookies and how to manage them, visit www.allaboutcookies.org.`,
  },
  {
    title: "Data security",
    content: `We implement and maintain appropriate technical and organizational security measures designed to protect your personal information against unauthorized access, disclosure, alteration, and destruction. These measures include:

Encryption: All data in transit is protected using TLS 1.2 or higher. Data at rest is encrypted using AES-256 encryption.

Access Controls: Access to personal data is restricted to authorized personnel on a need-to-know basis. All access is logged and audited.

Password Security: Passwords are hashed using industry-standard cryptographic algorithms and are never stored in plain text.

Infrastructure Security: Our infrastructure is hosted on cloud providers that maintain SOC 2 Type II certifications and comply with industry security standards.

Incident Response: We maintain a security incident response plan and will notify you and applicable regulatory authorities of any data breach in accordance with applicable law.

Despite these measures, no security system is impenetrable. We cannot guarantee the absolute security of your information. In the event of a data breach that is likely to result in a risk to your rights and freedoms, we will notify you without undue delay in accordance with applicable law.

You are responsible for maintaining the security of your account credentials and for any activity that occurs under your account.`,
  },
  {
    title: "Children's privacy",
    content: `The Service is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If you are under 13, please do not use the Service or provide any personal information.

If we become aware that we have inadvertently collected personal information from a child under 13 without verifiable parental consent, we will take prompt steps to delete such information from our systems.

If you are a parent or guardian and believe that your child under 13 has provided us with personal information without your consent, please contact us at support@preciprocal.com and we will promptly investigate and, if appropriate, delete the information.

Users between the ages of 13 and 18 should have obtained parental or guardian consent before using the Service, as described in our Terms of Service.`,
  },
  {
    title: "Third-party links and services",
    content: `The Service may contain links to third-party websites, services, or integrations that are not owned or controlled by Preciprocal. This Policy does not apply to such third-party services.

We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party services. We encourage you to review the privacy policies of any third-party services you access through the Service.

Our inclusion of links to third-party services does not imply endorsement of those services or their privacy practices.`,
  },
  {
    title: "Changes to this policy",
    content: `We may update this Policy from time to time to reflect changes in our practices, the Service, or applicable law. We will notify you of material changes by sending an email to the address associated with your account at least 14 days before the changes take effect, and by posting the updated Policy on this page with a revised "Last Updated" date.

For changes required by law or to address urgent security concerns, we may implement changes immediately and notify you as soon as practicable.

Your continued use of the Service after the effective date of any changes constitutes your acceptance of the updated Policy. If you do not agree with the updated Policy, you must stop using the Service and may delete your account.

We encourage you to review this Policy periodically to stay informed about how we protect your information.`,
  },
  {
    title: "Contact and data controller information",
    content: `Preciprocal is the data controller for personal information collected through the Service.

For questions, concerns, or requests regarding this Policy or our data practices, please contact us at:

Preciprocal
Privacy inquiries: support@preciprocal.com
General inquiries: hello@preciprocal.com

We will respond to all privacy-related inquiries within 30 days. For data subject requests under GDPR or CCPA, please include sufficient information to verify your identity and clearly describe your request.

If you are not satisfied with our response, you have the right to lodge a complaint with the relevant data protection authority in your jurisdiction.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050810]">
      <Navbar />

      <main className="relative overflow-hidden">
        <FloatingDots count={15} />

        {/* Header */}
        <section className="relative pt-32 pb-12 px-6">
          <div className="max-w-3xl mx-auto">
            <RevealOnScroll>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                Privacy Policy
              </h1>
              <p className="text-slate-500 text-base mb-2">
                Last updated: September 3, 2026. Effective date: September 3, 2026.
              </p>
              <p className="text-slate-600 text-sm">
                This Policy explains how Preciprocal collects, uses, and protects your personal information. Please read it carefully.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Sections */}
        <section className="relative pb-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-10">
              {SECTIONS.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                    <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  <div className="text-slate-400 text-sm leading-[1.85] whitespace-pre-line pl-9">
                    {renderContent(section.content)}
                  </div>
                  {i < SECTIONS.length - 1 && (
                    <div className="mt-10 h-px bg-white/[0.04]" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Contact footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 p-6 rounded-xl border border-white/[0.06] bg-[#0a0f1e]/80 text-center"
            >
              <p className="text-slate-400 text-sm">
                Privacy questions? Email us at{" "}
                <a
                  href="mailto:support@preciprocal.com"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  support@preciprocal.com
                </a>{" "}
                and we will respond within 30 days.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}