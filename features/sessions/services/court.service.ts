import { api } from '@/lib/api';

import { Court } from '../types/session.types';

export function getCourts(sessionId: string) {
  return api.get<Court[]>(
    `/sessions/${sessionId}/courts`,
  );
}