import type { Metadata } from 'next'
import { PortfolioCategoryPage } from '@/components/sections/PortfolioCategoryPage'

export const metadata: Metadata = {
  title: 'Kişisel Bakım Ambalaj',
  description: 'Kozmetik, parfümeri ve kişisel bakım markaları için premium ambalaj çözümleri.',
}

export default async function Page() {
  return (
    <PortfolioCategoryPage
      category="Kişisel Bakım"
      categorySlug="kisisel-bakim"
      intro="Kozmetik, parfümeri ve kişisel bakım markaları için; raf etkisi yüksek, premium efektli ve tüketici deneyimini güçlendiren ambalajlar."
      highlights={[
        'Premium görünüm için metalize, hologram ve cold foil seçenekleri',
        'Soft touch ve mat / parlak lak kombinasyonlarıyla zengin dokunsal his',
        'Trayform, pencere ve özel form uygulamaları ile farklılaşan raf duruşu',
        'Sürdürülebilir Gloss & Green seçenekleriyle çevreci ambalaj alternatifleri',
      ]}
    />
  )
}
