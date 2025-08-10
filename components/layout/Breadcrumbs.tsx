'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav className="text-sm text-gray-500">
      <ol className="flex items-center gap-1">
        <li>
          <Link href="/dashboard" className="hover:underline">
            Home
          </Link>
        </li>
        {segments.map((segment, idx) => {
          const href = '/' + segments.slice(0, idx + 1).join('/')
          return (
            <li key={href} className="flex items-center gap-1">
              <span>/</span>
              <Link
                href={href}
                className={idx === segments.length - 1 ? 'text-gray-700 dark:text-gray-300' : 'hover:underline'}
              >
                {segment}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
