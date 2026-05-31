import { defineArrayMember, defineType } from 'sanity'

export default defineType({
  name: 'richText',
  title: 'Zengin Metin',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraf', value: 'normal' },
        { title: 'Başlık 2', value: 'h2' },
        { title: 'Başlık 3', value: 'h3' },
        { title: 'Başlık 4', value: 'h4' },
        { title: 'Alıntı', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Kalın', value: 'strong' },
          { title: 'İtalik', value: 'em' },
          { title: 'Altı çizili', value: 'underline' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Bağlantı',
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: 'Yeni sekmede',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt metin' },
        { name: 'caption', type: 'string', title: 'Açıklama' },
      ],
    }),
    defineArrayMember({
      name: 'callout',
      type: 'object',
      title: 'Vurgu Kutusu',
      fields: [
        {
          name: 'tone',
          type: 'string',
          options: { list: ['info', 'success', 'warning', 'premium'] },
          initialValue: 'premium',
        },
        { name: 'body', type: 'text', rows: 3 },
      ],
    }),
  ],
})
