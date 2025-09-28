"use client";
import { useMemo } from "react";
import EmptyState from "@/components/common/EmptyState";
import { getRecentUsersColumns } from "@/components/dashboard/columns";
import { User } from "@/lib/types";
import { useLocale } from "@/contexts/LocaleProvider";
import { TableSkeleton } from "@/components/loading/Skeletons";
import { useClientDataTable } from "@/components/data-table/useClientDataTable";

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
  const DataTable = useClientDataTable<User>();

  return (
    <div className="section-container">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="heading-4">
          {t("dashboard.recentUsers.title", "Recent Users")}
        </h3>
        <button type="button" className="btn-outline" onClick={onViewAll}>
          {t("common.buttons.viewAll", "View All")}
        </button>
      </div>
      <div className="table-container">
        {hasUsers ? (
          DataTable ? (
            <DataTable
              columns={columns}
              data={tableData}
              searchKeys={["name", "email"]}
              initialPageSize={5}
            />
          ) : (
            <TableSkeleton columns={3} rows={5} />
          )
        ) : (
          <EmptyState message={t("common.empty.users", "No users found")} />
        )}
      </div>
    </div>
  );
}
