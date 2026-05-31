import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO & Meta',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (R) => R.max(60).warning('60 karakteri aşmayın.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (R) => R.max(160).warning('160 karakteri aşmayın.'),
    }),
    defineField({
      name: 'canonical',
      title: 'Canonical URL',
      type: 'url',
    }),
    defineField({
      name: 'noIndex',
      title: 'noindex (arama motorlarından gizle)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'keywords',
      title: 'Anahtar Kelimeler',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'openGraph',
      title: 'Open Graph / Social Share',
      type: 'openGraph',
    }),
  ],
})
