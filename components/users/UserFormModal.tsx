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
import { Dialog } from "@/components/ui/Dialog";
import { FormField } from "@/components/ui/FormField";
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

  const title =
    mode === "create"
      ? t("users.form.titleCreate", "Add user")
      : t("users.form.titleEdit", "Edit user");
  const submitLabel =
    mode === "create"
      ? t("users.form.submitCreate", "Create user")
      : t("users.form.submitEdit", "Save changes");

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title={title}
      description={t(
        "users.form.subtitle",
        "Manage access and keep team details up to date.",
      )}
      closeLabel={t("common.buttons.close", "Close")}
      contentClassName="max-w-lg"
    >
      {errorMessage && (
        <div
          className="alert-error mb-4 rounded-md px-3 py-2 text-sm"
          role="alert"
          aria-live="assertive"
        >
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4"
        noValidate
      >
        <FormField
          id="user-name"
          label={t("users.table.columns.name", "Name")}
          error={errors.name?.message}
        >
          <Input
            autoComplete="name"
            placeholder={t("forms.fields.fullNamePlaceholder", "John Doe")}
            {...register("name")}
          />
        </FormField>

        <FormField
          id="user-email"
          label={t("users.table.columns.email", "Email")}
          error={errors.email?.message}
        >
          <Input
            type="email"
            autoComplete="email"
            placeholder={t("forms.fields.emailPlaceholder", "john@example.com")}
            {...register("email")}
          />
        </FormField>

        <FormField
          id="user-role"
          label={t("users.table.columns.role", "Role")}
          error={errors.role?.message}
        >
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
        </FormField>

        <div className="form-group">
          <label
            className="flex items-center gap-2 text-sm text-foreground"
            htmlFor="user-active"
          >
            <Checkbox
              id="user-active"
              aria-describedby={errors.active ? "user-active-error" : undefined}
              aria-invalid={errors.active ? true : undefined}
              {...register("active")}
            />
            <span>{t("users.table.columns.active", "Active")}</span>
          </label>
          {errors.active && (
            <p id="user-active-error" className="form-error" role="alert">
              {errors.active.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={handleClose}>
            {t("common.buttons.cancel", "Cancel")}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? t("common.buttons.saving", "Saving...")
              : submitLabel}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
