/**
 * WpPageShell — kaynak (WordPress) içeriklerinden uyarlanan iç sayfalar için
 * ortak iskelet: kompakt premium hero + zengin içerik bloklarını sıralı yerleştirir.
 *
 * Hero, Anasayfa'daki tam ekran hero'dan farklıdır:
 *  - Header'a tam yapışık (negative margin ile)
 *  - Yüksekliği ~60vh (içerik sayfalarına uygun)
 *  - Statik (slider yok)
 */
import Image from 'next/image'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'

type CtaItem = { label: string; href: string; variant?: 'primary' | 'secondary' }

export type WpPageProps = {
  eyebrow?: string
  heading: string
  subheading?: string
  /** Hero arka plan görseli — WordPress CDN ya da harici URL */
  heroImage?: string
  /** Hero hizalama */
  align?: 'left' | 'center'
  /** Hero CTA'ları */
  ctas?: CtaItem[]
  children: React.ReactNode
}

export function WpPageShell({
  eyebrow,
  heading,
  subheading,
  heroImage,
  align = 'left',
  ctas,
  children,
}: WpPageProps) {
  const isCenter = align === 'center'

  return (
    <>
      {/* HERO — header'a gömülü, kompakt */}
      <section
        aria-label="Sayfa hero"
        className="relative isolate -mt-24 min-h-[68vh] overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          {heroImage ? (
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-navy-900" />
          )}
          {/* Gradient stack */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-ink/90" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/85 via-ink/40 to-transparent" />
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
        </div>

        <div
          className={cn(
            'container-premium relative flex min-h-[68vh] flex-col justify-end pb-20 pt-44 text-titanium-50',
            isCenter && 'items-center text-center'
          )}
        >
          {eyebrow && (
            <span className="eyebrow !text-brand-200 mb-5 inline-flex">{eyebrow}</span>
          )}
          <h1 className="max-w-4xl font-display text-display-xl tracking-tightest text-balance">
            {heading}
          </h1>
          {subheading && (
            <p
              className={cn(
                'mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-titanium-200 md:text-xl',
                isCenter && 'mx-auto'
              )}
            >
              {subheading}
            </p>
          )}

          {ctas && ctas.length > 0 && (
            <div
              className={cn(
                'mt-10 flex flex-wrap gap-3',
                isCenter && 'justify-center'
              )}
            >
              {ctas.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className={cn(
                    'group relative inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-all duration-300',
                    (c.variant ?? (i === 0 ? 'primary' : 'secondary')) === 'primary'
                      ? 'bg-brand text-titanium-50 hover:bg-brand-400 hover:shadow-brand-glow'
                      : 'border border-titanium-50/40 bg-titanium-50/5 text-titanium-50 backdrop-blur-sm hover:border-titanium-50 hover:bg-titanium-50/10'
                  )}
                >
                  {c.label}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BODY */}
      <div className="relative">{children}</div>
    </>
  )
}

/* ============================================================
   YARDIMCI BLOKLAR — WpPageShell içinde sıralanmak üzere
   ============================================================ */

export function ProseSection({
  eyebrow,
  heading,
  children,
}: {
  eyebrow?: string
  heading?: string
  children: React.ReactNode
}) {
  return (
    <section className="container-premium grid grid-cols-1 gap-16 py-24 lg:grid-cols-[1fr_2fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
        {heading && (
          <h2 className="font-display text-display-md tracking-tightest text-balance">
            {heading}
          </h2>
        )}
      </div>
      <Reveal
        as="article"
        className="max-w-prose space-y-6 text-base leading-relaxed text-titanium-700 dark:text-titanium-300 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:tracking-tightest [&>h2]:text-ink [&>h2]:dark:text-titanium-50 [&>h3]:font-display [&>h3]:text-xl [&>h3]:tracking-tightest [&>h3]:text-ink [&>h3]:dark:text-titanium-50 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>p>strong]:text-ink [&>p>strong]:dark:text-titanium-50 [&_a]:text-gold [&_a]:underline-offset-4 hover:[&_a]:underline"
      >
        {children}
      </Reveal>
    </section>
  )
}

export function FeatureGrid({
  eyebrow,
  heading,
  items,
}: {
  eyebrow?: string
  heading?: string
  items: Array<{ title: string; body: string; icon?: React.ReactNode }>
}) {
  return (
    <section className="border-y border-titanium-200/60 bg-titanium-50/50 py-24 dark:border-ink-700 dark:bg-ink-900/40">
      <div className="container-premium">
        {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
        {heading && (
          <h2 className="max-w-3xl font-display text-display-lg tracking-tightest text-balance">
            {heading}
          </h2>
        )}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-titanium-200/60 bg-titanium-200/60 sm:grid-cols-2 lg:grid-cols-3 dark:border-ink-700 dark:bg-ink-700">
          {items.map((it, i) => (
            <Reveal
              key={i}
              delay={i * 0.05}
              className="flex flex-col gap-4 bg-titanium-50 p-8 dark:bg-ink-900"
            >
              {it.icon && (
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/40 bg-gold/5 text-gold">
                  {it.icon}
                </span>
              )}
              <h3 className="font-display text-xl tracking-tightest">{it.title}</h3>
              <p className="text-sm leading-relaxed text-titanium-600 dark:text-titanium-400">
                {it.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaBlock({
  eyebrow,
  heading,
  body,
  cta,
}: {
  eyebrow?: string
  heading: string
  body?: string
  cta?: CtaItem
}) {
  return (
    <section className="container-premium py-24">
      <div className="relative overflow-hidden rounded-3xl border border-titanium-200/60 bg-gradient-to-br from-ink to-navy-900 p-12 text-titanium-50 dark:border-ink-700 md:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative max-w-2xl">
          {eyebrow && (
            <div className="eyebrow !text-gold mb-4">{eyebrow}</div>
          )}
          <h2 className="font-display text-display-md tracking-tightest text-balance">
            {heading}
          </h2>
          {body && (
            <p className="mt-4 text-titanium-300 md:text-lg">{body}</p>
          )}
          {cta && (
            <a
              href={cta.href}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 text-sm font-medium text-titanium-50 transition-all hover:bg-gold-700 hover:shadow-gold-glow"
            >
              {cta.label}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
