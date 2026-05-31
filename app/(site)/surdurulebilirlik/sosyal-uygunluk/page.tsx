import type { Metadata } from 'next'
import { Users, Heart, Scale } from 'lucide-react'
import { WpPageShell, ProseSection, FeatureGrid, CtaBlock } from '@/components/sections/WpPageShell'

export const metadata: Metadata = {
  title: 'Sosyal Uygunluk ve Etik',
  description:
    'İnsan sermayemizi en değerli varlık olarak gören; çeşitliliği ve kapsayıcılığı şirket kültürünün temeline yerleştiren etik anlayışımız.',
}

export default function SosyalPage() {
  return (
    <WpPageShell
      eyebrow="Sürdürülebilirlik"
      heading="İnsan sermayemiz — şirketimizin en değerli varlığı."
      subheading="İş etiği ilkeleri, şirketimizin takip ettiği standartları belirler; tüm yönetici ve çalışanlarımıza günlük kararlarında rehberlik eder."
      ctas={[{ label: 'İK Politikası', href: '/insan-kaynaklari', variant: 'secondary' }]}
    >
      <FeatureGrid
        eyebrow="Temel Taahhütlerimiz"
        heading="Tüm çalışanlarımızın farklılıklarını kucaklayan kapsayıcı bir kültür."
        items={[
          {
            icon: <Users size={20} />,
            title: 'Çeşitlilik & Kapsayıcılık',
            body: 'Yaş, cinsiyet, engellilik durumu, din, cinsel yönelim ve sosyoekonomik durumdan bağımsız olarak tüm farklılıkları kucaklıyoruz.',
          },
          {
            icon: <Heart size={20} />,
            title: 'Saygılı İletişim',
            body: 'Saygılı iletişim ve işbirliği, çalışan katılımı, takım çalışması ve iş/yaşam dengesi temel taahhütlerimiz arasındadır.',
          },
          {
            icon: <Scale size={20} />,
            title: 'Sorumluluk & Disiplin',
            body: 'Tüm çalışanlarımız yıllık çeşitlilik eğitimine katılır; ayrımcı davranışlar disiplin sürecine tabidir.',
          },
        ]}
      />

      <ProseSection eyebrow="Etik İlkelerimiz" heading="Topluma katkı yoluyla çeşitlilik farkındalığı.">
        <p>
          Politikamız; yaş, cinsiyet, engellilik, din, cinsel yönelim ve
          sosyoekonomik durumdan bağımsız olarak tüm çalışanlarımızın
          farklılıklarını kucaklamayı vurgulamaktadır. Tüm yönetici ve
          çalışanlarımız bu ilkelere bağlı kalmakla yükümlüdür.
        </p>
        <h3>Taahhütlerimiz</h3>
        <ul>
          <li>Saygılı iletişim ve işbirliği</li>
          <li>Çalışan katılımı ve takım çalışması</li>
          <li>İş/yaşam dengesinin gözetilmesi</li>
          <li>Topluma katkı yoluyla çeşitlilik farkındalığı</li>
        </ul>
      </ProseSection>

      <CtaBlock
        eyebrow="Etik Hat"
        heading="Etik dışı bir durumu bize bildirmek ister misiniz?"
        cta={{ label: 'İletişime Geçin', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
