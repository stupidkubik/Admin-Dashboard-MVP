'use client'

type Props = {
  open: boolean
  title: string
  description?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({ open, title, description, onConfirm, onCancel }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded bg-white p-6 shadow dark:bg-gray-800">
        <h2 className="mb-2 text-lg font-semibold">{title}</h2>
        {description && <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">{description}</p>}
        <div className="flex justify-end gap-2">
          <button className="rounded border px-3 py-1" onClick={onCancel}>
            Cancel
          </button>
          <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
