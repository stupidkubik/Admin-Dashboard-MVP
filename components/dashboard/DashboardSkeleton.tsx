'use client'

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-lg bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="h-80 rounded-lg bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>

      {/* Table */}
      <div className="space-y-4">
        <div className="h-8 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-12 rounded bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
