/**
 * lib/blogSeo.ts
 *
 * Per-post SEO metadata for every blog post.
 * Used by app/blog/[slug]/page-metadata.ts to generate metadata server-side.
 *
 * Keys must match the slug field in BLOG_POSTS in constants.ts exactly.
 */

export interface BlogSeoEntry {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
}

export const BLOG_SEO: Record<string, BlogSeoEntry> = {
  "how-to-pass-ats-resume-screening": {
    title: "How to Pass ATS Resume Screening in 2026 | Preciprocal",
    description: "Most resumes are rejected before a human sees them. Learn exactly how ATS works, why qualified candidates get filtered out, and the 10 fixes that get you past the system.",
    keywords: ["ATS resume screening", "how to pass ATS", "applicant tracking system resume tips", "ATS score 2026", "resume keywords ATS", "beat ATS resume", "ATS friendly resume format"],
    ogTitle: "How to Pass ATS Resume Screening in 2026",
    ogDescription: "75% of resumes are rejected before a human reads them. Here are the 10 fixes that get you through the filter.",
  },
  "software-engineer-interview-prep-guide": {
    title: "Software Engineer Interview Prep Guide 2026: 8-Week Plan | Preciprocal",
    description: "A systematic 8-week SWE interview study plan covering data structures, algorithms, system design, and behavioral questions for FAANG and top tech companies.",
    keywords: ["software engineer interview prep", "SWE interview guide 2026", "leetcode study plan", "system design interview prep", "FAANG interview preparation", "coding interview guide", "software engineer interview questions"],
    ogTitle: "The Complete Software Engineer Interview Prep Guide (2026)",
    ogDescription: "Stop grinding random problems. This 8-week plan covers the patterns that appear in the vast majority of FAANG interviews.",
  },
  "how-to-answer-tell-me-about-yourself": {
    title: "How to Answer 'Tell Me About Yourself' in 2026 (With Examples) | Preciprocal",
    description: "The most mishandled interview question. A proven framework plus 3 word-for-word example answers for tech, business, and entry-level candidates.",
    keywords: ["tell me about yourself interview answer", "how to answer tell me about yourself", "interview self introduction", "tell me about yourself examples", "interview opening question 2026"],
    ogTitle: "How to Answer 'Tell Me About Yourself' (With Word-for-Word Examples)",
    ogDescription: "A proven framework and 3 example answers that work for tech, business, and entry-level roles.",
  },
  "star-method-behavioral-interviews": {
    title: "STAR Method: Answer Every Behavioral Interview Question (2026) | Preciprocal",
    description: "The STAR framework behind every great behavioral answer. Includes 15 question-to-story mappings and the 7 stories every candidate should prepare.",
    keywords: ["STAR method interview", "behavioral interview questions", "STAR framework examples", "situation task action result", "how to answer behavioral questions", "behavioral interview preparation 2026"],
    ogTitle: "The STAR Method: How to Answer Every Behavioral Interview Question",
    ogDescription: "Situation, Task, Action, Result. The framework behind every great behavioral answer, with 15 question-to-story mappings.",
  },
  "system-design-interview-tips": {
    title: "System Design Interview: Think Like a Senior Engineer (2026) | Preciprocal",
    description: "The 6-step framework top candidates use to tackle any system design question, with 5 worked examples: URL shortener, Twitter, WhatsApp, YouTube, and autocomplete.",
    keywords: ["system design interview tips", "system design interview 2026", "how to pass system design interview", "system design framework", "system design examples", "senior engineer interview prep"],
    ogTitle: "System Design Interview Tips: How to Think Like a Senior Engineer",
    ogDescription: "A 6-step framework and 5 worked examples for any system design question.",
  },
  "how-to-negotiate-salary-offer": {
    title: "How to Negotiate Your Salary Offer in 2026 (Scripts That Work) | Preciprocal",
    description: "Most offers have room to negotiate. The exact scripts, timing strategies, and tactics that can meaningfully increase your total compensation.",
    keywords: ["how to negotiate salary", "salary negotiation scripts", "job offer negotiation 2026", "how to counter offer salary", "negotiate job offer", "salary negotiation tips"],
    ogTitle: "How to Negotiate Your Salary Offer in 2026 (Scripts That Work)",
    ogDescription: "Most offers have room. Here are the exact scripts and timing strategies that get results.",
  },
  "google-interview-process-explained": {
    title: "The Google Interview Process Explained (2026) | Preciprocal",
    description: "Everything about Google's hiring process: recruiter screen, technical phone screen, onsite rounds, hiring committee review, and team matching. What to prepare and how.",
    keywords: ["Google interview process", "how to get a job at Google", "Google interview preparation 2026", "Google onsite interview", "Google hiring committee", "Google leetcode", "Googleyness interview"],
    ogTitle: "The Google Interview Process Explained (2026)",
    ogDescription: "From recruiter screen to hiring committee vote. What Google really looks for and how to prepare.",
  },
  "amazon-leadership-principles-interview": {
    title: "Amazon Leadership Principles Interview: All 16 Answered (2026) | Preciprocal",
    description: "Amazon's 16 Leadership Principles drive every hiring decision. What each one means, what interviewers look for, and STAR frameworks for each.",
    keywords: ["Amazon leadership principles", "Amazon interview questions 2026", "Amazon LP interview", "Amazon behavioral interview", "Amazon STAR method", "bar raiser Amazon interview", "how to get job at Amazon"],
    ogTitle: "How to Answer Amazon's 16 Leadership Principles (2026)",
    ogDescription: "Every LP explained with what interviewers look for and STAR frameworks for each.",
  },
  "leetcode-study-plan-4-weeks": {
    title: "4-Week LeetCode Study Plan That Gets You Hired (2026) | Preciprocal",
    description: "Stop grinding random problems. This structured plan covers the 5 patterns that appear in the vast majority of FAANG interviews, with daily problem targets.",
    keywords: ["leetcode study plan", "4 week leetcode plan", "coding interview prep 2026", "leetcode patterns", "how to prepare for coding interview", "FAANG coding interview", "data structures algorithms study plan"],
    ogTitle: "The 4-Week LeetCode Study Plan That Gets You Hired",
    ogDescription: "Pattern recognition beats memorisation. This plan covers the 5 patterns that dominate FAANG coding interviews.",
  },
  "resume-keywords-that-get-past-ats": {
    title: "Resume Keywords That Get Past ATS in 2026 (By Role) | Preciprocal",
    description: "The exact keywords ATS systems look for in software engineering, data science, product management, and 6 other roles, with examples of natural usage.",
    keywords: ["resume keywords 2026", "ATS resume keywords by role", "software engineer resume keywords", "data scientist resume keywords", "product manager resume keywords", "resume keywords list", "ATS keywords"],
    ogTitle: "Resume Keywords That Get Past ATS in 2026 (By Role)",
    ogDescription: "The exact keywords ATS systems look for across 8 roles, with examples of how to use them naturally.",
  },
  "how-to-get-first-tech-job-no-experience": {
    title: "How to Get Your First Tech Job With No Experience (2026) | Preciprocal",
    description: "Breaking into tech without experience is possible with the right strategy. The exact playbook for new grads and career switchers in 2026: resume, projects, applications, and interviews.",
    keywords: ["how to get first tech job", "tech job no experience 2026", "entry level tech job", "new grad tech job", "break into tech", "how to get software engineering job no experience", "tech job for beginners"],
    ogTitle: "How to Get Your First Tech Job With No Experience (2026)",
    ogDescription: "The exact strategy that works for new grads and career switchers in 2026.",
  },
  "ats-resume-tips-new-grads": {
    title: "ATS Resume Tips for New Grads in 2026 (No Experience Guide) | Preciprocal",
    description: "New grads face a harder ATS challenge than experienced candidates. Here is how to close the keyword gap using projects, skills sections, and strategic formatting.",
    keywords: ["ATS resume tips new grads", "resume for new graduates 2026", "college graduate resume ATS", "entry level resume ATS", "new grad resume tips", "ATS score new graduate", "resume no work experience ATS"],
    ogTitle: "ATS Resume Tips for New Grads in 2026",
    ogDescription: "No work experience yet? Here is how to close the ATS keyword gap with projects and smart formatting.",
  },
  "how-to-get-job-with-visa-sponsorship-2026": {
    title: "How to Get a Job With Visa Sponsorship in the US (2026) | Preciprocal",
    description: "Visa sponsorship is not a dealbreaker if you approach it correctly. The exact strategy international students use to land sponsored roles at US companies in 2026.",
    keywords: ["visa sponsorship job US 2026", "how to get H1B sponsorship", "F1 student visa sponsorship", "international student job sponsorship", "OPT STEM sponsorship", "companies that sponsor visas", "H1B sponsor companies 2026"],
    ogTitle: "How to Get a Job With Visa Sponsorship in the US (2026)",
    ogDescription: "The exact strategy international students use to land sponsored roles. OPT, STEM OPT, and H-1B explained.",
  },
  "ai-tools-actually-help-job-search-2026": {
    title: "AI Tools That Actually Help Your Job Search in 2026 | Preciprocal",
    description: "Not all AI job search tools are equal. An honest breakdown of what works, what is overhyped, and how to use AI without making your applications look generic.",
    keywords: ["AI job search tools 2026", "best AI tools for job search", "AI resume builder", "AI cover letter generator", "AI mock interview tool", "job search AI 2026", "AI career tools"],
    ogTitle: "The AI Tools That Actually Help Your Job Search in 2026",
    ogDescription: "An honest breakdown of what works, what is overhyped, and how to avoid the AI detection trap.",
  },
  "how-to-answer-why-are-you-looking-for-new-job": {
    title: "How to Answer 'Why Are You Looking for a New Job?' (2026) | Preciprocal",
    description: "This question sounds simple but kills more candidates than any technical question. The framework that keeps you honest, positive, and compelling at the same time.",
    keywords: ["why are you looking for a new job interview answer", "how to answer why leaving current job", "interview question why looking for new job", "why do you want to leave your job answer 2026"],
    ogTitle: "How to Answer 'Why Are You Looking for a New Job?' Without Saying the Wrong Thing",
    ogDescription: "A framework and exact scripts that keep you honest, positive, and compelling.",
  },
  "networking-for-introverts-get-referrals-2026": {
    title: "How to Network and Get Referrals When You Hate Networking (2026) | Preciprocal",
    description: "Specific tactics that work without requiring you to be an extrovert. Asynchronous outreach, alumni networks, and how to turn a 15-minute conversation into a referral.",
    keywords: ["networking for introverts", "how to get job referrals 2026", "networking tips job search", "how to network to get a job", "job referral strategy", "LinkedIn outreach for jobs", "introvert networking job search"],
    ogTitle: "How to Network and Get Referrals When You Hate Networking",
    ogDescription: "Low-volume, targeted, mostly asynchronous tactics that get results without requiring you to be someone you are not.",
  },
  "how-to-handle-job-rejection-keep-going": {
    title: "How to Handle Job Rejection Without Losing Momentum (2026) | Preciprocal",
    description: "Rejection is inevitable in any serious job search. How to process it quickly, extract what is useful, and keep your pipeline moving without burning out.",
    keywords: ["how to handle job rejection", "job rejection advice 2026", "keep going after job rejection", "job search rejection tips", "dealing with rejection job search", "job search motivation"],
    ogTitle: "How to Handle Job Rejection Without Losing Momentum",
    ogDescription: "The 24-hour rule, pipeline thinking, and what not to do after a rejection.",
  },
  "linkedin-profile-that-gets-recruiter-messages": {
    title: "LinkedIn Profile That Gets Recruiter Messages in 2026 (Checklist) | Preciprocal",
    description: "Most LinkedIn profiles are passive documents. Here is exactly how to turn yours into an inbound machine with a keyword-dense headline, Open to Work signals, and impact-focused bullets.",
    keywords: ["LinkedIn profile tips 2026", "how to get recruiter messages LinkedIn", "LinkedIn headline for job search", "LinkedIn open to work", "LinkedIn profile optimization", "LinkedIn recruiter messages", "LinkedIn SEO job search"],
    ogTitle: "The LinkedIn Profile That Gets Recruiter Messages in 2026",
    ogDescription: "A complete checklist to turn your LinkedIn from passive document to inbound machine.",
  },
  "how-to-follow-up-after-interview-without-being-annoying": {
    title: "How to Follow Up After an Interview Without Being Annoying (2026) | Preciprocal",
    description: "The exact cadence and word-for-word templates for thank-you notes, status follow-ups, and competing offer situations that keep you professional and top of mind.",
    keywords: ["how to follow up after interview", "interview follow up email template 2026", "thank you email after interview", "following up on job application", "interview status follow up"],
    ogTitle: "How to Follow Up After an Interview Without Being Annoying",
    ogDescription: "The exact cadence and templates that keep you professional and top of mind.",
  },
  "what-to-do-first-30-days-new-job": {
    title: "What to Do in Your First 30 Days at a New Job (2026 Playbook) | Preciprocal",
    description: "The first month sets the tone for everything. The exact week-by-week playbook for building credibility, learning fast, and avoiding the mistakes that make new hires forgettable.",
    keywords: ["first 30 days new job", "new job first month tips", "how to make a good impression new job", "first 30 days at work strategy", "onboarding tips new employee 2026"],
    ogTitle: "What to Do in Your First 30 Days at a New Job",
    ogDescription: "The week-by-week playbook for building credibility and making a strong impression from day one.",
  },
  "how-to-get-a-job-in-todays-market-2026": {
    title: "How to Get a Job in Today's Market (2026): Complete Playbook | Preciprocal",
    description: "The job market in 2026 is more competitive but more navigable than most guides admit. Exact strategies for ATS, referrals, interviews, and using AI tools without looking generic.",
    keywords: ["how to get a job 2026", "job search strategy 2026", "job market 2026 tips", "how to find a job today", "job search playbook 2026", "get hired 2026", "job hunting tips 2026"],
    ogTitle: "How to Get a Job in Today's Market (2026): The Complete Playbook",
    ogDescription: "Systematic beats desperate. Here is exactly what works in the 2026 job market.",
  },
  "ead-card-f1-visa-opt-complete-guide-2026": {
    title: "EAD Card for F1 Students: Complete OPT Guide 2026 | Preciprocal",
    description: "Everything F1 students need to know about getting their EAD card through OPT and STEM OPT: exact steps, timelines, costs, unemployment rules, and what to do if USCIS is slow.",
    keywords: ["EAD card F1 student", "OPT EAD card 2026", "F1 OPT process steps", "how to get EAD card", "OPT application timeline", "STEM OPT EAD", "F1 student work authorization", "I-765 OPT", "EAD processing time 2026"],
    ogTitle: "EAD Card for F1 Students: The Complete OPT Guide (2026)",
    ogDescription: "Step-by-step process, timelines, fees, and the rules that catch students off guard.",
  },
  "how-to-stop-the-clock-f1-students-opt-2026": {
    title: "How to Stop the Clock on OPT: F1 Cap-Gap and STEM Strategies (2026) | Preciprocal",
    description: "Your OPT clock ticks from day one. How F1 students can extend work authorization with STEM OPT, trigger the cap-gap bridge to H-1B, and maximise every day of their US window.",
    keywords: ["stop the clock OPT F1", "cap gap extension 2026", "OPT STEM extension strategy", "F1 student work authorization extension", "H1B cap gap F1", "OPT unemployment rules", "F1 to H1B timeline 2026", "STEM OPT cap gap"],
    ogTitle: "How to Stop the Clock on OPT as an F1 Student (Cap-Gap and STEM Strategies, 2026)",
    ogDescription: "STEM OPT, cap-gap, H-1B lottery: every mechanism for extending your US work window explained.",
  },
  "h1b-visa-complete-guide-2026": {
    title: "H-1B Visa in 2026: Lottery, Fees, and What Actually Changed | Preciprocal",
    description: "The H-1B process changed dramatically in 2026. New $100,000 fees, wage-weighted lottery, and stricter enforcement. Here is exactly what candidates and employers need to know.",
    keywords: ["H1B visa 2026", "H1B lottery 2026", "H1B wage weighted lottery", "H1B $100000 fee", "H1B process steps", "H1B application guide 2026", "how to get H1B visa", "H1B visa changes 2026", "H1B employer sponsorship"],
    ogTitle: "H-1B Visa in 2026: The Complete Guide to the Lottery, Fees, and What Actually Changed",
    ogDescription: "The $100,000 fee, wage-weighted lottery, and reduced registrations: what it means for your odds.",
  },
  "l1-visa-complete-guide-2026": {
    title: "L-1 Visa 2026: Intracompany Transfer Guide (L-1A and L-1B) | Preciprocal",
    description: "No lottery, no annual cap. The L-1 visa lets multinationals transfer employees to the US in a managerial, executive, or specialised knowledge role. Full process and green card pathway.",
    keywords: ["L1 visa 2026", "L1A visa guide", "L1B visa specialised knowledge", "intracompany transfer visa", "L1 visa process steps", "L1A green card", "L1 blanket petition", "L1 vs H1B", "multinational visa US"],
    ogTitle: "L-1 Visa in 2026: Complete Guide for Managers, Executives, and Specialists",
    ogDescription: "No lottery, no cap. How L-1A and L-1B work, who qualifies, and the fastest path to a green card.",
  },
  "o1-visa-extraordinary-ability-guide-2026": {
    title: "O-1 Visa: Extraordinary Ability Visa Explained (2026) | Preciprocal",
    description: "No cap, no lottery, available year-round. The O-1 visa may be faster than H-1B if your achievements are strong enough. Full eligibility guide, the 8 criteria, and how to build your case.",
    keywords: ["O1 visa 2026", "O1 extraordinary ability visa", "O1 visa requirements", "O1A visa guide", "how to qualify for O1 visa", "O1 vs H1B", "extraordinary ability visa US", "O1 visa criteria", "O1 visa process"],
    ogTitle: "O-1 Visa: The Extraordinary Ability Visa Explained (2026)",
    ogDescription: "No cap, no lottery. If your achievements are strong enough, O-1 can be faster than H-1B.",
  },
  "tn-visa-canada-mexico-professionals-2026": {
    title: "TN Visa for Canadian and Mexican Professionals: 2026 Complete Guide | Preciprocal",
    description: "No lottery, no annual cap, approved at the US border in minutes for Canadians. The full TN visa guide: 63 qualifying occupations, application process, renewal, and green card options.",
    keywords: ["TN visa 2026", "TN visa Canada", "TN visa Mexico", "USMCA TN visa", "NAFTA professional visa", "TN visa occupations list", "TN visa process steps", "Canadian professional work US", "TN vs H1B"],
    ogTitle: "TN Visa for Canadian and Mexican Professionals: Complete 2026 Guide",
    ogDescription: "No lottery, no cap. Canadians can be approved at the border in minutes. Here is the full guide.",
  },
  "green-card-employment-based-pathways-2026": {
    title: "Employment-Based Green Card Pathways (EB-1 to EB-5): 2026 Guide | Preciprocal",
    description: "EB-1A, EB-1B, EB-1C, EB-2 NIW, EB-3, and EB-5 explained in plain language. Requirements, processing times, country backlogs, and which category to pursue first.",
    keywords: ["employment based green card 2026", "EB1 green card guide", "EB2 NIW green card", "EB1A extraordinary ability green card", "EB1C multinational manager green card", "green card categories explained", "how to get green card US 2026", "green card backlog India", "I-140 process"],
    ogTitle: "Employment-Based Green Card Pathways Explained (EB-1 to EB-5): 2026",
    ogDescription: "Every employment-based green card category explained: requirements, timelines, and the backlog reality for Indian and Chinese nationals.",
  },
  "us-visa-policy-updates-2026": {
    title: "New US Visa Updates 2026: Duration of Status, H-1B Fee, EAD Changes | Preciprocal",
    description: "Duration of status ends September 15, 2026. The $100,000 H-1B fee is vacated pending appeal. Automatic EAD extensions are gone. Every 2026 visa rule change explained with the dates that matter.",
    keywords: ["US visa updates 2026", "duration of status rule 2026", "F1 visa changes September 2026", "H1B $100000 fee blocked", "H1B weighted lottery 2026", "EAD automatic extension ended", "new immigration rules 2026", "I-539 extension of stay F1", "USCIS changes 2026"],
    ogTitle: "New US Visa Updates (2026): What Actually Changed",
    ogDescription: "Duration of status ends Sept 15, the H-1B fee is blocked, EAD auto-extensions are gone. The dates and the details.",
  },
  "ead-renewal-2026-automatic-extension-ended": {
    title: "EAD Renewal 2026: The 540-Day Automatic Extension Is Gone | Preciprocal",
    description: "DHS ended automatic EAD extensions for most renewal categories. Who is affected, how early to file your I-765, what to tell your employer, and what to do if your card expires while USCIS is still processing.",
    keywords: ["EAD renewal 2026", "540 day automatic extension ended", "EAD automatic extension rule change", "I-765 renewal processing time 2026", "H4 EAD renewal 2026", "work permit expired USCIS pending", "EAD gap employment", "STEM OPT 180 day extension"],
    ogTitle: "EAD Renewal in 2026: The 540-Day Automatic Extension Is Gone",
    ogDescription: "Your work authorization now ends on the date printed on your card. Here is how to file early enough to avoid an unpaid gap.",
  },
  "how-to-check-your-visa-status-2026": {
    title: "How to Check Your Visa Status in 2026: I-94, SEVIS, USCIS Case Status | Preciprocal",
    description: "Your visa stamp is not your status. How to verify your actual immigration status using your I-94, SEVIS record, and USCIS case tracking, plus what changes when duration of status ends September 15, 2026.",
    keywords: ["how to check visa status", "check I-94 status online", "SEVIS record status F1", "USCIS case status check 2026", "visa vs status difference", "admit until date I-94", "immigration status check international student", "am I in status F1"],
    ogTitle: "How to Check Your Visa Status in 2026 (I-94, SEVIS, USCIS)",
    ogDescription: "Your visa stamp is not your status. Here is how to verify what actually governs your stay, and the quarterly audit that prevents problems.",
  },
  "us-job-market-late-2026-data": {
    title: "The US Job Market in Late 2026: What the Data Actually Says | Preciprocal",
    description: "Postings sit near the pre-pandemic baseline, but software development is 25% below it and recent-grad unemployment is elevated. What the numbers show and how to run a job search around them.",
    keywords: ["US job market 2026", "job market data 2026", "tech hiring 2026", "new grad unemployment 2026", "software engineer job market 2026", "hiring rate quits rate 2026", "entry level job market 2026", "job search strategy 2026 data"],
    ogTitle: "The US Job Market in Late 2026: What the Data Actually Says",
    ogDescription: "Low layoffs, low hiring, software postings 25% below baseline. The numbers, and the six strategies that follow from them.",
  },
};