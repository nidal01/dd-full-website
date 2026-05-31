'use client'

import * as React from 'react'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

type Slide = {
  kind: 'image' | 'video' | 'model3d'
  image?: any
  video?: string
  poster?: any
}

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  slides: Slide[]
  index: number
  setIndex: (i: number) => void
  title: string
}

export function Lightbox({ open, onOpenChange, slides, index, setIndex, title }: Props) {
  const next = React.useCallback(
    () => setIndex((index + 1) % slides.length),
    [index, slides.length, setIndex]
  )
  const prev = React.useCallback(
    () => setIndex((index - 1 + slides.length) % slides.length),
    [index, slides.length, setIndex]
  )

  React.useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, next, prev])

  const active = slides[index]
  if (!active) return null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-[100] grid place-items-center p-6"
              >
                <Dialog.Title className="sr-only">{title} — büyük görsel</Dialog.Title>

                <Dialog.Close
                  aria-label="Kapat"
                  className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-titanium-50/10 text-titanium-50 backdrop-blur hover:bg-gold hover:text-ink transition-colors cursor-pointer"
                >
                  <X size={20} />
                </Dialog.Close>

                {slides.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="Önceki"
                      className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-titanium-50/10 text-titanium-50 backdrop-blur hover:bg-gold hover:text-ink transition-colors cursor-pointer md:left-10"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Sonraki"
                      className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-titanium-50/10 text-titanium-50 backdrop-blur hover:bg-gold hover:text-ink transition-colors cursor-pointer md:right-10"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative max-h-[88vh] max-w-[1400px]"
                  >
                    {active.kind === 'image' && active.image && (
                      <Image
                        src={urlFor(active.image).width(2400).url()}
                        alt={title}
                        width={2000}
                        height={2000}
                        className="max-h-[88vh] w-auto rounded-2xl object-contain"
                        priority
                      />
                    )}
                    {active.kind === 'video' && active.video && (
                      <video
                        src={active.video}
                        controls
                        autoPlay
                        className="max-h-[88vh] rounded-2xl"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-ink/60 px-4 py-1.5 text-xs uppercase tracking-eyebrow text-titanium-300 backdrop-blur">
                  {index + 1} / {slides.length}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
