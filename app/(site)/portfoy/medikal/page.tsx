import type { Metadata } from 'next'
import { PortfolioCategoryPage } from '@/components/sections/PortfolioCategoryPage'

export const metadata: Metadata = {
  title: 'Medikal Ambalaj',
  description: 'GMP uyumlu, izlenebilir ve güvenli medikal & ilaç ambalaj çözümleri.',
}

export default async function Page() {
  return (
    <PortfolioCategoryPage
      category="Medikal"
      categorySlug="medikal"
      intro="İlaç ve sağlık ürünleri için uçtan uca izlenebilir, ECMA GMP ve BRCGS PM uyumlu üretim hatlarımızla güvenli medikal ambalajlar."
      highlights={[
        'ECMA GMP ve BRCGS PM uyumlu, validate edilmiş üretim akışı',
        'Barkod, partinin lazer & inkjet kontrolüyle uçtan uca izlenebilirlik',
        'Tamper-evident kapama, güvenlik bandı ve kamera kontrol sistemleri',
        'Düşük partikül emisyonlu, kontrollü ortamda kesim ve yapıştırma',
      ]}
    />
  )
}
