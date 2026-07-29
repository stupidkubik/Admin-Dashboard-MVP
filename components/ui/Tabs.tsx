"use client";
import { ReactNode, useState } from "react";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

export function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active);

  return (
    <div>
      <div className="flex border-b border-border" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={`-mb-px px-4 py-2 text-sm font-medium hover:text-primary ${
              active === tab.id
                ? "border-b-2 border-primary text-primary"
                : "border-b-2 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {current && (
        <div
          id={`panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="py-4"
        >
          {current.content}
        </div>
      )}
    </div>
  );
}
