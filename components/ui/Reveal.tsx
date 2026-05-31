'use client'

import * as React from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'

type Props = {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'header' | 'span' | 'li'
  once?: boolean
}

/**
 * Reveal: viewport-tabanlı fade-up.
 * - prefers-reduced-motion: animasyonsuz, içerik anında görünür
 * - mount sonrası bir tick sonra zaten viewport'taysa animasyona geçer
 * - 600ms sonra hâlâ hidden ise (örn. programatik scroll) zorla göster (failsafe)
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
  once = true,
}: Props) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once, amount: 0.15 })
  const [forceShow, setForceShow] = React.useState(false)

  React.useEffect(() => {
    const t = setTimeout(() => setForceShow(true), 600)
    return () => clearTimeout(t)
  }, [])

  const visible = reduce || inView || forceShow
  const Comp: any = motion[as as 'div']

  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }

  return (
    <Comp
      ref={ref}
      className={className}
      initial="hidden"
      animate={visible ? 'show' : 'hidden'}
      variants={variants}
    >
      {children}
    </Comp>
  )
}
