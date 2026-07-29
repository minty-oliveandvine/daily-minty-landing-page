import Image from 'next/image';
import Container from '@/components/ui/Container';
import { landingContent } from '@/config/landing';
import FadeContent from '@/animations/landing/fadeanim';

export default function HowItWorksSection() {
  const { how } = landingContent;

  return (
    <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
      <section id="how" className="bg-white py-12 md:py-20 text-center" aria-labelledby="how-title">
        <Container>
          {/* Header Section */}
          <h2
            id="how-title"
            className="text-[clamp(32px,3.8vw,48px)] font-bold mb-3.5 text-ink tracking-tight"
          >
            {how.title}
          </h2>
          <p className="max-w-[580px] mx-auto mb-14 text-ink/70 text-[16px] leading-relaxed">
            {how.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 auto-rows-[minmax(230px,auto)] items-stretch">
            
            {/* CARD 1: Left Vertical Card */}
            {how.steps[0] && (
              <article className="md:row-span-2 md:col-start-1 md:row-start-1 bg-white border border-line/80 rounded-[24px] p-7 md:p-8 text-center shadow-minty-sm flex flex-col items-center justify-between">
                <div className="w-full flex-1 flex items-center justify-center min-h-[180px]">
                  <Image
                    src={how.steps[0].image}
                    alt={how.steps[0].alt}
                    width={240}
                    height={200}
                    className="w-auto h-auto max-h-[190px] object-contain"
                  />
                </div>
                <div className="flex flex-col items-center gap-2.5 mt-4 w-full">
                  <span className="w-8 h-8 rounded-full bg-mint/30 text-teal-deep inline-flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </span>
                  <h3 className="text-[20px] font-bold text-ink leading-snug">{how.steps[0].title}</h3>
                  <p className="text-[14.5px] text-ink/75 leading-relaxed max-w-[280px]">
                    {how.steps[0].body}
                  </p>
                </div>
              </article>
            )}

            {/* CARD 2: Middle-Top Horizontal Card */}
            {how.steps[1] && (
              <article className="md:col-start-2 md:row-start-1 bg-white border border-line/80 rounded-[24px] p-5 sm:p-6 shadow-minty-sm flex flex-col sm:flex-row items-center justify-between gap-5 text-center">
                <div className="w-full sm:w-[38%] shrink-0 flex items-center justify-center">
                  <Image
                    src={how.steps[1].image}
                    alt={how.steps[1].alt}
                    width={160}
                    height={130}
                    className="w-auto h-auto max-h-[120px] sm:max-h-[135px] object-contain"
                  />
                </div>

                <div className="w-full sm:w-[62%] flex flex-col items-center justify-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-mint/30 text-teal-deep inline-flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </span>
                  <h3 className="text-[18px] font-bold text-ink leading-snug">{how.steps[1].title}</h3>
                  <p className="text-[14px] text-ink/75 leading-relaxed max-w-[340px]">
                    {how.steps[1].body}
                  </p>
                </div>
              </article>
            )}

            {/* CARD 4: Right Vertical Card */}
            {how.steps[3] && (
              <article className="md:row-span-2 md:col-start-3 md:row-start-1 bg-white border border-line/80 rounded-[24px] p-7 md:p-8 text-center shadow-minty-sm flex flex-col items-center justify-between">
                <div className="w-full flex-1 flex items-center justify-center min-h-[180px]">
                  <Image
                    src={how.steps[3].image}
                    alt={how.steps[3].alt}
                    width={240}
                    height={200}
                    className="w-auto h-auto max-h-[190px] object-contain"
                  />
                </div>
                <div className="flex flex-col items-center gap-2.5 mt-4 w-full">
                  <span className="w-8 h-8 rounded-full bg-mint/30 text-teal-deep inline-flex items-center justify-center font-bold text-sm shrink-0">
                    4
                  </span>
                  <h3 className="text-[20px] font-bold text-ink leading-snug">{how.steps[3].title}</h3>
                  <p className="text-[14.5px] text-ink/75 leading-relaxed max-w-[280px]">
                    {how.steps[3].body}
                  </p>
                </div>
              </article>
            )}

            {/* CARD 3: Middle-Bottom Horizontal Card */}
            {how.steps[2] && (
              <article className="md:col-start-2 md:row-start-2 bg-white border border-line/80 rounded-[24px] p-5 sm:p-6 shadow-minty-sm flex flex-col sm:flex-row items-center justify-between gap-5 text-center">
                <div className="w-full sm:w-[38%] shrink-0 flex items-center justify-center">
                  <Image
                    src={how.steps[2].image}
                    alt={how.steps[2].alt}
                    width={160}
                    height={130}
                    className="w-auto h-auto max-h-[120px] sm:max-h-[135px] object-contain"
                  />
                </div>

                <div className="w-full sm:w-[62%] flex flex-col items-center justify-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-mint/30 text-teal-deep inline-flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </span>
                  <h3 className="text-[18px] font-bold text-ink leading-snug">{how.steps[2].title}</h3>
                  <p className="text-[14px] text-ink/75 leading-relaxed max-w-[340px]">
                    {how.steps[2].body}
                  </p>
                </div>
              </article>
            )}

          </div>
        </Container>
      </section>
    </FadeContent>
  );
}