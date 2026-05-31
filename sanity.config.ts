import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { schemaTypes } from './sanity/schemas'
import { deskStructure } from './sanity/deskStructure'
import { resolveDocUrl } from './sanity/lib/resolveDocUrl'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default defineConfig({
  name: 'durandogan',
  title: 'Duran Doğan — Content Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({ structure: deskStructure }),
    presentationTool({
      previewUrl: {
        origin: SITE_URL,
        previewMode: { enable: '/api/draft' },
      },
    }),
    internationalizedArray({
      languages: [
        { id: 'tr', title: 'Türkçe' },
        { id: 'en', title: 'English' },
      ],
      defaultLanguages: ['tr'],
      fieldTypes: ['string', 'text'],
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  document: {
    productionUrl: async (prev, { document }) => resolveDocUrl(document as any) ?? prev,
  },
})
