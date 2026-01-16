"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS, es, fr, ru } from "date-fns/locale";
import { useLocale } from "@/contexts/LocaleProvider";
import { DEFAULT_LOCALE, type Locale as AppLocale } from "@/lib/i18n";
import type { ActivityItem } from "@/lib/types";
import type { Locale as DateFnsLocale } from "date-fns";

const DATE_FNS_LOCALES: Partial<Record<AppLocale, DateFnsLocale>> = {
  en: enUS,
  es,
  fr,
  ru,
};

const TYPE_COLORS: Record<string, string> = {
  user: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
  order: "bg-green-500/15 text-green-600 dark:text-green-300",
  payment: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  alert: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
};

export default function RecentActivityFeed({
  items,
}: {
  items: ActivityItem[];
}) {
  const { locale } = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!items.length) {
    return null;
  }

  const resolvedLocale =
    DATE_FNS_LOCALES[locale] ?? DATE_FNS_LOCALES[DEFAULT_LOCALE];

  const formatTime = (timestamp: string) => {
    if (!mounted) {
      return "–";
    }
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
      locale: resolvedLocale,
    });
  };

  return (
    <ul className="space-y-4">
      {items.map((item) => {
        const badgeClass =
          TYPE_COLORS[item.type] ?? "bg-muted text-muted-foreground";
        const dictLocale =
          item.translations?.[locale] ??
          item.translations?.[DEFAULT_LOCALE] ??
          undefined;
        const localizedTitle = dictLocale?.title ?? item.title;
        const localizedDetails = dictLocale?.details ?? item.details;
        const typeLabel =
          item.typeLabels?.[locale] ??
          item.typeLabel ??
          item.type.toUpperCase();
        return (
          <li key={item.id} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
            <span
              className={`mt-1 rounded-full px-2 py-1 text-xs font-semibold ${badgeClass}`}
            >
              {typeLabel}
            </span>
            <div className="flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                <p className="text-sm font-medium text-foreground">
                  {localizedTitle}
                </p>
                <span className="text-xs text-muted-foreground">
                  {formatTime(item.timestamp)}
                </span>
              </div>
              {localizedDetails && (
                <p className="text-xs text-muted-foreground/90">
                  {localizedDetails}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
