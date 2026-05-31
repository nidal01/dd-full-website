import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqSection',
  title: 'Sık Sorulan Sorular',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', initialValue: 'SSS' }),
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', validation: (R) => R.required() },
            { name: 'answer', type: 'richText' },
          ],
          preview: { select: { title: 'question' } },
        },
      ],
      validation: (R) => R.min(1),
    }),
  ],
})
