import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Sosyal Medya',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      options: {
        list: [
          'linkedin',
          'instagram',
          'youtube',
          'twitter',
          'facebook',
          'tiktok',
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      validation: (R) => R.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'platform', subtitle: 'url' },
  },
})
