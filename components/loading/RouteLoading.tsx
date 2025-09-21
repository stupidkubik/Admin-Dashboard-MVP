export default function RouteLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span
          aria-hidden
          className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
        />
        <p className="text-sm text-muted-foreground">Loading interface…</p>
      </div>
    </div>
  )
}
