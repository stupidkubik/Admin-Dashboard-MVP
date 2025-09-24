"use client";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { useLocale } from "@/contexts/LocaleProvider";

type Props = {
  message?: string;
  retry?: () => void;
};

export default function ErrorState({ message, retry }: Props) {
  const { t } = useLocale();
  const resolvedMessage =
    message ?? t("common.errors.generic", "Something went wrong");
  return (
    <div className="rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
      <div className="flex items-start">
        <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-500" />
        <div className="ml-3">
          <p className="text-sm text-red-600 dark:text-red-500">
            {resolvedMessage}
          </p>
          {retry && (
            <button
              onClick={retry}
              className="mt-2 text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
            >
              {t("common.buttons.tryAgain", "Try again")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
