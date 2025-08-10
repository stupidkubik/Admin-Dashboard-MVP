'use client'
import { XCircleIcon } from '@heroicons/react/20/solid'

type Props = {
  message?: string
  retry?: () => void
}

export default function ErrorState({ message = 'Something went wrong', retry }: Props) {
  return (
    <div className="rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
      <div className="flex items-start">
        <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-500" />
        <div className="ml-3">
          <p className="text-sm text-red-600 dark:text-red-500">{message}</p>
          {retry && (
            <button
              onClick={retry}
              className="mt-2 text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
