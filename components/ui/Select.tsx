'use client'
import { SelectHTMLAttributes } from 'react'

export function Select({ className = '', ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`border rounded px-3 py-2 w-full bg-white dark:bg-gray-800 ${className}`} {...props} />
}
