'use client'
import { ReactNode, useState } from 'react'

type Tab = {
  id: string
  label: string
  content: ReactNode
}

type TabsProps = {
  tabs: Tab[]
}

export function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.id)
  const current = tabs.find((t) => t.id === active)

  return (
    <div>
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`-mb-px px-4 py-2 text-sm font-medium hover:text-blue-600 ${
              active === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'border-b-2 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">{current?.content}</div>
    </div>
  )
}
