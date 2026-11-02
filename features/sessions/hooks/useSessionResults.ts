'use client';

import { useCallback, useEffect, useState } from 'react';

import { api } from '@/lib/api';

export interface SessionResultPlayer {
    rank: number;
    playerId: string;
    playerName: string;
    gamesPlayed: number;
    wins: number;
    losses: number;
    pointsFor: number;
    pointsAgainst: number;
    pointDifferential: number;
    winPercentage: number;
}

export interface SessionResultMatchPlayer {
    playerId: string;
    name: string;
}

export interface SessionResultMatch {
    id: string;
    round: number;

    court: {
        id: string;
        number: number;
        name: string;
    } | null;

    team1: SessionResultMatchPlayer[];
    team2: SessionResultMatchPlayer[];

    team1Score: number | null;
    team2Score: number | null;
    winningTeam: number | null;

    startedAt: string | null;
    completedAt: string | null;
}

export interface SessionResults {
    session: {
        id: string;
        name: string;
        date: string;
        startTime: string | null;
        endTime: string | null;
        gameFormat: string;
        matchingStyle: string;
        status: string;
    };

    summary: {
        totalPlayers: number;
        totalGames: number;
        totalRounds: number;
        totalCourts: number;
    };

    standings: SessionResultPlayer[];

    matchLogs: SessionResultMatch[];
}

export function useSessionResults(
    sessionId: string,
) {
    const [results, setResults] =
        useState<SessionResults | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const fetchResults =
        useCallback(async () => {
            if (!sessionId) {
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const data =
                    await api.get<SessionResults>(
                        `/sessions/${sessionId}/results`,
                    );

                setResults(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Failed to load session results.',
                );
            } finally {
                setLoading(false);
            }
        }, [sessionId]);

    useEffect(() => {
        fetchResults();
    }, [fetchResults]);

    return {
        results,
        loading,
        error,
        refresh: fetchResults,
    };
}