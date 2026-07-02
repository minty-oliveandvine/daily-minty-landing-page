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
    <section className="bg-peach py-10" aria-labelledby="problem-title">
      <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
        <Container className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div className="aspect-[5/4] flex items-center justify-center">
            <Image
              src={problem.image}
              alt={problem.imageAlt}
              width={500}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="bg-[#fff7ec] rounded-[22px] p-8 shadow-minty-sm">
            <span className="inline-block bg-peach-deep text-peach-accent font-bold text-[11px] tracking-[0.12em] uppercase px-3 py-[5px] rounded-full mb-[18px]">
              {problem.tag}
            </span>
            <h2 id="problem-title" className="text-[28px] leading-[1.2] mb-[18px]">
              {renderHeadline(problem.headline, problem.highlights)}
            </h2>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {problem.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-ink-soft">
                  <span aria-hidden="true" className="flex-none w-[22px] h-[22px] inline-flex items-center justify-center text-peach-accent font-extrabold text-base leading-none">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </FadeContent>
    </section>

  );
}