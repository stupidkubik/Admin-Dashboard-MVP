import en from '@/locales/en'
import ru from '@/locales/ru'
import es from '@/locales/es'
import fr from '@/locales/fr'

export const SUPPORTED_LOCALES = ['en', 'ru', 'es', 'fr'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

const dictionaries: Record<Locale, Record<string, any>> = {
  en,
  ru,
  es,
  fr,
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]
}

export function translate(dictionary: Record<string, any>, key: string, fallback?: string) {
  const segments = key.split('.')
  let current: any = dictionary
  for (const segment of segments) {
    if (current && typeof current === 'object' && segment in current) {
      current = current[segment]
    } else {
      return fallback ?? key
    }
  }

  if (typeof current === 'string') {
    return current
  }

  return fallback ?? key
}
