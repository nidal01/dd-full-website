import type { Metadata } from 'next'
import { TreePine, FlaskConical, Users } from 'lucide-react'
import { WpPageShell, ProseSection, FeatureGrid, CtaBlock } from '@/components/sections/WpPageShell'

export const metadata: Metadata = {
  title: 'Biyoçeşitlilik ve Çevresel Etki',
  description:
    'Biyolojik çeşitlilik kaybının küresel ekosistem üzerindeki etkilerini önlemek için aldığımız aksiyonlar ve paydaş işbirliklerimiz.',
}

export default function BiyoPage() {
  return (
    <WpPageShell
      eyebrow="Sürdürülebilirlik"
      heading="Biyoçeşitliliği koruma — kurumsal sorumluluğumuzun ayrılmaz parçası."
      subheading="Biyolojik çeşitliliğin kaybının küresel ekosistem üzerinde ciddi etkiler yaratabileceğinin farkında olarak; faaliyetlerimizi bu sorumluluk bilinciyle yürütüyoruz."
      ctas={[{ label: 'Sürdürülebilirlik Stratejimiz', href: '/surdurulebilirlik/stratejimiz', variant: 'secondary' }]}
    >
      <FeatureGrid
        eyebrow="Aksiyonlarımız"
        heading="Biyoçeşitliliği koruma kapsamında uyguladığımız adımlar."
        items={[
          {
            icon: <TreePine size={20} />,
            title: 'Ön Değerlendirme',
            body: 'Yeni faaliyet ve yatırımlar öncesi çevresel etkileri sistemli şekilde değerlendiriyoruz.',
          },
          {
            icon: <FlaskConical size={20} />,
            title: 'Atık Azaltma',
            body: 'Zararlı atıkları alternatif yakıt ve hammadde olarak değerlendirerek atık miktarını minimize ediyoruz.',
          },
          {
            icon: <Users size={20} />,
            title: 'Paydaş İşbirliği',
            body: 'Otorite, bilim insanları ve yerel yönetimlerle birlikte çalışıyor; çalışan katılımını destekliyoruz.',
          },
        ]}
      />

      <ProseSection eyebrow="Yaklaşımımız" heading="Tedarik zincirinden tüketim sonuna kadar etkiyi izlemek.">
        <ul>
          <li>Tedarik zinciri izlemesi ile biyoçeşitlilik etkilerinin belirlenmesi ve kontrolü</li>
          <li>Nesli tükenmekte olan türler ve ormanlar için koruma önlemleri</li>
          <li>Tüm yatırımlarımızda karbon yönetimi ve geri dönüşümün önceliklendirilmesi</li>
          <li>Çevre koruma faaliyetlerine çalışan katılımı</li>
        </ul>
      </ProseSection>

      <CtaBlock
        eyebrow="Şeffaflık"
        heading="Çevresel etki raporlarımız ve aksiyon planlarımız için iletişime geçin."
        cta={{ label: 'Bilgi Talep Edin', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
