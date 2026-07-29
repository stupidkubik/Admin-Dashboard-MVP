"use client";

import { formatDistanceToNow } from "date-fns";
import { enUS, es, fr, ru } from "date-fns/locale";
import { useLocale } from "@/contexts/LocaleProvider";
import { DEFAULT_LOCALE, type Locale as AppLocale } from "@/lib/i18n";
import type { ActivityItem } from "@/lib/types";
import type { Locale as DateFnsLocale } from "date-fns";
import { useIsHydrated } from "@/lib/hooks/useIsHydrated";

const DATE_FNS_LOCALES: Partial<Record<AppLocale, DateFnsLocale>> = {
  en: enUS,
  es,
  fr,
  ru,
};

const TYPE_COLORS: Record<string, string> = {
  user: "bg-info/10 text-info",
  order: "bg-success/10 text-success",
  payment: "bg-success/10 text-success",
  alert: "bg-warning/10 text-warning",
};

export default function RecentActivityFeed({
  items,
}: {
  items: ActivityItem[];
}) {
  const { locale } = useLocale();
  const isHydrated = useIsHydrated();

  if (!items.length) {
    return null;
  }

  const resolvedLocale =
    DATE_FNS_LOCALES[locale] ?? DATE_FNS_LOCALES[DEFAULT_LOCALE];

  const formatTime = (timestamp: string) => {
    if (!isHydrated) {
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
          <li
            key={item.id}
            className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3"
          >
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
                <p className="text-xs text-muted-foreground">
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
