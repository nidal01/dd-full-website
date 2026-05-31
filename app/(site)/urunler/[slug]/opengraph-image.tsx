import { ImageResponse } from 'next/og'
import { sanityClient } from '@/sanity/lib/client'
import { productBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const runtime = 'edge'
export const alt = 'Duran Doğan ürünü'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG({ params }: { params: { slug: string } }) {
  const product = await sanityClient.fetch<any>(productBySlugQuery, { slug: params.slug })
  const cover = product?.coverImage ? urlFor(product.coverImage).width(1200).height(630).url() : null

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#05070D',
          color: '#F3F4F6',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            width={1200}
            height={630}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.55,
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(0deg, rgba(5,7,13,0.95) 0%, rgba(5,7,13,0.4) 60%, rgba(5,7,13,0.85) 100%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 72,
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#D4AF37',
            }}
          >
            {product?.category?.title ?? 'Ürün'} · Duran Doğan
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              maxWidth: 980,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 80,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                fontWeight: 600,
              }}
            >
              {product?.title ?? 'Ürün'}
            </div>
            {product?.tagline && (
              <div style={{ fontSize: 28, color: '#D1D5DB', maxWidth: 900 }}>
                {product.tagline}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 20,
              color: '#9CA3AF',
              borderTop: '1px solid rgba(212,175,55,0.4)',
              paddingTop: 24,
            }}
          >
            <span>durandogan.com</span>
            <span style={{ color: '#D4AF37' }}>Premium Ambalaj</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
