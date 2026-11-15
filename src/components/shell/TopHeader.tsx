'use client';

import { usePathname } from 'next/navigation';
import { Search, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { getInitials } from '@/lib/utils';

const breadcrumbMap: Record<string, string> = {
  '/':          'Dashboard',
  '/analytics': 'Analytics',
  '/team':      'Team',
  '/settings':  'Settings',
};

interface TopHeaderProps {
  onMobileMenuToggle?: () => void;
}

export function TopHeader({ onMobileMenuToggle }: TopHeaderProps) {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const pageTitle = breadcrumbMap[pathname] ?? 'DevPulse';

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-zinc-800 bg-zinc-950 px-4">
      {/* Mobile menu */}
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden rounded-md p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label="Open menu"
      >
        <Menu size={16} />
      </button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-zinc-500">DevPulse</span>
        <span className="text-zinc-700">/</span>
        <span className="font-medium text-zinc-200">{pageTitle}</span>
      </div>

      {/* Search */}
      <div className="mx-4 hidden flex-1 md:flex">
        <div className="relative w-full max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input
            type="text"
            placeholder="Search PRs, contributors…"
            className="h-8 w-full rounded-lg border border-zinc-800 bg-zinc-900 pl-8 pr-3 text-xs text-zinc-400 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-colors"
            readOnly
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Avatar */}
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
          {getInitials('Aisha Patel')}
        </div>
      </div>
    </header>
  );
}
