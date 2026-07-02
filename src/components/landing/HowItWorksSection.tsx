import Image from 'next/image';
import Container from '@/components/ui/Container';
import { landingContent } from '@/config/landing';
import FadeContent from '@/animations/landing/fadeanim';

export default function HowItWorksSection() {
  const { how } = landingContent;
  return (
    <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
      <section id="how" className="bg-white pt-24 pb-20 text-center" aria-labelledby="how-title">
        <Container>
          <h2
            id="how-title"
            className="text-[clamp(30px,3.6vw,42px)] mb-3.5 whitespace-pre-line"
          >
            {how.title}
          </h2>
          <p className="max-w-[580px] mx-auto mb-14 text-ink-muted text-[15px]">
            {how.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {how.steps.map((step) => (
              <article
                key={step.num}
                className="bg-white border border-line rounded-[22px] p-7 text-center shadow-minty-sm grid grid-rows-[auto_auto_auto_1fr] justify-items-center gap-3.5"
              >
                <div className="w-full aspect-[4/3] flex items-center justify-center">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={230}
                    height={172}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="w-9 h-9 rounded-full bg-mint text-teal-deep inline-flex items-center justify-center font-bold text-base"
                >
                  {step.num}
                </span>
                <h3 className="text-[21px] m-0 flex items-center min-h-[2.4em]">{step.title}</h3>
                <p className="text-[15.5px] text-ink-muted min-h-[4em] leading-normal">{step.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </FadeContent>
  );
}