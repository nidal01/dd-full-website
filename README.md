# Duran Doğan — Premium Web Platform

Next.js 15 (App Router) · Sanity.io (Headless CMS) · Tailwind · Radix UI · Framer Motion · Lenis

## Kurulum

```bash
pnpm install        # veya npm/yarn
cp .env.local.example .env.local
# .env.local dosyasını doldurun (Sanity project id vb.)
pnpm dev
```

Sanity Studio: <http://localhost:3000/studio>

## Klasör Yapısı

```
.
├── app/                     # Next.js App Router
│   ├── (site)/              # Front-end rotaları (gelecek adımlarda)
│   ├── api/revalidate/      # Sanity → Next ISR webhook
│   ├── studio/[[...tool]]/  # Sanity Studio gömülü
│   ├── kurumsal/
│   ├── urunler/
│   │   └── [slug]/
│   ├── surdurulebilirlik/
│   ├── haberler/
│   │   └── [slug]/
│   ├── iletisim/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/              # Navbar, Footer, AnnouncementBar
│   ├── providers/           # Lenis, Theme
│   ├── sections/            # Hero, Stats, CTA vb. (gelecek)
│   └── ui/                  # Radix-tabanlı atomik bileşenler
├── lib/                     # utils, fonts, tarayıcı yardımcıları
├── sanity/
│   ├── schemas/             # Şemalar (singletons + collections + objects)
│   │   ├── documents/
│   │   └── objects/
│   ├── lib/                 # client, queries, image
│   └── deskStructure.ts
├── styles/globals.css       # Tasarım token'ları + utility'ler
├── public/                  # Logo, fontlar, statik medya
├── sanity.config.ts
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```
