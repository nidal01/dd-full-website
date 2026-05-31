/**
 * Fallback demo data — used while Sanity hasn't been seeded yet so the site
 * still renders meaningful corporate content. Mirrors durandogan.com.
 */

export const demoSettings = {
  siteName: 'Duran Doğan',
  tagline: '90 Yıllık Tecrübe, Geleceğe Üretim',
  logoLight: null,
  logoDark: null,
  primaryNav: [
    { label: 'Hakkımızda', link: { type: 'external', href: '/hakkimizda', label: 'Hakkımızda' } },
    {
      label: 'Üretim',
      hasMegaMenu: true,
      megaMenuColumns: [
        {
          heading: 'Üretim',
          links: [
            { type: 'external', href: '/gloss-green', label: 'Gloss & Green' },
            { type: 'external', href: '/uretim-surecleri', label: 'Üretim Süreçleri' },
          ],
        },
      ],
      featuredCaption: 'Hadımköy Tesisi · Premium ambalaj üretim merkezi',
    },
    {
      label: 'Kalite',
      hasMegaMenu: true,
      megaMenuColumns: [
        {
          heading: 'Kalite Yönetim Sistemi',
          links: [
            { type: 'external', href: '/kalite-guvence-yonetim-sistemi', label: 'Kalite Güvence Yönetim Sistemi' },
            { type: 'external', href: '/urun-guvenligi', label: 'Ürün Güvenliği' },
            { type: 'external', href: '/cevre-ve-surdurulebilirlik', label: 'Çevre ve Sürdürülebilirlik' },
            { type: 'external', href: '/is-sagligi-ve-guvenligi', label: 'İş Sağlığı ve Güvenliği' },
            { type: 'external', href: '/bgys-politikamiz', label: 'BGYS Politikamız' },
          ],
        },
      ],
    },
    {
      label: 'Sürdürülebilirlik',
      hasMegaMenu: true,
      megaMenuColumns: [
        {
          heading: 'Sürdürülebilirlik',
          links: [
            { type: 'external', href: '/surdurulebilirlik/stratejimiz', label: 'Sürdürülebilirlik Stratejimiz ve Uygulamalarımız' },
            { type: 'external', href: '/surdurulebilirlik/biyocesitlilik', label: 'Biyoçeşitlilik ve Çevresel Etki' },
            { type: 'external', href: '/surdurulebilirlik/sosyal-uygunluk', label: 'Sosyal Uygunluk ve Etik' },
            { type: 'external', href: '/surdurulebilirlik/raporlamalar', label: 'Sürdürülebilirlik Raporlamaları' },
          ],
        },
      ],
    },
    {
      label: 'Portföy',
      link: { type: 'external', href: '/portfoy', label: 'Portföyümüz' },
      hasMegaMenu: true,
      megaMenuColumns: [
        {
          heading: 'Portföyümüz',
          links: [
            { type: 'external', href: '/portfoy', label: 'Tüm Portföy' },
            { type: 'external', href: '/portfoy/butik', label: 'Butik' },
            { type: 'external', href: '/portfoy/medikal', label: 'Medikal' },
            { type: 'external', href: '/portfoy/kisisel-bakim', label: 'Kişisel Bakım' },
            { type: 'external', href: '/portfoy/icecek', label: 'İçecek' },
            { type: 'external', href: '/portfoy/gida', label: 'Gıda' },
            { type: 'external', href: '/portfoy/ev-urunleri', label: 'Ev Ürünleri' },
          ],
        },
      ],
    },
    {
      label: 'Yatırımcı',
      hasMegaMenu: true,
      megaMenuColumns: [
        {
          heading: 'Yatırımcı İlişkileri',
          links: [
            { type: 'internal', internal: { _type: 'corporatePage' }, label: 'Kurumsal' },
            { type: 'external', href: '/yatirimci/faaliyet-raporlari', label: 'Yıllık Faaliyet Raporları' },
            { type: 'external', href: '/yatirimci/finansal-bilgiler', label: 'Finansal Bilgiler' },
          ],
        },
      ],
    },
    { label: 'İK', link: { type: 'external', href: '/insan-kaynaklari', label: 'İnsan Kaynakları' } },
    { label: 'İletişim', link: { type: 'internal', internal: { _type: 'contactPage' }, label: 'İletişim' } },
  ],
  topbarCta: {
    label: 'Teklif Alın',
    variant: 'primary',
    link: { type: 'internal', internal: { _type: 'contactPage' }, label: 'Teklif Alın' },
  },
  announcement: { enabled: false, text: '' },
  footerColumns: [
    {
      heading: 'Şirket',
      links: [
        { type: 'external', href: '/hakkimizda', label: 'Hakkımızda' },
        { type: 'external', href: '/kurumsal', label: 'Kurumsal' },
        { type: 'external', href: '/yatirimci/faaliyet-raporlari', label: 'Yatırımcı İlişkileri' },
        { type: 'external', href: '/insan-kaynaklari', label: 'İnsan Kaynakları' },
      ],
    },
    {
      heading: 'Üretim',
      links: [
        { type: 'external', href: '/gloss-green', label: 'Gloss & Green' },
        { type: 'external', href: '/uretim-surecleri', label: 'Üretim Süreçleri' },
        { type: 'external', href: '/kalite-guvence-yonetim-sistemi', label: 'Kalite Yönetim Sistemi' },
        { type: 'external', href: '/surdurulebilirlik/stratejimiz', label: 'Sürdürülebilirlik' },
      ],
    },
    {
      heading: 'Portföy',
      links: [
        { type: 'external', href: '/portfoy', label: 'Tüm Çözümler' },
        { type: 'external', href: '/portfoy/butik', label: 'Butik' },
        { type: 'external', href: '/portfoy/medikal', label: 'Medikal' },
        { type: 'external', href: '/portfoy/icecek', label: 'İçecek' },
      ],
    },
  ],
  legalLinks: [
    { type: 'external', href: '/kvkk', label: 'KVKK' },
    { type: 'external', href: '/gizlilik', label: 'Gizlilik Politikası' },
  ],
  socials: [
    { platform: 'linkedin', url: 'https://www.linkedin.com/company/duran-dogan' },
    { platform: 'instagram', url: 'https://www.instagram.com/durandoganambalaj' },
    { platform: 'youtube', url: 'https://www.youtube.com/' },
  ],
  contactEmail: 'info@durandogan.com',
  contactPhone: '+90 212 771 46 06',
  addresses: [
    {
      label: 'Genel Merkez',
      street: 'Hadımköy Mah. Mustafa İnan Cad. No:41',
      city: 'Arnavutköy / İstanbul',
      country: 'Türkiye',
      postalCode: '34555',
      phone: '+90 212 771 46 06',
      email: 'info@durandogan.com',
    },
  ],
}

const block = (text: string) => ({
  _type: 'block' as const,
  children: [{ _type: 'span', text }],
})

export const demoHomeSections = [
  {
    _type: 'heroSection',
    _key: 'h1',
    eyebrow: '90 Yıllık Üretim Geleneği',
    heading: '90 Yıllık Tecrübe, Geleceğe Üretim',
    subheading:
      'Ambalaj üretiminde 90 yıllık birikimimizle; 3 fabrikamız ve 30.000 m² kapalı alan kapasitemizle yüzlerce markaya değer katıyoruz.',
    media: null,
    alignment: 'left',
    ctas: [
      { label: 'Teklif Alın', variant: 'primary', link: { type: 'external', href: '/iletisim' } },
      { label: 'Bizi Tanıyın', variant: 'secondary', link: { type: 'external', href: '/kurumsal' } },
    ],
  },
  {
    _type: 'statsSection',
    _key: 's1',
    heading: 'Rakamlarla Duran Doğan',
    stats: [
      { value: '90+', label: 'Yıllık Tecrübe', description: '1938\'den bu yana kesintisiz üretim.' },
      { value: '3', label: 'Fabrika', description: '30.000 m² toplam kapalı üretim alanı.' },
      { value: '70+', label: 'İhracat Ülkesi', description: '4 kıtada güvenilir iş ortaklığı.' },
      { value: '65+', label: 'Partner', description: 'Global ve yerel marka iş birlikleri.' },
    ],
  },
  {
    _type: 'contentImageSection',
    _key: 'ci1',
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
    _key: 'v1',
    heading: 'Tasarımdan teslimata, 5 adımda üretim',
    subheading:
      'Entegre üretim hatlarımızda her aşama planlı, ölçülebilir ve kalite odaklı ilerler.',
    values: [
      { title: 'Tasarım & AR-GE', description: 'Konseptten dieline\'a, malzeme seçiminden prototipe kadar uçtan uca tasarım.', icon: 'Lightbulb' },
      { title: 'Baskı & Kaplama', description: 'Metalize, lake ve özel efekt baskı teknolojileriyle benzersiz yüzeyler.', icon: 'Palette' },
      { title: 'Kesim & Şekillendirme', description: 'Yüksek hassasiyetli kesim ve form makinelerinde sıfır toleranslı üretim.', icon: 'Scissors' },
      { title: 'Montaj & Paketleme', description: 'Karmaşık yapıların hatasız birleştirilmesi ve müşteriye hazır sevkiyat.', icon: 'Boxes' },
      { title: 'Kalite Kontrol', description: 'Her seri için izlenebilir, raporlanabilir kalite güvence süreçleri.', icon: 'ShieldCheck' },
      { title: 'Gloss & Green', description: 'Çevreci yaklaşımımızla geri dönüştürülebilir, sürdürülebilir ambalaj.', icon: 'Leaf' },
    ],
  },
  {
    _type: 'testimonialsSection',
    _key: 't1',
    heading: 'Dünya markalarının tercihi',
    items: [
      {
        quote: 'Duran Doğan kalite ve hizmet anlayışı ile en önemli karton ambalaj tedarikçimizdir.',
        authorName: 'Korozo Flexibles',
        authorRole: 'Tedarik Zinciri',
        company: 'Korozo',
      },
      {
        quote: 'Zor günlerde gösterdiğiniz emek ve fedakarlık azımsanamaz.',
        authorName: 'Ülker',
        authorRole: 'Satın Alma',
        company: 'Ülker',
      },
      {
        quote: 'Uyum içinde çalışıyoruz. Yakaladığımız sinerji iş süreçlerimize yansıyor.',
        authorName: 'Lila Kağıt',
        authorRole: 'Operasyon',
        company: 'Lila Kağıt',
      },
      {
        quote: '70 ülkeye ihracat gerçekleştirebiliyorsak, bu başarıda tedarikçi firmaların katkısı da büyüktür.',
        authorName: "Benat's",
        authorRole: 'Genel Müdür',
        company: "Benat's",
      },
    ],
  },
  {
    _type: 'ctaSection',
    _key: 'c1',
    heading: 'Markanız için özel bir ambalaj çözümü hazırlayalım',
    subheading:
      'Brief\'inizi paylaşın; tasarım, prototipleme ve seri üretim için uçtan uca bir takım yanınızda olsun.',
    ctas: [
      { label: 'Teklif Alın', variant: 'primary', link: { type: 'external', href: '/iletisim' } },
      { label: 'Portföyümüz', variant: 'outline', link: { type: 'external', href: '/portfoy' } },
    ],
  },
  {
    _type: 'faqSection',
    _key: 'f1',
    eyebrow: 'SSS',
    heading: 'Sıkça sorulan sorular',
    items: [
      {
        question: 'Minimum sipariş adediniz nedir?',
        answer: [block(
          'Ürün karmaşıklığına göre 500 ile 5.000 adet arasında değişir. Rigid Box ve premium butik kutularda alt sınır 500 adetten başlar.'
        )],
      },
      {
        question: 'Hangi sertifikalara sahipsiniz?',
        answer: [block(
          'ISO 9001 (Kalite), ISO 14001 (Çevre), FSC (Sorumlu Orman), CDP A (İklim Performansı), BRC ve ISO 22000 (Gıda Güvenliği) sertifikalarımız mevcuttur.'
        )],
      },
      {
        question: 'Hangi ülkelere ihracat yapıyorsunuz?',
        answer: [block(
          '70\'den fazla ülkeye ihracat gerçekleştiriyoruz. 15+ ülkede aktif operasyon yürütüyoruz.'
        )],
      },
      {
        question: 'Sürdürülebilirlik yaklaşımınız nedir?',
        answer: [block(
          'Gloss & Green yaklaşımımızla geri dönüştürülebilir malzemeler, enerji verimliliği ve CDP A listesi performansıyla çevreye duyarlı üretim yapıyoruz.'
        )],
      },
    ],
  },
]
