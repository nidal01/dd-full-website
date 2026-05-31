'use client'

import { useEffect } from 'react'
import { RotateCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[App Error]', error)
  }, [error])

  return (
    <section className="container-premium grid min-h-[70vh] place-items-center py-32 text-center">
      <div>
        <div className="font-display text-[10rem] leading-none tracking-tightest text-gold">
          500
        </div>
        <h1 className="mt-6 font-display text-display-lg tracking-tightest">
          Bir şeyler ters gitti.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-titanium-500">
          Sunucu tarafında beklenmedik bir hata oluştu. Lütfen tekrar deneyin.
        </p>
        {error.digest && (
          <code className="mt-4 inline-block rounded-full bg-titanium-100 px-3 py-1 text-[11px] text-titanium-500 dark:bg-ink-900">
            ref: {error.digest}
          </code>
        )}
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="btn-magnetic btn-magnetic--primary"
          >
            <RotateCw size={16} />
            Tekrar dene
          </button>
          <a href="/" className="btn-magnetic btn-magnetic--secondary">
            Ana sayfaya dön
          </a>
        </div>
      </div>
    </section>
  )
}
