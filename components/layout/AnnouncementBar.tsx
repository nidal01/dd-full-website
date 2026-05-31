'use client'

import Link from 'next/link'
import * as React from 'react'
import { X } from 'lucide-react'
import { resolveHref } from '@/lib/utils'

type Props = {
  announcement: {
    enabled: boolean
    text?: string
    link?: any
  }
}

export function AnnouncementBar({ announcement }: Props) {
  const [dismissed, setDismissed] = React.useState(false)
  if (!announcement?.enabled || !announcement.text || dismissed) return null

  const href = announcement.link ? resolveHref(announcement.link) : null

  return (
    <div className="relative z-[60] bg-ink text-titanium-100 border-b border-ink-700">
      <div className="container-premium flex items-center justify-center gap-4 py-2 text-[12px] tracking-wide">
        {href ? (
          <Link href={href} className="hover:text-gold transition-colors">
            {announcement.text}
            <span className="ml-2 text-gold">→</span>
          </Link>
        ) : (
          <span>{announcement.text}</span>
        )}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Duyuruyu kapat"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-titanium-400 hover:text-gold transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
