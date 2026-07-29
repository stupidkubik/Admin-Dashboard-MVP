"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleProvider";

export default function AvatarMenu() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        className="h-8 w-8 rounded-full bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => setOpen((o) => !o)}
        aria-controls={menuId}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("header.actions.toggleAccountMenu", "Toggle menu")}
      />
      {open && (
        <div
          id={menuId}
          className="absolute right-0 z-modal mt-2 w-40 rounded-md border bg-popover p-1 text-popover-foreground shadow"
          role="menu"
        >
          <Link
            href="/settings"
            className="block rounded px-3 py-2 text-sm hover:bg-accent"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            {t("navigation.items.settings", "Settings")}
          </Link>
          <button
            type="button"
            className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              alert(t("navigation.items.logout", "Logout"));
            }}
          >
            {t("navigation.items.logout", "Logout")}
          </button>
        </div>
      )}
    </div>
  );
}
