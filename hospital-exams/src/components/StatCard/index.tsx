import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  value: number | string;
  icon?: ReactNode;
  to?: string;
  className?: string;
  chips?: { label: string; tone: 'green' | 'red' | 'blue' | 'yellow' }[];
};

export default function StatCard({
  title,
  subtitle,
  value,
  icon,
  to,
  className,
  chips,
}: Props) {
  const Content = (
    <div
      className={cn(
        'rounded-2xl bg-bg-card/80 ring-1 ring-white/10 p-4 md:p-5 hover:ring-white/20 transition',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-white/60">
            {title}
          </div>
          {subtitle && (
            <div className="mt-1 text-xs text-white/50">{subtitle}</div>
          )}
        </div>
        {icon}
      </div>

      <div className="mt-4 text-3xl font-semibold">{value}</div>

      {chips && chips.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <span
              key={i}
              className={cn(
                'rounded-full px-2.5 py-0.5 text-xs ring-1',
                c.tone === 'green' &&
                  'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30',
                c.tone === 'red' &&
                  'bg-rose-500/15 text-rose-300 ring-rose-400/30',
                c.tone === 'blue' &&
                  'bg-sky-500/15 text-sky-300 ring-sky-400/30',
                c.tone === 'yellow' &&
                  'bg-amber-500/15 text-amber-300 ring-amber-400/30'
              )}
            >
              {c.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return to ? <Link to={to}>{Content}</Link> : Content;
}
