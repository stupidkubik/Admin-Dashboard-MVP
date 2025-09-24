"use client"

import PageLayout from '@/components/layout/PageLayout'
import { useLocale } from '@/contexts/LocaleProvider'

export default function BlankPage() {
  const { t } = useLocale()
  return (
    <PageLayout
      title={t('blank.page.title', 'Blank Page')}
      description={t('blank.page.description', 'Start from a clean slate.')}
    >
      <div className="section-container text-sm text-muted-foreground">
        {t('blank.page.content', 'Customize this page by adding components or data visualisations.')}
      </div>
    </PageLayout>
  )
}
