import type { Metadata } from 'next'
import { PortfolioCategoryPage } from '@/components/sections/PortfolioCategoryPage'

export const metadata: Metadata = {
  title: 'Ev Ürünleri Ambalaj',
  description: 'Beyaz eşya, küçük ev aletleri ve hane ürünleri için dayanıklı premium ambalaj çözümleri.',
}

export default async function Page() {
  return (
    <PortfolioCategoryPage
      category="Ev Ürünleri"
      categorySlug="ev-urunleri"
      intro="Beyaz eşya, küçük ev aletleri ve hane ürünleri için; dayanıklılık ile premium görünümü bir araya getiren ambalaj çözümlerimiz."
      highlights={[
        'In-line micro oluklu laminasyon ile yüksek dayanım ve raf etkisi',
        'Tutma sapı, ayraç ve özel form uygulamalarıyla lojistik kolaylığı',
        'Soft touch, gofre ve metalize efektlerle premium ev ürünleri segmenti',
        'Sürdürülebilir, tek komponentli Gloss & Green alternatifleri',
      ]}
    />
  )
}
