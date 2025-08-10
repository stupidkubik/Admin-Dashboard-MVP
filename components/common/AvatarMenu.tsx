'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function AvatarMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        className="h-8 w-8 rounded-full bg-gray-300"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      />
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded border bg-white shadow dark:bg-gray-800">
          <Link
            href="/settings"
            className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
          <button
            className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              setOpen(false)
              alert('Logged out')
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
