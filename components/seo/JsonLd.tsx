export function JsonLd({ data }: { data: Record<string, any> | Array<Record<string, any>> }) {
  return (
    <script
      type="application/ld+json"
      // Sanity-fetched content is escaped by JSON.stringify; safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://durandogan.com'

export function organizationJsonLd(settings: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings?.siteName ?? 'Duran Doğan',
    url: BASE,
    logo: `${BASE}/logo.png`,
    description: settings?.tagline,
    sameAs: (settings?.socials ?? []).map((s: any) => s.url).filter(Boolean),
    contactPoint: settings?.contactEmail
      ? [
          {
            '@type': 'ContactPoint',
            email: settings.contactEmail,
            telephone: settings.contactPhone,
            contactType: 'customer service',
            areaServed: 'TR',
            availableLanguage: ['Turkish', 'English'],
          },
        ]
      : undefined,
    address: (settings?.addresses ?? []).map((a: any) => ({
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressCountry: a.country,
      postalCode: a.postalCode,
    })),
  }
}

export function productJsonLd(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.summary ?? product.tagline,
    image: product.coverImage ? [`${BASE}/_next/image?url=${encodeURIComponent('cdn.sanity.io/' + product.coverImage?.asset?._ref)}&w=1600&q=85`] : undefined,
    category: product.category?.title,
    brand: { '@type': 'Brand', name: 'Duran Doğan' },
    additionalProperty: (product.specs ?? []).map((s: any) => ({
      '@type': 'PropertyValue',
      name: s.label,
      value: s.value,
    })),
  }
}

export function articleJsonLd(post: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt ?? post.publishedAt,
    author: post.author?.name
      ? { '@type': 'Person', name: post.author.name }
      : { '@type': 'Organization', name: 'Duran Doğan' },
    publisher: {
      '@type': 'Organization',
      name: 'Duran Doğan',
      logo: { '@type': 'ImageObject', url: `${BASE}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/haberler/${post.slug}` },
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
