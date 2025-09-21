import type { ReactNode } from 'react'
import Breadcrumbs from './Breadcrumbs'

interface PageLayoutProps {
  title?: string
  description?: string
  actions?: ReactNode
  children: ReactNode
  breadcrumbs?: ReactNode | null
  className?: string
  contentClassName?: string
}

export default function PageLayout({
  title,
  description,
  actions,
  children,
  breadcrumbs = <Breadcrumbs />,
  className = '',
  contentClassName = 'space-y-6',
}: PageLayoutProps) {
  return (
    <div className={`page-container ${className}`}>
      <div className="space-y-4">
        {breadcrumbs !== null && (
          <div className="flex flex-col">
            {breadcrumbs}
          </div>
        )}

        {(title || description || actions) && (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              {title && <h1 className="heading-2">{title}</h1>}
              {description && <p className="text-muted-foreground">{description}</p>}
            </div>
            {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
          </div>
        )}
      </div>

      <div className={contentClassName}>{children}</div>
    </div>
  )
}
