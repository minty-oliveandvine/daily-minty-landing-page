'use client';

import Image from 'next/image';
import { landingContent } from '@/config/landing';
import { siteConfig } from '@/config/site';
import FadeContent from '@/animations/landing/fadeanim';

export default function KeepMeUpdatedSection() {
  const { keepMeUpdated } = landingContent;

  return (
    <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
    {/* No bottom padding by design — the mascot flies out flush against the
        footer edge, which is what sells the "in the sky" framing. */}
    <section
      id="waitlist"
      className="relative overflow-hidden bg-cover bg-center pt-12 md:pt-20 text-white"
      style={{ backgroundImage: `url('${keepMeUpdated.backgroundImage}')` }}
    >
      <div className="mx-auto grid w-full max-w-[1140px] grid-cols-1 items-center gap-10 px-7 lg:min-h-[520px] lg:grid-cols-2">
        {/* Frosted glass card */}
        <div className="mx-auto w-full max-w-[440px] rounded-[28px] border border-white/45 bg-white/20 px-7 py-14 text-center shadow-[0_24px_60px_rgba(15,45,58,0.16),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-[18px] backdrop-saturate-[1.1] sm:px-14">
          <h2 className="text-[clamp(44px,5vw,68px)] font-extrabold leading-[1.02] tracking-[-0.025em] text-ink">
            <span className="mb-2.5 block text-[clamp(20px,1.8vw,26px)] font-medium italic tracking-normal text-ink/70">
              {keepMeUpdated.eyebrow}
            </span>
            {keepMeUpdated.title}
          </h2>

          <a
            href={siteConfig.waitlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-3.5 rounded-full bg-teal-gradient px-9 py-4 text-xl font-bold tracking-[-0.01em] text-white shadow-[0_12px_28px_rgba(0,203,198,0.42),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all hover:bg-teal-gradient-hover hover:shadow-[0_16px_36px_rgba(0,203,198,0.52),inset_0_1px_0_rgba(255,255,255,0.5)]"
          >
            {keepMeUpdated.buttonText}
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/20 transition-all group-hover:translate-x-1 group-hover:bg-white/30">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
        </div>

        {/* Floating mascot */}
        <div className="waitlist-float ml-auto flex w-full items-center justify-end lg:max-w-[620px]">
          <Image
            src={keepMeUpdated.mascotImage}
            alt={keepMeUpdated.mascotAlt}
            width={2372}
            height={1778}
            sizes="(min-width: 1024px) 620px, 100vw"
            quality={100}
            className="block h-auto w-full"
          />
        </div>
      </div>
    </section>
    </FadeContent>
  );
}
