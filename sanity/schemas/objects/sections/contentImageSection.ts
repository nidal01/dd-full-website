import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contentImageSection',
  title: 'İçerik + Görsel Bölümü',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'heading', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'body', type: 'richText' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'imagePosition',
      type: 'string',
      options: { list: ['left', 'right'] },
      initialValue: 'right',
    }),
    defineField({ name: 'cta', type: 'cta' }),
  ],
})
