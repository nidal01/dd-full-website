import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProductCard } from '@/components/cards/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { CtaLink } from '@/components/ui/Button'
import { Carousel } from '@/components/ui/Carousel'

type Props = {
  heading?: string
  subheading?: string
  products?: any[]
  layout?: 'grid' | 'carousel' | 'masonry'
}

export function FeaturedProductsSection({ heading, subheading, products, layout = 'grid' }: Props) {
  if (!products || products.length === 0) return null

  return (
    <section className="container-premium py-32">
      <div className="flex flex-col items-end justify-between gap-8 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Koleksiyon"
          heading={heading ?? 'Sanat ile mühendisliğin buluştuğu ambalajlar'}
          subheading={subheading}
        />
        <CtaLink href="/urunler" variant="ghost" withArrow>
          Tüm ürünleri keşfet
        </CtaLink>
      </div>

      {layout === 'carousel' ? (
        <div className="mt-16">
          <Carousel ariaLabel="Öne çıkan ürünler">
            {products.map((p, i) => (
              <ProductCard key={p._id ?? p.slug} product={p} priority={i < 3} />
            ))}
          </Carousel>
        </div>
      ) : (
        <div
          className={
            layout === 'masonry'
              ? 'mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid'
              : 'mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
          }
        >
          {products.map((p, i) => (
            <Reveal key={p._id ?? p.slug} delay={i * 0.07} y={28}>
              <ProductCard product={p} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}
