import type { Metadata } from 'next'
import { ShieldCheck, BadgeCheck, Leaf, Users } from 'lucide-react'
import { WpPageShell, ProseSection, FeatureGrid, CtaBlock } from '@/components/sections/WpPageShell'

export const metadata: Metadata = {
  title: 'Kalite Güvence Yönetim Sistemi',
  description:
    'Kaliteli ve sürdürülebilir ambalajın güvencesi: ISO 9001 / 14001 / 45001 entegre yönetim sistemimiz ve kalite politikamız.',
}

export default function KalitePage() {
  return (
    <WpPageShell
      eyebrow="Kalite Yönetim Sistemi"
      heading="Kaliteli ve sürdürülebilir ambalajın güvencesi."
      subheading="Dijital dünyayla entegre bir kalite modeli benimsiyor; çevre dostu üretim, çalışan sağlığı, döngüsel ekonomi ve yüksek iş ahlakı ilkelerine bağlı kalıyoruz."
      heroImage="https://dd.wordpressajansi.tr/wp-content/uploads/2023/02/CDP_Supplier_Engagement_Leader_2024-890x664.png"
      ctas={[
        { label: 'Sertifikalarımız', href: '#sertifikalar', variant: 'primary' },
        { label: 'Ürün Güvenliği', href: '/urun-guvenligi', variant: 'secondary' },
      ]}
    >
      <FeatureGrid
        eyebrow="Entegre Yönetim Sistemi"
        heading="Üç uluslararası standartla şekillenen entegre yönetim modeli."
        items={[
          {
            icon: <BadgeCheck size={20} />,
            title: 'ISO 9001 — Kalite',
            body: 'Müşteri ihtiyaçlarının belirlenmesi, süreç yönetimi ve sürekli iyileştirme odaklı kalite yönetimi.',
          },
          {
            icon: <Leaf size={20} />,
            title: 'ISO 14001 — Çevre',
            body: 'Doğal kaynak kullanımının yönetimi, atık azaltma ve çevreyle uyumlu üretim uygulamaları.',
          },
          {
            icon: <Users size={20} />,
            title: 'ISO 45001 — İSG',
            body: 'İş sağlığı ve güvenliği risklerinin sistematik yönetimi, çalışan güvenliğini önceliklendirme.',
          },
        ]}
      />

      <ProseSection eyebrow="Kalite ve Hijyen Politikası" heading="Beş temel madde etrafında şekillenen kalite politikamız.">
        <ul>
          <li>Ürünlerimizi zamanında ve rekabetçi fiyatla sunmak</li>
          <li>Müşteri beklentileri odaklı strateji yürütmek</li>
          <li>İnovatif çözümler sunmak</li>
          <li>Paydaşlarımızı kalite ve sürdürülebilirlik konularında bilinçlendirmek</li>
          <li>Gıda ambalajı güvenliği önlemlerini uygulamak</li>
        </ul>
      </ProseSection>

      <section id="sertifikalar" className="container-premium py-24">
        <div className="eyebrow mb-4">Sertifikalar</div>
        <h2 className="max-w-3xl font-display text-display-lg tracking-tightest text-balance">
          Uluslararası bağımsız denetimlerle doğrulanmış uygunluk.
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {['ISO 9001', 'ISO 14001', 'ISO 45001', 'BRCGS PM', 'ECMA GMP', 'ISO 27001', 'FSC', 'Sıfır Atık'].map((c, i) => (
            <div
              key={c}
              className="grid h-32 place-items-center rounded-2xl border border-titanium-200/60 bg-titanium-50 font-display text-xl tracking-tightest text-ink dark:border-ink-700 dark:bg-ink-900/40 dark:text-titanium-50"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-gold" />
                {c}
              </span>
            </div>
          ))}
        </div>
      </section>

      <CtaBlock
        eyebrow="Şeffaflık"
        heading="Kalite belgelerimizi ve denetim raporlarımızı paylaşmaktan memnuniyet duyarız."
        cta={{ label: 'Belge Talep Edin', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
