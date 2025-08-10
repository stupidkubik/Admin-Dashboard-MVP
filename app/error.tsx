'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Something went wrong</h1>
      <p className="mb-4 text-sm text-gray-600">{error.message}</p>
      <button className="rounded border px-4 py-2" onClick={reset}>
        Try again
      </button>
    </div>
  )
}
