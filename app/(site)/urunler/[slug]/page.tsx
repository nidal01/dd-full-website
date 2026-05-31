import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ChevronRight, Download, FileText, Leaf, Package2 } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/fetch'
import { productBySlugQuery, productListQuery } from '@/sanity/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { ProductGallery } from '@/components/products/ProductGallery'
import { ProductCard } from '@/components/cards/ProductCard'
import { PortableText } from '@/components/ui/PortableText'
import { CtaLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { JsonLd, breadcrumbJsonLd, productJsonLd } from '@/components/seo/JsonLd'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://durandogan.com'

export const revalidate = 60

export async function generateStaticParams() {
  const list = await sanityFetch<Array<{ slug: string }>>(productListQuery)
  return list.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = await sanityFetch<any>(productBySlugQuery, { slug }, { tags: ['product', `product:${slug}`] })
  if (!data) return {}
  return buildMetadata(data.seo, {
    title: data.title,
    description: data.tagline ?? data.summary,
  })
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await sanityFetch<any>(productBySlugQuery, { slug }, {
    tags: ['product', `product:${slug}`],
  })
  if (!product) notFound()

  const specsByGroup = (product.specs ?? []).reduce<Record<string, any[]>>((acc, s: any) => {
    const g = s.group ?? 'Genel'
    acc[g] = acc[g] ?? []
    acc[g].push(s)
    return acc
  }, {})

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(product),
          breadcrumbJsonLd([
            { name: 'Ana Sayfa', url: BASE },
            { name: 'Ürünler', url: `${BASE}/urunler` },
            ...(product.category
              ? [{ name: product.category.title, url: `${BASE}/urunler?kategori=${product.category.slug}` }]
              : []),
            { name: product.title, url: `${BASE}/urunler/${product.slug}` },
          ]),
        ]}
      />
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container-premium pt-12">
        <ol className="flex items-center gap-2 text-xs uppercase tracking-eyebrow text-titanium-500">
          <li><Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link></li>
          <ChevronRight size={12} />
          <li><Link href="/urunler" className="hover:text-gold transition-colors">Ürünler</Link></li>
          {product.category?.title && (
            <>
              <ChevronRight size={12} />
              <li>
                <Link
                  href={`/urunler?kategori=${product.category.slug}`}
                  className="hover:text-gold transition-colors"
                >
                  {product.category.title}
                </Link>
              </li>
            </>
          )}
          <ChevronRight size={12} />
          <li className="text-ink dark:text-titanium-100">{product.title}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="container-premium grid grid-cols-1 gap-16 py-16 lg:grid-cols-2">
        <ProductGallery cover={product.coverImage} items={product.gallery} title={product.title} />

        <Reveal className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
          {product.category?.title && (
            <div className="eyebrow">{product.category.title}</div>
          )}
          <h1 className="font-display text-display-xl tracking-tightest text-balance">
            {product.title}
          </h1>
          {product.tagline && (
            <p className="text-xl text-titanium-600 dark:text-titanium-300">{product.tagline}</p>
          )}

          {product.highlights && product.highlights.length > 0 && (
            <ul className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {product.highlights.map((h: string, i: number) => (
                <li key={i} className="flex items-start gap-3 rounded-xl border border-titanium-200/60 bg-titanium-50/50 p-4 dark:border-ink-700 dark:bg-ink-900/40">
                  <Check className="mt-0.5 shrink-0 text-gold" size={18} />
                  <span className="text-sm">{h}</span>
                </li>
              ))}
            </ul>
          )}

          {product.sustainabilityTags && product.sustainabilityTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Leaf size={16} className="text-gold" />
              {product.sustainabilityTags.map((t: string) => (
                <span
                  key={t}
                  className="rounded-full border border-gold/40 bg-gold/5 px-3 py-1 text-xs uppercase tracking-eyebrow text-gold"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <CtaLink href="/iletisim" variant="primary" size="lg" withArrow>
              Teklif İste
            </CtaLink>
            <CtaLink href="/iletisim" variant="secondary" size="lg">
              Numune Talep Et
            </CtaLink>
          </div>

          {product.moq?.quantity && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-titanium-200/60 bg-titanium-50/40 p-4 dark:border-ink-700 dark:bg-ink-900/40">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold">
                <Package2 size={18} />
              </span>
              <div>
                <div className="eyebrow">Min. Sipariş</div>
                <div className="font-display text-lg tracking-tightest">
                  {product.moq.quantity.toLocaleString('tr-TR')} {product.moq.unit ?? 'adet'}
                  {product.moq.notes && (
                    <span className="ml-2 text-sm font-normal text-titanium-500">
                      ({product.moq.notes})
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </section>

      {/* Description */}
      {product.description && (
        <section className="container-premium grid grid-cols-1 gap-16 py-20 lg:grid-cols-[1fr_2fr]">
          <div className="eyebrow lg:sticky lg:top-32 lg:self-start">Detaylar</div>
          <article className="max-w-prose">
            <PortableText value={product.description} />
          </article>
        </section>
      )}

      {/* Specs */}
      {Object.keys(specsByGroup).length > 0 && (
        <section className="border-y border-titanium-200/60 bg-titanium-50/50 py-24 dark:border-ink-700 dark:bg-ink-900/30">
          <div className="container-premium">
            <div className="eyebrow mb-4">Teknik Özellikler</div>
            <h2 className="mb-12 font-display text-display-lg tracking-tightest">Spesifikasyonlar</h2>
            <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2">
              {Object.entries(specsByGroup).map(([group, rows]) => (
                <div key={group}>
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-eyebrow text-gold">{group}</h3>
                  <dl className="divide-y divide-titanium-200/60 dark:divide-ink-700">
                    {rows.map((r, i) => (
                      <div key={i} className="grid grid-cols-2 gap-4 py-3 text-sm">
                        <dt className="text-titanium-500">{r.label}</dt>
                        <dd className="text-right font-medium">{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Customization */}
      {product.customization && product.customization.length > 0 && (
        <section className="container-premium py-24">
          <div className="eyebrow mb-4">Kişiselleştirme</div>
          <h2 className="mb-12 font-display text-display-lg tracking-tightest">
            Her detay markanıza özel
          </h2>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-titanium-200/60 bg-titanium-200/60 sm:grid-cols-2 lg:grid-cols-3 dark:border-ink-700 dark:bg-ink-700">
            {product.customization.map((c: any, i: number) => (
              <div
                key={i}
                className="flex flex-col gap-4 bg-titanium-50 p-8 dark:bg-ink-900"
              >
                <h3 className="font-display text-xl tracking-tightest">{c.label}</h3>
                {c.description && (
                  <p className="text-sm text-titanium-600 dark:text-titanium-400">{c.description}</p>
                )}
                {c.options && c.options.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {c.options.map((o: string) => (
                      <span
                        key={o}
                        className="rounded-full border border-titanium-300 px-3 py-1 text-xs text-titanium-700 dark:border-ink-700 dark:text-titanium-300"
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Downloads */}
      {product.downloads && product.downloads.length > 0 && (
        <section className="container-premium py-20">
          <div className="eyebrow mb-4">İndirilebilir Dosyalar</div>
          <h2 className="mb-12 font-display text-display-lg tracking-tightest">
            Teknik dokümanlar
          </h2>
          <ul className="divide-y divide-titanium-200/60 overflow-hidden rounded-2xl border border-titanium-200/60 dark:divide-ink-700 dark:border-ink-700">
            {product.downloads.map((d: any, i: number) => (
              <li key={i}>
                <a
                  href={d.file?.asset?.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 bg-titanium-50/40 px-6 py-5 transition-colors hover:bg-gold/5 dark:bg-ink-900/40"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold/40 bg-gold/5 text-gold">
                    <FileText size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{d.label}</div>
                    <div className="text-xs uppercase tracking-eyebrow text-titanium-500">
                      {d.kind === 'datasheet'
                        ? 'Teknik Föy'
                        : d.kind === 'brandguide'
                        ? 'Brand Guide'
                        : d.kind === 'cad'
                        ? 'CAD / Dieline'
                        : 'Doküman'}
                      {d.sizeNote && ` · ${d.sizeNote}`}
                    </div>
                  </div>
                  <Download
                    size={18}
                    className="text-titanium-500 transition-all group-hover:translate-y-0.5 group-hover:text-gold"
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <section className="container-premium py-32">
          <h2 className="mb-12 font-display text-display-lg tracking-tightest">Yakın koleksiyondan</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.relatedProducts.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
