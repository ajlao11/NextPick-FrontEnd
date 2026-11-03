
'use client';

import { useEffect, useState } from 'react';
import { QueuePlayer } from '../types/session.types';
import { Trophy } from 'lucide-react';

interface QueueSectionProps {
  queue: QueuePlayer[];
  loading: boolean;
  error: string | null;
  playersPerMatch?: number;
}

function formatWaitingTime(
  waitingSince: string,
  now: number,
): string {
  const startedAt = new Date(waitingSince).getTime();

  if (!Number.isFinite(startedAt)) {
    return '--';
  }

  const totalSeconds = Math.max(
    0,
    Math.floor((now - startedAt) / 1000),
  );

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
}

export function QueueSection({
  queue,
  loading,
  error,
  playersPerMatch = 4,
}: QueueSectionProps) {
  const [now, setNow] = useState<number | null>(null);

  // Update all waiting timers every second.
  useEffect(() => {
    setNow(Date.now());

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Preserve backend priority order.
  const entries = queue.filter(
    (entry) => entry.status === 'WAITING',
  );

  const upNextCount =
    entries.length >= playersPerMatch
      ? playersPerMatch
      : 0;

  return (
    <section className="rounded-[22px] border border-black/[0.06] bg-white p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-black tracking-wide text-[#6B7280]">
          WAITING QUEUE
        </h2>

        <span className="font-black text-[#FFC400]">
          {entries.length} players
        </span>
      </div>

      {/* Up Next Description */}
      {upNextCount > 0 && !loading && (
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Next {playersPerMatch} players preparing for a game
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="mt-4 space-y-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-14 animate-pulse rounded-xl bg-black/5"
            />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="mt-4 rounded-xl bg-[#F7F7F7] px-4 py-8 text-center text-sm text-[#6B7280]">
          No players waiting.
        </div>
      ) : (
        <div className="mt-4 max-h-[350px] space-y-2 overflow-y-auto pr-1">
          {entries.map((entry, index) => {
            const isUpNext = index < upNextCount;

            return (
              <div
                key={entry.id}
                className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-3 transition-colors ${
                  isUpNext
                    ? 'border-green-300 bg-green-50'
                    : 'border-transparent bg-[#F7F7F7]'
                }`}
              >
                {/* Position + Player */}
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <span
                    className={`w-8 shrink-0 text-xs font-bold ${
                      isUpNext
                        ? 'text-green-700'
                        : 'text-[#9CA3AF]'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0">
                    <p
                      className={`truncate text-sm font-black ${
                        isUpNext
                          ? 'text-green-900'
                          : 'text-gray-900'
                      }`}
                    >
                      {entry.sessionPlayer?.player?.name ??
                        'Unknown player'}
                    </p>

                    {isUpNext && (
                      <span className="text-[10px] font-bold uppercase tracking-wide text-green-700">
                        Up Next
                      </span>
                    )}
                  </div>
                </div>

                {/* Games + Waiting Time */}
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280]">
                    <span aria-hidden="true"><Trophy size={12}/></span>
                    <span>
                      {entry.gamesPlayed}{' '}
                      {entry.gamesPlayed === 1
                        ? 'game'
                        : 'games'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                    <span aria-hidden="true">⏱</span>
                    <span className="tabular-nums">
                      {now === null
                        ? '--'
                        : formatWaitingTime(
                            entry.waitingSince,
                            now,
                          )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
