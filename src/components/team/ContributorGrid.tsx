'use client';

import { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { type Contributor } from '@/types';
import { ContributorCard } from './ContributorCard';
import { MemberDrawer } from './MemberDrawer';
import { AddMemberModal } from './AddMemberModal';
import { Button } from '@/components/ui/Button';

interface ContributorGridProps {
  initialContributors: Contributor[];
}

export function ContributorGrid({ initialContributors }: ContributorGridProps) {
  const [contributors, setContributors] = useState<Contributor[]>(initialContributors);
  const [selected, setSelected] = useState<Contributor | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {contributors.length} Team Members
        </p>
        <Button
          variant="primary"
          size="sm"
          icon={<Plus size={13} />}
          onClick={() => setAddOpen(true)}
        >
          Add Member
        </Button>
      </div>

      {contributors.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 py-20 text-center">
          <Users size={32} className="text-zinc-700 mb-3" />
          <p className="text-sm font-medium text-zinc-400">No team members yet</p>
          <p className="text-xs text-zinc-600 mt-1">Add your first contributor to get started</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {contributors.map((c) => (
            <ContributorCard key={c.id} contributor={c} onClick={() => setSelected(c)} />
          ))}
        </div>
      )}

      <MemberDrawer open={!!selected} onClose={() => setSelected(null)} contributor={selected} />
      <AddMemberModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={(c) => setContributors((prev) => [...prev, c])}
      />
    </div>
  );
}
