import type { Metadata } from 'next'
import { HeartPulse, ShieldAlert, GraduationCap } from 'lucide-react'
import { WpPageShell, ProseSection, FeatureGrid, CtaBlock } from '@/components/sections/WpPageShell'

export const metadata: Metadata = {
  title: 'İş Sağlığı ve Güvenliği',
  description:
    'ÖNCE SAĞLIK ilkesiyle insan odaklı güvenlik anlayışı; ISO 45001 ve SEDEX uyumlu entegre İSG yönetim sistemi.',
}

export default function IsgPage() {
  return (
    <WpPageShell
      eyebrow="Kalite Yönetim Sistemi"
      heading="ÖNCE SAĞLIK — insan ve çevreye duyulan saygı."
      subheading="Çalışan güvenliği işletmemizin temel prensiplerinden biridir. Tüm faaliyetlerimizi 'ÖNCE SAĞLIK' sloganı altında, kalite ve müşteri gerekliliklerini önceliklendirerek yönetiyoruz."
      ctas={[
        { label: 'Kalite Sistemi', href: '/kalite-guvence-yonetim-sistemi', variant: 'secondary' },
      ]}
    >
      <FeatureGrid
        eyebrow="Temel Yaklaşımlar"
        heading="İnsan odaklı güvenlik kültürünün üç ayağı."
        items={[
          {
            icon: <HeartPulse size={20} />,
            title: 'İnsan Odaklı Güvenlik',
            body: 'İnsana ve çevreye duyulan saygı, güvenlik politikamızın temelini oluşturur.',
          },
          {
            icon: <ShieldAlert size={20} />,
            title: 'Risk Yönetimi',
            body: 'Etkin değerlendirmelerle olası tehlikeleri önceden belirler, teknik tedbirler ve koruyucu ekipmanlarla riskleri kontrol altına alırız.',
          },
          {
            icon: <GraduationCap size={20} />,
            title: 'Eğitim & Gelişim',
            body: 'Çalışanlarımız düzenli İSG eğitimleriyle bilinçlerini güncel tutar; güvenli üretim kültürüne katkı sağlar.',
          },
        ]}
      />

      <ProseSection eyebrow="Yönetim Sistemleri" heading="Uluslararası standartlarla entegre yönetim.">
        <p>
          Duran Doğan; ISO 9001, ISO 14001 ve ISO 45001 sertifikaları ile
          entegre bir yönetim sistemi uygular. Ayrıca SEDEX iş etik
          standartlarına uyum gösterir, müşterilerimizin sürdürülebilirlik
          değerlendirmelerinde şeffaf bilgi sağlar.
        </p>
      </ProseSection>

      <CtaBlock
        eyebrow="Şeffaflık"
        heading="İSG ve SEDEX denetim raporlarımızı paylaşmaktan memnuniyet duyarız."
        cta={{ label: 'Belge Talep Edin', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
