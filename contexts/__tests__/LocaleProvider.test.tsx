import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LocaleProvider, useLocale } from '@/contexts/LocaleProvider'
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n'

const STORAGE_KEY = 'admin-dashboard-locale'

function clearStorage() {
  window.localStorage.clear()
  document.cookie.split(';').forEach((cookie) => {
    const [rawName] = cookie.split('=')
    const name = rawName?.trim()
    if (name) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    }
  })
  document.documentElement.removeAttribute('lang')
}

function TestConsumer({ fallbackKey }: { fallbackKey?: string }) {
  const { locale, t } = useLocale()
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="title">{t('header.title')}</span>
      {fallbackKey ? <span data-testid="fallback">{t(fallbackKey, 'fallback')}</span> : null}
    </div>
  )
}

function SwitchButton({ targetLocale }: { targetLocale: Locale }) {
  const { setLocale } = useLocale()
  return (
    <button type="button" onClick={() => setLocale(targetLocale)}>
      switch
    </button>
  )
}

describe('LocaleProvider', () => {
  beforeEach(() => {
    clearStorage()
  })

  it('initialises from provided locale and returns translations', async () => {
    render(
      <LocaleProvider initialLocale="fr">
        <TestConsumer fallbackKey="nonexistent.key" />
      </LocaleProvider>,
    )

    expect(screen.getByTestId('locale')).toHaveTextContent('fr')
    expect(screen.getByTestId('title')).toHaveTextContent('Tableau de bord administrateur')
    expect(screen.getByTestId('fallback')).toHaveTextContent('fallback')

    await waitFor(() => expect(window.localStorage.getItem(STORAGE_KEY)).toBe('fr'))
    expect(document.cookie).toContain('locale=fr')
    expect(document.documentElement.getAttribute('lang')).toBe('fr')
  })

  it('restores the locale from localStorage when available', () => {
    window.localStorage.setItem(STORAGE_KEY, 'es')

    render(
      <LocaleProvider>
        <TestConsumer />
      </LocaleProvider>,
    )

    expect(screen.getByTestId('locale')).toHaveTextContent('es')
  })

  it('falls back to cookie value when localStorage is invalid', async () => {
    window.localStorage.setItem(STORAGE_KEY, 'xx')
    document.cookie = 'locale=ru'

    render(
      <LocaleProvider>
        <TestConsumer />
      </LocaleProvider>,
    )

    expect(screen.getByTestId('locale')).toHaveTextContent('ru')
    await waitFor(() => expect(window.localStorage.getItem(STORAGE_KEY)).toBe('ru'))
  })

  it('uses the default locale when no persisted value exists', () => {
    render(
      <LocaleProvider>
        <TestConsumer />
      </LocaleProvider>,
    )

    expect(screen.getByTestId('locale')).toHaveTextContent(DEFAULT_LOCALE)
  })

  it('updates persistence targets when the locale changes', async () => {
    render(
      <LocaleProvider initialLocale="en">
        <TestConsumer />
        <SwitchButton targetLocale="es" />
      </LocaleProvider>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'switch' }))

    await waitFor(() => expect(screen.getByTestId('locale')).toHaveTextContent('es'))
    await waitFor(() => expect(window.localStorage.getItem(STORAGE_KEY)).toBe('es'))
    expect(document.cookie).toContain('locale=es')
    expect(document.documentElement.getAttribute('lang')).toBe('es')
  })

  it('throws when useLocale is called outside of the provider', () => {
    const OutsideConsumer = () => {
      useLocale()
      return null
    }

    expect(() =>
      render(
        <OutsideConsumer />,
      ),
    ).toThrow('useLocale must be used within a LocaleProvider')
  })
})
