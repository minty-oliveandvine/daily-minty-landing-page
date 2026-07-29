import Image from 'next/image';
import Container from '@/components/ui/Container';
import { landingContent } from '@/config/landing';
import FadeContent from '@/animations/landing/fadeanim';

function renderHeadline(headline: string, highlights: readonly string[]) {
  const pattern = new RegExp(`(${highlights.join('|')})`, 'gi');
  return headline.split(pattern).map((part, i) =>
    highlights.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} className="text-peach-accent">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function ProblemSection() {
  const { problem } = landingContent;
  return (
    <section className="bg-peach py-12 md:py-20" aria-labelledby="problem-title">
      <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center md:items-start max-w-[1440px] px-4 md:px-6">
          <div className="min-w-0 flex items-center justify-center">
            <div className="w-full max-w-[672px] aspect-[3/2] md:aspect-[672/412] overflow-hidden">
              <Image
                src={problem.image}
                alt={problem.imageAlt}
                width={2048}
                height={2048}
                sizes="(min-width: 1440px) 672px, (min-width: 768px) 50vw, 100vw"
                quality={100}
                className="w-full h-full object-cover object-[center_75%]"
              />
            </div>
          </div>
          <div className="min-w-0 bg-[#fff7ec] rounded-3xl p-8 sm:p-10">
            <div className="inline-block bg-peach-deep px-4 py-1.5 rounded-full mb-6">
              <span className="text-peach-accent font-bold text-xs tracking-wider uppercase">
                {problem.tag}
              </span>
            </div>
            <h2 id="problem-title" className="text-3xl sm:text-4xl font-bold mb-8 whitespace-pre-line">
              {renderHeadline(problem.headline, problem.highlights)}
            </h2>
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              {problem.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span aria-hidden="true" className="material-symbols-outlined flex-none text-2xl text-peach-accent">
                    close
                  </span>
                  <span className="text-base text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </FadeContent>
    </section>

  );
}