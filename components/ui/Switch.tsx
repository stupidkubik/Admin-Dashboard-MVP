'use client'
import { InputHTMLAttributes, forwardRef } from 'react'

export const Switch = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <label className="inline-flex items-center cursor-pointer">
      <input ref={ref} type="checkbox" className="peer sr-only" {...props} />
      <span
        className={`h-5 w-10 rounded-full bg-gray-300 p-1 transition peer-checked:bg-blue-600 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-500 ${className}`}
      >
        <span className="block h-4 w-4 rounded-full bg-white shadow-md transform transition peer-checked:translate-x-5"></span>
      </span>
    </label>
  )
)

Switch.displayName = 'Switch'
