"use client";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarProvider";
import AvatarMenu from "../common/AvatarMenu";
import LocaleSwitcher from "../common/LocaleSwitcher";
import { useTheme } from "next-themes";
import { useLocale } from "@/contexts/LocaleProvider";

export default function Header() {
  const { toggle } = useSidebar();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const getCurrentTheme = (): "light" | "dark" => {
    if (resolvedTheme === "light" || resolvedTheme === "dark") {
      return resolvedTheme;
    }

    if (theme === "light" || theme === "dark") {
      return theme;
    }

    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    }

    return "light";
  };

  const currentTheme = getCurrentTheme();
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
  };
  const { t } = useLocale();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-2 sm:flex-nowrap sm:gap-0 sm:px-6 sm:py-0 lg:px-8 min-h-[3.5rem]">
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={toggle}
            aria-label={t("header.actions.toggleSidebar", "Toggle sidebar")}
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="hidden text-sm font-semibold text-muted-foreground md:block">
            {t("header.title", "Admin Dashboard")}
          </span>
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:flex-none sm:flex-nowrap sm:gap-3">
          <LocaleSwitcher />
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
            aria-label={t("header.actions.toggleTheme", "Toggle theme")}
            aria-pressed={mounted ? isDark : undefined}
          >
            {mounted && isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <AvatarMenu />
        </div>
      </div>
    </header>
  );
}
