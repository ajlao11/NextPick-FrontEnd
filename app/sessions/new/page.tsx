import Image from 'next/image';
import { CreateSessionForm } from '@/features/sessions/components/CreateSessionForm';

export default function NewSessionPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] text-[#111111]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="/" className="flex items-center">
            <Image
              src="/logo/nextpick-logo.png"
              alt="NextPick"
              width={180}
              height={50}
              priority
              className="translate-y-1"
            />
          </a>

          <a
            href="/"
            className="text-sm font-semibold text-[#6B7280] transition hover:text-[#111111]"
          >
            Cancel
          </a>
        </div>
      </header>

      <section className="px-6 py-12 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FFC400]">
              New session
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Create an open play
            </h1>

            <p className="mt-4 text-lg leading-7 text-[#6B7280]">
              Set up your session and get your courts ready for play.
            </p>
          </div>

          <CreateSessionForm />
        </div>
      </section>
    </main>
  );
}