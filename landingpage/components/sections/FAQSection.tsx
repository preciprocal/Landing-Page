"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const FAQSection = () => {
  const faqs = [
    {
      question: "Is this just another ChatGPT wrapper?",
      answer:
        "No. Preciprocal uses a multi-agent architecture. While we use LLMs under the hood, we've built custom pipelines specifically trained on actual HR data, ATS parsing logic, and real-world technical interviews to ensure accuracy and low latency.",
    },
    {
      question: "How realistic are the Voice AI interviews?",
      answer:
        "Extremely realistic. Our voice agents are designed with sub-500ms latency, meaning they can interrupt you, react to your tone, and simulate the exact pressure of speaking to a real Senior Engineer or HR Manager.",
    },
    {
      question: "Will the Resume Engine guarantee I pass ATS?",
      answer:
        "While no tool can guarantee a 100% pass rate across all proprietary systems, our engine tests your resume against the exact parsing algorithms used by Workday, Greenhouse, and Lever to maximize your match rate.",
    },
    {
      question: "How does the automated outreach work?",
      answer:
        "When you save a job, our system scans LinkedIn and company directories to identify the likely hiring manager. It then uses your profile data and the job description to generate a hyper-personalized cold email that you can send directly.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 max-w-3xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Common Questions
        </h2>
        <p className="text-lg text-slate-400">
          Everything you need to know about the platform.
        </p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-white">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 ml-4"
                >
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
