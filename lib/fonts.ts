import { DM_Sans } from 'next/font/google'
import localFont from 'next/font/local'

// Body: DM Sans — canlı site ile aynı (Google Fonts)
export const fontBody = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
})

// Display: Clash Display (Fontshare — self-hosted)
export const fontDisplay = localFont({
  src: [
    { path: '../public/fonts/ClashDisplay-Light.woff2',    weight: '300', style: 'normal' },
    { path: '../public/fonts/ClashDisplay-Regular.woff2',  weight: '400', style: 'normal' },
    { path: '../public/fonts/ClashDisplay-Medium.woff2',   weight: '500', style: 'normal' },
    { path: '../public/fonts/ClashDisplay-Semibold.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/ClashDisplay-Bold.woff2',     weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-display',
  fallback: ['system-ui', 'sans-serif'],
})
