import type { Metadata } from 'next'
import { Sparkles, Award, Recycle, ShieldCheck } from 'lucide-react'
import { WpPageShell, ProseSection, FeatureGrid, CtaBlock } from '@/components/sections/WpPageShell'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description:
    'Duran Doğan; inovasyon tutkusu ve kalite anlayışıyla dünyanın her yerinde karşılaşabileceğiniz premium ambalajlar üretir.',
}

export default function HakkimizdaPage() {
  return (
    <WpPageShell
      eyebrow="Kurumsal"
      heading="Sürdürülebilir üretim anlayışıyla büyüyen bir Duran Doğan."
      subheading="İnovasyon tutkusu ve kalite anlayışıyla; dünyanın herhangi bir yerinde karşılaşılabilecek ambalajları üretiyor, gelecek nesillere yaşanabilir bir dünya bırakma hedefine katkı sunuyoruz."
      heroImage="https://dd.wordpressajansi.tr/wp-content/uploads/2023/02/durandogan-1-890x664.jpg"
      ctas={[
        { label: 'Portföyümüz', href: '/portfoy', variant: 'primary' },
        { label: 'İletişime Geçin', href: '/iletisim', variant: 'secondary' },
      ]}
    >
      <ProseSection eyebrow="Vizyon & Misyon" heading="Marka değerlerimiz, üretim disiplinimizin temelidir.">
        <h3>Vizyonumuz</h3>
        <p>
          İnovasyon tutkusu ve kalite anlayışıyla dünyanın herhangi bir
          yerinde karşılaşılabilecek ambalajlar üretmek.
        </p>
        <h3>Misyonumuz</h3>
        <p>
          Sürdürülebilir üretim ilkeleriyle "gelecek nesillere yaşanabilir bir
          dünya" hedefine katkı sağlamak; markalarımızın raf etkisini ve marka
          değerini ambalaj üzerinden güçlendirmek.
        </p>
      </ProseSection>

      <FeatureGrid
        eyebrow="Sektördeki Deneyim"
        heading="Dört temel hizmet ekseni etrafında ölçeklenen üretim ekosistemi."
        items={[
          {
            icon: <Sparkles size={20} />,
            title: 'Özel Tasarım Ambalajlar',
            body: 'Markalara özel ölçü, form ve baskı seçenekleriyle raf etkisi yüksek çözümler tasarlıyoruz.',
          },
          {
            icon: <Award size={20} />,
            title: 'Metalize & Özel Efekt Baskı',
            body: 'Metalize, lak, gofre ve özel efekt uygulamalarıyla premium görünüm sağlıyoruz.',
          },
          {
            icon: <Recycle size={20} />,
            title: 'Sürdürülebilir Üretim',
            body: 'Çevreci malzemeler ve geri dönüştürülebilir ambalaj çözümleriyle döngüsel ekonomiye katkı sağlıyoruz.',
          },
          {
            icon: <ShieldCheck size={20} />,
            title: 'Kalite Kontrol & İzlenebilirlik',
            body: 'Üretimin her aşamasında entegre kontrol ve uçtan uca izlenebilirlik ile güvenli ambalaj üretimi.',
          },
        ]}
      />

      <ProseSection eyebrow="Uzmanlık Alanlarımız">
        <ul>
          <li>Ambalaj Tasarımı</li>
          <li>Özel Baskı Teknolojileri</li>
          <li>Ar-Ge ve İnovasyon</li>
          <li>Sürdürülebilir Üretim</li>
        </ul>
      </ProseSection>

      <CtaBlock
        eyebrow="Birlikte üretelim"
        heading="Markanız için özel bir ambalaj çözümü tasarlayalım."
        body="Tasarım ve mühendislik ekibimiz; konseptten seri üretime kadar tüm aşamalarda yanınızda."
        cta={{ label: 'Teklif Alın', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
