import { useCallback, useState } from 'react'
import { getPasswordStrength } from '@/lib/validators'

export function usePasswordStrength(initialStrength = 0) {
  const [strength, setStrength] = useState(initialStrength)

  const handlePasswordChange = useCallback((value: string) => {
    setStrength(getPasswordStrength(value))
  }, [])

  const resetStrength = useCallback(() => {
    setStrength(initialStrength)
  }, [initialStrength])

  return {
    strength,
    handlePasswordChange,
    resetStrength,
  }
}
