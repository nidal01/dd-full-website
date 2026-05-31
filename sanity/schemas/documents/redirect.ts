import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'redirect',
  title: 'Yönlendirme',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'Kaynak Yol (/eski-url)',
      type: 'string',
      validation: (R) =>
        R.required().regex(/^\//, { name: 'leading slash', invert: false }),
    }),
    defineField({
      name: 'destination',
      title: 'Hedef URL veya yol',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'permanent',
      title: 'Kalıcı (301)',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'source', subtitle: 'destination', permanent: 'permanent' },
    prepare: ({ title, subtitle, permanent }) => ({
      title,
      subtitle: `${permanent ? '301' : '302'} → ${subtitle}`,
    }),
  },
})
