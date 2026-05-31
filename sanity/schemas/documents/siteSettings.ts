import { defineField, defineType } from 'sanity'
import { Cog } from 'lucide-react'

export default defineType({
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  icon: Cog,
  groups: [
    { name: 'brand', title: 'Marka', default: true },
    { name: 'nav', title: 'Navigasyon' },
    { name: 'footer', title: 'Footer' },
    { name: 'contact', title: 'İletişim' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Marka
    defineField({ name: 'siteName', title: 'Site Adı', type: 'string', group: 'brand', initialValue: 'Duran Doğan' }),
    defineField({ name: 'tagline', title: 'Slogan', type: 'string', group: 'brand' }),
    defineField({
      name: 'logoLight',
      title: 'Logo (Açık zemin)',
      type: 'image',
      group: 'brand',
      options: { hotspot: false },
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Koyu zemin)',
      type: 'image',
      group: 'brand',
      options: { hotspot: false },
    }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image', group: 'brand' }),

    // Navigation
    defineField({
      name: 'primaryNav',
      title: 'Ana Menü',
      type: 'array',
      of: [{ type: 'navItem' }],
      group: 'nav',
      validation: (R) => R.max(7),
    }),
    defineField({
      name: 'topbarCta',
      title: 'Navbar CTA Butonu',
      type: 'cta',
      group: 'nav',
    }),
    defineField({
      name: 'announcement',
      title: 'Duyuru Bandı',
      type: 'object',
      group: 'nav',
      fields: [
        { name: 'enabled', type: 'boolean', initialValue: false },
        { name: 'text', type: 'string' },
        { name: 'link', type: 'link' },
      ],
    }),

    // Footer
    defineField({
      name: 'footerColumns',
      title: 'Footer Sütunları',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', type: 'string' },
            { name: 'links', type: 'array', of: [{ type: 'link' }] },
          ],
          preview: { select: { title: 'heading' } },
        },
      ],
      group: 'footer',
    }),
    defineField({ name: 'footerNote', title: 'Footer Alt Notu', type: 'text', rows: 2, group: 'footer' }),
    defineField({
      name: 'legalLinks',
      title: 'Yasal Bağlantılar',
      type: 'array',
      of: [{ type: 'link' }],
      group: 'footer',
    }),

    // Contact
    defineField({
      name: 'addresses',
      title: 'Ofisler / Adresler',
      type: 'array',
      of: [{ type: 'address' }],
      group: 'contact',
    }),
    defineField({
      name: 'socials',
      title: 'Sosyal Medya',
      type: 'array',
      of: [{ type: 'socialLink' }],
      group: 'contact',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Genel İletişim E-postası',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Genel İletişim Telefonu',
      type: 'string',
      group: 'contact',
    }),

    // SEO defaults
    defineField({ name: 'defaultSeo', title: 'Varsayılan SEO', type: 'seo', group: 'seo' }),
    defineField({
      name: 'analytics',
      title: 'Analitik',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'gaId', type: 'string', title: 'Google Analytics 4 ID' },
        { name: 'gtmId', type: 'string', title: 'Google Tag Manager ID' },
        { name: 'metaPixel', type: 'string', title: 'Meta Pixel ID' },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Ayarları' }) },
})
