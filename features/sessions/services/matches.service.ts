import { api } from '@/lib/api';

import {
  Match,
} from '../types/session.types';

export function getMatches(
  sessionId: string,
) {
  return api.get<Match[]>(
    `/sessions/${sessionId}/matches`,
  );
}

export function startMatch(
  sessionId: string,
  matchId: string,
) {
  return api.patch<Match>(
    `/sessions/${sessionId}/matches/${matchId}/start`,
    {},
  );
}

export function completeMatch(
  sessionId: string,
  matchId: string,
  data: {
    team1Score: number;
    team2Score: number;
    winningTeam?: number;
  },
) {
  return api.patch<Match>(
    `/sessions/${sessionId}/matches/${matchId}/complete`,
    data,
  );
}


export function removeMatchPlayer(
  sessionId: string,
  matchId: string,
  matchPlayerId: string,
) {
  return api.delete<Match>(
    `/sessions/${sessionId}/matches/${matchId}/players/${matchPlayerId}`,
  );
}

export function addMatchPlayer(
  sessionId: string,
  matchId: string,
  data: {
    playerId: string;
    team: number;
    position: number;
  },
) {
  return api.post<Match>(
    `/sessions/${sessionId}/matches/${matchId}/players`,
    data,
  );
}