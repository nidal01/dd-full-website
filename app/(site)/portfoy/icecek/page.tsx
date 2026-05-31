import type { Metadata } from 'next'
import { PortfolioCategoryPage } from '@/components/sections/PortfolioCategoryPage'

export const metadata: Metadata = {
  title: 'İçecek Ambalaj',
  description: 'Alkollü ve alkolsüz içecek markaları için premium rigid box ve katlanır karton ambalajlar.',
}

export default async function Page() {
  return (
    <PortfolioCategoryPage
      category="İçecek"
      categorySlug="icecek"
      intro="Alkollü ve alkolsüz içecek markaları için premium rigid box, multipack ve özel form katlanır karton ambalaj çözümlerimiz."
      highlights={[
        'Rigid box ve premium multipack uygulamaları ile prestij algısı',
        'Cold foil ve hot foil ile metalik vurgu, gofre ve emboss detayları',
        'Tek seferde 70×100 ve 100×140 cm levha ebatlarıyla yüksek hacimli üretim',
        'Tutma sapı ve özel kulp aksesuarları ile tüketici deneyimi',
      ]}
    />
  )
}
