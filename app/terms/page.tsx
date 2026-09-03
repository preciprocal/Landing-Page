"use client";

/**
 * app/terms/page.tsx
 * Fully self-contained Terms of Service page. No separate component needed.
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
    title: "Agreement to terms",
    content: `These Terms of Service (**Terms**) constitute a legally binding agreement between you (**User**, **you**, or **your**) and Preciprocal (**Company**, **we**, **us**, or **our**) governing your access to and use of the Preciprocal platform, including all associated websites, mobile applications, software, and services (collectively, the **Service**).

By accessing or using the Service, creating an account, or clicking "I agree," you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy, which is incorporated herein by reference. If you do not agree to these Terms, you must not access or use the Service.

These Terms apply to all users of the Service, including free-tier and paid subscribers.`,
  },
  {
    title: "Eligibility",
    content: `You must be at least 13 years of age to use the Service. If you are under 18 years of age, you represent that you have obtained verifiable parental or legal guardian consent to use the Service and that your parent or guardian has reviewed and agreed to these Terms on your behalf.

By using the Service, you represent and warrant that: (a) you are at least 13 years of age; (b) you have the legal capacity to enter into a binding agreement; (c) your use of the Service does not violate any applicable law or regulation; and (d) all registration information you provide is accurate, current, and complete.

The Service is not directed to children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information promptly.`,
  },
  {
    title: "Description of service",
    content: `Preciprocal provides an AI-powered career preparation platform that includes, without limitation: resume analysis and scoring, AI-simulated mock interview tools, cover letter generation, study planning, job application tracking, LinkedIn optimization, cold outreach generation, and related features (collectively, the **Tools**).

THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND. We do not warrant that the Service will be uninterrupted, error-free, secure, or free of viruses or other harmful components. We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time with reasonable notice where practicable.

IMPORTANT DISCLAIMER: Use of the Service does not guarantee employment, interview success, or any particular career outcome. The Tools are designed to assist with career preparation. Employment outcomes depend on numerous factors entirely outside our control, including but not limited to market conditions, employer decisions, and individual qualifications. We make no representations or warranties regarding employment outcomes.`,
  },
  {
    title: "Account registration and security",
    content: `To access certain features of the Service, you must register for an account. You agree to: (a) provide accurate, current, and complete information during registration; (b) maintain and promptly update your account information; (c) maintain the confidentiality of your account credentials; (d) accept responsibility for all activities that occur under your account; and (e) notify us immediately at support@preciprocal.com of any unauthorized use of your account or any other breach of security.

You may not share your account credentials with any third party or allow any third party to access your account. Each account is for a single individual user only. We reserve the right to terminate accounts that we reasonably believe are being shared or accessed by multiple individuals.

We will not be liable for any loss or damage arising from your failure to maintain the security of your account credentials.`,
  },
  {
    title: "Acceptable use",
    content: `You may use the Service solely for your own personal, non-commercial job search and career preparation purposes in accordance with these Terms.

You agree that you will NOT:

(a) use the Service for any unlawful purpose or in violation of any applicable local, state, national, or international law or regulation;
(b) scrape, crawl, spider, data mine, or systematically extract data from the Service or use any automated means to access the Service;
(c) reverse engineer, decompile, disassemble, or attempt to derive the source code or underlying algorithms of the Service or any AI models powering it;
(d) resell, sublicense, redistribute, or provide third-party access to the Service or any outputs generated by it for commercial purposes;
(e) use the Service or its outputs to develop, train, or improve any competing product or service;
(f) upload, transmit, or distribute any content that is unlawful, defamatory, harassing, abusive, fraudulent, obscene, or otherwise objectionable;
(g) impersonate any person or entity or misrepresent your affiliation with any person or entity;
(h) attempt to gain unauthorized access to any portion of the Service or any other systems or networks connected to the Service;
(i) interfere with or disrupt the integrity or performance of the Service or the data contained therein;
(j) use the Service to send unsolicited communications or spam; or
(k) circumvent, disable, or otherwise interfere with any security-related features of the Service.

We reserve the right to investigate and take appropriate legal action against anyone who, in our sole discretion, violates these provisions.`,
  },
  {
    title: "Intellectual property and content ownership",
    content: `Your Content: You retain full ownership of all content you upload, submit, or transmit through the Service, including resumes, cover letters, interview recordings, and any other personal documents (**Your Content**). By submitting Your Content to the Service, you grant us a limited, non-exclusive, worldwide, royalty-free license to access, process, store, and use Your Content solely to the extent necessary to provide the Service to you. This license terminates when you delete Your Content or close your account, subject to any retention obligations under applicable law.

You represent and warrant that: (a) you own or have the necessary rights to Your Content; (b) Your Content does not infringe, misappropriate, or violate any third-party intellectual property rights; and (c) Your Content does not violate any applicable law.

Our Intellectual Property: The Service, including all software, algorithms, AI models, user interfaces, designs, text, graphics, logos, and other content created by us (excluding Your Content), is owned by or licensed to Preciprocal and is protected by applicable intellectual property laws. These Terms do not grant you any rights to our intellectual property except the limited license to use the Service as expressly set forth herein.

AI-Generated Outputs: Outputs generated by the Service's AI tools based on Your Content (**Generated Content**) are provided for your personal use. We do not claim ownership of Generated Content. However, you acknowledge that similar outputs may be generated for other users and we make no representations regarding the uniqueness or exclusivity of any Generated Content.`,
  },
  {
    title: "Payments, billing, and refunds",
    content: `Subscription Plans: Access to certain features requires a paid subscription. By subscribing to a paid plan, you authorize us to charge the payment method you provide on a recurring basis at the applicable subscription rate.

Billing: Subscriptions are billed in advance on a monthly or annual basis, as selected at the time of purchase. All fees are stated in US dollars and are exclusive of applicable taxes, which you are responsible for paying.

Cancellation: You may cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period. You will retain access to paid features through the end of the paid period. We do not provide refunds or credits for partial subscription periods, except as stated below or as required by applicable law.

30-Day Money-Back Guarantee: If you are not satisfied with the Service, you may request a full refund within 30 days of your first payment by contacting support@preciprocal.com. This guarantee applies to your first payment only and is available once per customer. Refunds are processed within 5-10 business days.

Price Changes: We reserve the right to modify our pricing at any time. We will provide at least 30 days' notice of any price increases to existing subscribers before such changes take effect. Your continued use of the Service after a price change constitutes your agreement to the new pricing.

Failed Payments: If a payment fails, we may suspend your access to paid features until payment is successfully processed. We may attempt to charge your payment method multiple times.`,
  },
  {
    title: "Termination and suspension",
    content: `Termination by You: You may terminate your account at any time by deleting your account through the Settings menu or by contacting support@preciprocal.com. Termination does not entitle you to a refund of any prepaid fees except as provided in our refund policy.

Termination or Suspension by Us: We may suspend or terminate your access to the Service, with or without notice, if we reasonably believe: (a) you have violated these Terms; (b) your use of the Service creates legal risk for us or other users; (c) your account has been inactive for an extended period; or (d) we are required to do so by law.

If we terminate your account for reasons other than a breach of these Terms, we will refund any prepaid subscription fees on a pro-rata basis for the unused portion of your subscription period.

Effect of Termination: Upon termination, your right to use the Service ceases immediately. Provisions of these Terms that by their nature should survive termination shall survive, including but not limited to intellectual property provisions, warranty disclaimers, indemnification, and limitations of liability.

Data Deletion: Following account termination, we will delete or anonymize your personal data in accordance with our Privacy Policy and applicable data retention requirements.`,
  },
  {
    title: "Disclaimers and warranties",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.

WE DO NOT WARRANT THAT: (a) THE SERVICE WILL MEET YOUR REQUIREMENTS; (b) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (c) THE RESULTS OBTAINED FROM USE OF THE SERVICE WILL BE ACCURATE, RELIABLE, OR COMPLETE; (d) ANY ERRORS IN THE SERVICE WILL BE CORRECTED; OR (e) THE SERVICE OR THE SERVERS THAT MAKE IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.

AI-GENERATED CONTENT DISCLAIMER: The AI-powered tools within the Service generate content based on patterns and data. Such content may be inaccurate, incomplete, biased, or inappropriate for your specific circumstances. You are solely responsible for reviewing, verifying, and deciding whether to use any AI-generated content. We expressly disclaim any liability arising from your reliance on AI-generated content.

NO EMPLOYMENT OUTCOME GUARANTEE: We make no warranty or representation that use of the Service will result in employment, interview invitations, salary increases, or any other specific career outcome.

Some jurisdictions do not allow the exclusion of certain warranties, so some of the above exclusions may not apply to you.`,
  },
  {
    title: "Limitation of liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL PRECIPROCAL, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS, OR SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF DATA, LOSS OF GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OF OR INABILITY TO USE THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR TOTAL CUMULATIVE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THE SERVICE SHALL NOT EXCEED THE GREATER OF: (a) THE TOTAL AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM; OR (b) ONE HUNDRED US DOLLARS (USD $100).

THE LIMITATIONS OF LIABILITY IN THIS SECTION APPLY REGARDLESS OF THE FORM OF ACTION, WHETHER BASED ON CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR OTHERWISE, AND REGARDLESS OF WHETHER WE WERE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR CERTAIN TYPES OF DAMAGES. IN SUCH JURISDICTIONS, OUR LIABILITY SHALL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW.`,
  },
  {
    title: "Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Preciprocal and its officers, directors, employees, agents, licensors, and service providers from and against any and all claims, liabilities, damages, judgments, awards, losses, costs, expenses, and fees (including reasonable legal fees) arising out of or relating to: (a) your violation of these Terms; (b) Your Content; (c) your use of the Service; (d) your violation of any third-party right, including any intellectual property right or privacy right; or (e) any claim that Your Content caused damage to a third party.

We reserve the right, at our expense, to assume exclusive defense and control of any matter otherwise subject to indemnification by you, in which case you agree to cooperate fully with us in asserting any available defenses.`,
  },
  {
    title: "Governing law and dispute resolution",
    content: `Governing Law: These Terms and any dispute arising out of or relating to them or the Service shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.

Informal Resolution: Before filing any formal legal proceeding, you agree to attempt to resolve any dispute informally by contacting us at support@preciprocal.com. We will attempt to resolve the dispute informally within 30 days of receiving notice.

Arbitration Agreement: If informal resolution fails, any dispute, claim, or controversy arising out of or relating to these Terms or the Service shall be resolved by binding arbitration administered by the American Arbitration Association ("AAA") under its Consumer Arbitration Rules. The arbitration shall be conducted in English. The arbitrator's decision shall be final and binding and may be entered as a judgment in any court of competent jurisdiction.

Class Action Waiver: YOU AND PRECIPROCAL AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION. The arbitrator may not consolidate more than one person's claims and may not preside over any form of representative or class proceeding.

Exceptions: Notwithstanding the foregoing, either party may seek emergency injunctive or other equitable relief in a court of competent jurisdiction to prevent actual or threatened infringement, misappropriation, or violation of intellectual property rights.

If you are located in the European Union, you may also use the European Commission's Online Dispute Resolution platform at https://ec.europa.eu/consumers/odr.`,
  },
  {
    title: "Privacy and data protection",
    content: `Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to our collection and use of your data as described in the Privacy Policy.

If you are located in the European Economic Area, United Kingdom, or Switzerland, we process your personal data in accordance with the General Data Protection Regulation (GDPR) or applicable local data protection laws. Our legal bases for processing include performance of a contract, legitimate interests, and your consent where required.

If you are a California resident, you have certain rights under the California Consumer Privacy Act (CCPA). Please refer to our Privacy Policy for details.`,
  },
  {
    title: "Third-party links and services",
    content: `The Service may contain links to third-party websites, services, or resources. These links are provided for your convenience only. We have no control over the content, privacy policies, or practices of any third-party websites or services and accept no responsibility for them.

We are not responsible for and do not endorse the content or practices of any third-party websites. Your interactions with third-party websites are solely between you and such third parties. We encourage you to review the terms and privacy policies of any third-party websites you visit.`,
  },
  {
    title: "Changes to terms",
    content: `We reserve the right to modify these Terms at any time. We will provide notice of material changes by: (a) sending an email to the address associated with your account at least 14 days before the changes take effect; and (b) posting the updated Terms on this page with a revised "Last Updated" date.

Your continued use of the Service after the effective date of any changes constitutes your acceptance of the revised Terms. If you do not agree to the revised Terms, you must stop using the Service and may cancel your account.

For changes required by law or to address security concerns, we may implement changes immediately without prior notice.`,
  },
  {
    title: "General provisions",
    content: `Entire Agreement: These Terms, together with our Privacy Policy and any additional terms applicable to specific features, constitute the entire agreement between you and Preciprocal regarding the Service and supersede all prior agreements and understandings.

Severability: If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect, and the invalid provision shall be modified to the minimum extent necessary to make it enforceable.

Waiver: Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision unless acknowledged and agreed to by us in writing.

Assignment: You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations without restriction.

Force Majeure: We will not be liable for any failure or delay in performance resulting from causes beyond our reasonable control, including but not limited to acts of God, natural disasters, pandemic, war, terrorism, riots, embargoes, or acts of civil or military authorities.

No Third-Party Beneficiaries: These Terms are for the sole benefit of the parties hereto and their respective successors and permitted assigns. Nothing herein shall create any third-party beneficiary rights.

Notices: All notices to us must be sent to support@preciprocal.com. We may provide notices to you via the email address associated with your account or through the Service interface.`,
  },
  {
    title: "Contact information",
    content: `If you have any questions about these Terms, please contact us at:

Preciprocal
Email: support@preciprocal.com
Legal inquiries: hello@preciprocal.com

We will respond to all inquiries within 5 business days.`,
  },
];

export default function TermsPage() {
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
                Terms of Service
              </h1>
              <p className="text-slate-500 text-base mb-2">
                Last updated: September 3, 2026. Effective date: September 3, 2026.
              </p>
              <p className="text-slate-600 text-sm">
                Please read these Terms carefully before using Preciprocal. By using the Service, you agree to be bound by these Terms.
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
                Questions about these Terms? Email us at{" "}
                <a
                  href="mailto:support@preciprocal.com"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  support@preciprocal.com
                </a>{" "}
                and we will respond within 5 business days.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}