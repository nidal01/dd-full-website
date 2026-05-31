import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'megaMenuColumn',
  title: 'Mega Menü Sütunu',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Sütun Başlığı', type: 'string' }),
    defineField({
      name: 'links',
      title: 'Bağlantılar',
      type: 'array',
      of: [{ type: 'link' }],
      validation: (R) => R.max(8),
    }),
  ],
  preview: {
    select: { title: 'heading', count: 'links.length' },
    prepare: ({ title, count }) => ({
      title: title || '(başlıksız)',
      subtitle: `${count || 0} bağlantı`,
    }),
  },
})
