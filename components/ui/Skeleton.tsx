import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-titanium-200/50 dark:bg-ink-800/60',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:animate-shimmer before:bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)]',
        className
      )}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-titanium-200/60 dark:border-ink-700">
      <Skeleton className="aspect-[4/5] rounded-none" />
    </div>
  )
}

export function NewsCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[16/10]" />
      <div className="mt-6 space-y-3">
        <Skeleton className="h-3 w-1/3 rounded-full" />
        <Skeleton className="h-6 w-5/6 rounded-md" />
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-3/4 rounded-full" />
      </div>
    </div>
  )
}
