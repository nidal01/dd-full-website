'use client'

import * as React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const groupLabels: Record<string, string> = {
  malzeme: 'Malzeme',
  lake: 'Lake',
  cevre: 'Sürdürülebilirlik',
  kategori: 'Kategori',
  q: 'Arama',
}

export function ActiveFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const chips: Array<{ key: string; value: string; group: string }> = []
  for (const [key, value] of params.entries()) {
    if (!groupLabels[key]) continue
    chips.push({ key: `${key}:${value}`, group: key, value })
  }

  if (chips.length === 0) return null

  function remove(group: string, value: string) {
    const next = new URLSearchParams(params)
    const remaining = next.getAll(group).filter((v) => v !== value)
    next.delete(group)
    remaining.forEach((v) => next.append(group, v))
    const q = next.toString()
    router.push(q ? `${pathname}?${q}` : pathname, { scroll: false })
  }

  function clearAll() {
    router.push(pathname, { scroll: false })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimatePresence>
        {chips.map((c) => (
          <motion.button
            key={c.key}
            layout
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => remove(c.group, c.value)}
            className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-3 py-1.5 text-xs text-gold hover:bg-gold hover:text-ink transition-colors cursor-pointer"
          >
            <span className="opacity-70">{groupLabels[c.group]}:</span>
            <span className="font-medium">{c.value}</span>
            <X size={12} className="opacity-70 group-hover:opacity-100" />
          </motion.button>
        ))}
      </AnimatePresence>
      <button
        type="button"
        onClick={clearAll}
        className="ml-2 text-xs uppercase tracking-eyebrow text-titanium-500 hover:text-gold transition-colors cursor-pointer"
      >
        Tümünü temizle
      </button>
    </div>
  )
}
