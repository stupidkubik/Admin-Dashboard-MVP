import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  key: string;
  titleKey: string;
  href?: string;
  icon: LucideIcon;
  type?: "link" | "action";
  roles?: string[];
};

export type NavSection = {
  key: string;
  titleKey: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    key: "main",
    titleKey: "navigation.sections.main",
    items: [
      {
        key: "dashboard",
        titleKey: "navigation.items.dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        key: "users",
        titleKey: "navigation.items.users",
        href: "/users",
        icon: Users,
      },
      {
        key: "forms",
        titleKey: "navigation.items.forms",
        href: "/forms",
        icon: FileText,
      },
      {
        key: "settings",
        titleKey: "navigation.items.settings",
        href: "/settings",
        icon: Settings,
      },
      {
        key: "blank",
        titleKey: "navigation.items.blank",
        href: "/blank",
        icon: FileText,
      },
    ],
  },
  {
    key: "account",
    titleKey: "navigation.sections.account",
    items: [
      {
        key: "logout",
        titleKey: "navigation.items.logout",
        icon: LogOut,
        type: "action",
      },
    ],
  },
];
