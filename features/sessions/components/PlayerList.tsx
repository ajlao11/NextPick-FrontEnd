
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

    const player = players.find(
      (p) => p.playerId === playerId,
    );

    if (player?.queueEntry?.status === 'PLAYING') return;

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

  const handleRemove = async (playerId: string) => {
    if (updatingPlayerId) return;

    const player = players.find(
      (p) => p.playerId === playerId,
    );

    if (player?.queueEntry?.status === 'PLAYING') return;

    setUpdatingPlayerId(playerId);

    try {
      await onRemove(playerId);
      await onQueueChange();
    } catch (error) {
      console.error('Failed to remove player:', error);
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
      {players.map((sessionPlayer) => {
        const isInMatch =
          sessionPlayer.queueEntry?.status === 'PLAYING';

        const isUpdating =
          updatingPlayerId === sessionPlayer.playerId;

        const isDisabled =
          isInMatch || updatingPlayerId !== null;

        return (
          <div
            key={sessionPlayer.id}
            className="flex items-center justify-between gap-4 border-b border-black/5 px-5 py-4 last:border-b-0"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold">
                  {sessionPlayer.player?.name ??
                    'Unknown Player'}
                </p>

                {isInMatch && (
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-amber-700">
                    In Match
                  </span>
                )}
              </div>

              {sessionPlayer.skillRating != null && (
                <p className="mt-1 text-sm text-[#6B7280]">
                  Skill {sessionPlayer.skillRating}
                </p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  handleCheckIn(sessionPlayer.playerId)
                }
                disabled={isDisabled}
                title={
                  isInMatch
                    ? 'Player is assigned to a match'
                    : undefined
                }
                className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-50 ${
                  sessionPlayer.checkedIn
                    ? 'bg-[#0ac217]/15 text-[#0ac217]'
                    : 'bg-[#FFC400]/15 text-[#6B7280]'
                }`}
              >
                {isUpdating
                  ? 'Updating...'
                  : sessionPlayer.checkedIn
                    ? '✓ Checked in'
                    : 'Check in'}
              </button>

              <button
                type="button"
                onClick={() =>
                  handleRemove(sessionPlayer.playerId)
                }
                disabled={isDisabled}
                title={
                  isInMatch
                    ? 'Remove player from their match first'
                    : undefined
                }
                className="cursor-pointer rounded-lg px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
              >
                {isUpdating ? 'Please wait...' : 'Remove'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
