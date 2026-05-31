import { headers } from 'next/headers'
import { defaultLocale, isLocale, type Locale } from './i18n'

export async function getLocale(): Promise<Locale> {
  const h = await headers()
  const path = h.get('x-pathname') ?? '/'
  const first = path.split('/').filter(Boolean)[0]
  return first && isLocale(first) ? first : defaultLocale
}
