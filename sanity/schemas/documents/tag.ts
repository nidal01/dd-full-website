import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Etiket',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
  ],
})
