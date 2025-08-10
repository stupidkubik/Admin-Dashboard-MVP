'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/contexts/SidebarProvider'
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react'

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/users', label: 'Users', icon: Users },
  { href: '/forms', label: 'Forms', icon: FileText },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/blank', label: 'Blank', icon: FileText },
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
      <nav className="flex h-full flex-col justify-between">
        <div className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-700 ${
                pathname === link.href ? 'bg-gray-700' : ''
              }`}
              onClick={() => isOpen && toggle()}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>
        <button
          className="mt-4 flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-700"
          onClick={() => alert('Logged out')}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </nav>
    </aside>
  )
}
