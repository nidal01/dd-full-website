/* eslint-disable no-console */
/**
 * Brand asset seeder: uploads the company logo + 3 hero slider images
 * (downloaded from the live duran-dogan-web.vercel.app site), then patches
 * siteSettings + homePage to use them.
 *
 * Run:
 *   npx tsx scripts/seed-brand-assets.ts
 */

import { config as loadEnv } from 'dotenv'
import { createClient } from '@sanity/client'
import { readFile } from 'node:fs/promises'

loadEnv({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID veya SANITY_API_WRITE_TOKEN tanımlı değil.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
})

/* ─── Source files (already downloaded to /tmp/dd-assets) ─────────────────── */
const SOURCES = [
  { key: 'logoWhite', path: '/tmp/dd-assets/logo-white.png', filename: 'duran-dogan-logo-white.png', ct: 'image/png' },
  { key: 'hero01',    path: '/tmp/dd-assets/hero-01.png',    filename: 'hero-uretim.png',             ct: 'image/png' },
  { key: 'hero02',    path: '/tmp/dd-assets/hero-02.png',    filename: 'hero-surdurulebilir.png',     ct: 'image/png' },
  { key: 'hero03',    path: '/tmp/dd-assets/hero-03.png',    filename: 'hero-kalite.png',             ct: 'image/png' },
] as const

type Key = (typeof SOURCES)[number]['key']

async function uploadAll(): Promise<Record<Key, string>> {
  const out = {} as Record<Key, string>
  for (const s of SOURCES) {
    process.stdout.write(`  ${s.key.padEnd(12)} → `)
    const buf = await readFile(s.path)
    const asset = await client.assets.upload('image', buf, {
      filename: s.filename,
      contentType: s.ct,
    })
    out[s.key] = asset._id
    console.log(`✓ ${asset._id}`)
  }
  return out
}

const imageRef = (assetId: string, alt?: string) => ({
  _type: 'image',
  asset: { _type: 'reference', _ref: assetId },
  ...(alt ? { alt } : {}),
})

async function patchSiteSettings(assets: Record<Key, string>) {
  // Use the white logo for both light & dark — the live site doesn't have a
  // separate dark-variant. The white version works on light bg too because
  // the brand mark is dark + outlined.
  const logo = imageRef(assets.logoWhite, 'Duran Doğan')
  await client.patch('siteSettings').set({ logoLight: logo, logoDark: logo }).commit()
  console.log('  ✓ siteSettings · logoLight + logoDark')
}

async function patchHomePageHero(assets: Record<Key, string>) {
  const doc = await client.getDocument('homePage')
  if (!doc || !Array.isArray((doc as any).sections)) return
  const sections = (doc as any).sections as any[]

  const slides = [
    {
      _key: `slide-${Date.now()}-1`,
      image: imageRef(assets.hero01, 'Üretim hattımız'),
      caption: 'Üretim',
      eyebrow: '90 Yıllık Üretim Geleneği',
      heading: '90 Yıllık Tecrübe, Geleceğe Üretim',
    },
    {
      _key: `slide-${Date.now()}-2`,
      image: imageRef(assets.hero02, 'Sürdürülebilir üretim'),
      caption: 'Sürdürülebilirlik',
      eyebrow: 'Gloss & Green',
      heading: 'Geleceğe Duyarlı, Sürdürülebilir Üretim',
    },
    {
      _key: `slide-${Date.now()}-3`,
      image: imageRef(assets.hero03, 'Kalite kontrol'),
      caption: 'Kalite',
      eyebrow: 'Sertifikalı Kalite',
      heading: 'ISO, FSC, BRC — Dünya Standartlarında Kalite',
    },
  ]

  const ops = client.patch('homePage')
  sections.forEach((s, idx) => {
    if (s._type === 'heroSection') {
      ops.set({
        [`sections[${idx}].slides`]: slides,
        [`sections[${idx}].autoplayInterval`]: 6,
      })
      // Remove old single media so slider takes over
      ops.unset([`sections[${idx}].media`])
    }
  })
  await ops.commit()
  console.log('  ✓ homePage · hero slides (3 slayt + autoplay 6s)')
}

async function run() {
  console.log(`\n🎨  Brand asset seeder · ${projectId}/${dataset}\n`)
  console.log('Step 1/2 — Görselleri Sanity\'e yükle:')
  const assets = await uploadAll()
  console.log('\nStep 2/2 — Dokümanları patch et:')
  await patchSiteSettings(assets)
  await patchHomePageHero(assets)
  console.log('\n✅  Logo + Hero slider hazır.\n')
}

run().catch((err) => {
  console.error('\n❌  Brand seed failed:', err.message)
  process.exit(1)
})
