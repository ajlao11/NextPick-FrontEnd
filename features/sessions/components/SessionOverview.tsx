import { Session } from '../types/session.types';

interface SessionOverviewProps {
  session: Session;
}

export function SessionOverview({
  session,
}: SessionOverviewProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <OverviewCard
        label="Courts"
        value={session.courtCount.toString()}
      />

      <OverviewCard
        label="Players"
        value={`0 / ${session.maxPlayers ?? '∞'}`}
      />

      <OverviewCard
        label="Status"
        value={session.status}
      />
    </div>
  );
}

function OverviewCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <p className="text-sm font-medium text-[#6B7280]">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black tracking-tight">
        {value}
      </p>
    </div>
  );
}