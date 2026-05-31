import { defineField, defineType } from 'sanity'
import { Package } from 'lucide-react'

export default defineType({
  name: 'product',
  title: 'Ürün',
  type: 'document',
  icon: Package,
  groups: [
    { name: 'main', title: 'İçerik', default: true },
    { name: 'media', title: 'Medya' },
    { name: 'specs', title: 'Teknik' },
    { name: 'related', title: 'İlişkiler' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Ürün Adı',
      type: 'string',
      group: 'main',
      validation: (R) => R.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'main',
      options: { source: 'title', maxLength: 96, isUnique: () => true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      group: 'main',
      validation: (R) => R.required(),
    }),
    defineField({ name: 'tagline', title: 'Kısa Slogan', type: 'string', group: 'main' }),
    defineField({ name: 'summary', title: 'Özet', type: 'text', rows: 3, group: 'main' }),
    defineField({ name: 'description', title: 'Detaylı Açıklama', type: 'richText', group: 'main' }),
    defineField({
      name: 'highlights',
      title: 'Öne Çıkan Özellikler',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'main',
      validation: (R) => R.max(6),
    }),

    // Media
    defineField({
      name: 'coverImage',
      title: 'Kapak Görseli (Sanity)',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
      description:
        'Tercihen Sanity asset olarak yükleyin. Yüklenmemişse aşağıdaki "Dış Görsel URL" kullanılır.',
    }),
    defineField({
      name: 'externalImageUrl',
      title: 'Dış Görsel URL (fallback)',
      type: 'url',
      group: 'media',
      description:
        'WordPress / CDN üzerinden çekilen ürünler için kullanılır. Sanity asset yüklendiğinde bu alan görmezden gelinir.',
    }),
    defineField({
      name: 'gallery',
      title: 'Galeri (Görsel / Video / 3D)',
      type: 'array',
      of: [{ type: 'productGalleryItem' }],
      group: 'media',
    }),

    // Specs
    defineField({
      name: 'specs',
      title: 'Teknik Özellikler',
      type: 'array',
      of: [{ type: 'productSpec' }],
      group: 'specs',
    }),
    defineField({
      name: 'moq',
      title: 'Minimum Sipariş Adedi (MOQ)',
      type: 'object',
      group: 'specs',
      fields: [
        { name: 'quantity', type: 'number', title: 'Adet', validation: (R) => R.min(0) },
        { name: 'unit', type: 'string', title: 'Birim (adet / paket / kg)' },
        { name: 'notes', type: 'string', title: 'Not (örn. proje bazlı)' },
      ],
    }),
    defineField({
      name: 'customization',
      title: 'Kişiselleştirme Seçenekleri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Etiket', validation: (R) => R.required() },
            { name: 'options', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } },
            { name: 'description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'label', subtitle: 'description' } },
        },
      ],
      group: 'specs',
    }),
    defineField({
      name: 'downloads',
      title: 'İndirilebilir Dosyalar',
      type: 'array',
      group: 'specs',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', validation: (R) => R.required() },
            {
              name: 'kind',
              type: 'string',
              options: {
                list: [
                  { title: 'Teknik Föy (PDF)', value: 'datasheet' },
                  { title: 'Brand Guide', value: 'brandguide' },
                  { title: 'CAD / Dieline', value: 'cad' },
                  { title: 'Diğer', value: 'other' },
                ],
              },
              initialValue: 'datasheet',
            },
            { name: 'file', type: 'file', options: { accept: '.pdf,.zip,.dxf,.ai' } },
            { name: 'sizeNote', type: 'string', title: 'Boyut Notu (örn. 2.4 MB)' },
          ],
          preview: { select: { title: 'label', subtitle: 'kind' } },
        },
      ],
    }),
    defineField({
      name: 'materials',
      title: 'Malzemeler',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'specs',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'finishOptions',
      title: 'Baskı / Lake Seçenekleri',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'specs',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'sustainabilityTags',
      title: 'Sürdürülebilirlik Etiketleri',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'specs',
      options: {
        list: ['FSC Sertifikalı', 'Geri Dönüşümlü', 'Kompostlanabilir', 'Bio-bazlı', 'Düşük Karbon'],
      },
    }),

    // Related
    defineField({
      name: 'relatedProducts',
      title: 'İlgili Ürünler',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      group: 'related',
      validation: (R) => R.max(4),
    }),
    defineField({
      name: 'caseStudies',
      title: 'İlgili Vaka Çalışmaları',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'news' }] }],
      group: 'related',
    }),

    // Flags
    defineField({ name: 'isFeatured', title: 'Öne Çıkan', type: 'boolean', initialValue: false, group: 'main' }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      initialValue: 0,
      group: 'main',
      description: 'Düşük değer önce gösterilir.',
    }),

    // SEO
    defineField({ name: 'seo', type: 'seo', group: 'seo' }),
  ],
  orderings: [
    { title: 'Manuel sıra', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'En yeni', name: 'newest', by: [{ field: '_createdAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category.title', media: 'coverImage' },
  },
})
