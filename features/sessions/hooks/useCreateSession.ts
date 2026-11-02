'use client';

import { useState } from 'react';
import { sessionService } from '../services/session.service';
import { CreateSessionData } from '../types/session.types';

export function useCreateSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSession = async (data: CreateSessionData) => {
    setLoading(true);
    setError(null);

    try {
      const session = await sessionService.create(data);

      return session;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to create session';

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createSession,
    loading,
    error,
  };
}