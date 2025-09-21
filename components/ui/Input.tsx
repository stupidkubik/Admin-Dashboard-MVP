'use client'
import { InputHTMLAttributes, forwardRef } from 'react'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`border rounded px-3 py-2 w-full bg-white dark:bg-gray-800 ${className}`}
      {...props}
    />
  )
)

Input.displayName = 'Input'
