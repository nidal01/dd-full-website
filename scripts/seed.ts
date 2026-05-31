/* eslint-disable no-console */
/**
 * Sanity content seeder.
 *
 * Usage:
 *   1) Create a write token at https://www.sanity.io/manage/project/3gm0docx/api
 *      → API → Tokens → Add API token → name "seed", role "Editor" → copy
 *   2) Put it in .env.local as:
 *      SANITY_API_WRITE_TOKEN=skXXXXXX...
 *   3) Run:
 *      npx tsx scripts/seed.ts
 *
 * The script is idempotent — it uses fixed `_id`s so re-running just patches.
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

const key = () => Math.random().toString(36).slice(2, 10)
const block = (text: string) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})

// ── 1. SITE SETTINGS ───────────────────────────────────────────────────────────
const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Duran Doğan',
  tagline: '90 Yıllık Tecrübe, Geleceğe Üretim',
  primaryNav: [
    {
      _key: key(),
      label: 'Hakkımızda',
      hasMegaMenu: false,
      link: { _key: key(), type: 'external', href: '/kurumsal', label: 'Hakkımızda', openInNewTab: false },
    },
    {
      _key: key(),
      label: 'Üretim',
      hasMegaMenu: true,
      megaMenuColumns: [
        {
          _key: key(),
          heading: 'Üretim Süreçleri',
          links: [
            { _key: key(), type: 'external', href: '/uretim/tasarim-ar-ge', label: 'Tasarım & AR-GE' },
            { _key: key(), type: 'external', href: '/uretim/baski-kaplama', label: 'Baskı & Kaplama' },
            { _key: key(), type: 'external', href: '/uretim/kesim', label: 'Kesim & Şekillendirme' },
            { _key: key(), type: 'external', href: '/uretim/montaj', label: 'Montaj & Paketleme' },
            { _key: key(), type: 'external', href: '/uretim/kalite-kontrol', label: 'Kalite Kontrol' },
          ],
        },
        {
          _key: key(),
          heading: 'Sürdürülebilirlik',
          links: [
            { _key: key(), type: 'external', href: '/surdurulebilirlik#gloss-green', label: 'Gloss & Green' },
            { _key: key(), type: 'external', href: '/surdurulebilirlik#cdp', label: 'CDP A Listesi' },
            { _key: key(), type: 'external', href: '/surdurulebilirlik#enerji', label: 'Enerji Verimliliği' },
          ],
        },
        {
          _key: key(),
          heading: 'Kalite & Sertifikalar',
          links: [
            { _key: key(), type: 'external', href: '/kalite#iso-9001', label: 'ISO 9001' },
            { _key: key(), type: 'external', href: '/kalite#iso-14001', label: 'ISO 14001' },
            { _key: key(), type: 'external', href: '/kalite#fsc', label: 'FSC Sertifikası' },
            { _key: key(), type: 'external', href: '/kalite#brc', label: 'BRC' },
          ],
        },
      ],
      featuredCaption: 'Hadımköy Tesisi · 12.000 m² ana üretim merkezi',
    },
    {
      _key: key(),
      label: 'Portföy',
      hasMegaMenu: true,
      megaMenuColumns: [
        {
          _key: key(),
          heading: 'Kategoriler',
          links: [
            { _key: key(), type: 'external', href: '/urunler?kategori=butik', label: 'Butik' },
            { _key: key(), type: 'external', href: '/urunler?kategori=medikal', label: 'Medikal' },
            { _key: key(), type: 'external', href: '/urunler?kategori=kisisel-bakim', label: 'Kişisel Bakım' },
            { _key: key(), type: 'external', href: '/urunler?kategori=icecek', label: 'İçecek' },
            { _key: key(), type: 'external', href: '/urunler?kategori=gida', label: 'Gıda' },
            { _key: key(), type: 'external', href: '/urunler?kategori=ev-urunleri', label: 'Ev Ürünleri' },
          ],
        },
        {
          _key: key(),
          heading: 'Çözümler',
          links: [
            { _key: key(), type: 'external', href: '/urunler?kategori=katlanir-karton', label: 'Katlanır Karton (FMCG)' },
            { _key: key(), type: 'external', href: '/urunler?kategori=rigid-box', label: 'Rigid Box (Premium)' },
            { _key: key(), type: 'external', href: '/urunler?kategori=metalize', label: 'Metalize Ambalaj' },
            { _key: key(), type: 'external', href: '/urunler?kategori=etiket', label: 'Etiket & Sleeve' },
          ],
        },
      ],
    },
    {
      _key: key(),
      label: 'Sürdürülebilirlik',
      hasMegaMenu: false,
      link: { _key: key(), type: 'external', href: '/surdurulebilirlik', label: 'Sürdürülebilirlik' },
    },
    {
      _key: key(),
      label: 'Haberler',
      hasMegaMenu: false,
      link: { _key: key(), type: 'external', href: '/haberler', label: 'Haberler' },
    },
    {
      _key: key(),
      label: 'İletişim',
      hasMegaMenu: false,
      link: { _key: key(), type: 'external', href: '/iletisim', label: 'İletişim' },
    },
  ],
  topbarCta: {
    label: 'Teklif Alın',
    variant: 'primary',
    link: { type: 'external', href: '/iletisim', label: 'Teklif Alın' },
  },
  announcement: { enabled: false, text: '' },
  footerColumns: [
    {
      _key: key(),
      heading: 'Şirket',
      links: [
        { _key: key(), type: 'external', href: '/kurumsal', label: 'Hakkımızda' },
        { _key: key(), type: 'external', href: '/kurumsal#tarihce', label: 'Tarihçemiz' },
        { _key: key(), type: 'external', href: '/yatirimci', label: 'Yatırımcı İlişkileri' },
        { _key: key(), type: 'external', href: '/ik', label: 'İnsan Kaynakları' },
      ],
    },
    {
      _key: key(),
      heading: 'Üretim',
      links: [
        { _key: key(), type: 'external', href: '/uretim/gloss-green', label: 'Gloss & Green' },
        { _key: key(), type: 'external', href: '/uretim', label: 'Üretim Süreçleri' },
        { _key: key(), type: 'external', href: '/kalite', label: 'Kalite Yönetim Sistemi' },
        { _key: key(), type: 'external', href: '/surdurulebilirlik', label: 'Sürdürülebilirlik' },
      ],
    },
    {
      _key: key(),
      heading: 'Portföy',
      links: [
        { _key: key(), type: 'external', href: '/urunler', label: 'Tüm Çözümler' },
        { _key: key(), type: 'external', href: '/urunler?kategori=butik', label: 'Butik' },
        { _key: key(), type: 'external', href: '/urunler?kategori=medikal', label: 'Medikal' },
        { _key: key(), type: 'external', href: '/urunler?kategori=icecek', label: 'İçecek' },
      ],
    },
  ],
  footerNote:
    '© Duran Doğan Basım ve Ambalaj Sanayi A.Ş. — 1938\'den bu yana karton ambalaj sanatının zirvesinde.',
  legalLinks: [
    { _key: key(), type: 'external', href: '/kvkk', label: 'KVKK' },
    { _key: key(), type: 'external', href: '/gizlilik', label: 'Gizlilik Politikası' },
  ],
  socials: [
    { _key: key(), platform: 'linkedin', url: 'https://www.linkedin.com/company/duran-dogan' },
    { _key: key(), platform: 'instagram', url: 'https://www.instagram.com/durandoganambalaj' },
    { _key: key(), platform: 'youtube', url: 'https://www.youtube.com/' },
  ],
  contactEmail: 'info@durandogan.com',
  contactPhone: '+90 212 771 46 06',
  addresses: [
    {
      _key: key(),
      label: 'Genel Merkez',
      street: 'Hadımköy Mah. Mustafa İnan Cad. No:41',
      city: 'Arnavutköy',
      country: 'Türkiye',
      postalCode: '34555',
      phone: '+90 212 771 46 06',
      email: 'info@durandogan.com',
    },
  ],
  defaultSeo: {
    metaTitle: 'Duran Doğan — 90 Yıllık Tecrübe, Geleceğe Üretim',
    metaDescription:
      'Karton ambalajda 90 yıllık tecrübe. 3 fabrika, 30.000 m², 70+ ülkeye ihracat. Sürdürülebilir ve premium ambalaj çözümleri.',
    keywords: ['ambalaj', 'karton kutu', 'rigid box', 'lüks ambalaj', 'sürdürülebilir ambalaj'],
  },
}

// ── 2. HOME PAGE ───────────────────────────────────────────────────────────────
const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  title: 'Ana Sayfa',
  sections: [
    {
      _type: 'heroSection',
      _key: key(),
      eyebrow: '90 Yıllık Üretim Geleneği',
      heading: '90 Yıllık Tecrübe, Geleceğe Üretim',
      subheading:
        'Ambalaj üretiminde 90 yıllık birikimimizle; 3 fabrikamız ve 30.000 m² kapalı alan kapasitemizle yüzlerce markaya değer katıyoruz.',
      alignment: 'left',
      ctas: [
        { _key: key(), label: 'Teklif Alın', variant: 'primary', link: { type: 'external', href: '/iletisim' } },
        { _key: key(), label: 'Bizi Tanıyın', variant: 'secondary', link: { type: 'external', href: '/kurumsal' } },
      ],
    },
    {
      _type: 'statsSection',
      _key: key(),
      heading: 'Rakamlarla Duran Doğan',
      stats: [
        { _key: key(), value: '90+', label: 'Yıllık Tecrübe', description: '1938\'den bu yana kesintisiz üretim.' },
        { _key: key(), value: '3', label: 'Fabrika', description: '30.000 m² toplam kapalı üretim alanı.' },
        { _key: key(), value: '70+', label: 'İhracat Ülkesi', description: '4 kıtada güvenilir iş ortaklığı.' },
        { _key: key(), value: '65+', label: 'Partner', description: 'Global ve yerel marka iş birlikleri.' },
      ],
    },
    {
      _type: 'contentImageSection',
      _key: key(),
      eyebrow: 'Biz Kimiz',
      heading: '90 yıllık ambalaj uzmanlığı',
      body: [
        block(
          '3 fabrikamız ve 30.000 m² kapalı alan kapasitemizle markalara değer katan ambalaj çözümleri üretiyoruz. Çevreci üretim anlayışımızı teknoloji yatırımları, AR-GE ve analiz altyapımızla güçlendirerek İstanbul\'dan dünyaya güvenle taşıyoruz.'
        ),
      ],
      imagePosition: 'right',
      cta: { label: 'Hakkımızda', variant: 'secondary', link: { type: 'external', href: '/kurumsal' } },
    },
    {
      _type: 'valuesSection',
      _key: key(),
      heading: 'Tasarımdan teslimata, 5 adımda üretim',
      subheading:
        'Entegre üretim hatlarımızda her aşama planlı, ölçülebilir ve kalite odaklı ilerler.',
      values: [
        { _key: key(), title: 'Tasarım & AR-GE', description: 'Konseptten dieline\'a, malzeme seçiminden prototipe kadar uçtan uca tasarım.', icon: 'Lightbulb' },
        { _key: key(), title: 'Baskı & Kaplama', description: 'Metalize, lake ve özel efekt baskı teknolojileriyle benzersiz yüzeyler.', icon: 'Palette' },
        { _key: key(), title: 'Kesim & Şekillendirme', description: 'Yüksek hassasiyetli kesim ve form makinelerinde sıfır toleranslı üretim.', icon: 'Scissors' },
        { _key: key(), title: 'Montaj & Paketleme', description: 'Karmaşık yapıların hatasız birleştirilmesi ve müşteriye hazır sevkiyat.', icon: 'Boxes' },
        { _key: key(), title: 'Kalite Kontrol', description: 'Her seri için izlenebilir, raporlanabilir kalite güvence süreçleri.', icon: 'ShieldCheck' },
        { _key: key(), title: 'Gloss & Green', description: 'Çevreci yaklaşımımızla geri dönüştürülebilir, sürdürülebilir ambalaj.', icon: 'Leaf' },
      ],
    },
    {
      _type: 'testimonialsSection',
      _key: key(),
      heading: 'Dünya markalarının tercihi',
      items: [
        { _key: key(), quote: 'Duran Doğan kalite ve hizmet anlayışı ile en önemli karton ambalaj tedarikçimizdir.', authorName: 'Korozo Flexibles', authorRole: 'Tedarik Zinciri', company: 'Korozo' },
        { _key: key(), quote: 'Zor günlerde gösterdiğiniz emek ve fedakarlık azımsanamaz.', authorName: 'Ülker', authorRole: 'Satın Alma', company: 'Ülker' },
        { _key: key(), quote: 'Uyum içinde çalışıyoruz. Yakaladığımız sinerji iş süreçlerimize yansıyor.', authorName: 'Lila Kağıt', authorRole: 'Operasyon', company: 'Lila Kağıt' },
        { _key: key(), quote: '70 ülkeye ihracat gerçekleştirebiliyorsak, bu başarıda tedarikçi firmaların katkısı da büyüktür.', authorName: "Benat's", authorRole: 'Genel Müdür', company: "Benat's" },
      ],
    },
    {
      _type: 'ctaSection',
      _key: key(),
      heading: 'Markanız için özel bir ambalaj çözümü hazırlayalım',
      subheading:
        'Brief\'inizi paylaşın; tasarım, prototipleme ve seri üretim için uçtan uca bir takım yanınızda olsun.',
      ctas: [
        { _key: key(), label: 'Teklif Alın', variant: 'primary', link: { type: 'external', href: '/iletisim' } },
        { _key: key(), label: 'Portföyümüz', variant: 'outline', link: { type: 'external', href: '/urunler' } },
      ],
    },
    {
      _type: 'faqSection',
      _key: key(),
      eyebrow: 'SSS',
      heading: 'Sıkça sorulan sorular',
      items: [
        { _key: key(), question: 'Minimum sipariş adediniz nedir?', answer: [block('Ürün karmaşıklığına göre 500 ile 5.000 adet arasında değişir. Rigid Box ve premium butik kutularda alt sınır 500 adetten başlar.')] },
        { _key: key(), question: 'Hangi sertifikalara sahipsiniz?', answer: [block('ISO 9001 (Kalite), ISO 14001 (Çevre), FSC (Sorumlu Orman), CDP A (İklim Performansı), BRC ve ISO 22000 (Gıda Güvenliği) sertifikalarımız mevcuttur.')] },
        { _key: key(), question: 'Hangi ülkelere ihracat yapıyorsunuz?', answer: [block('70\'den fazla ülkeye ihracat gerçekleştiriyoruz. 15+ ülkede aktif operasyon yürütüyoruz.')] },
        { _key: key(), question: 'Sürdürülebilirlik yaklaşımınız nedir?', answer: [block('Gloss & Green yaklaşımımızla geri dönüştürülebilir malzemeler, enerji verimliliği ve CDP A listesi performansıyla çevreye duyarlı üretim yapıyoruz.')] },
      ],
    },
  ],
}

// ── 3. CORPORATE PAGE ──────────────────────────────────────────────────────────
const corporatePage = {
  _id: 'corporatePage',
  _type: 'corporatePage',
  title: 'Kurumsal',
  sections: [
    {
      _type: 'heroSection',
      _key: key(),
      eyebrow: 'Hakkımızda',
      heading: 'Yarım asrı aşan bir ambalaj geleneği',
      subheading:
        '1938\'de kurulan Duran Doğan, üç kuşağın titizliği ve teknolojinin gücüyle Türk ambalaj sektörünün öncüsü olmaya devam ediyor.',
      alignment: 'left',
    },
    {
      _type: 'contentImageSection',
      _key: key(),
      eyebrow: 'Vizyon',
      heading: 'Dünyaya açılan üretim',
      body: [
        block(
          'Güçlü üretim altyapımız ve kalite standartlarımızla ambalaj çözümlerimizi farklı kıtalara ulaştırıyoruz. Zamanında teslimat ve güvenilir iş ortaklığıyla global markaların yanında yer alıyoruz.'
        ),
      ],
      imagePosition: 'right',
    },
    {
      _type: 'timelineSection',
      _key: key(),
      heading: 'Bir mirasın yolculuğu',
      milestones: [
        { _key: key(), year: '1938', title: 'Kuruluş', description: 'İstanbul\'da küçük bir matbaa olarak yola çıktık.' },
        { _key: key(), year: '1970', title: 'Endüstriyel üretim', description: 'İlk endüstriyel karton ambalaj hattımızı kurduk.' },
        { _key: key(), year: '1995', title: 'İhracat', description: 'İlk uluslararası müşterilerimize ulaştık.' },
        { _key: key(), year: '2010', title: 'Hadımköy Tesisi', description: '12.000 m²\'lik modern üretim merkezimizi açtık.' },
        { _key: key(), year: '2024', title: 'CDP A Listesi', description: 'İklim performansında en üst notu aldık.' },
      ],
    },
    {
      _type: 'valuesSection',
      _key: key(),
      heading: 'Üretim altyapımız — 3 fabrika',
      values: [
        { _key: key(), title: 'Hadımköy Tesisi', description: '12.000 m² ana üretim merkezi.', icon: 'Factory' },
        { _key: key(), title: 'İstanbul Üretim', description: '10.000 m² baskı hatları.', icon: 'Printer' },
        { _key: key(), title: 'Kapasite Genişleme', description: '8.000 m² montaj ve kontrol alanı.', icon: 'Expand' },
      ],
    },
    {
      _type: 'statsSection',
      _key: key(),
      heading: 'Rakamlarla biz',
      stats: [
        { _key: key(), value: '90+', label: 'Yıllık Tecrübe' },
        { _key: key(), value: '30.000 m²', label: 'Kapalı Alan' },
        { _key: key(), value: '70+', label: 'İhracat Ülkesi' },
        { _key: key(), value: '98+', label: 'Aktif Proje' },
      ],
    },
  ],
}

// ── 4. SUSTAINABILITY PAGE ─────────────────────────────────────────────────────
const sustainabilityPage = {
  _id: 'sustainabilityPage',
  _type: 'sustainabilityPage',
  title: 'Sürdürülebilirlik',
  hero: {
    eyebrow: 'Gloss & Green',
    heading: 'Geleceğe duyarlı üretim',
    subheading:
      'Çevresel etkiyi azaltırken uluslararası sürdürülebilirlik standartlarında üretim yapmaya devam ediyoruz.',
    alignment: 'left',
  },
  metrics: [
    { _key: key(), label: 'FSC Sertifikası', value: '100', unit: '%', description: 'Tüm karton hammaddesi sertifikalı.', icon: 'Leaf' },
    { _key: key(), label: 'CDP İklim Performansı', value: 'A', description: 'En üst not — CDP A listesi.', icon: 'Award' },
    { _key: key(), label: 'Enerji Verimliliği', value: '+28', unit: '%', description: 'Son 5 yılda enerji tasarrufu.', icon: 'Zap' },
    { _key: key(), label: 'Geri Dönüşüm', value: '92', unit: '%', description: 'Üretim atığı geri dönüşüm oranı.', icon: 'Recycle' },
  ],
  commitmentsBody: [
    block(
      'Gloss & Green yaklaşımımız, sadece bir slogan değil; bir üretim disiplinidir. AR-GE merkezimiz biyo-bazlı kaplamalar, geri dönüştürülmüş elyaf ve düşük karbonlu mürekkep üzerine çalışmalarına devam ediyor.'
    ),
  ],
}

// ── 5. CONTACT PAGE ────────────────────────────────────────────────────────────
const contactPage = {
  _id: 'contactPage',
  _type: 'contactPage',
  title: 'İletişim',
  heading: 'Birlikte çalışalım.',
  subheading: 'Markanız için özel bir ambalaj çözümü mü arıyorsunuz? Ekibimiz 24 saat içinde size dönüş yapar.',
  subjects: ['Teklif Talebi', 'Numune Talebi', 'İş Birliği', 'Kariyer', 'Basın & Medya'],
  submitEmail: 'info@durandogan.com',
  successMessage: 'Talebiniz başarıyla iletildi. Ekibimiz en kısa sürede dönüş yapacak.',
}

// ── 6. CATEGORIES ──────────────────────────────────────────────────────────────
const categories = [
  { _id: 'cat-butik',         _type: 'productCategory', title: 'Butik',         slug: { _type: 'slug', current: 'butik' },        description: 'Premium kişiselleştirilmiş ambalaj.', order: 1 },
  { _id: 'cat-medikal',       _type: 'productCategory', title: 'Medikal',       slug: { _type: 'slug', current: 'medikal' },      description: 'Steril ve regülasyona uygun çözümler.', order: 2 },
  { _id: 'cat-kisisel-bakim', _type: 'productCategory', title: 'Kişisel Bakım', slug: { _type: 'slug', current: 'kisisel-bakim' },description: 'Kozmetik ve cilt bakımı ambalajı.', order: 3 },
  { _id: 'cat-icecek',        _type: 'productCategory', title: 'İçecek',        slug: { _type: 'slug', current: 'icecek' },       description: 'Premium içki ve içecek kutuları.', order: 4 },
  { _id: 'cat-gida',          _type: 'productCategory', title: 'Gıda',          slug: { _type: 'slug', current: 'gida' },         description: 'BRC standartlarında gıda ambalajı.', order: 5 },
  { _id: 'cat-ev-urunleri',   _type: 'productCategory', title: 'Ev Ürünleri',   slug: { _type: 'slug', current: 'ev-urunleri' },  description: 'Beyaz eşya ve küçük ev aletleri.', order: 6 },
]

// ── 7. PRODUCTS ────────────────────────────────────────────────────────────────
const products = [
  {
    _id: 'product-katlanir-karton',
    _type: 'product',
    title: 'Katlanır Karton (FMCG)',
    slug: { _type: 'slug', current: 'katlanir-karton' },
    category: { _type: 'reference', _ref: 'cat-gida' },
    tagline: 'Hızlı tüketim için yüksek hacimli üretim',
    summary: 'FMCG sektörünün hız ve maliyet beklentilerini karşılayan ofset baskılı katlanır karton kutular.',
    highlights: ['Yüksek hacim üretim', 'Ofset ve flekso baskı', 'FSC sertifikalı kağıt', 'BRC gıda güvenliği'],
    sustainabilityTags: ['FSC Sertifikalı', 'Geri Dönüşümlü'],
    materials: ['Bristol', 'Krome karton', 'Geri dönüşümlü karton'],
    finishOptions: ['Mat lake', 'Parlak lake', 'UV nokta'],
    isFeatured: true,
    order: 1,
  },
  {
    _id: 'product-rigid-box',
    _type: 'product',
    title: 'Rigid Box (Premium)',
    slug: { _type: 'slug', current: 'rigid-box' },
    category: { _type: 'reference', _ref: 'cat-butik' },
    tagline: 'Lüks ürünleriniz için iddialı rijit kutular',
    summary: 'Manyetik kapaklı, ipek şeritli ve özel iç yerleşimli rigid box çözümleri. Mücevher, parfüm ve premium içki için ideal.',
    highlights: ['Manyetik kapak', 'Özel iç yerleşim', 'Pelür sarım', 'Folyo varak baskı'],
    sustainabilityTags: ['FSC Sertifikalı'],
    materials: ['Gri karton 1.5–3mm', 'İpek bezi', 'Lake kağıt kaplama'],
    finishOptions: ['Sıcak folyo', 'Soğuk folyo', 'Kabartma', 'UV nokta'],
    isFeatured: true,
    order: 2,
  },
  {
    _id: 'product-metalize',
    _type: 'product',
    title: 'Metalize Ambalaj',
    slug: { _type: 'slug', current: 'metalize' },
    category: { _type: 'reference', _ref: 'cat-kisisel-bakim' },
    tagline: 'Özel efektle göz alıcı raf görünümü',
    summary: 'Holografik, metalik ve özel efekt baskı teknolojileriyle raflarda parlayan ambalajlar.',
    highlights: ['Holografik baskı', 'Metalize folyo', 'Lazer efekt', 'Özel pantone'],
    sustainabilityTags: ['Geri Dönüşümlü'],
    materials: ['Metalize folyo', 'Holografik karton'],
    finishOptions: ['Sıcak folyo', 'Soğuk folyo', 'Hologram'],
    isFeatured: true,
    order: 3,
  },
  {
    _id: 'product-gloss-green',
    _type: 'product',
    title: 'Gloss & Green Serisi',
    slug: { _type: 'slug', current: 'gloss-green' },
    category: { _type: 'reference', _ref: 'cat-gida' },
    tagline: 'Premium görünüm, sürdürülebilir üretim',
    summary: 'Biyo-bazlı lake, geri dönüştürülmüş elyaf ve düşük karbon mürekkeple üretilen yeşil ambalajlar.',
    highlights: ['Biyo-bazlı lake', 'Geri dönüştürülmüş elyaf', 'Düşük karbon mürekkep', 'Kompostlanabilir seçenekler'],
    sustainabilityTags: ['FSC Sertifikalı', 'Geri Dönüşümlü', 'Kompostlanabilir', 'Düşük Karbon'],
    materials: ['Geri dönüştürülmüş karton', 'Bagasse'],
    finishOptions: ['Su bazlı lake', 'Biyo-bazlı lake'],
    isFeatured: true,
    order: 4,
  },
  {
    _id: 'product-etiket-sleeve',
    _type: 'product',
    title: 'Etiket & Sleeve',
    slug: { _type: 'slug', current: 'etiket-sleeve' },
    category: { _type: 'reference', _ref: 'cat-icecek' },
    tagline: 'Tamamlayıcı baskı çözümleri',
    summary: 'Şişe etiketleri, shrink sleeve ve özel kesim etiketler — premium içecek markaları için.',
    highlights: ['Shrink sleeve', 'Özel kesim', 'IML enjeksiyon', 'Su geçirmez'],
    sustainabilityTags: ['Geri Dönüşümlü'],
    materials: ['PP', 'PET', 'Kraft kağıt'],
    finishOptions: ['Parlak', 'Mat', 'Tekstür'],
    order: 5,
  },
  {
    _id: 'product-ozel-kesim',
    _type: 'product',
    title: 'Özel Kesim & Form',
    slug: { _type: 'slug', current: 'ozel-kesim-form' },
    category: { _type: 'reference', _ref: 'cat-ev-urunleri' },
    tagline: 'Markanıza özel üretim formları',
    summary: 'Standart dışı geometrik formlar, lazer kesim ve özel die-cut tasarımlar.',
    highlights: ['Lazer kesim', 'Özel die-cut', 'Geometrik formlar', 'CAD tabanlı tasarım'],
    materials: ['Bristol', 'Krome', 'Mikro oluklu mukavva'],
    finishOptions: ['Mat lake', 'Parlak lake'],
    order: 6,
  },
]

// ── 8. NEWS ────────────────────────────────────────────────────────────────────
const news = [
  {
    _id: 'news-tubitak',
    _type: 'news',
    title: 'Yeni Sürdürülebilir Ambalaj Projesi TÜBİTAK Desteği Aldı',
    slug: { _type: 'slug', current: 'tubitak-destek' },
    kind: 'press',
    publishedAt: '2026-02-13T10:00:00.000Z',
    excerpt:
      'AR-GE merkezimizin yürüttüğü biyo-bazlı kaplama projesi TÜBİTAK 1501 programından destek almaya hak kazandı.',
    body: [
      block(
        'Duran Doğan AR-GE Merkezi tarafından yürütülen "Biyo-Bazlı Lake ile Sürdürülebilir Karton Ambalaj" projesi, TÜBİTAK 1501 Sanayi AR-GE Destek Programı kapsamında destek almaya hak kazandı.'
      ),
      block(
        'Proje kapsamında geleneksel sentetik lake yerine bitki bazlı bileşenlerden üretilen yeni nesil koruyucu kaplama geliştirilecek. 24 ay sürecek çalışmanın sonunda ambalaj atıklarının %35 daha hızlı parçalanması hedefleniyor.'
      ),
    ],
    readingTimeMinutes: 3,
    isFeatured: true,
  },
  {
    _id: 'news-insoft',
    _type: 'news',
    title: 'InSoft IMP Yazılımı ile Üretim Dijitalleşti',
    slug: { _type: 'slug', current: 'insoft-imp' },
    kind: 'news',
    publishedAt: '2025-02-12T10:00:00.000Z',
    excerpt:
      'Üç fabrikamızda eş zamanlı devreye aldığımız InSoft IMP yazılımıyla üretim planlamasını uçtan uca dijitalleştirdik.',
    body: [
      block(
        'Üretim planlama, malzeme yönetimi ve kalite kontrol süreçlerimizi tek bir bütüncül platforma taşıyan InSoft IMP yazılımı, 2024 yılı sonunda üç fabrikamızda eş zamanlı devreye alındı.'
      ),
      block(
        'Sistem sayesinde sipariş-üretim hattı arasındaki bilgi akışı %42 hızlandı, sıfır toleranslı kalite kontrol süreçleri saha çalışanları tarafından mobil cihazlarda anlık raporlanabilir hale geldi.'
      ),
    ],
    readingTimeMinutes: 4,
  },
  {
    _id: 'news-cdp-a',
    _type: 'news',
    title: 'CDP SEA A Listesi Başarısı',
    slug: { _type: 'slug', current: 'cdp-sea-a' },
    kind: 'press',
    publishedAt: '2024-02-12T10:00:00.000Z',
    excerpt:
      'İklim performansımız Carbon Disclosure Project tarafından en üst seviyede — "A Listesi" — değerlendirildi.',
    body: [
      block(
        'Duran Doğan, Carbon Disclosure Project (CDP) tarafından 2023 yılı iklim performansı değerlendirmesinde en üst seviye olan "A Listesi" notunu almaya hak kazandı.'
      ),
      block(
        'Bu başarı, son beş yılda gerçekleştirdiğimiz enerji verimliliği yatırımlarının, yenilenebilir enerji kullanımının ve karbon ayak izini azaltmaya yönelik tüm girişimlerimizin uluslararası bağımsız değerlendiriciler tarafından tanınması anlamına geliyor.'
      ),
    ],
    readingTimeMinutes: 3,
  },
]

// ── RUNNER ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log(`🌱  Seeding ${projectId}/${dataset} …`)

  const tx = client.transaction()

  // Singletons & shared docs — createOrReplace
  for (const doc of [siteSettings, homePage, corporatePage, sustainabilityPage, contactPage]) {
    tx.createOrReplace(doc as any)
  }
  // Categories first (products reference them)
  for (const cat of categories) tx.createOrReplace(cat as any)
  for (const p of products) tx.createOrReplace(p as any)
  for (const n of news) tx.createOrReplace(n as any)

  const result = await tx.commit({ visibility: 'sync' })
  console.log(`✅  Done. Transaction id: ${result.transactionId}`)
  console.log(`📊  Wrote: 5 singletons · ${categories.length} categories · ${products.length} products · ${news.length} news`)
}

run().catch((err) => {
  console.error('❌  Seed failed:', err.message)
  if (err.statusCode === 401) {
    console.error('   → Token geçersiz. https://www.sanity.io/manage/project/3gm0docx/api adresinden yeni token oluştur.')
  }
  process.exit(1)
})
