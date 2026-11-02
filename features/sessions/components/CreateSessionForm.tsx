'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { useCreateSession } from '../hooks/useCreateSession';
import { useCreateSessionForm } from '../hooks/useCreateSessionForm';

import { GameFormatSelector } from './GameFormatSelector';
import { MatchingStyleSelector } from './MatchingStyleSelector';

export function CreateSessionForm() {
  const router = useRouter();

  const { createSession, loading, error } =
    useCreateSession();

  const {
    name,
    setName,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    courtCount,
    decreaseCourts,
    increaseCourts,
    maxPlayers,
    setMaxPlayers,
    gameFormat,
    setGameFormat,
    matchingStyle,
    setMatchingStyle,
    formData,
  } = useCreateSessionForm();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      const session = await createSession(formData);

      router.push(`/sessions/${session.id}`);
    } catch {
      // Error is handled by useCreateSession.
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8"
    >
      {/* Session name */}
      <div>
        <label
          htmlFor="name"
          className="text-sm font-bold"
        >
          Session name
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Saturday Open Play"
          required
          className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFC400] focus:ring-4 focus:ring-[#FFC400]/10"
        />
      </div>

      {/* Date */}
      <div className="mt-6">
        <label
          htmlFor="date"
          className="text-sm font-bold"
        >
          Date
        </label>

        <input
          id="date"
          type="date"
          value={date}
          onChange={(event) =>
            setDate(event.target.value)
          }
          required
          className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 outline-none transition focus:border-[#FFC400] focus:ring-4 focus:ring-[#FFC400]/10"
        />
      </div>

      {/* Times */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="startTime"
            className="text-sm font-bold"
          >
            Start time
          </label>

          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(event) =>
              setStartTime(event.target.value)
            }
            required
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 outline-none transition focus:border-[#FFC400] focus:ring-4 focus:ring-[#FFC400]/10"
          />
        </div>

        <div>
          <label
            htmlFor="endTime"
            className="text-sm font-bold"
          >
            End time
          </label>

          <input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(event) =>
              setEndTime(event.target.value)
            }
            required
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 outline-none transition focus:border-[#FFC400] focus:ring-4 focus:ring-[#FFC400]/10"
          />
        </div>
      </div>

      {/* Game format */}
      <GameFormatSelector
        value={gameFormat}
        onChange={setGameFormat}
      />

      {/* Matching style */}
      <MatchingStyleSelector
        value={matchingStyle}
        onChange={setMatchingStyle}
      />

      {/* Courts */}
      <div className="mt-8">
        <label className="text-sm font-bold">
          Number of courts
        </label>

        <div className="mt-3 flex items-center gap-4">
          <button
            type="button"
            onClick={decreaseCourts}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-white text-xl font-bold transition hover:bg-black/[0.03]"
          >
            −
          </button>

          <div className="flex h-12 min-w-20 items-center justify-center rounded-xl bg-[#111111] px-5 text-lg font-black text-white">
            {courtCount}
          </div>

          <button
            type="button"
            onClick={increaseCourts}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-white text-xl font-bold transition hover:bg-black/[0.03]"
          >
            +
          </button>
        </div>
      </div>

      {/* Maximum players */}
      <div className="mt-8">
        <label
          htmlFor="maxPlayers"
          className="text-sm font-bold"
        >
          Maximum players
        </label>

        <input
          id="maxPlayers"
          type="number"
          min={1}
          value={maxPlayers}
          onChange={(event) =>
            setMaxPlayers(Number(event.target.value))
          }
          required
          className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 outline-none transition focus:border-[#FFC400] focus:ring-4 focus:ring-[#FFC400]/10"
        />

        <p className="mt-2 text-xs text-[#9CA3AF]">
          You can change this later.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-10 flex w-full items-center justify-center gap-3 rounded-xl bg-[#FFC400] px-6 py-4 font-bold transition hover:bg-[#eeb500] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? 'Creating session...'
          : 'Create Session'}

        {!loading && (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111111] text-sm text-white">
            →
          </span>
        )}
      </button>
    </form>
  );
}