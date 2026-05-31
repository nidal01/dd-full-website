'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import * as React from 'react'
import { urlFor } from '@/sanity/lib/image'
import { resolveHref, cn } from '@/lib/utils'

type Slide = { image?: any; caption?: string; eyebrow?: string; heading?: string }

type Props = {
  eyebrow?: string
  heading: string
  subheading?: string
  media?: { type?: 'image' | 'video'; image?: any; videoUrl?: string }
  slides?: Slide[]
  ctas?: Array<{ label: string; variant?: string; link?: any }>
  alignment?: 'left' | 'center'
  autoplayInterval?: number
}

export function HeroSection({
  eyebrow,
  heading,
  subheading,
  media,
  slides,
  ctas,
  alignment = 'left',
  autoplayInterval = 6,
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yMedia = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const isCenter = alignment === 'center'
  const hasSlider = Array.isArray(slides) && slides.length > 1
  const totalSlides = hasSlider ? slides!.length : 0

  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)

  // Autoplay
  React.useEffect(() => {
    if (!hasSlider || paused || !autoplayInterval) return
    const t = setInterval(() => setIndex((i) => (i + 1) % totalSlides), autoplayInterval * 1000)
    return () => clearInterval(t)
  }, [hasSlider, paused, autoplayInterval, totalSlides])

  const activeSlide = hasSlider ? slides![index] : null
  const displayEyebrow = activeSlide?.eyebrow ?? eyebrow
  const displayHeading = activeSlide?.heading ?? heading

  return (
    <section
      ref={ref}
      className="relative isolate -mt-24 min-h-screen overflow-hidden"
      aria-label="Hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* MEDIA — slider veya tek */}
      <motion.div style={{ y: yMedia }} className="absolute inset-0 -z-10">
        {hasSlider ? (
          <AnimatePresence mode="sync">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {slides![index].image && (
                <Image
                  src={urlFor(slides![index].image).width(2400).url()}
                  alt={slides![index].caption ?? ''}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>
        ) : media?.type === 'video' && media.videoUrl ? (
          <video
            src={media.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : media?.image ? (
          <Image
            src={urlFor(media.image).width(2400).url()}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-navy-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/95" />
        {/* Üst karartma şeridi — header (logo + nav) okunaklılığı için */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
      </motion.div>

      {/* TEXT */}
      <motion.div
        style={{ y: yText, opacity }}
        className={cn(
          'container-premium relative flex min-h-screen flex-col justify-end pb-28 pt-44 text-titanium-50',
          isCenter && 'items-center text-center'
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={cn(isCenter && 'flex flex-col items-center')}
          >
            {displayEyebrow && (
              <span className="eyebrow !text-brand-200 mb-6 inline-flex">
                {displayEyebrow}
              </span>
            )}

            <h1 className="max-w-5xl font-display text-display-2xl tracking-tightest text-balance text-titanium-50">
              {displayHeading}
            </h1>

            {subheading && (
              <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-titanium-200 md:text-xl">
                {subheading}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {ctas && ctas.length > 0 && (
          <div className={cn('mt-12 flex flex-wrap gap-3', isCenter && 'justify-center')}>
            {ctas.map((cta, i) => (
              <HeroCta
                key={i}
                href={cta.link ? resolveHref(cta.link) : '#'}
                variant={(cta.variant as any) ?? (i === 0 ? 'primary' : 'secondary')}
              >
                {cta.label}
              </HeroCta>
            ))}
          </div>
        )}

        {/* SLIDER CONTROLS */}
        {hasSlider && (
          <div
            className={cn(
              'absolute bottom-10 right-6 flex items-center gap-6 md:right-10',
              isCenter && 'left-1/2 right-auto -translate-x-1/2'
            )}
          >
            {/* Dots */}
            <div className="flex items-center gap-2">
              {slides!.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Slayt ${i + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-500 cursor-pointer',
                    i === index ? 'w-10 bg-brand' : 'w-1.5 bg-titanium-50/40 hover:bg-titanium-50/70'
                  )}
                />
              ))}
            </div>
            {/* Counter */}
            <span className="font-mono text-xs uppercase tracking-eyebrow text-titanium-300">
              {String(index + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Static scroll hint (only when no slider) */}
        {!hasSlider && (
          <div
            className={cn(
              'absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex',
            )}
          >
            <span className="text-[10px] uppercase tracking-eyebrow text-titanium-400">Keşfet</span>
            <span className="h-12 w-px bg-gradient-to-b from-brand to-transparent" />
          </div>
        )}
      </motion.div>
    </section>
  )
}

/**
 * Hero-specific CTA — Hero arka planı her zaman koyu olduğu için
 * varsayılan light-tema secondary butonu (koyu text) kontrastsız kalıyordu.
 * Burada light-on-dark optimize edildi.
 */
function HeroCta({
  href,
  variant,
  children,
}: {
  href: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  children: React.ReactNode
}) {
  const base =
    'group relative inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-medium transition-all duration-300 ease-premium cursor-pointer'
  const styles =
    variant === 'primary'
      ? 'bg-brand text-titanium-50 hover:bg-brand-400 hover:shadow-brand-glow'
      : variant === 'outline'
      ? 'border border-brand text-brand-100 hover:bg-brand hover:text-titanium-50'
      : variant === 'ghost'
      ? 'text-titanium-50 hover:text-brand-200'
      : // secondary — light glass on dark hero
        'border border-titanium-50/40 bg-titanium-50/5 text-titanium-50 backdrop-blur-sm hover:border-titanium-50 hover:bg-titanium-50/10'

  return (
    <a href={href} className={cn(base, styles)}>
      <span className="inline-flex items-center gap-2">
        {children}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </a>
  )
}
