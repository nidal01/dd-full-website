import { draftMode } from 'next/headers'
import { previewClient, projectId, sanityClient } from './client'

type FetchOpts = {
  tags?: string[]
  revalidate?: number | false
}

/**
 * Fetch from Sanity with ISR tags + draft-mode awareness.
 * When the project isn't configured yet (no PROJECT_ID, or DB empty) the call
 * returns `null` / `[]` so pages can still render their fallback UI instead of
 * crashing in dev.
 */
export async function sanityFetch<T = any>(
  query: string,
  params: Record<string, any> = {},
  opts: FetchOpts = {}
): Promise<T> {
  // No Sanity project configured — bail gracefully
  if (!projectId || projectId === 'demo' || projectId === 'placeholder') {
    return (Array.isArray(undefined) ? [] : (null as unknown)) as T
  }

  const isDraft = await isDraftEnabled()
  const client = isDraft ? previewClient : sanityClient
  try {
    return await client.fetch<T>(query, params, {
      next: isDraft
        ? { revalidate: 0, tags: opts.tags }
        : { revalidate: opts.revalidate ?? 60, tags: opts.tags },
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[sanityFetch] failed:', (err as Error).message)
    return (null as unknown) as T
  }
}

async function isDraftEnabled(): Promise<boolean> {
  try {
    const dm = await draftMode()
    return dm.isEnabled
  } catch {
    return false
  }
}
