import Image from 'next/image';
import AnimatedContent from '@/animations/landing/heroanim';

export default function FAQHero() {
  return (
    <AnimatedContent
      distance={100}
      direction="vertical"
      reverse={false}
      duration={0.8}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.1}
      delay={0}
    >
    <section className="relative w-full max-w-[1400px] mx-auto my-6 md:my-8 px-4">
      <div className="relative w-full bg-gradient-to-r from-[#03c5c0] to-[#69d8c2] rounded-[24px] md:rounded-[32px] p-6 md:px-12 md:py-4 overflow-visible min-h-auto md:min-h-[240px] flex flex-col md:items-center md:justify-between md:flex-row gap-4 md:gap-6">

        {/* Left Content */}
        <div className="z-10 flex-1">
          <p className="text-white font-bold text-[10px] md:text-sm tracking-widest uppercase mb-1 md:mb-2 opacity-90">
            Petty Cash & Bill Payment
          </p>
          <h1 className="text-white text-[28px] md:text-[48px] font-extrabold tracking-tight leading-[1.2] md:leading-[1.15]">
            Frequently
          </h1>
          <h2 className="text-white text-[28px] md:text-[48px] font-extrabold tracking-tight leading-[1.2] md:leading-[1.15]">
            asked questions
          </h2>
        </div>

        <div className="relative flex-shrink-0 ml-auto md:ml-0 md:mr-8 lg:mr-16 lg:mt-5 lg:mb-0">

          <div className="absolute top-[20%] right-[75%] md:right-[70%] bg-white text-[#113B4A] font-bold text-[10px] md:text-base px-4 md:px-12 py-2.5 md:py-4 rounded-[18px] md:rounded-[22px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] whitespace-nowrap z-30 flex items-center gap-2">
            Need help? No worries!
            <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 md:w-3.5 md:h-3.5 bg-white rotate-45 rounded-sm" />
          </div>

          <Image
            src="/assets/deployed-assets/faq-professor-cat.png"
            alt="Minty Teacher Mascot"
            width={420}
            height={280}
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 280px, 150px"
            className="w-[150px] md:w-[280px] lg:w-[420px] h-auto object-contain"
            priority
          />
        </div>

      </div>
    </section>
    </AnimatedContent>
  );
}