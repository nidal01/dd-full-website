'use client'

import * as React from 'react'
import type { Locale } from '@/lib/i18n'

type Dict = Record<string, any>

type Ctx = { locale: Locale; dict: Dict; t: (path: string, vars?: Record<string, string | number>) => string }
const I18nCtx = React.createContext<Ctx | null>(null)

function resolve(dict: Dict, path: string): string | undefined {
  return path.split('.').reduce<any>((acc, k) => (acc ? acc[k] : undefined), dict)
}

function format(s: string, vars?: Record<string, string | number>) {
  if (!vars) return s
  return s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`))
}

export function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale
  dict: Dict
  children: React.ReactNode
}) {
  const value = React.useMemo<Ctx>(
    () => ({
      locale,
      dict,
      t: (path, vars) => {
        const v = resolve(dict, path)
        return typeof v === 'string' ? format(v, vars) : path
      },
    }),
    [locale, dict]
  )
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  const ctx = React.useContext(I18nCtx)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
