'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useSessionResults } from '@/features/sessions/hooks/useSessionResults';
import { Trophy } from 'lucide-react';

export default function SessionResultsPage() {

    const params =
        useParams<{ id: string }>();

    const sessionId = params.id;
    const {
        results,
        loading,
        error,
    } = useSessionResults(sessionId);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#FFFDF7]">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="h-10 w-64 animate-pulse rounded-xl bg-black/5" />

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map(
                            (item) => (
                                <div
                                    key={item}
                                    className="h-28 animate-pulse rounded-2xl bg-black/5"
                                />
                            ),
                        )}
                    </div>
                </div>
            </main>
        );
    }
    if (error || !results) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#FFFDF7] px-6">
                <div className="text-center">
                    <h1 className="text-2xl font-black">
                        Unable to load results
                    </h1>

                    <p className="mt-3 text-sm text-[#6B7280]">
                        {error ??
                            'We could not load this session.'}
                    </p>

                    <Link
                        href="/"
                        className="mt-6 inline-flex rounded-xl bg-[#FFC400] px-5 py-3 font-bold"
                    >
                        Back to NextPick
                    </Link>
                </div>
            </main>
        );
    }
    return (
        <main className="min-h-screen bg-[#FFFDF7] text-[#111111]">
            {/* Header */}
            <header className="border-b border-black/5 bg-white">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <Link
                        href="/"
                        className="flex items-center"
                    >
                        <Image
                            src="/logo/nextpick-logo.png"
                            alt="NextPick"
                            width={180}
                            height={50}
                            priority
                            className="translate-y-1"
                        />
                    </Link>

                    <Link
                        href="/"
                        className="text-sm font-semibold text-[#6B7280] hover:text-[#111111]"
                    >
                        Back to NextPick
                    </Link>
                </div>
            </header>

            <section className="px-6 py-10 lg:px-8 lg:py-14">
                <div className="mx-auto max-w-7xl">

                    {/* Session summary */}
                    <div className="rounded-[28px] border border-black/[0.06] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
                        <div className="text-center">
                            <div className="text-4xl">
                                < Trophy />
                            </div>

                            <h1 className="mt-3 text-3xl font-black">
                                Session Complete
                            </h1>

                            <p className="mt-2 text-sm text-[#6B7280]">
                                Final session results
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <StatCard
                                label="Players"
                                value={String(
                                    results.summary.totalPlayers,
                                )}
                            />

                            <StatCard
                                label="Games"
                                value={String(
                                    results.summary.totalGames,
                                )}
                            />

                            <StatCard
                                label="Rounds"
                                value={String(
                                    results.summary.totalRounds,
                                )}
                            />

                            <StatCard
                                label="Courts"
                                value={String(
                                    results.summary.totalCourts,
                                )}
                            />
                        </div>
                    </div>

                    {/* Standings */}
                    <section className="mt-6 rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                        <h2 className="text-xl font-black">
                            Player Standings
                        </h2>

                        <p className="mt-1 text-sm text-[#6B7280]">
                            Final performance
                        </p>

                        <div className="mt-5 overflow-x-auto">
                            {results.standings.length === 0 ? (
                                <div className="rounded-xl bg-[#F7F7F7] p-5 text-center text-sm text-[#6B7280]">
                                    No completed games yet.
                                </div>
                            ) : (
                                <table className="w-full min-w-[720px] border-collapse">
                                    <thead>
                                        <tr className="border-b border-black/[0.06] text-left text-xs font-black uppercase tracking-wide text-[#6B7280]">
                                            <th className="px-4 py-3">
                                                #
                                            </th>

                                            <th className="px-4 py-3">
                                                Player
                                            </th>

                                            <th className="px-4 py-3 text-center">
                                                GP
                                            </th>

                                            <th className="px-4 py-3 text-center">
                                                W
                                            </th>

                                            <th className="px-4 py-3 text-center">
                                                L
                                            </th>

                                            <th className="px-4 py-3 text-center">
                                                PF
                                            </th>

                                            <th className="px-4 py-3 text-center">
                                                PA
                                            </th>

                                            <th className="px-4 py-3 text-center">
                                                +/-
                                            </th>

                                            <th className="px-4 py-3 text-center">
                                                Win %
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {results.standings.map(
                                            (player) => (
                                                <tr
                                                    key={
                                                        player.playerId
                                                    }
                                                    className="border-b border-black/[0.04] last:border-0"
                                                >
                                                    <td className="px-4 py-4">
                                                        <span
                                                            className={
                                                                player.rank ===
                                                                    1
                                                                    ? 'flex h-8 w-8 items-center justify-center rounded-full bg-[#FFC400] text-sm font-black'
                                                                    : 'flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.04] text-sm font-black'
                                                            }
                                                        >
                                                            {
                                                                player.rank
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <p className="font-black">
                                                            {
                                                                player.playerName
                                                            }
                                                        </p>
                                                    </td>

                                                    <td className="px-4 py-4 text-center font-semibold">
                                                        {
                                                            player.gamesPlayed
                                                        }
                                                    </td>

                                                    <td className="px-4 py-4 text-center font-black">
                                                        {player.wins}
                                                    </td>

                                                    <td className="px-4 py-4 text-center font-semibold text-[#6B7280]">
                                                        {player.losses}
                                                    </td>

                                                    <td className="px-4 py-4 text-center font-semibold">
                                                        {
                                                            player.pointsFor
                                                        }
                                                    </td>

                                                    <td className="px-4 py-4 text-center font-semibold">
                                                        {
                                                            player.pointsAgainst
                                                        }
                                                    </td>

                                                    <td className="px-4 py-4 text-center">
                                                        <span
                                                            className={
                                                                player.pointDifferential >
                                                                    0
                                                                    ? 'font-black text-green-600'
                                                                    : player.pointDifferential <
                                                                        0
                                                                        ? 'font-black text-red-500'
                                                                        : 'font-black text-[#6B7280]'
                                                            }
                                                        >
                                                            {player.pointDifferential >
                                                                0
                                                                ? '+'
                                                                : ''}
                                                            {
                                                                player.pointDifferential
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-4 text-center font-black">
                                                        {Math.round(
                                                            player.winPercentage *
                                                            100,
                                                        )}
                                                        %
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </section>

                    {/* Match Logs */}
                    <section className="mt-6 rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                        <div className="mt-5 space-y-4">
                            {results.matchLogs.length === 0 ? (
                                <div className="rounded-2xl bg-[#F7F7F7] p-6 text-center text-sm text-[#6B7280]">
                                    No completed matches yet.
                                </div>
                            ) : (
                                results.matchLogs.map((match) => {
                                    const team1Won =
                                        match.winningTeam === 1;

                                    const team2Won =
                                        match.winningTeam === 2;

                                    return (
                                        <div
                                            key={match.id}
                                            className="rounded-2xl border border-black/[0.06] bg-[#FAFAFA] p-5"
                                        >
                                            {/* Match header */}
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-black">
                                                            Round {match.round}
                                                        </span>

                                                        {match.court && (
                                                            <span className="text-xs font-semibold text-[#6B7280]">
                                                                {match.court.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
                                                    FINAL
                                                </span>
                                            </div>

                                            {/* Teams */}
                                            <div className="mt-5 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
                                                {/* Team 1 */}
                                                <div
                                                    className={
                                                        team1Won
                                                            ? 'rounded-2xl border border-[#FFC400]/40 bg-[#FFF8D9] p-4'
                                                            : 'rounded-2xl border border-black/[0.06] bg-white p-4'
                                                    }
                                                >
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div>
                                                            <p className="text-xs font-black uppercase tracking-wide text-[#6B7280]">
                                                                Team 1
                                                            </p>

                                                            <div className="mt-2 space-y-1">
                                                                {match.team1.map(
                                                                    (player) => (
                                                                        <p
                                                                            key={
                                                                                player.playerId
                                                                            }
                                                                            className="font-black"
                                                                        >
                                                                            {
                                                                                player.name
                                                                            }
                                                                        </p>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>

                                                        <span
                                                            className={
                                                                team1Won
                                                                    ? 'text-3xl font-black'
                                                                    : 'text-3xl font-black text-[#6B7280]'
                                                            }
                                                        >
                                                            {match.team1Score ??
                                                                '—'}
                                                        </span>
                                                    </div>

                                                    {team1Won && (
                                                        <p className="mt-3 text-xs font-black text-green-600">
                                                            WINNER
                                                        </p>
                                                    )}
                                                </div>

                                                {/* VS */}
                                                <div className="text-center text-xs font-black text-[#9CA3AF]">
                                                    VS
                                                </div>

                                                {/* Team 2 */}
                                                <div
                                                    className={
                                                        team2Won
                                                            ? 'rounded-2xl border border-[#FFC400]/40 bg-[#FFF8D9] p-4'
                                                            : 'rounded-2xl border border-black/[0.06] bg-white p-4'
                                                    }
                                                >
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div>
                                                            <p className="text-xs font-black uppercase tracking-wide text-[#6B7280]">
                                                                Team 2
                                                            </p>

                                                            <div className="mt-2 space-y-1">
                                                                {match.team2.map(
                                                                    (player) => (
                                                                        <p
                                                                            key={
                                                                                player.playerId
                                                                            }
                                                                            className="font-black"
                                                                        >
                                                                            {
                                                                                player.name
                                                                            }
                                                                        </p>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>

                                                        <span
                                                            className={
                                                                team2Won
                                                                    ? 'text-3xl font-black'
                                                                    : 'text-3xl font-black text-[#6B7280]'
                                                            }
                                                        >
                                                            {match.team2Score ??
                                                                '—'}
                                                        </span>
                                                    </div>

                                                    {team2Won && (
                                                        <p className="mt-3 text-xs font-black text-green-600">
                                                            WINNER
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Match time */}
                                            {(match.startedAt ||
                                                match.completedAt) && (
                                                    <div className="mt-4 flex flex-wrap gap-4 border-t border-black/[0.05] pt-4 text-xs font-semibold text-[#6B7280]">
                                                        {match.startedAt && (
                                                            <span>
                                                                Started:{' '}
                                                                {new Date(
                                                                    match.startedAt,
                                                                ).toLocaleTimeString(
                                                                    [],
                                                                    {
                                                                        hour: 'numeric',
                                                                        minute: '2-digit',
                                                                    },
                                                                )}
                                                            </span>
                                                        )}

                                                        {match.completedAt && (
                                                            <span>
                                                                Completed:{' '}
                                                                {new Date(
                                                                    match.completedAt,
                                                                ).toLocaleTimeString(
                                                                    [],
                                                                    {
                                                                        hour: 'numeric',
                                                                        minute: '2-digit',
                                                                    },
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </section>

                </div>
            </section>
        </main>
    );
}

function StatCard({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl bg-[#F7F7F7] p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">
                {label}
            </p>

            <p className="mt-2 text-2xl font-black">
                {value}
            </p>
        </div>
    );
}