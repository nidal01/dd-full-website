import 'server-only'
import type { Locale } from './i18n'
import tr from '@/messages/tr.json'
import en from '@/messages/en.json'

export type Dictionary = typeof tr

const dictionaries: Record<Locale, Dictionary> = {
  tr,
  en: en as Dictionary,
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] ?? dictionaries.tr
}

/** Resolve a dotted path safely, e.g. t(dict, "products.applyN", { n: 3 }) */
export function t<D extends object>(
  dict: D,
  path: string,
  vars?: Record<string, string | number>
): string {
  const value = path
    .split('.')
    .reduce<any>((acc, k) => (acc ? acc[k] : undefined), dict) as unknown
  if (typeof value !== 'string') return path
  if (!vars) return value
  return value.replace(/\{(\w+)\}/g, (_, k) =>
    vars[k] !== undefined ? String(vars[k]) : `{${k}}`
  )
}
