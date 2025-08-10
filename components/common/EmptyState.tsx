export default function EmptyState({ title = 'No results', message = 'No records found' }: { title?: string; message?: string }) {
  return (
    <div className="py-10 text-center text-sm text-gray-500">
      <p className="font-medium">{title}</p>
      <p>{message}</p>
    </div>
  )
}
