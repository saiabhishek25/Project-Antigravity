'use client';

import { useState } from 'react';
import { GitPullRequest } from 'lucide-react';
import { type PR } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { SlideOver } from '@/components/ui/SlideOver';
import { formatRelative } from '@/lib/utils';

interface PrFeedCardProps {
  prs: PR[];
}

const statusColorMap = {
  open:   'blue',
  merged: 'green',
  closed: 'zinc',
  review: 'yellow',
  draft:  'zinc',
} as const;

export function PrFeedCard({ prs }: PrFeedCardProps) {
  const [selectedPr, setSelectedPr] = useState<PR | null>(null);

  const sorted = [...prs]
    .filter((pr) => pr.status === 'open' || pr.status === 'review' || pr.status === 'draft')
    .sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
    .slice(0, 10);

  return (
    <>
      <Card className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Open PRs (Action Needed)</p>
        <div className="space-y-1">
          {sorted.map((pr) => (
            <button
              key={pr.id}
              onClick={() => setSelectedPr(pr)}
              className="w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="flex items-start gap-2">
                <GitPullRequest size={13} className="mt-0.5 shrink-0 text-zinc-500" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-zinc-200">{pr.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge color={statusColorMap[pr.status]} label={pr.status} className="text-[10px]" />
                    <span className="text-[10px] text-zinc-500">{formatRelative(pr.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>
      <SlideOver open={!!selectedPr} onClose={() => setSelectedPr(null)} pr={selectedPr} />
    </>
  );
}
