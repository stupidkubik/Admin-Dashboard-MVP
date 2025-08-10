'use client'
import { InputHTMLAttributes } from 'react'

export function Checkbox({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="checkbox" className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`} {...props} />
}
