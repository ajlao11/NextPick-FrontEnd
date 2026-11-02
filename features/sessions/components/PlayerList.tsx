'use client';

import { useState } from 'react';
import { SessionPlayer } from '../types/session.types';

interface PlayerListProps {
  players: SessionPlayer[];
  onCheckIn: (playerId: string) => Promise<unknown>;
  onRemove: (playerId: string) => Promise<unknown>;
  onQueueChange: () => Promise<void>;
}

export function PlayerList({
  players,
  onCheckIn,
  onRemove,
  onQueueChange,
}: PlayerListProps) {

  const [updatingPlayerId, setUpdatingPlayerId] =
    useState<string | null>(null);

  const handleCheckIn = async (playerId: string) => {
    if (updatingPlayerId) return;

    setUpdatingPlayerId(playerId);

    try {
      await onCheckIn(playerId);
      await onQueueChange();
    } catch (error) {
      console.error('Failed to update check-in:', error);
    } finally {
      setUpdatingPlayerId(null);
    }
  };

  if (players.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 px-6 py-12 text-center">
        <p className="font-bold">
          No players yet
        </p>

        <p className="mt-1 text-sm text-[#6B7280]">
          Add players to start building your session.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10">
      {players.map((sessionPlayer) => (
        <div
          key={sessionPlayer.id}
          className="flex items-center justify-between gap-4 border-b border-black/5 px-5 py-4 last:border-b-0"
        >
          <div>
            <p className="font-bold">
              {sessionPlayer.player?.name ?? 'Unknown Player'}
            </p>

            {sessionPlayer.skillRating !== null && (
              <p className="mt-1 text-sm text-[#6B7280]">
                Skill {sessionPlayer.skillRating}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCheckIn(sessionPlayer.playerId)}
              disabled={updatingPlayerId !== null}
              className={`rounded-lg px-3 py-2 text-xs font-bold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${sessionPlayer.checkedIn
                  ? 'bg-[#0ac217]/15 text-[#0ac217]'
                  : 'bg-[#FFC400]/15 text-[#6B7280]'
                }`}
            >
              {updatingPlayerId === sessionPlayer.playerId
                ? 'Updating...'
                : sessionPlayer.checkedIn
                  ? '✓ Checked in'
                  : 'Check in'}
            </button>

            <button
              type="button"
              onClick={() =>
                onRemove(
                  sessionPlayer.playerId,
                )
              }
              className="rounded-lg px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}