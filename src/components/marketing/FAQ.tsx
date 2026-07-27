"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { PRODUCT_CONFIG } from "@/lib/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#e8542c] dark:text-[#f05a28] px-3 py-1 rounded-full bg-[#e8542c]/10 border border-[#e8542c]/20 inline-block mb-4">
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl uppercase tracking-tight text-[#181715] dark:text-[#f3efe6]">
          GOT QUESTIONS? WE&apos;VE GOT ANSWERS
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {PRODUCT_CONFIG.faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-xl bg-[#eae3d5]/80 dark:bg-[#1c1a17]/80 border border-[#dcd3c3] dark:border-[#2e2b26] overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-headline text-lg md:text-xl text-[#181715] dark:text-[#f3efe6] hover:text-[#e8542c] dark:hover:text-[#f05a28] transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#e8542c] shrink-0" />
                  <span>{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#5e5a54] dark:text-[#a39e93] shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#e8542c]" : "rotate-0"
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 text-sm md:text-base text-[#5e5a54] dark:text-[#a39e93] border-t border-[#dcd3c3]/40 dark:border-[#2e2b26]/40 leading-relaxed font-sans">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
