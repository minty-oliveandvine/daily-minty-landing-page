import Image from 'next/image';
import AnimatedContent from '@/animations/contact/heroanim';

export default function ContactHero() {
  return (
    <AnimatedContent
      distance={100}
      direction="horizontal"
      reverse={false}
      duration={0.8}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.1}
      delay={0}
    >
    <section className="relative pt-6 md:pt-10 pb-10 md:pb-16 text-center px-4 overflow-hidden bg-[#FAF6F0]">
        <div className="inline-flex items-center gap-2 bg-[#d6efe8] text-[#00CBB0] px-3 md:px-4 py-1 rounded-full text-[9px] md:text-[11px] font-bold uppercase tracking-widest mb-4 md:mb-6 border border-[#00CBB0]/10 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00CBB0]" />
            {"We're here to help"}
        </div>

        <h1 className="text-[32px] md:text-[56px] font-extrabold text-[#113B4A] tracking-tight mb-3 md:mb-4">
            Talk to <span className="text-[#00CBB0]">Minty.</span>
        </h1>

        <p className="max-w-[520px] mx-auto text-[#4A7280] leading-[1.6] md:leading-[1.7] text-[15px] md:text-[17px]">
            {"Real humans, fast answers. Whether you've hit a snag, want a hand setting up, or just have a question about your numbers — drop us a line."}
        </p>

        <div className="absolute left-[5%] top-[80px] hidden lg:block w-[320px]">
            <Image
            src="/assets/deployed-assets/contact-cat-desk.png"
            alt="Minty working"
            width={320}
            height={240}
            className="w-full h-auto"
            />
        </div>
    </section>
    </AnimatedContent>
  );
}