import { api } from '@/lib/api';

import {
  QueuePlayer,
} from '../types/session.types';

export function getQueue(
  sessionId: string,
) {
  return api.get<QueuePlayer[]>(
    `/sessions/${sessionId}/queue`,
  );
}