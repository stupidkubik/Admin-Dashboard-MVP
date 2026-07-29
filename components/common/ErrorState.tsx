"use client";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { FetchError } from "@/lib/fetcher";
import { useLocale } from "@/contexts/LocaleProvider";

type Props = {
  message?: string;
  retry?: () => void;
  error?: Error | FetchError;
};

function resolveErrorDetails(error?: Error | FetchError): string | undefined {
  if (!error) {
    return undefined;
  }

  if (error instanceof FetchError) {
    const { details } = error;

    if (details && typeof details === "object" && "message" in details) {
      const detailMessage = (details as Record<string, unknown>).message;
      return typeof detailMessage === "string" ? detailMessage : undefined;
    }

    if (typeof details === "string") {
      return details;
    }
  }

  return undefined;
}

export default function ErrorState({ message, retry, error }: Props) {
  const { t } = useLocale();
  const resolvedMessage =
    message ?? t("common.errors.generic", "Something went wrong");
  const detailMessage = resolveErrorDetails(error);

  return (
    <div className="alert-error rounded-lg p-4" role="alert">
      <div className="flex items-start">
        <XCircleIcon className="h-5 w-5 text-danger" />
        <div className="ml-3">
          <p className="text-sm">{resolvedMessage}</p>
          {detailMessage && <p className="mt-1 text-sm">{detailMessage}</p>}
          {retry && (
            <button
              type="button"
              onClick={retry}
              className="mt-2 text-sm font-medium underline-offset-4 hover:underline"
            >
              {t("common.buttons.tryAgain", "Try again")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
