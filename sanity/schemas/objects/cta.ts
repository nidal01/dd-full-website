import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'link', type: 'link' }),
    defineField({
      name: 'variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Altın)', value: 'primary' },
          { title: 'Secondary (Outline)', value: 'secondary' },
          { title: 'Ghost', value: 'ghost' },
        ],
      },
      initialValue: 'primary',
    }),
  ],
})
