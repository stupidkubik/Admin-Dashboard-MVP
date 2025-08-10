'use client'
import { ReactNode, useState } from 'react'

type DropdownMenuProps = {
  trigger: ReactNode
  children: ReactNode
}

export function DropdownMenu({ trigger, children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded border bg-white shadow dark:bg-gray-800">
          {children}
        </div>
      )}
    </div>
  )
}
