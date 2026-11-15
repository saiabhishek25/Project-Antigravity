'use client';

import { useState } from 'react';
import { KeyRound, Bell, Palette, Eye, EyeOff } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center justify-between cursor-pointer py-1">
      <span className="text-sm text-zinc-300">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
          checked ? 'bg-blue-600' : 'bg-zinc-700'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-4.5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </label>
  );
}

export default function SettingsPage() {
  const { theme, toggle } = useTheme();
  const [tokenVisible, setTokenVisible] = useState(false);
  const [notifPR, setNotifPR] = useState(true);
  const [notifReview, setNotifReview] = useState(true);
  const [notifMerge, setNotifMerge] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-50">Settings</h1>
        <p className="text-sm text-zinc-400">Configure integrations, appearance, and notifications</p>
      </div>

      {/* Integrations */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <KeyRound size={15} className="text-zinc-400" />
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Integrations</p>
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-zinc-400">GitHub Personal Access Token</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={tokenVisible ? 'text' : 'password'}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 pr-10 text-sm text-zinc-300 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setTokenVisible((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none"
                aria-label={tokenVisible ? 'Hide token' : 'Show token'}
              >
                {tokenVisible ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <Button variant="secondary" size="md">Save</Button>
          </div>
          <p className="text-xs text-zinc-500">Required scopes: repo, read:org. (API connection planned for Phase 2).</p>
        </div>
      </Card>

      {/* Appearance */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Palette size={15} className="text-zinc-400" />
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Appearance</p>
        </div>
        <Toggle
          checked={theme === 'dark'}
          onChange={toggle}
          label="Dark mode (default)"
        />
        <Toggle
          checked={false}
          onChange={() => {}}
          label="Compact density (coming soon)"
        />
      </Card>

      {/* Notifications */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Bell size={15} className="text-zinc-400" />
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Notifications</p>
        </div>
        <Toggle checked={notifPR} onChange={() => setNotifPR((v) => !v)} label="New PR opened in my repos" />
        <Toggle checked={notifReview} onChange={() => setNotifReview((v) => !v)} label="Review requested on my PRs" />
        <Toggle checked={notifMerge} onChange={() => setNotifMerge((v) => !v)} label="PR merged notifications" />
      </Card>
    </div>
  );
}
