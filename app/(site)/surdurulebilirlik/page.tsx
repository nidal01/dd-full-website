import type { Metadata } from 'next'
import * as LucideIcons from 'lucide-react'
import { Download } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/fetch'
import { sustainabilityPageQuery } from '@/sanity/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { HeroSection } from '@/components/sections/HeroSection'
import { PageSections } from '@/components/sections/PageSections'
import { PortableText } from '@/components/ui/PortableText'
import { Reveal } from '@/components/ui/Reveal'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<any>(sustainabilityPageQuery, {}, { tags: ['sustainabilityPage'] })
  return buildMetadata(data?.seo, {
    title: 'Sürdürülebilirlik',
    description: 'Çevresel sorumluluk taahhütlerimiz ve sürdürülebilirlik raporlarımız.',
  })
}

export default async function SustainabilityPage() {
  const data = await sanityFetch<any>(sustainabilityPageQuery, {}, { tags: ['sustainabilityPage'] })
  if (!data) return null

  return (
    <>
      {data.hero && <HeroSection {...data.hero} />}

      {/* Metrics */}
      {data.metrics && data.metrics.length > 0 && (
        <section className="container-premium py-32">
          <div className="eyebrow mb-4">Etki Raporu</div>
          <h2 className="max-w-3xl font-display text-display-lg tracking-tightest text-balance">
            Ölçtüğümüz, paylaştığımız ve iyileştirmeye söz verdiğimiz değerler.
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-titanium-200/60 bg-titanium-200/60 sm:grid-cols-2 lg:grid-cols-4 dark:border-ink-700 dark:bg-ink-700">
            {data.metrics.map((m: any, i: number) => {
              const Icon = (m.icon && (LucideIcons as any)[m.icon]) || (LucideIcons as any).Leaf
              return (
                <Reveal
                  key={i}
                  delay={i * 0.06}
                  className="bg-titanium-50 p-10 dark:bg-ink-900"
                >
                  <span className="mb-6 grid h-12 w-12 place-items-center rounded-xl border border-gold/40 bg-gold/5 text-gold">
                    <Icon size={22} />
                  </span>
                  <div className="font-display text-5xl tracking-tightest">
                    {m.value}
                    {m.unit && <span className="text-gold"> {m.unit}</span>}
                  </div>
                  <div className="eyebrow mt-2">{m.label}</div>
                  {m.description && (
                    <p className="mt-4 text-sm leading-relaxed text-titanium-600 dark:text-titanium-400">
                      {m.description}
                    </p>
                  )}
                </Reveal>
              )
            })}
          </div>
        </section>
      )}

      {/* Commitments */}
      {data.commitmentsBody && (
        <section className="container-premium grid grid-cols-1 gap-16 py-20 lg:grid-cols-[1fr_2fr]">
          <div className="eyebrow lg:sticky lg:top-32 lg:self-start">Taahhütlerimiz</div>
          <article className="max-w-prose">
            <PortableText value={data.commitmentsBody} />
          </article>
        </section>
      )}

      {/* Reports */}
      {data.reports && data.reports.length > 0 && (
        <section className="border-y border-titanium-200/60 bg-titanium-50/50 py-32 dark:border-ink-700 dark:bg-ink-900/30">
          <div className="container-premium">
            <div className="eyebrow mb-4">Raporlar</div>
            <h2 className="font-display text-display-lg tracking-tightest">
              Şeffaflık, hesap verebilirlik
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.reports.map((r: any, i: number) => (
                <Reveal
                  as="article"
                  key={i}
                  delay={i * 0.05}
                  className="group flex flex-col gap-4 rounded-2xl border border-titanium-200/60 bg-titanium-50 p-6 transition-all hover:border-gold/50 hover:shadow-premium dark:border-ink-700 dark:bg-ink-900"
                >
                  <div className="font-display text-4xl tracking-tightest text-gold">{r.year}</div>
                  <h3 className="font-display text-xl tracking-tightest">{r.title}</h3>
                  {r.summary && (
                    <p className="text-sm leading-relaxed text-titanium-600 dark:text-titanium-400">
                      {r.summary}
                    </p>
                  )}
                  {r.file?.asset?.url && (
                    <a
                      href={r.file.asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-sm text-gold hover:underline"
                    >
                      <Download size={14} />
                      PDF olarak indir
                    </a>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <PageSections sections={data.sections} />
    </>
  )
}
