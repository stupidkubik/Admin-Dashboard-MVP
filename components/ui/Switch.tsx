'use client'
import { InputHTMLAttributes, forwardRef } from 'react'

export const Switch = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', disabled, ...props }, ref) => (
    <label
      className={`relative inline-flex h-6 w-11 shrink-0 items-center ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      } ${className}`}
    >
      <input
        ref={ref}
        type="checkbox"
        className="peer sr-only"
        disabled={disabled}
        {...props}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-border/40 bg-muted transition-colors duration-200 ease-out peer-checked:border-primary/60 peer-checked:bg-primary peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring peer-disabled:cursor-not-allowed peer-disabled:bg-muted"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ease-out transform peer-checked:translate-x-5 peer-disabled:bg-muted/50"
      />
    </label>
  )
)

Switch.displayName = 'Switch'
