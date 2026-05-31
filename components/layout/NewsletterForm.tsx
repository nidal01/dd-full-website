'use client'

import * as React from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function NewsletterForm() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [msg, setMsg] = React.useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        setStatus('error')
        setMsg(json.message ?? 'Hata.')
        return
      }
      setStatus('ok')
      setMsg(json.message)
      setEmail('')
    } catch {
      setStatus('error')
      setMsg('Beklenmedik bir hata oluştu.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <label htmlFor="newsletter-email" className="eyebrow !text-gold mb-3">
        Bülten
      </label>
      <div
        className={cn(
          'mt-3 flex items-center gap-1 rounded-full border bg-ink-900/40 p-1 pl-5 transition-colors',
          status === 'error'
            ? 'border-rose-500/40'
            : status === 'ok'
            ? 'border-gold/40'
            : 'border-ink-700 focus-within:border-gold'
        )}
      >
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ornek@sirket.com"
          className="flex-1 bg-transparent text-sm text-titanium-100 placeholder:text-titanium-500 outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          aria-label="Abone ol"
          className={cn(
            'grid h-10 w-10 place-items-center rounded-full transition-all cursor-pointer',
            status === 'ok' ? 'bg-gold text-ink' : 'bg-gold text-ink hover:bg-gold-300'
          )}
        >
          {status === 'loading' ? (
            <Loader2 size={16} className="animate-spin" />
          ) : status === 'ok' ? (
            <Check size={16} />
          ) : (
            <ArrowRight size={16} />
          )}
        </button>
      </div>
      {msg && (
        <p
          className={cn(
            'mt-3 text-xs',
            status === 'error' ? 'text-rose-400' : 'text-gold'
          )}
        >
          {msg}
        </p>
      )}
      <p className="mt-3 text-[11px] text-titanium-500">
        KVKK kapsamında bilgilerinizi sadece bülten gönderimi için kullanıyoruz.
      </p>
    </form>
  )
}
