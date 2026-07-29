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
    <section className="bg-white pt-16 md:pt-28 md:pb-20" aria-labelledby="hero-title">
      {/* Column split + width mirror the original landing page (2fr/3fr inside a
          1440px shell) so the hero art renders at the same scale it did there. */}
      <Container className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-center max-w-[1440px] text-center md:text-left px-4 md:px-6">
        {/* No left inset here — the original hero ran its headline flush to the
            column edge, which is what gives the 80px type room to sit on one line. */}
        <div className="min-w-0 flex flex-col items-center md:items-start">
          <h1
            id="hero-title"
            className="text-[32px] md:text-[clamp(56px,6vw,80px)] md:whitespace-nowrap font-extrabold leading-[1.1] md:leading-[1.05] tracking-[-0.035em] mb-4"
          >
            {hero.title} <span className="text-ink">{hero.titleAccent}</span>
          </h1>
          <p className="text-[15px] md:text-[19px] max-w-[460px] md:max-w-none md:whitespace-nowrap mx-auto md:mx-0 text-ink-soft mb-6 md:mb-8">
            {hero.lede}
          </p>
          {/* Generous bottom margin: the waitlist CTA's pulsing ring expands ~18px
              past the button edge, so a tighter gap lets it wash over this line. */}
          <div className="flex gap-2 md:gap-3.5 items-center justify-center md:justify-start flex-wrap mb-6 md:mb-9">
            <Button href={hero.primaryCta.href} external={hero.primaryCta.external} variant="waitlist" size="xl">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="text" size="lg">
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
        {/* min-w-0 keeps the 1920px-wide art from forcing the fr track wider
            than its share and overflowing the page horizontally. */}
        <div className="min-w-0 flex items-center justify-center mt-0 md:mt-0 mb-0 md:mb-0">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            width={1920}
            height={1080}
            sizes="(min-width: 1440px) 835px, (min-width: 768px) 60vw, 100vw"
            quality={100}
            priority
            className="w-full max-w-[400px] md:max-w-[820px] h-auto object-contain"
          />
        </div>
      </Container>
    </section>
    </AnimatedContent>
  );
}