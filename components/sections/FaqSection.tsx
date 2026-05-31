'use client'

import * as React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { PortableText } from '@/components/ui/PortableText'
import { JsonLd } from '@/components/seo/JsonLd'

type Item = { question: string; answer?: any }

type Props = {
  eyebrow?: string
  heading?: string
  subheading?: string
  items?: Item[]
}

export function FaqSection({ eyebrow = 'SSS', heading, subheading, items }: Props) {
  if (!items || items.length === 0) return null

  // Schema.org FAQPage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: portableToPlainText(i.answer),
      },
    })),
  }

  return (
    <section className="container-premium grid grid-cols-1 gap-16 py-32 lg:grid-cols-[1fr_1.5fr]">
      <JsonLd data={jsonLd} />
      <SectionHeader
        eyebrow={eyebrow}
        heading={heading ?? 'Sıkça sorulan sorular'}
        subheading={subheading}
        className="lg:sticky lg:top-32 lg:self-start"
      />

      <Accordion.Root type="single" collapsible className="divide-y divide-titanium-200/60 border-y border-titanium-200/60 dark:divide-ink-700 dark:border-ink-700">
        {items.map((it, i) => (
          <FaqItem key={i} value={`q-${i}`} question={it.question} answer={it.answer} />
        ))}
      </Accordion.Root>
    </section>
  )
}

function FaqItem({ value, question, answer }: { value: string; question: string; answer?: any }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Accordion.Item value={value}>
      <Accordion.Header asChild>
        <Accordion.Trigger
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors hover:text-gold cursor-pointer"
        >
          <span className="font-display text-xl tracking-tightest md:text-2xl">{question}</span>
          <span
            className={
              'grid h-9 w-9 shrink-0 place-items-center rounded-full border border-titanium-300 transition-all duration-500 group-hover:border-gold group-hover:text-gold ' +
              (open ? 'rotate-45 border-gold text-gold' : '')
            }
          >
            <Plus size={16} />
          </span>
        </Accordion.Trigger>
      </Accordion.Header>
      <AnimatePresence initial={false}>
        {open && (
          <Accordion.Content forceMount asChild>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="max-w-2xl pb-7 text-pretty text-titanium-600 dark:text-titanium-400">
                {answer ? <PortableText value={answer} /> : null}
              </div>
            </motion.div>
          </Accordion.Content>
        )}
      </AnimatePresence>
    </Accordion.Item>
  )
}

function portableToPlainText(blocks: any[] = []): string {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .map((b) =>
      b?._type === 'block'
        ? (b.children ?? []).map((c: any) => c?.text ?? '').join('')
        : ''
    )
    .filter(Boolean)
    .join(' ')
}
