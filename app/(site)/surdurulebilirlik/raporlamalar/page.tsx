import type { Metadata } from 'next'
import { FileText, Download } from 'lucide-react'
import { WpPageShell, CtaBlock } from '@/components/sections/WpPageShell'
import { Reveal } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Sürdürülebilirlik Raporlamaları',
  description:
    'GRI ve TSRS uyumlu sürdürülebilirlik raporlarımız; iklim aksiyonu, döngüsel ekonomi ve etik iş uygulamalarını kapsayan şeffaf paylaşım.',
}

const reports = [
  {
    year: '2024',
    title: 'GRI Uyumlu Sürdürülebilirlik Raporu',
    body: 'Global Reporting Initiative Standartlarına uyumlu yayımladığımız ilk raporumuz. Sürdürülebilirliği kurumsal stratejimizin merkezine yerleştirdiğimizin somut göstergesi.',
  },
  {
    year: '2024',
    title: 'TSRS Uyumlu Sürdürülebilirlik Raporu',
    body: 'Türkiye Sürdürülebilirlik Raporlama Standartlarına (TSRS) tam uyumlu olarak yayımladığımız rapor.',
  },
]

export default function RaporlamalarPage() {
  return (
    <WpPageShell
      eyebrow="Sürdürülebilirlik"
      heading="Şeffaflık, hesap verebilirlik — uluslararası standartlarda raporlama."
      subheading="50 yılı aşkın deneyimimizle yayımladığımız sürdürülebilirlik raporlarımız; iklim aksiyonu, döngüsel ekonomi, karbon ayak izi azaltımı, çalışan güvenliği ve etik iş uygulamalarını kapsar."
      ctas={[{ label: 'Stratejimiz', href: '/surdurulebilirlik/stratejimiz', variant: 'secondary' }]}
    >
      <section className="container-premium py-24">
        <div className="eyebrow mb-4">Yayımlanan Raporlar</div>
        <h2 className="max-w-3xl font-display text-display-lg tracking-tightest text-balance">
          2024 yılı raporlama dönemi: 1 Ocak — 31 Aralık 2024.
        </h2>
        <p className="mt-4 max-w-2xl text-titanium-600 dark:text-titanium-400">
          Raporlarımız; ana şirket ve tam konsolide tüm bağlı ortaklıklarımızı
          kapsar.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {reports.map((r, i) => (
            <Reveal
              key={r.title}
              delay={i * 0.06}
              as="article"
              className="group flex flex-col gap-4 rounded-2xl border border-titanium-200/60 bg-titanium-50 p-8 transition-all hover:border-gold/50 hover:shadow-premium dark:border-ink-700 dark:bg-ink-900/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/40 bg-gold/5 text-gold">
                <FileText size={20} />
              </span>
              <div className="font-display text-4xl tracking-tightest text-gold">{r.year}</div>
              <h3 className="font-display text-xl tracking-tightest">{r.title}</h3>
              <p className="text-sm leading-relaxed text-titanium-600 dark:text-titanium-400">
                {r.body}
              </p>
              <a
                href="/iletisim"
                className="mt-auto inline-flex items-center gap-2 text-sm text-gold hover:underline"
              >
                <Download size={14} />
                Rapor talep edin
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBlock
        eyebrow="Bilgi Talebi"
        heading="Sürdürülebilirlik verileriniz mi gerekiyor?"
        body="Yatırımcılar, müşteriler ve denetçiler için ek veri ve raporlamaları paylaşabiliriz."
        cta={{ label: 'İletişime Geçin', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
