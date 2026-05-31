import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import { Skeleton } from '@/components/ui/Skeleton'

export default function ProductsLoading() {
  return (
    <>
      <section className="container-premium pb-12 pt-16 md:pt-24">
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="mt-6 h-16 w-3/4 rounded-md" />
        <Skeleton className="mt-4 h-16 w-2/3 rounded-md" />
        <Skeleton className="mt-8 h-4 w-1/2 rounded-full" />
      </section>
      <section className="container-premium mb-8">
        <Skeleton className="h-14 w-full max-w-3xl rounded-full" />
      </section>
      <section className="container-premium pb-32">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </>
  )
}
