import { setupWorker } from "msw/browser";
import { DEFAULT_API_BASE_URL, getApiBaseUrl } from "@/lib/fetcher";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

function normalizeBaseUrl(value: string) {
  if (!value) {
    return value;
  }

  if (value === "/") {
    return value;
  }

  return value.replace(/\/+$/, "");
}

function isAbsoluteUrl(value: string) {
  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value) || value.startsWith("//");
}

export function shouldBypassWorker(baseUrl: string) {
  if (isAbsoluteUrl(baseUrl)) {
    return true;
  }

  return (
    normalizeBaseUrl(baseUrl || DEFAULT_API_BASE_URL) !==
    normalizeBaseUrl(DEFAULT_API_BASE_URL)
  );
}

export async function startBrowserWorker() {
  if (typeof window === "undefined") {
    return;
  }

  if (shouldBypassWorker(getApiBaseUrl())) {
    return;
  }

  return worker.start({
    onUnhandledRequest: "bypass",
  });
}
