'use client'

import { useEffect } from 'react'

const shouldMock = () => {
  if (typeof window === 'undefined') {
    return false
  }

  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    return true
  }

  return process.env.NODE_ENV === 'development'
}

export default function MockServiceWorker() {
  useEffect(() => {
    if (!shouldMock()) {
      return
    }

    let cancelled = false

    const startMocking = async () => {
      const { startBrowserWorker } = await import('@/mocks/browser')
      if (!cancelled) {
        await startBrowserWorker()
      }
    }

    void startMocking()

    return () => {
      cancelled = true
    }
  }, [])

  return null
}
