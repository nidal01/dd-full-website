import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'logoCloudSection',
  title: 'Müşteri Logoları',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', initialValue: 'Dünya markalarının tercihi' }),
    defineField({
      name: 'logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string' },
            { name: 'logo', type: 'image' },
            { name: 'href', type: 'url' },
          ],
          preview: { select: { title: 'name', media: 'logo' } },
        },
      ],
    }),
  ],
})
