/**
 * app/recruiter-contact-finder/page.tsx
 *
 * Targets: "find recruiter email", "how to find hiring manager email",
 * "email finder for job search", "company email format finder".
 *
 * Keep the framing on job-search outreach rather than sales prospecting, the
 * sales email-finder SERP is saturated (Hunter, Apollo, RocketReach) and we
 * have no chance there, but the job-seeker phrasing is a distinct, softer query.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Recruiter Contact Finder: Who to Email",
  description:
    "Find and verify the email address of the recruiter, hiring manager, or team member for any role. Stop sending applications into a portal and start reaching actual people.",
  keywords: [
    "find recruiter email",
    "how to find hiring manager email",
    "email finder for job search",
    "company email format finder",
    "find hiring manager contact",
    "recruiter contact lookup",
    "job search email finder",
    "who to contact about a job application",
  ],
  alternates: { canonical: "https://preciprocal.com/recruiter-contact-finder" },
  openGraph: {
    title: "Recruiter Contact Finder, Find the Right Person to Email",
    description:
      "Find and verify the hiring manager's email for any role. Bypass the portal entirely.",
    url: "https://preciprocal.com/recruiter-contact-finder",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruiter Contact Finder",
    description: "Find and verify the right person to email for any role.",
  },
};

const FAQS = [
  {
    q: "Who should I actually contact about a job?",
    a: "In rough order of usefulness: the hiring manager for the specific role, a team member who does the job you are applying for, then the recruiter. The hiring manager owns the opening and feels the cost of it staying unfilled. A team member can refer you internally, which routes your application through a completely different and much shorter queue. Recruiters are the most contacted and the most saturated.",
  },
  {
    q: "How do I figure out who the hiring manager is?",
    a: "Start from the job posting: it often names the team or the manager the role reports to. Failing that, search LinkedIn for the team and look for someone with a title one level above the role you want. For engineering roles, the person who posted about the team hiring on LinkedIn is frequently the hiring manager themselves.",
  },
  {
    q: "How does email format detection work?",
    a: "Most companies use one consistent pattern across the organisation, typically firstname.lastname, first initial plus lastname, or just firstname at the company domain. Once the pattern for a company is known, any employee's address can be derived from their name. The tool identifies the pattern and then verifies the specific address resolves before you send.",
  },
  {
    q: "Why does verification matter?",
    a: "Because a bounced email is worse than no email. You do not learn that it failed, so you sit waiting on a reply that was never possible, and repeated bounces damage your sending reputation, which affects whether your future messages land in inboxes at all. Verifying first means the silence you get is real information rather than a technical failure.",
  },
  {
    q: "Is this the same as sales prospecting tools?",
    a: "The underlying mechanic is similar, but the use case and the volume are completely different. Sales tools are built for sending hundreds of messages a week. Job search outreach works at maybe five to ten carefully chosen contacts a week, where each message is written specifically for the recipient. Sending job search outreach at sales volume does not work and damages your reputation.",
  },
  {
    q: "Is contacting people directly seen as inappropriate?",
    a: "A short, specific, well-researched message to a hiring manager about a role they are actively trying to fill is normal professional behaviour, and most people respond to it positively. What crosses the line is volume and carelessness: mass-messaging everyone at a company, contacting people unrelated to the role, or following up repeatedly after no response.",
  },
  {
    q: "How many contact lookups do I get?",
    a: "The free plan includes 2 contact lookups per month. Pro raises this substantially, which matters if you are running a real outreach pipeline alongside your applications.",
  },
];

const FEATURES = [
  { label: "Email pattern detection", description: "Identifies the format a company uses across its whole organisation." },
  { label: "Deliverability check", description: "Verifies the address resolves before you send, so silence means something." },
  { label: "Role-based targeting", description: "Surfaces the hiring manager and team members, not just the recruiter." },
  { label: "LinkedIn cross-reference", description: "Matches the person to their profile so you know who you're writing to." },
  { label: "Tracker integration", description: "Contacts attach to the application, so you know who you spoke to and when." },
  { label: "Outreach handoff", description: "Send the contact straight into the cold email generator." },
];

const STEPS = [
  { step: "1", title: "Enter the company and role", body: "Or save the job with the Chrome extension and the company is filled in for you." },
  { step: "2", title: "Find the right person", body: "See the hiring manager and team members connected to the role, not a generic careers inbox." },
  { step: "3", title: "Verify and reach out", body: "The address is checked for deliverability, then handed to the outreach generator to write the message." },
];

export default function RecruiterContactFinderPage() {
  return (
    <ToolPage
      breadcrumbName="Recruiter Contact Finder"
      canonicalPath="/recruiter-contact-finder"
      badge="Free, 2 lookups per month"
      h1="Recruiter contact finder"
      h1Accent="find the right person to email"
      subhead="An application in a portal joins several hundred others. An email to the hiring manager arrives in an inbox with your name on it. Find who to contact and verify the address before you send."
      ctaTool="contact-finder"
      ctaLabel="Find a contact free"
      ctaMicrocopy="2 free lookups/month · Verified addresses · No credit card"
      featuresTitle="What the contact finder does"
      featuresSubtitle="Built for the five-to-ten carefully chosen contacts of a job search, not sales-volume prospecting."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="Why the portal is the worst way to apply"
      faqTitle="Contact finder FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "Cold email generator", href: "/cold-email-generator" },
        { label: "Networking for introverts", href: "/blog/networking-for-introverts-get-referrals-2026" },
        { label: "Job application tracker", href: "/job-application-tracker" },
        { label: "LinkedIn profile optimizer", href: "/linkedin-profile-optimizer" },
        { label: "The US job market in late 2026", href: "/blog/us-job-market-late-2026-data" },
        { label: "Free ATS resume checker", href: "/free-ats-checker" },
      ]}
      bottomTitle="Applications get queued. Emails get read."
      bottomBody="The same candidate gets a different outcome depending on whether a human ever sees the application."
      bottomMicrocopy="2 free lookups per month · No credit card · Verified before you send"
      body={
        <>
          <p>
            When you apply through a company&apos;s careers portal, your application enters a queue with
            several hundred others, gets scored by software, and is read by a human only if it
            clears a threshold. That is the entire mechanism. Nothing about your application is
            distinguishable from the others at the point where the filtering happens.
          </p>
          <p>
            When someone on the team forwards your resume internally, you enter through a{" "}
            <strong className="text-white">completely different queue</strong>, one that is
            measured in dozens rather than hundreds, and where a human reads it first. Referred
            candidates are hired at dramatically higher rates than portal applicants, and the
            difference is mostly structural rather than a judgement about quality.
          </p>
          <p>
            This gap widens in a low-churn market. With the quits rate at 2.0%, fewer roles are
            posted publicly, more are filled through internal moves and referrals, and the ones that
            do get posted receive more applicants than usual. The portal becomes a worse channel
            precisely when you need a channel most.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Who to contact, in order</h3>
            <ul className="space-y-3">
              {[
                "Hiring manager, owns the role and feels the cost of it staying open",
                "Team member in the same role, can refer you, and knows what the team actually needs",
                "Someone who recently joined the team, remembers the process and is usually generous about it",
                "Recruiter, the most contacted and most saturated inbox, but still better than the portal",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-indigo-400 flex-shrink-0 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            The practical obstacle is that finding the right person and their address is tedious
            enough that most people skip it and click apply instead. That is the whole reason the
            channel stays uncrowded: the barrier is effort, not permission.
          </p>
          <p>
            A word on how to use this well. Outreach at job-search scale means roughly five to ten
            carefully selected people per week, each with a message written specifically for them.
            It does not mean emailing forty people at one company. The tools that power this are the
            same ones sales teams use at hundreds of messages a week, and applying that volume to a
            job search produces exactly the reputation you would expect.
          </p>
          <p>
            Once you have the contact, the message matters as much as the address. The{" "}
            <strong className="text-white">cold email generator</strong> covers what a working one
            actually looks like, including a full annotated example.
          </p>
        </>
      }
    />
  );
}
