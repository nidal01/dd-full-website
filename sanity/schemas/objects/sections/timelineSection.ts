import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'timelineSection',
  title: 'Tarihçe / Timeline',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      name: 'milestones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', type: 'string', validation: (R) => R.required() },
            { name: 'title', type: 'string' },
            { name: 'description', type: 'text', rows: 3 },
            { name: 'image', type: 'image' },
          ],
          preview: { select: { title: 'year', subtitle: 'title', media: 'image' } },
        },
      ],
    }),
  ],
})
