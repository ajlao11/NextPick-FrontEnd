import { GameFormat } from '../types/session.types';

interface GameFormatSelectorProps {
  value: GameFormat;
  onChange: (value: GameFormat) => void;
}

export function GameFormatSelector({
  value,
  onChange,
}: GameFormatSelectorProps) {
  return (
    <div className="mt-8">
      <label className="text-sm font-bold">
        Game format
      </label>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <FormatOption
          selected={value === 'SINGLES'}
          onClick={() => onChange('SINGLES')}
          title="Singles"
          description="1 vs 1"
        />

        <FormatOption
          selected={value === 'DOUBLES'}
          onClick={() => onChange('DOUBLES')}
          title="Doubles"
          description="2 vs 2"
        />
      </div>
    </div>
  );
}

function FormatOption({
  selected,
  onClick,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${
        selected
          ? 'border-[#FFC400] bg-[#FFC400]/10 ring-2 ring-[#FFC400]/20'
          : 'border-black/10 bg-white hover:bg-black/[0.02]'
      }`}
    >
      <p className="font-black">{title}</p>

      <p className="mt-1 text-sm text-[#6B7280]">
        {description}
      </p>
    </button>
  );
}