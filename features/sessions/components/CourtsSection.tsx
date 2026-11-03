'use client';

import { CircleFadingPlay, Clock2 } from "lucide-react";

interface Court {
    id: string;
    number: number;
    name: string;
    status: string;
}

export function CourtsSection({
    courts,
    loading,
    error,
}: {
    courts: Court[];
    loading: boolean;
    error: string | null;
}) {

    const items =
        courts as Court[];

    const activeCount =
        items.filter(
            (court) =>
                court.status === 'PLAYING',
        ).length;

    return (
        <section className="rounded-[22px] border border-black/[0.06] bg-white p-5">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-black tracking-wide text-[#6B7280]">
                    COURTS
                </h2>

                <span className="text-sm text-[#6B7280]">
                    <strong className="font-black text-[#111111]">
                        {activeCount}
                    </strong>{' '}
                    active
                </span>
            </div>

            {error && (
                <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map(
                        (item) => (
                            <div
                                key={item}
                                className="h-24 animate-pulse rounded-[16px] bg-black/5"
                            />
                        ),
                    )}
                </div>
            ) : (
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {items.map((court) => {
                        const playing =
                            court.status ===
                            'PLAYING';

                        const maintenance =
                            court.status ===
                            'MAINTENANCE';

                        return (
                            <div
                                key={court.id}
                                className={
                                    playing
                                        ? 'rounded-[16px] bg-[#FFF8DE] px-3 py-4 text-center'
                                        : 'rounded-[16px] bg-[#F7F7F7] px-3 py-4 text-center'
                                }
                            >
                                <p className="text-sm font-black">
                                    {court.name ||
                                        `Court ${court.number}`}
                                </p>

                                <div className="mt-2 flex justify-center">
                                    {playing ? (
                                        <span className="text-xl">
                                            <CircleFadingPlay />
                                        </span>
                                    ) : (
                                        <span className="text-xl opacity-50">
                                            <Clock2 />
                                        </span>
                                    )}
                                </div>

                                <p
                                    className={
                                        playing
                                            ? 'mt-1 text-sm font-black text-[#FFC400]'
                                            : maintenance
                                                ? 'mt-1 text-sm font-medium text-red-400'
                                                : 'mt-1 text-sm font-medium text-[#9CA3AF]'
                                    }
                                >
                                    {playing
                                        ? 'Playing'
                                        : maintenance
                                            ? 'Maintenance'
                                            : 'Waiting'}
                                </p>

                                <p className="mt-1 text-xs text-[#9CA3AF]">
                                    {playing
                                        ? '4/4'
                                        : '0/4'}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}