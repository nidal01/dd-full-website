'use client'

import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmblaApi = UseEmblaCarouselType[1]

type Props = {
  children: React.ReactNode
  className?: string
  slideClassName?: string
  options?: Parameters<typeof useEmblaCarousel>[0]
  showControls?: boolean
  showDots?: boolean
  ariaLabel?: string
}

export function Carousel({
  children,
  className,
  slideClassName,
  options = { loop: false, align: 'start', dragFree: true, containScroll: 'trimSnaps' },
  showControls = true,
  showDots = true,
  ariaLabel = 'Galeri',
}: Props) {
  const [emblaRef, embla] = useEmblaCarousel(options)
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(false)
  const [snaps, setSnaps] = React.useState<number[]>([])
  const [active, setActive] = React.useState(0)

  const onSelect = React.useCallback((api: EmblaApi) => {
    if (!api) return
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
    setActive(api.selectedScrollSnap())
  }, [])

  React.useEffect(() => {
    if (!embla) return
    setSnaps(embla.scrollSnapList())
    onSelect(embla)
    embla.on('select', onSelect)
    embla.on('reInit', onSelect)
    return () => {
      embla.off('select', onSelect)
      embla.off('reInit', onSelect)
    }
  }, [embla, onSelect])

  const slides = React.Children.toArray(children)

  return (
    <div className={cn('relative', className)} aria-label={ariaLabel} role="region">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6 [&>*]:shrink-0">
          {slides.map((child, i) => (
            <div
              key={i}
              className={cn(
                'min-w-0 basis-[85%] sm:basis-[60%] lg:basis-[38%] xl:basis-[32%]',
                slideClassName
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showControls && slides.length > 1 && (
        <div className="mt-8 flex items-center justify-between gap-4">
          {showDots ? (
            <div className="flex items-center gap-1.5">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => embla?.scrollTo(i)}
                  aria-label={`Slayt ${i + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-500 cursor-pointer',
                    i === active ? 'w-8 bg-gold' : 'w-1.5 bg-titanium-400 hover:bg-titanium-500'
                  )}
                />
              ))}
            </div>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => embla?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Önceki"
              className="grid h-11 w-11 place-items-center rounded-full border border-titanium-300 transition-all hover:border-gold hover:text-gold disabled:opacity-30 cursor-pointer dark:border-ink-700"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => embla?.scrollNext()}
              disabled={!canNext}
              aria-label="Sonraki"
              className="grid h-11 w-11 place-items-center rounded-full border border-titanium-300 transition-all hover:border-gold hover:text-gold disabled:opacity-30 cursor-pointer dark:border-ink-700"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
