import DashboardPageClient from "@/components/dashboard/DashboardPageClient";
import { fetcher } from "@/lib/fetcher";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";
import type { DashboardStats, User } from "@/lib/types";
import { cookies } from "next/headers";

async function getDashboardData() {
  const [initialStats, initialUsers] = await Promise.all([
    fetcher<DashboardStats>("stats"),
    fetcher<User[]>("users"),
  ]);

  return { initialStats, initialUsers };
}

function getRequestLocale(): Locale {
  const localeCookie = cookies().get("locale")?.value;

  if (localeCookie && isLocale(localeCookie)) {
    return localeCookie;
  }

  return DEFAULT_LOCALE;
}

export default async function DashboardPage() {
  const locale = getRequestLocale();
  const { initialStats, initialUsers } = await getDashboardData();

  return (
    <DashboardPageClient
      initialLocale={locale}
      initialStats={initialStats}
      initialUsers={initialUsers}
    />
  );
}
