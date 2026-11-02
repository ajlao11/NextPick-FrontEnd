export function SessionEmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-black/15 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFC400] text-2xl">
        🏓
      </div>

      <h2 className="mt-5 text-2xl font-black tracking-tight">
        Your session is ready
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6B7280]">
        Add your players to start organizing your open play.
      </p>

      <button className="mt-7 rounded-xl bg-[#FFC400] px-6 py-3.5 font-bold transition hover:bg-[#eeb500]">
        Add Players
      </button>
    </div>
  );
}