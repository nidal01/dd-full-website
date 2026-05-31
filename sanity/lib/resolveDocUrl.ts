import type { SanityDocument } from 'sanity'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export function resolveDocUrl(doc: SanityDocument & { slug?: { current?: string } }) {
  switch (doc._type) {
    case 'homePage':
      return `${BASE}/`
    case 'corporatePage':
      return `${BASE}/kurumsal`
    case 'sustainabilityPage':
      return `${BASE}/surdurulebilirlik`
    case 'contactPage':
      return `${BASE}/iletisim`
    case 'product':
      return doc.slug?.current ? `${BASE}/urunler/${doc.slug.current}` : null
    case 'news':
      return doc.slug?.current ? `${BASE}/haberler/${doc.slug.current}` : null
    case 'productCategory':
      return doc.slug?.current ? `${BASE}/urunler?kategori=${doc.slug.current}` : null
    default:
      return null
  }
}
