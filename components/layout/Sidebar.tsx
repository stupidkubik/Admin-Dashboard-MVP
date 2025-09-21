'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/contexts/SidebarProvider'
import { NAV_SECTIONS } from '@/constants/nav'
import { useLocale } from '@/contexts/LocaleProvider'

const CURRENT_ROLE = 'admin'

export default function Sidebar() {
  const { isOpen, toggle, close } = useSidebar()
  const pathname = usePathname()
  const { t } = useLocale()

  const sections = NAV_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => !item.roles || item.roles.includes(CURRENT_ROLE)),
  })).filter((section) => section.items.length > 0)

  const handleAction = (itemKey: string) => {
    if (itemKey === 'logout') {
      alert(t('navigation.items.logout'))
    }
    if (isOpen) close()
  }

  const isActive = (href?: string) => {
    if (!href) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r bg-card pt-14 transition-transform md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-4 py-4">
          {sections.map((section) => (
            <div key={section.key} className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                {t(section.titleKey)}
              </h2>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const ItemIcon = item.icon

                  if (item.type === 'action') {
                    return (
                      <button
                        key={item.key}
                        type="button"
                        className="nav-item w-full text-left"
                        onClick={() => handleAction(item.key)}
                      >
                        <ItemIcon className="mr-2 h-4 w-4" />
                        {t(item.titleKey)}
                      </button>
                    )
                  }

                  return (
                    <Link
                      key={item.key}
                      href={item.href ?? '#'}
                      className={`nav-item ${isActive(item.href) ? 'nav-item-active' : ''}`}
                      onClick={() => isOpen && close()}
                    >
                      <ItemIcon className="mr-2 h-4 w-4" />
                      {t(item.titleKey)}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
          aria-label="Close sidebar"
          onClick={close}
        />
      )}
    </>
  )
}
