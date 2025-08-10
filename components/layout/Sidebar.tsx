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
      className={`fixed inset-y-0 left-0 z-50 w-72 border-r bg-card pt-14 transition-transform md:static md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-item ${pathname === link.href ? 'nav-item-active' : ''}`}
                onClick={() => isOpen && toggle()}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Account
          </h2>
          <div className="space-y-1">
            <button
              className="nav-item w-full text-left"
              onClick={() => alert('Logged out')}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
