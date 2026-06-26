import Image from 'next/image';
import Link from 'next/link';

export default function FAQSupportSection() {
  return (
    <section className="bg-[#FAF6F0] py-12 px-4">
      <div className="bg-white rounded-[32px] max-w-[900px] mx-auto md:p-10 shadow-[0_2px_8px_rgba(17,59,74,0.05)] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">

        <div className="flex-1 text-left max-w-[480px] z-10 py-10">
          <h2 className="text-[#113B4A] text-[24px] md:text-[26px] font-extrabold tracking-tight mb-2">
            Still need a hand?
          </h2>
          <p className="text-[#5a6d75] text-[13px] md:text-[14px] leading-[1.5] mb-5">
            Can&apos;t find the answer here? The Minty team replies within one business day, and we&apos;re real people who actually run the numbers.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/resources/contact"
              className="bg-[#00CBB0] hover:bg-[#00b59d] text-white font-bold text-[13px] md:text-[14px] px-5 py-2.5 rounded-full shadow-sm transition-all duration-150"
            >
              Contact Support
            </Link>
            <Link
              href="/pricing"
              className="text-[#113B4A] border border-[#f1ece4] rounded-full  font-bold text-[13px] md:text-[14px] px-5 py-2.5 hover:text-[#00cbb0] transition-all duration-150"
            >
              See pricing plans
            </Link>
          </div>
        </div>

        <div className="flex-shrink-0 z-10 w-[260px] md:w-[260px] mr-10 lg:max-[720px]">
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
  );
}