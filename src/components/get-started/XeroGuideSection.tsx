'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import { getStartedContent } from '@/config/get-started';
import { cn } from '@/lib/utils';
import VideoPlayer from '@/components/get-started/VideoPlayer';
import FadeContent from '@/animations/landing/fadeanim';

/**
 * "Connecting and Managing Xero Integration in Minty" — a walkthrough video
 * plus a single-column accordion. Sits between the guide groups and the FAQ.
 */
export default function XeroGuideSection() {
  const { xeroGuide } = getStartedContent;
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <FadeContent blur={false} duration={1000} ease="ease-out" initialOpacity={0}>
      <section className="bg-[#F7F9FB] py-10 md:py-16 font-sans">
        <Container className="max-w-[1440px] px-4 md:px-6">
          <h2 className="text-[#113B4A] text-[22px] sm:text-[26px] md:text-[28px] font-extrabold tracking-tight mb-8 md:mb-10">
            {xeroGuide.title}
          </h2>

          <div className="mx-auto w-full max-w-[880px]">
            {/* No fixed width here — VideoPlayer holds the poster at 460px and
                expands to the full 880px column once it starts playing. */}
            <div className="w-full mb-8">
              {xeroGuide.videoUrl ? (
                <VideoPlayer
                  videoUrl={xeroGuide.videoUrl}
                  title={xeroGuide.title}
                  thumbnail={xeroGuide.videoThumbnail}
                  duration={xeroGuide.duration}
                  // Full column width from the start — no expand on play.
                  collapsedWidth="max-w-none"
                  // 16/9 matches the video frame exactly, so the poster occupies
                  // the same box the player will and nothing shifts on play.
                  posterAspect="aspect-[16/9]"
                />
              ) : (
                /* No recording yet — placeholder frame from the design. */
                <div className="relative aspect-[16/9] mx-auto w-full rounded-xl bg-[#D9D9D9] flex items-center justify-center">
                  <span className="text-white text-4xl" aria-hidden="true">▶</span>
                  {xeroGuide.videoNote && (
                    <span className="absolute bottom-3 right-4 text-[#E5484D] text-xs font-semibold">
                      {xeroGuide.videoNote}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {xeroGuide.items.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <article
                    key={item.id}
                    className={cn(
                      'bg-white border rounded-[14px] overflow-hidden transition-all duration-200',
                      'border-line hover:border-ink/[0.18]',
                      isOpen &&
                        'border-teal shadow-[0_1px_0_rgba(47,184,166,.06),0_8px_24px_rgba(15,45,58,.06)]'
                    )}
                  >
                    <button
                      type="button"
                      // Matches the FAQ accordion so a one-line and a two-line
                      // question produce the same collapsed height.
                      className="w-full min-h-[72px] md:min-h-[84px] flex items-center gap-4 px-5 md:px-[22px] py-4 md:py-[18px] bg-transparent border-0 cursor-pointer text-left font-sans"
                      aria-expanded={isOpen}
                      aria-controls={`xero-guide-body-${item.id}`}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                    >
                      <span className="flex-1 text-[14px] md:text-base font-semibold text-teal-deep leading-[1.4]">
                        Q. {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'relative flex-none w-9 h-9 md:w-10 md:h-10 rounded-xl bg-teal-gradient shadow-[0_6px_16px_rgba(0,203,198,.30)]',
                          'before:content-[""] before:absolute before:top-1/2 before:left-[11px] before:right-[11px] before:h-[2.5px] before:bg-white before:rounded-sm before:-translate-y-1/2 before:transition-transform before:duration-300',
                          'after:content-[""] after:absolute after:left-1/2 after:top-[11px] after:bottom-[11px] after:w-[2.5px] after:bg-white after:rounded-sm after:-translate-x-1/2 after:transition-transform after:duration-300',
                          isOpen && 'before:rotate-[135deg] after:rotate-[135deg]'
                        )}
                      />
                    </button>

                    {isOpen && (
                      <div
                        id={`xero-guide-body-${item.id}`}
                        role="region"
                        className="px-5 md:px-[22px] pb-5 text-ink-soft text-[14.5px] leading-[1.65]"
                      >
                        {item.answer.map((paragraph, idx) => (
                          <p
                            key={idx}
                            // Set on the <p> itself rather than inherited, and as an
                            // arbitrary property so nothing can collapse it with the
                            // other text-* utilities on the wrapper.
                            className="text-ink-muted [&+p]:mt-5 [text-align:justify]"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </FadeContent>
  );
}
