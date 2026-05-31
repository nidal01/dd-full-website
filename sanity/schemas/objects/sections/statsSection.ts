import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'statsSection',
  title: 'İstatistik Bölümü',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      name: 'stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Değer (50+)' },
            { name: 'label', type: 'string', title: 'Etiket' },
            { name: 'description', type: 'text', rows: 2, title: 'Açıklama' },
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
      validation: (R) => R.min(2).max(6),
    }),
  ],
  preview: { prepare: () => ({ title: 'Stats Section' }) },
})
