'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_LOCALE, type Locale, SUPPORTED_LOCALES, getDictionary, translate } from '@/lib/i18n'

const STORAGE_KEY = 'admin-dashboard-locale'
const COOKIE_NAME = 'locale'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && SUPPORTED_LOCALES.includes(value as Locale)

const readPersistedLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (isLocale(stored)) {
    return stored
  }

  const match = document.cookie.match(/(?:^|; )locale=([^;]+)/)
  if (match) {
    try {
      const cookieLocale = decodeURIComponent(match[1])
      if (isLocale(cookieLocale)) {
        return cookieLocale
      }
    } catch {
      // ignore malformed cookie values
    }
  }

  return DEFAULT_LOCALE
}

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, fallback?: string) => string
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readPersistedLocale())
  const dictionary = useMemo(() => getDictionary(locale), [locale])

  const t = useCallback((key: string, fallback?: string) => translate(dictionary, key, fallback), [dictionary])

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.localStorage.setItem(STORAGE_KEY, locale)
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(locale)}; path=/; max-age=${COOKIE_MAX_AGE}`
  }, [locale])

  const value = useMemo<LocaleContextValue>(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
