'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { getStartedContent } from '@/config/get-started';
import FadeContent from '@/animations/landing/fadeanim';
export default function GetStartedFaqSection() {
  const { faqSection } = getStartedContent;

  return (
    <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
    <section className="bg-[#F4F7F9] py-20 font-sans">
      <Container className="max-w-[950px]">
        <div className="text-center mb-12">
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

          <div className="flex flex-col mb-8">
            {faqSection.faqBox.items.map((item) => (
              <Link
                key={item.id}
                href={`/resources/support?faqId=${encodeURIComponent(item.question)}`}
                className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-b-0 cursor-pointer group no-underline"
              >
                <div className="w-6 h-6 bg-[#E6FAF7] text-[#00CBB0] text-[11px] font-bold rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#00CBB0] group-hover:text-white transition-colors duration-150">
                  Q
                </div>
                <p className="text-[#113B4A] font-medium text-[14px] leading-snug group-hover:text-[#00CBB0] transition-colors duration-150">
                  {item.question}
                </p>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/resources/support"
              className="bg-transparent text-[#113B4A] border border-gray-200 hover:bg-gray-50 font-bold px-6 py-2.5 rounded-full text-[13px] transition-all duration-200 inline-flex items-center gap-1.5 shadow-xs no-underline"
            >
              {faqSection.faqBox.buttonText} <span>→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqSection.supportCards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_24px_rgba(17,59,74,0.02)] flex flex-col items-start justify-between min-h-[220px]"
            >
              <div>

                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold mb-5 shadow-xs ${
                  card.type === 'support' ? 'bg-[#2BBCA6]' : 'bg-[#00CBB0]'
                }`}>
                  {card.icon}
                </div>
                
                <h4 className="text-[#113B4A] text-[17px] font-extrabold mb-2">
                  {card.title}
                </h4>
                <p className="text-gray-500 text-[13px] leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <Link 
                href={card.href}
                className="text-[#00CBB0] font-bold text-[14px] hover:text-[#00A38D] inline-flex items-center gap-1 transition-colors group"
              >
                {card.linkText} 
                <span className="transform transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
    </FadeContent>
  );
}