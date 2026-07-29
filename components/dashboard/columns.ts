import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "@/lib/types";
import type { TranslationKey } from "@/lib/i18n";

type Translator = (key: TranslationKey, fallback?: string) => string;

export const getRecentUsersColumns = (t: Translator): ColumnDef<User>[] => [
  { header: t("users.table.columns.name", "Name"), accessorKey: "name" },
  { header: t("users.table.columns.email", "Email"), accessorKey: "email" },
  { header: t("users.table.columns.role", "Role"), accessorKey: "role" },
];
