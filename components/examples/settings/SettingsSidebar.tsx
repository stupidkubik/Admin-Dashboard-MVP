"use client";

import type { LucideIcon } from "lucide-react";

export type SettingsTab = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type SettingsSidebarProps = {
  tabs: SettingsTab[];
  activeTabId?: string;
  onTabClick?: (tabId: string) => void;
};

export default function SettingsSidebar({
  tabs,
  activeTabId,
  onTabClick,
}: SettingsSidebarProps) {
  return (
    <nav className="space-y-1">
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = activeTabId ? activeTabId === id : tabs[0]?.id === id;
        return (
          <button
            key={id}
            type="button"
            className={`nav-item w-full justify-start ${isActive ? "nav-item-active" : ""}`}
            onClick={() => onTabClick?.(id)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
