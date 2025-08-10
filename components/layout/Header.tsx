'use client'
import { Menu, Moon, Sun } from 'lucide-react'
import { useSidebar } from '@/contexts/SidebarProvider'
import Breadcrumbs from './Breadcrumbs'
import AvatarMenu from '../common/AvatarMenu'
import { useTheme } from 'next-themes'

export default function Header() {
  const { toggle } = useSidebar()
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-2 dark:bg-gray-900">
      <div className="flex items-center gap-2">
        <button className="md:hidden" onClick={toggle} aria-label="Toggle sidebar">
          <Menu className="h-5 w-5" />
        </button>
        <Breadcrumbs />
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => setTheme(isDark ? 'light' : 'dark')} aria-label="Toggle theme">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <AvatarMenu />
      </div>
    </header>
  )
}
