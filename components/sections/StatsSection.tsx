'use client'

import { motion, useInView } from 'framer-motion'
import * as React from 'react'

type Props = {
  heading?: string
  stats?: Array<{ value: string; label: string; description?: string }>
}

function Counter({ value }: { value: string }) {
  const numeric = parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.'))
  const suffix = value.replace(/[\d.,\s]/g, '')
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = React.useState(0)

  React.useEffect(() => {
    if (!inView || isNaN(numeric)) return
    const duration = 1600
    const t0 = performance.now()
    let frame = 0
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(numeric * eased)
      if (p < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, numeric])

  if (isNaN(numeric)) return <span>{value}</span>
  const formatted = Number.isInteger(numeric)
    ? Math.round(n).toLocaleString('tr-TR')
    : n.toFixed(1)
  return (
    <span ref={ref}>
      {formatted}
      {suffix && <span className="text-gold">{suffix}</span>}
    </span>
  )
}

export function StatsSection({ heading, stats }: Props) {
  if (!stats || stats.length === 0) return null
  return (
    <section className="relative overflow-hidden bg-ink py-32 text-titanium-50">
      <div className="absolute inset-0 bg-navy-fade" />
      <div className="container-premium relative">
        {heading && (
          <h2 className="mx-auto mb-20 max-w-3xl text-center font-display text-display-lg tracking-tightest text-balance">
            {heading}
          </h2>
        )}

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="group relative flex flex-col gap-3 bg-ink p-10 transition-colors hover:bg-ink-900"
            >
              <div className="font-display text-5xl tracking-tightest md:text-6xl">
                <Counter value={s.value} />
              </div>
              <div className="eyebrow !text-gold">{s.label}</div>
              {s.description && (
                <p className="mt-2 text-sm leading-relaxed text-titanium-400">{s.description}</p>
              )}
              <span className="absolute inset-x-10 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
