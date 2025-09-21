type AnimationItem = {
  label: string
  className: string
}

type AnimationsGridProps = {
  title?: string
  animations: AnimationItem[]
}

export default function AnimationsGrid({ title = 'Animations', animations }: AnimationsGridProps) {
  return (
    <section className="section-container">
      <h2 className="heading-2 mb-6">{title}</h2>
      <div className="grid-container md:grid-cols-3">
        {animations.map(({ label, className }, index) => (
          <div key={`animation-${index}`} className={className}>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
