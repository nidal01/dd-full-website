'use client'

import * as React from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

type Props = {
  children: React.ReactNode
  attribute?: 'class'
  defaultTheme?: Theme
  enableSystem?: boolean
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  enableSystem = true,
  storageKey = 'dd-theme',
}: Props) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>(
    defaultTheme === 'light' ? 'light' : 'dark'
  )

  React.useEffect(() => {
    const stored = (typeof window !== 'undefined' && (localStorage.getItem(storageKey) as Theme)) || null
    if (stored) setThemeState(stored)
  }, [storageKey])

  React.useEffect(() => {
    const root = document.documentElement
    const apply = (next: 'light' | 'dark') => {
      root.classList.toggle('dark', next === 'dark')
      setResolvedTheme(next)
    }
    if (theme === 'system' && enableSystem) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      apply(mq.matches ? 'dark' : 'light')
      const onChange = (e: MediaQueryListEvent) => apply(e.matches ? 'dark' : 'light')
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    }
    apply(theme === 'dark' ? 'dark' : 'light')
  }, [theme, enableSystem])

  const setTheme = React.useCallback(
    (next: Theme) => {
      setThemeState(next)
      try {
        localStorage.setItem(storageKey, next)
      } catch {}
    },
    [storageKey]
  )

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
