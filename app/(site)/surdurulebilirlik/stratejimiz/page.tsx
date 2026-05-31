import type { Metadata } from 'next'
import { Sun, Lightbulb, Wind, Recycle, Award, Droplets } from 'lucide-react'
import { WpPageShell, ProseSection, FeatureGrid, CtaBlock } from '@/components/sections/WpPageShell'

export const metadata: Metadata = {
  title: 'Sürdürülebilirlik Stratejimiz ve Uygulamalarımız',
  description:
    'Çevreyi korumak ve mümkün olabildiğince geri dönüşümü sağlamak — tüm yatırımlarımızı yönlendiren temel ilke.',
}

export default function StratejimizPage() {
  return (
    <WpPageShell
      eyebrow="Sürdürülebilirlik"
      heading="Çevreyi korumak ve geri dönüşümü sağlamak — tüm yatırımlarımızın pusulası."
      subheading="Sürdürülebilirliği kurumsal stratejimizin merkezine yerleştiriyor; somut yatırımlar ve ölçülebilir uygulamalarla destekliyoruz."
      ctas={[
        { label: 'GRI Raporu', href: '/surdurulebilirlik/raporlamalar', variant: 'primary' },
        { label: 'Gloss & Green', href: '/gloss-green', variant: 'secondary' },
      ]}
    >
      <FeatureGrid
        eyebrow="Çevresel Aksiyonlar"
        heading="Tesislerimizde uyguladığımız ölçülebilir sürdürülebilirlik adımları."
        items={[
          {
            icon: <Sun size={20} />,
            title: '8 kW Güneş Enerjisi',
            body: 'İdari ofislerimizin elektrik ihtiyacının önemli bir kısmını güneş enerjisinden karşılıyoruz.',
          },
          {
            icon: <Lightbulb size={20} />,
            title: 'LED Aydınlatma',
            body: 'Tüm tesislerimizde geleneksel ampullere göre 10 kat daha az enerji tüketen LED aydınlatma.',
          },
          {
            icon: <Wind size={20} />,
            title: 'Isı Yalıtımlı Paneller',
            body: 'Tesis kabuğunda ısı yalıtımlı paneller ile ısıtma ve soğutma ihtiyacı azaltıldı.',
          },
          {
            icon: <Recycle size={20} />,
            title: 'Basınçlı Hava Geri Kazanımı',
            body: 'Kompresör atık ısısının geri kazanılmasıyla yıllık %12 doğalgaz tasarrufu.',
          },
          {
            icon: <Droplets size={20} />,
            title: 'Su Yönetimi',
            body: '2019\'dan bu yana faaliyetteki ters ozmoz ve arıtma tesisleriyle su tüketiminin yönetimi.',
          },
          {
            icon: <Award size={20} />,
            title: 'CDP Liderliği',
            body: '2013 yılında Türkiye\'den CDP Global 500 raporuna giren ilk ambalaj şirketi; CDP Turkey ödülü sahibi.',
          },
        ]}
      />

      <ProseSection eyebrow="Yenilikçi Teknoloji" heading="Gloss & Green — hibrit ambalajları yerinden eden yerli teknoloji.">
        <p>
          Klasik plastik-karton hibrit ambalajların yerini alacak şekilde
          geliştirilen <strong>Gloss &amp; Green</strong> teknolojimiz, tek
          komponentli ve tamamen geri dönüştürülebilir bir karton ambalaj
          çözümüdür. Üretim sırasında ortaya çıkan PET film atıkları ise yüksek
          kaliteli granül haline getirilerek plastik sektörüne yeniden
          kazandırılır.
        </p>
        <h3>Yönetim Sistemleri</h3>
        <ul>
          <li>Yıllık karbon ayak izi hesaplamaları (Kapsam 1, 2 ve 3)</li>
          <li>Ters ozmoz ve arıtma tesisleriyle su yönetimi</li>
          <li>Kapalı sistem karton atık toplama</li>
          <li>Sosyal sürdürülebilirlik: sağlık, eğitim, ayrımcılığa karşı politikalar</li>
        </ul>
      </ProseSection>

      <CtaBlock
        eyebrow="Şeffaflık"
        heading="GRI ve TSRS uyumlu sürdürülebilirlik raporlarımız kamuya açıktır."
        cta={{ label: 'Raporları İnceleyin', href: '/surdurulebilirlik/raporlamalar' }}
      />
    </WpPageShell>
  )
}
