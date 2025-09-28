import DashboardPageClient from "@/components/dashboard/DashboardPageClient";
import { fetcher, resolveRequestInfo } from "@/lib/fetcher";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";
import type { DashboardStats, User } from "@/lib/types";
import { cookies, headers } from "next/headers";

async function getServerRequestOrigin(): Promise<string> {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  let host: string | null = null;
  let protocol: string | null = null;

  try {
    const incomingHeaders = await headers();
    host =
      incomingHeaders.get("x-forwarded-host") ??
      incomingHeaders.get("host");
    protocol =
      incomingHeaders.get("x-forwarded-proto") ??
      incomingHeaders.get("x-forwarded-protocol");
  } catch {
    // `headers()` throws during static rendering when no request context exists.
  }

  const fallbackProtocol =
    protocol ?? (process.env.NODE_ENV === "production" ? "https" : "http");

  if (host) {
    return `${fallbackProtocol}://${host}`;
  }

  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.VERCEL_URL ??
    null;

  if (envUrl) {
    return envUrl.startsWith("http")
      ? envUrl
      : `${fallbackProtocol}://${envUrl.replace(/^\/+/, "")}`;
  }

  const port = process.env.PORT ?? "3000";

  return `${fallbackProtocol}://127.0.0.1:${port}`;
}

function createServerRequestInfo(endpoint: string, origin: string): RequestInfo {
  const resolved = resolveRequestInfo(endpoint);

  if (typeof resolved !== "string") {
    return resolved;
  }

  const isAbsoluteUrl =
    /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(resolved) || resolved.startsWith("//");

  if (isAbsoluteUrl) {
    return resolved;
  }

  const pathname = resolved.startsWith("/") ? resolved : `/${resolved}`;

  return new URL(pathname, origin).toString();
}

async function getDashboardData() {
  const origin = await getServerRequestOrigin();
  const [initialStats, initialUsers] = await Promise.all([
    fetcher<DashboardStats>(createServerRequestInfo("stats", origin)),
    fetcher<User[]>(createServerRequestInfo("users", origin)),
  ]);

  return { initialStats, initialUsers };
}

async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value;

  if (localeCookie && isLocale(localeCookie)) {
    return localeCookie;
  }

  return DEFAULT_LOCALE;
}

export default async function DashboardPage() {
  const locale = await getRequestLocale();
  const { initialStats, initialUsers } = await getDashboardData();

  return (
    <DashboardPageClient
      initialLocale={locale}
      initialStats={initialStats}
      initialUsers={initialUsers}
    />
  );
}
