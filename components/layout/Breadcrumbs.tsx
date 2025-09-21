'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type BreadcrumbsProps = {
  className?: string
}

export default function Breadcrumbs({ className = '' }: BreadcrumbsProps) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav className={`text-sm text-muted-foreground ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center gap-1">
        <li>
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            Home
          </Link>
        </li>
        {segments.map((segment, idx) => {
          const href = '/' + segments.slice(0, idx + 1).join('/')
          const label = segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase())
          return (
            <li key={href} className="flex items-center gap-1">
              <span>/</span>
              <Link
                href={href}
                aria-current={idx === segments.length - 1 ? 'page' : undefined}
                className={`capitalize transition-colors ${
                  idx === segments.length - 1
                    ? 'text-foreground'
                    : 'hover:text-foreground'
                }`}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
