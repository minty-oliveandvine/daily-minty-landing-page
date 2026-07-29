'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { getStartedContent } from '@/config/get-started';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import VideoPlayer from '@/components/get-started/VideoPlayer';
import FadeContent from '@/animations/landing/fadeanim';

export default function GuidesSection() {
  const { guideGroups } = getStartedContent;

  // Track which guide is currently being viewed/played. Ids are unique across
  // every group, so a single piece of state covers all of them — this is what
  // keeps only one video open at a time.
  const [activeGuideId, setActiveGuideId] = useState<number | null>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);

  // Smooth-scroll to the playing video when a guide is selected
  useEffect(() => {
    if (activeGuideId && activeCardRef.current) {
      setTimeout(() => {
        activeCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [activeGuideId]);

  return (
    <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
    <div id="guide" className="font-sans">
    {guideGroups.map((group) => (
    <div key={group.id}>
    {/* A group with no items renders as a title-only banner — same gutters and
        left edge as the card groups, just without the grid beneath it. */}
    <section className={cn(
      group.items.length === 0 ? 'py-10 md:py-12' : 'py-10 md:py-16',
      group.background
    )}>
      <Container className="max-w-[1440px] px-4 md:px-6">
        <div className={cn('text-left', group.items.length > 0 && 'mb-6 md:mb-10')}>
          <h2 className="text-[22px] sm:text-[26px] md:text-[32px] font-extrabold tracking-tight mb-2">
            {group.eyebrow ? (
              <>
                <span className="text-[#113B4A]">{group.eyebrow}</span>{' '}
                <span className="text-[#00CBB0]">{group.title}</span>
              </>
            ) : (
              <span className="text-[#113B4A]">{group.title}</span>
            )}
          </h2>
          {group.subtitle && (
            <p className="text-gray-500 text-sm md:text-base">
              {group.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 animate-fadeIn">
          {group.items.map((guide) => {
            const isActive = guide.id === activeGuideId;
            return (
            <div
              key={guide.id}
              ref={isActive ? activeCardRef : null}
              className={cn(
                "bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]",
                isActive && "md:col-span-2 order-first"
              )}
            >
              <div className="flex justify-between items-center mb-4">
                <span className={cn(
                  "text-xs font-bold px-3 py-1 rounded-full",
                  guide.category === "Petty Cash" ? "bg-[#EBF3FE] text-[#2F80ED]" :
                  guide.category === "Bill Payment" ? "bg-[#FFFBF0] text-[#DCA11D]" : "bg-[#E6FAF7] text-[#00CBB0]"
                )}>
                  {guide.category}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={14} className="text-gray-400" />  {guide.duration}
                  </span>
                  {isActive && (
                    <button
                      onClick={() => setActiveGuideId(null)}
                      className="w-7 h-7 bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-full flex items-center justify-center transition-all duration-150 text-[11px] font-bold shadow-xs"
                      aria-label="Close video view"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>


              <h3 className="text-[#113B4A] text-lg font-extrabold leading-snug mb-1">
                {guide.title.includes('Xero') ? (
                  <>
                    {guide.title.substring(0, guide.title.indexOf('Xero')).trim()}
                    {' '}
                    <span style={{ color: '#266DD3' }}>Xero</span>
                    {guide.title.substring(guide.title.indexOf('Xero') + 4).trimStart()}
                  </>
                ) : (
                  guide.title
                )}
              </h3>
              {/* Guides without a subtitle skip the <p> entirely, so an empty
                  string doesn't leave a blank line above the thumbnail. */}
              {guide.description && (
                <p className="text-gray-400 text-xs italic mb-6">
                  {guide.description}
                </p>
              )}

              {/* Shared player — the section owns which guide is open so only
                  one plays at a time; the card handles its own close + scroll. */}
              <VideoPlayer
                videoUrl={guide.videoUrl}
                title={guide.title}
                thumbnail={guide.videoThumbnail}
                isPlaying={isActive && Boolean(guide.videoUrl)}
                onPlayingChange={(playing) => setActiveGuideId(playing ? guide.id : null)}
                collapsedWidth="max-w-none"
                posterAspect="aspect-[1.85/1]"
                showClose={false}
                scrollOnPlay={false}
                posterOverlay={
                  guide.badge ? (
                    <span
                      className={cn(
                        'absolute top-3 right-3 z-10 text-[11px] font-bold text-white px-2.5 py-1 rounded-sm uppercase tracking-wider',
                        guide.badge === 'Petty Cash'
                          ? 'bg-[#10485E]'
                          : guide.badge === 'Bill Payment'
                            ? 'bg-[#0B5A75]'
                            : 'bg-[#113B4A]'
                      )}
                    >
                      {guide.badge}
                    </span>
                  ) : null
                }
              />

            </div>
            );
          })}
        </div>

      </Container>
    </section>

    {/* Optional full-width band that follows a group — e.g. Xero Integration. */}
    {group.callout && (
      <section className="bg-white py-8 md:py-16">
        <Container className="max-w-[1440px] px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* w-fit sizes this column to its widest sizing child — the h2.
                The description is taken out of that calculation with w-0 +
                min-w-full (it still renders full width, it just doesn't widen
                the box), so the button's w-full lands exactly on the title's
                width rather than on the longer description's. */}
            <div className="min-w-0">
              {/* Desktop: w-fit sizes this box to the h2, the description is
                  pulled out of that calculation with w-0 so it can sit on one
                  line, and the button's w-full lands on the title's width.
                  Mobile: full width, description wraps, button sizes to itself. */}
              <div className="w-full md:w-fit">
                <h2 className="text-[#113B4A] text-[24px] md:text-[28px] font-extrabold tracking-tight mb-2">
                  {group.callout.title}
                </h2>
                <p className="text-gray-500 text-sm md:text-base mb-6 md:w-0 md:min-w-full md:whitespace-nowrap">
                  {group.callout.description}
                </p>
                {/* Lift + shadow on hover, dip on press, arrow slides right —
                    so the click has feedback before the page changes. */}
                <Link
                  href={group.callout.buttonHref}
                  className="group inline-flex w-auto md:w-full items-center justify-center gap-2 bg-[#113B4A] hover:bg-[#1a5569] text-white font-bold px-6 py-3 rounded-full text-[13px] no-underline transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(17,59,74,0.22)] active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  {group.callout.buttonText}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transform-none"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
            <div className="min-w-0 flex items-center justify-center">
              <Image
                src={group.callout.image}
                alt={group.callout.imageAlt}
                width={506}
                height={308}
                sizes="(min-width: 768px) 420px, 100vw"
                quality={100}
                className="w-full max-w-[420px] h-auto object-contain"
              />
            </div>
          </div>
        </Container>
      </section>
    )}
    </div>
    ))}
    </div>
    </FadeContent>
  );
}
