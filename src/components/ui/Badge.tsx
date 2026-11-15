import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeColor = 'green' | 'yellow' | 'red' | 'blue' | 'zinc' | 'orange';

interface BadgeProps {
  color: BadgeColor;
  label: string;
  className?: string;
}

const colorMap: Record<BadgeColor, string> = {
  green:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  yellow: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  red:    'bg-rose-500/10 text-rose-400 border-rose-500/20',
  blue:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
  zinc:   'bg-zinc-800 text-zinc-400 border-zinc-700',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

const dotMap: Record<BadgeColor, string> = {
  green:  'bg-emerald-400',
  yellow: 'bg-amber-400',
  red:    'bg-rose-400',
  blue:   'bg-blue-400',
  zinc:   'bg-zinc-500',
  orange: 'bg-orange-400',
};

export function Badge({ color, label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium',
        colorMap[color],
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dotMap[color])} />
      {label}
    </span>
  );
}
