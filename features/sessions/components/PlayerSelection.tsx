
'use client';

import { useState } from 'react';
import { AddPlayerForm } from './AddPlayerForm';
import { PlayerList } from './PlayerList';
import { usePlayers } from '../hooks/usePlayers';

interface PlayersSectionProps {
  sessionId: string;
  maxPlayers?: number | null;
  onQueueChange: () => Promise<void>;
  onClose: () => void;
}

export function PlayersSection({
  sessionId,
  maxPlayers,
  onQueueChange,
  onClose,
}: PlayersSectionProps) {
  const [showAddPlayer, setShowAddPlayer] = useState(false);

  const {
    players,
    loading,
    error,
    addPlayer,
    toggleCheckIn,
    deletePlayer,
  } = usePlayers(sessionId);

  const checkedInCount = players.filter(
    (player) => player.checkedIn,
  ).length;

  const handleAddPlayer = async (data: {
    name: string;
    skillRating?: number;
  }) => {
    await addPlayer(data);
    setShowAddPlayer(false);
  };

  return (
    <section>
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="mt-1 text-sm text-[#6B7280]">
            {players.length}
            {maxPlayers ? ` / ${maxPlayers}` : ''} registered
            {' · '}
            {checkedInCount} checked in
          </p>
        </div>

        {!showAddPlayer && (
          <button
            type="button"
            onClick={() => setShowAddPlayer(true)}
            disabled={
              maxPlayers !== null &&
              maxPlayers !== undefined &&
              players.length >= maxPlayers
            }
            className="rounded-xl bg-[#FFC400] px-4 py-3 text-sm font-bold transition hover:bg-[#EAB400] disabled:cursor-not-allowed disabled:opacity-40"
          >
            + Add Player
          </button>
        )}
      </div>

      {/* Add Player Form */}
      {showAddPlayer && (
        <div className="mt-5">
          <AddPlayerForm
            onSubmit={handleAddPlayer}
            onCancel={() => setShowAddPlayer(false)}
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Player List */}
      <div className="mt-5">
        {loading ? (
          <div className="rounded-2xl border border-black/10 bg-white px-6 py-12 text-center text-sm text-[#6B7280]">
            Loading players...
          </div>
        ) : (
          <>
            {/* Warnings */}
            {players.length === 0 && (
              <div className="mb-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="text-sm font-bold text-amber-900">
                    No players added yet
                  </p>
                  <p className="mt-1 text-xs leading-5 text-amber-800">
                    Add players to this session before starting matches.
                  </p>
                </div>
              </div>
            )}

            {players.length > 0 && checkedInCount === 0 && (
              <div className="mb-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="text-sm font-bold text-amber-900">
                    No players checked in
                  </p>
                  <p className="mt-1 text-xs leading-5 text-amber-800">
                    Players have been registered, but nobody has checked in yet.
                  </p>
                </div>
              </div>
            )}

            <PlayerList
              players={players}
              onCheckIn={toggleCheckIn}
              onRemove={deletePlayer}
              onQueueChange={onQueueChange}
            />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end border-t border-black/[0.06] pt-5">
        <button
          type="button"
          onClick={onClose}
          disabled={players.length === 0}
          className="rounded-xl bg-[#FFC400] px-6 py-3 text-sm font-black text-black transition hover:bg-[#EAB400]"
        >
          Save and Close
        </button>
      </div>
    </section>
  );
}
