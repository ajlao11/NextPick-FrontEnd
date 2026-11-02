'use client';

import {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
    completeMatch,
    getMatches,
    startMatch,
    addMatchPlayer,
    removeMatchPlayer,
} from '../services/matches.service';

import { generateRound } from '../services/matching.service';

import { Match } from '../types/session.types';

export function useMatches(
    sessionId: string,
) {
    const [matches, setMatches] =
        useState<Match[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [generating, setGenerating] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);


    const loadMatches = useCallback(async () => {
        try {
            setError(null);

            const data = await getMatches(sessionId);

            setMatches(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to load matches',
            );
        } finally {
            setLoading(false);
        }
    }, [sessionId]);

    useEffect(() => {
        loadMatches();
    }, [loadMatches]);

    const handleGenerateRound = async () => {
        if (generating) return [];

        try {
            setGenerating(true);
            setError(null);

            const newMatches = await generateRound(sessionId);

            // Reload authoritative match state.
            await loadMatches();

            return newMatches;
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to generate round';

            setError(message);
            throw error;
        } finally {
            setGenerating(false);
        }
    };

    const handleStartMatch = async (
        matchId: string,
    ) => {
        const updated =
            await startMatch(
                sessionId,
                matchId,
            );

        setMatches((current) =>
            current.map((match) =>
                match.id === matchId
                    ? updated
                    : match,
            ),
        );

        return updated;
    };

    const handleCompleteMatch = async (
        matchId: string,
        data: {
            team1Score: number;
            team2Score: number;
        },
    ) => {
        const updated =
            await completeMatch(
                sessionId,
                matchId,
                data,
            );

        setMatches((current) =>
            current.map((match) =>
                match.id === matchId
                    ? updated
                    : match,
            ),
        );

        return updated;
    };

    const handleRemovePlayer = async (
        matchId: string,
        matchPlayerId: string,
    ) => {
        const updatedMatch =
            await removeMatchPlayer(
                sessionId,
                matchId,
                matchPlayerId,
            );

        setMatches((current): Match[] =>
            current.map((match) =>
                match.id === matchId
                    ? updatedMatch
                    : match,
            ),
        );

        return updatedMatch;
    };

    const handleAddPlayer = async (
        matchId: string,
        data: {
            playerId: string;
            team: number;
            position: number;
        },
    ) => {
        const updatedMatch =
            await addMatchPlayer(
                sessionId,
                matchId,
                data,
            );

        setMatches((current): Match[] =>
            current.map((match) =>
                match.id === matchId
                    ? updatedMatch
                    : match,
            ),
        );

        return updatedMatch;
    };

    return {
        matches,
        loading,
        generating,
        error,
        generateRound:
            handleGenerateRound,

        startMatch:
            handleStartMatch,

        completeMatch:
            handleCompleteMatch,

        removePlayer:
            handleRemovePlayer,

        addPlayer:
            handleAddPlayer,

        refresh: loadMatches,
    };
}