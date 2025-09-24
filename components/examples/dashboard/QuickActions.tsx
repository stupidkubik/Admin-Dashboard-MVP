"use client";

import type { LucideIcon } from "lucide-react";

type QuickAction = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

type QuickActionsProps = {
  actions: QuickAction[];
};

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="section-container">
      <h3 className="heading-4 mb-6">Quick Actions</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {actions.map(({ id, title, description, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className="flex-center flex-col rounded-lg border-2 border-dashed p-6 hover:border-primary hover:bg-primary/5"
          >
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h4 className="mt-3 font-medium">{title}</h4>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              {description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
