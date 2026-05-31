import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { WpPageShell, CtaBlock } from '@/components/sections/WpPageShell'
import { Reveal } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Yıllık Faaliyet Raporları',
  description:
    'Duran Doğan Ambalaj Yıllık Faaliyet Raporları — 2003-2024 dönemine ait tüm raporlar.',
}

// 2003-2024 — 22 yıl
const years = Array.from({ length: 22 }, (_, i) => 2024 - i)

export default function FaaliyetPage() {
  return (
    <WpPageShell
      eyebrow="Yatırımcı İlişkileri"
      heading="Yıllık Faaliyet Raporları."
      subheading="Borsa İstanbul'da işlem gören halka açık bir şirket olarak; şirketimizin kurumsal faaliyetlerine ilişkin bilgileri 22 yıllık arşivimizle paydaşlarımızla şeffaf biçimde paylaşıyoruz."
      ctas={[
        { label: 'Finansal Bilgiler', href: '/yatirimci/finansal-bilgiler', variant: 'primary' },
        { label: 'Kurumsal', href: '/kurumsal', variant: 'secondary' },
      ]}
    >
      <section className="container-premium py-24">
        <div className="eyebrow mb-4">Arşiv</div>
        <h2 className="max-w-3xl font-display text-display-lg tracking-tightest text-balance">
          2003 — 2024 dönemine ait tüm faaliyet raporları.
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {years.map((y, i) => (
            <Reveal
              key={y}
              delay={(i % 8) * 0.04}
              as="article"
              className="group flex items-center justify-between rounded-2xl border border-titanium-200/60 bg-titanium-50 p-5 transition-all hover:border-gold/50 hover:shadow-premium dark:border-ink-700 dark:bg-ink-900/40"
            >
              <div>
                <div className="font-display text-3xl tracking-tightest text-ink dark:text-titanium-50">{y}</div>
                <div className="text-xs uppercase tracking-eyebrow text-titanium-500">Faaliyet Raporu</div>
              </div>
              <a
                href={`/iletisim?konu=faaliyet-raporu-${y}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-gold/5 text-gold transition-colors hover:bg-gold hover:text-ink"
                aria-label={`${y} faaliyet raporu`}
              >
                <FileText size={16} />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBlock
        eyebrow="Bilgi Talebi"
        heading="Yatırımcı ilişkileri özel taleplerinize özel destek."
        cta={{ label: 'İletişim', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
