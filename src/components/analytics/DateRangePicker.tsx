'use client';

import { cn } from '@/lib/utils';

export type DateRange = '7d' | '30d' | '90d';

interface DateRangePickerProps {
  value: DateRange;
  onChange: (v: DateRange) => void;
}

const options: { label: string; value: DateRange }[] = [
  { label: '7d',  value: '7d'  },
  { label: '30d', value: '30d' },
  { label: '90d', value: '90d' },
];

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="inline-flex items-center rounded-lg border border-zinc-800 bg-zinc-900 p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
            value === opt.value
              ? 'bg-blue-600 text-white'
              : 'text-zinc-400 hover:text-zinc-200'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
