import Image from 'next/image';
import Link from 'next/link';
import FadeContent from '@/animations/landing/fadeanim';

export default function FAQSupportSection() {
  return (
    <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
    <section className="bg-[#FAF6F0] py-8 md:py-12 px-4">
      <div className="bg-white rounded-[24px] md:rounded-[32px] max-w-[900px] mx-auto p-6 md:p-10 shadow-[0_2px_8px_rgba(17,59,74,0.05)] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 relative overflow-hidden">

        <div className="flex-1 text-center md:text-left max-w-[480px] z-10 py-4 md:py-10">
          <h2 className="text-[#113B4A] text-[22px] md:text-[26px] font-extrabold tracking-tight mb-2">
            Still need a hand?
          </h2>
          <p className="text-[#5a6d75] text-[12px] md:text-[14px] leading-[1.5] mb-4 md:mb-5">
            Can&apos;t find the answer here? The Minty team replies within one business day, and we&apos;re real people who actually run the numbers.
          </p>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3">
            <Link
              href="/resources/contact"
              className="bg-[#00CBB0] hover:bg-[#00b59d] text-white font-bold text-[12px] md:text-[14px] px-5 md:px-6 py-2.5 rounded-full shadow-sm transition-all duration-150 w-full md:w-auto text-center"
            >
              Contact Support
            </Link>
            <Link
              href="/pricing"
              className="text-[#113B4A] border border-[#f1ece4] rounded-full font-bold text-[12px] md:text-[14px] px-5 md:px-6 py-2.5 hover:text-[#00cbb0] transition-all duration-150 w-full md:w-auto text-center"
            >
              See pricing plans
            </Link>
          </div>
        </div>

        <div className="hidden md:flex flex-shrink-0 z-10 w-[200px] md:w-[260px] md:mr-4 lg:mr-6">
          <Image
            src="/assets/deployed-assets/minty-mascot-chat.png"
            alt="Minty Waving Mascot"
            width={260}
            height={260}
            className="w-full h-auto object-contain"
          />
        </div>

      </div>
    </section>
    </FadeContent>
  );
}