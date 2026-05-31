'use client'

import * as React from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import { SectionHeader } from '@/components/ui/SectionHeader'

type Item = {
  quote: string
  authorName?: string
  authorRole?: string
  company?: string
  avatar?: any
  companyLogo?: any
}

type Props = { heading?: string; items?: Item[] }

export function TestimonialsSection({ heading, items }: Props) {
  const [i, setI] = React.useState(0)
  if (!items || items.length === 0) return null
  const total = items.length
  const next = () => setI((p) => (p + 1) % total)
  const prev = () => setI((p) => (p - 1 + total) % total)
  const item = items[i]

  return (
    <section className="container-premium py-32">
      <SectionHeader
        eyebrow="Müşteri Sözü"
        heading={heading ?? 'Dünyanın en iddialı markaları bize güveniyor'}
        align="center"
      />

      <div className="mt-20">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-4xl text-center"
          >
            {item.companyLogo && (
              <Image
                src={urlFor(item.companyLogo).height(64).url()}
                alt={item.company ?? ''}
                width={120}
                height={32}
                className="mx-auto mb-10 h-7 w-auto opacity-60"
              />
            )}
            <blockquote className="font-display text-3xl leading-tight tracking-tightest text-balance md:text-4xl lg:text-5xl">
              <span className="text-gold">“</span>
              {item.quote}
              <span className="text-gold">”</span>
            </blockquote>
            <figcaption className="mt-12 flex items-center justify-center gap-4">
              {item.avatar && (
                <Image
                  src={urlFor(item.avatar).width(80).height(80).url()}
                  alt={item.authorName ?? ''}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
              <div className="text-left">
                <div className="font-medium">{item.authorName}</div>
                <div className="text-sm text-titanium-500">
                  {item.authorRole}
                  {item.company && ` · ${item.company}`}
                </div>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        {total > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Önceki referans"
              className="grid h-11 w-11 place-items-center rounded-full border border-titanium-300 hover:border-gold hover:text-gold transition-colors cursor-pointer dark:border-ink-700"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1.5">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`${idx + 1}. referans`}
                  className={
                    'h-1.5 rounded-full transition-all duration-500 cursor-pointer ' +
                    (idx === i ? 'w-8 bg-gold' : 'w-1.5 bg-titanium-400 hover:bg-titanium-500')
                  }
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Sonraki referans"
              className="grid h-11 w-11 place-items-center rounded-full border border-titanium-300 hover:border-gold hover:text-gold transition-colors cursor-pointer dark:border-ink-700"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
