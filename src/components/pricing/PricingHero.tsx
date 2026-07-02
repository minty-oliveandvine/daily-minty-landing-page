import Image from 'next/image';
import AnimatedContent from '@/animations/pricing/heroanim';

export default function PricingHero() {
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
    <section className="relative bg-gradient-to-r from-[#04c2bb] to-[#5ad6c4] rounded-[32px] mx-4 md:mx-auto max-w-[1200px] px-6 py-10 md:p-16 text-white overflow-hidden lg:overflow-visible mb-12 md:mb-16 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        <div className="lg:col-span-7 max-w-[550px]">
          <h1 className="text-[32px] md:text-[48px] text-white font-extrabold tracking-tight leading-tight mb-3">
            Minty Pricing Plans
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-[480px]">
            One subscription. Every daily-closing tool you need.
          </p>
        </div>

        <div className="
            lg:col-span-5 
            flex 
            w-full 
            pointer-events-none 
            z-20 
            mx-auto lg:mx-0 
            justify-center 
            md:justify-end 
            lg:absolute 
            lg:right-20        
            lg:bottom-[-160px] 
            max-w-[200px]      
            md:max-w-[280px]   
            lg:w-[400px]
            lg:max-w-[720px]
            ">
            <Image
                src="/assets/deployed-assets/minty-hero-cat.png"
                alt="Minty Superhero Mascot"
                width={720}
                height={720}
                priority
                className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
            />
        </div>

      </div>
    </section>
    </AnimatedContent>
  );
}