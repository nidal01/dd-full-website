import { draftMode } from 'next/headers'
import Link from 'next/link'
import { Eye } from 'lucide-react'

export async function PreviewBanner() {
  const draft = await draftMode()
  if (!draft.isEnabled) return null
  return (
    <div className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full border border-gold/40 bg-ink px-4 py-2 text-xs text-titanium-100 shadow-premium backdrop-blur">
      <span className="flex items-center gap-1.5 text-gold">
        <Eye size={14} />
        Önizleme modu aktif
      </span>
      <Link
        href="/api/draft/disable"
        className="rounded-full bg-gold px-3 py-1 text-[11px] font-medium text-ink hover:bg-gold-300 transition-colors"
      >
        Kapat
      </Link>
    </div>
  )
}
