import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { sanityClient } from '@/sanity/lib/client'

export async function GET(req: NextRequest) {
  const client = sanityClient.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
  })

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(client, req.url)
  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(redirectTo)
}
