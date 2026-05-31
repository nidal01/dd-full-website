import type { Metadata } from 'next'
import { Leaf, Droplets, Wind } from 'lucide-react'
import { WpPageShell, ProseSection, FeatureGrid, CtaBlock } from '@/components/sections/WpPageShell'

export const metadata: Metadata = {
  title: 'Çevre ve Sürdürülebilirlik',
  description:
    'Doğaya duyarlı ve geleceğe değer katan üretim anlayışımız; ISO 14001-2015 ve Sıfır Atık Belgesi ile şekillenen çevre yönetimi.',
}

export default function CevrePage() {
  return (
    <WpPageShell
      eyebrow="Kalite Yönetim Sistemi"
      heading="Doğaya duyarlı, geleceğe değer katan üretim."
      subheading="Üretim süreçlerimizi doğaya duyarlı ve geleceğe değer katan bir anlayışla şekillendiriyor; sorumlu kaynak kullanımını destekliyoruz."
      ctas={[
        { label: 'Sürdürülebilirlik Stratejimiz', href: '/surdurulebilirlik/stratejimiz', variant: 'primary' },
      ]}
    >
      <FeatureGrid
        eyebrow="Yaklaşımımız"
        heading="Sürdürülebilir üretim ekseninde üç temel başlık."
        items={[
          {
            icon: <Leaf size={20} />,
            title: 'Sürdürülebilir Üretim',
            body: 'Tüm ambalaj operasyonlarımızı çevreyle uyumlu şekilde gerçekleştiriyoruz.',
          },
          {
            icon: <Droplets size={20} />,
            title: 'Doğal Kaynakların Korunması',
            body: 'Tasarımdan teslimata kadar enerji tüketimini minimuma indiriyor; toprak, hava ve su kirliliğini önleyici adımlar atıyoruz.',
          },
          {
            icon: <Wind size={20} />,
            title: 'Sürekli Gelişim',
            body: 'Paydaşlarımızla güven temeline dayalı çalışıyor; eğitim faaliyetleriyle çevre bilincini artırıyoruz.',
          },
        ]}
      />

      <ProseSection eyebrow="Çevre Yönetimi" heading="Operasyonel sürdürülebilirlik bizim için zorunluluk değil — kültür.">
        <p>
          Operasyonlarımızın sürekliliğinin ve verimliliğinin; çevre ile uyumlu
          şekilde sürdürülmesinin mümkün olduğunun farkındayız. Uluslararası
          sürdürülebilirlik standartlarında faaliyet göstermeyi hedefliyor;
          tüm yatırımlarımızda karbon yönetimi ve geri dönüşümü önceliklendiriyoruz.
        </p>
        <h3>Sertifikalarımız</h3>
        <ul>
          <li>ISO 14001:2015 Çevre Yönetim Sistemi</li>
          <li>Sıfır Atık Belgesi</li>
        </ul>
      </ProseSection>

      <CtaBlock
        eyebrow="Şeffaflık"
        heading="Sürdürülebilirlik raporlarımız kamuya açıktır."
        cta={{ label: 'Raporları İnceleyin', href: '/surdurulebilirlik/raporlamalar' }}
      />
    </WpPageShell>
  )
}
