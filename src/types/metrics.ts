export interface KpiSnapshot {
  prsmergedThisWeek: number;
  prsmergedDelta: number;       // % change vs last week
  avgCycleTimeHrs: number;
  cycleTimeDelta: number;
  openPRsCount: number;
  openPRsDelta: number;
  reviewLagHrs: number;
  reviewLagDelta: number;
}

export interface VelocityPoint {
  week: string;         // e.g. "W42"
  merged: number;
  opened: number;
  team: string;
}

export interface CyclePoint {
  bucket: string;       // e.g. "0-4h", "4-8h", "8-24h", "1-2d", "2-5d", "5d+"
  count: number;
}

export interface ThroughputPoint {
  date: string;         // ISO date string
  merged: number;
  opened: number;
  closed: number;
}
