/* eslint-disable no-console */
/**
 * Image seeder for Duran Doğan content.
 *
 * Downloads curated packaging/manufacturing/sustainability photography from
 * Unsplash, uploads each as a Sanity asset, then patches the matching
 * documents (homePage sections, products, news, corporatePage, sustainability).
 *
 * Run:
 *   npx tsx scripts/seed-images.ts
 */

import { config as loadEnv } from 'dotenv'
import { createClient } from '@sanity/client'

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

/* ───────────────────────────────────────────────────────────────────────────
 * IMAGE CATALOG
 * Unsplash photo IDs — each resolved via https://images.unsplash.com/{id}
 * Free for any use (Unsplash License). Selected for premium packaging,
 * manufacturing, sustainability and corporate themes.
 * ─────────────────────────────────────────────────────────────────────────── */
const IMAGES = {
  // Hero / sections
  heroMain:         { id: 'photo-1586528116311-ad8dd3c8310d', alt: 'Premium karton ambalaj koleksiyonu' },
  bizKimiz:         { id: 'photo-1581090700227-1e37b190418e', alt: 'Modern üretim hattı' },
  corporateHero:    { id: 'photo-1497366216548-37526070297c', alt: 'Kurumsal ofis' },
  sustainabilityHero:{ id: 'photo-1542601906990-b4d3fb778b09', alt: 'Yeşil yaprak — sürdürülebilirlik' },

  // Products
  katlanirKarton:   { id: 'photo-1586528116311-ad8dd3c8310d', alt: 'Katlanır karton FMCG ambalaj' },
  rigidBox:         { id: 'photo-1549007994-cb92caebd54b',   alt: 'Lüks rijit kutu' },
  metalize:         { id: 'photo-1610701596007-11502861dcfa', alt: 'Metalize ambalaj' },
  glossGreen:       { id: 'photo-1530587191325-3db32d826c18', alt: 'Sürdürülebilir karton kutu' },
  etiketSleeve:     { id: 'photo-1574226516831-e1dff420e562', alt: 'Şişe etiketi' },
  ozelKesim:        { id: 'photo-1611042553365-9b101441c135', alt: 'Özel kesim ambalaj' },

  // News
  newsTubitak:      { id: 'photo-1532187863486-abf9dbad1b69', alt: 'Laboratuvar AR-GE' },
  newsInsoft:       { id: 'photo-1551288049-bebda4e38f71',   alt: 'Üretim yönetim yazılımı' },
  newsCdpA:         { id: 'photo-1542601906990-b4d3fb778b09', alt: 'CDP A iklim performansı' },

  // Timeline milestones (corporate)
  ml1938:           { id: 'photo-1568234928966-359c35dd8327', alt: '1938 kuruluş' },
  ml1970:           { id: 'photo-1565008447742-97f6f38c985c', alt: '1970 endüstriyel üretim' },
  ml1995:           { id: 'photo-1494412519320-aa613dfb7738', alt: '1995 ihracat' },
  ml2010:           { id: 'photo-1581090700227-1e37b190418e', alt: '2010 Hadımköy tesisi' },
  ml2024:           { id: 'photo-1542601906990-b4d3fb778b09', alt: '2024 CDP A listesi' },
} as const

type ImageKey = keyof typeof IMAGES
type AssetMap = Partial<Record<ImageKey, string>>

const UNSPLASH_URL = (id: string) =>
  `https://images.unsplash.com/${id}?w=1800&q=85&auto=format&fit=crop`

/* ───────────────────────────────────────────────────────────────────────────
 * UPLOAD HELPERS
 * ─────────────────────────────────────────────────────────────────────────── */

async function downloadImage(url: string): Promise<{ buffer: Buffer; contentType: string }> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`download ${url} → HTTP ${res.status}`)
  const contentType = res.headers.get('content-type') ?? 'image/jpeg'
  const arr = await res.arrayBuffer()
  return { buffer: Buffer.from(arr), contentType }
}

async function uploadAll(): Promise<AssetMap> {
  const out: AssetMap = {}
  let i = 0
  const total = Object.keys(IMAGES).length

  for (const [key, meta] of Object.entries(IMAGES) as [ImageKey, { id: string; alt: string }][]) {
    i++
    const url = UNSPLASH_URL(meta.id)
    try {
      process.stdout.write(`  [${i}/${total}] ${key.padEnd(20)} → indiriliyor… `)
      const { buffer, contentType } = await downloadImage(url)
      process.stdout.write(`yükleniyor… `)
      const asset = await client.assets.upload('image', buffer, {
        filename: `${key}.jpg`,
        contentType,
      })
      out[key] = asset._id
      console.log(`✓ ${asset._id.slice(0, 14)}…`)
    } catch (err: any) {
      console.warn(`✗ ${err.message}`)
    }
  }
  return out
}

const imageRef = (assetId?: string, alt?: string) =>
  assetId
    ? { _type: 'image', asset: { _type: 'reference', _ref: assetId }, alt }
    : undefined

/* ───────────────────────────────────────────────────────────────────────────
 * PATCH STEPS
 * ─────────────────────────────────────────────────────────────────────────── */

async function patchProducts(assets: AssetMap) {
  const mapping: Record<string, ImageKey> = {
    'product-katlanir-karton': 'katlanirKarton',
    'product-rigid-box':       'rigidBox',
    'product-metalize':        'metalize',
    'product-gloss-green':     'glossGreen',
    'product-etiket-sleeve':   'etiketSleeve',
    'product-ozel-kesim':      'ozelKesim',
  }
  for (const [docId, key] of Object.entries(mapping)) {
    const ref = imageRef(assets[key], IMAGES[key].alt)
    if (!ref) continue
    await client.patch(docId).set({ coverImage: ref }).commit()
    console.log(`  ✓ ${docId} · coverImage`)
  }
}

async function patchNews(assets: AssetMap) {
  const mapping: Record<string, ImageKey> = {
    'news-tubitak': 'newsTubitak',
    'news-insoft':  'newsInsoft',
    'news-cdp-a':   'newsCdpA',
  }
  for (const [docId, key] of Object.entries(mapping)) {
    const ref = imageRef(assets[key], IMAGES[key].alt)
    if (!ref) continue
    await client.patch(docId).set({ coverImage: ref }).commit()
    console.log(`  ✓ ${docId} · coverImage`)
  }
}

async function patchHomePage(assets: AssetMap) {
  // We need to find sections by _type to patch by index without breaking
  // existing _key references.
  const doc = await client.getDocument('homePage')
  if (!doc || !Array.isArray((doc as any).sections)) return
  const sections = (doc as any).sections as any[]

  const ops = client.patch('homePage')

  sections.forEach((s, idx) => {
    if (s._type === 'heroSection' && assets.heroMain) {
      ops.set({
        [`sections[${idx}].media`]: {
          type: 'image',
          image: imageRef(assets.heroMain, IMAGES.heroMain.alt),
        },
      })
    }
    if (s._type === 'contentImageSection' && assets.bizKimiz) {
      ops.set({
        [`sections[${idx}].image`]: imageRef(assets.bizKimiz, IMAGES.bizKimiz.alt),
      })
    }
  })
  await ops.commit()
  console.log('  ✓ homePage · hero + content-image sections')
}

async function patchCorporatePage(assets: AssetMap) {
  const doc = await client.getDocument('corporatePage')
  if (!doc || !Array.isArray((doc as any).sections)) return
  const sections = (doc as any).sections as any[]

  const ops = client.patch('corporatePage')
  const milestoneAssets = [assets.ml1938, assets.ml1970, assets.ml1995, assets.ml2010, assets.ml2024]
  const milestoneAlts = [IMAGES.ml1938.alt, IMAGES.ml1970.alt, IMAGES.ml1995.alt, IMAGES.ml2010.alt, IMAGES.ml2024.alt]

  sections.forEach((s, idx) => {
    if (s._type === 'heroSection' && assets.corporateHero) {
      ops.set({
        [`sections[${idx}].media`]: {
          type: 'image',
          image: imageRef(assets.corporateHero, IMAGES.corporateHero.alt),
        },
      })
    }
    if (s._type === 'contentImageSection' && assets.bizKimiz) {
      ops.set({
        [`sections[${idx}].image`]: imageRef(assets.bizKimiz, IMAGES.bizKimiz.alt),
      })
    }
    if (s._type === 'timelineSection' && Array.isArray(s.milestones)) {
      s.milestones.forEach((m: any, mi: number) => {
        const aid = milestoneAssets[mi]
        if (aid) {
          ops.set({
            [`sections[${idx}].milestones[${mi}].image`]: imageRef(aid, milestoneAlts[mi]),
          })
        }
      })
    }
  })
  await ops.commit()
  console.log('  ✓ corporatePage · hero + timeline + content-image')
}

async function patchSustainability(assets: AssetMap) {
  const ref = imageRef(assets.sustainabilityHero, IMAGES.sustainabilityHero.alt)
  if (!ref) return
  await client.patch('sustainabilityPage').set({
    'hero.media': { type: 'image', image: ref },
  }).commit()
  console.log('  ✓ sustainabilityPage · hero')
}

/* ───────────────────────────────────────────────────────────────────────────
 * RUNNER
 * ─────────────────────────────────────────────────────────────────────────── */

async function run() {
  console.log(`\n🖼   Image seeder · project ${projectId}/${dataset}\n`)

  console.log('Step 1/3 — Görselleri Sanity\'e yükle:')
  const assets = await uploadAll()
  const uploaded = Object.keys(assets).length
  console.log(`\n  → ${uploaded}/${Object.keys(IMAGES).length} görsel yüklendi\n`)

  console.log('Step 2/3 — Ürün & haberleri patch et:')
  await patchProducts(assets)
  await patchNews(assets)

  console.log('\nStep 3/3 — Sayfaları patch et:')
  await patchHomePage(assets)
  await patchCorporatePage(assets)
  await patchSustainability(assets)

  console.log('\n✅  İşlem tamam — siteyi yenile.')
}

run().catch((err) => {
  console.error('\n❌  Image seed failed:', err.message)
  process.exit(1)
})
