'use client'

export default function LoadingState() {
  return (
    <div className="flex h-32 w-full items-center justify-center rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
        <span className="text-sm text-gray-500 dark:text-gray-400">Loading...</span>
      </div>
    </div>
  )
}
