import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { fontBody, fontDisplay } from '@/lib/fonts'
import { defaultLocale, isLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { sanityFetch } from '@/sanity/lib/fetch'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import '@/styles/globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFB' },
    { media: '(prefers-color-scheme: dark)', color: '#05070D' },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<any>(siteSettingsQuery, {}, { tags: ['siteSettings'] })
  const siteName = settings?.siteName ?? 'Duran Doğan'
  const tagline = settings?.tagline ?? 'Premium Ambalaj Çözümleri'
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://durandogan.com'

  return {
    metadataBase: new URL(url),
    title: { default: `${siteName} — ${tagline}`, template: `%s · ${siteName}` },
    description: settings?.defaultSeo?.metaDescription ?? tagline,
    applicationName: siteName,
    keywords: settings?.defaultSeo?.keywords ?? [],
    openGraph: {
      type: 'website',
      siteName,
      locale: 'tr_TR',
      url,
      title: `${siteName} — ${tagline}`,
      description: settings?.defaultSeo?.metaDescription ?? tagline,
    },
    twitter: { card: 'summary_large_image' },
    manifest: '/manifest.webmanifest',
    appleWebApp: {
      title: siteName,
      capable: true,
      statusBarStyle: 'black-translucent',
    },
    robots: { index: !settings?.defaultSeo?.noIndex, follow: true },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers()
  const pathname = h.get('x-pathname') ?? '/'
  const first = pathname.split('/').filter(Boolean)[0]
  const lang = first && isLocale(first) ? first : defaultLocale

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={cn(fontBody.variable, fontDisplay.variable, 'antialiased')}
    >
      <body className="relative min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
