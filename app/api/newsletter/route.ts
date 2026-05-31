import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string }
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: 'Geçerli bir e-posta girin.' }, { status: 400 })
  }

  // TODO: provider-specific call (Mailchimp / Brevo / Resend audience etc.)
  try {
    const provider = process.env.NEWSLETTER_PROVIDER ?? 'log'
    if (provider === 'log') {
      // eslint-disable-next-line no-console
      console.info('[Newsletter] subscribe →', email)
    }
    return NextResponse.json({ ok: true, message: 'Bültenimize abone oldunuz.' })
  } catch {
    return NextResponse.json({ ok: false, message: 'Bir hata oluştu.' }, { status: 500 })
  }
}
