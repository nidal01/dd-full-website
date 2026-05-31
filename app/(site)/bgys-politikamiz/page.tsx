import type { Metadata } from 'next'
import { Lock, GitBranch, KeyRound } from 'lucide-react'
import { WpPageShell, ProseSection, FeatureGrid, CtaBlock } from '@/components/sections/WpPageShell'

export const metadata: Metadata = {
  title: 'BGYS Politikamız',
  description:
    'ISO/IEC 27001:2022 uyumlu Bilgi Güvenliği Yönetim Sistemimiz; gizlilik, bütünlük ve erişilebilirlik üzerine kurulu üç temel ilke.',
}

export default function BgysPage() {
  return (
    <WpPageShell
      eyebrow="Kalite Yönetim Sistemi"
      heading="Bilgi Güvenliği Yönetim Sistemi (BGYS) Politikamız."
      subheading="ISO/IEC 27001:2022 uyumlu olarak; saklanan ve işlenen tüm bilginin gizliliğini, bütünlüğünü ve erişilebilirliğini sistematik şekilde yönetiyoruz."
      ctas={[{ label: 'KGYS', href: '/kalite-guvence-yonetim-sistemi', variant: 'secondary' }]}
    >
      <FeatureGrid
        eyebrow="Üç Temel İlke"
        heading="BGYS politikamızın üzerine kurulduğu güvenlik temelleri."
        items={[
          {
            icon: <Lock size={20} />,
            title: 'Gizlilik',
            body: 'Saklanan ve işlenen bilginin yetkisiz ifşasının engellenmesi temel hedefimizdir.',
          },
          {
            icon: <GitBranch size={20} />,
            title: 'Bütünlük',
            body: 'Bilgilerin kazara ya da yetkisiz kişiler tarafından kasıtlı olarak değiştirilmeye veya silinmeye karşı korunması.',
          },
          {
            icon: <KeyRound size={20} />,
            title: 'Erişilebilirlik',
            body: 'Yetkili personelin gerektiğinde bilgilere zamanında ve güvenli şekilde ulaşabilmesinin sağlanması.',
          },
        ]}
      />

      <ProseSection eyebrow="Standart & Uyum" heading="ISO/IEC 27001:2022 uyumlu BGYS yönetimi.">
        <p>
          Şirket, ISO/IEC 27001:2022 standartlarına tam uyum sağlayarak Bilgi
          Güvenliği Yönetim Sistemini tüm operasyonlarına entegre etmiştir.
          Risk yönetimi, yasal uygunluk ve iş sürekliliği politikanın
          tamamlayıcı bileşenleri arasında yer almaktadır.
        </p>
      </ProseSection>

      <CtaBlock
        eyebrow="Şeffaflık"
        heading="Bilgi güvenliği uygulamalarımız hakkında daha fazla bilgi için iletişime geçin."
        cta={{ label: 'İletişim', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
