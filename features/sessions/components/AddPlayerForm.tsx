'use client';

import { FormEvent, useState } from 'react';

interface AddPlayerFormProps {
  onSubmit: (data: {
    name: string;
    skillRating?: number;
  }) => Promise<void>;
  onCancel: () => void;
}

export function AddPlayerForm({
  onSubmit,
  onCancel,
}: AddPlayerFormProps) {
  const [name, setName] = useState('');
  const [skillRating, setSkillRating] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      setError('Player name is required.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await onSubmit({
        name: name.trim(),
        ...(skillRating
          ? {
              skillRating: Number(
                skillRating,
              ),
            }
          : {}),
      });

      setName('');
      setSkillRating('');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to add player',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-black/10 bg-black/[0.02] p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-bold">
            Player name
          </label>

          <input
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="e.g. Andrei"
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#FFC400] focus:ring-4 focus:ring-[#FFC400]/10"
          />
        </div>

        <div>
          <label className="text-sm font-bold">
            Skill rating
          </label>

          <input
            type="number"
            step="0.1"
            min="0"
            value={skillRating}
            onChange={(event) =>
              setSkillRating(
                event.target.value,
              )
            }
            placeholder="Optional"
            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#FFC400] focus:ring-4 focus:ring-[#FFC400]/10"
          />
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl px-4 py-3 text-sm font-bold"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#FFC400] px-5 py-3 text-sm font-bold disabled:opacity-50"
        >
          {loading
            ? 'Adding...'
            : 'Add Player'}
        </button>
      </div>
    </form>
  );
}