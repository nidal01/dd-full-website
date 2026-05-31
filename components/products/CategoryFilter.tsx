'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

type Props = {
  categories: Array<{ _id?: string; title: string; slug: string }>
  active?: string
  total?: number
}

export function CategoryFilter({ categories, active, total }: Props) {
  const pathname = usePathname()
  const params = useSearchParams()

  const makeHref = (slug?: string) => {
    const next = new URLSearchParams(params)
    if (!slug) next.delete('kategori')
    else next.set('kategori', slug)
    const q = next.toString()
    return q ? `${pathname}?${q}` : pathname
  }

  return (
    <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-full p-2 px-3 shadow-premium">
      <div className="flex flex-wrap items-center gap-1">
        <FilterChip href={makeHref(undefined)} active={!active}>
          Tümü
        </FilterChip>
        {categories.map((c) => (
          <FilterChip key={c._id ?? c.slug} href={makeHref(c.slug)} active={active === c.slug}>
            {c.title}
          </FilterChip>
        ))}
      </div>
      {typeof total === 'number' && (
        <span className="hidden pr-3 text-xs uppercase tracking-eyebrow text-titanium-500 sm:block">
          {total} ürün
        </span>
      )}
    </div>
  )
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer',
        active
          ? 'bg-ink text-titanium-50 shadow-premium dark:bg-gold dark:text-ink'
          : 'text-ink/70 hover:text-ink dark:text-titanium-100/70 dark:hover:text-titanium-50'
      )}
    >
      {children}
    </Link>
  )
}
