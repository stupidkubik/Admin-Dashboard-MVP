"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { User } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useCallback, useMemo, useState } from "react";
import ConfirmModal from "@/components/common/ConfirmModal";
import EmptyState from "@/components/common/EmptyState";
import PageLayout from "@/components/layout/PageLayout";
import { TableSkeleton } from "@/components/loading/Skeletons";
import { useLocale } from "@/contexts/LocaleProvider";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/lib/apiSlice";
import { useClientDataTable } from "@/components/data-table/useClientDataTable";

const USERS_TABLE_COLUMNS = 5;

export default function UsersPage() {
  const { data, isLoading, isError } = useGetUsersQuery(undefined);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { t } = useLocale();
  const DataTable = useClientDataTable<User>();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleEdit = useCallback(
    async (user: User) => {
      const nextName = window.prompt(
        t("users.table.editPrompt", "Enter a new name"),
        user.name,
      );

      if (!nextName) {
        return;
      }

      const trimmedName = nextName.trim();
      if (!trimmedName || trimmedName === user.name) {
        return;
      }

      try {
        await updateUser({ id: user.id, changes: { name: trimmedName } }).unwrap();
      } catch {
      }
    },
    [t, updateUser],
  );

  const handleDelete = useCallback(async () => {
    if (!deleteId) {
      setDeleteId(null);
      return;
    }

    const id = deleteId;
    setDeleteId(null);

    try {
      await deleteUser(id).unwrap();
    } catch {
      // Intentionally ignored; the UI will re-render on refetch.
    }
  }, [deleteId, deleteUser]);

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
              onClick={() => {
                void handleEdit(row.original);
              }}
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
    [handleEdit, t],
  );

  const tableData = useMemo(() => data ?? [], [data]);

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

  if (isError) {
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

  const hasUsers = tableData.length > 0;

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
            DataTable ? (
              <DataTable
                columns={columns}
                data={tableData}
                searchKeys={["name", "email"]}
                initialPageSize={10}
              />
            ) : (
              <TableSkeleton columns={USERS_TABLE_COLUMNS} rows={6} />
            )
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
