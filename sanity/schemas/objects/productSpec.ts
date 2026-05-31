import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productSpec',
  title: 'Teknik Özellik',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Özellik', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'value', title: 'Değer', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'group', title: 'Grup', type: 'string', description: 'Örn: Boyutlar, Malzeme, Baskı' }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'value' },
  },
})
