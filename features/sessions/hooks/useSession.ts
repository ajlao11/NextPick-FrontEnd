'use client';

import { useEffect, useState } from 'react';
import { sessionService } from '../services/session.service';
import { Session } from '../types/session.types';

export function useSession(id: string) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadSession = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await sessionService.getById(id);

        if (!cancelled) {
          setSession(data);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : 'Failed to load session',
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadSession();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return {
    session,
    loading,
    error,
  };
}