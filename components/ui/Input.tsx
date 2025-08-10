'use client'
import { InputHTMLAttributes } from 'react'

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`border rounded px-3 py-2 w-full bg-white dark:bg-gray-800 ${className}`} {...props} />
}
