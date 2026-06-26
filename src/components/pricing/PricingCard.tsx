import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { PricingPlan } from '@/config/pricing';

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      className="flex-none mt-[3px] text-teal-deep">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article
      data-plan={plan.key}
      className={cn(
        'relative bg-white rounded-[18px] border border-ink/10 p-9 shadow-minty-sm flex flex-col',
        'transition-all duration-200 hover:-translate-y-[3px] hover:shadow-minty-md',
        plan.isPopular && 'bg-[#f4f6fc] border-brand-deep/[0.18] shadow-minty-md -translate-y-1.5',
        plan.isPopular && 'hover:bg-teal-gradient hover:border-teal/40 hover:shadow-[0_12px_32px_rgba(0,203,198,.28)]',
        !plan.isPopular && 'hover:bg-[#f4f6fc] hover:border-brand-deep/[0.18]'
      )}
    >
      <div className="w-full aspect-[16/11] rounded-[14px] bg-[#f4f6fc] border border-ink/[0.08] flex items-center justify-center overflow-hidden mb-5">
        <Image
          src={plan.thumbSrc}
          alt={`${plan.name} module`}
          width={300}
          height={206}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="min-h-[75px] flex flex-wrap items-center gap-2.5">
        <span className="text-[28px] font-extrabold text-brand-deep tracking-tight">{plan.name}</span>
        {plan.popularTag && (
          <span className="inline-block bg-[#d6dcf6] text-brand-deep text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full">
            {plan.popularTag}
          </span>
        )}
      </div>
      <p className="text-ink-soft text-sm leading-[1.45] mt-2 min-h-[81px]">{plan.tagline}</p>
      <div className="mt-[22px] min-h-[130px] flex flex-col">
        <span className="text-[56px] font-extrabold text-brand-deep tracking-[-0.03em] leading-none inline-flex items-baseline gap-1">
          <span className="line-through decoration-[#e0413a] decoration-2 text-ink-muted">
            <span className="text-[22px] font-bold -translate-y-0.5">{plan.strikePrice.currency}</span>
            {plan.strikePrice.amount}
            <span className="text-base font-semibold text-ink-muted ml-1 self-center">{plan.strikePrice.unit}</span>
          </span>
          <span className="text-[30px] text-teal-deep font-extrabold ml-2 self-center">Free</span>
        </span>
        <p className="text-xs text-ink-muted leading-normal mt-2 whitespace-pre-line min-h-[32px]">{plan.meta}</p>
        <p className="text-[12.5px] text-ink-muted mt-2">{plan.trialNote}</p>
      </div>
      <Link
        href={plan.cta.href}
        className={cn(
          'mt-[22px] w-full text-center rounded-[12px] py-3.5 font-bold text-sm no-underline block transition-all duration-150',
          plan.isPopular
            ? 'bg-brand-deep text-white hover:bg-teal-gradient'
            : 'bg-[#eceff7] text-brand-deep hover:bg-brand-deep hover:text-white hover:-translate-y-px'
        )}
      >
        {plan.cta.label}
      </Link>
      <div className="mt-7 text-sm font-bold text-ink">{plan.featuresHeading}</div>
      <ul className="list-none p-0 mt-3.5 flex flex-col gap-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
            <CheckIcon />{f}
          </li>
        ))}
      </ul>
    </article>
  );
}