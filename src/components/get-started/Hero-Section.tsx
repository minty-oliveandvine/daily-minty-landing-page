'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { getStartedContent } from '@/config/get-started';
import { siteConfig } from '@/config/site';
import AnimatedContent from '@/animations/landing/heroanim';


export default function HeroSection() {
  const { hero } = getStartedContent;

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
    {/* No min-h-screen here: this component is only the hero, not the whole
        page. Forcing it to 100vh made flex-grow stretch <main>, padding out
        hundreds of pixels of white space before the section below. */}
    <div className="flex flex-col bg-white">
  <main className="pt-6 md:pt-10 pb-0 font-sans">
    {/* Width + gutters match the guide bands below so the hero card's edges
        line up with their content instead of sitting 12px further in. */}
    <Container className="max-w-[1440px] px-4 md:px-6">
      
      {/* z-10: the mascot is positioned to hang below the card's rounded edge,
          and the tinted band that follows is later in the DOM — without a
          stacking order here it paints over the cat's feet. */}
      <section className="relative z-10 bg-gradient-to-r from-[#03c5c0] to-[#69d8c2] rounded-[32px] px-6 py-12 md:px-12 md:py-20 text-white mb-12 md:mb-20 shadow-sm overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative w-full z-10">
          

          <div className="lg:col-span-7 max-w-[550px]">
            <h1 className="text-white text-[28px] sm:text-[32px] md:text-[48px] font-extrabold tracking-tight leading-tight mb-4 flex items-center flex-wrap gap-x-3">
              {hero.title}
              <Image
                src="/assets/minty-logo.png"
                alt="Minty"
                width={100}
                height={60}
                // Logo tracks the heading size — at 40px next to 28px text it
                // overpowered the words on small screens.
                className="h-[30px] sm:h-[40px] md:h-[60px] w-auto inline-block brightness-0 invert"
              />
            </h1>

            <p className="text-white text-sm md:text-base leading-relaxed mb-8 max-w-[420px]">
              {hero.description}
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4 items-center">
              <Button className="bg-white text-[#113B4A] hover:bg-white/90 font-bold px-6 py-3 rounded-full text-[14px] shadow-sm transition-all duration-200" href={hero.primaryBtnHref}>
                {hero.primaryBtn}
              </Button>
              <Button className="bg-transparent text-white border-2 border-white/40 hover:border-white hover:bg-white/10 font-bold px-6 py-2.5 rounded-full text-[14px] transition-all duration-200" href={siteConfig.loginUrl}>
                {hero.secondaryBtn}
              </Button>
            </div>
          </div>

          <div className="
              relative mt-0 mx-auto
              lg:absolute
              lg:mt-20
              lg:right-10 
              lg:top-[-120px]
              w-full 
              max-w-[260px]
              md:max-w-[320px]   
              lg:max-w-[420px]       
              pointer-events-none 
              z-20
          ">
            <Image
              src={hero.mascotSrc}
              alt="Minty Mascot"
              width={420} 
              height={420}
              priority
              className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
            />
          </div>

        </div>
      </section>

      {/* The "What will you get from this page?" benefits band sat here. It is
          replaced by the "Login to Minty with OTP" guides group, which renders
          immediately below from Guide-Section. Content kept in get-started.ts. */}

    </Container>
  </main>
</div>
</AnimatedContent>
  );
}