'use client';

import { GitMerge, Eye, Clock } from 'lucide-react';
import { type Contributor } from '@/types';
import { Card } from '@/components/ui/Card';
import { getInitials, cn } from '@/lib/utils';

interface ContributorCardProps {
  contributor: Contributor;
  onClick: () => void;
}

const roleColorMap: Record<string, string> = {
  'engineer':        'text-zinc-400',
  'senior-engineer': 'text-blue-400',
  'tech-lead':       'text-indigo-400',
  'manager':         'text-purple-400',
};

const roleLabel: Record<string, string> = {
  'engineer':        'Engineer',
  'senior-engineer': 'Sr. Engineer',
  'tech-lead':       'Tech Lead',
  'manager':         'Manager',
};

export function ContributorCard({ contributor: c, onClick }: ContributorCardProps) {
  return (
    <button onClick={onClick} className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl">
      <Card className="transition-colors hover:border-zinc-700 hover:bg-zinc-800/60 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-400">
            {getInitials(c.name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-100 truncate">{c.name}</p>
            <p className="font-mono text-xs text-zinc-500">@{c.handle}</p>
            <p className={cn('text-xs font-medium mt-0.5', roleColorMap[c.role])}>
              {roleLabel[c.role]}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-emerald-400">
              <GitMerge size={11} />
              <span className="text-sm font-bold">{c.prsmergedThisSprint}</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5">merged</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-amber-400">
              <Eye size={11} />
              <span className="text-sm font-bold">{c.reviewDebtCount}</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5">reviews due</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-sky-400">
              <Clock size={11} />
              <span className="text-sm font-bold">{c.avgCycleTimeHrs}h</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5">avg cycle</p>
          </div>
        </div>
      </Card>
    </button>
  );
}
