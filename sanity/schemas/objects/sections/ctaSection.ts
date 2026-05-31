import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'CTA Bandı',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'subheading', type: 'text', rows: 2 }),
    defineField({ name: 'ctas', type: 'array', of: [{ type: 'cta' }], validation: (R) => R.max(2) }),
    defineField({ name: 'background', type: 'image', title: 'Arka Plan (opsiyonel)' }),
  ],
})
