"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { User } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useCallback, useMemo, useState } from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { toast } from "sonner";
import ConfirmModal from "@/components/common/ConfirmModal";
import EmptyState from "@/components/common/EmptyState";
import PageLayout from "@/components/layout/PageLayout";
import { TableSkeleton } from "@/components/loading/Skeletons";
import { useLocale } from "@/contexts/LocaleProvider";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/lib/apiSlice";
import { useClientDataTable } from "@/components/data-table/useClientDataTable";
import UserFormModal, {
  type UserFormValues,
} from "@/components/users/UserFormModal";

const USERS_TABLE_COLUMNS = 5;

const resolveMutationError = (
  error?: FetchBaseQueryError | SerializedError,
): string | undefined => {
  if (!error) {
    return undefined;
  }

  if ("status" in error) {
    const data = error.data as { message?: string } | string | undefined;
    if (typeof data === "string") {
      return data;
    }
    if (data?.message) {
      return data.message;
    }
    if ("error" in error && error.error) {
      return error.error;
    }
    return `Request failed (${error.status})`;
  }

  if ("message" in error && error.message) {
    return error.message;
  }

  return undefined;
};

export default function UsersPage() {
  const {
    data,
    isLoading,
    isError,
  } = useGetUsersQuery(undefined);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { t } = useLocale();
  const DataTable = useClientDataTable<User>();
  const [
    createUser,
    { error: createError, isLoading: isCreating, reset: resetCreateState },
  ] = useCreateUserMutation();
  const [deleteUser, { reset: resetDeleteState }] = useDeleteUserMutation();
  const [
    updateUser,
    { error: updateError, isLoading: isUpdating, reset: resetUpdateState },
  ] = useUpdateUserMutation();

  const isEditing = !!selectedUser;
  const formError = resolveMutationError(
    isEditing ? updateError : createError,
  );
  const isSubmitting = isEditing ? isUpdating : isCreating;

  const handleCloseForm = useCallback(() => {
    resetCreateState();
    resetDeleteState();
    resetUpdateState();
    setIsFormOpen(false);
    setSelectedUser(null);
  }, [resetCreateState, resetDeleteState, resetUpdateState]);

  const handleOpenCreate = useCallback(() => {
    setSelectedUser(null);
    setIsFormOpen(true);
  }, []);

  const handleOpenEdit = useCallback((user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  }, []);

  const handleSubmitUser = useCallback(
    async (values: UserFormValues) => {
      try {
        if (selectedUser) {
          await updateUser({
            id: selectedUser.id,
            changes: values,
          }).unwrap();
          toast.success(
            t("users.messages.updated", "User updated successfully."),
          );
        } else {
          await createUser({
            ...values,
            createdAt: new Date().toISOString(),
          }).unwrap();
          toast.success(
            t("users.messages.created", "User created successfully."),
          );
        }

        return true;
      } catch {
        toast.error(
          t("users.messages.saveError", "Unable to save the user right now."),
        );
        return false;
      }
    },
    [createUser, selectedUser, t, updateUser],
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
      toast.success(t("users.messages.deleted", "User deleted successfully."));
    } catch (error) {
      const fallbackMessage = t(
        "users.messages.deleteError",
        "Unable to delete the user right now.",
      );
      toast.error(
        resolveMutationError(error as FetchBaseQueryError | SerializedError) ??
          fallbackMessage,
      );
    }
  }, [deleteId, deleteUser, t]);

  const pageActions = (
    <Button type="button" onClick={handleOpenCreate}>
      {t("users.actions.add", "Add user")}
    </Button>
  );

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
                handleOpenEdit(row.original);
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
    [handleOpenEdit, t],
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
        actions={pageActions}
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
        actions={pageActions}
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
        actions={pageActions}
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
      <UserFormModal
        open={isFormOpen}
        mode={isEditing ? "edit" : "create"}
        initialValues={selectedUser}
        isSubmitting={isSubmitting}
        errorMessage={formError}
        onSubmit={handleSubmitUser}
        onClose={handleCloseForm}
      />
    </>
  );
}
