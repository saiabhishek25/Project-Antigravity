'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { type Contributor, type ContributorRole } from '@/types';

interface AddMemberModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (contributor: Contributor) => void;
}

const roles: { label: string; value: ContributorRole }[] = [
  { label: 'Engineer', value: 'engineer' },
  { label: 'Senior Engineer', value: 'senior-engineer' },
  { label: 'Tech Lead', value: 'tech-lead' },
  { label: 'Manager', value: 'manager' },
];

export function AddMemberModal({ open, onClose, onAdd }: AddMemberModalProps) {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [role, setRole] = useState<ContributorRole>('engineer');
  const [team, setTeam] = useState('');

  const inputClass = 'w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-colors';
  const labelClass = 'block text-xs font-medium text-zinc-400 mb-1';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !handle.trim() || !team.trim()) return;
    onAdd({
      id: `c-${Date.now()}`,
      name: name.trim(),
      handle: handle.trim().replace(/^@/, ''),
      role,
      avatarUrl: null,
      team: team.trim().toLowerCase(),
      prsmergedThisSprint: 0,
      reviewDebtCount: 0,
      avgCycleTimeHrs: 0,
    });
    setName('');
    setHandle('');
    setRole('engineer');
    setTeam('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Team Member">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <input className={inputClass} placeholder="e.g. Alex Johnson" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>GitHub Handle</label>
          <input className={inputClass} placeholder="e.g. ajohnson" value={handle} onChange={(e) => setHandle(e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Role</label>
          <select
            className={inputClass}
            value={role}
            onChange={(e) => setRole(e.target.value as ContributorRole)}
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Team</label>
          <input className={inputClass} placeholder="e.g. alpha, beta, platform" value={team} onChange={(e) => setTeam(e.target.value)} required />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Add Member</Button>
        </div>
      </form>
    </Modal>
  );
}
