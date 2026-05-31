import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'featuredProductsSection',
  title: 'Öne Çıkan Ürünler',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      validation: (R) => R.min(2).max(8),
    }),
    defineField({
      name: 'layout',
      type: 'string',
      options: { list: ['grid', 'carousel', 'masonry'] },
      initialValue: 'grid',
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Öne Çıkan Ürünler' }) },
})
