import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'openGraph',
  title: 'Open Graph',
  type: 'object',
  fields: [
    defineField({ name: 'ogTitle', type: 'string', title: 'OG Title' }),
    defineField({ name: 'ogDescription', type: 'text', rows: 2, title: 'OG Description' }),
    defineField({
      name: 'ogImage',
      title: 'OG Image (1200×630)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
