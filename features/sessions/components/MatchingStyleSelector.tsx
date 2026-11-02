import { MatchingStyle } from '../types/session.types';

interface MatchingStyleSelectorProps {
  value: MatchingStyle;
  onChange: (value: MatchingStyle) => void;
}

const MATCHING_STYLES: {
  value: MatchingStyle;
  title: string;
  description: string;
}[] = [
    {
      value: 'RANDOM_ROUND_ROBIN',
      title: 'Random Round Robin',
      description:
        'Rotate players while avoiding repeat partners.',
    },
    {
      value: 'WINNERS_LOSERS',
      title: 'Winners & Losers',
      description:
        'Winners play winners and losers play losers.',
    },
    {
      value: 'KING_OF_THE_COURT',
      title: 'King of the Court',
      description:
        'Winners climb the courts while losers move down.',
    },
    {
      value: 'WINNER_STAYS',
      title: 'Winner Stays',
      description:
        'Winners stay on court while challengers rotate in.',
    },
    {
      value: 'BALANCED_SKILL',
      title: 'Balanced Skill',
      description:
        'Create competitive games based on player skill.',
    },
  ];

export function MatchingStyleSelector({
  value,
  onChange,
}: MatchingStyleSelectorProps) {
  return (
    <div className="mt-8">
      <label className="text-sm font-bold">
        Matching making mode
      </label>

      <div className="mt-3 space-y-3">
        {MATCHING_STYLES.map((style) => (
          <button
            key={style.value}
            type="button"
            disabled={style.value !== 'RANDOM_ROUND_ROBIN'}
            onClick={() => onChange(style.value)}
            className={`w-full rounded-2xl border p-5 text-left transition ${value === style.value
              ? 'border-[#FFC400] bg-[#FFC400]/10 ring-2 ring-[#FFC400]/20'
              : 'border-black/10 bg-white hover:bg-black/[0.02]'
              } ${style.value !== 'RANDOM_ROUND_ROBIN'
                ? 'cursor-not-allowed opacity-50'
                : ''
              }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${value === style.value
                  ? 'border-[#FFC400]'
                  : 'border-black/20'
                  }`}
              >
                {value === style.value && (
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FFC400]" />
                )}
              </div>

              <div>
                <p className="font-black">
                  {style.title}
                </p>

                <p className="mt-1 text-sm leading-5 text-[#6B7280]">
                  {style.description}
                </p>

                {style.value !== 'RANDOM_ROUND_ROBIN' && (
                  <span className="shrink-0 rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#6B7280]">
                    Coming soon
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}