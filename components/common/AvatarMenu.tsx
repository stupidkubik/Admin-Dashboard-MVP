'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleProvider'

export default function AvatarMenu() {
  const [open, setOpen] = useState(false)
  const { t } = useLocale()
  return (
    <div className="relative">
      <button
        className="h-8 w-8 rounded-full bg-gray-300"
        onClick={() => setOpen((o) => !o)}
        aria-label={t('header.actions.toggleAccountMenu', 'Toggle menu')}
      />
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded border bg-white shadow dark:bg-gray-800">
          <Link
            href="/settings"
            className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            {t('navigation.items.settings', 'Settings')}
          </Link>
          <button
            className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              setOpen(false)
              alert(t('navigation.items.logout', 'Logout'))
            }}
          >
            {t('navigation.items.logout', 'Logout')}
          </button>
        </div>
      )}
    </div>
  )
}
