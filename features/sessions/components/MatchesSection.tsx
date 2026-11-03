'use client';

import { useState } from 'react';

import { useMatches } from '@/features/sessions/hooks/useMatches';
import { useQueue } from '@/features/sessions/hooks/useQueue';
import { QueuePlayer, GameFormat } from '../types/session.types';
import { MessageCircleWarning, Plus } from 'lucide-react';

interface MatchPlayer {
    id: string;
    team: number;
    position: number;
    player: {
        id: string;
        name: string;
    };
}

interface Match {
    id: string;
    round: number;
    status:
    | 'PENDING'
    | 'LIVE'
    | 'COMPLETED'
    | 'CANCELLED';
    team1Score: number | null;
    team2Score: number | null;
    winningTeam: number | null;
    court: {
        id: string;
        name: string;
        number: number;
    } | null;
    players: MatchPlayer[];
}

interface SelectedSlot {
    team: number;
    position: number;
}

interface AvailablePlayer {
    id: string;
    playerId: string;
    name: string;
}

export function MatchesSection({
    gameFormat,
    sessionId,
    matches,
    loading,
    generating,
    error,
    generateRound,
    startMatch,
    completeMatch,
    removePlayer,
    addPlayer,
    refreshMatches,
    queue,
    refreshQueue,
    refreshCourts,
}: {
    gameFormat: GameFormat;
    sessionId: string;
    matches: Match[];
    loading: boolean;
    generating: boolean;
    error: string | null;
    refreshCourts: () => Promise<unknown>;
    generateRound: () => Promise<unknown>;
    startMatch: (
        matchId: string,
    ) => Promise<unknown>;
    completeMatch: (
        matchId: string,
        data: {
            team1Score: number;
            team2Score: number;
        },
    ) => Promise<unknown>;

    removePlayer: (
        matchId: string,
        matchPlayerId: string,
    ) => Promise<unknown>;

    addPlayer: (
        matchId: string,
        data: {
            playerId: string;
            team: number;
            position: number;
        },
    ) => Promise<unknown>;

    refreshMatches: () => Promise<unknown>;

    queue: QueuePlayer[];

    refreshQueue: () => Promise<void>;
}) {

    const [selectedSlot, setSelectedSlot] =
        useState<SelectedSlot | null>(null);

    const [editingMatchId, setEditingMatchId] =
        useState<string | null>(null);

    const currentMatches =
        matches.filter(
            (match: Match) =>
                match.status === 'PENDING' ||
                match.status === 'LIVE',
        );

    const currentRound =
        currentMatches.length > 0
            ? Math.max(
                ...currentMatches.map(
                    (match: Match) =>
                        match.round,
                ),
            )
            : null;

    /*
     * Convert queue entries into the
     * simple structure expected by
     * PlayerPicker.
     */
    const waitingPlayers: AvailablePlayer[] = queue
        .filter((entry) => entry.status === 'WAITING')
        .map((entry) => ({
            id: entry.sessionPlayer.id,
            playerId: entry.sessionPlayer.player.id,
            name: entry.sessionPlayer.player.name,
        }));

    /*
     * Remove players that are already
     * assigned to one of the current
     * matches.
     *
     * This prevents accidentally adding
     * the same player to another match.
     */
    const playersInCurrentMatches =
        new Set(
            currentMatches.flatMap(
                (match: Match) =>
                    match.players.map(
                        (player) =>
                            player.player.id,
                    ),
            ),
        );

    const availablePlayers =
        waitingPlayers.filter(
            (player) =>
                !playersInCurrentMatches.has(
                    player.playerId,
                ),
        );

    const handleAddPlayer = async (
        playerId: string,
        team: number,
        position: number,
    ) => {
        if (!editingMatchId) {
            return;
        }

        await addPlayer(
            editingMatchId,
            {
                playerId,
                team,
                position,
            },
        );

        await refreshQueue();

        setSelectedSlot(null);
        setEditingMatchId(null);
    };

    const handleOpenPlayerPicker = (
        matchId: string,
        team: number,
        position: number,
    ) => {
        setEditingMatchId(matchId);

        setSelectedSlot({
            team,
            position,
        });
    };

    const handleClosePlayerPicker = () => {
        setSelectedSlot(null);
        setEditingMatchId(null);
    };

    return (
        <section>
            {/* Section header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-base font-black tracking-wide text-[#6B7280]">
                        CURRENT MATCHES
                    </h2>

                    {currentRound && (
                        <p className="mt-1 text-sm text-[#9CA3AF]">
                            Round {currentRound}
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    onClick={async () => {
                        await generateRound();
                        await refreshQueue();
                        await refreshCourts();
                    }}
                    disabled={generating}
                    className="
            rounded-xl
            bg-[#FFC400]
            px-4
            py-2.5
            text-sm
            font-black
            transition
            hover:bg-[#EAB400]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
                >
                    {generating ? (
                        'Generating...'
                    ) : (
                        <span className="flex items-center gap-2">
                            <Plus size={16} />
                            Generate Next Round
                        </span>
                    )}
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3].map(
                        (item) => (
                            <div
                                key={item}
                                className="h-[350px] animate-pulse rounded-[22px] bg-black/5"
                            />
                        ),
                    )}
                </div>
            )}

            {/* Empty */}
            {!loading &&
                currentMatches.length === 0 && (
                    <div className="mt-4 rounded-[22px] border border-dashed border-black/10 bg-[#FFFDF7] px-6 py-12 text-center">
                        <p className="font-black">
                            No current matches
                        </p>

                        <p className="mt-1 text-sm text-[#6B7280]">
                            Generate the next round when
                            players are ready.
                        </p>
                    </div>
                )}

            {/* Current matches */}
            {!loading &&
                currentMatches.length > 0 && (
                    <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {currentMatches.map(
                            (match: Match) => (
                                <MatchCard
                                    key={match.id}
                                    match={match}
                                    gameFormat={gameFormat}
                                    onStart={async () => {
                                        await startMatch(match.id);
                                        await refreshQueue();
                                        await refreshCourts();
                                    }}
                                    onComplete={async (
                                        team1Score,
                                        team2Score,
                                    ) => {
                                        await completeMatch(
                                            match.id,
                                            {
                                                team1Score,
                                                team2Score,
                                            },
                                        );

                                        await refreshQueue();
                                        await refreshCourts();
                                    }}
                                    onRemovePlayer={async (
                                        matchPlayerId,
                                    ) => {
                                        await removePlayer(
                                            match.id,
                                            matchPlayerId,
                                        );

                                        await refreshQueue();
                                    }}
                                    onAddPlayer={(
                                        team,
                                        position,
                                    ) =>
                                        handleOpenPlayerPicker(
                                            match.id,
                                            team,
                                            position,
                                        )
                                    }
                                />
                            ),
                        )}
                    </div>
                )}

            {/* Player picker */}
            {selectedSlot && (
                <PlayerPicker
                    players={availablePlayers}
                    team={selectedSlot.team}
                    position={
                        selectedSlot.position
                    }
                    onSelect={handleAddPlayer}
                    onClose={
                        handleClosePlayerPicker
                    }
                />
            )}
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* Match Card                                                                 */
/* -------------------------------------------------------------------------- */


function MatchCard({
    match,
    gameFormat,
    onStart,
    onComplete,
    onRemovePlayer,
    onAddPlayer,
}: {
    match: Match;
    gameFormat: GameFormat;

    onStart: () => Promise<unknown>;

    onComplete: (
        team1Score: number,
        team2Score: number,
    ) => Promise<unknown>;

    onRemovePlayer: (
        matchPlayerId: string,
    ) => Promise<unknown>;

    onAddPlayer: (
        team: number,
        position: number,
    ) => void;
}) {
    // -------------------------------------------------------
    // TEAMS
    // -------------------------------------------------------

    const team1 = match.players
        .filter((player) => player.team === 1)
        .sort((a, b) => a.position - b.position);

    const team2 = match.players
        .filter((player) => player.team === 2)
        .sort((a, b) => a.position - b.position);

    const isLive = match.status === 'LIVE';
    const editable = match.status === 'PENDING';

    // -------------------------------------------------------
    // MATCH VALIDATION
    // -------------------------------------------------------

    const playersPerTeam =
        gameFormat === 'SINGLES' ? 1 : 2;

    const requiredPlayers = playersPerTeam * 2;

    const currentPlayers = match.players.length;

    const missingPlayers = Math.max(
        0,
        requiredPlayers - currentPlayers,
    );

    const canStart =
        editable &&
        currentPlayers === requiredPlayers &&
        team1.length === playersPerTeam &&
        team2.length === playersPerTeam;

    // -------------------------------------------------------
    // STATES
    // -------------------------------------------------------

    const [team1Score, setTeam1Score] = useState(
        match.team1Score?.toString() ?? '',
    );

    const [team2Score, setTeam2Score] = useState(
        match.team2Score?.toString() ?? '',
    );

    const [starting, setStarting] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const [removingPlayerId, setRemovingPlayerId] =
        useState<string | null>(null);

    const [actionError, setActionError] =
        useState<string | null>(null);

    const isBusy =
        starting ||
        submitting ||
        removingPlayerId !== null;

    // -------------------------------------------------------
    // ERROR HELPER
    // -------------------------------------------------------

    const getErrorMessage = (error: unknown): string => {
        if (error instanceof Error) {
            return error.message;
        }

        return 'Something went wrong. Please try again.';
    };

    // -------------------------------------------------------
    // START MATCH
    // -------------------------------------------------------

    const handleStart = async () => {
        if (!canStart || isBusy) return;

        setActionError(null);
        setStarting(true);

        try {
            await onStart();
        } catch (error) {
            setActionError(getErrorMessage(error));
        } finally {
            setStarting(false);
        }
    };

    // -------------------------------------------------------
    // COMPLETE MATCH
    // -------------------------------------------------------

    const handleComplete = async () => {
        if (isBusy) return;

        setActionError(null);

        if (
            team1Score.trim() === '' ||
            team2Score.trim() === ''
        ) {
            setActionError(
                'Please enter scores for both teams.',
            );
            return;
        }

        const score1 = Number(team1Score);
        const score2 = Number(team2Score);

        if (
            !Number.isInteger(score1) ||
            !Number.isInteger(score2) ||
            score1 < 0 ||
            score2 < 0
        ) {
            setActionError(
                'Scores must be valid non-negative whole numbers.',
            );
            return;
        }

        if (score1 === score2) {
            setActionError(
                'A match cannot end in a tie. Please enter different scores.',
            );
            return;
        }

        setSubmitting(true);

        try {
            await onComplete(score1, score2);
        } catch (error) {
            setActionError(getErrorMessage(error));
        } finally {
            setSubmitting(false);
        }
    };

    // -------------------------------------------------------
    // REMOVE PLAYER
    // -------------------------------------------------------

    const handleRemovePlayer = async (
        matchPlayerId: string,
    ) => {
        if (!editable || isBusy) return;

        setActionError(null);
        setRemovingPlayerId(matchPlayerId);

        try {
            await onRemovePlayer(matchPlayerId);
        } catch (error) {
            setActionError(getErrorMessage(error));
        } finally {
            setRemovingPlayerId(null);
        }
    };

    // -------------------------------------------------------
    // RENDER
    // -------------------------------------------------------

    return (
        <article className="rounded-[22px] border border-black/[0.06] bg-white p-4 shadow-[0_3px_12px_rgba(0,0,0,0.04)]">

            {/* Card Header */}
            <div className="flex items-center justify-between">
                <span className="font-black text-[#FFC400]">
                    {match.court?.name ??
                        `Court ${match.court?.number ?? ''}`}
                </span>

                <span
                    className={
                        isLive
                            ? 'rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700'
                            : 'rounded-full bg-black/5 px-3 py-1 text-xs font-black text-[#6B7280]'
                    }
                >
                    {isLive ? '● LIVE' : 'PENDING'}
                </span>
            </div>
            {/* Incomplete Match Warning */}
            {!canStart && !isLive && (
                <div
                    role="status"
                    className="mb-3 mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"
                >
                    <span className="inline-flex items-center gap-2 font-bold text-amber-800">
                        <MessageCircleWarning size={22} />
                        Incomplete Match
                    </span>

                    <p className="mt-1 text-xs leading-5 text-amber-700">
                        {missingPlayers > 0
                            ? `This match needs ${missingPlayers} more ${missingPlayers === 1
                                ? 'player'
                                : 'players'
                            } before it can start.`
                            : `Each team must have exactly ${playersPerTeam} ${playersPerTeam === 1
                                ? 'player'
                                : 'players'
                            }.`}
                    </p>

                    <p className="mt-2 text-xs font-semibold text-amber-700">
                        {currentPlayers} / {requiredPlayers} players assigned
                    </p>
                </div>
            )}
            {/* Action Error */}
            {actionError && (
                <div
                    role="alert"
                    className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                >
                    <p className="text-sm font-bold text-red-700">
                        Something went wrong
                    </p>

                    <p className="mt-1 text-xs text-red-600">
                        {actionError}
                    </p>

                    <button
                        type="button"
                        onClick={() => setActionError(null)}
                        className="mt-2 text-xs font-bold text-red-700 underline"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* Teams */}
            <div className="mt-4">
                <TeamBox
                    players={team1}
                    team={1}
                    winner={match.winningTeam === 1}
                    editable={editable && !isBusy}
                    removingPlayerId={removingPlayerId}
                    onRemovePlayer={handleRemovePlayer}
                    onAddPlayer={onAddPlayer}
                    gameFormat={gameFormat}
                />

                <div className="py-2 text-center text-sm font-black text-[#9CA3AF]">
                    VS
                </div>

                <TeamBox
                    players={team2}
                    team={2}
                    winner={match.winningTeam === 2}
                    editable={editable && !isBusy}
                    removingPlayerId={removingPlayerId}
                    onRemovePlayer={handleRemovePlayer}
                    onAddPlayer={onAddPlayer}
                    gameFormat={gameFormat}
                />
            </div>

            {/* LIVE MATCH - SCORING */}
            {isLive ? (
                <div className="mt-4">
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={team1Score}
                            disabled={submitting}
                            onChange={(event) =>
                                setTeam1Score(event.target.value)
                            }
                            className="rounded-xl border border-black/10 px-3 py-3 text-center text-xl font-black outline-none focus:border-[#FFC400] disabled:opacity-50"
                            placeholder="0"
                        />

                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={team2Score}
                            disabled={submitting}
                            onChange={(event) =>
                                setTeam2Score(event.target.value)
                            }
                            className="rounded-xl border border-black/10 px-3 py-3 text-center text-xl font-black outline-none focus:border-[#FFC400] disabled:opacity-50"
                            placeholder="0"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleComplete}
                        disabled={
                            isBusy ||
                            team1Score.trim() === '' ||
                            team2Score.trim() === ''
                        }
                        className="mt-3 w-full rounded-xl bg-[#FFC400] py-3 text-sm font-black transition hover:bg-[#EAB400] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {submitting
                            ? 'Saving...'
                            : 'Complete Match'}
                    </button>
                </div>
            ) : (
                /* PENDING MATCH */
                <div className="mt-4">
                    <div className="mb-4 text-center">
                        {match.team1Score !== null &&
                            match.team2Score !== null ? (
                            <p className="text-3xl font-black">
                                {match.team1Score}
                                {' - '}
                                {match.team2Score}
                            </p>
                        ) : (
                            <p className="text-lg font-black">
                                Not Started
                            </p>
                        )}
                    </div>

                    {/* Start Match Button */}
                    <button
                        type="button"
                        onClick={handleStart}
                        disabled={!canStart || isBusy}
                        title={
                            !canStart
                                ? `Requires ${playersPerTeam} players per team`
                                : undefined
                        }
                        className="w-full rounded-xl bg-[#FFC400] py-3 text-sm font-black transition hover:bg-[#EAB400] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {starting
                            ? 'Starting...'
                            : 'Start Match'}
                    </button>
                </div>
            )}
        </article>
    );
}


/* -------------------------------------------------------------------------- */
/* Team Box                                                                   */
/* -------------------------------------------------------------------------- */


function TeamBox({
    players,
    team,
    winner,
    editable,
    removingPlayerId,
    onRemovePlayer,
    onAddPlayer,
    gameFormat,
}: {
    players: MatchPlayer[];
    team: number;
    winner: boolean;
    editable: boolean;
    removingPlayerId: string | null;
    onRemovePlayer: (matchPlayerId: string) => Promise<void>;
    onAddPlayer: (team: number, position: number) => void;
    gameFormat: GameFormat;
}) {
    // Singles = 1 player per team
    // Doubles = 2 players per team
    const slots = gameFormat === 'SINGLES' ? [1] : [1, 2];

    return (
        <div
            className={
                winner
                    ? 'rounded-[16px] bg-[#FFF8DE] px-4 py-3'
                    : 'rounded-[16px] bg-[#F7F7F7] px-4 py-3'
            }
        >
            <div className="space-y-2">
                {slots.map((position) => {
                    const player = players.find(
                        (item) => item.position === position,
                    );

                    // Empty player slot
                    if (!player) {
                        return (
                            <button
                                key={position}
                                type="button"
                                disabled={!editable}
                                onClick={() =>
                                    onAddPlayer(team, position)
                                }
                                className="flex w-full items-center justify-center rounded-xl border border-dashed border-black/10 px-3 py-2.5 text-sm font-bold text-[#9CA3AF] transition hover:border-[#FFC400] hover:bg-[#FFC400]/5 hover:text-[#111111] disabled:cursor-default disabled:hover:border-black/10 disabled:hover:bg-transparent disabled:hover:text-[#9CA3AF]"
                            >
                                + Add player
                            </button>
                        );
                    }

                    // Assigned player
                    return (
                        <div
                            key={player.id}
                            className="flex items-center justify-between gap-3"
                        >
                            <span className="font-black">
                                {player.player?.name ?? 'Unknown Player'}
                            </span>

                            {editable && (
                                <button
                                    type="button"
                                    disabled={
                                        removingPlayerId !== null
                                    }
                                    onClick={() =>
                                        onRemovePlayer(player.id)
                                    }
                                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-black text-[#9CA3AF] transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label={`Remove ${player.player?.name ?? 'player'}`}
                                    title="Remove player from match"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {winner && (
                <div className="mt-2 text-[10px] font-black text-[#FFC400]">
                    WINNER
                </div>
            )}
        </div>
    );
}


/* -------------------------------------------------------------------------- */
/* Player Picker                                                              */
/* -------------------------------------------------------------------------- */

function PlayerPicker({
    players,
    team,
    position,
    onSelect,
    onClose,
}: {
    players: AvailablePlayer[];
    team: number;
    position: number;

    onSelect: (
        playerId: string,
        team: number,
        position: number,
    ) => Promise<void>;

    onClose: () => void;
}) {
    const [addingPlayerId, setAddingPlayerId] =
        useState<string | null>(null);

    async function handleSelect(
        playerId: string,
    ) {
        setAddingPlayerId(playerId);

        try {
            await onSelect(
                playerId,
                team,
                position,
            );
        } finally {
            setAddingPlayerId(null);
        }
    }

    return (
        <div
            className="
        fixed
        inset-0
        z-[60]
        flex
        items-center
        justify-center
        bg-black/30
        px-4
        backdrop-blur-sm
      "
            onMouseDown={onClose}
        >
            <div
                className="
          w-full
          max-w-sm
          rounded-[24px]
          bg-white
          p-5
          shadow-2xl
        "
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-black">
                            Add player
                        </h3>

                        <p className="mt-1 text-xs text-[#6B7280]">
                            Select a player from the
                            waiting queue.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-black/5
              font-bold
              transition
              hover:bg-black/10
            "
                    >
                        ×
                    </button>
                </div>

                {/* Players */}
                <div className="mt-4 max-h-[350px] space-y-2 overflow-y-auto">
                    {players.length === 0 ? (
                        <div className="rounded-xl bg-[#F7F7F7] px-4 py-6 text-center text-sm text-[#6B7280]">
                            No players waiting.
                        </div>
                    ) : (
                        players.map(
                            (player) => {
                                const adding =
                                    addingPlayerId ===
                                    player.playerId;

                                return (
                                    <button
                                        key={
                                            player.playerId
                                        }
                                        type="button"
                                        disabled={
                                            addingPlayerId !==
                                            null
                                        }
                                        onClick={() =>
                                            handleSelect(
                                                player.playerId,
                                            )
                                        }
                                        className="
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-xl
                      bg-[#F7F7F7]
                      px-4
                      py-3
                      text-left
                      transition
                      hover:bg-[#FFF8DE]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                                    >
                                        <span className="font-black">
                                            {player.name}
                                        </span>

                                        <span className="text-xs font-bold text-[#9CA3AF]">
                                            {adding
                                                ? 'Adding...'
                                                : 'Add'}
                                        </span>
                                    </button>
                                );
                            },
                        )
                    )}
                </div>
            </div>
        </div>
    );
}