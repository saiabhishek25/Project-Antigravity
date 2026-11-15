import { mockKpis, mockPRs, mockVelocityData } from '@/data/mock';
import { KpiStrip } from '@/components/dashboard/KpiStrip';
import { VelocitySparkline } from '@/components/dashboard/VelocitySparkline';
import { PrFeedCard } from '@/components/dashboard/PrFeedCard';
import { RecentPrTable } from '@/components/dashboard/RecentPrTable';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-50">Engineering Dashboard</h1>
        <p className="text-sm text-zinc-400">Velocity, PR throughput, and team bottlenecks at a glance</p>
      </div>

      <KpiStrip kpis={mockKpis} />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <VelocitySparkline data={mockVelocityData} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <PrFeedCard prs={mockPRs} />
        </div>
      </div>

      <RecentPrTable prs={mockPRs} />
    </div>
  );
}
