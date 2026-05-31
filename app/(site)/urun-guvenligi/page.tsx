import type { Metadata } from 'next'
import { ShieldCheck, FlaskConical, Globe } from 'lucide-react'
import { WpPageShell, ProseSection, FeatureGrid, CtaBlock } from '@/components/sections/WpPageShell'

export const metadata: Metadata = {
  title: 'Ürün Güvenliği',
  description:
    'Risk yönetimi, uluslararası hijyen standartları ve BRCGS PM / ECMA GMP sertifikalarıyla güvenli ambalaj üretimi.',
}

export default function UrunGuvenligiPage() {
  return (
    <WpPageShell
      eyebrow="Kalite Yönetim Sistemi"
      heading="Güvenli ambalaj — yaşam felsefemiz."
      subheading="Tüm üretim süreçlerinde ürün güvenliği sağlayarak sektörde güvenilir bir marka değeri oluşturuyoruz. Müşteri güvenini sağlamak amacıyla risk yönetimi uyguluyor, uluslararası hijyen standartlarında faaliyet gösteriyoruz."
      ctas={[{ label: 'KGYS', href: '/kalite-guvence-yonetim-sistemi', variant: 'secondary' }]}
    >
      <FeatureGrid
        eyebrow="Yaklaşımımız"
        heading="Tedarikçiden son tüketiciye uzanan güvenli üretim zinciri."
        items={[
          {
            icon: <Globe size={20} />,
            title: 'Dünya Standartlarında Üretim',
            body: 'Uluslararası hijyen ve gıda güvenliği standartlarına uygun süreçler ile global müşterilerimize hizmet veriyoruz.',
          },
          {
            icon: <ShieldCheck size={20} />,
            title: 'Proaktif Risk Yönetimi',
            body: 'Üretim öncesi ve esnasında riskleri sistematik şekilde belirleyip kontrol altına alıyoruz.',
          },
          {
            icon: <FlaskConical size={20} />,
            title: 'Laboratuvar & Test',
            body: 'Gelişmiş laboratuvar uygulamaları ve üretim takip sistemleriyle her ambalaj partisini denetliyoruz.',
          },
        ]}
      />

      <ProseSection eyebrow="Gıda Ambalajı Güvenliği Politikamız" heading="Beş ana madde etrafında şekillenen güvenlik taahhüdü.">
        <ol>
          <li>Dünya standartlarını rehber edinmek</li>
          <li>Proaktif risk yönetimini benimsemek</li>
          <li>Güvenli ambalajı yaşam felsefesi olarak yaşamak</li>
          <li>Takım ruhuyla yönetmek</li>
          <li>Yasal şartlara tam uyum sağlamak</li>
        </ol>
        <h3>Yönetim Sertifikalarımız</h3>
        <p>BRCGS PM (Packaging Materials) ve ECMA GMP sertifikalarımızla; gıda ile temas eden ambalaj üretiminde uluslararası kabul görmüş kalite seviyesini garanti ediyoruz.</p>
      </ProseSection>

      <CtaBlock
        eyebrow="Şeffaflık"
        heading="Ürün güvenliği belgelerimizi paylaşmaktan memnuniyet duyarız."
        cta={{ label: 'Belge Talep Edin', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
