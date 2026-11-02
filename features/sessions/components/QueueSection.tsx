
'use client';

import { QueuePlayer } from '../types/session.types';

interface QueueSectionProps {
  queue: QueuePlayer[];
  loading: boolean;
  error: string | null;
  playersPerMatch?: number;
}

export function QueueSection({
  queue,
  loading,
  error,
  playersPerMatch = 4,
}: QueueSectionProps) {

  // Backend already returns the correct priority order.
  const entries = queue.filter(
    (entry) => entry.status === 'WAITING',
  );

  const upNextCount =
    entries.length >= playersPerMatch
      ? playersPerMatch
      : 0;

  return (
    <section className="rounded-[22px] border border-black/[0.06] bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-black tracking-wide text-[#6B7280]">
          WAITING QUEUE
        </h2>

        <span className="font-black text-[#FFC400]">
          {entries.length} players
        </span>
      </div>

      {upNextCount > 0 && !loading && (
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Next {playersPerMatch} players preparing for a game
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-4 space-y-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-10 animate-pulse rounded-xl bg-black/5"
            />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="mt-4 rounded-xl bg-[#F7F7F7] px-4 py-8 text-center text-sm text-[#6B7280]">
          No players waiting.
        </div>
      ) : (
        <div className="mt-4 max-h-[300px] space-y-2 overflow-y-auto pr-1">
          {entries.map((entry, index) => {
            const isUpNext = index < upNextCount;

            return (
              <div
                key={entry.id}
                className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
                  isUpNext
                    ? 'border-green-300 bg-green-50'
                    : 'border-transparent bg-[#F7F7F7]'
                }`}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`w-10 shrink-0 text-xs font-bold ${
                      isUpNext
                        ? 'text-green-700'
                        : 'text-[#9CA3AF]'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span
                    className={`truncate text-sm font-black ${
                      isUpNext
                        ? 'text-green-900'
                        : 'text-gray-900'
                    }`}
                  >
                    {entry.sessionPlayer?.player?.name ??
                      'Unknown player'}
                  </span>
                </div>

                {isUpNext && (
                  <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-green-700">
                    Up Next
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
