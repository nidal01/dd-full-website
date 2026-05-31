import { headers } from 'next/headers'
import { defaultLocale, isLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { I18nProvider } from '@/components/providers/I18nProvider'
import { Analytics } from '@/components/analytics/Analytics'
import { sanityFetch } from '@/sanity/lib/fetch'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { demoSettings } from '@/sanity/lib/demoData'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { CommandPaletteProvider } from '@/components/search/CommandPalette'
import { Footer } from '@/components/layout/Footer'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { PreviewBanner } from '@/components/layout/PreviewBanner'
import { BackToTop } from '@/components/layout/BackToTop'
import { JsonLd, organizationJsonLd } from '@/components/seo/JsonLd'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const fetched = await sanityFetch<any>(siteSettingsQuery, {}, { tags: ['siteSettings'] })
  // Sanity'deki eski seed verisini bypass et — navbar ve footer her zaman
  // güncel statik yapıyı kullanır (doğrudan linkler, yönlendirme yok).
  const settings = {
    ...(fetched ?? demoSettings),
    primaryNav: demoSettings.primaryNav,
    footerColumns: demoSettings.footerColumns,
    topbarCta: demoSettings.topbarCta,
  }

  const h = await headers()
  const pathname = h.get('x-pathname') ?? '/'
  const first = pathname.split('/').filter(Boolean)[0]
  const lang = first && isLocale(first) ? first : defaultLocale
  const dict = await getDictionary(lang)

  return (
    <>
      {/* Skip to content (a11y) */}
      <a
        href="#main"
        className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-gold/60"
      >
        {dict.common.skipToContent}
      </a>
      <JsonLd data={organizationJsonLd(settings)} />
      <Analytics gtmId={settings?.analytics?.gtmId} gaId={settings?.analytics?.gaId} />
      <I18nProvider locale={lang} dict={dict}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LenisProvider>
            <CommandPaletteProvider>
              {settings?.announcement?.enabled && (
                <AnnouncementBar announcement={settings.announcement} />
              )}
              <Navbar settings={settings} />
              <main id="main" className="relative">
                {children}
              </main>
              <Footer settings={settings} />
              <BackToTop />
              <PreviewBanner />
            </CommandPaletteProvider>
          </LenisProvider>
        </ThemeProvider>
      </I18nProvider>
    </>
  )
}
