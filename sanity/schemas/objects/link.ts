import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'link',
  title: 'Bağlantı',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Tür',
      type: 'string',
      options: {
        list: [
          { title: 'Dahili (Site içi)', value: 'internal' },
          { title: 'Harici (URL)', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internal',
      title: 'Dahili Sayfa',
      type: 'reference',
      to: [
        { type: 'product' },
        { type: 'productCategory' },
        { type: 'news' },
        { type: 'corporatePage' },
        { type: 'sustainabilityPage' },
        { type: 'contactPage' },
        { type: 'homePage' },
      ],
      hidden: ({ parent }) => parent?.type !== 'internal',
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'external',
      validation: (R) =>
        R.uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: false }),
    }),
    defineField({
      name: 'label',
      title: 'Etiket',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Yeni sekmede aç',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
