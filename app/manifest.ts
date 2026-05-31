import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Duran Doğan — Premium Ambalaj',
    short_name: 'Duran Doğan',
    description: 'Lüks ambalajın referans noktası. 85 yıllık ustalık.',
    start_url: '/',
    display: 'standalone',
    background_color: '#05070D',
    theme_color: '#05070D',
    orientation: 'portrait',
    lang: 'tr',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
