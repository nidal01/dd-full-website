import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonialsSection',
  title: 'Referanslar',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', type: 'text', rows: 4, validation: (R) => R.required() },
            { name: 'authorName', type: 'string' },
            { name: 'authorRole', type: 'string' },
            { name: 'company', type: 'string' },
            { name: 'avatar', type: 'image' },
            { name: 'companyLogo', type: 'image' },
          ],
          preview: { select: { title: 'authorName', subtitle: 'company', media: 'avatar' } },
        },
      ],
    }),
  ],
})
