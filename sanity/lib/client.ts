import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

// Even if projectId is empty we instantiate with a placeholder so the client
// object exists for type compatibility. `sanityFetch` checks for a real id
// before actually calling the API.
const safeId = projectId || 'placeholder'

export const sanityClient = createClient({
  projectId: safeId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  stega: { enabled: false },
})

export const previewClient = createClient({
  projectId: safeId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_READ_TOKEN,
})

export const getClient = (preview = false) => (preview ? previewClient : sanityClient)
