type AlertItem = {
  message: string
  className: string
}

type AlertListProps = {
  title?: string
  alerts: AlertItem[]
}

export default function AlertList({ title = 'Alerts', alerts }: AlertListProps) {
  return (
    <section className="section-container">
      <h2 className="heading-2 mb-6">{title}</h2>
      <div className="space-y-4">
        {alerts.map(({ message, className }, index) => (
          <div key={`alert-${index}`} className={className}>
            <p>{message}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
