import Link from 'next/link'
import { resolveHref } from '@/lib/utils'
import { NewsletterForm } from './NewsletterForm'

export function Footer({ settings }: { settings: any }) {
  const columns = settings?.footerColumns ?? []
  const socials = settings?.socials ?? []
  const legal = settings?.legalLinks ?? []
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-titanium-200/60 bg-ink text-titanium-100 dark:border-ink-700">
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -z-0 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="container-premium relative pt-20 pb-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand + Newsletter */}
          <div className="md:col-span-5">
            <div className="font-display text-3xl tracking-tightest">
              {settings?.siteName ?? 'Duran Doğan'}
            </div>
            <p className="mt-3 max-w-md text-pretty text-sm text-titanium-300">
              {settings?.tagline ??
                'Premium ambalajın referans noktası. 90 yıllık ustalık ile dünya markalarına hizmet veriyoruz.'}
            </p>
            <div className="mt-10 max-w-md">
              <NewsletterForm />
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:col-span-1 md:block" />

          {columns.map((col: any, i: number) => (
            <div key={i} className="md:col-span-2">
              <div className="eyebrow mb-5">{col.heading}</div>
              <ul className="space-y-2.5">
                {(col.links ?? []).map((link: any, j: number) => (
                  <li key={j}>
                    <Link
                      href={resolveHref(link)}
                      className="text-sm text-titanium-200 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline my-12" />

        <div className="flex flex-col items-start justify-between gap-6 text-xs text-titanium-400 md:flex-row md:items-center">
          <div>© {year} {settings?.siteName ?? 'Duran Doğan'}. Tüm hakları saklıdır.</div>
          <div className="flex flex-wrap items-center gap-4">
            {legal.map((l: any, i: number) => (
              <Link key={i} href={resolveHref(l)} className="hover:text-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {socials.map((s: any, i: number) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-titanium-300 hover:text-gold transition-colors uppercase tracking-eyebrow text-[10px]"
              >
                {s.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
