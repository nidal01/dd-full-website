import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'valuesSection',
  title: 'Değerler / Vizyon',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', validation: (R) => R.required() },
            { name: 'description', type: 'text', rows: 3 },
            { name: 'icon', type: 'string', title: 'Lucide ikon adı' },
          ],
          preview: { select: { title: 'title', subtitle: 'icon' } },
        },
      ],
    }),
  ],
})
