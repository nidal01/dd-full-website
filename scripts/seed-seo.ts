/* eslint-disable no-console */
/**
 * Tüm Sanity dokümanlarına şablon tabanlı SEO doldurur.
 *
 *   npx tsx scripts/seed-seo.ts            # patch().setIfMissing — sadece BOŞ alanları doldurur
 *   npx tsx scripts/seed-seo.ts --force    # patch().set        — TÜM alanları üzerine yazar (DİKKAT)
 *
 * Default mod idempotent ve güvenli: Studio'da elle yazdığın hiçbir SEO
 * alanı kaybolmaz. Yeni bir doküman eklendiğinde script'i tekrar çalıştırmak
 * yeterli — sadece o yeni dokümanın boş alanlarını doldurur.
 */

import { config as loadEnv } from 'dotenv'
import { createClient } from '@sanity/client'

loadEnv({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID veya SANITY_API_WRITE_TOKEN eksik.')
  process.exit(1)
}

const FORCE = process.argv.includes('--force')
const BRAND = 'Duran Doğan'
const TAGLINE = '90 Yıllık Tecrübe, Geleceğe Üretim'

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
})

// ---------- helpers ----------

const clamp = (s: string, max: number) =>
  s.length <= max ? s : s.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'

const buildSeo = (input: {
  metaTitle: string
  metaDescription: string
  ogTitle?: string
  ogDescription?: string
  keywords?: string[]
}) => ({
  metaTitle: clamp(input.metaTitle, 60),
  metaDescription: clamp(input.metaDescription, 160),
  openGraph: {
    ogTitle: clamp(input.ogTitle ?? input.metaTitle, 70),
    ogDescription: clamp(input.ogDescription ?? input.metaDescription, 200),
  },
  keywords: (input.keywords ?? []).slice(0, 10),
})

const applySeo = (
  tx: ReturnType<typeof client.transaction>,
  id: string,
  seo: ReturnType<typeof buildSeo>
) => {
  if (FORCE) {
    tx.patch(id, (p) => p.set({ seo }))
    return
  }
  // setIfMissing tüm `seo` objesi için: doküman seo'suz ise komple ekler
  // Ayrı ayrı path'lerle her alanı koruyarak doldur
  tx.patch(id, (p) =>
    p
      .setIfMissing({ seo: {} })
      .setIfMissing({ 'seo.metaTitle': seo.metaTitle })
      .setIfMissing({ 'seo.metaDescription': seo.metaDescription })
      .setIfMissing({ 'seo.keywords': seo.keywords })
      .setIfMissing({ 'seo.openGraph': {} })
      .setIfMissing({ 'seo.openGraph.ogTitle': seo.openGraph.ogTitle })
      .setIfMissing({ 'seo.openGraph.ogDescription': seo.openGraph.ogDescription })
  )
}

// ---------- templates ----------

const productSeo = (p: { title: string; cat: string }) =>
  buildSeo({
    metaTitle: `${p.title} · ${p.cat} Ambalaj | ${BRAND}`,
    metaDescription: `${p.cat} sektörü için premium katlanır karton ambalaj. ${p.title} projesi — markanıza özel ölçü, baskı ve son işlem. ECMA GMP ve BRCGS PM uyumlu üretim.`,
    keywords: [
      p.title,
      `${p.cat} ambalaj`,
      'katlanır karton',
      'premium ambalaj',
      'baskılı kutu',
      BRAND,
    ],
  })

const categorySeo = (c: { title: string; slug: string }) => {
  const desc: Record<string, string> = {
    gida: 'Çikolata, bisküvi, atıştırmalık ve gurme gıda için food-safe katlanır karton ambalaj. BRCGS PM ve düşük migrasyonlu mürekkeplerle üretim.',
    icecek: 'Premium içki, içecek ve çay ambalajları. Folyo lake, sıcak yaldız ve özel kabartma seçenekleriyle raflarda öne çıkan tasarımlar.',
    'kisisel-bakim': 'Kozmetik, parfüm ve kişisel bakım kategorileri için lüks katlanır karton kutu. Soft-touch, UV lake ve folyo varak uygulamaları.',
    'ev-urunleri': 'Ev ürünleri ve beyaz eşya aksesuarları için dayanıklı, taşımaya uygun karton ambalaj çözümleri.',
    medikal: 'İlaç ve medikal cihaz ambalajları. GMP standartlarında, Braille kabartma ve serileştirme uyumlu üretim.',
    butik: 'Butik ve hediyelik segmentine özel tasarım katlanır kutu uygulamaları. Düşük adetli premium projeler.',
  }
  return buildSeo({
    metaTitle: `${c.title} Ambalaj Çözümleri | ${BRAND}`,
    metaDescription:
      desc[c.slug] ??
      `${c.title} kategorisi için premium katlanır karton ambalaj çözümleri. ${BRAND} portföyünden örnekler.`,
    keywords: [
      `${c.title} ambalaj`,
      `${c.title} karton kutu`,
      'katlanır karton',
      'premium ambalaj',
      BRAND,
    ],
  })
}

const newsSeo = (n: { title: string; excerpt?: string }) =>
  buildSeo({
    metaTitle: `${n.title} | ${BRAND}`,
    metaDescription:
      n.excerpt ??
      `${n.title} — ${BRAND} basın bültenleri ve haberleri. Sürdürülebilirlik, üretim ve sektörel gelişmeler.`,
    keywords: [n.title, `${BRAND} haberler`, 'basın bülteni', 'ambalaj sektörü'],
  })

const singletonSeo: Record<string, ReturnType<typeof buildSeo>> = {
  homePage: buildSeo({
    metaTitle: `${BRAND} · Premium Katlanır Karton Ambalaj Üreticisi`,
    metaDescription: `${TAGLINE}. Gıda, içecek, kişisel bakım ve medikal sektörlerine FSC sertifikalı, sürdürülebilir karton ambalaj üretiyoruz.`,
    keywords: [
      'katlanır karton ambalaj',
      'premium ambalaj üreticisi',
      'gıda ambalajı',
      'içecek ambalajı',
      'FSC sertifikalı ambalaj',
      'sürdürülebilir ambalaj',
      BRAND,
    ],
  }),
  corporatePage: buildSeo({
    metaTitle: `Kurumsal · Hakkımızda | ${BRAND}`,
    metaDescription: `1933'ten bu yana ambalaj sektöründe öncü. ${BRAND} tarihçesi, Hadımköy tesisi, ekibi ve değerleri.`,
    keywords: ['hakkımızda', 'kurumsal', 'ambalaj üreticisi', 'Hadımköy tesisi', BRAND],
  }),
  contactPage: buildSeo({
    metaTitle: `İletişim · Teklif Alın | ${BRAND}`,
    metaDescription: `Premium ambalaj projeniz için bizimle iletişime geçin. Hadımköy tesisi, satış ekibi, telefon, e-posta ve teklif formu.`,
    keywords: ['iletişim', 'ambalaj teklif', 'Hadımköy', 'ambalaj üreticisi iletişim', BRAND],
  }),
  sustainabilityPage: buildSeo({
    metaTitle: `Sürdürülebilirlik · CDP SEA A | ${BRAND}`,
    metaDescription: `CDP SEA A listesi, FSC sertifikası ve karbon ayak izi taahhüdümüz. ${BRAND} sürdürülebilirlik stratejisi ve raporları.`,
    keywords: [
      'sürdürülebilirlik',
      'CDP A listesi',
      'FSC sertifikalı ambalaj',
      'karbon ayak izi',
      'sürdürülebilir ambalaj',
      BRAND,
    ],
  }),
}

// ---------- main ----------

async function main() {
  console.log(`🔎  SEO dolduruluyor (mode: ${FORCE ? 'FORCE (üzerine yazar)' : 'safe (setIfMissing)'})`)

  const products: Array<{ _id: string; title: string; cat: string }> = await client.fetch(
    `*[_type=="product"]{_id, title, "cat": coalesce(category->title, "Ambalaj")}`
  )
  const categories: Array<{ _id: string; title: string; slug: string }> = await client.fetch(
    `*[_type=="productCategory"]{_id, title, "slug": slug.current}`
  )
  const news: Array<{ _id: string; title: string; excerpt?: string }> = await client.fetch(
    `*[_type=="news"]{_id, title, excerpt}`
  )

  console.log(
    `   • ${products.length} ürün, ${categories.length} kategori, ${news.length} haber, 4 singleton`
  )

  const tx = client.transaction()

  for (const p of products) applySeo(tx, p._id, productSeo(p))
  for (const c of categories) applySeo(tx, c._id, categorySeo(c))
  for (const n of news) applySeo(tx, n._id, newsSeo(n))
  for (const [id, seo] of Object.entries(singletonSeo)) applySeo(tx, id, seo)

  await tx.commit({ autoGenerateArrayKeys: true })
  console.log(`✅  ${products.length + categories.length + news.length + 4} doküman güncellendi.`)
}

main().catch((err) => {
  console.error('❌  Hata:', err.message)
  process.exit(1)
})
