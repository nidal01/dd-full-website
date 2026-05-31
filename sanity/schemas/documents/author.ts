import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Yazar',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'role', type: 'string', title: 'Görev / Pozisyon' }),
    defineField({ name: 'avatar', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'avatar' } },
})
