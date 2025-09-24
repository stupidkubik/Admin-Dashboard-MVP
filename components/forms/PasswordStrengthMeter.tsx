'use client'

import { useLocale } from '@/contexts/LocaleProvider'

type Props = {
  strength: number
}

export default function PasswordStrengthMeter({ strength }: Props) {
  const { t } = useLocale()
  const getColor = (value: number) => {
    if (value <= 2) return 'bg-red-500'
    if (value <= 3) return 'bg-yellow-500'
    if (value <= 4) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getMessage = (value: number) => {
    if (value <= 2) return t('common.password.levels.weak', 'Weak')
    if (value <= 3) return t('common.password.levels.fair', 'Fair')
    if (value <= 4) return t('common.password.levels.good', 'Good')
    return t('common.password.levels.strong', 'Strong')
  }

  const message = t('common.password.label', 'Password strength: {{level}}').replace(
    '{{level}}',
    getMessage(strength)
  )

  return (
    <div className="mt-1">
      <div className="flex h-1.5 w-full overflow-hidden rounded bg-gray-200">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-full w-1/5 ${i < strength ? getColor(strength) : ''}`}
          />
        ))}
      </div>
      <p className={`mt-1 text-xs ${getColor(strength).replace('bg-', 'text-')}`}>
        {message}
      </p>
    </div>
  )
}
