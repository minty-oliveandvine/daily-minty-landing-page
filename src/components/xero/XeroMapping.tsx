import { cn } from '@/lib/utils';
import type { MappingRow, MappingTone } from '@/config/xero-integration';

const MINTY_TEAL = '#3FCFC0';

const TONE: Record<MappingTone, { pill: string; hex: string }> = {
  blue:  { pill: 'bg-[#2BA9E0]', hex: '#2BA9E0' },
  red:   { pill: 'bg-[#F0857C]', hex: '#F0857C' },
  green: { pill: 'bg-[#8DC63F]', hex: '#8DC63F' },
};

function Arrow({
  direction,
  tone,
  gradientId,
}: {
  direction: MappingRow['direction'];
  tone: MappingTone;
  gradientId: string;
}) {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 80 12" className="w-full max-w-[80px] h-3" fill="none">
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="6"
            x2="80"
            y2="6"
          >
            <stop offset="0%" stopColor={MINTY_TEAL} />
            <stop offset="100%" stopColor={TONE[tone].hex} />
          </linearGradient>
        </defs>
        <g stroke={`url(#${gradientId})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="6" x2="78" y2="6" />
          {direction === 'right' ? (
            <polyline points="72,2 78,6 72,10" />
          ) : (
            <polyline points="8,2 2,6 8,10" />
          )}
        </g>
      </svg>
    </div>
  );
}

export default function XeroMapping({
  leftLabel,
  rightLabel,
  rows,
}: {
  leftLabel: string;
  rightLabel: string;
  rows: MappingRow[];
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr_auto_1fr] md:grid-cols-[1fr_120px_1fr] gap-2 md:gap-4 items-center mb-5">
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#3FCFC0] text-white text-[11px] font-bold">
            {leftLabel}
          </span>
        </div>
        <div />
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#2BA9E0] text-white text-[11px] font-bold">
            {rightLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {rows.map((row, idx) => {
          const startsNewGroup = idx > 0 && rows[idx - 1].tone !== row.tone;
          return (
            <div
              key={`${row.left}-${row.right}`}
              className={cn(
                'grid grid-cols-[1fr_auto_1fr] md:grid-cols-[1fr_120px_1fr] gap-2 md:gap-4 items-center',
                startsNewGroup && 'mt-4'
              )}
            >
              <span className="rounded-md bg-[#3FCFC0] text-white text-[10px] md:text-[11px] font-semibold leading-tight px-2 md:px-3 py-1.5 md:py-2 text-center">
                {row.left}
              </span>
              <Arrow
                direction={row.direction}
                tone={row.tone}
                gradientId={`xero-arrow-${idx}`}
              />
              <span
                className={cn(
                  'rounded-md text-white text-[10px] md:text-[11px] font-semibold leading-tight px-2 md:px-3 py-1.5 md:py-2 text-center',
                  TONE[row.tone].pill
                )}
              >
                {row.right}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
