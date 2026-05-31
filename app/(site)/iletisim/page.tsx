import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/fetch'
import { contactPageQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { ContactForm } from '@/components/contact/ContactForm'
import { WpPageShell } from '@/components/sections/WpPageShell'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<any>(contactPageQuery, {}, { tags: ['contactPage'] })
  return buildMetadata(data?.seo, { title: 'İletişim', description: 'Bize ulaşın.' })
}

export default async function ContactPage() {
  const [data, settings] = await Promise.all([
    sanityFetch<any>(contactPageQuery, {}, { tags: ['contactPage'] }),
    sanityFetch<any>(siteSettingsQuery, {}, { tags: ['siteSettings'] }),
  ])

  const addresses = data?.addressOverride?.length ? data.addressOverride : settings?.addresses ?? []
  const heading = data?.heading ?? 'Birlikte çalışalım.'
  const subheading =
    data?.subheading ??
    'Markanız için özel bir ambalaj çözümü mü arıyorsunuz? Ekibimiz 24 saat içinde size dönüş yapar.'

  return (
    <WpPageShell
      eyebrow="İletişim"
      heading={heading}
      subheading={subheading}
      heroImage="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop"
      ctas={[
        ...(settings?.contactEmail
          ? [{ label: 'E-posta Gönder', href: `mailto:${settings.contactEmail}`, variant: 'primary' as const }]
          : []),
        ...(settings?.contactPhone
          ? [{ label: 'Hemen Ara', href: `tel:${settings.contactPhone.replace(/\s/g, '')}`, variant: 'secondary' as const }]
          : []),
      ]}
    >
      <section className="container-premium grid grid-cols-1 gap-16 py-24 lg:grid-cols-[1.2fr_2fr]">
        {/* CONTACT INFO */}
        <aside className="flex flex-col gap-10">
          {settings?.contactEmail && (
            <InfoBlock
              icon={<Mail size={20} />}
              label="E-posta"
              value={settings.contactEmail}
              href={`mailto:${settings.contactEmail}`}
            />
          )}
          {settings?.contactPhone && (
            <InfoBlock
              icon={<Phone size={20} />}
              label="Telefon"
              value={settings.contactPhone}
              href={`tel:${settings.contactPhone.replace(/\s/g, '')}`}
            />
          )}

          {addresses.map((addr: any, i: number) => (
            <div key={i} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/5 text-gold">
                <MapPin size={20} />
              </span>
              <div>
                <div className="eyebrow mb-1">{addr.label ?? 'Ofis'}</div>
                <div className="font-display text-lg tracking-tightest">
                  {addr.city}{addr.country ? `, ${addr.country}` : ''}
                </div>
                {addr.street && (
                  <p className="mt-1 text-sm text-titanium-600 dark:text-titanium-400">
                    {addr.street}
                  </p>
                )}
                {addr.phone && (
                  <p className="mt-1 text-sm text-titanium-600 dark:text-titanium-400">{addr.phone}</p>
                )}
              </div>
            </div>
          ))}
        </aside>

        {/* FORM */}
        <div className="rounded-3xl border border-titanium-200/60 bg-titanium-50 p-8 dark:border-ink-700 dark:bg-ink-900/40 md:p-12">
          <ContactForm
            fields={data?.formFields}
            subjects={data?.subjects}
            successMessage={data?.successMessage}
          />
        </div>
      </section>

      {/* MAP */}
      {data?.mapEmbedUrl && (
        <section className="relative h-[480px] w-full overflow-hidden border-t border-titanium-200/60 dark:border-ink-700">
          <iframe
            src={data.mapEmbedUrl}
            className="h-full w-full grayscale-[40%] contrast-110"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Konum haritası"
          />
        </section>
      )}
    </WpPageShell>
  )
}

function InfoBlock({
  icon, label, value, href,
}: {
  icon: React.ReactNode; label: string; value: string; href: string
}) {
  return (
    <a href={href} className="group flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/5 text-gold transition-colors group-hover:bg-gold group-hover:text-titanium-50">
        {icon}
      </span>
      <div>
        <div className="eyebrow mb-1">{label}</div>
        <div className="font-display text-lg tracking-tightest transition-colors group-hover:text-gold">
          {value}
        </div>
      </div>
    </a>
  )
}
