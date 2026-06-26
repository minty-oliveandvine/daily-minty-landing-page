import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { landingContent } from '@/config/landing';

export default function HeroSection() {
  const { hero } = landingContent;
  return (
    <section className="bg-white py-15 md:py-20" aria-labelledby="hero-title">
      <Container className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-10 items-center">
        <div className="md:pl-12">
          <h1
            id="hero-title"
            className="text-[44px] md:text-[clamp(44px,5.4vw,64px)] font-extrabold leading-[1.05] tracking-[-0.035em] mb-4"
          >
            {hero.title} <span className="text-ink">{hero.titleAccent}</span>
          </h1>
          <p className="text-[17px] max-w-[460px] text-ink-soft mb-7">
            {hero.lede}
          </p>
          <div className="flex gap-3.5 items-center flex-wrap mb-4">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="text">
              {hero.secondaryCta.label}
              
            </Button>
          </div>
          <span className="inline-flex items-center gap-2 text-[13px] text-ink-muted">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-teal text-white">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            {hero.trustText}
          </span>
        </div>
        <div className="aspect-[5/4] flex items-center justify-center">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            width={600}
            height={600}
            priority
            className="w-full max-w-[600px] h-auto object-contain"
          />
        </div>
      </Container>
    </section>
  );
}