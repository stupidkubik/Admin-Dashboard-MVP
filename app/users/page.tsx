"use client";
import DataTable from "@/components/data-table/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { User } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useMemo, useState } from "react";
import ConfirmModal from "@/components/common/ConfirmModal";
import EmptyState from "@/components/common/EmptyState";
import PageLayout from "@/components/layout/PageLayout";
import { TableSkeleton } from "@/components/loading/Skeletons";
import { useLocale } from "@/contexts/LocaleProvider";
import { useUsers } from "@/lib/hooks/useUsers";

export default function UsersPage() {
  const { data, mutate, isLoading, error } = useUsers();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { t } = useLocale();

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      { header: t("users.table.columns.name", "Name"), accessorKey: "name" },
      { header: t("users.table.columns.email", "Email"), accessorKey: "email" },
      { header: t("users.table.columns.role", "Role"), accessorKey: "role" },
      {
        header: t("users.table.columns.active", "Active"),
        accessorKey: "active",
        cell: ({ row }) =>
          row.original.active
            ? t("users.table.active.yes", "Yes")
            : t("users.table.active.no", "No"),
      },
      {
        header: t("users.table.columns.actions", "Actions"),
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() =>
                alert(`${t("common.buttons.edit", "Edit")} ${row.original.id}`)
              }
              className="px-2 py-1"
            >
              {t("common.buttons.edit", "Edit")}
            </Button>
            <Button
              type="button"
              onClick={() => setDeleteId(row.original.id)}
              className="bg-red-600 px-2 py-1"
            >
              {t("common.buttons.delete", "Delete")}
            </Button>
          </div>
        ),
      },
    ],
    [t],
  );

  const tableData = useMemo(() => data ?? [], [data]);

  const handleDelete = () => {
    if (data && deleteId) {
      mutate(
        data.filter((u) => u.id !== deleteId),
        false,
      );
    }
    setDeleteId(null);
  };

  if (isLoading) {
    return (
      <PageLayout
        title={t("users.page.title", "Users")}
        description={t(
          "users.page.description",
          "Manage your team members and their access levels.",
        )}
      >
        <div className="section-container">
          <TableSkeleton columns={columns.length} rows={6} />
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout
        title={t("users.page.title", "Users")}
        description={t(
          "users.page.description",
          "Manage your team members and their access levels.",
        )}
      >
        <div className="section-container">
          <EmptyState
            title={t("common.messages.usersErrorTitle", "Failed to load users")}
            message={t(
              "common.messages.usersErrorMessage",
              "Please try again later.",
            )}
          />
        </div>
      </PageLayout>
    );
  }

  const hasUsers = (data?.length ?? 0) > 0;

  return (
    <>
      <PageLayout
        title={t("users.page.title", "Users")}
        description={t(
          "users.page.description",
          "Manage your team members and their access levels.",
        )}
      >
        <div className="section-container">
          {hasUsers ? (
            <DataTable
              columns={columns}
              data={tableData}
              searchKeys={["name", "email"]}
              initialPageSize={10}
            />
          ) : (
            <EmptyState
              title={t("common.messages.usersEmptyTitle", "No users yet")}
              message={t(
                "common.messages.usersEmptyMessage",
                "Invite your colleagues to get started.",
              )}
            />
          )}
        </div>
      </PageLayout>
      <ConfirmModal
        open={!!deleteId}
        title={t("common.modals.deleteUserTitle", "Delete user?")}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
