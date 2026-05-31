import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import { newsListQuery, productListQuery } from '@/sanity/lib/queries'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://durandogan.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productsRaw, newsRaw] = await Promise.all([
    sanityFetch<Array<{ slug: string }>>(productListQuery),
    sanityFetch<Array<{ slug: string; publishedAt?: string }>>(newsListQuery),
  ])
  const products = productsRaw ?? []
  const news = newsRaw ?? []

  const staticRoutes = ['', '/kurumsal', '/urunler', '/surdurulebilirlik', '/haberler', '/iletisim'].map(
    (path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
    })
  )

  const productRoutes = products.map((p) => ({
    url: `${BASE}/urunler/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const newsRoutes = news.map((n) => ({
    url: `${BASE}/haberler/${n.slug}`,
    lastModified: n.publishedAt ? new Date(n.publishedAt) : undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...productRoutes, ...newsRoutes]
}
