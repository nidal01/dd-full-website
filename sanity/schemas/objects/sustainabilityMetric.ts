import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sustainabilityMetric',
  title: 'Sürdürülebilirlik Metriği',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', title: 'Metrik', validation: (R) => R.required() }),
    defineField({ name: 'value', type: 'string', title: 'Değer', validation: (R) => R.required() }),
    defineField({ name: 'unit', type: 'string', title: 'Birim (% / ton / kWh)' }),
    defineField({ name: 'description', type: 'text', rows: 2, title: 'Açıklama' }),
    defineField({ name: 'icon', type: 'string', title: 'İkon adı (lucide)' }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'value' },
  },
})
