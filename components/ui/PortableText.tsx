import { PortableText as PT, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="my-5 text-pretty leading-relaxed text-titanium-700 dark:text-titanium-300">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-16 mb-6 font-display text-display-lg tracking-tightest">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-12 mb-4 font-display text-3xl tracking-tightest">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-10 mb-3 font-display text-2xl tracking-tightest">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative my-10 border-l-2 border-gold pl-6 font-display text-2xl italic leading-snug text-ink dark:text-titanium-100">
        <span className="absolute -left-3 -top-2 text-5xl text-gold/40">“</span>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink dark:text-titanium-50">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline decoration-gold/60 underline-offset-4">{children}</span>,
    link: ({ children, value }) => (
      <Link
        href={value?.href ?? '#'}
        target={value?.openInNewTab ? '_blank' : undefined}
        rel={value?.openInNewTab ? 'noopener noreferrer' : undefined}
        className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold transition-colors"
      >
        {children}
      </Link>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={urlFor(value).width(1600).url()}
            alt={value?.alt ?? ''}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
          />
        </div>
        {value?.caption && (
          <figcaption className="mt-3 text-sm text-titanium-500">{value.caption}</figcaption>
        )}
      </figure>
    ),
    callout: ({ value }) => (
      <aside
        className={cn(
          'my-10 rounded-2xl border p-6',
          value?.tone === 'premium'
            ? 'border-gold/30 bg-gold/5'
            : value?.tone === 'warning'
            ? 'border-amber-500/30 bg-amber-500/5'
            : value?.tone === 'success'
            ? 'border-emerald-500/30 bg-emerald-500/5'
            : 'border-navy-300/30 bg-navy-50 dark:bg-navy-900/30'
        )}
      >
        <p className="text-base leading-relaxed">{value?.body}</p>
      </aside>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-5 list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="my-5 list-decimal space-y-2 pl-6">{children}</ol>,
  },
}

export function PortableText({ value }: { value: any }) {
  if (!value) return null
  return <PT value={value} components={components} />
}
