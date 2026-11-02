'use client';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { getCourts } from '../services/court.service';
import { Court } from '../types/session.types';

export function useCourts(sessionId: string) {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null,
  );

  const loadCourts = useCallback(async () => {
    try {
      setError(null);

      const data = await getCourts(sessionId);

      setCourts(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to load courts',
      );
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    loadCourts();
  }, [loadCourts]);

  return {
    courts,
    loading,
    error,
    refresh: loadCourts,
  };
}