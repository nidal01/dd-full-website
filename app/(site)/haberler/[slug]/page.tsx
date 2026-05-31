import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/fetch'
import { newsBySlugQuery, newsListQuery } from '@/sanity/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@/components/ui/PortableText'
import { NewsCard } from '@/components/cards/NewsCard'
import { ProductCard } from '@/components/cards/ProductCard'
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://durandogan.com'

export const revalidate = 60

export async function generateStaticParams() {
  const list = await sanityFetch<Array<{ slug: string }>>(newsListQuery)
  return list.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = await sanityFetch<any>(newsBySlugQuery, { slug })
  if (!data) return {}
  return buildMetadata(data.seo, { title: data.title, description: data.excerpt })
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await sanityFetch<any>(newsBySlugQuery, { slug }, {
    tags: ['news', `news:${slug}`],
  })
  if (!post) notFound()

  const related = (await sanityFetch<any[]>(newsListQuery))
    .filter((n) => n.slug !== slug)
    .slice(0, 3)

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('tr-TR', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : ''

  return (
    <article>
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: 'Ana Sayfa', url: BASE },
            { name: 'Haberler', url: `${BASE}/haberler` },
            { name: post.title, url: `${BASE}/haberler/${post.slug}` },
          ]),
        ]}
      />
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container-premium pt-12">
        <ol className="flex items-center gap-2 text-xs uppercase tracking-eyebrow text-titanium-500">
          <li><Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link></li>
          <ChevronRight size={12} />
          <li><Link href="/haberler" className="hover:text-gold transition-colors">Haberler</Link></li>
          <ChevronRight size={12} />
          <li className="text-ink dark:text-titanium-100">{post.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="container-premium pb-12 pt-10 text-center">
        <div className="eyebrow !mx-auto !justify-center mb-6 inline-flex">
          {post.category?.title ?? 'Haber'}
        </div>
        <h1 className="mx-auto max-w-4xl font-display text-display-xl tracking-tightest text-balance">
          {post.title}
        </h1>
        <div className="mt-6 flex items-center justify-center gap-3 text-xs uppercase tracking-eyebrow text-titanium-500">
          {date && <time dateTime={post.publishedAt}>{date}</time>}
          {post.author?.name && (
            <>
              <span aria-hidden className="h-1 w-1 rounded-full bg-titanium-400" />
              <span>{post.author.name}</span>
            </>
          )}
          {post.readingTimeMinutes && (
            <>
              <span aria-hidden className="h-1 w-1 rounded-full bg-titanium-400" />
              <span>{post.readingTimeMinutes} dk okuma</span>
            </>
          )}
        </div>
      </header>

      {/* Cover */}
      {post.coverImage && (
        <div className="container-premium">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
            <Image
              src={urlFor(post.coverImage).width(2000).url()}
              alt={post.coverImage?.alt ?? post.title}
              fill
              priority
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Body */}
      <section className="container-premium grid grid-cols-1 gap-16 py-20 lg:grid-cols-[1fr_3fr_1fr]">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <ShareButtons title={post.title} />
        </aside>
        <div className="mx-auto w-full max-w-[68ch]">
          {post.excerpt && (
            <p className="mb-10 border-l-2 border-gold pl-6 font-display text-2xl leading-snug text-balance text-ink dark:text-titanium-100">
              {post.excerpt}
            </p>
          )}
          <PortableText value={post.body} />
        </div>
        <aside />
      </section>

      {post.relatedProducts && post.relatedProducts.length > 0 && (
        <section className="container-premium py-20">
          <h2 className="mb-10 font-display text-3xl tracking-tightest">İlgili Ürünler</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {post.relatedProducts.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-titanium-200/60 py-20 dark:border-ink-700">
          <div className="container-premium">
            <h2 className="mb-10 font-display text-3xl tracking-tightest">Daha fazlasını okuyun</h2>
            <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
              {related.map((n) => (
                <NewsCard key={n._id} news={n} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}

function ShareButtons({ title }: { title: string }) {
  return (
    <div className="flex flex-row gap-2 lg:flex-col">
      <div className="eyebrow mb-2 hidden lg:block">Paylaş</div>
      {[
        { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=` },
        { name: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=` },
        { name: 'E-posta', href: `mailto:?subject=${encodeURIComponent(title)}&body=` },
      ].map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-full border border-titanium-300 px-4 text-xs uppercase tracking-eyebrow text-titanium-600 hover:border-gold hover:text-gold transition-colors dark:border-ink-700 dark:text-titanium-300"
        >
          {s.name}
        </a>
      ))}
    </div>
  )
}
