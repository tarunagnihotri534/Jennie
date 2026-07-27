"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PRODUCT_CONFIG } from "@/lib/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#e8542c] dark:text-[#f05a28] block mb-3">
          THE FINE PRINT
        </span>
        <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#181715] dark:text-[#f3efe6]">
          QUESTIONS, ANSWERED
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {PRODUCT_CONFIG.faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-none bg-[#f5efe4]/90 dark:bg-[#1a1816]/90 border border-[#e2dacd] dark:border-[#2d2b27] overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left font-headline text-lg sm:text-xl font-bold text-[#181715] dark:text-[#f3efe6] hover:text-[#e8542c] dark:hover:text-[#f05a28] transition-colors focus:outline-none"
              >
                <span className="pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#e8542c] dark:text-[#f05a28]" : "rotate-0 text-[#888175] dark:text-[#787267]"
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 sm:px-8 pb-6 text-sm sm:text-base text-[#4a463f] dark:text-[#b0aaa0] leading-relaxed font-sans font-medium border-t border-[#e2dacd]/30 dark:border-[#2d2b27]/30 pt-3">
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
