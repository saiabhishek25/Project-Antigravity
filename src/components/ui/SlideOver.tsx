'use client';

import { useEffect } from 'react';
import { X, GitBranch, Clock, MessageSquare, Plus, Minus } from 'lucide-react';
import { type PR } from '@/types';
import { Badge } from './Badge';
import { cn, formatDate, formatRelative } from '@/lib/utils';

interface SlideOverProps {
  open: boolean;
  onClose: () => void;
  pr: PR | null;
}

const statusColorMap: Record<string, 'green' | 'blue' | 'zinc' | 'yellow' | 'red'> = {
  open:   'blue',
  merged: 'green',
  closed: 'zinc',
  review: 'yellow',
  draft:  'zinc',
};

export function SlideOver({ open, onClose, pr }: SlideOverProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full max-w-lg bg-zinc-900 border-l border-zinc-800 shadow-2xl transition-transform duration-200',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
      >
        {pr && (
          <>
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <div className="flex items-center gap-2">
                <Badge color={statusColorMap[pr.status] ?? 'zinc'} label={pr.status} />
                <span className="font-mono text-xs text-zinc-500">#{pr.id.replace('pr-', '')}</span>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <div className="overflow-y-auto h-[calc(100%-57px)] p-5 space-y-5">
              <h2 className="text-base font-semibold text-zinc-50 leading-snug">{pr.title}</h2>

              <div className="flex flex-wrap gap-1.5">
                {pr.labels.map((l) => (
                  <span key={l} className="rounded-md bg-zinc-800 border border-zinc-700 px-2 py-0.5 text-xs text-zinc-400">
                    {l}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-800/60 rounded-lg p-3">
                  <p className="text-xs text-zinc-500 mb-1">Author</p>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-xs font-semibold text-blue-400">
                      {pr.author.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                    <span className="text-sm text-zinc-200">{pr.author.name}</span>
                  </div>
                </div>
                <div className="bg-zinc-800/60 rounded-lg p-3">
                  <p className="text-xs text-zinc-500 mb-1">Repository</p>
                  <p className="text-sm text-zinc-200 font-mono">{pr.repository}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <GitBranch size={14} className="text-zinc-600" />
                  <span className="font-mono text-xs text-zinc-400">{pr.branch}</span>
                  <span className="text-zinc-600">→</span>
                  <span className="font-mono text-xs text-zinc-500">{pr.baseBranch}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Clock size={14} className="text-zinc-600" />
                  <span>Opened {formatRelative(pr.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <MessageSquare size={14} className="text-zinc-600" />
                  <span>{pr.commentCount} comments</span>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg bg-zinc-800/60 p-3">
                <div className="flex items-center gap-1.5 text-emerald-400 text-sm">
                  <Plus size={14} />
                  <span>{pr.linesAdded.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-400 text-sm">
                  <Minus size={14} />
                  <span>{pr.linesRemoved.toLocaleString()}</span>
                </div>
              </div>

              {pr.reviewers.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-2">Reviewers</p>
                  <div className="space-y-2">
                    {pr.reviewers.map((r) => (
                      <div key={r.id} className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold text-zinc-300">
                          {r.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                        </span>
                        <div>
                          <p className="text-sm text-zinc-200">{r.name}</p>
                          <p className="font-mono text-xs text-zinc-500">@{r.handle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pr.mergedAt && (
                <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                  <p className="text-xs text-emerald-400">
                    Merged {formatDate(pr.mergedAt)} · Cycle time: {pr.cycleTimeHrs?.toFixed(1)}h
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
