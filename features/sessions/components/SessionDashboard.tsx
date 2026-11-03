'use client';

import { useState } from 'react';

import { Settings, Users, LogOut,  Plus } from 'lucide-react';
import { SessionHeader } from './SessionHeader';
import { MatchesSection } from './MatchesSection';
import { QueueSection } from './QueueSection';
import { CourtsSection } from './CourtsSection';
import { MatchLogsSection } from './MatchLogsSection';
import { PlayersSection } from './PlayerSelection';
import { useQueue } from '@/features/sessions/hooks/useQueue';
import { useMatches } from '@/features/sessions/hooks/useMatches';
import { useCourts } from '@/features/sessions/hooks/useCourts';
import type { GameFormat } from '../types/session.types';

interface SessionDashboardProps {
  session: {
    id: string;
    name: string;
    date: string;
    startTime: string | null;
    endTime: string | null;
    courtCount: number;
    maxPlayers: number | null;
    gameFormat: GameFormat;
    matchingStyle: string;
    status: string;
  };
}

type ModalType =
  | 'settings'
  | 'players'
  | 'court'
  | 'end-session'
  | null;

export function SessionDashboard({
  session,
}: SessionDashboardProps) {
  const [modal, setModal] = useState<ModalType>('players'); const {
    queue,
    loading: queueLoading,
    error: queueError,
    refresh: refreshQueue,
  } = useQueue(session.id);
  const {
    matches,
    loading: matchesLoading,
    generating,
    error: matchesError,
    generateRound,
    startMatch,
    completeMatch,
    removePlayer,
    addPlayer,
    refresh: refreshMatches,
  } = useMatches(session.id);
  const {
    courts,
    loading: courtsLoading,
    error: courtsError,
    refresh: refreshCourts,
  } = useCourts(session.id);

  return (
    <>
      <div className="overflow-hidden rounded-[32px] border border-black/[0.06] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.06)]">
        {/* Header */}
        <div className="px-6 pt-7 sm:px-8 sm:pt-8">
          <SessionHeader session={session} />

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                setModal('settings')
              }
              className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-black transition hover:bg-black/[0.025]"
            >
               <Settings />
              Settings
            </button>

            <button
              type="button"
              onClick={() =>
                setModal('players')
              }
              className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-black transition hover:bg-black/[0.025]"
            >
              <Users />
              Players
            </button>

            {/* End Session */}
            <button
              type="button"
              onClick={() =>
                setModal('end-session')
              }
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-black text-red-600 transition hover:bg-red-50"
            >
              <LogOut />
              End Session
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 mt-6 h-px bg-black/[0.06] sm:mx-8" />

        {/* Row 1 - Current Matches */}
        <div className="px-6 pt-6 sm:px-8">
          <MatchesSection
            sessionId={session.id}
            gameFormat={session.gameFormat}
            matches={matches}
            loading={matchesLoading}
            generating={generating}
            error={matchesError}
            generateRound={generateRound}
            startMatch={startMatch}
            completeMatch={completeMatch}
            removePlayer={removePlayer}
            addPlayer={addPlayer}
            refreshMatches={refreshMatches}
            queue={queue}
            refreshQueue={refreshQueue}
            refreshCourts={refreshCourts}
          />
        </div>

        {/* Row 2 - Queue + Courts */}
        <div className="grid gap-5 px-6 pt-5 sm:px-8 lg:grid-cols-2">
          <QueueSection
            queue={queue}
            loading={queueLoading}
            error={queueError}
            playersPerMatch={session.gameFormat === 'SINGLES' ? 2 : 4}
          />

          <CourtsSection
            courts={courts}
            loading={courtsLoading}
            error={courtsError}
          />
        </div>

        {/* Row 3 - Match Logs */}
        <div className="px-6 py-5 sm:px-8 sm:pb-8">
          <MatchLogsSection
            matches={matches}
            loading={matchesLoading}
          />
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <DashboardModal
          type={modal}
          session={session}
          onClose={() => setModal(null)}
          refreshQueue={refreshQueue}
          refreshCourts={refreshCourts}
        />
      )}
    </>
  );
}

function DashboardModal({
  type,
  session,
  onClose,
  refreshQueue,
  refreshCourts,
}: {
  type: Exclude<ModalType, null>;
  session: SessionDashboardProps['session'];
  onClose: () => void;
  refreshQueue: () => Promise<void>;
  refreshCourts: () => Promise<void>;
}) {
  const titles = {
    settings: 'Session settings',
    players: 'Players',
    court: 'Add court',
    'end-session': 'End session',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl sm:p-7"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">
            {titles[type]}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-lg font-bold transition hover:bg-black/10"
          >
            ×
          </button>
        </div>

        {type === 'settings' && (
          <div className="mt-6 space-y-4">
            <SettingRow
              label="Game format"
              value={session.gameFormat}
            />

            <SettingRow
              label="Matching style"
              value={session.matchingStyle}
            />

            <SettingRow
              label="Courts"
              value={String(
                session.courtCount,
              )}
            />

            <SettingRow
              label="Maximum players"
              value={
                session.maxPlayers
                  ? String(
                    session.maxPlayers,
                  )
                  : 'Unlimited'
              }
            />
          </div>
        )}

        {type === 'players' && (
          <div className="mt-5 max-h-[70vh] overflow-y-auto">
            <PlayersSection
              sessionId={session.id}
              maxPlayers={session.maxPlayers}
              onQueueChange={refreshQueue}
              onClose={onClose}
            />
          </div>
        )}

        {type === 'court' && (
          <AddCourtForm
            sessionId={session.id}
            onClose={onClose}
            refreshCourts={refreshCourts}
          />
        )}

        {type === 'end-session' && (
          <EndSessionConfirmation
            sessionId={session.id}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

function SettingRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#F7F7F7] px-4 py-3">
      <span className="text-sm text-[#6B7280]">
        {label}
      </span>

      <span className="text-sm font-black">
        {value}
      </span>
    </div>
  );
}

function EndSessionConfirmation({
  sessionId,
  onClose,
}: {
  sessionId: string;
  onClose: () => void;
}) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleEndSession = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const { api } = await import('@/lib/api');

      await api.patch(
        `/sessions/${sessionId}/complete`,
        {},
      );

      // Navigate to the results page after successful completion.
      window.location.assign(
        `/sessions/${sessionId}/results`,
      );
    } catch (error) {
      console.error('Failed to end session:', error);

      setError(
        error instanceof Error
          ? error.message
          : 'Failed to end session.',
      );

      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-lg">
            ⚠️
          </div>

          <div>
            <h3 className="font-black text-red-900">
              End this session?
            </h3>

            <p className="mt-1 text-sm leading-6 text-red-700">
              This will mark the session as
              completed and finalize the
              session results.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="flex-1 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-black transition hover:bg-black/[0.025] disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleEndSession}
          disabled={loading}
          className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          {loading
            ? 'Ending...'
            : 'End Session'}
        </button>
      </div>
    </div>
  );
}

function AddCourtForm({
  sessionId,
  onClose,
  refreshCourts,
}: {
  sessionId: string;
  onClose: () => void;
  refreshCourts: () => Promise<void>;
}) {
  const [name, setName] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      setError('Enter a court name.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { api } = await import(
        '@/lib/api'
      );

      await api.post(
        `/sessions/${sessionId}/courts`,
        {
          name: name.trim(),
        },
      );

      await refreshCourts();
      onClose();

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to add court.',
      );
    } finally {
      setLoading(false);
    }
  };



  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6"
    >
      <label className="text-sm font-bold">
        Court name
      </label>

      <input
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
        placeholder="Court 7"
        className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-[#FFC400]"
      />

      {error && (
        <p className="mt-2 text-sm font-semibold text-red-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-[#FFC400] px-4 py-3 font-black transition hover:bg-[#EAB400] disabled:opacity-50"
      >
        {loading
          ? 'Adding...'
          : 'Add Court'}
      </button>
    </form>
  );
}
