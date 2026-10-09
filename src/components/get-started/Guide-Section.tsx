'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { getStartedContent, parseGuideCode } from '@/config/get-started';
import type { GuideGroup, GuideItem } from '@/config/get-started';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import VideoPlayer from '@/components/get-started/VideoPlayer';
import FadeContent from '@/animations/landing/fadeanim';
import { highlightXero } from '@/components/ui/XeroText';

/** The curriculum modules — every group that actually carries guides. */
const isModule = (group: GuideGroup) => group.items.length > 0;

export default function GuidesSection() {
  const { guideGroups } = getStartedContent;

  // The banner group carries no guides, so it is not a module and must not take a number.
  const modules = guideGroups.filter(isModule);
  const banners = guideGroups.filter((group) => !isModule(group));

  // One open row at a time, keyed on the guide's canonical code.
  const [openCode, setOpenCode] = useState<string | null>(null);

  // Bring the opened row into view and wire Escape to close it. `block: 'nearest'` because the
  // row does not move when it opens — centring it would be gratuitous motion — and it is a
  // no-op when the row is already on screen.
  useEffect(() => {
    if (!openCode) return;
    const row = document.getElementById(`guide-${openCode}`);
    if (!row) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    row.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpenCode(null);
      // Focus would otherwise fall to <body> when the panel unmounts.
      row.querySelector('button')?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openCode]);

  return (
    <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
      <div id="guide" className="font-sans">
        {/* Title-only banners (and any band that follows one) come first, unchanged. */}
        {banners.map((group) => (
          <div key={group.code}>
            <Banner group={group} />
            {group.callout && <Callout callout={group.callout} />}
          </div>
        ))}

        <section className="bg-white py-10 md:py-16">
          <Container className="max-w-[1440px] px-4 md:px-6">
            <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
              <ModuleRail modules={modules} />

              <div className="min-w-0">
                {modules.map((group, index) => (
                  <div key={group.code}>
                    <Module
                      group={group}
                      number={index + 1}
                      openCode={openCode}
                      onToggle={setOpenCode}
                    />
                    {group.callout && <Callout callout={group.callout} inline />}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </div>
    </FadeContent>
  );
}

/** Desktop-only jump list. Plain anchors, so it works with no JavaScript. */
function ModuleRail({ modules }: { modules: GuideGroup[] }) {
  return (
    <nav aria-label="Guide modules" className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted">
        Modules
      </p>
      <ol className="space-y-0.5">
        {modules.map((group, index) => (
          <li key={group.code}>
            <a
              href={`#${group.slug}`}
              className="flex items-baseline gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold leading-snug text-ink-muted no-underline transition-colors hover:bg-mint-soft hover:text-ink-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              <span className="tabular-nums text-teal-deep">{index + 1}</span>
              <span className="min-w-0">{group.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Module({
  group,
  number,
  openCode,
  onToggle,
}: {
  group: GuideGroup;
  number: number;
  openCode: string | null;
  onToggle: (code: string | null) => void;
}) {
  return (
    <section id={group.slug} className="scroll-mt-24 pt-10 first:pt-0 md:pt-14 md:first:pt-0">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted">
        Module {number}
      </p>
      <h2 className="mb-1.5 text-[22px] font-extrabold tracking-tight sm:text-[26px] md:text-[30px]">
        {group.eyebrow ? (
          <>
            <span className="text-ink-deep">{group.eyebrow}</span>{' '}
            <span className="text-teal-deep">{highlightXero(group.title)}</span>
          </>
        ) : (
          <span className="text-ink-deep">{highlightXero(group.title)}</span>
        )}
      </h2>
      {group.subtitle && (
        <p className="mb-4 text-sm text-ink-muted md:mb-6 md:text-base">{group.subtitle}</p>
      )}

      <ul className="border-t border-line">
        {group.items.map((item) => (
          <GuideRow
            key={item.code}
            item={item}
            isOpen={openCode === item.code}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </section>
  );
}

function GuideRow({
  item,
  isOpen,
  onToggle,
}: {
  item: GuideItem;
  isOpen: boolean;
  onToggle: (code: string | null) => void;
}) {
  const { step } = parseGuideCode(item.code);

  // A guide that has not been filmed yet is a plain <div>, never a disabled <button>, so it
  // stays out of the tab order entirely rather than being a focus stop that does nothing.
  if (!item.videoUrl) {
    return (
      <li className="flex min-h-[64px] items-center gap-3 border-b border-line px-2 py-3 md:min-h-[72px] md:gap-4 md:px-3">
        <StepBadge step={step} variant="pending" />
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-bold leading-snug text-ink-muted md:text-[17px]">
            {highlightXero(item.title)}
          </span>
          {item.question && (
            <span className="mt-0.5 block text-[12px] italic text-ink-muted/80 md:text-[13px]">
              {item.question}
            </span>
          )}
        </span>
        <span className="flex-none rounded-full bg-cream px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-soft">
          Coming soon
        </span>
      </li>
    );
  }

  return (
    <li id={`guide-${item.code}`} className="scroll-mt-24 border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`guide-panel-${item.code}`}
          onClick={() => onToggle(isOpen ? null : item.code)}
          className="group flex min-h-[64px] w-full items-center gap-3 border-0 bg-transparent px-2 py-3 text-left font-sans transition-colors hover:bg-mint-soft/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal md:min-h-[72px] md:gap-4 md:px-3"
        >
          <StepBadge step={step} variant={isOpen ? 'open' : 'default'} />
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-extrabold leading-snug text-ink-deep md:text-[17px]">
              {highlightXero(item.title)}
            </span>
            {item.question && (
              <span className="mt-0.5 block text-[12px] italic text-ink-muted md:text-[13px]">
                {item.question}
              </span>
            )}
          </span>
          {item.duration && (
            <span className="hidden flex-none items-center gap-1 text-[12px] font-semibold tabular-nums text-ink-muted sm:flex">
              <Clock size={13} aria-hidden="true" />
              {item.duration}
            </span>
          )}
          <span
            aria-hidden="true"
            className={cn(
              'grid h-10 w-10 flex-none place-items-center rounded-full border text-[13px] transition-colors',
              isOpen
                ? 'border-ink-deep bg-ink-deep text-white'
                : 'border-line text-ink-deep group-hover:border-teal-deep group-hover:text-teal-deep',
            )}
          >
            {isOpen ? '✕' : '▶'}
          </span>
        </button>
      </h3>

      {isOpen && (
        <div
          id={`guide-panel-${item.code}`}
          role="region"
          aria-label={item.title}
          className="px-2 pb-5 md:px-3 md:pb-6"
        >
          {/* Mounted already playing — the row header was the play affordance, so there is no
              poster step and no second click. */}
          <VideoPlayer
            videoUrl={item.videoUrl}
            title={item.title}
            isPlaying
            onPlayingChange={(playing) => {
              if (!playing) onToggle(null);
            }}
            showClose={false}
            scrollOnPlay={false}
            // Caps the playing frame and keeps it flush with the rows rather than centred in
            // the column: at 1440 an uncapped 16/9 frame is over 600px tall.
            className="ml-0 mr-auto max-w-[880px]"
          />
        </div>
      )}
    </li>
  );
}

function StepBadge({ step, variant }: { step: number; variant: 'default' | 'open' | 'pending' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid h-9 w-9 flex-none place-items-center rounded-full text-[13px] font-extrabold tabular-nums transition-colors',
        variant === 'open' && 'bg-teal text-white',
        variant === 'default' &&
          'bg-mint-soft text-teal-deep group-hover:bg-teal-deep group-hover:text-white',
        variant === 'pending' && 'border border-dashed border-line text-ink-muted',
      )}
    >
      {step}
    </span>
  );
}

/** A group with no guides: the same gutters and left edge as the list, without the rows. */
function Banner({ group }: { group: GuideGroup }) {
  return (
    <section className={cn('py-10 md:py-12', group.background)}>
      <Container className="max-w-[1440px] px-4 md:px-6">
        <h2 className="mb-2 text-[22px] font-extrabold tracking-tight sm:text-[26px] md:text-[32px]">
          {group.eyebrow ? (
            <>
              <span className="text-ink-deep">{group.eyebrow}</span>{' '}
              <span className="text-teal-deep">{highlightXero(group.title)}</span>
            </>
          ) : (
            <span className="text-ink-deep">{highlightXero(group.title)}</span>
          )}
        </h2>
        {group.subtitle && (
          <p className="text-sm text-ink-muted md:text-base">{group.subtitle}</p>
        )}
      </Container>
    </section>
  );
}

/** The Xero Integration band. `inline` drops the outer section so it can sit inside the list
 *  column, next to the module rail, rather than spanning the page. */
function Callout({
  callout,
  inline = false,
}: {
  callout: NonNullable<GuideGroup['callout']>;
  inline?: boolean;
}) {
  const body = (
    <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-12">
      {/* w-fit sizes this column to its widest sizing child — the h2. The description is taken
          out of that calculation with w-0 + min-w-full (it still renders full width, it just
          doesn't widen the box), so the button's w-full lands exactly on the title's width
          rather than on the longer description's. */}
      <div className="min-w-0">
        <div className="w-full md:w-fit">
          <h2 className="mb-2 text-[22px] font-extrabold tracking-tight text-ink-deep sm:text-[26px] md:text-[32px]">
            {highlightXero(callout.title)}
          </h2>
          <p className="mb-6 text-sm text-ink-muted md:w-0 md:min-w-full md:whitespace-nowrap md:text-base">
            {highlightXero(callout.description)}
          </p>
          {/* Lift + shadow on hover, dip on press, arrow slides right — so the click has
              feedback before the page changes. */}
          <Link
            href={callout.buttonHref}
            className="group inline-flex w-auto items-center justify-center gap-2 rounded-full bg-ink-deep px-6 py-3 text-[13px] font-bold text-white no-underline transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1a5569] hover:shadow-[0_10px_24px_rgba(17,59,74,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none md:w-full"
          >
            {callout.buttonText}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transform-none"
            >
              →
            </span>
          </Link>
        </div>
      </div>
      <div className="flex min-w-0 items-center justify-center">
        <Image
          src={callout.image}
          alt={callout.imageAlt}
          width={506}
          height={308}
          sizes="(min-width: 768px) 420px, 100vw"
          className="h-auto w-full max-w-[420px] object-contain"
        />
      </div>
    </div>
  );

  if (inline) return <div className="my-8 md:my-12">{body}</div>;

  return (
    <section className="bg-white py-8 md:py-16">
      <Container className="max-w-[1440px] px-4 md:px-6">{body}</Container>
    </section>
  );
}
