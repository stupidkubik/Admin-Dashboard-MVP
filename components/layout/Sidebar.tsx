'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/contexts/SidebarProvider'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/users', label: 'Users' },
  { href: '/forms', label: 'Forms' },
  { href: '/settings', label: 'Settings' },
  { href: '/blank', label: 'Blank' },
]

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar()
  const pathname = usePathname()
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-800 p-4 text-white transition-transform md:static md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded px-2 py-1 hover:bg-gray-700 ${pathname === link.href ? 'bg-gray-700' : ''}`}
            onClick={() => isOpen && toggle()}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
