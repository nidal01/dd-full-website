'use server'

import { renderContactEmail, sendMail } from '@/lib/mail'

type Result =
  | { ok: true; message: string }
  | { ok: false; errors: Record<string, string>; message?: string }

export async function submitContactForm(formData: FormData): Promise<Result> {
  const data = Object.fromEntries(formData.entries()) as Record<string, string>
  const errors: Record<string, string> = {}

  // Honeypot
  if (data.website) return { ok: true, message: 'Teşekkürler.' }

  if (!data.name || data.name.trim().length < 2) errors.name = 'Lütfen adınızı girin.'
  if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) errors.email = 'Geçerli bir e-posta gerekli.'
  if (!data.message || data.message.trim().length < 10) errors.message = 'Mesaj en az 10 karakter olmalı.'
  if (!data.consent) errors.consent = 'Devam etmek için onay vermelisiniz.'

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, message: 'Lütfen formu kontrol edin.' }
  }

  try {
    const to = process.env.CONTACT_SUBMIT_EMAIL ?? 'info@durandogan.com'
    const subject = `Yeni iletişim talebi — ${data.subject ?? data.name}`
    await sendMail({
      to,
      subject,
      html: renderContactEmail(data),
      replyTo: data.email,
    })
    return {
      ok: true,
      message: 'Talebiniz başarıyla iletildi. Ekibimiz en kısa sürede dönüş yapacak.',
    }
  } catch (err: any) {
    return {
      ok: false,
      errors: {},
      message: 'Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.',
    }
  }
}
