export type ContributorRole = 'engineer' | 'senior-engineer' | 'tech-lead' | 'manager';

export interface Contributor {
  id: string;
  name: string;
  handle: string;
  role: ContributorRole;
  avatarUrl: string | null;
  team: string;
  prsmergedThisSprint: number;
  reviewDebtCount: number;
  avgCycleTimeHrs: number;
}
