"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import type { DataTableProps } from "@/components/data-table/DataTable";
import EmptyState from "@/components/common/EmptyState";
import { getRecentUsersColumns } from "@/components/dashboard/columns";
import { User } from "@/lib/types";
import { useLocale } from "@/contexts/LocaleProvider";
import { TableSkeleton } from "@/components/loading/Skeletons";

const DataTable = dynamic<DataTableProps<User>>(
  () => import("@/components/data-table/DataTable"),
  {
    ssr: false,
    loading: () => <TableSkeleton columns={3} rows={5} />,
  },
);

type RecentUsersTableProps = {
  users?: User[];
  onViewAll?: () => void;
};

export default function RecentUsersTable({
  users,
  onViewAll,
}: RecentUsersTableProps) {
  const hasUsers = (users?.length ?? 0) > 0;
  const tableData = hasUsers ? (users ?? []).slice(0, 5) : [];
  const { t } = useLocale();
  const columns = useMemo(() => getRecentUsersColumns(t), [t]);

  return (
    <div className="section-container">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="heading-4">
          {t("dashboard.recentUsers.title", "Recent Users")}
        </h3>
        <button type="button" className="btn-outline" onClick={onViewAll}>
          {t("common.buttons.viewAll", "View All")}
        </button>
      </div>
      <div className="table-container">
        {hasUsers ? (
          <DataTable
            columns={columns}
            data={tableData}
            searchKeys={["name", "email"]}
            initialPageSize={5}
          />
        ) : (
          <EmptyState message={t("common.empty.users", "No users found")} />
        )}
      </div>
    </div>
  );
}
