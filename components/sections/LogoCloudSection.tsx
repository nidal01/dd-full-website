import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

type Props = {
  heading?: string
  logos?: Array<{ name?: string; logo?: any; href?: string }>
}

export function LogoCloudSection({ heading, logos }: Props) {
  if (!logos || logos.length === 0) return null
  return (
    <section className="border-y border-titanium-200/60 bg-titanium-50/50 py-20 dark:border-ink-700 dark:bg-ink-900/40">
      <div className="container-premium">
        {heading && (
          <p className="mb-12 text-center text-xs uppercase tracking-eyebrow text-titanium-500">
            {heading}
          </p>
        )}
        <div className="grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((l, i) => {
            const inner = l.logo ? (
              <Image
                src={urlFor(l.logo).height(80).url()}
                alt={l.name ?? ''}
                width={140}
                height={40}
                className="mx-auto h-8 w-auto object-contain opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span className="block text-center text-titanium-400">{l.name}</span>
            )
            return l.href ? (
              <a key={i} href={l.href} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <div key={i}>{inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
