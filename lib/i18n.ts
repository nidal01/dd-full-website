export const locales = ['tr', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'tr'

export const localeLabels: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
}

// Translatable route segments — used to localize URL paths.
// Sanity'deki ana sayfa türleriyle aynı slug mantığı: TR varsayılan,
// EN için aynı yollar kullanılır (URL'leri sade tutmak için).
export const routeMap: Record<Locale, Record<string, string>> = {
  tr: {
    home: '/',
    corporate: '/kurumsal',
    products: '/urunler',
    sustainability: '/surdurulebilirlik',
    news: '/haberler',
    contact: '/iletisim',
  },
  en: {
    home: '/',
    corporate: '/about',
    products: '/products',
    sustainability: '/sustainability',
    news: '/news',
    contact: '/contact',
  },
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function pickLocale(acceptLanguage?: string | null): Locale {
  if (!acceptLanguage) return defaultLocale
  const wanted = acceptLanguage
    .split(',')
    .map((s) => s.split(';')[0].trim().toLowerCase().slice(0, 2))
  for (const l of wanted) {
    if (isLocale(l)) return l
  }
  return defaultLocale
}
