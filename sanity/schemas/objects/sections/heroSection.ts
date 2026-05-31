import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero (Sahne) Bölümü',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', title: 'Üst Etiket' }),
    defineField({ name: 'heading', type: 'string', title: 'Ana Başlık', validation: (R) => R.required() }),
    defineField({ name: 'subheading', type: 'text', rows: 3, title: 'Alt Başlık' }),

    /**
     * Slider için birden fazla görsel. Boşsa tek görsel (media) kullanılır.
     */
    defineField({
      name: 'slides',
      title: 'Slider Görselleri',
      description: '2+ görsel yüklenirse otomatik slider olur.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', type: 'image', options: { hotspot: true } },
            { name: 'caption', type: 'string', title: 'Alt yazı' },
            { name: 'eyebrow', type: 'string', title: 'Slide eyebrow (opsiyonel)' },
            { name: 'heading', type: 'string', title: 'Slide başlık (opsiyonel)' },
          ],
          preview: {
            select: { title: 'caption', media: 'image' },
            prepare: ({ title, media }) => ({ title: title || 'Slayt', media }),
          },
        },
      ],
    }),

    defineField({
      name: 'media',
      title: 'Tek Görsel / Video (slides boşsa)',
      type: 'object',
      fields: [
        {
          name: 'type',
          type: 'string',
          options: { list: ['image', 'video'] },
          initialValue: 'image',
        },
        { name: 'image', type: 'image', options: { hotspot: true } },
        { name: 'videoUrl', type: 'url' },
      ],
    }),
    defineField({
      name: 'ctas',
      type: 'array',
      title: 'CTA Butonları',
      of: [{ type: 'cta' }],
      validation: (R) => R.max(2),
    }),
    defineField({
      name: 'alignment',
      type: 'string',
      title: 'Hizalama',
      options: { list: ['left', 'center'] },
      initialValue: 'left',
    }),
    defineField({
      name: 'autoplayInterval',
      title: 'Slider otomatik geçiş (sn)',
      type: 'number',
      initialValue: 6,
      description: '0 = otomatik kapalı.',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Hero', subtitle: 'Hero Section' }),
  },
})
