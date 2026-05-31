'use client'

import * as React from 'react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { usePathname, useRouter } from 'next/navigation'
import { Check, Globe } from 'lucide-react'
import { defaultLocale, isLocale, localeLabels, locales, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LocaleSwitcher({
  className,
  onHero = false,
}: {
  className?: string
  /** Hero üzerindeyken (scrollsuz) beyaz metin/icon rengi kullanır */
  onHero?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()

  const current: Locale = React.useMemo(() => {
    const seg = pathname.split('/').filter(Boolean)[0]
    return seg && isLocale(seg) ? seg : defaultLocale
  }, [pathname])

  function switchTo(next: Locale) {
    document.cookie = `dd-locale=${next}; path=/; max-age=${60 * 60 * 24 * 365}`
    const segs = pathname.split('/').filter(Boolean)
    if (segs[0] && isLocale(segs[0])) segs.shift()
    const rest = '/' + segs.join('/')
    const target = next === defaultLocale ? rest : `/${next}${rest === '/' ? '' : rest}`
    router.push(target || '/')
    router.refresh()
  }

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button
          aria-label="Dil"
          className={cn(
            'inline-flex h-10 items-center gap-1 rounded-full px-3 text-xs font-medium uppercase tracking-eyebrow transition-colors cursor-pointer',
            'text-ink/70 hover:text-gold dark:text-titanium-100/70',
            className
          )}
        >
          <Globe size={14} />
          {current.toUpperCase()}
        </button>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content
          align="end"
          sideOffset={12}
          className="glass z-[60] min-w-[160px] rounded-xl border border-titanium-200/60 p-1 shadow-premium dark:border-ink-700"
        >
          {locales.map((l) => (
            <Dropdown.Item
              key={l}
              onSelect={() => switchTo(l)}
              className={cn(
                'flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm outline-none',
                'hover:bg-ink/5 dark:hover:bg-white/5 focus:bg-ink/5 dark:focus:bg-white/5',
                l === current && 'text-gold'
              )}
            >
              {localeLabels[l]}
              {l === current && <Check size={14} className="text-gold" />}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  )
}
