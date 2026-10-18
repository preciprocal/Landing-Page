/**
 * app/interview-question-predictor/page.tsx
 *
 * Targets: "interview questions based on job description", "predict interview
 * questions", "what questions will I be asked in an interview", "tell me about
 * yourself answer feedback", "rate my interview answer".
 *
 * The site's first free tool backed by a model rather than templates. It gives
 * a visitor the first step of a mock interview for free (the questions, plus
 * one scored answer) and stops at the follow-up question, which is exactly the
 * part only the live mock interview in the app can do. See
 * components/InterviewQuestionPredictor.tsx for the funnel.
 */

import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import InterviewQuestionPredictor from "@/components/InterviewQuestionPredictor";

export const metadata: Metadata = {
  title: "Interview Question Predictor: Paste a Job Description (Free)",
  description:
    "Paste a job description and get the 5 interview questions you are most likely to be asked. Then say your answer out loud and get your pace, filler words and a score out of 10. Free, no sign-up.",
  keywords: [
    "interview questions based on job description",
    "predict interview questions",
    "interview question predictor",
    "what questions will I be asked in an interview",
    "job description interview questions generator",
    "rate my interview answer",
    "tell me about yourself answer feedback",
    "practice interview answers out loud",
    "filler words interview practice",
  ],
  alternates: { canonical: "https://preciprocal.com/interview-question-predictor" },
  openGraph: {
    title: "Paste a Job Description, Get the 5 Questions You Will Be Asked",
    description: "Free AI interview question predictor, plus a score out of 10 for your answer. No sign-up.",
    url: "https://preciprocal.com/interview-question-predictor",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image-v2.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interview Question Predictor: Free, No Sign-up",
    description: "Paste a job description, get the 5 questions you will likely be asked, and score your answers.",
  },
};

const FAQS = [
  {
    q: "How does the interview question predictor work?",
    a: "You paste a job description and an AI model reads it the way the hiring team that wrote it would. It picks out the skills, responsibilities and situations the posting emphasises and turns them into the five questions most likely to come up, ranked. Each question shows the exact phrase in the posting that prompted it, so you can see the reasoning rather than taking it on trust.",
  },
  {
    q: "Will these be the exact questions I get asked?",
    a: "Not word for word. No tool can know an interviewer's script. What it does reliably is point at the topics the posting signals the team cares about, which is where most of the questions come from. If you can answer these five well, you are prepared for the variations on them too.",
  },
  {
    q: "Why does it skip questions like “tell me about yourself”?",
    a: "Because you will be asked those in every interview regardless of the role, so predicting them adds nothing. The predictor focuses on what this particular posting makes likely. “Tell me about yourself” has its own scorer in the second tab, since it is the question almost every interview opens with.",
  },
  {
    q: "How is my answer scored?",
    a: "Out of 10, where 5 is a typical, generic answer and 8 is one most interviewers would want to move forward. The score weighs whether you answered the question asked, your structure, how specific you are, relevance to the role, and length when spoken. You get what works, the fixes that matter most, a tightened opening line in your own words, and the follow-up question an interviewer would likely ask next.",
  },
  {
    q: "How does the voice practice work, and what happens to my audio?",
    a: "Press record and answer as you would in the interview. Your browser's built-in speech recognition turns your voice into text, and the page then measures your pace, filler words, pauses and length right on your device. Preciprocal never receives the audio. Depending on your browser, its speech service may process the audio on the browser maker's servers (Google for Chrome, Microsoft for Edge). Only the transcript is sent to us, and only if you click to score the content. Voice works in Chrome, Edge and Safari; in Firefox you can type your answer instead.",
  },
  {
    q: "Why does my filler word count look low?",
    a: "Browser speech recognition often leaves out sounds like “um” and “uh”, so treat the count as a minimum. Words like “like”, “you know” and “basically” are caught much more reliably, and they are usually the bigger habit anyway.",
  },
  {
    q: "Is what I paste stored anywhere?",
    a: "No. The job description or answer is sent to an AI model to generate your result and is not saved by Preciprocal. You do not need an account, and nothing is linked to you.",
  },
  {
    q: "Is it really free?",
    a: "Yes, with a limit on how many times you can run it in an hour to keep it available for everyone. The full mock interview, where an AI interviewer asks you questions out loud and follows up on your answers, is part of the Preciprocal app, which has a free plan.",
  },
  {
    q: "What is the difference between this and a mock interview?",
    a: "This tool gives you the questions and scores one answer at a time. A mock interview is a live conversation: you answer by voice, the interviewer follows up on what you actually said, and you are scored on the whole exchange. Typing an answer is good preparation, but saying it out loud under follow-up pressure is the part that feels different on the day.",
  },
];

const FEATURES = [
  { label: "Tied to the posting", description: "Every question shows the exact phrase in the job description that prompted it." },
  { label: "Ranked by likelihood", description: "The most likely question first, so you know where to spend your prep time." },
  { label: "What a strong answer covers", description: "Two or three concrete points for each question, not generic advice." },
  { label: "Say it out loud", description: "Record your answer and see your pace, filler words, pauses and length the moment you stop." },
  { label: "Score any answer", description: "Get the content scored out of 10, with the fixes that matter most and a stronger opening line." },
  { label: "The follow-up question", description: "See what the interviewer would ask next, which is where most answers fall apart." },
  { label: "No sign-up", description: "Paste, predict, practice. Nothing is stored, and the audio never reaches us." },
];

const STEPS = [
  { step: "1", title: "Paste the job description", body: "The whole posting, including responsibilities and requirements. That is where the questions come from." },
  { step: "2", title: "Get your 5 questions", body: "Ranked by how likely they are, each with why they will ask it and what a strong answer covers." },
  { step: "3", title: "Say it, get scored", body: "Answer any question out loud or by typing. See your delivery stats, a score out of 10, and the follow-up you should be ready for." },
];

export default function InterviewQuestionPredictorPage() {
  return (
    <ToolPage
      breadcrumbName="Interview Question Predictor"
      canonicalPath="/interview-question-predictor"
      badge="Free AI tool, no sign-up"
      h1="Paste a job description."
      h1Accent="Get the 5 questions you'll be asked."
      subhead="An AI reads the posting like the hiring manager who wrote it and predicts your most likely interview questions. Then say your answer out loud: see your pace and filler words instantly, and get the content scored out of 10. Free, no account needed."
      ctaTool="question-predictor"
      ctaLabel="Practice in a free mock interview"
      ctaMicrocopy="Free plan includes an AI mock interview · No credit card"
      tool={<InterviewQuestionPredictor />}
      featuresTitle="More than a list of common questions"
      featuresSubtitle="Generic question lists are the same for every job. These come from the posting in front of you."
      features={FEATURES}
      steps={STEPS}
      bodyTitle="How to predict interview questions from a job description"
      faqTitle="Interview question predictor FAQ"
      faqs={FAQS}
      relatedLinks={[
        { label: "AI mock interview", href: "/ai-mock-interview" },
        { label: "Interview questions by role", href: "/interview-questions" },
        { label: "Interview prep by company", href: "/interview-prep" },
        { label: "STAR method guide", href: "/blog/star-method-behavioral-interviews" },
        { label: "Interview study planner", href: "/interview-study-planner" },
        { label: "Thank you email after an interview", href: "/thank-you-email-after-interview" },
      ]}
      bottomTitle="You know the questions. Now say the answers out loud."
      bottomBody="Practice with an AI interviewer that asks follow-up questions, and get scored on structure and clarity before the real thing."
      bottomMicrocopy="Free plan · No credit card · Practice by voice"
      body={
        <>
          <p>
            A job description is the closest thing you will get to the interviewer&apos;s notes. The team wrote it to
            describe the person they want to hire, and the questions they ask are mostly attempts to find out whether
            you are that person. Reading it carefully, line by line, tells you a lot about what you will be asked.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Where the questions hide in a posting</h3>
            <ul className="space-y-3">
              {[
                "Responsibilities become “tell me about a time you...” questions. If the posting says you will own a weekly metrics review, expect to be asked about a time you explained a change in a number to people who did not like it.",
                "Required skills become technical or skill-check questions. A named tool or method usually means someone on the panel will test it.",
                "Soft phrases signal real problems. “Comfortable with ambiguity” or “juggling requests from several teams” usually means the team is stretched, and you will be asked how you prioritise.",
                "Seniority words set the bar. “Own”, “lead” and “define” mean they want examples where you made the call, not ones where you helped.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            Once you have the likely questions, the useful work is preparing a story for each one: a specific
            situation, what you did, and what happened as a result. The STAR method is the standard way to structure
            these, and most behavioral questions are easier to answer once you have five or six strong stories you can
            adapt.
          </p>
          <p>
            The part most people skip is the follow-up. Interviewers rarely move on after your first answer. They ask
            why you made that choice, what you would do differently, or what the result was in numbers. An answer that
            sounds good on its own can fall apart on the second question, which is why the scorer above always shows you
            the follow-up an interviewer would likely ask.
          </p>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">A quick check for any answer</h3>
            <ul className="space-y-3">
              {[
                "Does it answer the question that was asked, in the first sentence or two?",
                "Is there one specific example, with your own role in it rather than the team's?",
                "Does it end on a result, ideally one with a number?",
                "Would it take between one and two minutes to say out loud?",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>
            Finally, practise out loud. An answer that reads well on a page often runs long or loses its thread when you
            say it, especially under a follow-up. Saying it a few times before the interview is what turns a prepared
            answer into one that sounds natural.
          </p>
        </>
      }
    />
  );
}
