import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Duran Doğan — Premium ambalaj çözümleri'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'radial-gradient(ellipse at top right, #1B2238 0%, #05070D 60%)',
          color: '#F3F4F6',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: '#D4AF37',
            }}
          />
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#D4AF37',
            }}
          >
            Duran Doğan
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 88,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            fontWeight: 600,
            maxWidth: 1000,
          }}
        >
          Premium ambalajın
          <br />
          <span style={{ color: '#D4AF37' }}>referans noktası.</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(212,175,55,0.4)',
            paddingTop: 28,
            fontSize: 22,
            color: '#9CA3AF',
          }}
        >
          <div>durandogan.com</div>
          <div style={{ display: 'flex', gap: 32 }}>
            <span>85 yıllık ustalık</span>
            <span style={{ color: '#D4AF37' }}>•</span>
            <span>Dünya markalarının tercihi</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
