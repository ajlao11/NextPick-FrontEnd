
'use client';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { getQueue } from '../services/queue.service';
import { QueuePlayer } from '../types/session.types';

export function useQueue(sessionId: string) {
  const [queue, setQueue] = useState<QueuePlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQueue = useCallback(async () => {
    try {
      setError(null);

      const data = await getQueue(sessionId);

      // Preserve backend priority order.
      const waitingQueue = data.filter(
        (entry) => entry.status === 'WAITING',
      );

      setQueue(waitingQueue);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to load queue',
      );
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  return {
    queue,
    loading,
    error,
    refresh: loadQueue,
  };
}
