import type { ReactNode } from 'react'

type ButtonSample = {
  label: ReactNode
  className: string
  type?: 'button' | 'submit' | 'reset'
}

type ButtonsShowcaseProps = {
  title?: string
  variants: ButtonSample[]
  sizes?: ButtonSample[]
  groupButtons?: ButtonSample[]
}

export default function ButtonsShowcase({
  title = 'Buttons',
  variants,
  sizes = [],
  groupButtons = [],
}: ButtonsShowcaseProps) {
  return (
    <section className="section-container">
      <h2 className="heading-2 mb-6">{title}</h2>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          {variants.map(({ label, className, type = 'button' }, index) => (
            <button key={`variant-${index}`} type={type} className={className}>
              {label}
            </button>
          ))}
        </div>
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {sizes.map(({ label, className, type = 'button' }, index) => (
              <button key={`size-${index}`} type={type} className={className}>
                {label}
              </button>
            ))}
          </div>
        )}
        {groupButtons.length > 0 && (
          <div className="btn-group">
            {groupButtons.map(({ label, className, type = 'button' }, index) => (
              <button key={`group-${index}`} type={type} className={className}>
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
