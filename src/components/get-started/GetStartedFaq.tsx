'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { getStartedContent } from '@/config/get-started';
import { cn } from '@/lib/utils';
import FadeContent from '@/animations/landing/fadeanim';

export default function GetStartedFaqSection() {
  const { faqSection } = getStartedContent;
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <FadeContent blur={false} duration={1000} ease="ease-out" initialOpacity={0}>
    <section className="bg-[#F4F7F9] py-12 md:py-20 font-sans">
      <Container className="max-w-[950px] px-4 md:px-7">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[#113B4A] text-[28px] md:text-[34px] font-extrabold tracking-tight mb-3">
            {faqSection.title}
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            {faqSection.subtitle}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(17,59,74,0.02)] mb-8">
          <h3 className="text-[#113B4A] text-[16px] font-extrabold mb-6 tracking-tight">
            {faqSection.faqBox.title}
          </h3>

          {/* Questions expand in place rather than linking to /resources/faq. */}
          <div className="flex flex-col mb-8">
            {faqSection.faqBox.items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="border-b border-gray-100 last:border-b-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`common-faq-body-${item.id}`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full flex items-center gap-4 py-4 bg-transparent border-0 cursor-pointer text-left group"
                  >
                    <div
                      className={cn(
                        'w-6 h-6 text-[11px] font-bold rounded-full flex items-center justify-center shrink-0 transition-colors duration-150',
                        isOpen
                          ? 'bg-[#00CBB0] text-white'
                          : 'bg-[#E6FAF7] text-[#00CBB0] group-hover:bg-[#00CBB0] group-hover:text-white'
                      )}
                    >
                      Q
                    </div>
                    <p
                      className={cn(
                        'flex-1 font-medium text-[14px] leading-snug transition-colors duration-150',
                        isOpen ? 'text-[#00CBB0]' : 'text-[#113B4A] group-hover:text-[#00CBB0]'
                      )}
                    >
                      {item.question}
                    </p>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex-none w-2 h-2 border-r-2 border-b-2 border-current rotate-45 -translate-y-px transition-transform duration-200',
                        isOpen ? 'text-[#00CBB0] rotate-[225deg] translate-y-0.5' : 'text-gray-300'
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`common-faq-body-${item.id}`}
                      role="region"
                      className="pl-10 pr-2 pb-4 text-[#5a6d75] text-[13.5px] leading-[1.65]"
                    >
                      <p className="[text-align:justify]">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Link
              href="/resources/faq"
              className="bg-transparent text-[#113B4A] border border-gray-200 hover:bg-gray-50 font-bold px-6 py-2.5 rounded-full text-[13px] transition-all duration-200 inline-flex items-center gap-1.5 shadow-xs no-underline"
            >
              {faqSection.faqBox.buttonText} <span>→</span>
            </Link>
          </div>
        </div>

      </Container>
    </section>
    </FadeContent>
  );
}