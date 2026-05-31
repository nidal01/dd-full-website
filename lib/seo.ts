import type { Metadata } from 'next'
import { urlFor } from '@/sanity/lib/image'

export function buildMetadata(seo: any, fallback?: { title?: string; description?: string }): Metadata {
  const title = seo?.metaTitle ?? fallback?.title
  const description = seo?.metaDescription ?? fallback?.description
  const ogImage = seo?.openGraph?.ogImage
    ? urlFor(seo.openGraph.ogImage).width(1200).height(630).url()
    : undefined
  return {
    title,
    description,
    alternates: seo?.canonical ? { canonical: seo.canonical } : undefined,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.openGraph?.ogTitle ?? title,
      description: seo?.openGraph?.ogDescription ?? description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  }
}
