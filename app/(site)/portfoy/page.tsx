import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Award, Leaf, Sparkles, Truck } from 'lucide-react'
import { WpPageShell, FeatureGrid, CtaBlock } from '@/components/sections/WpPageShell'
import { Reveal } from '@/components/ui/Reveal'
import {
  wpCategoryMeta,
  wpProductsByCategory,
  type WpProductCategory,
} from '@/lib/wpProducts'

export const metadata: Metadata = {
  title: 'Portföyümüz',
  description:
    'Butik, medikal, kişisel bakım, içecek, gıda ve ev ürünleri — altı sektörde 91 ürünlük premium ambalaj portföyü.',
}

const categories: Array<{ slug: WpProductCategory }> = [
  { slug: 'gida' },
  { slug: 'icecek' },
  { slug: 'kisisel-bakim' },
  { slug: 'ev-urunleri' },
  { slug: 'medikal' },
  { slug: 'butik' },
]

export default function PortfoyPage() {
  return (
    <WpPageShell
      eyebrow="Portföyümüz"
      heading="Ambalajda dünya markası — altı sektörde premium çözümler."
      subheading="Premium kaliteli malzemeler ile yenilikçi tasarımı bir araya getiriyor; markalarınızın ürünlerine değer katacak özel ambalajlar tasarlıyoruz."
      ctas={[
        { label: 'Teklif Alın', href: '/iletisim', variant: 'primary' },
        { label: 'Üretim Süreçleri', href: '/uretim-surecleri', variant: 'secondary' },
      ]}
    >
      <FeatureGrid
        eyebrow="Değer Önerimiz"
        heading="Dört temel güç — ambalajınızı raf etkisi yüksek bir markaya dönüştürür."
        items={[
          { icon: <Award size={20} />, title: 'Premium Kalite', body: 'Ürün değerini artıran premium malzemeler ve baskı kalitesi.' },
          { icon: <Leaf size={20} />, title: 'Sürdürülebilirlik', body: 'Geri dönüştürülebilir, çevreyle uyumlu ambalaj seçenekleri.' },
          { icon: <Sparkles size={20} />, title: 'Özel Tasarım', body: 'İhtiyaca özel form, baskı ve efekt seçenekleriyle markaya özel çözümler.' },
          { icon: <Truck size={20} />, title: 'Hızlı Teslimat', body: 'Modern üretim tesislerimizle siparişten teslimata hızlı ve esnek tedarik.' },
        ]}
      />

      <section className="container-premium py-24">
        <div className="eyebrow mb-4">Kategoriler</div>
        <h2 className="max-w-3xl font-display text-display-lg tracking-tightest text-balance">
          Altı sektör, tek bir üretim ekosistemi.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const meta = wpCategoryMeta[c.slug]
            const sample = wpProductsByCategory[c.slug][0]
            return (
              <Reveal key={c.slug} delay={i * 0.04} as="article" className="group relative overflow-hidden rounded-2xl border border-titanium-200/60 dark:border-ink-700">
                <Link href={`/portfoy/${c.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-navy-900">
                  {sample && (
                    <Image
                      src={sample.image}
                      alt={meta.title}
                      fill
                      unoptimized
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-titanium-50">
                    <div className="eyebrow !text-gold-300 mb-2">{meta.count} ürün</div>
                    <h3 className="font-display text-2xl tracking-tightest">{meta.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Keşfet →
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <CtaBlock
        eyebrow="Birlikte üretelim"
        heading="Markanız için özel bir ambalaj projesi tasarlayalım."
        cta={{ label: 'Teklif Alın', href: '/iletisim' }}
      />
    </WpPageShell>
  )
}
