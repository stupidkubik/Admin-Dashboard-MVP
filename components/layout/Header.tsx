'use client'
import { Menu, Moon, Sun } from 'lucide-react'
import { useSidebar } from '@/contexts/SidebarProvider'
import AvatarMenu from '../common/AvatarMenu'
import LocaleSwitcher from '../common/LocaleSwitcher'
import { useTheme } from 'next-themes'
import { useLocale } from '@/contexts/LocaleProvider'

export default function Header() {
  const { toggle } = useSidebar()
  const { theme, setTheme } = useTheme()
  const { t } = useLocale()
  const isDark = theme === 'dark'
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={toggle}
            aria-label={t('header.actions.toggleSidebar', 'Toggle sidebar')}
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="hidden text-sm font-semibold text-muted-foreground md:block">
            {t('header.title', 'Admin Dashboard')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
            aria-label={t('header.actions.toggleTheme', 'Toggle theme')}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <AvatarMenu />
        </div>
      </div>
    </header>
  )
}
