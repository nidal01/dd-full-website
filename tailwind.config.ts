import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './lib/**/*.{ts,tsx}',
    './sanity/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        // Premium kurumsal palet — duran-dogan-web.vercel.app'tan
        ink: {
          DEFAULT: '#0B0D26',          // Marka koyu — gece mavisi/lacivert
          50: '#EEF0F8',
          100: '#D6DBEC',
          200: '#A8B2D2',
          300: '#7B89B8',
          400: '#4E609E',
          500: '#2F4385',
          600: '#1F2F66',
          700: '#181D4E',              // Marka secondary
          800: '#11163A',
          900: '#0B0D26',              // Marka primary dark
          950: '#06091B',
        },
        brand: {                       // Burgundy — marka aksanı
          DEFAULT: '#8E292B',
          50: '#FBEEEE',
          100: '#F4D3D4',
          200: '#E8A0A8',
          300: '#D0676E',
          400: '#B0444A',
          500: '#8E292B',              // Primary
          600: '#882731',              // Primary dark
          700: '#6E1F27',
          800: '#4A1419',
          900: '#260A0D',
        },
        burgundy: '#8E292B',           // Kısa alias
        titanium: {
          DEFAULT: '#F8F8F8',
          50: '#FFFFFF',
          100: '#F8F8F8',              // Marka açık zemin
          200: '#E8EAED',
          300: '#D3DCE0',
          400: '#898A8E',
          500: '#6B7280',
          600: '#4B5563',
        },
        // Geriye dönük uyumluluk — eski kodlardaki "gold" referansları
        // artık brand red'e bağlanır.
        gold: {
          DEFAULT: '#8E292B',
          50: '#FBEEEE',
          100: '#F4D3D4',
          200: '#E8A0A8',
          300: '#D0676E',
          400: '#B0444A',
          500: '#8E292B',
          600: '#882731',
          700: '#6E1F27',
          800: '#4A1419',
          900: '#260A0D',
        },
        champagne: '#E8A0A8',
        navy: {
          DEFAULT: '#0B0D26',
          50: '#EEF0F8',
          100: '#D6DBEC',
          200: '#A8B2D2',
          300: '#7B89B8',
          400: '#4E609E',
          500: '#2F4385',
          600: '#1F2F66',
          700: '#181D4E',
          800: '#11163A',
          900: '#0B0D26',
          950: '#06091B',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 7vw, 6.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2.75rem, 5vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.25rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        eyebrow: '0.18em',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        'gold-glow': '0 0 0 1px rgba(142,41,43,0.25), 0 12px 40px -12px rgba(142,41,43,0.45)',
        'brand-glow': '0 0 0 1px rgba(142,41,43,0.25), 0 12px 40px -12px rgba(142,41,43,0.45)',
        'premium': '0 24px 80px -24px rgba(11,13,38,0.45)',
        'inner-line': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        'gold-line': 'linear-gradient(90deg, transparent, rgba(142,41,43,0.7), transparent)',
        'brand-line': 'linear-gradient(90deg, transparent, rgba(142,41,43,0.7), transparent)',
        'navy-fade': 'radial-gradient(ellipse at top, rgba(46,67,133,0.35), transparent 60%)',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'magnetic': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
