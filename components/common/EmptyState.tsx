"use client";
import { useLocale } from "@/contexts/LocaleProvider";

export default function EmptyState({
  title,
  message,
}: {
  title?: string;
  message?: string;
}) {
  const { t } = useLocale();
  const resolvedTitle = title ?? t("common.empty.title", "No results");
  const resolvedMessage =
    message ?? t("common.empty.description", "No records found");
  return (
    <div className="py-10 text-center text-sm text-gray-500">
      <p className="font-medium">{resolvedTitle}</p>
      <p>{resolvedMessage}</p>
    </div>
  );
}
