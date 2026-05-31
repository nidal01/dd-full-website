import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'address',
  title: 'Adres',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Etiket (Genel Merkez vb.)', type: 'string' }),
    defineField({ name: 'street', title: 'Adres Satırı', type: 'text', rows: 2 }),
    defineField({ name: 'city', title: 'Şehir', type: 'string' }),
    defineField({ name: 'country', title: 'Ülke', type: 'string', initialValue: 'Türkiye' }),
    defineField({ name: 'postalCode', title: 'Posta Kodu', type: 'string' }),
    defineField({ name: 'phone', title: 'Telefon', type: 'string' }),
    defineField({ name: 'email', title: 'E-posta', type: 'string' }),
    defineField({
      name: 'geo',
      title: 'Koordinatlar',
      type: 'object',
      fields: [
        { name: 'lat', type: 'number', title: 'Enlem' },
        { name: 'lng', type: 'number', title: 'Boylam' },
      ],
    }),
  ],
})
