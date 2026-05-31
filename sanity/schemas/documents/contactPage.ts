import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'İletişim',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'İletişim', readOnly: true }),
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'subheading', type: 'text', rows: 3 }),
    defineField({
      name: 'formFields',
      title: 'Form Alanları',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', validation: (R) => R.required() },
            { name: 'label', type: 'string', validation: (R) => R.required() },
            {
              name: 'type',
              type: 'string',
              options: { list: ['text', 'email', 'tel', 'textarea', 'select'] },
              initialValue: 'text',
            },
            { name: 'required', type: 'boolean', initialValue: false },
            { name: 'placeholder', type: 'string' },
            { name: 'options', type: 'array', of: [{ type: 'string' }] },
          ],
          preview: { select: { title: 'label', subtitle: 'type' } },
        },
      ],
    }),
    defineField({
      name: 'subjects',
      title: 'Konu Seçenekleri',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'submitEmail',
      title: 'Form Gönderim E-postası',
      type: 'string',
      validation: (R) => R.email(),
    }),
    defineField({ name: 'successMessage', type: 'text', rows: 2 }),
    defineField({ name: 'addressOverride', type: 'array', of: [{ type: 'address' }] }),
    defineField({ name: 'mapEmbedUrl', title: 'Harita Embed URL', type: 'url' }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'İletişim' }) },
})
