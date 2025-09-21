'use client'
import { SelectHTMLAttributes, forwardRef } from 'react'

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = '', ...props }, ref) => (
    <select
      ref={ref}
      className={`border rounded px-3 py-2 w-full bg-white dark:bg-gray-800 ${className}`}
      {...props}
    />
  )
)

Select.displayName = 'Select'
