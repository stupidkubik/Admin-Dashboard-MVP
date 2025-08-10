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
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={toggle}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Breadcrumbs />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <AvatarMenu />
        </div>
      </div>
    </header>
  )
}
