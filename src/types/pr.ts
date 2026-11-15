import type { Contributor } from './contributor';

export type PRStatus = 'open' | 'merged' | 'closed' | 'draft' | 'review';

export interface PR {
  id: string;
  title: string;
  author: Contributor;
  repository: string;
  branch: string;
  baseBranch: string;
  status: PRStatus;
  reviewers: Contributor[];
  createdAt: string;
  updatedAt: string;
  mergedAt: string | null;
  cycleTimeHrs: number | null;
  commentCount: number;
  linesAdded: number;
  linesRemoved: number;
  labels: string[];
}
