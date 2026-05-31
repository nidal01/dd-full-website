'use client'

import * as React from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'
import { Box, Expand, Play, Image as ImageIcon } from 'lucide-react'
import { Lightbox } from './Lightbox'

type GalleryItem = {
  kind: 'image' | 'video' | 'model3d'
  image?: any
  video?: string
  model?: { asset?: { url?: string } }
  poster?: any
}

type Props = {
  cover: any
  items?: GalleryItem[]
  title: string
}

export function ProductGallery({ cover, items = [], title }: Props) {
  const slides = React.useMemo<GalleryItem[]>(
    () => [{ kind: 'image', image: cover } as GalleryItem, ...items],
    [cover, items]
  )
  const [idx, setIdx] = React.useState(0)
  const [lightboxOpen, setLightboxOpen] = React.useState(0 as number | boolean)
  const active = slides[idx]

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_120px]">
      <div className="group relative aspect-square overflow-hidden rounded-3xl bg-ink-900 lg:order-2-none">
        {active.kind !== 'model3d' && (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Tam ekran"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-titanium-50/90 text-ink opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100 hover:bg-gold cursor-pointer"
          >
            <Expand size={18} />
          </button>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {active.kind === 'image' && active.image && (
              <Image
                src={urlFor(active.image).width(1600).url()}
                alt={title}
                fill
                priority={idx === 0}
                sizes="(min-width: 1024px) 800px, 100vw"
                className="object-cover"
              />
            )}
            {active.kind === 'video' && active.video && (
              <video
                src={active.video}
                autoPlay
                muted
                loop
                playsInline
                controls
                poster={active.poster ? urlFor(active.poster).width(1600).url() : undefined}
                className="h-full w-full object-cover"
              />
            )}
            {active.kind === 'model3d' && active.model?.asset?.url && (
              <ModelViewer src={active.model.asset.url} alt={title} poster={active.poster} />
            )}
          </motion.div>
        </AnimatePresence>
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/15" />
      </div>

      <div className="flex gap-3 lg:order-2 lg:flex-col">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Görsel ${i + 1}`}
            className={cn(
              'relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border transition-all cursor-pointer lg:w-auto',
              i === idx
                ? 'border-gold ring-2 ring-gold/30'
                : 'border-titanium-200/60 dark:border-ink-700 hover:border-gold/50'
            )}
          >
            {(s.image || s.poster) && (
              <Image
                src={urlFor(s.image || s.poster).width(240).height(240).url()}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            )}
            <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-ink/70 text-titanium-50">
              {s.kind === 'video' ? <Play size={10} /> : s.kind === 'model3d' ? <Box size={10} /> : <ImageIcon size={10} />}
            </span>
          </button>
        ))}
      </div>

      <Lightbox
        open={!!lightboxOpen}
        onOpenChange={(v) => setLightboxOpen(v)}
        slides={slides.filter((s) => s.kind !== 'model3d') as any}
        index={Math.min(idx, slides.filter((s) => s.kind !== 'model3d').length - 1)}
        setIndex={setIdx}
        title={title}
      />
    </div>
  )
}

/** Lightweight model-viewer wrapper using Google's web component (no extra deps). */
function ModelViewer({ src, alt, poster }: { src: string; alt: string; poster?: any }) {
  React.useEffect(() => {
    if (customElements.get('model-viewer')) return
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@google/model-viewer@^4/dist/model-viewer.min.js'
    document.head.appendChild(script)
  }, [])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore — model-viewer is a custom element
  return React.createElement('model-viewer', {
    src,
    alt,
    'camera-controls': true,
    'auto-rotate': true,
    'shadow-intensity': '1',
    style: { width: '100%', height: '100%', backgroundColor: '#0A0E1A' },
    poster: poster ? urlFor(poster).width(1200).url() : undefined,
  })
}
