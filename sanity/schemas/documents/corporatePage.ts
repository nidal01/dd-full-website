import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'corporatePage',
  title: 'Kurumsal Sayfa',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Kurumsal', readOnly: true }),
    defineField({
      name: 'sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'contentImageSection' },
        { type: 'valuesSection' },
        { type: 'timelineSection' },
        { type: 'statsSection' },
        { type: 'faqSection' },
        { type: 'ctaSection' },
      ],
    }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Kurumsal' }) },
})
