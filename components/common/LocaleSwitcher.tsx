'use client'

import { SUPPORTED_LOCALES, type Locale } from '@/lib/i18n'
import { useLocale } from '@/contexts/LocaleProvider'

const LABELS: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU',
  es: 'ES',
  fr: 'FR',
}

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()

  const handleChange = () => {
    const currentIndex = SUPPORTED_LOCALES.indexOf(locale)
    const nextLocale = SUPPORTED_LOCALES[(currentIndex + 1) % SUPPORTED_LOCALES.length]
    setLocale(nextLocale)
  }

  return (
    <button
      type="button"
      onClick={handleChange}
      className="inline-flex items-center justify-center rounded-md border border-border/60 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
      aria-label="Toggle language"
    >
      {LABELS[locale]}
    </button>
  )
}
