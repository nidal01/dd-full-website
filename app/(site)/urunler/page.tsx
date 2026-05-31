import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  productCategoriesQuery,
  productFacetsQuery,
  productListQuery,
} from '@/sanity/lib/queries'
import { ProductCard } from '@/components/cards/ProductCard'
import { CategoryFilter } from '@/components/products/CategoryFilter'
import { FilterDrawer } from '@/components/products/FilterDrawer'
import { ActiveFilters } from '@/components/products/ActiveFilters'
import { Reveal } from '@/components/ui/Reveal'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Ürünler',
  description: 'Lüks karton, rijit kutu, etiket ve premium ambalaj koleksiyonumuz.',
}

type Search = {
  kategori?: string
  q?: string
  malzeme?: string | string[]
  lake?: string | string[]
  cevre?: string | string[]
}

function arr(v?: string | string[]) {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Search>
}) {
  const sp = await searchParams
  const filters = {
    kategori: sp.kategori,
    q: sp.q,
    malzeme: arr(sp.malzeme),
    lake: arr(sp.lake),
    cevre: arr(sp.cevre),
  }

  const [productsRaw, categoriesRaw, facetsRaw] = await Promise.all([
    sanityFetch<any[]>(productListQuery, {}, { tags: ['product'] }),
    sanityFetch<any[]>(productCategoriesQuery, {}, { tags: ['productCategory'] }),
    sanityFetch<{ materials: string[]; finishes: string[]; sustainability: string[] }>(
      productFacetsQuery,
      {},
      { tags: ['product'] }
    ),
  ])

  const products = productsRaw ?? []
  const categories = categoriesRaw ?? []
  const facets = facetsRaw ?? { materials: [], finishes: [], sustainability: [] }

  const filtered = products.filter((p) => {
    if (filters.kategori && p.category?.slug !== filters.kategori) return false
    if (filters.q) {
      const needle = filters.q.toLocaleLowerCase('tr-TR')
      const hay = `${p.title} ${p.tagline ?? ''}`.toLocaleLowerCase('tr-TR')
      if (!hay.includes(needle)) return false
    }
    if (filters.malzeme.length && !filters.malzeme.some((m) => (p.materials ?? []).includes(m)))
      return false
    if (filters.lake.length && !filters.lake.some((l) => (p.finishOptions ?? []).includes(l)))
      return false
    if (
      filters.cevre.length &&
      !filters.cevre.some((c) => (p.sustainabilityTags ?? []).includes(c))
    )
      return false
    return true
  })

  const drawerActive =
    filters.malzeme.length + filters.lake.length + filters.cevre.length

  return (
    <>
      <section className="container-premium pb-12 pt-16 md:pt-24">
        <div className="eyebrow mb-6">Koleksiyon</div>
        <h1 className="max-w-4xl font-display text-display-xl tracking-tightest text-balance">
          Markanızı taşıyan
          <span className="text-gold"> her detay </span>
          ustalıkla işlenmiş.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-titanium-600 dark:text-titanium-400">
          Lüks karton, rijit set-up kutu, etiket ve özel uygulamalardan oluşan premium ambalaj koleksiyonumuz.
        </p>
      </section>

      {/* Filter bar */}
      <section className="container-premium sticky top-24 z-30 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <CategoryFilter categories={categories} active={filters.kategori} total={filtered.length} />
          <FilterDrawer facets={facets} activeCount={drawerActive} />
        </div>
      </section>

      <section className="container-premium">
        <ActiveFilters />
      </section>

      <section className="container-premium pb-32 pt-6">
        {filtered.length === 0 ? (
          <div className="grid place-items-center rounded-2xl border border-dashed border-titanium-300 py-32 text-center dark:border-ink-700">
            <div>
              <div className="eyebrow mb-3">Sonuç yok</div>
              <p className="text-titanium-500">Bu filtreler için ürün bulunamadı.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p._id} delay={(i % 6) * 0.05}>
                <ProductCard product={p} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
