'use client';

import { useState } from 'react';
import { type PR } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { SlideOver } from '@/components/ui/SlideOver';
import { formatRelative } from '@/lib/utils';

interface RecentPrTableProps {
  prs: PR[];
}

const statusColorMap = {
  open:   'blue',
  merged: 'green',
  closed: 'zinc',
  review: 'yellow',
  draft:  'zinc',
} as const;

export function RecentPrTable({ prs }: RecentPrTableProps) {
  const [selectedPr, setSelectedPr] = useState<PR | null>(null);

  const sorted = [...prs]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 15);

  return (
    <>
      <Card className="overflow-hidden p-0">
        <div className="border-b border-zinc-800 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Recent Pull Requests</p>
        </div>
        <div className="divide-y divide-zinc-800">
          {sorted.map((pr) => (
            <button
              key={pr.id}
              onClick={() => setSelectedPr(pr)}
              className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-zinc-800/60 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-200">{pr.title}</p>
                <p className="mt-0.5 font-mono text-xs text-zinc-500">{pr.repository} · @{pr.author.handle}</p>
              </div>
              <div className="hidden shrink-0 items-center gap-3 sm:flex">
                <Badge color={statusColorMap[pr.status]} label={pr.status} />
                <span className="w-16 text-right text-xs text-zinc-500">{formatRelative(pr.updatedAt)}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>
      <SlideOver open={!!selectedPr} onClose={() => setSelectedPr(null)} pr={selectedPr} />
    </>
  );
}
