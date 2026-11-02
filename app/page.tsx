import Image from "next/image";
const features = [
  {
    number: '01',
    title: 'Create your session',
    description:
      'Set your session name, date, courts, and player capacity in seconds.',
  },
  {
    number: '02',
    title: 'Add your players',
    description:
      'Bring everyone into one organized session without forcing players to create accounts.',
  },
  {
    number: '03',
    title: 'Run the queue',
    description:
      'Keep matches moving and always know who is playing, waiting, and up next.',
  },
];

const benefits = [
  {
    icon: '◎',
    title: 'Multi-court',
    description: 'Manage multiple courts from one screen.',
  },
  {
    icon: '↻',
    title: 'Smart queue',
    description: 'Keep players moving without the chaos.',
  },
  {
    icon: '⌁',
    title: 'Live updates',
    description: 'Players can follow the session from their phones.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] text-[#111111]">
      {/* NAVIGATION */}
      <header className="border-b border-black/5">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Image
              src="/logo/nextpick-logo.png"
              alt="NextPick"
              width={180}
              height={50}
              priority
              className="translate-y-3"
            />
          </a>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a
              href="#how-it-works"
              className="transition hover:text-[#FFC400]"
            >
              How it works
            </a>

            <a
              href="#features"
              className="transition hover:text-[#FFC400]"
            >
              Features
            </a>

            <a
              href="#preview"
              className="transition hover:text-[#FFC400]"
            >
              Preview
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold md:block">
              Sign in
            </button>

            <a
              href="/sessions/new"
              className="flex items-center gap-3 rounded-xl bg-[#FFC400] px-5 py-3 text-sm font-bold transition hover:bg-[#eeb500]"
            >
              Get started

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111111] text-sm text-white">
                →
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-24 pt-16 lg:px-8 lg:pb-32 lg:pt-24">
        {/* Decorative background */}
        <div className="pointer-events-none absolute right-[-180px] top-[-120px] h-[500px] w-[500px] rounded-full bg-[#FFC400]/10 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

            {/* LEFT — HERO COPY */}
            <div className="relative z-10 max-w-2xl">

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#FFC400]/40 bg-[#FFC400]/10 px-4 py-2 text-sm font-semibold">
                <span className="h-2 w-2 rounded-full bg-[#FFC400]" />
                Built for pickleball open play
              </div>

              <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[82px]">
                Run open play.
                <br />
                <span className="text-[#FFC400]">
                  Keep games moving.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[#6B7280] lg:text-xl">
                NextPick helps hosts manage players, courts, the queue,
                and matches — all from one simple screen.
              </p>

              {/* CTA */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/sessions/new"
                  className="group flex items-center justify-center gap-3 rounded-2xl bg-[#FFC400] px-6 py-4 font-bold transition hover:-translate-y-0.5 hover:bg-[#eeb500]"
                >
                  Start an Open Play

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] text-white transition group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="#how-it-works"
                  className="flex items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-4 font-bold transition hover:border-black/20 hover:bg-black/[0.02]"
                >
                  See how it works
                </a>
              </div>

              {/* Benefits */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#6B7280]">
                <span>✓ No player accounts</span>
                <span>✓ Multi-court support</span>
                <span>✓ Live session view</span>
              </div>

            </div>

            {/* RIGHT — PRODUCT PREVIEW */}
            <div className="relative">

              {/* Main preview */}
              <div className="relative rounded-[28px] border border-black/10 bg-white p-4 shadow-[0_30px_80px_rgba(0,0,0,0.12)] sm:p-5">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-black/5 pb-4">
                  <div>
                    <h3 className="font-bold">
                      Saturday Open Play
                    </h3>

                    <p className="mt-1 text-xs text-[#6B7280]">
                      6 courts · 24 players · 6:00 PM
                    </p>
                  </div>

                  <span className="rounded-full bg-[#FFC400]/20 px-3 py-1.5 text-xs font-bold">
                    ● LIVE
                  </span>
                </div>

                {/* Dashboard */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2">

                  {/* Court */}
                  <div className="rounded-2xl bg-[#FFFDF7] p-4">

                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">
                        Now playing
                      </p>

                      <span className="text-xs font-bold text-[#FFC400]">
                        Court 1
                      </span>
                    </div>

                    <div className="mt-5 rounded-xl bg-white p-4 shadow-sm">

                      <div className="rounded-xl bg-[#FFC400]/10 p-3">
                        <p className="text-sm font-bold">
                          John + Mark
                        </p>
                      </div>

                      <p className="my-2 text-center text-xs font-bold text-[#9CA3AF]">
                        VS
                      </p>

                      <div className="rounded-xl bg-black/[0.03] p-3">
                        <p className="text-sm font-bold">
                          Sarah + Jane
                        </p>
                      </div>

                    </div>

                    <div className="mt-4 text-center">
                      <span className="text-2xl font-black">
                        11 - 7
                      </span>
                    </div>

                  </div>

                  {/* Queue */}
                  <div className="rounded-2xl bg-[#111111] p-4 text-white">

                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wide text-white/50">
                        Queue
                      </p>

                      <span className="text-xs font-bold text-[#FFC400]">
                        12 players
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">

                      {[
                        'Carlos',
                        'Miguel',
                        'Brian',
                        'Ryan',
                        'Andrew',
                      ].map((player, index) => (
                        <div
                          key={player}
                          className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3"
                        >
                          <span className="text-xs text-white/40">
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <span className="text-xs font-semibold">
                            {player}
                          </span>
                        </div>
                      ))}

                    </div>

                  </div>

                </div>

                {/* Courts */}
                <div className="mt-3 rounded-2xl border border-black/5 p-4">

                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">
                      Courts
                    </p>

                    <span className="text-xs text-[#6B7280]">
                      1 active
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">

                    {[
                      ['1', 'Playing'],
                      ['2', 'Next'],
                      ['3', 'Waiting'],
                      ['4', 'Waiting'],
                      ['5', 'Waiting'],
                      ['6', 'Waiting'],
                    ].map(([court, status]) => (
                      <div
                        key={court}
                        className="rounded-xl bg-[#F8F8F8] p-3 text-center"
                      >
                        <p className="text-xs font-bold">
                          Court {court}
                        </p>

                        <p
                          className={`mt-1 text-[10px] ${status === 'Playing'
                              ? 'font-bold text-[#FFC400]'
                              : 'text-[#9CA3AF]'
                            }`}
                        >
                          {status}
                        </p>
                      </div>
                    ))}

                  </div>

                </div>

              </div>

              {/* Floating status card */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-black/5 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC400] font-bold">
                    ✓
                  </div>

                  <div>
                    <p className="text-xs font-bold">
                      Session running
                    </p>

                    <p className="mt-0.5 text-[11px] text-[#6B7280]">
                      24 players checked in
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-black/5 bg-white px-6 py-8 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 text-center sm:grid-cols-3">
          <Stat value="1" label="simple session workflow" />
          <Stat value="0" label="player accounts required" />
          <Stat value="∞" label="open plays you can run" />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FFC400]">
              Built for open play
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Everything you need to keep the games moving.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#6B7280]">
              NextPick takes the manual work out of running multi-court open
              play.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl border border-black/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFC400] text-xl font-black">
                  {benefit.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold">{benefit.title}</h3>

                <p className="mt-3 leading-7 text-[#6B7280]">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-y border-black/5 bg-[#111111] px-6 py-24 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FFC400]">
              How it works
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              From setup to first match in minutes.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.number}
                className="rounded-3xl border border-white/10 bg-white/5 p-7"
              >
                <span className="text-sm font-black text-[#FFC400]">
                  {feature.number}
                </span>

                <h3 className="mt-10 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-white/60">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[32px] bg-[#FFC400] px-8 py-16 text-center sm:px-12">
          <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Ready for your next open play?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-[#111111]/70">
            Create your session, bring in your players, and let NextPick
            handle the chaos.
          </p>

          <a
            href="/sessions/new"
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#111111] px-7 py-4 font-bold text-white transition hover:-translate-y-0.5"
          >
            Create your first session

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFC400] text-[#111111]">
              →
            </span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/5 bg-white px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-[#6B7280] sm:flex-row">
          <p>
            © 2026 <span className="font-bold text-[#111111]">NextPick</span>
            . Built for open play.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-[#111111]">
              Privacy
            </a>

            <a href="#" className="hover:text-[#111111]">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <p className="text-3xl font-black tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-[#6B7280]">{label}</p>
    </div>
  );
}