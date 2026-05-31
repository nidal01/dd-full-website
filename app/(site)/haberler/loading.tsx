import { NewsCardSkeleton, Skeleton } from '@/components/ui/Skeleton'

export default function NewsLoading() {
  return (
    <>
      <section className="container-premium pb-12 pt-16 md:pt-24">
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="mt-6 h-16 w-3/4 rounded-md" />
      </section>
      <section className="container-premium pb-16">
        <Skeleton className="aspect-[16/10] w-full" />
        <div className="mt-6 space-y-3">
          <Skeleton className="h-3 w-1/3 rounded-full" />
          <Skeleton className="h-10 w-2/3 rounded-md" />
        </div>
      </section>
      <section className="container-premium pb-32">
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </>
  )
}
