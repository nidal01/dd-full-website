import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@/components/ui/PortableText'
import { CtaLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { resolveHref, cn } from '@/lib/utils'

type Props = {
  eyebrow?: string
  heading: string
  body?: any
  image?: any
  imagePosition?: 'left' | 'right'
  cta?: { label?: string; variant?: string; link?: any }
}

export function ContentImageSection({ eyebrow, heading, body, image, imagePosition = 'right', cta }: Props) {
  const flip = imagePosition === 'left'
  return (
    <section className="container-premium py-32">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <Reveal className={cn(flip && 'lg:order-2')}>
          {eyebrow && <div className="eyebrow mb-6">{eyebrow}</div>}
          <h2 className="font-display text-display-lg tracking-tightest text-balance">{heading}</h2>
          <div className="prose-invert mt-4 max-w-prose">
            <PortableText value={body} />
          </div>
          {cta?.label && (
            <div className="mt-8">
              <CtaLink
                href={cta.link ? resolveHref(cta.link) : '#'}
                variant={(cta.variant as any) ?? 'secondary'}
                withArrow
              >
                {cta.label}
              </CtaLink>
            </div>
          )}
        </Reveal>

        {image && (
          <Reveal className={cn('relative aspect-[4/5] overflow-hidden rounded-2xl', flip && 'lg:order-1')}>
            <Image
              src={urlFor(image).width(1200).url()}
              alt=""
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
          </Reveal>
        )}
      </div>
    </section>
  )
}
