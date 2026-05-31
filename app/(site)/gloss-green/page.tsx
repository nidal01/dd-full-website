import type { Metadata } from 'next'
import { Leaf, Sparkles, Recycle } from 'lucide-react'
import { WpPageShell, ProseSection, FeatureGrid, CtaBlock } from '@/components/sections/WpPageShell'
import { Reveal } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Gloss & Green',
  description:
    'Premium görünüm ile %100 geri dönüştürülebilir yapıyı bir araya getiren, tek komponentli sürdürülebilir ambalaj teknolojimiz.',
}

export default function GlossGreenPage() {
  return (
    <WpPageShell
      eyebrow="Sürdürülebilir Ambalaj Teknolojisi"
      heading="Gloss & Green — premium görünüm, %100 geri dönüştürülebilir yapı."
      subheading="Estetik beklentilerle sürdürülebilirlik hedeflerini tek bir teknolojide birleştiren, döngüsel ekonomiye katkı sağlayan yenilikçi üretim modelimiz."
      heroImage="https://dd.wordpressajansi.tr/wp-content/uploads/2026/03/durandogan0628-min-scaled-1.jpg"
      ctas={[
        { label: 'Teknik Bilgi İsteyin', href: '/iletisim', variant: 'primary' },
        { label: 'Sürdürülebilirlik', href: '/surdurulebilirlik/stratejimiz', variant: 'secondary' },
      ]}
    >
      <FeatureGrid
        eyebrow="Neden Gloss & Green?"
        heading="Üç temel avantajı tek bir ambalaj sisteminde topluyor."
        items={[
          {
            icon: <Sparkles size={20} />,
            title: 'Premium Görünüm',
            body: 'Yüksek görsel etki sağlayan yüzey yapısıyla güçlü, dikkat çekici ve prestijli ambalaj deneyimi.',
          },
          {
            icon: <Recycle size={20} />,
            title: 'Geri Dönüştürülebilir Yapı',
            body: 'Tek komponentli yaklaşımla daha uyumlu geri dönüşüm süreci ve düşük çevresel etki.',
          },
          {
            icon: <Leaf size={20} />,
            title: 'Sürdürülebilir Teknoloji',
            body: 'Estetik beklentiler ile sürdürülebilirlik hedeflerini birleştiren yenilikçi üretim anlayışı.',
          },
        ]}
      />

      <section className="container-premium grid grid-cols-1 gap-16 py-24 lg:grid-cols-2">
        <Reveal className="rounded-3xl border border-gold/30 bg-gold/5 p-10">
          <div className="eyebrow mb-4">Neden?</div>
          <h2 className="font-display text-display-md tracking-tightest text-balance">
            Plastik atıkların yalnızca %20'si geri dönüşüm için toplanıyor.
          </h2>
          <p className="mt-6 text-titanium-600 dark:text-titanium-400">
            Dünyadaki plastik ürünlerin %75'i doğada atık olarak bulunmakta,
            her yıl bu miktara 100 milyon ton ekleniyor. Klasik metalize karton
            ambalajların geri dönüşüm zinciri kısıtlı — çünkü plastik film ve
            karton ayrıştırılamıyor.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="rounded-3xl border border-titanium-200/60 bg-titanium-50 p-10 dark:border-ink-700 dark:bg-ink-900/40">
          <div className="eyebrow mb-4">Nedir?</div>
          <h2 className="font-display text-display-md tracking-tightest text-balance">
            Tek komponentli, %100 dönüştürülebilir karton.
          </h2>
          <ul className="mt-6 space-y-3 text-titanium-600 dark:text-titanium-400">
            <li className="flex gap-3"><span className="text-gold">→</span> Tek komponentli yapı, %100 dönüştürülebilir karton atık elde edilir.</li>
            <li className="flex gap-3"><span className="text-gold">→</span> Üretimden çıkan plastik film, ekstrüderde granül haline getirilir.</li>
            <li className="flex gap-3"><span className="text-gold">→</span> Metalik yüzeyli karton ambalaj geri dönüştürülebilir hale gelir.</li>
            <li className="flex gap-3"><span className="text-gold">→</span> Döngüsel ekonomiye katkı sağlanır.</li>
          </ul>
        </Reveal>
      </section>

      <ProseSection eyebrow="Stratejik vizyon" heading="Sürdürülebilir ve yenilikçi ambalaj çözümleri.">
        <p>
          Gloss &amp; Green; estetik kaliteyi ve geri dönüştürülebilirliği aynı
          ambalajda buluşturan Duran Doğan patentli üretim teknolojisidir.
          Markalara hem raf etkisi yüksek bir ambalaj sunar, hem de
          sürdürülebilirlik raporlamalarında somut karbon tasarrufu sağlar.
        </p>
      </ProseSection>

      <CtaBlock
        eyebrow="Birlikte tasarlayalım"
        heading="Markanıza özel Gloss & Green ambalaj geliştirelim."
        body="Ar-Ge ekibimiz; mevcut SKU'larınızı analiz ederek sürdürülebilirlik & maliyet senaryolarınızı hazırlar."
        cta={{ label: 'Numune Talep Edin', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
