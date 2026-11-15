'use client';

import { useState, useMemo } from 'react';
import { Download } from 'lucide-react';
import { mockThroughputData, mockCycleTimeData } from '@/data/mock';
import { DateRangePicker, type DateRange } from '@/components/analytics/DateRangePicker';
import { ThroughputChart } from '@/components/analytics/ThroughputChart';
import { CycleTimeHistogram } from '@/components/analytics/CycleTimeHistogram';
import { Button } from '@/components/ui/Button';

const rangeMap: Record<DateRange, number> = { '7d': 7, '30d': 30, '90d': 90 };

export default function AnalyticsPage() {
  const [range, setRange] = useState<DateRange>('30d');
  const [toastVisible, setToastVisible] = useState(false);

  const filteredThroughput = useMemo(() => {
    return mockThroughputData.slice(-rangeMap[range]);
  }, [range]);

  const handleExport = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-50">Analytics & Insights</h1>
          <p className="text-sm text-zinc-400">PR throughput rates, cycle time distributions, and velocity trends</p>
        </div>
        <div className="flex items-center gap-3">
          <DateRangePicker value={range} onChange={setRange} />
          <Button
            variant="secondary"
            size="sm"
            icon={<Download size={13} />}
            onClick={handleExport}
          >
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ThroughputChart data={filteredThroughput} />
        <CycleTimeHistogram data={mockCycleTimeData} />
      </div>

      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 shadow-2xl">
          Export coming soon — data is ready when the API ships.
        </div>
      )}
    </div>
  );
}
