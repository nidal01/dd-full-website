import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navItem',
  title: 'Menü Öğesi',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Etiket',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'link',
      title: 'Bağlantı (Opsiyonel)',
      type: 'link',
      description: 'Mega menüsü olmayan tekil menü öğeleri için',
    }),
    defineField({
      name: 'hasMegaMenu',
      title: 'Mega Menü Aktif',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'megaMenuColumns',
      title: 'Mega Menü Sütunları',
      type: 'array',
      of: [{ type: 'megaMenuColumn' }],
      hidden: ({ parent }) => !parent?.hasMegaMenu,
      validation: (R) =>
        R.max(4).warning('Estetik nedeniyle en fazla 4 sütun önerilir.'),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Mega Menü Öne Çıkan Görsel',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => !parent?.hasMegaMenu,
    }),
    defineField({
      name: 'featuredCaption',
      title: 'Öne Çıkan Görsel Başlığı',
      type: 'string',
      hidden: ({ parent }) => !parent?.hasMegaMenu,
    }),
  ],
  preview: {
    select: { title: 'label', mega: 'hasMegaMenu' },
    prepare: ({ title, mega }) => ({
      title,
      subtitle: mega ? 'Mega Menü' : 'Tek Bağlantı',
    }),
  },
})
