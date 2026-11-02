'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useSession } from '@/features/sessions/hooks/useSession';
import { SessionDashboard } from '@/features/sessions/components/SessionDashboard';

export default function SessionPage() {
  const params = useParams<{ id: string }>();

  const {
    session,
    loading,
    error,
  } = useSession(params.id);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFFDF7]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="h-[700px] animate-pulse rounded-[32px] bg-black/5" />
        </div>
      </main>
    );
  }

  if (error || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFFDF7] px-6">
        <div className="text-center">
          <h1 className="text-2xl font-black">
            Session not found
          </h1>

          <p className="mt-3 text-sm text-[#6B7280]">
            {error ?? 'We could not find this session.'}
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
            className="text-sm font-semibold text-[#6B7280] transition hover:text-[#111111]"
          >
            Exit session
          </Link>
        </div>
      </header>

      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <SessionDashboard session={session} />
        </div>
      </section>
    </main>
  );
}