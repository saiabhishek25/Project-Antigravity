'use client';

import { GitMerge, Eye, Clock, Users } from 'lucide-react';
import { type Contributor } from '@/types';
import { Drawer } from '@/components/ui/Drawer';
import { getInitials } from '@/lib/utils';

interface MemberDrawerProps {
  open: boolean;
  onClose: () => void;
  contributor: Contributor | null;
}

export function MemberDrawer({ open, onClose, contributor: c }: MemberDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} title="Contributor Details">
      {c && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/20 text-xl font-bold text-blue-400">
              {getInitials(c.name)}
            </div>
            <div>
              <p className="text-base font-semibold text-zinc-50">{c.name}</p>
              <p className="font-mono text-sm text-zinc-500">@{c.handle}</p>
              <p className="text-xs text-zinc-400 mt-0.5 capitalize">{c.role.replace('-', ' ')} · Team {c.team}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-zinc-800/60 p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                <GitMerge size={14} />
                <span className="text-xl font-bold">{c.prsmergedThisSprint}</span>
              </div>
              <p className="text-xs text-zinc-400">PRs merged</p>
            </div>
            <div className="rounded-xl bg-zinc-800/60 p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
                <Eye size={14} />
                <span className="text-xl font-bold">{c.reviewDebtCount}</span>
              </div>
              <p className="text-xs text-zinc-400">Reviews pending</p>
            </div>
            <div className="rounded-xl bg-zinc-800/60 p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-sky-400 mb-1">
                <Clock size={14} />
                <span className="text-xl font-bold">{c.avgCycleTimeHrs}h</span>
              </div>
              <p className="text-xs text-zinc-400">Avg cycle time</p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Team Assignment</p>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-zinc-500" />
              <span className="text-sm text-zinc-200 capitalize">Team {c.team}</span>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
