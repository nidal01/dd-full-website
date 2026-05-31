import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { resolveProductImageUrl } from '@/lib/productImage'

type Props = {
  product: {
    _id?: string
    title: string
    slug: string
    tagline?: string
    coverImage?: any
    externalImageUrl?: string | null
    category?: { title?: string; slug?: string }
    sustainabilityTags?: string[]
  }
  priority?: boolean
  className?: string
  variant?: 'standard' | 'feature'
  /** Ürün detay sayfası yolu (varsayılan: /portfoy/urun/{slug}) */
  hrefPrefix?: string
}

export function ProductCard({
  product,
  priority,
  className,
  variant = 'standard',
  hrefPrefix = '/portfoy/urun',
}: Props) {
  const href = `${hrefPrefix}/${product.slug}`
  const img = resolveProductImageUrl(product, { width: 900, height: 1125 })
  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden rounded-2xl',
        'border border-titanium-200/70 dark:border-ink-700/80',
        'bg-titanium-50/40 dark:bg-ink-900/40',
        'transition-all duration-500 ease-premium',
        'hover:border-gold/40 hover:shadow-premium',
        className
      )}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden bg-ink-900',
          variant === 'feature' ? 'aspect-[4/5]' : 'aspect-[4/5]'
        )}
      >
        {img ? (
          <Image
            src={img.url}
            alt={product.title}
            fill
            unoptimized={img.isExternal}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.06]"
          />
        ) : (
          <div className="grid h-full place-items-center bg-navy-900">
            <span className="font-display text-2xl text-gold/70">{product.title}</span>
          </div>
        )}

        {/* gradient + grain */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

        {/* hover arrow */}
        <div
          className={cn(
            'absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full',
            'bg-titanium-50/90 text-ink backdrop-blur-md',
            'translate-y-2 opacity-0 transition-all duration-500',
            'group-hover:translate-y-0 group-hover:opacity-100'
          )}
        >
          <ArrowUpRight size={18} />
        </div>

        {/* sustainability chips */}
        {product.sustainabilityTags && product.sustainabilityTags.length > 0 && (
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            {product.sustainabilityTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gold/40 bg-ink/40 px-2.5 py-1 text-[10px] uppercase tracking-eyebrow text-gold backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* bottom title */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          {product.category?.title && (
            <div className="eyebrow !text-gold-300 mb-2">{product.category.title}</div>
          )}
          <h3 className="font-display text-2xl tracking-tightest text-titanium-50">
            {product.title}
          </h3>
          {product.tagline && (
            <p className="mt-1 line-clamp-2 max-w-xs text-sm text-titanium-300">
              {product.tagline}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
