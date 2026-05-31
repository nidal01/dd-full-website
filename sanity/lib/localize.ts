import { defaultLocale, type Locale } from '@/lib/i18n'

type I18nArray = Array<{ _key: string; value: string }> | undefined

/**
 * Resolve a value from a `sanity-plugin-internationalized-array` field.
 * Falls back to default locale, then first available value.
 */
export function pickI18n(value: I18nArray, locale: Locale = defaultLocale): string {
  if (!value || value.length === 0) return ''
  const exact = value.find((v) => v._key === locale)
  if (exact?.value) return exact.value
  const fallback = value.find((v) => v._key === defaultLocale)
  if (fallback?.value) return fallback.value
  return value[0]?.value ?? ''
}

/**
 * Resolve any value: if it's a string return as-is, if it's an i18n array
 * pick the right locale. Lets template code stay agnostic.
 */
export function localize<T = string>(value: any, locale: Locale = defaultLocale): T | string {
  if (typeof value === 'string') return value
  if (Array.isArray(value) && value.every((v) => v && '_key' in v && 'value' in v)) {
    return pickI18n(value as I18nArray, locale)
  }
  return value as T
}
