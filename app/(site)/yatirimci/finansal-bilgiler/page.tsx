import type { Metadata } from 'next'
import { FileBarChart2 } from 'lucide-react'
import { WpPageShell, CtaBlock } from '@/components/sections/WpPageShell'
import { Reveal } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Finansal Bilgiler',
  description:
    'Duran Doğan Ambalaj finansal raporları — 2006-2025 dönemine ait üç aylık (Q1, Q2, Q3) ve yıl sonu finansal tablolar.',
}

const years = Array.from({ length: 20 }, (_, i) => 2025 - i) // 2025..2006
const quarters = ['Q1', 'Q2', 'Q3', 'Y/S']

export default function FinansalPage() {
  return (
    <WpPageShell
      eyebrow="Yatırımcı İlişkileri"
      heading="Finansal Bilgiler."
      subheading="Halka açık şirketimizin (BIST) finansal tabloları; 2006-2025 dönemini kapsayan üç aylık ve yıl sonu raporlamalarımızla şeffaf bir bilgi paylaşımı sunar."
      ctas={[
        { label: 'Faaliyet Raporları', href: '/yatirimci/faaliyet-raporlari', variant: 'secondary' },
      ]}
    >
      <section className="container-premium py-24">
        <div className="eyebrow mb-4">Üç aylık & yıl sonu</div>
        <h2 className="max-w-3xl font-display text-display-lg tracking-tightest text-balance">
          Çeyreklik & yıl sonu finansal tablolar arşivi.
        </h2>
        <p className="mt-4 max-w-2xl text-titanium-600 dark:text-titanium-400">
          2006-2011 dönemine ait dosyalar ZIP arşivi olarak; sonraki yıllar
          PDF olarak sunulmaktadır.
        </p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-titanium-200/60 dark:border-ink-700">
          <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] bg-ink/95 text-xs uppercase tracking-eyebrow text-titanium-200">
            <div className="p-4">Yıl</div>
            {quarters.map((q) => (
              <div key={q} className="p-4 text-center">{q}</div>
            ))}
          </div>
          {years.map((y, i) => (
            <Reveal
              key={y}
              delay={Math.min(i, 6) * 0.03}
              className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] items-center border-t border-titanium-200/60 bg-titanium-50 transition-colors hover:bg-titanium-100/60 dark:border-ink-700 dark:bg-ink-900/40 dark:hover:bg-ink-900/70"
            >
              <div className="p-4 font-display text-2xl tracking-tightest text-gold">{y}</div>
              {quarters.map((q) => (
                <a
                  key={q}
                  href={`/iletisim?konu=finansal-${y}-${q}`}
                  className="m-2 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-titanium-200/60 text-xs text-titanium-700 transition-colors hover:border-gold hover:bg-gold/5 hover:text-gold dark:border-ink-700 dark:text-titanium-300"
                >
                  <FileBarChart2 size={14} />
                  Görüntüle
                </a>
              ))}
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBlock
        eyebrow="Yatırımcı Destek"
        heading="Özel finansal veri talepleriniz için iletişime geçin."
        cta={{ label: 'İletişim', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
