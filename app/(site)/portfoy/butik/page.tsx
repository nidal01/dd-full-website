import type { Metadata } from 'next'
import { PortfolioCategoryPage } from '@/components/sections/PortfolioCategoryPage'

export const metadata: Metadata = {
  title: 'Butik Ambalaj',
  description: 'Lüks ve butik markalar için özel tasarım, premium efektli ambalaj çözümlerimiz.',
}

export default async function Page() {
  return (
    <PortfolioCategoryPage
      category="Butik"
      categorySlug="butik"
      intro="Lüks ve niche markalar için raf etkisi yüksek; cold foil, soft touch lak, gofre ve metalize gibi premium efektlerle desteklenmiş özel tasarım ambalajlar."
      highlights={[
        'Markanın hikayesini yansıtan özel form ve yapı tasarımları',
        'Cold foil, hot foil ve metalize efektlerle prestij hissi',
        'Soft touch lak ve gofre uygulamalarıyla zengin dokunsal deneyim',
        'Düşük ve orta tirajlı üretim için esnek tedarik modeli',
      ]}
    />
  )
}
