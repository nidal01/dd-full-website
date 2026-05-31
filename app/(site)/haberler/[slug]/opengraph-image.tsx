import { ImageResponse } from 'next/og'
import { sanityClient } from '@/sanity/lib/client'
import { newsBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const runtime = 'edge'
export const alt = 'Duran Doğan haberi'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG({ params }: { params: { slug: string } }) {
  const post = await sanityClient.fetch<any>(newsBySlugQuery, { slug: params.slug })
  const cover = post?.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : null
  const date = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#0B1F3A',
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
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(11,31,58,0.95) 0%, rgba(5,7,13,0.6) 100%)',
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
          <div style={{ fontSize: 18, letterSpacing: 6, textTransform: 'uppercase', color: '#D4AF37' }}>
            {post?.category?.title ?? 'Haberler'} · Duran Doğan
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              fontWeight: 600,
              maxWidth: 1000,
            }}
          >
            {post?.title ?? ''}
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
            <span>{date}</span>
            <span style={{ color: '#D4AF37' }}>durandogan.com/haberler</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
