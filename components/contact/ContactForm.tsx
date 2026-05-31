'use client'

import * as React from 'react'
import { useFormStatus } from 'react-dom'
import { Check, Loader2 } from 'lucide-react'
import { submitContactForm } from '@/app/(site)/iletisim/actions'
import { cn } from '@/lib/utils'

type Field = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: string[]
}

type Props = {
  fields?: Field[]
  subjects?: string[]
  successMessage?: string
}

const fallbackFields: Field[] = [
  { name: 'name', label: 'Ad Soyad', type: 'text', required: true, placeholder: 'Adınız Soyadınız' },
  { name: 'email', label: 'E-posta', type: 'email', required: true, placeholder: 'sirket@ornek.com' },
  { name: 'company', label: 'Şirket', type: 'text', placeholder: 'Marka adı' },
  { name: 'phone', label: 'Telefon', type: 'tel', placeholder: '+90 ...' },
  { name: 'message', label: 'Mesajınız', type: 'textarea', required: true, placeholder: 'Projeniz hakkında kısa bilgi…' },
]

export function ContactForm({ fields, subjects, successMessage }: Props) {
  const fs = fields && fields.length > 0 ? fields : fallbackFields
  const [state, setState] = React.useState<{
    ok?: boolean
    message?: string
    errors?: Record<string, string>
  }>({})

  async function action(formData: FormData) {
    const res = await submitContactForm(formData)
    setState(res)
    if (res.ok) {
      ;(document.getElementById('contact-form') as HTMLFormElement | null)?.reset()
    }
  }

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/5 p-10 text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-gold text-ink">
          <Check size={22} />
        </div>
        <h3 className="font-display text-2xl tracking-tightest">Teşekkürler.</h3>
        <p className="mt-3 text-titanium-600 dark:text-titanium-300">
          {state.message ?? successMessage ?? 'Talebiniz başarıyla iletildi.'}
        </p>
      </div>
    )
  }

  return (
    <form
      id="contact-form"
      action={action}
      className="space-y-6"
      noValidate
    >
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {subjects && subjects.length > 0 && (
        <div>
          <Label htmlFor="subject">Konu</Label>
          <select
            id="subject"
            name="subject"
            className={baseInput}
            defaultValue=""
          >
            <option value="" disabled>Bir konu seçin…</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {fs.filter((f) => f.type !== 'textarea').map((f) => (
          <FieldInput key={f.name} field={f} error={state.errors?.[f.name]} />
        ))}
      </div>

      {fs.filter((f) => f.type === 'textarea').map((f) => (
        <FieldInput key={f.name} field={f} error={state.errors?.[f.name]} />
      ))}

      <label className="flex items-start gap-3 text-sm text-titanium-600 dark:text-titanium-300">
        <input
          type="checkbox"
          name="consent"
          value="1"
          required
          className="mt-1 h-4 w-4 accent-gold"
        />
        <span>
          KVKK ve gizlilik politikası kapsamında bilgilerimin işlenmesini kabul ediyorum.
        </span>
      </label>
      {state.errors?.consent && (
        <p className="-mt-3 text-xs text-rose-500">{state.errors.consent}</p>
      )}

      {state.message && !state.ok && (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-500">
          {state.message}
        </div>
      )}

      <SubmitButton />
    </form>
  )
}

const baseInput = cn(
  'mt-2 block w-full rounded-xl border border-titanium-300 bg-titanium-50 px-4 py-3 text-sm',
  'placeholder:text-titanium-400 outline-none',
  'transition-colors duration-200',
  'focus:border-gold focus:ring-2 focus:ring-gold/30',
  'dark:border-ink-700 dark:bg-ink-900 dark:placeholder:text-titanium-500'
)

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-xs font-medium uppercase tracking-eyebrow text-titanium-500">
      {children}
    </label>
  )
}

function FieldInput({ field, error }: { field: Field; error?: string }) {
  const common = {
    id: field.name,
    name: field.name,
    required: field.required,
    placeholder: field.placeholder,
    'aria-invalid': !!error,
    className: cn(baseInput, error && 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/30'),
  }
  return (
    <div className={field.type === 'textarea' ? 'col-span-full' : ''}>
      <Label htmlFor={field.name}>
        {field.label}
        {field.required && <span className="ml-1 text-gold">*</span>}
      </Label>
      {field.type === 'textarea' ? (
        <textarea {...(common as any)} rows={5} />
      ) : field.type === 'select' && field.options ? (
        <select {...(common as any)} defaultValue="">
          <option value="" disabled>Seçin…</option>
          {field.options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input {...(common as any)} type={field.type} />
      )}
      {error && <p className="mt-1.5 text-xs text-rose-500">{error}</p>}
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'btn-magnetic btn-magnetic--primary w-full sm:w-auto sm:min-w-[200px]',
        pending && 'opacity-80'
      )}
    >
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Gönderiliyor…
        </>
      ) : (
        <>Mesajı Gönder</>
      )}
    </button>
  )
}
