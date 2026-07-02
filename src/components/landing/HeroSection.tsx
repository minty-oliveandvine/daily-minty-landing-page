import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { landingContent } from '@/config/landing';
import { ArrowRight } from 'lucide-react';
import AnimatedContent from '@/animations/landing/heroanim';

export default function HeroSection() {
  const { hero } = landingContent;
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
    <section className="bg-white py-10 md:py-20" aria-labelledby="hero-title">
      <Container className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-0 md:gap-10 items-center max-w-[1200px] text-center md:text-left px-4 md:px-0">
        <div className="md:pl-12 flex flex-col items-center md:items-start">
          <h1
            id="hero-title"
            className="text-[32px] md:text-[clamp(44px,5.4vw,64px)] font-extrabold leading-[1.1] md:leading-[1.05] tracking-[-0.035em] mb-4"
          >
            {hero.title} <span className="text-ink">{hero.titleAccent}</span>
          </h1>
          <p className="text-[15px] md:text-[17px] max-w-[460px] mx-auto md:mx-0 text-ink-soft mb-6 md:mb-7">
            {hero.lede}
          </p>
          <div className="flex gap-2 md:gap-3.5 items-center justify-center md:justify-start flex-wrap mb-4">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="text">
              {hero.secondaryCta.label} <ArrowRight />
              
            </Button>
          </div>
          <span className="flex items-center gap-2 text-[13px] text-ink-muted flex-wrap">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-teal text-white flex-shrink-0">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            {typeof hero.trustText == 'object' ? (
              <>
                {hero.trustText.before}
                <span className="text-ink font-bold -ml-1">{hero.trustText.highlighted}</span>
              </>
            ) : (
              hero.trustText
            )}
          </span>
        </div>
        <div className="aspect-[4/5] md:aspect-[5/4] flex items-center justify-center mt-0 md:mt-0 mb-0 md:mb-0">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            width={600}
            height={600}
            priority
            className="w-full max-w-[400px] md:max-w-[600px] h-auto object-contain"
          />
        </div>
      </Container>
    </section>
    </AnimatedContent>
  );
}