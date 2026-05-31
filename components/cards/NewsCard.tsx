import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

type Props = {
  news: {
    _id?: string
    title: string
    slug: string
    excerpt?: string
    coverImage?: any
    publishedAt?: string
    kind?: string
    category?: { title?: string; slug?: string }
    author?: { name?: string; avatar?: any }
  }
  variant?: 'standard' | 'feature'
  className?: string
}

const kindLabel: Record<string, string> = {
  news: 'Haber',
  press: 'Basın Bülteni',
  'case-study': 'Vaka Çalışması',
}

export function NewsCard({ news, variant = 'standard', className }: Props) {
  const href = `/haberler/${news.slug}`
  const date = news.publishedAt
    ? new Date(news.publishedAt).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden',
        'border-b border-titanium-200/70 pb-8 dark:border-ink-700/80',
        variant === 'feature' && 'border-0 pb-0',
        className
      )}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-2xl bg-ink-900',
          variant === 'feature' ? 'aspect-[16/10]' : 'aspect-[16/10]'
        )}
      >
        {news.coverImage && (
          <Image
            src={urlFor(news.coverImage).width(1200).url()}
            alt={news.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.04]"
          />
        )}
        <div className="absolute left-4 top-4 flex gap-2">
          {news.kind && (
            <span className="rounded-full bg-ink/60 px-3 py-1 text-[10px] uppercase tracking-eyebrow text-gold backdrop-blur-md">
              {kindLabel[news.kind] ?? news.kind}
            </span>
          )}
          {news.category?.title && (
            <span className="rounded-full bg-titanium-50/90 px-3 py-1 text-[10px] uppercase tracking-eyebrow text-ink">
              {news.category.title}
            </span>
          )}
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center gap-3 text-xs uppercase tracking-eyebrow text-titanium-500">
          {date && <time dateTime={news.publishedAt}>{date}</time>}
          {news.author?.name && (
            <>
              <span aria-hidden className="h-1 w-1 rounded-full bg-titanium-400" />
              <span>{news.author.name}</span>
            </>
          )}
        </div>
        <h3
          className={cn(
            'font-display tracking-tightest text-balance transition-colors group-hover:text-gold',
            variant === 'feature' ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
          )}
        >
          {news.title}
        </h3>
        {news.excerpt && (
          <p className="line-clamp-3 text-sm leading-relaxed text-titanium-600 dark:text-titanium-400">
            {news.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}
