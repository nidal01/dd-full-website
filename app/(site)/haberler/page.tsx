import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import { newsListQuery } from '@/sanity/lib/queries'
import { NewsCard } from '@/components/cards/NewsCard'
import { Reveal } from '@/components/ui/Reveal'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Haberler & Basın',
  description: 'Duran Doğan haberleri, basın bültenleri ve vaka çalışmaları.',
}

export default async function NewsListPage() {
  const newsRaw = await sanityFetch<any[]>(newsListQuery, {}, { tags: ['news'] })
  const news = newsRaw ?? []
  const [feature, ...rest] = news

  return (
    <>
      <section className="container-premium pb-12 pt-16 md:pt-24">
        <div className="eyebrow mb-6">Yayın Akışı</div>
        <h1 className="max-w-4xl font-display text-display-xl tracking-tightest text-balance">
          Haberler, basın bültenleri ve <span className="text-gold">vaka çalışmaları</span>.
        </h1>
      </section>

      <div className="hairline container-premium mb-12" />

      {feature && (
        <section className="container-premium pb-16">
          <Reveal>
            <NewsCard news={feature} variant="feature" />
          </Reveal>
        </section>
      )}

      {rest.length > 0 && (
        <section className="container-premium pb-32">
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((n, i) => (
              <Reveal key={n._id} delay={(i % 6) * 0.05}>
                <NewsCard news={n} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
