'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { SUPPORTED_LOCALES, type Locale } from '@/lib/i18n'
import { useLocale } from '@/contexts/LocaleProvider'

const LABELS: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU',
  es: 'ES',
  fr: 'FR',
}

const NAMES: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  es: 'Español',
  fr: 'Français',
}

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleResize = () => setOpen(false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
      >
        {LABELS[locale]}
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-md border border-border/60 bg-background shadow-lg"
        >
          <ul className="py-1 text-sm">
            {SUPPORTED_LOCALES.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={locale === code}
                  onClick={() => {
                    setLocale(code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left transition ${
                    locale === code
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'hover:bg-muted/60'
                  }`}
                >
                  <span>{NAMES[code]}</span>
                  {locale === code && <Check className="h-3.5 w-3.5" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
