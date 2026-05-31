import type { Metadata } from 'next'
import { PortfolioCategoryPage } from '@/components/sections/PortfolioCategoryPage'

export const metadata: Metadata = {
  title: 'Gıda Ambalaj',
  description: 'BRCGS PM sertifikalı, gıda ile temas onaylı premium katlanır karton ambalaj çözümleri.',
}

export default async function Page() {
  return (
    <PortfolioCategoryPage
      category="Gıda"
      categorySlug="gida"
      intro="Gıda ile temas eden ambalajda BRCGS PM ve ECMA GMP sertifikalı üretim hatlarımızla; hijyen ve raf etkisini bir araya getiriyoruz."
      highlights={[
        'BRCGS PM ve ECMA GMP sertifikalı üretim, hijyenik proses kontrolü',
        'Gıda dokunmayı onaylı tutkal, mürekkep ve lak sistemleri',
        'In-line oluklu laminasyon ile dayanıklı ve premium gıda ambalajı',
        'Sürdürülebilir Gloss & Green seçenekleriyle geri dönüştürülebilir alternatifler',
      ]}
    />
  )
}
