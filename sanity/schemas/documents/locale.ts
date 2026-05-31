import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'locale',
  title: 'Dil',
  type: 'document',
  fields: [
    defineField({ name: 'code', title: 'Dil Kodu (tr, en, de)', type: 'string', validation: (R) => R.required().max(5) }),
    defineField({ name: 'title', title: 'Görünür Ad', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'isDefault', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'code' } },
})
