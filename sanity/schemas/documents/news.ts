import { defineField, defineType } from 'sanity'
import { Newspaper } from 'lucide-react'

export default defineType({
  name: 'news',
  title: 'Haber / Basın Bülteni',
  type: 'document',
  icon: Newspaper,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Tür',
      type: 'string',
      options: {
        list: [
          { title: 'Haber', value: 'news' },
          { title: 'Basın Bülteni', value: 'press' },
          { title: 'Vaka Çalışması', value: 'case-study' },
        ],
      },
      initialValue: 'news',
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'newsCategory' }],
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
      validation: (R) => R.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({ name: 'excerpt', title: 'Özet', type: 'text', rows: 3 }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
      validation: (R) => R.required(),
    }),
    defineField({ name: 'body', title: 'İçerik', type: 'richText' }),
    defineField({
      name: 'relatedProducts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({ name: 'isFeatured', type: 'boolean', initialValue: false }),
    defineField({
      name: 'readingTimeMinutes',
      title: 'Tahmini Okuma Süresi (dk)',
      type: 'number',
    }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  orderings: [
    { title: 'En yeni', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? new Date(subtitle).toLocaleDateString('tr-TR') : '',
      media,
    }),
  },
})
