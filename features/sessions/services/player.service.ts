import { api } from '@/lib/api';

import {
  CreatePlayerData,
  SessionPlayer,
} from '../types/session.types';

export function getPlayers(
  sessionId: string,
) {
  return api.get<SessionPlayer[]>(
    `/sessions/${sessionId}/players`,
  );
}

export function createPlayer(
  sessionId: string,
  data: CreatePlayerData,
) {
  return api.post<SessionPlayer>(
    `/sessions/${sessionId}/players`,
    data,
  );
}

export function togglePlayerCheckIn(
  sessionId: string,
  playerId: string,
) {
  return api.patch<SessionPlayer>(
    `/sessions/${sessionId}/players/${playerId}/check-in`,
    {},
  );
}

export function removePlayer(
  sessionId: string,
  playerId: string,
) {
  return api.delete<{ message: string }>(
    `/sessions/${sessionId}/players/${playerId}`,
  );
}