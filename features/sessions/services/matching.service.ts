import { api } from '@/lib/api';

import { Match } from '../types/session.types';

export function generateRound(sessionId: string) {
  return api.post<Match[]>(
    `/sessions/${sessionId}/matching/generate`,
    {},
  );
}