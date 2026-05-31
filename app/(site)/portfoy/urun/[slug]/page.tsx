import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Mail, Phone } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/fetch'
import { productBySlugQuery, productsByCategoryQuery } from '@/sanity/lib/queries'
import { resolveProductImageUrl } from '@/lib/productImage'
import {
  allWpProducts,
  getWpProductBySlug,
  wpProductsByCategory,
  type WpProduct,
} from '@/lib/wpProducts'
import { WpPageShell, CtaBlock } from '@/components/sections/WpPageShell'
import { Reveal } from '@/components/ui/Reveal'

type Params = { slug: string }

export const revalidate = 60

/**
 * Build sırasında bilinen tüm slug'lar — Sanity'deki güncel slug'lar build
 * zamanında client çağrısı ile alınamıyorsa statik WP listesi her zaman
 * çalışır.
 */
export function generateStaticParams(): Params[] {
  return allWpProducts.map((p) => ({ slug: p.slug }))
}

type NormalizedProduct = {
  _id?: string
  slug: string
  title: string
  tagline?: string
  summary?: string
  coverImage?: any
  externalImageUrl?: string | null
  category?: { title?: string; slug?: string }
  materials?: string[]
  finishOptions?: string[]
  sustainabilityTags?: string[]
}

function fromWp(p: WpProduct): NormalizedProduct {
  return {
    _id: p.slug,
    slug: p.slug,
    title: p.title,
    externalImageUrl: p.image,
    category: { title: p.categoryTitle, slug: p.category },
  }
}

async function loadProduct(slug: string): Promise<{
  product: NormalizedProduct | null
  siblings: NormalizedProduct[]
}> {
  const fromSanity = await sanityFetch<any>(productBySlugQuery, { slug }, { tags: [`product-${slug}`] })

  if (fromSanity) {
    const catSlug = fromSanity.category?.slug
    const sanitySiblings = catSlug
      ? await sanityFetch<any[]>(
          productsByCategoryQuery,
          { slug: catSlug },
          { tags: [`product-category-${catSlug}`] }
        )
      : []
    const siblings = (sanitySiblings ?? []).filter((s) => s.slug !== slug).slice(0, 6)

    // Sibling listesi Sanity'de boşsa statik WP'den doldur
    const wpFallbackSiblings =
      siblings.length === 0 && catSlug
        ? (wpProductsByCategory as any)[catSlug]
            ?.filter((p: WpProduct) => p.slug !== slug)
            .slice(0, 6)
            .map(fromWp) ?? []
        : []

    return { product: fromSanity, siblings: siblings.length ? siblings : wpFallbackSiblings }
  }

  // Sanity yoksa statik veri
  const wp = getWpProductBySlug(slug)
  if (!wp) return { product: null, siblings: [] }
  const siblings = wpProductsByCategory[wp.category]
    .filter((p) => p.slug !== wp.slug)
    .slice(0, 6)
    .map(fromWp)
  return { product: fromWp(wp), siblings }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const { product } = await loadProduct(slug)
  if (!product) return { title: 'Ürün bulunamadı' }
  const catTitle = product.category?.title ?? ''
  return {
    title: `${product.title}${catTitle ? ` · ${catTitle} Ambalaj` : ''}`,
    description:
      product.summary ??
      `${catTitle} sektörü için premium ambalaj tasarımımız: ${product.title}. Markanıza özel benzer projeler için bizimle iletişime geçin.`,
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const { product, siblings } = await loadProduct(slug)
  if (!product) notFound()

  const img = resolveProductImageUrl(product, { width: 1600 })
  const heroUrl = img?.url
  const catTitle = product.category?.title ?? 'Portföy'
  const catSlug = product.category?.slug ?? 'butik'

  return (
    <WpPageShell
      eyebrow={catTitle}
      heading={product.title}
      subheading={
        product.tagline ??
        `${catTitle} sektörü için tasarlanmış premium katlanır karton ambalaj uygulaması.`
      }
      heroImage={heroUrl}
      ctas={[
        { label: 'Benzer Bir Proje', href: '/iletisim', variant: 'primary' },
        { label: 'Kategoriye Dön', href: `/portfoy/${catSlug}`, variant: 'secondary' },
      ]}
    >
      {/* DETAY */}
      <section className="container-premium py-20">
        <Link
          href={`/portfoy/${catSlug}`}
          className="inline-flex items-center gap-2 text-sm text-titanium-600 transition-colors hover:text-gold dark:text-titanium-400"
        >
          <ArrowLeft size={14} /> {catTitle} portföyüne dön
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-titanium-200/60 bg-titanium-100 dark:border-ink-700 dark:bg-ink-900">
            {heroUrl && (
              <Image
                src={heroUrl}
                alt={product.title}
                fill
                unoptimized={img?.isExternal}
                priority
                sizes="(min-width:1024px) 60vw, 100vw"
                className="object-cover"
              />
            )}
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="rounded-3xl border border-titanium-200/60 bg-titanium-50 p-8 dark:border-ink-700 dark:bg-ink-900/40">
              <div className="eyebrow mb-3">{catTitle}</div>
              <h2 className="font-display text-display-md tracking-tightest text-balance">
                {product.title}
              </h2>
              <p className="mt-4 text-titanium-600 dark:text-titanium-400">
                {product.summary ??
                  'Markanıza özel ölçü, baskı tekniği ve son işlem seçenekleriyle bu ürünü prototipleyip seri üretime ölçeklendirebiliriz. ECMA GMP ve BRCGS PM uyumlu üretim hattımızda her parti uçtan uca izlenebilir.'}
              </p>

              {/* Etiketler */}
              {(product.materials?.length ||
                product.finishOptions?.length ||
                product.sustainabilityTags?.length) && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.sustainabilityTags?.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-gold/40 bg-gold/5 px-3 py-1 text-xs uppercase tracking-eyebrow text-gold"
                    >
                      {t}
                    </span>
                  ))}
                  {product.materials?.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-titanium-300 px-3 py-1 text-xs text-titanium-700 dark:border-ink-700 dark:text-titanium-300"
                    >
                      {t}
                    </span>
                  ))}
                  {product.finishOptions?.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-titanium-300 px-3 py-1 text-xs text-titanium-700 dark:border-ink-700 dark:text-titanium-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <Link
                href="/iletisim"
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 text-sm font-medium text-titanium-50 transition-all hover:bg-gold-700 hover:shadow-gold-glow"
              >
                Benzer Proje İçin Teklif Al
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-8">
              <div className="eyebrow !text-gold mb-4">Doğrudan iletişim</div>
              <div className="space-y-3 text-sm">
                <a
                  href="mailto:info@durandogan.com"
                  className="flex items-center gap-3 text-titanium-700 hover:text-gold dark:text-titanium-300"
                >
                  <Mail size={16} className="text-gold" /> info@durandogan.com
                </a>
                <a
                  href="tel:+902127714606"
                  className="flex items-center gap-3 text-titanium-700 hover:text-gold dark:text-titanium-300"
                >
                  <Phone size={16} className="text-gold" /> +90 212 771 46 06
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SIBLINGS */}
      {siblings.length > 0 && (
        <section className="border-t border-titanium-200/60 bg-titanium-50/50 py-20 dark:border-ink-700 dark:bg-ink-900/30">
          <div className="container-premium">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="eyebrow mb-3">Bu kategoriden</div>
                <h2 className="font-display text-display-md tracking-tightest text-balance">
                  Benzer {catTitle} projelerimiz.
                </h2>
              </div>
              <Link
                href={`/portfoy/${catSlug}`}
                className="text-sm text-gold underline-offset-4 hover:underline"
              >
                Tümünü gör →
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {siblings.map((s, i) => {
                const sImg = resolveProductImageUrl(s, { width: 400, height: 400 })
                return (
                  <Reveal
                    key={s._id ?? s.slug}
                    delay={i * 0.04}
                    as="article"
                    className="group overflow-hidden rounded-xl border border-titanium-200/60 bg-titanium-50 transition-all hover:border-gold/50 dark:border-ink-700 dark:bg-ink-900/40"
                  >
                    <Link href={`/portfoy/urun/${s.slug}`} className="block">
                      <div className="relative aspect-square overflow-hidden bg-titanium-100 dark:bg-ink-900">
                        {sImg && (
                          <Image
                            src={sImg.url}
                            alt={s.title}
                            fill
                            unoptimized={sImg.isExternal}
                            sizes="(min-width:1024px) 16vw, (min-width:640px) 33vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="font-display text-sm tracking-tightest">{s.title}</h3>
                      </div>
                    </Link>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <CtaBlock
        eyebrow="Birlikte üretelim"
        heading="Markanız için bu kalitede özel bir ambalaj tasarlayalım."
        cta={{ label: 'Teklif Alın', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
