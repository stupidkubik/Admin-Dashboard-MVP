import PageLayout from '@/components/layout/PageLayout'

export default function BlankPage() {
  return (
    <PageLayout title="Blank Page" description="Start from a clean slate.">
      <div className="section-container text-sm text-muted-foreground">
        Customize this page by adding components or data visualisations.
      </div>
    </PageLayout>
  )
}
