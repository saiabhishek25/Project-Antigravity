import { mockContributors } from '@/data/mock';
import { ContributorGrid } from '@/components/team/ContributorGrid';

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-50">Engineering Team</h1>
        <p className="text-sm text-zinc-400">Contributor roster, sprint capacity, and review debt tracking</p>
      </div>
      <ContributorGrid initialContributors={mockContributors} />
    </div>
  );
}
