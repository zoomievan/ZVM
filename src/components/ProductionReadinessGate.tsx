import { AlertTriangle, ExternalLink } from 'lucide-react';

export default function ProductionReadinessGate() {
  return (
    <main className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="max-w-xl rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="font-display text-2xl font-bold text-white">
          Production backend is not connected
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-dark-200">
          This deployment is missing its production Clerk or Convex configuration.
          Connect both services and deploy the authenticated backend before accepting customer data.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-amber-500/30 px-4 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-500/10"
        >
          Review setup
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </main>
  );
}
