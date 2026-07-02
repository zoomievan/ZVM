function SkeletonPulse({ className }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-lg ${className ?? ''}`} />;
}

export default function LandingSkeleton() {
  return (
    <div className="relative bg-dark-900 min-h-screen">
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-dark-700/50 bg-dark-900/80 px-6 backdrop-blur">
        <SkeletonPulse className="h-8 w-32" />
        <div className="hidden gap-6 md:flex">
          <SkeletonPulse className="h-4 w-16" />
          <SkeletonPulse className="h-4 w-20" />
          <SkeletonPulse className="h-4 w-14" />
        </div>
        <SkeletonPulse className="h-9 w-24 rounded-full" />
      </div>

      {/* Hero skeleton */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <SkeletonPulse className="mx-auto mb-6 h-5 w-40 rounded-full" />
          <SkeletonPulse className="mx-auto mb-4 h-14 w-full max-w-xl" />
          <SkeletonPulse className="mx-auto mb-4 h-14 w-3/4 max-w-lg" />
          <SkeletonPulse className="mx-auto mb-8 h-5 w-full max-w-md" />
          <div className="flex justify-center gap-4">
            <SkeletonPulse className="h-12 w-40 rounded-full" />
            <SkeletonPulse className="h-12 w-36 rounded-full" />
          </div>
        </div>
      </section>

      {/* Why section skeleton */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SkeletonPulse className="mb-4 h-5 w-28 rounded-full" />
              <SkeletonPulse className="mb-3 h-10 w-full" />
              <SkeletonPulse className="mb-3 h-10 w-4/5" />
              <SkeletonPulse className="mb-6 h-4 w-full" />
              <SkeletonPulse className="mb-2 h-4 w-full" />
              <SkeletonPulse className="mb-8 h-4 w-3/4" />
              <div className="flex gap-3">
                <SkeletonPulse className="h-10 w-36 rounded-full" />
                <SkeletonPulse className="h-10 w-36 rounded-full" />
              </div>
            </div>
            <div className="flex justify-center">
              <SkeletonPulse className="h-80 w-full max-w-md rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works skeleton */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SkeletonPulse className="mx-auto mb-4 h-5 w-32 rounded-full" />
          <SkeletonPulse className="mx-auto mb-3 h-10 w-64" />
          <SkeletonPulse className="mx-auto mb-12 h-4 w-80" />
          <div className="grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-dark-700/50 bg-dark-800/50 p-6">
                <SkeletonPulse className="mb-4 h-12 w-12 rounded-xl" />
                <SkeletonPulse className="mb-2 h-6 w-3/4" />
                <SkeletonPulse className="mb-1 h-4 w-full" />
                <SkeletonPulse className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Now skeleton */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SkeletonPulse className="mx-auto mb-4 h-5 w-28 rounded-full" />
          <SkeletonPulse className="mx-auto mb-3 h-10 w-48" />
          <SkeletonPulse className="mx-auto mb-12 h-4 w-72" />
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-dark-700/50 bg-dark-800/50 p-8">
              <div className="mb-6 flex justify-center gap-3">
                <SkeletonPulse className="h-8 w-24 rounded-full" />
                <SkeletonPulse className="h-8 w-24 rounded-full" />
                <SkeletonPulse className="h-8 w-24 rounded-full" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <SkeletonPulse className="h-28 rounded-xl" />
                <SkeletonPulse className="h-28 rounded-xl" />
                <SkeletonPulse className="h-28 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer skeleton */}
      <footer className="border-t border-dark-700/50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <SkeletonPulse className="mb-4 h-7 w-28" />
              <SkeletonPulse className="mb-2 h-4 w-48" />
              <SkeletonPulse className="h-4 w-36" />
            </div>
            <div>
              <SkeletonPulse className="mb-4 h-5 w-20" />
              <SkeletonPulse className="mb-2 h-4 w-24" />
              <SkeletonPulse className="mb-2 h-4 w-28" />
              <SkeletonPulse className="h-4 w-20" />
            </div>
            <div>
              <SkeletonPulse className="mb-4 h-5 w-28" />
              <SkeletonPulse className="h-10 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
