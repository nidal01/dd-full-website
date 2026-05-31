/* eslint-disable no-console */
/**
 * WP kaynak portföyündeki 91 ürünü Sanity'ye seed eder.
 *
 * Kullanım:
 *   1) .env.local içinde SANITY_API_WRITE_TOKEN tanımlı olmalı.
 *   2) Aşağıdaki kategoriler Sanity'de var olmalı (yoksa otomatik oluşturulur).
 *   3) Çalıştır:
 *        npx tsx scripts/seed-wp-products.ts
 *
 * Idempotent: her ürünün _id'si slug'tan türetilir, tekrar çalıştırınca
 * sadece patch atar.
 */

import { config as loadEnv } from 'dotenv'
import { createClient } from '@sanity/client'
import { allWpProducts, wpCategoryMeta } from '../lib/wpProducts'

loadEnv({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error(
    '❌  NEXT_PUBLIC_SANITY_PROJECT_ID veya SANITY_API_WRITE_TOKEN .env.local içinde tanımlı değil.'
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
})

const categoryDocId = (slug: string) => `cat-${slug}`
const productDocId = (slug: string) => `product-${slug}`

async function ensureCategories() {
  console.log('📂  Kategoriler kontrol ediliyor...')
  const tx = client.transaction()
  let order = 1
  for (const [slug, meta] of Object.entries(wpCategoryMeta)) {
    tx.createIfNotExists({
      _id: categoryDocId(slug),
      _type: 'productCategory',
      title: meta.title,
      slug: { _type: 'slug', current: slug },
      description: meta.intro,
      order: order++,
    })
  }
  await tx.commit({ autoGenerateArrayKeys: true })
  console.log('   ✓ 6 kategori hazır.')
}

async function seedProducts() {
  console.log(`📦  ${allWpProducts.length} ürün seed ediliyor...`)

  // Sanity transaction tek tx'te maks 1000+ mutation handle eder; biz 91
  // ürün için tek transaction kullanabiliriz.
  const tx = client.transaction()
  let order = 1

  for (const p of allWpProducts) {
    const id = productDocId(p.slug)
    // createIfNotExists — varsa dokunma; sonra patch ile yeni alanları güncelle
    tx.createOrReplace({
      _id: id,
      _type: 'product',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      category: { _type: 'reference', _ref: categoryDocId(p.category) },
      externalImageUrl: p.image,
      tagline: `${p.categoryTitle} sektörü · premium ambalaj`,
      order: order++,
      isFeatured: false,
    })
  }

  await tx.commit({ autoGenerateArrayKeys: true })
  console.log(`   ✓ ${allWpProducts.length} ürün Sanity'ye yazıldı.`)
}

async function main() {
  console.log('🌱  WP → Sanity seed başlıyor')
  console.log(`   project: ${projectId}, dataset: ${dataset}`)
  await ensureCategories()
  await seedProducts()
  console.log('✅  Tamamlandı. Studio: https://www.sanity.io/manage/project/' + projectId)
}

main().catch((err) => {
  console.error('❌  Hata:', err.message)
  process.exit(1)
})
