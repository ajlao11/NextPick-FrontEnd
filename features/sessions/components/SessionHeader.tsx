interface SessionHeaderProps {
  session: {
    name: string;
    courtCount: number;
    maxPlayers: number | null;
    startTime: string | null;
    status: string;
  };
}

export function SessionHeader({
  session,
}: SessionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
          {session.name}
        </h1>

        <p className="mt-1.5 text-base text-[#6B7280]">
          {session.courtCount} courts
          {' · '}
          {session.maxPlayers ?? 0} players
          {session.startTime &&
            ` · ${session.startTime}`}
        </p>
      </div>

      <div className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#FFF3C7] px-4 py-2 text-sm font-black">
        <span className="h-2 w-2 rounded-full bg-[#111111]" />

        {session.status}
      </div>
    </div>
  );
}