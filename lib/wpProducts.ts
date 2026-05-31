/**
 * Duran Doğan WordPress kaynak portföyünden tüm ürünler.
 * 91 ürün — Sanity'den bağımsız static dataset.
 * (durandogan.com WP sitesinden adapt edildi.)
 */

export type WpProductCategory =
  | 'gida'
  | 'icecek'
  | 'kisisel-bakim'
  | 'ev-urunleri'
  | 'medikal'
  | 'butik'

export type WpProduct = {
  slug: string
  title: string
  category: WpProductCategory
  categoryTitle: string
  image: string
}

const CDN = 'https://dd.wordpressajansi.tr/wp-content/uploads/2026/03'

const make = (
  category: WpProductCategory,
  categoryTitle: string,
  rows: Array<[title: string, filename: string]>
): WpProduct[] =>
  rows.map(([title, filename]) => ({
    slug: title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, ''),
    title,
    category,
    categoryTitle,
    image: `${CDN}/${filename}`,
  }))

// ============================================================
// GIDA — 34 ürün
// ============================================================
export const gidaProducts = make('gida', 'Gıda', [
  ['DD FD 4', '2021-02-16-18-53-26-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD1', '2021-02-16-23-23-35-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD10', 'godiva-belgium-edit-min-scaled-1.jpg'],
  ['DD FD11', 'ece-edited-min-scaled-1.jpg'],
  ['DD FD12', 'durandogan2007-copy-min-scaled-1.jpg'],
  ['DD FD13', 'Durandogan1867-min-scaled-1.jpg'],
  ['DD FD14', 'Durandogan1499-1-min-scaled-1.jpg'],
  ['DD FD15', 'Durandogan1473-min-scaled-1.jpg'],
  ['DD FD16', '2021-02-16-18-37-25-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD17', 'Durandogan1464-min-scaled-1.jpg'],
  ['DD FD18', 'Durandogan1424-min-scaled-1.jpg'],
  ['DD FD19', 'Durandogan1408-min-scaled-1.jpg'],
  ['DD FD2', '2021-02-16-22-14-07-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD20', 'Durandogan1395-min-scaled-1.jpg'],
  ['DD FD21', 'Durandogan1349-1-min-scaled-1.jpg'],
  ['DD FD22', 'Durandogan1375-min-scaled-1.jpg'],
  ['DD FD23', 'Durandogan1368-min-scaled-1.jpg'],
  ['DD FD24', 'Durandogan1382-min-scaled-1.jpg'],
  ['DD FD25', 'Durandogan1319-min-scaled-1.jpg'],
  ['DD FD26', 'durandogan0380-min-scaled-1.jpg'],
  ['DD FD27', 'durandogan0063-min-scaled-1.jpg'],
  ['DD FD28', '2021-02-23-14-19-33-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD29', '2021-02-17-04-39-50-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD3', '2021-02-16-21-23-46-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD30', '2021-02-17-04-19-17-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD31', '2021-02-17-02-39-45-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD32', '2021-02-17-02-23-43-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD33', '2021-02-17-01-04-03-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD34', 'Durandogan1704-min-scaled-1.jpg'],
  ['DD FD5', '2021-02-16-18-11-33-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD6', '2021-01-29-02-29-54-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD7', '2021-01-13-00-45-22-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD8', '2021-01-07-13-36-24-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD FD9', 'mcvities-edited-min-scaled-1.jpg'],
])

// ============================================================
// İÇECEK — 19 ürün
// ============================================================
export const icecekProducts = make('icecek', 'İçecek', [
  ['DD BV1', 'black-label-edi-min-scaled-1.jpg'],
  ['DD BV10', 'durandogan0889-min-scaled-1.jpg'],
  ['DD BV11', 'durandogan0094-min-scaled-1.jpg'],
  ['DD BV12', 'Durandogan1149-min-scaled-1.jpg'],
  ['DD BV13', 'Durandogan1052-min-scaled-1.jpg'],
  ['DD BV14', 'Durandogan1032-min-scaled-1.jpg'],
  ['DD BV15', 'durandogan0823-min-scaled-1.jpg'],
  ['DD BV16', 'durandogan0501-min-scaled-1.jpg'],
  ['DD BV17', 'durandogan0729-min-scaled-1.jpg'],
  ['DD BV18', 'durandogan0115-min-scaled-1.jpg'],
  ['DD BV19', '2021-01-13-01-01-03-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD BV2', 'durandogan0688-min-scaled-1.jpg'],
  ['DD BV20', 'durandogan0158-min-scaled-1.jpg'],
  ['DD BV3', 'durandogan0903-min-scaled-1.jpg'],
  ['DD BV4', 'durandogan0922-min-scaled-1.jpg'],
  ['DD BV6', 'durandogan0708-min-scaled-1.jpg'],
  ['DD BV7', 'Durandogan1200-min-scaled-1.jpg'],
  ['DD BV8', 'durandogan0409-min-scaled-1.jpg'],
  ['DD BV9', 'Durandogan1157-min-scaled-1.jpg'],
])

// ============================================================
// KİŞİSEL BAKIM — 9 ürün
// ============================================================
export const kisiselBakimProducts = make('kisisel-bakim', 'Kişisel Bakım', [
  ['DD KB1', 'Durandogan1456-min-scaled-1.jpg'],
  ['DD KB2', 'durandogan0423-min-scaled-1.jpg'],
  ['DD KB3', 'durandogan0310-min-scaled-1.jpg'],
  ['DD KB4', 'durandogan0186-min-scaled-1.jpg'],
  ['DD KB5', '2021-02-17-03-54-46-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD KB6', '2021-02-17-01-37-05-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD KB7', '2021-02-17-01-28-54-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD KB8', '2021-01-28-16-55-31-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD KB9', '2021-01-18-16-27-20-ARadius24Smoothing4-min-scaled-1.jpg'],
])

// ============================================================
// EV ÜRÜNLERİ — 5 ürün
// ============================================================
export const evUrunleriProducts = make('ev-urunleri', 'Ev Ürünleri', [
  ['DD HH1', 'durandogan0201-copy-min-scaled-1.jpg'],
  ['DD HH2', '2021-01-26-18-05-46-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD HH3', '2021-01-22-14-07-29-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD HH4', '2021-01-12-21-50-38-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD HH5', 'Durandogan1619-min-scaled-1.jpg'],
])

// ============================================================
// MEDİKAL — 5 ürün
// ============================================================
export const medikalProducts = make('medikal', 'Medikal', [
  ['DD MD1', '2021-01-18-18-47-56-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD MD2', '2021-01-13-01-42-15-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD MD3', '2021-01-12-23-59-11-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD MD4', '2021-01-12-21-12-59-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD MD5', 'durandogan0523-copy-min-scaled-1.jpg'],
])

// ============================================================
// BUTİK — 19 ürün
// ============================================================
export const butikProducts = make('butik', 'Butik', [
  ['DD B01', 'durandogan0892-min-scaled-1.jpg'],
  ['DD B02', 'durandogan0670-min-scaled-1.jpg'],
  ['DD B03', 'althahab-edited-min-scaled-1.jpg'],
  ['DD B04', 'new-grove-edited-min-scaled-1.jpg'],
  ['DD B05', 'Durandogan1031-copy-min-scaled-1.jpg'],
  ['DD B06', 'durandogan0576-min-scaled-1.jpg'],
  ['DD B07', 'Durandogan1535-min-scaled-1.jpg'],
  ['DD B08', 'durandogan0592-min-scaled-1.jpg'],
  ['DD B09', '2021-01-29-04-12-21-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD B10', 'durandogan0628-min-scaled-1.jpg'],
  ['DD B11', 'yeniraki-edited-min-scaled-1.jpg'],
  ['DD B12', 'aberlour-edit-min-scaled-1.jpg'],
  ['DD B13', 'hse-edited-min-scaled-1.jpg'],
  ['DD B14', 'yeniranki-edit2-min-scaled-1.jpg'],
  ['DD B15', '2021-01-22-00-42-13-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD B16', 'hse2-edited-min-scaled-1.jpg'],
  ['DD B17', '2021-01-22-02-24-59-ARadius24Smoothing4-min-scaled-1.jpg'],
  ['DD B18', 'truffles-edit-min-scaled-1.jpg'],
  ['DD B19', '2021-01-22-04-15-43-ARadius24Smoothing4-min-scaled-1.jpg'],
])

// ============================================================
// AGGREGATE
// ============================================================
export const allWpProducts: WpProduct[] = [
  ...gidaProducts,
  ...icecekProducts,
  ...kisiselBakimProducts,
  ...evUrunleriProducts,
  ...medikalProducts,
  ...butikProducts,
]

export const wpProductsByCategory: Record<WpProductCategory, WpProduct[]> = {
  gida: gidaProducts,
  icecek: icecekProducts,
  'kisisel-bakim': kisiselBakimProducts,
  'ev-urunleri': evUrunleriProducts,
  medikal: medikalProducts,
  butik: butikProducts,
}

export function getWpProductBySlug(slug: string): WpProduct | undefined {
  return allWpProducts.find((p) => p.slug === slug)
}

export const wpCategoryMeta: Record<
  WpProductCategory,
  { title: string; count: number; intro: string }
> = {
  gida: {
    title: 'Gıda',
    count: gidaProducts.length,
    intro:
      'BRCGS PM ve ECMA GMP sertifikalı üretim hatlarımızla hijyen ve raf etkisini bir araya getiren gıda ambalajı çözümleri.',
  },
  icecek: {
    title: 'İçecek',
    count: icecekProducts.length,
    intro:
      'Alkollü ve alkolsüz içecek markaları için premium rigid box, multipack ve özel form katlanır karton ambalajlar.',
  },
  'kisisel-bakim': {
    title: 'Kişisel Bakım',
    count: kisiselBakimProducts.length,
    intro:
      'Kozmetik, parfümeri ve kişisel bakım markaları için raf etkisi yüksek, premium efektli ambalajlar.',
  },
  'ev-urunleri': {
    title: 'Ev Ürünleri',
    count: evUrunleriProducts.length,
    intro:
      'Beyaz eşya, küçük ev aletleri ve hane ürünleri için dayanıklılıkla premium görünümü buluşturan ambalajlar.',
  },
  medikal: {
    title: 'Medikal',
    count: medikalProducts.length,
    intro:
      'İlaç ve sağlık ürünleri için uçtan uca izlenebilir, GMP uyumlu güvenli medikal ambalajlar.',
  },
  butik: {
    title: 'Butik',
    count: butikProducts.length,
    intro:
      'Lüks ve butik markalar için cold foil, soft touch lak, gofre ve metalize gibi premium efektlerle desteklenmiş özel tasarımlar.',
  },
}
