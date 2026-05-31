import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/fetch'
import { productsByCategoryQuery } from '@/sanity/lib/queries'
import { ProductCard } from '@/components/cards/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { wpProductsByCategory, wpCategoryMeta, type WpProductCategory } from '@/lib/wpProducts'
import { WpPageShell, CtaBlock } from './WpPageShell'

type Props = {
  category: string
  /** Sanity productCategory slug + static dataset anahtarı (ör. 'butik') */
  categorySlug: WpProductCategory
  intro?: string
  heroImage?: string
  highlights: string[]
}

/**
 * Strateji:
 *   1. Sanity'den ürünleri çek (productsByCategoryQuery).
 *   2. Sanity boşsa, statik wpProducts.ts'i fallback olarak kullan.
 *   3. Her iki kaynak da aynı ProductCard ile render edilir
 *      (externalImageUrl / coverImage otomatik resolve).
 */
export async function PortfolioCategoryPage({
  category,
  categorySlug,
  intro,
  heroImage,
  highlights,
}: Props) {
  const sanityProducts = await sanityFetch<any[]>(
    productsByCategoryQuery,
    { slug: categorySlug },
    { tags: ['product', `product-category-${categorySlug}`] }
  )

  const fallback = wpProductsByCategory[categorySlug] ?? []
  const meta = wpCategoryMeta[categorySlug]

  // Sanity + WP birleşimi (slug ile dedupe). Aynı slug varsa Sanity kazanır.
  const sanitySlugs = new Set((sanityProducts ?? []).map((s) => s.slug))
  const wpNormalized = fallback
    .filter((p) => !sanitySlugs.has(p.slug))
    .map((p) => ({
      _id: p.slug,
      slug: p.slug,
      title: p.title,
      externalImageUrl: p.image,
      category: { title: p.categoryTitle, slug: p.category },
    }))
  const products = [...(sanityProducts ?? []), ...wpNormalized]

  const finalIntro = intro ?? meta.intro
  const finalHeroImage = heroImage ?? fallback[0]?.image

  return (
    <WpPageShell
      eyebrow="Portföyümüz"
      heading={`${category} ambalaj çözümlerimiz.`}
      subheading={finalIntro}
      heroImage={finalHeroImage}
      ctas={[
        { label: 'Tüm Portföy', href: '/portfoy', variant: 'secondary' },
        { label: 'Teklif Alın', href: '/iletisim', variant: 'primary' },
      ]}
    >
      {/* HIGHLIGHTS */}
      <section className="container-premium py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="eyebrow mb-4">
              {category} · {products.length} ürün
            </div>
            <h2 className="font-display text-display-md tracking-tightest text-balance">
              Sektörünüz için tasarlanmış, raf etkisi yüksek premium ambalajlar.
            </h2>
          </div>
          <ul className="space-y-4">
            {highlights.map((h, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-2xl border border-titanium-200/60 bg-titanium-50 p-6 dark:border-ink-700 dark:bg-ink-900/40"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/5 text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-base leading-relaxed text-titanium-700 dark:text-titanium-300">
                  {h}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="border-t border-titanium-200/60 bg-titanium-50/50 py-24 dark:border-ink-700 dark:bg-ink-900/30">
        <div className="container-premium">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow mb-4">Bu Kategorideki Ürünler</div>
              <h2 className="max-w-3xl font-display text-display-lg tracking-tightest text-balance">
                {category} portföyümüz · {products.length} ürün.
              </h2>
            </div>
            <Link
              href="/portfoy"
              className="text-sm text-gold underline-offset-4 hover:underline"
            >
              Tüm kategoriler →
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p._id ?? p.slug ?? i} delay={(i % 9) * 0.04}>
                <ProductCard product={p} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock
        eyebrow="Birlikte üretelim"
        heading={`${category} sektörü için özel ambalaj projesi tasarlayalım.`}
        cta={{ label: 'Teklif Alın', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
