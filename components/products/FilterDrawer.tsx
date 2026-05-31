'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Filter, X, RotateCcw } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type Facets = {
  materials?: string[]
  finishes?: string[]
  sustainability?: string[]
}

type Props = {
  facets: Facets
  activeCount?: number
}

export function FilterDrawer({ facets, activeCount = 0 }: Props) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  // Local draft state for multi-select
  const [draft, setDraft] = React.useState<{
    malzeme: string[]
    lake: string[]
    cevre: string[]
  }>(() => parseParams(params))

  React.useEffect(() => {
    setDraft(parseParams(params))
  }, [params])

  function toggle(group: keyof typeof draft, value: string) {
    setDraft((s) => ({
      ...s,
      [group]: s[group].includes(value)
        ? s[group].filter((v) => v !== value)
        : [...s[group], value],
    }))
  }

  function apply() {
    const next = new URLSearchParams(params)
    ;(['malzeme', 'lake', 'cevre'] as const).forEach((g) => {
      next.delete(g)
      draft[g].forEach((v) => next.append(g, v))
    })
    const q = next.toString()
    router.push(q ? `${pathname}?${q}` : pathname, { scroll: false })
    setOpen(false)
  }

  function reset() {
    setDraft({ malzeme: [], lake: [], cevre: [] })
  }

  const draftCount = draft.malzeme.length + draft.lake.length + draft.cevre.length

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-titanium-300 bg-titanium-50 px-4 py-2 text-sm font-medium transition-colors hover:border-gold hover:text-gold cursor-pointer dark:border-ink-700 dark:bg-ink-900/40"
      >
        <Filter size={14} />
        Filtrele
        {activeCount > 0 && (
          <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-gold px-1.5 text-[10px] font-semibold text-ink">
            {activeCount}
          </span>
        )}
      </button>

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
                <motion.aside
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                  className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-titanium-50 text-ink shadow-premium dark:bg-ink dark:text-titanium-100"
                >
                  <Dialog.Title className="sr-only">Ürün filtreleri</Dialog.Title>

                  <header className="flex items-center justify-between border-b border-titanium-200/70 px-6 py-5 dark:border-ink-700">
                    <div>
                      <div className="eyebrow">Filtreler</div>
                      <h2 className="mt-1 font-display text-2xl tracking-tightest">Koleksiyonu daralt</h2>
                    </div>
                    <Dialog.Close
                      aria-label="Kapat"
                      className="grid h-10 w-10 place-items-center rounded-full hover:text-gold transition-colors cursor-pointer"
                    >
                      <X size={20} />
                    </Dialog.Close>
                  </header>

                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    <FacetGroup
                      label="Malzeme"
                      values={facets.materials ?? []}
                      selected={draft.malzeme}
                      onToggle={(v) => toggle('malzeme', v)}
                    />
                    <FacetGroup
                      label="Baskı / Lake"
                      values={facets.finishes ?? []}
                      selected={draft.lake}
                      onToggle={(v) => toggle('lake', v)}
                    />
                    <FacetGroup
                      label="Sürdürülebilirlik"
                      values={facets.sustainability ?? []}
                      selected={draft.cevre}
                      onToggle={(v) => toggle('cevre', v)}
                      accent
                    />
                  </div>

                  <footer className="flex items-center justify-between gap-3 border-t border-titanium-200/70 px-6 py-5 dark:border-ink-700">
                    <button
                      type="button"
                      onClick={reset}
                      disabled={draftCount === 0}
                      className="inline-flex items-center gap-2 text-sm text-titanium-600 hover:text-gold transition-colors disabled:opacity-40 cursor-pointer"
                    >
                      <RotateCcw size={14} />
                      Sıfırla
                    </button>
                    <button
                      type="button"
                      onClick={apply}
                      className="btn-magnetic btn-magnetic--primary"
                    >
                      {draftCount > 0 ? `${draftCount} filtre uygula` : 'Uygula'}
                    </button>
                  </footer>
                </motion.aside>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  )
}

function FacetGroup({
  label,
  values,
  selected,
  onToggle,
  accent,
}: {
  label: string
  values: string[]
  selected: string[]
  onToggle: (v: string) => void
  accent?: boolean
}) {
  if (values.length === 0) return null
  return (
    <section className="mb-8">
      <div className="eyebrow mb-4">{label}</div>
      <div className="flex flex-wrap gap-2">
        {values.map((v) => {
          const isOn = selected.includes(v)
          return (
            <button
              key={v}
              type="button"
              onClick={() => onToggle(v)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer',
                isOn
                  ? accent
                    ? 'border-gold bg-gold text-ink'
                    : 'border-ink bg-ink text-titanium-50 dark:border-titanium-50 dark:bg-titanium-50 dark:text-ink'
                  : 'border-titanium-300 text-titanium-600 hover:border-gold hover:text-gold dark:border-ink-700 dark:text-titanium-300'
              )}
            >
              {v}
            </button>
          )
        })}
      </div>
    </section>
  )
}

function parseParams(p: ReturnType<typeof useSearchParams>) {
  return {
    malzeme: p.getAll('malzeme'),
    lake: p.getAll('lake'),
    cevre: p.getAll('cevre'),
  }
}
