import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'

type Props = {
  heading?: string
  milestones?: Array<{ year: string; title?: string; description?: string; image?: any }>
}

export function TimelineSection({ heading, milestones }: Props) {
  if (!milestones || milestones.length === 0) return null
  return (
    <section className="container-premium py-32">
      <SectionHeader eyebrow="Tarihçe" heading={heading ?? 'Bir mirasın yolculuğu'} />

      <div className="mt-20 grid grid-cols-1 gap-x-12 lg:grid-cols-[200px_1fr]">
        <div aria-hidden className="hidden lg:block" />
        <div className="relative">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-gold/40 via-titanium-300/40 to-transparent lg:block" />
          <ol className="space-y-20">
            {milestones.map((m, i) => (
              <Reveal as="li" key={i} delay={i * 0.05} className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
                <div className="lg:pl-12">
                  <span
                    aria-hidden
                    className="absolute -left-[5px] top-2 hidden h-3 w-3 rounded-full bg-gold ring-4 ring-gold/15 lg:block"
                  />
                  <div className="font-display text-6xl tracking-tightest text-gold md:text-7xl">{m.year}</div>
                  {m.title && (
                    <h3 className="mt-4 font-display text-2xl tracking-tightest text-balance">
                      {m.title}
                    </h3>
                  )}
                  {m.description && (
                    <p className="mt-3 max-w-md text-pretty leading-relaxed text-titanium-600 dark:text-titanium-400">
                      {m.description}
                    </p>
                  )}
                </div>
                {m.image && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-titanium-200/60 dark:border-ink-700">
                    <Image
                      src={urlFor(m.image).width(1200).url()}
                      alt={m.title ?? m.year}
                      fill
                      sizes="(min-width: 1024px) 600px, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
