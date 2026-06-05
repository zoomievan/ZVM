import { cn } from '../utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
}

export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  const baseClass = 'skeleton-shimmer rounded';

  const variants = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-2xl',
  };

  return <div className={cn(baseClass, variants[variant], className)} />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-dark-600 bg-dark-800 p-6 space-y-4">
      <Skeleton className="h-48 w-full" variant="card" />
      <Skeleton variant="text" className="h-6 w-3/4" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-5/6" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}

export function PricingSkeleton() {
  return (
    <div className="rounded-2xl border border-dark-600 bg-dark-800 p-8 space-y-6">
      <div className="space-y-2">
        <Skeleton variant="text" className="h-5 w-24" />
        <Skeleton variant="text" className="h-10 w-32" />
        <Skeleton variant="text" className="h-4 w-48" />
      </div>
      <Skeleton className="h-12 w-full rounded-xl" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-3 items-center">
            <Skeleton variant="circular" className="h-5 w-5" />
            <Skeleton variant="text" className="h-4 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="rounded-2xl border border-dark-600 bg-dark-800 p-6 space-y-4">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="circular" className="h-5 w-5" />
        ))}
      </div>
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-3/4" />
      <div className="flex gap-3 items-center pt-2">
        <Skeleton variant="circular" className="h-10 w-10" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="h-4 w-28" />
          <Skeleton variant="text" className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}
