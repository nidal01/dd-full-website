import type { Metadata } from 'next'
import { WpPageShell, CtaBlock } from '@/components/sections/WpPageShell'
import { Reveal } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Üretim Süreçleri',
  description:
    'Tasarımdan yapıştırmaya — sekiz aşamalı üretim hattımız, son teknoloji ekipmanlarımız ve kalite kontrol uygulamalarımız.',
}

const steps = [
  {
    n: '01',
    title: 'Tasarım',
    body: 'CAD programı ve plotter makineleriyle dizayn & maket üretimi. MAC/PC ortamında Illustrator, Artpro, Photoshop kullanımı. ISO 12647 standartlarına uygun FOGRA sistemi ile kromalin onayı. ROLAND VERSA UV LEC-330 dijital düzlem yazıcı ile numune hizmeti.',
  },
  {
    n: '02',
    title: 'Film Laminasyon',
    body: 'Mat / parlak selofan uygulaması, metalize film ve hologram film kullanımı. Plastik içermeyen transfer metalize uygulamaları.',
  },
  {
    n: '03',
    title: 'Baskı',
    body: 'Mat/parlak UV, efekt lak, soft touch lak teknikleri. Heidelberg XL145-8+LYYL ve XL106-8+LYYL makineleri. 8 renk + çift lak haznesi, cold foil özelliği. Levha ebatları: 70×100 cm ve 100×140 cm.',
  },
  {
    n: '04',
    title: 'Varak (Yaldız)',
    body: 'Cold Foil: baskı ile eş zamanlı soğuk varak uygulaması. Hot Foil: baskı sonrası sıcak varak ile premium efekt.',
  },
  {
    n: '05',
    title: 'Oluklu Laminasyon',
    body: 'Agnati-Stock makinesi (2013 yatırımı, 6.000 m² fabrika). E, F, D dalga in-line micro oluklu üretim. 180 m/dk kapasite, PVA tutkalla delaminasyon minimizasyonu.',
  },
  {
    n: '06',
    title: 'Kesim',
    body: 'Full ayıklamalı özel bıçaklar; pilyaj, perforaj ve gofre detayları. Bobst makineleri ile Easypress sistemi. Otomatik atık toplama ve presleme.',
  },
  {
    n: '07',
    title: 'Yapıştırma',
    body: 'OMEGA katlama-yapıştırma makineleri. Lazer sistem okuyucularıyla barkod ve tutkal kontrolleri. Inkjet yazıcılar ile tarih/parti numarası, güvenlik bandı ve kamera kontrol sistemi.',
  },
  {
    n: '08',
    title: 'Diğer Uygulamalar',
    body: 'Testere (plastik/kağıt kesme aparatı), pencere (PET malzeme ile düz/köşeli), trayform (özel form makinesi), tutma sapı (kağıt kulp uygulaması).',
  },
]

export default function UretimSurecleriPage() {
  return (
    <WpPageShell
      eyebrow="Üretim"
      heading="Hayalinizdeki ambalajı gerçeğe dönüştüren sekiz aşamalı süreç."
      subheading="Yaratıcı tasarım ekibimiz ve dijital prova makinelerimizle tasarımlarınızı numune olarak gösterebilir, son teknoloji üretim parkurumuzla seri üretime ölçeklendirebiliriz."
      heroImage="https://dd.wordpressajansi.tr/wp-content/uploads/2026/03/durandogan0628-min-scaled-1.jpg"
      ctas={[
        { label: 'Tesisimizi Gezin', href: '/iletisim', variant: 'primary' },
        { label: 'Kalite Sistemi', href: '/kalite-guvence-yonetim-sistemi', variant: 'secondary' },
      ]}
    >
      <section className="container-premium py-24">
        <div className="eyebrow mb-4">Üretim Akışı</div>
        <h2 className="max-w-3xl font-display text-display-lg tracking-tightest text-balance">
          Tasarımdan teslimata — uçtan uca entegre üretim hattı.
        </h2>

        <div className="mt-16 space-y-6">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.04}
              className="group grid grid-cols-1 gap-6 rounded-2xl border border-titanium-200/60 bg-titanium-50 p-8 transition-all hover:border-gold/50 hover:shadow-premium md:grid-cols-[120px_1fr_auto] dark:border-ink-700 dark:bg-ink-900/40"
            >
              <div className="font-display text-5xl tracking-tightest text-gold">{s.n}</div>
              <div>
                <h3 className="font-display text-2xl tracking-tightest">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-titanium-600 dark:text-titanium-400 md:text-base">
                  {s.body}
                </p>
              </div>
              <div className="hidden h-px w-12 self-center bg-gold/40 md:block" />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBlock
        eyebrow="Üretim Kapasitesi"
        heading="Numuneden seri üretime — esnek hatlarımızla ölçeklenin."
        body="Premium katlanır karton, rigid box, metalize ambalaj ve özel efekt baskı projelerinizi tek çatı altında yönetin."
        cta={{ label: 'Teknik Görüşme', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
