'use client'
import { useState, ButtonHTMLAttributes } from 'react'

type ToggleProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Toggle({ className = '', ...props }: ToggleProps) {
  const [pressed, setPressed] = useState(false)
  return (
    <button
      {...props}
      onClick={(e) => {
        setPressed((p) => !p)
        props.onClick?.(e)
      }}
      className={`rounded border px-3 py-2 text-sm ${
        pressed ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200'
      } ${className}`}
    />
  )
}
