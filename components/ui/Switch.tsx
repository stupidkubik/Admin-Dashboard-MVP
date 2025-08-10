'use client'
import { InputHTMLAttributes } from 'react'

export function Switch({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only" {...props} />
      <span className={`h-5 w-10 rounded-full bg-gray-300 p-1 transition ${props.checked ? 'bg-blue-600' : ''} ${className}`}>
        <span className={`block h-4 w-4 rounded-full bg-white shadow-md transform transition ${props.checked ? 'translate-x-5' : ''}`}></span>
      </span>
    </label>
  )
}
