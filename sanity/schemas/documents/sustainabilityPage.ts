import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sustainabilityPage',
  title: 'Sürdürülebilirlik',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Sürdürülebilirlik', readOnly: true }),
    defineField({ name: 'hero', type: 'heroSection' }),
    defineField({
      name: 'metrics',
      title: 'Anahtar Metrikler',
      type: 'array',
      of: [{ type: 'sustainabilityMetric' }],
      validation: (R) => R.min(2).max(8),
    }),
    defineField({ name: 'commitmentsBody', title: 'Taahhütler', type: 'richText' }),
    defineField({
      name: 'reports',
      title: 'Raporlar',
      type: 'array',
      of: [{ type: 'sustainabilityReport' }],
    }),
    defineField({
      name: 'sections',
      title: 'Ek Bölümler',
      type: 'array',
      of: [
        { type: 'contentImageSection' },
        { type: 'valuesSection' },
        { type: 'statsSection' },
        { type: 'faqSection' },
        { type: 'ctaSection' },
      ],
    }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Sürdürülebilirlik' }) },
})
