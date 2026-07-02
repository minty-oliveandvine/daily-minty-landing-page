'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { getStartedContent } from '@/config/get-started';
import { siteConfig } from '@/config/site';
import AnimatedContent from '@/animations/landing/heroanim';


export default function HeroSection() {
  const { hero, benefits } = getStartedContent;

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
    <div className="min-h-screen flex flex-col bg-white">
  <main className="flex-grow pt-6 md:pt-10 pb-4 font-sans">
    <Container>
      
      <section className="relative bg-gradient-to-r from-[#03c5c0] to-[#69d8c2] rounded-[32px] px-6 py-12 md:p-16 text-white mb-10 md:mb-20 shadow-sm overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative w-full z-10">
          

          <div className="lg:col-span-7 max-w-[550px]">
            <h1 className="text-white text-[32px] md:text-[48px] font-extrabold tracking-tight leading-tight mb-4 flex items-center flex-wrap gap-x-3">
              {hero.title}
              <Image 
                src="/assets/minty-logo.png" 
                alt="Minty" 
                width={100} 
                height={60} 
                className="h-[40px] md:h-[60px] w-auto inline-block brightness-0 invert" 
              />
            </h1>

            <p className="text-white text-sm md:text-base leading-relaxed mb-8 max-w-[420px]">
              {hero.description}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Button className="bg-white text-[#113B4A] hover:bg-white/90 font-bold px-6 py-3 rounded-full text-[14px] shadow-sm transition-all duration-200" href={hero.primaryBtnHref}>
                {hero.primaryBtn}
              </Button>
              <Button className="bg-transparent text-white border-2 border-white/40 hover:border-white hover:bg-white/10 font-bold px-6 py-2.5 rounded-full text-[14px] transition-all duration-200" href={siteConfig.loginUrl}>
                {hero.secondaryBtn}
              </Button>
            </div>
          </div>

          <div className="
              relative mt-6 mx-auto
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

      <section className="
        text-center
        bg-[#f3f9f7]
        pt-12 md:pt-16
        pb-8 md:pb-12
        mt-8 md:mt-12
        mb-0
        w-screen
        relative
        left-1/2
        -translate-x-1/2
        px-6
        md:px-16
        rounded-none
      ">
        <div className="max-w-[1200px] mx-auto w-full mb-5">
          
          <h2 className="text-[#113B4A] text-[24px] md:text-[28px] font-extrabold tracking-tight mb-12">
            {benefits.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[20px] py-[50px] px-10 text-left border border-gray-100 shadow-[0_8px_24px_rgba(17,59,74,0.04)] hover:shadow-[0_12px_32px_rgba(17,59,74,0.06)] transition-shadow duration-200 flex flex-col gap-4"
              >
                <div className="w-10 h-8 bg-[#E6FAF7] text-[#00CBB0] font-bold text-sm flex items-center justify-center rounded-lg">
                  {item.id}
                </div>
                <p className="text-[#113B4A] font-bold text-[16px] md:text-[17px] leading-normal">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
      
    </Container>
  </main>
</div>
</AnimatedContent>
  );
}