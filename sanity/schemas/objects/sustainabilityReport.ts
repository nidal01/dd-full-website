import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sustainabilityReport',
  title: 'Sürdürülebilirlik Raporu',
  type: 'object',
  fields: [
    defineField({ name: 'year', type: 'number', title: 'Yıl', validation: (R) => R.required().min(2000) }),
    defineField({ name: 'title', type: 'string', title: 'Başlık' }),
    defineField({ name: 'summary', type: 'text', rows: 3, title: 'Özet' }),
    defineField({
      name: 'file',
      type: 'file',
      title: 'PDF Dosyası',
      options: { accept: '.pdf' },
    }),
    defineField({ name: 'cover', type: 'image', title: 'Kapak Görseli', options: { hotspot: true } }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'year', media: 'cover' },
  },
})
