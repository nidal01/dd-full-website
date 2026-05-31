import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Ana Sayfa',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Ana Sayfa', readOnly: true }),
    defineField({
      name: 'sections',
      title: 'Sayfa Bölümleri',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'featuredProductsSection' },
        { type: 'statsSection' },
        { type: 'logoCloudSection' },
        { type: 'testimonialsSection' },
        { type: 'contentImageSection' },
        { type: 'faqSection' },
        { type: 'ctaSection' },
      ],
    }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Ana Sayfa' }) },
})
