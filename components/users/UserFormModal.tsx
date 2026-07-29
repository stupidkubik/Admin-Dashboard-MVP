"use client";

import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userBaseSchema } from "@/lib/validators";
import type { User } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/contexts/LocaleProvider";

const userFormSchema = userBaseSchema.pick({
  name: true,
  email: true,
  role: true,
  active: true,
});

export type UserFormValues = z.infer<typeof userFormSchema>;

const DEFAULT_VALUES: UserFormValues = {
  name: "",
  email: "",
  role: "viewer",
  active: true,
};

type UserFormModalProps = {
  open: boolean;
  mode: "create" | "edit";
  initialValues?: User | null;
  isSubmitting?: boolean;
  errorMessage?: string;
  onSubmit: (values: UserFormValues) => Promise<boolean>;
  onClose: () => void;
};

const resolveValues = (user?: User | null): UserFormValues => {
  if (!user) {
    return DEFAULT_VALUES;
  }

  return {
    name: user.name ?? "",
    email: user.email ?? "",
    role: user.role ?? "viewer",
    active: user.active ?? true,
  };
};

export default function UserFormModal({
  open,
  mode,
  initialValues,
  isSubmitting = false,
  errorMessage,
  onSubmit,
  onClose,
}: UserFormModalProps) {
  const { t } = useLocale();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    reset(resolveValues(initialValues));
  }, [open, initialValues, reset]);

  const handleClose = () => {
    reset(DEFAULT_VALUES);
    onClose();
  };

  const handleFormSubmit = async (values: UserFormValues) => {
    try {
      const didSucceed = await onSubmit(values);
      if (didSucceed) {
        reset(DEFAULT_VALUES);
        onClose();
      }
    } catch {
      // Errors are handled upstream for consistent UX.
    }
  };

  if (!open) {
    return null;
  }

  const title =
    mode === "create"
      ? t("users.form.titleCreate", "Add user")
      : t("users.form.titleEdit", "Edit user");
  const submitLabel =
    mode === "create"
      ? t("users.form.submitCreate", "Create user")
      : t("users.form.submitEdit", "Save changes");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">
              {t(
                "users.form.subtitle",
                "Manage access and keep team details up to date.",
              )}
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("users.table.columns.name", "Name")}
            </label>
            <Input
              autoComplete="name"
              placeholder={t("forms.fields.fullNamePlaceholder", "John Doe")}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("users.table.columns.email", "Email")}
            </label>
            <Input
              type="email"
              autoComplete="email"
              placeholder={t("forms.fields.emailPlaceholder", "john@example.com")}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("users.table.columns.role", "Role")}
            </label>
            <Select {...register("role")}>
              <option value="admin">
                {t("forms.roleOptions.admin", "Admin")}
              </option>
              <option value="editor">
                {t("forms.roleOptions.editor", "Editor")}
              </option>
              <option value="viewer">
                {t("forms.roleOptions.viewer", "Viewer")}
              </option>
            </Select>
            {errors.role && (
              <p className="text-xs text-red-600">{errors.role.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox {...register("active")} />
            <span className="text-sm text-foreground">
              {t("users.table.columns.active", "Active")}
            </span>
          </div>
          {errors.active && (
            <p className="text-xs text-red-600">{errors.active.message}</p>
          )}

          <div className="flex flex-wrap justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="btn-outline px-4 py-2 text-sm"
            >
              {t("common.buttons.cancel", "Cancel")}
            </button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? t("common.buttons.saving", "Saving...")
                : submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
