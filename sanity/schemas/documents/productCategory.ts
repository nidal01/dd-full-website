import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productCategory',
  title: 'Ürün Kategorisi',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'parent',
      title: 'Üst Kategori',
      type: 'reference',
      to: [{ type: 'productCategory' }],
    }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: { select: { title: 'title', media: 'coverImage' } },
})
