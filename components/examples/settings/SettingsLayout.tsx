"use client";

import type { ReactNode } from "react";

type SettingsLayoutProps = {
  title: string;
  description: string;
  sidebar: ReactNode;
  children: ReactNode;
};

export default function SettingsLayout({
  title,
  description,
  sidebar,
  children,
}: SettingsLayoutProps) {
  return (
    <div className="page-container max-w-6xl">
      <div className="mb-8">
        <h1 className="heading-2 mb-1">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="md:w-64">{sidebar}</aside>
        <div className="flex-1 space-y-8">{children}</div>
      </div>
    </div>
  );
}
