'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { cn, resolveHref } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { useTheme } from '@/components/providers/ThemeProvider'
import { SearchTrigger } from '@/components/search/CommandPalette'
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher'

type NavItem = {
  label: string
  hasMegaMenu?: boolean
  link?: any
  megaMenuColumns?: Array<{
    heading?: string
    links?: Array<any>
  }>
  featuredImage?: any
  featuredCaption?: string
}

type Settings = {
  siteName?: string
  logoLight?: any
  logoDark?: any
  primaryNav?: NavItem[]
  topbarCta?: { label?: string; variant?: string; link?: any }
}

export function Navbar({ settings }: { settings: Settings | null }) {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [scrolled, setScrolled] = React.useState(false)
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const closeTimer = React.useRef<NodeJS.Timeout | null>(null)

  // Scroll listener — applies blur/condensed style after threshold
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mega-menu when route changes
  React.useEffect(() => {
    setOpenIndex(null)
    setMobileOpen(false)
  }, [pathname])

  // Body scroll lock for mobile drawer
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleEnter = (index: number, hasMega?: boolean) => {
    if (!hasMega) return
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenIndex(index)
  }
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenIndex(null), 120)
  }

  const nav = settings?.primaryNav ?? []
  const logo = resolvedTheme === 'dark' ? settings?.logoLight : settings?.logoDark
  const cta = settings?.topbarCta

  // Beyaz logo (hero üzeri / scrollsuz durumda kullanılır)
  const WHITE_LOGO_URL =
    'https://www.durandogan.com/wp-content/uploads/2022/01/duran-logo-retina.png'
  const useWhiteLogo = !scrolled
  // Hero üzeri (scrollsuz) durumda nav metinleri/iconlar beyaz + shadow
  const onHero = !scrolled
  const navTextClass = onHero
    ? 'text-titanium-50 hover:text-gold [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]'
    : 'text-ink/80 dark:text-titanium-100/80 hover:text-ink dark:hover:text-titanium-50'
  const iconBtnClass = onHero
    ? 'text-titanium-50/95 hover:text-gold drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]'
    : 'text-ink/70 hover:text-gold dark:text-titanium-100/70'

  return (
    <>
      {/* DESKTOP NAVBAR — floating, premium glass */}
      <motion.header
        initial={false}
        animate={{
          paddingTop: scrolled ? 8 : 16,
          paddingBottom: scrolled ? 8 : 16,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50',
          'transition-[background,backdrop-filter,border-color] duration-500 ease-premium'
        )}
        onMouseLeave={handleLeave}
      >
        <div
          className={cn(
            'container-premium',
            'rounded-2xl transition-all duration-500',
            scrolled
              ? 'glass shadow-premium'
              : 'bg-transparent border-transparent'
          )}
        >
          <div className="flex h-16 items-center justify-between gap-6 px-2 lg:px-4">
            {/* LOGO */}
            <Link
              href="/"
              aria-label={settings?.siteName ?? 'Duran Doğan'}
              className="group relative flex items-center gap-2"
            >
              {useWhiteLogo ? (
                <Image
                  src={WHITE_LOGO_URL}
                  alt={settings?.siteName ?? 'Duran Doğan'}
                  width={260}
                  height={64}
                  priority
                  unoptimized
                  className="h-12 w-auto md:h-14 drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] [filter:drop-shadow(0_0_2px_rgba(0,0,0,0.7))_drop-shadow(0_4px_18px_rgba(0,0,0,0.7))]"
                />
              ) : (
                // Scroll edilmiş (glass) durum — beyaz PNG'yi CSS filter ile
                // bordo'ya (#8E292B brand red) recolorize ediyoruz.
                <Image
                  src={WHITE_LOGO_URL}
                  alt={settings?.siteName ?? 'Duran Doğan'}
                  width={260}
                  height={64}
                  priority
                  unoptimized
                  className="h-10 w-auto md:h-12"
                  style={{
                    filter:
                      'brightness(0) saturate(100%) invert(20%) sepia(56%) saturate(2438%) hue-rotate(335deg) brightness(95%) contrast(95%)',
                  }}
                />
              )}
              <span className="ml-1 hidden h-1.5 w-1.5 rounded-full bg-gold transition-all duration-500 group-hover:w-6 sm:block" />
            </Link>

            {/* PRIMARY NAV */}
            <nav aria-label="Ana navigasyon" className="hidden items-center gap-0 xl:gap-0.5 lg:flex">
              {nav.map((item, i) => {
                const href = item.link ? resolveHref(item.link) : '#'
                const isActive =
                  item.link?.internal?.slug && pathname.includes(item.link.internal.slug)
                const isOpen = openIndex === i

                // Hem link hem dropdown'u olan öğeler (ör. Portföy):
                // tıklayınca link'e gider, hover ile dropdown açılır.
                const hasLinkAndMega = item.hasMegaMenu && !!item.link

                const baseTrigger = cn(
                  'group relative inline-flex items-center gap-1 rounded-full px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-medium whitespace-nowrap',
                  navTextClass,
                  'transition-colors duration-200',
                  isActive && 'text-gold'
                )

                return (
                  <div
                    key={item.label + i}
                    className="relative"
                    onMouseEnter={() => handleEnter(i, item.hasMegaMenu)}
                  >
                    {item.hasMegaMenu && !hasLinkAndMega ? (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className={cn(baseTrigger, 'cursor-pointer')}
                      >
                        {item.label}
                        <ChevronDown
                          size={13}
                          className={cn('transition-transform duration-300', isOpen && 'rotate-180 text-gold')}
                        />
                      </button>
                    ) : item.hasMegaMenu ? (
                      // link + dropdown
                      <Link href={href} className={baseTrigger}>
                        {item.label}
                        <ChevronDown
                          size={13}
                          className={cn('transition-transform duration-300', isOpen && 'rotate-180 text-gold')}
                        />
                      </Link>
                    ) : (
                      <Link href={href} className={baseTrigger}>
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-x-3 -bottom-0.5 h-px bg-gold"
                          />
                        )}
                      </Link>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-1 lg:gap-2">
              <SearchTrigger className={cn(
                'hidden h-10 w-10 items-center justify-center rounded-full md:inline-flex transition-colors',
                iconBtnClass
              )}>
                <Search size={18} />
              </SearchTrigger>

              <LocaleSwitcher className={cn('hidden md:inline-flex', onHero && '[&_*]:text-titanium-50')} />

              <button
                type="button"
                aria-label="Tema değiştir"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className={cn(
                  'hidden h-10 w-10 items-center justify-center rounded-full transition-colors cursor-pointer md:inline-flex',
                  iconBtnClass
                )}
              >
                {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {cta?.label && cta?.link && (
                <Link
                  href={resolveHref(cta.link)}
                  className="btn-magnetic btn-magnetic--primary ml-2 hidden lg:inline-flex"
                >
                  {cta.label}
                </Link>
              )}

              {/* MOBILE TOGGLE */}
              <button
                type="button"
                aria-label="Menüyü aç"
                onClick={() => setMobileOpen(true)}
                className={cn(
                  'inline-flex h-11 w-11 items-center justify-center rounded-full cursor-pointer lg:hidden transition-colors',
                  onHero
                    ? 'text-titanium-50 drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]'
                    : 'text-ink dark:text-titanium-100'
                )}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>

          {/* HAIRLINE GOLD WHEN SCROLLED */}
          <div
            className={cn(
              'mx-4 h-px origin-center bg-gold-line opacity-0 transition-opacity duration-500',
              scrolled && 'opacity-60'
            )}
          />
        </div>

        {/* MEGA MENU PANEL */}
        <AnimatePresence>
          {openIndex !== null && nav[openIndex]?.hasMegaMenu && (
            <motion.div
              key={`mega-${openIndex}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="container-premium mt-2"
              onMouseEnter={() => {
                if (closeTimer.current) clearTimeout(closeTimer.current)
              }}
              onMouseLeave={handleLeave}
            >
              <MegaMenu item={nav[openIndex]} onSelect={() => setOpenIndex(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer — hero olan sayfalarda HeroSection bu spacer'ı kendi -mt-24 ile yutuyor */}
      <div aria-hidden className="h-24" />

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileDrawer
            nav={nav}
            cta={cta}
            onClose={() => setMobileOpen(false)}
            settings={settings}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* ============================================
   MEGA MENU
   ============================================ */
function MegaMenu({ item, onSelect }: { item: NavItem; onSelect: () => void }) {
  const columns = item.megaMenuColumns ?? []
  return (
    <div className="glass overflow-hidden rounded-2xl shadow-premium">
      <div className="grid grid-cols-12 gap-0">
        {/* Columns */}
        <div className="col-span-8 grid grid-cols-3 gap-x-8 gap-y-2 p-8">
          {columns.map((col, idx) => (
            <div key={idx} className="min-w-0">
              {col.heading && (
                <div className="eyebrow mb-4">{col.heading}</div>
              )}
              <ul className="space-y-1">
                {(col.links ?? []).map((link, j) => (
                  <li key={j}>
                    <Link
                      href={resolveHref(link)}
                      onClick={onSelect}
                      className={cn(
                        'group relative flex items-center justify-between rounded-lg px-2 py-2 text-sm',
                        'text-ink/80 dark:text-titanium-100/80',
                        'hover:bg-ink/5 dark:hover:bg-white/5 hover:text-gold',
                        'transition-colors duration-200'
                      )}
                    >
                      <span>{link.label}</span>
                      <span
                        aria-hidden
                        className="translate-x-0 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured image */}
        <div className="relative col-span-4 overflow-hidden border-l border-titanium-200/60 dark:border-ink-700/80">
          {item.featuredImage ? (
            <Link href="#" onClick={onSelect} className="group block h-full w-full">
              <div className="relative aspect-[4/5] h-full w-full">
                <Image
                  src={urlFor(item.featuredImage).width(800).height(1000).url()}
                  alt={item.featuredCaption ?? ''}
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                {item.featuredCaption && (
                  <div className="absolute inset-x-0 bottom-0 p-6 text-titanium-50">
                    <div className="eyebrow !text-gold-300 mb-2">Öne Çıkan</div>
                    <p className="font-display text-xl tracking-tightest text-balance">
                      {item.featuredCaption}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ) : (
            <div className="grid h-full place-items-center bg-navy-900/40 p-10">
              <div className="text-center">
                <div className="eyebrow !text-gold mb-2">Duran Doğan</div>
                <p className="font-display text-2xl tracking-tightest text-titanium-50">
                  Lüks ambalajda
                  <br />
                  <span className="text-gold">90 yıllık ustalık</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ============================================
   MOBILE DRAWER
   ============================================ */
function MobileDrawer({
  nav,
  cta,
  onClose,
  settings,
}: {
  nav: NavItem[]
  cta?: Settings['topbarCta']
  onClose: () => void
  settings: Settings | null
}) {
  const [expanded, setExpanded] = React.useState<number | null>(null)

  return (
    <motion.div
      className="fixed inset-0 z-[70] lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-ink/70 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.aside
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ink text-titanium-100 shadow-premium"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      >
        <div className="flex items-center justify-between border-b border-ink-700 px-6 py-5">
          <span className="font-display text-lg">
            {settings?.siteName ?? 'Duran Doğan'}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Menüyü kapat"
            className="grid h-10 w-10 place-items-center rounded-full hover:text-gold transition-colors cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {nav.map((item, i) => {
            const isOpen = expanded === i
            return (
              <div key={item.label + i} className="border-b border-ink-700/50">
                {item.hasMegaMenu ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="flex w-full items-center justify-between px-4 py-4 text-left text-base font-medium cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        className={cn('transition-transform duration-300', isOpen && 'rotate-180 text-gold')}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-4">
                            {(item.megaMenuColumns ?? []).map((col, j) => (
                              <div key={j}>
                                {col.heading && (
                                  <div className="eyebrow mb-2">{col.heading}</div>
                                )}
                                <ul className="space-y-1">
                                  {(col.links ?? []).map((link, k) => (
                                    <li key={k}>
                                      <Link
                                        href={resolveHref(link)}
                                        onClick={onClose}
                                        className="block py-2 text-sm text-titanium-100/80 hover:text-gold transition-colors"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.link ? resolveHref(item.link) : '#'}
                    onClick={onClose}
                    className="block px-4 py-4 text-base font-medium hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        {cta?.label && cta?.link && (
          <div className="border-t border-ink-700 p-6">
            <Link
              href={resolveHref(cta.link)}
              onClick={onClose}
              className="btn-magnetic btn-magnetic--primary w-full"
            >
              {cta.label}
            </Link>
          </div>
        )}
      </motion.aside>
    </motion.div>
  )
}
