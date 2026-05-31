'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X, Package, Newspaper, FolderOpen, ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

type Result = {
  _id: string
  _type: 'product' | 'news' | 'productCategory'
  title: string
  slug: string
  tagline?: string
  excerpt?: string
  coverImage?: any
  category?: { title?: string }
}

type SearchResponse = {
  products: Result[]
  news: Result[]
  categories: Result[]
}

type Ctx = { open: boolean; setOpen: (v: boolean) => void }
const CommandCtx = React.createContext<Ctx | null>(null)

export function useCommandPalette() {
  const ctx = React.useContext(CommandCtx)
  if (!ctx) throw new Error('useCommandPalette must be inside <CommandPaletteProvider>')
  return ctx
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <CommandCtx.Provider value={{ open, setOpen }}>
      {children}
      <CommandPalette open={open} setOpen={setOpen} />
    </CommandCtx.Provider>
  )
}

function CommandPalette({ open, setOpen }: Ctx) {
  const router = useRouter()
  const [query, setQuery] = React.useState('')
  const [data, setData] = React.useState<SearchResponse | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [selected, setSelected] = React.useState(0)

  // Debounced fetch
  React.useEffect(() => {
    if (!open) return
    if (query.trim().length < 2) {
      setData(null)
      return
    }
    setLoading(true)
    const ctrl = new AbortController()
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: ctrl.signal })
        const json = (await res.json()) as SearchResponse
        setData(json)
        setSelected(0)
      } catch {}
      finally {
        setLoading(false)
      }
    }, 220)
    return () => {
      clearTimeout(t)
      ctrl.abort()
    }
  }, [query, open])

  // Reset on close
  React.useEffect(() => {
    if (!open) {
      setQuery('')
      setData(null)
    }
  }, [open])

  // Flat list for keyboard nav
  const items = React.useMemo<Array<Result & { href: string }>>(() => {
    if (!data) return []
    const productsH = data.products.map((p) => ({ ...p, href: `/urunler/${p.slug}` }))
    const catsH = data.categories.map((c) => ({ ...c, href: `/urunler?kategori=${c.slug}` }))
    const newsH = data.news.map((n) => ({ ...n, href: `/haberler/${n.slug}` }))
    return [...productsH, ...catsH, ...newsH]
  }, [data])

  const navigate = React.useCallback(
    (href: string) => {
      router.push(href)
      setOpen(false)
    },
    [router, setOpen]
  )

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.min(items.length - 1, s + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(0, s - 1))
    } else if (e.key === 'Enter' && items[selected]) {
      e.preventDefault()
      navigate(items[selected].href)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-md"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-4 top-[12vh] z-[90] mx-auto max-w-2xl"
                onKeyDown={onKeyDown}
              >
                <Dialog.Title className="sr-only">Site içi arama</Dialog.Title>
                <div className="glass overflow-hidden rounded-2xl shadow-premium">
                  {/* Input */}
                  <div className="flex items-center gap-3 border-b border-titanium-200/60 px-5 py-4 dark:border-ink-700">
                    <Search size={18} className="text-titanium-500" />
                    <input
                      type="text"
                      autoFocus
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ürün, haber veya kategori ara…"
                      className="flex-1 bg-transparent text-base outline-none placeholder:text-titanium-400"
                    />
                    <kbd className="hidden rounded border border-titanium-300 px-2 py-0.5 text-[10px] uppercase tracking-eyebrow text-titanium-500 sm:inline-block dark:border-ink-700">
                      Esc
                    </kbd>
                    <Dialog.Close
                      aria-label="Kapat"
                      className="grid h-7 w-7 place-items-center rounded-full text-titanium-500 hover:text-gold transition-colors cursor-pointer sm:hidden"
                    >
                      <X size={16} />
                    </Dialog.Close>
                  </div>

                  {/* Results */}
                  <div className="max-h-[60vh] overflow-y-auto p-2">
                    {query.length < 2 && (
                      <div className="px-4 py-10 text-center text-sm text-titanium-500">
                        En az 2 karakter girin. <kbd className="ml-1 text-titanium-400">⌘K</kbd>
                      </div>
                    )}

                    {query.length >= 2 && loading && (
                      <div className="px-4 py-10 text-center text-sm text-titanium-500">
                        Aranıyor…
                      </div>
                    )}

                    {data && query.length >= 2 && !loading && items.length === 0 && (
                      <div className="px-4 py-10 text-center text-sm text-titanium-500">
                        "{query}" için sonuç bulunamadı.
                      </div>
                    )}

                    {data && data.products.length > 0 && (
                      <Group label="Ürünler" icon={<Package size={12} />}>
                        {data.products.map((p, i) => (
                          <Item
                            key={p._id}
                            href={`/urunler/${p.slug}`}
                            title={p.title}
                            subtitle={p.tagline ?? p.category?.title}
                            image={p.coverImage}
                            active={items[selected]?._id === p._id}
                            onHover={() => setSelected(items.findIndex((x) => x._id === p._id))}
                            onSelect={navigate}
                          />
                        ))}
                      </Group>
                    )}

                    {data && data.categories.length > 0 && (
                      <Group label="Kategoriler" icon={<FolderOpen size={12} />}>
                        {data.categories.map((c) => (
                          <Item
                            key={c._id}
                            href={`/urunler?kategori=${c.slug}`}
                            title={c.title}
                            subtitle="Tüm ürünleri gör"
                            active={items[selected]?._id === c._id}
                            onHover={() => setSelected(items.findIndex((x) => x._id === c._id))}
                            onSelect={navigate}
                          />
                        ))}
                      </Group>
                    )}

                    {data && data.news.length > 0 && (
                      <Group label="Haberler" icon={<Newspaper size={12} />}>
                        {data.news.map((n) => (
                          <Item
                            key={n._id}
                            href={`/haberler/${n.slug}`}
                            title={n.title}
                            subtitle={n.excerpt}
                            image={n.coverImage}
                            active={items[selected]?._id === n._id}
                            onHover={() => setSelected(items.findIndex((x) => x._id === n._id))}
                            onSelect={navigate}
                          />
                        ))}
                      </Group>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-titanium-200/60 px-5 py-3 text-[11px] uppercase tracking-eyebrow text-titanium-500 dark:border-ink-700">
                    <div className="flex items-center gap-3">
                      <Kbd>↑</Kbd>
                      <Kbd>↓</Kbd>
                      <span>gez</span>
                      <Kbd>↵</Kbd>
                      <span>aç</span>
                    </div>
                    <div>Duran Doğan</div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

function Group({
  label,
  icon,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="py-2">
      <div className="flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-eyebrow text-gold">
        {icon}
        {label}
      </div>
      <div>{children}</div>
    </div>
  )
}

function Item({
  href,
  title,
  subtitle,
  image,
  active,
  onSelect,
  onHover,
}: {
  href: string
  title: string
  subtitle?: string
  image?: any
  active?: boolean
  onSelect: (href: string) => void
  onHover?: () => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(href)}
      onMouseEnter={onHover}
      className={cn(
        'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors cursor-pointer',
        active ? 'bg-gold/10' : 'hover:bg-ink/5 dark:hover:bg-white/5'
      )}
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-ink-900">
        {image && (
          <Image src={urlFor(image).width(80).height(80).url()} alt="" fill className="object-cover" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{title}</div>
        {subtitle && (
          <div className="truncate text-xs text-titanium-500">{subtitle}</div>
        )}
      </div>
      <ArrowRight
        size={14}
        className={cn(
          'shrink-0 text-titanium-400 transition-all',
          active ? 'translate-x-1 text-gold' : 'opacity-0 group-hover:opacity-100'
        )}
      />
    </button>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="grid h-5 min-w-[20px] place-items-center rounded border border-titanium-300 px-1 text-[10px] font-normal dark:border-ink-700">
      {children}
    </kbd>
  )
}

/** Trigger to open the palette from anywhere (e.g. Navbar). */
export function SearchTrigger({ children, className }: { children?: React.ReactNode; className?: string }) {
  const { setOpen } = useCommandPalette()
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Ara"
      className={cn('cursor-pointer transition-colors', className)}
    >
      {children ?? <Search size={18} />}
    </button>
  )
}
