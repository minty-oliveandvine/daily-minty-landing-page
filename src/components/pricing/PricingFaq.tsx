import Link from 'next/link';
import FadeContent from '@/animations/landing/fadeanim';

export default function PricingFAQSupport() {
  return (
    <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
    <section className="w-full">
      <div className="bg-[#f4faf8] px-4 py-8 md:p-12 shadow-[0_4px_24px_rgba(17,59,74,0.01)] text-center w-full mx-auto">
        <h3 className="text-[#113B4A] text-[22px] md:text-[28px] font-extrabold tracking-tight mb-3 md:mb-2">
          Still have questions?
        </h3>
        <p className="text-gray-400 text-[13px] md:text-sm mb-6 md:mb-8 max-w-[420px] mx-auto leading-relaxed">
          {"Check our help centre or reach out — we'll match you with the right plan."}
        </p>

        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-3 md:gap-4 items-center">
          <Link
            href="/resources/faq"
            className="bg-[#00CBB0] hover:bg-[#00B59D] text-white font-bold px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[12px] md:text-[13px] shadow-sm transition-all duration-200 w-full md:w-auto"
          >
            Visit FAQ
          </Link>
          <Link
            href="/resources/contact"
            className="bg-[#113B4A] hover:bg-[#1A4B5D] text-white font-bold px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[12px] md:text-[13px] shadow-sm transition-all duration-200 w-full md:w-auto"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
    </FadeContent>
  );
}