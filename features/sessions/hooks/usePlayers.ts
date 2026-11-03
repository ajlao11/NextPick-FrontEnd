'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  createPlayer,
  getPlayers,
  removePlayer,
  togglePlayerCheckIn,
} from '../services/player.service';

import {
  CreatePlayerData,
  SessionPlayer,
} from '../types/session.types';

export function usePlayers(sessionId: string) {
  const [players, setPlayers] = useState<SessionPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlayers = useCallback(async () => {
    try {
      setError(null);

      const data = await getPlayers(sessionId);
      setPlayers(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to load players',
      );
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  const addPlayer = async (
    data: CreatePlayerData,
  ) => {
    const player = await createPlayer(
      sessionId,
      data,
    );

    setPlayers((current) => [
      ...current,
      player,
    ]);

    return player;
  };

  const toggleCheckIn = async (playerId: string) => {
    const updated = await togglePlayerCheckIn(
      sessionId,
      playerId,
    );

    setPlayers((current) =>
      current.map((player) =>
        player.playerId === playerId
          ? {
            ...player,
            ...updated,
            player: updated.player ?? player.player,
          }
          : player,
      ),
    );

    return updated;
  };

  const deletePlayer = async (
    playerId: string,
  ) => {
    await removePlayer(
      sessionId,
      playerId,
    );

    setPlayers((current) =>
      current.filter(
        (player) =>
          player.playerId !== playerId,
      ),
    );
  };

  return {
    players,
    loading,
    error,
    addPlayer,
    toggleCheckIn,
    deletePlayer,
    refresh: loadPlayers,
  };
}