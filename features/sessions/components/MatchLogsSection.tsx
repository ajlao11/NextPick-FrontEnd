'use client';

interface MatchPlayer {
  id: string;
  team: number;
  position: number;
  player: {
    name: string;
  };
}

interface Match {
  id: string;
  round: number;
  status: string;
  team1Score: number | null;
  team2Score: number | null;
  winningTeam: number | null;
  completedAt: string | null;
  court: {
    name: string;
    number: number;
  } | null;
  players: MatchPlayer[];
}

export function MatchLogsSection({
  matches,
  loading,
}: {
  matches: Match[];
  loading: boolean;
}) {
  

  const completedMatches =
    (matches as Match[])
      .filter(
        (match) =>
          match.status ===
          'COMPLETED',
      )
      .sort(
        (a, b) =>
          new Date(
            b.completedAt ?? 0,
          ).getTime() -
          new Date(
            a.completedAt ?? 0,
          ).getTime(),
      );

  return (
    <section className="rounded-[22px] border border-black/[0.06] bg-white">
      <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
        <h2 className="text-base font-black tracking-wide text-[#6B7280]">
          MATCH LOGS
        </h2>

        <button
          type="button"
          className="rounded-xl border border-black/10 px-4 py-2 text-sm font-black transition hover:bg-black/[0.025]"
        >
          View All
        </button>
      </div>

      {loading ? (
        <div className="space-y-2 p-4">
          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="h-12 animate-pulse rounded-xl bg-black/5"
              />
            ),
          )}
        </div>
      ) : completedMatches.length ===
        0 ? (
        <div className="px-5 py-10 text-center text-sm text-[#6B7280]">
          No completed matches yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            {completedMatches
              .slice(0, 8)
              .map((match) => (
                <MatchLogRow
                  key={match.id}
                  match={match}
                />
              ))}
          </div>
        </div>
      )}
    </section>
  );
}

function MatchLogRow({
  match,
}: {
  match: Match;
}) {
  const team1 = match.players
    .filter(
      (player) => player.team === 1,
    )
    .sort(
      (a, b) =>
        a.position - b.position,
    );

  const team2 = match.players
    .filter(
      (player) => player.team === 2,
    )
    .sort(
      (a, b) =>
        a.position - b.position,
    );

  const team1Won =
    match.winningTeam === 1;

  return (
    <div className="grid grid-cols-[80px_90px_1fr_70px_1fr_80px_90px] items-center gap-3 border-b border-black/[0.05] px-5 py-3 last:border-b-0">
      <span className="text-sm font-medium text-[#6B7280]">
        Round {match.round}
      </span>

      <span className="text-sm text-[#6B7280]">
        {match.court?.name ??
          `Court ${match.court?.number ?? ''}`}
      </span>

      <div
        className={
          team1Won
            ? 'rounded-xl bg-[#FFF8DE] px-3 py-2 text-center text-sm font-black'
            : 'rounded-xl bg-[#F7F7F7] px-3 py-2 text-center text-sm font-black'
        }
      >
        {team1
          .map(
            (player) =>
              player.player.name,
          )
          .join(' + ')}
      </div>

      <div className="text-center font-black">
        {match.team1Score} -{' '}
        {match.team2Score}
      </div>

      <div
        className={
          !team1Won
            ? 'rounded-xl bg-[#FFF8DE] px-3 py-2 text-center text-sm font-black'
            : 'rounded-xl bg-[#F7F7F7] px-3 py-2 text-center text-sm font-black'
        }
      >
        {team2
          .map(
            (player) =>
              player.player.name,
          )
          .join(' + ')}
      </div>

      <span className="text-right text-sm text-[#6B7280]">
        {match.completedAt
          ? new Date(
              match.completedAt,
            ).toLocaleTimeString(
              [],
              {
                hour: 'numeric',
                minute: '2-digit',
              },
            )
          : '—'}
      </span>

      <span className="justify-self-end rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
        Completed
      </span>
    </div>
  );
}