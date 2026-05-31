import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { CtaLink } from '@/components/ui/Button'
import { resolveHref } from '@/lib/utils'

type Props = {
  heading: string
  subheading?: string
  ctas?: Array<{ label: string; variant?: string; link?: any }>
  background?: any
}

export function CtaSection({ heading, subheading, ctas, background }: Props) {
  return (
    <section className="container-premium py-20">
      <div className="relative isolate overflow-hidden rounded-3xl border border-gold/30 bg-ink p-10 text-titanium-50 md:p-20">
        {background ? (
          <Image
            src={urlFor(background).width(2400).url()}
            alt=""
            fill
            sizes="100vw"
            className="-z-20 object-cover opacity-30"
          />
        ) : null}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-900 via-ink to-ink" />
        <div
          aria-hidden
          className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-gold/20 blur-3xl"
        />

        <div className="relative max-w-3xl">
          <h2 className="font-display text-display-lg tracking-tightest text-balance">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-6 text-pretty text-lg leading-relaxed text-titanium-300">
              {subheading}
            </p>
          )}
          {ctas && ctas.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {ctas.map((c, i) => (
                <CtaLink
                  key={i}
                  href={c.link ? resolveHref(c.link) : '#'}
                  variant={(c.variant as any) ?? (i === 0 ? 'primary' : 'outline')}
                  size="lg"
                  withArrow={i === 0}
                >
                  {c.label}
                </CtaLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
