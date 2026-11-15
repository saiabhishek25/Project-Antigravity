import { TrendingUp, TrendingDown, GitMerge, Clock, GitPullRequest, Eye } from 'lucide-react';
import { type KpiSnapshot } from '@/types';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface KpiStripProps {
  kpis: KpiSnapshot;
}

interface KpiCardData {
  label: string;
  value: string;
  delta: number;
  icon: React.ElementType;
  unit?: string;
}

function KpiCard({ label, value, delta, icon: Icon }: KpiCardData) {
  const isPositive = delta >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColor = isPositive ? 'text-emerald-400' : 'text-rose-400';
  const trendBg = isPositive ? 'bg-emerald-500/10' : 'bg-rose-500/10';

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</span>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800">
          <Icon size={14} className="text-zinc-400" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold tracking-tight text-zinc-50">{value}</span>
        <span className={cn('flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium', trendBg, trendColor)}>
          <TrendIcon size={11} />
          {Math.abs(delta).toFixed(1)}%
        </span>
      </div>
    </Card>
  );
}

export function KpiStrip({ kpis }: KpiStripProps) {
  const cards: KpiCardData[] = [
    {
      label: 'PRs Merged',
      value: String(kpis.prsmergedThisWeek),
      delta: kpis.prsmergedDelta,
      icon: GitMerge,
    },
    {
      label: 'Avg Cycle Time',
      value: `${kpis.avgCycleTimeHrs}h`,
      delta: -kpis.cycleTimeDelta,
      icon: Clock,
    },
    {
      label: 'Open PRs',
      value: String(kpis.openPRsCount),
      delta: -kpis.openPRsDelta,
      icon: GitPullRequest,
    },
    {
      label: 'Review Lag',
      value: `${kpis.reviewLagHrs}h`,
      delta: -kpis.reviewLagDelta,
      icon: Eye,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <KpiCard key={card.label} {...card} />
      ))}
    </div>
  );
}
