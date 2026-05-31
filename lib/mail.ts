import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY
const FROM = process.env.MAIL_FROM ?? 'Duran Doğan <noreply@durandogan.com>'

let resend: Resend | null = null
function getClient() {
  if (!apiKey) return null
  if (!resend) resend = new Resend(apiKey)
  return resend
}

type SendOpts = {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}

export async function sendMail({ to, subject, html, text, replyTo }: SendOpts) {
  const client = getClient()
  if (!client) {
    // eslint-disable-next-line no-console
    console.warn('[mail] RESEND_API_KEY not set — would have sent:', { to, subject })
    return { ok: true, dryRun: true }
  }
  const res = await client.emails.send({
    from: FROM,
    to,
    subject,
    html,
    text,
    replyTo,
  })
  if (res.error) {
    throw new Error(res.error.message)
  }
  return { ok: true, id: res.data?.id }
}

export function renderContactEmail(data: Record<string, string>) {
  const rows = Object.entries(data)
    .filter(([k]) => !['website', 'consent'].includes(k))
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:8px 12px;color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;border-bottom:1px solid #E5E7EB;">${escape(k)}</td>
          <td style="padding:8px 12px;color:#05070D;font-size:14px;border-bottom:1px solid #E5E7EB;">${escape(v).replace(/\n/g, '<br/>')}</td>
        </tr>`
    )
    .join('')

  return `
  <div style="font-family:Inter,system-ui,sans-serif;max-width:640px;margin:0 auto;padding:32px;background:#FAFAFB;">
    <div style="background:#05070D;color:#F3F4F6;border-radius:16px;padding:32px;">
      <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#D4AF37;">Duran Doğan</div>
      <h1 style="font-family:'Clash Display',Inter;font-size:28px;margin:8px 0 0;letter-spacing:-0.02em;">Yeni İletişim Talebi</h1>
    </div>
    <table style="width:100%;margin-top:24px;background:#fff;border-radius:12px;border:1px solid #E5E7EB;border-collapse:separate;border-spacing:0;overflow:hidden;">
      ${rows}
    </table>
    <p style="margin-top:16px;font-size:11px;color:#9CA3AF;">Bu e-posta durandogan.com iletişim formundan gönderildi.</p>
  </div>`
}

function escape(s: string) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  )
}
